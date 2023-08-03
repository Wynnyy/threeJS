import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.css']
})

export class ThreeDComponent {

  private loader = new GLTFLoader();

  private scene = new THREE.Scene();

  private camera= new THREE.PerspectiveCamera( 25, 10 / 10, 1, 2000 );
 
  private renderer = new THREE.WebGLRenderer();


  private createScene(){
  this.camera.position.set( 1, 1, 20 );
  this.renderer.setSize( 500,500 );
 // this.renderer.setClearColor(0x7D7D7D, 500)
  document.body.appendChild( this.renderer.domElement );
  let number = 0.05;
  
  this.loader.load( 'assets/shiba/scene.gltf', ( gltf: GLTF ) => {
	  gltf.scene.scale.set( 10, 10, 10 );			   
	  gltf.scene.position.x = 2;				   
    gltf.scene.position.y = 0;				   
	  gltf.scene.position.z = -7;		
	  this.scene.add( gltf.scene );
	
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

  }
  private animate(){
    (function anim(this: any){
    
      requestAnimationFrame(anim);
      this.renderer.render( this.scene, this.camera );
    })
    
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.createScene();
    this.animate();
  }
  
  
   
  
   
}

