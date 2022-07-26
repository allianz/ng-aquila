import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ComponentDescriptor } from '../core/manifest';

// Service Provider to get notified when component is changing in the viewer.
@Injectable()
export class ComponentService {
    readonly current = new ReplaySubject<ComponentDescriptor>(1);
}
