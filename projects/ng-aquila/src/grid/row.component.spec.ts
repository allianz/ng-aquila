import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement, Component, ViewChild, Type, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NxLayoutComponent } from './layout.component';
import { NxGridModule } from './grid.module';

// tslint:disable:component-class-suffix

@Directive()
abstract class DirectiveTest {
    @ViewChild(NxLayoutComponent) layoutInstance: NxLayoutComponent;
}

describe('NxRowDirective', () => {

    let fixture: ComponentFixture<DirectiveTest>;
    let testInstance: DirectiveTest;
    let divInstance: NxLayoutComponent;
    let divNativeElement: HTMLButtonElement;

    function createTestComponent(component: Type<DirectiveTest>) {
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      testInstance = fixture.componentInstance;
      divInstance = testInstance.layoutInstance;
      divNativeElement = <HTMLButtonElement> fixture.nativeElement.querySelector('div');
    }

    function getClassesCreated(component: Type<DirectiveTest>, input: string): DebugElement {
      createTestComponent(component);
      return fixture.debugElement.query(By.css(input));
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ BasicRowDefault,
                          BasicRow,
                          BasicRowClassTest,
                          BasicRowReverse,
                          BasicRowIncorrect,
                          BasicRowWrap,
                          BasicRowNoWrap,
                          BasicRowWrapReverse,
                          BasicRowJustifyStart,
                          BasicRowJustifyEnd,
                          BasicRowContentStart,
                          BasicRowContentEnd,
                          BasicRowItemsStart,
                          BasicRowItemsEnd],
          imports: [ NxGridModule ]
        })
        .compileComponents();
      }
    ));

    it('should test with any input', () => {
        expect(function() { TestBed.createComponent(BasicRowIncorrect).detectChanges(); } )
            .toThrow(new Error('nxRow is incorrect'));
    });

    it('should test with input nxRow', () => {
        expect(getClassesCreated(BasicRowDefault, '.nx-grid__row')).not.toBeNull();
    });

    it('should test with input nxRow="row"', () => {
        expect(getClassesCreated(BasicRow, '.nx-grid__row')).not.toBeNull();
    });

    it('should test with input nxRow="row" and class="test"', () => {
      expect(getClassesCreated(BasicRowClassTest, '.nx-grid__row.test')).not.toBeNull();
  });

    it('should test with input nxLayout="row-reverse"', () => {
        expect(getClassesCreated(BasicRowReverse, '.nx-grid__row-reverse')).not.toBeNull();
    });

    it ('should test with input row and nxWrap (nxWrap="wrap")', () => {
        expect(getClassesCreated(BasicRowWrap, '.nx-grid__row.nx-flex-wrap.nx-flex-small-wrap.nx-flex-medium-wrap.nx-flex-large-wrap'))
            .not.toBeNull();
    });

    it ('should test with input row and nxWrap (nxWrap="nowrap,nowrap,wrap,reverse")', () => {
        expect(getClassesCreated(BasicRowNoWrap, '.nx-grid__row.nx-flex-nowrap.nx-flex-small-nowrap' +
            '.nx-flex-medium-wrap.nx-flex-large-wrap-reverse'))
        .not.toBeNull();
    });

    it ('should test with input row and nxWrap (nxWrap="wrap,reverse")', () => {
        expect(getClassesCreated(BasicRowWrapReverse,
          '.nx-grid__row.nx-flex-wrap.nx-flex-small-wrap-reverse.nx-flex-medium-wrap-reverse.nx-flex-large-wrap-reverse'))
            .not.toBeNull();
    });

    it ('should test with input row and nxRowJustify (nxRowJustify="start")', () => {
        expect(getClassesCreated(BasicRowJustifyStart, '.nx-grid__row.nx-justify-content-start.nx-justify-content-small-start' +
            '.nx-justify-content-medium-start.nx-justify-content-large-start')).not.toBeNull();
    });

    it ('should test with input row and nxRowJustify (nxRowJustify="around,end")', () => {
        expect(getClassesCreated(BasicRowJustifyEnd, '.nx-grid__row.nx-justify-content-around.nx-justify-content-small-end' +
        '.nx-justify-content-medium-end.nx-justify-content-large-end')).not.toBeNull();
    });

    it ('should test with input row and nxRowAlignContent (nxRowAlignContent="start,start,end,around")', () => {
        expect(getClassesCreated(BasicRowContentStart, '.nx-grid__row.nx-align-content-start.nx-align-content-small-start' +
            '.nx-align-content-medium-end.nx-align-content-large-around')).not.toBeNull();
    });

    it ('should test with input row and nxRowAlignContent (nxRowAlignContent="end")', () => {
        expect(getClassesCreated(BasicRowContentEnd, '.nx-grid__row.nx-align-content-end.nx-align-content-small-end' +
        '.nx-align-content-medium-end.nx-align-content-large-end')).not.toBeNull();
    });

    it ('should test with input row and nxRowAlignItems (nxRowAlignItems="start,start,stretch")', () => {
        expect(getClassesCreated(BasicRowItemsStart, '.nx-grid__row.nx-align-items-start.nx-align-items-small-start' +
        '.nx-align-items-medium-stretch.nx-align-items-large-stretch')).not.toBeNull();
    });

    it ('should test with input row and nxRowAlignItems (nxRowAlignItems="end")', () => {
        expect(getClassesCreated(BasicRowItemsEnd, '.nx-grid__row.nx-align-items-end.nx-align-items-small-end.nx-align-items-medium-end' +
        '.nx-align-items-large-end')).not.toBeNull();
    });
});

  @Component( {
    template: `<div nxLayout='grid'><div nxRow></div></div>`
  }) class BasicRowDefault extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='test'></div></div>`
  }) class BasicRowIncorrect extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row'></div></div>`
  }) class BasicRow extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' class='test'></div></div>`
  }) class BasicRowClassTest extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row-reverse'></div></div>`
  }) class BasicRowReverse extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowWrap='wrap'></div></div>`
  }) class BasicRowWrap extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowWrap='wrap,reverse'></div></div>`
  }) class BasicRowWrapReverse extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowWrap='nowrap,nowrap,wrap,reverse'></div></div>`
  }) class BasicRowNoWrap extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowJustify='start,start,start,start' ></div></div>`
  }) class BasicRowJustifyStart extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowJustify='around,end'></div></div>`
  }) class BasicRowJustifyEnd extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowAlignContent='start,start,end,around'></div></div>`
  }) class BasicRowContentStart extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowAlignContent='end'></div></div>`
  }) class BasicRowContentEnd extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowAlignItems='start,start,stretch'></div></div>`
  }) class BasicRowItemsStart extends DirectiveTest {}

  @Component( {
    template: `<div nxLayout='grid'><div nxRow='row' nxRowAlignItems='end'></div></div>`
  }) class BasicRowItemsEnd extends DirectiveTest {}
