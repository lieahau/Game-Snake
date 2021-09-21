import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../../../enum/AssetEnum";
import { BaseTileSprite } from "./BaseTileSprite";
const { ccclass, property } = _decorator;

@ccclass("NormalTile")
export class NormalTile extends BaseTileSprite {
  constructor() {
    super("NormalTile", ASSET_KEY.SPRITESHEET_TILE, 0);
  }

  public adjustTexture(isEven: boolean) {
    if (isEven) {
      this.setFrame(0);
    } else {
      this.setFrame(1);
    }
    this.reload();
  }
}
