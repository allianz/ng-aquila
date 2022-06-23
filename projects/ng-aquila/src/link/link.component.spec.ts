import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxLinkComponent, NxLinkSize } from './link.component';
import { NxLinkModule } from './link.module';

@Directive()
abstract class LinkTest {
    @ViewChild(NxLinkComponent) linkInstance!: NxLinkComponent;

    size: NxLinkSize = 'large';
}

describe('NxLinkComponent', () => {
    let fixture: ComponentFixture<LinkTest>;
    let testInstance: LinkTest;
    let linkInstance: NxLinkComponent;
    let linkDebugElement: DebugElement;

    const createTestComponent = (component: Type<LinkTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        linkInstance = testInstance.linkInstance;
        linkDebugElement = fixture.debugElement.query(By.directive(NxLinkComponent));
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicLink, DynamicLink, IconLink, OnPushLink],
            imports: [NxLinkModule, NxIconModule],
        }).compileComponents();
    }));

    it('creates the Link', waitForAsync(() => {
        createTestComponent(BasicLink);
        expect(linkInstance).toBeTruthy();
    }));

    it('default includes the bem block element', waitForAsync(() => {
        createTestComponent(BasicLink);
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link');
    }));

    it('should change class when input changes', () => {
        createTestComponent(DynamicLink);
        (testInstance as DynamicLink).style = 'black';
        fixture.detectChanges();
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--black');
    });

    it('should add a class to nx-icon instances', () => {
        createTestComponent(IconLink);
        const icon: HTMLElement = fixture.nativeElement.querySelector('nx-icon');
        expect(icon).toHaveClass('nx-link__icon');
    });

    it('should have small size on default', () => {
        createTestComponent(BasicLink);
        expect(linkInstance.size).toBe('small');
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
        expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');
    });

    it('should change the link size', () => {
        createTestComponent(DynamicLink);
        expect(linkInstance.size).toBe('large');
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--large');
        expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--small');

        testInstance.size = 'small';
        fixture.detectChanges();
        expect(linkInstance.size).toBe('small');
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
        expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');
    });

    it('should update size on programmatic change', () => {
        createTestComponent(OnPushLink);
        expect(linkInstance.size).toBe('large');

        linkInstance.size = 'small';
        fixture.detectChanges();
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
        expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');

        linkInstance.size = 'large';
        fixture.detectChanges();
        expect(linkDebugElement.nativeElement).toHaveClass('nx-link--large');
        expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--small');
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicLink);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-link>
            <a>link</a>
        </nx-link>
    `,
})
class BasicLink extends LinkTest {}

@Component({
    template: `
        <nx-link [nxStyle]="style" [size]="size">
            <a>link</a>
        </nx-link>
    `,
})
class DynamicLink extends LinkTest {
    style = '';
}

@Component({
    template: `
        <nx-link [nxStyle]="style">
            <a><nx-icon name="user-o"></nx-icon>link</a>
        </nx-link>
    `,
})
class IconLink extends LinkTest {
    style = '';
}

@Component({
    template: `
        <nx-link [nxStyle]="style" [size]="size">
            <a>link</a>
        </nx-link>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OnPushLink extends LinkTest {
    style = '';
}
