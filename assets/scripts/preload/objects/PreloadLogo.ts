import {
  _decorator,
  Component,
  assetManager,
  Sprite,
  SpriteFrame,
} from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { PRELOAD_EVENT } from "../enum/events/PreloadEvent";
import { PreloadManager } from "../PreloadManager";
const { ccclass, property } = _decorator;

@ccclass("PreloadLogo")
export class PreloadLogo extends Component {
  @property(PreloadManager)
  private readonly preloadManager?: PreloadManager;

  private readonly SPRITE_KEY = ASSET_KEY.SPRITE_LOGO;

  private sprite?: Sprite | null;

  onLoad() {
    this.sprite = this.getComponent(Sprite);
  }

  start() {
    const frame = assetManager.assets.get(this.SPRITE_KEY);
    if (frame) {
      this.updateSpriteFrame(frame as SpriteFrame);
    } else {
      this.waitForAsset();
    }
  }

  private waitForAsset() {
    const assetChecker = (key: string) => {
      if (key === this.SPRITE_KEY) {
        const frame = assetManager.assets.get(this.SPRITE_KEY);
        if (frame) {
          this.updateSpriteFrame(frame as SpriteFrame);
          this.preloadManager?.node.off(
            PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
            assetChecker
          );
        }
      }
    };

    this.preloadManager?.node.on(
      PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
      assetChecker
    );
  }

  private updateSpriteFrame(frame: SpriteFrame) {
    if (this.sprite) {
      this.sprite.spriteFrame = frame;
    }
  }
}
