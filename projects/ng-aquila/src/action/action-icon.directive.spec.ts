import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxActionModule } from './action.module';
import { NxActionIconDirective } from './action-icon.directive';

@Directive()
abstract class ActionIconTest {
    @ViewChild(NxActionIconDirective) actionIconInstance!: NxActionIconDirective;
}

describe(NxActionIconDirective.name, () => {
    let fixture: ComponentFixture<ActionIconTest>;
    let testInstance: ActionIconTest;
    let actionIconInstance: NxActionIconDirective;
    let actionIconElement: HTMLElement;

    function createTestComponent(component: Type<ActionIconTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        actionIconInstance = testInstance.actionIconInstance;
        actionIconElement = fixture.nativeElement.querySelector('[nxActionIcon]');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicActionIcon],
            imports: [NxActionModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicActionIcon);
        });

        it('default action icon includes the bem block element', waitForAsync(() => {
            expect(actionIconElement).toHaveClass('nx-action__icon');
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicActionIcon);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<span nxActionIcon></span>`,
})
class BasicActionIcon extends ActionIconTest {}
