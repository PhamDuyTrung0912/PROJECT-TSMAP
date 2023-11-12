<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <div :class="width">
        <div class="border border-solid border-gray-200 rounded-lg bg-white">
            <label :for="inputId" class="block text-xs font-medium mb-0">{{ label }}</label>
            <div class="flex px-1">
                <div class="w-full flex justify-between">
                    <input
                        :id="inputId"
                        :readonly="readonly"
                        :disabled="disabled"
                        :type="number ? 'number' : 'text'"
                        :class="[getIcon(), getSize(), getDisabled(), getRequired(), getBackground()]"
                        class="w-full text-xs -mr-9 pl-1 focus:outline-none"
                        :placeholder="placeholder"
                        @input="(e) => setValueName(e)"
                        aria-required="required"
                        @focus="isFocus = true"
                        @blur="isFocus = false" />

                    <i
                        :class="paddingClear"
                        @click="clear"
                        v-if="inputValue"
                        class="cursor-pointer inset-y-2 pt-1 mdi mdi-close text-gray-500 flex justify-center"></i>
                </div>
                <div v-if="icon" class="w-11 pl-1 text-center pointer-events-none flex items-center justify-center bg-white">
                    <span class="mdi text-[20px]" :class="[icon, onFocusChangeColor]"></span>
                </div>
                <div v-if="checkRequired()" class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                </div>
            </div>
            <p v-if="checkRequired()" class="text-xs text-red-600 mt-2" id="hs-validation-name-error-helper">Nhập thông tin!</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: 'w-full',
        },
        paddingClear: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        value: {
            type: String, // Để nhận giá trị đầu vào
        },
        size: {
            type: String, // Để nhận giá trị đầu vào
            default: 'default',
        },
        disabled: {
            type: Boolean, // Để nhận giá trị đầu vào
            default: false,
        },
        readonly: {
            type: Boolean, // Để nhận giá trị đầu vào
            default: false,
        },
        required: {
            type: Boolean, // Để nhận giá trị đầu vào
            default: false,
        },
        number: {
            type: Boolean, // Để nhận giá trị đầu vào
            default: false,
        },
        backgroundColor: {
            type: String,
            default: 'bg-[#ffffff]',
        },
    },
    data() {
        return {
            inputValue: this.value, // Khởi tạo biến để lưu trữ giá trị của input
            inputId: `input-${Math.random().toString(36).substring(7)}`,
            isFocus: false,
        };
    },
    computed: {
        onFocusChangeColor() {
            return this.isFocus ? 'text-primary' : 'text-secondary';
        },
    },
    methods: {
        getIcon() {
            if (this.icon) return 'pr-10';
            return 'pr-3';
        },
        getSize() {
            if (this.size === 'small') return 'py-1';
            if (this.size === 'large') return 'py-3';
            return 'py-2';
        },
        getDisabled() {
            if (this.disabled) return 'bg-gray-50';
            return '';
        },
        getRequired() {
            if (this.required && (!this.inputValue || this.inputValue === '')) {
                return 'border-red-500 focus:border-red-500';
            }
            return 'border-gray-200 focus:border-primary';
        },
        getBackground() {
            return this.backgroundColor;
        },
        checkRequired() {
            if (this.required && (!this.inputValue || this.inputValue === '')) {
                return true;
            }
            return false;
        },
        handleInput() {
            if (this.number) {
                // Kiểm tra xem inputValue có phải là số nguyên không âm
                const value = parseInt(this.inputValue);
                if (value < 0) {
                    // Nếu không phải là số nguyên không âm, xử lý tùy ý, ví dụ:
                    this.inputValue = ''; // Xóa giá trị nhập sai
                    // Hoặc hiển thị thông báo lỗi
                }
            }
        },
        handleFocus() {},
        setValueName(event) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.inputValue = event.target.value;
            }, 500);
        },
        clear() {
            this.inputValue = null;
            document.getElementById(this.inputId).value = null;
        },
    },
    watch: {
        // Sử dụng watch để theo dõi giá trị của inputValue
        inputValue(newVal) {
            console.log('log', newVal);
            // Khi giá trị thay đổi, phát ra sự kiện "input" để thông báo giá trị mới
            this.$emit('input', newVal);
        },
    },
};
</script>

<style scoped></style>
