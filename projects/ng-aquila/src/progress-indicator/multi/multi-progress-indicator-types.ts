import { InjectionToken } from '@angular/core';

import type { NxMultiProgressIndicatorComponent } from './multi-progress-indicator.component';

export type NxMultiProgressIndicatorColorScheme = 'default' | 'positive';

export type NxMultiProgressIndicatorLayout =
  'horizontal' | 'horizontal-labels-below' | 'vertical' | 'vertical-no-labels' | 'vertical-no-bars';

// A token, not the class: both owners import the step, so injecting either closes a cycle - and a
// step resolves its owner from its *declaration* site, which never reaches compact's own template.
export const NX_MULTI_PROGRESS_INDICATOR = new InjectionToken<
  Pick<
    NxMultiProgressIndicatorComponent,
    'numbered' | 'colorScheme' | 'layout' | 'currentStep' | '_steps'
  >
>('NX_MULTI_PROGRESS_INDICATOR');
