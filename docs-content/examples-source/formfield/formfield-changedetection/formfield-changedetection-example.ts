import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Change detection trigger event example
 */
@Component({
    selector: 'formfield-changedetection-example',
    templateUrl: './formfield-changedetection-example.html',
    styleUrls: ['./formfield-changedetection-example.css'],
})
export class FormfieldChangedetectionExampleComponent
    implements AfterContentInit
{
    modelValue!: string;

    @ViewChild('errorNgModel', { static: true })
    errorNgModel!: NxInputDirective;

    ngAfterContentInit(): void {
        this.errorNgModel.ngControl?.control?.markAsTouched();
    }
}
