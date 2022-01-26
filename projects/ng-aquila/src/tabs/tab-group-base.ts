import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

import { NxTabsAppearance } from './tabs.models';

/** @docs-private */
@Directive()
export class NxTabGroupBase {
    disabled!: boolean;
    appearance!: NxTabsAppearance;
    _appearanceChange!: Subject<void>;
}
