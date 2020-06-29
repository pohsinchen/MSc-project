import './style.css';

import Stats from 'three/examples/jsm/libs/stats.module.js';

var container, stats;

var camera, scene, renderer;

var points;

var div = document.createElement("div");
div.id = "container";
document.body.appendChild(div);

init();
animate();

function init() {

    container = document.getElementById('container');

    //

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 3500);
    camera.position.z = 2750;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x050505);
    // scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    //

    var particles = 5000; // The number of points

    var geometry = new THREE.BufferGeometry();

    var positions = []; // The positions of points
    var colors = []; // The colour of points

    var color = new THREE.Color();

    var n = 1000, // The maximum length of xyz
        n2 = n / 2; // particles spread in the cube

    for (var i = 0; i < particles; i++) { // The 

        // positions

        var x = Math.random() * n - n2;
        var y = Math.random() * n - n2;
        var z = Math.random() * n - n2;

        positions.push(x, y, z);

        // colors

        var vx = (x / n) + 0.5;
        var vy = (y / n) + 0.5;
        var vz = (z / n) + 0.5;

        color.setRGB(vx, vy, vz);

        colors.push(color.r, color.g, color.b);

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); // Set the positions in the geometry
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); // Set the respective colour of the positions in the geometry

    geometry.computeBoundingSphere();

    //

    var material = new THREE.PointsMaterial({ // Set the material as point
        size: 15,
        vertexColors: true
    });

    points = new THREE.Points(geometry, material); // Combine the geomerty and material
    scene.add(points); // Add it into the scene

    //

    // Set the renderer
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    //

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    var time = Date.now() * 0.001;

    points.rotation.x = time * 0.25;
    points.rotation.y = time * 0.5;

    renderer.render(scene, camera);

}