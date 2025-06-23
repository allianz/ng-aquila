import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import {
    themeAquila,
    themeAquilaDenseParams,
    themeAquilaZebraParams,
} from '@aposin/ng-aquila/ag-grid';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
    AllCommunityModule,
    CellClickedEvent,
    ClientSideRowModelModule,
    ColDef,
    ColGroupDef,
    GridApi,
    GridReadyEvent,
    ModuleRegistry,
} from 'ag-grid-community';
import { MultiRowSelectionOptions } from 'ag-grid-community/dist/types/src/entities/gridOptions';
import { Observable } from 'rxjs';

ModuleRegistry.registerModules([ClientSideRowModelModule, AllCommunityModule]);

/**
 * @title Ag-grid Theming API example
 */
@Component({
    selector: 'ag-grid-opensource-theming-api-example',
    templateUrl: './ag-grid-opensource-theming-api-example.html',
    styleUrls: ['./ag-grid-opensource-theming-api-example.css'],
    imports: [NxButtonComponent, AgGridModule, AsyncPipe],
})
export class AgGridOpensourceThemingAPIExampleComponent {
    theme = themeAquila;
    rowSelection: MultiRowSelectionOptions = {
        mode: 'multiRow',
        headerCheckbox: true,
        checkboxes: true,
    };
    columnsNoGroup: ColDef[] = [
        {
            colId: 'make',
            field: 'make',
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            resizable: true,
        },
        {
            field: 'model',
            floatingFilter: true,
            filter: 'agTextColumnFilter',
            resizable: true,
        },
        {
            field: 'price',
            floatingFilter: true,
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
            floatingFilter: true,
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
                    cellEditorPopup: true,
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
            floatingFilter: true,
            filter: 'agTextColumnFilter',
            resizable: true,
        },
        {
            field: 'price',
            floatingFilter: true,
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

    isDense = false;
    toggleDense() {
        this.isDense = !this.isDense;
        this.updateTheme();
    }

    isZebra = false;
    toggleZebra() {
        this.isZebra = !this.isZebra;
        this.updateTheme();
    }

    updateTheme() {
        const newTheme = {
            ...(this.isDense ? themeAquilaDenseParams : {}),
            ...(this.isZebra ? themeAquilaZebraParams : {}),
        };

        this.theme = themeAquila.withParams(newTheme);
        this._cdr.detectChanges();
    }

    toggleCheckboxSelection() {
        const columnDefs = this.gridApi.getColumnDefs();
        if (!columnDefs) {
            return;
        }
        const currentSelection = this.gridApi.getGridOption(
            'rowSelection',
        ) as MultiRowSelectionOptions;
        const currentCheckboxes = currentSelection?.checkboxes ?? false;
        this.gridApi.setGridOption('rowSelection', {
            ...this.rowSelection,
            headerCheckbox: !currentCheckboxes,
            checkboxes: !currentCheckboxes,
        });
        this.gridApi.setGridOption('columnDefs', []);
        this.gridApi.setGridOption('columnDefs', columnDefs);
        this.gridApi.sizeColumnsToFit();
    }

    toggleGroup() {
        this.showGroup = !this.showGroup;
        this.gridApi.setGridOption(
            'columnDefs',
            this.showGroup ? this.columnsWithGroup : this.columnsNoGroup,
        );
        this.gridApi.sizeColumnsToFit();
    }
}
