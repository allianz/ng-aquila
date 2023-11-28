import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxGridModule } from './grid.module';
import { NxLayoutComponent } from './layout.component';

@Directive()
abstract class DirectiveTest {
    @ViewChild(NxLayoutComponent) layoutInstance!: NxLayoutComponent;
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
            declarations: [
                BasicLayout,
                BasicContainerQueryGridLayout,
                BasicGridLayout,
                BasicGridLayoutClassTest,
                BasicNoGutters,
                BasicNoPadding,
                BasicMaxWidth,
                BasicCombinate,
                Basic2Combinate,
                BasicCompleteReverse,
                DynamicLayout,
            ],
            imports: [NxGridModule],
        }).compileComponents();
    }));

    it('should test with input nxLayout="grid"', () => {
        expect(getClassesCreated(BasicGridLayout)).toBe('nx-grid nx-grid--media-query');
    });

    it('should include container-query css class for Container Query Grid ', () => {
        expect(getClassesCreated(BasicContainerQueryGridLayout)).toBe('nx-grid nx-grid--container-query');
    });

    it('should test with input nxLayout="grid" and class="test"', () => {
        expect(getClassesCreated(BasicGridLayoutClassTest)).toBe('nx-grid nx-grid--media-query test');
    });

    it('should test with input nxLayout="grid nogutters"', () => {
        expect(getClassesCreated(BasicNoGutters)).toBe('nx-grid nx-grid--media-query nx-grid--no-gutters');
    });

    it('should test with input nxLayout="grid nopadding"', () => {
        expect(getClassesCreated(BasicNoPadding)).toBe('nx-grid nx-grid--media-query nx-grid--no-padding');
    });

    it('should test with input nxLayout="grid maxwidth"', () => {
        expect(getClassesCreated(BasicMaxWidth)).toBe('nx-grid nx-grid--max-width nx-grid--media-query');
    });

    it('should test with input "grid" maxwidth nogutters', () => {
        expect(getClassesCreated(BasicCombinate)).toBe('nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters');
    });

    it('should test with input "grid" nogutters maxwidth', () => {
        expect(getClassesCreated(Basic2Combinate)).toBe('nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters');
    });

    it('should test with input nogutters grid maxwidth', () => {
        expect(getClassesCreated(BasicCompleteReverse)).toBe('nx-grid nx-grid--max-width nx-grid--media-query nx-grid--no-gutters');
    });

    it('should update class names after input change', () => {
        createTestComponent(DynamicLayout);
        (testInstance as DynamicLayout).layout = 'grid nogutters';
        fixture.detectChanges();
        expect(sortedClassNames(divNativeElement)).toBe('nx-grid nx-grid--media-query nx-grid--no-gutters');
    });
});

@Component({
    template: `<div nxLayout=""></div>`,
})
class BasicLayout extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid"></div>`,
})
class BasicGridLayout extends DirectiveTest {}
@Component({
    template: `<div nxLayout="grid" [containerQuery]="true"></div>`,
})
class BasicContainerQueryGridLayout extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid" class="test"></div>`,
})
class BasicGridLayoutClassTest extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid nogutters"></div>`,
})
class BasicNoGutters extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid maxwidth"></div>`,
})
class BasicMaxWidth extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid maxwidth nogutters"></div>`,
})
class BasicCombinate extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid nogutters maxwidth"></div>`,
})
class Basic2Combinate extends DirectiveTest {}

@Component({
    template: `<div nxLayout="maxwidth grid nogutters"></div>`,
})
class BasicCompleteReverse extends DirectiveTest {}

@Component({
    template: `<div nxLayout="grid nopadding"></div>`,
})
class BasicNoPadding extends DirectiveTest {}

@Component({
    template: `<div [nxLayout]="layout"></div>`,
})
class DynamicLayout extends DirectiveTest {
    layout = 'grid';
}
