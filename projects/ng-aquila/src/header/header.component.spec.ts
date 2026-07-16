import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxHeaderComponent } from './header.component';
import { NxHeaderModule } from './header.module';

const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

@Directive({ standalone: true })
abstract class HeaderTest {
  @ViewChild(NxHeaderComponent) headerInstance!: NxHeaderComponent;
  showSeparator = false;
}

describe(NxHeaderComponent.name, () => {
  let fixture: ComponentFixture<HeaderTest>;
  let testInstance: HeaderTest;
  let headerInstance: NxHeaderComponent;
  let headerNativeElement: HTMLElement;

  function createTestComponent(component: Type<HeaderTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    headerInstance = testInstance.headerInstance;
    headerNativeElement = fixture.nativeElement.querySelector('nx-header') as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxHeaderModule,
        BasicHeader,
        MultiRowHeader,
        CobrandingHeader,
        AppTitleHeader,
        AppTitleHeaderA1,
        ActionsShowDividerHeader,
      ],
    }).compileComponents();
  }));

  describe('basic header', () => {
    beforeEach(() => {
      createTestComponent(BasicHeader);
    });

    it('creates the header', waitForAsync(() => {
      expect(headerInstance).toBeTruthy();
    }));

    it('default header includes the bem block element', waitForAsync(() => {
      expect(headerNativeElement).toHaveClass('nx-header');
      expect(headerNativeElement).toHaveClass('nx-header--single-row');
    }));

    it('header navigation section has bem class', () => {
      expect(headerNativeElement.querySelector('nx-header-navigation')).toHaveClass(
        'nx-header__navigation',
      );
    });

    it('header navigation section has navigation role', () => {
      expect(headerNativeElement.querySelector('nx-header-navigation')?.getAttribute('role')).toBe(
        'navigation',
      );
    });

    it('header navigation items section has list role', () => {
      expect(
        headerNativeElement.querySelector('.nx-header__navigation-items')?.getAttribute('role'),
      ).toBe('list');
    });

    it('header navigation item has listitem role', () => {
      expect(
        headerNativeElement.querySelector('nx-header-navigation-item')?.getAttribute('role'),
      ).toBe('listitem');
    });

    it('header link has bem class', () => {
      expect(headerNativeElement.querySelector('a[nxheaderlink]')).toHaveClass('nx-header__link');
    });

    it('header link has a text-content attribute', () => {
      expect(
        headerNativeElement.querySelector('a[nxheaderlink]')?.getAttribute('text-content'),
      ).toBe('example link');
    });

    it('header actions section has bem class', () => {
      expect(headerNativeElement.querySelector('nx-header-actions')).toHaveClass(
        'nx-header__actions',
      );
    });

    it('header brand section has bem class', () => {
      expect(headerNativeElement.querySelector('nx-header-brand')).toHaveClass('nx-header__brand');
    });
  });

  describe('multi row header', () => {
    beforeEach(() => {
      createTestComponent(MultiRowHeader);
    });

    it('header does not include the single row class', waitForAsync(() => {
      expect(headerNativeElement).not.toHaveClass('nx-header--single-row');
    }));

    it('header row contains bem class', waitForAsync(() => {
      expect(headerNativeElement.querySelector('nx-header-row')).toHaveClass('nx-header__row');
    }));
  });

  describe('Header actions deprecated showSeparator', () => {
    beforeEach(() => {
      createTestComponent(CobrandingHeader);
    });

    it('Should not have separator', waitForAsync(() => {
      expect(fixture.nativeElement.querySelector('.nx-header__actions')).not.toHaveClass(
        'nx-header__actions--show-separator',
      );
    }));

    it('showSeparator=true still shows the separator', waitForAsync(() => {
      testInstance.showSeparator = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.nx-header__actions')).toHaveClass(
        'nx-header__actions--show-separator',
      );
    }));
  });

  describe('nx-header-app-title showDivider', () => {
    it('shows divider by default in NDBX', () => {
      createTestComponent(AppTitleHeader);
      expect(fixture.nativeElement.querySelector('nx-header-app-title')).toHaveClass(
        'nx-header__app-title--show-divider',
      );
    });

    it('hides divider by default in A1', () => {
      createTestComponent(AppTitleHeaderA1);
      expect(fixture.nativeElement.querySelector('nx-header-app-title')).not.toHaveClass(
        'nx-header__app-title--show-divider',
      );
    });

    it('explicit [showDivider]="false" hides divider in NDBX', () => {
      createTestComponent(AppTitleHeader);
      (testInstance as AppTitleHeader).showDivider = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-header-app-title')).not.toHaveClass(
        'nx-header__app-title--show-divider',
      );
    });

    it('explicit [showDivider]="true" shows divider in A1', () => {
      createTestComponent(AppTitleHeaderA1);
      (testInstance as AppTitleHeaderA1).showDivider = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-header-app-title')).toHaveClass(
        'nx-header__app-title--show-divider',
      );
    });
  });

  describe('nx-header-actions showDivider', () => {
    it('hides divider by default', () => {
      createTestComponent(ActionsShowDividerHeader);
      expect(fixture.nativeElement.querySelector('nx-header-actions')).not.toHaveClass(
        'nx-header__actions--show-separator',
      );
    });

    it('explicit [showDivider]="true" shows divider', () => {
      createTestComponent(ActionsShowDividerHeader);
      (testInstance as ActionsShowDividerHeader).showDivider = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-header-actions')).toHaveClass(
        'nx-header__actions--show-separator',
      );
    });

    it('explicit [showDivider]="false" hides divider', () => {
      createTestComponent(ActionsShowDividerHeader);
      (testInstance as ActionsShowDividerHeader).showDivider = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-header-actions')).not.toHaveClass(
        'nx-header__actions--show-separator',
      );
    });

    it('deprecated showSeparator still works as fallback', () => {
      createTestComponent(CobrandingHeader);
      testInstance.showSeparator = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('nx-header-actions')).toHaveClass(
        'nx-header__actions--show-separator',
      );
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicHeader);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-basic-header',
  template: `
    <nx-header>
      <nx-header-brand> Example brand </nx-header-brand>

      <nx-header-navigation>
        <nx-header-navigation-item>
          <a nxHeaderLink>example link</a>
        </nx-header-navigation-item>
      </nx-header-navigation>

      <nx-header-actions> Example action </nx-header-actions>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
})
class BasicHeader extends HeaderTest {}

@Component({
  selector: 'test-multi-row-header',
  template: `
    <nx-header>
      <nx-header-row> </nx-header-row>
      <nx-header-row> </nx-header-row>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
})
class MultiRowHeader extends HeaderTest {}

