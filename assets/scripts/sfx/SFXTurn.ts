
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../enum/AssetEnum';
import { BaseAudio } from '../lib/BaseAudio';
const { ccclass, property } = _decorator;

@ccclass('SFXTurn')
export class SFXTurn extends BaseAudio {
    constructor() {
      super("SFXTurn", ASSET_KEY.SFX_TURN, false, 0.6);
    }
}
