import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseButton } from "../../../lib/BaseButton";
const { ccclass, property } = _decorator;

@ccclass("KeyDown")
export class KeyDown extends BaseButton {
  constructor() {
    super("KeyDown", ASSET_KEY.SPRITESHEET_KEYPAD, 4);
  }
}
