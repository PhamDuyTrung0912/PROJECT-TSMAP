export default {
    getAll(state) {
        return state.layers;
    },
    getById: (state) => (id) => state.layers.find((el) => el.id === id),
};
