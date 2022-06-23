import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { ERROR_DEFAULT_OPTIONS, ErrorDefaultOptions, ErrorStyleType, NxErrorComponent } from './error.component';
import { NxErrorModule } from './error.module';

const errorOptions: ErrorDefaultOptions = {
    changes: new Subject<void>(),
    appearance: 'text',
};

@Directive()
abstract class ErrorTest {
    @ViewChild(NxErrorComponent) errorInstance!: NxErrorComponent;
    id!: string;
    appearance!: ErrorStyleType;
}

describe('NxErrorComponent', () => {
    let fixture: ComponentFixture<ErrorTest>;
    let testInstance: ErrorTest;
    let errorInstance: NxErrorComponent;

    function createTestComponent(component: Type<ErrorTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        errorInstance = testInstance.errorInstance;
    }

    describe('basic', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BasicError, ConfigurableError],
                imports: [NxErrorModule],
            }).compileComponents();
        }));

        it('creates the nx-error', () => {
            createTestComponent(BasicError);
            expect(errorInstance).toBeTruthy();
        });

        it('creates the nx-error with an icon', () => {
            createTestComponent(ConfigurableError);
            testInstance.appearance = 'text';
            fixture.detectChanges();
            const icon = fixture.nativeElement.querySelector('nx-icon') as HTMLButtonElement;
            expect(icon).toHaveClass('nx-error__icon');
            expect(errorInstance).toBeTruthy();
        });

        it('creates an error message with b2c look per default', () => {
            createTestComponent(BasicError);
            const messageEl = fixture.nativeElement.querySelector('nx-message');
            expect(messageEl).toBeTruthy();
        });

        it('creates the nx-error with an auto generated id', () => {
            createTestComponent(BasicError);
            const nxError = fixture.nativeElement.querySelector('nx-error') as HTMLButtonElement;

            expect(nxError.id).toMatch('^nx-error-[0-9]');
        });

        it('creates the nx-error with a custom id', () => {
            createTestComponent(ConfigurableError);
            const nxError = fixture.nativeElement.querySelector('nx-error') as HTMLButtonElement;

            testInstance.id = '';
            fixture.detectChanges();

            expect(nxError.id).toContain('nx-error-');

            testInstance.id = 'customID';
            fixture.detectChanges();

            expect(errorInstance.id).toBe('customID');
            expect(nxError.id).toBe('customID');
        });
    });

    describe('error option injection', () => {
        beforeEach(waitForAsync(() => {
            errorOptions.appearance = 'text';
            TestBed.configureTestingModule({
                declarations: [BasicError, ConfigurableError],
                imports: [NxErrorModule],
                providers: [{ provide: ERROR_DEFAULT_OPTIONS, useValue: errorOptions }],
            }).compileComponents();
        }));

        it('creates an error with the correct appearance', () => {
            createTestComponent(BasicError);
            const iconEl = fixture.nativeElement.querySelector('nx-icon');
            const messageEl = fixture.nativeElement.querySelector('nx-message');
            expect(iconEl).toBeTruthy();
            expect(messageEl).toBeFalsy();
            expect(testInstance.errorInstance.appearance).toBe('text');
        });

        it('changes the appearance on change', inject([ERROR_DEFAULT_OPTIONS], (defaultOptions: ErrorDefaultOptions) => {
            createTestComponent(BasicError);
            expect(testInstance.errorInstance.appearance).toBe('text');
            let messageEl = fixture.nativeElement.querySelector('nx-message');
            expect(messageEl).toBeFalsy();

            defaultOptions.appearance = 'message';
            defaultOptions.changes?.next();
            fixture.detectChanges();
            expect(testInstance.errorInstance.appearance).toBe('message');
            messageEl = fixture.nativeElement.querySelector('nx-message');
            expect(messageEl).toBeTruthy();
        }));

        it('creates an error with the correct appearance if appearance is explicitly set', () => {
            createTestComponent(ConfigurableError);
            testInstance.appearance = 'message';
            fixture.detectChanges();
            const messageEl = fixture.nativeElement.querySelector('nx-message');
            expect(messageEl).toBeTruthy();
        });
    });
});

@Component({
    template: `<nx-error>I am an error message.</nx-error>`,
})
class BasicError extends ErrorTest {}

@Component({
    template: `<nx-error [appearance]="appearance" [id]="id">I am an error message with an icon.</nx-error>`,
})
class ConfigurableError extends ErrorTest {}
