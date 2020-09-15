import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject, Observable, asyncScheduler } from 'rxjs';
import { takeUntil, map, startWith, throttleTime, tap, delay } from 'rxjs/operators';

/** Available breakpoints to subscribe to. */
export enum NxBreakpoints {
  BREAKPOINT_XSMALL = 0,
  BREAKPOINT_SMALL = 320,
  BREAKPOINT_MEDIUM = 704, // small from here
  BREAKPOINT_LARGE = 992,
  BREAKPOINT_XLARGE = 1280, // desktop
  BREAKPOINT_2XLARGE = 1472,
  BREAKPOINT_3XLARGE = 1760
}

const DEFAULT_THROTTLE_TIME = 200;

/** Service subscribing to window resize events and providing brekapoint matching functions. */
@Injectable({ providedIn: 'root' })
export class NxViewportService implements OnDestroy {

  private _destroyed: Subject<void> = new Subject();
  initialViewportWidth: number = 0;
  viewportChange$: Observable<number>;

  constructor() {
    this.viewportChange$ = fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        takeUntil(this._destroyed)
      );
  }

  /** Returns whether the current viewport is minimum (>=) the passed one. */
  min(minSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
    return this.viewportChange$
      .pipe(
        startWith(window.innerWidth),
        throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
        map(windowInnerWidth => windowInnerWidth >= minSize)
      );
  }

  /** Returns whether the current viewport is under (<) the passed one. */
  max(maxSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
    return this.viewportChange$
      .pipe(
        startWith(window.innerWidth),
        throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
        map(windowInnerWidth => windowInnerWidth < maxSize)
      );
  }

  /** Returns whether the current viewport is between two breakpoints. */
  between(minSize: NxBreakpoints, maxSize: NxBreakpoints, throttleTimeMs = DEFAULT_THROTTLE_TIME): Observable<boolean> {
    return this.viewportChange$
      .pipe(
        startWith(window.innerWidth),
        throttleTime(throttleTimeMs, asyncScheduler, { trailing: true }),
        map(windowInnerWidth => windowInnerWidth < maxSize && windowInnerWidth >= minSize)
      );
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
