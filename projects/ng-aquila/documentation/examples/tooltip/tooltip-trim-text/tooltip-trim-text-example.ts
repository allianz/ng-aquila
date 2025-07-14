import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxTooltipDirective } from '@allianz/ng-aquila/tooltip';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tooltip-trim-text-example',
  templateUrl: './tooltip-trim-text-example.html',
  styleUrls: ['./tooltip-trim-text-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxBadgeComponent, NxTooltipDirective],
})
export class TooltipTrimTextExampleComponent {}
