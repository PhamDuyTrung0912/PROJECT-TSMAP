<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/label-hmodalas-for -->
<!-- eslint-disable max-len -->
<template>
    <div>
        <button
            v-show="false"
            id="toggleModalButton"
            data-modal-target="staticModal"
            data-modal-toggle="staticModal"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button">
            Toggle modal
        </button>
        <!-- Main modal -->
        <div
            id="staticModal"
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow">
                    <div class="flex border-solid border-gray-200 rounded-b items-start justify-between p-4 border-b rounded-t">
                        <h3 class="text-xl font-semibold text-gray-900">Cập nhật thông tin</h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                            data-modal-hide="staticModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-3 space-y-3">
                        <div>
                            <div class="photo-wrapper p-2">
                                <img
                                    id="previewImg"
                                    class="w-36 h-36 rounded-full mx-auto"
                                    src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
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
                            <div class="col-span-6 pr-2">
                                <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                <div class="relative max-w-sm">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input
                                        onSelectedDateChanged=""
                                        id="dateBirthday"
                                        datepicker-format="dd/mm/yyyy"
                                        v-model="form.birth_day"
                                        ref="dateBirthday"
                                        datepicker
                                        datepicker-buttons
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                        placeholder="Chọn ngày" />
                                </div>
                            </div>
                            <div class="col-span-6 pr-2">
                                <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                <div class="relative max-w-sm">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path
                                                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <input
                                        :data-date="dateInput"
                                        v-model="form.death_day"
                                        ref="dateDeathday"
                                        datepicker
                                        datepicker-buttons
                                        type="text"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                        placeholder="Chọn ngày" />
                                </div>
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
                                                <span class="font-semibold">Tải file lên</span>
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
                            data-modal-hide="staticModal"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Lưu
                        </button>
                        <button
                            id="closeModalButton"
                            data-modal-hide="staticModal"
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
import Datepicker from 'flowbite-datepicker/Datepicker';
import { Modal } from 'flowbite';
import apiService from '../../../../apiService';

export default {
    components: {},
    props: {
        nodeSelected: {
            type: Object,
        },
    },
    data() {
        return {
            dateInput: null,
            modal: null,
            dateInputBirthday: null,
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
                tree_id: null,
            },
        };
    },
    computed: {},
    watch: {
        nodeSelected: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.form = { ...this.nodeSelected };
                }
            },
        },
    },
    methods: {
        getFileUploaded() {
            const fileVal = document.getElementById('dropzone-file').files;
            if (fileVal?.length > 0) {
                this.file = fileVal[0];
                const output = document.getElementById('previewImg');
                output.src = URL.createObjectURL(this.file);
                output.onload = () => {
                    URL.revokeObjectURL(output.src); // free memory
                };
            }
            console.log('file', this.file);
        },
        showDialogUser() {
            const toggleModalButton = document.getElementById('toggleModalButton');
            toggleModalButton.click();
        },
        closeDialogUser() {
            const toggleModalButton = document.getElementById('closeModalButton');
            toggleModalButton.click();
        },
        initDate() {
            const datepickerBirthday = this.$refs.dateBirthday;
            // eslint-disable-next-line no-new
            this.dateInputBirthday = new Datepicker(datepickerBirthday, {
                // Cài đặt tùy chọn Datepicker tại đây (nếu cần)
                // Các tùy chọn khác ở đây
                onSelect: () => {
                    console.log('log');
                },
            });
            const datepickerDeathday = this.$refs.dateDeathday;
            // eslint-disable-next-line no-new
            new Datepicker(datepickerDeathday, {
                // Cài đặt tùy chọn Datepicker tại đây (nếu cần)
                // eslint-disable-next-line object-shorthand
                onSelect: function (start, end, label) {
                    // Hàm này sẽ được gọi khi người dùng chọn một ngày hoặc phạm vi ngày
                    console.log('Ngày bắt đầu:', start);
                    console.log('Ngày kết thúc:', end);
                    console.log('Label:', label);
                },
            });
        },
        initDialog() {
            // set the modal menu element
            const $targetEl = document.getElementById('staticModal');

            // options with default values
            const options = {
                backdrop: 'dynamic',
                backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
                closable: true,
                onHide: () => {},
                onShow: () => {},
                onToggle: () => {},
            };
            // eslint-disable-next-line no-new
            this.modal = new Modal($targetEl, options);
        },
        saveNode() {
            const formData = { ...this.form };

            const dataForm = new FormData();
            for (const key in formData) {
                if (formData[key] !== null && formData[key]) {
                    if (formData[key] === true) dataForm.append(key, 1);
                    else if (formData[key] === false) dataForm.append(key, 0);
                    else dataForm.append(key, formData[key]);
                }
            }
            if (this.fileUploaded) {
                dataForm.append('file', this.fileUploaded);
            }

            apiService.updateNodeTreeUser(dataForm).then((res) => {
                if (res.data) {
                    const itemRes = res.data[0];
                    this.familyData = this.familyData.map((e) => {
                        if (e.id === itemRes.id) {
                            return {
                                ...itemRes,
                                pids: itemRes.pids ? JSON.parse(itemRes.pids) : null,
                            };
                        }
                        return e;
                    });
                    this.updateNodesData = this.updateNodesData.map((e) => {
                        if (e.id === itemRes.id) {
                            return {
                                ...itemRes,
                                pids: itemRes.pids ? JSON.parse(itemRes.pids) : null,
                            };
                        }
                        return e;
                    });
                    if (this.fileUploaded) {
                        this.initTree();
                        this.fileUploaded = null;
                    }
                }
            });
        },
    },
    mounted() {
        this.initDialog();
        this.initDate();
    },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
