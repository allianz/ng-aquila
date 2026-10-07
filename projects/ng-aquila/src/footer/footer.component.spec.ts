import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FOOTER_DEFAULT_OPTIONS, NxFooterComponent } from './footer.component';
import { NxFooterModule } from './footer.module';

const currentYear = new Date().getFullYear();

@Directive({ standalone: true })
abstract class FooterTest {
  @ViewChild(NxFooterComponent)
  footerInstance!: NxFooterComponent;
}

describe(NxFooterComponent.name, () => {
  let fixture: ComponentFixture<FooterTest>;
  let testInstance: FooterTest;
  let footerInstance: NxFooterComponent;
  let footerNativeElement: HTMLElement;

  function createTestComponent(component: Type<FooterTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    footerInstance = testInstance.footerInstance;
    footerNativeElement = fixture.nativeElement.querySelector('nx-footer') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxFooterModule, BasicFooter, DefaultCopyrightFooter, ConfigurableFooter],
      providers: [{ provide: FOOTER_DEFAULT_OPTIONS, useValue: null }],
    });
  }));

  describe('basic footer', () => {
    beforeEach(() => {
      createTestComponent(BasicFooter);
    });

    it('should create the footer', () => {
      expect(footerInstance).toBeTruthy();
    });

    it('should apply the bem class to the footer', () => {
      expect(footerNativeElement).toHaveClass('nx-footer');
    });

    it('should apply the bem class to the footer navigation', () => {
      expect(footerNativeElement.querySelector('nx-footer-navigation')).toHaveClass(
        'nx-footer__navigation',
      );
    });

    it('should apply the bem class to the copyright part', () => {
      expect(footerNativeElement.querySelector('nx-footer-copyright')).toHaveClass(
        'nx-footer__copyright',
      );
    });

    it('should apply the bem class to the link', () => {
      expect(footerNativeElement.querySelector('nx-footer-link')).toHaveClass('nx-footer__link');
    });

    it('should display copyright text', () => {
      expect(footerNativeElement.querySelectorAll('nx-footer-copyright').length).toBe(1);
      expect(footerNativeElement.querySelector('nx-footer-copyright')?.textContent).toBe(
        'Some company',
      );
    });
  });

  describe('default copyright footer', () => {
    beforeEach(() => {
      createTestComponent(DefaultCopyrightFooter);
    });

    it('should display default copyright text with custom input', () => {
      expect(footerNativeElement.querySelectorAll('nx-footer-copyright').length).toBe(1);
      expect(footerNativeElement.querySelector('nx-footer-copyright')?.textContent).toBe(
        `© ${currentYear} Other company`,
      );
    });
  });

  describe('divider and maxWidthContent', () => {
    it('should not apply the classes by default', () => {
      createTestComponent(BasicFooter);
      expect(footerNativeElement).not.toHaveClass('nx-footer--divider');
      expect(footerNativeElement).not.toHaveClass('nx-footer--max-width-content');
    });

    it('should apply the classes when the inputs are set', () => {
      createTestComponent(ConfigurableFooter);
      expect(footerNativeElement).not.toHaveClass('nx-footer--divider');
      expect(footerNativeElement).not.toHaveClass('nx-footer--max-width-content');

      const testComponent = testInstance as ConfigurableFooter;
      testComponent.divider.set(true);
      testComponent.maxWidthContent.set(true);
      fixture.detectChanges();
      expect(footerNativeElement).toHaveClass('nx-footer--divider');
      expect(footerNativeElement).toHaveClass('nx-footer--max-width-content');
    });

    it('should use the default options when the inputs are not set', () => {
      TestBed.overrideProvider(FOOTER_DEFAULT_OPTIONS, {
        useValue: { divider: true, maxWidthContent: true },
      });
      createTestComponent(BasicFooter);
      expect(footerNativeElement).toHaveClass('nx-footer--divider');
      expect(footerNativeElement).toHaveClass('nx-footer--max-width-content');
    });

    it('should let the inputs override the default options', () => {
      TestBed.overrideProvider(FOOTER_DEFAULT_OPTIONS, {
        useValue: { divider: true, maxWidthContent: true },
      });
      createTestComponent(ConfigurableFooter);
      expect(footerNativeElement).not.toHaveClass('nx-footer--divider');
      expect(footerNativeElement).not.toHaveClass('nx-footer--max-width-content');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicFooter);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-basic-footer',
  template: `
    <nx-footer>
      <nx-footer-copyright>Some company</nx-footer-copyright>
      <nx-footer-navigation>
        <nx-footer-link>
          <a routerLink="./">Link1</a>
        </nx-footer-link>
      </nx-footer-navigation>
    </nx-footer>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFooterModule],
})
class BasicFooter extends FooterTest {}

@Component({
  selector: 'test-default-copyright-footer',
  template: `<nx-footer copyright="Other company"></nx-footer>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFooterModule],
})
class DefaultCopyrightFooter extends FooterTest {}

@Component({
  selector: 'test-configurable-footer',
  template: `<nx-footer [divider]="divider()" [maxWidthContent]="maxWidthContent()"></nx-footer>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxFooterModule],
})
class ConfigurableFooter extends FooterTest {
  readonly divider = signal(false);
  readonly maxWidthContent = signal(false);
}
