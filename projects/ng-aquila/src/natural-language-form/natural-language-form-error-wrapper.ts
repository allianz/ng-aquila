import { Signal } from '@angular/core';

export abstract class NaturalLanguageFormErrorWrapper {
  abstract readonly _errorId: Signal<string | undefined>;
}
