/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ModifierKeys } from '@angular/cdk/testing';

export const JAN = 0;
export const FEB = 1;
export const MAR = 2;
export const APR = 3;
export const MAY = 4;
export const JUN = 5;
export const JUL = 6;
export const AUG = 7;
export const SEP = 8;
export const OCT = 9;
export const NOV = 10;
export const DEC = 11;

/** Creates a browser MouseEvent with the specified options. */
export function createMouseEvent(type: string, x = 0, y = 0) {
  const event = document.createEvent('MouseEvent');

  event.initMouseEvent(type,
    false, /* canBubble */
    false, /* cancelable */
    window, /* view */
    0, /* detail */
    x, /* screenX */
    y, /* screenY */
    x, /* clientX */
    y, /* clientY */
    false, /* ctrlKey */
    false, /* altKey */
    false, /* shiftKey */
    false, /* metaKey */
    0, /* button */
    null /* relatedTarget */);

  return event;
}

/** Creates a browser TouchEvent with the specified pointer coordinates. */
export function createTouchEvent(type: string, pageX = 0, pageY = 0) {
  // In favor of creating events that work for most of the browsers, the event is created
  // as a basic UI Event. The necessary details for the event will be set manually.
  const event = new UIEvent(type, { bubbles: true, cancelable: true, view: window, detail: 0 });
  const touchDetails = { pageX, pageY };

  // Most of the browsers don't have a "initTouchEvent" method that can be used to define
  // the touch details.
  Object.defineProperties(event, {
    touches: { value: [touchDetails] }
  });

  return event;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(type: string, keyCode: number = 0, key: string = '',
  modifiers: ModifierKeys = {}) {
  const event = document.createEvent('KeyboardEvent');
  const originalPreventDefault = event.preventDefault.bind(event);

  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyEvent.
  if ((event as any).initKeyEvent !== undefined) {
    (event as any).initKeyEvent(type, true, true, window, modifiers.control, modifiers.alt,
      modifiers.shift, modifiers.meta, keyCode);
  } else {
    // `initKeyboardEvent` expects to receive modifiers as a whitespace-delimited string
    // See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
    let modifiersList = '';

    if (modifiers.control) {
      modifiersList += 'Control ';
    }

    if (modifiers.alt) {
      modifiersList += 'Alt ';
    }

    if (modifiers.shift) {
      modifiersList += 'Shift ';
    }

    if (modifiers.meta) {
      modifiersList += 'Meta ';
    }

    // TS3.6 removed the `initKeyboardEvent` method and suggested porting to
    // `new KeyboardEvent()` constructor. We cannot use that as we support IE11.
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent.
    (event as any).initKeyboardEvent(type,
      true, /* canBubble */
      true, /* cancelable */
      window, /* view */
      0, /* char */
      key, /* key */
      0, /* location */
      modifiersList.trim(), /* modifiersList */
      false /* repeat */);
  }

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  defineReadonlyEventProperty(event, 'keyCode', keyCode);
  defineReadonlyEventProperty(event, 'key', key);
  defineReadonlyEventProperty(event, 'ctrlKey', !!modifiers.control);
  defineReadonlyEventProperty(event, 'altKey', !!modifiers.alt);
  defineReadonlyEventProperty(event, 'shiftKey', !!modifiers.shift);
  defineReadonlyEventProperty(event, 'metaKey', !!modifiers.meta);

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    defineReadonlyEventProperty(event, 'defaultPrevented', true);
    return originalPreventDefault();
  };

  return event;
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(type: string, canBubble = false, cancelable = true) {
  const event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);
  return event;
}

/** Utility to dispatch any event on a DOM node. */
export function dispatchEvent<T extends Event>(node: Node | Window, event: T): T {
  node.dispatchEvent(event);
  return event;
}

/** Shorthand to dispatch a fake event on a specified node. */
export function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
  return dispatchEvent(node, createFakeEvent(type, canBubble));
}

/** Shorthand to dispatch a keyboard event with a specified key code. */
export function dispatchKeyboardEvent(node: Node, type: string, keyCode?: number, key?: string,
  modifiers?: ModifierKeys): KeyboardEvent {
return dispatchEvent(node,
createKeyboardEvent(type, keyCode, key, modifiers));
}

/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0,
  event = createMouseEvent(type, x, y)): MouseEvent {
  return dispatchEvent(node, event) as MouseEvent;
}

/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
  return dispatchEvent(node, createTouchEvent(type, x, y));
}

export function sortedClassNames(element: Element): string[] {
  return element.className.split(' ').sort();
}

/**
* Defines a readonly property on the given event object. Readonly properties on an event object
* are always set as configurable as that matches default readonly properties for DOM event objects.
*/
function defineReadonlyEventProperty(event: Event, propertyName: string, value: any) {
  Object.defineProperty(event, propertyName, { get: () => value, configurable: true });
}
