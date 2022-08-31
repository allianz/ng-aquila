import { Component, DebugElement, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxComparisonTableModule } from '../comparison-table.module';
import { NxComparisonTableSelectButton } from './select-button.component';

const THROTTLE_TIME = 200;

@Directive()
abstract class ToggleTest {
    @ViewChildren(NxComparisonTableSelectButton) buttonInstances!: QueryList<NxComparisonTableSelectButton>;

    unselectedLabel = 'Choose this';
    selectedLabel = 'Chosen!';
    selectedIndex = 1;
    unselectedClassNames = 'secondary small negative';
    selectedClassNames = 'tertiary small';
}

describe('NxComparisonTableSelectButton', () => {
    let fixture: ComponentFixture<ToggleTest>;
    let testInstance: ToggleTest;
    let buttonInstances: QueryList<NxComparisonTableSelectButton>;
    let buttonNativeElements: DebugElement[];

    function createTestComponent(component: Type<ToggleTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonInstances = testInstance.buttonInstances;
        buttonNativeElements = fixture.debugElement.queryAll(By.css('.nx-comparison-table__select-button'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicComponent, ConfigurableComponent, DynamicComponent],
            imports: [NxComparisonTableModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        it('selects no button by default', () => {
            createTestComponent(BasicComponent);
            const unselectedButton = buttonInstances.toArray()[0];
            expect(unselectedButton.classNames).toBe('secondary small');
            expect(unselectedButton.unselectedLabel).toBe('Select');

            const unselectedButtonElement = buttonNativeElements[0];
            expect(unselectedButtonElement.nativeElement).toHaveClass('nx-button--secondary');
            expect(unselectedButtonElement.nativeElement.textContent.trim()).toBe('Select');
            expect(unselectedButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('false');
        });

        it('should have "Selected" as default selected label', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();
            const selectedButton = buttonInstances.toArray()[1];
            expect(selectedButton.classNames).toBe('primary small');
            expect(selectedButton.selectedLabel).toBe('Selected');

            const selectedButtonElement = buttonNativeElements[1];
            expect(selectedButtonElement.nativeElement).toHaveClass('nx-button--primary');
            expect(selectedButtonElement.nativeElement.textContent.trim()).toBe('Selected');
            expect(selectedButtonElement.nativeElement.getAttribute('aria-pressed')).toBe('true');
        }));

        it('should correctly display a dynamically filled table', () => {
            createTestComponent(DynamicComponent);
            expect(testInstance).toBeTruthy();
            expect(buttonInstances).toBeTruthy();
        });
    });

    describe('selection', () => {
        it('changes the button depending on selectedIndex of table and custom labels', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);

            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Selected');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Select');

            testInstance.selectedIndex = 2;
            fixture.detectChanges();

            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Selected');

            testInstance.selectedIndex = 1;
            fixture.detectChanges();

            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Selected');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Select');
        }));

        it('changes selectedIndex of the table in button click', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);

            buttonNativeElements[2].nativeElement.click();
            tick();
            fixture.detectChanges();

            expect(testInstance.selectedIndex).toBe(2);
            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Selected');

            buttonNativeElements[1].nativeElement.click();
            tick();
            fixture.detectChanges();

            expect(testInstance.selectedIndex).toBe(1);
            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Select');
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Selected');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Select');
        }));

        it('changes the selectedLabel on change', () => {
            createTestComponent(ConfigurableComponent);
            buttonInstances.forEach(button => {
                expect(button.selectedLabel).toBe('Chosen!');
            });
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Chosen!');

            testInstance.selectedLabel = 'Now chosen!';
            fixture.detectChanges();
            buttonInstances.forEach(button => {
                expect(button.selectedLabel).toBe('Now chosen!');
            });
            expect(buttonNativeElements[1].nativeElement.textContent.trim()).toBe('Now chosen!');
        });

        it('changes the unselectedLabel on change', () => {
            createTestComponent(ConfigurableComponent);
            buttonInstances.forEach(button => {
                expect(button.unselectedLabel).toBe('Choose this');
            });
            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Choose this');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Choose this');

            testInstance.unselectedLabel = 'Choose this now';
            fixture.detectChanges();
            buttonInstances.forEach(button => {
                expect(button.unselectedLabel).toBe('Choose this now');
            });
            expect(buttonNativeElements[0].nativeElement.textContent.trim()).toBe('Choose this now');
            expect(buttonNativeElements[2].nativeElement.textContent.trim()).toBe('Choose this now');
        });
    });

    describe('classNames', () => {
        it('should have the correct classNames for unselected buttons', () => {
            createTestComponent(BasicComponent);
            expect(buttonInstances.toArray()[0].classNames).toBe('secondary small');
        });

        it('should have the correct classNames for selected buttons', fakeAsync(() => {
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            expect(buttonInstances.toArray()[1].classNames).toBe('primary small');
        }));

        it('should change the classNames for an unselected button', () => {
            createTestComponent(ConfigurableComponent);
            expect(buttonInstances.toArray()[0].classNames).toBe('secondary small negative');

            testInstance.unselectedClassNames = 'cta small';
            fixture.detectChanges();
            expect(buttonInstances.toArray()[0].classNames).toBe('cta small');
        });

        it('should change the classNames for a selected button', fakeAsync(() => {
            createTestComponent(ConfigurableComponent);
            tick(THROTTLE_TIME);
            expect(buttonInstances.toArray()[1].classNames).toBe('tertiary small');

            testInstance.selectedClassNames = 'primary small negative';
            tick();
            fixture.detectChanges();
            expect(buttonInstances.toArray()[1].classNames).toBe('primary small negative');
        }));
    });
});

