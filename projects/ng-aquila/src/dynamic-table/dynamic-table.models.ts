import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

/** Dynamic table column definition consisting of key, title and type properties. */
export interface NxDynamicTableColumnDefinition {
    /** Column data property name. */
    key: string;
    /** Column display name. */
    title: string;
    /** Column display type. Defaults to 'string'. */
    type?: 'string' | 'numeric';
    /** Add custom column header cell styles. */
    headerCellStyle?: { [prop: string]: any };
    /** Add custom column header cell class. */
    headerCellClass?: string;
    /** Add custom column cell styles. */
    cellStyle?: { [prop: string]: any };
    /** Add custom column cell class. */
    cellClass?: string;
}

export class NxDynamicTableDataSource extends DataSource<any> {
    constructor(private readonly _datachange: BehaviorSubject<any[]>) {
        super();
    }
    /** @docs-private Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<object[]> {
        return this._datachange;
    }
    /** @docs-private */
    disconnect() {}
}
