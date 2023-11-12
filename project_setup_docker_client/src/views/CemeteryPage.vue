<template>
    <v-container class="pa-0 h-screen overflow-auto" fluid>
        <!-- header -->
        <div class="flex h-[50px] w-full justify-between items-center">
            <div class="font-bold text-lg text-secondary">Danh sách nghĩa trang</div>
        </div>
        <!-- content -->
        <div class="w-full pa-8 pt-1" style="height: calc(100vh - 100px)">
            <filter-cim @updateForm="updateForm" />
            <div class="pt-2">
                <t-table :headers="tableHeaders" :data="tableData">
                    <template #district_name="{ row }">
                        <span v-if="row.district">
                            {{ $utils.formatName(row.district.name) }}
                        </span>
                    </template>
                    <template #ward_name="{ row }">
                        <span v-if="row.ward">
                            {{ $utils.formatName(row.ward.name) }}
                        </span>
                    </template>
                </t-table>
                <div class="mt-2">
                    <t-paginate
                        v-if="tableData.length > 0"
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
    </v-container>
</template>

<script>
import apiService from '../apiService';
import FilterCim from '../components/app/components/filter/FilterCim.vue';
// import TButton from '../components/tailwind/TButton.vue';
import TPaginate from '../components/tailwind/TPaginate.vue';
import TTable from '../components/tailwind/TTable.vue';
import eventBus from '../eventBus';

export default {
    name: 'CemeteryPage',
    components: {
        // TButton,
        TTable,
        TPaginate,
        FilterCim,
    },
    mixins: [],
    data() {
        return {
            totalPages: 1,
            currentPage: 1,
            perPage: 10,
            total: 0,
            formFilter: {
                cim_table: null,
                province_id: null,
                district_id: null,
                ward_id: null,
                status: null,
                limit: 10,
                offset: 0,
            },

            tableHeaders: [
                {
                    label: 'ID',
                    value: 'gid',
                },
                {
                    label: 'Tên',
                    value: 'name',
                },
                // {
                //     label: 'Tỉnh',
                //     value: 'province_name',
                //     object: true,
                //     valueObject: 'name',
                //     keyObject: 'province',
                // },
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
            tableDataAll: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        getStatus(status) {
            if (status === 'active') return 'Đã sử dụng';
            if (status === 'available') return 'Chưa sử dụng';
            return '';
        },
        updateForm(form) {
            this.formFilter = {
                ...this.formFilter,
                ...form,
            };
            this.tableData = this.tableDataAll.filter((e) => {
                if (this.formFilter.cim_table) {
                    if (this.formFilter.cim_table !== e.code) return false;
                }
                if (this.formFilter.province_id) {
                    if (this.formFilter.province_id !== e.province_id) return false;
                }
                if (this.formFilter.district_id) {
                    if (this.formFilter.district_id !== e.district_id) return false;
                }
                if (this.formFilter.ward_id) {
                    if (this.formFilter.ward_id !== e.ward_id) return false;
                }
                return true;
            });
        },
        onPageChange(page) {
            this.currentPage = page;
            this.getDataByFilter();
        },
        handleButtonClick() {
            // Xử lý sự kiện khi nút được bấm
            console.log('Button clicked');
        },
        getDataByFilter() {
            eventBus.$emit('loading');
            apiService.getCemeteryCountry().then((res) => {
                eventBus.$emit('loaded');
                this.tableData = res.data;
                this.tableDataAll = res.data;
                this.total = this.tableData.length;
                this.totalPages = Math.ceil(this.total / this.perPage);
            });
        },
    },
    created() {
        this.getDataByFilter();
    },
    beforeDestroy() {},
};
</script>

<style scoped></style>
