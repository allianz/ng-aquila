import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxDropdownComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxPhoneInputComponent } from './phone-input.component';
import { NxPhoneInputModule } from './phone-input.module';
import { NxPhoneInputIntl } from './phone-input-intl';

countries.registerLocale(de);

describe('PhoneInputComponent', () => {
    let phoneInputInstance: NxPhoneInputComponent;
    let fixture: ComponentFixture<PhoneInputTest>;
    let testInstance: PhoneInputTest;
    let dropdown: DebugElement;
    let overlayContainer: OverlayContainer;

    function createTestComponent(component: Type<PhoneInputTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        phoneInputInstance = testInstance.phoneInput;
        dropdown = getDropdown();
    }

    function getPanel(): HTMLElement {
        return overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel') as HTMLElement;
    }

    function getRenderedValue(): HTMLElement {
        return dropdown.nativeElement.querySelector('.nx-dropdown__rendered') as HTMLElement;
    }

    function getDropdown() {
        return fixture.debugElement.query(By.directive(NxDropdownComponent));
    }

    function getInput() {
        return fixture.debugElement.query(By.css('nx-phone-input')).query(By.css('input'));
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NxPhoneInputModule, ReactiveFormsModule, FormsModule],
            declarations: [ReactiveFormsPhoneInput, I18nProviderTest, DefaultPhoneInput, ConfigurablePhoneInput, CustomFormatter],
            providers: [NxPhoneInputIntl],
        }).compileComponents();

        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
        })();
    });

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should register as formfield control', () => {
        createTestComponent(DefaultPhoneInput);
        const formfield = fixture.debugElement.query(By.directive(NxFormfieldComponent)).componentInstance;
        expect(formfield._control).toBe(phoneInputInstance);
    });

    it('should have class on input', () => {
        createTestComponent(DefaultPhoneInput);
        const input = getInput().nativeElement;
        expect(input).toHaveClass('c-input');
    });

    it('should class on readonly input', () => {
        createTestComponent(ConfigurablePhoneInput);
        testInstance.readonly = true;
        fixture.detectChanges();
        const input = getInput().nativeElement;
        expect(input).toHaveClass('c-input');
    });

    it('should visually hide the dropdown when readonly', () => {
        createTestComponent(ConfigurablePhoneInput);
        expect(fixture.nativeElement.querySelector('nx-dropdown')).not.toHaveClass('hide');
        testInstance.readonly = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('nx-dropdown')).toHaveClass('hide');
    });

    it('should show the unformatted value when readonly', fakeAsync(() => {
        createTestComponent(ConfigurablePhoneInput);
        // for whatever reason we need fakeAsync and flush here or the ngModel value
        // seems to be deferred and will only come in after the expect
        flush();
        testInstance.readonly = true;
        fixture.detectChanges();
        flush();
        expect(fixture.nativeElement.querySelector('.readonly-input').value).toBe('+49123456');
    }));

    it('should reflect readonly state when setReadonly changed', () => {
        createTestComponent(DefaultPhoneInput);

        const container = fixture.debugElement.query(By.css('nx-formfield'))!.nativeElement;

        phoneInputInstance.setReadonly(true);
        fixture.detectChanges();
        expect(container).toHaveClass('is-readonly');
        expect(container.querySelector('.readonly-input')).toBeTruthy();

        phoneInputInstance.setReadonly(false);
        fixture.detectChanges();
        expect(container).not.toHaveClass('is-readonly');
        expect(container.querySelector('.readonly-input')).toBeFalsy();
    });

    it('should disable from input', () => {
        createTestComponent(ConfigurablePhoneInput);
        testInstance.disabled = true;
        fixture.detectChanges();
        const input = getInput()?.nativeElement;
        expect(dropdown.componentInstance.disabled).toBeTrue();
        expect(input.getAttribute('disabled')).toBe('true');
        testInstance.disabled = false;
        fixture.detectChanges();
        expect(dropdown.componentInstance.disabled).toBeFalse();
        expect(input.getAttribute('disabled')).toBeNull();
    });

    it('should update template after patchValue', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
        formControl.patchValue('+49666');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(getInput().nativeElement.value).toBe('666');
        expect(dropdown.nativeElement.innerText).toContain('+49');

        formControl.patchValue('+1456');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(getInput().nativeElement.value).toBe('456');
        expect(dropdown.nativeElement.innerText).toContain('+1');

        formControl.patchValue('');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(getInput().nativeElement.value).toBe('');
        // should fall back to what previous country code was set, by default +49
        expect(dropdown.nativeElement.innerText).toBe('+1');
    }));

    it('should reset country code after reset of form', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
        formControl.reset();
        fixture.detectChanges();
        expect(dropdown.nativeElement.innerText).toContain('+33');
    }));

    it('should disable from form control', () => {
        createTestComponent(ReactiveFormsPhoneInput);
        (testInstance as ReactiveFormsPhoneInput).formControl.disable();
        fixture.detectChanges();
        const input = getInput()?.nativeElement;
        expect(dropdown.componentInstance.disabled).toBeTrue();
        expect(input.getAttribute('disabled')).toBe('true');
        (testInstance as ReactiveFormsPhoneInput).formControl.enable();
        fixture.detectChanges();
        expect(dropdown.componentInstance.disabled).toBeFalse();
        expect(input.getAttribute('disabled')).toBeNull();
    });

    it('should remove leading zeros by default on blur', fakeAsync(() => {
        createTestComponent(DefaultPhoneInput);
        flush();
        const input = getInput().nativeElement;
        input.value = '01234';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        flush();
        expect(input.value).toBe('1234');
    }));

    it('should not remove leading zeros on blur if country is italy ', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        const input = getInput().nativeElement;

        const formControl = (testInstance as ReactiveFormsPhoneInput).formControl;
        formControl.setValue('+390123');
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        flush();
        expect(getInput().nativeElement.value).toBe('0123');
        expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+390123');
    }));

    it('should remove leading zero in model', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        const input = getInput().nativeElement;
        input.value = '01234';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        flush();
        expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+491234');
    }));

    it('should remove special characters from model', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        const input = getInput().nativeElement;
        input.value = '0(12)3-4';
        dispatchFakeEvent(input, 'input');
        fixture.detectChanges();
        flush();
        dispatchFakeEvent(input, 'blur');
        fixture.detectChanges();
        flush();
        expect((testInstance as ReactiveFormsPhoneInput).formControl.value).toBe('+491234');
    }));

    it('should change the dropdown top label via input', () => {
        createTestComponent(ConfigurablePhoneInput);
        dispatchFakeEvent(dropdown.nativeElement, 'click');
        fixture.detectChanges();
        expect(getPanel().innerText).toContain('My area code');
    });

    it('should change the country translations via input', () => {
        createTestComponent(ConfigurablePhoneInput);
        dispatchFakeEvent(dropdown.nativeElement, 'click');
        fixture.detectChanges();
        expect(getPanel().innerText).toContain('Deutschland');
    });

    it('should change the dropdown top label via provider', () => {
        createTestComponent(I18nProviderTest);
        dispatchFakeEvent(dropdown.nativeElement, 'click');
        fixture.detectChanges();
        expect(getPanel().innerText).toContain('Custom area code label');
    });

    it('should change the country translations via provider', () => {
        createTestComponent(I18nProviderTest);
        dispatchFakeEvent(dropdown.nativeElement, 'click');
        fixture.detectChanges();
        expect(getPanel().innerText).toContain('Deutschland');
    });

    it('should use default error state matcher', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        (testInstance as ReactiveFormsPhoneInput).formControl.setValue('');
        (testInstance as ReactiveFormsPhoneInput).formControl.markAsTouched();
        flush();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('nx-error')).toBeTruthy();
    }));

    it('should set country dropdown from model value', fakeAsync(() => {
        createTestComponent(ReactiveFormsPhoneInput);
        flush();
        (testInstance as ReactiveFormsPhoneInput).formControl.setValue('+177777');
        fixture.detectChanges();
        flush();
        expect(fixture.nativeElement.querySelector('nx-phone-input').innerText).toContain('+1');
    }));

    it('should have countries', () => {
        createTestComponent(DefaultPhoneInput);
        expect(Object.keys(phoneInputInstance.countryNames)).not.toHaveSize(0);
        dispatchFakeEvent(dropdown.nativeElement, 'click');
        fixture.detectChanges();
        expect(getPanel().innerText).toContain('Germany');
    });

    it('should accept a custom formatter', fakeAsync(() => {
        createTestComponent(CustomFormatter);
        flush();
        // fixture.detectChanges();
        const input = getInput();
        expect(input.nativeElement.value).toBe('12 34 56');
        input.nativeElement.value = '4444';
        dispatchFakeEvent(input.nativeElement, 'input');
        dispatchFakeEvent(input.nativeElement, 'blur');
        fixture.detectChanges();
        flush();
        expect(input.nativeElement.value).toBe('44 44');
    }));

    it('should set input placeholder', fakeAsync(() => {
        createTestComponent(ConfigurablePhoneInput);
        const input = getInput().nativeElement;
        expect(input.getAttribute('placeholder')).toBe('89 7531');
    }));

    it('should set country code', fakeAsync(() => {
        createTestComponent(DefaultPhoneInput);
        flush();
        fixture.detectChanges();
        flush();
        expect(getRenderedValue().innerText).toBe('+33');
    }));

    it('should not override country code from model', fakeAsync(() => {
        createTestComponent(ConfigurablePhoneInput);
        flush();
        fixture.detectChanges();
        flush();
        expect(getRenderedValue().innerText).toBe('+49');
    }));

    it('should not override country code if input is filled', fakeAsync(() => {
        createTestComponent(ConfigurablePhoneInput);
        flush();
        testInstance.countryCode = 'AT';
        fixture.detectChanges();
        flush();
        expect(getRenderedValue().innerText).toBe('+49');
    }));

    it('should call inputFormatter and update countryCode when country change', fakeAsync(() => {
        createTestComponent(ConfigurablePhoneInput);
        flush();
        spyOn(testInstance.phoneInput, 'inputFormatter');

        const select = dropdown.nativeElement;
        select.click();
        fixture.detectChanges();

        const selectOption = dropdown.query(By.css('[ng-reflect-value="UA"]'));
        selectOption.nativeElement.click();

        fixture.detectChanges();
        flush();

        expect(testInstance.phoneInput.countryCode).toBe('UA');
        expect(testInstance.phoneInput.inputFormatter).toHaveBeenCalled();
    }));
});

