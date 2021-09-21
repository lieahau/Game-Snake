import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Canvas,
  director,
} from "cc";
import { getLevelConfig } from "../configs/LevelConfig";
import { TRANSITION_SCREEN_EVENT } from "../enum/events/TransitionScreenEnum";
import { SCENE_KEY } from "../enum/SceneEnum";
import { SnakeConfig } from "../interfaces/LevelInterfaces";
import { GameOverPopup } from "../objects/Popup/GameOverPopup";
import { updateLocalStorageHighscore } from "../utils/localStorage";
import { TransitionScreen } from "../utils/TransitionScreen";
import { GAMEPLAY_EVENTS } from "./enum/events/GameplayEvents";
import { GameBoard } from "./objects/GameBoard";
import { GameHeader } from "./objects/GameHeader";
import { KeypadController } from "./objects/keypad/KeypadController";
import { SnakeController } from "./objects/SnakeController";
import { ScoreManager } from "./ScoreManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Canvas)
  private readonly canvas?: Canvas;

  @property(TransitionScreen)
  private readonly transitionScreen?: TransitionScreen;

  @property(ScoreManager)
  private readonly scoreManager?: ScoreManager;

  @property(GameHeader)
  private readonly gameHeader?: GameHeader;

  @property(GameBoard)
  private readonly gameBoard?: GameBoard;

  @property(Prefab)
  private readonly invalidSnakePopUp?: Prefab;

  @property(Prefab)
  private readonly gameOverPopUp?: Prefab;

  @property(SnakeController)
  private readonly snake?: SnakeController;

  @property(KeypadController)
  private readonly controller?: KeypadController;

  start() {
    const { boardConfig, snakeConfig } = getLevelConfig();
    this.gameBoard?.generateBoard(boardConfig.tiles);
    const isValidSnake = this.isSnakeConfigValid(snakeConfig);
    if (isValidSnake) {
      this.generateSnake(snakeConfig);
      if (this.snake) {
        this.gameBoard?.spawnRandomFruit(this.snake);
      }
    }

    this.transitionScreen?.fadeOut();

    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_OUT_COMPLETE,
      () => {
        if (isValidSnake) {
          director.once(GAMEPLAY_EVENTS.GAME_OVER, this.gameOver, this);
          director.once(GAMEPLAY_EVENTS.INPUT_MOVE, () => {
            director.emit(GAMEPLAY_EVENTS.START_GAME);
          });
        } else {
          this.invalidSnake();
        }
      }
    );
  }

  private gameOver() {
    updateLocalStorageHighscore(this.scoreManager?.Highscore || 0);
    if (this.gameOverPopUp && this.canvas) {
      const popup = instantiate(this.gameOverPopUp);
      popup.setParent(this.canvas.node);
      if (this.transitionScreen) {
        popup.setSiblingIndex(this.transitionScreen.node.getSiblingIndex());
      }
      popup
        .getComponent(GameOverPopup)
        ?.setScore(this.scoreManager?.Score || 0);

      director.once(GAMEPLAY_EVENTS.GO_TO_SCENE, this.goToScene, this);
    }
  }

  private generateSnake(config: SnakeConfig) {
    const { gameBoard, snake } = this;

    if (!gameBoard || !snake) return;

    const { parts } = config;
    parts.forEach((val) => {
      const { x, y } = val;
      const { x: posX, y: posY } = gameBoard.getTilePosition(x, y);
      snake.addPart(x, y, posX, posY);
    });
    snake.initialize(config);
  }

  private invalidSnake() {
    if (this.invalidSnakePopUp && this.canvas) {
      const popup = instantiate(this.invalidSnakePopUp);
      popup.setParent(this.canvas.node);
      if (this.transitionScreen) {
        popup.setSiblingIndex(this.transitionScreen.node.getSiblingIndex());
      }
      this.gameHeader?.hideGuide();
      this.gameHeader?.showScore();
      director.once(GAMEPLAY_EVENTS.GO_TO_SCENE, this.goToScene, this);
    }
  }

  private goToScene(sceneKey: SCENE_KEY) {
    this.transitionScreen?.fadeIn();
    this.transitionScreen?.node.once(
      TRANSITION_SCREEN_EVENT.FADE_IN_COMPLETE,
      () => {
        director.loadScene(sceneKey);
      }
    );
  }

  private isSnakeConfigValid(config: SnakeConfig) {
    const { parts } = config;

    /**
     * Snake minimum length has to be 3 (head, body, tail)
     */
    if (parts.length < 3) {
      return false;
    }

    /**
     * Snake cannot occupy unsafe tiles
     */
    const snakeOccupyUnsafeTile = parts.reduce((res, part) => {
      const { x, y } = part;
      const tile = this.gameBoard?.getTileIfSafe(x, y);

      if (!tile) return true;

      return res;
    }, false);

    if (snakeOccupyUnsafeTile) {
      return false;
    }

    /**
     * Snake parts have to be 1 manhattan apart from each other
     */
    const snakePartsOneManhattanApart = parts.reduce(
      (res, part, index, arr) => {
        const nextPart = arr[index + 1];

        if (nextPart) {
          const tileDistance =
            Math.abs(part.x - nextPart.x) + Math.abs(part.y - nextPart.y);
          return tileDistance === 1;
        }

        return res;
      },
      true
    );

    if (!snakePartsOneManhattanApart) {
      return false;
    }

    return true;
  }
}
