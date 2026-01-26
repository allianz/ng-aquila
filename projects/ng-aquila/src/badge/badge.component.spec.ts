import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {
  NxBadgeColorScheme,
  NxBadgeComponent,
  NxBadgeProminence,
  NxBadgeType,
} from './badge.component';
import { NxBadgeModule } from './badge.module';

@Directive({ standalone: true })
abstract class BadgeTest {
  @ViewChild(NxBadgeComponent) badgeInstance!: NxBadgeComponent;
  type = 'active';
  colorScheme: NxBadgeColorScheme = 'yellow';
  prominence: NxBadgeProminence = 'subtle';
  disabled = false;
  inverse = false;
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
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });

  describe('colorScheme', () => {
    it('should apply default yellow color scheme', () => {
      createTestComponent(ConfigurableBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-subtle-yellow');
    });

    it('should apply red color scheme', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.colorScheme = 'red';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-subtle-red');
    });

    it('should apply brand color scheme', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.colorScheme = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-brand');
    });
  });

  describe('prominence', () => {
    it('should apply default subtle prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-subtle-yellow');
    });

    it('should apply attention prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.prominence = 'attention';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-attention-yellow');
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

    it('should apply disabled class for brand color scheme', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.disabled = true;
      testInstance.colorScheme = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-attention--disabled');
    });
  });

  describe('inverse', () => {
    it('should apply inverse class', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-subtle-yellow--inverse');
    });

    it('should apply inverse with attention prominence', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      testInstance.prominence = 'attention';
      testInstance.colorScheme = 'red';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-color-attention-red--inverse');
    });

    it('should apply inverse with brand color scheme', () => {
      createTestComponent(ConfigurableBadgeComponent);
      testInstance.inverse = true;
      testInstance.colorScheme = 'brand';
      fixture.detectChanges();
      expect(badgeNativeElement).toHaveClass('nx-badge-scheme-brand--inverse');
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
  imports: [NxBadgeModule],
})
class DefaultBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-single-letter-component',
  template: `<nx-badge [type]="type">A</nx-badge>`,
  imports: [NxBadgeModule],
})
class SingleLetterComponent extends BadgeTest {}

@Component({
  selector: 'test-vibrant-badge-component',
  template: '<nx-badge vibrant></nx-badge>',
  imports: [NxBadgeModule],
})
class VibrantBadgeComponent extends BadgeTest {}

@Component({
  selector: 'test-configurable-badge-component',
  template: `<nx-badge
    [colorScheme]="colorScheme"
    [prominence]="prominence"
    [disabled]="disabled"
    [inverse]="inverse"
    >Badge</nx-badge
  >`,
  imports: [NxBadgeModule],
})
class ConfigurableBadgeComponent extends BadgeTest {}
