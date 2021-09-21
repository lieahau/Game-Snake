import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseButton } from "../../../lib/BaseButton";
const { ccclass, property } = _decorator;

@ccclass("KeyLeft")
export class KeyLeft extends BaseButton {
  constructor() {
    super("KeyLeft", ASSET_KEY.SPRITESHEET_KEYPAD, 3);
  }
}
