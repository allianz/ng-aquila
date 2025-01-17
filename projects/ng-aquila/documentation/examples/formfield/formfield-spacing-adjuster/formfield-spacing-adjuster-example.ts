import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Adjusting Form Field Spacing with CSS Variables Example
 */
@Component({
    selector: 'formfield-spacing-adjuster-example',
    imports: [NxFormfieldComponent, NxInputDirective],
    templateUrl: './formfield-spacing-adjuster-example.html',
    styleUrl: './formfield-spacing-adjuster-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormfieldSpacingAdjusterExampleComponent {}
