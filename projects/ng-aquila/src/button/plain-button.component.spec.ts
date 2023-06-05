import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxButtonModule } from './button.module';
import { NxPlainButtonComponent, NxPlainButtonSize, NxPlainButtonVariant } from './plain-button.component';

@Directive()
abstract class ButtonTest {
    @ViewChild('button') buttonInstance!: NxPlainButtonComponent;

    classNames!: string;
}

describe('NxPlainButtonComponent', () => {
    let fixture: ComponentFixture<ButtonTest>;
    let testInstance: ButtonTest;
    let buttonElement: HTMLButtonElement;

    function createTestComponent(component: Type<ButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxButtonModule],
            declarations: [BasicButton, ButtonBindings],
        }).compileComponents();
    }));

    it('should create the button component', () => {
        createTestComponent(BasicButton);
        expect(testInstance.buttonInstance).toBeTruthy();
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.textContent).toBe('Hello Button');
    });

    it('creates a non-danger button', () => {
        createTestComponent(BasicButton);
        expect(testInstance.buttonInstance.danger).toBeFalse();
        expect(buttonElement).not.toHaveClass('nx-plain-button--danger');
    });

    it('should add small class', () => {
        createTestComponent(ButtonBindings);
        (fixture.componentInstance as ButtonBindings).size = 'small';
        fixture.detectChanges();
        expect(buttonElement).toHaveClass('nx-plain-button--small');
    });

    it('should add secondary class', () => {
        createTestComponent(ButtonBindings);
        (fixture.componentInstance as ButtonBindings).variant = 'secondary';
        fixture.detectChanges();
        expect(buttonElement).toHaveClass('nx-plain-button--secondary');
    });

    describe('danger', () => {
        it('displays a danger button', () => {
            createTestComponent(BasicButton);
            fixture.componentInstance.classNames = 'danger';
            fixture.detectChanges();
            expect(testInstance.buttonInstance.danger).toBeTrue();
            expect(buttonElement).toHaveClass('nx-plain-button--danger');

            fixture.componentInstance.classNames = '';
            fixture.detectChanges();
            expect(testInstance.buttonInstance.danger).toBeFalse();
            expect(buttonElement).not.toHaveClass('nx-plain-button--danger');
        });

        it('should add danger class with critical input', () => {
            createTestComponent(ButtonBindings);
            (fixture.componentInstance as ButtonBindings).critical = true;
            fixture.detectChanges();
            expect(buttonElement).toHaveClass('nx-plain-button--danger');
        });
    });
});

@Component({
    template: `<button [nxPlainButton]="classNames" #button>Hello Button</button>`,
})
class BasicButton extends ButtonTest {}

@Component({
    template: `<button [nxPlainButton]="classNames" [size]="size" [variant]="variant" [critical]="critical" #button>Hello Button</button>`,
})
class ButtonBindings extends ButtonTest {
    classNames = '';
    size: NxPlainButtonSize = 'medium';
    variant: NxPlainButtonVariant = 'primary';
    critical = false;
}
