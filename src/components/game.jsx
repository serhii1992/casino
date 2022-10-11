import * as PIXI from "pixi.js";

export class ExampleGame {
  application;

  constructor(canvasBody) {
    const app = new PIXI.Application({
      backgroundColor: 0x780a2b,
      width: 320,
      height: 240,
    });

    canvasBody.appendChild(app.view);
    this.application = app;

    this.renderImg()
  }

  renderImg(text, x, y, style) {
    const bunny = PIXI.Sprite.from("/images/xxx.png");
    bunny.anchor.set(0.5);

    bunny.x = this.application.screen.width / 2;
    bunny.y = this.application.screen.height / 2;

    this.application.stage.addChild(bunny);

    this.application.ticker.add((delta) => {
      bunny.rotation += 0.1 * delta;
    });
  }

}

export default ExampleGame;
