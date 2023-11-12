<template>
    <div>
        <div ref="containerScroll" style="height: calc(100vh - 150px)" class="overflow-auto p-2 pt-0 card_list_container">
            <div v-for="(item, index) in cemeteriesFiltered" :key="index">
                <card-item :item="item" />
            </div>
        </div>
        <div v-show="loading">
            <t-loading/>
        </div>
    </div>
</template>

<script>
import TLoading from '../../../tailwind/TLoading.vue';
import CardItem from './CardItem.vue';

export default {
    props: {
        cemeteriesFiltered: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        CardItem,
        TLoading,
    },
    data() {
        return {
            debounce: null,
            loading: false,
        };
    },

    methods: {
        loadData() {
            if (this.debounce) clearTimeout(this.debounce);
            this.debounce = setTimeout(() => {
                this.loading = true;
                this.$emit('triggerLoading');
            }, 500);
        },
        checkScroll() {
            const scrollHeight = this.$refs.containerScroll.scrollHeight;
            const scrollTop = this.$refs.containerScroll.scrollTop;
            const dataContainerHeight = this.$refs.containerScroll.clientHeight;

            if (scrollHeight <= dataContainerHeight + 50 + scrollTop) {
                this.loadData();
            }
        },
    },

    mounted() {
        this.$refs.containerScroll.addEventListener('scroll', this.checkScroll);
    },
    beforeDestroy() {
        this.$refs.containerScroll.removeEventListener('scroll', this.checkScroll);
    },
};
</script>

<style scoped>
.card_list_container {
    scroll-behavior: smooth;
}
</style>
