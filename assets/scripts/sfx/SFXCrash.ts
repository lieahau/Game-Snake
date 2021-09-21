
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/AssetEnum';
import { BaseAudio } from '../lib/BaseAudio';
const { ccclass, property } = _decorator;

@ccclass('SFXCrash')
export class SFXCrash extends BaseAudio {
    constructor() {
      super("SFXCrash", ASSET_KEY.SFX_CRASH, false, 0.6);
    }
}
