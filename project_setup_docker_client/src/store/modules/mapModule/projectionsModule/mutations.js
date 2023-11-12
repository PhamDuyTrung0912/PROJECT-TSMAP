export default {
    setAll(state, projections) {
        state.projections = projections;
    },
    setOne(state, projection) {
        const indexItemToSet = state.projections.findIndex((el) => el.id === projection.id);
        if (indexItemToSet < 0) {
            state.projections.push(projection);
        } else {
            state.projections.splice(indexItemToSet, 1, projection);
        }
    },
    addOne(state, projection) {
        state.projections.push(projection);
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.projections.findIndex((el) => el.id === id);
        state.projections.splice(itemToRemoveIndex, 1);
    },
    reset(state) {
        state.projections = [];
    },
};
