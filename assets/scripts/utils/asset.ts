export function getRawAssetKey(key: string) {
  return `${key}_ASSET`;
}

export function getSpriteFrameKey(
  textureKey: string,
  frameKey?: number | string
) {
  if (frameKey !== undefined) {
    return `${textureKey}_${frameKey}`;
  }
  return textureKey;
}
