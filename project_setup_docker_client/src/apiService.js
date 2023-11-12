import axios from 'axios';
import store from './store';

function getParamsString(data) {
    let paramString = '';
    let index = 0;
    if (data !== null) paramString += '?';
    for (const property in data) {
        if (property) {
            if (index > 0) paramString += '&';
            paramString += property;
            paramString += '=';
            paramString += data[property];
            index++;
        }
    }
    return paramString;
}

class APIService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
        });
        this.axios.interceptors.request.use((config) => {
            const token = store.getters.getToken;
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            return config;
        });

        this.axios.interceptors.response.use(
            (res) => res,
            (err) => {
                console.log(err.response.data);
                // let message = "Une erreur s'est produite côté serveur";
                // if (err.response.status === 422 || err.response.status === 404) {
                //     message = err.response.data.error;
                // }
                throw err;
            },
        );
    }

    genericCall(method, uri, form) {
        return this.axios[method](uri, form);
    }

    indexCemeteries() {
        return this.axios.get('api/index/cemeteries');
    }

    // ATTACHMENTS
    getAttachments() {
        return this.axios.get('api/attachments');
    }

    getAttachmentById(id) {
        return this.axios.get(`api/attachments/${id}`);
    }

    addAttachment(data) {
        return this.axios.post('api/attachments', data);
    }

    deleteAttachment(id) {
        return this.axios.delete(`api/attachments/${id}`);
    }

    forgottenPassword(data) {
        return this.axios.post('api/resetPassword', data);
    }

    // TreeUser

    getTreeUser() {
        return this.axios.get('api/tree_users');
    }

    getTreeUserByTree(id) {
        return this.axios.get(`api/tree_users/byTree/${id}`);
    }

    getTreeUserById(id) {
        return this.axios.get(`api/tree_users/${id}`);
    }

    addTreeUser(data) {
        return this.axios.post('api/tree_users', data);
    }

    updateTreeUser(data) {
        return this.axios.post(`api/tree_users/${data.get('id')}`, data);
    }

    updateNodeTreeUser(data) {
        return this.axios.post('api/tree_users/nodeTree', data);
    }

    // Tree

    getTree() {
        return this.axios.get('api/trees');
    }

    getTreeById(id) {
        return this.axios.get(`api/trees/${id}`);
    }

    addTree(data) {
        return this.axios.post('api/trees', data);
    }

    updateTree(data) {
        return this.axios.post(`api/trees/${data.get('id')}`, data);
    }

    // provinces

    getProvinces() {
        return this.axios.get('api/provinces');
    }

    // districts

    getDistricts() {
        return this.axios.get('api/districts');
    }

    getDistrictsByProvice(id) {
        return this.axios.get(`api/districts/by_province/${id}`);
    }

    // wards

    getWards() {
        return this.axios.get('api/wards');
    }

    getWardsByDistrict(id) {
        return this.axios.get(`api/wards/by_district/${id}`);
    }

    // Country

    getCountry() {
        return this.axios.get('api/countries');
    }

    getCountryById(id) {
        return this.axios.get(`api/countries/${id}`);
    }

    addCountry(data) {
        return this.axios.post('api/countries', data);
    }

    updateCountry(data) {
        return this.axios.post(`api/countries/${data.get('id')}`, data);
    }

    // CemeteryCountry

    getCemeteryCountry() {
        return this.axios.get('api/cemetery_country');
    }

    getCemeterySelect() {
        return this.axios.get('api/cemetery_country/select');
    }

    getCemeteryCountryById(id) {
        return this.axios.get(`api/cemetery_country/${id}`);
    }

    addCemeteryCountry(data) {
        return this.axios.post('api/cemetery_country', data);
    }

    updateCemeteryCountry(data) {
        return this.axios.post(`api/cemetery_country/${data.get('id')}`, data);
    }

    // CemeterySingle

    getCemeteryByFilter(data) {
        return this.axios.post('api/cemetery_single/byFilter', data);
    }

    getCemeteryByStatusMap() {
        return this.axios.get('api/cemetery_single/status');
    }

    getCemeterySingleById(id) {
        return this.axios.get(`api/cemetery_single/${id}`);
    }

    // CemeterySingleType

    getCemeterySingleType() {
        return this.axios.get('api/cemetery_single_type');
    }

    getCemeterySingleTypeById(id) {
        return this.axios.get(`api/cemetery_single_type/${id}`);
    }

    addCemeterySingleType(data) {
        return this.axios.post('api/cemetery_single_type', data);
    }

    updateCemeterySingleType(data) {
        return this.axios.post(`api/cemetery_single_type/${data.get('id')}`, data);
    }

    // CemeteryArea

    getCemeteryArea() {
        return this.axios.get('api/cemetery_area');
    }

    getCemeteryAreaById(id) {
        return this.axios.get(`api/cemetery_area/${id}`);
    }

    addCemeteryArea(data) {
        return this.axios.post('api/cemetery_area', data);
    }

    updateCemeteryArea(data) {
        return this.axios.post(`api/cemetery_area/${data.get('id')}`, data);
    }

    deleteCemeterySingleType(id) {
        return this.axios.delete(`api/cemetery_single_type/${id}`);
    }

    resetPassword(data, params) {
        return this.axios.post(
            `api/password/confirm/${params.user}/${params.userType}/${params.hash}?expires=${params.expires}&signature=${params.signature}`,
            data,
        );
    }

    reSendEmail(data) {
        return this.axios
            .post('api/email/resend', data)
            .then((res) => res)
            .catch((err) => {
                throw err;
            });
    }

    // ROUTES
    getRoutes(data = null) {
        let paramsString = '';
        if (data) paramsString = getParamsString(data);
        return this.axios.get(`api/routes${paramsString}`);
    }

    getRouteById(id) {
        return this.axios.get(`api/routes/${id}`);
    }

    // Aws
    uploadFileStorageS3(data) {
        return this.axios.post('api/s3/upload', data);
    }
}

export default new APIService();
