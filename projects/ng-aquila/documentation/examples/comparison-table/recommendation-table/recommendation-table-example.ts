import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Recommendation table example
 */
@Component({
    selector: 'recommendation-table-example',
    templateUrl: './recommendation-table-example.html',
    styleUrls: ['./recommendation-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationTableExampleComponent {}
