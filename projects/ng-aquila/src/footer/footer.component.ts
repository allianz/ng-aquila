import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  Directive,
  ElementRef,
  inject,
  InjectionToken,
  input,
  OnDestroy,
} from '@angular/core';

/**
 * Represents the default options for the footer.
 * It can be configured using the `FOOTER_DEFAULT_OPTIONS` injection token.
 */
export interface FooterDefaultOptions {
  /**
   * Shows a divider at the top of the footer.
   */
  divider?: boolean;

  /**
   * Limits the width of the footer content on large screens.
   */
  maxWidthContent?: boolean;
}

export const FOOTER_DEFAULT_OPTIONS = new InjectionToken<FooterDefaultOptions>(
  'FOOTER_DEFAULT_OPTIONS',
);

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
    '[class.nx-footer--divider]': '_divider()',
    '[class.nx-footer--max-width-content]': '_maxWidthContent()',
  },
  imports: [NxFooterCopyrightDirective],
})
export class NxFooterComponent {
  private readonly _defaultOptions = inject(FOOTER_DEFAULT_OPTIONS, { optional: true });

  readonly copyright = input<string | null>();

  /**
   * Shows a divider at the top of the footer.
   * Defaults to `false`, or to the value set in `FOOTER_DEFAULT_OPTIONS` (`true` for A1).
   */
  readonly dividerInput = input(undefined, { transform: booleanAttribute, alias: 'divider' });
  protected readonly _divider = computed(
    () => this.dividerInput() ?? this._defaultOptions?.divider ?? false,
  );

  /**
   * Limits the width of the footer content on large screens.
   * Defaults to `false`, or to the value set in `FOOTER_DEFAULT_OPTIONS` (`true` for A1 with default grid).
   */
  readonly maxWidthContentInput = input(undefined, {
    transform: booleanAttribute,
    alias: 'maxWidthContent',
  });
  protected readonly _maxWidthContent = computed(
    () => this.maxWidthContentInput() ?? this._defaultOptions?.maxWidthContent ?? false,
  );

  readonly currentYear = new Date().getFullYear();

  @ContentChild(NxFooterCopyrightDirective, { static: true })
  _copyrightDirective?: NxFooterCopyrightDirective;
}
