import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxMenuComponent } from './menu.component';
import { NxMenuModule } from './menu.module';

@Directive()
abstract class MenuTest {
    open = false;
    @ViewChild(NxMenuComponent) menuInstance!: NxMenuComponent;
}

describe(NxMenuComponent.name, () => {
    let fixture: ComponentFixture<MenuTest>;
    let testInstance: MenuTest;
    let menuInstance: NxMenuComponent;
    let menuNativeElement: HTMLElement;

    function createTestComponent(component: Type<MenuTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        menuInstance = testInstance.menuInstance;
        menuNativeElement = fixture.nativeElement.querySelector('nx-menu') as HTMLElement;
    }

    function getMenuWrapper() {
        return menuNativeElement.querySelector('.nx-menu__wrapper');
    }

    function expectOpenMenu(open: boolean) {
        expect(menuInstance.open).toBe(open);
        expect(!!getMenuWrapper()).toBe(open);
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicMenu],
            imports: [NoopAnimationsModule, NxMenuModule],
        }).compileComponents();
    }));

    describe('basic menu', () => {
        beforeEach(() => {
            createTestComponent(BasicMenu);
        });

        it('creates the menu', waitForAsync(() => {
            expect(menuInstance).toBeTruthy();
        }));

        it('menu is closed', () => {
            expectOpenMenu(false);
        });

        describe('when opened', () => {
            beforeEach(() => {
                testInstance.open = true;
                fixture.detectChanges();
            });

            it('menu is open', () => {
                expectOpenMenu(true);
            });

            it('contains the content', () => {
                expect(getMenuWrapper()?.textContent?.trim()).toBe('examplecontent');
            });
        });
    });

    describe('programatic tests', () => {
        beforeEach(() => {
            createTestComponent(BasicMenu);
        });

        describe('when opened', () => {
            beforeEach(() => {
                menuInstance.open = true;
                fixture.detectChanges();
            });

            it('menu is open', () => {
                expectOpenMenu(true);
            });
        });

        describe('when toggled', () => {
            beforeEach(() => {
                menuInstance.toggle();
                fixture.detectChanges();
            });

            it('menu is open', () => {
                expectOpenMenu(true);
            });
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicMenu);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-menu [open]="open">
            <div nxMenuItem>example</div>
            <div nxMenuItem>content</div>
        </nx-menu>
    `,
})
class BasicMenu extends MenuTest {}
