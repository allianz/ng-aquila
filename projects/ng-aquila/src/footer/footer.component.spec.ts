import { ViewChild, Type, Component, Directive } from '@angular/core';
import { NxFooterComponent } from './footer.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NxFooterModule } from './footer.module';
import * as axe from 'axe-core';

@Directive()
abstract class FooterTest {
  @ViewChild(NxFooterComponent) footerInstance: NxFooterComponent;
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
    footerNativeElement = <HTMLElement>fixture.nativeElement.querySelector('nx-footer');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicFooter
      ],
      imports: [
        NxFooterModule
      ]
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
      expect(footerNativeElement.classList.contains('nx-footer')).toBe(true);
    });

    it('should apply the bem class to the footer navigation', () => {
      expect(footerNativeElement.querySelector('nx-footer-navigation')
        .classList.contains('nx-footer__navigation'));
    });

    it('should apply the bem class to the copyright part', () => {
      expect(footerNativeElement.querySelector('nx-footer-copyright')
        .classList.contains('nx-footer__copyright'));
    });
    it('should apply the bem class to the link', () => {
      expect(footerNativeElement.querySelector('nx-footer-link')
        .classList.contains('nx-footer__link'));
    });

  });
  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicFooter);
      axe.run(fixture.nativeElement, {},  (_: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
    });
  });
});

@Component({
  template: `
    <nx-footer>
      <nx-footer-copyright></nx-footer-copyright>
      <nx-footer-navigation>
        <nx-footer-link>
          <a routerLink='./'>Link1</a>
        </nx-footer-link>
      </nx-footer-navigation>
    </nx-footer>
  `
})
// tslint:disable-next-line:component-class-suffix
class BasicFooter extends FooterTest {}
