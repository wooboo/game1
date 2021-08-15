export class MainMenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private titleBitmapText: Phaser.GameObjects.BitmapText;
  private playBitmapText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: 'MainMenuScene'
    });
  }

  init(): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startKey.isDown = false;
  }

  create(): void {
    this.titleBitmapText = this.add.bitmapText(
      0,
      200,
      'font',
      'GUBAL JUMP!!!',
      30
    );

    this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.titleBitmapText.width
    );

    this.playBitmapText = this.add.bitmapText(0, 300, 'font', 'SPACE: PLAY', 45);

    this.playBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.playBitmapText.width
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('GameScene');
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}
