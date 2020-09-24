import { Component, Type, ViewChild, DebugElement, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NxSidepanelModule } from './sidepanel.module';
import { NxSidepanelComponent, PositionType } from './sidepanel';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class SidepanelTest {
  @ViewChild(NxSidepanelComponent) sidebarInstance: NxSidepanelComponent;
  opened: boolean = true;
  position: PositionType = 'floating';
}

describe('NxSidepanelComponent', () => {
  let fixture: ComponentFixture<SidepanelTest>;
  let testInstance: SidepanelTest;
  let sidepanelInstance: NxSidepanelComponent;
  let sidepanelElement: DebugElement;

  function createTestComponent(component: Type<SidepanelTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    sidepanelInstance = testInstance.sidebarInstance;
    sidepanelElement = fixture.debugElement.query(By.css('nx-sidepanel'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicSidepanel,
        SidepanelWithoutHeaderAndContent,
        ConfigurableSidepanel
      ],
      imports: [
        BrowserAnimationsModule,
        NxSidepanelModule
      ]
    }).compileComponents();
  }));

  describe('basic', () => {
    beforeEach(() => {
      createTestComponent(BasicSidepanel);
    });

    it('creates the sidepanel', async(() => {
      expect(sidepanelInstance).toBeTruthy();
    }));

    it('displays the content', async(() => {
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
  });

  describe('without header and content components', () => {
    beforeEach(() => {
      createTestComponent(SidepanelWithoutHeaderAndContent);
    });

    it('should create the sidepanel without header and footer', () => {
      expect(sidepanelInstance).toBeTruthy();
    });

    it('displays the content', async(() => {
      const content = sidepanelElement.nativeElement.textContent;
      expect(content).toBe('My sidepanel');
    }));
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

  describe('a11y', () => {
    beforeEach(() => {
      createTestComponent(BasicSidepanel);
    });

    it('has no accessibility violations', function(done) {
      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        if (violationMessages.length) {
          console.log(violationMessages);
        }
        done();
      });
    });
  });
});

@Component({
  template: `
    <nx-sidepanel>
      <nx-sidepanel-header>Sidepanel header</nx-sidepanel-header>
      <nx-sidepanel-content>Sidepanel content</nx-sidepanel-content>
    </nx-sidepanel>
  `
})
class BasicSidepanel extends SidepanelTest {}

@Component({
  template: `<nx-sidepanel>My sidepanel</nx-sidepanel>`
})
class SidepanelWithoutHeaderAndContent extends SidepanelTest {}

@Component({
  template: `
    <nx-sidepanel [(opened)]="opened" [position]="position">
      <nx-sidepanel-header>Sidepanel header</nx-sidepanel-header>
      <nx-sidepanel-content>Sidepanel content</nx-sidepanel-content>
    </nx-sidepanel>
  `
})
class ConfigurableSidepanel extends SidepanelTest {}

