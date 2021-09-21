import { _decorator, Component, Node, Color, tween } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { TRANSITION_SCREEN_EVENT } from "../enum/events/TransitionScreenEnum";
import { BaseSprite } from "../lib/BaseSprite";
const { ccclass, property } = _decorator;

@ccclass("TransitionScreen")
export class TransitionScreen extends BaseSprite {
  constructor() {
    super("TransitionScreen", ASSET_KEY.SPRITE_PLACEHOLDER);
  }

  fadeIn(duration = 1, targetOpacity = 255) {
    this.setOpacity(0);
    tween(this.sprite)
      .to(
        duration,
        { color: {a: targetOpacity } },
        {
          onStart: () => {
            this.node.emit(TRANSITION_SCREEN_EVENT.FADE_IN_START);
          },
          onComplete: () => {
            this.node.emit(TRANSITION_SCREEN_EVENT.FADE_IN_COMPLETE);
          },
        }
      )
      .start();
  }

  fadeOut(duration = 1, targetOpacity = 0) {
    this.setOpacity(255);
    tween(this.sprite)
      .to(
        duration,
        { color: {a: targetOpacity } },
        {
          onStart: () => {
            this.node.emit(TRANSITION_SCREEN_EVENT.FADE_OUT_START);
          },
          onComplete: () => {
            this.node.emit(TRANSITION_SCREEN_EVENT.FADE_OUT_COMPLETE);
          },
        }
      )
      .start();
  }
}
