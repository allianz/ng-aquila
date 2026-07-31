import { NxSelectableCardComponent } from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { Component } from '@angular/core';

/**
 * @title Elevated selectable card example
 */
@Component({
  selector: 'elevated-selectable-card-example',
  templateUrl: './elevated-selectable-card-example.html',
  styleUrls: ['./elevated-selectable-card-example.css'],
  imports: [NxSelectableCardComponent, NxCopytextComponent],
})
export class ElevatedSelectableCardExampleComponent {}
