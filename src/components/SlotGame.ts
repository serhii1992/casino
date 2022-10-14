import * as PIXI from "pixi.js";
import UI from "./UI";

export default class SlotGame {
  public static readonly width: number = 430;
  public static readonly height: number = 290;
  public static  comination: string = '2222'

  public static readonly resources: string[] = [
    "/images/0.png",
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
    "/images/8.png",
    "/images/9.png",
  ];

  private app!: PIXI.Application;
  private ui!: UI;
  private onReady: () => void = () => {};

  constructor(canvasWrapper: any, onComplete: any) {
    this.app = new PIXI.Application({
      width: SlotGame.width,
      height: SlotGame.height,
      transparent: true,
    });

    canvasWrapper.appendChild(this.app.view);

    for (let i = 0; i < SlotGame.resources.length; i++) {
      const resource = SlotGame.resources[i];
      this.app.loader.add(i.toString(), resource);
    }

    this.app.loader.load(() => {
      this.ui = new UI(onComplete);
      this.onReady();
    });

    // this.app.loader.onComplete.add((loader, res) => {

    //   const arr  = Object.entries(res).map(([name, { texture }]) => {
    //     const sp = new PIXI.Sprite(texture)
    //     sp.name = name
    //     return sp
        
    //   });
    //   // SlotGame.sprite = arr
  
    // });

    this.start();
  }

  public start(): void {
    if (!this.ui) {
      this.onReady = () => this.start();
      return;
    }
    this.app.stage.addChild(this.ui);

    this.app.ticker.add(() => {
      this.ui.update();
    });
  }

  
}
