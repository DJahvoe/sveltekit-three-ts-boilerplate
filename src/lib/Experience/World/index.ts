import Experience from '..';
import Environment from './Environment';
import Floor from './Floor';
import Fox from './Fox';
import type Resources from '../Utils/Resources';

export default class World {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	environment!: Environment;
	floor!: Floor;
	fox!: Fox;

	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.floor = new Floor();
			this.fox = new Fox();
			this.environment = new Environment();
		});
	}

	update() {
		if (this.fox) this.fox.update();
	}
}
