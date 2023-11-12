export default {
    setTempUser(state, data) {
        state.tempUser = data;
    },
    setTempMapUser(state, data) {
        state.tempMapUser = data;
    },
    setToken(state, token) {
        state.cartoToken = token;
    },
    reset(state) {
        state.tempUser = null;
        state.tempMapUser = null;
        state.cartoToken = null;
    },
};
