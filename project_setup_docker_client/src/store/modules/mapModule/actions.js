import mapBus from '../../../mapBus';
import mapService from '../../../mapService';

export default {
    changeRoute({ commit }, data) {
        mapBus.$emit('closeDrawer');
        commit('changeRoute', data);
    },
    setMapFunctionActive({ commit }, data) {
        commit('setMapFunctionActive', data);
    },
    setMapUser({ commit }, data) {
        commit('setMapUser', data);
        return data;
    },
    unsetMapUser({ commit }) {
        commit('unsetMapUser');
    },
    setGeolocated({ commit }, data) {
        commit('setGeolocated', data);
    },
    indexResources({ commit }, mapId) {
        return mapService.indexResources()
            .then((res) => {
                commit('map/groups/setAll', res.data.groups, { root: true });
                commit('map/groups/setGroupStates', res.data.groups, { root: true });
                commit('map/subgroups/setAll', res.data.subgroups, { root: true });
                commit('map/subgroups/setSubgroupStates', res.data.subgroups, { root: true });
                commit('map/layers/setAll', res.data.layers, { root: true });
                commit('map/projections/setAll', res.data.projections, { root: true });
                commit('map/backgrounds/setAll', res.data.backgrounds, { root: true });
                mapBus.$emit('mapResourcesLoaded', mapId);
            });
    },
    setFullscreen({ commit }, data) {
        commit('setFullscreen', data);
    },
    setConfig({ commit }, path = null) {
        return mapService.getConfig(path)
            .then((res) => {
                commit('setConfig', res.data);
            });
    },
    reset({ commit }) {
        commit('map/backgrounds/reset', null, { root: true });
        commit('map/groups/reset', null, { root: true });
        commit('map/layers/reset', null, { root: true });
        commit('map/projections/reset', null, { root: true });
        commit('map/subgroups/reset', null, { root: true });
        commit('map/reset', null, { root: true });
    },
};
