/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Group, Vector3 } from 'elixr';

import { Constants } from './global';
import { GameSystem } from 'elixr';

/**
 * FlapSystem class handles the flapping mechanism and related game logic.
 */
export class FlapSystem extends GameSystem {
	init() {
		this._rotator = null;
		this._vertSpeed = 0;
		this._lastFrameY = { left: null, right: null };
		this._wings = { left: null, right: null };
		this._vec3 = new Vector3();
		this._ringTimer = Constants.RING_INTERVAL;
	}

	/**
	 * Sets up the player's space and loads the wing assets.
	 */
	_init() {
		this._rotator = new Group();
		this._rotator.add(this.player);
		this.player.scale.setScalar(0.1);
		this.player.position.set(0, 4, 34);
		this.player.rotateY(-Math.PI / 2);
		this.scene.add(this._rotator);
		const rightWing = this.assetManager.getAsset('wing').scene;
		const leftWing = rightWing.clone(true);
		leftWing.scale.set(-1, 1, 1);
		this.player.add(rightWing, leftWing);
		this._wings = { left: leftWing, right: rightWing };
		this.player.controllers.left.model.visible = false;
		this.player.controllers.right.model.visible = false;
	}

	update(delta) {
		if (!this._rotator) {
			this._init();
		}

		this._rotator.rotateY(Constants.PLAYER_ANGULAR_SPEED * delta);
		const isPresenting = this.renderer.xr.isPresenting;

		if (isPresenting) {
			this._handleVRMode(delta);
		} else {
			this._handleNonVRMode();
		}

		this._manageRings(delta);
	}

	_handleVRMode(delta) {
		let flapSpeed = 0;
		let wingAngle = 0;

		Object.entries(this.player.controllers).forEach(
			([handedness, controller]) => {
				const thisFrameY = controller.raySpace.position.y;
				if (this._lastFrameY[handedness]) {
					if (thisFrameY < this._lastFrameY[handedness]) {
						flapSpeed += (this._lastFrameY[handedness] - thisFrameY) / delta;
					}
				}
				this._lastFrameY[handedness] = thisFrameY;

				if (this._wings[handedness]) {
					this._adjustWingPosition(handedness, controller);
					wingAngle += this._calculateWingAngle(handedness, controller);
				}
			},
		);

		let gravityAdjusted = this._adjustGravityBasedOnWingAngle(wingAngle);

		if (this.globals.get('gameState') === 'ingame') {
			this._vertSpeed +=
				gravityAdjusted * delta + flapSpeed * Constants.FLAP_SPEED_MULTIPLIER;
			this.player.position.y += this._vertSpeed * delta;

			if (this.player.position.y <= 0) {
				this.player.position.y = 0;
				this._vertSpeed = 0;
			}
		}
	}

	_handleNonVRMode() {
		this.player.position.y = 4;
		this._vertSpeed = 0;
	}

	_manageRings(delta) {
		if (this._ring) {
			this._ringTimer -= delta;
			if (this._ringTimer < 0) {
				this._ringRotator.quaternion.copy(this._rotator.quaternion);
				this._ringRotator.rotateY(
					Constants.PLAYER_ANGULAR_SPEED * Constants.RING_INTERVAL,
				);
				this._ring.position.y = Math.random() * 5 + 4;
				this._ring.scale.multiplyScalar(0.98);
				this._ringTimer = Constants.RING_INTERVAL;
			}
		}
	}

	_adjustWingPosition(handedness, controller) {
		this._wings[handedness].position.copy(this.player.head.position);
		this._wings[handedness].position.y -= 0.25;
		this._wings[handedness].lookAt(
			controller.raySpace.getWorldPosition(this._vec3),
		);
	}

	_calculateWingAngle(handedness, controller) {
		this._vec3.subVectors(
			controller.raySpace.position,
			this._wings[handedness].position,
		);
		return Math.atan(Math.abs(this._vec3.y) / Math.abs(this._vec3.x));
	}

	_adjustGravityBasedOnWingAngle(wingAngle) {
		let gravityAdjusted = Constants.GRAVITY;
		if (wingAngle < 0.2) {
			gravityAdjusted *= 0.5;
		} else if (wingAngle < 0.5) {
			gravityAdjusted *= ((wingAngle - 0.2) / 0.3) * 0.5 + 0.5;
		}
		return gravityAdjusted;
	}
}
