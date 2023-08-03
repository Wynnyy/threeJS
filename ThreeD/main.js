import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 25, 10 / 10, 1, 2000 );
camera.position.set( 1, 1, 20 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( 500,500 );
renderer.setClearColor(0x7D7D7D, 500)
document.body.appendChild( renderer.domElement );


let number = 0.05;
loader.load( 'shiba/scene.gltf', function ( gltf ) {
	gltf.scene.scale.set( 10, 10, 10 );			   
	gltf.scene.position.x = 2;				    //Position (x = right+ left-) 
    gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = -7;		
	scene.add( gltf.scene );
	
	if(number <= 1){
	setInterval(function () {
	//gltf.scene.rotation.x = number;
	gltf.scene.rotation.y = number;
	number = number + 0.05;
     }, 30);
	 
	}
}, undefined, function ( error ) {

	console.error( error );

} );



function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
   }


animate();

 