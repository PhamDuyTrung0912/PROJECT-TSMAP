export default {
    getAll(state) {
        return state.groups;
    },
    getById: (state) => (id) => state.groups.find((el) => el.id === id),
    getGroupStates(state) {
        return state.groupStates;
    },
};
