import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {
  NxBadgeAccentColor,
  NxBadgeComponent,
  NxBadgeProminence,
  NxBadgeType,
} from './badge.component';
import { NxBadgeModule } from './badge.module';

@Directive({ standalone: true })
abstract class BadgeTest {
  @ViewChild(NxBadgeComponent)
  badgeInstance!: NxBadgeComponent;
  type = 'active';
  accentColor: NxBadgeAccentColor = 'yellow';
  prominence: NxBadgeProminence = 'subtle';
  disabled = false;
  inverse = false;
  vibrant = false;
}
describe('NxBadgeComponent', () => {
  let fixture: ComponentFixture<BadgeTest>;
  let testInstance: BadgeTest;
  let badgeInstance: NxBadgeComponent;
  let badgeNativeElement: HTMLElement;

  function createTestComponent(component: Type<BadgeTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    badgeInstance = testInstance.badgeInstance;
    badgeNativeElement = fixture.nativeElement.querySelector('nx-badge') as HTMLElement;
  }
  function setType(value: NxBadgeType) {
    fixture.componentInstance.type = value;
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxBadgeModule,
        DefaultBadgeComponent,
        BasicBadgeComponent,
        VibrantBadgeComponent,
        SingleLetterComponent,
        ConfigurableBadgeComponent,
        SignalBadgeComponent,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('should create', () => {
      createTestComponent(DefaultBadgeComponent);
      expect(badgeInstance).toBeTruthy();
    });

    it('should change the className according to the input', () => {
      createTestComponent(DefaultBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge--active');
      setType('critical');
      expect(badgeNativeElement).toHaveClass('nx-badge--critical');
    });

    it('should provide vibrant styling', () => {
      createTestComponent(VibrantBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge--vibrant');
    });

    it('should add single letter className', () => {
      createTestComponent(SingleLetterComponent);
      expect(badgeNativeElement).toHaveClass('single-letter');
    });
  });

  describe('programmatic changes', () => {
    it('should change the type', () => {
      createTestComponent(BasicBadgeComponent);
      badgeInstance.type = 'critical';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge--critical');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(DefaultBadgeComponent);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('accentColor', () => {
    it('should apply default yellow accent color', () => {
      createTestComponent(ConfigurableBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-yellow');
    });

    it('should apply red accent color', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.accentColor = 'red';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-red');
    });

    it('should apply brand accent color', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.accentColor = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-brand');
    });
  });

  describe('prominence', () => {
    it('should apply default subtle prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-yellow');
    });

    it('should apply attention prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-attention-yellow');
    });
  });

  describe('disabled', () => {
    it('should apply disabled class for subtle prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.disabled = true;
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-subtle--disabled');
    });

    it('should apply disabled class for attention prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.disabled = true;
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-attention--disabled');
    });

    it('should apply disabled class for brand accent color', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.disabled = true;
      testInstance.accentColor = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-attention--disabled');
    });

    it('should apply the inverse disabled classes', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.disabled = true;
      testInstance.inverse = true;
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-subtle--disabled--inverse');
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-attention--disabled--inverse');
    });
  });

  describe('inverse', () => {
    it('should apply inverse class', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-yellow--inverse');
    });

    it('should apply inverse with attention prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      testInstance.prominence = 'attention';
      testInstance.accentColor = 'red';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-attention-red--inverse');
    });

    it('should apply inverse with brand accent color', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      testInstance.accentColor = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-brand--inverse');
    });
  });

  describe('type with non-A1', () => {
    it('should keep the NDBX classes for the existing types', () => {
      createTestComponent(SignalBadgeComponent);
      for (const type of ['active', 'positive', 'critical', 'negative'] as const) {
        setType(type);
        expect(badgeNativeElement.className.trim()).toBe(`nx-badge--${type}`);
      }
    });

    it('should map info and warning to the NDBX classes', () => {
      createTestComponent(SignalBadgeComponent);
      setType('info');
      expect(badgeNativeElement).toHaveClass('nx-badge--active');
      setType('warning');
      expect(badgeNativeElement).toHaveClass('nx-badge--negative');
    });

    it('should ignore the newer inputs', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.accentColor = 'red';
      testInstance.prominence = 'attention';
      testInstance.inverse = true;
      testInstance.disabled = true;
      setType('critical');
      expect(badgeNativeElement.className.trim().split(/\s+/).sort()).toEqual([
        'nx-badge--critical',
      ]);
    });

    it('should combine type and vibrant', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.vibrant = true;
      setType('positive');
      expect(badgeNativeElement).toHaveClass('nx-badge--positive');
      expect(badgeNativeElement).toHaveClass('nx-badge--vibrant');
    });

    it('should use accentColor for the accent type', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.accentColor = 'blue';
      setType('accent');
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-blue');
    });
  });

  describe('type with A1', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
      });
    });

    it('should apply the subtle signal class for every type', () => {
      createTestComponent(SignalBadgeComponent);
      for (const type of ['info', 'warning', 'positive', 'critical'] as const) {
        setType(type);
        expect(badgeNativeElement).toHaveClass(`nx-badge-signal-subtle-${type}`);
      }
    });

    it('should map the legacy NDBX types', () => {
      createTestComponent(SignalBadgeComponent);
      setType('active');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle-info');
      setType('negative');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle-warning');
    });

    it('should not apply the NDBX classes', () => {
      createTestComponent(SignalBadgeComponent);
      setType('critical');
      expect(badgeNativeElement).not.toHaveClass('nx-badge--critical');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle-critical');
    });

    it('should take precedence over accentColor', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.accentColor = 'blue';
      setType('critical');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle-critical');
      expect(badgeNativeElement).not.toHaveClass('nx-badge-accent-color-subtle-blue');
    });

    it('should apply attention prominence', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.prominence = 'attention';
      setType('warning');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention-warning');
    });

    it('should apply inverse', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.inverse = true;
      setType('positive');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle-positive--inverse');
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention-positive--inverse');
    });

    it('should apply the signal disabled classes', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.disabled = true;
      setType('info');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle--disabled');
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention--disabled');
    });

    it('should apply the inverse signal disabled classes', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.disabled = true;
      testInstance.inverse = true;
      setType('info');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle--disabled--inverse');
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention--disabled--inverse');
    });

    it('should let a signal type win over the brand accentColor when disabled', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.accentColor = 'brand';
      testInstance.disabled = true;
      setType('critical');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-subtle--disabled');
      expect(badgeNativeElement).not.toHaveClass('nx-badge-attention--disabled');
      expect(badgeNativeElement).not.toHaveClass('nx-badge-signal-attention--disabled');
    });

    it('should apply the attention disabled classes for vibrant signal badges', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.vibrant = true;
      testInstance.disabled = true;
      setType('info');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention--disabled');
    });

    it('should show vibrant as attention prominence', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.vibrant = true;
      setType('critical');
      expect(badgeNativeElement).toHaveClass('nx-badge-signal-attention-critical');
      expect(badgeNativeElement).not.toHaveClass('nx-badge--vibrant');
    });

    it('should keep the NDBX vibrant class without a signal type', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.vibrant = true;
      setType('');
      expect(badgeNativeElement).toHaveClass('nx-badge--vibrant');
    });

    it('should use accentColor for the accent and empty type', () => {
      createTestComponent(SignalBadgeComponent);
      testInstance.accentColor = 'teal';
      setType('accent');
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-teal');
      setType('');
      expect(badgeNativeElement).toHaveClass('nx-badge-accent-color-subtle-teal');
    });
  });
});
@Component({
  selector: 'test-basic-badge-component',
  template: `<nx-badge>Active</nx-badge>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxBadgeModule],
})
class BasicBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-default-badge-component',
  template: `<nx-badge [type]="type">Active</nx-badge>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBadgeModule],
})
class DefaultBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-single-letter-component',
  template: `<nx-badge [type]="type">A</nx-badge>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBadgeModule],
})
class SingleLetterComponent extends BadgeTest {}

@Component({
  selector: 'test-vibrant-badge-component',
  template: '<nx-badge vibrant></nx-badge>',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBadgeModule],
})
class VibrantBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-configurable-badge-component',
  template: `<nx-badge
    [accentColor]="accentColor"
    [prominence]="prominence"
    [disabled]="disabled"
    [inverse]="inverse"
    >Badge</nx-badge
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBadgeModule],
})
class ConfigurableBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-signal-badge-component',
  template: `<nx-badge
    [type]="type"
    [vibrant]="vibrant"
    [accentColor]="accentColor"
    [prominence]="prominence"
    [disabled]="disabled"
    [inverse]="inverse"
    >Badge</nx-badge
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBadgeModule],
})
class SignalBadgeComponent extends BadgeTest {}
