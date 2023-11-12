<!-- eslint-disable max-len -->
<template>
    <div>
        <div class="color-legend" v-if="cemeteryGid">
            <div class="flex mt-1">
                <div class="color-dot bg-[#475569]"></div>
                <div class="mt-0">Đã sử dụng</div>
            </div>
            <div class="flex mt-2">
                <div class="color-dot bg-[#00cc00]"></div>
                <div class="mt-0">Chưa sử dụng</div>
            </div>
            <!-- <span>Đã sử dụng</span> -->
            <!-- Thêm các màu và mô tả của bạn tại đây -->
        </div>
        <!-- <div class="button-home cursor-pointer" @click="resetHome"> -->
        <div class="button-home cursor-pointer" @click="resetHome">
            <i class="text-2xl absolute mdi mdi-home-circle-outline"></i>
        </div>
        <!-- <div v-if="tombFeatureSelected" class="button-direct cursor-pointer" @click="showDirect">
            <i class="text-2xl  absolute mdi mdi-directions"></i>
        </div> -->
        <div v-if="cemeteryGid" class="absolute bottom-5 right-5 z-10 flex" :class="showCardDetail ? 'bottom-[230px]' : 'bottom-5'">
            <div
                class="pa-1 mx-1 rounded-md shadow-md cursor-pointer hover:bg-opacity-80"
                :class="showVr360 ? 'bg-primary' : 'bg-white'"
                @click="toggleView360">
                <icon-360-vr class="w-8 h-8" :fill="showVr360 ? 'white' : '#003343'" />
            </div>
            <div
                v-if="tombItemSelected"
                class="pa-1 mx-1 rounded-md shadow-md cursor-pointer hover:bg-opacity-80"
                :class="showCardDetail ? 'bg-primary' : 'bg-white'"
                @click="toggleCardDetail">
                <i class="text-3xl" :class="showCardDetail ? 'text-white mdi mdi-credit-card-search' : 'mdi mdi-credit-card-search-outline'"></i>
            </div>
        </div>
        <div v-if="showVr360" class="absolute bottom-[280px] right-5 z-10 w-[350px] h-[350px]">
            <iframe-vr-360 />
        </div>
        <div class="mb-5 search-cim-home">
            <t-select :items="cemeteries" v-model="cemeteryGid" placeholder="Chọn nghĩa trang" />
        </div>
        <div>
            <search-drawer v-if="cemeteryGid" :showDrawer="showDrawer" @toggleDrawer="showDrawer = !showDrawer" />
        </div>
        <v-fade-transition v-if="tombItemSelected">
            <div v-show="showCardDetail" class="absolute bottom-5 right-5 z-10" style="width: calc(100vw - 650px)">
                <card-detail :cemeterySelected="cemeterySelected" :tombItemSelected="tombItemSelected" />
            </div>
        </v-fade-transition>

        <div>
            <map-box v-if="loaded" @mapInstance="mountMap" :mapId="mapId" :dataGeoJson="dataGeoJson" :dataModel3D="dataModel3D" :height="'100vh'" />
        </div>
        <pre id="coordinates" class="coordinates"></pre>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import Vue from 'vue';
import SearchDrawer from '../components/app/components/searchPage/searchDrawer';
import MapBox from '../components/map/MapBox.vue';
import { cTuongNH3DM, cCongNH3DM, cfMapbox } from '../components/map/config';
import TSelect from '../components/tailwind/TSelect.vue';
import apiService from '../apiService';
import CardDetail from '../components/app/components/searchPage/CardDetail.vue';
import Icon360Vr from '../icons/Icon360Vr.vue';
import IframeVr360 from '../components/map/components/vr360/IframeVr360.vue';
import mixinDirectStar from '../components/map/mixins/mixinDirectStar';
import mixinGetDataGeojsons from '../components/map/mixins/mixinGetDataGeojsons';
import mixinClearLayers from '../components/map/mixins/mixinClearLayers';
import mixinZoomMap from '../components/map/mixins/mixinZoomMap';
import eventBus from '../eventBus';
import mapBus from '../mapBus';
import PopupTombSelected from './PopupTombSelected.vue';

// Tạo một instance Vue cho component

