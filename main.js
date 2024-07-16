import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 + Math.PI / 100;
scene.add(earthGroup);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("./assets/earthmap1k.jpg"),
});
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffffff);
sunLight.position.set(-2, -0.5, 1.5);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.0007;
  renderer.render(scene, camera);
}

animate();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);
