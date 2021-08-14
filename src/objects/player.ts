import { IImageConstructor } from "../interfaces/image.interface";

export class Player extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  private jumpKey: Phaser.Input.Keyboard.Key;
  private isDead: boolean;
  private isFlapping: boolean;

  public getDead(): boolean {
    return this.isDead;
  }

  public setDead(dead: boolean): void {
    this.isDead = dead;
  }

  constructor(aParams: IImageConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers(aParams.texture, {
        frames: [0, 2, 3, 5, 7, 1, 4, 6],
      }),
      frameRate: 8,
      repeat: -1,
    });
    // image
    this.setScale(1);
    this.setOrigin(0.5, 1);

    // variables
    this.isDead = false;
    this.isFlapping = false;

    // physics
    this.scene.physics.world.enable(this);
    this.body.setSize(204, 204);
    this.body.collideWorldBounds = true;

    // input
    this.jumpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.play("walk");
    this.scene.add.existing(this);
  }

  update(): void {

    // handle input
    if (this.body.velocity.y == 0 && this.jumpKey.isDown && !this.isFlapping) {
      this.isFlapping = true;
      this.body.setVelocityY(-990);
    } else if (this.jumpKey.isUp && this.isFlapping) {
      this.isFlapping = false;
    }
  }
}
