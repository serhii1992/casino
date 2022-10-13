import * as PIXI from "pixi.js";
import SlotGame from "./SlotGame";
import Tween from "./Tween";
import Reel from "./Reel";

export default class UI extends PIXI.Container {

  private reelContainer!: PIXI.Container;
  private reelsRunning: boolean = false;

  constructor() {
    super();

    this.reelContainer = new PIXI.Container();
    this.reelContainer.y = -35;
    this.reelContainer.x = (SlotGame.width - Reel.WIDTH * 4)/2 - (Reel.SYMBOL_SIZE - Reel.WIDTH) / 2;    

    for (let i = 0; i < 4; i++) {
      console.log(new Reel(i))
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
        Tween.backout(0),
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
