export default {
    getCurrentRoute(state) {
        return state.route;
    },
    getMapFunctionActive(state) {
        return state.mapFunctionActive;
    },
    getMapUser(state) {
        return state.mapUser;
    },
    getGeolocated(state) {
        return state.geolocated;
    },
    getFullscreen(state) {
        return state.fullscreen;
    },
    getConfig(state) {
        return state.config;
    },
};