export default {
    name: 'SearchPage',
    components: {
        SearchDrawer,
        MapBox,
        TSelect,
        CardDetail,
        Icon360Vr,
        IframeVr360,
    },
    mixins: [mixinDirectStar, mixinGetDataGeojsons, mixinClearLayers, mixinZoomMap],
    data() {
        return {
            vueInstance: null,
            showVr360: false,
            showCardDetail: false,

            cemeteryGid: null,
            cemeterySelected: null,
            cemeteriesData: [],
            dataGeoJsonActive: [],
            dataModel3D: [],
            cemeteries: [],
            mapId: 'map-search',
            mapInstance: null,
            showDrawer: true,
            dataGeoJson: [],
            loaded: false,
            streetPoints: [],
            arrayPointStreets: [],
            arrayPointRows: [],
            defaultStep: 0.0025,
            startCoordinates: [105.85035854494879, 20.926933507022554],
            startText: 'Vị trí của bạn',
            endCoordinates: [],
            tombFeatureSelected: null,
            tombItemSelected: null,
            isDiriect: false,
            tombsSearchSelect: [],
            myPopup: null,
            coordinatesPopup: null,
            popups: [],
            flag: false,
        };
    },
    computed: {},
    watch: {
        cemeteryGid: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.cemeterySelected = this.cemeteriesData.find((e) => e.gid === this.cemeteryGid);
                    if (this.cemeterySelected?.coordinates) {
                        const coordinates = JSON.parse(this.cemeterySelected.coordinates).coordinates;
                        this.zoomMap(coordinates);
                        this.setGeojsonByCim();
                        this.getDataLayers();
                        eventBus.$emit('updateFormFilter', {
                            cim_table: this.cemeterySelected.code,
                        });
                    }
                } else {
                    this.flag = false;
                }
            },
        },
    },
    methods: {
        toggleView360() {
            this.showVr360 = !this.showVr360;
        },
        toggleCardDetail() {
            this.showCardDetail = !this.showCardDetail;
        },
        resetHome() {
            this.closeFunction();
            this.tombFeatureSelected = null;
            this.tombItemSelected = null;
            this.cemeteryGid = null;
            this.cemeterySelected = null;
            this.dataGeoJsonActive = [];
            this.dataModel3D = [];
            this.zoomMap(cfMapbox.center, 5, 10);
            if (this.mapInstance?.getMyLayer()) {
                this.mapInstance.getMyLayer().forEach((el) => {
                    if (this.mapInstance.mapbox.getLayer(el)) this.mapInstance.mapbox.removeLayer(el);
                    if (this.mapInstance.mapbox.getSource(`${el}_source`)) this.mapInstance.mapbox.removeSource(`${el}_source`);
                });
            }
            this.clearLayerDirect();
            eventBus.$emit('resetFormFilter');
        },
        setGeojsonByCim() {
            if (this.cemeterySelected) {
                this.dataGeoJsonActive = [
                    this.cemeterySelected.code,
                    `${this.cemeterySelected.code}_floor2`,
                    `${this.cemeterySelected.code}_zone`,
                    `${this.cemeterySelected.code}_street`,
                    `${this.cemeterySelected.code}_wall`,
                    `${this.cemeterySelected.code}_street_point`,
                    `${this.cemeterySelected.code}_street_row`,
                ];
                const itemConfigTuong = cTuongNH3DM.find((e) => e.key === this.cemeterySelected.code);
                const itemConfigCong = cCongNH3DM.find((e) => e.key === this.cemeterySelected.code);
                if (itemConfigTuong) {
                    this.dataModel3D = [
                        {
                            path: `model/${this.cemeterySelected.code}_tuong.glb`,
                            config: itemConfigTuong.coordinates,
                            name: 'tuong-3d-ct',
                            scale: itemConfigTuong.scale,
                            rotation: itemConfigTuong.rotation,
                        },
                        {
                            path: `model/${this.cemeterySelected.code}_cong.glb`,
                            config: itemConfigCong.coordinates,
                            name: 'cong-3d',
                            scale: itemConfigCong.scale,
                            rotation: itemConfigCong.rotation,
                        },
                    ];
                }

                this.listenerCLickLayerTomb(this.cemeterySelected.code);
            }
        },
        mountMap(mapInstance) {
            this.mapInstance = mapInstance;
            this.listenerClickMap();
        },

        // Listener event map ( Click layer tomb)
        listenerClickMap() {
            this.mapInstance.mapbox.on('click', (e) => {
                // Lấy tọa độ (longitude và latitude) của vị trí được click
                const lngLat = e.lngLat;

                // In tọa độ vào console hoặc xử lý theo ý muốn của bạn
                console.log('Clicked at:', lngLat);
                // Xử lý thông tin vị trí được click ở đây
            });
        },
        // Listener event map ( Click layer tomb)
        handlerFilterTombByStatus(data) {
            const layer = this.cemeterySelected.code;

            const tombFeatures = this.mapInstance.mapbox.querySourceFeatures(`${layer}_source`, {
                sourceLayer: layer,
            });
            const reduceFeature = this.$utils.reduceDuplicateFeature(tombFeatures);
            reduceFeature.forEach((feature) => {
                data.forEach((tomb) => {
                    if (tomb.gid === feature.id) {
                        if (tomb.status === 'active') {
                            this.mapInstance.setStateFeature(`${layer}_source`, feature.id, 'active', true);
                            // this.mapInstance.mapbox.setFeatureState({ source: `${layer}_source`, id: feature.id }, { active: true });
                            // this.mapInstance.mapbox.setPaintProperty(layer, 'fill-extrusion-pattern', 'pattern-cim-active');
                        }
                        if (tomb.status === 'available') {
                            this.mapInstance.setStateFeature(`${layer}_source`, feature.id, 'available', true);
                            // this.mapInstance.mapbox.setPaintProperty(`${layer}`, 'fill-extrusion-pattern', 'pattern-cim-available');
                        }
                    }
                });
            });
        },
        listenerCLickLayerTomb(layer) {
            this.mapInstance.mapbox.on('click', layer, (e) => {
                // Thay đổi màu khi focus tomb
                const tombFeatures = this.mapInstance.mapbox.querySourceFeatures(`${layer}_source`, {
                    sourceLayer: layer,
                });
                const reduceFeature = this.$utils.reduceDuplicateFeature(tombFeatures);
                reduceFeature.forEach((feature) => {
                    if (feature.id === e.features[0].id) {
                        this.setEndpoint(feature, `${layer}_source`);
                    } else {
                        this.mapInstance.setStateFeature(`${layer}_source`, feature.id, 'selected', false);
                    }
                });
            });
        },

        getDataCemeteries() {
            apiService.getCemeterySelect().then((res) => {
                if (res.data) {
                    this.cemeteriesData = res.data;
                    this.cemeteries = res.data.map((e) => ({
                        text: `${e.name}, ${this.$utils.formatName(e.ward?.name)}, ${this.$utils.formatName(
                            e.district?.name,
                        )}, ${this.$utils.formatName(e.province?.name)}`,
                        value: e.gid,
                    }));
                }
            });
        },
        handlerClickTombSearch(item) {
            this.clearSelectLayersByName(item.cim_table);

            const features = this.mapInstance.mapbox.querySourceFeatures(`${item.cim_table}_source`, {
                sourceLayer: `${item.cim_table}_source`, // Sử dụng tên nguồn dữ liệu làm tên sourceLayer
                filter: ['==', '$id', item.gid], // Lọc feature dựa trên ID
            });

            if (features.length > 0) {
                const feature = features[0]; // feature duy nhất với ID đã cho
                this.setEndpoint(feature, `${item.cim_table}_source`);
            }
        },
        handlerLoadedGeoJson(key) {
            if (!this.cemeterySelected) return;
            if (key === this.cemeterySelected.code) {
                if (!this.flag) {
                    apiService.getCemeteryByStatusMap().then((res) => {
                        if (res.data) {
                            const gids = res.data;
                            this.handlerFilterTombByStatus(gids);
                            this.flag = true;
                        }
                    });
                }
            }
        },
        setEndpoint(feature, layerName) {
            this.tombItemSelected = null;
            this.tombFeatureSelected = feature;
            apiService.getCemeterySingleById(feature.id).then((res) => {
                if (res.data) {
                    this.tombItemSelected = res.data;
                    this.initPopup();
                }
            });
            const beginPolygon = feature.geometry.coordinates[0];

            const movedPolygon = this.moveCenterUp([...beginPolygon]);
            // Tính trung tâm sau khi di chuyển
            const centerAfter = this.calculatePolygonCenter(movedPolygon);
            const pointEnd = [centerAfter.x, centerAfter.y];
            this.endCoordinates = pointEnd;

            this.mapInstance.setStateFeature(layerName, feature.id, 'selected', true);
            this.zoomMap(this.endCoordinates, 23);
            this.showDirect();
            // this.showCardDetail = true;

            const centerPopup = this.movePointPopup([...feature.geometry.coordinates[0]]);
            const centerPointPopup = this.calculatePolygonCenter(centerPopup);
            this.coordinatesPopup = [centerPointPopup.x, centerPointPopup.y];
        },
        closeFunction() {
            if (this.myPopup) {
                this.myPopup.remove();
                this.vueInstance.$destroy();
                this.myPopup = null;
            }
        },
        initPopup() {
            if (this.myPopup) {
                this.vueInstance.$destroy();
                this.myPopup.remove();
                this.myPopup = null;
            }
            const propsData = {
                tombItemSelected: this.tombItemSelected,
                // Thêm các props khác cần truyền vào
            };
            // Tạo một instance Vue cho component
            const MyPopupComponent = Vue.extend(PopupTombSelected);

            // Tạo một popup và đặt nội dung từ component Vue
            this.myPopup = new mapboxgl.Popup({ closeOnClick: false, closeButton: false }).setLngLat(this.coordinatesPopup);
            // Để reset lại nội dung của popup, gán nó thành null hoặc một phần tử DOM trống.

            // Đặt nội dung từ component Vue
            this.vueInstance = new MyPopupComponent({
                closePopup: this.closePopup,
                propsData,
            }).$mount();
            this.vueInstance.$on('close-popup', () => {
                // Ở đây bạn có thể gọi closeFunction để xử lý khi đóng popup
                this.closeFunction();
            });
            // Thay đổi width của phần tử DOM của popup
            // this.vueInstance.$el.style.width = '300px';
            this.myPopup.setDOMContent(this.vueInstance.$el);

            // Thêm popup vào bản đồ
            this.myPopup.addTo(this.mapInstance.mapbox);
        },
    },
    created() {
        this.loaded = true;
        this.getDataCemeteries();
        mapBus.$on('loadedGeoJson', this.handlerLoadedGeoJson);
        mapBus.$on('toggleDetailTomb', this.toggleCardDetail);
        mapBus.$on('clickTombSearch', this.handlerClickTombSearch);
    },
    beforeDestroy() {
        mapBus.$off('loadedGeoJson', this.handlerLoadedGeoJson);
        mapBus.$off('toggleDetailTomb', this.toggleCardDetail);
        mapBus.$off('clickTombSearch', this.handlerClickTombSearch);
    },
};
</script>

