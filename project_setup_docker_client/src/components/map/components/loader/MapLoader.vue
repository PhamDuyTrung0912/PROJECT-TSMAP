<template>
    <div :class="['loader-line', { loaded: progress }]"></div>
</template>

<script>
import eventBus from '../../../../eventBus';

export default {
    name: 'MapLoader',
    data() {
        return {
            progress: true,
        };
    },
    methods: {
        loading() {
            this.progress = false;
        },
        loaded() {
            this.progress = true;
        },
    },
    created() {
        eventBus.$on('loading', this.loading);
        eventBus.$on('loaded', this.loaded);
    },
    beforeDestroy() {
        eventBus.$off('loading', this.loading);
        eventBus.$off('loaded', this.loaded);
    },
};
</script>

<style scoped>
.loader-line {
    z-index: 100;
    width: 100vw;
    height: 6px;
    position: relative;
    overflow: hidden;
    background-color: #ddd;
}
.loaded {
    display: none;
}

.loader-line:before {
    content: '';
    position: absolute;
    top: 0;
    left: -50%;
    height: 6px;
    width: 40%;
    background-color: rgba(249, 212, 119, 0.7);
    -webkit-animation: lineAnim 1s linear infinite;
    -moz-animation: lineAnim 1s linear infinite;
    animation: lineAnim 1s linear infinite;
}

@keyframes lineAnim {
    0% {
        left: -40%;
    }
    50% {
        left: 20%;
        width: 80%;
    }
    100% {
        left: 100%;
        width: 100%;
    }
}
</style>
