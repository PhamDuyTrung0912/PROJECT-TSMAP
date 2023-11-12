import apiService from '../../../apiService';
import mapService from '../../../mapService';

export default {
    methods: {
        loadGlobalMarker() {
            apiService.getCemeteryCountry().then((result) => {
                const cemeteries = result.data;
                mapService.getLayers().then((res) => {
                    if (res.data) {
                        const layers = res.data;
                        layers.forEach((layer) => {
                            if (layer.name === 'cim_maker') {
                                fetch(`./assets/${layer.geojson_url}`).then((rs) => {
                                    rs.json().then((geo) => {
                                        if (geo) {
                                            // Kiểm tra nếu layer đã tồn tại
                                            if (!this.mapInstance.mapbox.getLayer('marker_point_layer')) {
                                                this.mapInstance.mapbox.loadImage('../images/point_cim.png', (error, image) => {
                                                    if (error) throw error;
                                                    this.mapInstance.mapbox.addImage('custom-marker', image);
                                                    this.mapInstance.mapbox.addSource('marker_point_layer_source', {
                                                        type: 'geojson',
                                                        data: {
                                                            ...geo,
                                                            features: geo.features.map((fe) => {
                                                                const maker = cemeteries.find((e) => fe.id === e.gid);
                                                                return {
                                                                    ...fe,
                                                                    properties: {
                                                                        title: maker.name,
                                                                    },
                                                                };
                                                            }),
                                                        },
                                                    });

                                                    // Add a symbol layer
                                                    this.mapInstance.mapbox.addLayer({
                                                        id: 'marker_point_layer',
                                                        type: 'symbol',
                                                        source: 'marker_point_layer_source',
                                                        layout: {
                                                            'icon-image': 'custom-marker',
                                                            'text-field': ['get', 'title'],
                                                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                                                            'text-offset': [0, 1.75],
                                                            'text-anchor': 'top',
                                                            'text-size': 12,
                                                            'icon-size': 0.75,
                                                        },
                                                        paint: {
                                                            'text-color': '#ab6f16',
                                                            'text-halo-color': 'white',
                                                            'text-halo-width': 2,
                                                            'text-halo-blur': 1,
                                                        },
                                                    });
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            });
        },
    },
};