@Directive()
abstract class PhoneInputTest {
    @ViewChild(NxPhoneInputComponent) phoneInput!: NxPhoneInputComponent;
    disabled = false;
    readonly = false;
    areaCodeLabel = 'My area code';
    countries = countries.getNames('de', { select: 'official' });
    placeholder = '89 7531';
    countryCode = 'FR';
}

@Component({
    template: `<nx-formfield label="Telephone number">
        <nx-phone-input [countryCode]="countryCode"></nx-phone-input>
    </nx-formfield>`,
})
class DefaultPhoneInput extends PhoneInputTest {}

@Component({
    template: `<nx-formfield label="Telephone number">
        <nx-phone-input
            [(ngModel)]="value"
            [disabled]="disabled"
            [readonly]="readonly"
            [areaCodeLabel]="areaCodeLabel"
            [countryNames]="countries"
            [placeholder]="placeholder"
            [countryCode]="countryCode"
        ></nx-phone-input>
    </nx-formfield>`,
})
class ConfigurablePhoneInput extends PhoneInputTest {
    value = '+49123456';
}

@Component({
    template: `<nx-formfield label="Telephone number">
        <nx-phone-input [formControl]="formControl" [readonly]="readonly" [countryCode]="countryCode"></nx-phone-input>
        <nx-error nxFormfieldError>Error message</nx-error>
    </nx-formfield>`,
})
class ReactiveFormsPhoneInput extends PhoneInputTest {
    formControl = new FormControl('+49123456', Validators.required);
}

@Injectable()
class MyIntl extends NxPhoneInputIntl {
    areaCodeLabel = 'Custom area code label';
    countryNames = countries.getNames('de', { select: 'official' });
}

@Component({
    template: `<nx-formfield label="Telephone number">
        <nx-phone-input></nx-phone-input>
    </nx-formfield>`,
    providers: [{ provide: NxPhoneInputIntl, useClass: MyIntl }],
})
class I18nProviderTest extends PhoneInputTest {}

@Component({
    template: `<nx-formfield label="Telephone number">
        <nx-phone-input [inputFormatter]="formatter" [formControl]="formControl"></nx-phone-input>
        <nx-error nxFormfieldError>Error message</nx-error>
    </nx-formfield>`,
})
class CustomFormatter extends PhoneInputTest {
    formControl = new FormControl('+49123456', Validators.required);
    formatter(value: string, countryCode: string) {
        return value.match(/.{1,2}/g)?.join(' ') || '';
    }
}
