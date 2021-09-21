import { _decorator, Component, Node, director, find, instantiate, game, Prefab } from "cc";
import { TRANSITION_SCREEN_EVENT } from "../enum/events/TransitionScreenEnum";
import { SCENE_KEY } from "../enum/SceneEnum";
import { BGMMain } from "../objects/BGMMain";
import { TransitionScreen } from "../utils/TransitionScreen";
import { MAIN_MENU_EVENT } from "./enum/events/MainMenuEvent";
import { PlayButton } from "./objects/PlayButton";
const { ccclass, property } = _decorator;

@ccclass("MainMenuManager")
export class MainMenuManager extends Component {
  @property(Prefab)
  public readonly BGMPrefab?: Prefab;

  @property(TransitionScreen)
  private readonly transitionScreen?: TransitionScreen;

  @property(PlayButton)
  private readonly playButton?: PlayButton;

  start() {
    this.spawnBGMIfNotExist();

    this.transitionScreen?.fadeOut();
    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_OUT_COMPLETE,
      this.setupPlayButtonClick,
      this
    );
  }

  private spawnBGMIfNotExist() {
    if (!this.BGMPrefab) return;
    if (!find(this.BGMPrefab.data.name)) {
        const node = instantiate(this.BGMPrefab);
        game.addPersistRootNode(node);
    }
}

  private setupPlayButtonClick() {
    this.playButton?.node.once(MAIN_MENU_EVENT.PLAY_GAME, this.playGame, this);
  }

  private playGame() {
    this.transitionScreen?.fadeIn();
    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_IN_COMPLETE,
      () => {
        director.loadScene(SCENE_KEY.GAMEPLAY);
      }
    );
  }
}
