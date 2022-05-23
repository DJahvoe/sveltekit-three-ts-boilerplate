import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import sources from './sources';
import Debug from './Utils/Debug';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import World from './World';

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
	world!: World;

	constructor(_canvas?: HTMLCanvasElement) {
		// Singleton Pattern
		if (experienceInstance) {
			return experienceInstance;
		}
		experienceInstance = this;

		// Create Global Acess from Window
		window.experience = this;

		// Options
		this.canvas = _canvas;

		// Setup
		this.debug = new Debug('debug');
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		// Resize event
		this.sizes.on('resize', () => {
			this.resize();
		});

		// Time tick event
		this.time.on('tick', () => {
			this.update();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}

	destroy() {
		this.sizes.off('resize');
		this.time.off('tick');

		// Traverse the whole scene
		this.scene.traverse((child) => {
			// Test if it's a mesh
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				// Loop through the material properties
				for (const key in child.material) {
					const value = child.material[key];

					// Test if there is a dispose function
					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				}
			}
		});

		this.camera?.controls?.dispose();
		this.renderer?.instance?.dispose();

		if (this.debug.isDebugMode()) this.debug?.ui?.destroy();
	}
}
