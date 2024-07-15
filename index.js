import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './src/getStarfield.js';
//create the renderer and add it to the DOM
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//Set up the camera and passing in the field of view, aspect ratio, near and far clipping planes
//////field of view is set to the angle of the camera's view in degrees
//////aspect ratio is the width of the camera's view divided by the height
//////near and far clipping planes are the distances from the camera that objects will be rendered
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
const scene = new THREE.Scene();

const marsGroup = new THREE.Group();
marsGroup.rotation.z = -25.19 * Math.PI / 180;
scene.add(marsGroup);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//Create a geometry shape and material for a mesh to the empty scene (this part can be deleted)
const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1.0, 50);
const mat = new THREE.MeshStandardMaterial({
    map: loader.load('textures/mars_4k_color.jpg'),
});
const marsMesh = new THREE.Mesh(geo, mat);
//adding the shape and material to the scene in this case marsGroup 
marsGroup.add(marsMesh);

const lightsMat = new THREE.MeshBasicMaterial()
const lightMesh = new THREE.Mesh(geo, lightsMat);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

// creating a light source to illuminate the scene and adding it to the scene
// const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x000000, 1);
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
sunLight.position.set(-1.5, 0.5, 1.5);
scene.add(sunLight);

//Create a render loop to render the scene to the camera
function animate (t = 0) {
    requestAnimationFrame(animate);
    marsMesh.rotation.y = t * 0.0005;
    renderer.render(scene, camera);
    controls.update();
}
animate();  