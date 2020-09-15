import { NxColComponent } from './col.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, Type, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { sortedClassNames } from '../cdk-test-utils';

// tslint:disable:component-class-suffix

@Directive()
abstract class DirectiveTest {
  @ViewChild(NxColComponent) layoutInstance: NxColComponent;
}

describe('NxColDirective', () => {

  let fixture: ComponentFixture<DirectiveTest>;
  let testInstance: DirectiveTest;
  let divInstance: NxColComponent;
  let divNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<DirectiveTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    divInstance = testInstance.layoutInstance;
    divNativeElement = <HTMLButtonElement>fixture.nativeElement.querySelector('div');
  }

  function getClassesCreated(component: Type<DirectiveTest>, input: string): DebugElement {
      createTestComponent(component);
      return fixture.debugElement.query(By.css(input));
  }

  function getColumn(index: number = 0) {
    return fixture.nativeElement.querySelectorAll('[nxCol]')[index] || null;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicTestNxColFourInputs,
                     BasicTestNxColTwoInputs,
                     BasicTestNxColTrheeInputs,
                     BasicTestNxColOneInputs,
                     BasicTestNxColEmptyInputs,
                     BasicTestNxColClassTest,
                     BasicTestNxOrderInputs,
                     BasicTestColAlignSelf,
                     BasicTestColOrder,
                     OffsetTest,
                     OffsetTestTwoInputs,
                     OffsetTestThreeInputs,
                     OffsetTestFourInputs,
                     OffsetTestFourInputsWithZero
                    ],
      imports: [ NxGridModule ]
    }).compileComponents();
  }));

  it('should test with input cols 8,3,5,7', () => {
    expect(getClassesCreated(BasicTestNxColFourInputs, '.nx-grid__column-8.nx-grid__column-small-3.' +
        'nx-grid__column-medium-5.nx-grid__column-large-7.nx-grid__column-xlarge-7.nx-grid__column-2xlarge-7.nx-grid__column-3xlarge-7'))
      .not.toBeNull();
  });

  it('should test with input cols 7,2', () => {
    expect(getClassesCreated(BasicTestNxColTwoInputs, '.nx-grid__column-7.nx-grid__column-small-2' +
      '.nx-grid__column-medium-2.nx-grid__column-large-2.nx-grid__column-xlarge-2.nx-grid__column-2xlarge-2.nx-grid__column-3xlarge-2'))
      .not.toBeNull();
  });

  it('should test with input cols 7,3,4', () => {
    expect(getClassesCreated(BasicTestNxColTrheeInputs, '.nx-grid__column-7.nx-grid__column-small-3.' +
        'nx-grid__column-medium-4.nx-grid__column-large-4.nx-grid__column-xlarge-4.nx-grid__column-2xlarge-4.nx-grid__column-3xlarge-4'))
      .not.toBeNull();
  });

  it('should test with input cols 10', () => {
    expect(getClassesCreated(BasicTestNxColOneInputs, '.nx-grid__column-10'))
      .not.toBeNull();
  });

  it('should test with empty input cols', () => {
    expect(function() { TestBed.createComponent(BasicTestNxColEmptyInputs).detectChanges(); })
      .toThrow();
  });

  it('should test with class="test"', () => {
    expect(getClassesCreated(BasicTestNxColClassTest, '.nx-grid__column-10.test'))
      .not.toBeNull();
  });

  it('should test order directive', () => {
    expect(getClassesCreated(BasicTestNxOrderInputs, '.nx-grid__column-10.nx-flex-first.' +
    'nx-flex-small-first.nx-flex-medium-last.nx-flex-large-first'))
      .not.toBeNull();
  });

  it ('should test with input row and nxRowAlignItems (nxAlignSelf="start")', () => {
    expect(getClassesCreated(BasicTestColAlignSelf, '.nx-align-self-small-start.' +
    'nx-align-self-medium-start.nx-align-self-large-start')).not.toBeNull();
  });

  it ('should test with input row and nxRowAlignItems (nxColOrder="first")', () => {
    expect(getClassesCreated(BasicTestColOrder, '.nx-flex-first.nx-flex-small-first.' +
    'nx-flex-medium-first.nx-flex-large-first.nx-flex-xlarge-first.nx-flex-2xlarge-first.nx-flex-3xlarge-first')).not.toBeNull();
  });

  describe('nxColOffset', () => {
    it('should test with 9', () => {
      createTestComponent(OffsetTest);
      const col = getColumn();
      const expected = [
        'nx-grid--offset-9',
        'nx-grid__column-10'
      ];
      expect(sortedClassNames(col)).toEqual(expected);
    });

    it('should test with 9,6', () => {
      createTestComponent(OffsetTestTwoInputs);
      const col = getColumn();
      const expected = [
        'nx-grid--offset-2xlarge-6',
        'nx-grid--offset-3xlarge-6',
        'nx-grid--offset-9',
        'nx-grid--offset-large-6',
        'nx-grid--offset-medium-6',
        'nx-grid--offset-small-6',
        'nx-grid--offset-xlarge-6',
        'nx-grid__column-10'
      ];
      expect(sortedClassNames(col)).toEqual(expected);
    });

    it('should test with 9,6,5', () => {
      createTestComponent(OffsetTestThreeInputs);
      const col = getColumn();
      const expected = [
        'nx-grid--offset-2xlarge-5',
        'nx-grid--offset-3xlarge-5',
        'nx-grid--offset-9',
        'nx-grid--offset-large-5',
        'nx-grid--offset-medium-5',
        'nx-grid--offset-small-6',
        'nx-grid--offset-xlarge-5',
        'nx-grid__column-10'
      ];
      expect(sortedClassNames(col)).toEqual(expected);
    });

    it('should test with 9,6,5,3', () => {
      createTestComponent(OffsetTestFourInputs);
      const col = getColumn();
      const expected = [
        'nx-grid--offset-2xlarge-3',
        'nx-grid--offset-3xlarge-3',
        'nx-grid--offset-9',
        'nx-grid--offset-large-3',
        'nx-grid--offset-medium-5',
        'nx-grid--offset-small-6',
        'nx-grid--offset-xlarge-3',
        'nx-grid__column-10'
      ];
      expect(sortedClassNames(col)).toEqual(expected);
    });

    it('should test with 9,6,5,0', () => {
      createTestComponent(OffsetTestFourInputsWithZero);
      const col = getColumn();
      const expected = [
        'nx-grid--offset-2xlarge-0',
        'nx-grid--offset-3xlarge-0',
        'nx-grid--offset-9',
        'nx-grid--offset-large-0',
        'nx-grid--offset-medium-5',
        'nx-grid--offset-small-6',
        'nx-grid--offset-xlarge-0',
        'nx-grid__column-10'
      ];
      expect(sortedClassNames(col)).toEqual(expected);
    });
  });
});

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='8,3,5,7'></div></div></div>`
}) class BasicTestNxColFourInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='7,2'></div></div></div>`
}) class BasicTestNxColTwoInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='7,3,4'></div></div></div>`
}) class BasicTestNxColTrheeInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10'></div></div></div>`
}) class BasicTestNxColOneInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol=''></div></div></div>`
}) class BasicTestNxColEmptyInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' class='test'></div></div></div>`
}) class BasicTestNxColClassTest extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOrder='first,first,last,first'>Hello World 1</div></div></div>`
}) class BasicTestNxOrderInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxAlignSelf="start">Hello World 1</div></div></div>`
}) class BasicTestColAlignSelf extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOrder="first">Hello World 1</div></div></div>`
}) class BasicTestColOrder extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOffset="9">Hello World 1</div></div></div>`
}) class OffsetTest extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOffset="9,6">Hello World 1</div></div></div>`
}) class OffsetTestTwoInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOffset="9,6,5">Hello World 1</div></div></div>`
}) class OffsetTestThreeInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOffset="9,6,5,3">Hello World 1</div></div></div>`
}) class OffsetTestFourInputs extends DirectiveTest { }

@Component({
  template: `<div nxLayout='grid'><div nxRow='row'><div nxCol='10' nxColOffset="9,6,5,0">Hello World 1</div></div></div>`
}) class OffsetTestFourInputsWithZero extends DirectiveTest { }
