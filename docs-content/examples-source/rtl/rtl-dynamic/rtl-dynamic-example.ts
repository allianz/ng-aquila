import { Direction } from '@angular/cdk/bidi';
import { Component } from '@angular/core';

/**
 * @title RTL Dynamic Example
 */
@Component({
    selector: 'rtl-dynamic-example',
    templateUrl: './rtl-dynamic-example.html',
    styleUrls: ['./rtl-dynamic-example.css'],
})
export class RtlDynamicExampleComponent {
    direction: Direction = 'ltr';
    sliderDemoValue = 10;

    toggleDirection(): void {
        this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
    }
}
