<template>
    <div>
        <div :id="mapId" :style="{ height: height }"></div>
        <div v-if="mapInstance">
            <tile-base-popup v-if="isShowTileMap" />
            <tool-draw-mapbox :mapInstance="mapInstance" />
        </div>
        <map-loader />
    </div>
</template>

<script>
import Map from './index';
import eventBus from '../../eventBus';
// Mixins
import mixinListenerTileMap from './mixins/mixinListenerTileMap';
import mixinClearLayers from './mixins/mixinClearLayers';
import mixinGlobalMarker from './mixins/mixinGlobalMarker';
import { cfMapDefault } from './config';

// Component
const TileBasePopup = () => import('./components/popup/TileBasePopup');
const ToolDrawMapbox = () => import('./components/popup/ToolDrawMapbox');
const MapLoader = () => import('./components/loader/MapLoader');

export default {
    name: 'MapBox',
    components: {
        TileBasePopup,
        MapLoader,
        ToolDrawMapbox,
    },
    data() {
        return {
            isShowTileMap: false,

            mapInstance: null,
            pZoneSelected: null,
            zoneSelected: null,
            tombSelected: null,
        };
    },
    mixins: [
        mixinListenerTileMap, // Mixin lắng nghe sự kiện thay đổi loại bản đồ
        mixinClearLayers, // Xóa hết toàn bộ layer
        mixinGlobalMarker, // Xóa hết toàn bộ layer
    ],
    props: {
        mapId: {
            type: String,
            require: true,
            default: 'map-defautl',
        },
        height: {
            default: '100vh',
        },
        dataGeoJson: {
            type: Array,
            default: () => [],
        },
        dataModel3D: {
            type: Array,
            default: () => [],
        },
    },
    watch: {
        dataGeoJson: {
            immediate: false,
            deep: true,
            handler() {
                this.handlerLoad3D();
                this.handlerLoadGeojson(this.dataGeoJson);
            },
        },
    },
    methods: {
        handlerLoadPattern() {
            this.mapInstance.mapbox.loadImage('./images/tom.jpg', (err, image) => {
                if (err) throw err;
                this.mapInstance.mapbox.addImage('pattern-cim-active', image, { pixelRatio: 2 });
            });
            this.mapInstance.mapbox.loadImage('./images/tomb_ma.jpg', (err, image) => {
                if (err) throw err;
                this.mapInstance.mapbox.addImage('pattern-cim-available', image, { pixelRatio: 2 });
            });
            this.mapInstance.mapbox.loadImage('./images/wa.jpg', (err, image) => {
                if (err) throw err;
                this.mapInstance.mapbox.addImage('pattern-wall', image, { pixelRatio: 10 });
            });
        },

        handlerLoad3D() {
            if (this.dataModel3D?.length > 0) {
                this.dataModel3D.forEach((model) => {
                    if (model.scale) {
                        const scaleX = model.scale.x || 1;
                        const scaleY = model.scale.y || 1;
                        const scaleZ = model.scale.z || 1;

                        // Tạo biến để lưu trữ màu mặc định
                        const defaultColor = '#ff0000'; // Màu đỏ

                        this.mapInstance.addModel(model.path, model.config, model.name, (gltf, scene) => {
                            gltf.scene.scale.set(scaleX, scaleY, scaleZ);
                            gltf.scene.rotation.y = model.rotation || 0;

                            // Thêm thuộc tính màu mặc định vào model
                            gltf.scene.userData = { color: defaultColor };

                            scene.add(gltf.scene);
                        });
                    }
                });
            }
        },

        handlerLoadGeojson(geoJsonInput) {
            if (geoJsonInput?.length > 0) {
                geoJsonInput.forEach((geojson) => {
                    this.mapInstance.loadGeojson(geojson.path, geojson.name, geojson.style, geojson.type);
                    // this.mapInstance.load3DbyGeojson(geojson.path, geojson.name, geojson.style, geojson.type);
                });
            }
        },
        // Mount map
        mountedMap() {
            this.handlerLoadPattern();
            // this.handlerLoad3D();
            // this.handlerLoadGeojson();
            this.loadGlobalMarker();
        },
    },
    mounted() {
        // Init Map
        this.mapInstance = new Map(this.mapId, cfMapDefault);
        this.$emit('mapInstance', this.mapInstance);
        // Init Listener
        this.mapInstance.mapbox.on('style.load', this.mountedMap);
    },

    created() {
        eventBus.$emit('loading');
    },
};
</script>

<style lang="css" scoped></style>
