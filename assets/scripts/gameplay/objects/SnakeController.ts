import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Vec2,
  Vec3,
  tween,
  director,
  macro,
  Color,
} from "cc";
import {
  SnakeConfig,
  SnakePart,
  SnakeUpdateIntervalConfig,
} from "../../interfaces/LevelInterfaces";
import { SnakeSprite } from "./SnakeSprite";
import { SNAKE_PART } from "../enum/SnakeEnum";
import { GameBoard } from "./GameBoard";
import { GAMEPLAY_EVENTS, SNAKE_EVENT } from "../enum/events/GameplayEvents";
const { ccclass, property } = _decorator;

@ccclass("SnakeController")
export class SnakeController extends Component {
  @property(Prefab)
  private readonly snakeSprite?: Prefab;

  @property(GameBoard)
  private readonly board?: GameBoard;

  private readonly baseColor = Color.WHITE;

  private readonly glowColor = new Color(255, 255, 160);

  private updateInterval = 1.0;

  private accelerateMultiplier = 1.0;

  private accelerateEvery = 1;

  private minimumInterval = 1.0;

  private eatCounter = 0;

  private isDead = false;

  private parts = new Array<SnakePart>();

  private swallowingParts = new Array<SnakePart>();

  private movementDirection = new Vec2(0, 0);

  public get Parts() {
    return this.parts;
  }

  public get Head() {
    return this.parts[0];
  }

  public get Neck() {
    return this.parts[1];
  }

  public get Tail() {
    return this.parts[this.parts.length - 1];
  }

  onLoad() {
    director.once(GAMEPLAY_EVENTS.START_GAME, this.startGame, this);
  }

  private startGame() {
    director.on(GAMEPLAY_EVENTS.INPUT_MOVE, this.changeDirection, this);
    this.node.on(SNAKE_EVENT.MOVE, this.moving, this);
    this.updateMoveScheduler();
  }

  private gameOver() {
    if (this.isDead) return;

    this.isDead = true;
    this.adjustTextures();
    this.unschedule(this.move);

    director.emit(GAMEPLAY_EVENTS.GAME_OVER);
  }

  public initialize(config: SnakeConfig) {
    this.setupInterval(config.interval);

    if (!this.Head || !this.Neck) return;

    const { x, y } = this.getDirectionBetweenParts(this.Neck, this.Head);
    this.movementDirection.set(x, y);
    this.adjustTextures();
  }

  public addPart(colIndex: number, rowIndex: number, x: number, y: number) {
    if (!this.snakeSprite) return undefined;

    const sprite = instantiate(this.snakeSprite);
    sprite.setParent(this.node);
    sprite.setPosition(x, y);
    sprite.active = true;

    const part = {
      sprite: sprite.getComponent(SnakeSprite),
      index: new Vec2(colIndex, rowIndex),
      position: new Vec3(x, y, 0),
      rotation: new Vec3(0, 0, 0),
    } as SnakePart;

    this.parts.push(part);

    return part;
  }

  public changeDirection(directionX: number, directionY: number) {
    if (this.isLegalMove(directionX, directionY)) {
      this.movementDirection.set(directionX, directionY);

      this.node.once(SNAKE_EVENT.MOVE, () => {
        director.emit(GAMEPLAY_EVENTS.CHANGE_DIR);
      });
      return true;
    }
    return false;
  }

  public adjustTextures() {
    this.parts.reduce((previousPart, part) => {
      this.adjustPartTexture(previousPart, part);
      return part;
    }, undefined as unknown as SnakePart);
  }

  private adjustPartTexture(previousPart: SnakePart, part: SnakePart) {
    const { sprite } = part;
    if (previousPart) {
      const { x, y } = this.getDirectionBetweenParts(part, previousPart);

      const isTail = part === this.Tail;
      if (isTail) {
        sprite.adjustTexture(SNAKE_PART.TAIL);
      } else {
        sprite.adjustTexture(SNAKE_PART.BODY);
      }

      this.setPartDirection(part, x, y);
    } else {
      const { x, y } = this.movementDirection;

      sprite.adjustTexture(SNAKE_PART.HEAD);

      this.setPartDirection(part, x, y);
    }
  }

  public move() {
    this.node.emit(SNAKE_EVENT.MOVE, this.movementDirection);
  }

  private updateMoveScheduler() {
    this.unschedule(this.move);
    this.schedule(this.move, this.updateInterval, macro.REPEAT_FOREVER);
  }

  private moving(direction: Vec2) {
    if (!this.board) return;

    const { x, y } = this.Head.index;
    const nextIndex = new Vec2(x + direction.x, y + direction.y);
    const tile = this.board.getTileIfSafe(nextIndex.x, nextIndex.y);

    this.swallowing();

    const eatFruit = this.board.eatFruit(nextIndex.x, nextIndex.y);
    if (eatFruit) {
      this.eatFruit();
      this.board?.spawnRandomFruit(this);
    }

    if (tile && tile.node && !this.isEatSelf()) {
      this.moveParts();
      this.updatePart(this.Head, nextIndex, tile.node.position);
      this.adjustTextures();
    } else {
      this.gameOver();
    }
  }

  private eatFruit() {
    this.startSwallow(this.Neck);
    director.emit(GAMEPLAY_EVENTS.EAT_FRUIT);
  }

  private isEatSelf() {
    return this.parts.reduce((res, part) => {
      if (part === this.Head) return res;

      if (
        this.Head.index.x === part.index.x &&
        this.Head.index.y === part.index.y
      ) {
        return true;
      }

      return res;
    }, false);
  }

