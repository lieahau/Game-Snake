import {
  _decorator,
  Component,
  Sprite,
  UITransform,
  UIOpacity,
  Animation,
  assetManager,
  SpriteFrame,
  Color,
} from "cc";
import { getSpriteFrameKey } from "../utils/asset";
import { getScaleToNewDimension } from "../utils/scaling";
const { ccclass, property } = _decorator;

@ccclass("BaseSprite")
export class BaseSprite extends Component {
  protected sprite?: Sprite | null;

  protected uiTransform?: UITransform | null;

  protected animation?: Animation | null;

  protected presetDimension = { width: 0, height: 0 };

  constructor(
    name: string,
    protected textureKey: string,
    protected frameKey?: number | string
  ) {
    super(name);
  }

  onLoad() {
    this.sprite = this.getComponent(Sprite);
    this.uiTransform = this.getComponent(UITransform);
    this.animation = this.getComponent(Animation);
    this.presetDimension = this.getPresetDimension();

    this.reload();
  }

  protected reload() {
    this.setupSprite();
    this.adjustSize();
  }

  protected getPresetDimension() {
    const { presetDimension, uiTransform } = this;

    if (!uiTransform) return presetDimension;

    const { width, height } = uiTransform;
    return { width, height };
  }

  protected getSpriteFrame() {
    return assetManager.assets.get(
      getSpriteFrameKey(this.textureKey, this.frameKey)
    ) as SpriteFrame;
  }

  protected setupSprite() {
    if (this.sprite) {
      this.sprite.spriteFrame = this.getSpriteFrame();
    }
  }

  /**
   * @deprecated Use adjustSize instead
   */
  protected adjustScaling() {
    const { node, presetDimension } = this;
    const { width: presetWidth, height: presetHeight } = presetDimension;

    const { width, height } = this.getSpriteFrame()?.rect || presetDimension;
    const { x, y } = getScaleToNewDimension(
      width,
      height,
      presetWidth,
      presetHeight
    );
    node.setScale(x, y);
  }

  protected adjustSize() {
    const { uiTransform, presetDimension } = this;
    const { width, height } = presetDimension;

    uiTransform?.setContentSize(width, height);
  }

  public setOpacity(opacity: number) {
    if (this.sprite) {
      this.sprite.color.set(
        this.sprite.color.r,
        this.sprite.color.g,
        this.sprite.color.b,
        opacity
      );
    }
  }

  public setColor(color: Color) {
    if (this.sprite) {
      this.sprite.color = color;
    }
  }

  public setFrame(frameKey?: number | string) {
    this.frameKey = frameKey;
  }

  public setTexture(textureKey: string) {
    this.textureKey = textureKey;
  }
}
