import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseLabel } from "../../lib/BaseLabel";
const { ccclass, property } = _decorator;

@ccclass("ScoreLabel")
export class ScoreLabel extends BaseLabel {
  constructor() {
    super("GuideLabel", ASSET_KEY.FONT_SHOPEE2021_MEDIUM);
  }

  public updateScore(score: number) {
    this.setText(`${score}`);
  }
}
