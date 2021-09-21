import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseTileSprite } from "./BaseTileSprite";
const { ccclass, property } = _decorator;

@ccclass("WallTile")
export class WallTile extends BaseTileSprite {
  constructor() {
    super("WallTile", ASSET_KEY.SRITE_WALL);
  }
}
