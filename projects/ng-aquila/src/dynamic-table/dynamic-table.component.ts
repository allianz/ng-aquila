import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NxDisplayedColumns } from './displayedColumns';
import { TableDataSource } from './tabledata-source';

@Component({
  selector: 'nx-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [ './dynamic-table.component.scss' ]
})
export class NxDynamicTableComponent implements OnInit {

  private _dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _dataSource!: TableDataSource | null;
  private _data: any[] = [];
  private _displayedColumns!: NxDisplayedColumns[];
  private _columnKeys: string[] = [];

  /** Sets the data that it will show in the table. */
  @Input('nxData')
  set data(value: any[]) {
    this._data = value
      .filter(element => element);
    // If user dont pass displayedColumns the table will show all data and the name of columns will be the key of data
    if (!this._displayedColumns) {
      const keys: string[] = [], cArray: any[] = [];
      // For catch keys of data Objects and assing title, key and type string by default to displayedColumns
      this._data
        .forEach(element => {
          for (const key in element) {
            if (keys.indexOf(key) === -1) {
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
      this._changeDetectorRef.markForCheck();
    }
    this._dataChange.next(this._data);
  }
  get data(): any[] {
    return this._data;
  }

  /** Sets the name order and type of columns. */
  @Input('nxDisplayedColumns')
  set displayedColumns(value: NxDisplayedColumns[] | undefined) {
    this._displayedColumns = value as NxDisplayedColumns[];
    this._columnKeys = value ? value.map(column => column.key) : [];
    this._changeDetectorRef.markForCheck();
  }
  get displayedColumns(): NxDisplayedColumns[] | undefined {
    return this._displayedColumns;
  }

  /** An event is dispatched when a row is clicked. */
  @Output() nxRowClick = new EventEmitter();

  /** @docs-private */
  get dataSource(): TableDataSource {
    return this._dataSource as TableDataSource;
  }

  /** @docs-private */
  get columnKeys(): string[] {
    return this._columnKeys;
  }

  constructor(private el: ElementRef, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this._data) {
      this._data = [];
      this._dataChange.next(this._data);
    }
    this._dataSource = new TableDataSource(this._dataChange);
  }

  /** @docs-private */
  handleRowClick(row: Object): void {
    this.nxRowClick.emit(row);
  }

  /** @docs-private */
  isNumeric(element: NxDisplayedColumns): boolean {
    if (element.type === 'numeric') {
      return true;
    }
    return false;
  }

}
