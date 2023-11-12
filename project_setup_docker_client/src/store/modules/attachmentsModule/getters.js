export default {
    getAll(state) {
        return state.attachments;
    },
    getById: (state) => (id) => state.attachments.find((el) => el.id === id),
};
