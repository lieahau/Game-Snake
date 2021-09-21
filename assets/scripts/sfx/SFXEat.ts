
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/AssetEnum';
import { BaseAudio } from '../lib/BaseAudio';
const { ccclass, property } = _decorator;

@ccclass('SFXEat')
export class SFXEat extends BaseAudio {
    constructor() {
      super("SFXEat", ASSET_KEY.SFX_EAT, false, 0.6);
    }
}
