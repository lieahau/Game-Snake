import { LevelConfig } from "../interfaces/LevelInterfaces";

const levelConfigs: Array<LevelConfig> = [
  // Classic
  {
    boardConfig: {
      tiles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    snakeConfig: {
      parts: [
        { x: 1, y: 7 },
        { x: 1, y: 8 },
        { x: 1, y: 9 },
        { x: 1, y: 10 },
      ],
      interval: {
        initial: 0.3,
        accelerateMultiplier: 0.9,
        accelerateEvery: 2,
        minimum: 0.12,
      },
    },
  },
  // Bird-Eye
  {
    boardConfig: {
      tiles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    snakeConfig: {
      parts: [
        { x: 9, y: 5 },
        { x: 9, y: 4 },
        { x: 10, y: 4 },
        { x: 10, y: 3 },
        { x: 10, y: 2 },
        { x: 11, y: 2 },
        { x: 11, y: 1 },
      ],
      interval: {
        initial: 0.3,
        accelerateMultiplier: 0.9,
        accelerateEvery: 10,
        minimum: 0.2,
      },
    },
  },
  // Naruto
  {
    boardConfig: {
      tiles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    snakeConfig: {
      parts: [
        { x: 4, y: 7 },
        { x: 5, y: 7 },
        { x: 5, y: 6 },
        { x: 4, y: 6 },
        { x: 3, y: 6 },
        { x: 3, y: 7 },
      ],
      interval: {
        initial: 0.3,
        accelerateMultiplier: 0.9,
        accelerateEvery: 5,
        minimum: 0.2,
      },
    },
  },
  // Invalid level
  {
    boardConfig: {
      tiles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    },
    snakeConfig: {
      parts: [
        { x: 1, y: 7 },
        { x: 1, y: 8 },
        { x: 1, y: 9 },
        { x: 1, y: 9 },
      ],
      interval: {
        initial: 0.3,
        accelerateMultiplier: 0.9,
        accelerateEvery: 2,
        minimum: 0.12,
      },
    },
  },
];

const validLevels = [0, 1, 2];

function getLevelFromParam() {
  const levelParam =
    new URL(window.location.href).searchParams.get("level") ?? -1;
  return levelConfigs[Number(levelParam)];
}

function getRandomLevel() {
  return levelConfigs[
    validLevels[Math.floor(Math.random() * validLevels.length)]
  ];
}

export function getLevelConfig() {
  return getLevelFromParam() || getRandomLevel();
}
