import { NxTabsModule } from './tabs.module';
import { TestBed, ComponentFixture, inject, waitForAsync } from '@angular/core/testing';
import { Type, Component, QueryList, ViewChildren, ChangeDetectionStrategy, ViewChild, Directive, DebugElement } from '@angular/core';
import { NxTabLinkDirective, NxTabNavBarComponent } from './tab-nav-bar';
import { By } from '@angular/platform-browser';
import { TabNavBarDefaultOptions, TAB_NAV_BAR_DEFAULT_OPTIONS } from './tabs.models';

const tabsDefaultOptions: TabNavBarDefaultOptions = {
  appearance: 'expert'
};

@Directive()
abstract class TabNavBarTest {
  @ViewChildren(NxTabLinkDirective) tabLinks!: QueryList<NxTabLinkDirective>;
  @ViewChild(NxTabNavBarComponent) tabNavBar!: NxTabNavBarComponent;

  appearance = 'expert';
}

describe('NxTabBarNavComponent', () => {

  let fixture: ComponentFixture<TabNavBarTest>;
  let testInstance: TabNavBarTest;
  let tabNavBar: NxTabNavBarComponent;
  let tabNavBarDebugElement: DebugElement;

  const createTestComponent = (component: Type<TabNavBarTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    tabNavBar = testInstance.tabNavBar;
    tabNavBarDebugElement = fixture.debugElement.query(By.directive(NxTabNavBarComponent));
  };

  describe('no preset options', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          SimpleTabNavBar,
          ConfigurableTabNavBar,
          TabNavBarOnPush
        ],
        imports: [
          NxTabsModule
        ]
      }).compileComponents();
    }));

    it('should attach the active styles to the active nav tab', () => {
      createTestComponent(SimpleTabNavBar);

      const instance = testInstance as SimpleTabNavBar;
      const firstLink = fixture.nativeElement.querySelector('.nx-tab-link');

      expect(firstLink.classList.contains('is-active')).toBeTruthy();

      instance.links[0].active = false;
      instance.links[1].active = true;
      fixture.detectChanges();
      expect(firstLink.classList.contains('is-active')).toBeFalsy();

      const secondLink = fixture.nativeElement.querySelectorAll('.nx-tab-link').item(1);
      expect(secondLink.classList.contains('is-active')).toBeTruthy();
    });

    it('should attach aria-current="true" to the currenly active tab nav link', () => {
      createTestComponent(SimpleTabNavBar);
      const firstLink = fixture.nativeElement.querySelector('.nx-tab-link');
      expect(firstLink.getAttribute('aria-current')).toBe('true');
    });

    it('should update view on "negative" programmatic change', () => {
      createTestComponent(TabNavBarOnPush);
      testInstance.tabNavBar.negative = true;
      fixture.detectChanges();
      expect(tabNavBarDebugElement.nativeElement.classList.contains('is-negative')).toBeTruthy();
    });

    it('should update the nav bar on "disabled" programmatic change', () => {
      createTestComponent(TabNavBarOnPush);
      testInstance.tabNavBar.disabled = true;
      fixture.detectChanges();
      expect(tabNavBarDebugElement.nativeElement.classList.contains('is-disabled')).toBeTruthy();
    });

    it('should update the nav bar links on "disabled" programmatic change', () => {
      createTestComponent(TabNavBarOnPush);
      testInstance.tabNavBar.disabled = true;
      fixture.detectChanges();
      const tabLink = fixture.nativeElement.querySelector('.nx-tab-link');
      expect(tabLink.classList.contains('is-disabled')).toBeTruthy();
    });

    describe('appearance', () => {
      beforeEach(() => {
        tabsDefaultOptions.appearance = 'expert';
      });

      it('should set the appearance to "default" by default', () => {
        createTestComponent(SimpleTabNavBar);
        expect(tabNavBar.appearance).toBe('default');
        expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');
      });

      it('should change appearance on input change', () => {
        createTestComponent(ConfigurableTabNavBar);
        expect(tabNavBar.appearance).toBe('expert');
        expect(tabNavBarDebugElement.nativeElement.classList).toContain('is-expert');

        testInstance.appearance = 'default';
        fixture.detectChanges();
        expect(tabNavBar.appearance).toBe('default');
        expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');
      });

      it('should update appearance on programmatic change', () => {
        createTestComponent(TabNavBarOnPush);
        expect(tabNavBar.appearance).toBe('default');
        expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');

        tabNavBar.appearance = 'expert';
        fixture.detectChanges();
        expect(tabNavBarDebugElement.nativeElement.classList).toContain('is-expert');
      });
    });
  });

  describe('default options injection token', () => {
    beforeEach(waitForAsync(() => {
      tabsDefaultOptions.appearance = 'expert';
      TestBed.configureTestingModule({
        declarations: [
          SimpleTabNavBar,
          ConfigurableTabNavBar
        ],
        imports: [
          NxTabsModule
        ],
        providers: [
          { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: tabsDefaultOptions }
        ]
      }).compileComponents();
    }));

    it('should have an "default" appearance if empty default options are provided',
      inject([TAB_NAV_BAR_DEFAULT_OPTIONS], (defaultOptions: TabNavBarDefaultOptions) => {
        delete defaultOptions.appearance;
        createTestComponent(SimpleTabNavBar);
        expect(tabNavBar.appearance).toBe('default');
        expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');
      })
    );

    it('should have a custom default appearance if default options contain a custom appearance', () => {
      createTestComponent(SimpleTabNavBar);
      expect(tabNavBar.appearance).toBe('expert');
      expect(tabNavBarDebugElement.nativeElement.classList).toContain('is-expert');
    });

    it('should override a custom default appearance', () => {
      createTestComponent(ConfigurableTabNavBar);
      expect(tabNavBar.appearance).toBe('expert');

      testInstance.appearance = 'default';
      fixture.detectChanges();
      expect(tabNavBar.appearance).toBe('default');
      expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');
    });

    it('changes the appearance on injection token change',
      inject([TAB_NAV_BAR_DEFAULT_OPTIONS], (defaultOptions: TabNavBarDefaultOptions) => {
        createTestComponent(SimpleTabNavBar);
        expect(tabNavBar.appearance).toBe('expert');
        expect(tabNavBarDebugElement.nativeElement.classList).toContain('is-expert');

        defaultOptions.appearance = 'default';
        fixture.detectChanges();
        expect(tabNavBar.appearance).toBe('default');
        expect(tabNavBarDebugElement.nativeElement.classList).not.toContain('is-expert');
      })
    );
  });
});

