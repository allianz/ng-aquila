import { TestBed, fakeAsync, tick, ComponentFixture, flush, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild, Type, Directive } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NxAccordionModule, NxExpansionPanelComponent } from './index';
import { SPACE, ENTER } from '@angular/cdk/keycodes';
import { dispatchKeyboardEvent } from '../cdk-test-utils';
// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

describe('NxExpansionPanelComponent', () => {
    let fixture: ComponentFixture<PanelTest>;
    let testInstance: PanelTest;
    let panelInstance: NxExpansionPanelComponent;
    let panelNativeElement: HTMLElement;
    let headerNativeElement: HTMLElement;

    function createTestComponent(component: Type<PanelTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        panelInstance = testInstance.panel;
        panelNativeElement = fixture.nativeElement.querySelector('nx-expansion-panel') as HTMLElement;
        headerNativeElement = fixture.nativeElement.querySelector('nx-expansion-panel-header') as HTMLElement;
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, NxAccordionModule],
                declarations: [PanelWithContent, PanelWithContentInNgIf, PanelWithCustomMargin, LazyPanelWithContent, LazyPanelOpenOnLoad, PanelWithTwoWayBinding, PanelWithDifferentAppearances, PanelWithAccordion],
            });
            TestBed.compileComponents();
        }),
    );

    it('should expand and collapse the panel', fakeAsync(() => {
        createTestComponent(PanelWithContent);
        const itemEl = fixture.nativeElement.querySelector('nx-expansion-panel');
        const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');
        fixture.detectChanges();

        expect(headerEl.classList).not.toContain('nx-expanded');
        expect(itemEl.classList).not.toContain('nx-expanded');

        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        flush();

        expect(headerEl.classList).toContain('nx-expanded');
        expect(itemEl.classList).toContain('nx-expanded');
    }));

    it('should be able to render panel content lazily', fakeAsync(() => {
        createTestComponent(LazyPanelWithContent);
        const content = fixture.debugElement.query(By.css('.nx-expansion-panel__content')).nativeElement;
        fixture.detectChanges();

        expect(content.textContent.trim()).toBe('', 'Expected content element to be empty.');

        fixture.componentInstance.expanded = true;
        fixture.detectChanges();

        expect(content.textContent.trim()).toContain('Some content', 'Expected content to be rendered.');
    }));

    it('should render the content for a lazy-loaded panel that is opened on init', fakeAsync(() => {
        createTestComponent(LazyPanelOpenOnLoad);
        const content = fixture.debugElement.query(By.css('.nx-expansion-panel__content')).nativeElement;
        fixture.detectChanges();

        expect(content.textContent.trim()).toContain('Some content', 'Expected content to be rendered.');
    }));

    it('emit correct events for change in panel expanded state', () => {
        createTestComponent(PanelWithContent);
        const panelWithContent = fixture.componentInstance as PanelWithContent;
        panelWithContent.expanded = true;
        fixture.detectChanges();
        expect(panelWithContent.openCallback).toHaveBeenCalled();

        panelWithContent.expanded = false;
        fixture.detectChanges();
        expect(panelWithContent.closeCallback).toHaveBeenCalled();
    });

    it('should create a unique panel id for each panel', () => {
        const fixtureOne = TestBed.createComponent(PanelWithContent);
        const headerElOne = fixtureOne.nativeElement.querySelector('.nx-expansion-panel__header');
        const fixtureTwo = TestBed.createComponent(PanelWithContent);
        const headerElTwo = fixtureTwo.nativeElement.querySelector('.nx-expansion-panel__header');
        fixtureOne.detectChanges();
        fixtureTwo.detectChanges();

        const panelIdOne = headerElOne.getAttribute('aria-controls');
        const panelIdTwo = headerElTwo.getAttribute('aria-controls');
        expect(panelIdOne).not.toBe(panelIdTwo);
    });

    it('should set `aria-labelledby` of the content to the header id', () => {
        createTestComponent(PanelWithContent);
        const headerEl = fixture.nativeElement.querySelector('.nx-expansion-panel__header');
        const contentEl = fixture.nativeElement.querySelector('.nx-expansion-panel__content');

        fixture.detectChanges();

        const headerId = headerEl.getAttribute('id');
        const contentLabel = contentEl.getAttribute('aria-labelledby');

        expect(headerId).toBeTruthy();
        expect(contentLabel).toBeTruthy();
        expect(headerId).toBe(contentLabel);
    });

    it('should set the proper role on the content element', () => {
        createTestComponent(PanelWithContent);
        const contentEl = fixture.nativeElement.querySelector('.nx-expansion-panel__content');

        expect(contentEl.getAttribute('role')).toBe('region');
    });

    it('should toggle the panel when pressing SPACE on the header', () => {
        createTestComponent(PanelWithContent);
        const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');

        spyOn(fixture.componentInstance.panel, 'toggle');

        const event = dispatchKeyboardEvent(headerEl, 'keydown', SPACE);

        fixture.detectChanges();

        expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
    });

    it('should toggle the panel when pressing ENTER on the header', () => {
        createTestComponent(PanelWithContent);
        const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');

        spyOn((fixture.componentInstance as PanelWithContent).panel, 'toggle');

        const event = dispatchKeyboardEvent(headerEl, 'keydown', ENTER);

        fixture.detectChanges();

        expect((fixture.componentInstance as PanelWithContent).panel.toggle).toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(true);
    });

    it('should not be able to focus content while closed', fakeAsync(() => {
        createTestComponent(PanelWithContent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        tick(250);

        const button = fixture.debugElement.query(By.css('#test-button')).nativeElement;

        button.focus();
        expect(document.activeElement).toBe(button, 'Expected button to start off focusable.');

        button.blur();
        fixture.componentInstance.expanded = false;
        fixture.detectChanges();
        tick(250);

        button.focus();
        expect(document.activeElement).not.toBe(button, 'Expected button to no longer be focusable.');
    }));

    it('should update the indicator rotation when the expanded state is toggled programmatically', fakeAsync(() => {
        createTestComponent(PanelWithContent);

        tick(250);

        const arrow = fixture.debugElement.query(By.css('.nx-expansion-panel__chevron')).nativeElement;

        expect(arrow.style.transform).toBe('rotate(0deg)', 'Expected no rotation.');

        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        tick(250);

        expect(arrow.style.transform).toBe('rotate(180deg)', 'Expected 180 degree rotation.');
    }));

    it('should make sure accordion item runs ngOnDestroy when expansion panel is destroyed', () => {
        createTestComponent(PanelWithContentInNgIf);
        let destroyedOk = false;
        fixture.componentInstance.panel.destroyed.subscribe(() => (destroyedOk = true));
        (fixture.componentInstance as PanelWithContentInNgIf).expansionShown = false;
        fixture.detectChanges();
        expect(destroyedOk).toBe(true);
    });

    it('should support two-way binding of the `expanded` property', () => {
        createTestComponent(PanelWithTwoWayBinding);
        const header = fixture.debugElement.query(By.css('.nx-expansion-panel__header-content')).nativeElement;

        expect(fixture.componentInstance.expanded).toBe(false);

        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.expanded).toBe(true);

        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.expanded).toBe(false);
    });

    describe('appearance', () => {
        it('should allow negative appearance', () => {
            createTestComponent(PanelWithDifferentAppearances);
            expect(panelNativeElement.classList).not.toContain('nx-expansion-panel--negative');

            const instance = testInstance as PanelWithDifferentAppearances;
            instance.negative = true;

            fixture.detectChanges();

            expect(panelNativeElement.classList).toContain('nx-expansion-panel--negative');
        });

        it('should have regular style by default', () => {
            createTestComponent(PanelWithDifferentAppearances);
            expect(panelNativeElement.classList).toContain('nx-expansion-panel--regular');
        });

        it('should set light style', () => {
            createTestComponent(PanelWithDifferentAppearances);
            expect(panelNativeElement.classList).not.toContain('nx-expansion-panel--light');

            const instance = testInstance as PanelWithDifferentAppearances;
            instance.style = 'light';

            fixture.detectChanges();

            expect(panelNativeElement.classList).toContain('nx-expansion-panel--light');
        });

        it('should set extra-light style', () => {
            createTestComponent(PanelWithDifferentAppearances);
            expect(panelNativeElement.classList).not.toContain('nx-expansion-panel--extra-light');

            const instance = testInstance as PanelWithDifferentAppearances;
            instance.style = 'extra-light';

            fixture.detectChanges();

            expect(panelNativeElement.classList).toContain('nx-expansion-panel--extra-light');
        });

        it('should set regular style', () => {
            createTestComponent(PanelWithDifferentAppearances);
            const instance = testInstance as PanelWithDifferentAppearances;
            instance.style = 'light';
            fixture.detectChanges();
            expect(panelNativeElement.classList).not.toContain('nx-expansion-panel--regular');

            instance.style = 'regular';

            fixture.detectChanges();
            expect(panelNativeElement.classList).toContain('nx-expansion-panel--regular');
        });

        it('should ignore unknown styles and fallback to regular', () => {
            createTestComponent(PanelWithDifferentAppearances);
            const instance = testInstance as PanelWithDifferentAppearances;
            instance.style = 'unknown';
            fixture.detectChanges();

            expect(panelNativeElement.classList).toContain('nx-expansion-panel--regular');
        });

        it('should inherit negative flag from parent accordion', () => {
            createTestComponent(PanelWithAccordion);
            expect(panelNativeElement.classList).toContain('nx-expansion-panel--negative');
        });

        it('should prefer own negative flag', () => {
            createTestComponent(PanelWithAccordion);
            expect(panelNativeElement.classList).toContain('nx-expansion-panel--negative');

            const secondPanel = fixture.debugElement.query(By.css('nx-expansion-panel:nth-child(2)')).nativeElement;
            expect(secondPanel.classList).not.toContain('nx-expansion-panel--negative');
        });

        it('should inherit style from parent accordion', () => {
            createTestComponent(PanelWithAccordion);
            expect(panelNativeElement.classList).toContain('nx-expansion-panel--light');

            const secondPanel = fixture.debugElement.query(By.css('nx-expansion-panel:nth-child(2)')).nativeElement;
            expect(secondPanel.classList).toContain('nx-expansion-panel--regular');
        });
    });

    describe('disabled state', () => {
        beforeEach(() => {
            createTestComponent(PanelWithContent);
        });

        it('should toggle the aria-disabled attribute and is-disabled class on the header', () => {
            expect(headerNativeElement.getAttribute('aria-disabled')).toBe('false');
            expect(headerNativeElement.classList).not.toContain('is-disabled');

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            expect(headerNativeElement.getAttribute('aria-disabled')).toBe('true');
            expect(headerNativeElement.classList).toContain('is-disabled');
        });

        it('should not be able to toggle the panel via a user action if disabled', () => {
            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(headerNativeElement.classList).not.toContain('nx-expanded');

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            headerNativeElement.click();
            fixture.detectChanges();

            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(headerNativeElement.classList).not.toContain('nx-expanded');
        });

        it('should be able to toggle a disabled expansion panel programmatically', () => {
            expect(fixture.componentInstance.panel.expanded).toBe(false);
            expect(headerNativeElement.classList).not.toContain('nx-expanded');

            fixture.componentInstance.disabled = true;
            fixture.detectChanges();

            fixture.componentInstance.expanded = true;
            fixture.detectChanges();

            expect(fixture.componentInstance.panel.expanded).toBe(true);
            expect(headerNativeElement.classList).toContain('nx-expanded');
        });
    });
});

