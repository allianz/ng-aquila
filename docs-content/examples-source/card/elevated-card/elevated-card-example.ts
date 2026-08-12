import { NxCardComponent } from '@allianz/ng-aquila/card';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Elevated Card Example
 */
@Component({
  selector: 'elevated-card-example',
  templateUrl: './elevated-card-example.html',
  styleUrls: ['./elevated-card-example.css'],
  imports: [NxCardComponent, NxHeadlineComponent, NxCopytextComponent],
})
export class ElevatedCardExampleComponent {}
