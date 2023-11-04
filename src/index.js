/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Importing main stylesheet
import './styles/index.css';

// Importing game systems and components
import { PlayerComponent, PlayerSystem } from './player';

import { FlapSystem } from './flap';
import { GameSystem } from './game';
import { GlobalComponent } from './global';
import { InlineSystem } from './landing';
import { World } from '@lastolivegames/becsy';
// Importing scene setup function
import { setupScene } from './scene';

// Definition for the world, including all systems and components
const worldDef = {
	defs: [
		GlobalComponent,
		PlayerComponent,
		PlayerSystem,
		InlineSystem,
		FlapSystem,
		GameSystem,
	],
};

// Create the world with the defined systems and components
World.create(worldDef).then((world) => {
	// Flag to prevent multiple ECS executions simultaneously
	let ecsexecuting = false;

	// Set up the main scene, camera, and renderer
	const { scene, camera, renderer, gltfLoader } = setupScene();

	// Create a global entity to store references to the renderer, camera, and scene
	world.createEntity(GlobalComponent, { renderer, camera, scene, gltfLoader });

	// Set the animation loop for rendering and game logic
	renderer.setAnimationLoop(function () {
		// Render the scene
		renderer.render(scene, camera);

		// Execute the ECS world logic if not already executing
		if (ecsexecuting == false) {
			ecsexecuting = true;
			world.execute().then(() => {
				ecsexecuting = false;
			});
		}
	});
});
