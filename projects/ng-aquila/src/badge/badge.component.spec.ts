import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxBadgeComponent, NxBadgeType } from './badge.component';
import { NxBadgeModule } from './badge.module';

@Directive({ standalone: true })
abstract class BadgeTest {
  @ViewChild(NxBadgeComponent) badgeInstance!: NxBadgeComponent;
  type = 'active';
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
