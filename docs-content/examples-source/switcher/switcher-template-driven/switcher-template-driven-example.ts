import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxSwitcherComponent } from '@aposin/ng-aquila/switcher';

/** @title Switcher Template Driven Form */
@Component({
    selector: 'switcher-template-driven-example',
    templateUrl: './switcher-template-driven-example.html',
    styleUrls: ['./switcher-template-driven-example.css'],
    standalone: true,
    imports: [FormsModule, NxSwitcherComponent],
})
export class SwitcherTemplateDrivenExampleComponent {
    templateModel = true;
}
