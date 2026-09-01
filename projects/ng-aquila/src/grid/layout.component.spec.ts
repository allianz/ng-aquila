import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxGridModule } from './grid.module';
import { NxLayoutComponent } from './layout.component';

@Directive({ standalone: true })
abstract class DirectiveTest {
  @ViewChild(NxLayoutComponent)
  layoutInstance!: NxLayoutComponent;
}

describe('NxLayoutDirective', () => {
  let fixture: ComponentFixture<DirectiveTest>;
  let testInstance: DirectiveTest;
  let divInstance: NxLayoutComponent;
  let divNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<DirectiveTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    divInstance = testInstance.layoutInstance;
    divNativeElement = fixture.nativeElement.querySelector('div') as HTMLButtonElement;
  }

  function getClassesCreated(component: Type<DirectiveTest>): string {
    createTestComponent(component);
    return sortedClassNames(divNativeElement);
  }

  function sortedClassNames(element: Element): string {
    return element.className.split(' ').sort().join(' ');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxGridModule,
        BasicLayout,
        BasicContainerQueryGridLayout,
        BasicGridLayout,
        BasicGridLayoutClassTest,
        BasicNoGutters,
        BasicNoPadding,
        BasicNoPaddingWithRow,
        BasicNoPaddingNoGuttersWithRow,
        BasicMaxWidth,
        BasicCombinate,
        Basic2Combinate,
        BasicCompleteReverse,
        DynamicLayout,
      ],
    }).compileComponents();
  }));

  it('should test with input nxLayout="grid"', () => {
    expect(getClassesCreated(BasicGridLayout)).toBe('nx-grid nx-grid--media-query');
  });

  it('should include container-query css class for Container Query Grid', () => {
    expect(getClassesCreated(BasicContainerQueryGridLayout)).toBe(
      'nx-grid nx-grid--container-query',
    );
  });

  it('should test with input nxLayout="grid" and class="test"', () => {
    expect(getClassesCreated(BasicGridLayoutClassTest)).toBe('nx-grid nx-grid--media-query test');
  });

  it('should test with input nxLayout="grid nogutters"', () => {
    expect(getClassesCreated(BasicNoGutters)).toBe(
      'nx-grid nx-grid--media-query nx-grid--no-gutters',
    );
  });

  it('should test with input nxLayout="grid nopadding"', () => {
    expect(getClassesCreated(BasicNoPadding)).toBe(
      'nx-grid nx-grid--media-query nx-grid--no-padding',
    );
  });

  it('should test with input nxLayout="grid maxwidth"', () => {
    expect(getClassesCreated(BasicMaxWidth)).toBe(
      'nx-grid nx-grid--max-width nx-grid--media-query',
    );
  });

  it('should test with input "grid" maxwidth nogutters', () => {
    expect(getClassesCreated(BasicCombinate)).toBe(
      'nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters',
    );
  });

  it('should test with input "grid" nogutters maxwidth', () => {
    expect(getClassesCreated(Basic2Combinate)).toBe(
      'nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters',
    );
  });

  it('should test with input nogutters grid maxwidth', () => {
    expect(getClassesCreated(BasicCompleteReverse)).toBe(
      'nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters',
    );
  });

  it('should pull rows out by half a gutter with nopadding', () => {
    createTestComponent(BasicNoPaddingWithRow);
    const row = fixture.nativeElement.querySelector('[nxRow]') as HTMLElement;
    const { marginLeft, marginRight } = getComputedStyle(row);
    expect(marginLeft).toBe('-16px');
    expect(marginRight).toBe('-16px');
  });

  it('should not pull rows out when nopadding is combined with nogutters', () => {
    createTestComponent(BasicNoPaddingNoGuttersWithRow);
    const row = fixture.nativeElement.querySelector('[nxRow]') as HTMLElement;
    const { marginLeft, marginRight } = getComputedStyle(row);
    expect(marginLeft).toBe('0px');
    expect(marginRight).toBe('0px');
  });

  it('should update class names after input change', () => {
    createTestComponent(DynamicLayout);
    (testInstance as DynamicLayout).layout = 'grid nogutters';
    fixture.detectChanges();
    expect(sortedClassNames(divNativeElement)).toBe(
      'nx-grid nx-grid--media-query nx-grid--no-gutters',
    );
  });
});

@Component({
  selector: 'test-basic-layout',
  template: `<div nxLayout=""></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicLayout extends DirectiveTest {}

@Component({
  selector: 'test-basic-grid-layout',
  template: `<div nxLayout="grid"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicGridLayout extends DirectiveTest {}
@Component({
  selector: 'test-basic-container-query-grid-layout',
  template: `<div nxLayout="grid" [containerQuery]="true"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicContainerQueryGridLayout extends DirectiveTest {}

@Component({
  selector: 'test-basic-grid-layout-class-test',
  template: `<div nxLayout="grid" class="test"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicGridLayoutClassTest extends DirectiveTest {}

@Component({
  selector: 'test-basic-no-gutters',
  template: `<div nxLayout="grid nogutters"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicNoGutters extends DirectiveTest {}

@Component({
  selector: 'test-basic-max-width',
  template: `<div nxLayout="grid maxwidth"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicMaxWidth extends DirectiveTest {}

@Component({
  selector: 'test-basic-combinate',
  template: `<div nxLayout="grid maxwidth nogutters"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicCombinate extends DirectiveTest {}

@Component({
  selector: 'test-basic2-combinate',
  template: `<div nxLayout="grid nogutters maxwidth"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class Basic2Combinate extends DirectiveTest {}

@Component({
  selector: 'test-basic-complete-reverse',
  template: `<div nxLayout="maxwidth grid nogutters"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicCompleteReverse extends DirectiveTest {}

@Component({
  selector: 'test-basic-no-padding',
  template: `<div nxLayout="grid nopadding"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicNoPadding extends DirectiveTest {}

// Pin every gutter to the same width so the expected row margin does not depend on the
// width of the runner iframe.
const UNIFORM_GUTTERS = `:host {
  --grid-gutter-width-mobile: 32px;
  --grid-gutter-width-base: 32px;
  --grid-gutter-width-large: 32px;
}`;

@Component({
  selector: 'test-basic-no-padding-with-row',
  template: `<div nxLayout="grid nopadding"><div nxRow></div></div>`,
  styles: UNIFORM_GUTTERS,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicNoPaddingWithRow extends DirectiveTest {}

@Component({
  selector: 'test-basic-no-padding-no-gutters-with-row',
  template: `<div nxLayout="grid nopadding nogutters"><div nxRow></div></div>`,
  styles: UNIFORM_GUTTERS,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class BasicNoPaddingNoGuttersWithRow extends DirectiveTest {}

@Component({
  selector: 'test-dynamic-layout',
  template: `<div [nxLayout]="layout"></div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxGridModule],
})
class DynamicLayout extends DirectiveTest {
  layout = 'grid';
}
