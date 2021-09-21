import { _decorator, Component, Node } from "cc";
import { ScoreLabel } from "../../gameplay/objects/ScoreLabel";
import { TransitionScreen } from "../../utils/TransitionScreen";
const { ccclass, property } = _decorator;

@ccclass("GameOverPopup")
export class GameOverPopup extends Component {
  @property(TransitionScreen)
  private readonly overlayScreen?: TransitionScreen;

  @property(ScoreLabel)
  private readonly scoreLabel?: ScoreLabel;

  start() {
    this.overlayScreen?.fadeIn(0.3, 127);
  }

  public setScore(score: number) {
    this.scoreLabel?.updateScore(score);
  }
}
