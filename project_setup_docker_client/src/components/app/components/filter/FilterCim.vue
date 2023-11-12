<template>
    <div class="w-full top-0 right-0 bg-white border border-solid border-gray-200 ct-transition-filter-hide z-20 rounded-lg">
        <div class="px-2 grid grid-cols-12">
            <div class="my-3 px-1 col-span-3" @click="setDataCemeteries()">
                <!-- <span class="text-xs text-secondary">Nghĩa trang</span> -->
                <t-select class="mt-1" :items="cemeteries" v-model="formFilter.cim_table" placeholder="Chọn nghĩa trang" />
            </div>
            <div class="my-3 px-2 col-span-3" @click="setDataProvinces()">
                <!-- <span class="text-xs text-secondary">Thành phố</span> -->
                <t-select class="mt-1" :items="provinces" placeholder="Thành phố" v-model="formFilter.province_id" />
            </div>
            <div class="my-3 px-2 col-span-3" @click="setDataDistricts()">
                <!-- <span class="text-xs text-secondary">Quận huyện</span> -->
                <t-select
                    class="mt-1"
                    :disabled="!formFilter.province_id"
                    :items="districts"
                    placeholder="Quận huyện"
                    v-model="formFilter.district_id" />
            </div>
            <div class="my-3 px-2 col-span-3" @click="setDataWards()">
                <!-- <span class="text-xs text-secondary">Phường/xã</span> -->
                <t-select class="mt-1" :disabled="!formFilter.district_id" :items="wards" placeholder="Phường/xã" v-model="formFilter.ward_id" />
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import TSelect from '../../../tailwind/TSelect.vue';

export default {
    components: { TSelect },
    name: 'FilterTomb',
    data() {
        return {
            cemeteries: [],
            provinces: [],
            districts: [],
            wards: [],
            formFilter: {
                hoten: null,
                namsinh: null,
                namhysinh: null,
                province_id: null,
                district_id: null,
                ward_id: null,
                status: null,
                cim_table: null,
            },
            statusItems: [
                {
                    text: 'Đã sử dụng',
                    value: 'active',
                },
                {
                    text: 'Chưa sử dụng',
                    value: 'available',
                },
            ],
        };
    },
    props: {
        show: {},
    },
    computed: {
        stateFilterDrawer() {
            return this.show ? 'ct-transition-filter-show' : 'ct-transition-filter-hide';
        },
        yearItems() {
            const years = [];
            for (let year = 1800; year <= new Date().getFullYear(); year++) {
                years.push({ text: year.toString(), value: year });
            }
            return years.sort((a, b) => b.value - a.value);
        },
    },
    watch: {
        formFilter: {
            immediate: false,
            deep: true,
            handler() {
                this.$emit('updateForm', this.formFilter);
            },
        },
    },
    methods: {
        getDataCemeteries() {
            apiService.getCemeterySelect().then((res) => {
                if (res.data) {
                    this.cemeteriesData = res.data;
                    this.cemeteries = res.data.map((e) => ({
                        text: `${e.name}, ${this.$utils.formatName(e.ward?.name)}, ${this.$utils.formatName(
                            e.district?.name,
                        )}, ${this.$utils.formatName(e.province?.name)}`,
                        value: e.code,
                    }));
                }
            });
        },
        getDataProvinces() {
            apiService.getProvinces().then((res) => {
                if (res.data) {
                    this.provinces = res.data.map((e) => ({
                        text: e.name,
                        value: e.id,
                    }));
                }
            });
        },
        getDataDistricts() {
            apiService.getDistrictsByProvice(this.formFilter.province_id).then((res) => {
                if (res.data) {
                    this.districts = res.data.map((e) => ({
                        text: e.name,
                        value: e.id,
                    }));
                }
            });
        },
        getDataWards() {
            apiService.getWardsByDistrict(this.formFilter.district_id).then((res) => {
                if (res.data) {
                    this.wards = res.data.map((e) => ({
                        text: e.name,
                        value: e.id,
                    }));
                }
            });
        },
        setDataCemeteries() {
            if (this.cemeteries.length === 0) {
                this.getDataCemeteries();
            }
        },
        setDataProvinces() {
            if (this.provinces.length === 0) {
                this.getDataProvinces();
            }
        },
        setDataDistricts() {
            if (this.formFilter.province_id) {
                this.getDataDistricts();
            }
        },
        setDataWards() {
            if (this.formFilter.district_id) {
                this.getDataWards();
            }
        },
        clearFilter() {
            this.formFilter = {
                namsinh: null,
                namhysinh: null,
                province_id: null,
                district_id: null,
                ward_id: null,
            };
            this.formCim = {
                province_id: null,
                cemeteryId: null,
            };
        },
    },
    created() {},
};
</script>

<style scoped></style>
