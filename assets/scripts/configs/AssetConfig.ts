import { ASSET_KEY, ASSET_TYPE } from "../enum/AssetEnum";
import { AssetConfig } from "../interfaces/AssetInterface";

export function getAssets() {
  const assets = new Array<AssetConfig>();

  // Early sprites (used for loading screen)
  assets.push({
    key: ASSET_KEY.SPRITE_PLACEHOLDER,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_placeholder",
  });
  assets.push({
    key: ASSET_KEY.SPRITE_LOGO,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/logo_shopee_ular",
  });

  // Font
  assets.push({
    key: ASSET_KEY.FONT_SHOPEE2021_BOLD,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "fonts/Shopee2021-Bold",
  });
  assets.push({
    key: ASSET_KEY.FONT_SHOPEE2021_MEDIUM,
    type: ASSET_TYPE.FONT,
    url: "",
    localUrl: "fonts/Shopee2021-Medium",
  });

  // Sprite
  assets.push({
    key: ASSET_KEY.SPRITE_APPLE,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_apple",
  });
  assets.push({
    key: ASSET_KEY.SPRITE_SOUND_ON,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_sound_on",
  });
  assets.push({
    key: ASSET_KEY.SPRITE_SOUND_OFF,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_sound_off",
  });
  assets.push({
    key: ASSET_KEY.SPRITE_TROPHY,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_trophy",
  });
  assets.push({
    key: ASSET_KEY.SRITE_WALL,
    type: ASSET_TYPE.IMAGE,
    url: "",
    localUrl: "images/sprite_wall",
  });

  // Spritesheet
  assets.push({
    key: ASSET_KEY.SPRITESHEET_TILE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "images/sprite_tile",
    config: {
      frameWidth: 48,
      frameHeight: 48,
    },
  });
  assets.push({
    key: ASSET_KEY.SPRITESHEET_KEYPAD,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "images/keypad",
    config: {
      frameWidth: 124,
      frameHeight: 124,
      paddingX: 20,
      paddingY: 16,
    },
  });
  assets.push({
    key: ASSET_KEY.SPRITESHEET_SNAKE,
    type: ASSET_TYPE.SPRITESHEET,
    url: "",
    localUrl: "images/spritesheet_round",
    config: {
      frameWidth: 96,
      frameHeight: 96,
      paddingX: 1,
    },
  });

  // BGM
  assets.push({
    key: ASSET_KEY.BGM_MAIN,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "audios/bg-music",
  });

  // SFX
  assets.push({
    key: ASSET_KEY.SFX_EAT,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "audios/eat",
  });
  assets.push({
    key: ASSET_KEY.SFX_TURN,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "audios/turn",
  });
  assets.push({
    key: ASSET_KEY.SFX_CRASH,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "audios/crash",
  });
  assets.push({
    key: ASSET_KEY.SFX_BUTTON,
    type: ASSET_TYPE.AUDIO,
    url: "",
    localUrl: "audios/button-sfx",
  });

  return assets;
}
