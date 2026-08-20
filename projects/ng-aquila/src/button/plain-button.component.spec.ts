import { ChangeDetectionStrategy, Component, Type, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxButtonModule } from './button.module';
import {
  NxPlainButtonColorScheme,
  NxPlainButtonComponent,
  NxPlainButtonSize,
  NxPlainButtonVariant,
} from './plain-button.component';

describe('NxPlainButtonComponent', () => {
  let fixture: ComponentFixture<ButtonTest>;
  let testInstance: ButtonTest;
  let buttonElement: HTMLButtonElement;

  function createTestComponent(component: Type<ButtonTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
  }

  it('should create the button component', () => {
    createTestComponent(ButtonTest);
    expect(testInstance.buttonInstance()).toBeTruthy();
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent?.trim()).toBe('Hello Button');
  });

  it('creates a non-danger button', () => {
    createTestComponent(ButtonTest);
    expect(buttonElement).not.toHaveClass('nx-plain-button--danger');
  });

  it('should add small class', () => {
    createTestComponent(ButtonTest);
    fixture.componentInstance.size = 'small';
    fixture.detectChanges();
    expect(buttonElement).toHaveClass('nx-plain-button--small');
  });

  it('should add secondary class', () => {
    createTestComponent(ButtonTest);
    fixture.componentInstance.variant = 'secondary';
    fixture.detectChanges();
    expect(buttonElement).toHaveClass('nx-plain-button--secondary');
  });

  it('has aria-disabled when loading', () => {
    createTestComponent(ButtonTest);
    testInstance.loading = true;
    fixture.detectChanges();
    expect(buttonElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('has no aria-disabled when not loading and not disabled', () => {
    createTestComponent(ButtonTest);
    testInstance.loading = false;
    fixture.detectChanges();
    expect(buttonElement.getAttribute('aria-disabled')).toBeNull();
  });

  it('has tabindex from attribute binding', () => {
    createTestComponent(ButtonTest);
    testInstance.tabindexAttribute = 5;
    fixture.detectChanges();
    expect(buttonElement.getAttribute('tabindex')).toBe('5');
  });

  it('has tabindex from input', () => {
    createTestComponent(ButtonTest);
    testInstance.tabIndex = 3;
    fixture.detectChanges();
    expect(buttonElement.getAttribute('tabindex')).toBe('3');
  });

  describe('A1 shirt sizes', () => {
    it('maps size "s" onto the small class', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.size = 's';
      fixture.detectChanges();
      expect(buttonElement).toHaveClass('nx-plain-button--small');
    });

    it('does not add the small class for size "m"', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.size = 'm';
      fixture.detectChanges();
      expect(buttonElement).not.toHaveClass('nx-plain-button--small');
    });
  });

  describe('A1 color schemes', () => {
    it('adds the on-accent-attention class', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.colorScheme = 'on-accent-attention';
      fixture.detectChanges();
      expect(buttonElement).toHaveClass('nx-plain-button--on-accent-attention');
    });

    it('adds the on-brand class', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.colorScheme = 'on-brand';
      fixture.detectChanges();
      expect(buttonElement).toHaveClass('nx-plain-button--on-brand');
    });

    it('has no color scheme class by default', () => {
      createTestComponent(ButtonTest);
      expect(buttonElement).not.toHaveClass('nx-plain-button--on-accent-attention');
      expect(buttonElement).not.toHaveClass('nx-plain-button--on-brand');
    });
  });

  describe('danger', () => {
    it('displays a danger button', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.classNames = 'danger';
      testInstance.critical = true;

      fixture.detectChanges();
      expect(buttonElement).toHaveClass('nx-plain-button--danger');

      testInstance.critical = false;
      fixture.detectChanges();
      expect(buttonElement).not.toHaveClass('nx-plain-button--danger');
    });

    it('should add danger class with critical input', () => {
      createTestComponent(ButtonTest);
      fixture.componentInstance.critical = true;
      fixture.detectChanges();
      expect(buttonElement).toHaveClass('nx-plain-button--danger');
    });
  });

  describe('Anchor Behavior', () => {
    @Component({
      template: `<a
        nxPlainButton
        #button
        href="#"
        class="some-arbitrary-class-name"
        [loading]="loading"
        [disabled]="disabled"
        [tabindex]="tabindexAttribute"
        [tabIndex]="tabIndex"
        >Hello Anchor Button</a
      >`,
      changeDetection: ChangeDetectionStrategy.Eager,
      imports: [NxPlainButtonComponent],
    })
    class AnchorTestInstance {
      anchorInstance = viewChild.required(NxPlainButtonComponent);

      clickBindingSpy = vi.fn().mockName('clickSpy');
      disabled = false;
      loading = false;
      tabindexAttribute: number | null = null;
      tabIndex: number | null = null;
    }
    let anchorFixture: ComponentFixture<AnchorTestInstance>;
    let anchorTestInstance: AnchorTestInstance;
    let anchorNativeElement: HTMLAnchorElement;

    function createAnchorTestComponent(component: Type<AnchorTestInstance>) {
      anchorFixture = TestBed.createComponent(component);
      anchorFixture.detectChanges();
      anchorTestInstance = anchorFixture.componentInstance;
      anchorNativeElement = anchorFixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    }

    it('creates the anchor', () => {
      createAnchorTestComponent(AnchorTestInstance);
      expect(anchorTestInstance.anchorInstance()).toBeTruthy();
    });

    it('disabled state prevents click binding on host element from firing', () => {
      createAnchorTestComponent(AnchorTestInstance);
      anchorTestInstance.disabled = true;
      anchorFixture.detectChanges();
      anchorNativeElement.click();

      expect(anchorTestInstance.clickBindingSpy).not.toHaveBeenCalled();
    });

    describe('a11y', () => {
      it('has no accessibility violations', async () => {
        createAnchorTestComponent(AnchorTestInstance);
        await expect(anchorFixture.nativeElement).toBeAccessible();
      });

      it('has correct a11y attributes when disabled', () => {
        createAnchorTestComponent(AnchorTestInstance);
        anchorTestInstance.disabled = true;
        anchorFixture.detectChanges();
        expect(anchorNativeElement.getAttribute('disabled')).not.toBeNull();
        expect(anchorNativeElement.getAttribute('aria-disabled')).toBe('true');
        expect(anchorNativeElement.getAttribute('tabindex')).toBe('-1');

        anchorTestInstance.disabled = false;
        anchorFixture.detectChanges();
        expect(anchorNativeElement.getAttribute('disabled')).toBeNull();
        expect(anchorNativeElement.getAttribute('aria-disabled')).toBeNull();
        expect(anchorNativeElement.getAttribute('tabindex')).toBeNull();
      });

      it('has correct a11y attributes when loading', () => {
        createAnchorTestComponent(AnchorTestInstance);
        anchorTestInstance.loading = true;
        anchorFixture.detectChanges();
        expect(anchorNativeElement.getAttribute('disabled')).toBeNull();
        expect(anchorNativeElement.getAttribute('aria-disabled')).toBe('true');
        expect(anchorNativeElement.getAttribute('tabindex')).toBeNull();
        anchorTestInstance.loading = false;
        anchorFixture.detectChanges();
        expect(anchorNativeElement.getAttribute('aria-disabled')).toBeNull();
        expect(anchorNativeElement.getAttribute('tabindex')).toBeNull();
      });
    });
  });
});

@Component({
  selector: 'test-button-test',
  template: `<button
    [nxPlainButton]="classNames"
    [size]="size"
    [variant]="variant"
    [colorScheme]="colorScheme"
    [critical]="critical"
    [loading]="loading"
    [tabindex]="tabindexAttribute"
    [tabIndex]="tabIndex"
    (click)="clickSpy()"
    #button
  >
    Hello Button
  </button>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxButtonModule],
})
class ButtonTest {
  buttonInstance = viewChild.required(NxPlainButtonComponent);

  classNames = '';
  size: NxPlainButtonSize = 'medium';
  variant: NxPlainButtonVariant = 'primary';
  colorScheme: NxPlainButtonColorScheme = 'default';
  critical = false;
  loading = false;
  tabindexAttribute: number | null = null;
  tabIndex: number | null = null;
  readonly clickSpy = vi.fn().mockName('clickSpy');
}
