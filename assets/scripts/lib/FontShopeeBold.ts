import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { BaseLabel } from "./BaseLabel";
const { ccclass, property } = _decorator;

@ccclass("FontShopeeBold")
export class FontShopeeBold extends BaseLabel {
  constructor() {
    super("FontShopeeBold", ASSET_KEY.FONT_SHOPEE2021_BOLD);
  }
}
