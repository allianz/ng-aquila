import { Component, DebugElement, Directive, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BASIC_COMPARISON_TABLE_TEMPLATE } from '../comparison-table.component.spec';
import { NxComparisonTableModule } from '../comparison-table.module';

declare let viewport: any;
const THROTTLE_TIME = 200;

@Directive()
abstract class FlexRowTest {
    selected = 0;
}

describe('ComparisonTableFlexRow', () => {
    let fixture: ComponentFixture<FlexRowTest>;
    let flexRowElements: DebugElement[];

    function createTestComponent(component: Type<FlexRowTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        flexRowElements = fixture.debugElement.queryAll(By.css('nx-comparison-table-flex-row'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxComparisonTableModule],
            declarations: [BasicComponent],
        });
        TestBed.compileComponents();
    }));

    describe('responsive', () => {
        it('should have one row for every flex-row (desktop)', () => {
            createTestComponent(BasicComponent);
            flexRowElements.forEach(flexRow => {
                const rows = flexRow.queryAll(By.css('.nx-comparison-table__row'));
                expect(rows).toHaveSize(1);
            });
        });

        it('should have two rows for only content rows (tablet)', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));

            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            expect(flexRowElements[0].queryAll(By.css('.nx-comparison-table__row'))).toHaveSize(1); // header row
            expect(flexRowElements[1].queryAll(By.css('.nx-comparison-table__row'))).toHaveSize(2); // content row
            expect(flexRowElements[2].queryAll(By.css('.nx-comparison-table__row'))).toHaveSize(1); // footer row

            // and correct role on both
            fixture.debugElement.queryAll(By.css('.nx-comparison-table__row')).forEach(row => {
                expect(row.attributes.role).toBe('row');
            });
        }));

        it('should have set placeholder cells correctly + roles (desktop)', () => {
            createTestComponent(BasicComponent);

            const headerPlaceholder = flexRowElements[0].queryAll(By.css('.nx-comparison-table__placeholder-cell'));
            expect(headerPlaceholder).toHaveSize(1);

            const contentPlaceholder = flexRowElements[1].queryAll(By.css('.nx-comparison-table__placeholder-cell'));
            expect(contentPlaceholder).toHaveSize(0);

            const footerPlaceholder = flexRowElements[2].queryAll(By.css('.nx-comparison-table__placeholder-cell'));
            expect(footerPlaceholder).toHaveSize(1);
        });

        it('should have no placeholder cells on (tablet)', fakeAsync(() => {
            viewport.set('tablet');
            window.dispatchEvent(new Event('resize'));
            createTestComponent(BasicComponent);
            tick(THROTTLE_TIME);
            fixture.detectChanges();

            flexRowElements.forEach(flexRow => {
                const placeholder = flexRow.queryAll(By.css('.nx-comparison-table__placeholder-cell'));
                expect(placeholder).toHaveSize(0);
            });
        }));

        afterEach(() => {
            viewport.reset();
        });
    });
});

@Component({
    template: BASIC_COMPARISON_TABLE_TEMPLATE,
})
class BasicComponent extends FlexRowTest {
    data = [
        { type: 'header', cells: ['This is a header cell'] },
        { type: 'content', description: 'This is a description cell', cells: ['This is a cell'] },
        { type: 'footer', cells: ['This is a footer cell'] },
    ];
}
