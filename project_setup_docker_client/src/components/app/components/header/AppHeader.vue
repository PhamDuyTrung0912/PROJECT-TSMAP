<!-- eslint-disable vuejs-accessibility/mouse-events-have-key-events -->
<!-- eslint-disable max-len -->
<template>
    <div class="z-40 border-r-2 border-solid border-gray-50 main-menu bg-white h-screen fixed top-0 left-0 w-[200px] flex justify-between flex-col">
        <div class="h-1/6 flex">
            <div class="flex items-center pl-2 cursor-pointer">
                <!-- <img class="mr-2" :src="$utils.apiAsset('images/tsmap.png')" alt="logo" /> -->
                <span class="text-2xl text-gray-600 font-extrabold">TS MAP</span>
            </div>
        </div>
        <ul class="pa-0 h-5/6">
            <li
                v-for="(menu, index) in menuItems"
                :key="index"
                @mouseover="handleMouseOver(menu)"
                @mouseout="handleMouseOut(menu)"
                @click="pushRoute(menu.route)"
                :class="checkRouteActive(menu) ? 'menu-active' : ''"
                class="flex items-center py-2 px-3 cursor-pointer relative hover:ct-hover-menu before:bg-white before:transition-all before:duration-200">
                <i class="text-xl" :class="checkRouteActive(menu) ? menu.icon_active : menu.icon"></i>
                <span :class="checkRouteActive(menu) ? 'text-primary px-2' : 'px-2'" class="text-md text-gray-500">{{
                    menu.label
                }}</span>
            </li>
        </ul>
        <!-- <div class="h-1/6 flex items-center">Admin</div> -->
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            itemMenuHover: null,
            menuItems: [
                // {
                //     id: 1,
                //     icon: 'mdi mdi-view-dashboard-outline text-gray-500',
                //     icon_active: 'mdi mdi-view-dashboard text-primary',
                //     label: 'Dashboard',
                //     route: 'HomePage',
                // },
                {
                    id: 2,
                    icon: 'mdi mdi-card-search-outline text-gray-500',
                    icon_active: 'mdi mdi-card-search text-primary',
                    label: 'Tra cứu',
                    route: 'SearchPage',
                },
                {
                    id: 3,
                    icon: 'mdi mdi-family-tree text-gray-500',
                    icon_active: 'mdi mdi-family-tree text-primary',
                    label: 'Cây gia phả',
                    route: 'FamilyTree',
                },
                {
                    id: 4,
                    icon: 'mdi mdi-map-marker-radius-outline text-gray-500',
                    icon_active: 'mdi mdi-map-marker-radius text-primary',
                    label: 'Nghĩa trang',
                    route: 'CemeteryPage',
                },
                {
                    id: 5,
                    icon: 'mdi mdi-rhombus-split-outline text-gray-500',
                    icon_active: 'mdi mdi-rhombus-split text-primary',
                    label: 'Phần mộ',
                    route: 'TombPage',
                },
                // {
                //     id: 6,
                //     icon: 'mdi mdi-clipboard-account-outline text-gray-500',
                //     icon_active: 'mdi mdi-clipboard-account text-primary',
                //     label: 'Người mất',
                //     route: 'DeadUserPage',
                // },
                // {
                //     id: 7,
                //     icon: 'mdi mdi-text-box-check-outline text-gray-500',
                //     icon_active: 'mdi mdi-text-box-check text-primary',
                //     label: 'Dịch vụ',
                //     route: 'ServicesPage',
                // },
                // {
                //     id: 8,
                //     icon: 'mdi mdi-cog-outline text-gray-500',
                //     icon_active: 'mdi mdi-cog text-primary',
                //     label: 'Cài đặt',
                //     route: 'SettingPage',
                // },
            ],
        };
    },
    computed: {
        activeRoute() {
            return this.$route.name;
        },
    },
    methods: {
        checkRouteActive(menu) {
            if (this.itemMenuHover && this.itemMenuHover === menu.route) {
                return true;
            }
            if (menu.route === this.activeRoute) return true;
            return false;
        },
        pushRoute(route) {
            if (this.$route.name !== route) {
                this.$router.push({ name: route });
            } else {
                this.$router.go();
            }
        },
        handleMouseOver(menu) {
            // Xử lý khi hover vào một mục
            this.itemMenuHover = menu.route;
        },
        handleMouseOut() {
            // Xử lý khi di chuột ra khỏi mục
            this.itemMenuHover = null;
        },
    },
};
</script>

<style scoped>
.main-menu {
    user-select: none;
}
.menu-active::before {
    position: absolute;
    left: 0;
    width: 5px;
    content: '';
    height: 70%;
    background: #003343;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
