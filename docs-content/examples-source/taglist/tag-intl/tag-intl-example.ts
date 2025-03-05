import { Component, Injectable, signal } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxTagComponent,
    NxTagGroupComponent,
    NxTagIntl,
} from '@aposin/ng-aquila/taglist';

@Injectable()
class MyIntl extends NxTagIntl {
    deleteAriaLabel = 'Löschen';
}

/**
 * @title Tag Internationalization Example
 */
@Component({
    selector: 'tag-intl-example',
    imports: [NxTagComponent, NxTagGroupComponent, NxButtonComponent],
    templateUrl: './tag-intl-example.html',
    styleUrl: './tag-intl-example.css',
    providers: [
        {
            provide: NxTagIntl,
            useClass: MyIntl,
        },
    ],
})
export class TagIntlExampleComponent {
    tags = signal([
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ]);

    removeTag(tag: string) {
        this.tags.update(tags => tags.filter(t => t !== tag));
    }

    reset() {
        this.tags.set([
            'Apples',
            'Oranges',
            'Bananas',
            'Strawberries',
            'Melons',
            'Lemons',
        ]);
    }
}
