import {
  _decorator,
  Component,
  Sprite,
  ProgressBar,
  Label,
  assetManager,
  SpriteFrame,
  TTFFont,
} from "cc";
import { ASSET_KEY } from "../../enum/AssetEnum";
import { PRELOAD_EVENT } from "../enum/events/PreloadEvent";
import { PreloadManager } from "../PreloadManager";
const { ccclass, property } = _decorator;

@ccclass("PreloadLoading")
export class PreloadLoading extends Component {
  @property(PreloadManager)
  private readonly preloadManager?: PreloadManager;

  private readonly SPRITE_KEY = ASSET_KEY.SPRITE_PLACEHOLDER;

  private readonly TEXT_KEY = ASSET_KEY.FONT_SHOPEE2021_BOLD;

  private barBackground?: Sprite | null;

  private progressBar?: ProgressBar | null;

  @property(Sprite)
  private readonly barForeground?: Sprite;

  @property(Label)
  private readonly percentage?: Label;

  onLoad() {
    this.barBackground = this.getComponent(Sprite);
    this.progressBar = this.getComponent(ProgressBar);
    this.preloadManager?.node.on(
      PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
      this.updateProgress,
      this
    );
  }

  start() {
    const frame = assetManager.assets.get(this.SPRITE_KEY);
    if (frame) {
      this.updateBarSpriteFrame(frame as SpriteFrame);
    } else {
      this.waitForAsset();
    }
  }

  private updateProgress(key: string, progress: number) {
    if (this.progressBar) {
      this.progressBar.progress = progress;
    }
    if (this.percentage) {
      this.percentage.string = `${(progress * 100).toFixed(0)}%`;
    }
  }

  private waitForAsset() {
    let neededAsset = 2;
    const assetChecker = (key: string) => {
      if (key === this.SPRITE_KEY) {
        const frame = assetManager.assets.get(this.SPRITE_KEY);
        if (frame) {
          this.updateBarSpriteFrame(frame as SpriteFrame);
        }
      } else if (key === this.TEXT_KEY) {
          const font = assetManager.assets.get(this.TEXT_KEY) as TTFFont;
          if (font && this.percentage) {
              this.percentage.font = font;
          }
      }

      if (neededAsset === 0) {
        this.preloadManager?.node.off(
            PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
            assetChecker,
            this
          );
      }
    };

    this.preloadManager?.node.on(
      PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
      assetChecker,
      this
    );
  }

  private updateBarSpriteFrame(frame: SpriteFrame) {
    if (this.barBackground) {
      this.barBackground.spriteFrame = frame;
    }
    if (this.barForeground) {
      this.barForeground.spriteFrame = frame;
    }
  }
}
