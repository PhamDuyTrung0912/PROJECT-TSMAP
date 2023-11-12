export default {
    setAll(state, groups) {
        state.groups = groups;
    },
    setGroupStates(state, groups) {
        for (const group of groups) {
            const groupState = state.groupStates.find((el) => el.id === group.id);
            if (groupState) {
                groupState.state = group.state;
            } else {
                state.groupStates.push({
                    id: group.id,
                    state: group.state,
                    updated: false,
                });
            }
        }
    },
    setOne(state, group) {
        const indexItemToSet = state.groups.findIndex((el) => el.id === group.id);
        if (indexItemToSet < 0) {
            state.groups.push(group);
        } else {
            state.groups.splice(indexItemToSet, 1, group);
        }
    },
    addOne(state, group) {
        state.groups.push(group);
    },
    addGroupState(state, group) {
        state.groupStates.push({
            id: group.id,
            state: true,
            updated: false,
        });
    },
    updateOne(state, group) {
        const itemToUpdate = state.groups.findIndex((el) => el.id === group.id);
        if (itemToUpdate > -1) state.groups.splice(itemToUpdate, 1, group);
        else state.groups.push(group);
    },
    updateGroupState(state, data) {
        const itemToUpdate = state.groupStates.findIndex((el) => el.id === data.id);
        if (itemToUpdate > -1) {
            state.groupStates.splice(itemToUpdate, 1, {
                id: data.id,
                state: data.state,
                updated: true,
            });
        }
    },
    updateMany(state, groups) {
        for (const group of groups) {
            const itemToUpdate = state.groups.findIndex((el) => el.id === group.id);
            if (itemToUpdate > -1) state.groups.splice(itemToUpdate, 1, group);
            else state.groups.push(group);
        }
    },
    removeOne(state, data) {
        const itemToRemoveIndex = state.groups.findIndex((el) => el.id === data.id);
        state.groups.splice(itemToRemoveIndex, 1);

        for (const group of data.groups) {
            const itemToUpdate = state.groups.findIndex((el) => el.id === group.id);
            if (itemToUpdate > -1) state.groups.splice(itemToUpdate, 1, group);
            else state.groups.push(group);
        }
    },
    reset(state) {
        state.groups = [];
        state.groupStates = [];
    },
};
