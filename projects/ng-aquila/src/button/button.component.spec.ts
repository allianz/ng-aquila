import { Component, Type, ViewChild, ChangeDetectionStrategy, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxButtonComponent } from './button.component';
import { NxButtonModule } from './button.module';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIconButtonComponent } from './icon-button.component';
import { NxButtonSize, NxButtonType, NxButtonBase } from './button-base';
import { By } from '@angular/platform-browser';

// For better readability here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class ButtonTest {
    @ViewChild('button') buttonInstance!: NxButtonBase;

    buttonType: NxButtonType = 'primary';
    buttonSize: NxButtonSize = 'medium';
    danger: string = '';
    negative: string = '';
    block: string = '';

    get classNames(): string {
        return `${this.buttonType} ${this.buttonSize} ${this.danger} ${this.negative} ${this.block}`;
    }
}
@Component({
    template: ` <button nxButton #button class="some-arbitray-class-name">Hello Button</button> `,
})
class BasicButton extends ButtonTest {}

@Component({
    template: `
        <button nxIconButton #button class="some-arbitray-class-name" aria-label="settings">
            <nx-icon name="settings"></nx-icon>
        </button>
    `,
})
class BasicIconButton extends ButtonTest {}

@Component({
    template: ` <button [nxButton]="classNames" #button>Configurable button</button> `,
})
class ConfigurableButton extends ButtonTest {}

@Component({
    template: `
        <button [nxIconButton]="classNames" #button aria-label="settings">
            <nx-icon name="settings"></nx-icon>
        </button>
    `,
})
class ConfigurableIconButton extends ButtonTest {}

