import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxTimefieldComponent } from '@aposin/ng-aquila/timefield';

/** @title Timefield Template Driven Form */
@Component({
    selector: 'timefield-template-driven-example',
    templateUrl: './timefield-template-driven-example.html',
    styleUrls: ['./timefield-template-driven-example.css'],
    standalone: true,
    imports: [FormsModule, NxTimefieldComponent, NxErrorComponent],
})
export class TimefieldTemplateDrivenExampleComponent {
    templateModel = '14:54';
}
