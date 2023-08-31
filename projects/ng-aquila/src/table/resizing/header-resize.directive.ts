import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { NxHeaderCellDirective } from '../header-cell.directive';

@Directive({
    selector: '[nxHeaderResize]',
    host: {
        '[class.nx-table__resize-handle]': 'true',
    },
})
export class NxHeaderResizeDirective implements OnInit, OnDestroy, AfterViewChecked {
    private mousedown = fromEvent(this.elementRef.nativeElement, 'mousedown');
    private touchstart = fromEvent(this.elementRef.nativeElement, 'touchstart');

    private mousemove = fromEvent<MouseEvent>(this.documentRef, 'mousemove');
    private touchmove = fromEvent<TouchEvent>(this.documentRef, 'touchmove');

    private mouseup = fromEvent(this.documentRef, 'mouseup');
    private touchend = fromEvent(this.documentRef, 'touchend');
    readonly resizable = merge(this.mousedown, this.touchstart).pipe(
        tap(e => e.stopPropagation()),
        tap(e => e.preventDefault()),
        switchMap(() => {
            const { width, right } = this.header.elementRef.nativeElement.getBoundingClientRect();
            return merge(this.mousemove, this.touchmove).pipe(
                map(v => {
                    if (window.TouchEvent && v instanceof TouchEvent) {
                        return v.touches[0].screenX;
                    }
                    return (v as MouseEvent).clientX;
                }),
                map(clientX => width + clientX - right),
                distinctUntilChanged(),
                tap(v => {
                    const minWidth = 50;
                    const newWidth = Math.max(v, minWidth);
                    this.renderer.setStyle(this.header.elementRef.nativeElement, 'width', `${newWidth}px`);
                }),
                takeUntil(merge(this.mouseup, this.touchend)),
            );
        }),
    );

    private readonly _destroyed = new Subject<void>();

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly header: NxHeaderCellDirective,
        private renderer: Renderer2,
    ) {}

    ngOnInit() {
        this.resizable.pipe(takeUntil(this._destroyed)).subscribe();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    ngAfterViewChecked() {
        this.renderer.setStyle(this.header.elementRef.nativeElement, 'position', 'relative');
    }
}
