import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  LOCALE_ID,
} from '@angular/core';

/** size of the text price */
export type NxPriceSize = 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

interface FormattedPrice {
  integer: string;
  decimal: string;
  currency: string;
  formatted: string;
}

@Component({
  selector: 'nx-price',
  templateUrl: './price.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./price.component.scss'],
  host: {
    '[class]': '"nx-price--" + size()',
    '[class.nx-price--inverse]': 'inverse()',
  },
  standalone: true,
})
export class NxPriceComponent {
  private readonly defaultLocale = inject(LOCALE_ID);

  /** The numeric price value to display. */
  readonly value = input<number>(0);

  /** The ISO 4217 currency code (e.g., 'USD', 'EUR'). */
  readonly currency = input<string>('USD');

  /** The locale to use for formatting (e.g., 'en-US', 'de-DE'). If not provided, uses the application's LOCALE_ID. */
  readonly locale = input<string>();

  /** The size of the price display. Default is 'm' (medium). */
  readonly size = input<NxPriceSize>('m');

  /** Whether to apply inverse styling, suitable for dark backgrounds. */
  readonly inverse = input(false, { transform: booleanAttribute });

  /** Optional prefix text displayed before the price (e.g., 'from'). */
  readonly prefix = input<string>();

  /** Optional suffix text displayed after the price (e.g., 'monthly'). */
  readonly suffix = input<string>();

  readonly formattedPrice = computed<FormattedPrice>(() => {
    const value = this.value();
    const currency = this.currency();
    const locale = this.locale() || this.defaultLocale;

    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const formatted = formatter.format(value);

      const parts = formatter.formatToParts(value);

      let integer = '';
      let decimal = '';
      let currencySymbol = '';

      for (const part of parts) {
        switch (part.type) {
          case 'integer':
          case 'group':
            integer += part.value;
            break;
          case 'decimal':
            decimal += part.value;
            break;
          case 'fraction':
            decimal += part.value;
            break;
          case 'currency':
            currencySymbol = part.value;
            break;
        }
      }

      return {
        integer: integer.trim(),
        decimal,
        currency: currencySymbol,
        formatted,
      };
    } catch (error) {
      console.error('Error formatting price:', error);
      return {
        integer: String(value),
        decimal: '',
        currency,
        formatted: `${currency} ${value}`,
      };
    }
  });
}
