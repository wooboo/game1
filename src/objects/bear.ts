import { IImageConstructor } from '../interfaces/image.interface';

export class Bear extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // image
    this.setScale(0.5);
    this.setOrigin(0, 1);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-200);
    this.body.setSize(150, 150);

    this.scene.add.existing(this);
  }
}
