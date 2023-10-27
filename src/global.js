/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Importing necessary types from becsy
import { Type } from '@lastolivegames/becsy';

/**
 * The GlobalComponent class represents a component that contains
 * global properties and settings used throughout the game.
 */
export class GlobalComponent {}

// Define the schema for the GlobalComponent
GlobalComponent.schema = {
	// Reference to the game's renderer
	renderer: { type: Type.object },

	// Reference to the game's main camera
	camera: { type: Type.object },

	// Reference to the game's main scene
	scene: { type: Type.object },

	// Current score of the player
	score: { type: Type.int16, default: 0 },

	// Current state of the game, can be either 'lobby' or 'ingame'
	gameState: { type: Type.staticString(['lobby', 'ingame']), default: 'lobby' },
};

export const Constants = {
	// game constants
	NUM_FLAPS_TO_START_GAME: 3,
	PLAYER_ANGULAR_SPEED: Math.PI / 25,
	RING_INTERVAL: 3,
	STARTING_RING_SCALE: 5,
	GRAVITY: -9.81,
	FLAP_SPEED_MULTIPLIER: 0.1,

	// asset paths
	SCORE_BOARD_TEXTURE_PATH: 'assets/scoreboard.png',
	ENV_TEXTURE_PATH: 'assets/venice_sunset_1k.exr',
	SCENE_MODEL_PATH: 'assets/flappybird.glb',

	// local storage keys
	RECORD_SCORE_KEY: 'record-score',
	PLAYER_ID_KEY: 'player-id',
};
