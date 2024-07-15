import { Component } from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';

/** @title Error example */
@Component({
    selector: 'error-example',
    templateUrl: './error-example.html',
    styleUrls: ['./error-example.css'],
    standalone: true,
    imports: [NxErrorComponent],
})
export class ErrorExampleComponent {}
