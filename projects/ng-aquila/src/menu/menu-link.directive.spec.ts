import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxMenuModule } from './menu.module';
import { NxMenuLinkDirective } from './menu-link.directive';

@Directive()
abstract class MenuLinkTest {
    @ViewChild(NxMenuLinkDirective) menuLinkInstance!: NxMenuLinkDirective;
}

describe(NxMenuLinkDirective.name, () => {
    let fixture: ComponentFixture<MenuLinkTest>;
    let testInstance: MenuLinkTest;
    let menuLinkInstance: NxMenuLinkDirective;
    let menuLinkNativeElement: HTMLElement;

    function createTestComponent(component: Type<MenuLinkTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        menuLinkInstance = testInstance.menuLinkInstance;
        menuLinkNativeElement = fixture.nativeElement.querySelector('[nxMenuLink]') as HTMLElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicMenuLink],
            imports: [NxMenuModule],
        }).compileComponents();
    }));

    describe('basic menu link', () => {
        beforeEach(() => {
            createTestComponent(BasicMenuLink);
        });

        it('creates the menu link', waitForAsync(() => {
            expect(menuLinkInstance).toBeTruthy();
        }));

        it('menu link includes the bem block element', waitForAsync(() => {
            expect(menuLinkNativeElement).toHaveClass('nx-menu__link');
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicMenuLink);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<a nxMenuLink>Link</a>`,
})
class BasicMenuLink extends MenuLinkTest {}
