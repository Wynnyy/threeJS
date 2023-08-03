import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import {GLTFLoader, GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.css']
})

export class ThreeDComponent  {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  //THREE JS
  private loader = new GLTFLoader();
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera( 25, 10 / 10, 1, 2000 );
  private renderer = new THREE.WebGLRenderer();
  private number = 0;
  
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private load(){
    
  }

  ngOnInit(){
  this.camera.position.set( 1, 1, 30 );
  this.renderer.setClearColor(0x7D7D7D, 500)
  document.body.appendChild( this.renderer.domElement );
  
  this.loader.load( 'assets/shiba/scene.gltf',  ( gltf ) => {
	gltf.scene.scale.set( 9, 10, 10 );			   
	gltf.scene.position.x = 2;				    //Position (x = right+ left-) 
   gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = -7;		
	this.scene.add( gltf.scene );
  this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
  this.renderer.setPixelRatio(devicePixelRatio);
  this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
	
	if(this.number <= 1){
	setInterval( () => {
	//gltf.scene.rotation.x = number;
	gltf.scene.rotation.y = this.number;
	this.number = this.number + 0.05;
     }, 30);
	 
	}
}, undefined, function ( error ) {

	console.error( error );

} );



    const animate = () => {
	  requestAnimationFrame( animate );
	  this.renderer.render( this.scene, this.camera );
	
   }


animate();

 
  }

 
  
   
}

