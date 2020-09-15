import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

/** @docs-private */
@Directive()
export class NxTabGroupBase {
  disabled: boolean;
  _appearanceChange: Subject<void>;
}
