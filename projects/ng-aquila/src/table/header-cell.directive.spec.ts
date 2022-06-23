import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxHeaderCellDirective } from './header-cell.directive';
import { NxTableModule } from './table.module';

@Directive()
abstract class HeaderCellTest {
    @ViewChild(NxHeaderCellDirective) headerCellInstance!: NxHeaderCellDirective;
}

describe(NxHeaderCellDirective.name, () => {
    let fixture: ComponentFixture<HeaderCellTest>;
    let testInstance: HeaderCellTest;
    let HeaderCellInstance: NxHeaderCellDirective;
    let HeaderCellElement: DebugElement;

    function createTestComponent(component: Type<HeaderCellTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        HeaderCellInstance = testInstance.headerCellInstance;
        HeaderCellElement = fixture.debugElement.query(By.directive(NxHeaderCellDirective));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicHeaderCellComponent],
            imports: [NxTableModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicHeaderCellComponent);
        });

        it('creates the component', () => {
            expect(HeaderCellInstance).toBeTruthy();
        });

        it('has the bem class', () => {
            expect(HeaderCellElement.nativeElement).toHaveClass('nx-header-cell');
        });

        it('renders the content', () => {
            expect(HeaderCellElement.nativeElement.textContent).toBe('example content');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicHeaderCellComponent);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<td nxHeaderCell>example content</td>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicHeaderCellComponent extends HeaderCellTest {}
