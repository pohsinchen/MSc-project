import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://unpkg.com/three@0.118.3/examples/jsm/libs/stats.module.js';
import {
    STLLoader
} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/STLLoader.js';

var container, stats;

var camera, scene, renderer, dirLight, dirLightHeper, hemiLight, hemiLightHelper;

var mesh;

var div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

var printer;

var num_ply = 2366;

var index = 1;

const loader = new STLLoader();

const material = new THREE.MeshPhongMaterial({ // Set up the material for mesh
    vertexColors: THREE.VertexColors,
    color: new THREE.Color('white'),
});

init();
animate();

document.addEventListener('readystatechange', event => {

    printer = setInterval(function () {

        var dir = "./stl/stl_" + index + ".stl";

        loader.load(dir, function (geometry) { // Load STL file

            cleanObject();
            indexChange();

            geometry.computeBoundingSphere();

            mesh = new THREE.Mesh(geometry, material); // Combine the geomerty and material
            scene.add(mesh); // Add it into the scene

            renderer.render(scene, camera);

        }, () => {}, (error) => { // If there is no file

            cleanObject();
            indexChange();

        });

    }, 1);

});

function init() {

    container = document.getElementById('container');

    // Camera
    camera = new THREE.PerspectiveCamera(7, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 80;
    camera.position.y = 0;

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.6, 0, 1);
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    // light
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    var d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
    scene.add(dirLightHeper);

    // AxesHelper
    scene.add(new THREE.AxesHelper(20));

    // GridHelper
    scene.add(new THREE.GridHelper(20, 20));

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener('resize', onWindowResize, false);

}

function indexChange() { // Change the index of file number

    if (index < num_ply) {
        index += 1;
    } else { // If it is out of the range, stop rendering
        clearInterval(printer);
    }

}

function cleanObject() { // Clean the previous mesh before rendering a new mesh

    scene.remove(mesh);

}

function animate() { // Update the scene everytime
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    stats.update();

}

function onWindowResize() { // Resize the window

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// Add an orbit control which allows us to move around the scene.
var controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
});