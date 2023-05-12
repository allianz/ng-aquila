import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NxDynamicTableColumnDefinition, NxDynamicTableDataSource } from './dynamic-table.models';

@Component({
    selector: 'nx-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./dynamic-table.component.scss'],
})
export class NxDynamicTableComponent implements OnInit {
    private readonly _dataChange = new BehaviorSubject<any[]>([]);
    private _dataSource!: NxDynamicTableDataSource | null;
    private _columnKeys: string[] = [];

    /** Sets the data that it will show in the table. */
    @Input() set data(value: any[]) {
        this._data = value.filter(element => element);
        // If user dont pass displayedColumns the table will show all data and the name of columns will be the key of data
        if (!this._displayedColumns) {
            const keys: string[] = [],
                cArray: any[] = [];
            // For catch keys of data Objects and assing title, key and type string by default to displayedColumns
            this._data.forEach(element => {
                for (const key in element) {
                    if (!keys.includes(key)) {
                        keys.push(key);
                        cArray.push({ title: key, key, type: 'string' });
                    }
                }
            });
            this._columnKeys = keys;
            this._displayedColumns = cArray;
            // need to call markForCheck as the setter changes displayedColumns here
            // sidenote: isn't needed for the data itself as it gets passed to the cdk-table
            // by the datasource observable
            this._cdr.markForCheck();
        }
        this._dataChange.next(this._data);
    }
    get data(): any[] {
        return this._data;
    }
    private _data: any[] = [];

    /** Sets the name order and type of columns. */
    @Input() set displayedColumns(value: NxDynamicTableColumnDefinition[] | undefined) {
        this._displayedColumns = value!;
        this._columnKeys = value ? value.map(column => column.key) : [];
        this._cdr.markForCheck();
    }
    get displayedColumns(): NxDynamicTableColumnDefinition[] | undefined {
        return this._displayedColumns;
    }
    private _displayedColumns!: NxDynamicTableColumnDefinition[];

    /** An event is dispatched when a row is clicked. */
    @Output() readonly rowClick = new EventEmitter();

    /** @docs-private */
    get dataSource(): NxDynamicTableDataSource {
        return this._dataSource!;
    }

    /** @docs-private */
    get columnKeys(): string[] {
        return this._columnKeys;
    }

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        if (!this._data) {
            this._data = [];
            this._dataChange.next(this._data);
        }
        this._dataSource = new NxDynamicTableDataSource(this._dataChange);
    }

    /** @docs-private */
    handleRowClick(row: object): void {
        this.rowClick.emit(row);
    }

    /** @docs-private */
    isNumeric(column: NxDynamicTableColumnDefinition): boolean {
        return column.type === 'numeric';
    }
}
