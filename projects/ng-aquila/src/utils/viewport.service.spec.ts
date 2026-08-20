import { PLATFORM_ID } from '@angular/core';
import { fakeAsync, flush, inject, TestBed, tick } from '@angular/core/testing';
import { EMPTY, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { NxBreakpoints, NxViewportService } from './viewport.service';

declare let viewport: any;

describe('NxViewportService', () => {
  let viewportService: NxViewportService;
  const subscriptions: Subscription[] = [];

  function withSubscription(observable: any, callback: any) {
    subscriptions.push(observable.subscribe(callback));
  }

  function unsubscribeAll() {
    subscriptions.forEach((s) => (s ? s.unsubscribe() : null));
  }

  beforeEach(inject([NxViewportService], (vs: NxViewportService) => {
    viewportService = vs;
  }));

  afterEach(() => {
    unsubscribeAll();
  });

  function changeViewport(viewportType: string) {
    viewport.set(viewportType);
    window.dispatchEvent(new Event('resize'));
  }

  describe('min', () => {
    it('Correctly returns a viewport match for an initial value', fakeAsync(() => {
      // viewport default = 1184
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_LARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_SMALL).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      tick(200);
      flush();
      unsubscribeAll();
    }));

    it('Correctly returns a viewport match on MOBILE viewport change', fakeAsync(() => {
      let isMinXSmall;
      let isMinSmall;
      let isMinMedium;
      let isMinLarge;
      let isMinXLarge;
      let isMin2XLarge;
      let isMin3XLarge;

      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMinXSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMinSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMinMedium = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMinLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMinXLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMin2XLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMin3XLarge = value),
      );

      changeViewport('mobile'); // 320px
      tick(200);

      expect(isMinXSmall).toBe(true);
      expect(isMinSmall).toBe(true);
      expect(isMinMedium).toBe(false);
      expect(isMinLarge).toBe(false);
      expect(isMinXLarge).toBe(false);
      expect(isMin2XLarge).toBe(false);
      expect(isMin3XLarge).toBe(false);
      flush();
    }));

    it('Correctly returns a viewport match on TABLET viewport change', fakeAsync(() => {
      let isMinXSmall;
      let isMinSmall;
      let isMinMedium;
      let isMinLarge;
      let isMinXLarge;
      let isMin2XLarge;
      let isMin3XLarge;

      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMinXSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMinSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMinMedium = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMinLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMinXLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMin2XLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMin3XLarge = value),
      );

      changeViewport('tablet'); // 704px
      tick(200);

      expect(isMinXSmall).toBe(true);
      expect(isMinSmall).toBe(true);
      expect(isMinMedium).toBe(true);
      expect(isMinLarge).toBe(false);
      expect(isMinXLarge).toBe(false);
      expect(isMin2XLarge).toBe(false);
      expect(isMin3XLarge).toBe(false);
      flush();
    }));

    it('Correctly returns a viewport match on DESKTOP viewport change', fakeAsync(() => {
      let isMinXSmall;
      let isMinSmall;
      let isMinMedium;
      let isMinLarge;
      let isMinXLarge;
      let isMin2XLarge;
      let isMin3XLarge;

      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMinXSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMinSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMinMedium = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMinLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMinXLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMin2XLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMin3XLarge = value),
      );

      changeViewport('desktop'); // 704px
      tick(200);

      expect(isMinXSmall).toBe(true);
      expect(isMinSmall).toBe(true);
      expect(isMinMedium).toBe(true);
      expect(isMinLarge).toBe(true);
      expect(isMinXLarge).toBe(false);
      expect(isMin2XLarge).toBe(false);
      expect(isMin3XLarge).toBe(false);
      flush();
      unsubscribeAll();
    }));

    it('Emits a correct initial viewport value', fakeAsync(() => {
      changeViewport('mobile'); // 320px

      let isMinXSmall;
      let isMinSmall;
      let isMinMedium;
      let isMinLarge;
      let isMinXLarge;
      let isMin2XLarge;
      let isMin3XLarge;

      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMinXSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMinSmall = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMinMedium = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMinLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMinXLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMin2XLarge = value),
      );
      withSubscription(
        viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMin3XLarge = value),
      );

      tick(200);

      expect(isMinXSmall).toBe(true);
      expect(isMinSmall).toBe(true);
      expect(isMinMedium).toBe(false);
      expect(isMinLarge).toBe(false);
      expect(isMinXLarge).toBe(false);
      expect(isMin2XLarge).toBe(false);
      expect(isMin3XLarge).toBe(false);
      flush();
    }));
  });

  describe('max', () => {
    it('Correctly returns a viewport match for an initial value', fakeAsync(() => {
      // viewport default = 1184
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(true),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_SMALL).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL).pipe(take(1)),
        (value: any) => expect(value).toBe(false),
      );
      // needed to clean timer queue
      tick(200);
      flush();
    }));

    it('Correctly returns a viewport match on MOBILE viewport change', fakeAsync(() => {
      let isMaxXSmall;
      let isMaxSmall;
      let isMaxMedium;
      let isMaxLarge;
      let isMaxXLarge;
      let isMax2XLarge;
      let isMax3XLarge;

      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMaxXSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMaxSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMaxMedium = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMaxLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMaxXLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMax2XLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMax3XLarge = value),
      );

      changeViewport('mobile'); // 320px
      tick(200);

      expect(isMaxXSmall).toBe(false);
      expect(isMaxSmall).toBe(false);
      expect(isMaxMedium).toBe(true);
      expect(isMaxLarge).toBe(true);
      expect(isMaxXLarge).toBe(true);
      expect(isMax2XLarge).toBe(true);
      expect(isMax3XLarge).toBe(true);
    }));

    it('Correctly returns a viewport match on TABLET viewport change', fakeAsync(() => {
      let isMaxXSmall;
      let isMaxSmall;
      let isMaxMedium;
      let isMaxLarge;
      let isMaxXLarge;
      let isMax2XLarge;
      let isMax3XLarge;

      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMaxXSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMaxSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMaxMedium = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMaxLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMaxXLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMax2XLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMax3XLarge = value),
      );

      changeViewport('tablet');
      tick(200);

      expect(isMaxXSmall).toBe(false);
      expect(isMaxSmall).toBe(false);
      expect(isMaxMedium).toBe(false);
      expect(isMaxLarge).toBe(true);
      expect(isMaxXLarge).toBe(true);
      expect(isMax2XLarge).toBe(true);
      expect(isMax3XLarge).toBe(true);
      flush();
      unsubscribeAll();
    }));

    it('Correctly returns a viewport match on DESKTOP viewport change', fakeAsync(() => {
      let isMaxXSmall;
      let isMaxSmall;
      let isMaxMedium;
      let isMaxLarge;
      let isMaxXLarge;
      let isMax2XLarge;
      let isMax3XLarge;

      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMaxXSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMaxSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMaxMedium = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMaxLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMaxXLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMax2XLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMax3XLarge = value),
      );

      changeViewport('desktop');
      tick(200);

      expect(isMaxXSmall).toBe(false);
      expect(isMaxSmall).toBe(false);
      expect(isMaxMedium).toBe(false);
      expect(isMaxLarge).toBe(false);
      expect(isMaxXLarge).toBe(true);
      expect(isMax2XLarge).toBe(true);
      expect(isMax3XLarge).toBe(true);
      flush();
      unsubscribeAll();
    }));

    it('Emits a correct initial viewport value', fakeAsync(() => {
      viewport.set('tablet');

      let isMaxXSmall;
      let isMaxSmall;
      let isMaxMedium;
      let isMaxLarge;
      let isMaxXLarge;
      let isMax2XLarge;
      let isMax3XLarge;

      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL),
        (value: any) => (isMaxXSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_SMALL),
        (value: any) => (isMaxSmall = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMaxMedium = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isMaxLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE),
        (value: any) => (isMaxXLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isMax2XLarge = value),
      );
      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMax3XLarge = value),
      );

      tick(200);

      expect(isMaxXSmall).toBe(false);
      expect(isMaxSmall).toBe(false);
      expect(isMaxMedium).toBe(false);
      expect(isMaxLarge).toBe(true);
      expect(isMaxXLarge).toBe(true);
      expect(isMax2XLarge).toBe(true);
      expect(isMax3XLarge).toBe(true);
      flush();
      unsubscribeAll();
    }));
  });

  describe('between', () => {
    it('correctly returns a match for a mobile viewport: 0 - 703px', fakeAsync(() => {
      let isMobile;
      let isMobilePlus;
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMobile = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMobilePlus = value),
      );

      changeViewport('mobile'); // 320px
      tick(200);

      expect(isMobile).toBe(true);
      expect(isMobilePlus).toBe(false);
      flush();
      unsubscribeAll();
    }));

    it('correctly returns a match for a tablet viewport: 704px - 991px', fakeAsync(() => {
      let isTablet;
      let isLargerThanTablet;
      let isSmallerThanTablet;
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isTablet = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_LARGE, NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isLargerThanTablet = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isSmallerThanTablet = value),
      );

      changeViewport('tablet'); // 704px
      tick(200);

      expect(isTablet).toBe(true);
      expect(isLargerThanTablet).toBe(false);
      expect(isSmallerThanTablet).toBe(false);
      flush();
      unsubscribeAll();
    }));

    it('correctly returns a match for a desktop viewport: 992px - 1471px', fakeAsync(() => {
      let isDesktop;
      let isSmallerThanDesktop;
      let isLargerThanDesktop;

      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_LARGE, NxBreakpoints.BREAKPOINT_2XLARGE),
        (value: any) => (isDesktop = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_2XLARGE, NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isLargerThanDesktop = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_LARGE),
        (value: any) => (isSmallerThanDesktop = value),
      );

      changeViewport('desktop'); // 1184px
      tick(200);

      expect(isDesktop).toBe(true);
      expect(isLargerThanDesktop).toBe(false);
      expect(isSmallerThanDesktop).toBe(false);
      flush();
      unsubscribeAll();
    }));

    it('Emits a correct initial viewport value', fakeAsync(() => {
      changeViewport('mobile'); // 320px

      let isMobile;
      let isMobilePlus;
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM),
        (value: any) => (isMobile = value),
      );
      withSubscription(
        viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_3XLARGE),
        (value: any) => (isMobilePlus = value),
      );

      tick(200);

      expect(isMobile).toBe(true);
      expect(isMobilePlus).toBe(false);
      flush();
      unsubscribeAll();
    }));
  });

  describe('custom throttle time', () => {
    it('max returns a viewport change in 500ms', fakeAsync(() => {
      let isMaxLarge;

      withSubscription(
        viewportService.max(NxBreakpoints.BREAKPOINT_LARGE, 500),
        (value: any) => (isMaxLarge = value),
      );

      changeViewport('tablet');
      tick(200);
      expect(isMaxLarge).toBeFalsy();
      tick(300);
      expect(isMaxLarge).toBe(true);
      flush();
    }));

    it('min returns a viewport change in 700ms', fakeAsync(() => {
      let isMinMedium;

      withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM, 700), (value: any) => {
        isMinMedium = value;
      });
      changeViewport('tablet');
      tick(700);
      expect(isMinMedium).toBe(true);
      flush();
    }));

    it('between returns a viewport change in 50ms', fakeAsync(() => {
      let isTablet;

      withSubscription(
        viewportService.between(
          NxBreakpoints.BREAKPOINT_MEDIUM,
          NxBreakpoints.BREAKPOINT_LARGE,
          50,
        ),
        (value: any) => {
          console.log('change', value);
          isTablet = value;
        },
      );

      changeViewport('tablet');
      tick(25);
      expect(isTablet).toBeFalsy();
      tick(26);
      expect(isTablet).toBe(true);
      flush();
    }));
  });

  it('Platform != Browser: should return EMPTY observable on all methods', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'NOT_BROWSER' }],
    });

    const service = TestBed.inject(NxViewportService);
    expect(service.viewportChange$).toBe(EMPTY);
    expect(service.min(NxBreakpoints.BREAKPOINT_LARGE)).toBe(EMPTY);
    expect(service.max(NxBreakpoints.BREAKPOINT_LARGE)).toBe(EMPTY);
    expect(service.between(NxBreakpoints.BREAKPOINT_LARGE, NxBreakpoints.BREAKPOINT_3XLARGE)).toBe(
      EMPTY,
    );

    TestBed.resetTestingModule();
  });
});
