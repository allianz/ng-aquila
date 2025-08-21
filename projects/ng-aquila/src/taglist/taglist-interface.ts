import { InjectionToken } from '@angular/core';

// Just to solve circular dependency between NxTaglistComponent and NxTagComponent
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NxTaglist {}

export const TAGLIST = new InjectionToken<NxTaglist>('TAGLIST');
