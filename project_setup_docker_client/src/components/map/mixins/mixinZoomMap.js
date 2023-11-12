export default {
    methods: {
        zoomMap(coordinates, zoom = 20, pitch = 50) {
            this.mapInstance.mapbox.flyTo({
                center: coordinates,
                essential: true,
                zoom,
                pitch,
                duration: 1000,
                bearing: 0,
            });
        },
    },
};