@Component({
  template: `
  <nx-tab-nav-bar>
    <a nxTabLink *ngFor="let link of links"
    [active]="link.active">
      {{link.label}}
    </a>
  </nx-tab-nav-bar>
  `
})
// tslint:disable-next-line:component-class-suffix
class SimpleTabNavBar extends TabNavBarTest {
  links = [
    { label: 'Label1', active: true },
    { label: 'Label2', active: false }
  ];
}

@Component({
  template: `
    <nx-tab-nav-bar [appearance]="appearance">
      <a nxTabLink *ngFor="let link of links"
      [active]="link.active">
        {{link.label}}
      </a>
    </nx-tab-nav-bar>
  `
})
// tslint:disable-next-line:component-class-suffix
class ConfigurableTabNavBar extends TabNavBarTest {
  links = [
    { label: 'Label1', active: true },
    { label: 'Label2', active: false }
  ];
}

@Component({
  template: `
  <nx-tab-nav-bar [disabled]="disabled">
    <a nxTabLink *ngFor="let link of links"
    [disabled]="disabled"
    [active]="link.active">
      {{link.label}}
    </a>
  </nx-tab-nav-bar>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
class TabNavBarOnPush extends TabNavBarTest {
  links = [
    { label: 'Label1', active: true, disabled: false, },
    { label: 'Label2', active: false, disabled: false }
  ];

  disabled = false;
}
