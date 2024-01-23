/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Importing main stylesheet
import './styles/index.css';

import {
	ASSET_TYPE,
	DirectionalLight,
	HemisphereLight,
	PMREMGenerator,
	VRButton,
	initEngine,
} from 'elixr';

import { FlapSystem } from './flap';
import { GameLogicSystem } from './game';

// Create the world with the defined systems and components
const assets = {
	scene: {
		url: 'assets/gltf/scene.gltf',
		type: ASSET_TYPE.GLTF,
	},
	wing: {
		url: 'assets/gltf/wing.gltf',
		type: ASSET_TYPE.GLTF,
	},
	envmap: {
		url: 'assets/envmap.exr',
		type: ASSET_TYPE.EXR,
	},
	scoreboard: {
		url: 'assets/scoreboard.png',
		type: ASSET_TYPE.TEXTURE,
	},
};

initEngine(
	document.getElementById('scene-container'),
	{ enablePhysics: false, waitForAssets: true, cameraFar: 5000 },
	assets,
).then((world) => {
	world.registerSystem(FlapSystem).registerSystem(GameLogicSystem);

	world.globals.set('score', 0);
	world.globals.set('gameState', 'lobby');

	const { scene, renderer, assetManager } = world;

	assetManager.addEventListener('load', () => {
		const sceneMesh = assetManager.getAsset('scene').scene;
		scene.add(sceneMesh);

		// Set up the PMREM generator for environment mapping
		const pmremGenerator = new PMREMGenerator(renderer);
		pmremGenerator.compileEquirectangularShader();
		const envMap = pmremGenerator.fromEquirectangular(
			assetManager.getAsset('envmap'),
		).texture;
		pmremGenerator.dispose();
		scene.environment = envMap;
	});

	// Add hemisphere light for soft ambient lighting
	scene.add(new HemisphereLight(0x606060, 0x404040));

	// Add directional light for brighter, directional illumination
	const light = new DirectionalLight(0xffffff);
	light.position.set(1, 1, 1).normalize();
	scene.add(light);

	const vrButton = document.getElementById('vr-button');
	const webLaunchButton = document.getElementById('web-launch-button');

	// Initially hide the web launch button
	webLaunchButton.style.display = 'none';

	// Convert the VR button and handle unsupported VR scenarios
	VRButton.convertToVRButton(vrButton, renderer, {
		optionalFeatures: ['local-floor', 'bounded-floor', 'layers'],
		onUnsupported: () => {
			vrButton.style.display = 'none';
			webLaunchButton.style.display = 'block';
		},
	});

	// Set the action for the web launch button
	webLaunchButton.onclick = () => {
		window.open(
			'https://www.oculus.com/open_url/?url=' +
				encodeURIComponent(window.location.href),
		);
	};
});
