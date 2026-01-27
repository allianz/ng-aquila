import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { NxInfoIconComponent } from './info-icon.component';
import { NxInfoIconModule } from './info-icon.module';

@Directive({ standalone: true })
abstract class InfoIconTest {
  @ViewChild(NxInfoIconComponent) infoIconInstance!: NxInfoIconComponent;
  buttonAriaLabel = 'Information';
  direction: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
  popoverWidth: string | undefined;
  popoverMaxWidth: string | undefined;
  popoverModal = false;
  disabled = false;
}

describe('NxInfoIconComponent', () => {
  let fixture: ComponentFixture<InfoIconTest>;
  let testInstance: InfoIconTest;
  let infoIconInstance: NxInfoIconComponent;
  let infoIconNativeElement: HTMLElement;
  let overlayContainer: OverlayContainer;

  function createTestComponent(component: Type<InfoIconTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    infoIconInstance = testInstance.infoIconInstance;
    infoIconNativeElement = fixture.nativeElement.querySelector('nx-info-icon') as HTMLElement;
  }

  function getButton(): HTMLButtonElement {
    return infoIconNativeElement.querySelector('button') as HTMLButtonElement;
  }

  function getIcon(): HTMLElement {
    return infoIconNativeElement.querySelector('nx-icon') as HTMLElement;
  }

  function getPopoverContent(): HTMLElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.nx-popover__content') as HTMLElement;
  }

  function getBackdrop(): HTMLElement {
    return overlayContainer
      .getContainerElement()
      .querySelector('.cdk-overlay-backdrop') as HTMLElement;
  }

  function clickButton() {
    getButton().click();
    fixture.detectChanges();
    tick();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxInfoIconModule,
        BasicInfoIconComponent,
        ConfigurableInfoIconComponent,
        ModalInfoIconComponent,
        DisabledInfoIconComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
    })();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('basic', () => {
    it('should create the component', () => {
      createTestComponent(BasicInfoIconComponent);
      expect(infoIconInstance).toBeTruthy();
    });

    it('should render the info icon button', () => {
      createTestComponent(BasicInfoIconComponent);
      expect(getButton()).toBeTruthy();
      expect(getIcon()).toBeTruthy();
    });

    it('should have default aria-label', () => {
      createTestComponent(BasicInfoIconComponent);
      expect(getButton().getAttribute('aria-label')).toBe('Information');
    });

    it('should open popover on click', fakeAsync(() => {
      createTestComponent(BasicInfoIconComponent);
      clickButton();
      expect(getPopoverContent()).toBeTruthy();
      flush();
    }));

    it('should close popover on second click', fakeAsync(() => {
      createTestComponent(BasicInfoIconComponent);
      clickButton();
      expect(getPopoverContent()).toBeTruthy();
      clickButton();
      expect(getPopoverContent()).toBeFalsy();
      flush();
    }));

    it('should display content in popover', fakeAsync(() => {
      createTestComponent(BasicInfoIconComponent);
      clickButton();
      expect(getPopoverContent().textContent).toContain('Test content');
      flush();
    }));
  });

  describe('configurable inputs', () => {
    it('should use custom aria-label', () => {
      createTestComponent(ConfigurableInfoIconComponent);
      testInstance.buttonAriaLabel = 'Custom label';
      fixture.detectChanges();
      expect(getButton().getAttribute('aria-label')).toBe('Custom label');
    });

    it('should apply direction', () => {
      createTestComponent(ConfigurableInfoIconComponent);
      testInstance.direction = 'right';
      fixture.detectChanges();
      expect(infoIconInstance.popoverDirection()).toBe('right');
    });

    it('should apply popoverWidth', fakeAsync(() => {
      createTestComponent(ConfigurableInfoIconComponent);
      testInstance.popoverWidth = '300px';
      fixture.detectChanges();
      clickButton();
      const overlayPane = overlayContainer
        .getContainerElement()
        .querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(overlayPane.style.width).toBe('300px');
      flush();
    }));

    it('should apply popoverMaxWidth', fakeAsync(() => {
      createTestComponent(ConfigurableInfoIconComponent);
      testInstance.popoverMaxWidth = '200px';
      fixture.detectChanges();
      clickButton();
      const overlayPane = overlayContainer
        .getContainerElement()
        .querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(overlayPane.style.maxWidth).toBe('200px');
      flush();
    }));
  });

  describe('modal popover', () => {
    it('should show backdrop when modal is true', fakeAsync(() => {
      createTestComponent(ModalInfoIconComponent);
      clickButton();
      expect(getBackdrop()).toBeTruthy();
      flush();
    }));

    it('should not show backdrop when modal is false', fakeAsync(() => {
      createTestComponent(BasicInfoIconComponent);
      clickButton();
      expect(getBackdrop()).toBeFalsy();
      flush();
    }));

    it('should close popover on backdrop click', fakeAsync(() => {
      createTestComponent(ModalInfoIconComponent);
      clickButton();
      getBackdrop().click();
      fixture.detectChanges();
      flush();
      expect(getPopoverContent()).toBeFalsy();
    }));
  });

  describe('disabled state', () => {
    it('should disable button when disabled is true', () => {
      createTestComponent(DisabledInfoIconComponent);
      expect(getButton().disabled).toBeTrue();
    });

    it('should not open popover when disabled', fakeAsync(() => {
      createTestComponent(DisabledInfoIconComponent);
      clickButton();
      expect(getPopoverContent()).toBeFalsy();
      flush();
    }));
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicInfoIconComponent);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations when popover is open', async () => {
      createTestComponent(BasicInfoIconComponent);
      getButton().click();
      fixture.detectChanges();
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `<nx-info-icon>Test content</nx-info-icon>`,
  imports: [NxInfoIconModule],
})
class BasicInfoIconComponent extends InfoIconTest {}

@Component({
  template: `
    <nx-info-icon
      [buttonAriaLabel]="buttonAriaLabel"
      [popoverDirection]="direction"
      [popoverWidth]="popoverWidth"
      [popoverMaxWidth]="popoverMaxWidth"
      [popoverModal]="popoverModal"
    >
      Configurable content
    </nx-info-icon>
  `,
  imports: [NxInfoIconModule],
})
class ConfigurableInfoIconComponent extends InfoIconTest {}

@Component({
  template: `<nx-info-icon [popoverModal]="true">Modal content</nx-info-icon>`,
  imports: [NxInfoIconModule],
})
class ModalInfoIconComponent extends InfoIconTest {}

@Component({
  template: `<nx-info-icon [disabled]="true">Disabled content</nx-info-icon>`,
  imports: [NxInfoIconModule],
})
class DisabledInfoIconComponent extends InfoIconTest {}
