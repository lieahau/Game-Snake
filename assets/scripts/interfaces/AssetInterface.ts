import { ASSET_TYPE } from "../enum/AssetEnum";

export interface AssetConfig {
    key: string;
    type: ASSET_TYPE;
    url: string;
    localUrl?: string;
    config?: AssetSpritesheetConfig;
}

export interface AssetSpritesheetConfig {
    frameWidth?: number;
    frameHeight?: number;
    paddingX?: number;
    paddingY?: number;
}
