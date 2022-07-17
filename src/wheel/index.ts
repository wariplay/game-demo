import { createBoard } from '../components/board';
import { createSpin } from '../components/spin';
import { createWheel } from '../components/wheel';
import * as PIXI from '../pixi';

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
app.loader
  .add('play', 'assets/play.svg')
  .add('stop', 'assets/stop.svg')
  .add('arrow', 'assets/arrow.svg')
  .load(onLoaded);
document.body.appendChild(app.view);

function onLoaded() {
  const margin = 50;
  let running = false;
  const { container: wheelContainer, start: spinWheel } = createWheel(app, {
    x: app.view.width / 2,
    y: app.screen.height / 2,
    size: 150,
    sections: 20,
    onComplete: () => {
      running = false;
      switchSpinState();
    },
  });
  app.stage.addChild(wheelContainer);

  function start() {
    if (running) return;
    running = true;
    switchSpinState();
    spinWheel(2);
  }

  const { bottom } = createBoard(app, { text: 'wheel', margin });
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
