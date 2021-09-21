import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { BaseSprite } from "../lib/BaseSprite";
const { ccclass, property } = _decorator;

@ccclass("BackgroundSprite")
export class BackgroundSprite extends BaseSprite {
  constructor() {
    super("BackgroundSprite", ASSET_KEY.SPRITE_PLACEHOLDER);
  }
}
