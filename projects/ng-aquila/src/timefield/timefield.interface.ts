import { InjectionToken } from '@angular/core';

/** Parent component that should be wrapped around `MatStartDate` and `MatEndDate`. */
export interface NxTimefield {}

/**
 * Used to provide the date range input wrapper component
 * to the parts without circular dependencies.
 */
export const NX_TIMEFIELD = new InjectionToken<NxTimefield>('NX_TIMEFIELD');
