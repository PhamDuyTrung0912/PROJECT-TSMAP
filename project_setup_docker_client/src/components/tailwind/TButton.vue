<!-- eslint-disable max-len -->
<template>
    <button
        @click="handleClick"
        :class="[getSize(), getDisabled(), getBackground(), getFontColor(), width, height, border]"
        type="button"
        class="inline-flex justify-center items-center hover:opacity-60 focus:outline-none focus:ring-1 transition-all">
        <span class="mdi pr-1" :class="[icon, fontColor, getSizeIcon]"></span>
        {{ label }}
    </button>
</template>

<script>
export default {
    components: {},
    props: {
        icon: {
            type: String,
        },
        label: {
            type: String,
            default: 'Button Label',
        },
        size: {
            type: String,
            default: 'default',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        backgroundColor: {
            type: String,
            default: 'bg-[#ffffff]',
        },
        fontColor: {
            type: String,
            default: 'text-black',
        },
        width: {
            type: String,
            default: 'w-full',
        },
        height: {
            type: String,
            default: 'h-full',
        },
        border: {
            type: String,
            default: 'rounded-lg',
        },
    },
    computed: {
        getSizeIcon() {
            if (this.size === 'small') return 'text-[20]';
            if (this.size === 'large') return 'text-[25px]';
            return 'text-[22px]';
        },
    },
    methods: {
        getSize() {
            if (this.size === 'small') return 'text-sm text-[12px]';
            if (this.size === 'large') return 'text-lg text-[16px]';
            return 'text-base text-[14px]';
        },
        getDisabled() {
            if (this.disabled) return 'opacity-50 cursor-not-allowed';
            return '';
        },
        getBackground() {
            return this.backgroundColor;
        },
        getFontColor() {
            return this.fontColor;
        },
        handleClick() {
            if (!this.disabled) {
                // Xử lý sự kiện click ở đây
                this.$emit('click');
            }
        },
    },
};
</script>

<style scoped></style>
