<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="grid grid-cols-12 gap-2">
            <div class="h-screen text-medium col-span-4 text-secondary mb-1">
                <family-table @updateData="updateData" />
            </div>
            <div class="h-screen text-medium col-span-8 text-secondary mb-1">
                <family-tree @updateNodeTree="updateNodeTree" v-if="treeId && loaded" :treeId="treeId" :dataTreeUsers="dataTreeUsers" />
                <div v-else class="flex justify-center pt-20">
                    <div>
                        <span>Vui lòng lựa chọn một dòng họ bất kì</span>
                        <img class="object-cover w-[200px] rounded-full mx-auto" :src="$utils.apiAsset('images/norecordfound.png')" alt="nodata" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FamilyTable from '../components/app/components/tree/FamilyTable.vue';
import FamilyTree from '../components/app/components/tree/FamilyTree.vue';

export default {
    components: { FamilyTable, FamilyTree },
    data() {
        return {
            treeId: null,
            dataTreeUsers: [],
            loaded: false,
            treeUserId: null,
        };
    },
    methods: {
        updateNodeTree(id) {
            this.treeUserId = id;
        },
        updateData(data) {
            if (data) {
                this.treeId = data.treeId;
                this.dataTreeUsers = data.dataTreeUsers.map((e) => ({
                    ...e,
                    pids: e.pids ? JSON.parse(e.pids) : null,
                }));
                this.loaded = true;
            }
        },
    },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
