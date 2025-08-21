import { InjectionToken } from '@angular/core';

// Just to solve circular dependency
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NxTimefield {}

/**
 * Used to provide timefield without circular dependencies.
 */
export const NX_TIMEFIELD = new InjectionToken<NxTimefield>('NX_TIMEFIELD');
