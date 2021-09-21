import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseButton } from "../../../lib/BaseButton";
const { ccclass, property } = _decorator;

@ccclass("KeyRight")
export class KeyRight extends BaseButton {
  constructor() {
    super("KeyRight", ASSET_KEY.SPRITESHEET_KEYPAD, 5);
  }
}