<style scoped>
/* Phần tử góc trên cùng */
.color-legend {
    font-size: 11px;
    z-index: 20;
    position: absolute;
    top: 6%;
    right: 3%;
    background-color: white; /* Màu 1 */
    padding: 5px;
    border: 1px solid gainsboro;
    border-radius: 5px;
}

.color-dot {
    width: 11px; /* Đường kính hình tròn */
    height: 11px; /* Đường kính hình tròn */
    border-radius: 50%; /* Làm hình tròn */
    display: inline-block;
    margin-right: 10px; /* Khoảng cách giữa hình tròn và mô tả */
}
.search-cim-home {
    width: 20%;
    position: absolute;
    top: 3%; /* Đặt top ở giữa chiều dọc */
    left: 87%; /* Đặt left ở giữa chiều ngang */
    transform: translate(-50%, -50%); /* Dịch chuyển phần tử để căn giữa */
    z-index: 20;
}

.button-home {
    background-color: white;
    position: absolute;
    top: 3%; /* Đặt top ở giữa chiều dọc */
    left: 75%; /* Đặt left ở giữa chiều ngang */
    transform: translate(-50%, -50%); /* Dịch chuyển phần tử để căn giữa */
    z-index: 20;
    width: 30px;
    height: 32px;
    background-color: white;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.button-direct {
    background-color: white;
    position: absolute;
    top: 3%; /* Đặt top ở giữa chiều dọc */
    left: 72%; /* Đặt left ở giữa chiều ngang */
    transform: translate(-50%, -50%); /* Dịch chuyển phần tử để căn giữa */
    z-index: 20;
    width: 30px;
    height: 32px;
    background-color: white;
    border-radius: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.coordinates {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    position: absolute;
    top: 6%; /* Đặt top ở giữa chiều dọc */
    left: 87%; /* Đặt left ở giữa chiều ngang */
    padding: 5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
    z-index: 100;
}
</style>