  private moveParts() {
    this.parts.reduce((previousPart, part) => {
      const { x, y } = part.index;
      const { x: posX, y: posY } = part.position;
      if (previousPart) {
        this.updatePart(part, previousPart.index, previousPart.position);
      }
      return {
        index: new Vec2(x, y),
        position: new Vec3(posX, posY),
      };
    }, undefined as unknown as { index: Vec2; position: Vec3 });
  }

  private updatePart(part: SnakePart, index: Vec2, position: Vec3) {
    const { x, y } = index;
    const { x: posX, y: posY } = position;

    part.index.set(x, y);
    part.position.set(position);
    tween(part.sprite.node)
      .to(this.updateInterval, {
        position: new Vec3(posX, posY),
      })
      .start();
  }

  public startSwallow(part: SnakePart) {
    const { glowColor, baseColor } = this;

    tween(part.sprite.node)
      .to(
        this.updateInterval * 0.5,
        {
          scale: new Vec3(2, 1, 1),
        },
        {
          onStart() {
            part.sprite.setColor(glowColor);
          },
        }
      )
      .to(
        this.updateInterval * 0.5,
        {
          scale: new Vec3(1, 1, 1),
        },
        {
          onComplete() {
            part.sprite.setColor(baseColor);
          },
        }
      )
      .start();
    this.swallowingParts.push(part);
  }

  private swallowing() {
    const nextParts = this.swallowingParts.reduce((res, part) => {
      const nextPart = this.parts[this.parts.indexOf(part) + 1];

      if (nextPart) {
        res.push(nextPart);
      }

      return res;
    }, new Array<SnakePart>());

    this.swallowingParts = [];

    nextParts.forEach((part) => {
      if (part === this.Tail) {
        this.incrementEatCounter();
        this.spawnNewTail();
      } else {
        this.startSwallow(part);
      }
    });
  }

  private incrementEatCounter() {
    this.eatCounter += 1;
    if (this.eatCounter % this.accelerateEvery === 0) {
      this.updateInterval = Math.max(
        this.updateInterval * this.accelerateMultiplier,
        this.minimumInterval
      );
    }
    this.updateMoveScheduler();
  }

  private spawnNewTail() {
    const { index, position, rotation } = this.Tail;

    const part = this.addPart(index.x, index.y, position.x, position.y);

    part?.rotation.set(rotation);
    part?.sprite.node.setRotationFromEuler(rotation);

    part?.sprite.node.setScale(0, 0, 1);
    tween(part?.sprite.node)
      .to(this.updateInterval * 0.7, {
        scale: new Vec3(1.25, 1, 1),
      })
      .to(this.updateInterval * 0.3, {
        scale: new Vec3(1, 1, 1),
      })
      .start();
  }

  private setPartDirection(
    part: SnakePart,
    directionX: number,
    directionY: number
  ) {
    const { direction } = part;
    const isTurning = this.isPartChangingDirection(
      part,
      directionX,
      directionY
    );

    if (direction) {
      direction.set(directionX, directionY);
    } else {
      part.direction = new Vec2(directionX, directionY);
    }

    if (isTurning) {
      this.rotatePartToMatchDirection(part);
    }
  }

  private getPartRotationByDirection(directionX: number, directionY: number) {
    if (directionY === -1) {
      return new Vec3(0, 0, 0);
    } else if (directionX === 1) {
      return new Vec3(0, 0, -90);
    } else if (directionY === 1) {
      return new Vec3(0, 0, -180);
    } else if (directionX === -1) {
      return new Vec3(0, 0, -270);
    }
  }

  private rotatePartToMatchDirection(part: SnakePart) {
    const { direction, sprite } = part;

    if (!direction) return;

    const nextRotation = this.getPartRotationByDirection(
      direction.x,
      direction.y
    );
    const { rotation: currentRotation } = part || {};
    if (!nextRotation || !currentRotation) return;

    const { x, y, z } = nextRotation;

    const { z: currentZ } = currentRotation;

    /**
     * To prevent sharp turns
     */
    let diffZ = z - currentZ;
    if (diffZ < -180) {
      diffZ = (diffZ + 360) % 360;
    } else if (diffZ > 180) {
      diffZ = (diffZ - 360) % 360;
    }

    part.rotation?.set(x, y, z);
    tween(this.node)
      .to(
        this.updateInterval,
        {},
        {
          onUpdate(_, ratio) {
            if (ratio === undefined) return;
            sprite.node.setRotationFromEuler(x, y, currentZ + diffZ * ratio);
          },
          onComplete() {
            sprite.node.setRotationFromEuler(x, y, z);
          },
        }
      )
      .start();
  }

  private isPartChangingDirection(
    part: SnakePart,
    directionX: number,
    directionY: number
  ) {
    const { direction } = part;

    if (!direction) return true;

    if (direction.x === directionX && direction.y === directionY) return false;

    return true;
  }

  private isLegalMove(directionX: number, directionY: number) {
    const head = this.Head;
    const neck = this.Neck;

    if (!head || !neck) return true;

    return (
      !(
        head.index.x + directionX === neck.index.x &&
        head.index.y + directionY === neck.index.y
      ) &&
      !(
        this.movementDirection.x === directionX &&
        this.movementDirection.y === directionY
      )
    );
  }

  private setupInterval(config: SnakeUpdateIntervalConfig) {
    const { initial, accelerateMultiplier, accelerateEvery, minimum } = config;

    this.updateInterval = initial;
    this.accelerateMultiplier = accelerateMultiplier;
    this.accelerateEvery = accelerateEvery;
    this.minimumInterval = minimum;
  }

  private getDirectionBetweenParts(partA: SnakePart, partB: SnakePart) {
    return new Vec2(
      partB.index.x - partA.index.x,
      partB.index.y - partA.index.y
    );
  }
}
