import API from '../../../../mapService';

export default {
    setAll({ dispatch, commit }) {
        return API.getProjections()
            .then((res) => {
                commit('setAll', res.data);
                return res.data;
            })
            .catch((e) => {
                if (e.response === undefined) dispatch('setOfflineMode', true, { root: true });
                throw e;
            });
    },
    setOne({ dispatch, commit }, id) {
        return API.getProjectionById(id)
            .then((res) => {
                commit('setOne', res.data);
                return res.data;
            })
            .catch((e) => {
                dispatch('setOfflineMode', true, { root: true });
                throw e;
            });
    },
    addOne({ commit }, data) {
        return API.addProjection(data)
            .then((res) => {
                commit('addOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteProjection(id)
            .then((res) => {
                commit('removeOne', id);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
