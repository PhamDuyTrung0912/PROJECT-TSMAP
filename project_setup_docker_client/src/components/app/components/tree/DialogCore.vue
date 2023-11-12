<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
    <div>
        <button
            id="toggleModalButton"
            data-modal-target="staticModal"
            data-modal-toggle="staticModal"
            class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow ">
                    <!-- Modal header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t ">
                        <h3 class="text-xl font-semibold text-gray-900 ">Static modal</h3>
                        <button
                            type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
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
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <p class="text-base leading-relaxed text-gray-500 ">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around
                            the world are updating their terms of service agreements to comply.
                        </p>
                        <p class="text-base leading-relaxed text-gray-500 ">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                            common set of data rights in the European Union. It requires organizations to notify users as soon as possible of
                            high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                    <!-- Modal footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                        <button
                            data-modal-hide="staticModal"
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            I accept
                        </button>
                        <button
                            id="closeModalButton"
                            data-modal-hide="staticModal"
                            type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'flowbite';

export default {
    components: {},
    props: {},
    data() {
        return {
            modal: null,
        };
    },
    computed: {},
    watch: {},
    methods: {
        showDialogUser() {
            const toggleModalButton = document.getElementById('toggleModalButton');
            toggleModalButton.click();
        },
        closeDialogUser() {
            const toggleModalButton = document.getElementById('closeModalButton');
            toggleModalButton.click();
        },
        initDialog() {
            // set the modal menu element
            const $targetEl = document.getElementById('staticModal');

            // options with default values
            const options = {
                backdrop: 'dynamic',
                backdropClasses: 'bg-gray-900 bg-opacity-50 fixed inset-0 z-40',
                closable: true,
                onHide: () => {
                },
                onShow: () => {
                },
                onToggle: () => {
                },
            };
            // eslint-disable-next-line no-new
            this.modal = new Modal($targetEl, options);
        },
    },
    mounted() {
        this.initDialog();
    },
};
</script>

<style>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
