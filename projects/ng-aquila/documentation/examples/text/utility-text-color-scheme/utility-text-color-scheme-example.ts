import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxUtilityTextComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';

/**
 * @title Utility text color scheme example
 */
@Component({
  selector: 'utility-text-color-scheme-example',
  templateUrl: './utility-text-color-scheme-example.html',
  styleUrls: ['./utility-text-color-scheme-example.css'],
  standalone: true,
  imports: [NxUtilityTextComponent, NxHeadlineComponent],
})
export class UtilityTextColorSchemeExampleComponent {}
