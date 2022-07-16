import * as PIXI from '../pixi';
import { createIcon } from './icon';

interface Params {
  width: number;
  height: number;
  x: number;
  y: number;
  onClick?: () => void;
}

export function createSpin(params: Params) {
  let status: 'play' | 'stop' = 'play';
  const container = new PIXI.Container();
  const { width, height, x, y, onClick } = params;
  const playIcon = createIcon('play', { width, height, x, y, onClick });
  const stopIcon = createIcon('stop', { width, height, x, y });
  playIcon.visible = true;
  stopIcon.visible = false;
  container.addChild(playIcon, stopIcon);
  return {
    container,
    switchState: () => {
      if (status === 'play') {
        status = 'stop';
        playIcon.visible = false;
        stopIcon.visible = true;
      } else {
        status = 'play';
        playIcon.visible = true;
        stopIcon.visible = false;
      }
    },
  };
}
