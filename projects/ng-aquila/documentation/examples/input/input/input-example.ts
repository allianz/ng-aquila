import { Component } from '@angular/core';

/**
 * @title Basic input field example
 */
@Component({
    selector: 'input-example',
    templateUrl: './input-example.html',
    styleUrls: ['./input-example.css'],
})
export class InputExampleComponent {
    urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
}
