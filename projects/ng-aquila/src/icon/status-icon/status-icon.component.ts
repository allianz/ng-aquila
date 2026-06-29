import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { NxIconComponent } from '../icon.component';

export type NxStatusIconType = 'success' | 'info' | 'error' | 'warning';

export type NxStatusIconSize = 'auto' | 's' | 'm' | 'l' | 'xl' | '2xl';

@Component({
  selector: 'nx-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconComponent],
  host: {
    '[class.nx-status-icon--error]': "type() === 'error'",
    '[class.nx-status-icon--warning]': "type() === 'warning'",
    '[class.nx-status-icon--success]': "type() === 'success'",
    '[class.nx-status-icon--info]': "type() === 'info'",
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

  /** Whether the status icon uses the inverse color scheme (for placement on dark/inverse surfaces). */
  readonly inverse = input(false, { transform: booleanAttribute });

  private readonly statusListNdbx: { [key in NxStatusIconType]: any } = {
    error: { icon: 'exclamation-triangle' },
    warning: { icon: 'exclamation-circle' },
    success: { icon: 'check-circle' },
    info: { icon: 'info-circle' },
  };

  private readonly statusListA1: { [key in NxStatusIconType]: any } = {
    error: {
      iconSmall: 'exclamation-circle',
      iconContainedSmall: 'exclamation-circle-o',
      iconLarge: 'product-important-info',
    },
    warning: {
      iconSmall: 'exclamation-triangle',
      iconContainedSmall: 'exclamation-triangle-o',
      iconLarge: 'exclamation-triangle-o',
    },
    success: {
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
      return this.statusListNdbx[this.type()]?.icon;
    }

    const status = this.statusListA1[this.type()];
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