@Component({
    template: `
        <nx-comparison-table [(selectedIndex)]="selectedIndex">
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button nxComparisonTableSelectButton type="button">Click</button>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button nxComparisonTableSelectButton type="button">Click</button>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button nxComparisonTableSelectButton type="button">Click</button>
                </nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class BasicComponent extends ToggleTest {}

@Component({
    template: `
        <nx-comparison-table [(selectedIndex)]="selectedIndex">
            <ng-container nxComparisonTableRow type="header">
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button
                        nxComparisonTableSelectButton
                        type="button"
                        [selectedLabel]="selectedLabel"
                        [unselectedLabel]="unselectedLabel"
                        [unselectedClassNames]="unselectedClassNames"
                        [selectedClassNames]="selectedClassNames"
                    >
                        Click
                    </button>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button
                        nxComparisonTableSelectButton
                        type="button"
                        [selectedLabel]="selectedLabel"
                        [unselectedLabel]="unselectedLabel"
                        [unselectedClassNames]="unselectedClassNames"
                        [selectedClassNames]="selectedClassNames"
                    >
                        Click
                    </button>
                </nx-comparison-table-cell>
                <nx-comparison-table-cell type="header">
                    This is a header cell
                    <button
                        nxComparisonTableSelectButton
                        type="button"
                        [selectedLabel]="selectedLabel"
                        [unselectedLabel]="unselectedLabel"
                        [unselectedClassNames]="unselectedClassNames"
                        [selectedClassNames]="selectedClassNames"
                    >
                        Click
                    </button>
                </nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow>
                <nx-comparison-table-description-cell>This is a description cell</nx-comparison-table-description-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
                <nx-comparison-table-cell>This is a cell</nx-comparison-table-cell>
            </ng-container>
            <ng-container nxComparisonTableRow type="footer">
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
                <nx-comparison-table-cell type="footer">This is a footer cell</nx-comparison-table-cell>
            </ng-container>
        </nx-comparison-table>
    `,
})
class ConfigurableComponent extends ToggleTest {}

@Component({
    template: `
        <nx-comparison-table [(selectedIndex)]="selectedIndex">
            <ng-container *ngFor="let element of data">
                <ng-container *ngIf="element['type'] === 'header'" nxComparisonTableRow type="header">
                    <nx-comparison-table-cell *ngFor="let cell of element['cells']" type="header">
                        {{ cell }}<button nxComparisonTableSelectButton type="button">Click</button>
                    </nx-comparison-table-cell>
                </ng-container>

                <ng-container *ngIf="element['type'] === 'content'" nxComparisonTableRow>
                    <nx-comparison-table-description-cell *ngIf="element['description']">
                        {{ element['description'] }}
                    </nx-comparison-table-description-cell>
                    <nx-comparison-table-cell *ngFor="let cell of element['cells']">
                        {{ cell }}
                    </nx-comparison-table-cell>
                    <nx-comparison-table-intersection-cell *ngIf="element['intersection']">{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                </ng-container>

                <ng-container *ngIf="element['type'] === 'footer'" nxComparisonTableRow type="footer">
                    <nx-comparison-table-cell *ngFor="let cell of element['cells']" type="footer">
                        <button nxComparisonTableSelectButton type="button">Click</button>
                        {{ cell }}
                    </nx-comparison-table-cell>
                </ng-container>
            </ng-container>
        </nx-comparison-table>
    `,
})
class DynamicComponent extends ToggleTest {
    data = [
        { type: 'header', cells: ['This is a header cell', 'This is a second header cell'] },
        {
            content: [{ type: 'content', description: 'This is a description cell', cells: ['This is a cell', 'This is a second cell'] }],
        },
        { type: 'footer', cells: ['This is a footer cell', 'This is a second footer cell'] },
    ];
}
