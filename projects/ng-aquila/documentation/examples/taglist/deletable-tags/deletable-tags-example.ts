import { Component, signal } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxTagComponent, NxTagGroupComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Deletable tags example
 */
@Component({
    selector: 'deletable-tags-example',
    templateUrl: './deletable-tags-example.html',
    styleUrls: ['./deletable-tags-example.css'],
    standalone: true,
    imports: [NxTagGroupComponent, NxTagComponent, NxButtonComponent],
})
export class DeletableTagsExampleComponent {
    tags = signal<string[]>([
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ]);

    tagDeleted(tag: string) {
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
