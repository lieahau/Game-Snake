import { _decorator } from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { BaseSprite } from "../../lib/BaseSprite";
import { SNAKE_PART } from "../enum/SnakeEnum";
const { ccclass, property } = _decorator;

@ccclass("SnakeSprite")
export class SnakeSprite extends BaseSprite {
  constructor() {
    super("SnakeSprite", ASSET_KEY.SPRITESHEET_SNAKE, 0);
  }

  public adjustTexture(part: SNAKE_PART) {
    switch (part) {
      case SNAKE_PART.HEAD: {
        this.setFrame(0);
        break;
      }

      case SNAKE_PART.BODY: {
        this.setFrame(3);
        break;
      }

      case SNAKE_PART.BODY_FAT: {
        this.setFrame(1);
        break;
      }

      case SNAKE_PART.TAIL: {
        this.setFrame(2);
        break;
      }

      default: {
        break;
      }
    }
    this.reload();
  }
}
