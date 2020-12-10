import * as THREE from './resources/threejs/r119/build/three.module.js';
import { Phos } from './Phos/libphos.js';

window.M = new Phos();
var S = window.S;

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setClearColor(0xAAAAAA);
  renderer.shadowMap.enabled = true;


var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 

S[0].scene = scene;
S[0].render = true;
S[0].f_render = render;

// var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
var cube = new THREE.Mesh( geometry, material ); 

var geometry1 = new THREE.BoxGeometry( 1, 1, 1 ); 
var material1 = new THREE.MeshBasicMaterial( { color: 0x0000ff } ); 
var cube1 = new THREE.Mesh( geometry1, material1 ); 

/*var spotLight = new THREE.SpotLight( 0xffffff ); 
spotLight.position.set( 100, 1000, 100 ); 
spotLight.castShadow = true; 
spotLight.shadowMapWidth = 1024; 
spotLight.shadowMapHeight = 1024; 
spotLight.shadowCameraNear = 500; 
spotLight.shadowCameraFar = 4000; 
spotLight.shadowCameraFov = 30; 

scene.add( spotLight );*/
scene.add( cube ); 
scene.add( cube1 ); 
camera.position.z = 5;

function render() { 
    if (S[0].render) requestAnimationFrame( render ); 
    
    cube.rotation.x += 0.05; 
    cube.rotation.y += 0.05;
    
    renderer.render( scene, camera ); 
} 

render();
