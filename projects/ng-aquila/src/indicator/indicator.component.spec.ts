import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxIndicatorComponent, NxIndicatorSize, NxIndicatorType } from './indicator.component';
import { NxIndicatorModule } from './indicator.module';

@Directive({ standalone: true })
abstract class IndicatorTest {
  @ViewChild(NxIndicatorComponent) indicatorInstance!: NxIndicatorComponent;
}

describe('NxIndicatorComponent', () => {
  let fixture: ComponentFixture<IndicatorTest>;
  let testInstance: IndicatorTest;
  let indicatorInstance: NxIndicatorComponent;
  let indicatorNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<IndicatorTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    indicatorInstance = testInstance.indicatorInstance;
    indicatorNativeElement = fixture.nativeElement.querySelector(
      'nx-indicator',
    ) as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxIndicatorModule,
        NxIconModule,
        BasicIndicator,
        SizedIndicator,
        TypedIndicator,
        EmptyIndicator,
        IconIndicator,
        NestedIconIndicator,
        WrappedTextIndicator,
      ],
    }).compileComponents();
  }));

  it('creates the component', waitForAsync(() => {
    createTestComponent(BasicIndicator);
    expect(indicatorInstance).toBeTruthy();
  }));

  describe('basic indicator', () => {
    beforeEach(() => {
      createTestComponent(BasicIndicator);
    });

    it('has no positioning classes by default', () => {
      expect(indicatorNativeElement).toHaveClass('nx-indicator');
      expect(
        [...indicatorNativeElement.classList]
          .filter((className) => className.startsWith('nx-indicator--'))
          .sort(),
      ).toEqual(['nx-indicator--critical', 'nx-indicator--m', 'nx-indicator--padded']);
    });

    it('sets positioning class when passed through input', () => {
      indicatorInstance.position = 'over-icon';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--over-icon');
    });

    it('sets multiple positioning classes when passed through input', () => {
      indicatorInstance.position = 'over-text with-overlap';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--over-text');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--with-overlap');
    });
  });

  describe('sizes', () => {
    it('is size m by default', () => {
      createTestComponent(BasicIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--m');
    });

    for (const size of ['s', 'm', '800', '1000', '1200', '1400', '1600', '1800', '2000'] as const) {
      it(`applies the size class for "${size}"`, () => {
        createTestComponent(SizedIndicator);
        (testInstance as SizedIndicator).size = size;
        fixture.detectChanges();

        expect(indicatorNativeElement).toHaveClass(`nx-indicator--${size}`);
      });
    }
  });

  describe('color types', () => {
    it('is type critical by default', () => {
      createTestComponent(BasicIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--critical');
    });

    for (const type of ['critical', 'warning', 'positive', 'info'] as const) {
      it(`applies the type class for "${type}"`, () => {
        createTestComponent(TypedIndicator);
        (testInstance as TypedIndicator).type = type;
        fixture.detectChanges();

        expect(indicatorNativeElement).toHaveClass(`nx-indicator--${type}`);
      });
    }

    it('combines the size and type classes', () => {
      createTestComponent(TypedIndicator);
      (testInstance as TypedIndicator).type = 'positive';
      (testInstance as TypedIndicator).size = '1600';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--1600');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--positive');
    });
  });

  describe('variant detection', () => {
    it('adds no padding for the countless variant', () => {
      createTestComponent(EmptyIndicator);

      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--padded');
      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--icon');
    });

    it('adds no padding for a single character', () => {
      createTestComponent(SingleLetterIndicator);

      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--padded');
    });

    it('adds padding for more than one character', () => {
      createTestComponent(BasicIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--padded');
    });

    it('detects the icon variant from a projected nx-icon', () => {
      createTestComponent(IconIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--icon');
      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--padded');
    });

    it('detects the icon variant from a nested icon', () => {
      createTestComponent(NestedIconIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--icon');
    });

    it('stays the count variant when text is wrapped in an element', () => {
      createTestComponent(WrappedTextIndicator);

      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--icon');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--padded');
    });
  });
});

@Component({
  template: `<nx-indicator [position]="position">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class BasicIndicator extends IndicatorTest {
  position = '';
}

@Component({
  template: `<nx-indicator [position]="position">A</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class SingleLetterIndicator extends IndicatorTest {
  position = '';
}

@Component({
  template: `<nx-indicator [size]="size">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class SizedIndicator extends IndicatorTest {
  size: NxIndicatorSize = 'm';
}

@Component({
  template: `<nx-indicator [type]="type" [size]="size">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class TypedIndicator extends IndicatorTest {
  type: NxIndicatorType = 'critical';
  size: NxIndicatorSize = 'm';
}

@Component({
  template: `<nx-indicator></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class EmptyIndicator extends IndicatorTest {}

@Component({
  template: `<nx-indicator><nx-icon name="chevron-left"></nx-icon></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule, NxIconModule],
})
class IconIndicator extends IndicatorTest {}

@Component({
  template: `<nx-indicator
    ><span><nx-icon name="chevron-left"></nx-icon></span
  ></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule, NxIconModule],
})
class NestedIconIndicator extends IndicatorTest {}

@Component({
  template: `<nx-indicator><span>99</span></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class WrappedTextIndicator extends IndicatorTest {}
