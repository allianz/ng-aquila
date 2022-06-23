import { Component, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NxAccordionDirective, NxAccordionModule, NxExpansionPanelComponent } from './index';

describe('NxAccordion', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, NxAccordionModule],
            declarations: [NestedPanel, SetOfItems],
        });
        TestBed.compileComponents();
    }));

    it('should ensure only one item is expanded at a time', () => {
        const fixture = TestBed.createComponent(SetOfItems);
        const items = fixture.debugElement.queryAll(By.css('nx-expansion-panel'));

        fixture.componentInstance.firstPanelExpanded = true;
        fixture.detectChanges();
        expect(items[0].classes['nx-expanded']).toBeTruthy();
        expect(items[1].classes['nx-expanded']).toBeFalsy();

        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(items[0].classes['nx-expanded']).toBeFalsy();
        expect(items[1].classes['nx-expanded']).toBeTruthy();
    });

    it('should allow multiple items to be expanded simultaneously', () => {
        const fixture = TestBed.createComponent(SetOfItems);
        const panels = fixture.debugElement.queryAll(By.css('nx-expansion-panel'));

        fixture.componentInstance.multi = true;
        fixture.componentInstance.firstPanelExpanded = true;
        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeTruthy();
        expect(panels[1].classes['nx-expanded']).toBeTruthy();
    });

    it('should expand or collapse all enabled items', () => {
        const fixture = TestBed.createComponent(SetOfItems);
        const panels = fixture.debugElement.queryAll(By.css('nx-expansion-panel'));

        fixture.componentInstance.multi = true;
        fixture.componentInstance.secondPanelExpanded = true;
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeFalsy();
        expect(panels[1].classes['nx-expanded']).toBeTruthy();

        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeTruthy();
        expect(panels[1].classes['nx-expanded']).toBeTruthy();

        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeFalsy();
        expect(panels[1].classes['nx-expanded']).toBeFalsy();
    });

    it('should not expand or collapse disabled items', () => {
        const fixture = TestBed.createComponent(SetOfItems);
        const panels = fixture.debugElement.queryAll(By.css('nx-expansion-panel'));

        fixture.componentInstance.multi = true;
        fixture.componentInstance.secondPanelDisabled = true;
        fixture.detectChanges();
        fixture.componentInstance.accordion.openAll();
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeTruthy();
        expect(panels[1].classes['nx-expanded']).toBeFalsy();

        fixture.componentInstance.accordion.closeAll();
        fixture.detectChanges();
        expect(panels[0].classes['nx-expanded']).toBeFalsy();
        expect(panels[1].classes['nx-expanded']).toBeFalsy();
    });

    it('should not register nested panels to the same accordion', () => {
        const fixture = TestBed.createComponent(NestedPanel);
        const innerPanel = fixture.componentInstance.innerPanel;
        const outerPanel = fixture.componentInstance.outerPanel;

        expect(innerPanel.accordion).not.toBe(outerPanel.accordion);
    });
});

@Component({
    template: `<nx-accordion [multi]="multi">
        <nx-expansion-panel [expanded]="firstPanelExpanded">
            <nx-expansion-panel-header>Summary</nx-expansion-panel-header>
            <p>Content</p>
        </nx-expansion-panel>
        <nx-expansion-panel [expanded]="secondPanelExpanded" [disabled]="secondPanelDisabled">
            <nx-expansion-panel-header>Summary</nx-expansion-panel-header>
            <p>Content</p>
        </nx-expansion-panel>
    </nx-accordion>`,
})
class SetOfItems {
    @ViewChild(NxAccordionDirective) accordion!: NxAccordionDirective;

    multi = false;
    firstPanelExpanded = false;
    secondPanelExpanded = false;
    secondPanelDisabled = false;
}

@Component({
    template: `<nx-accordion>
        <nx-expansion-panel #outerPanel="NxExpansionPanelComponent">
            <nx-expansion-panel-header>Outer Panel</nx-expansion-panel-header>
            <nx-expansion-panel #innerPanel="NxExpansionPanelComponent">
                <nx-expansion-panel-header>Inner Panel</nx-expansion-panel-header>
                <p>Content</p>
            </nx-expansion-panel>
        </nx-expansion-panel>
    </nx-accordion>`,
})
class NestedPanel {
    @ViewChild('outerPanel', { static: true }) outerPanel!: NxExpansionPanelComponent;
    @ViewChild('innerPanel', { static: true }) innerPanel!: NxExpansionPanelComponent;
}
