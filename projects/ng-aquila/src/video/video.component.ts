import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'nx-video',
    templateUrl: 'video.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./video.component.scss'],
})

// note that this currently only supports youtube videos
export class NxVideoComponent implements AfterViewInit, OnDestroy {
    @ViewChild('playButton') _playButton!: ElementRef;

    /** Sets the id of the YouTube video. */
    @Input() set videoId(value: string) {
        if (this._videoId !== value) {
            this._videoId = value;
            this._cdr.markForCheck();
        }
    }
    get videoId(): string {
        return this._videoId!;
    }
    private _videoId: string | null = null;

    /** Sets the value of the alt attribute for the preview image. */
    @Input() set altText(value: string) {
        if (this._altText !== value) {
            this._altText = value;
            this._cdr.markForCheck();
        }
    }
    get altText(): string {
        return this._altText;
    }
    private _altText = '';

    /** Sets the value of the aria-label attribute on the play button (Default: Play Video). */
    @Input() set playButtonAriaLabel(value: string) {
        if (this._playButtonAriaLabel !== value) {
            this._playButtonAriaLabel = value;
            this._cdr.markForCheck();
        }
    }
    get playButtonAriaLabel(): string {
        const defaultLabel = this.altText ? `${this.altText} - Play Video` : 'Play Video';
        return this._playButtonAriaLabel ? this._playButtonAriaLabel : defaultLabel;
    }
    private _playButtonAriaLabel = '';

    /** Sets the preview image. If this is not provided, an image from YouTube will be used as default. */
    @Input() set previewImageSrc(value: string) {
        if (this._previewImageSrc !== value) {
            this._previewImageSrc = value;
            this._cdr.markForCheck();
        }
    }
    get previewImageSrc(): string {
        return this._previewImageSrc!;
    }
    private _previewImageSrc: string | null = null;

    /** Sets player controls. If set to false, player controls are not available. */
    @Input() set showPlayerControls(value: BooleanInput) {
        this._showPlayerControls = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get showPlayerControls(): boolean {
        return this._showPlayerControls;
    }
    private _showPlayerControls = true;

    /** Sets fullscreen option. If set to false, fullscreen option is not available. */
    @Input() set allowFullScreen(value: BooleanInput) {
        this._allowFullScreen = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get allowFullScreen(): boolean {
        return this._allowFullScreen;
    }
    private _allowFullScreen = true;

    /** Sets interface language. Can be used to override the interface language determined by YouTube. */
    @Input() set interfaceLanguage(value: string) {
        if (this._interfaceLanguage !== value) {
            this._interfaceLanguage = value;
            this._cdr.markForCheck();
        }
    }
    get interfaceLanguage(): string {
        return this._interfaceLanguage!;
    }
    private _interfaceLanguage: string | null = null;

    /** @docs-private */
    showPlayer = false;

    constructor(
        private readonly sanitizer: DomSanitizer,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._playButton);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._playButton);
    }

    /** @docs-private */
    select(): void {
        this.showPlayer = true;
        this._cdr.markForCheck();
    }

    /** Returns the safe resource URL of the YouTube video, given video id.  */
    get videoSrc(): SafeResourceUrl {
        let url = `https://www.youtube.com/embed/${this.videoId}?rel=0&showinfo=0&autoplay=1`;
        if (!this.showPlayerControls) {
            url += '&controls=0';
        }
        if (!this.allowFullScreen) {
            url += '&fs=0';
        }
        if (this.interfaceLanguage) {
            url += `&hl=${this.interfaceLanguage}`;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    /** Returns the preview image source URL, given video id. */
    get imgSrc() {
        return this.previewImageSrc ? this.previewImageSrc : `https://img.youtube.com/vi/${this.videoId}/sddefault.jpg`;
    }
}
