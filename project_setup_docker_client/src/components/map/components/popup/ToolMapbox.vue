<!-- eslint-disable max-len -->
<template>
    <div class="absolute z-100 bottom-20 right-4">
        <div class="flex justify-center">
            <button
                @click="switchToGlobe"
                class="font-bold shadow-md relative z-10 flex items-center p-1 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-green-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none">
                <span :class="isActive === 'globe' ? 'main--text mx-1' : 'mx-1'">3D</span>
            </button>
            <button
                @click="switchToMercator"
                class="ml-2 font-bold shadow-md relative z-10 flex items-center p-1 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:border-green-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none">
                <span :class="isActive === 'mercator' ? 'main--text mx-1' : 'mx-1'">2D</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mapInstance: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isActive: 'globe',
        };
    },
    methods: {
        switchToGlobe() {
            // Chuyển đổi bản đồ sang Mapbox Globe
            this.mapInstance.mapbox.setStyle('mapbox://styles/mapbox/outdoors-v12?optimize=true');
            this.isActive = 'globe'; // Đặt trạng thái cho nút 'globe'
        },
        switchToMercator() {
            // Chuyển đổi bản đồ sang dạng Mercator
            this.mapInstance.mapbox.setStyle('mapbox://styles/mapbox/streets-v11');
            this.isActive = 'mercator'; // Đặt trạng thái cho nút 'mercator'
        },
    },
};
</script>

<style scoped></style>
