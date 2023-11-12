export default {
    setAll(state, attachments) {
        state.attachments = attachments;
    },
    setOne(state, attachment) {
        const indexItemToSet = state.attachments.findIndex((el) => el.id === attachment.id);
        if (indexItemToSet < 0) {
            state.attachments.push(attachment);
        } else {
            state.attachments.splice(indexItemToSet, 1, attachment);
        }
    },
    addOne(state, attachment) {
        state.attachments.push(attachment);
    },
    updateOne(state, attachment) {
        const itemToUpdate = state.attachments.findIndex((el) => el.id === attachment.id);
        if (itemToUpdate > -1) state.attachments.splice(itemToUpdate, 1, attachment);
        else state.attachments.push(attachment);
    },
    removeOne(state, id) {
        const itemToRemoveIndex = state.attachments.findIndex((el) => el.id === id);
        state.attachments.splice(itemToRemoveIndex, 1);
    },
};
