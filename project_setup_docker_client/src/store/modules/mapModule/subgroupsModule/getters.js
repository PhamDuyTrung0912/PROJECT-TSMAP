export default {
    getAll(state) {
        return state.subgroups;
    },
    getById: (state) => (id) => state.subgroups.find((el) => el.id === id),
    getSubgroupStates(state) {
        return state.subgroupStates;
    },
};
