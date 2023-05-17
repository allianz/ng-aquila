import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { NxAutocompleteModule } from '../autocomplete/autocomplete.module';
import { NxPageSearchComponent } from './page-search.component';
import { NxPageSearchModule } from './page-search.module';

describe('NxPageSearchComponent', () => {
    let fixture: ComponentFixture<PageSearchTestComponent>;
    let testInstance: PageSearchTestComponent;

    function createTestComponent(component: Type<PageSearchTestComponent>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
    }

    it('should project the content', fakeAsync(() => {
        createTestComponent(PageSearchSimpleComponent);
        const input = fixture.nativeElement.querySelector('input');
        expect(input).toBeTruthy();
    }));

    it('should display the button in default', fakeAsync(() => {
        createTestComponent(PageSearchSimpleComponent);
        const button = fixture.nativeElement.querySelector('button');
        expect(button).toBeTruthy();
    }));

    it('should hide the button if requested', fakeAsync(() => {
        createTestComponent(PageSearchHideButtonComponent);
        const button = fixture.nativeElement.querySelector('button');
        expect(button).toBeFalsy();
    }));

    it('should dispatch the click event', fakeAsync(() => {
        createTestComponent(PageSearchSimpleComponent);
        const button = fixture.nativeElement.querySelector('button');
        spyOn(testInstance.pageSearch.buttonClick, 'emit');
        button.click();
        expect(testInstance.pageSearch.buttonClick.emit).toHaveBeenCalled();
    }));

    describe('programmatic change', () => {
        it('should update on buttonLabel change', () => {
            createTestComponent(PageSearchSimpleComponent);
            testInstance.pageSearch.buttonLabel = 'Custom label';
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(button.textContent.trim()).toBe('Custom label');
        });

        it('should update on hideSearchButton change', () => {
            createTestComponent(PageSearchSimpleComponent);
            testInstance.pageSearch.hideSearchButton = true;
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(button).toBeFalsy();
        });

        it('should update on buttonLayout change', () => {
            createTestComponent(PageSearchSimpleComponent);
            testInstance.pageSearch.buttonLayout = '6,6,6,2';
            fixture.detectChanges();
            const wrapper = fixture.nativeElement.querySelector('.nx-pagesearch__actions');
            expect(wrapper.getAttribute('ng-reflect-col')).toBe('6,6,6,2');
        });

        it('should update on _contentLayout change', () => {
            createTestComponent(PageSearchSimpleComponent);
            testInstance.pageSearch.contentLayout = '6,6,6,2';
            fixture.detectChanges();
            const wrapper = fixture.nativeElement.querySelector('.nx-pagesearch--content');
            expect(wrapper.getAttribute('ng-reflect-col')).toBe('6,6,6,2');
        });
    });

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PageSearchSimpleComponent, PageSearchHideButtonComponent],
            imports: [NxPageSearchModule, NxAutocompleteModule],
        }).compileComponents();
    }));
});

@Directive()
class PageSearchTestComponent {
    @ViewChild(NxPageSearchComponent) pageSearch!: NxPageSearchComponent;
}

@Component({
    template: `
        <nx-page-search buttonLabel="Search">
            <input />
        </nx-page-search>
    `,
})
class PageSearchSimpleComponent extends PageSearchTestComponent {}

@Component({
    template: `
        <nx-page-search buttonLabel="Search" [hideSearchButton]="true">
            <input />
        </nx-page-search>
    `,
})
class PageSearchHideButtonComponent extends PageSearchTestComponent {}
