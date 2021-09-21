import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseLabel } from "../../lib/BaseLabel";
const { ccclass, property } = _decorator;

@ccclass("HighscoreLabel")
export class HighscoreLabel extends BaseLabel {
  constructor() {
    super("HighscoreLabel", ASSET_KEY.FONT_SHOPEE2021_MEDIUM);
  }

  public updateHighscore(highscore: number) {
    this.setText(`${highscore}`);
  }
}
