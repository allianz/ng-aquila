import { Component } from '@angular/core';

/**
 * @title Custom separators example
 */
@Component({
    selector: 'mask-separators-example',
    templateUrl: './mask-separators-example.html',
    styleUrls: ['./mask-separators-example.css'],
})
export class MaskSeparatorsExampleComponent {
    mask = '00-00 [00]';
    separators = ['-', '[', ']', ' '];
}
