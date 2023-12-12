import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxPaginationComponent } from './pagination.component';
import { NxPaginationModule } from './pagination.module';
import { DefaultPaginationTexts, IPaginationTexts, NX_PAGINATION_TEXTS } from './pagination-texts';
import { NxPaginationUtils } from './pagination-utils';

const customTexts: IPaginationTexts = {
    previous: 'myPrevious',
    next: 'myNext',
    ofLabel: 'myOf',
    ariaLabel: 'myAriaLabel',
};

@Directive()
abstract class PaginationTest {
    @ViewChild(NxPaginationComponent) paginationInstance!: NxPaginationComponent;
    page = 1;
    prevPage = jasmine.createSpy('prevPageSpy');
    nextPage = jasmine.createSpy('nextPageSpy');
    goToPage = jasmine.createSpy('goToPageSpy');
    ariaLabel = '';
}

describe('NxPaginationComponent', () => {
    let fixture: ComponentFixture<PaginationTest>;
    let testInstance: PaginationTest;
    let paginationInstance: NxPaginationComponent;

    let nextArrow: HTMLLinkElement;
    let prevArrow: HTMLLinkElement;
    let nextArrowSimple: HTMLLinkElement;
    let prevArrowSimple: HTMLLinkElement;
    let currentPage: HTMLSpanElement;
    let totalPages: HTMLSpanElement;
    let active: HTMLLinkElement;
    let pageSeparator: HTMLSpanElement;

    let spanElement: DebugElement;
    let listElements: DebugElement[];
    let pageElements: DebugElement[];
    let mobileListElements: DebugElement[];
    let mobilePageElements: DebugElement[];

    let sliderElements: DebugElement[];

    function createTestComponent(component: Type<PaginationTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        paginationInstance = testInstance.paginationInstance;

        nextArrow = fixture.nativeElement.querySelector('.nx-pagination__link--next') as HTMLLinkElement;
        prevArrow = fixture.nativeElement.querySelector('.nx-pagination__link--previous') as HTMLLinkElement;
        nextArrowSimple = fixture.nativeElement.querySelector('.nx-pagination-compact__next') as HTMLLinkElement;
        prevArrowSimple = fixture.nativeElement.querySelector('.nx-pagination-compact__previous') as HTMLLinkElement;
        currentPage = fixture.nativeElement.querySelector('.nx-pagination-compact__current-page') as HTMLSpanElement;
        totalPages = fixture.nativeElement.querySelector('.nx-pagination-compact__total-pages') as HTMLSpanElement;
        active = fixture.nativeElement.querySelector('.is-active') as HTMLLinkElement;
        pageSeparator = fixture.nativeElement.querySelector('.nx-pagination-compact__page-separator') as HTMLSpanElement;

        spanElement = fixture.debugElement.query(By.css('.nx-pagination-compact__direction-label'));
        listElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item:not(.nx-pagination__item--mobile)');
        mobileListElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item.nx-pagination__item--mobile');
        pageElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item:not(.nx-pagination__item--mobile) .nx-pagination--number');
        mobilePageElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item.nx-pagination__item--mobile .nx-pagination--number');

        sliderElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item:not(.nx-pagination__item--mobile) .nx-pagination--icon');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxPaginationModule, BidiModule],
            declarations: [
                SimplePagination,
                SimplePaginationBeginat10,
                AdvancedPagination,
                AdvancedPaginationLess10,
                AdvancedPaginationMore10,
                AdvancedPaginationBeginat10,
                LocalizationToken,
                SimplePaginationWithDirection,
                AdvancedPaginationWithDirection,
                SliderPagination,
                SliderPaginationBeginat6,
            ],
            providers: [NxPaginationUtils],
        }).compileComponents();
    }));

    describe('helpers', () => {
        it('should always yield the minimal reachable page', () => {
            createTestComponent(SimplePagination);
            expect(testInstance.paginationInstance.getMin()).toBe(1);

            testInstance.paginationInstance.totalNumberPages = 0;
            expect(testInstance.paginationInstance.getMin()).toBe(0);
        });
    });

    describe('simple variation', () => {
        it('displays a simple pagination', () => {
            createTestComponent(SimplePagination);
            expect(currentPage && totalPages && nextArrowSimple).not.toBeNull();
            expect(currentPage.textContent).toContain('1');
            expect(totalPages.textContent).toContain('21');
            expect(spanElement.nativeElement.textContent).toBe(` ${DefaultPaginationTexts.previous} `);
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(SimplePagination);
            fixture.detectChanges();
            nextArrowSimple.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(SimplePagination);
            fixture.detectChanges();
            nextArrowSimple.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('should emit an event when click prev arrow', () => {
            createTestComponent(SimplePaginationBeginat10);
            fixture.detectChanges();
            expect(currentPage && totalPages && prevArrowSimple).not.toBeNull();
            expect(currentPage.textContent?.trim()).toBe('10');
            prevArrowSimple.click();
            expect(testInstance.prevPage).toHaveBeenCalled();
        });

        it('should recalculate totalNumberPages when nxCount changes', () => {
            createTestComponent(SimplePagination);
            const simpleInstance = testInstance as SimplePagination;
            simpleInstance.count = 100;
            fixture.detectChanges();
            expect(paginationInstance.totalNumberPages).toBe(10);
        });
    });

    describe('advanced variation', () => {
        it('displays an advanced pagination', () => {
            createTestComponent(AdvancedPagination);
            expect(pageElements && nextArrow).not.toBeNull();
            expect(listElements).not.toHaveSize(0);
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(AdvancedPagination);
            fixture.detectChanges();
            nextArrow.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(AdvancedPagination);
            fixture.detectChanges();
            nextArrow.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('displays an advanced pagination with less than 10 pages', () => {
            createTestComponent(AdvancedPaginationLess10);
            expect(pageElements && nextArrow).not.toBeNull();
            expect(listElements).toHaveSize(7);
        });

        it('displays an advanced pagination with more than 10 pages', () => {
            createTestComponent(AdvancedPaginationMore10);
            expect(pageElements && nextArrow).not.toBeNull();
            expect(listElements).toHaveSize(10);
            expect(pageElements).toHaveSize(5);
        });

        it('should emit an event when click prev arrow', () => {
            createTestComponent(AdvancedPaginationBeginat10);
            fixture.detectChanges();
            expect(pageElements && prevArrow).not.toBeNull();
            expect(active.textContent?.trim()).toBe('10');
            prevArrow.click();
            expect(testInstance.prevPage).toHaveBeenCalled();
        });

        it('should emit an event when click a page', () => {
            createTestComponent(AdvancedPagination);
            fixture.detectChanges();
            const pages = fixture.debugElement.nativeElement.querySelector('.nx-pagination--number');
            pages.click();
            expect(testInstance.goToPage).toHaveBeenCalled();
        });

        it('should emit an event when click a page', () => {
            createTestComponent(AdvancedPagination);
            const pages = fixture.debugElement.nativeElement.querySelector('.nx-pagination--number');
            pages.click();
            expect(testInstance.goToPage).toHaveBeenCalled();
        });

        it('should emit an event when click on arrow-last', () => {
            createTestComponent(AdvancedPagination);
            const arrowLast = fixture.debugElement.nativeElement.querySelector('.nx-pagination__link--last');
            arrowLast.click();
            fixture.detectChanges();
            expect(testInstance.goToPage).toHaveBeenCalledWith(21);
        });

        it('should emit an event when click on arrow-first', () => {
            createTestComponent(AdvancedPagination);
            testInstance.paginationInstance.page = 5;
            fixture.detectChanges();
            const arrowFirst = fixture.debugElement.nativeElement.querySelector('.nx-pagination__link--first');
            arrowFirst.click();
            expect(testInstance.goToPage).toHaveBeenCalledWith(1);
        });
    });

    describe('slider variation', () => {
        it('displays a slider pagination', () => {
            createTestComponent(SliderPagination);
            expect(sliderElements).not.toBeNull();
            expect(listElements).not.toHaveSize(0);
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(SliderPagination);
            fixture.detectChanges();
            nextArrow.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('should emit an event when click next arrow', () => {
            createTestComponent(SliderPagination);
            fixture.detectChanges();
            nextArrow.click();
            expect(testInstance.nextPage).toHaveBeenCalled();
        });

        it('should emit an event when click prev arrow', () => {
            createTestComponent(SliderPaginationBeginat6);
            fixture.detectChanges();
            prevArrow.click();
            expect(testInstance.prevPage).toHaveBeenCalled();
        });

        it('should emit an event when click a page', () => {
            createTestComponent(SliderPagination);
            fixture.detectChanges();
            const pages = fixture.debugElement.nativeElement.querySelector('.nx-pagination--icon');
            pages.click();
            expect(testInstance.goToPage).toHaveBeenCalled();
        });

        it('should emit an event when click a page', () => {
            createTestComponent(SliderPagination);
            const pages = fixture.debugElement.nativeElement.querySelector('.nx-pagination--icon');
            pages.click();
            expect(testInstance.goToPage).toHaveBeenCalled();
        });
    });

    describe('mobile pagination', () => {
        it('should display advanced mobile pagination correctly', waitForAsync(() => {
            createTestComponent(AdvancedPagination);
            fixture.detectChanges();
            expect(mobileListElements).toHaveSize(3);
            expect(mobilePageElements).toHaveSize(3);
        }));
    });

    describe('localization', () => {
        it('should use injected NX_PAGINATION_TEXTS token', () => {
            TestBed.overrideProvider(NX_PAGINATION_TEXTS, { useValue: customTexts });
            createTestComponent(LocalizationToken);

            expect(paginationInstance.paginationTexts).toEqual(customTexts);
            expect(nextArrowSimple.querySelector('.nx-pagination-compact__direction-label')?.textContent?.trim()).toBe('myNext');
            expect(prevArrowSimple.querySelector('.nx-pagination-compact__direction-label')?.textContent?.trim()).toBe('myPrevious');
            expect(pageSeparator.textContent?.trim()).toBe('myOf');

            const navElement = fixture.nativeElement.querySelector('.nx-pagination-compact') as HTMLElement;

            expect(navElement.attributes.getNamedItem('aria-label')?.value).toBe('myAriaLabel');
        });
    });

    describe('programmatic change', () => {
        it('should update on page change', () => {
            createTestComponent(SimplePagination);
            testInstance.paginationInstance.page = 3;
            fixture.detectChanges();
            expect(currentPage.textContent).toContain('3');
        });

        it('should update on count change', () => {
            createTestComponent(SimplePagination);
            testInstance.paginationInstance.count = 100;
            fixture.detectChanges();
            expect(totalPages.textContent).toContain('10');
        });

        it('should update on perPage change', () => {
            createTestComponent(SimplePagination);
            testInstance.paginationInstance.perPage = 5;
            fixture.detectChanges();
            expect(totalPages.textContent).toContain('42');
        });

        it('should update on type change', () => {
            createTestComponent(SimplePagination);
            testInstance.paginationInstance.type = 'advanced';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.nx-pagination__container')).toBeTruthy();
        });
    });

    describe('directionality change', () => {
        it('triggers change detection', () => {
            createTestComponent(SimplePaginationWithDirection);
            fixture.detectChanges();
            spyOn((paginationInstance as any)._cdr, 'detectChanges');
            (testInstance as SimplePaginationWithDirection).direction = 'rtl';
            fixture.detectChanges();
            expect((paginationInstance as any)._cdr.detectChanges).toHaveBeenCalledTimes(1);
        });

        it('updates arrow icons for simple pagination', () => {
            createTestComponent(SimplePaginationWithDirection);
            fixture.detectChanges();
            const prevArrowSimpleIcon = prevArrowSimple.querySelector('nx-icon');
            const nextArrowSimpleIcon = nextArrowSimple.querySelector('nx-icon');
            expect(prevArrowSimpleIcon?.getAttribute('ng-reflect-name')).toBe('arrow-left');
            expect(nextArrowSimpleIcon?.getAttribute('ng-reflect-name')).toBe('arrow-right');
            (testInstance as SimplePaginationWithDirection).direction = 'rtl';
            fixture.detectChanges();
            expect(prevArrowSimpleIcon?.getAttribute('ng-reflect-name')).toBe('arrow-right');
            expect(nextArrowSimpleIcon?.getAttribute('ng-reflect-name')).toBe('arrow-left');
        });

        it('updates arrow icons for advanced pagination', () => {
            createTestComponent(AdvancedPaginationWithDirection);
            fixture.detectChanges();
            const prevArrowIcon = prevArrow.querySelector('nx-icon');
            const nextArrowIcon = nextArrow.querySelector('nx-icon');
            const lastArrowIcon = fixture.debugElement.nativeElement.querySelector('.nx-pagination__link--last nx-icon');
            const firstArrowIcon = fixture.debugElement.nativeElement.querySelector('.nx-pagination__link--first nx-icon');
            expect(prevArrowIcon?.getAttribute('ng-reflect-name')).toBe('arrow-left');
            expect(nextArrowIcon?.getAttribute('ng-reflect-name')).toBe('arrow-right');
            expect(lastArrowIcon.getAttribute('ng-reflect-name')).toBe('arrow-last');
            expect(firstArrowIcon.getAttribute('ng-reflect-name')).toBe('arrow-first');
            (testInstance as AdvancedPaginationWithDirection).direction = 'rtl';
            fixture.detectChanges();
            expect(prevArrowIcon?.getAttribute('ng-reflect-name')).toBe('arrow-right');
            expect(nextArrowIcon?.getAttribute('ng-reflect-name')).toBe('arrow-left');
            expect(lastArrowIcon.getAttribute('ng-reflect-name')).toBe('arrow-first');
            expect(firstArrowIcon.getAttribute('ng-reflect-name')).toBe('arrow-last');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(SimplePagination);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should only render one nav element', () => {
            createTestComponent(AdvancedPagination);
            (testInstance as AdvancedPagination).type = 'simple';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('nav').length).toBe(1);
            (testInstance as AdvancedPagination).type = 'advanced';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('nav').length).toBe(1);
        });

        it('should use ariaLabel input over paginationTexts', () => {
            createTestComponent(AdvancedPagination);
            testInstance.ariaLabel = 'custom aria-label';
            fixture.detectChanges();

            const navElement = fixture.nativeElement.querySelector('nav') as HTMLElement;

            expect(navElement.attributes.getNamedItem('aria-label')?.value).toBe('custom aria-label');
        });

        it('should use paginationTexts when ariaLabel input is falsy', () => {
            createTestComponent(AdvancedPagination);
            testInstance.ariaLabel = '';
            fixture.detectChanges();

            const navElement = fixture.nativeElement.querySelector('nav') as HTMLElement;

            expect(navElement.attributes.getNamedItem('aria-label')?.value).toBe(DefaultPaginationTexts.ariaLabel);
        });
    });
});

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            [type]="type"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
            [ariaLabel]="ariaLabel"
        >
        </nx-pagination>
    `,
})
class AdvancedPagination extends PaginationTest {
    count = 210;
    perPage = 10;
    type = 'advanced';
}

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        ></nx-pagination>
    `,
})
class SimplePagination extends PaginationTest {
    count = 210;
    perPage = 10;
}

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            type="advanced"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        >
        </nx-pagination>
    `,
})
class AdvancedPaginationLess10 extends PaginationTest {
    count = 30;
    perPage = 10;
    type = 'advanced';
}

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            type="advanced"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        >
        </nx-pagination>
    `,
})
class AdvancedPaginationMore10 extends PaginationTest {
    count = 210;
    perPage = 10;
    type = 'advanced';
}

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            type="advanced"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        >
        </nx-pagination>
    `,
})
class AdvancedPaginationBeginat10 extends PaginationTest {
    count = 210;
    page = 10;
    perPage = 10;
    type = 'advanced';
}

@Component({
    template: `
        <nx-pagination
            [count]="count"
            [page]="page"
            [perPage]="perPage"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        ></nx-pagination>
    `,
})
class SimplePaginationBeginat10 extends PaginationTest {
    count = 210;
    page = 10;
    perPage = 10;
}

@Component({
    template: `
        <nx-pagination [count]="count" [page]="2" [perPage]="perPage" (goPrev)="prevPage()" (goNext)="nextPage()" (goPage)="goToPage($event)"></nx-pagination>
    `,
    providers: [{ provide: NX_PAGINATION_TEXTS, useValue: customTexts }],
})
class LocalizationToken extends PaginationTest {
    count = 210;
    perPage = 10;
}

@Component({
    template: `
        <div [dir]="direction">
            <nx-pagination
                [count]="count"
                [page]="page"
                [perPage]="perPage"
                (goPrev)="prevPage()"
                (goNext)="nextPage()"
                (goPage)="goToPage($event)"
            ></nx-pagination>
        </div>
    `,
})
class SimplePaginationWithDirection extends PaginationTest {
    direction: Direction = 'ltr';
    count = 210;
    perPage = 10;
}

@Component({
    template: `
        <div [dir]="direction">
            <nx-pagination
                [count]="count"
                [page]="page"
                [perPage]="perPage"
                [type]="type"
                (goPrev)="prevPage()"
                (goNext)="nextPage()"
                (goPage)="goToPage($event)"
            >
            </nx-pagination>
        </div>
    `,
})
class AdvancedPaginationWithDirection extends PaginationTest {
    direction: Direction = 'ltr';
    count = 210;
    perPage = 10;
    type = 'advanced';
}

@Component({
    template: `
        <nx-pagination
            [count]="slides"
            [page]="activeSlide"
            type="slider"
            (goPrev)="prevPage()"
            (goNext)="nextPage()"
            (goPage)="goToPage($event)"
        ></nx-pagination>
    `,
})
class SliderPagination extends PaginationTest {
    slides = 6;
    activeSlide = 1;
}

@Component({
    template: `
        <nx-pagination [count]="slides" [page]="activeSlide" type="slider" (goPrev)="prevPage()" (goNext)="nextPage()" (goPage)="goToPage($event)">
        </nx-pagination>
    `,
})
class SliderPaginationBeginat6 extends PaginationTest {
    slides = 6;
    activeSlide = 6;
}
