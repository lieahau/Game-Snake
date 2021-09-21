import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseButton } from "../../lib/BaseButton";
import { MAIN_MENU_EVENT } from "../enum/events/MainMenuEvent";
const { ccclass, property } = _decorator;

@ccclass("PlayButton")
export class PlayButton extends BaseButton {
  constructor() {
    super(
      "PlayButton",
      ASSET_KEY.SPRITE_PLACEHOLDER,
      undefined,
      ASSET_KEY.FONT_SHOPEE2021_BOLD
    );
  }

  public onClick() {
    this.node.emit(MAIN_MENU_EVENT.PLAY_GAME);
  }
}
