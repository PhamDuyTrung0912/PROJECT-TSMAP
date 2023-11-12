export default {
    install(Vue) {
        Vue.prototype.$guard = {
            user: null,
            mapUser: null,
            setUser: (user) => {
                Vue.prototype.$guard.user = user;
            },
            setMapUser(user) {
                Vue.prototype.$guard.mapUser = user;
            },
            check: (category, name) => {
                const { permissions } = Vue.prototype.$guard.user.role;
                const checking = permissions.find((el) => (
                    el.controller === category && el.method === name
                ));
                return checking !== undefined;
            },
            mapCheck: (category, name) => {
                const { permissions } = Vue.prototype.$guard.mapUser.map_role;
                const checking = permissions.find((el) => (
                    el.category === category && el.name === name
                ));
                return checking !== undefined;
            },
            mapCheckCategory: (category) => {
                const permissions = Vue.prototype.$guard.mapUser.map_role.permissions;
                const checking = permissions.find((el) => el.category === category);
                return checking !== undefined;
            },
        };
    },
};
