export default {
    setAll(state, backgrounds) {
        state.backgrounds = backgrounds;
    },
    setOne(state, background) {
        const indexItemToSet = state.backgrounds.findIndex((el) => el.id === background.id);
        if (indexItemToSet < 0) {
            state.backgrounds.push(background);
        } else {
            state.backgrounds.splice(indexItemToSet, 1, background);
        }
    },
    addOne(state, background) {
        state.backgrounds.push(background);
    },
    updateOne(state, background) {
        const itemToUpdate = state.backgrounds.findIndex((el) => el.id === background.id);
        if (itemToUpdate > -1) state.backgrounds.splice(itemToUpdate, 1, background);
        else state.backgrounds.push(background);
    },
    updateMany(state, backgrounds) {
        for (const background of backgrounds) {
            const itemToUpdate = state.backgrounds.findIndex((el) => el.id === background.id);
            if (itemToUpdate > -1) state.backgrounds.splice(itemToUpdate, 1, background);
            else state.backgrounds.push(background);
        }
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.backgrounds.findIndex((el) => el.id === id);
        state.backgrounds.splice(itemToRemoveIndex, 1);
    },
    reset(state) {
        state.backgrounds = [];
    },
    resetDefault(state) {
        for (const background of state.backgrounds) {
            background.default = false;
        }
    },
    setBackgroundCurrent(state, current) {
        state.backgroundsCurrent = current;
    },
};
