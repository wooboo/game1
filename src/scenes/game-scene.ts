import { Enemy } from "../objects/enemy";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  private player: Player;
  private enemies: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.TileSprite;
  private foreground: Phaser.GameObjects.TileSprite;
  private trees: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.BitmapText;
  private timer: Phaser.Time.TimerEvent;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  init(): void {
    this.registry.set("score", -1);
  }

  create(): void {
    this.background = this.add
      .tileSprite(0, 0, document.documentElement.clientWidth, 444, "background")
      .setOrigin(0, 0);

    this.trees = this.add
      .tileSprite(
        0,
        0,
        document.documentElement.clientWidth,
        400,
        "trees"
      )
      .setOrigin(0, 1)
      .setPosition(0, document.documentElement.clientHeight-153);

    this.foreground = this.add
      .tileSprite(
        0,
        0,
        document.documentElement.clientWidth,
        153,
        "foreground"
      )
      .setOrigin(0, 1)
      .setPosition(0, document.documentElement.clientHeight);

    this.scoreText = this.add
      .bitmapText(
        this.sys.canvas.width / 2 - 14,
        30,
        "font",
        this.registry.values.score
      )
      .setDepth(2);

    this.enemies = this.add.group({});

    this.player = new Player({
      scene: this,
      x: 150,
      y: 100,
      texture: "jurek",
    });

    this.addBear();
  }

  update(): void {
    if (!this.player.getDead()) {
      this.background.tilePositionX += 2;
      this.foreground.tilePositionX += 4.35;
      this.trees.tilePositionX += 2.5;
      this.player.update();
      this.physics.overlap(
        this.player,
        this.enemies,
        function () {
          this.player.setDead(true);
        },
        null,
        this
      );
    } else {
      Phaser.Actions.Call(
        this.enemies.getChildren(),
        function (enemy: Enemy) {
          enemy.body.setVelocityX(0);
        },
        this
      );
      this.scene.start("MainMenuScene");
    }
  }

  private addBear(): void {
    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);
    const r = Math.round(Math.random() * 8 + 1);
    this.enemies.add(
      new Enemy(
        {
          scene: this,
          x: this.sys.canvas.width + 10,
          y: this.sys.canvas.height,
          frame: 0,
          texture: "enemy" + r,
        },
        0.3
      )
    );
    const delay = Math.random() * 1500 + 3000;
    this.time.delayedCall(delay, this.addBear, null, this);
  }
}
