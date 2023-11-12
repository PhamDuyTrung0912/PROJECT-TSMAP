import mapBus from '../../../mapBus';

export default {
    methods: {
        mlTileMap(style) {
            if (this.mapInstance) {
                this.mapInstance.mapbox.setStyle(style);
            }
        },
    },
    created() {
        mapBus.$on('mlTileMap', this.mlTileMap);
    },
    beforeDestroy() {
        mapBus.$off('mlTileMap', this.mlTileMap);
    },
};
