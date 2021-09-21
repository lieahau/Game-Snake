import { _decorator, Component, Node, director } from "cc";
import { getHighscoreFromLocalStorage } from "../utils/localStorage";
import { GAMEPLAY_EVENTS } from "./enum/events/GameplayEvents";
import { GameHeader } from "./objects/GameHeader";
const { ccclass, property } = _decorator;

@ccclass("ScoreManager")
export class ScoreManager extends Component {
  @property(GameHeader)
  private readonly gameHeader?: GameHeader;

  private score = 0;

  private highscore = 0;

  public get Score() {
    return this.score;
  }

  public get Highscore() {
    return this.highscore;
  }

  onLoad() {
    director.once(GAMEPLAY_EVENTS.START_GAME, this.initialize, this);
    director.on(GAMEPLAY_EVENTS.EAT_FRUIT, this.addScore, this);
  }

  private initialize() {
    this.gameHeader?.startGame();
    this.score = 0;
    this.highscore = getHighscoreFromLocalStorage();
    this.gameHeader?.updateScore(this.score);
    this.gameHeader?.updateHighscore(this.highscore);
  }

  private addScore() {
    this.score = this.score + 1;
    this.gameHeader?.updateScore(this.score);

    if (this.score > this.highscore) {
      this.highscore = this.score;
      this.gameHeader?.updateHighscore(this.highscore);
    }
  }
}
