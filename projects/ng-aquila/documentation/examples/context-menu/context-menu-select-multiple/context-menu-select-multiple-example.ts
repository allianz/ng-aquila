import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Context Menu Selection Multiple example
 */
@Component({
    selector: 'context-menu-selecti-multiple-example',
    templateUrl: './context-menu-select-multiple-example.html',
    styleUrls: ['./context-menu-select-multiple-example.css'],
    standalone: true,
    imports: [
        NxCheckboxGroupComponent,
        FormsModule,
        NxCheckboxComponent,
        NxButtonComponent,
        NxIconComponent,
        NxContextMenuModule,
    ],
})
export class ContextMenuSelectMultipleExampleComponent {
    options = [
        { label: 'Front window', value: 'front' },
        { label: 'Driver Window', value: 'driver' },
        { label: 'Rear Window', value: 'rear' },
    ];

    selected = ['driver'];
}
