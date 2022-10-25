import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxLicencePlateModule } from './licence-plate.module';
import { NxLicencePlateEuroPrefixComponent } from './licence-plate-euro-prefix.component';

@Directive()
abstract class LicencePlateEuroPrefixTest {
    @ViewChild(NxLicencePlateEuroPrefixComponent) instance!: NxLicencePlateEuroPrefixComponent;

    appearance = 'default';
    disabled = false;
}

describe('NxLicencePlateEuroPrefixComponent', () => {
    let fixture: ComponentFixture<LicencePlateEuroPrefixTest>;
    let testInstance: LicencePlateEuroPrefixTest;
    let instance: NxLicencePlateEuroPrefixComponent;
    let element: HTMLElement;

    function createTestComponent(component: Type<LicencePlateEuroPrefixTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        instance = testInstance.instance;
        element = fixture.debugElement.nativeElement.querySelector('nx-licence-plate-euro-prefix');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicLicencePlateEuroPrefix],
            imports: [NxLicencePlateModule, NxFormfieldModule, NxInputModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        createTestComponent(BasicLicencePlateEuroPrefix);
    });

    it('creates the component', () => {
        expect(instance).toBeTruthy();
    });

    describe('disabled', () => {
        it('is not disabled', () => {
            expect(instance._disabled).toBeFalse();
            expect(element).not.toHaveClass('is-disabled');
        });

        it('is disabled', () => {
            testInstance.disabled = true;
            fixture.detectChanges();
            expect(instance._disabled).toBeTrue();
            expect(element).toHaveClass('is-disabled');
        });
    });

    describe('outline style', () => {
        it('has no outline style', () => {
            expect(instance._hasOutline).toBeFalse();
            expect(element).not.toHaveClass('has-outline');
        });

        it('has no outline style', () => {
            testInstance.appearance = 'outline';
            fixture.detectChanges();
            expect(instance._hasOutline).toBeTrue();
            expect(element).toHaveClass('has-outline');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-formfield [appearance]="appearance">
            <nx-licence-plate-euro-prefix>D</nx-licence-plate-euro-prefix>
            <input nxInput [disabled]="disabled" />
        </nx-formfield>
    `,
})
class BasicLicencePlateEuroPrefix extends LicencePlateEuroPrefixTest {}
