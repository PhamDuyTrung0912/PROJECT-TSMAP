<template>
    <div v-show="display" class="container-loader">
        <div v-if="isOverlay" class="overlay"></div>
        <div class="image">
            <!-- <img width="250" :src="this.$utils.apiAsset('images/tsmap.png')" alt="Logo" /> -->
        </div>

        <div class="loader">
            <div class="bar bar1"></div>
            <div class="bar bar2"></div>
            <div class="bar bar3"></div>
        </div>
    </div>
</template>

<script>
import eventBus from '../../eventBus';

export default {
    name: 'TLoader',
    data() {
        return {
            display: false,
            isOverlay: true,
        };
    },
    methods: {
        handleLoading(overlay = true) {
            this.display = true;
            this.isOverlay = overlay;
        },
        handleLoaded() {
            this.display = false;
            this.isOverlay = true;
        },
    },
    created() {
        eventBus.$on('loading', this.handleLoading);
        eventBus.$on('loaded', this.handleLoaded);
    },
    beforeDestroy() {
        eventBus.$off('loading', this.handleLoading);
        eventBus.$off('loaded', this.handleLoaded);
    },
};
</script>

<style lang="scss" scoped>
.container-loader {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(186, 186, 186, 0.75);
    z-index: 1000000;
}
.image {
    max-height: 110px;
    z-index: 10000000;
}
.image img {
    object-fit: cover;
    margin-bottom: 20px;
}

.loader,
.bar {
    max-width: 350px;
    width: 30%;
    height: 20px;
    z-index: 10000000;
}
.bar {
    position: absolute;
    display: flex;
    align-items: center;
}
.bar::before,
.bar::after {
    content: '';
    position: absolute;
    display: block;
    width: 15px;
    height: 15px;
    background: #fff;
    background: #747474;
    opacity: 0;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    animation: slideleft 1.5s ease-in-out infinite;
}

.bar1::before {
    animation-delay: 0s;
}
.bar1::after {
    animation-delay: 0.15s;
}
.bar2::before {
    animation-delay: 0.3s;
}
.bar2::after {
    animation-delay: 0.45s;
}
.bar3::before {
    animation-delay: 0.6s;
}
.bar3::after {
    animation-delay: 0.75s;
}

@keyframes slideleft {
    10% {
        opacity: 0;
        transform: scale(0);
        right: 0;
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
    90% {
        opacity: 0;
        transform: scale(0);
        right: 100%;
    }
}

</style>
