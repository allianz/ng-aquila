import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxSwitcherComponent } from '@aposin/ng-aquila/switcher';

/** @title Switcher readonly */
@Component({
    selector: 'switcher-readonly-example',
    templateUrl: './switcher-readonly-example.html',
    styleUrl: './switcher-readonly-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxSwitcherComponent,
        NxButtonComponent,
    ],
})
export class SwitcherReadonlyExampleComponent {}
