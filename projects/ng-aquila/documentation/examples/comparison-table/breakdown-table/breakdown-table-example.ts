import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Breakdown table example
 */
@Component({
    selector: 'breakdown-table-example',
    templateUrl: './breakdown-table-example.html',
    styleUrls: ['./breakdown-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreakdownTableExampleComponent {}
