import * as PIXI from 'pixi.js';
import UI from './UI';

export default class SlotGame {

  public static readonly defaultNumberStyle: PIXI.TextStyle = new PIXI.TextStyle({
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

  public static readonly width: number = 440;
  public static readonly height: number = 100;

  public static  resources: any[] = [
    // '/images/zero.svg',
    // '/images/animalface_kirin.png',
    // '/images/animalface_tanuki.png',
    // '/images/animalface_usagi.png'
  ];

  private app!: PIXI.Application;
  private ui!: UI;
  private onReady: () => void = () => {};

  constructor(canvasWrapper: any) {
    this.app = new PIXI.Application({
      width: SlotGame.width,
      height: SlotGame.height,
      backgroundColor: 0x0000,
      preserveDrawingBuffer: true
    });

    canvasWrapper.appendChild(this.app.view);
    
    for (let i = 0; i < 4; i++) {
      const number = new PIXI.Text(i + "", SlotGame.defaultNumberStyle);
console.log(number)
      // this.app.stage.addChild(resource);
    }
    
    this.app.loader.load(() => {
      this.ui = new UI();
      this.onReady();
    });
    
    this.start()

    

    // const textTop = new PIXI.Text("1", SlotGame.defaultNumberStyle);
  
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
