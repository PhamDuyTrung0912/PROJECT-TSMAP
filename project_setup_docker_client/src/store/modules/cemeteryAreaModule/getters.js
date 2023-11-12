export default {
    getAll(state) {
        return state.cemeteryAreas;
    },
    getById: (state) => (id) => state.cemeteryAreas.find((el) => el.id === id),
};
