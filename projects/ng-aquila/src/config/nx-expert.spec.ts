import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxErrorComponent, NxErrorModule, NxLabelComponent, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxCardModule, NxSelectableCardComponent } from '@aposin/ng-aquila/card';
import { NxCircleToggleGroupComponent, NxCircleToggleModule } from '@aposin/ng-aquila/circle-toggle';
import { NxComparisonTableModule, NxComparisonTableRowGroupDirective } from '@aposin/ng-aquila/comparison-table';
import { NxDataDisplayComponent, NxDataDisplayModule } from '@aposin/ng-aquila/data-display';
import { NxDatefieldModule, NxDatepickerToggleComponent } from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import { NxSmallStageComponent, NxSmallStageModule } from '@aposin/ng-aquila/small-stage';
import { NxTabGroupComponent, NxTabNavBarComponent, NxTabsModule } from '@aposin/ng-aquila/tabs';

import { NxExpertModule } from './nx-expert.module';

@Directive()
abstract class PresetTest {
    @ViewChild(NxDatepickerToggleComponent) datepickerToggleInstance!: NxDatepickerToggleComponent<Date>;
    @ViewChild(NxErrorComponent) errorInstance!: NxErrorComponent;
    @ViewChild(NxFormfieldComponent) formfieldInstance!: NxFormfieldComponent;
    @ViewChild(NxLabelComponent) labelInstance!: NxLabelComponent;
    @ViewChild(NxTabGroupComponent) tabGroupInstance!: NxTabGroupComponent;
    @ViewChild(NxTabNavBarComponent) tabNavBarInstance!: NxTabNavBarComponent;
    @ViewChild(NxSelectableCardComponent) selectableCardInstance!: NxSelectableCardComponent;
    @ViewChild(NxSmallStageComponent) smallStageInstance!: NxSmallStageComponent;
    @ViewChild(NxCircleToggleGroupComponent) circleToggleGroupInstance!: NxCircleToggleGroupComponent;
    @ViewChild(NxDataDisplayComponent) dataDisplayInstance!: NxDataDisplayComponent;
}

describe('NxExpertPreset', () => {
    let fixture: ComponentFixture<PresetTest>;
    let testInstance: PresetTest;

    let datepickerToggleInstance: NxDatepickerToggleComponent<Date>;
    let formfieldInstance: NxFormfieldComponent;
    let labelInstance: NxLabelComponent;
    let errorInstance: NxErrorComponent;
    let tabGroupInstance: NxTabGroupComponent;
    let tabNavBarInstance: NxTabNavBarComponent;
    let selectableCardInstance: NxSelectableCardComponent;
    let smallStageInstance: NxSmallStageComponent;
    let circleToggleGroupInstance: NxCircleToggleGroupComponent;
    let dataDisplayInstance: NxDataDisplayComponent;

    function createTestComponent(component: Type<PresetTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();

        testInstance = fixture.componentInstance;
        datepickerToggleInstance = testInstance.datepickerToggleInstance;
        errorInstance = testInstance.errorInstance;
        formfieldInstance = testInstance.formfieldInstance;
        labelInstance = testInstance.labelInstance;
        tabGroupInstance = testInstance.tabGroupInstance;
        tabNavBarInstance = testInstance.tabNavBarInstance;
        selectableCardInstance = testInstance.selectableCardInstance;
        smallStageInstance = testInstance.smallStageInstance;
        circleToggleGroupInstance = testInstance.circleToggleGroupInstance;
        dataDisplayInstance = testInstance.dataDisplayInstance;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NxComparisonTableModule,
                NxDatefieldModule,
                NxErrorModule,
                NxExpertModule,
                NxInputModule,
                NxLabelModule,
                NxMomentDateModule,
                NxTabsModule,
                NxCardModule,
                NxSmallStageModule,
                NxCircleToggleModule,
                NxDataDisplayModule,
            ],
            declarations: [
                DatepickerPresetComponent,
                ErrorPresetComponent,
                FormfieldPresetComponent,
                LabelPresetComponent,
                TabGroupPresetComponent,
                TabNavBarPresetComponent,
                ComparisonTablePresetComponent,
                SelectableCardPresetComponent,
                SmallStagePresetComponent,
                CircleToggleGroupPresetComponent,
                DataDisplayPresetComponent,
            ],
        }).compileComponents();
    }));

    describe('formfield presets', () => {
        it('should have set floatingLabel to always on default', () => {
            createTestComponent(FormfieldPresetComponent);
            expect(formfieldInstance.floatLabel).toBe('always');
        });

        it('should have set appearance to auto on default', () => {
            createTestComponent(FormfieldPresetComponent);
            expect(formfieldInstance.appearance).toBe('outline');
        });
    });

    describe('label presets', () => {
        it('should have set size to small on default', () => {
            createTestComponent(LabelPresetComponent);
            expect(labelInstance.size).toBe('small');
        });
    });

    describe('datepicker presets', () => {
        it('should set tabindex of datepicker to -1 on default', () => {
            createTestComponent(DatepickerPresetComponent);
            expect(datepickerToggleInstance.tabindex).toBe(-1);
        });
    });

    describe('error presets', () => {
        it('should set appearance to text on default', () => {
            createTestComponent(ErrorPresetComponent);
            expect(errorInstance.appearance).toBe('text');
        });
    });

    describe('tab-group and tab-nav-bar presets', () => {
        it('should set appearance to expert on default for tab-group', () => {
            createTestComponent(TabGroupPresetComponent);
            expect(tabGroupInstance.appearance).toBe('expert');
        });

        it('should set appearance to expert on default for tab-nav-bar', () => {
            createTestComponent(TabNavBarPresetComponent);
            expect(tabNavBarInstance.appearance).toBe('expert');
        });
    });

    describe('comparison-table presets', () => {
        it('should set useFullRowForExpandableArea of row group to true', () => {
            createTestComponent(ComparisonTablePresetComponent);
            expect((testInstance as ComparisonTablePresetComponent).rowGroupInstance.useFullRowForExpandableArea).toBeTrue();
        });
    });

    describe('card presets', () => {
        it('should set appearance to expert', () => {
            createTestComponent(SelectableCardPresetComponent);
            expect(selectableCardInstance.appearance).toBe('expert');
        });
    });

    describe('small stage presets', () => {
        it('should set appearance to expert', () => {
            createTestComponent(SmallStagePresetComponent);
            expect(smallStageInstance.appearance).toBe('expert');
        });
    });

    describe('circle toggle group presets', () => {
        it('should set appearance to expert', () => {
            createTestComponent(CircleToggleGroupPresetComponent);
            expect(circleToggleGroupInstance.appearance).toBe('expert');
        });
    });

    describe('data display presets', () => {
        it('should set size to medium', () => {
            createTestComponent(DataDisplayPresetComponent);
            expect(dataDisplayInstance.size).toBe('medium');
        });
    });
});

