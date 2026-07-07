import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxAccentColorComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';

/**
 * @title Headline Font Weight Example
 */
@Component({
  selector: 'headline-attention-text-example',
  templateUrl: './headline-attention-text-example.html',
  styleUrls: ['./headline-attention-text-example.css'],
  imports: [NxHeadlineComponent, NxAccentColorComponent],
})
export class HeadlineAttentionTextExampleComponent {}
