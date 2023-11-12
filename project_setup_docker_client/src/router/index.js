import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from '../store';

const HomePage = () => import('../views/HomePage.vue');
const SearchPage = () => import('../views/SearchPage.vue');
const FamilyTreePage = () => import('../views/FamilyTreePage.vue');
const CemeteryPage = () => import('../views/CemeteryPage.vue');
const TombPage = () => import('../views/TombPage.vue');
const DeadUserPage = () => import('../views/DeadUserPage.vue');
const ServicesPage = () => import('../views/ServicesPage.vue');
const SettingPage = () => import('../views/SettingPage.vue');

Vue.use(VueRouter);

const routes = [
    // HomePage
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
    },

    // Tra cứu
    {
        path: '/search',
        name: 'SearchPage',
        component: SearchPage,
    },

    // Cây gia phả
    {
        path: '/tree',
        name: 'FamilyTree',
        component: FamilyTreePage,
    },
    // Nghĩa trang
    {
        path: '/cemetery',
        name: 'CemeteryPage',
        component: CemeteryPage,
    },

    // Phần mộ
    {
        path: '/tomb',
        name: 'TombPage',
        component: TombPage,
    },

    // Người mất
    {
        path: '/user',
        name: 'DeadUserPage',
        component: DeadUserPage,
    },

    // Dịch vụ
    {
        path: '/service',
        name: 'ServicesPage',
        component: ServicesPage,
    },

    // Cài đặt
    {
        path: '/setting',
        name: 'SettingPage',
        component: SettingPage,
    },

    {
        path: '/*',
        redirect: { name: 'SearchPage' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_SUFFIX,
    routes,
});

router.beforeEach();
export default router;
