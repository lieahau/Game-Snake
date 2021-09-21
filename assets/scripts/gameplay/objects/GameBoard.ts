import { _decorator, Component, Node, Prefab, Vec2, instantiate } from "cc";
import { Tile } from "../../interfaces/LevelInterfaces";
import { TILE_TYPE } from "../enum/TileEnum";
import { SnakeController } from "./SnakeController";
import { NormalTile } from "./tiles/NormalTile";
const { ccclass, property } = _decorator;

@ccclass("GameBoard")
export class GameBoard extends Component {
  @property(Prefab)
  private readonly normalTile?: Prefab;

  @property(Prefab)
  private readonly wallTile?: Prefab;

  @property(Node)
  private readonly tilesRoot?: Node;

  @property(Prefab)
  private readonly appleSprite?: Prefab;

  private readonly TILE_SIZE = 28;

  private board = new Array<Array<Tile>>();

  private fruits = new Array<{ node: Node; index: Vec2 }>();

  start() {}

  public generateBoard(levelConfig: Array<Array<number>>) {
    this.board = this.getBoardFromLevelConfig(levelConfig);
    this.generateBoardSprites();
  }

  public spawnRandomFruit(snake: SnakeController) {
    const { appleSprite, tilesRoot } = this;
    const tile = this.getRandomWalkableTile(snake);

    if (!appleSprite || !tile.node) return;

    const node = instantiate(appleSprite);
    node.setParent(tilesRoot || this.node);
    node.setPosition(tile.node.position.x, tile.node.position.y);
    node.active = true;

    this.fruits.push({
      node,
      index: tile.index,
    });
  }

  public eatFruit(colIndex: number, rowIndex: number) {
    const fruitIndex = this.fruits.findIndex((v) => {
      const { x, y } = v.index;

      return x === colIndex && y === rowIndex;
    });

    const fruit = this.fruits[fruitIndex];

    if (fruit) {
      fruit.node.destroy();
      this.fruits.splice(fruitIndex, 1);
      return true;
    }

    return false;
  }

  private getRandomWalkableTile(snake: SnakeController) {
    const walkableTiles = this.getWalkableTiles(snake);

    return walkableTiles[Math.floor(Math.random() * walkableTiles.length)];
  }

  private getWalkableTiles(snake: SnakeController) {
    const snakeTiles = snake.Parts.map((part) => {
      const { x, y } = part.index;

      return `${x}|${y}`;
    });

    return this.board.reduce((res, row, rowIndex) => {
      const tiles = row.filter((tile, colIndex) => {
        return (
          tile.type === TILE_TYPE.NORMAL &&
          !snakeTiles.find((v) => v === `${colIndex}|${rowIndex}`)
        );
      });

      res.push(...tiles);

      return res;
    }, new Array<Tile>());
  }

  private getBoardFromLevelConfig(levelConfig: Array<Array<number>>) {
    return levelConfig.map((row, rowIndex) => {
      return row.map((tileType, colIndex) => {
        return {
          type: tileType,
          index: new Vec2(colIndex, rowIndex),
        } as Tile;
      });
    });
  }

  private generateBoardSprites() {
    this.board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        const tilePrefab = this.getTilePrefab(tile);
        if (tilePrefab) {
          const { x, y } = this.getTilePosition(colIndex, rowIndex);
          const node = instantiate(tilePrefab);
          node.setParent(this.tilesRoot || this.node);
          node.setPosition(x, y);
          node.active = true;

          if (tile.type === TILE_TYPE.NORMAL) {
            node
              .getComponent(NormalTile)
              ?.adjustTexture((colIndex + rowIndex) % 2 === 0);
          }

          this.assignTileNodeToBoard(colIndex, rowIndex, node);
        }
      });
    });
  }

  private assignTileNodeToBoard(
    colIndex: number,
    rowIndex: number,
    node: Node
  ) {
    const tile = this.getTile(colIndex, rowIndex);
    if (tile) {
      tile.node = node;
    }
  }

  private getTile(colIndex: number, rowIndex: number) {
    const row = this.board[rowIndex];
    if (row) {
      return row[colIndex];
    }
    return undefined;
  }

  private getTilePrefab(tile: Tile) {
    switch (tile.type) {
      case TILE_TYPE.WALL:
        return this.wallTile;

      default:
        return this.normalTile;
    }
  }

  public getTilePosition(colIndex: number, rowIndex: number) {
    return {
      x: colIndex * this.TILE_SIZE,
      y: -rowIndex * this.TILE_SIZE,
    };
  }

  private isASafeTile(colIndex: number, rowIndex: number) {
    const tile = this.getTile(colIndex, rowIndex);

    return tile !== undefined && tile.type !== TILE_TYPE.WALL;
  }

  public getTileIfSafe(colIndex: number, rowIndex: number) {
    if (this.isASafeTile(colIndex, rowIndex)) {
      return this.getTile(colIndex, rowIndex);
    }
    return undefined;
  }
}
