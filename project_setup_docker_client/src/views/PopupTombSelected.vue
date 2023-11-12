<template>
    <div>
        <!-- <span @click="closePopup()" class="mdi mdi-window-close text-large absolute top-2 right-1 cursor-pointer text-red-500"></span> -->

        <!-- <div ref="canvasContainer" class="mb-2"></div> -->

        <div class="grid grid-cols-12 gap-0">
            <div class="text-xs col-span-11 text-secondary">
                <div class="grid grid-cols-12 gap-0">
                    <div class="text-xs col-span-12 text-secondary">
                        <div class="text-secondary text-sm font-bold mb-1 rounded-lg">{{ tombItemSelected.hoten }}</div>
                    </div>
                </div>
                <div class="grid grid-cols-12 gap-0">
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3">Năm sinh</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3 font-bold">{{ tombItemSelected.namsinh }}</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3">Năm mất</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3 font-bold">{{ tombItemSelected.namhysinh }}</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3">Khu vực</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3 font-bold">{{ tombItemSelected.khu }}</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3">Số hàng</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3 font-bold">{{ tombItemSelected.hangmo }}</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3">Số cột</div>
                    </div>
                    <div class="text-xs col-span-6 text-secondary pt-1">
                        <div class="text-xs text-[#55686D] col-span-3 font-bold">{{ tombItemSelected.somo }}</div>
                    </div>
                </div>
            </div>
            <div class="text-xs col-span-1 text-secondary">
                <div class="pt-1 ">
                    <span @click="closePopup" class="mdi mdi-close text-[18px] cursor-pointer text-red-500"></span>
                </div>
                <div class="pt-1 mt-1">
                    <span class="mdi mdi-printer-3d text-[18px] cursor-pointer "></span>
                </div>
                <div class="pt-1">
                    <span @click="showDetailPopup()" class="mdi mdi-information-outline text-[18px] cursor-pointer "></span>
                </div>
                <div class="pt-1">
                    <span class="mdi mdi-pencil text-[18px] cursor-pointer "></span>
                </div>
                <div class="pt-1">
                    <span class="mdi mdi-family-tree text-[18px] cursor-pointer "></span>
                </div>
            </div>
        </div>
        <!-- <div class="relative group">
            <span class="pl-3 mdi mdi-family-tree text-[18px] cursor-pointer text-primary"></span>
            <span
                class="bg-gray-50 text-blue-900 invisible transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:visible absolute py-0.5 -right-3 -top-10 rounded-md"
                >Cây gia phả</span
            >
        </div> -->

        <!-- Đặt mã HTML và logic tùy chỉnh ở đây -->
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import mapBus from '../mapBus';

export default {
    name: 'PopupTombSelected',
    props: {
        tombItemSelected: {
            type: Object,
        },
    },
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            model: null,
        };
    },
    methods: {
        closePopup() {
            this.$emit('close-popup');
        },

        showDetailPopup() {
            mapBus.$emit('toggleDetailTomb');
        },

        onWindowResize() {
            this.camera.aspect = 280 / 150;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(280, 150);

            this.render();
        },

        //
        render() {
            this.renderer.render(this.scene, this.camera);
        },

        init() {
            this.camera = new THREE.PerspectiveCamera(45, 280 / 150, 0.01, 30);
            this.camera.position.set(-1.7367731211334672, 2.525352380155818, 2.650957613261132);

            this.scene = new THREE.Scene();

            this.scene.add(new THREE.AmbientLight(0xffffff, 3));

            const directionalLight = new THREE.DirectionalLight(0xffeedd, 3);
            directionalLight.position.set(0, 0, 2);
            this.scene.add(directionalLight);

            const loader = new GLTFLoader().setPath('model/');
            loader.load('cim_ngochoi_mo.glb', (gltf) => {
                this.scene.add(gltf.scene);

                this.render();
            });

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(280, 150);
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1;
            if (!this.$refs.canvasContainer) return;
            this.$refs.canvasContainer.appendChild(this.renderer.domElement);

            const controls = new OrbitControls(this.camera, this.renderer.domElement);
            controls.addEventListener('change', this.render); // use if there is no animation loop
            controls.minDistance = 2;
            controls.maxDistance = 10;
            // controls.target.set(0, 0, 0);
            controls.update();

            window.addEventListener('resize', this.onWindowResize);
        },
    },
    created() {},
    mounted() {
        // this.init();
        // this.render();
    },
    beforeDestroy() {
    },
};
</script>

<style scoped>
/* Đặt kiểu dáng tùy chỉnh cho component ở đây */
</style>
