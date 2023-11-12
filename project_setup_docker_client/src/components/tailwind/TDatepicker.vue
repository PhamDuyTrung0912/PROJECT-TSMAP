<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div x-data ref="datetimewidget" class="w-full flatpickr container mx-auto col-span-6 sm:col-span-6">
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
                x-ref="datepicker"
                type="text"
                id="datepicker"
                data-input
                class="bg-gray-50 border border-gray-300 text-gray-900 mt-1 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Chọn ngày" />
            <div class="absolute inset-y-0 right-0 flex items-center mt-1">
                <a
                    @click="clearDate()"
                    class="h-11 w-10 input-button cursor-pointer rounded-r-md bg-transparent border-gray-300 border-t border-b border-r text-sm"
                    title="clear"
                    data-clear>
                    <i class="text-xl absolute px-2 mdi mdi-close mt-2 text-gray-500"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'; // Import CSS tùy chọn nếu bạn muốn tùy chỉnh giao diện
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';

export default {
    props: {
        defaultDate: {
            type: String,
            default: null,
        },
    },
    mixins: [],
    data() {
        return {
            dateValue: null,
        };
    },
    computed: {},
    watch: {
        defaultDate: {
            immediate: false,
            deep: true,
            handler(val) {
                if (val) {
                    this.initFlatpickr();
                }
            },
        },
    },
    methods: {
        initFlatpickr() {
            let defaultValue = null;
            if (this.defaultDate) {
                const newdate = this.defaultDate.split('-').reverse().join('-');
                defaultValue = newdate;
            }
            return flatpickr(this.$refs.datetimewidget, {
                wrap: true,
                enableTime: false,
                dateFormat: 'd-m-Y',
                locale: Vietnamese,
                defaultDate: this.defaultDate ? defaultValue : '',
                onChange: (selectedDates, dateStr) => {
                    this.dateValue = dateStr;
                    this.$emit('updateValueDate', this.dateValue);
                },
            });
        },
        clearDate() {
            this.dateValue = null;
            this.$emit('updateValueDate', this.dateValue);
        },
    },
    created() {},
    beforeDestroy() {},
    mounted() {
        this.initFlatpickr();
    },
};
</script>

<style scoped></style>
