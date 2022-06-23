import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxBadgeComponent, NxBadgeType } from './badge.component';
import { NxBadgeModule } from './badge.module';

@Directive()
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
            declarations: [DefaultBadgeComponent, BasicBadgeComponent, VibrantBadgeComponent],
            imports: [NxBadgeModule],
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
    template: `<nx-badge>Active</nx-badge>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicBadgeComponent extends BadgeTest {}

@Component({
    template: `<nx-badge [type]="type">Active</nx-badge>`,
})
class DefaultBadgeComponent extends BadgeTest {}

@Component({
    template: '<nx-badge vibrant></nx-badge>',
})
class VibrantBadgeComponent extends BadgeTest {}
