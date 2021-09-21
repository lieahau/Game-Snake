import {
  _decorator,
  Button,
  Sprite,
  assetManager,
  SpriteFrame,
  UITransform,
  Label,
  TTFFont,
} from "cc";
import { getSpriteFrameKey } from "../utils/asset";
const { ccclass, property } = _decorator;

@ccclass("BaseButton")
export class BaseButton extends Button {
  protected sprite?: Sprite | null;

  protected label?: Label | null;

  protected uiTransform?: UITransform | null;

  protected presetDimension = { width: 0, height: 0 };

  constructor(
    name: string,
    protected textureKey: string,
    protected frameKey?: number,
    protected fontKey?: string
  ) {
    super(name);
  }

  onLoad() {
    this.sprite = this.getComponent(Sprite);
    this.label = this.getComponentInChildren(Label);

    this.setupSprite();
    this.setupFont();
    this.adjustSize();
  }

  protected getSpriteFrame(textureKey?: string, frameKey?: number) {
    return assetManager.assets.get(
      getSpriteFrameKey(textureKey || this.textureKey, frameKey || this.frameKey)
    ) as SpriteFrame;
  }

  protected setupSprite(textureKey?: string, frameKey?: number) {
    if (this.sprite) {
      this.sprite.spriteFrame = this.getSpriteFrame(textureKey, frameKey);
    }
    this.normalSprite = this.getSpriteFrame(textureKey, frameKey);
  }

  protected adjustSize() {
    const { uiTransform, presetDimension } = this;
    const { width, height } = presetDimension;

    uiTransform?.setContentSize(width, height);
  }

  protected setupFont() {
    if (this.label) {
      const font = this.getFont();
      if (font) {
        this.label.font = font;
      }
    }
  }

  protected getFont() {
    if (!this.fontKey) return undefined;
    return assetManager.assets.get(this.fontKey) as TTFFont;
  }

  public setText(text: string) {
    if (this.label) {
      this.label.string = text;
    }
  }
}
