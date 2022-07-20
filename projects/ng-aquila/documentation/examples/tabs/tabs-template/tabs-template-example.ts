import { Component } from '@angular/core';

/**
 * @title Using templates for labels
 */
@Component({
    selector: 'tabs-template-example',
    templateUrl: './tabs-template-example.html',
    styleUrls: ['./tabs-template-example.css'],
})
export class TabsTemplateExampleComponent {
    currentIndex = 0;
}
