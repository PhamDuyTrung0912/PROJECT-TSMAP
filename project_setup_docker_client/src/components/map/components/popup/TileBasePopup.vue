<!-- eslint-disable max-len -->
<template>
    <div class="absolute z-100 bottom-8 right-4">
        <div class="flex justify-center">
            <!-- Dropdown toggle button -->
            <button
                @click="showMenuTileBase"
                class="shadow-md relative z-10 flex items-center p-1 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-green-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none">
                <span class="mx-1">Loại bản đồ</span>
                <icon-arrow-down />
            </button>
        </div>

        <!-- Dropdown menu -->
        <div :class="[{ invisible: !isShowMenu }, 'absolute bottom-8 right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl ']">
            <div
                @click="handleChangeTile(tile)"
                v-for="tile in tiles"
                :key="tile.id"
                :class="[
                    { 'bg-gray-200 main--text': tileActive === tile.id },
                    `cursor-pointer block px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-200 transform hover:bg-gray-200`,
                ]">
                {{ tile.name }}
            </div>
        </div>
    </div>
</template>

<script>
import { styleMaps } from '../../config';
import mapBus from '../../../../mapBus';
// Icon
const IconArrowDown = () => import('../../../../icons/IconArrowDown');

export default {
    name: 'TileBasePopup',
    components: {
        IconArrowDown,
    },
    data() {
        return {
            isShowMenu: false,

            tiles: styleMaps,
            tileActive: 1, // Dark
        };
    },
    methods: {
        showMenuTileBase() {
            this.isShowMenu = !this.isShowMenu;
        },

        handleChangeTile(tile) {
            if (this.tileActive !== tile.id) {
                this.isShowMenu = false;
                this.tileActive = tile.id;
                mapBus.$emit('mlTileMap', tile.path);
            }
        },
        handlerCloseMenuTileBaseClickMap() {
            this.isShowMenu = false;
        },
    },
    created() {
        mapBus.$on('closeMenuTileBaseClickMap', this.handlerCloseMenuTileBaseClickMap);
    },
    beforeDestroy() {
        mapBus.$off('closeMenuTileBaseClickMap', this.handlerCloseMenuTileBaseClickMap);
    },
};
</script>

<style scoped></style>
