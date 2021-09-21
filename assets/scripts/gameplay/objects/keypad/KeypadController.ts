import {
  _decorator,
  Component,
  Node,
  EventTouch,
  systemEvent,
  SystemEvent,
  director,
} from "cc";
import {
  DIRECTION,
  GAMEPLAY_EVENTS,
  SNAKE_EVENT,
} from "../../enum/events/GameplayEvents";
import { GameManager } from "../../GameManager";
import { SnakeController } from "../SnakeController";
const { ccclass, property } = _decorator;

@ccclass("KeypadController")
export class KeypadController extends Component {
  @property(SnakeController)
  private readonly snake?: SnakeController;

  start() {
    this.setupControl();
  }

  private move(dir: DIRECTION) {
    let dirX = 0;
    let dirY = 0;
    switch (dir) {
      case DIRECTION.MOVE_LEFT:
        dirX = -1;
        dirY = 0;
        break;

      case DIRECTION.MOVE_UP:
        dirX = 0;
        dirY = -1;
        break;

      case DIRECTION.MOVE_RIGHT:
        dirX = 1;
        dirY = 0;
        break;

      case DIRECTION.MOVE_DOWN:
        dirX = 0;
        dirY = 1;
        break;
    }

    director.emit(GAMEPLAY_EVENTS.INPUT_MOVE, dirX, dirY);
  }

  public onClick(event: EventTouch, args: DIRECTION) {
    this.move(args);
  }

  private setupControl() {
    this.node.once(Node.EventType.NODE_DESTROYED, () => {
      systemEvent.off(SystemEvent.EventType.KEY_DOWN);
    });
    systemEvent.on(SystemEvent.EventType.KEY_DOWN, (event) => {
      switch (event.keyCode) {
        case 37:
          this.move(DIRECTION.MOVE_LEFT);
          break;

        case 38:
          this.move(DIRECTION.MOVE_UP);
          break;

        case 39:
          this.move(DIRECTION.MOVE_RIGHT);
          break;

        case 40:
          this.move(DIRECTION.MOVE_DOWN);
          break;

        default:
          break;
      }
    });
  }
}
