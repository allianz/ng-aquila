import { NxIconModule } from '@allianz/ng-aquila/icon';
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
