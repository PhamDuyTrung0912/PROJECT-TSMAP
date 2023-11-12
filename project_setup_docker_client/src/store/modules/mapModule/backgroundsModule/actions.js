import API from '../../../../mapService';

export default {
    setAll({ dispatch, commit }) {
        return API.getBackgrounds()
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
        return API.getBackgroundById(id)
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
        return API.addBackground(data)
            .then((res) => {
                commit('addOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateBackground(data)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    commit('updateMany', res.data);
                } else {
                    if (res.data.default) commit('resetDefault');
                    commit('updateOne', res.data);
                }
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteBackground(id)
            .then((res) => {
                commit('removeOne', id);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
