import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: 'nx-footer-copyright',
    exportAs: 'NxFooterCopyright',
    host: {
        class: 'nx-footer__copyright',
    },
    standalone: true,
})
export class NxFooterCopyrightDirective {}

@Directive({
    selector: 'nx-footer-navigation',
    exportAs: 'NxFooterNavigation',
    host: {
        class: 'nx-footer__navigation',
        role: 'list',
    },
    standalone: true,
})
export class NxFooterNavigationDirective {}

@Directive({
    selector: 'nx-footer-link',
    exportAs: 'NxFooterLink',
    host: {
        class: 'nx-footer__link',
        role: 'listitem',
    },
    standalone: true,
})
export class NxFooterLinkDirective implements OnDestroy, AfterViewInit {
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._elementRef, true);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}

@Component({
    selector: 'nx-footer, [nx-footer]',
    templateUrl: 'footer.component.html',
    styleUrls: ['./footer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-footer',
        role: 'contentinfo',
    },
    standalone: true,
    imports: [NxFooterCopyrightDirective],
})
export class NxFooterComponent {
    @Input() copyright?: string | null;

    readonly currentYear = new Date().getFullYear();

    @ContentChild(NxFooterCopyrightDirective, { static: true }) _copyrightDirective?: NxFooterCopyrightDirective;
}
