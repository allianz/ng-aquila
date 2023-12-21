import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxGridModule } from './grid.module';
import { NxLayoutComponent } from './layout.component';

@Directive()
abstract class DirectiveTest {
    @ViewChild(NxLayoutComponent) layoutInstance!: NxLayoutComponent;
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
        divNativeElement = fixture.nativeElement.querySelector('div') as HTMLButtonElement;
    }

    function getElementByClass(input: string): DebugElement {
        return fixture.debugElement.query(By.css(input));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                BasicRowDefault,
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
                BasicRowItemsEnd,
                DynamicTest,
                RowWithoutLayout,
            ],
            imports: [NxGridModule],
        }).compileComponents();
    }));

    it('should test with any input', () => {
        expect(() => {
            TestBed.createComponent(BasicRowIncorrect).detectChanges();
        }).toThrow(new Error('nxRow is incorrect'));
    });

    it('should test with input nxRow', () => {
        createTestComponent(BasicRowDefault);
        expect(getElementByClass('.nx-grid__row')).not.toBeNull();
    });

    it('should test with input nxRow="row"', () => {
        createTestComponent(BasicRow);
        expect(getElementByClass('.nx-grid__row')).not.toBeNull();
    });

    it('should test with input nxRow="row" and class="test"', () => {
        createTestComponent(BasicRowClassTest);
        expect(getElementByClass('.nx-grid__row.test')).not.toBeNull();
    });

    it('should test with input nxLayout="row-reverse"', () => {
        createTestComponent(BasicRowReverse);
        expect(getElementByClass('.nx-grid__row-reverse')).not.toBeNull();
    });

    it('should test with input row and nxWrap (nxWrap="wrap")', () => {
        createTestComponent(BasicRowWrap);

        expect(getElementByClass('.nx-grid__row.nx-flex-wrap.nx-flex-small-wrap.nx-flex-medium-wrap.nx-flex-large-wrap')).not.toBeNull();
    });

    it('should test with input row and nxWrap (nxWrap="nowrap,nowrap,wrap,reverse")', () => {
        createTestComponent(BasicRowNoWrap);

        expect(getElementByClass('.nx-grid__row.nx-flex-nowrap.nx-flex-small-nowrap.nx-flex-medium-wrap.nx-flex-large-wrap-reverse')).not.toBeNull();
    });

    it('should test with input row and nxWrap (nxWrap="wrap,reverse")', () => {
        createTestComponent(BasicRowWrapReverse);

        expect(
            getElementByClass('.nx-grid__row.nx-flex-wrap.nx-flex-small-wrap-reverse.nx-flex-medium-wrap-reverse.nx-flex-large-wrap-reverse'),
        ).not.toBeNull();
    });

    it('should test with input row and rowJustify (rowJustify="start")', () => {
        createTestComponent(BasicRowJustifyStart);
        expect(
            getElementByClass(
                '.nx-grid__row.nx-justify-content-start.nx-justify-content-small-start.nx-justify-content-medium-start.nx-justify-content-large-start',
            ),
        ).not.toBeNull();
    });

    it('should test with input row and rowJustify (rowJustify="around,end")', () => {
        createTestComponent(BasicRowJustifyEnd);
        expect(
            getElementByClass(
                '.nx-grid__row.nx-justify-content-around.nx-justify-content-small-end.nx-justify-content-medium-end.nx-justify-content-large-end',
            ),
        ).not.toBeNull();
    });

    it('should test with input row and rowAlignContent (rowAlignContent="start,start,end,around")', () => {
        createTestComponent(BasicRowContentStart);
        expect(
            getElementByClass('.nx-grid__row.nx-align-content-start.nx-align-content-small-start.nx-align-content-medium-end.nx-align-content-large-around'),
        ).not.toBeNull();
    });

    it('should test with input row and rowAlignContent (rowAlignContent="end")', () => {
        createTestComponent(BasicRowContentEnd);
        expect(
            getElementByClass('.nx-grid__row.nx-align-content-end.nx-align-content-small-end.nx-align-content-medium-end.nx-align-content-large-end'),
        ).not.toBeNull();
    });

    it('should test with input row and rowAlignItems (rowAlignItems="start,start,stretch")', () => {
        createTestComponent(BasicRowItemsStart);
        expect(
            getElementByClass('.nx-grid__row.nx-align-items-start.nx-align-items-small-start.nx-align-items-medium-stretch.nx-align-items-large-stretch'),
        ).not.toBeNull();
    });

    it('should test with input row and rowAlignItems (rowAlignItems="end")', () => {
        createTestComponent(BasicRowItemsEnd);
        expect(
            getElementByClass('.nx-grid__row.nx-align-items-end.nx-align-items-small-end.nx-align-items-medium-end.nx-align-items-large-end'),
        ).not.toBeNull();
    });

    it('should not fail when no nxLayout is present', () => {
        expect(() => {
            createTestComponent(RowWithoutLayout);
        }).not.toThrow();
    });

    describe('dynamic inputs', () => {
        it('should update all inputs', () => {
            createTestComponent(DynamicTest);
            const test = testInstance as DynamicTest;

            expect(
                getElementByClass(['.nx-grid__row', '.nx-align-items-end', '.nx-align-content-end', '.nx-justify-content-end', '.nx-flex-wrap'].join('')),
            ).not.toBeNull();

            test.row = 'row-reverse';
            test.alignItems = 'start';
            test.alignContent = 'start';
            test.justify = 'start';
            test.wrap = 'reverse';

            fixture.detectChanges();

            expect(
                getElementByClass(
                    ['.nx-grid__row-reverse', '.nx-align-items-start', '.nx-align-content-start', '.nx-justify-content-start', '.nx-flex-wrap-reverse'].join(
                        '',
                    ),
                ),
            ).not.toBeNull();
        });
    });
});

@Component({
    template: `<div nxLayout="grid"><div nxRow></div></div>`,
})
class BasicRowDefault extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid"><div nxRow="test"></div></div>`,
})
class BasicRowIncorrect extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid"><div nxRow="row"></div></div>`,
})
class BasicRow extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid"><div nxRow="row" class="test"></div></div>`,
})
class BasicRowClassTest extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid"><div nxRow="row-reverse"></div></div>`,
})
class BasicRowReverse extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowWrap="wrap"></div>
    </div>`,
})
class BasicRowWrap extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowWrap="wrap,reverse"></div>
    </div>`,
})
class BasicRowWrapReverse extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowWrap="nowrap,nowrap,wrap,reverse"></div>
    </div>`,
})
class BasicRowNoWrap extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowJustify="start,start,start,start"></div>
    </div>`,
})
class BasicRowJustifyStart extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowJustify="around,end"></div>
    </div>`,
})
class BasicRowJustifyEnd extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowAlignContent="start,start,end,around"></div>
    </div>`,
})
class BasicRowContentStart extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowAlignContent="end"></div>
    </div>`,
})
class BasicRowContentEnd extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowAlignItems="start,start,stretch"></div>
    </div>`,
})
class BasicRowItemsStart extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div nxRow="row" rowAlignItems="end"></div>
    </div>`,
})
class BasicRowItemsEnd extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid">
        <div [nxRow]="row" [rowAlignItems]="alignItems" [rowAlignContent]="alignContent" [rowJustify]="justify" [rowWrap]="wrap"></div>
    </div>`,
})
class DynamicTest extends DirectiveTest {
    row = 'row';
    alignItems = 'end';
    alignContent = 'end';
    justify = 'end';
    wrap = 'wrap';
}

@Component({
    template: `<div nxRow="row"></div>`,
})
class RowWithoutLayout extends DirectiveTest {}
