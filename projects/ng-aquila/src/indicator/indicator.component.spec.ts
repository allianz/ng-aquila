import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxIndicatorComponent, NxIndicatorSize, NxIndicatorType } from './indicator.component';
import { NxIndicatorModule } from './indicator.module';

@Directive({ standalone: true })
abstract class IndicatorTest {
  @ViewChild(NxIndicatorComponent)
  indicatorInstance!: NxIndicatorComponent;
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
        OverlapIndicator,
        OverlapAttributeIndicator,
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

    it('sets after-text positioning class when passed through input', () => {
      indicatorInstance.position = 'after-text';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--after-text');
    });
  });

  describe('corner positions', () => {
    function positionClasses(): string[] {
      return [...indicatorNativeElement.classList]
        .filter((className) => className.startsWith('nx-indicator--'))
        .sort();
    }

    for (const position of ['top-start', 'top-end', 'bottom-start', 'bottom-end'] as const) {
      it(`applies the position class for "${position}"`, () => {
        createTestComponent(BasicIndicator);
        indicatorInstance.position = position;
        fixture.detectChanges();

        expect(indicatorNativeElement).toHaveClass(`nx-indicator--${position}`);
      });
    }

    it('removes the previous position class when the position changes', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = 'top-end';
      fixture.detectChanges();

      indicatorInstance.position = 'bottom-start';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--bottom-start');
      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--top-end');
    });

    it('removes the position class when the position is cleared', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = 'top-end';
      fixture.detectChanges();

      indicatorInstance.position = '';
      fixture.detectChanges();

      expect(positionClasses()).toEqual([
        'nx-indicator--critical',
        'nx-indicator--m',
        'nx-indicator--padded',
      ]);
    });

    it('emits no class for a blank position', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = '   ';
      fixture.detectChanges();

      expect(positionClasses()).toEqual([
        'nx-indicator--critical',
        'nx-indicator--m',
        'nx-indicator--padded',
      ]);
    });

    it('ignores extra whitespace between positions', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = '  over-text   with-overlap  ';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--over-text');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--with-overlap');
      expect(indicatorInstance.position).toBe('over-text with-overlap');
    });

    it('drops unknown positions', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = 'top-end bogus';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--top-end');
      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--bogus');
      expect(indicatorInstance.position).toBe('top-end');
    });

    it('drops legacy positions when combined with a new position', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = 'top-end with-overlap';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--top-end');
      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--with-overlap');
      expect(indicatorInstance.position).toBe('top-end');
    });

    it('keeps legacy positions when no new position is given', () => {
      createTestComponent(BasicIndicator);
      indicatorInstance.position = 'over-text with-overlap';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--over-text');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--with-overlap');
    });
  });

  describe('overlap', () => {
    it('does not set the overlap class by default', () => {
      createTestComponent(BasicIndicator);

      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--overlap');
    });

    it('sets the overlap class when enabled', () => {
      createTestComponent(OverlapIndicator);
      (testInstance as OverlapIndicator).overlap = true;
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--overlap');
    });

    it('removes the overlap class when disabled again', () => {
      createTestComponent(OverlapIndicator);
      (testInstance as OverlapIndicator).overlap = true;
      fixture.detectChanges();

      (testInstance as OverlapIndicator).overlap = false;
      fixture.detectChanges();

      expect(indicatorNativeElement).not.toHaveClass('nx-indicator--overlap');
    });

    it('treats a bare attribute as enabled', () => {
      createTestComponent(OverlapAttributeIndicator);

      expect(indicatorNativeElement).toHaveClass('nx-indicator--overlap');
    });

    it('combines with a corner position', () => {
      createTestComponent(OverlapIndicator);
      (testInstance as OverlapIndicator).overlap = true;
      indicatorInstance.position = 'top-end';
      fixture.detectChanges();

      expect(indicatorNativeElement).toHaveClass('nx-indicator--top-end');
      expect(indicatorNativeElement).toHaveClass('nx-indicator--overlap');
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
  selector: 'test-basic-indicator',
  template: `<nx-indicator [position]="position">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class BasicIndicator extends IndicatorTest {
  position = '';
}

@Component({
  selector: 'test-single-letter-indicator',
  template: `<nx-indicator [position]="position">A</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class SingleLetterIndicator extends IndicatorTest {
  position = '';
}

@Component({
  selector: 'test-overlap-indicator',
  template: `<nx-indicator [position]="position" [overlap]="overlap">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class OverlapIndicator extends IndicatorTest {
  position = '';
  overlap = false;
}

@Component({
  selector: 'test-overlap-attribute-indicator',
  template: `<nx-indicator position="top-end" overlap>99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class OverlapAttributeIndicator extends IndicatorTest {}

@Component({
  selector: 'test-sized-indicator',
  template: `<nx-indicator [size]="size">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class SizedIndicator extends IndicatorTest {
  size: NxIndicatorSize = 'm';
}

@Component({
  selector: 'test-typed-indicator',
  template: `<nx-indicator [type]="type" [size]="size">99</nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class TypedIndicator extends IndicatorTest {
  type: NxIndicatorType = 'critical';
  size: NxIndicatorSize = 'm';
}

@Component({
  selector: 'test-empty-indicator',
  template: `<nx-indicator></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class EmptyIndicator extends IndicatorTest {}

@Component({
  selector: 'test-icon-indicator',
  template: `<nx-indicator><nx-icon name="chevron-left"></nx-icon></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule, NxIconModule],
})
class IconIndicator extends IndicatorTest {}

@Component({
  selector: 'test-nested-icon-indicator',
  template: `<nx-indicator
    ><span><nx-icon name="chevron-left"></nx-icon></span
  ></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule, NxIconModule],
})
class NestedIconIndicator extends IndicatorTest {}

@Component({
  selector: 'test-wrapped-text-indicator',
  template: `<nx-indicator><span>99</span></nx-indicator>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxIndicatorModule],
})
class WrappedTextIndicator extends IndicatorTest {}
