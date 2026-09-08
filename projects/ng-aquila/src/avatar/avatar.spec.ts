import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxIndicatorModule } from '@allianz/ng-aquila/indicator';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxAvatarAccentColor, NxAvatarComponent, NxAvatarProminence, NxAvatarSize } from './avatar';
import { NxAvatarModule } from './avatar.module';

@Directive({ standalone: true })
abstract class AvatarTest {
  @ViewChild(NxAvatarComponent)
  avatarInstance!: NxAvatarComponent;
  size: NxAvatarSize = 'small';
}

describe('NxAvatarComponent', () => {
  let fixture: ComponentFixture<AvatarTest>;
  let testInstance: AvatarTest;
  let avatarInstance: NxAvatarComponent;
  let avatarElement: HTMLElement;

  function createTestComponent(component: Type<AvatarTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    avatarInstance = testInstance.avatarInstance;
    avatarElement = fixture.debugElement.nativeElement.querySelector('[nxavatar]');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxAvatarModule,
        NxIconModule,
        AvatarWithText,
        AvatarWithIcon,
        AvatarWithImage,
        AvatarButton,
        ConfigurableAvatar,
        AvatarWithAccent,
        ConfigurableDisabledAvatar,
        DisabledAvatarWithAccent,
        ConfigurableAvatarWithIndicator,
        AvatarWithSizedIndicator,
      ],
    }).compileComponents();
  }));

  describe('basic', () => {
    it('creates the avatar', () => {
      createTestComponent(AvatarWithText);
      expect(avatarInstance).toBeTruthy();
    });

    it('is medium size by default', () => {
      createTestComponent(AvatarWithText);
      expect(avatarInstance.size).toBe('medium');
      expect(avatarElement).toHaveClass('nx-avatar--medium');
    });

    it('creates the avatar with text inside', () => {
      createTestComponent(AvatarWithText);
      expect(avatarElement.textContent?.trim()).toBe('SM');
    });

    it('creates the avatar with an icon inside', () => {
      createTestComponent(AvatarWithIcon);
      expect(avatarElement.querySelector('nx-icon')).toBeTruthy();
    });

    it('creates the avatar with an image inside', () => {
      createTestComponent(AvatarWithImage);
      expect(avatarElement.querySelector('[nxfigure]')).toBeTruthy();
    });
  });

  describe('size', () => {
    it('updates the size on input change', () => {
      createTestComponent(ConfigurableAvatar);
      expect(avatarInstance.size).toBe('small');
      expect(avatarElement).toHaveClass('nx-avatar--small');
      expect(avatarElement).not.toHaveClass('nx-avatar--medium');

      avatarInstance.size = 'xlarge';
      fixture.detectChanges();
      expect(avatarInstance.size).toBe('xlarge');
      expect(avatarElement).toHaveClass('nx-avatar--xlarge');
    });

    const SIZE_CLASSES = [
      ['xsmall', 'nx-avatar--xsmall'],
      ['small', 'nx-avatar--small'],
      ['s', 'nx-avatar--small'],
      ['small-medium', 'nx-avatar--small-medium'],
      ['medium', 'nx-avatar--medium'],
      ['m', 'nx-avatar--medium'],
      ['large', 'nx-avatar--large'],
      ['l', 'nx-avatar--large'],
      ['xlarge', 'nx-avatar--xlarge'],
      ['xl', 'nx-avatar--xlarge'],
    ] as const satisfies readonly (readonly [NxAvatarSize, string])[];

    for (const [size, expectedClass] of SIZE_CLASSES) {
      it(`applies only ${expectedClass} for size "${size}"`, () => {
        createTestComponent(ConfigurableAvatar);
        testInstance.size = size;
        fixture.detectChanges();

        expect(avatarElement).toHaveClass(expectedClass);
        expect(avatarInstance.size).toBe(size);
      });
    }
  });

  describe('avatar button', () => {
    it('sets the button class', () => {
      createTestComponent(AvatarButton);
      expect(avatarElement).toHaveClass('is-button');
    });

    it('also uses the NxAvatarComponent for the element', () => {
      createTestComponent(AvatarButton);
      expect(avatarElement).toHaveClass('nx-avatar--medium');
    });
  });

  describe('accent color', () => {
    it('should return the correct class when prominence is attention', () => {
      createTestComponent(AvatarWithAccent);
      (testInstance as any).accentColor = 'blue';
      (testInstance as any).prominence = 'attention';
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--accent-attention-blue');
    });

    it('should return the correct class for a custom accent color', () => {
      createTestComponent(AvatarWithAccent);
      (testInstance as any).accentColor = 'blue';
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--accent-subtle-blue');
    });

    it('should return the correct class for attention prominence and custom accent color', () => {
      createTestComponent(AvatarWithAccent);
      (testInstance as any).prominence = 'attention';
      (testInstance as any).accentColor = 'red';
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--accent-attention-red');
    });
  });

  describe('disabled', () => {
    it('should apply disabled class when disabled is true', () => {
      createTestComponent(ConfigurableDisabledAvatar);
      expect(avatarElement).toHaveClass('nx-avatar--disabled');
    });

    it('should update disabled class on input change', () => {
      createTestComponent(ConfigurableDisabledAvatar);
      expect(avatarElement).toHaveClass('nx-avatar--disabled');

      (testInstance as any).disabled = false;
      fixture.detectChanges();
      expect(avatarElement).not.toHaveClass('nx-avatar--disabled');

      (testInstance as any).disabled = true;
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--disabled');
    });

    it('should apply disabled class with attention prominence', () => {
      createTestComponent(DisabledAvatarWithAccent);
      expect(avatarElement).toHaveClass('nx-avatar--disabled');
      expect(avatarElement).toHaveClass('is-attention');
    });
  });

  describe('inverse', () => {
    it('should not apply the inverse class by default', () => {
      createTestComponent(AvatarWithText);
      expect(avatarElement).not.toHaveClass('nx-avatar--inverse');
    });

    it('should update the inverse class on input change', () => {
      createTestComponent(ConfigurableInverseAvatar);
      expect(avatarElement).toHaveClass('nx-avatar--inverse');

      (testInstance as any).inverse = false;
      fixture.detectChanges();
      expect(avatarElement).not.toHaveClass('nx-avatar--inverse');

      (testInstance as any).inverse = true;
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--inverse');
    });

    it('should keep the accent color class alongside the inverse class', () => {
      createTestComponent(ConfigurableInverseAvatar);
      (testInstance as any).accentColor = 'blue';
      (testInstance as any).prominence = 'attention';
      fixture.detectChanges();
      expect(avatarElement).toHaveClass('nx-avatar--accent-attention-blue');
      expect(avatarElement).toHaveClass('nx-avatar--inverse');
    });
  });

  describe('indicator', () => {
    it('should project a nx-indicator with nxAvatarIndicator as a direct child of the host', () => {
      createTestComponent(AvatarWithIndicator);
      const indicator = avatarElement.querySelector('nx-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator!.parentElement).toBe(avatarElement);
      expect(indicator).toHaveClass('nx-indicator--bottom-end');
      expect(indicator).toHaveClass('nx-avatar__indicator');
    });

    it('should not project a nx-indicator without nxAvatarIndicator into the indicator slot', () => {
      createTestComponent(AvatarWithUnmarkedIndicator);
      const indicator = avatarElement.querySelector('nx-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator!.parentElement).not.toBe(avatarElement);
    });

    it('should visually force the indicator into the bottom-end corner regardless of the position input', () => {
      createTestComponent(AvatarWithCustomPositionIndicator);
      const indicator = avatarElement.querySelector('nx-indicator') as HTMLElement;
      expect(getComputedStyle(indicator).position).toBe('absolute');

      const avatarRect = avatarElement.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      expect(Math.round(indicatorRect.right)).toBe(Math.round(avatarRect.right));
      expect(Math.round(indicatorRect.bottom)).toBe(Math.round(avatarRect.bottom));
    });

    const INDICATOR_SIZE_CLASSES = [
      ['xsmall', 'nx-indicator--800'],
      ['small', 'nx-indicator--800'],
      ['s', 'nx-indicator--800'],
      ['small-medium', 'nx-indicator--1200'],
      ['medium', 'nx-indicator--1200'],
      ['m', 'nx-indicator--1200'],
      ['large', 'nx-indicator--1600'],
      ['l', 'nx-indicator--1600'],
      ['xlarge', 'nx-indicator--2000'],
      ['xl', 'nx-indicator--2000'],
    ] as const satisfies readonly (readonly [NxAvatarSize, string])[];

    for (const [size, expectedClass] of INDICATOR_SIZE_CLASSES) {
      it(`sizes the projected indicator as ${expectedClass} for avatar size "${size}"`, () => {
        createTestComponent(ConfigurableAvatarWithIndicator);
        testInstance.size = size;
        fixture.detectChanges();

        expect(avatarElement.querySelector('nx-indicator')).toHaveClass(expectedClass);
      });
    }

    it('overrides the size input of the projected indicator', () => {
      createTestComponent(AvatarWithSizedIndicator);
      const indicator = avatarElement.querySelector('nx-indicator');

      expect(indicator).toHaveClass('nx-indicator--1200');
      expect(indicator).not.toHaveClass('nx-indicator--s');
    });

    it('resizes the projected indicator when the avatar size changes', () => {
      createTestComponent(ConfigurableAvatarWithIndicator);
      const indicator = avatarElement.querySelector('nx-indicator');
      expect(indicator).toHaveClass('nx-indicator--800');

      testInstance.size = 'xlarge';
      fixture.detectChanges();
      expect(indicator).toHaveClass('nx-indicator--2000');
      expect(indicator).not.toHaveClass('nx-indicator--800');
    });
  });
});

