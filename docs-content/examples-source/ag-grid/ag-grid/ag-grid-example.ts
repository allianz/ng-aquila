import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
    CellClickedEvent,
    ColDef,
    ColGroupDef,
    GridApi,
    GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs';

/**
 * @title Ag-grid example
 */
@Component({
    selector: 'ag-grid-example',
    templateUrl: './ag-grid-example.html',
    styleUrls: ['./ag-grid-example.css'],
})
export class AgGridExampleComponent {
    floatingFilter = true;
    columnsNoGroup: ColDef[] = [
        {
            colId: 'make',
            field: 'make',
            filter: 'agTextColumnFilter',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            resizable: true,
        },
        {
            field: 'model',
            filter: 'agTextColumnFilter',
            resizable: true,
        },
        {
            field: 'price',
            filter: 'agTextColumnFilter',
            resizable: true,
        },
    ];

    showGroup = true;
    // Each Column Definition results in one Column.
    columnsWithGroup: (ColDef | ColGroupDef)[] = [
        {
            colId: 'make',
            field: 'make',
            filter: 'agTextColumnFilter',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
            resizable: true,
        },
        {
            headerName: 'Group 1',
            resizable: true,
            initialHide: true,
            showRowGroup: false,
            children: [
                {
                    field: 'model',
                    filter: 'agTextColumnFilter',
                    resizable: true,
                },
                {
                    field: 'price',
                    filter: 'agTextColumnFilter',
                    resizable: true,
                },
            ],
        },
        {
            field: 'model',
            filter: 'agTextColumnFilter',
            resizable: true,
        },
        {
            field: 'price',
            filter: 'agTextColumnFilter',
            resizable: true,
        },
    ];

    // DefaultColDef sets props common to all Columns
    defaultColDef: ColDef = {
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
        floatingFilter: this.floatingFilter,
    };

    // Data that gets displayed in the grid
    rowData$!: Observable<any[]>;

    @ViewChild(AgGridAngular, { read: ElementRef }) agGridElement!: ElementRef;
    // For accessing the Grid's API
    @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
    private gridApi!: GridApi;

    constructor(
        private readonly http: HttpClient,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    // Example load data from server
    onGridReady(params: GridReadyEvent) {
        this.gridApi = params.api;
        this.rowData$ = this.http.get<any[]>(
            'https://www.ag-grid.com/example-assets/row-data.json',
        );
        this.gridApi.sizeColumnsToFit();
    }

    // Example of consuming Grid Event
    onCellClicked(e: CellClickedEvent): void {
        console.log('cellClicked', e);
    }

    // Example using Grid's API
    clearSelection(): void {
        this.agGrid.api.deselectAll();
    }

    dense = false;
    toggleDense() {
        this.dense = !this.dense;
    }
    zebra = false;
    toggleZebra() {
        this.zebra = !this.zebra;
    }

    toggleCheckboxSelection() {
        const columnDefs = this.gridApi.getColumnDefs();
        if (!columnDefs) {
            return;
        }
        const firstColumnDef = columnDefs[0] as ColDef;
        firstColumnDef.checkboxSelection = !firstColumnDef.checkboxSelection;
        firstColumnDef.headerCheckboxSelection =
            !firstColumnDef.headerCheckboxSelection;
        this.gridApi.setColumnDefs([]); // needed for a dynamic update, not necessarily the best solution
        this.gridApi.setColumnDefs(columnDefs);
        this.gridApi.sizeColumnsToFit();
    }

    toggleGroup() {
        this.showGroup = !this.showGroup;
        this.gridApi.setColumnDefs(
            this.showGroup ? this.columnsWithGroup : this.columnsNoGroup,
        );
        this.gridApi.sizeColumnsToFit();
    }

    toggleFloatingFilter() {
        this.floatingFilter = !this.floatingFilter;
        this.defaultColDef = {
            ...this.defaultColDef,
            floatingFilter: this.floatingFilter,
        };
    }

    columnDefsTest: ColDef[] = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ];
}
