import mapService from '../../../mapService';

export default {
    methods: {
        getDataLayers() {
            mapService.getLayers().then((res) => {
                if (res.data) {
                    const data = res.data;
                    this.dataGeoJson = [];
                    let dataPushGeoJson = [];
                    data.forEach((e) => {
                        if (e.geotype === 'polygon' && e.name === this.cemeterySelected.code) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'fill-extrusion-color': [
                                                'case',
                                                ['==', ['feature-state', 'selected'], true],
                                                '#C23B01',
                                                ['==', ['feature-state', 'active'], true],
                                                '#475569',
                                                ['==', ['feature-state', 'available'], true],
                                                '#006600',
                                                '#7B8795',
                                            ],
                                            'fill-extrusion-height': 0.4,
                                            'fill-extrusion-base': 0.0,
                                            'fill-extrusion-opacity': 1,
                                            // 'fill-extrusion-pattern': [
                                            //     'case',
                                            //     ['==', ['feature-state', 'selected'], true],
                                            //     'pattern-cim-selected',
                                            //     ['==', ['feature-state', 'active'], true],
                                            //     'pattern-cim-active',
                                            //     ['==', ['feature-state', 'available'], true],
                                            //     'pattern-cim-available',
                                            //     'pattern-cim-active',
                                            // ],
                                        },
                                    },
                                    type: 'fill-extrusion',
                                });
                            }
                        } else if (e.geotype === 'polygon' && e.name === `${this.cemeterySelected.code}_floor2`) {
                            dataPushGeoJson.push({
                                id: e.id + 1000,
                                z_index: e.z_index,
                                path: `./assets/${e.geojson_url}`,
                                name: `${e.name}fl2`,
                                style: {
                                    paint: {
                                        'fill-extrusion-color': [
                                            'case',
                                            ['==', ['feature-state', 'selected'], true],
                                            '#cc0000',
                                            ['==', ['feature-state', 'active'], true],
                                            '#475569',
                                            ['==', ['feature-state', 'available'], true],
                                            '#006600',
                                            '#475569',
                                        ],
                                        'fill-extrusion-height': 0.8,
                                        'fill-extrusion-base': 0.4,
                                        'fill-extrusion-opacity': 1,
                                    },
                                },
                                type: 'fill-extrusion',
                            });
                        } else if (e.geotype === 'polygon' && e.name === `${this.cemeterySelected.code}_zone`) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'fill-color': ['case', ['==', ['feature-state', 'selected'], true], '#ad7923', '#8c7d73'],
                                            'fill-opacity': 0.5,
                                        },
                                    },
                                    type: 'fill',
                                });
                            }
                        } else if (e.geotype === 'line' && e.name === `${this.cemeterySelected.code}_street`) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'line-color': '#ad7958',
                                            'line-opacity': 0.4,
                                        },
                                    },
                                    type: 'line',
                                });
                            }
                        } else if (e.geotype === 'polygon' && e.name === `${this.cemeterySelected.code}_wall`) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index + 50,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'fill-extrusion-color': '#d6caa7',
                                            'fill-extrusion-height': 2,
                                            'fill-extrusion-base': 0,
                                            'fill-extrusion-opacity': 1,
                                            'fill-extrusion-pattern': 'pattern-wall',
                                        },
                                    },
                                    type: 'fill-extrusion',
                                });
                            }
                        } else if (e.geotype === 'point' && e.name === `${this.cemeterySelected.code}_street_point`) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                fetch(`./assets/${e.geojson_url}`).then((rs) => {
                                    rs.json().then((geo) => {
                                        if (geo) {
                                            this.arrayPointStreets = geo.features.map((g) => g.geometry.coordinates);
                                        }
                                    });
                                });
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'circle-color': '#e28743', // Màu của điểm
                                            'circle-radius': 2, // Bán kính của điểm
                                            'circle-opacity': 0, // Độ trong suốt
                                        },
                                    },
                                    type: 'circle',
                                });
                            }
                        } else if (e.geotype === 'point' && e.name === `${this.cemeterySelected.code}_street_row`) {
                            if (this.dataGeoJsonActive.includes(e.name)) {
                                fetch(`./assets/${e.geojson_url}`).then((rs) => {
                                    rs.json().then((geo) => {
                                        if (geo) {
                                            this.arrayPointRows = geo.features.map((g) => g.geometry.coordinates);
                                        }
                                    });
                                });
                                dataPushGeoJson.push({
                                    id: e.id,
                                    z_index: e.z_index,
                                    path: `./assets/${e.geojson_url}`,
                                    name: e.name,
                                    style: {
                                        paint: {
                                            'circle-color': '#2596be', // Màu của điểm
                                            'circle-radius': 2, // Bán kính của điểm
                                            'circle-opacity': 0, // Độ trong suốt
                                        },
                                    },
                                    type: 'circle',
                                });
                            }
                        }
                    });
                    // Sắp xếp mảng dataGeoJson theo thuộc tính z_index (tăng dần)
                    dataPushGeoJson = dataPushGeoJson.sort((a, b) => (a.z_index > b.z_index ? 1 : -1));
                    console.log('dataPushGeoJson', dataPushGeoJson);
                    this.dataGeoJson = dataPushGeoJson;
                    this.loaded = true;
                }
            });
        },
    },
};
