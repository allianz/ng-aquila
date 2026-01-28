import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  inputBinding,
  signal,
  Type,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxAnchorButtonComponent, NxButtonComponent } from './button.component';
import { NxButtonModule } from './button.module';
import { NxButtonBase, NxButtonSize, NxButtonType } from './button-base';
import { NxIconButtonComponent } from './icon-button.component';

@Directive({ standalone: true })
abstract class ButtonTest {
  @ViewChild('button') buttonInstance!: NxButtonBase;

  buttonType: NxButtonType = 'primary';
  buttonSize: NxButtonSize = 'medium';
  danger = '';
  negative = '';
  block = '';
  loading = false;
  tabIndex: null | number = null;
  tabindexAttribute: null | number = null;

  readonly clickSpy = jasmine.createSpy('clickSpy');

  get classNames(): string {
    return `${this.buttonType} ${this.buttonSize} ${this.danger} ${this.negative} ${this.block}`;
  }
}

@Component({
  template: `<button nxButton #button class="some-arbitray-class-name">Hello Button</button>`,
  imports: [NxIconModule, NxButtonModule],
})
class BasicButton extends ButtonTest {}

@Component({
  template: `
    <button nxIconButton #button class="some-arbitray-class-name" aria-label="settings">
      <nx-icon name="settings"></nx-icon>
    </button>
  `,
  imports: [NxIconModule, NxButtonModule],
})
class BasicIconButton extends ButtonTest {}

@Component({
  template: `<button
    [nxButton]="classNames"
    [loading]="loading"
    [tabIndex]="tabIndex"
    [tabindex]="tabindexAttribute"
    (click)="clickSpy()"
    #button
  >
    Configurable button
  </button>`,
  imports: [NxIconModule, NxButtonModule],
})
class ConfigurableButton extends ButtonTest {}

@Component({
  template: `
    <button
      [nxIconButton]="classNames"
      [loading]="loading"
      [tabIndex]="tabIndex"
      [tabindex]="tabindexAttribute"
      (click)="clickSpy()"
      #button
      aria-label="settings"
    >
      <nx-icon name="settings"></nx-icon>
    </button>
  `,
  imports: [NxIconModule, NxButtonModule],
})
class ConfigurableIconButton extends ButtonTest {}

@Component({
  template: `<button [nxButton]="classNames" #button>Configurable button</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconModule, NxButtonModule],
})
class ConfigurableOnPushButton extends ButtonTest {}

@Component({
  template: `
    <button [nxIconButton]="classNames" #button aria-label="settings">
      <nx-icon name="settings"></nx-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconModule, NxButtonModule],
})
class ConfigurableOnPushIconButton extends ButtonTest {}

