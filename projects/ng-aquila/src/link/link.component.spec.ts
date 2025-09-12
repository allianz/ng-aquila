import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxLinkComponent, NxLinkProminence, NxLinkSize, NxLinkType } from './link.component';
import { NxLinkModule } from './link.module';

@Directive({ standalone: true })
abstract class LinkTest {
  @ViewChild(NxLinkComponent) linkInstance!: NxLinkComponent;

  size = signal<NxLinkSize>('large');
  type = signal<NxLinkType>('primary');
  prominence = signal<NxLinkProminence>('default');
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
      imports: [NxLinkModule, NxIconModule, BasicLink, DynamicLink, IconLink, OnPushLink],
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
    expect(linkInstance.size()).toBe('small');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');
  });

  it('should change the link size', () => {
    createTestComponent(DynamicLink);
    expect(linkInstance.size()).toBe('large');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--large');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--small');

    testInstance.size.set('small');
    fixture.detectChanges();
    expect(linkInstance.size()).toBe('small');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');
  });

  it('should update size on programmatic change', () => {
    createTestComponent(OnPushLink);
    expect(linkInstance.size()).toBe('large');

    testInstance.size.set('small');
    fixture.detectChanges();
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--small');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--large');

    testInstance.size.set('large');
    fixture.detectChanges();
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--large');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--small');
  });

  it('should have primary type on default', () => {
    createTestComponent(BasicLink);
    expect(linkInstance.type()).toBe('primary');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--primary');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--secondary');
  });

  it('should change the link type to secondary', () => {
    createTestComponent(DynamicLink);
    expect(linkInstance.type()).toBe('primary');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--primary');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--secondary');

    testInstance.type.set('secondary');
    fixture.detectChanges();
    expect(linkInstance.type()).toBe('secondary');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--secondary');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--primary');
  });

  it('should have default prominence on default', () => {
    createTestComponent(BasicLink);
    expect(linkInstance.prominence()).toBe('default');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--subtle');
  });

  it('should change the link type to secondary', () => {
    createTestComponent(DynamicLink);
    expect(linkInstance.prominence()).toBe('default');
    expect(linkDebugElement.nativeElement).not.toHaveClass('nx-link--subtle');

    testInstance.prominence.set('subtle');
    fixture.detectChanges();
    expect(linkInstance.prominence()).toBe('subtle');
    expect(linkDebugElement.nativeElement).toHaveClass('nx-link--subtle');
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
  imports: [NxLinkModule, NxIconModule],
})
class BasicLink extends LinkTest {}

@Component({
  template: `
    <nx-link [nxStyle]="style" [size]="size()" [type]="type()" [prominence]="prominence()">
      <a>link</a>
    </nx-link>
  `,
  imports: [NxLinkModule, NxIconModule],
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
  imports: [NxLinkModule, NxIconModule],
})
class IconLink extends LinkTest {
  style = '';
}

@Component({
  template: `
    <nx-link [nxStyle]="style" [size]="size()">
      <a>link</a>
    </nx-link>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxLinkModule, NxIconModule],
})
class OnPushLink extends LinkTest {
  style = '';
}
