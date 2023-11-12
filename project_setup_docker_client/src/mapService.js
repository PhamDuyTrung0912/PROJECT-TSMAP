import axios from 'axios';
import store from './store';

function getParamsString(data) {
    let paramsString = '';
    let index = 0;
    if (data !== null) paramsString += '?';
    for (const property in data) {
        if (property) {
            if (index > 0) paramsString += '&';
            paramsString += property;
            paramsString += '=';
            paramsString += data[property];
            index++;
        }
    }
    return paramsString;
}

class MAPService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
        });
        this.axios.interceptors.request.use((config) => {
            const token = store.getters.getToken;
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            return config;
        });
    }

    genericCall(method, uri, form) {
        return this.axios[method](uri, form);
    }

    indexResources() {
        return this.axios.get('api/map/index/resources');
    }

    indexSymbols() {
        return this.axios.get('api/map/index/symbols');
    }

    indexUsers() {
        return this.axios.get('api/map/index/users');
    }

    getLogs() {
        return this.axios.get('api/map/logs');
    }

    // BACKGROUNDS
    getBackgrounds() {
        return this.axios.get('api/map/backgrounds');
    }

    getBackgroundById(id) {
        return this.axios.get(`api/map/backgrounds/${id}`);
    }

    addBackground(data) {
        return this.axios.post('api/map/backgrounds', data);
    }

    updateBackground(data) {
        return this.axios.patch(`api/map/backgrounds/${data.id}`, data.form);
    }

    deleteBackground(id) {
        return this.axios.delete(`api/map/backgrounds/${id}`);
    }

    // CATEGORIES
    getCategories() {
        return this.axios.get('api/map/categories');
    }

    getCategoryById(id) {
        return this.axios.get(`api/map/categories/${id}`);
    }

    addCategory(data) {
        return this.axios.post('api/map/categories', data);
    }

    updateCategory(data) {
        return this.axios.patch(`api/map/categories/${data.id}`, data.form);
    }

    deleteCategory(id) {
        return this.axios.delete(`api/map/categories/${id}`);
    }

    // CONFIG

    getConfig(path) {
        return path ? this.axios.get(`api/map/config?path=${path}`) : this.axios.get('api/map/config');
    }

    getGeoserverCapabilities() {
        return this.axios.get('api/map/config/geoserverCapabilities');
    }

    updateConfig(data, path = null) {
        return path ? this.axios.post(`api/map/config?path=${path}`, data) : this.axios.post('api/map/config', data);
    }

    // CONNECTIONS

    getConnections() {
        return this.axios.get('api/map/connections');
    }

    getConnectionById(id) {
        return this.axios.get(`api/map/connections/${id}`);
    }

    addConnection(data) {
        return this.axios.post('api/map/connections', data);
    }

    updateConnection(data) {
        return this.axios.patch(`api/map/connections/${data.id}`, data.form);
    }

    deleteConnection(id) {
        return this.axios.delete(`api/map/connections/${id}`);
    }

    getColumnsByTableName(db, name) {
        return this.axios.get(`api/map/connections/${db}/${name}`);
    }

    // DIALOGS

    getInfoDialog(data) {
        return this.axios.post('api/map/dialogs/show', {
            data: JSON.stringify(data),
        });
    }

    getCompleteDialog(data) {
        return this.axios.post('api/map/dialogs/complete', data);
    }

    getEditDialog(data) {
        return this.axios.post('api/map/dialogs/edit', {
            data: JSON.stringify(data),
        });
    }

    getRemoveDialog(data) {
        return this.axios.post('api/map/dialogs/delete', {
            data: JSON.stringify(data),
        });
    }

    getDigthroughDialog(data) {
        return this.axios.post('api/map/dialogs/digthrough', data);
    }

    getDialogsByLayer(id) {
        return this.axios.get(`api/map/dialogs/layer/${id}`);
    }

    searchOnMap(data) {
        return this.axios.post('api/map/dialogs/searchOnMap', data);
    }

    // FEATURES
    createFeature(data) {
        return this.axios.post('api/map/features', data);
    }

    updateFeature(data) {
        return this.axios.post('api/map/features/update', data);
    }

    deleteFeature(data) {
        return this.axios.delete(`api/map/features${getParamsString(data)}`);
    }

    // FILTERS
    getFilterItems(data) {
        return this.axios.post('api/map/filters/items', data);
    }

    applyFilters(data) {
        return this.axios.post('api/map/filters/apply', data);
    }

    getSelectItems(data) {
        return this.axios.post('api/map/filters/select', data);
    }

    // GROUPS
    getGroups() {
        return this.axios.get('api/map/groups');
    }

    getGroupById(id) {
        return this.axios.get(`api/map/groups/${id}`);
    }

    addGroup(data) {
        return this.axios.post('api/map/groups', data);
    }

    updateGroup(data) {
        return this.axios.patch(`api/map/groups/${data.id}`, data.form);
    }

    deleteGroup(id) {
        return this.axios.delete(`api/map/groups/${id}`);
    }

    // IMPORTS
    importShapefile(data) {
        return this.axios.post('api/map/import/shapefile', data);
    }

    importGpx(data) {
        return this.axios.post('api/map/import/gpx', data);
    }

    importDxf(data) {
        return this.axios.post('api/map/import/dxf', data);
    }

    getCsvColumns(data) {
        return this.axios.post('api/map/import/csv/columns', data);
    }

    importCsv(data) {
        return this.axios.post('api/map/import/csv', data);
    }

    // LAYERS
    getLayers() {
        return this.axios.get('api/map/layers');
    }

    getLayerById(id) {
        return this.axios.get(`api/map/layers/${id}`);
    }

    getGeojsons() {
        return this.axios.get('api/geojsons');
    }

    getGeojsonByPath(path) {
        return this.axios.get(`api/geojsons/${path}`);
    }

    getArcgisToken(id) {
        return this.axios.get(`api/map/layers/token/${id}`);
    }

    addLayer(data) {
        return this.axios.post('api/map/layers', data);
    }

    updateLayer(data) {
        return this.axios.patch(`api/map/layers/${data.id}`, data.form);
    }

    deleteLayer(id) {
        return this.axios.delete(`api/map/layers/${id}`);
    }

    // LOGIN
    login(data) {
        return this.axios.post('api/map/login', data)
            .then((res) => res.data.user)
            .catch((err) => {
                throw err;
            });
    }

    loginByToken(data) {
        return this.axios.get('api/map/loginByToken', {
            headers: {
                Authorization: `Bearer ${data}`,
            },
        })
            .then((res) => res.data)
            .catch((err) => {
                throw err;
            });
    }

    logout() {
        return this.axios.post('api/map/logout');
    }

    // OPENDATASOFT
    getDatasetByUid(uid) {
        return this.axios.get(`api/map/opendatasoft/dataset/${uid}`);
    }

    refreshOpendatasoftDataset(layerId) {
        return this.axios.post(`api/map/opendatasoft/dataset/refresh/${layerId}`);
    }

    createOpendatasoftDataset(data) {
        return this.axios.post('api/map/opendatasoft/dataset', data);
    }

    updateOpendatasoftDataset(data) {
        return this.axios.patch(`api/map/opendatasoft/dataset/${data.id}`, data.form);
    }

    deleteOpendatasoftDataset(layerId) {
        return this.axios.delete(`api/map/opendatasoft/dataset/${layerId}`);
    }

    // OPENDATASOFTAPIS
    getOpendatasoftApis() {
        return this.axios.get('api/map/opendatasoftapis');
    }

    getOpendatasoftApiById(id) {
        return this.axios.get(`api/map/opendatasoftapis/${id}`);
    }

    addOpendatasoftApi(data) {
        return this.axios.post('api/map/opendatasoftapis', data);
    }

    updateOpendatasoftApi(data) {
        return this.axios.patch(`api/map/opendatasoftapis/${data.id}`, data.form);
    }

    deleteOpendatasoftApi(id) {
        return this.axios.delete(`api/map/opendatasoftapis/${id}`);
    }

    // PROJECTIONS
    getProjections() {
        return this.axios.get('api/map/projections');
    }

    getProjectionById(id) {
        return this.axios.get(`api/map/projections/${id}`);
    }

    addProjection(data) {
        return this.axios.post('api/map/projections', data);
    }

    deleteProjection(id) {
        return this.axios.delete(`api/map/projections/${id}`);
    }

    // RELEASE
    getReleases() {
        return this.axios.get('api/map/releases');
    }

    getReleaseById(id) {
        return this.axios.get(`api/map/releases/${id}`);
    }

    addRelease(data) {
        return this.axios.post('api/map/releases', data);
    }

    checkRelease(id) {
        return this.axios.post(`api/map/releases/check/${id}`);
    }

    deleteRelease(id) {
        return this.axios.delete(`api/map/releases/${id}`);
    }

    // ROLES
    getRoles() {
        return this.axios.get('api/map/roles');
    }

    getRoleById(id) {
        return this.axios.get(`api/map/roles/${id}`);
    }

    addRole(data) {
        return this.axios.post('api/map/roles', data);
    }

    updateRole(data) {
        return this.axios.post(`api/map/roles/${data.id}`, data);
    }

    deleteRole(id) {
        return this.axios.delete(`api/map/roles/${id}`);
    }

    // SAVEDLAYERSSTATES
    getPublicSavedLayersStates() {
        return this.axios.get('api/map/savedLayerStates/public');
    }

    getSavedLayersStatesByUserId(id) {
        return this.axios.get(`api/map/savedLayerStates/userId/${id}`);
    }

    getSavedLayerStatesById(id) {
        return this.axios.get(`api/map/savedLayerStates/${id}`);
    }

    addSavedLayerStates(data) {
        return this.axios.post('api/map/savedLayerStates', data);
    }

    updateSavedLayerStates(data) {
        return this.axios.patch(`api/map/savedLayerStates/${data.id}`, data.form);
    }

    deleteSavedLayerStates(id) {
        return this.axios.delete(`api/map/savedLayerStates/${id}`);
    }

    // SEARCHES
    getSearches() {
        return this.axios.get('api/map/searches');
    }

    getSearchItems(id) {
        return this.axios.get(`api/map/searches/${id}/items`);
    }

    getSearchById(id) {
        return this.axios.get(`api/map/searches/${id}`);
    }

    getSearchedItem(data) {
        return this.axios.post('api/map/searches/getItem', data);
    }

    addSearch(data) {
        return this.axios.post('api/map/searches', data);
    }

    updateSearch(data) {
        return this.axios.patch(`api/map/searches/${data.id}`, data.form);
    }

    deleteSearch(id) {
        return this.axios.delete(`api/map/searches/${id}`);
    }

    // SHAPEFILES
    exportShapefile(data) {
        return this.axios.post('api/map/layers/shapefile', data, {
            responseType: 'blob',
        });
    }

    // SUBGROUPS
    getSubgroups() {
        return this.axios.get('api/map/subgroups');
    }

    getSubgroupById(id) {
        return this.axios.get(`api/map/subgroups/${id}`);
    }

    addSubgroup(data) {
        return this.axios.post('api/map/subgroups', data);
    }

    updateSubgroup(data) {
        return this.axios.patch(`api/map/subgroups/${data.id}`, data.form);
    }

    deleteSubgroup(id) {
        return this.axios.delete(`api/map/subgroups/${id}`);
    }

    // SYMBOLS
    getSymbols() {
        return this.axios.get('api/map/symbols');
    }

    getSymbolById(id) {
        return this.axios.get(`api/map/symbols/${id}`);
    }

    addSymbol(data) {
        return this.axios.post('api/map/symbols', data);
    }

    deleteSymbol(id) {
        return this.axios.delete(`api/map/symbols/${id}`);
    }

    // TABLES
    getTables() {
        return this.axios.get('api/map/tables');
    }

    addTable(data) {
        return this.axios.post('api/map/tables', data);
    }

    updateTable(data) {
        return this.axios.post(`api/map/tables/${data.id}`, data.form);
    }

    // USERS
    getUsers() {
        return this.axios.get('api/map/users');
    }

    getUserById(id) {
        return this.axios.get(`api/map/users/${id}`);
    }

    addUser(data) {
        return this.axios.post('api/map/users', data);
    }

    checkEmail(data) {
        return this.axios.post('api/map/email/check', data)
            .then((res) => res)
            .catch((err) => {
                throw err;
            });
    }

    updateUser(data) {
        return this.axios.post(`api/map/users/${data.id}`, data);
    }

    deleteUser(id) {
        return this.axios.delete(`api/map/users/${id}`);
    }
}

export default new MAPService();
