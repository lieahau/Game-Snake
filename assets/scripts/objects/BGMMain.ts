import { _decorator, Component, Node, director, Director } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { BaseAudio } from "../lib/BaseAudio";
const { ccclass, property } = _decorator;

@ccclass("BGMMain")
export class BGMMain extends BaseAudio {
  constructor() {
    super("BackgroundSoundtrack", ASSET_KEY.BGM_MAIN, true, 0.5);
  }

  start() {
    super.start();
    this.play();
    
    director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
      this.play();
  });
  }
}
