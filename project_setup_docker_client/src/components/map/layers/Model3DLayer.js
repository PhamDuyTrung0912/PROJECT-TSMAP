// eslint-disable-next-line import/no-extraneous-dependencies
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    Camera, DirectionalLight, Matrix4, Scene, Vector3, WebGLRenderer,
} from 'three';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

class Model3DLayer {
    constructor(options) {
        this.modelUrl = options.url;
        this.modelOrigin = options.origin;
        this.modelAltitude = options.altitude;
        this.callback = options.callback;
        this.id = options.id;
        this.type = 'custom';
        this.renderingMode = '3d';
        const rotate = [Math.PI / 2, 0, 0];
        const mercator = mapboxgl.MercatorCoordinate.fromLngLat(this.modelOrigin, this.modelAltitude);

        this.modelTransform = {
            translateX: mercator.x,
            translateY: mercator.y,
            translateZ: mercator.z,
            rotateX: rotate[0],
            rotateY: rotate[1],
            rotateZ: rotate[2],
            scale: mercator.meterInMercatorCoordinateUnits(),
        };
    }

    onAdd(map, gl) {
        this.map = map;
        this.camera = new Camera();
        this.scene = new Scene();

        // Tạo nguồn sáng
        const directionalLight = new DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, -20, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(0, 20, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new GLTFLoader();
        const draco = new DRACOLoader();
        draco.setDecoderConfig({ type: 'js' });
        draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(draco);
        loader.load(this.modelUrl, (gltf) => {
            this.scene.add(gltf.scene);
            if (this.callback) this.callback(gltf, this.scene);
        });

        this.renderer = new WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: false,
        });

        this.renderer.autoClear = false;
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2;
    }

    render(gl, matrix) {
        const modelTransform = this.modelTransform;
        const rotationX = new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), modelTransform.rotateX);
        const rotationY = new Matrix4().makeRotationAxis(new Vector3(0, 1, 0), modelTransform.rotateY);
        const rotationZ = new Matrix4().makeRotationAxis(new Vector3(0, 0, 1), modelTransform.rotateZ);

        const m = new Matrix4().fromArray(matrix);
        const l = new Matrix4()
            .makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
            .scale(new Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
}

export default Model3DLayer;
