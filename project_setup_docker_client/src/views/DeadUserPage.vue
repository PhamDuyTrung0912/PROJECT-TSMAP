<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
    <v-container class="pa-0 h-screen overflow-auto" fluid>
    </v-container>
</template>

<script>

export default {
    name: 'DeadUserPage',
    mixins: [],
    data() {
        return {
            dateValue: null,
        };
    },
    computed: {},
    watch: {},
    methods: {
        updateValueDate(date) {
            this.dateValue = date;
        },
    },
    created() {},
    beforeDestroy() {},
};
</script>

<style scoped></style>