@Component({
    template: `
        <input nxDatefield nxInput [datepicker]="myDatepicker1" />
        <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
        <nx-datepicker #myDatepicker1></nx-datepicker>
    `,
})
class DatepickerPresetComponent extends PresetTest {}

@Component({
    template: `<nx-error>This is a preset error</nx-error>`,
})
class ErrorPresetComponent extends PresetTest {}

@Component({
    template: `
        <nx-formfield>
            <input nxInput />
        </nx-formfield>
    `,
})
class FormfieldPresetComponent extends PresetTest {}

@Component({
    template: `<nx-label>I am a preset label</nx-label>`,
})
class LabelPresetComponent extends PresetTest {}

@Component({
    template: `
        <nx-tab-group>
            <nx-tab label="First tab"> Fill in your first content! </nx-tab>
            <nx-tab label="Second tab"> Fill in your second content! </nx-tab>
        </nx-tab-group>
    `,
})
class TabGroupPresetComponent extends PresetTest {}

@Component({
    template: `
        <nx-tab-nav-bar>
            <a nxTabLink *ngFor="let link of links" (click)="setActiveLink(link)" [active]="currentLink.label === link.label" routerLink="...">
                {{ link.label }}
            </a>
        </nx-tab-nav-bar>
    `,
})
class TabNavBarPresetComponent extends PresetTest {
    links = [{ label: 'Subpage 1' }, { label: 'Subpage 2' }, { label: 'Subpage 3' }];

    currentLink = this.links[0];

    setActiveLink(link: any) {
        if (!link.disabled) {
            this.currentLink = link;
        }
    }
}

@Component({
    template: `
        <nx-comparison-table>
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">This is a header cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRowGroup>
                <ng-container nxComparisonTableRow *ngFor="let i of [0, 1, 2, 3, 4]">
                    <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                    <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                </ng-container>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class ComparisonTablePresetComponent extends PresetTest {
    @ViewChild(NxComparisonTableRowGroupDirective)
    rowGroupInstance!: NxComparisonTableRowGroupDirective;
}

@Component({
    template: `<nx-selectable-card></nx-selectable-card>`,
})
class SelectableCardPresetComponent extends PresetTest {}

@Component({
    template: `<nx-small-stage></nx-small-stage>`,
})
class SmallStagePresetComponent extends PresetTest {}

@Component({
    template: `<nx-circle-toggle-group></nx-circle-toggle-group>`,
})
class CircleToggleGroupPresetComponent extends PresetTest {}

@Component({
    template: `<nx-data-display></nx-data-display>`,
})
class DataDisplayPresetComponent extends PresetTest {}
