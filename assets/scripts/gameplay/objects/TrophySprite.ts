
import { _decorator, Component, Node } from 'cc';
import { ASSET_KEY } from '../../enum/AssetEnum';
import { BaseSprite } from '../../lib/BaseSprite';
const { ccclass, property } = _decorator;

@ccclass('TrophySprite')
export class TrophySprite extends BaseSprite {
    constructor() {
        super('TrophySprite', ASSET_KEY.SPRITE_TROPHY);
    }
}
