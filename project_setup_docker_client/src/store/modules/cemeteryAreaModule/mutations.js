export default {
    setAll(state, cemeteryAreas) {
        state.cemeteryAreas = cemeteryAreas;
    },
    setOne(state, cemeteryArea) {
        const indexItemToSet = state.cemeteryAreas.findIndex((el) => el.id === cemeteryArea.id);
        if (indexItemToSet < 0) {
            state.cemeteryAreas.push(cemeteryArea);
        } else {
            state.cemeteryAreas.splice(indexItemToSet, 1, cemeteryArea);
        }
    },
    addOne(state, cemeteryArea) {
        state.cemeteryAreas.push(cemeteryArea);
    },
    updateOne(state, cemeteryArea) {
        const itemToUpdate = state.cemeteryAreas.findIndex((el) => el.id === cemeteryArea.id);
        if (itemToUpdate > -1) state.cemeteryAreas.splice(itemToUpdate, 1, cemeteryArea);
        else state.cemeteryAreas.push(cemeteryArea);
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.cemeteryAreas.findIndex((el) => el.id === id);
        state.cemeteryAreas.splice(itemToRemoveIndex, 1);
    },
};
