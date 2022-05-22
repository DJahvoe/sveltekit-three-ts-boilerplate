import * as dat from 'lil-gui';

export default class Debug {
	debuggerHashUrl: string;
	ui: dat.GUI | undefined;

	constructor(debuggerHashUrl: string) {
		this.debuggerHashUrl = debuggerHashUrl;

		if (this.isDebugMode()) {
			this.ui = new dat.GUI();
		}
	}

	isDebugMode() {
		return window.location.hash === '#' + this.debuggerHashUrl;
	}
}
