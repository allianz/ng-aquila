import { Component, ChangeDetectionStrategy, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-footer-copyright',
  exportAs: 'NxFooterCopyright',
  host: {
    'class': 'nx-footer__copyright'
  }
})
export class NxFooterCopyrightDirective { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-footer-navigation',
  exportAs: 'NxFooterNavigation',
  host: {
    'class': 'nx-footer__navigation',
    'role': 'list'
  }
})
export class NxFooterNavigationDirective { }
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'nx-footer-link',
  exportAs: 'NxFooterLink',
  host: {
    'class': 'nx-footer__link',
    'role': 'listitem'
  }
})
export class NxFooterLinkDirective { }

@Component({
  selector: 'nx-footer, [nx-footer]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-footer'
  }
})
export class NxFooterComponent { }
