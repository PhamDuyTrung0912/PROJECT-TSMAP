<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div class="mt-[10px] m-[10px]">
        <span class="text-primary text-sm">
            Danh sách các dòng họ <span v-if="tableData.length > 0">({{ total }})</span>
        </span>
        <div class="grid grid-cols-12 mb-2 pt-2 gap-2">
            <div class="col-span-3">
                <t-button
                    width="w-[100px]"
                    @click="showDialogTree()"
                    backgroundColor="bg-primary"
                    fontColor="text-white"
                    class="text-xs rounded-lg"
                    label="Thêm mới"
                    height="h-[28px]" />
            </div>
            <div class="col-span-12">
                <t-select v-model="treeId" :items="trees" placeholder="Tìm kiếm tên dòng họ" />
            </div>
        </div>
        <div>
            <t-table :headers="tableHeadersTree" :data="paginatedData">
                <template #district_name="{ row }">
                    {{ $utils.formatName(row.district.name) }}
                </template>
                <template #ward_name="{ row }">
                    {{ $utils.formatName(row.ward.name) }}
                </template>
            </t-table>
            <div class="mt-2">
                <t-paginate
                    v-if="paginatedData.length > 0"
                    :pagination="{
                        per_page: perPage,
                        total: total,
                        total_pages: totalPages,
                    }"
                    :current-page="currentPage"
                    @pagechanged="onPageChange" />
            </div>
        </div>
        <div v-if="treeId">
            <family-table-user :treeId="treeId" />
        </div>
        <family-dialog-tree @updateSelectTree="getDataTrees" ref="FamilyDialogTree" />
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import TButton from '../../../tailwind/TButton.vue';
import TPaginate from '../../../tailwind/TPaginate.vue';
import TSelect from '../../../tailwind/TSelect.vue';
import TTable from '../../../tailwind/TTable.vue';
import FamilyDialogTree from './FamilyDialogTree.vue';
import FamilyTableUser from './FamilyTableUser.vue';

export default {
    components: {
        TSelect,
        TButton,
        FamilyDialogTree,
        TTable,
        TPaginate,
        FamilyTableUser,
    },
    data() {
        return {
            totalPages: 1,
            currentPage: 1,
            perPage: 5,
            total: 0,
            tableHeadersTree: [
                {
                    label: 'ID',
                    value: 'id',
                },
                {
                    label: 'Tên dòng họ',
                    value: 'name',
                },
                {
                    label: 'Tỉnh',
                    value: 'province_name',
                    object: true,
                    valueObject: 'name',
                    keyObject: 'province',
                },
                {
                    label: 'Huyện',
                    value: 'district_name',
                    object: true,
                    valueObject: 'name',
                    keyObject: 'district',
                    slot: true,
                },
                {
                    label: 'Xã',
                    value: 'ward_name',
                    object: true,
                    valueObject: 'name',
                    keyObject: 'ward',
                    slot: true,
                },
            ],
            tableData: [],
            trees: [],
            treeUsers: [],
            dataTreeUsers: [],
            treeId: null,
            treeUserId: null,
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.tableData.slice(start, end);
        },
    },
    watch: {
        treeId: {
            handler(val) {
                if (val) {
                    this.$emit('updateData', {
                        treeId: this.treeId,
                        dataTreeUsers: this.dataTreeUsers,
                    });
                    this.getDataTreeUsers();
                }
            },
        },
    },
    methods: {
        onPageChange(page) {
            this.currentPage = page;
        },
        showDialogTree() {
            this.$refs.FamilyDialogTree.toggleModal();
        },
        getDataTrees() {
            apiService.getTree().then((res) => {
                if (res.data) {
                    this.trees = res.data.map((e) => ({
                        text: `${e.name}, ${this.$utils.formatName(e.ward?.name)}, ${this.$utils.formatName(
                            e.district?.name,
                        )}, ${this.$utils.formatName(e.province?.name)}`,
                        value: e.id,
                    }));
                    if (!this.treeId && this.trees.length > 0) {
                        this.treeId = this.trees[0].value;
                    }
                    this.tableData = res.data;
                    this.total = this.tableData.length;
                    this.totalPages = Math.ceil(this.total / this.perPage);
                }
            });
        },
        getDataTreeUsers() {
            apiService.getTreeUserByTree(this.treeId).then((res) => {
                if (res.data) {
                    this.dataTreeUsers = res.data;
                    this.$emit('updateData', {
                        treeId: this.treeId,
                        dataTreeUsers: this.dataTreeUsers,
                    });
                    this.treeUsers = res.data.map((e) => ({
                        text: e.name,
                        value: e.id,
                    }));
                }
            });
        },
    },
    created() {
        this.getDataTrees();
    },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
