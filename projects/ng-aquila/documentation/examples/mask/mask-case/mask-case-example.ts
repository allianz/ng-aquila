import { Component } from '@angular/core';
import { MaskConversionTypes } from '@aposin/ng-aquila/mask';

/**
* @title Set case example
*/
@Component({
  templateUrl: './mask-case-example.html',
  styleUrls: ['./mask-case-example.css']
})
export class MaskCaseExampleComponent {
  modelVal;
  templateModel: MaskConversionTypes = 'upper';
}
