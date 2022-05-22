import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export interface Loaders {
	gltfLoader?: GLTFLoader;
	textureLoader?: THREE.TextureLoader;
	cubeTextureLoader?: THREE.CubeTextureLoader;
}
