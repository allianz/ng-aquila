import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  NxComparisonTableFeatureLayout,
  NxComparisonTableFeatureType,
} from '../comparison-table.models';
import { NxComparisonTableIntl } from '../comparison-table-intl';
import { NxComparisonTableFeature } from './comparison-table-feature.component';

@Component({
  selector: 'feature-test',
  template: `<nx-comparison-table-feature
    [type]="type"
    [contained]="contained"
    [layout]="layout"
    [iconAriaLabel]="iconAriaLabel"
    >{{ text }}</nx-comparison-table-feature
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxComparisonTableFeature],
})
class FeatureTestComponent {
  type: NxComparisonTableFeatureType = 'check';
  contained = false;
  layout: NxComparisonTableFeatureLayout = 'horizontal';
  iconAriaLabel: string | undefined = undefined;
  text = 'Feature';
}

describe('NxComparisonTableFeature', () => {
  let fixture: ComponentFixture<FeatureTestComponent>;
  let host: FeatureTestComponent;

  const element = () =>
    fixture.nativeElement.querySelector('nx-comparison-table-feature') as HTMLElement;
  const icon = () => element().querySelector('.nx-comparison-table-feature__icon');
  const iconLabel = () => icon()!.getAttribute('aria-label');

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTestComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it.each([
    ['check', 'check', 'Included'],
    ['minus', 'minus', 'Not included'],
    ['cross', 'close', 'Not included'],
  ] as const)('renders the %s icon with its label', (type, iconName, label) => {
    host.type = type;
    fixture.detectChanges();

    expect(icon()).toHaveClass(`is-${type}`);
    const iconInstance = fixture.debugElement.query(
      By.directive(NxIconComponent),
    ).componentInstance;
    expect(iconInstance.name).toBe(iconName);
    expect(icon()!.querySelector('nx-icon')!.getAttribute('aria-hidden')).toBe('true');
    expect(icon()).toHaveAttribute('role', 'img');
    expect(iconLabel()).toBe(label);
  });

  it('renders only the text without a type', () => {
    host.type = null;
    fixture.detectChanges();

    expect(icon()).toBeNull();
    expect(element().textContent!.trim()).toBe('Feature');
  });

  it('puts the horizontal gap on the icon so wrapped text starts flush', () => {
    expect(getComputedStyle(icon()!).marginInlineEnd).toBe('12px');
    expect(
      getComputedStyle(element().querySelector('.nx-comparison-table-feature__text')!)
        .marginInlineStart,
    ).toBe('0px');
  });

  it.each([
    ['without text', { text: '' }],
    ['in the vertical layout', { layout: 'vertical' as const }],
  ])('drops the icon margin %s', (_, change) => {
    Object.assign(host, change);
    fixture.detectChanges();

    expect(getComputedStyle(icon()!).marginInlineEnd).toBe('0px');
  });

  it('keeps the icon label out of the text content', () => {
    expect(element().textContent!.trim()).toBe('Feature');
  });

  it('toggles the contained style', () => {
    expect(icon()).not.toHaveClass('is-contained');

    host.contained = true;
    fixture.detectChanges();

    expect(icon()).toHaveClass('is-contained');
  });

  it('sets the vertical layout class', () => {
    expect(element()).not.toHaveClass('is-vertical');

    host.layout = 'vertical';
    fixture.detectChanges();
    expect(element()).toHaveClass('is-vertical');
  });

  it('overrides the icon label with iconAriaLabel', () => {
    host.iconAriaLabel = 'Covered';
    fixture.detectChanges();

    expect(iconLabel()).toBe('Covered');
  });

  it('hides the icon from assistive technology when iconAriaLabel is empty', () => {
    host.iconAriaLabel = '';
    fixture.detectChanges();

    expect(icon()).not.toHaveAttribute('role');
    expect(icon()).not.toHaveAttribute('aria-label');
    expect(icon()).toHaveAttribute('aria-hidden', 'true');
  });

  it('updates the icon label when the intl changes', () => {
    const intl = TestBed.inject(NxComparisonTableIntl);
    intl.featureIncludedLabel = 'Enthalten';
    intl.changes.next();
    fixture.detectChanges();

    expect(iconLabel()).toBe('Enthalten');
  });
});
