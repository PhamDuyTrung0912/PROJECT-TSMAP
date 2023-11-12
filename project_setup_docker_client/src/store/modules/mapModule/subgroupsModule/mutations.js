export default {
    setAll(state, subgroups) {
        state.subgroups = subgroups;
    },
    setSubgroupStates(state, subgroups) {
        for (const subgroup of subgroups) {
            const subgroupState = state.subgroupStates.find((el) => el.id === subgroup.id);
            if (subgroupState) {
                subgroupState.state = subgroup.state;
            } else {
                state.subgroupStates.push({
                    id: subgroup.id,
                    state: subgroup.state,
                    updated: false,
                });
            }
        }
    },
    setOne(state, subgroup) {
        const indexItemToSet = state.subgroups.findIndex((el) => el.id === subgroup.id);
        if (indexItemToSet < 0) {
            state.subgroups.push(subgroup);
        } else {
            state.subgroups.splice(indexItemToSet, 1, subgroup);
        }
    },
    addOne(state, subgroup) {
        state.subgroups.push(subgroup);
    },
    addSubgroupState(state, subgroup) {
        state.subgroupStates.push({
            id: subgroup.id,
            state: true,
            updated: false,
        });
    },
    updateOne(state, subgroup) {
        const itemToUpdate = state.subgroups.findIndex((el) => el.id === subgroup.id);
        if (itemToUpdate > -1) state.subgroups.splice(itemToUpdate, 1, subgroup);
        else state.subgroups.push(subgroup);
    },
    updateSubgroupState(state, data) {
        const itemToUpdate = state.subgroupStates.findIndex((el) => el.id === data.id);
        if (itemToUpdate > -1) {
            state.subgroupStates.splice(itemToUpdate, 1, {
                id: data.id,
                state: data.state,
                updated: true,
            });
        }
    },
    updateMany(state, subgroups) {
        for (const subgroup of subgroups) {
            const itemToUpdate = state.subgroups.findIndex((el) => el.id === subgroup.id);
            if (itemToUpdate > -1) state.subgroups.splice(itemToUpdate, 1, subgroup);
            else state.subgroups.push(subgroup);
        }
    },
    updateManySubgroupsStates(state, subgroupsStates) {
        for (const subgroupState of subgroupsStates) {
            const itemToUpdate = state.subgroupStates.findIndex((el) => el.id === subgroupState.id);
            if (itemToUpdate > -1) {
                state.subgroupStates.splice(itemToUpdate, 1, {
                    id: subgroupState.id,
                    state: subgroupState.state,
                    updated: true,
                });
            }
        }
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.subgroups.findIndex((el) => el.id === id);
        state.subgroups.splice(itemToRemoveIndex, 1);
    },
    reset(state) {
        state.subgroups = [];
        state.subgroupStates = [];
    },
};
