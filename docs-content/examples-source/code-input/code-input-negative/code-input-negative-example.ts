import { Component } from '@angular/core';
import { NxCodeInputComponent } from '@aposin/ng-aquila/code-input';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'code-input-negative-example',
    templateUrl: 'code-input-negative-example.html',
    styleUrls: ['./code-input-negative-example.css'],
    standalone: true,
    imports: [NxCodeInputComponent],
})
export class CodeInputNegativeExampleComponent {
    inputValue = '';
}
