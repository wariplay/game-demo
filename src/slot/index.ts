import { createBoard } from '../components/board';
import { createReels } from '../components/reels';
import { createSpin } from '../components/spin';
import * as PIXI from '../pixi';

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
app.loader
  .add('assets/icon1.svg', 'assets/icon1.svg')
  .add('assets/icon2.svg', 'assets/icon2.svg')
  .add('assets/icon3.svg', 'assets/icon3.svg')
  .add('assets/icon4.svg', 'assets/icon4.svg')
  .add('play', 'assets/play.svg')
  .add('stop', 'assets/stop.svg')
  .load(onLoaded);
document.body.appendChild(app.view);

function onLoaded() {
  const margin = 50;
  let running = false;
  const { container: reelsContainer, start: spinReels } = createReels(app, {
    x: 0,
    y: margin,
    onComplete: () => {
      running = false;
      switchSpinState();
    },
  });
  app.stage.addChild(reelsContainer);

  function start() {
    if (running) return;
    running = true;
    switchSpinState();
    spinReels();
  }

  const { bottom } = createBoard(app, { text: 'slots', margin });
  const [width, height] = [100, 100];
  const x = (bottom.width - width) / 2;
  const y = app.screen.height - height;
  const { container: spinContainer, switchState: switchSpinState } = createSpin({
    width,
    height,
    x,
    y,
    onClick: start,
  });
  bottom.addChild(spinContainer);
}
