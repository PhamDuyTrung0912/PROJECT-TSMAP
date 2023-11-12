<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="fixed z-50 overflow-y-auto top-0 w-full left-0" id="modal-tree" :class="{ hidden: !isModalOpen }">
            <div v-if="isModalOpen" class="flex items-center justify-center min-height-100vh pt-2 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div
                    class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline">
                    <div class="flex border-solid border-gray-200 rounded-b justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <span class="text-gray-900 text-sm">Cập nhật thông tin</span>
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
                    <div class="p-3 space-y-3">
                        <div>
                            <div class="photo-wrapper p-2">
                                <img
                                    id="previewImg"
                                    class="object-cover w-36 h-36 rounded-full mx-auto"
                                    :src="
                                        nodeSelected.photo
                                            ? nodeSelected.photo
                                            : nodeSelected.gender === 'male'
                                            ? $utils.apiAsset('images/male.jpg')
                                            : $utils.apiAsset('images/female.jpg')
                                    "
                                    alt="John Doe" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <div class="col-span-12">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                <input
                                    v-model="form.name"
                                    id="name"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required />
                            </div>
                        </div>
                        <div class="grid grid-cols-12 gap-1">
                            <div class="col-span-6 pr-0">
                                <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                <t-datepicker :defaultDate="this.form.birth_day" @updateValueDate="updateDateBirthday" />
                            </div>
                            <div class="col-span-6 pl-2">
                                <label for="deathday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày mất</label>
                                <t-datepicker :defaultDate="this.form.death_day" @updateValueDate="updateDateDeathday" />
                            </div>
                        </div>
                        <div class="grid grid-cols-12" v-if="form.birth_day">
                            <div class="col-span-6 pr-2 text-xs">
                                {{ $utils.getLunarDate(form.birth_day) }}
                            </div>
                             <div class="col-span-6 pl-2 text-xs">
                                {{ $utils.getLunarDate(form.death_day) }}
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <div class="col-span-12">
                                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ </label>
                                <input
                                    v-model="form.address"
                                    id="address"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required />
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <div class="col-span-12">
                                <div class="flex items-center justify-center w-full">
                                    <label
                                        for="dropzone-file"
                                        class="flex flex-col items-center justify-center w-full h-[100px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                class="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16">
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                <span class="">Tải file lên</span>
                                            </p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input @change="getFileUploaded()" id="dropzone-file" type="file" class="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center p-6 space-x-2 border-t border-solid border-gray-200 rounded-b">
                        <button
                            @click="saveNode()"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Lưu
                        </button>
                        <button
                            @click="toggleModal()"
                            id="closeModalButton"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '../../../../apiService';
import eventBus from '../../../../eventBus';
import TDatepicker from '../../../tailwind/TDatepicker.vue';

export default {
    components: { TDatepicker },
    props: {
        nodeSelected: {
            type: Object,
        },
        treeId: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            fileUploaded: null,
            isModalOpen: false,
            form: {
                uid: null,
                id: null,
                name: null,
                fid: null,
                mid: null,
                pids: [],
                birth_day: null,
                death_day: null,
                address: null,
                gender: null,
                photo: null,
                tree_id: this.treeId,
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
    watch: {
        nodeSelected: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.form = {
                        ...this.form,
                        ...this.nodeSelected,
                    };
                }
            },
        },
    },
    methods: {
        resetForm() {
            this.form = {
                uid: null,
                id: null,
                name: null,
                fid: null,
                mid: null,
                pids: [],
                birth_day: null,
                death_day: null,
                address: null,
                gender: null,
                photo: null,
                tree_id: this.treeId,
            };
            this.fileUploaded = null;
            // const output = document.getElementById('previewImg');
            // output.onload = () => {
            //     URL.revokeObjectURL(output.src); // free memory
            // };
        },
        updateDateBirthday(date) {
            const newdate = date.split('-').reverse().join('-');
            this.form.birth_day = newdate;
        },
        updateDateDeathday(date) {
            const newdate = date.split('-').reverse().join('-');
            this.form.death_day = newdate;
        },
        toggleModal() {
            this.isModalOpen = !this.isModalOpen;
            if (!this.isModalOpen) {
                this.resetForm();
                this.$emit('resetFormTree');
            }
        },
        getFileUploaded() {
            const fileVal = document.getElementById('dropzone-file').files;
            if (fileVal?.length > 0) {
                this.fileUploaded = fileVal[0];
                const output = document.getElementById('previewImg');
                output.src = URL.createObjectURL(this.fileUploaded);
                output.onload = () => {
                    URL.revokeObjectURL(output.src); // free memory
                };
            }
        },
        saveNode() {
            eventBus.$emit('loading');
            const formData = { ...this.form, pids: null };

            const dataForm = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key]) {
                    if (formData[key] === true) dataForm.append(key, 1);
                    else if (formData[key] === false) dataForm.append(key, 0);
                    else dataForm.append(key, formData[key]);
                }
            }
            if (this.form.pids?.length > 0) {
                dataForm.append('pids', JSON.stringify(this.form.pids));
            }
            if (this.fileUploaded) {
                dataForm.append('file', this.fileUploaded);
            }

            apiService.updateNodeTreeUser(dataForm).then((res) => {
                if (res.data) {
                    this.$emit('updateTree', res.data[0]);
                    this.fileUploaded = null;
                    this.toggleModal();
                    this.resetForm();
                    eventBus.$emit('loaded');
                }
            });
        },
    },
    mounted() {},
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
