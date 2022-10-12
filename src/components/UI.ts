import * as PIXI from "pixi.js";
import SlotGame from "./SlotGame";
import Tween from "./Tween";
import Reel from "./Reel";

export default class UI extends PIXI.Container {
  public static readonly defaultTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontStyle: "italic",
    fontWeight: "bold",
    fill: ["#ffffff", "#00ff99"], // gradient
    stroke: "#4a1850",
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  });

  private reelContainer!: PIXI.Container;
  private reelsRunning: boolean = false;

  constructor() {
    super();

    const margin = (SlotGame.height - Reel.SYMBOL_SIZE * 3) / 2;

    this.reelContainer = new PIXI.Container();
    this.reelContainer.y = margin;
    this.reelContainer.x = Math.round(SlotGame.width - Reel.WIDTH * 5);

    for (let i = 0; i < 5; i++) {
      this.reelContainer.addChild(new Reel(i));
    }
    this.addChild(this.reelContainer);
  }

  public startPlay(): void {
    if (this.reelsRunning) {
      return;
    }

    this.reelsRunning = true;
    const reels = this.reelContainer.children;
    for (let i = 0; i < reels.length; i++) {
      const reel = reels[i] as Reel;
      if (!reel.update) {
        continue;
      }
      const extra = Math.floor(Math.random() * 3);
      const target = reel.index + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 600;
      const tween = new Tween(
        reel,
        "index",
        target,
        time,
        Tween.backout(0.5),
        null,
        i === reels.length - 1
          ? () => {
              this.reelsRunning = false;
            }
          : null
      );
      Tween.tweening.push(tween);
    }
  }

  public update(): void {
    const reels = this.reelContainer.children;
    for (let i = 0; i < reels.length; i++) {
      const reel = reels[i] as Reel;
      if (!reel.update) {
        continue;
      }
      reel.update();
    }

    Tween.update();
  }
}
