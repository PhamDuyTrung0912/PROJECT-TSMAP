<template>
    <v-container class="pa-0 h-screen overflow-auto" fluid>
        <!-- header -->
        <div class="flex h-[50px] w-full justify-between items-center">
            <div class="font-bold text-lg text-secondary">Danh sách phần mộ</div>
            <!-- <t-button
                width="w-[150px]"
                backgroundColor="bg-primary"
                fontColor="text-white"
                class="text-xs rounded-lg"
                label="Thêm nghĩa trang"
                height="h-[32px]" /> -->
        </div>
        <!-- content -->
        <div class="w-full pa-8 pt-1" style="height: calc(100vh - 100px)">
            <filter-tomb @updateForm="updateForm" />
            <div class="pt-2">
                <t-table :headers="tableHeaders" :data="tableData">
                    <template #status="{ row }">
                        {{ getStatus(row.status) }}
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
import FilterTomb from '../components/app/components/filter/FilterTomb.vue';
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
        FilterTomb,
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
                hoten: null,
                namsinh: null,
                namhysinh: null,
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
                    label: 'Họ tên',
                    value: 'hoten',
                },
                {
                    label: 'Năm sinh',
                    value: 'birth_day',
                    slot: true,
                },
                {
                    label: 'Năm mất',
                    value: 'death_day',
                    slot: true,
                },
                {
                    label: 'Tỉnh',
                    value: 'nguyenquantinh',
                },
                {
                    label: 'Huyện',
                    value: 'nguyenquanhuyen',
                },
                {
                    label: 'Xã',
                    value: 'nguyenquanxa',
                },
                {
                    label: 'Nghĩa trang',
                    object: true,
                    value: 'cemetery_name',
                    valueObject: 'name',
                    keyObject: 'cemetery',
                },
                {
                    label: 'Khu',
                    value: 'khu',
                },
                {
                    label: 'Số hàng',
                    value: 'hangmo',
                },
                {
                    label: 'Số mộ',
                    value: 'somo',
                },
                {
                    label: 'Trạng thái',
                    value: 'status',
                    slot: true,
                },
            ],
            tableData: [],
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
            this.getDataByFilter();
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
            apiService
                .getCemeteryByFilter({
                    ...this.formFilter,
                    limit: this.perPage,
                    offset: this.currentPage,
                })
                .then((res) => {
                    eventBus.$emit('loaded');
                    if (res.data) {
                        this.tableData = res.data.cemeteries;
                        this.total = res.data.count;
                        this.totalPages = Math.ceil(this.total / this.perPage);
                    }
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
