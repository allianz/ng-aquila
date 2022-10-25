import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Directive, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxNotificationPanelModule } from '../notification-panel.module';

@Directive()
abstract class NotificationPanelTest {}

describe('NxLinkComponent', () => {
    let fixture: ComponentFixture<NotificationPanelTest>;
    let testInstance: NotificationPanelTest;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    const createTestComponent = (component: Type<NotificationPanelTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [NxNotificationPanelModule, NxButtonModule, NxIconModule, RouterTestingModule],
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    }));

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        // Since we're resetting the testing module in some of the tests,
        // we can potentially have multiple overlay containers.
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    it('should open overlay', () => {
        createTestComponent(TestComponent);
        const button = fixture.nativeElement.querySelector('button');
        expect(fixture.nativeElement.querySelector('nx-notification-panel')).toBeFalsy();
        button.click();
        fixture.detectChanges();
        expect(overlayContainerElement.querySelector('nx-notification-panel')).toBeTruthy();
    });

    it('should close when button is clicked again', fakeAsync(() => {
        createTestComponent(TestComponent);
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('nx-notification-panel')).toBeTruthy();
        button.click();
        fixture.detectChanges();
        flush();
        expect(overlayContainerElement.querySelector('nx-notification-panel')).toBeFalsy();
    }));

    it('should focus first focusable element', fakeAsync(() => {
        createTestComponent(TestComponent);
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();
        flush();
        expect(document.activeElement).toBe(overlayContainerElement.querySelector('button[nxplainbutton]'));
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(TestComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <button nxIconButton="small-medium" [nxNotificationPanelTriggerFor]="panel1" aria-label="hi">
            <nx-icon name="chevron-down"></nx-icon>
        </button>

        <ng-template #panel1>
            <nx-notification-panel>
                <nx-notification-header>
                    <h3 nxCopytext="large" class="nx-margin-0">Unread</h3>
                    <button nxPlainButton="small" type="button">Mark all as read <nx-icon name="check"></nx-icon></button>
                </nx-notification-header>
                <a nx-notification-panel-item href="/documentation/button">
                    <nx-notification-item-metadata>Tasks &middot; 5 minutes ago </nx-notification-item-metadata>
                    <nx-notification-item-content> Frank Loyd - created new offer </nx-notification-item-content>
                </a>
                <a nx-notification-panel-item routerLink="/documentation/button">
                    <nx-notification-item-metadata>Offers &middot; 11:45 </nx-notification-item-metadata>
                    <nx-notification-item-content> Susi Müller - Offer status has changed </nx-notification-item-content>
                </a>
                <nx-notification-header>
                    <h3 nxCopytext="large" class="nx-margin-0">Read</h3>
                </nx-notification-header>
                <a nx-notification-panel-item read routerLink="/documentation/button">
                    <nx-notification-item-metadata>Offers &middot; Yesterday </nx-notification-item-metadata>
                    <nx-notification-item-content> Mary London - Note created </nx-notification-item-content>
                </a>
            </nx-notification-panel>
        </ng-template>
    `,
})
class TestComponent extends NotificationPanelTest {}
