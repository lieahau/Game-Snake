import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseSprite } from "../../lib/BaseSprite";
const { ccclass, property } = _decorator;

@ccclass("MainMenuLogo")
export class MainMenuLogo extends BaseSprite {
  constructor() {
    super("MainMenuLogo", ASSET_KEY.SPRITE_LOGO);
  }
}
