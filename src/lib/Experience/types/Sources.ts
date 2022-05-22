interface CubeTextureSource {
	name: string;
	type: 'cubeTexture';
	path: string[];
}

interface TextureSource {
	name: string;
	type: 'texture';
	path: string;
}

interface GLTFModelSource {
	name: string;
	type: 'gltfModel';
	path: string;
}

export type Source = CubeTextureSource | TextureSource | GLTFModelSource;
export type Sources = Array<Source>;