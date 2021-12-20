import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxButtonModule } from './button.module';
import { NxPlainButtonComponent } from './plain-button.component';

@Directive()
abstract class ButtonTest {
    @ViewChild('button') buttonInstance!: NxPlainButtonComponent;

    classNames!: string;
}

describe('NxBreadcrumbComponent', () => {
    let fixture: ComponentFixture<ButtonTest>;
    let testInstance: ButtonTest;
    let buttonElement: HTMLButtonElement;

    function createTestComponent(component: Type<ButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NxButtonModule],
                declarations: [BasicButton],
            }).compileComponents();
        }),
    );

    it('should create the button component', () => {
        createTestComponent(BasicButton);
        expect(testInstance.buttonInstance).toBeTruthy();
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.textContent).toBe('Hello Button');
    });

    it('creates a non-danger button', () => {
        createTestComponent(BasicButton);
        expect(testInstance.buttonInstance.danger).toBe(false);
        expect(buttonElement.classList).not.toContain('nx-plain-button--danger');
    });

    describe('danger', () => {
        it('displays a danger button', () => {
            createTestComponent(BasicButton);
            fixture.componentInstance.classNames = 'danger';
            fixture.detectChanges();
            expect(testInstance.buttonInstance.danger).toBe(true);
            expect(buttonElement.classList).toContain('nx-plain-button--danger');

            fixture.componentInstance.classNames = '';
            fixture.detectChanges();
            expect(testInstance.buttonInstance.danger).toBe(false);
            expect(buttonElement.classList).not.toContain('nx-plain-button--danger');
        });
    });
});

@Component({
    template: ` <button [nxPlainButton]="classNames" #button>Hello Button</button> `,
})
class BasicButton extends ButtonTest {}
