import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxPasswordToggleComponent } from './password-toggle.component';

@Directive()
abstract class PasswordToggleTest {
    @ViewChild(NxPasswordToggleComponent) passwordToggle!: NxPasswordToggleComponent;
}

describe('NxPasswordToggleComponent', () => {
    let fixture: ComponentFixture<PasswordToggleTest>;
    let testInstance: PasswordToggleTest;
    let passwordToggle: NxPasswordToggleComponent;
    let nativeElement: HTMLElement;

    const createTestComponent = (component: Type<PasswordToggleTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        passwordToggle = testInstance.passwordToggle;
        nativeElement = fixture.nativeElement.querySelector('nx-password-toggle');
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicPasswordToggle, NoControlToggle, BasicPasswordToggleOnPush],
            imports: [NxInputModule, FormsModule],
        }).compileComponents();
    }));

    it('creates the password toggle', () => {
        createTestComponent(BasicPasswordToggle);
        expect(passwordToggle).toBeTruthy();
    });

    it('should warn if a control is missing', () => {
        spyOn(console, 'warn').and.callFake(() => {});
        createTestComponent(NoControlToggle);
        expect(console.warn).toHaveBeenCalledWith('You need to pass an input as a control to the password toggle.');
    });

    describe('on click', () => {
        it('toggles the icon correctly', () => {
            createTestComponent(BasicPasswordToggle);
            expect(passwordToggle._currentIcon).toBe('password-show-o');
            nativeElement.click();
            fixture.detectChanges();
            expect(passwordToggle._currentIcon).toBe('password-hide-o');
        });

        it('toggles aria-pressed', () => {
            createTestComponent(BasicPasswordToggle);
            expect(nativeElement.getAttribute('aria-pressed')).toBe(false.toString());
            nativeElement.click();
            fixture.detectChanges();
            expect(nativeElement.getAttribute('aria-pressed')).toBe(true.toString());
        });
    });

    describe('programmatic changes', () => {
        it('toggles the icon correctly', () => {
            createTestComponent(BasicPasswordToggleOnPush);
            fixture.detectChanges();
            expect(passwordToggle._currentIcon).toBe('password-show-o');

            passwordToggle.toggleInputType();
            fixture.detectChanges();
            expect(passwordToggle._currentIcon).toBe('password-hide-o');
        });
    });

    describe('a11y', () => {
        it('can set aria-label', () => {
            createTestComponent(BasicPasswordToggle);
            passwordToggle.ariaLabel = 'custom label';
            fixture.detectChanges();

            const label = nativeElement.attributes.getNamedItem('aria-label')!.value;
            expect(label).toBe('custom label');
        });

        it('has no accessibility violations', async () => {
            createTestComponent(BasicPasswordToggle);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-formfield label="Password">
            <input required nxInput #testInput type="password" [(ngModel)]="inputValue" />
            <span nxFormfieldSuffix>
                <nx-password-toggle [control]="testInput"></nx-password-toggle>
            </span>
        </nx-formfield>
    `,
})
class BasicPasswordToggle extends PasswordToggleTest {
    inputValue: any;
}

@Component({
    template: `
        <nx-formfield label="Password">
            <input required nxInput #testInput type="password" [(ngModel)]="inputValue" />
            <span nxFormfieldSuffix>
                <nx-password-toggle [control]="testInput"></nx-password-toggle>
            </span>
        </nx-formfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicPasswordToggleOnPush extends PasswordToggleTest {
    inputValue: any;
}

@Component({
    template: `<nx-password-toggle></nx-password-toggle>`,
})
class NoControlToggle extends PasswordToggleTest {}
