import {
  _decorator,
  Component,
  resources,
  assetManager,
  ImageAsset,
  SpriteFrame,
  Texture2D,
  rect,
  director,
} from "cc";
import { getAssets } from "../configs/AssetConfig";
import { ASSET_TYPE } from "../enum/AssetEnum";
import { SCENE_KEY } from "../enum/SceneEnum";
import {
  AssetConfig,
  AssetSpritesheetConfig,
} from "../interfaces/AssetInterface";
import { getRawAssetKey, getSpriteFrameKey } from "../utils/asset";
import { PRELOAD_EVENT } from "./enum/events/PreloadEvent";
const { ccclass, property } = _decorator;

@ccclass("PreloadManager")
export class PreloadManager extends Component {
  private assets = new Array<AssetConfig>();

  private loadedCount = 0;

  onLoad() {
    this.assets = getAssets();
    this.node.once(PRELOAD_EVENT.LOAD_ASSET_COMPLETE, () => {
      director.loadScene(SCENE_KEY.MAINMENU);
    });
  }

  start() {
    this.loadAsset();
  }

  private getProgress() {
    return this.loadedCount / this.assets.length;
  }

  private loadAsset() {
    this.assets.forEach((asset: AssetConfig) => {
      if (asset.localUrl) {
        this.loadLocalAsset(asset);
      }
    });
  }

  private loadLocalAsset(asset: AssetConfig) {
    const { key, type, localUrl, config } = asset;
    if (!localUrl) return;

    resources.load(localUrl, (e, data) => {
      if (e) {
        // failed load asset
        this.node.emit(PRELOAD_EVENT.LOAD_ASSET_FAILURE, key);
      } else {
        // success load asset
        this.loadedCount += 1;
        this.loadAssetByType(key, data._uuid, type, config);
        this.node.emit(
          PRELOAD_EVENT.LOAD_ASSET_SUCCESS,
          key,
          this.getProgress()
        );
      }

      if (this.getProgress() === 1) {
        this.node.emit(PRELOAD_EVENT.LOAD_ASSET_COMPLETE);
      }
    });
  }

  private remapAssetManagerEntry(key: string, uuid: string) {
    const entry = assetManager.assets.get(uuid);

    if (!entry) return;

    assetManager.assets.add(key, entry);
    assetManager.assets.remove(uuid);
  }

  private loadAssetByType(
    key: string,
    uuid: string,
    type: ASSET_TYPE,
    config?: AssetSpritesheetConfig
  ) {
    switch (type) {
      case ASSET_TYPE.IMAGE:
        this.remapAssetManagerEntry(getRawAssetKey(key), uuid);
        this.loadAssetImage(key);
        break;

      case ASSET_TYPE.SPRITESHEET:
        this.remapAssetManagerEntry(getRawAssetKey(key), uuid);
        this.loadAssetSpritesheet(key, config);
        break;

      default:
        this.remapAssetManagerEntry(key, uuid);
        break;
    }
  }

  private loadAssetImage(key: string) {
    const rawKey = getRawAssetKey(key);
    const imageAsset = assetManager.assets.get(rawKey) as ImageAsset;

    if (!imageAsset) return;

    const spriteFrame = SpriteFrame.createWithImage(imageAsset);
    assetManager.assets.add(key, spriteFrame);
  }

  private loadAssetSpritesheet(key: string, config?: AssetSpritesheetConfig) {
    const rawKey = getRawAssetKey(key);
    const imageAsset = assetManager.assets.get(rawKey) as ImageAsset;
    const { width, height } = imageAsset || {};
    const { frameWidth, frameHeight, paddingX, paddingY } = {
      paddingX: 0,
      paddingY: 0,
      ...config,
    };

    if (!width || !height || !frameWidth || !frameHeight) return;

    const texture = new Texture2D();
    texture.image = imageAsset;

    let frameIndex = 0;
    for (let row = 0; row < height; row += frameHeight + paddingY) {
      for (let col = 0; col < width; col += frameWidth + paddingX) {
        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = texture;
        spriteFrame.rect = rect(col, row, frameWidth, frameHeight);
        assetManager.assets.add(
          getSpriteFrameKey(key, frameIndex++),
          spriteFrame
        );
      }
    }
  }
}
