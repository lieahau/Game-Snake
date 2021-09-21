import { _decorator, Component, Node } from "cc";
import { BaseSprite } from "../../../lib/BaseSprite";
const { ccclass, property } = _decorator;

@ccclass("BaseTileSprite")
export class BaseTileSprite extends BaseSprite {
  public adjustTexture(isEven: boolean) {}
}
