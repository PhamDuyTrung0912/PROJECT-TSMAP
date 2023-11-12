<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div>
        <div v-if="treeId">
            <span class="text-primary text-sm">
                Danh sách các thành viên dòng họ
                <span v-if="tableData.length > 0">({{ total }})</span>
            </span>
            <div class="grid grid-cols-12 gap-5 mb-2 pt-2">
                <div class="col-span-6">
                    <t-select v-model="treeUserId" :items="treeUsers" placeholder="Tìm kiếm tên thành viên" />
                </div>
                <div class="col-span-3 pt-2 text-xs">Tổng số nam: {{ countMale }}</div>
                <div class="col-span-3 pt-2 text-xs">Tổng số nữ: {{ countFemale }}</div>
            </div>
            <t-table :headers="tableHeadersTree" :data="paginatedData">
                <template #gender="{ row }">
                    {{ $utils.getGender(row.gender) }}
                </template>
                <template #birth_day="{ row }">
                    {{ $utils.formatDate(row.birth_day) }}
                </template>
                <template #death_day="{ row }">
                    {{ $utils.formatDate(row.death_day) }}
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
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import TPaginate from '../../../tailwind/TPaginate.vue';
import TSelect from '../../../tailwind/TSelect.vue';
import TTable from '../../../tailwind/TTable.vue';

export default {
    name: 'FamilyTableUser',
    props: {
        treeId: {
            type: Number,
        },
    },
    components: {
        TSelect,
        TTable,
        TPaginate,
    },
    data() {
        return {
            totalPages: 1,
            currentPage: 1,
            perPage: 5,
            total: 0,
            tableHeadersTree: [
                {
                    label: 'Họ và tên',
                    value: 'name',
                },
                {
                    label: 'Giới tính',
                    value: 'gender',
                    slot: true,
                },
                {
                    label: 'Ngày sinh',
                    value: 'birth_day',
                    slot: true,
                },
                {
                    label: 'Ngày mất',
                    value: 'death_day',
                    slot: true,
                },
            ],
            tableData: [],
            trees: [],
            treeUsers: [],
            dataTreeUsers: [],
            treeUserId: null,
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.tableData.slice(start, end);
        },
        countMale() {
            return this.tableData.filter((e) => e.gender === 'male').length;
        },
        countFemale() {
            return this.tableData.filter((e) => e.gender === 'female').length;
        },
    },
    watch: {
        treeId: {
            immediate: true,
            deep: true,
            handler(val) {
                if (val) {
                    console.log('treeId', this.treeId);
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
                    this.tableData = res.data;
                    this.total = this.tableData.length;
                    this.totalPages = Math.ceil(this.total / this.perPage);
                }
            });
        },
    },
    created() {},
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
