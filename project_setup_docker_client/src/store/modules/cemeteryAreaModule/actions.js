import API from '../../../apiService';

export default {
    setAll({ commit }) {
        return API.getCemeteryArea()
            .then((res) => {
                commit('setAll', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    setOne({ commit }, id) {
        return API.getCemeteryAreaById(id)
            .then((res) => {
                commit('setOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    addOne({ commit }, data) {
        return API.addCemeteryArea(data)
            .then((res) => {
                commit('addOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateCemeteryArea(data)
            .then((res) => {
                commit('updateOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteCemeteryArea(id)
            .then((res) => {
                commit('removeOne', id);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
