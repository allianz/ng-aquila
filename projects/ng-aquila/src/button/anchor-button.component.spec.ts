import { Directive, ViewChild, Component, Type } from "@angular/core";
import { ComponentFixture, waitForAsync, TestBed, fakeAsync } from "@angular/core/testing";
import axe from "axe-core";
import { NxButtonModule } from ".";
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxAnchorButtonComponent } from "./anchor-button.component";

@Directive()
abstract class AnchorButtonTest {
  @ViewChild('button') buttonInstance: NxAnchorButtonComponent;
}

@Component({
  template: `
    <a nxButton #button href="#" class="some-arbitray-class-name">Hello Anchor Button</a>
  `
})
class AnchorButton extends AnchorButtonTest {}

  describe("NxAnchorButtonComponent", () => {
    let fixture: ComponentFixture<AnchorButton>;
    let testInstance: AnchorButton;
    let buttonInstance: NxAnchorButtonComponent;
    let buttonNativeElement: HTMLAnchorElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AnchorButton,
        ],
        imports: [
          NxIconModule,
          NxButtonModule
        ]
      }).compileComponents();
    }));

    function createTestComponent(component: Type<AnchorButton>) {
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      testInstance = fixture.componentInstance;
      buttonInstance = testInstance.buttonInstance;
      buttonNativeElement = (fixture.nativeElement.querySelector('a') as HTMLAnchorElement);
    }

    it('creates the button', waitForAsync(() => {
        createTestComponent(AnchorButton);
        expect(buttonInstance).toBeTruthy();
    }));

    it('prevents default when the anchor button is disabled', fakeAsync(() => {
      createTestComponent(AnchorButton);
      let clickSpy = jasmine.createSpy("clickSpy");
      buttonNativeElement.addEventListener("click", clickSpy);
      buttonInstance.disabled = true;
      buttonNativeElement.click();
      expect(clickSpy).toHaveBeenCalledTimes(0);
    }));

    describe('a11y', () => {
      it('has no accessibility violations', function(done) {
        createTestComponent(AnchorButton);

        axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
          expect(results.violations.length).toBe(0);
          done();
        });
      });
    });

  });