import API from '../../../apiService';

export default {
    setAll({ dispatch, commit }) {
        return API.getAttachments()
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
        return API.getAttachmentById(id)
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
        return API.addAttachment(data)
            .then((res) => {
                commit('addOne', res.data);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
    removeOne({ commit }, id) {
        return API.deleteAttachment(id)
            .then((res) => {
                commit('removeOne', id);
                return res.data;
            })
            .catch((e) => {
                throw e;
            });
    },
};
