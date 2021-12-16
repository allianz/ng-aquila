import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class TableDataSource extends DataSource<any> {
    constructor(private _datachange: BehaviorSubject<any[]>) {
        super();
    }
    /** @docs-private Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Object[]> {
        return this._datachange;
    }
    /** @docs-private */
    disconnect() {}
}
