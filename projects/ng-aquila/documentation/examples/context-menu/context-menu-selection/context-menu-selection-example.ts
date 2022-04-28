import { Component } from '@angular/core';

/**
 * @title Context Menu Single Selection Example
 */
@Component({
    selector: 'context-menu-selection-example',
    templateUrl: './context-menu-selection-example.html',
    styleUrls: ['./context-menu-selection-example.css'],
})
export class ContextMenuSelectionExampleComponent {
    selectedLanguage = 'de';

    options = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Chinese', value: 'cn' },
    ];
}
