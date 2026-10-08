import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  Input,
  input,
  OnDestroy,
  QueryList,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

/**
 * The appearance of the breadcrumb.
 *
 * TODO: the name contains a typo; it will be renamed to `NxBreadcrumbAppearance` in 23.0.0.
 */
export type NxBreadcrumpAppearance = 'default' | 'link';

export type NxBreadcrumbType = 'secondary' | 'primary';

@Component({
  selector: 'ol[nxBreadcrumb]',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-negative]': 'inverse()',
    '[class.is-link]': 'appearance === "link"',
    '[class.is-primary]': 'type() === "primary"',
  },
  standalone: true,
})
export class NxBreadcrumbComponent implements AfterContentInit, OnDestroy {
  /**
   * Sets the appearance of the breadcrumb.
   *
   * Default: `'default'`.
   */
  @Input() set appearance(value: NxBreadcrumpAppearance) {
    this._appeareance = value;
    this._cdr.markForCheck();
  }
  get appearance() {
    return this._appeareance;
  }
  private _appeareance: NxBreadcrumpAppearance = 'default';

  /**
   * Whether the component uses the negative styling.
   * @deprecated Use `inverse` instead.
   */
  @Input() set negative(value: BooleanInput) {
    this._negative.set(coerceBooleanProperty(value));
  }
  get negative(): boolean {
    return this.inverse();
  }
  private readonly _negative = signal(false);

  private readonly _surface = injectSurface();

  /** Whether the inverse set of styles, for use on a dark background, is applied. */
  readonly inverseInput = input(undefined, {
    alias: 'inverse',
    transform: nxOptionalBooleanAttribute,
  });

  readonly inverse = computed(
    () => this.inverseInput() ?? (this._negative() || this._surface().surface === 'attention'),
  );

  /**
   * Sets the type of the breadcrumb.
   *
   * Default: `'secondary'`.
   */

  readonly type = input<NxBreadcrumbType>('secondary');

  /** @docs-private */
  @ContentChildren(NxBreadcrumbItemComponent, { descendants: true })
  breadcrumbItems!: QueryList<NxBreadcrumbItemComponent>;

  private readonly _destroyed = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    if (this.breadcrumbItems.length === 0) {
      console.warn('A breadcrumb needs NxBreadcrumbItemComponent children wrapped in <li>!');
    }

    this.breadcrumbItems.changes
      .pipe(
        startWith(this.breadcrumbItems),
        filter((items) => items.length !== 0),
        takeUntil(this._destroyed),
      )
      .subscribe((items) => {
        this.breadcrumbItems.forEach((item) => item.resetAriaLabel());
        this.breadcrumbItems.last.setAsLast();
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
