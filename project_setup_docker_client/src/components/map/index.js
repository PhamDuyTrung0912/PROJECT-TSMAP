// eslint-disable-next-line import/no-extraneous-dependencies
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// eslint-disable-next-line import/no-extraneous-dependencies
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import Threebox from 'threebox-plugin/src/Threebox';
import Vue from 'vue';
import { cfMapbox, cfMapDefault } from './config';
import { stylePolygonDefault } from './default';
import Model3DLayer from './layers/Model3DLayer';

import eventBus from '../../eventBus';
import mapBus from '../../mapBus';
// Import lớp CSS từ thư viện Material Design Icons
export default class Map {
    constructor(mapId = 'map-defautl', config = cfMapDefault) {
        this.myLayer = [];
        this.initMap(mapId);
        this.init3Box();

        if (config.fControl) {
            this.showNavigationControl();
        }

        if (config.fSearch) {
            this.showMapboxGeocode();
        }

        this.mapbox.on('load', () => {
            eventBus.$emit('loaded');
            console.log('Khởi tạo Map thành công !');

            this.listenerClickMap();
        });
    }

    // Getter
    getMyLayer() {
        return this.myLayer;
    }

    getMapbox() {
        return this.mapbox;
    }

    // Setter
    setStateFeature(sourceName, featureId, key, value) {
        if (new Vue().$utils.checkParamsNotNull(sourceName, featureId, key, value)) {
            this.mapbox.setFeatureState(
                {
                    source: sourceName,
                    id: featureId,
                },
                { [`${key}`]: value },
            );
        }
    }

    // Filter

    // Init config and setting map
    initMap(mapId) {
        mapboxgl.accessToken = process.env.VUE_APP_KEY_MAPBOX;
        this.mapbox = new mapboxgl.Map({
            ...cfMapbox,
            container: mapId,
        });
    }

    init3Box() {
        // eslint-disable-next-line no-multi-assign
        this.tb = window.tb = new Threebox(this.mapbox, this.mapbox.getCanvas().getContext('webgl'), {
            defaultLights: true,
        });
    }

    // Control
    showNavigationControl() {
        this.mapbox.addControl(
            new mapboxgl.NavigationControl({
                showZoom: true, // Hiển thị nút thu phóng
                showCompass: true, // Ẩn nút góc đông
                showPitch: true, // Hiển thị nút lớp độc lập
                showZoomSlider: true, // Hiển thị thanh trượt thu phóng
                visualizePitch: true, // Ẩn biểu đồ độ nghiêng
            }),
            'top-right',
        );
    }

    showMapboxGeocode() {
        this.mapbox.addControl(
            new MapboxGeocoder({
                accessToken: process.env.VUE_APP_KEY_MAPBOX,
                mapboxgl,
            }),
            'top-left',
        );
    }

    // Sự kiện trên bản đồ
    listenerClickMap() {
        this.mapbox.on('click', () => { });
    }

    // Xử lý re-render map khi thay đổi style layer;
    reRender() {
        return this.mapbox.triggerRepaint();
    }

    // Loader
    // (Image)
    loadTiles(path, coordinatesTiles) {
        if (path) {
            this.mapbox.on('load', () => {
                this.mapbox.addSource('image-architect', {
                    type: 'image',
                    url: path,
                    coordinates: coordinatesTiles,
                });
                this.mapbox.addLayer({
                    id: 'radar-layer',
                    type: 'raster',
                    source: 'image-architect',
                    paint: {},
                });
            });
        }
    }

    // (3D Model)
    // (3D Model)
    addModel(url, origin, key, callback) {
        this.mapbox.addLayer(
            new Model3DLayer({
                id: `${key}`,
                url,
                origin,
                callback: (gltf, scene) => {
                    gltf.scene.scale.set(0.062, 0.062, 0.062);
                    gltf.scene.rotation.y = -1.067;
                    scene.add(gltf.scene);
                    // Gọi callback nếu được cung cấp
                    if (callback) {
                        callback(gltf, scene);
                    }
                },
            }),
        );

        const check = this.myLayer.find((e) => e === key);
        if (!check) this.myLayer.push(key);
    }

    // (Geojson)
    loadGeojson(url, key, style = stylePolygonDefault, typeLayer = 'fill-extrusion') {
        fetch(url).then((rs) => {
            rs.json().then((data) => {
                this.loadLayer(data, key, style, typeLayer);
            });
        });
    }

    // (Geojson)
    // eslint-disable-next-line no-unused-vars
    load3DbyGeojson(url, key, _style = stylePolygonDefault, _typeLayer = 'fill-extrusion') {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // Lặp qua từng đối tượng trong dữ liệu GeoJSON
                data.features.forEach((feature) => {
                    // Lấy tập hợp tọa độ của đối tượng (ví dụ: lấy tọa độ đầu tiên của đa giác)
                    const coordinates = feature.geometry.coordinates[0][0];

                    // Tính toán tọa độ trung bình của các tọa độ trong đa giác
                    const lngSum = coordinates.reduce((sum, coord) => sum + coord[0], 0);
                    const latSum = coordinates.reduce((sum, coord) => sum + coord[1], 0);
                    const lngLat = new mapboxgl.LngLat(lngSum / coordinates.length, latSum / coordinates.length);

                    // Tạo và thêm model 3D tại vị trí của đối tượng
                    const modelUrl = 'model/cong_v1.glb';
                    const origin = lngLat; // Sử dụng đối tượng LngLat đã tính toán
                    const modelName = `${key}-${feature.id}`; // Đặt tên cho model

                    this.addModel(modelUrl, origin, modelName, (gltf, scene) => {
                        // Tùy chỉnh model 3D (nếu cần)
                        gltf.scene.scale.set(0.062, 0.062, 0.062);
                        gltf.scene.rotation.y = -1.067;
                        // Thêm model vào bản đồ
                        scene.add(gltf.scene);
                    });
                });
            });
    }

    loadLayer(data, key, style, typeLayer) {
        console.log('data-log');
        if (!this.mapbox.getSource(`${key}_source`)) {
            this.mapbox.addSource(`${key}_source`, {
                type: 'geojson',
                data,
            });
        }

        // this.mapbox.on('data', (e) => {
        //     if (e.sourceId === `${key}_source` && e.isSourceLoaded) {
        //     }
        // });

        // Kiểm tra xem layer đã tồn tại chưa
        if (!this.mapbox.getLayer(`${key}`)) {
            this.mapbox.addLayer({
                id: `${key}`,
                type: typeLayer,
                source: `${key}_source`,
                minzoom: cfMapDefault.minZoom,
                paint: style.paint || {},
                layout: style.layout || {},
            });

            const check = this.myLayer.find((e) => e === key);
            if (!check) this.myLayer.push(key);
            mapBus.$emit('loadedGeoJson', key);
        }
    }
}
