import { _decorator, Component, Node, director, AudioSource, game, AudioClip, assetManager } from "cc";
import { ASSET_KEY } from "../enum/AssetEnum";
import { GAME_EVENT } from "../enum/events/GameEvent";
import { BaseAudio } from "../lib/BaseAudio";
import { SFXCrash } from "../sfx/SFXCrash";
import { SFXEat } from "../sfx/SFXEat";
import { SFXTurn } from "../sfx/SFXTurn";
import { getSoundStateFromLocalStorage } from "../utils/localStorage";
import { GAMEPLAY_EVENTS } from "./enum/events/GameplayEvents";
const { ccclass, property } = _decorator;

@ccclass("SFXController")
export class SFXController extends Component {
    @property(SFXTurn)
    private readonly sfxTurn?: SFXTurn;

    @property(SFXEat)
    private readonly sfxEat?: SFXEat;

    @property(SFXCrash)
    private readonly sfxCrash?: SFXCrash;

  onLoad() {
    director.on(GAMEPLAY_EVENTS.CHANGE_DIR, () => this.sfxTurn?.play(), this);
    director.on(GAMEPLAY_EVENTS.EAT_FRUIT, () => this.sfxEat?.play(), this);
    director.once(GAMEPLAY_EVENTS.GAME_OVER, () => this.sfxCrash?.play(), this);
  }
}
