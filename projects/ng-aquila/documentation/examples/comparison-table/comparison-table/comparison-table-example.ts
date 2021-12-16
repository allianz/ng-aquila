import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';

/** @title Basic example */
@Component({
    selector: 'comparison-table-example',
    templateUrl: './comparison-table-example.html',
    styleUrls: ['./comparison-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableExampleComponent {
    loading = true;

    constructor(private _cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.reload();
    }

    reload() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            this._cdr.markForCheck();
        }, 2000);
    }
}
