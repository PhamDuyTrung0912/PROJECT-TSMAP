export default {
    setAll(state, layers) {
        state.layers = layers;
    },
    setOne(state, layer) {
        const indexItemToSet = state.layers.findIndex((el) => el.id === layer.id);
        if (indexItemToSet < 0) {
            state.layers.push(layer);
        } else {
            state.layers.splice(indexItemToSet, 1, layer);
        }
    },
    addOne(state, layer) {
        state.layers.push(layer);
    },
    updateOne(state, layer) {
        const itemToUpdate = state.layers.findIndex((el) => el.id === layer.id);
        if (itemToUpdate > -1) state.layers.splice(itemToUpdate, 1, layer);
        else state.layers.push(layer);
    },
    updateMany(state, layers) {
        for (const layer of layers) {
            const itemToUpdate = state.layers.findIndex((el) => el.id === layer.id);
            if (itemToUpdate > -1) state.layers.splice(itemToUpdate, 1, layer);
            else state.layers.push(layer);
        }
    },
    removeOne(state, data) {
        const itemToRemoveIndex = state.layers.findIndex((el) => el.id === data.id);
        state.layers.splice(itemToRemoveIndex, 1);
    },
    reset(state) {
        state.layers = [];
    },
};
