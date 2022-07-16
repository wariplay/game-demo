import * as PIXI from '../pixi';

const style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fill: '#ffffff',
  stroke: '#4a1850',
});

interface Params {
  text: string;
  margin: number;
}

export function createBoard(app: PIXI.Application, params: Params) {
  const { text, margin } = params;

  const container = new PIXI.Container();
  container.x = app.screen.width;
  container.y = margin;
  app.stage.addChild(container);

  const top = new PIXI.Graphics();
  top.beginFill(0, 1);
  top.drawRect(0, 0, app.screen.width, margin);

  const headerText = new PIXI.Text(text, style);
  headerText.x = Math.round((top.width - headerText.width) / 2);
  headerText.y = Math.round((margin - headerText.height) / 2);
  top.addChild(headerText);

  const bottom = new PIXI.Graphics();
  bottom.beginFill(0, 1);
  bottom.drawRect(0, app.screen.height - margin, app.screen.width, margin);

  app.stage.addChild(top);
  app.stage.addChild(bottom);

  return { top, bottom };
}
