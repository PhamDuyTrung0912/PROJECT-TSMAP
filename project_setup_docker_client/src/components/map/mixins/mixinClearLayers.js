export default {
    methods: {
        mClearLayers() {
            if (this.mapInstance?.getMyLayer()) {
                this.mapInstance.getMyLayer().forEach((el) => {
                    if (this.mapInstance.mapbox.getLayer(el)) this.mapInstance.mapbox.removeLayer(el);
                });
            }
        },
        clearSelectLayersByName(layer) {
            if (this.mapInstance) {
                const tombFeatures = this.mapInstance.mapbox.querySourceFeatures(`${layer}_source`, {
                    sourceLayer: layer,
                });
                const reduceFeature = this.$utils.reduceDuplicateFeature(tombFeatures);

                reduceFeature.forEach((feature) => {
                    this.mapInstance.setStateFeature(`${layer}_source`, feature.id, 'selected', false);
                });
            }
        },
    },
};
