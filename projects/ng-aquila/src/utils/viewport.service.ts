import { Injectable } from '@angular/core';
import { asyncScheduler, fromEvent, Observable } from 'rxjs';
import { map, startWith, throttleTime } from 'rxjs/operators';

/** Available breakpoints to subscribe to. */
export enum NxBreakpoints {
    /** Min size for BREAKPOINT_MOBILE */
    BREAKPOINT_XSMALL = 0,
    BREAKPOINT_SMALL = 320,
    /** Min size for BREAKPOINT_TABLET */
    BREAKPOINT_MEDIUM = 704,
    /** Min size for BREAKPOINT_DESKTOP */
    BREAKPOINT_LARGE = 992,
    BREAKPOINT_XLARGE = 1280,
    BREAKPOINT_2XLARGE = 1472,
    BREAKPOINT_3XLARGE = 1760,
}

const DEFAULT_THROTTLE_TIME = 200;

/**
 * Service subscribing to window resize events and providing breakpoint matching functions.
 */
@Injectable({
    providedIn: 'root',
})
export class NxViewportService {
    readonly viewportChange$: Observable<number> = fromEvent(window, 'resize').pipe(map(() => window.innerWidth));

    /** Returns whether the current viewport width is greater than or equal (>=) to minSize. */
    min(minSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
        return this.viewportChange$.pipe(
            startWith(window.innerWidth),
            throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
            map(windowInnerWidth => windowInnerWidth >= minSize),
        );
    }

    /** Returns whether the current viewport width is lower (<) than maxSize. */
    max(maxSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
        return this.viewportChange$.pipe(
            startWith(window.innerWidth),
            throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
            map(windowInnerWidth => windowInnerWidth < maxSize),
        );
    }

    /** Returns whether the current viewport width is greater than or equal (>=) to minSize and lower (<) than maxSize. */
    between(minSize: NxBreakpoints, maxSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
        return this.viewportChange$.pipe(
            startWith(window.innerWidth),
            throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
            map(windowInnerWidth => windowInnerWidth >= minSize && windowInnerWidth < maxSize),
        );
    }
}
