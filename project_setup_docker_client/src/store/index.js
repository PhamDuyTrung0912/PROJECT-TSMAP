import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import map from './modules/mapModule';
import cemeterySingleTypeModule from './modules/cemeterySingleTypeModule';
import cemeteryAreaModule from './modules/cemeteryAreaModule';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        map,
        cemeterySingleTypes: cemeterySingleTypeModule,
        cemeteryAreas: cemeteryAreaModule,
    },
    plugins: [createPersistedState({
        key: process.env.STORAGE_KEY,
        storage: sessionStorage,
    })],

});
