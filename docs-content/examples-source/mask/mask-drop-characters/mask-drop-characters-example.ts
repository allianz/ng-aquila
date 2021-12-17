import { Component } from '@angular/core';

/**
 * @title Drop special characters example
 */
@Component({
    selector: 'mask-drop-characters-example',
    templateUrl: './mask-drop-characters-example.html',
    styleUrls: ['./mask-drop-characters-example.css'],
})
export class MaskDropCharactersExampleComponent {
    dateTimeDropped: string = '020618';
    dateTimeValue: string = '020618';
}
