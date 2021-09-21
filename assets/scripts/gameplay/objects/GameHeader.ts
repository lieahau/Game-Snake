import { _decorator, Component, Node, director } from "cc";
import { HighscoreLabel } from "./HighscoreLabel";
import { ScoreLabel } from "./ScoreLabel";
const { ccclass, property } = _decorator;

@ccclass("GameHeader")
export class GameHeader extends Component {
  @property(Node)
  private readonly guideHeader?: Node;

  @property(Node)
  private readonly scoreHeader?: Node;

  @property(ScoreLabel)
  private readonly scoreLabel?: ScoreLabel;

  @property(HighscoreLabel)
  private readonly highscoreLabel?: HighscoreLabel;

  start() {
    this.hideScore();
    this.showGuide();
  }

  public hideGuide() {
    if (this.guideHeader) {
      this.guideHeader.active = false;
    }
  }

  public showGuide() {
    if (this.guideHeader) {
      this.guideHeader.active = true;
    }
  }

  public hideScore() {
    if (this.scoreHeader) {
      this.scoreHeader.active = false;
    }
  }

  public showScore() {
    if (this.scoreHeader) {
      this.scoreHeader.active = true;
    }
  }

  public updateScore(score: number) {
    this.scoreLabel?.updateScore(score);
  }

  public updateHighscore(highscore: number) {
    this.highscoreLabel?.updateHighscore(highscore);
  }

  public startGame() {
    this.hideGuide();
    this.showScore();
  }
}