@Component({
  selector: 'test-avatar-with-text',
  template: `<div nxAvatar>SM</div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class AvatarWithText extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-icon',
  template: `
    <div nxAvatar>
      <nx-icon name="user-o"></nx-icon>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class AvatarWithIcon extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-image',
  template: `
    <div nxAvatar>
      <figure nxFigure>
        <img alt="foo" />
      </figure>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class AvatarWithImage extends AvatarTest {}

@Component({
  selector: 'test-avatar-button',
  template: `<button nxAvatar>SM</button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class AvatarButton extends AvatarTest {}

@Component({
  selector: 'test-configurable-avatar',
  template: `<div nxAvatar [size]="size">SM</div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class ConfigurableAvatar extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-accent',
  template: `<div nxAvatar [accentColor]="accentColor" [prominence]="prominence">SM</div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class AvatarWithAccent extends AvatarTest {
  accentColor: NxAvatarAccentColor = 'default';
  prominence: NxAvatarProminence = 'subtle';
}

@Component({
  selector: 'test-configurable-disabled-avatar',
  template: `<div nxAvatar [disabled]="disabled">MD</div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class ConfigurableDisabledAvatar extends AvatarTest {
  disabled = true;
}

@Component({
  selector: 'test-disabled-avatar-with-accent',
  template: `<div nxAvatar [disabled]="true" prominence="attention" [accentColor]="'blue'">
    MD
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class DisabledAvatarWithAccent extends AvatarTest {}

@Component({
  selector: 'test-configurable-inverse-avatar',
  template: `<div
    nxAvatar
    [inverse]="inverse"
    [accentColor]="accentColor"
    [prominence]="prominence"
  >
    MD
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule],
})
class ConfigurableInverseAvatar extends AvatarTest {
  inverse = true;
  accentColor: NxAvatarAccentColor = 'default';
  prominence: NxAvatarProminence = 'subtle';
}

@Component({
  selector: 'test-avatar-with-indicator',
  template: `<div nxAvatar>
    <span aria-hidden="true">MD</span>
    <nx-indicator nxAvatarIndicator position="bottom-end"></nx-indicator>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule, NxIndicatorModule],
})
class AvatarWithIndicator extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-unmarked-indicator',
  template: `<div nxAvatar>
    <span aria-hidden="true">MD</span>
    <nx-indicator position="bottom-end"></nx-indicator>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule, NxIndicatorModule],
})
class AvatarWithUnmarkedIndicator extends AvatarTest {}

@Component({
  selector: 'test-configurable-avatar-with-indicator',
  template: `<div nxAvatar [size]="size">
    <span aria-hidden="true">MD</span>
    <nx-indicator nxAvatarIndicator position="bottom-end"></nx-indicator>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule, NxIndicatorModule],
})
class ConfigurableAvatarWithIndicator extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-sized-indicator',
  template: `<div nxAvatar size="medium">
    <span aria-hidden="true">MD</span>
    <nx-indicator nxAvatarIndicator size="s"></nx-indicator>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule, NxIndicatorModule],
})
class AvatarWithSizedIndicator extends AvatarTest {}

@Component({
  selector: 'test-avatar-with-custom-position-indicator',
  template: `<div nxAvatar>
    <span aria-hidden="true">MD</span>
    <nx-indicator nxAvatarIndicator position="top-start"></nx-indicator>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAvatarModule, NxIconModule, NxIndicatorModule],
})
class AvatarWithCustomPositionIndicator extends AvatarTest {}
