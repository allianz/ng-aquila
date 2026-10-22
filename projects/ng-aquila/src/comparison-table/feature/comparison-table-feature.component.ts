import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  NxComparisonTableFeatureLayout,
  NxComparisonTableFeatureType,
} from '../comparison-table.models';
import { NxComparisonTableIntl } from '../comparison-table-intl';

const ICON_NAMES: { [type in NonNullable<NxComparisonTableFeatureType>]: string } = {
  check: 'check',
  minus: 'minus',
  cross: 'close',
};

/** Shows whether a product includes a feature, as an icon with an optional text. */
@Component({
  selector: 'nx-comparison-table-feature',
  templateUrl: './comparison-table-feature.component.html',
  styleUrls: ['./comparison-table-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-comparison-table-feature',
    '[class.is-vertical]': 'layout() === "vertical"',
  },
  imports: [NxIconModule],
})
export class NxComparisonTableFeature {
  private readonly _intl = inject(NxComparisonTableIntl);
  private readonly _intlChanges = toSignal(this._intl.changes, { equal: () => false });

  /** The icon to show. Without a type only the text is shown. */
  readonly type = input<NxComparisonTableFeatureType>(null);

  /** Whether the icon is shown on a tinted round background. */
  readonly contained = input(false, { transform: booleanAttribute });

  /** Arrangement of icon and text. Default: `'horizontal'`. */
  readonly layout = input<NxComparisonTableFeatureLayout>('horizontal');

  /**
   * Screen reader label of the icon. Defaults to the label for the type from `NxComparisonTableIntl`.
   * Set to an empty string when the text already conveys the meaning.
   */
  readonly iconAriaLabel = input<string | undefined>(undefined);

  protected readonly _iconName = computed(() => {
    const type = this.type();
    return type ? ICON_NAMES[type] : '';
  });

  protected readonly _iconAriaLabel = computed(() => {
    const label = this.iconAriaLabel();
    if (label !== undefined) {
      return label;
    }
    this._intlChanges();
    switch (this.type()) {
      case 'check':
        return this._intl.featureIncludedLabel;
      case 'minus':
      case 'cross':
        return this._intl.featureNotIncludedLabel;
      default:
        return '';
    }
  });
}
