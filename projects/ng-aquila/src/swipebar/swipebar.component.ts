import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, NgZone, ViewChild } from '@angular/core';

@Component({
    selector: 'nx-swipebar',
    templateUrl: 'swipebar.component.html',
    styleUrls: ['swipebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSwipebarComponent implements AfterViewInit {
    @ViewChild('element') private _element!: ElementRef;
    @ViewChild('scrollable') private _scrollable!: ElementRef;
    @ViewChild('indicator') private _indicator!: ElementRef;

    private _barLength = 0;

    private _position = 0;

    private _startX = 0;

    private _mousedown = false;

    private _showBar = false;

    /**
     * The label for this swipebar.
     *
     * Default: `''`.
     */
    @Input() label = '';

    constructor(private readonly zone: NgZone) {
        this._onMousedown = this._onMousedown.bind(this);
        this._onMousemove = this._onMousemove.bind(this);
        this._onMouseup = this._onMouseup.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }

    ngAfterViewInit(): void {
        this._onResize();

        // Run outside zone to not trigger change detection when scrolling.
        this.zone.runOutsideAngular(() => {
            this._scrollable.nativeElement.addEventListener('scroll', this._onScroll);
            this._indicator.nativeElement.addEventListener('mousedown', this._onMousedown);
        });
    }

    @HostListener('window:resize')
    _onResize() {
        if (!this._scrollable) {
            return;
        }

        const { scrollWidth, offsetWidth } = this._scrollable.nativeElement;
        this._showBar = scrollWidth > offsetWidth;
        this._barLength = Math.max(80, (offsetWidth / scrollWidth) * offsetWidth);
        this._updateIndicator();
    }

    private _onScroll($event: Event) {
        if (this._mousedown) {
            return;
        }

        const target: HTMLElement = $event.target as HTMLElement;
        const { scrollWidth, clientWidth } = this._scrollable.nativeElement;
        this._position = Math.floor((target.scrollLeft / (scrollWidth - clientWidth)) * (target.offsetWidth - this._barLength));
        this._updateIndicator();
    }

    private _onMousedown($event: MouseEvent) {
        this._startX = $event.clientX;
        this._mousedown = true;

        document.addEventListener('mousemove', this._onMousemove);
        document.addEventListener('mouseup', this._onMouseup);
    }

    private _onMousemove($event: MouseEvent) {
        const { offsetWidth } = this._scrollable.nativeElement;

        this._position = Math.max(0, Math.min(offsetWidth - this._barLength, this._position + $event.clientX - this._startX));
        this._startX = $event.clientX;

        this._updateScrollablePosition();
        this._updateIndicator();
    }

    private _onMouseup() {
        document.removeEventListener('mousemove', this._onMousemove);
        document.removeEventListener('mouseup', this._onMouseup);
        this._mousedown = false;
    }

    private _updateScrollablePosition() {
        requestAnimationFrame(() => {
            const { scrollWidth, clientWidth, offsetWidth } = this._scrollable.nativeElement;
            this._scrollable.nativeElement.scrollLeft = (this._position / (offsetWidth - this._barLength)) * (scrollWidth - clientWidth);
        });
    }

    private _updateIndicator() {
        requestAnimationFrame(() => {
            this._element.nativeElement.style.display = this._showBar ? 'block' : 'none';
            this._indicator.nativeElement.style.transform = `translateX(${this._position}px)`;
            this._indicator.nativeElement.style.width = `${this._barLength}px`;
        });
    }
}
