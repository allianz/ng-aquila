import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxLicencePlateModule } from './licence-plate.module';
import { NxLicencePlateSeasonSuffixComponent } from './licence-plate-season-suffix.component';

@Directive()
abstract class LicencePlateSeasonSuffixTest {
    @ViewChild(NxLicencePlateSeasonSuffixComponent) instance!: NxLicencePlateSeasonSuffixComponent;

    appearance = 'default';
    disabled = false;
}

describe('NxLicencePlateSeasonSuffixComponent', () => {
    let fixture: ComponentFixture<LicencePlateSeasonSuffixTest>;
    let testInstance: LicencePlateSeasonSuffixTest;
    let instance: NxLicencePlateSeasonSuffixComponent;
    let element: HTMLElement;

    function createTestComponent(component: Type<LicencePlateSeasonSuffixTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        instance = testInstance.instance;
        element = fixture.debugElement.nativeElement.querySelector('nx-licence-plate-season-suffix');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicLicencePlateSeasonSuffix],
            imports: [NxLicencePlateModule, NxFormfieldModule, NxInputModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        createTestComponent(BasicLicencePlateSeasonSuffix);
    });

    it('creates the component', () => {
        expect(instance).toBeTruthy();
    });

    describe('start and end months', () => {
        it('shows the start month', () => {
            expect(element.querySelectorAll('span')[0].textContent).toBe('01');
        });

        it('shows the end month', () => {
            expect(element.querySelectorAll('span')[1].textContent).toBe('10');
        });
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
            <input nxInput [disabled]="disabled" />
            <nx-licence-plate-season-suffix nxFormfieldSuffix [startMonth]="1" [endMonth]="10"></nx-licence-plate-season-suffix>
        </nx-formfield>
    `,
})
class BasicLicencePlateSeasonSuffix extends LicencePlateSeasonSuffixTest {}
