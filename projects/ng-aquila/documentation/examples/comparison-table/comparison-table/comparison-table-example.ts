import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

/** @title Basic example */
@Component({
    selector: 'comparison-table-example',
    templateUrl: './comparison-table-example.html',
    styleUrls: ['./comparison-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableExampleComponent implements OnInit {
    loading = true;

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
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
