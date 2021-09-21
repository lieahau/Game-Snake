import { _decorator, Component, Node, director } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { SCENE_KEY } from "../../enum/SceneEnum";
import { GAMEPLAY_EVENTS } from "../../gameplay/enum/events/GameplayEvents";
import { BaseButton } from "../../lib/BaseButton";
const { ccclass, property } = _decorator;

@ccclass("ExitButton")
export class ExitButton extends BaseButton {
  constructor() {
    super(
      "ExitButton",
      ASSET_KEY.SPRITE_PLACEHOLDER,
      undefined,
      ASSET_KEY.FONT_SHOPEE2021_BOLD
    );
  }

  public onClick() {
    director.emit(GAMEPLAY_EVENTS.GO_TO_SCENE, SCENE_KEY.MAINMENU);
  }
}
