import { Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxSidepanelModule } from './sidepanel.module';
import { Appearance, NxSidepanelOuterContainerComponent, NxSidepanelComponent, PositionType } from './sidepanel';
import { BidiModule } from '@angular/cdk/bidi';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class SidepanelTest {
  @ViewChild(NxSidepanelComponent) sidebarInstance!: NxSidepanelComponent;
  @ViewChild(NxSidepanelOuterContainerComponent) wrapperInstance!: NxSidepanelOuterContainerComponent;
  opened: boolean = true;
  position: PositionType = 'floating';
  appearance: Appearance = 'dark';
}

describe('NxSidepanelComponent', () => {
  let fixture: ComponentFixture<SidepanelTest>;
  let testInstance: SidepanelTest;
  let sidepanelInstance: NxSidepanelComponent;
  let sidepanelElement: DebugElement;
  let outerContainerElement: DebugElement;

  function createTestComponent(component: Type<SidepanelTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    sidepanelInstance = testInstance.sidebarInstance;
    sidepanelElement = fixture.debugElement.query(By.css('nx-sidepanel'));
    outerContainerElement = fixture.debugElement.query(By.css('.nx-sidepanel-outer-container__content'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSidepanel,
        SidepanelWithoutHeaderAndContent,
        ConfigurableSidepanel,
        SidepanelWithDirection
      ],
      imports: [
        BrowserAnimationsModule,
        NxSidepanelModule,
        BidiModule
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicSidepanel);
    });

    it('creates the sidepanel', waitForAsync(() => {
      expect(sidepanelInstance).toBeTruthy();
    }));

    it('displays the content', waitForAsync(() => {
      const content = sidepanelElement.nativeElement.textContent;
      expect(content).toContain('Sidepanel header');
      expect(content).toContain('Sidepanel content');
    }));

    it('is open by default', () => {
      expect(sidepanelInstance.opened).toBe(true);
      expect(sidepanelElement.nativeElement.classList).not.toContain('is-closed');
    });

    it('has position floating by default', () => {
      expect(sidepanelInstance.position).toBe('floating');
      expect(sidepanelElement.nativeElement.classList).toContain('is-floating');
      expect(sidepanelElement.nativeElement.classList).not.toContain('is-static');
    });

    it('is dark by default', () => {
      expect(sidepanelInstance.appearance).toBe('dark');
      expect(sidepanelElement.nativeElement.classList).not.toContain('light');
    });

    it('has open-instant state by default', () => {
      expect(sidepanelInstance._getOpenState()).toBe('open-instant');
    });

    it('should be set to ltr by default', () => {
      expect(testInstance.wrapperInstance.dir).toBe('ltr');
    });
  });

  describe('without header and content components', () => {
    beforeEach(() => {
      createTestComponent(SidepanelWithoutHeaderAndContent);
    });

    it('should create the sidepanel without header and footer', () => {
      expect(sidepanelInstance).toBeTruthy();
    });

    it('displays the content', waitForAsync(() => {
      const content = sidepanelElement.nativeElement.textContent;
      expect(content).toBe('My sidepanel');
    }));

    it('openState is "open-instant" by default', () => {
      expect(sidepanelInstance._getOpenState()).toBe('open-instant');
    });
  });

  describe('open / closed', () => {
    beforeEach(() => {
      createTestComponent(ConfigurableSidepanel);
    });

    it('toggles the sidepanel on input change', () => {
      testInstance.opened = false;
      fixture.detectChanges();
      expect(sidepanelInstance.opened).toBe(false);
      expect(sidepanelElement.nativeElement.classList).toContain('is-closed');

      testInstance.opened = true;
      fixture.detectChanges();
      expect(sidepanelInstance.opened).toBe(true);
      expect(sidepanelElement.nativeElement.classList).not.toContain('is-closed');
    });

    it('emits change event if opened has changed', () => {
      testInstance.opened = true;
      fixture.detectChanges();

      sidepanelInstance.toggle();
      fixture.detectChanges();
      expect(testInstance.opened).toBe(false);
      expect(sidepanelElement.nativeElement.classList).toContain('is-closed');
    });

    it('opens the sidepanel on open()', () => {
      testInstance.opened = false;
      fixture.detectChanges();

      sidepanelInstance.open();
      fixture.detectChanges();
      expect(testInstance.opened).toBe(true);
      expect(sidepanelElement.nativeElement.classList).not.toContain('is-closed');
    });

    it('closes the sidepanel on close()', () => {
      testInstance.opened = true;
      fixture.detectChanges();

      sidepanelInstance.close();
      fixture.detectChanges();
      expect(testInstance.opened).toBe(false);
      expect(sidepanelElement.nativeElement.classList).toContain('is-closed');
    });

    it('updates the openState to "closed" when closing', () => {
      sidepanelInstance.close();
      expect(sidepanelInstance._getOpenState()).toBe('closed');
    });

    it('updates the openState to "opened" once it was closed', () => {
      sidepanelInstance.close();
      sidepanelInstance.open();
      expect(sidepanelInstance._getOpenState()).toBe('open');
    });
  });

  describe('position', () => {
    beforeEach(() => {
      createTestComponent(ConfigurableSidepanel);
    });

    it('changes position on input change', () => {
      testInstance.position = 'static';
      fixture.detectChanges();
      expect(sidepanelInstance.position).toBe('static');
      expect(sidepanelElement.nativeElement.classList).toContain('is-static');
      expect(sidepanelElement.nativeElement.classList).not.toContain('is-floating');
    });
  });

  describe('appearance', () => {
    beforeEach(() => {
      createTestComponent(ConfigurableSidepanel);
    });

    it('changes appearance on input change', () => {
      testInstance.appearance = 'light';
      fixture.detectChanges();
      expect(sidepanelInstance.appearance).toBe('light');
      expect(sidepanelElement.nativeElement.classList).toContain('light');
    });
  });

  describe('wrapper functionality (with static position)', () => {
    beforeEach(() => {
      createTestComponent(ConfigurableSidepanel);
      testInstance.position = 'static';
      fixture.detectChanges();
    });

    it('does not set a margin class when creating', () => {
      expect(outerContainerElement.nativeElement.classList).not.toContain('with-margin');
      expect(outerContainerElement.nativeElement.classList).not.toContain('without-margin');
    });

    it('adds correct class when sidepanel is closed', () => {
      sidepanelInstance.close();
      fixture.detectChanges();
      expect(outerContainerElement.nativeElement.classList).not.toContain('with-margin');
      expect(outerContainerElement.nativeElement.classList).toContain('without-margin');
    });

    it('adds correct class when sidepanel is opened again', () => {
      sidepanelInstance.close();
      fixture.detectChanges();
      sidepanelInstance.open();
      fixture.detectChanges();
      expect(outerContainerElement.nativeElement.classList).toContain('with-margin');
      expect(outerContainerElement.nativeElement.classList).not.toContain('without-margin');
    });
  });

  describe('directionality', () => {
    it('should be set to rtl if container direction is rtl', () => {
      createTestComponent(SidepanelWithDirection);
      expect(testInstance.wrapperInstance.dir).toBe('rtl');
    });

    it('updates when direction is changed', () => {
      createTestComponent(SidepanelWithDirection);
      (testInstance as SidepanelWithDirection).direction = 'ltr';
      fixture.detectChanges();
      expect(testInstance.wrapperInstance.dir).toBe('ltr');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicSidepanel);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `
    <nx-sidepanel-outer-container>
      Main content
      <nx-sidepanel>
        <nx-sidepanel-header>Sidepanel header</nx-sidepanel-header>
        <nx-sidepanel-content>Sidepanel content</nx-sidepanel-content>
      </nx-sidepanel>
    </nx-sidepanel-outer-container>
  `
})
class BasicSidepanel extends SidepanelTest {}

@Component({
  template: `
    <nx-sidepanel-outer-container>
      Main content
      <nx-sidepanel>My sidepanel</nx-sidepanel>
    </nx-sidepanel-outer-container>
  `
})
class SidepanelWithoutHeaderAndContent extends SidepanelTest {}

@Component({
  template: `
    <nx-sidepanel-outer-container>
      Main content
      <nx-sidepanel [(opened)]="opened" [position]="position" [appearance]="appearance">
        <nx-sidepanel-header>Sidepanel header</nx-sidepanel-header>
        <nx-sidepanel-content>Sidepanel content</nx-sidepanel-content>
      </nx-sidepanel>
    </nx-sidepanel-outer-container>
  `
})
class ConfigurableSidepanel extends SidepanelTest {}

@Component({
  template: `
    <div [dir]="direction">
      <nx-sidepanel-outer-container>
        Main content
        <nx-sidepanel>My sidepanel</nx-sidepanel>
      </nx-sidepanel-outer-container>
    </div>
  `
})
class SidepanelWithDirection extends SidepanelTest {
  direction = 'rtl';
}
