import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxBodyTextComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';

/**
 * @title Body text color scheme example
 */
@Component({
  selector: 'body-text-color-scheme-example',
  templateUrl: './body-text-color-scheme-example.html',
  styleUrls: ['./body-text-color-scheme-example.css'],
  standalone: true,
  imports: [NxBodyTextComponent, NxHeadlineComponent],
})
export class BodyTextColorSchemeExampleComponent {}
