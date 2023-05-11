import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ComponentHarness, HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxDropdownModule } from '../dropdown.module';
import { NxMultiSelectOptionComponent } from './multi-select-option.component';

/** @docs-private */
export class MultiSelectOptionHarness extends ComponentHarness {
    static hostSelector = 'nx-multi-select-option';

    getLabel = this.locatorFor('.nx-checkbox__label');

    getCheckbox = this.locatorFor('.nx-checkbox');

    getCheckIcon = this.locatorForOptional('nx-icon');

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

    async isDisabled() {
        const checkbox = await this.getCheckbox();
        return checkbox.hasClass('is-disabled');
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

describe('NxMultiSelectOptionComponent', () => {
    let fixture: ComponentFixture<MultiSelectOptionTest>;
    let testInstance: MultiSelectOptionTest;
    let multiSelectOptionInstance: NxMultiSelectOptionComponent<any>;
    let loader: HarnessLoader;
    let multiSelectOptionHarness: MultiSelectOptionHarness;
    let liveAnnouncer: LiveAnnouncer;

    async function configureTestingModule(declarations: any[]) {
        return TestBed.configureTestingModule({
            imports: [NxDropdownModule],
            declarations,
            providers: [LiveAnnouncer],
        }).compileComponents();
    }

    function createTestComponent(component: Type<MultiSelectOptionTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        multiSelectOptionInstance = testInstance.multiSelectOption;
        liveAnnouncer = TestBed.inject(LiveAnnouncer);

        loader = TestbedHarnessEnvironment.loader(fixture);
    }

    beforeEach(async () => {
        await configureTestingModule([BasicMultiSelectOptionComponent, NxMultiSelectOptionComponent]);
        createTestComponent(BasicMultiSelectOptionComponent);
        multiSelectOptionHarness = await loader.getHarness(MultiSelectOptionHarness);
    });

    describe('basic multi select option', () => {
        it('has the label', async () => {
            const label = await multiSelectOptionHarness.getLabelText();
            expect(label).toBe('example label');
        });

        it('is not active', async () => {
            expect(await multiSelectOptionHarness.isActive()).toBeFalse();
        });

        it('shows no check icon', async () => {
            const icon = await multiSelectOptionHarness.getCheckIcon();
            expect(icon).toBeNull();
        });

        it('is not selected', async () => {
            expect(await multiSelectOptionHarness.isSelected()).toBeFalse();
        });

        it('is not disabled', async () => {
            expect(await multiSelectOptionHarness.isDisabled()).toBeFalse();
        });

        it('has the aria attributes', async () => {
            const option = await multiSelectOptionHarness.host();

            const [role, id, ariaSelected, ariaDisabled] = await parallel(() => [
                option.getAttribute('role'),
                option.getAttribute('id'),
                option.getAttribute('aria-selected'),
                option.getAttribute('aria-disabled'),
            ]);

            expect(role).toBe('option');
            expect(id).toMatch(/^nx-multi-select-option-\d+$/);
            expect(ariaSelected).toBeNull();
            expect(ariaDisabled).toBeNull();
        });

        describe('when selected by click', () => {
            beforeEach(async () => {
                await multiSelectOptionHarness.click();
            });

            it('is selected', async () => {
                expect(await multiSelectOptionHarness.isSelected()).toBeTrue();
            });

            it('shows check icon', async () => {
                const icon = await multiSelectOptionHarness.getCheckIcon();
                expect(icon).not.toBeNull();
            });

            it('has the aria attributes', async () => {
                const option = await multiSelectOptionHarness.host();
                const ariaSelected = await option.getAttribute('aria-selected');

                expect(ariaSelected).toBe('true');
            });

            it('triggers the selectedChange event', () => {
                expect(testInstance.onSelect).toHaveBeenCalled();
            });
        });

        describe('when disabled', () => {
            beforeEach(() => {
                testInstance.disabled = true;
                fixture.detectChanges();
            });

            it('is disabled', async () => {
                expect(await multiSelectOptionHarness.isDisabled()).toBeTrue();
            });

            it('has the aria attributes', async () => {
                const option = await multiSelectOptionHarness.host();
                const ariaDisabled = await option.getAttribute('aria-disabled');

                expect(ariaDisabled).toBe('true');
            });

            it('can not be selected', async () => {
                await multiSelectOptionHarness.click();
                expect(await multiSelectOptionHarness.isSelected()).toBeFalse();
                expect(testInstance.onSelect).not.toHaveBeenCalled();
            });
        });

        describe('when set active', () => {
            beforeEach(() => {
                multiSelectOptionInstance.setActiveStyles();
                fixture.detectChanges();
            });

            it('is active', async () => {
                expect(await multiSelectOptionHarness.isActive()).toBeTrue();
            });

            describe('and set inactive', () => {
                beforeEach(() => {
                    multiSelectOptionInstance.setInactiveStyles();
                    fixture.detectChanges();
                });

                it('is active', async () => {
                    expect(await multiSelectOptionHarness.isActive()).toBeFalse();
                });
            });
        });

        describe('when setting the appearance', () => {
            beforeEach(() => {
                testInstance.appearance = 'outline';
                fixture.detectChanges();
            });

            it('has appearance outline', async () => {
                expect(await multiSelectOptionHarness.isOutline()).toBeTrue();
            });
        });
    });

    describe('accessibility', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicMultiSelectOptionComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('read out select state', async () => {
            createTestComponent(BasicMultiSelectOptionComponent);
            const announceSpy = spyOn(liveAnnouncer, 'announce');
            await multiSelectOptionHarness.click();

            expect(announceSpy).toHaveBeenCalledWith('example label selected');
        });
    });
});

@Directive()
abstract class MultiSelectOptionTest {
    @ViewChild(NxMultiSelectOptionComponent) multiSelectOption!: NxMultiSelectOptionComponent<any>;

    selected = false;
    disabled = false;
    label = 'example label';
    value = 'example value';
    onSelect = jasmine.createSpy('onSelect');
    appearance = 'auto';
}

@Component({
    template: `
        <div role="listbox" aria-label="exampleLabel">
            <nx-multi-select-option
                [appearance]="appearance"
                [selected]="selected"
                [disabled]="disabled"
                [label]="label"
                [value]="value"
                (selectedChange)="onSelect()"
            >
            </nx-multi-select-option>
        </div>
    `,
})
class BasicMultiSelectOptionComponent extends MultiSelectOptionTest {}
