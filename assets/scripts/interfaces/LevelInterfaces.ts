import { Node, Vec2, Vec3 } from "cc";
import { TILE_TYPE } from "../gameplay/enum/TileEnum";
import { SnakeSprite } from "../gameplay/objects/Snake";

export interface BoardConfig {
  tiles: Array<Array<number>>;
}

export interface SnakePart {
  sprite: SnakeSprite;
  index: Vec2;
  position: Vec3;
  rotation: Vec3;
  direction?: Vec2;
}

export interface SnakeConfig {
  parts: Array<{ x: number; y: number }>;
  interval: SnakeUpdateIntervalConfig;
}

export interface SnakeUpdateIntervalConfig {
  initial: number;
  accelerateMultiplier: number;
  accelerateEvery: number;
  minimum: number;
}

export interface LevelConfig {
  boardConfig: BoardConfig;
  snakeConfig: SnakeConfig;
}

export interface Tile {
  type: TILE_TYPE;
  node?: Node;
  index: Vec2;
}
