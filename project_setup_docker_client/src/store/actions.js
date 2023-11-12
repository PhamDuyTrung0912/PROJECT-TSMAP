import API from '../apiService';

export default {
    setTempUser({ commit }, data) {
        commit('setTempUser', data);
    },
    setTempMapUser({ commit }, data) {
        commit('setTempMapUser', data);
    },
    setToken({ commit }, data) {
        commit('setToken', data);
    },
    indexResources() {
    // Index store resources of the project
        return true;
    },
    resetStore({ dispatch, commit }) {
        commit('reset');
        dispatch('map/reset');
    },

    indexCemeteries({ commit }) {
        return API.indexCemeteries()
            .then((res) => {
                commit('cemeterySingleTypes/setAll', res.data.cemetery_single_type);
                commit('cemeteryAreas/setAll', res.data.cemetery_area);
            });
    },
};
