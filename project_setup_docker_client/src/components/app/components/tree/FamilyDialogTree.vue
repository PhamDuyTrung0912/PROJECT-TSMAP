<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="fixed z-50 overflow-y-auto top-0 w-full left-0" id="modal-tree" :class="{ hidden: !isModalOpen }">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div
                    class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline">
                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <span class="text-primary text-sm">Thêm mới dòng họ</span>
                        <button
                            @click="toggleModal()"
                            type="button"
                            class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                            data-hs-overlay="#hs-focus-management-modal">
                            <span class="sr-only">Close</span>
                            <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                    fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div class="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                        <div class="mb-2" @click="setDataProvinces()">
                            <span class="text-xs text-secondary">Thành phố</span>
                            <t-select :items="provinces" placeholder="Thành phố" v-model="form.province_id" />
                        </div>
                        <div class="mb-2" @click="setDataDistricts()">
                            <span class="text-xs text-secondary">Quận huyện</span>
                            <t-select :disabled="!form.province_id" :items="districts" placeholder="Quận huyện" v-model="form.district_id" />
                        </div>
                        <div class="mb-2" @click="setDataWards()">
                            <span class="text-xs text-secondary">Phường/xã</span>
                            <t-select :disabled="!form.district_id" :items="wards" placeholder="Phường/xã" v-model="form.ward_id" />
                        </div>
                        <div>
                            <span class="text-xs text-secondary">Tên dòng họ</span>
                            <t-input paddingClear="pr-3" v-model="form.name" placeholder="Nhập tên dòng họ" />
                        </div>
                    </div>
                    <div class="px-5 py-3 text-right">
                        <div class="grid grid-cols-4 gap-4">
                            <t-button
                                @click="saveTree()"
                                backgroundColor="bg-primary"
                                fontColor="text-white"
                                class="text-xs rounded-lg"
                                label="Thêm mới"
                                height="h-[28px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import TButton from '../../../tailwind/TButton.vue';
import TInput from '../../../tailwind/TInput.vue';
import TSelect from '../../../tailwind/TSelect.vue';

export default {
    components: { TSelect, TInput, TButton },
    props: {},
    data() {
        return {
            isModalOpen: false,
            provinces: [],
            districts: [],
            wards: [],
            form: {
                province_id: null,
                district_id: null,
                ward_id: null,
                name: null,
            },
        };
    },
    computed: {
        checkValid() {
            for (const key in this.form) {
                if (Object.prototype.hasOwnProperty.call(this.form, key)) {
                    if (this.form[key] === null || this.form[key] === undefined) {
                        return false; // Trả về false nếu có một thuộc tính không có giá trị
                    }
                }
            }
            return true; // Trả về true nếu tất cả các thuộc tính đều
        },
    },
    watch: {},
    methods: {
        resetForm() {
            this.form = {
                province_id: null,
                district_id: null,
                ward_id: null,
                name: null,
            };
        },
        saveTree() {
            apiService.addTree(this.form).then((res) => {
                if (res.data) {
                    this.$emit('updateSelectTree');
                    this.toggleModal();
                }
            });
        },

        toggleModal() {
            // Khi gọi hàm này, đảo ngược giá trị của isModalOpen để mở/đóng modal
            this.isModalOpen = !this.isModalOpen;
            if (!this.isModalOpen) {
                this.resetForm();
            }
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
            apiService.getDistrictsByProvice(this.form.province_id).then((res) => {
                if (res.data) {
                    this.districts = res.data.map((e) => ({
                        text: e.name,
                        value: e.id,
                    }));
                }
            });
        },
        getDataWards() {
            apiService.getWardsByDistrict(this.form.district_id).then((res) => {
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
            if (this.form.province_id) {
                this.getDataDistricts();
            }
        },
        setDataWards() {
            if (this.form.district_id) {
                this.getDataWards();
            }
        },
    },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
