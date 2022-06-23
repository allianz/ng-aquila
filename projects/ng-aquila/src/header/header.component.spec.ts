import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxHeaderComponent } from './header.component';
import { NxHeaderModule } from './header.module';

@Directive()
abstract class HeaderTest {
    @ViewChild(NxHeaderComponent) headerInstance!: NxHeaderComponent;
    showSeparator = false;
}

describe(NxHeaderComponent.name, () => {
    let fixture: ComponentFixture<HeaderTest>;
    let testInstance: HeaderTest;
    let headerInstance: NxHeaderComponent;
    let headerNativeElement: HTMLElement;

    function createTestComponent(component: Type<HeaderTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        headerInstance = testInstance.headerInstance;
        headerNativeElement = fixture.nativeElement.querySelector('nx-header') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicHeader, MultiRowHeader, CobrandingHeader],
            imports: [NxHeaderModule],
        }).compileComponents();
    }));

    describe('basic header', () => {
        beforeEach(() => {
            createTestComponent(BasicHeader);
        });

        it('creates the header', waitForAsync(() => {
            expect(headerInstance).toBeTruthy();
        }));

        it('default header includes the bem block element', waitForAsync(() => {
            expect(headerNativeElement).toHaveClass('nx-header');
            expect(headerNativeElement).toHaveClass('nx-header--single-row');
        }));

        it('header navigation section has bem class', () => {
            expect(headerNativeElement.querySelector('nx-header-navigation')).toHaveClass('nx-header__navigation');
        });

        it('header navigation section has navigation role', () => {
            expect(headerNativeElement.querySelector('nx-header-navigation')?.getAttribute('role')).toBe('navigation');
        });

        it('header navigation items section has list role', () => {
            expect(headerNativeElement.querySelector('.nx-header__navigation-items')?.getAttribute('role')).toBe('list');
        });

        it('header navigation item has listitem role', () => {
            expect(headerNativeElement.querySelector('nx-header-navigation-item')?.getAttribute('role')).toBe('listitem');
        });

        it('header link has bem class', () => {
            expect(headerNativeElement.querySelector('a[nxheaderlink]')).toHaveClass('nx-header__link');
        });

        it('header link has a text-content attribute', () => {
            expect(headerNativeElement.querySelector('a[nxheaderlink]')?.getAttribute('text-content')).toBe('example link');
        });

        it('header actions section has bem class', () => {
            expect(headerNativeElement.querySelector('nx-header-actions')).toHaveClass('nx-header__actions');
        });

        it('header brand section has bem class', () => {
            expect(headerNativeElement.querySelector('nx-header-brand')).toHaveClass('nx-header__brand');
        });
    });

    describe('multi row header', () => {
        beforeEach(() => {
            createTestComponent(MultiRowHeader);
        });

        it('header does not include the single row class', waitForAsync(() => {
            expect(headerNativeElement).not.toHaveClass('nx-header--single-row');
        }));

        it('header row contains bem class', waitForAsync(() => {
            expect(headerNativeElement.querySelector('nx-header-row')).toHaveClass('nx-header__row');
        }));
    });

    describe('Header actions separator', () => {
        beforeEach(() => {
            createTestComponent(CobrandingHeader);
        });

        it('Should have separator', waitForAsync(() => {
            expect(fixture.nativeElement.querySelector('.nx-header__actions')).not.toHaveClass('nx-header__actions--show-separator');
            testInstance.showSeparator = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.nx-header__actions')).toHaveClass('nx-header__actions--show-separator');
        }));
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicHeader);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-header>
            <nx-header-brand> Example brand </nx-header-brand>

            <nx-header-navigation>
                <nx-header-navigation-item>
                    <a nxHeaderLink>example link</a>
                </nx-header-navigation-item>
            </nx-header-navigation>

            <nx-header-actions> Example action </nx-header-actions>
        </nx-header>
    `,
})
class BasicHeader extends HeaderTest {}

@Component({
    template: `
        <nx-header>
            <nx-header-row> </nx-header-row>
            <nx-header-row> </nx-header-row>
        </nx-header>
    `,
})
class MultiRowHeader extends HeaderTest {}

@Component({
    template: `
        <nx-header>
            <nx-header-row>
                <nx-header-brand>
                    <nx-header-app-title>Application title</nx-header-app-title>
                </nx-header-brand>

                <nx-header-actions [showSeparator]="showSeparator">
                    <span>Powered by</span>
                </nx-header-actions>
                <nx-header-brand> </nx-header-brand>
            </nx-header-row>
            <nx-header-row> </nx-header-row>
        </nx-header>
    `,
})
class CobrandingHeader extends HeaderTest {
    showSeparator: any;
}
