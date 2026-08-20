import { AppearanceType, NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxLicencePlateModule } from './licence-plate.module';
import { NxLicencePlateEuroPrefixComponent } from './licence-plate-euro-prefix.component';

@Directive({ standalone: true })
abstract class LicencePlateEuroPrefixTest {
  @ViewChild(NxLicencePlateEuroPrefixComponent)
  instance!: NxLicencePlateEuroPrefixComponent;

  appearance: AppearanceType = 'auto';
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
      imports: [
        NxLicencePlateModule,
        NxFormfieldModule,
        NxInputModule,
        BasicLicencePlateEuroPrefix,
      ],
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
      expect(instance._disabled).toBe(false);
      expect(element).not.toHaveClass('is-disabled');
    });

    it('is disabled', () => {
      testInstance.disabled = true;
      fixture.detectChanges();
      expect(instance._disabled).toBe(true);
      expect(element).toHaveClass('is-disabled');
    });
  });

  describe('outline style', () => {
    it('has no outline style', () => {
      expect(instance._hasOutline).toBe(false);
      expect(element).not.toHaveClass('has-outline');
    });

    it('has an outline style when the appearance is outline', () => {
      testInstance.appearance = 'outline';
      fixture.detectChanges();
      expect(instance._hasOutline).toBe(true);
      expect(element).toHaveClass('has-outline');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-basic-licence-plate-euro-prefix',
  template: `
    <nx-formfield [appearance]="appearance">
      <nx-licence-plate-euro-prefix>D</nx-licence-plate-euro-prefix>
      <input nxInput [disabled]="disabled" />
    </nx-formfield>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxLicencePlateModule, NxFormfieldModule, NxInputModule],
})
class BasicLicencePlateEuroPrefix extends LicencePlateEuroPrefixTest {}
