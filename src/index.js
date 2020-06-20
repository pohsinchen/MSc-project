import './style.css';
import {
    WEBGL
} from 'three/examples/jsm/WebGL.js';

// import * as THREE from 'three';

// ----------------------------cube------------------------------
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer({alpha: false});
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// var mesh;
// var geometry = new THREE.BoxGeometry();
// // var material = new THREE.MeshBasicMaterial({
// //     color: 0x00ff00
// // });
// var material = new THREE.MeshPhongMaterial({
//     color: 0x00ff00
// });
// var color = new THREE.Color("#00ff00");
// // var material = new THREE.MeshLambertMaterial( {color: color.getHex(), wireframe: true} );

// var textureLoader = new THREE.TextureLoader();
// textureLoader.crossOrigin = true;
// textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/4268-bump.jpg', function(texture) {
//     // apply the texture as a bump map
//   var material = new THREE.MeshPhongMaterial( {color: color.getHex(), bumpMap: texture} );
//   mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);
// });

// // var mesh = new THREE.Mesh(geometry, material);
// // scene.add(mesh);

// // so many lights
// var light = new THREE.DirectionalLight( 0xffffff, 1 );
// light.position.set( 0, 1, 0 );
// scene.add( light );

// var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
// light.position.set( 0, -1, 0 );
// scene.add( light );

// var light = new THREE.DirectionalLight( 0xffffff, 1 );
// light.position.set( 1, 0, 0 );
// scene.add( light );

// // var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
// // light.position.set( 0, 0, 1 );
// // scene.add( light );

// // var light = new THREE.DirectionalLight( 0xffffff, 1 );
// // light.position.set( 0, 0, -1 );
// // scene.add( light );

// // var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
// // light.position.set( -1, 0, 0 );
// // scene.add( light );

// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame(animate);
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }

// if (WEBGL.isWebGLAvailable()) {

//     // Initiate function or other initializations here
//     animate();

// } else {

//     var warning = WEBGL.getWebGLErrorMessage();
//     document.getElementById('container').appendChild(warning);

// }
// --------------------------------------------------------------

// var container, scene, camera, renderer, group;

// var targetRotation = 0;
// var targetRotationOnMouseDown = 0;

// var mouseX = 0;
// var mouseXOnMouseDown = 0;

// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;

// init();
// animate();

// function init() {
//   container = document.createElement('div');
//   document.body.appendChild(container);

//   scene = new THREE.Scene();

//   camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
//   camera.position.z = 750;
//   scene.add(camera);

//   var light = new THREE.PointLight(0xffffff, 0.8);
//   camera.add(light);

//   group = new THREE.Group();
//   group.position.y = 50;
//   scene.add(group);

//   function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
//     var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

//     var meshMaterial = new THREE.MeshNormalMaterial();
//     var mesh = new THREE.Mesh(geometry, meshMaterial);

//     mesh.position.set(x, y, z);
//     mesh.rotation.set(rx, ry, rz);
//     mesh.scale.set(s, s, s);
//     group.add(mesh);
//   }

//   var hexShape = new THREE.Shape();
//   hexShape.moveTo(0, 0.8);
//   hexShape.lineTo(0.4, 0.5);
//   hexShape.lineTo(0.3, 0);
//   hexShape.lineTo(-0.3, 0);
//   hexShape.lineTo(-0.4, 0.5);
//   hexShape.lineTo(0, 0.8);

//   var numberOfCrystals = 100;
//   for (var i = 0; i < numberOfCrystals; i++) {
//     var extrudeSettings = {
//       amount: Math.random() * 200,
//       bevelEnabled: true,
//       bevelSegments: 1,
//       steps: 1,
//       bevelSize: (Math.random() * 10) + 15,
//       bevelThickness: (Math.random() * 10) + 25
//     };

//     addShape(
//       hexShape,
//       extrudeSettings,
//       0xff3333, // color
//       0, // x pos
//       0, // y pos
//       0, // z pos
//       Math.random() * 2 * Math.PI, // x rotation
//       Math.random() * 2 * Math.PI, // y rotation
//       Math.random() * 2 * Math.PI, // z rotation
//       1
//     );
//   }

//   renderer = new THREE.WebGLRenderer({
//     antialias: true
//   });
//   renderer.setClearColor(0x000000);
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   container.appendChild(renderer.domElement);

//   document.addEventListener('mousedown', onDocumentMouseDown, false);
//   document.addEventListener('touchstart', onDocumentTouchStart, false);
//   document.addEventListener('touchmove', onDocumentTouchMove, false);

//   window.addEventListener('resize', onWindowResize, false);
// }

// function onDocumentMouseDown(event) {
//   event.preventDefault();
//   document.addEventListener('mousemove', onDocumentMouseMove, false);
//   document.addEventListener('mouseup', onDocumentMouseUp, false);
//   document.addEventListener('mouseout', onDocumentMouseOut, false);
//   mouseXOnMouseDown = event.clientX - windowHalfX;
//   targetRotationOnMouseDown = targetRotation;
// }

// function onDocumentMouseMove(event) {
//   mouseX = event.clientX - windowHalfX;
//   targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
// }

// function onDocumentMouseUp(event) {
//   document.removeEventListener('mousemove', onDocumentMouseMove, false);
//   document.removeEventListener('mouseup', onDocumentMouseUp, false);
//   document.removeEventListener('mouseout', onDocumentMouseOut, false);
// }

// function onDocumentMouseOut(event) {
//   document.removeEventListener('mousemove', onDocumentMouseMove, false);
//   document.removeEventListener('mouseup', onDocumentMouseUp, false);
//   document.removeEventListener('mouseout', onDocumentMouseOut, false);
// }

// function onDocumentTouchStart(event) {
//   if (event.touches.length == 1) {
//     event.preventDefault();
//     mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
//     targetRotationOnMouseDown = targetRotation;
//   }
// }

// function onDocumentTouchMove(event) {
//   if (event.touches.length == 1) {
//     event.preventDefault();
//     mouseX = event.touches[0].pageX - windowHalfX;
//     targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
//   }
// }

// function onWindowResize() {
//   windowHalfX = window.innerWidth / 2;
//   windowHalfY = window.innerHeight / 2;
  
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//   requestAnimationFrame(animate);
//   render();
// }

// function render() {
//   group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
//   renderer.render(scene, camera);
// }

//---------------------------------------------------


// Create a scene which will hold all our meshes to be rendered
var scene = new THREE.Scene();


// Create and position a camera
var camera = new THREE.PerspectiveCamera(
    60,                                   // Field of view
    window.innerWidth/window.innerHeight, // Aspect ratio
    0.1,                                  // Near clipping pane
    1000                                  // Far clipping pane
);

// Reposition the camera
camera.position.set(5,5,0);

// Point the camera at a given coordinate
camera.lookAt(new THREE.Vector3(0,0,0));

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });

// Size should be the same as the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Set a near white clear color (default is black)
renderer.setClearColor( 0xfff6e6 );

// Append to the document
document.body.appendChild( renderer.domElement );

// A mesh is created from the geometry and material, then added to the scene
var plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 5, 5, 5, 5 ),
    new THREE.MeshBasicMaterial( { color: 0x393839, wireframe: true } )
);
plane.rotateX(Math.PI/2);
scene.add( plane );

// Render the scene/camera combination
renderer.render(scene, camera);

// Add an orbit control which allows us to move around the scene. See the three.js example for more details
// https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
import 'three/examples/js/controls/OrbitControls';
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } ); // add this only if there is no animation loop (requestAnimationFrame)