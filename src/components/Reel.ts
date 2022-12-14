import * as PIXI from 'pixi.js';
import SlotGame from './SlotGame';

export default class Reel extends PIXI.Container {
  public static readonly WIDTH: number = 85;
  public static readonly SYMBOL_SIZE: number = 100;

  public static getTexture(i: number): PIXI.Texture {
    if (Reel.slotTextures.length === 0) {
      for (let i = 0; i < SlotGame.resources.length; i++) {
        const resource = SlotGame.resources[i];
        Reel.slotTextures.push(PIXI.Texture.from(resource));
      }
    }
    
    return Reel.slotTextures[i];
  }

  private static slotTextures: PIXI.Texture[] = [];
  public blur = new PIXI.filters.BlurFilter();
  public spritePosition: number = 2;
  public prevSpritePosition: number = 0;

  constructor(index: number) {
    super();
    this.x = index * Reel.WIDTH;
    this.blur.blurX = 0;
    this.blur.blurY = 0;
    this.filters = [this.blur];

    for (let i = 0; i < 10; i++) {
      const symbol = new PIXI.Sprite();
      this.updateSymbol(symbol, i);
      this.addChild(symbol);
    }
  }

  public update(): void {
    this.blur.blurY = (this.spritePosition - this.prevSpritePosition) * 11;
    this.prevSpritePosition = this.spritePosition;
    for (let i = 0; i < this.children.length; i++) {      
      const symbol = this.children[i] as PIXI.Sprite;

      if (!symbol.texture) {
        continue;
      }

      const prevY = symbol.y;
      symbol.y = ((this.spritePosition + i) % this.children.length) * Reel.SYMBOL_SIZE * 1.15  - Reel.SYMBOL_SIZE ;

      if (prevY <= Reel.SYMBOL_SIZE) {
        continue;
      }
      if (symbol.y >= 0) {
        continue;
      }

      this.updateSymbol(symbol, i);
    }
  }

  private updateSymbol(symbol: PIXI.Sprite, i: number): void {
    symbol.texture = Reel.getTexture(i);
    symbol.scale.x = symbol.scale.y = Math.min(
      Reel.SYMBOL_SIZE / (symbol.width / symbol.scale.x),
      Reel.SYMBOL_SIZE / (symbol.height / symbol.scale.y),
    );
    symbol.x = Math.round((Reel.SYMBOL_SIZE - symbol.width) /2);
  }
}
