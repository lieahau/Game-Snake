import { _decorator, Component, Node } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { BaseButton } from "../lib/BaseButton";
import {
  getSoundStateFromLocalStorage,
  updateLocalStorageSoundState,
} from "../utils/localStorage";
const { ccclass, property } = _decorator;

@ccclass("SoundButton")
export class SoundButton extends BaseButton {
  private readonly soundButtonOnKey = ASSET_KEY.SPRITE_SOUND_ON;

  private readonly soundButtonOffKey = ASSET_KEY.SPRITE_SOUND_OFF;

  constructor() {
    super("SoundButton", ASSET_KEY.SPRITE_SOUND_ON);
  }

  onLoad() {
    super.onLoad();
    this.updateSoundButtonSprite();
  }

  public onClick() {
    updateLocalStorageSoundState(!getSoundStateFromLocalStorage());
    this.updateSoundButtonSprite();
  }

  private updateSoundButtonSprite() {
    const state = getSoundStateFromLocalStorage();
    if (state) {
      this.setupSprite(this.soundButtonOnKey);
    } else {
      this.setupSprite(this.soundButtonOffKey);
    }
  }
}
