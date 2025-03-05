import { InjectionToken } from '@angular/core';

// Just to solve circular dependency between NxTaglistComponent and NxTagComponent
export interface NxTaglist {}

export const TAGLIST = new InjectionToken<NxTaglist>('TAGLIST');
