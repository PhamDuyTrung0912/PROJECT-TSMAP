export default {
    getAll(state) {
        return state.projections;
    },
    getById: (state) => (id) => state.projections.find((el) => el.id === id),
};
