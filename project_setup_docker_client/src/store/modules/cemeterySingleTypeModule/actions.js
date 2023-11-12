import API from '../../../apiService';

export default {
    setAll({ commit }) {
        return API.getCemeterySingleType()
            .then((res) => {
                commit('setAll', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    setOne({ commit }, id) {
        return API.getCemeterySingleTypeById(id)
            .then((res) => {
                commit('setOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    addOne({ commit }, data) {
        return API.addCemeterySingleType(data)
            .then((res) => {
                commit('addOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    updateOne({ commit }, data) {
        return API.updateCemeterySingleType(data)
            .then((res) => {
                commit('updateOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteCemeterySingleType(id)
            .then((res) => {
                commit('removeOne', id);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
