import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'nx-video',
    templateUrl: 'video.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./video.component.scss'],
})

// note that this currently only supports youtube videos
export class NxVideoComponent implements AfterViewInit, OnDestroy {
    private _videoId: string | null = null;

    @ViewChild('playButton') _playButton!: ElementRef;

    /** Sets the id of the YouTube video. */
    @Input('nxVideoId')
    set videoId(value: string) {
        if (this._videoId !== value) {
            this._videoId = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get videoId(): string {
        return this._videoId as string;
    }

    private _altText: string = '';

    /** Sets the value of the alt attribute for the preview image. */
    @Input('nxAltText')
    set altText(value: string) {
        if (this._altText !== value) {
            this._altText = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get altText(): string {
        return this._altText;
    }

    private _playButtonAriaLabel: string = '';

    /** Sets the value of the aria-label attribute on the play button (Default: Play Video). */
    @Input('nxPlayButtonAriaLabel')
    set nxPlayButtonAriaLabel(value: string) {
        if (this._playButtonAriaLabel !== value) {
            this._playButtonAriaLabel = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get nxPlayButtonAriaLabel(): string {
        return this._playButtonAriaLabel;
    }

    private _previewImageSrc: string | null = null;

    /** Sets the preview image. If this is not provided, an image from YouTube will be used as default. */
    @Input('nxPreviewImageSrc')
    set previewImageSrc(value: string) {
        if (this._previewImageSrc !== value) {
            this._previewImageSrc = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get previewImageSrc(): string {
        return this._previewImageSrc as string;
    }

    private _showPlayerControls: boolean = true;

    /** Sets player controls. If set to false, player controls are not available. */
    @Input('nxShowPlayerControls')
    set showPlayerControls(value: BooleanInput) {
        this._showPlayerControls = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get showPlayerControls(): boolean {
        return this._showPlayerControls;
    }

    private _allowFullScreen: boolean = true;

    /** Sets fullscreen option. If set to false, fullscreen option is not available. */
    @Input('nxAllowFullScreen')
    set allowFullScreen(value: BooleanInput) {
        this._allowFullScreen = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get allowFullScreen(): boolean {
        return this._allowFullScreen;
    }

    private _interfaceLanguage: string | null = null;

    /** Sets interface language. Can be used to override the interface language determined by YouTube. */
    @Input('nxInterfaceLanguage')
    set interfaceLanguage(value: string) {
        if (this._interfaceLanguage !== value) {
            this._interfaceLanguage = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get interfaceLanguage(): string {
        return this._interfaceLanguage as string;
    }

    /** @docs-private */
    showPlayer = false;

    constructor(private sanitizer: DomSanitizer, private _changeDetectorRef: ChangeDetectorRef, private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._playButton);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._playButton);
    }

    /** @docs-private */
    select(): void {
        this.showPlayer = true;
        this._changeDetectorRef.markForCheck();
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

    /** Returns the labels for the control buttons. */
    get playButtonAriaLabel() {
        const defaultLabel = this.altText ? `${this.altText} - Play Video` : 'Play Video';
        return this.nxPlayButtonAriaLabel ? this.nxPlayButtonAriaLabel : defaultLabel;
    }
}
