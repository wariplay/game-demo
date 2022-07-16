import gsap from 'gsap';

import * as PIXI from '../pixi';

interface Params {
  x: number;
  y: number;
  size: number;
  sections: number;
  onComplete: () => void;
}

export function createWheel(app: PIXI.Application, params: Params) {
  const { x, y, size, sections, onComplete } = params;
  const radiansPerSector = (Math.PI * 2) / sections;
  const textContainer = new PIXI.Container();
  function createSectorText(sectionNumber: number) {
    const sectionText = sectionNumber + 1;
    const text = new PIXI.Text(sectionText.toString(), { fill: '#000000' });
    const rotation = sectionNumber * radiansPerSector;
    const textAnchorPercentage = (size - 40 / 2) / size;
    text.anchor.set(0.5, 0.5);
    text.rotation = rotation + Math.PI;
    text.position.x = size * textAnchorPercentage * Math.cos(rotation);
    text.position.y = size * textAnchorPercentage * Math.sin(rotation);
    textContainer.addChild(text);
  }

  const sectionGraphic = new PIXI.Graphics();
  for (let sector = 0; sector < sections; sector += 1) {
    const startingAngle = sector * radiansPerSector - radiansPerSector / 2;
    const endingAngle = startingAngle + radiansPerSector;
    sectionGraphic.beginFill(Number(`0x${Math.floor(Math.random() * 16777215).toString(16)}`));
    sectionGraphic.lineStyle(2, 0xffffff, 1);
    sectionGraphic.moveTo(0, 0);
    sectionGraphic.arc(0, 0, size, startingAngle, endingAngle);
    sectionGraphic.lineTo(0, 0);
    createSectorText(sector);
  }

  const container = new PIXI.Container();
  container.position.set(x, y);
  container.addChild(sectionGraphic, textContainer);

  function finalPoisition(position = 0) {
    return (sections - position) * radiansPerSector;
  }

  return {
    container,
    start: (position: number) => {
      container.rotation = 0;
      const rotation = Math.PI * 2 + finalPoisition(position);
      const wheel = gsap.to(container, 5, {
        rotation: `+=${rotation}`,
        ease: gsap.parseEase('power2'),
      });
      wheel.eventCallback('onComplete', onComplete);
    },
  };
}
