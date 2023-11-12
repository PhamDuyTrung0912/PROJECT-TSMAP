export default {
    getAll(state) {
        return state.cemeterySingleTypes;
    },
    getById: (state) => (id) => state.cemeterySingleTypes.find((el) => el.id === id),
};
