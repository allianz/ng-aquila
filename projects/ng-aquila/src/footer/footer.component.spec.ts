import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxFooterComponent } from './footer.component';
import { NxFooterModule } from './footer.module';

const currentYear = new Date().getFullYear();

@Directive()
abstract class FooterTest {
    @ViewChild(NxFooterComponent) footerInstance!: NxFooterComponent;
}

describe(NxFooterComponent.name, () => {
    let fixture: ComponentFixture<FooterTest>;
    let testInstance: FooterTest;
    let footerInstance: NxFooterComponent;
    let footerNativeElement: HTMLElement;

    function createTestComponent(component: Type<FooterTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        footerInstance = testInstance.footerInstance;
        footerNativeElement = fixture.nativeElement.querySelector('nx-footer') as HTMLElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicFooter, DefaultCopyrightFooter],
            imports: [NxFooterModule],
        });
    }));

    describe('basic footer', () => {
        beforeEach(() => {
            createTestComponent(BasicFooter);
        });

        it('should create the footer', () => {
            expect(footerInstance).toBeTruthy();
        });

        it('should apply the bem class to the footer', () => {
            expect(footerNativeElement).toHaveClass('nx-footer');
        });

        it('should apply the bem class to the footer navigation', () => {
            expect(footerNativeElement.querySelector('nx-footer-navigation')).toHaveClass('nx-footer__navigation');
        });

        it('should apply the bem class to the copyright part', () => {
            expect(footerNativeElement.querySelector('nx-footer-copyright')).toHaveClass('nx-footer__copyright');
        });

        it('should apply the bem class to the link', () => {
            expect(footerNativeElement.querySelector('nx-footer-link')).toHaveClass('nx-footer__link');
        });

        it('should display copyright text', () => {
            expect(footerNativeElement.querySelectorAll('nx-footer-copyright').length).toBe(1);
            expect(footerNativeElement.querySelector('nx-footer-copyright')?.textContent).toEqual('Some company');
        });
    });

    describe('default copyright footer', () => {
        beforeEach(() => {
            createTestComponent(DefaultCopyrightFooter);
        });

        it('should display default copyright text with custom input', () => {
            expect(footerNativeElement.querySelectorAll('nx-footer-copyright').length).toBe(1);
            expect(footerNativeElement.querySelector('nx-footer-copyright')?.textContent).toEqual(`© Other company ${currentYear}`);
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicFooter);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-footer>
            <nx-footer-copyright>Some company</nx-footer-copyright>
            <nx-footer-navigation>
                <nx-footer-link>
                    <a routerLink="./">Link1</a>
                </nx-footer-link>
            </nx-footer-navigation>
        </nx-footer>
    `,
})
class BasicFooter extends FooterTest {}

@Component({
    template: `<nx-footer copyright="Other company"></nx-footer>`,
})
class DefaultCopyrightFooter extends FooterTest {}
