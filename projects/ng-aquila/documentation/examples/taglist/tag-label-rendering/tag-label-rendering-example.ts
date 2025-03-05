import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxTagComponent, NxTagGroupComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tags rendering example
 */
@Component({
    selector: 'tag-label-rendering-example',
    templateUrl: './tag-label-rendering-example.html',
    styleUrls: ['./tag-label-rendering-example.css'],
    standalone: true,
    imports: [
        NxTagGroupComponent,
        NxTagComponent,
        TitleCasePipe,
        NxButtonComponent,
        NxCopytextComponent,
    ],
})
export class TagLabelRenderingExampleComponent {
    tags = signal(['fruits', 'vegetables', 'meat', 'fish']);

    removeTag(tag: string) {
        this.tags.update(tags => tags.filter(t => t !== tag));
    }

    reset() {
        this.tags.set(['fruits', 'vegetables', 'meat', 'fish']);
    }
}
