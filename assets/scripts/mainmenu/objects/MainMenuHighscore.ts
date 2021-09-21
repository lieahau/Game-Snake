import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseLabel } from "../../lib/BaseLabel";
import { getHighscoreFromLocalStorage } from "../../utils/localStorage";
const { ccclass, property } = _decorator;

@ccclass("MainMenuHighscore")
export class MainMenuHighscore extends BaseLabel {
  constructor() {
    super("MainMenuHighscore", ASSET_KEY.FONT_SHOPEE2021_BOLD);
  }

  start() {
    super.start();
    this.setHighscoreText();
  }

  private setHighscoreText() {
    const highscore = getHighscoreFromLocalStorage() || 0;
    this.setText(`HIGHSCORE\n${highscore}`);
  }
}
