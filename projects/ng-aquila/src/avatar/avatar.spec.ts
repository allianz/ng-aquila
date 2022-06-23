import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxAvatarComponent, NxAvatarSize } from './avatar';
import { NxAvatarModule } from './avatar.module';

@Directive()
abstract class AvatarTest {
    @ViewChild(NxAvatarComponent) avatarInstance!: NxAvatarComponent;
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
            imports: [NxAvatarModule, NxIconModule],
            declarations: [AvatarWithText, AvatarWithIcon, AvatarWithImage, AvatarButton, ConfigurableAvatar],
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
});

@Component({
    template: `<div nxAvatar>SM</div>`,
})
class AvatarWithText extends AvatarTest {}

@Component({
    template: `
        <div nxAvatar>
            <nx-icon name="user-o"></nx-icon>
        </div>
    `,
})
class AvatarWithIcon extends AvatarTest {}

@Component({
    template: `
        <div nxAvatar>
            <figure nxFigure>
                <img alt="foo" />
            </figure>
        </div>
    `,
})
class AvatarWithImage extends AvatarTest {}

@Component({
    template: `<button nxAvatar>SM</button>`,
})
class AvatarButton extends AvatarTest {}

@Component({
    template: `<div nxAvatar [size]="size">SM</div>`,
})
class ConfigurableAvatar extends AvatarTest {}
