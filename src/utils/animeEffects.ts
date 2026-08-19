import { animate, createDrawable } from 'animejs';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=~';

/**
 * Text scramble animation using Anime.js
 */
export const scrambleText = (
  element: HTMLElement | null,
  targetText: string,
  duration: number = 700
) => {
  if (!element) return;

  const originalLength = targetText.length;
  const progressObj = { progress: 0 };

  animate(progressObj, {
    progress: 1,
    duration,
    ease: 'outQuad',
    onUpdate: () => {
      const currentProgress = progressObj.progress;
      const revealedLength = Math.floor(currentProgress * originalLength);

      let scrambled = '';
      for (let i = 0; i < originalLength; i++) {
        if (i < revealedLength) {
          scrambled += targetText[i];
        } else {
          scrambled += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      element.innerText = scrambled;
    },
    onComplete: () => {
      element.innerText = targetText;
    }
  });
};

/**
 * SVG Path Line Drawing animation using Anime.js createDrawable
 */
export const drawSvgPath = (
  pathElement: SVGPathElement | null,
  duration: number = 1400,
  delay: number = 100
) => {
  if (!pathElement) return;

  try {
    const drawable = createDrawable(pathElement);
    animate(drawable, {
      draw: [0, 1],
      duration,
      delay,
      ease: 'inOutCubic',
    });
  } catch {
    // Fallback if browser geometry is detached
    const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 300;
    pathElement.style.strokeDasharray = `${length}`;
    pathElement.style.strokeDashoffset = `${length}`;
    animate(pathElement, {
      strokeDashoffset: [length, 0],
      duration,
      delay,
      ease: 'inOutCubic',
    });
  }
};

/**
 * Pulse scale effect for badges & key interactive elements
 */
export const pulseElement = (element: HTMLElement | null) => {
  if (!element) return;
  animate(element, {
    scale: [1, 1.08, 1],
    duration: 350,
    ease: 'inOutQuad',
  });
};