@Component({
  selector: 'test-cobranding-header',
  template: `
    <nx-header>
      <nx-header-row>
        <nx-header-brand>
          <nx-header-app-title>Application title</nx-header-app-title>
        </nx-header-brand>

        <nx-header-actions [showSeparator]="showSeparator">
          <span>Powered by</span>
        </nx-header-actions>
        <nx-header-brand> </nx-header-brand>
      </nx-header-row>
      <nx-header-row> </nx-header-row>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
})
class CobrandingHeader extends HeaderTest {
  showSeparator: any;
}

@Component({
  selector: 'test-app-title-header',
  template: `
    <nx-header>
      <nx-header-brand>
        <nx-header-app-title [showDivider]="showDivider">App</nx-header-app-title>
      </nx-header-brand>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
})
class AppTitleHeader extends HeaderTest {
  showDivider: boolean | undefined = undefined;
}

@Component({
  selector: 'test-app-title-header-a1',
  template: `
    <nx-header>
      <nx-header-brand>
        <nx-header-app-title [showDivider]="showDivider">App</nx-header-app-title>
      </nx-header-brand>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
  providers: A1_PROVIDERS,
})
class AppTitleHeaderA1 extends HeaderTest {
  showDivider: boolean | undefined = undefined;
}

@Component({
  selector: 'test-actions-show-divider-header',
  template: `
    <nx-header>
      <nx-header-actions [showDivider]="showDivider">Action</nx-header-actions>
    </nx-header>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxHeaderModule],
})
class ActionsShowDividerHeader extends HeaderTest {
  showDivider = false;
}
