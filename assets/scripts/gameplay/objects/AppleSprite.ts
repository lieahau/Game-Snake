
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../../enum/AssetEnum';
import { BaseSprite } from '../../lib/BaseSprite';
const { ccclass, property } = _decorator;

@ccclass('AppleSprite')
export class AppleSprite extends BaseSprite {
    constructor() {
        super('AppleSprite', ASSET_KEY.SPRITE_APPLE);
    }
}
