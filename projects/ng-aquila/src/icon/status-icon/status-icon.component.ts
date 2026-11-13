import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { NxIconComponent } from '../icon.component';

/**
 * The status type of a status icon.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
export type NxStatusIconType = 'critical' | 'positive' | 'warning' | 'info' | 'error' | 'success';

type ResolvedStatusIconType = 'critical' | 'positive' | 'warning' | 'info';

const TYPE_ALIASES: { readonly [k: string]: ResolvedStatusIconType } = {
  error: 'critical',
  success: 'positive',
};

export type NxStatusIconSize = 'auto' | 's' | 'm' | 'l' | 'xl' | '2xl';

@Component({
  selector: 'nx-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconComponent],
  host: {
    '[class.nx-status-icon--error]': "_resolvedType() === 'critical'",
    '[class.nx-status-icon--warning]': "_resolvedType() === 'warning'",
    '[class.nx-status-icon--success]': "_resolvedType() === 'positive'",
    '[class.nx-status-icon--info]': "_resolvedType() === 'info'",
    '[class.nx-status-icon--contained]': 'contained()',
    '[class.nx-status-icon--inverse]': 'inverse()',
    '[class.nx-status-icon--s]': "size() === 's'",
    '[class.nx-status-icon--m]': "size() === 'm'",
    '[class.nx-status-icon--l]': "size() === 'l'",
    '[class.nx-status-icon--xl]': "size() === 'xl'",
    '[class.nx-status-icon--2xl]': "size() === '2xl'",
  },
})
export class NxStatusIconComponent {
  private readonly allianzOne = inject(ALLIANZ_ONE, { optional: true }) as AllianzOneOptions | null;

  private readonly a1Enabled = computed(() => this.allianzOne?.enabled?.() ?? false);

  /** Sets status type */
  readonly type = input.required<NxStatusIconType>();

  /** Specifies the size of the icon. */
  readonly size = input<NxStatusIconSize>('auto');

  /** Whether the status icon is rendered inside a filled, circular surface. */
  readonly contained = input(false, { transform: booleanAttribute });

  /**
   * Whether the status icon uses the inverse color scheme (for placement on
   * dark/inverse surfaces). When not set, it follows the surface the icon is placed
   * on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  private readonly _surface = injectSurface();

  protected readonly _resolvedType = computed(
    () => TYPE_ALIASES[this.type()] ?? (this.type() as ResolvedStatusIconType),
  );

  /** Resolved inverse: an explicit input wins, then the surface the component sits on. */
  readonly inverse = computed(() => this.inverseInput() ?? this._surface().surface === 'attention');

  private readonly statusListNdbx: { [key in ResolvedStatusIconType]: any } = {
    critical: { icon: 'exclamation-triangle' },
    warning: { icon: 'exclamation-circle' },
    positive: { icon: 'check-circle' },
    info: { icon: 'info-circle' },
  };

  private readonly statusListA1: { [key in ResolvedStatusIconType]: any } = {
    critical: {
      iconSmall: 'exclamation-circle',
      iconContainedSmall: 'exclamation-circle-o',
      iconLarge: 'product-important-info',
    },
    warning: {
      iconSmall: 'exclamation-triangle',
      iconContainedSmall: 'exclamation-triangle-o',
      iconLarge: 'product-danger',
    },
    positive: {
      iconSmall: 'check-circle',
      iconContainedSmall: 'check',
      iconLarge: 'product-check',
    },
    info: {
      iconSmall: 'info-circle',
      iconContainedSmall: 'info-circle-o',
      iconLarge: 'product-help-information',
    },
  };

  /** @docs-private */
  protected readonly icon = computed(() => {
    if (!this.a1Enabled()) {
      return this.statusListNdbx[this._resolvedType()]?.icon;
    }

    const status = this.statusListA1[this._resolvedType()];
    const isSmall = ['auto', 's', 'm'].includes(this.size());

    if (!isSmall) {
      // l, xl and 2xl always use the illustrative glyph (plain and contained).
      return status?.iconLarge;
    }

    // For s and m the contained variant uses the dedicated outline glyph,
    // while the plain variant uses the filled functional glyph.
    return this.contained() ? status?.iconContainedSmall : status?.iconSmall;
  });

  /**
   * Size passed to the inner glyph. In contained mode the glyph inherits the
   * font-size of the surface, so we keep it on `auto`.
   * @docs-private
   */
  protected readonly glyphSize = computed<NxStatusIconSize>(() =>
    this.contained() ? 'auto' : this.size(),
  );
}
