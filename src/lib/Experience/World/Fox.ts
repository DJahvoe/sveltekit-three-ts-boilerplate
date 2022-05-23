import * as THREE from 'three';
import Experience from '..';
import type GUI from 'lil-gui';
import type Debug from '../Utils/Debug';
import type Resources from '../Utils/Resources';
import type Time from '../Utils/Time';
import type { AnimationAction, AnimationMixer } from 'three';

export default class Fox {
	experience: Experience;
	scene: THREE.Scene;
	resources: Resources;
	resource: any;
	time: Time;
	debug: Debug;
	debugFolder: GUI | undefined;
	model: any;
	animation!: {
		mixer: AnimationMixer;
		actions: {
			[key: string]: AnimationAction;
		};
		play: (name: string) => void;
	};
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.debug = this.experience.debug;

		// Debug
		if (this.debug.isDebugMode()) {
			this.debugFolder = this.debug?.ui?.addFolder('fox');
		}

		// Resource
		this.resource = this.resources.items.foxModel as THREE.Object3D;

		this.setModel();
		this.setAnimation();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.scale.set(0.02, 0.02, 0.02);
		this.scene.add(this.model);

		this.model.traverse((child: THREE.Mesh) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	setAnimation() {
		this.animation = {};
		// Mixer
		this.animation.mixer = new THREE.AnimationMixer(this.model);

		// Actions
		this.animation.actions = {};

		this.animation.actions.idle = this.animation.mixer.clipAction(
			this.resource.animations[0]
		);
		this.animation.actions.walking = this.animation.mixer.clipAction(
			this.resource.animations[1]
		);
		this.animation.actions.running = this.animation.mixer.clipAction(
			this.resource.animations[2]
		);

		this.animation.actions.current = this.animation.actions.idle;
		this.animation.actions.current.play();

		// Play the action
		this.animation.play = (name) => {
			const newAction = this.animation.actions[name];
			const oldAction = this.animation.actions.current;

			newAction.reset();
			newAction.play();
			newAction.crossFadeFrom(oldAction, 1, false);

			this.animation.actions.current = newAction;
		};

		// Debug
		if (this.debug.isDebugMode()) {
			const debugObject = {
				playIdle: () => {
					this.animation.play('idle');
				},
				playWalking: () => {
					this.animation.play('walking');
				},
				playRunning: () => {
					this.animation.play('running');
				},
			};
			this.debugFolder?.add(debugObject, 'playIdle');
			this.debugFolder?.add(debugObject, 'playWalking');
			this.debugFolder?.add(debugObject, 'playRunning');
		}
	}

	update() {
		this.animation.mixer.update(this.time.delta * 0.001);
	}
}
