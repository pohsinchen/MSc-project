import * as THREE from 'https://unpkg.com/three@0.118.3/build/three.module.js';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.118.3/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://unpkg.com/three@0.118.3/examples/jsm/libs/stats.module.js';
import {
    PLYLoader
} from 'https://unpkg.com/three@0.118.3/examples/jsm/loaders/PLYLoader.js';

var container, stats;

var camera, scene, renderer;

var points;

var div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

init();
// animate();

// function init() {

//     container = document.getElementById('container');

//     //

//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 3500);
//     camera.position.z = 2750;

//     scene = new THREE.Scene();
//     // scene.background = new THREE.Color(0x050505);
//     // scene.fog = new THREE.Fog(0x050505, 2000, 3500);

//     //

//     var particles = 5000; // The number of points

//     var geometry = new THREE.BufferGeometry();

//     var positions = []; // The positions of points
//     var colors = []; // The colour of points

//     var color = new THREE.Color();

//     var n = 1000, // The maximum length of xyz
//         n2 = n / 2; // particles spread in the cube

//     for (var i = 0; i < particles; i++) { // The 

//         // positions

//         var x = Math.random() * n - n2;
//         var y = Math.random() * n - n2;
//         var z = Math.random() * n - n2;

//         positions.push(x, y, z);

//         // colors

//         var vx = (x / n) + 0.5;
//         var vy = (y / n) + 0.5;
//         var vz = (z / n) + 0.5;

//         color.setRGB(vx, vy, vz);

//         colors.push(color.r, color.g, color.b);

//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); // Set the positions in the geometry
//     geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); // Set the respective colour of the positions in the geometry

//     geometry.computeBoundingSphere();

//     //

//     var material = new THREE.PointsMaterial({ // Set the material as point
//         size: 15,
//         vertexColors: true
//     });

//     points = new THREE.Points(geometry, material); // Combine the geomerty and material
//     scene.add(points); // Add it into the scene

//     //

//     // Set the renderer
//     renderer = new THREE.WebGLRenderer({alpha: true});
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     container.appendChild(renderer.domElement);

//     //

//     stats = new Stats();
//     container.appendChild(stats.dom);

//     //

//     window.addEventListener('resize', onWindowResize, false);

// }

function init() {

    window.addEventListener('resize', onWindowResize, false);

    // Camera
    camera = new THREE.PerspectiveCamera(7, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 80;
    camera.position.y = 30;

    // Scene
    scene = new THREE.Scene();

    // AxesHelper
    scene.add(new THREE.AxesHelper(20));

    // GridHelper
    scene.add(new THREE.GridHelper(20, 20));

    // Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    stats = new Stats();
    container.appendChild(stats.dom);

    const loader = new PLYLoader();
    loader.load("./apt.ply", function (geometry) {
        
        geometry.computeBoundingSphere();

        var material = new THREE.PointsMaterial({ // Set the material as point
            // size: 1,
            vertexColors: true
        });

        points = new THREE.Points(geometry, material); // Combine the geomerty and material

        points.rotation.x = -Math.PI / 2;
        points.position.y = +26;
        points.position.z = -2;
        points.position.x = +1;

        scene.add(points); // Add it into the scene

        animate();

        function animate() {

            requestAnimationFrame(animate);
        
            render();
            renderer.render(scene, camera);
            stats.update();
        
        }
        
        function render() {
        
            var time = Date.now() * 0.001;
        
            // points.rotation.x = time * 0.25;
            points.rotation.z = time * 0.5;
        
            renderer.render(scene, camera);
        
        }

    });

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

// function animate() {

//     requestAnimationFrame(animate);

//     // render();
//     renderer.render(scene, camera);
//     stats.update();

// }

// function render() {

//     var time = Date.now() * 0.001;

//     // points.rotation.x = time * 0.25;
//     points.rotation.y = time * 0.5;

//     renderer.render(scene, camera);

// }

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
var controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
}); // add this only if there is no animation loop (requestAnimationFrame)