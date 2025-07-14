import { NxSelectableCardComponent } from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Selectable cards states example
 */
@Component({
  selector: 'highlight-selectable-card-example',
  templateUrl: './highlight-selectable-card-example.html',
  styleUrls: ['./highlight-selectable-card-example.css'],
  imports: [NxSelectableCardComponent, NxCopytextComponent],
})
export class HighlightSelectableCardExampleComponent {}
