<template>
    <div class="bg-gray-50">
        <app-header />
        <div class="pa-0" fluid style="width: calc(100vw - 200px); margin-left: 200px">
            <router-view />
        </div>
        <t-loader />
    </div>
</template>

<script>
import AppHeader from './components/app/components/header/AppHeader';
import TLoader from './components/tailwind/TLoader.vue';

export default {
    components: { AppHeader, TLoader },
    name: 'App',
    computed: {},
    data() {
        return {};
    },
    methods: {},
    created() {},
    mounted() {},
};
</script>

<style lang="scss">
body {
    font-family: 'Be Vietnam Pro', sans-serif !important;
}
.mapboxgl-ctrl.mapboxgl-ctrl-attrib,
a.mapboxgl-ctrl-logo {
    visibility: hidden;
}

html {
    overflow-y: hidden !important;
}

.mapboxgl-popup-content {
    width: 180px !important;
    box-sizing: border-box !important;
    border-radius: 10px !important;
}

.mapbox-gl-draw_polygon {
    display: none !important;
}
.mapbox-gl-draw_line {
    display: none !important;
}
.mapbox-gl-draw_point {
    display: none !important;
}
.marker-text {
    border-radius: 10px;
    text-align: center;
    background: white;
    width: 160px;
    margin-left: -65px;
    margin-top: -20px;
    color: #ff8000;
    z-index: 100;
}
.mapboxgl-popup {
    max-width: 400px;
}
.mapboxgl-popup-close-button {
    color: red !important;
    font-size: 20px !important;
}
.bft-img-button svg {
    position: relative;
    top: 12px;
    margin-left: 10px !important;
    padding-left: 5px !important;
}
.mini-map {
    bottom: 45px !important;
}
.bft-light .bft-input > input,
.bft-light .bft-input > select {
    font-size: 15px !important;
}
.flatpickr-calendar.animate.open {
    font-size: 11px !important;
}
</style>
