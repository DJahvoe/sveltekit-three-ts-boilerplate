import * as THREE from 'three';
import { Camera } from 'three';
import Renderer from './Renderer';
import sources from './sources';
import Debug from './Utils/Debug';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';

let experienceInstance: Experience | null = null;

export default class Experience {
	canvas: HTMLCanvasElement | undefined;
	debug!: Debug;
	sizes!: Sizes;
	time!: Time;
	scene!: THREE.Scene;
	resources!: Resources;
	camera!: Camera;
	renderer!: Renderer;

	constructor(_canvas?: HTMLCanvasElement) {
		// Singleton Pattern
		if (experienceInstance) {
			return experienceInstance;
		}
		experienceInstance = this;

		// Create Global Acess from Window
		window.experience = this;

		if (this.canvas !== undefined) {
			// Options
			this.canvas = _canvas;
		}

		// Setup
		this.debug = new Debug('debug');
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		// this.world = new
	}
}
