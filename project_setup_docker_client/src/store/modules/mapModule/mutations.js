export default {
    changeRoute(state, route) {
        state.route = route;
    },
    setMapFunctionActive(state, active) {
        state.mapFunctionActive = active;
    },
    setMapUser(state, user) {
        state.mapUser = user;
    },
    unsetMapUser(state) {
        state.mapUser = null;
    },
    setGeolocated(state, data) {
        state.geolocated = data;
    },
    setFullscreen(state, data) {
        state.fullscreen = data;
    },
    reset(state) {
        state.mapFunctionActive = false;
        state.mapUser = null;
        state.geolocated = false;
        state.fullscreen = false;
        state.route = 'login';
    },
    setConfig(state, config) {
        state.config = config;
    },
};
