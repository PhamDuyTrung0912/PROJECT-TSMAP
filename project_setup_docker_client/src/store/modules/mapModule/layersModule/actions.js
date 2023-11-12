import API from '../../../../mapService';

export default {
    setAll({ dispatch, commit }) {
        return API.getLayers()
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
        return API.getLayerById(id)
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
        return API.addLayer(data)
            .then((res) => {
                const dataCopy = { ...res.data };
                dataCopy.geojsons = undefined;
                commit('addOne', dataCopy);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateLayer(data)
            .then((res) => {
                if (res.data.layers) {
                    commit('updateMany', res.data.layers);
                    commit('map/subgroups/updateMany', res.data.subgroups, {
                        root: true,
                    });
                } else {
                    const dataCopy = { ...res.data };
                    dataCopy.geojsons = undefined;
                    commit('updateOne', dataCopy);
                }
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteLayer(id)
            .then((res) => {
                commit('removeOne', { id });
                commit('updateMany', res.data.layers);
                commit('map/subgroups/updateMany', res.data.subgroups, {
                    root: true,
                });
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
