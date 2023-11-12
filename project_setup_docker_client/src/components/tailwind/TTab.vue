<template>
    <div class="w-full py-2 pt-0" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px">
        <slot name="menu"></slot>
        <v-divider></v-divider>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    props: {},
};
</script>

<style scoped>
.ct_item_menu::after {
    content: '';
    height: 3px;
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
}
</style>
