import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxDataDisplayOrientation, NxDataDisplaySize } from '../data-display.models';
import { NxDataDisplayModule } from '../data-display.module';
import { NxDataDisplayComponent } from './data-display.component';

class DataDisplayHarness extends ComponentHarness {
    static hostSelector = 'nx-data-display';

    getLabel = this.locatorFor('nx-data-display-label');

    getValue = this.locatorFor('.nx-data-display__value');

    async getLabelText(): Promise<string> {
        const label = await this.getLabel();
        return label.text();
    }

    async getValueText(): Promise<string> {
        const value = await this.getValue();
        return value.text();
    }

    async hasSize(size: NxDataDisplaySize): Promise<boolean> {
        const host = await this.host();
        return host.hasClass(`is-${size}`);
    }

    async isHorizontal(): Promise<boolean> {
        const host = await this.host();
        return host.hasClass('is-horizontal');
    }
}

describe('DataDisplayComponent', () => {
    let testInstance: DataDisplayTestComponent;
    let fixture: ComponentFixture<DataDisplayTestComponent>;
    let dataDisplayHarness: DataDisplayHarness;
    let dataDisplay: NxDataDisplayComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NxDataDisplayModule],
            declarations: [BasicDataDisplayTestComponent, CustomLabelDataDisplayTestComponent, ConfigurableDataDisplayTestComponent],
        }).compileComponents();
    });

    async function createComponent(component: Type<DataDisplayTestComponent>) {
        fixture = TestBed.createComponent(component);
        testInstance = fixture.componentInstance;
        fixture.detectChanges();
        dataDisplay = testInstance.dataDisplay;
        const loader = TestbedHarnessEnvironment.loader(fixture);
        dataDisplayHarness = await loader.getHarness(DataDisplayHarness);
        fixture.detectChanges();
    }

    describe('basic', () => {
        beforeEach(async () => {
            await createComponent(BasicDataDisplayTestComponent);
        });

        it('should create', () => {
            expect(dataDisplay).toBeTruthy();
        });

        it('contains the label', async () => {
            expect(await dataDisplayHarness.getLabelText()).toBe('Example label');
        });

        it('contains the value', async () => {
            expect(await dataDisplayHarness.getValueText()).toBe('Example value');
        });

        it('is large', async () => {
            expect(await dataDisplayHarness.hasSize('large')).toBeTrue();
        });
    });

    describe('custom label', () => {
        beforeEach(async () => {
            await createComponent(CustomLabelDataDisplayTestComponent);
        });

        it('should create', () => {
            expect(dataDisplay).toBeTruthy();
        });

        it('contains the label', async () => {
            expect(await dataDisplayHarness.getLabelText()).toBe('Example label');
        });
    });

    describe('when setting orientation', () => {
        beforeEach(async () => {
            await createComponent(ConfigurableDataDisplayTestComponent);
            testInstance.orientation = 'horizontal';
            fixture.detectChanges();
        });

        it('is horizontal', async () => {
            expect(await dataDisplayHarness.isHorizontal()).toBeTrue();
        });
    });

    describe('when setting size', () => {
        beforeEach(async () => {
            await createComponent(ConfigurableDataDisplayTestComponent);
        });

        (['small', 'medium', 'large'] as NxDataDisplaySize[]).forEach(size => {
            it(`is ${size}`, async () => {
                testInstance.size = size;
                fixture.detectChanges();
                expect(await dataDisplayHarness.hasSize(size)).toBeTrue();
            });
        });
    });
});

@Directive()
abstract class DataDisplayTestComponent {
    @ViewChild(NxDataDisplayComponent) dataDisplay!: NxDataDisplayComponent;
    orientation: NxDataDisplayOrientation = 'vertical';
    size: NxDataDisplaySize = 'small';
}

@Component({
    template: `<nx-data-display label="Example label"> Example value </nx-data-display>`,
})
class BasicDataDisplayTestComponent extends DataDisplayTestComponent {}

@Component({
    template: `
        <nx-data-display>
            <nx-data-display-label>Example label</nx-data-display-label>
            Example value
        </nx-data-display>
    `,
})
class CustomLabelDataDisplayTestComponent extends DataDisplayTestComponent {}

@Component({
    template: `<nx-data-display label="Example label" [orientation]="orientation" [size]="size"> Example value </nx-data-display>`,
})
class ConfigurableDataDisplayTestComponent extends DataDisplayTestComponent {}
