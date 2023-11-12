<!-- eslint-disable max-len -->
<template>
    <div class="h-full w-[408px] fixed bg-[#F5F3F3] z-10" :class="widthMap">
        <div class="h-[90px] flex flex-col justify-center">
            <div class="font-bold text-sm text-secondary pl-6 mb-1">Tra cứu phần mộ</div>
            <div>
                <div class="flex items-center justify-center">
                    <t-input width="w-[256px]" v-model="nameSearch" placeholder="Nhập họ tên..." icon="mdi-magnify" class="mx-2" />
                    <t-button
                        @click="handleFilter"
                        class="text-sm font-bold mx-2 mt-1"
                        fontColor="text-secondary"
                        icon="mdi-filter"
                        label="Lọc"
                        height="h-[32px]"
                        width="w-[88px]" />
                </div>
            </div>
        </div>
        <v-divider class="my-0" />
        <div v-if="cemeteriesFiltered.length > 0" class="flex flex-col items-center py-5">
            <card-list ref="cardList" :cemeteriesFiltered="cemeteriesFiltered" @triggerLoading="loadingCemeteriesFiltered" />
        </div>
        <div v-else class="mx-auto w-[273px] mt-4">
            <div class="text-center">
                <span class="mdi mdi-magnify text-[60px] text-ctext"></span>
                <div class="text-[#55686D] font-bold text-sm">Tra cứu với TS MAP</div>
                <div class="text-[#55686D] text-xs">
                    Hãy bắt đầu bằng cách nhập thông tin hoặc mã mộ phần. Sử dụng bộ lọc nâng cao để tìm kiếm hiệu quả hơn.
                </div>
            </div>
        </div>
        <div
            @click="$emit('toggleDrawer')"
            style="box-shadow: 5px 0 5px -5px #cecece"
            class="flex items-center h-[75px] w-[28px] absolute top-1/2 -translate-y-[75px] -right-[20px] bg-[#F5F3F3] rounded-r-2xl cursor-pointer">
            <span v-show="showDrawer" class="mdi mdi-chevron-left text-[30px] text-secondary"></span>
            <span v-show="!showDrawer" class="mdi mdi-chevron-right text-[30px] text-secondary"></span>
        </div>

        <!-- Filter advantage -->
        <filter-drawer @updateForm="updateForm" :show="showFilter" @close="closeFilterDrawer" />
        <!-- Overlay -->
        <div v-if="showFilter" class="w-[408px] h-full bg-black opacity-25 z-10 absolute top-0 right-0"></div>
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import eventBus from '../../../../eventBus';
import TButton from '../../../tailwind/TButton';
import TInput from '../../../tailwind/TInput';
import CardList from '../card/CardList.vue';
import FilterDrawer from './filterDrawer.vue';

export default {
    components: {
        TInput,
        TButton,
        CardList,
        FilterDrawer,
    },
    props: {
        showDrawer: {},
    },
    data() {
        return {
            cemeteryGid: null,
            cemeteriesFiltered: [],
            showFilter: false,
            formFilter: {
                cim_table: null,
                hoten: null,
                birth_day: null,
                namhysinh: null,
                province_id: null,
                district_id: null,
                ward_id: null,
                status: 'active',
                limit: 10,
                offset: 0,
            },
            itemPerPage: 10,
            inputTimeout: null,
            nameSearch: null,
        };
    },
    computed: {
        widthMap() {
            return this.showDrawer ? 'ct-transition-drawer-show' : ' ct-transition-drawer-hide';
        },
    },
    watch: {
        nameSearch: {
            immediate: false,
            handler(val) {
                clearTimeout(this.inputTimeout);
                this.inputTimeout = setTimeout(() => {
                    this.nameSearch = val;
                    this.formFilter.hoten = val;
                    if (this.nameSearch) {
                        this.getDataByFilter();
                    } else {
                        this.cemeteriesFiltered = [];
                    }
                }, 500);
            },
        },
    },
    methods: {
        resetForm() {
            this.formFilter = {
                cim_table: null,
                hoten: null,
                birth_day: null,
                namhysinh: null,
                province_id: null,
                district_id: null,
                ward_id: null,
                status: null,
                limit: 10,
                offset: 0,
            };
            this.cemeteriesFiltered = [];
        },
        updateForm(form) {
            this.formFilter = {
                ...this.formFilter,
                ...form,
            };
            this.getDataByFilter();
        },
        loadingCemeteriesFiltered() {
            this.formFilter = {
                ...this.formFilter,
                limit: this.formFilter.limit + this.itemPerPage,
                offset: this.formFilter.offset + this.itemPerPage,
            };
            apiService
                .getCemeteryByFilter(this.formFilter)
                .then((res) => {
                    if (res.data) {
                        this.cemeteriesFiltered = [...this.cemeteriesFiltered, ...res.data.cemeteries];
                        this.$refs.cardList.loading = false;
                    }
                })
                .catch(() => {
                    this.$refs.cardList.loading = false;
                });
        },
        getDataByFilter() {
            apiService.getCemeteryByFilter(this.formFilter).then((res) => {
                if (res.data) {
                    this.cemeteriesFiltered = res.data.cemeteries;
                    this.showFilter = false;
                }
            });
        },
        handleFilter() {
            this.resetForm();
            this.showFilter = true;
        },
        closeFilterDrawer() {
            this.showFilter = false;
        },
    },
    created() {
        eventBus.$on('resetFormFilter', this.resetForm);
        eventBus.$on('updateFormFilter', this.updateForm);
    },
    beforeDestroy() {
        eventBus.$off('resetFormFilter', this.resetForm);
        eventBus.$off('updateFormFilter', this.updateForm);
    },
};
</script>

<style scoped>
.ct-transition-drawer-show {
    transform: translateX(0px);
    transition: all 0.5s;
}
.ct-transition-drawer-hide {
    transform: translateX(-408px);
    transition: all 0.5s;
}
</style>
