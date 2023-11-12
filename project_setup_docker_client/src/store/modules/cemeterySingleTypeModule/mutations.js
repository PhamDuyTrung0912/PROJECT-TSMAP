export default {
    setAll(state, cemeterySingleTypes) {
        state.cemeterySingleTypes = cemeterySingleTypes;
    },
    setOne(state, cemeterySingleType) {
        const indexItemToSet = state.cemeterySingleTypes.findIndex((el) => el.id === cemeterySingleType.id);
        if (indexItemToSet < 0) {
            state.cemeterySingleTypes.push(cemeterySingleType);
        } else {
            state.cemeterySingleTypes.splice(indexItemToSet, 1, cemeterySingleType);
        }
    },
    addOne(state, cemeterySingleType) {
        state.cemeterySingleTypes.push(cemeterySingleType);
    },
    updateOne(state, cemeterySingleType) {
        const itemToUpdate = state.cemeterySingleTypes.findIndex((el) => el.id === cemeterySingleType.id);
        if (itemToUpdate > -1) state.cemeterySingleTypes.splice(itemToUpdate, 1, cemeterySingleType);
        else state.cemeterySingleTypes.push(cemeterySingleType);
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.cemeterySingleTypes.findIndex((el) => el.id === id);
        state.cemeterySingleTypes.splice(itemToRemoveIndex, 1);
    },
};
