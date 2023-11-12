const pg = require('pg');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const config = require('./config.js');
require('events').EventEmitter.defaultMaxListeners = 1000;

function setFiltersStringOnLayer(payload) {
    payload.filtersStrings = '';
    if (payload.filters) {
        payload.filtersStrings = payload.filters.map((el) => {
            let string = ` AND ${el.column} ${el.operator} `;
            if (el.value !== 'null' && typeof el.value !== 'boolean') {
                return `${string}'${el.value}'`;
            }
            if (el.value === false) {
                string = ` AND (${el.column} ${el.operator} `;
                return `${string}${el.value} OR ${el.column} IS NULL)`;
            }
            return `${string} ${el.value}`;
        });
        payload.filtersStrings = payload.filtersStrings.join('');
    }
    if (payload.features_safe_delete) payload.filtersStrings += ' AND deleted_at is null';
    return payload;
}

function createTriggersOnLayerTable(pgClient, layerData) {
    pgClient.query(`CREATE OR REPLACE FUNCTION notify_${
        layerData.map_table_name}_${layerData.map_column_name
    }_changes()`
        + ' RETURNS trigger as $$'
        + ' BEGIN'
        + ' PERFORM pg_notify('
        + `'${layerData.map_table_name}_${layerData.map_column_name
        }_changed', `
        + `'${layerData.id}'`
        + ');'
        + ' RETURN NEW;'
        + ' END;'
        + ' $$ LANGUAGE plpgsql;');

    pgClient.query(`DROP TRIGGER IF EXISTS ${layerData.map_table_name}_${layerData.map_column_name}_updated ON public.${layerData.map_table_name}`);
    let layerDataFiltersColumnsString = '';
    if (layerData.filters && layerData.filters.length > 0) {
        const layerDataFiltersColumns = [];
        for (const filter of layerData.filters) {
            if (!layerDataFiltersColumns.includes(filter.column)) layerDataFiltersColumns.push(filter.column);
        }
        layerDataFiltersColumnsString = layerDataFiltersColumns.join(', ');
        layerDataFiltersColumnsString = `, ${layerDataFiltersColumnsString}`;
    }

    if (layerData.features_safe_delete) layerDataFiltersColumnsString += ', deleted_at';

    pgClient.query(`CREATE TRIGGER ${layerData.map_table_name}_${layerData.map_column_name}_updated`
        + ' AFTER UPDATE'
        + ` OF ${layerData.map_column_name}${layerDataFiltersColumnsString} ON ${layerData.map_table_name
        } FOR EACH ROW`
        + ` EXECUTE PROCEDURE notify_${layerData.map_table_name}_${layerData.map_column_name}_changes()`);

    pgClient.query(`DROP TRIGGER IF EXISTS ${layerData.map_table_name}_${layerData.map_column_name}_changed ON public.${layerData.map_table_name}`);
    pgClient.query(`CREATE TRIGGER ${layerData.map_table_name}_${layerData.map_column_name}_changed`
        + ' AFTER INSERT OR DELETE'
        + ` ON ${layerData.map_table_name
        } FOR EACH ROW`
        + ` EXECUTE PROCEDURE notify_${layerData.map_table_name}_${layerData.map_column_name}_changes()`);
}

