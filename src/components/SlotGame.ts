import * as PIXI from 'pixi.js';
import UI from './UI';

export default class SlotGame {
  public static readonly width: number = 800;
  public static readonly height: number = 800;
  public static readonly resources: string[] = [
    '/images/zero.svg',
    '/images/animalface_kirin.png',
    '/images/animalface_tanuki.png',
    '/images/animalface_usagi.png'
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

    for (let i = 0; i < SlotGame.resources.length; i++) {
      const resource = SlotGame.resources[i];
      this.app.loader.add(resource);
    }

    this.app.loader.load(() => {
      this.ui = new UI();
      this.onReady();
    });

    this.start()
  
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