describe('NxButton Implementations', () => {
  [
    {
      component: NxButtonComponent,
      basic: BasicButton,
      configurable: ConfigurableButton,
      onPush: ConfigurableOnPushButton,
    },
    {
      component: NxIconButtonComponent,
      basic: BasicIconButton,
      configurable: ConfigurableIconButton,
      onPush: ConfigurableOnPushIconButton,
    },
  ].forEach((testTarget) => {
    describe(testTarget.component.name, () => {
      let fixture: ComponentFixture<ButtonTest>;
      let testInstance: ButtonTest;
      let buttonInstance: NxButtonComponent;
      let buttonNativeElement: HTMLButtonElement;

      function createTestComponent(component: Type<ButtonTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        buttonInstance = testInstance.buttonInstance;
        buttonNativeElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
      }

      function changeAndCheckButtonSize(testSize: NxButtonSize, expectedClass: string) {
        fixture.componentInstance.buttonSize = testSize;
        fixture.detectChanges();
        expect(buttonInstance.size).toBe(testSize);
        expect(buttonNativeElement).toHaveClass(expectedClass);
      }

      function changeAndCheckButtonType(testType: NxButtonType, expectedClass: string) {
        fixture.componentInstance.buttonType = testType;
        fixture.detectChanges();
        expect(buttonInstance.type).toBe(testType);
        expect(buttonNativeElement).toHaveClass(expectedClass);
      }

      function changeAndCheckButtonTypeProgrammaticly(
        testType: NxButtonType,
        expectedClass: string,
      ) {
        buttonInstance.classNames = testType;
        fixture.detectChanges();
        expect(buttonInstance.type).toBe(testType);
        expect(buttonNativeElement).toHaveClass(expectedClass);
      }

      function changeAndCheckButtonSizeProgrammaticly(
        testSize: NxButtonSize,
        expectedClass: string,
      ) {
        buttonInstance.classNames = testSize;
        fixture.detectChanges();
        expect(buttonInstance.size).toBe(testSize);
        expect(buttonNativeElement).toHaveClass(expectedClass);
      }

      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          imports: [
            NxIconModule,
            NxButtonModule,
            testTarget.basic,
            testTarget.configurable,
            testTarget.onPush,
          ],
        }).compileComponents();
      }));

      describe('basic', () => {
        it('creates the button', waitForAsync(() => {
          createTestComponent(testTarget.basic);
          expect(buttonInstance).toBeTruthy();
        }));

        it('creates a button with a medium size', () => {
          createTestComponent(testTarget.basic);
          expect(buttonNativeElement).toHaveClass('nx-button--medium');
        });

        it('creates a button with primary style', () => {
          createTestComponent(testTarget.basic);
          expect(buttonInstance.type).toBe('primary');
          expect(buttonNativeElement).toHaveClass('nx-button--primary');
        });

        it('creates a non-danger button', () => {
          createTestComponent(testTarget.basic);
          expect(buttonNativeElement).not.toHaveClass('nx-button--danger');
        });

        it('creates a non-negative button', () => {
          createTestComponent(testTarget.basic);
          expect(buttonNativeElement).not.toHaveClass('nx-button--negative');
        });

        it('creates a non-block button', () => {
          createTestComponent(testTarget.basic);
          expect(buttonNativeElement).not.toHaveClass('nx-button--block');
        });

        it('allow other classes', waitForAsync(() => {
          createTestComponent(testTarget.basic);
          expect(buttonNativeElement).toHaveClass('some-arbitray-class-name');
        }));
      });

      describe('buttonType', () => {
        it('renders the button with the chosen [buttonType]', () => {
          createTestComponent(testTarget.configurable);
          changeAndCheckButtonType('secondary', 'nx-button--secondary');
          changeAndCheckButtonType('cta', 'nx-button--cta');
          changeAndCheckButtonType('emphasis', 'nx-button--emphasis');
          changeAndCheckButtonType('attention', 'nx-button--attention');
          changeAndCheckButtonType('primary', 'nx-button--primary');
          changeAndCheckButtonType('tertiary', 'nx-button--tertiary');
        });
      });

      describe('buttonSize', () => {
        it('renders the button with the chosen [buttonSize]', () => {
          createTestComponent(testTarget.configurable);
          changeAndCheckButtonSize('small', 'nx-button--small');
          changeAndCheckButtonSize('large', 'nx-button--large');
          changeAndCheckButtonSize('medium', 'nx-button--medium');
          changeAndCheckButtonSize('small-medium', 'nx-button--small-medium');
        });
      });

      describe('danger', () => {
        it('displays a danger button', () => {
          createTestComponent(testTarget.configurable);
          fixture.componentInstance.danger = 'danger';
          fixture.detectChanges();
          expect(buttonInstance.danger).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--danger');

          fixture.componentInstance.danger = '';
          fixture.detectChanges();
          expect(buttonInstance.danger).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--danger');
        });
      });

      describe('negative styling', () => {
        it('displays a negative button', () => {
          createTestComponent(testTarget.configurable);
          fixture.componentInstance.negative = 'negative';
          fixture.detectChanges();
          expect(buttonInstance.negative).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--negative');

          fixture.componentInstance.negative = '';
          fixture.detectChanges();
          expect(buttonInstance.negative).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--negative');
        });
      });

      describe('block layout', () => {
        it('displays the button with block layout', () => {
          createTestComponent(testTarget.configurable);
          fixture.componentInstance.block = 'block';
          fixture.detectChanges();
          expect(buttonInstance.block).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--block');

          fixture.componentInstance.block = '';
          fixture.detectChanges();
          expect(buttonInstance.block).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--block');
        });
      });

      describe('loading state', () => {
        it('displays spinner in loading state', () => {
          createTestComponent(testTarget.configurable);
          fixture.componentInstance.loading = true;
          fixture.detectChanges();
          expect(fixture.debugElement.nativeElement.querySelector('nx-spinner')).toBeTruthy();

          fixture.componentInstance.loading = false;
          fixture.detectChanges();
          expect(fixture.debugElement.nativeElement.querySelector('nx-spinner')).toBeFalsy();
        });

        it('should halt click events when loading', () => {
          createTestComponent(testTarget.configurable);
          fixture.componentInstance.loading = true;
          fixture.detectChanges();

          buttonNativeElement.dispatchEvent(new Event('click'));
          expect(fixture.componentInstance.clickSpy).not.toHaveBeenCalled();

          fixture.componentInstance.loading = false;
          fixture.detectChanges();

          buttonNativeElement.dispatchEvent(new Event('click'));
          expect(fixture.componentInstance.clickSpy).toHaveBeenCalled();
        });

        Object.entries({
          primary: true,
          secondary: false,
          tertiary: false,
          cta: true,
          attention: true,
          emphasis: true,
        } satisfies { [key in NxButtonType]: boolean }).forEach(([type, negativeTrue]) => {
          it(`sets spinner negative=${negativeTrue} for type=${type}`, () => {
            createTestComponent(testTarget.configurable);
            fixture.componentInstance.buttonType = type as NxButtonType;
            fixture.componentInstance.loading = true;
            fixture.detectChanges();

            const spinner = fixture.debugElement.nativeElement.querySelector('nx-spinner');
            if (negativeTrue) {
              expect(spinner).toHaveClass('nx-spinner--negative');
            } else {
              expect(spinner).not.toHaveClass('nx-spinner--negative');
            }
          });
        });
      });

      describe('programmatic tests', () => {
        it('renders the button with the chosen [buttonType]', () => {
          createTestComponent(testTarget.onPush);
          changeAndCheckButtonTypeProgrammaticly('primary', 'nx-button--primary');
          changeAndCheckButtonTypeProgrammaticly('secondary', 'nx-button--secondary');
          changeAndCheckButtonTypeProgrammaticly('tertiary', 'nx-button--tertiary');
          changeAndCheckButtonTypeProgrammaticly('cta', 'nx-button--cta');
          changeAndCheckButtonTypeProgrammaticly('emphasis', 'nx-button--emphasis');
          changeAndCheckButtonTypeProgrammaticly('attention', 'nx-button--attention');
        });

        it('renders the button with the chosen [buttonSize]', () => {
          createTestComponent(testTarget.onPush);
          changeAndCheckButtonSizeProgrammaticly('small', 'nx-button--small');
          changeAndCheckButtonSizeProgrammaticly('large', 'nx-button--large');
          changeAndCheckButtonSizeProgrammaticly('medium', 'nx-button--medium');
          changeAndCheckButtonSizeProgrammaticly('small-medium', 'nx-button--small-medium');
        });

        it('updates view on danger change', () => {
          createTestComponent(testTarget.onPush);
          buttonInstance.classNames = 'danger';
          fixture.detectChanges();
          expect(buttonInstance.danger).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--danger');

          buttonInstance.classNames = '';
          fixture.detectChanges();
          expect(buttonInstance.danger).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--danger');
        });

        it('updates view on negative change', () => {
          createTestComponent(testTarget.onPush);
          buttonInstance.classNames = 'negative';
          fixture.detectChanges();
          expect(buttonInstance.negative).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--negative');

          buttonInstance.classNames = '';
          fixture.detectChanges();
          expect(buttonInstance.negative).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--negative');
        });

        it('updates view on block change', () => {
          createTestComponent(testTarget.onPush);
          buttonInstance.classNames = 'block';
          fixture.detectChanges();
          expect(buttonInstance.block).toBeTrue();
          expect(buttonNativeElement).toHaveClass('nx-button--block');

          buttonInstance.classNames = '';
          fixture.detectChanges();
          expect(buttonInstance.block).toBeFalse();
          expect(buttonNativeElement).not.toHaveClass('nx-button--block');
        });
      });

      describe('a11y', () => {
        it('has no accessibility violations', async () => {
          createTestComponent(testTarget.basic);
          return expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('has aria-disabled when loading', () => {
          createTestComponent(testTarget.configurable);
          testInstance.loading = true;
          fixture.detectChanges();
          expect(buttonNativeElement.getAttribute('aria-disabled')).toBe('true');
        });

        it('has no aria-disabled when not loading and not disabled', () => {
          createTestComponent(testTarget.configurable);
          testInstance.loading = false;
          fixture.detectChanges();
          expect(buttonNativeElement.getAttribute('aria-disabled')).toBeNull();
        });

        it('has tabindex from attribute binding', () => {
          createTestComponent(testTarget.configurable);
          testInstance.tabindexAttribute = 5;
          fixture.detectChanges();
          expect(buttonNativeElement.getAttribute('tabindex')).toBe('5');
        });

        it('has tabindex from input', () => {
          createTestComponent(testTarget.configurable);
          testInstance.tabIndex = 3;
          fixture.detectChanges();
          expect(buttonNativeElement.getAttribute('tabindex')).toBe('3');
        });
      });
    });
  });

  describe('Anchor Behavior', () => {
    @Component({
      template: `<a
        nxButton
        #button
        href="#"
        class="some-arbitrary-class-name"
        [loading]="loading"
        [disabled]="disabled"
        [tabindex]="tabindexAttribute"
        [tabIndex]="tabIndexInput"
        >Hello Anchor Button</a
      >`,
      imports: [NxAnchorButtonComponent],
    })
    class AnchorTestInstance {
      anchorInstance = viewChild.required(NxAnchorButtonComponent);

      clickBindingSpy = jasmine.createSpy('clickSpy');
      disabled = false;
      loading = false;
      tabindexAttribute: number | null = null;
      tabIndexInput: number | null = null;
    }
    let fixture: ComponentFixture<AnchorTestInstance>;
    let testInstance: AnchorTestInstance;
    let buttonNativeElement: HTMLAnchorElement;

    function createTestComponent(component: Type<AnchorTestInstance>) {
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      testInstance = fixture.componentInstance;
      buttonNativeElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    }

    it('creates the anchor', () => {
      createTestComponent(AnchorTestInstance);
      expect(testInstance.anchorInstance()).toBeTruthy();
    });

    it('disabled state prevents click binding on host element from firing', () => {
      createTestComponent(AnchorTestInstance);
      testInstance.disabled = true;
      fixture.detectChanges();
      buttonNativeElement.click();

      expect(testInstance.clickBindingSpy).not.toHaveBeenCalled();
    });

    // eslint-disable-next-line jasmine/no-suite-dupes
    describe('a11y', () => {
      // eslint-disable-next-line jasmine/no-spec-dupes
      it('has no accessibility violations', async () => {
        createTestComponent(AnchorTestInstance);
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });

      it('has correct a11y attributes when disabled', () => {
        createTestComponent(AnchorTestInstance);
        testInstance.disabled = true;
        fixture.detectChanges();
        expect(buttonNativeElement.getAttribute('disabled')).not.toBeNull();
        expect(buttonNativeElement.getAttribute('aria-disabled')).toBe('true');
        expect(buttonNativeElement.getAttribute('tabindex')).toBe('-1');

        testInstance.disabled = false;
        fixture.detectChanges();
        expect(buttonNativeElement.getAttribute('disabled')).toBeNull();
        expect(buttonNativeElement.getAttribute('aria-disabled')).toBeNull();
        expect(buttonNativeElement.getAttribute('tabindex')).toBeNull();
      });

      it('has correct a11y attributes when loading', () => {
        createTestComponent(AnchorTestInstance);
        testInstance.loading = true;
        fixture.detectChanges();
        expect(buttonNativeElement.getAttribute('disabled')).toBeNull();
        expect(buttonNativeElement.getAttribute('aria-disabled')).toBe('true');
        expect(buttonNativeElement.getAttribute('tabindex')).toBeNull();
        testInstance.loading = false;
        fixture.detectChanges();
        expect(buttonNativeElement.getAttribute('aria-disabled')).toBeNull();
        expect(buttonNativeElement.getAttribute('tabindex')).toBeNull();
      });
    });
  });

  describe('Regression / Compatibility for separate inputs', () => {
    it('classNames input works', () => {
      const fixture = TestBed.createComponent(NxButtonComponent, {
        inferTagName: true,
        bindings: [inputBinding('nxButton', () => 'secondary block danger negative small')],
      });
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveClass('nx-button--secondary');
      expect(fixture.nativeElement).toHaveClass('nx-button--block');
      expect(fixture.nativeElement).toHaveClass('nx-button--danger');
      expect(fixture.nativeElement).toHaveClass('nx-button--negative');
      expect(fixture.nativeElement).toHaveClass('nx-button--small');
    });

    it('separate inputs work', () => {
      const fixture = TestBed.createComponent(NxButtonComponent, {
        inferTagName: true,
        bindings: [
          inputBinding('nxButton', () => 'secondary'),
          inputBinding('block', () => true),
          inputBinding('critical', () => true),
          inputBinding('negative', () => true),
          inputBinding('size', () => 'small'),
        ],
      });
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveClass('nx-button--secondary');
      expect(fixture.nativeElement).toHaveClass('nx-button--block');
      expect(fixture.nativeElement).toHaveClass('nx-button--danger');
      expect(fixture.nativeElement).toHaveClass('nx-button--negative');
      expect(fixture.nativeElement).toHaveClass('nx-button--small');
    });

    it('classNames and separate inputs can mix', () => {
      const fixture = TestBed.createComponent(NxButtonComponent, {
        inferTagName: true,
        bindings: [
          inputBinding('nxButton', () => 'secondary small danger'),
          inputBinding('negative', () => true),
          inputBinding('size', () => 'small'),
        ],
      });
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveClass('nx-button--secondary');
      expect(fixture.nativeElement).not.toHaveClass('nx-button--block');
      expect(fixture.nativeElement).toHaveClass('nx-button--danger');
      expect(fixture.nativeElement).toHaveClass('nx-button--negative');
      expect(fixture.nativeElement).toHaveClass('nx-button--small');
    });

    it('classNames entries are overridden by separate inputs', () => {
      const fixture = TestBed.createComponent(NxButtonComponent, {
        inferTagName: true,
        bindings: [
          inputBinding('nxButton', () => 'secondary small danger negative block'),
          inputBinding('block', () => false),
          inputBinding('critical', () => false),
          inputBinding('negative', () => false),
          inputBinding('size', () => 'large'),
        ],
      });
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveClass('nx-button--secondary');
      expect(fixture.nativeElement).not.toHaveClass('nx-button--block');
      expect(fixture.nativeElement).not.toHaveClass('nx-button--danger');
      expect(fixture.nativeElement).not.toHaveClass('nx-button--negative');
      expect(fixture.nativeElement).toHaveClass('nx-button--large');
    });

    it('classNames are overriden by changing inputs', () => {
      const critical = signal<boolean>(true);
      const fixture = TestBed.createComponent(NxButtonComponent, {
        inferTagName: true,
        bindings: [
          inputBinding('nxButton', () => 'secondary danger'),
          inputBinding('critical', critical),
        ],
      });
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveClass('nx-button--danger');
      critical.set(false);

      fixture.detectChanges();
      expect(fixture.nativeElement).not.toHaveClass('nx-button--danger');
    });
  });
});
