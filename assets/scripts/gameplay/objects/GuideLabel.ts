import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseLabel } from "../../lib/BaseLabel";
const { ccclass, property } = _decorator;

@ccclass("GuideLabel")
export class GuideLabel extends BaseLabel {
  constructor() {
    super("GuideLabel", ASSET_KEY.FONT_SHOPEE2021_MEDIUM);
  }

  public show() {
    this.node.active = true;
  }

  public hide() {
    this.node.active = false;
  }
}
