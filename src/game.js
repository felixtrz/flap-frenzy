import { FlapSystem } from './flap';
import { GlobalComponent } from './global';
import { Group } from 'three';
import { PlayerComponent } from './player';
import { System } from '@lastolivegames/becsy';
import { Text } from 'troika-three-text';
const NUM_FLAPS_TO_START_GAME = 3;
const START_ANGULAR_SPEED = Math.PI / 25;
const RING_INTERVAL = 3;
const START_RING_SCALE = 5;

export class GameSystem extends System {
	constructor() {
		super();
		this.globalEntity = this.query(
			(q) => q.current.with(GlobalComponent).write,
		);
		this.playerEntity = this.query((q) => q.current.with(PlayerComponent));
		this.schedule((s) => s.after(FlapSystem));

		this._flapData = {
			left: {
				y: null,
				distance: 0,
				flaps: 0,
			},
			right: {
				y: null,
				distance: 0,
				flaps: 0,
			},
		};
		this._ring = null;
		this._ringNumber = null;
		this._ringTimer = RING_INTERVAL;
	}

	execute() {
		const global = this.globalEntity.current[0].write(GlobalComponent);
		const player = this.playerEntity.current[0].read(PlayerComponent);
		const isPresenting = global.renderer.xr.isPresenting;
		const rotator = player.space.parent;

		if (!this._ring && global.scene.getObjectByName('ring')) {
			this._ring = global.scene.getObjectByName('ring');
			this._ringRotator = new Group();
			this._ringRotator.add(this._ring);
			this._ring.position.set(0, 4, 34);
			this._ringRotator.quaternion.copy(rotator.quaternion);
			this._ringRotator.rotateY(START_ANGULAR_SPEED * RING_INTERVAL);
			this._ring.position.y = player.space.position.y;
			this._ring.scale.setScalar(START_RING_SCALE);
			const ringNumber = new Text();
			this._ring.add(ringNumber);
			ringNumber.text = '0';
			ringNumber.fontSize = 0.6;
			ringNumber.anchorX = 'center';
			ringNumber.anchorY = 'middle';
			ringNumber.rotateY(Math.PI);
			ringNumber.sync();
			this._ringNumber = ringNumber;
			global.scene.add(this._ringRotator);
		}

		if (global.gameState === 'lobby') {
			if (isPresenting) {
				for (let entry of Object.entries(player.controllers)) {
					const [handedness, controller] = entry;
					const thisFrameY = controller.targetRaySpace.position.y;
					const lastFrameY = this._flapData[handedness].y;
					if (lastFrameY) {
						if (thisFrameY <= lastFrameY) {
							// flapping
							this._flapData[handedness].distance += lastFrameY - thisFrameY;
						} else {
							// flap has ended
							if (this._flapData[handedness].distance >= 0.5) {
								this._flapData[handedness].flaps += 1;
							} else if (this._flapData[handedness].distance > 0.1) {
								this._flapData[handedness].flaps = 0;
							}
							this._flapData[handedness].y = null;
							this._flapData[handedness].distance = 0;
						}
					}
					this._flapData[handedness].y = thisFrameY;

					if (this._flapData[handedness].flaps >= NUM_FLAPS_TO_START_GAME) {
						global.gameState = 'ingame';
						this._ringTimer;
						this._flapData = {
							left: {
								y: null,
								distance: 0,
								flaps: 0,
							},
							right: {
								y: null,
								distance: 0,
								flaps: 0,
							},
						};
						this._ringRotator.quaternion.copy(rotator.quaternion);
						this._ringRotator.rotateY(START_ANGULAR_SPEED * RING_INTERVAL);
						this._ring.position.y = 4;
						this._ring.scale.setScalar(START_RING_SCALE);
						this._ringTimer = RING_INTERVAL;
						this._ringNumber.text = '1';
						this._ringNumber.sync();
						break;
					}
				}
			}
		} else {
			if (this._ring) {
				this._ringTimer -= this.delta;
				if (this._ringTimer < 0) {
					const ringRadius = this._ring.scale.x / 2;
					if (
						Math.abs(player.space.position.y - this._ring.position.y) <
						ringRadius
					) {
						global.score += 1;
						this._ringNumber.text = (global.score + 1).toString();
						this._ringNumber.sync();
						this._ringRotator.quaternion.copy(rotator.quaternion);
						this._ringRotator.rotateY(START_ANGULAR_SPEED * RING_INTERVAL);
						this._ring.position.y = Math.random() * 5 + 4;
						this._ring.scale.multiplyScalar(0.98);
						this._ringTimer = RING_INTERVAL;
					} else {
						global.gameState = 'lobby';
						global.score = 0;
						player.space.position.y = 4;
					}
				}
			}
		}
	}
}
