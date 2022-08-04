/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * modified: use constructor calls for events (remove ie11 support)
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
    return new MouseEvent(type, {
        bubbles: false,
        cancelable: false,
        view: window,
        detail: 0,
        screenX: x,
        screenY: y,
        clientX: x,
        clientY: y,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: null,
    });
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
        touches: { value: [touchDetails] },
    });

    return event;
}

/** Dispatches a keydown event from an element. */
export function createKeyboardEvent(type: string, keyCode = 0, key = '', modifiers: ModifierKeys = {}) {
    return new KeyboardEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        charCode: keyCode,
        key,
        keyCode,
        location: 0,
        ctrlKey: modifiers.control,
        altKey: modifiers.alt,
        shiftKey: modifiers.shift,
        metaKey: modifiers.meta,
        repeat: false,
    });
}

/** Creates a fake event object with any desired event type. */
export function createFakeEvent(type: string, bubbles = false, cancelable = true) {
    return new Event(type, { bubbles, cancelable });
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
export function dispatchKeyboardEvent(node: Node, type: string, keyCode?: number, key?: string, modifiers?: ModifierKeys): KeyboardEvent {
    return dispatchEvent(node, createKeyboardEvent(type, keyCode, key, modifiers));
}

/** Shorthand to dispatch a mouse event on the specified coordinates. */
export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event = createMouseEvent(type, x, y)): MouseEvent {
    return dispatchEvent(node, event);
}

/** Shorthand to dispatch a touch event on the specified coordinates. */
export function dispatchTouchEvent(node: Node, type: string, x = 0, y = 0) {
    return dispatchEvent(node, createTouchEvent(type, x, y));
}

export function sortedClassNames(element: Element): string[] {
    return element.className.split(' ').sort();
}
