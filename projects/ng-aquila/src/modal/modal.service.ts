import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/** @docs-private */
@Injectable()
export class NxModalService {
    private readonly subject = new Subject();
    close$: Observable<any> = this.subject.asObservable();

    close() {
        this.subject.next();
    }
}
