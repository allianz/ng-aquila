import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  NxFooterComponent,
  NxFooterLinkDirective,
  NxFooterNavigationDirective,
} from '../../../../ng-aquila/src/footer/footer.component';

@Component({
  selector: 'doc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFooterComponent, NxFooterNavigationDirective, NxFooterLinkDirective],
})
export class FooterComponent {}