function createSingleGeojson(
    mapLayersClient,
    pgClient,
    connectionData,
    layerData,
    layerLegendCondition = null,
    layerLegendItem = null,
    callback = () => true,
) {
    const querySql = `${`${'SELECT json_build_object('
    + "                        'type', 'FeatureCollection',"
    + "                        'features', coalesce(jsonb_agg(features.feature), '[]')"
    + '                     ) result'
    + '                      FROM ('
    + '                          SELECT json_build_object('
    + "                             'type', 'Feature',"
    + "                             'properties', json_build_object('name','"}${layerData.map_table_name}'),`
    + '                              \'id\', '}${layerData.map_table_name}.gid,`
    + `                              'geometry', ST_ASGEOJSON(${layerData.map_column_name}::geometry, 9, 8)::json`
    + '                          ) feature'
    + `                          FROM ${layerData.map_table_name} WHERE ${layerData.map_column_name} != ''${layerData.filtersStrings
    }                          AND ST_IsValid(${layerData.map_column_name}::geometry)${layerLegendCondition || ''
    }                          GROUP BY ${layerData.map_table_name}.gid, ${layerData.map_table_name}.${layerData.map_column_name
    }                       ) features`;
    return pgClient.query(querySql)
        // eslint-disable-next-line consistent-return
        .then((layerRes) => {
            if (layerRes.rows.length > 0) {
                return mapLayersClient.query(`SELECT * FROM map_layers WHERE id = ${layerData.id}`)
                    .then((layerUpdatedRes) => {
                        const geojson = layerRes.rows[0].result;
                        let path;
                        if (!layerUpdatedRes.rows[0].style_type || layerUpdatedRes.rows[0].style_type === 'unique') {
                            path = layerUpdatedRes.rows[0].geojson_url;
                            if (!path) {
                                let id = uuidv4();
                                id = id.split('-').join('_');
                                path = `${connectionData.name}_${layerData.map_table_name}_${layerData.map_column_name}_${id}.json`;
                                path = path.replace(/_/g, '');
                            } else {
                                path = path.replace(/_/g, '');
                            }
                        } else if (layerUpdatedRes.rows[0].style_type === 'legend' && layerLegendItem) {
                            const paths = layerUpdatedRes.rows[0].geojsons_urls;
                            if (paths) {
                                path = paths.find((el) => {
                                    const pathSplitted = el.split('_');
                                    if (layerLegendItem.name === 'Défaut') {
                                        return pathSplitted[1] === 'default';
                                    }
                                    return String(layerLegendItem.value) === pathSplitted[2];
                                });
                                if (!path && layerLegendItem.active) {
                                    let id = uuidv4();
                                    id = id.split('-').join('_');
                                    path = connectionData.name + layerData.map_table_name + layerData.map_column_name;
                                    path = path.replace(/_/g, '');
                                    if (layerLegendItem.name !== 'Défaut') {
                                        if (layerLegendItem.operator === '=') {
                                            path = `${path}_equal_${layerLegendItem.value}`;
                                        }
                                    } else {
                                        path = `${path}_default`;
                                    }
                                    id = id.replace(/_/g, '');
                                    path = `${path}_${id}.json`;
                                }
                            } else {
                                let id = uuidv4();
                                id = id.split('-').join('_');
                                path = connectionData.name + layerData.map_table_name + layerData.map_column_name;
                                path = path.replace(/_/g, '');
                                if (layerLegendItem.name !== 'Défaut') {
                                    if (layerLegendItem.operator === '=') {
                                        path = `${path}_equal_${layerLegendItem.value}`;
                                    }
                                } else {
                                    path = `${path}_default`;
                                }
                                id = id.replace(/_/g, '');
                                path = `${path}_${id}.json`;
                            }
                        }
                        if (path) {
                            fs.writeFile(
                                `${process.cwd()}/public/assets/${path}`,
                                // `${process.cwd()}/storage/app/geojsons/${path}`,
                                JSON.stringify(geojson),
                                // eslint-disable-next-line consistent-return
                                (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(`${new Date().toISOString().slice(0, 19).replace('T', ' ')}: `
                                            + `${connectionData.name} ${layerData.map_table_name} layer created, url: ${path}`);
                                        if (!layerUpdatedRes.rows[0].style_type || layerUpdatedRes.rows[0].style_type === 'unique') {
                                            return mapLayersClient.query(`${''
                                                + 'UPDATE map_layers '
                                                // eslint-disable-next-line no-useless-concat,max-len
                                                + "SET geojsons_urls = null, geojson_url = '"}${path}'` + ', updated_at' + `= '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`
                                                + ` WHERE id = ${layerData.id}`)
                                                .then(() => {
                                                    callback(true);
                                                });
                                        } if (layerUpdatedRes.rows[0].style_type === 'legend') {
                                            callback(path);
                                        }
                                    }
                                },
                            );
                        }
                    });
            }
        });
}

function saveGeojsonsUrlsPaths(mapLayersClient, layerData, paths) {
    mapLayersClient.query(`${''
        + 'UPDATE map_layers '
        + "SET geojsons_urls = '"}${JSON.stringify(paths)}', updated_at ='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`
        + ` WHERE id = ${layerData.id}`);
}

function createGeojson(mapLayersClient, pgClient, connectionData, layerData) {
    if (!layerData.style_type || layerData.style_type === 'unique') {
        createSingleGeojson(mapLayersClient, pgClient, connectionData, layerData);
    } else if (layerData.style_type === 'legend') {
        const legend = layerData.style_legend;
        let count = 0;
        const paths = [];
        for (const legendCondition of legend) {
            if (legendCondition.name !== 'Défaut') {
                let legendConditionString = ' AND ';
                legendConditionString = `${legendConditionString + layerData.style_field} ${legendCondition.operator} `;
                if (legendCondition.value !== 'null') legendConditionString = `${legendConditionString}'${legendCondition.value}'`;
                else legendConditionString = `${legendConditionString} ${legendCondition.value}`;
                // eslint-disable-next-line no-loop-func
                createSingleGeojson(mapLayersClient, pgClient, connectionData, layerData, legendConditionString, legendCondition, (path) => {
                    if (legendCondition.active) {
                        count++;
                        paths.push(path);
                    }
                    if (count === legend.filter((el) => el.active).length) saveGeojsonsUrlsPaths(mapLayersClient, layerData, paths);
                });
            } else {
                const legendConditionString = ` AND ${layerData.style_field} IS NULL`;
                // eslint-disable-next-line no-loop-func
                createSingleGeojson(mapLayersClient, pgClient, connectionData, layerData, legendConditionString, legendCondition, (path) => {
                    if (legendCondition.active) {
                        count++;
                        paths.push(path);
                    }
                    if (count === legend.filter((el) => el.active).length) saveGeojsonsUrlsPaths(mapLayersClient, layerData, paths);
                });
            }
        }
    }
}

function createTriggersOnMapLayers(pgClient) {
    pgClient.query('CREATE OR REPLACE FUNCTION notify_layers_changes()'
        + ' RETURNS trigger as $$'
        + ' BEGIN'
        + ' PERFORM pg_notify('
        + "'layers_changed', "
        + 'row_to_json(NEW)::text'
        + ');'
        + ' RETURN NEW;'
        + ' END;'
        + ' $$ LANGUAGE plpgsql;');

    pgClient.query('DROP TRIGGER IF EXISTS layer_added ON public.map_layers;');
    pgClient.query('CREATE TRIGGER layer_added'
        + ' AFTER INSERT'
        + ' ON map_layers'
        + ' FOR EACH ROW'
        + ' EXECUTE PROCEDURE notify_layers_changes();');

    pgClient.query('DROP TRIGGER IF EXISTS layer_changed ON public.map_layers;');
    pgClient.query('CREATE TRIGGER layer_changed'
        + ' AFTER UPDATE'
        + ' OF filters, map_table_name, map_column_name, map_connection_id, style_legend ON map_layers'
        + ' FOR EACH ROW'
        + ' EXECUTE PROCEDURE notify_layers_changes();');
}

function saveLayer(pgClient, existingLayerClient, connectionData, layerData) {
    createTriggersOnLayerTable(existingLayerClient, layerData);
    createGeojson(pgClient, existingLayerClient, connectionData, layerData);

    const layerClientNotifyString = `${layerData.map_table_name}_${layerData.map_column_name}_changed`;
    existingLayerClient.query(`LISTEN ${layerClientNotifyString}`);
    existingLayerClient.on('notification', async (notification) => {
        // KEEP THIS ==
        if (notification.payload == layerData.id) {
            pgClient.query(`
            SELECT * FROM map_layers
            WHERE map_connection_id = ${connectionData.id} 
                AND map_table_name = '${layerData.map_table_name}' 
                AND map_column_name = '${layerData.map_column_name}'`)
                .then((res) => {
                    for (let layer of res.rows) {
                        layer = setFiltersStringOnLayer(layer);
                        createGeojson(pgClient, existingLayerClient, connectionData, layer);
                    }
                });
        }
    });
}

const layersClient = [];

const pgClient = new pg.Client({
    host: config.database.host,
    password: config.database.password,
    user: config.database.user,
    database: config.database.db,
    port: config.database.port,
});

layersClient.push({
    id: `${config.database.host}_${config.database.db}`,
    map_id: 1,
    client: pgClient,
    database: config.database.db,
    connected: true,
});

pgClient.connect((err) => {
    if (err) {
        console.log('connection error', err.stack);
    } else {
        console.log('connected');
        createTriggersOnMapLayers(pgClient);

        pgClient.query(''
            + 'SELECT map_layers.id, map_connection_id, map_table_name, map_column_name'
            + ', filters, geojson_url, map_groups.name as group_name, style_type, style_field,'
            + ' style_legend, features_safe_delete '
            + 'FROM map_layers '
            + 'LEFT JOIN map_groups ON map_layers.map_group_id = map_groups.id '
            + "WHERE type = 'geojson' OR type = 'opendatasoft'")
            .then((res) => {
                for (const row of res.rows) {
                    let layerData = row;
                    pgClient.query(`SELECT * FROM map_connections WHERE id =${layerData.map_connection_id}`)
                        .then((connectionRes) => {
                            if (connectionRes.rows.length > 0) {
                                const connectionData = connectionRes.rows[0];

                                let connection = layersClient.find((el) => el.id === `${connectionData.host}_${connectionData.name}`);
                                let existingLayerClient;
                                if (connection === undefined) {
                                    existingLayerClient = new pg.Client({
                                        host: connectionData.host,
                                        password: connectionData.password,
                                        user: connectionData.user,
                                        database: connectionData.name,
                                        port: connectionData.port,
                                    });
                                    connection = {
                                        id: `${connectionData.host}_${connectionData.name}`,
                                        map_id: connectionData.id,
                                        client: existingLayerClient,
                                        database: connectionData.name,
                                        connected: false,
                                    };
                                    layersClient.push(connection);
                                } else {
                                    existingLayerClient = connection.client;
                                    connection.connected = true;
                                }

                                layerData = setFiltersStringOnLayer(layerData);

                                if (connection.id === `${config.database.host}_${config.database.db}`) {
                                    saveLayer(pgClient, pgClient, connectionData, layerData);
                                } else if (!connection.connected) {
                                    // eslint-disable-next-line no-shadow
                                    existingLayerClient.connect((err) => {
                                        if (err) {
                                            console.log('connection error', err.stack);
                                        } else {
                                            connection.connected = true;
                                            saveLayer(pgClient, existingLayerClient, connectionData, layerData);
                                        }
                                    });
                                } else {
                                    saveLayer(pgClient, existingLayerClient, connectionData, layerData);
                                }
                            }
                        });
                }
            });

        pgClient.query('LISTEN layers_changed');
        pgClient.query('LISTEN layer_added');

        pgClient.on('notification', async (data) => {
            let payload = JSON.parse(data.payload);
            if (payload.map_connection_id && payload.map_table_name && payload.map_column_name) {
                pgClient.query(`SELECT * FROM map_connections WHERE id=${payload.map_connection_id} ORDER BY id DESC LIMIT 1`)
                    .then((res) => {
                        if (res.rows.length > 0) {
                            const connectionData = res.rows[0];
                            let connection = layersClient.find((el) => el.id === `${connectionData.host}_${connectionData.name}`);
                            let layerClient;

                            if (connection === undefined) {
                                layerClient = new pg.Client({
                                    host: connectionData.host,
                                    password: connectionData.password,
                                    user: connectionData.user,
                                    database: connectionData.name,
                                    port: connectionData.port,
                                });
                                connection = {
                                    id: `${connectionData.host}_${connectionData.name}`,
                                    map_id: connectionData.id,
                                    client: layerClient,
                                    database: connectionData.name,
                                    connected: false,
                                };
                                layersClient.push(connection);
                            } else {
                                layerClient = connection.client;
                            }

                            payload = setFiltersStringOnLayer(payload);

                            if (!connection.connected) {
                                // eslint-disable-next-line no-shadow
                                layerClient.connect((err) => {
                                    if (err) {
                                        console.log('connection error', err);
                                    } else {
                                        connection.connected = true;
                                        console.log('connected');
                                        saveLayer(pgClient, layerClient, connectionData, payload);
                                    }
                                });
                            } else {
                                saveLayer(pgClient, layerClient, connectionData, payload);
                            }
                        }
                    });
            }
        });
    }
});
