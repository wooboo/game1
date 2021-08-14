import { IImageConstructor } from '../interfaces/image.interface';

export class Enemy extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: IImageConstructor, scale: number) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

    // image
    this.setScale(scale);
    this.setOrigin(0, 1);

    // physics
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.setVelocityX(-300);
    this.body.setSize(500, 500);

    this.scene.add.existing(this);
  }
}
