<template>
    <div class="w-[360px] h-full p absolute top-0 right-0 bg-white ct-transition-filter-hide z-20" :class="[stateFilterDrawer]">
        <div class="flex items-end justify-between h-[40px] px-3 py-2">
            <div class="text-sm text-secondary">Bộ lọc tìm kiếm</div>
            <span class="mdi mdi-close text-[20px] cursor-pointer text-cgrey" @click="$emit('close')"></span>
        </div>
        <v-divider />
        <div class="px-2 mt-2">
            <div class="text-xs text-primary my-3">Thông tin</div>

            <div class="my-3" @click="setDataProvinces()">
                <span class="text-xs text-secondary">Thành phố</span>
                <t-select class="mt-1" :items="provinces" placeholder="Thành phố" v-model="formFilter.province_id" />
            </div>
            <div class="my-3" @click="setDataDistricts()">
                <span class="text-xs text-secondary">Quận huyện</span>
                <t-select
                    class="mt-1"
                    :disabled="!formFilter.province_id"
                    :items="districts"
                    placeholder="Quận huyện"
                    v-model="formFilter.district_id" />
            </div>
            <div class="my-3" @click="setDataWards()">
                <span class="text-xs text-secondary">Phường/xã</span>
                <t-select class="mt-1" :disabled="!formFilter.district_id" :items="wards" placeholder="Phường/xã" v-model="formFilter.ward_id" />
            </div>
            <div class="grid grid-cols-1 gap-4 my-3">
                <div>
                    <span class="text-xs text-secondary">Họ tên</span>
                    <t-input v-model="formFilter.hoten" placeholder="Nhập họ tên" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 my-3">
                <div>
                    <span class="text-xs text-secondary">Năm sinh</span>
                    <t-select class="mt-1" :items="yearItems" v-model="formFilter.birth_day" placeholder="Năm sinh" />
                </div>
                <div>
                    <span class="text-xs text-secondary">Năm mất</span>
                    <t-select class="mt-1" :items="yearItems" v-model="formFilter.namhysinh" placeholder="Năm mất" />
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 my-3">
                <div>
                    <span class="text-xs text-secondary">Hàng mộ</span>
                    <t-input number="number" v-model="formFilter.hangmo" placeholder="Nhập số hàng mộ" />
                </div>
                <div>
                    <span class="text-xs text-secondary">Cột mộ</span>
                    <t-input number="number" v-model="formFilter.somo" placeholder="Nhập số cột mộ" />
                </div>
            </div>
        </div>
        <v-divider />
        <div class="px-2 mt-2">
            <div class="text-xs text-primary my-3">Trạng thái mộ phần</div>
            <div class="my-3">
                <span class="text-xs text-secondary">Trạng thái mộ</span>
                <t-select v-model="formFilter.status" height="h-[80px]" :items="statusItems" class="mt-1" placeholder="Lựa chọn trạng thái" />
            </div>
        </div>
        <v-divider />
        <div class="p-[10px]">
            <div class="grid grid-cols-2 gap-4">
                <t-button
                    @click="clearFilter()"
                    class="text-xs border-primary border rounded-lg border-solid"
                    fontColor="text-primary"
                    label="Thiết lập lại"
                    height="h-[32px]"></t-button>
                <t-button
                    @click="updateFormFilter()"
                    backgroundColor="bg-primary"
                    fontColor="text-white"
                    class="text-xs rounded-lg"
                    label="Áp dụng"
                    height="h-[32px]" />
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import TButton from '../../../tailwind/TButton';
import TInput from '../../../tailwind/TInput.vue';
import TSelect from '../../../tailwind/TSelect.vue';

export default {
    components: { TButton, TSelect, TInput },
    data() {
        return {
            provinces: [],
            districts: [],
            wards: [],
            formFilter: {
                hoten: null,
                birth_day: null,
                namhysinh: null,
                province_id: null,
                district_id: null,
                ward_id: null,
                status: null,
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
    methods: {
        updateFormFilter() {
            this.$emit('updateForm', this.formFilter);
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
                birth_day: null,
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

<style scoped>
.ct-transition-filter-hide {
    transform: translateX(-360px);
    opacity: 0;
    transition: all 0.2s;
}

.ct-transition-filter-show {
    transform: translateX(0px);
    opacity: 100%;
    transition: all 0.2s;
}
</style>
