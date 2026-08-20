import { A } from '@angular/cdk/keycodes';

import { dispatchKeyboardEvent } from '../cdk-test-utils';

export function assertInputValue(
  nativeElement: HTMLInputElement,
  inputValue: string,
  asserted: string,
) {
  let selectionPosition: number;
  nativeElement.value = '';

  for (let i = 0; i < inputValue.length; i++) {
    selectionPosition = nativeElement.value.length;

    nativeElement.selectionStart = selectionPosition;
    nativeElement.selectionEnd = selectionPosition;

    // keydown event
    // I trigger this with key 'A' because the key currently is irrelevant in the keydown handler
    // (besides DELETE and BACKSPACE, which are not entered here because it's only strings).
    dispatchKeyboardEvent(nativeElement, 'keydown', A);

    // input event
    nativeElement.value += inputValue[i];
    nativeElement.dispatchEvent(new Event('input'));
  }

  expect(nativeElement.value).toBe(asserted);
}
