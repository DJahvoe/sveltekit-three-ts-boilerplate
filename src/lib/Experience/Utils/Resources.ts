import { GLTF_MODEL, TEXTURE, CUBE_TEXTURE } from './Globals';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import EventEmitter from './EventEmitter';
import type { Source, Sources } from '../types/Sources';
import type { Loaders } from '../types/Loaders';
import type { LoadedSource } from '../types/LoadedSource';

export default class Resources extends EventEmitter {
	sources: Sources;
	items: {
		[key: string]: LoadedSource
	};
	toLoad: number;
	loaded: number;
	loaders: Loaders;

	constructor(sources: Sources) {
		super();

		this.sources = sources;

		this.items = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;
		this.loaders = {};

		this.setLoaders();
		this.startLoading();
	}

	setLoaders() {
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === GLTF_MODEL && this.loaders.gltfLoader !== undefined) {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (
				source.type === TEXTURE &&
				this.loaders.textureLoader !== undefined
			) {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (
				source.type === CUBE_TEXTURE &&
				this.loaders.cubeTextureLoader !== undefined
			) {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source: Source, file: any) {
		this.items[source.name] = file;

		this.loaded++;

		if (this.loaded === this.toLoad) {
			this.trigger('ready');
		}
	}
}
