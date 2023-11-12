<!-- eslint-disable max-len -->
<template>
    <div class="relative bg-white border border-solid rounded-md text-left px-2 cursor-pointer border-gray-200 focus:ring-opacity-40 focus:ring-blue-300 focus:ring-2 focus:outline-none" v-click-outside="onClickOutside">
        <input
            readonly
            :value="text"
            :placeholder="placeholder"
            :disabled="disabled"
            @click="onFocus"
            :class="[{ 'pl-7': prefix }, getSizeSelect]"
            class="focus:outline-none text-xs group truncate text-gray-800 w-[90%] pr-8 bg-white " />
        <i @click="clear" v-if="text" class="absolute cursor-pointer inset-y-0 right-9 pt-2 mdi mdi-close text-gray-500"></i>

        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <icon-arrow-down class="text-gray-500 duration-150" :class="{ 'rotate-180': isShowMenu }" />
        </span>

        <!-- Prefix -->
        <span v-if="prefix" class="absolute inset-y-0 left-0-0 flex items-center pointer-events-none">
            <icon-arrow-down class="text-gray-500 duration-150" :class="{ 'rotate-180': isShowMenu }" />
        </span>

        <!-- Custom options -->
        <div class="w-full mt-1 border border-solid border-gray-200" :class="[{ invisible: !isShowMenu }, 'origin-top-right absolute right-0 rounded-md shadow-md bg-white w-full mt-0 z-20']">
            <div v-show="!hideSearch">
                <div class="flex w-full bg-white rounded-t-md border-b border-solid border-gray-200">
                    <i class="text-sm px-2 pt-1 mdi mdi-magnify text-gray-500"></i>
                    <input
                        :value="searchKey"
                        @input="onInputSearch"
                        class="text-xs py-2 px-1 w-[80%] text-gray-500 outline-none rounded-md"
                        placeholder="Nhập để tìm kiếm ..." />
                </div>
            </div>
            <div :class="height" class="py-0 overflow-auto" v-if="checkEmpty(filtered)">
                <div
                    v-for="(item, i) in filtered"
                    :key="i"
                    @click="onSelect(item)"
                    :class="[getSizeSelect]"
                    class="text-xs cursor-pointer pr-8 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 relative">
                    {{ item.text }}
                    <span v-show="isSelected(item.value)" class="absolute pr-4 right-0 top-2 text-primary">
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
            <div class="py-3" v-else>
                <div class="text-xs text-center text-gray-500">Không có dữ liệu</div>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import unidecode from 'unidecode';
import IconArrowDown from '../../icons/IconArrowDown';
import { isArrayNotEmpty } from '../../helpers';

export default {
    components: { IconArrowDown },
    data() {
        return {
            isShowMenu: false,
            text: '',
            searchKey: '',
        };
    },

    props: {
        height: {
            default: 'h-[200px]',
        },
        placeholder: {
            default: 'Chọn',
        },
        prefix: {
            default: null,
        },
        items: {
            default: () => [],
        },
        value: {
            default: null,
        },
        disabled: {
            default: false,
        },
        multiple: {
            default: false,
        },
        small: {
            default: false,
        },
        large: {
            default: false,
        },
        hideSearch: {
            default: false,
        },
    },

    watch: {
        value: {
            immediate: true,
            handler(value) {
                const dataProps = this.items.find((item) => item.value === value);
                if (dataProps) {
                    this.text = dataProps.text;
                    this.searchKey = '';
                }
                if (!this.value) {
                    this.text = '';
                    this.searchKey = '';
                }
            },
        },
    },

    computed: {
        filtered() {
            return this.items.filter((item) => {
                if (item.text) {
                    const textWithoutDiacritics = unidecode(item.text.toLowerCase());
                    const searchKeyWithoutDiacritics = unidecode(this.searchKey.toLowerCase());
                    return textWithoutDiacritics.includes(searchKeyWithoutDiacritics);
                }
                return false;
            });
        },
        getSizeSelect() {
            if (this.small) {
                return 'text-xs py-2';
            }
            if (this.large) {
                return 'text-md py-2';
            }
            return 'text-xs py-2';
        },
    },
    methods: {
        isSelected(value) {
            return this.value === value;
        },
        onFocus() {
            this.isShowMenu = !this.isShowMenu;
        },

        onSelect(item) {
            this.$emit('input', item.value);
            this.onFocus();
        },

        onInputSearch(event) {
            this.searchKey = event.target.value;
        },

        onClickOutside() {
            this.isShowMenu = false;
        },

        checkEmpty(arr) {
            return isArrayNotEmpty(arr);
        },
        clear() {
            this.text = null;
            this.searchKey = null;
            this.$emit('input', null);
        },
    },
};
</script>

<style scoped></style>
