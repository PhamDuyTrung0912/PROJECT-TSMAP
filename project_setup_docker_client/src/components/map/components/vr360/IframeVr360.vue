<template>
    <div>
        <div class="absolute top-0 right-0 w-full h-full" id="panorama-container"></div>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import * as PANOLENS from 'panolens';
import * as THREE from 'three';

export default {
    props: {},
    data() {
        return {
            viewer: null,
            panorama1: null,
            panorama2: null,
        };
    },
    methods: {},
    mounted() {
        let panorama = null;
        let panorama2 = null;
        let viewer = null;
        let container = null;
        let infospot = null;

        const lookAtPositions = [new THREE.Vector3(4871.39, 1088.07, -118.41), new THREE.Vector3(1278.27, 732.65, 4769.19)];

        const infospotPositions = [new THREE.Vector3(3136.06, 1216.3, -3690.14), new THREE.Vector3(3258.81, -295.5, 3771.13)];

        container = document.querySelector('#panorama-container');

        panorama = new PANOLENS.ImagePanorama('vr360/vr_1.jpg');
        panorama.addEventListener('enter-fade-start', () => {
            viewer.tweenControlCenter(lookAtPositions[0], 0);
        });

        panorama2 = new PANOLENS.ImagePanorama('vr360/vr_2.jpg');
        panorama2.addEventListener('enter', () => {
            viewer.tweenControlCenter(lookAtPositions[1], 0);
        });

        panorama.link(panorama2, infospotPositions[0]);
        panorama2.link(panorama, infospotPositions[1]);

        infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
        infospot.position.set(0, -2000, -5000);

        panorama.add(infospot);

        viewer = new PANOLENS.Viewer({ output: 'console', container });
        viewer.add(panorama, panorama2);
    },
};
</script>

<style></style>
