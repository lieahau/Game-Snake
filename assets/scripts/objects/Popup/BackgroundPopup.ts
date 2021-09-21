import { _decorator, Component, Node, Graphics, Color, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BackgroundPopup")
export class BackgroundPopup extends Component {
  private graphics?: Graphics | null;

  private uiTransform?: UITransform | null;

  onLoad() {
    this.graphics = this.getComponent(Graphics);
    this.uiTransform = this.getComponent(UITransform);

    this.draw();
  }

  private getConfig() {
    const { uiTransform } = this;
    if (!uiTransform) return undefined;

    const { width, height } = uiTransform;

    return {
      x: width * -0.5,
      y: height * -0.5,
      width,
      height,
      r: Math.min(width, height) * 0.1,
    };
  }

  private draw() {
    const config = this.getConfig();
    if (!this.graphics || !config) return;

    const { x, y, width, height, r } = config;

    this.graphics.roundRect(x, y, width, height, r);
    this.graphics.fill();
    this.graphics.stroke();
  }
}
