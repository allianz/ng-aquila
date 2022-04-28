import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

/**
 * @title Context Menu Selection Multiple example
 */
@Component({
    selector: 'context-menu-selecti-multiple-example',
    templateUrl: './context-menu-select-multiple-example.html',
    styleUrls: ['./context-menu-select-multiple-example.css'],
})
export class ContextMenuSelectMultipleExampleComponent {
    options = [
        { label: 'Front window', value: 'front' },
        { label: 'Driver Window', value: 'driver' },
        { label: 'Rear Window', value: 'rear' },
    ];

    selected = ['driver'];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    }
}
