import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxStatusIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Status icon Example
 */

@Component({
    selector: 'status-icon-example',
    templateUrl: './status-icon-example.html',
    styleUrls: ['./status-icon-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NxHeadlineComponent, NxStatusIconComponent],
})
export class StatusIconExampleComponent {}
