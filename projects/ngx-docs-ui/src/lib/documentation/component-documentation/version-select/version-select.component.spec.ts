import { OverlayContainer } from '@angular/cdk/overlay';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocVersions, NX_DOC_VERSIONS } from '@aposin/ngx-docs-ui';

import { NxVersionSelectComponent } from './version-select.component';
import { NxvVersionSelectModule } from './version-select.module';

@Directive({ standalone: true })
abstract class VersionSelectTest {
    versions: DocVersions = {
        channels: [
            { name: 'lts', url: 'http://ltsUrl/' },
            { name: 'stable', url: 'http://stableUrl' },
            { name: 'next', url: 'http://nextUrl' },
        ],
        currentChannel: 'next',
        currentVersion: '7.4.0-beta.0',
    };

    @ViewChild(NxVersionSelectComponent) versionSelect!: NxVersionSelectComponent;
}

describe('NxvVersionSelectComponent', () => {
    let fixture: ComponentFixture<VersionSelectTest>;
    let overlayContainer: OverlayContainer;

    function createTestComponent(component: Type<VersionSelectTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
    }

    function openContextMenu() {
        fixture.componentInstance.versionSelect.contextMenuTrigger.openContextMenu();
    }

    function getContextMenuItems(): NodeListOf<HTMLElement> {
        return overlayContainer.getContainerElement().querySelectorAll('[nxContextMenuItem]');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxvVersionSelectModule, BrowserAnimationsModule, BasicVersionSelect, VersionSelectWithToken],
            providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
        })();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should show channels', fakeAsync(() => {
        createTestComponent(BasicVersionSelect);
        openContextMenu();
        fixture.detectChanges();
        const channels = getContextMenuItems();
        flush();
        expect(channels).toHaveSize(3);
        expect(channels[0].textContent).toContain('lts');
    }));

    it('should work with InjectionToken', fakeAsync(() => {
        createTestComponent(VersionSelectWithToken);
        openContextMenu();
        fixture.detectChanges();
        const channels = getContextMenuItems();
        flush();
        expect(channels).toHaveSize(3);
        expect(channels[0].textContent).toContain('old');
    }));

    it('should show the version on the current channel', fakeAsync(() => {
        createTestComponent(BasicVersionSelect);
        openContextMenu();
        fixture.detectChanges();
        const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        flush();
        expect(button.innerText).toBe('next (7.4.0-beta.0)');
    }));
});

@Component({
    template: `<nxv-version-select [versions]="versions"> </nxv-version-select>`,
    standalone: true,
    imports: [NxvVersionSelectModule],
})
class BasicVersionSelect extends VersionSelectTest {}

const versions: DocVersions = {
    currentChannel: 'injectedStable',
    currentVersion: '7.0.0-injected',
    channels: [
        { name: 'old', url: '' },
        { name: 'injectedStable', url: '' },
        { name: 'future', url: '' },
    ],
};

@Component({
    template: `<nxv-version-select> </nxv-version-select>`,
    providers: [{ provide: NX_DOC_VERSIONS, useValue: versions }],
    standalone: true,
    imports: [NxvVersionSelectModule],
})
class VersionSelectWithToken extends VersionSelectTest {}
