import layers from './layersModule';
import groups from './groupsModule';
import subgroups from './subgroupsModule';
import projections from './projectionsModule';
import backgrounds from './backgroundsModule';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        backgrounds,
        layers,
        groups,
        subgroups,
        projections,
    },
};
