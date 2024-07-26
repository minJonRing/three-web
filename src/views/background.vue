<template>
    <div class="background">


    </div>
</template>

<script>
import * as THREE from 'three';
export default {
    name: 'Background',
    data() {
        return {
        }
    },
    mounted() {
        this.createScene()
        this.createCamera()
        this.createLight()
        this.createRenderer()
        this.init()
        // 动画
        this.renderer.setAnimationLoop(this.animate);
    },
    methods: {
        createScene() {
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0xffffff, 0.002);
            console.log(scene)
            scene.background = new THREE.Color(0x000000);
            scene.backgroundBlurriness = 0.2
            this.scene = scene;
        },
        createCamera() {
            // 相机
            const fov = 45;
            const aspect = window.innerWidth / window.innerHeight; // the canvas default
            const near = 1;
            const far = 1000;
            const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            camera.position.set(0, 1, 10);
            // camera.updateProjectionMatrix();
            this.camera = camera;
        },
        createLight() {
            // 光线
            let light = null;
            // 环境光
            light = new THREE.AmbientLight(0xffffff, 0.1);
            this.scene.add(light);
        },
        createRenderer() {
            // 输出
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setClearColor(this.scene.fog.color);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            console.log(renderer.domElement)
            document.querySelector('.background').appendChild(renderer.domElement);
            this.renderer = renderer
        },
        resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, true);
            }
            return needResize;
        },
        animate() {
            if (this.resizeRendererToDisplaySize(this.renderer)) {
                const canvas = this.renderer.domElement;
                this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                this.camera.updateProjectionMatrix();
            }
            const time = Date.now() * 0.005;

            this.sphere.rotation.z = 0.01 * time;

            const geometry = this.sphere.geometry;
            const attributes = geometry.attributes;

            for (let i = 0; i < attributes.size.array.length; i++) {

                attributes.size.array[i] = 14 + 13 * Math.sin(0.1 * i + time);

            }

            attributes.size.needsUpdate = true;
            this.renderer.render(this.scene, this.camera);
        },
        init() {
            // 坐标轴辅助器
            const axesHelper = new THREE.AxesHelper(200);
            this.scene.add(axesHelper);
            // plane
            // this.createPlane()
            // points
            const amount = 100000;
            const radius = 200;

            const positions = new Float32Array(amount * 3);
            const colors = new Float32Array(amount * 3);
            const sizes = new Float32Array(amount);

            const vertex = new THREE.Vector3();
            const color = new THREE.Color(0xffffff);
            for (let i = 0; i < amount; i++) {

                vertex.x = (Math.random() * 2 - 1) * radius;
                vertex.y = (Math.random() * 2 - 1) * radius;
                vertex.z = (Math.random() * 2 - 1) * radius;
                vertex.toArray(positions, i * 3);

                if (vertex.x < 0) {

                    color.setHSL(0.5 + 0.1 * (i / amount), 0.7, 0.5);

                } else {

                    color.setHSL(0.0 + 0.1 * (i / amount), 0.9, 0.5);

                }

                color.toArray(colors, i * 3);

                sizes[i] = 10;

            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.ShaderMaterial({

                uniforms: {
                    color: { value: new THREE.Color(0xffffff) },
                    pointTexture: { value: new THREE.TextureLoader().load('spark1.png') }
                },
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,

                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true

            });

            //

            const sphere = new THREE.Points(geometry, material);
            this.sphere = sphere
            this.scene.add(sphere);
        },
        createPlane() {
            // 地面
            const planeGeometry = new THREE.PlaneGeometry(50, 50);
            const planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -0.05
            this.scene.add(plane);
        },
    }
}
</script>

<style lang="scss" scoped>
.background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>