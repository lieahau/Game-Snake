import { _decorator, Component, Graphics, UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PreloadBackground")
export class PreloadBackground extends Component {
  private graphics?: Graphics | null;

  private uiTransform?: UITransform | null;

  onLoad() {
    this.graphics = this.getComponent(Graphics);
    this.uiTransform = this.getComponent(UITransform);
  }

  start() {
    this.draw();
  }

  private draw() {
    const { uiTransform, graphics } = this;

    if (!uiTransform || !graphics) return;

    const { width, height } = uiTransform;

    graphics.fillRect(-width * 0.5, -height * 0.5, width, height);
  }
}
