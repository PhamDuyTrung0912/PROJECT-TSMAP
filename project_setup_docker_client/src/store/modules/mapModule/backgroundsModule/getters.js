export default {
    getAll(state) {
        return state.backgrounds;
    },
    getById: (state) => (id) => state.backgrounds.find((el) => el.id === id),

    getBackgroundCurrent(state) {
        return state.backgroundsCurrent;
    },
};
