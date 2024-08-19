import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { NxTagIntl, NxTaglistComponent } from '@aposin/ng-aquila/taglist';

@Injectable()
class MyIntl extends NxTagIntl {
    deleteAriaLabel = 'Tag löschen';
}

/**
 * @title Tag Internationalization Example
 */
@Component({
    selector: 'taglist-intl-example',
    standalone: true,
    imports: [NxTaglistComponent],
    templateUrl: './taglist-intl-example.html',
    styleUrl: './taglist-intl-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NxTagIntl,
            useClass: MyIntl,
        },
    ],
})
export class TaglistIntlExampleComponent {
    tags = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}
