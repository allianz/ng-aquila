import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Textarea with autoresize example
 */
@Component({
    selector: 'input-autoresize-example',
    templateUrl: './input-autoresize-example.html',
    styleUrls: ['./input-autoresize-example.css'],
    imports: [NxFormfieldComponent, NxInputDirective, CdkTextareaAutosize],
})
export class InputAutoresizeExampleComponent {}
