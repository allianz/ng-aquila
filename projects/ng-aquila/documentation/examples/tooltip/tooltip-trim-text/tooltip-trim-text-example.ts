import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxTooltipDirective } from '@aposin/ng-aquila/tooltip';

@Component({
    selector: 'tooltip-trim-text-example',
    templateUrl: './tooltip-trim-text-example.html',
    styleUrls: ['./tooltip-trim-text-example.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipTrimTextExample {}
