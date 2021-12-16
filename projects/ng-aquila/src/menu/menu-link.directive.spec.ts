import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxMenuLinkDirective } from './menu-link.directive';
import { NxMenuModule } from './menu.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

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

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BasicMenuLink],
                imports: [NxMenuModule],
            }).compileComponents();
        }),
    );

    describe('basic menu link', () => {
        beforeEach(() => {
            createTestComponent(BasicMenuLink);
        });

        it(
            'creates the menu link',
            waitForAsync(() => {
                expect(menuLinkInstance).toBeTruthy();
            }),
        );

        it(
            'menu link includes the bem block element',
            waitForAsync(() => {
                expect(menuLinkNativeElement.classList.contains('nx-menu__link')).toBe(true);
            }),
        );
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicMenuLink);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<a nxMenuLink></a>`,
})
class BasicMenuLink extends MenuLinkTest {}
