/**
 * Copyright (c) 2021-
 * FILE DESCRIPTION
 */

import { sleep } from './promiseUtils.js';
import { randomInt } from './numberUtils.js';

export async function hasTextContent(text, selector, options) {
  return getElementByText(text, selector, options) !== null;
}

export function getElementByText(text, selector, options) {
  const elems = getElementsByText(text, selector, options);
  return elems.length > 0 ? elems[0] : null;
}

export function getElementsByText(text, selector, options) {
  if (options.contains || options.includes) {
    return [...document.querySelectorAll(selector)].filter((e) => e.innerText.includes(text));
  }
  if (options.startsWith) {
    return [...document.querySelectorAll(selector)].filter((e) => e.innerText.startsWith(text));
  }
  if (options.endsWith) {
    return [...document.querySelectorAll(selector)].filter((e) => e.innerText.endsWith(text));
  }
  return [...document.querySelectorAll(selector)].filter((e) => e.innerText === text);
}

export async function waitForTextContent(text, selector, maxWait, interval, options) {
  const stopTime = Date.now() + maxWait;
  while (Date.now() <= stopTime) {
    const elems = getElementsByText(text, selector, options);
    if (elems && elems.length) {
      return elems[0];
    }
    await sleep(interval);
  }
  return null;
}

export async function waitForTextContains(text, selector, maxWait = 30000, interval = 1000) {
  return waitForTextContent(text, selector, maxWait, interval, { contains: true });
}

export async function waitForTextStartsWith(text, selector, maxWait = 30000, interval = 1000) {
  return waitForTextContent(text, selector, maxWait, interval, { startsWith: true });
}

export async function waitForTextEndsWith(text, selector, maxWait = 30000, interval = 1000) {
  return waitForTextContent(text, selector, maxWait, interval, { endsWith: true });
}

export async function waitForTextEquals(text, selector, maxWait = 30000, interval = 1000) {
  return waitForTextContent(text, selector, maxWait, interval, { equals: true });
}

export async function waitForSelector(selector, maxWait, interval) {
  const stopTime = Date.now() + maxWait;
  while (Date.now() <= stopTime) {
    const elem = document.querySelector(selector);
    if (elem) {
      return elem;
    }
    await sleep(interval);
  }
  return null;
}

export async function waitForEitherSelector(selectors, maxWait, interval) {
  const stopTime = Date.now() + maxWait;
  while (Date.now() <= stopTime) {
    for (const selector of selectors) {
      //console.log('selector', selector);
      const result = await waitForSelector(selector, interval, interval);
      //console.log('result', result);
      if (result) {
        return result;
      }
    }
    await sleep(interval);
  }
  return null;
}

export async function simulateClick(elem, deltaX = 5, deltaY = 5) {
  const plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
  const plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
  const box = elem.getBoundingClientRect();
  const x = box.left + (box.right - box.left) / 2 + randomInt(1, deltaX) * plusOrMinusX;
  const y = box.top + (box.bottom - box.top) / 2 + randomInt(1, deltaY) * plusOrMinusY;

  simulateMouseEvent(elem, 'mousedown', x, y);
  await sleep(1);
  simulateMouseEvent(elem, 'mouseup', x, y);
  await sleep(1);
  simulateMouseEvent(elem, 'click', x, y);
}

export function simulateMouseEvent(element, eventName, coordX, coordY) {
  element.dispatchEvent(
    new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: coordX,
      clientY: coordY,
      button: 0,
    })
  );
}

export function addClassName(elem, className) {
  if (typeof className === 'string' && className.trim()) {
    className.split(' ').forEach((x) => {
      if (x.trim().length) {
        elem.classList.add(x.trim());
      }
    });
  }
}

export function addTarget(elem, target) {
  if (typeof target === 'string') {
    elem.target = target;
  }
}

export function textAsClass(text) {
  return typeof text === 'string' ? text.trim().toLowerCase().replace(' ', '-') : null;
}
