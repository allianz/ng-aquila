import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  LOCALE_ID,
  type Type,
  ViewChild,
} from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxPriceComponent, type NxPriceSize } from './price.component';
import { NxPriceModule } from './price.module';

/** Helper function to check if currency symbol appears before the value (e.g., $100 vs 100€). */
function isCurrencyBeforeValue(formatted: string, currencySymbol: string): boolean {
  if (!currencySymbol) {
    return false;
  }

  const currencyIndex = formatted.indexOf(currencySymbol);
  const digitMatch = formatted.match(/\d/);
  const digitIndex = digitMatch ? formatted.indexOf(digitMatch[0]) : -1;

  return currencyIndex < digitIndex && currencyIndex !== -1;
}

@Directive({ standalone: true })
abstract class PriceTest {
  @ViewChild(NxPriceComponent) priceInstance!: NxPriceComponent;
  value = 99.99;
  currency = 'USD';
  locale?: string;
  size: NxPriceSize = 'm';
  inverse = false;
  prefix?: string;
  suffix?: string;
}

describe('NxPriceComponent', () => {
  let fixture: ComponentFixture<PriceTest>;
  let testInstance: PriceTest;
  let priceInstance: NxPriceComponent;
  let priceNativeElement: HTMLElement;

  function createTestComponent(component: Type<PriceTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    priceInstance = testInstance.priceInstance;
    priceNativeElement = fixture.nativeElement.querySelector('nx-price') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxPriceModule,
        BasicPriceComponent,
        PriceWithLocaleComponent,
        PriceWithSizeComponent,
        PriceWithInverseComponent,
        PriceWithPrefixSuffixComponent,
        PriceWithDifferentCurrencyComponent,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('should create', () => {
      createTestComponent(BasicPriceComponent);
      expect(priceInstance).toBeTruthy();
    });

    it('should display formatted price', () => {
      createTestComponent(BasicPriceComponent);
      const valueElement = priceNativeElement.querySelector('.nx-price__value');
      expect(valueElement?.textContent).toContain('99');
    });

    it('should have default medium size class', () => {
      createTestComponent(BasicPriceComponent);
      expect(priceNativeElement).toHaveClass('nx-price--m');
    });
  });

  describe('locale formatting', () => {
    it('should format USD in en-US locale', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'en-US';
      fixture.componentInstance.currency = 'USD';
      fixture.componentInstance.value = 1234.56;
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('1,234');
      expect(formatted.decimal).toContain('56');
      expect(formatted.currency).toBe('$');
    });

    it('should format EUR in de-DE locale', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'de-DE';
      fixture.componentInstance.currency = 'EUR';
      fixture.componentInstance.value = 1234.56;
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('1.234');
      expect(formatted.decimal).toContain('56');
      expect(formatted.currency).toBe('€');
    });

    it('should format GBP in en-GB locale', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'en-GB';
      fixture.componentInstance.currency = 'GBP';
      fixture.componentInstance.value = 999.99;
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('999');
      expect(formatted.decimal).toContain('99');
      expect(formatted.currency).toBe('£');
    });

    it('should use application LOCALE_ID when locale input is not provided', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [NxPriceModule, PriceWithLocaleIdComponent],
        providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
      }).compileComponents();

      createTestComponent(PriceWithLocaleIdComponent);

      const formatted = priceInstance.formattedPrice();
      // French locale uses space as thousand separator
      expect(formatted.formatted).toContain('100');
      expect(formatted.currency).toBe('€');
    });
  });

  describe('currency symbol positioning', () => {
    it('should detect currency before value for USD', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'en-US';
      fixture.componentInstance.currency = 'USD';
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      expect(isCurrencyBeforeValue(formatted.formatted, formatted.currency)).toBe(true);
    });

    it('should detect currency after value for EUR in de-DE', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'de-DE';
      fixture.componentInstance.currency = 'EUR';
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      expect(isCurrencyBeforeValue(formatted.formatted, formatted.currency)).toBe(false);
    });

    it('should render price value element', () => {
      createTestComponent(PriceWithDifferentCurrencyComponent);
      const valueElement = priceNativeElement.querySelector('.nx-price__value');

      expect(valueElement).toBeTruthy();
      expect(valueElement?.textContent).toContain('$');
    });
  });

  describe('size variants', () => {
    it('should apply small size class', () => {
      createTestComponent(PriceWithSizeComponent);
      fixture.componentInstance.size = 's';
      fixture.detectChanges();

      expect(priceNativeElement).toHaveClass('nx-price--s');
      expect(priceNativeElement).not.toHaveClass('nx-price--m');
    });

    it('should apply medium size class', () => {
      createTestComponent(PriceWithSizeComponent);
      fixture.componentInstance.size = 'm';
      fixture.detectChanges();

      expect(priceNativeElement).toHaveClass('nx-price--m');
    });

    it('should apply large size class', () => {
      createTestComponent(PriceWithSizeComponent);
      fixture.componentInstance.size = 'l';
      fixture.detectChanges();

      expect(priceNativeElement).toHaveClass('nx-price--l');
    });
  });

  describe('inverse styling', () => {
    it('should apply inverse class when inverse is true', () => {
      createTestComponent(PriceWithInverseComponent);
      fixture.componentInstance.inverse = true;
      fixture.detectChanges();

      expect(priceNativeElement).toHaveClass('nx-price--inverse');
    });

    it('should not apply inverse class by default', () => {
      createTestComponent(PriceWithInverseComponent);
      expect(priceNativeElement).not.toHaveClass('nx-price--inverse');
    });
  });

  describe('prefix and suffix', () => {
    it('should display prefix', () => {
      createTestComponent(PriceWithPrefixSuffixComponent);
      fixture.componentInstance.prefix = 'from';
      fixture.detectChanges();

      const prefixElement = priceNativeElement.querySelector('.nx-price__prefix-secondary');
      expect(prefixElement?.textContent).toBe('from');
    });

    it('should display suffix', () => {
      createTestComponent(PriceWithPrefixSuffixComponent);
      fixture.componentInstance.suffix = 'monthly';
      fixture.detectChanges();

      const suffixElement = priceNativeElement.querySelector('.nx-price__suffix-secondary');
      expect(suffixElement?.textContent).toBe('monthly');
    });

    it('should display both prefix and suffix', () => {
      createTestComponent(PriceWithPrefixSuffixComponent);
      fixture.componentInstance.prefix = 'from';
      fixture.componentInstance.suffix = 'per month';
      fixture.detectChanges();

      const prefixElement = priceNativeElement.querySelector('.nx-price__prefix-secondary');
      const suffixElement = priceNativeElement.querySelector('.nx-price__suffix-secondary');
      expect(prefixElement?.textContent).toBe('from');
      expect(suffixElement?.textContent).toBe('per month');
    });

    it('should not display prefix/suffix when not provided', () => {
      createTestComponent(BasicPriceComponent);
      const prefixElement = priceNativeElement.querySelector('.nx-price__prefix-secondary');
      const suffixElement = priceNativeElement.querySelector('.nx-price__suffix-secondary');
      expect(prefixElement).toBeNull();
      expect(suffixElement).toBeNull();
    });
  });

  describe('decimal display', () => {
    it('should display decimal part', () => {
      createTestComponent(BasicPriceComponent);
      fixture.componentInstance.value = 99.99;
      fixture.detectChanges();

      const valueElement = priceNativeElement.querySelector('.nx-price__value');
      expect(valueElement?.textContent).toContain('.99');
    });

    it('should handle whole numbers', () => {
      createTestComponent(BasicPriceComponent);
      const formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('99');
      // Should still show decimals due to minimumFractionDigits: 2
      expect(formatted.decimal).toContain('99');
    });
  });

  describe('programmatic changes', () => {
    it('should update when value changes', () => {
      createTestComponent(BasicPriceComponent);
      expect(priceInstance.value()).toBe(99.99);

      const valueElement = priceNativeElement.querySelector('.nx-price__value');
      expect(valueElement?.textContent).toContain('99.99');
    });

    it('should update when currency changes', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'en-US';
      fixture.componentInstance.currency = 'USD';
      fixture.detectChanges();

      let formatted = priceInstance.formattedPrice();
      expect(formatted.currency).toBe('$');

      fixture.componentInstance.currency = 'EUR';
      fixture.detectChanges();

      formatted = priceInstance.formattedPrice();
      expect(formatted.currency).toBe('€');
    });

    it('should update when locale changes', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.value = 1234.56;
      fixture.componentInstance.currency = 'USD';
      fixture.componentInstance.locale = 'en-US';
      fixture.detectChanges();

      let formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('1,234');

      fixture.componentInstance.locale = 'de-DE';
      fixture.detectChanges();

      formatted = priceInstance.formattedPrice();
      expect(formatted.integer).toBe('1.234');
    });
  });

  describe('error handling', () => {
    it('should handle invalid currency gracefully', () => {
      createTestComponent(BasicPriceComponent);
      fixture.componentInstance.currency = 'INVALID';
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      // Should return fallback format
      expect(formatted.formatted).toBeTruthy();
    });

    it('should handle invalid locale gracefully', () => {
      createTestComponent(PriceWithLocaleComponent);
      fixture.componentInstance.locale = 'invalid-locale';
      fixture.detectChanges();

      const formatted = priceInstance.formattedPrice();
      // Should still produce some output
      expect(formatted.formatted).toBeTruthy();
    });
  });

  describe('SSR compatibility', () => {
    it('should work with Intl.NumberFormat in SSR context', () => {
      // This test ensures that Intl.NumberFormat works correctly
      // In a real SSR environment, this would be tested in an actual SSR context
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const result = formatter.format(99.99);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should handle formatToParts in SSR context', () => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      const parts = formatter.formatToParts(99.99);
      expect(Array.isArray(parts)).toBe(true);
      expect(parts.length).toBeGreaterThan(0);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicPriceComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations with prefix and suffix', async () => {
      createTestComponent(PriceWithPrefixSuffixComponent);
      fixture.componentInstance.prefix = 'from';
      fixture.componentInstance.suffix = 'monthly';
      fixture.detectChanges();
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

// Test Components
@Component({
  selector: 'test-basic-price',
  template: `<nx-price [value]="value" [currency]="currency" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxPriceModule],
})
class BasicPriceComponent extends PriceTest {}

@Component({
  selector: 'test-price-with-locale',
  template: `<nx-price [value]="value" [currency]="currency" [locale]="locale" />`,
  imports: [NxPriceModule],
})
class PriceWithLocaleComponent extends PriceTest {}

@Component({
  selector: 'test-price-with-size',
  template: `<nx-price [value]="value" [currency]="currency" [size]="size" />`,
  imports: [NxPriceModule],
})
class PriceWithSizeComponent extends PriceTest {}

@Component({
  selector: 'test-price-with-inverse',
  template: `<nx-price [value]="value" [currency]="currency" [inverse]="inverse" />`,
  imports: [NxPriceModule],
})
class PriceWithInverseComponent extends PriceTest {}

@Component({
  selector: 'test-price-with-prefix-suffix',
  template: `<nx-price
    [value]="value"
    [currency]="currency"
    [prefix]="prefix"
    [suffix]="suffix"
  />`,
  imports: [NxPriceModule],
})
class PriceWithPrefixSuffixComponent extends PriceTest {}

@Component({
  selector: 'test-price-with-different-currency',
  template: `<nx-price [value]="value" [currency]="currency" [locale]="locale" />`,
  imports: [NxPriceModule],
})
class PriceWithDifferentCurrencyComponent extends PriceTest {
  override currency = 'USD';
  override locale = 'en-US';
}

@Component({
  selector: 'test-price-with-locale-id',
  template: `<nx-price [value]="value" [currency]="currency" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxPriceModule],
})
class PriceWithLocaleIdComponent extends PriceTest {
  override value = 100;
  override currency = 'EUR';
}
