import { MaskConversionTypes } from '@allianz/ng-aquila/mask';
import { Component } from '@angular/core';

/**
 * @title Set case example
 */
@Component({
    selector: 'mask-case-example',
    templateUrl: './mask-case-example.html',
    styleUrls: ['./mask-case-example.css'],
})
export class MaskCaseExampleComponent {
    modelVal!: string;
    templateModel: MaskConversionTypes = 'upper';
}
