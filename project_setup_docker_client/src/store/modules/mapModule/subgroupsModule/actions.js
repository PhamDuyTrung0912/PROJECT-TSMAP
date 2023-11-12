import API from '../../../../mapService';

export default {
    setAll({ dispatch, commit }) {
        return API.getSubgroups()
            .then((res) => {
                commit('setAll', res.data);
                commit('setSubgroupStates', res.data);
                return res.data;
            })
            .catch((e) => {
                if (e.response === undefined) dispatch('setOfflineMode', true, { root: true });
                throw e;
            });
    },
    setOne({ dispatch, commit }, id) {
        return API.getSubgroupById(id)
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
        return API.addSubgroup(data)
            .then((res) => {
                commit('addOne', res.data);
                commit('addSubgroupState', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateSubgroup(data)
            .then((res) => {
                if (res.data.subgroups) {
                    commit('updateMany', res.data.subgroups);
                    commit('map/layers/updateMany', res.data.layers, {
                        root: true,
                    });
                } else commit('updateOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateSubgroupState({ commit }, data) {
        commit('updateSubgroupState', data);
    },
    removeOne({ commit, rootState }, id) {
        return API.deleteSubgroup(id)
            .then((res) => {
                const layers = rootState.map.layers.layers;
                const layersToRemove = layers.filter((el) => el.map_subgroup_id === id);
                for (const layerToRemove of layersToRemove) {
                    const itemToRemoveIndex = layers.findIndex((el) => el.id === layerToRemove.id);
                    rootState.map.layers.layers.splice(itemToRemoveIndex, 1);
                }
                commit('removeOne', id);
                commit('updateMany', res.data.subgroups);
                commit('map/layers/updateMany', res.data.layers, {
                    root: true,
                });
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
