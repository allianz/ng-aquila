import { DOCUMENT } from '@angular/common';
import { AfterViewChecked, Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { NxHeaderCellDirective } from '../header-cell.directive';

@Directive({
    selector: '[nxHeaderResize]',
    host: {
        '[style.right]': '"0"',
        '[style.position]': '"absolute"',
        '[style.border-right]': '"2px solid var(--ui-04)"',
        '[style.cursor]': '"col-resize"',
        '[style.height]': '"24px"',
        '[style.top]': '"50%"',
        '[style.width]': '"12px"',
        '[style.transform]': '"translate(0, -50%)"',
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
                    if (v instanceof TouchEvent) {
                        return v.touches[0].screenX;
                    }
                    return v.clientX;
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