@Directive()
abstract class PanelTest {
    expanded: boolean = false;
    disabled = false;

    @ViewChild(NxExpansionPanelComponent) panel!: NxExpansionPanelComponent;
}

@Component({
    template: ` <nx-expansion-panel [expanded]="expanded" [disabled]="disabled" (opened)="openCallback()" (closed)="closeCallback()">
        <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
        <p>Some content</p>
        <button id="test-button">I am a button</button>
    </nx-expansion-panel>`,
})
class PanelWithContent extends PanelTest {
    openCallback = jasmine.createSpy('openCallback');
    closeCallback = jasmine.createSpy('closeCallback');
}

@Component({
    template: ` <div *ngIf="expansionShown">
        <nx-expansion-panel>
            <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
        </nx-expansion-panel>
    </div>`,
})
class PanelWithContentInNgIf extends PanelTest {
    expansionShown = true;
}

@Component({
    styles: [
        `
            nx-expansion-panel {
                margin: 13px 37px;
            }
        `,
    ],
    template: ` <nx-expansion-panel [expanded]="expanded"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores officia, aliquam dicta corrupti maxime voluptate accusamus impedit atque incidunt pariatur. </nx-expansion-panel>`,
})
class PanelWithCustomMargin extends PanelTest {}

@Component({
    template: ` <nx-expansion-panel [expanded]="expanded">
        <nx-expansion-panel-header><nx-expansion-panel-title>Panel Title</nx-expansion-panel-title></nx-expansion-panel-header>

        <ng-template nxExpansionPanelBody>
            <p>Some content</p>
            <button>I am a button</button>
        </ng-template>
    </nx-expansion-panel>`,
})
class LazyPanelWithContent extends PanelTest {}

@Component({
    template: ` <nx-expansion-panel [expanded]="true">
        <nx-expansion-panel-header><nx-expansion-panel-title>Panel Title</nx-expansion-panel-title></nx-expansion-panel-header>

        <ng-template nxExpansionPanelBody>
            <p>Some content</p>
        </ng-template>
    </nx-expansion-panel>`,
})
class LazyPanelOpenOnLoad extends PanelTest {}

@Component({
    template: ` <nx-expansion-panel [(expanded)]="expanded">
        <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>`,
})
class PanelWithTwoWayBinding extends PanelTest {}

@Component({
    template: ` <nx-expansion-panel [negative]="negative" [nxStyle]="style">
        <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>`,
})
class PanelWithDifferentAppearances extends PanelTest {
    style: any = null;
    negative = false;
}

@Component({
    template: ` <nx-accordion negative="true" nxStyle="light">
        <nx-expansion-panel>
            <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
        </nx-expansion-panel>
        <nx-expansion-panel negative="false" nxStyle="regular">
            <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
        </nx-expansion-panel>
        <nx-accordion></nx-accordion
    ></nx-accordion>`,
})
class PanelWithAccordion extends PanelTest {}
