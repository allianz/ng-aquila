import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxVideoComponent } from './video.component';
import { NxVideoModule } from './video.module';

@Directive()
abstract class VideoTest {
    @ViewChild(NxVideoComponent) videoInstance!: NxVideoComponent;

    videoId = 'fooBAR';
    altText = '';
    nxPlayButtonAriaLabel = '';
    previewImageSrc = '';
    fullscreen = true;
}

describe('NxVideoComponent', () => {
    let fixture: ComponentFixture<VideoTest>;
    let testInstance: VideoTest;
    let videoInstance: NxVideoComponent;

    const createTestComponent = (component: Type<VideoTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        videoInstance = testInstance.videoInstance;
    };

    function getIframe(): HTMLIFrameElement {
        return fixture.nativeElement.querySelector('iframe');
    }

    function getPreviewImageElement(): HTMLImageElement {
        return fixture.nativeElement.querySelector('.nx-video__thumbnail');
    }

    function getVideoPlayButton(): HTMLButtonElement {
        return fixture.nativeElement.querySelector('.nx-video__play-button');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicVideo],
            imports: [NxVideoModule],
        }).compileComponents();
    }));

    it('creates the video component', waitForAsync(() => {
        createTestComponent(BasicVideo);
        expect(videoInstance).toBeTruthy();
    }));

    it('replaces the image on play button click', waitForAsync(() => {
        createTestComponent(BasicVideo);
        let thumbnail = fixture.nativeElement.querySelector('.nx-video__thumbnail');
        expect(thumbnail).not.toBeNull();

        const playButton = fixture.debugElement.query(By.css('.nx-video__play-button'));
        playButton.nativeElement.click();
        fixture.detectChanges();

        thumbnail = fixture.nativeElement.querySelector('.nx-video__thumbnail');
        expect(thumbnail).toBeNull();
    }));

    it('constructs correct preview image source URL', waitForAsync(() => {
        createTestComponent(BasicVideo);

        testInstance.videoId = 'fooBAR';
        fixture.detectChanges();
        expect(videoInstance.imgSrc).toBe('https://img.youtube.com/vi/fooBAR/sddefault.jpg');
    }));

    it('use preview img src if set', waitForAsync(() => {
        createTestComponent(BasicVideo);
        testInstance.previewImageSrc = 'testURI';
        fixture.detectChanges();
        expect(videoInstance.imgSrc).toBe('testURI');
    }));

    it('uses sensible defaults for playButtonAriaLabel if not set', waitForAsync(() => {
        createTestComponent(BasicVideo);

        const playButton = fixture.debugElement.query(By.css('.nx-video__play-button'));
        expect(playButton.nativeElement.getAttribute('aria-label')).toBe('Play Video');
    }));

    it('uses altText to construct aria-label if set', waitForAsync(() => {
        createTestComponent(BasicVideo);
        testInstance.altText = 'foo';
        fixture.detectChanges();

        const playButton = fixture.debugElement.query(By.css('.nx-video__play-button'));
        expect(playButton.nativeElement.getAttribute('aria-label')).toBe('foo - Play Video');
    }));

    it('uses playButtonAriaLabel as aria-label if set', waitForAsync(() => {
        createTestComponent(BasicVideo);
        testInstance.nxPlayButtonAriaLabel = 'foobar';
        fixture.detectChanges();

        const playButton = fixture.debugElement.query(By.css('.nx-video__play-button'));
        expect(playButton.nativeElement.getAttribute('aria-label')).toBe('foobar');
    }));

    it('allows allowfullscreen by default', () => {
        createTestComponent(BasicVideo);
        videoInstance.select();
        fixture.detectChanges();
        const iframe = getIframe();
        expect(iframe.getAttribute('allowfullscreen')).toBe('true');
    });

    it('toggles allowfullscreen', () => {
        createTestComponent(BasicVideo);
        videoInstance.select();
        fixture.detectChanges();
        const iframe = getIframe();
        expect(iframe.getAttribute('allowfullscreen')).toBe('true');

        testInstance.fullscreen = false;
        videoInstance.select();
        fixture.detectChanges();
        const newIframe = getIframe(); // changing fullscreen should internally create a new iframe (security issue: https://angular.io/errors/NG0910)
        expect(newIframe.getAttribute('allowfullscreen')).toBe('false');
    });

    describe('programmatic change', () => {
        it('should update on videoId change', () => {
            createTestComponent(BasicVideo);
            videoInstance.videoId = '1234';
            videoInstance.showPlayer = true;
            fixture.detectChanges();
            const iframe = getIframe();
            expect(iframe.src).toContain('/embed/1234');
        });

        it('should update on altText change', () => {
            createTestComponent(BasicVideo);
            videoInstance.altText = 'alternative';
            fixture.detectChanges();
            const imgElement = getPreviewImageElement();
            expect(imgElement.alt).toBe('alternative');
        });

        it('should update on nxPlayButtonAriaLabel change', () => {
            createTestComponent(BasicVideo);
            videoInstance.playButtonAriaLabel = 'play-label';
            fixture.detectChanges();
            const playButton = getVideoPlayButton();
            expect(playButton.getAttribute('aria-label')).toBe('play-label');
        });

        it('should update on previewImageSrc change', () => {
            createTestComponent(BasicVideo);
            videoInstance.previewImageSrc = '/somewhere/over/the/rainbow';
            fixture.detectChanges();
            const imgElement = getPreviewImageElement();
            expect(imgElement.src).toContain('/somewhere/over/the/rainbow');
        });

        it('should update on showPlayerControls change', () => {
            createTestComponent(BasicVideo);
            videoInstance.showPlayerControls = false;
            videoInstance.showPlayer = true;
            fixture.detectChanges();
            const iframe = getIframe();
            expect(iframe.src).toContain('&controls=0');
        });

        it('should update on allowFullScreen change', () => {
            createTestComponent(BasicVideo);
            videoInstance.allowFullScreen = false;
            videoInstance.showPlayer = true;
            fixture.detectChanges();
            const iframe = getIframe();
            expect(iframe.getAttribute('allowfullscreen')).toBe('false');
        });

        it('should update on interfaceLanguage change', () => {
            createTestComponent(BasicVideo);
            videoInstance.interfaceLanguage = 'ru';
            videoInstance.showPlayer = true;
            fixture.detectChanges();
            const iframe = getIframe();
            expect(iframe.src).toContain('&hl=ru');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicVideo);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

// careful, don't include an actual video id the test template, or your headless test browser might start
// playing the video in the background spook you out real good ;-)
@Component({
    template: `
        <nx-video
            [altText]="altText"
            [previewImageSrc]="previewImageSrc"
            [videoId]="videoId"
            [playButtonAriaLabel]="nxPlayButtonAriaLabel"
            [allowFullScreen]="fullscreen"
        ></nx-video>
    `,
})
class BasicVideo extends VideoTest {}
