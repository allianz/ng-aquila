import { NxTagIntl, NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';

@Injectable()
class MyIntl extends NxTagIntl {
  deleteAriaLabel = 'Tag löschen';
}

/**
 * @title Tag Internationalization Example
 */
@Component({
  selector: 'taglist-intl-example',
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
