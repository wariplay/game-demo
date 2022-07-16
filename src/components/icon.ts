import * as PIXI from '../pixi';

interface Params {
  width: number;
  height: number;
  x: number;
  y: number;
  onClick?: () => void;
}

export function createIcon(name: string, params: Params) {
  const { width, height, x, y, onClick } = params;
  const icon = new PIXI.Sprite(PIXI.Texture.from(name));
  icon.width = width;
  icon.height = height;
  icon.x = x;
  icon.y = y;
  if (onClick) {
    icon.interactive = true;
    icon.buttonMode = true;
    icon.addListener('pointerdown', onClick);
  }
  return icon;
}