@Component({
    template: ` <button [nxButton]="classNames" #button>Configurable button</button> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableOnPushButton extends ButtonTest {}

@Component({
    template: `
        <button [nxIconButton]="classNames" #button aria-label="settings">
            <nx-icon name="settings"></nx-icon>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfigurableOnPushIconButton extends ButtonTest {}

[
    {
        component: NxButtonComponent,
        basic: BasicButton,
        configurable: ConfigurableButton,
        onPush: ConfigurableOnPushButton,
    },
    {
        component: NxIconButtonComponent,
        basic: BasicIconButton,
        configurable: ConfigurableIconButton,
        onPush: ConfigurableOnPushIconButton,
    },
].forEach(testTarget => {
    describe(testTarget.component.name, () => {
        let fixture: ComponentFixture<ButtonTest>;
        let testInstance: ButtonTest;
        let buttonInstance: NxButtonComponent;
        let buttonNativeElement: HTMLButtonElement;

        function createTestComponent(component: Type<ButtonTest>) {
            fixture = TestBed.createComponent(component);
            fixture.detectChanges();
            testInstance = fixture.componentInstance;
            buttonInstance = testInstance.buttonInstance;
            buttonNativeElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
        }

        function changeAndCheckButtonSize(testSize: NxButtonSize, expectedClass: string) {
            fixture.componentInstance.buttonSize = testSize;
            fixture.detectChanges();
            expect(buttonInstance.size).toBe(testSize);
            expect(buttonNativeElement.classList).toContain(expectedClass);
        }

        function changeAndCheckButtonType(testType: NxButtonType, expectedClass: string) {
            fixture.componentInstance.buttonType = testType;
            fixture.detectChanges();
            expect(buttonInstance.type).toBe(testType);
            expect(buttonNativeElement.classList).toContain(expectedClass);
        }

        function changeAndCheckButtonTypeProgrammaticly(testType: NxButtonType, expectedClass: string) {
            buttonInstance.classNames = testType;
            fixture.detectChanges();
            expect(buttonInstance.type).toBe(testType);
            expect(buttonNativeElement.classList).toContain(expectedClass);
        }

        function changeAndCheckButtonSizeProgrammaticly(testSize: NxButtonSize, expectedClass: string) {
            buttonInstance.classNames = testSize;
            fixture.detectChanges();
            expect(buttonInstance.size).toBe(testSize);
            expect(buttonNativeElement.classList).toContain(expectedClass);
        }

        beforeEach(
            waitForAsync(() => {
                TestBed.configureTestingModule({
                    declarations: [testTarget.basic, testTarget.configurable, testTarget.onPush],
                    imports: [NxIconModule, NxButtonModule],
                }).compileComponents();
            }),
        );

        describe('basic', () => {
            it(
                'creates the button',
                waitForAsync(() => {
                    createTestComponent(testTarget.basic);
                    expect(buttonInstance).toBeTruthy();
                }),
            );

            it('creates a button with a medium size', () => {
                createTestComponent(testTarget.basic);
                expect(buttonNativeElement.classList).toContain('nx-button--medium');
            });

            it('creates a button with primary style', () => {
                createTestComponent(testTarget.basic);
                expect(buttonInstance.type).toBe('primary');
                expect(buttonNativeElement.classList).toContain('nx-button--primary');
            });

            it('creates a non-danger button', () => {
                createTestComponent(testTarget.basic);
                expect(buttonNativeElement.classList).not.toContain('nx-button--danger');
            });

            it('creates a non-negative button', () => {
                createTestComponent(testTarget.basic);
                expect(buttonNativeElement.classList).not.toContain('nx-button--negative');
            });

            it('creates a non-block button', () => {
                createTestComponent(testTarget.basic);
                expect(buttonNativeElement.classList).not.toContain('nx-button--block');
            });

            it(
                'allow other classes',
                waitForAsync(() => {
                    createTestComponent(testTarget.basic);
                    expect(buttonNativeElement.classList.contains('some-arbitray-class-name')).toBe(true);
                }),
            );
        });

        describe('buttonType', () => {
            it('renders the button with the chosen [buttonType]', () => {
                createTestComponent(testTarget.configurable);
                changeAndCheckButtonType('secondary', 'nx-button--secondary');
                changeAndCheckButtonType('cta', 'nx-button--cta');
                changeAndCheckButtonType('emphasis', 'nx-button--emphasis');
                changeAndCheckButtonType('primary', 'nx-button--primary');
                changeAndCheckButtonType('tertiary', 'nx-button--tertiary');
            });
        });

        describe('buttonSize', () => {
            it('renders the button with the chosen [buttonSize]', () => {
                createTestComponent(testTarget.configurable);
                changeAndCheckButtonSize('small', 'nx-button--small');
                changeAndCheckButtonSize('large', 'nx-button--large');
                changeAndCheckButtonSize('medium', 'nx-button--medium');
                changeAndCheckButtonSize('small-medium', 'nx-button--small-medium');
            });
        });

        describe('danger', () => {
            it('displays a danger button', () => {
                createTestComponent(testTarget.configurable);
                fixture.componentInstance.danger = 'danger';
                fixture.detectChanges();
                expect(buttonInstance.danger).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--danger');

                fixture.componentInstance.danger = '';
                fixture.detectChanges();
                expect(buttonInstance.danger).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--danger');
            });
        });

        describe('negative styling', () => {
            it('displays a negative button', () => {
                createTestComponent(testTarget.configurable);
                fixture.componentInstance.negative = 'negative';
                fixture.detectChanges();
                expect(buttonInstance.negative).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--negative');

                fixture.componentInstance.negative = '';
                fixture.detectChanges();
                expect(buttonInstance.negative).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--negative');
            });
        });

        describe('block layout', () => {
            it('displays the button with block layout', () => {
                createTestComponent(testTarget.configurable);
                fixture.componentInstance.block = 'block';
                fixture.detectChanges();
                expect(buttonInstance.block).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--block');

                fixture.componentInstance.block = '';
                fixture.detectChanges();
                expect(buttonInstance.block).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--block');
            });
        });

        describe('programmatic tests', () => {
            it('renders the button with the chosen [buttonType]', () => {
                createTestComponent(testTarget.onPush);
                changeAndCheckButtonTypeProgrammaticly('primary', 'nx-button--primary');
                changeAndCheckButtonTypeProgrammaticly('secondary', 'nx-button--secondary');
                changeAndCheckButtonTypeProgrammaticly('tertiary', 'nx-button--tertiary');
                changeAndCheckButtonTypeProgrammaticly('cta', 'nx-button--cta');
                changeAndCheckButtonTypeProgrammaticly('emphasis', 'nx-button--emphasis');
            });

            it('renders the button with the chosen [buttonSize]', () => {
                createTestComponent(testTarget.onPush);
                changeAndCheckButtonSizeProgrammaticly('small', 'nx-button--small');
                changeAndCheckButtonSizeProgrammaticly('large', 'nx-button--large');
                changeAndCheckButtonSizeProgrammaticly('medium', 'nx-button--medium');
                changeAndCheckButtonSizeProgrammaticly('small-medium', 'nx-button--small-medium');
            });

            it('updates view on danger change', () => {
                createTestComponent(testTarget.onPush);
                buttonInstance.classNames = 'danger';
                fixture.detectChanges();
                expect(buttonInstance.danger).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--danger');

                buttonInstance.classNames = '';
                fixture.detectChanges();
                expect(buttonInstance.danger).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--danger');
            });

            it('updates view on negative change', () => {
                createTestComponent(testTarget.onPush);
                buttonInstance.classNames = 'negative';
                fixture.detectChanges();
                expect(buttonInstance.negative).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--negative');

                buttonInstance.classNames = '';
                fixture.detectChanges();
                expect(buttonInstance.negative).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--negative');
            });

            it('updates view on block change', () => {
                createTestComponent(testTarget.onPush);
                buttonInstance.classNames = 'block';
                fixture.detectChanges();
                expect(buttonInstance.block).toBe(true);
                expect(buttonNativeElement.classList).toContain('nx-button--block');

                buttonInstance.classNames = '';
                fixture.detectChanges();
                expect(buttonInstance.block).toBe(false);
                expect(buttonNativeElement.classList).not.toContain('nx-button--block');
            });
        });

        describe('a11y', () => {
            it('has no accessibility violations', async () => {
                createTestComponent(testTarget.basic);
                return expectAsync(fixture.nativeElement).toBeAccessible();
            });
        });
    });
});
