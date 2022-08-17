import { fakeAsync, inject, tick } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { NxBreakpoints, NxViewportService } from './viewport.service';

declare let viewport: any;

describe('NxViewportService', () => {
    let viewportService: NxViewportService;
    const subscriptions: Subscription[] = [];

    function withSubscription(observable: any, callback: any) {
        subscriptions.push(observable.subscribe(callback));
    }

    beforeEach(inject([NxViewportService], (vs: NxViewportService) => {
        viewportService = vs;
    }));

    afterEach(() => {
        viewport.reset();
        subscriptions.forEach(s => (s ? s.unsubscribe() : null));
    });

    function changeViewport(viewportType: string) {
        viewport.set(viewportType);
        window.dispatchEvent(new Event('resize'));
    }

    describe('min', () => {
        it('Correctly returns a viewport match for an initial value', fakeAsync(() => {
            // viewport default = 1184
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_LARGE).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_SMALL).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            tick(200);
        }));

        it('Correctly returns a viewport match on MOBILE viewport change', fakeAsync(() => {
            let isMinXSmall;
            let isMinSmall;
            let isMinMedium;
            let isMinLarge;
            let isMinXLarge;
            let isMin2XLarge;
            let isMin3XLarge;

            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMinXSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMinSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMinMedium = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMinLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMinXLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMin2XLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMin3XLarge = value));

            changeViewport('mobile'); // 320px
            tick(200);

            expect(isMinXSmall).toBeTrue();
            expect(isMinSmall).toBeTrue();
            expect(isMinMedium).toBeFalse();
            expect(isMinLarge).toBeFalse();
            expect(isMinXLarge).toBeFalse();
            expect(isMin2XLarge).toBeFalse();
            expect(isMin3XLarge).toBeFalse();
        }));

        it('Correctly returns a viewport match on TABLET viewport change', fakeAsync(() => {
            let isMinXSmall;
            let isMinSmall;
            let isMinMedium;
            let isMinLarge;
            let isMinXLarge;
            let isMin2XLarge;
            let isMin3XLarge;

            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMinXSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMinSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMinMedium = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMinLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMinXLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMin2XLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMin3XLarge = value));

            changeViewport('tablet'); // 704px
            tick(200);

            expect(isMinXSmall).toBeTrue();
            expect(isMinSmall).toBeTrue();
            expect(isMinMedium).toBeTrue();
            expect(isMinLarge).toBeFalse();
            expect(isMinXLarge).toBeFalse();
            expect(isMin2XLarge).toBeFalse();
            expect(isMin3XLarge).toBeFalse();
        }));

        it('Correctly returns a viewport match on DESKTOP viewport change', fakeAsync(() => {
            let isMinXSmall;
            let isMinSmall;
            let isMinMedium;
            let isMinLarge;
            let isMinXLarge;
            let isMin2XLarge;
            let isMin3XLarge;

            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMinXSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMinSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMinMedium = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMinLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMinXLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMin2XLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMin3XLarge = value));

            changeViewport('desktop'); // 704px
            tick(200);

            expect(isMinXSmall).toBeTrue();
            expect(isMinSmall).toBeTrue();
            expect(isMinMedium).toBeTrue();
            expect(isMinLarge).toBeTrue();
            expect(isMinXLarge).toBeFalse();
            expect(isMin2XLarge).toBeFalse();
            expect(isMin3XLarge).toBeFalse();
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

            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMinXSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMinSmall = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMinMedium = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMinLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMinXLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMin2XLarge = value));
            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMin3XLarge = value));

            tick(200);

            expect(isMinXSmall).toBeTrue();
            expect(isMinSmall).toBeTrue();
            expect(isMinMedium).toBeFalse();
            expect(isMinLarge).toBeFalse();
            expect(isMinXLarge).toBeFalse();
            expect(isMin2XLarge).toBeFalse();
            expect(isMin3XLarge).toBeFalse();
        }));
    });

    describe('max', () => {
        it('Correctly returns a viewport match for an initial value', fakeAsync(() => {
            // viewport default = 1184
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE).pipe(take(1)), (value: any) => expect(value).toBeTrue());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_SMALL).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL).pipe(take(1)), (value: any) => expect(value).toBeFalse());
            // needed to clean timer queue
            tick(200);
        }));

        it('Correctly returns a viewport match on MOBILE viewport change', fakeAsync(() => {
            let isMaxXSmall;
            let isMaxSmall;
            let isMaxMedium;
            let isMaxLarge;
            let isMaxXLarge;
            let isMax2XLarge;
            let isMax3XLarge;

            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMaxXSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMaxSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMaxMedium = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMaxLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMaxXLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMax2XLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMax3XLarge = value));

            changeViewport('mobile'); // 320px
            tick(200);

            expect(isMaxXSmall).toBeFalse();
            expect(isMaxSmall).toBeFalse();
            expect(isMaxMedium).toBeTrue();
            expect(isMaxLarge).toBeTrue();
            expect(isMaxXLarge).toBeTrue();
            expect(isMax2XLarge).toBeTrue();
            expect(isMax3XLarge).toBeTrue();
        }));

        it('Correctly returns a viewport match on TABLET viewport change', fakeAsync(() => {
            let isMaxXSmall;
            let isMaxSmall;
            let isMaxMedium;
            let isMaxLarge;
            let isMaxXLarge;
            let isMax2XLarge;
            let isMax3XLarge;

            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMaxXSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMaxSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMaxMedium = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMaxLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMaxXLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMax2XLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMax3XLarge = value));

            changeViewport('tablet');
            tick(200);

            expect(isMaxXSmall).toBeFalse();
            expect(isMaxSmall).toBeFalse();
            expect(isMaxMedium).toBeFalse();
            expect(isMaxLarge).toBeTrue();
            expect(isMaxXLarge).toBeTrue();
            expect(isMax2XLarge).toBeTrue();
            expect(isMax3XLarge).toBeTrue();
        }));

        it('Correctly returns a viewport match on DESKTOP viewport change', fakeAsync(() => {
            let isMaxXSmall;
            let isMaxSmall;
            let isMaxMedium;
            let isMaxLarge;
            let isMaxXLarge;
            let isMax2XLarge;
            let isMax3XLarge;

            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMaxXSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMaxSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMaxMedium = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMaxLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMaxXLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMax2XLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMax3XLarge = value));

            changeViewport('desktop');
            tick(200);

            expect(isMaxXSmall).toBeFalse();
            expect(isMaxSmall).toBeFalse();
            expect(isMaxMedium).toBeFalse();
            expect(isMaxLarge).toBeFalse();
            expect(isMaxXLarge).toBeTrue();
            expect(isMax2XLarge).toBeTrue();
            expect(isMax3XLarge).toBeTrue();
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

            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XSMALL), (value: any) => (isMaxXSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_SMALL), (value: any) => (isMaxSmall = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMaxMedium = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isMaxLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_XLARGE), (value: any) => (isMaxXLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isMax2XLarge = value));
            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_3XLARGE), (value: any) => (isMax3XLarge = value));

            tick(200);

            expect(isMaxXSmall).toBeFalse();
            expect(isMaxSmall).toBeFalse();
            expect(isMaxMedium).toBeFalse();
            expect(isMaxLarge).toBeTrue();
            expect(isMaxXLarge).toBeTrue();
            expect(isMax2XLarge).toBeTrue();
            expect(isMax3XLarge).toBeTrue();
        }));
    });

    describe('between', () => {
        it('correctly returns a match for a mobile viewport: 0 - 703px', fakeAsync(() => {
            let isMobile;
            let isMobilePlus;
            withSubscription(viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMobile = value));
            withSubscription(
                viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_3XLARGE),
                (value: any) => (isMobilePlus = value),
            );

            changeViewport('mobile'); // 320px
            tick(200);

            expect(isMobile).toBeTrue();
            expect(isMobilePlus).toBeFalse();
        }));

        it('correctly returns a match for a tablet viewport: 704px - 991px', fakeAsync(() => {
            let isTablet;
            let isLargerThanTablet;
            let isSmallerThanTablet;
            withSubscription(viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE), (value: any) => (isTablet = value));
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

            expect(isTablet).toBeTrue();
            expect(isLargerThanTablet).toBeFalse();
            expect(isSmallerThanTablet).toBeFalse();
        }));

        it('correctly returns a match for a desktop viewport: 992px - 1471px', fakeAsync(() => {
            let isDesktop;
            let isSmallerThanDesktop;
            let isLargerThanDesktop;

            withSubscription(viewportService.between(NxBreakpoints.BREAKPOINT_LARGE, NxBreakpoints.BREAKPOINT_2XLARGE), (value: any) => (isDesktop = value));
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

            expect(isDesktop).toBeTrue();
            expect(isLargerThanDesktop).toBeFalse();
            expect(isSmallerThanDesktop).toBeFalse();
        }));

        it('Emits a correct initial viewport value', fakeAsync(() => {
            changeViewport('mobile'); // 320px

            let isMobile;
            let isMobilePlus;
            withSubscription(viewportService.between(NxBreakpoints.BREAKPOINT_XSMALL, NxBreakpoints.BREAKPOINT_MEDIUM), (value: any) => (isMobile = value));
            withSubscription(
                viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_3XLARGE),
                (value: any) => (isMobilePlus = value),
            );

            tick(200);

            expect(isMobile).toBeTrue();
            expect(isMobilePlus).toBeFalse();
        }));
    });

    describe('custom throttle time', () => {
        it('max returns a viewport change in 500ms', fakeAsync(() => {
            let isMaxLarge;

            withSubscription(viewportService.max(NxBreakpoints.BREAKPOINT_LARGE, 500), (value: any) => (isMaxLarge = value));

            changeViewport('tablet');
            tick(200);
            expect(isMaxLarge).toBeUndefined();
            tick(300);
            expect(isMaxLarge).toBeTrue();
        }));

        it('min returns a viewport change in 700ms', fakeAsync(() => {
            let isMinMedium;

            withSubscription(viewportService.min(NxBreakpoints.BREAKPOINT_MEDIUM, 700), (value: any) => (isMinMedium = value));

            changeViewport('tablet');
            tick(699);
            expect(isMinMedium).toBeUndefined();
            tick(1);
            expect(isMinMedium).toBeTrue();
        }));

        it('between returns a viewport change in 50ms', fakeAsync(() => {
            let isTablet;

            withSubscription(viewportService.between(NxBreakpoints.BREAKPOINT_MEDIUM, NxBreakpoints.BREAKPOINT_LARGE, 50), (value: any) => (isTablet = value));

            changeViewport('tablet');
            tick(25);
            expect(isTablet).toBeUndefined();
            tick(25);
            expect(isTablet).toBeTrue();
        }));
    });
});
