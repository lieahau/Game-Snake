import { _decorator, Component, Node, Label, assetManager, TTFFont } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BaseLabel")
export class BaseLabel extends Component {
  protected label?: Label | null;

  constructor(name: string, protected fontKey: string) {
    super(name);
  }

  onLoad() {
    this.label = this.getComponent(Label);
    this.setupFont();
  }

  start() {
    
  }

  protected setupFont() {
    if (this.label) {
      this.label.font = this.getFont();
    }
  }

  protected getFont() {
    return assetManager.assets.get(this.fontKey) as TTFFont;
  }

  public setText(text: string) {
    if (this.label) {
      this.label.string = text;
    }
  }
}
