import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxMenuModule } from './menu.module';
import { NxMenuButtonComponent, NxMenuButtonType } from './menu-button.component';

@Directive()
abstract class MenuButtonTest {
    expandable!: boolean;
    expanded!: boolean;
    type!: NxMenuButtonType;
    @ViewChild(NxMenuButtonComponent) menuButtonInstance!: NxMenuButtonComponent;
}

describe(NxMenuButtonComponent.name, () => {
    let fixture: ComponentFixture<MenuButtonTest>;
    let testInstance: MenuButtonTest;
    let menuButtonInstance: NxMenuButtonComponent;
    let menuButtonElement: HTMLElement;

    function createTestComponent(component: Type<MenuButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        menuButtonInstance = testInstance.menuButtonInstance;
        menuButtonElement = fixture.nativeElement.querySelector('[nxMenuButton]');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxMenuModule],
            declarations: [BasicMenuButton, DefaultMenuButton],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicMenuButton);
        });

        it('creates the menu button', waitForAsync(() => {
            expect(menuButtonInstance).toBeTruthy();
        }));

        it('default menu button includes the bem block element', waitForAsync(() => {
            expect(menuButtonElement).toHaveClass('nx-menu-button');
        }));

        it('is not expandable', () => {
            expect(menuButtonElement).not.toHaveClass('is-expandable');
        });

        it('is not expanded', () => {
            expect(menuButtonElement).not.toHaveClass('is-expanded');
        });

        describe('expandable menu button', () => {
            beforeEach(() => {
                testInstance.expandable = true;
                fixture.detectChanges();
            });

            it('is expandable', () => {
                expect(menuButtonElement).toHaveClass('is-expandable');
            });
        });

        describe('expanded menu button', () => {
            beforeEach(() => {
                testInstance.expandable = true;
                testInstance.expanded = true;
                fixture.detectChanges();
            });

            it('is expanded', () => {
                expect(menuButtonElement).toHaveClass('is-expanded');
            });
        });

        describe('menu button type', () => {
            it('has the modifier for root button', () => {
                testInstance.type = 'root';
                fixture.detectChanges();
                expect(menuButtonElement).toHaveClass('nx-menu-button--root');
            });

            it('has the modifier for nested button', () => {
                testInstance.type = 'nested';
                fixture.detectChanges();
                expect(menuButtonElement).toHaveClass('nx-menu-button--nested');
            });
        });
    });

    describe('programatic changes', () => {
        beforeEach(() => {
            createTestComponent(DefaultMenuButton);
        });

        describe('expandable menu button', () => {
            beforeEach(() => {
                menuButtonInstance.expandable = true;
                fixture.detectChanges();
            });

            it('is expandable', () => {
                expect(menuButtonElement).toHaveClass('is-expandable');
            });
        });

        describe('expanded menu button', () => {
            beforeEach(() => {
                menuButtonInstance.expandable = true;
                menuButtonInstance.expanded = true;
                fixture.detectChanges();
            });

            it('is expanded', () => {
                expect(menuButtonElement).toHaveClass('is-expanded');
            });
        });

        describe('menu button type', () => {
            it('has the modifier for root button', () => {
                menuButtonInstance.type = 'root';
                fixture.detectChanges();
                expect(menuButtonElement).toHaveClass('nx-menu-button--root');
            });

            it('has the modifier for nested button', () => {
                menuButtonInstance.type = 'nested';
                fixture.detectChanges();
                expect(menuButtonElement).toHaveClass('nx-menu-button--nested');
            });
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicMenuButton);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<button nxMenuButton>example menu button</button>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultMenuButton extends MenuButtonTest {}

@Component({
    template: `<a nxMenuButton [menuButtonType]="type" [expandable]="expandable" [expanded]="expanded"> example menuButton </a>`,
})
class BasicMenuButton extends MenuButtonTest {}
