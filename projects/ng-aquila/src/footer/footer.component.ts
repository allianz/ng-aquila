import { Component, ChangeDetectionStrategy, Directive } from '@angular/core';

@Directive({
    selector: 'nx-footer-copyright',
    exportAs: 'NxFooterCopyright',
    host: {
        class: 'nx-footer__copyright',
    },
})
export class NxFooterCopyrightDirective {}

@Directive({
    selector: 'nx-footer-navigation',
    exportAs: 'NxFooterNavigation',
    host: {
        class: 'nx-footer__navigation',
        role: 'list',
    },
})
export class NxFooterNavigationDirective {}
@Directive({
    selector: 'nx-footer-link',
    exportAs: 'NxFooterLink',
    host: {
        class: 'nx-footer__link',
        role: 'listitem',
    },
})
export class NxFooterLinkDirective {}

@Component({
    selector: 'nx-footer, [nx-footer]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./footer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-footer',
    },
})
export class NxFooterComponent {}
