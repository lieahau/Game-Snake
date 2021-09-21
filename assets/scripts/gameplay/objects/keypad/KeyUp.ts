import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseButton } from "../../../lib/BaseButton";
const { ccclass, property } = _decorator;

@ccclass("KeyUp")
export class KeyUp extends BaseButton {
  constructor() {
    super("KeyUp", ASSET_KEY.SPRITESHEET_KEYPAD, 1);
  }
}
