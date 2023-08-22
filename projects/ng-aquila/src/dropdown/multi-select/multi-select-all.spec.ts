import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentHarness, HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectAllComponent } from './multi-select-all.component';

/** @docs-private */
export class MultiSelectAllHarness extends ComponentHarness {
    static hostSelector = 'nx-multi-select-all';

    getLabel = this.locatorFor('.nx-checkbox__label');

    getCheckbox = this.locatorFor('.nx-checkbox');

    getCheckIcon = this.locatorForOptional('nx-icon');

    getIndeterminate = this.locatorFor('.nx-checkbox__indeterminate-indicator');

    async getLabelText() {
        const label = await this.getLabel();
        return label.text();
    }

    async isSelected() {
        const checkbox = await this.getCheckbox();
        return checkbox.hasClass('is-selected');
    }

    async isActive() {
        const checkbox = await this.getCheckbox();
        return checkbox.hasClass('is-active');
    }

    async isOutline() {
        const host = await this.host();
        return host.hasClass('is-outline');
    }

    async click() {
        const option = await this.host();
        await option.click();
    }

    async getId() {
        const host = await this.host();
        return host.getAttribute('id');
    }
}

describe('NxMultiSelectAllComponent', () => {
    let fixture: ComponentFixture<MultiSelectAllTest>;
    let testInstance: MultiSelectAllTest;
    let multiSelectAllInstance: NxMultiSelectAllComponent<any>;
    let loader: HarnessLoader;
    let multiSelectAllHarness: MultiSelectAllHarness;
    let liveAnnouncer: LiveAnnouncer;

    async function configureTestingModule(declarations: any[]) {
        return TestBed.configureTestingModule({
            imports: [NxDropdownModule],
            declarations,
            providers: [LiveAnnouncer],
        }).compileComponents();
    }

    function createTestComponent(component: Type<MultiSelectAllTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        multiSelectAllInstance = testInstance.multiSelectOption;
        liveAnnouncer = TestBed.inject(LiveAnnouncer);

        loader = TestbedHarnessEnvironment.loader(fixture);
    }

    beforeEach(async () => {
        await configureTestingModule([BasicMultiSelectAllComponent, NxMultiSelectAllComponent]);
        createTestComponent(BasicMultiSelectAllComponent);
        multiSelectAllHarness = await loader.getHarness(MultiSelectAllHarness);
    });

    describe('select all button', () => {
        it('has the label', async () => {
            const label = await multiSelectAllHarness.getLabelText();
            expect(label).toBe('Select All');
        });

        it('is not active', async () => {
            expect(await multiSelectAllHarness.isActive()).toBeFalse();
        });

        it('shows no check icon', async () => {
            const icon = await multiSelectAllHarness.getCheckIcon();
            expect(icon).toBeNull();
        });

        it('is not selected', async () => {
            expect(await multiSelectAllHarness.isSelected()).toBeFalse();
        });

        it('has the aria attributes', async () => {
            const option = await multiSelectAllHarness.host();

            const [role, id, ariaSelected, ariaDisabled] = await parallel(() => [
                option.getAttribute('role'),
                option.getAttribute('id'),
                option.getAttribute('aria-selected'),
                option.getAttribute('aria-disabled'),
            ]);

            expect(role).toBe('option');
            expect(id).toMatch(/^nx-multi-select-all-\d+$/);
            expect(ariaSelected).toBeNull();
            expect(ariaDisabled).toBeNull();
        });

        it('is show indeterminate mark', async () => {
            testInstance.indeterminate = true;
            expect(await multiSelectAllHarness.getIndeterminate()).toBeTruthy();
        });

        describe('when selected by click', () => {
            beforeEach(async () => {
                testInstance.selected = true;
                await multiSelectAllHarness.click();
            });

            it('is selected', async () => {
                expect(await multiSelectAllHarness.isSelected()).toBeTrue();
            });

            it('shows check icon', async () => {
                const icon = await multiSelectAllHarness.getCheckIcon();
                expect(icon).not.toBeNull();
            });

            it('has the aria attributes', async () => {
                const option = await multiSelectAllHarness.host();
                const ariaSelected = await option.getAttribute('aria-selected');

                expect(ariaSelected).toBe('true');
            });

            it('triggers the selectedChange event', () => {
                expect(testInstance.onSelectAll).toHaveBeenCalled();
            });
        });

        describe('when set active', () => {
            beforeEach(() => {
                multiSelectAllInstance.setActiveStyles();
                fixture.detectChanges();
            });

            it('is active', async () => {
                expect(await multiSelectAllHarness.isActive()).toBeTrue();
            });

            describe('and set inactive', () => {
                beforeEach(() => {
                    multiSelectAllInstance.setInactiveStyles();
                    fixture.detectChanges();
                });

                it('is active', async () => {
                    expect(await multiSelectAllHarness.isActive()).toBeFalse();
                });
            });
        });
    });

    describe('accessibility', () => {
        it('read out select state', async () => {
            createTestComponent(BasicMultiSelectAllComponent);
            multiSelectAllHarness = await loader.getHarness(MultiSelectAllHarness);
            multiSelectAllInstance.selected = true;

            const announceSpy = spyOn(liveAnnouncer, 'announce');
            await multiSelectAllHarness.click();

            expect(announceSpy).toHaveBeenCalledWith('Select All selected');
        });
    });
});

@Directive()
abstract class MultiSelectAllTest {
    @ViewChild(NxMultiSelectAllComponent) multiSelectOption!: NxMultiSelectAllComponent<any>;
    selected = false;
    label = 'Select All';
    onSelectAll = jasmine.createSpy('onSelectAll');
    indeterminate = false;
}

@Component({
    template: `
        <nx-multi-select-all [selected]="selected" [label]="label" [indeterminate]="indeterminate" (selectedAllChange)="onSelectAll()"> </nx-multi-select-all>
    `,
})
class BasicMultiSelectAllComponent extends MultiSelectAllTest {}
