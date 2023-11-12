import API from '../../../../mapService';

export default {
    setAll({ dispatch, commit }) {
        return API.getGroups()
            .then((res) => {
                commit('setAll', res.data);
                commit('setGroupStates', res.data);
                return res.data;
            })
            .catch((e) => {
                if (e.response === undefined) dispatch('setOfflineMode', true, { root: true });
                throw e;
            });
    },
    setOne({ dispatch, commit }, id) {
        return API.getGroupById(id)
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
        return API.addGroup(data)
            .then((res) => {
                commit('addOne', res.data);
                commit('addGroupState', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateGroup(data)
            .then((res) => {
                if (Array.isArray(res.data)) commit('updateMany', res.data);
                else commit('updateOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateGroupState({ commit, rootState }, data) {
        commit('updateGroupState', data);
        const subgroups = rootState.map.subgroups.subgroups;
        const groupSubgroups = subgroups.filter((el) => el.map_group_id === data.id);
        const groupSubgroupsStates = groupSubgroups.map((el) => ({
            id: el.id,
            state: data.state,
            updated: true,
        }));
        if (!data.ignoreSubgroups) {
            commit('map/subgroups/updateManySubgroupsStates', groupSubgroupsStates, {
                root: true,
            });
        }
    },
    resetGroupStates({ commit, rootState }) {
        const groups = rootState.map.groups.groups;
        for (const group of groups) {
            commit('updateGroupState', {
                id: group.id,
                state: false,
            });
        }
        const subgroups = rootState.map.subgroups.subgroups;
        for (const subgroup of subgroups) {
            commit('map/subgroups/updateSubgroupState', {
                id: subgroup.id,
                state: false,
            }, { root: true });
        }
    },
    removeOne({ commit, rootState }, id) {
        return API.deleteGroup(id)
            .then((res) => {
                const layers = rootState.map.layers.layers;
                const layersToRemove = layers.filter((el) => el.map_group_id === id);
                for (const layerToRemove of layersToRemove) {
                    const itemToRemoveIndex = layers.findIndex((el) => el.id === layerToRemove.id);
                    rootState.map.layers.layers.splice(itemToRemoveIndex, 1);
                }
                commit('removeOne', {
                    id,
                    groups: res.data,
                });
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
