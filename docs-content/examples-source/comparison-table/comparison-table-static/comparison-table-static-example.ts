import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxComparisonTableViewType } from '@aposin/ng-aquila/comparison-table';

/** @title Static layout example */
@Component({
    selector: 'comparison-table-static-example',
    templateUrl: './comparison-table-static-example.html',
    styleUrls: ['./comparison-table-static-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComparisonTableStaticExampleComponent {
    layout?: NxComparisonTableViewType | null;

    cycleLayout(): void {
        switch (this.layout) {
            case 'mobile':
                this.layout = 'tablet';
                break;
            case 'tablet':
                this.layout = 'desktop';
                break;
            default:
                this.layout = 'mobile';
        }
    }

    defaultLayout(): void {
        this.layout = null;
    }
}
