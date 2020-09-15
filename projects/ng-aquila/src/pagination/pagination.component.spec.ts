import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { NxPaginationComponent } from './pagination.component';
import { NxPaginationModule } from './pagination.module';
import { By } from '@angular/platform-browser';
import * as axe from 'axe-core';
import { NX_PAGINATION_TEXTS, IPaginationTexts } from './pagination-texts';
import { NxPaginationUtils } from './pagination-utils';

declare var viewport: any;

// We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

const customTexts: IPaginationTexts = {
  previous: 'myPrevious',
  next: 'myNext',
  ofLabel: 'myOf',
  ariaLabel: 'myAriaLabel'
};

@Directive()
abstract class PaginationTest {
  @ViewChild(NxPaginationComponent) paginationInstance: NxPaginationComponent;
  page: number = 1;
  prevPage = jasmine.createSpy('prevPageSpy');
  nextPage = jasmine.createSpy('nextPageSpy');
  goToPage = jasmine.createSpy('goToPageSpy');
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

  function createTestComponent(component: Type<PaginationTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    paginationInstance = testInstance.paginationInstance;

    nextArrow = <HTMLLinkElement>fixture.nativeElement.querySelector('.nx-pagination__link--next');
    prevArrow = <HTMLLinkElement>fixture.nativeElement.querySelector('.nx-pagination__link--previous');
    nextArrowSimple = <HTMLLinkElement>fixture.nativeElement.querySelector('.nx-pagination-compact__next');
    prevArrowSimple = <HTMLLinkElement>fixture.nativeElement.querySelector('.nx-pagination-compact__previous');
    currentPage = <HTMLSpanElement>fixture.nativeElement.querySelector('.nx-pagination-compact__current-page');
    totalPages = <HTMLSpanElement>fixture.nativeElement.querySelector('.nx-pagination-compact__total-pages');
    active = <HTMLLinkElement>fixture.nativeElement.querySelector('.is-active');
    pageSeparator = <HTMLSpanElement>fixture.nativeElement.querySelector('.nx-pagination-compact__page-separator');

    spanElement = fixture.debugElement.query(By.css('.nx-pagination-compact__direction-label'));
    listElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item:not(.nx-pagination__item--mobile)');
    mobileListElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item.nx-pagination__item--mobile');
    pageElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item:not(.nx-pagination__item--mobile) .nx-pagination--number');
    mobilePageElements = fixture.nativeElement.querySelectorAll('.nx-pagination__item.nx-pagination__item--mobile .nx-pagination--number');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxPaginationModule
      ],
      declarations: [
        SimplePagination,
        SimplePaginationBeginat10,
        AdvancedPagination,
        AdvancedPaginationLess10,
        AdvancedPaginationMore10,
        AdvancedPaginationBeginat10,
        LocalizationToken
      ],
      providers: [
        NxPaginationUtils,
        { provide: NX_PAGINATION_TEXTS, useValue: { previous: 'Before', next: 'Later' } },
      ]
    }).compileComponents();
  }));

  describe('helpers', () => {
    it('should always yield the minimal reachable page', () => {
      createTestComponent(SimplePagination);
      expect(testInstance.paginationInstance.getMin()).toEqual(1);

      testInstance.paginationInstance.totalNumberPages = 0;
      expect(testInstance.paginationInstance.getMin()).toEqual(0);
    });
  });

  describe('simple variation', () => {

    it('displays a simple pagination', () => {
      createTestComponent(SimplePagination);
      expect(currentPage && totalPages && nextArrowSimple).not.toBeNull();
      expect(currentPage.textContent).toContain('1');
      expect(totalPages.textContent).toContain('21');
      expect(spanElement.nativeElement.textContent).toEqual(' Before ');
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
      expect(currentPage.textContent.trim()).toEqual('10');
      prevArrowSimple.click();
      expect(testInstance.prevPage).toHaveBeenCalled();
    });

    it('should recalculate totalNumberPages when nxCount changes', () => {
      createTestComponent(SimplePagination);
      const simpleInstance = testInstance as SimplePagination;
      simpleInstance.count = 100;
      fixture.detectChanges();
      expect(paginationInstance.totalNumberPages).toEqual(10);
    });
  });

  describe('advanced variation', () => {

    it('displays an advanced pagination', () => {
      createTestComponent(AdvancedPagination);
      expect(pageElements && nextArrow).not.toBeNull();
      expect(listElements.length).toBeGreaterThan(0);
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
      expect(listElements.length).toBe(7);
    });

    it('displays an advanced pagination with more than 10 pages', () => {
      createTestComponent(AdvancedPaginationMore10);
      expect(pageElements && nextArrow).not.toBeNull();
      expect(listElements.length).toBe(10);
      expect(pageElements.length).toBe(5);
    });

    it('should emit an event when click prev arrow', () => {
      createTestComponent(AdvancedPaginationBeginat10);
      fixture.detectChanges();
      expect(pageElements && prevArrow).not.toBeNull();
      expect(active.textContent.trim()).toEqual('10');
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

  describe('mobile pagination', () => {

    it('should display advanced mobile pagination correctly', async(() => {
      createTestComponent(AdvancedPagination);
      fixture.detectChanges();
      expect(mobileListElements.length).toBe(3);
      expect(mobilePageElements.length).toBe(3);
    }));
  });

  describe('localization', () => {

    it('should use injected NX_PAGINATION_TEXTS token', () => {
      createTestComponent(LocalizationToken);
      expect(paginationInstance.paginationTexts).toEqual(customTexts);
      expect(nextArrowSimple.querySelector('.nx-pagination-compact__direction-label').textContent.trim()).toBe('myNext');
      expect(prevArrowSimple.querySelector('.nx-pagination-compact__direction-label').textContent.trim()).toBe('myPrevious');
      expect(pageSeparator.textContent.trim()).toBe('myOf');
      const navElement = <HTMLElement>fixture.nativeElement.querySelector('.nx-pagination-compact');
      expect(navElement.attributes.getNamedItem('aria-label').value).toBe('myAriaLabel');
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

  // The test fails because the disabled styles of the NEXT/PREVIOUS button is not conform with the contrast requirements
  // It was aligned with the designers that disabled elements should not fulfill the contrast requirements
  // tslint:disable-next-line:no-disabled-tests
  xdescribe('a11y', () => {

    it('has no accessibility violations', function (done) {
      createTestComponent(SimplePagination);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        console.log(violationMessages);
        done();
      });
    });
  });
});

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage" [nxType]="type"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)">
  </nx-pagination>
  `
})
class AdvancedPagination extends PaginationTest {
  count: number = 210;
  perPage: number = 10;
  type: string = 'advanced';
}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)"></nx-pagination>
  `
})
class SimplePagination extends PaginationTest {
  count: number = 210;
  perPage: number = 10;
}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage" nxType="advanced"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)">
  </nx-pagination>
  `
})
class AdvancedPaginationLess10 extends PaginationTest {
  count: number = 30;
  perPage: number = 10;
  type: string = 'advanced';
}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage" nxType="advanced"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)">
  </nx-pagination>
  `
})
class AdvancedPaginationMore10 extends PaginationTest {
  count: number = 210;
  perPage: number = 10;
  type: string = 'advanced';
}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage" nxType="advanced"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)">
  </nx-pagination>
  `
})
class AdvancedPaginationBeginat10 extends PaginationTest {
  count: number = 210;
  page: number = 10;
  perPage: number = 10;
  type: string = 'advanced';

}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="page" [nxPerPage]="perPage"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)"></nx-pagination>
  `
})
class SimplePaginationBeginat10 extends PaginationTest {
  count: number = 210;
  page: number = 10;
  perPage: number = 10;
}

@Component({
  template: `
  <nx-pagination [nxCount]="count" [nxPage]="2" [nxPerPage]="perPage"
  (nxGoPrev)="prevPage()" (nxGoNext)="nextPage()" (nxGoPage)="goToPage($event)"></nx-pagination>
  `,
  providers: [{ provide: NX_PAGINATION_TEXTS, useValue: customTexts }]
})
class LocalizationToken extends PaginationTest {
  count: number = 210;
  perPage: number = 10;
}
