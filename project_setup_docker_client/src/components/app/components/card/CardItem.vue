<!-- eslint-disable max-len -->
<template>
    <div
        @click="clickTomb(item)"
        class="w-[360px] bg-[#F8F8F8] h-full mb-2 rounded-md shadow-md p-4 relative cursor-pointer hover:bg-white hover:transition-all group">
        <!-- Selected -->
        <div
            class="w-[3px] h-[90%] rounded-tr-2xl rounded-br-2xl bg absolute top-[50%] translate-y-[-50%] left-0 flex my-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:duration-500 group-hover:transition-all"></div>
        <!-- Status -->
        <div v-if="item.status === 'active'" class="bg-[#aac3f0] w-fit px-4 py-1 text-small rounded-2xl absolute top-4 right-4 text-[#004d99]">Đã xây dựng</div>
        <div v-if="item.status === 'available'" class="bg-[#C1EEDB] w-fit px-4 py-1 text-small rounded-2xl absolute top-4 right-4 text-[#009556]">Chưa sử dụng</div>
        <!-- Content -->
        <div class="text-secondary text-sm font-bold mb-2">{{ item.hoten }}</div>
        <div>
            <div class="grid grid-cols-7 gap-2 mb-1">
                <div class="text-xs text-secondary col-start-1 col-end-4">Năm sinh / Năm mất</div>
                <div class="text-xs text-secondary col-start-4 col-end-8 truncate ...">{{ item.namsinh }} - {{ item.namhysinh }}</div>
            </div>
            <div class="grid grid-cols-7 gap-2 mb-1">
                <div class="text-xs text-secondary col-start-1 col-end-4">Thành phố</div>
                <div class="text-xs text-secondary col-start-4 col-end-8 truncate ...">{{ $utils.getLocation(item) }}</div>
            </div>
            <div class="grid grid-cols-7 gap-2 mb-1">
                <div class="text-xs text-secondary col-start-1 col-end-4">Nghĩa trang</div>
                <div class="text-xs text-secondary col-start-4 col-end-8 truncate ...">{{ item.cemetery && item.cemetery.name }}</div>
            </div>
            <div class="grid grid-cols-7 gap-2 mb-1">
                <div class="text-xs text-secondary col-start-1 col-end-4">Đường đi</div>
                <div class="text-xs text-secondary col-start-4 col-end-8 truncate ...">
                    <div class="button-direct cursor-pointer" @click="toggleDirect">
                        <i class="text-xl absolute px-2 mdi mdi-directions text-primary"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mapBus from '../../../../mapBus';

export default {
    props: {
        item: {
            type: Object,
        },
        isSelected: {
            default: false,
        },
    },
    methods: {
        clickTomb(item) {
            mapBus.$emit('clickTombSearch', item);
        },
        toggleDirect() {
            console.log('log.direct');
        },
    },
};
</script>

<style></style>
