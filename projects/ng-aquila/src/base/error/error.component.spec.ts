import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxSurface, NxSurfaceType } from '@allianz/ng-aquila/surface';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Subject } from 'rxjs';

import {
  ERROR_DEFAULT_OPTIONS,
  ErrorDefaultOptions,
  ErrorStyleType,
  NxErrorComponent,
} from './error.component';
import { NxErrorModule } from './error.module';

const errorOptions: ErrorDefaultOptions = {
  changes: new Subject<void>(),
  appearance: 'text',
};

@Directive({ standalone: true })
abstract class ErrorTest {
  @ViewChild(NxErrorComponent)
  errorInstance!: NxErrorComponent;
  id!: string;
  appearance!: ErrorStyleType;
  inverse?: boolean;
  readonly surface = signal<NxSurfaceType>('attention');
}

describe('NxErrorComponent', () => {
  let fixture: ComponentFixture<ErrorTest>;
  let testInstance: ErrorTest;
  let errorInstance: NxErrorComponent;

  function createTestComponent(component: Type<ErrorTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    errorInstance = testInstance.errorInstance;
  }

  describe('basic', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NxErrorModule, BasicError, ConfigurableError],
      }).compileComponents();
    }));

    it('creates the nx-error', () => {
      createTestComponent(BasicError);
      expect(errorInstance).toBeTruthy();
    });

    it('creates the nx-error with an icon', () => {
      createTestComponent(ConfigurableError);
      testInstance.appearance = 'text';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('nx-status-icon') as HTMLButtonElement;
      expect(icon).toHaveClass('nx-error__icon');
      expect(errorInstance).toBeTruthy();
    });

    it('creates an error message with b2c look per default', () => {
      createTestComponent(BasicError);
      const messageEl = fixture.nativeElement.querySelector('nx-message');
      expect(messageEl).toBeTruthy();
    });

    it('creates the nx-error with an auto generated id', () => {
      createTestComponent(BasicError);
      const content = fixture.nativeElement.querySelector('.nx-error__content') as HTMLElement;

      // Must be a real RegExp: Vitest treats a string argument as a literal substring,
      // whereas Jasmine compiled it as a pattern.
      expect(content.id).toMatch(/nx-error-\d/);
    });

    it('creates the nx-error with a custom id', () => {
      createTestComponent(ConfigurableError);
      const content = fixture.nativeElement.querySelector('.nx-error__content') as HTMLElement;
      testInstance.id = '';
      fixture.detectChanges();

      expect(content.id).toContain('nx-error-');

      testInstance.id = 'customID';
      fixture.detectChanges();

      expect(errorInstance.id).toBe('customID');
      expect(content.id).toBe('customID');
    });

    it('applies the inverse host class when inverse is set', () => {
      createTestComponent(ConfigurableError);
      const errorEl = fixture.nativeElement.querySelector('nx-error') as HTMLElement;
      expect(errorEl).not.toHaveClass('nx-error--inverse');

      testInstance.inverse = true;
      fixture.detectChanges();

      expect(errorEl).toHaveClass('nx-error--inverse');
    });
  });

  describe('error option injection', () => {
    beforeEach(waitForAsync(() => {
      errorOptions.appearance = 'text';
      TestBed.configureTestingModule({
        imports: [NxErrorModule, BasicError, ConfigurableError],
        providers: [{ provide: ERROR_DEFAULT_OPTIONS, useValue: errorOptions }],
      }).compileComponents();
    }));

    it('creates an error with the correct appearance', () => {
      createTestComponent(BasicError);
      const iconEl = fixture.nativeElement.querySelector('nx-icon');
      const messageEl = fixture.nativeElement.querySelector('nx-message');
      expect(iconEl).toBeTruthy();
      expect(messageEl).toBeFalsy();
      expect(testInstance.errorInstance.appearance()).toBe('text');
    });

    it('changes the appearance on change', inject(
      [ERROR_DEFAULT_OPTIONS],
      (defaultOptions: ErrorDefaultOptions) => {
        createTestComponent(BasicError);
        expect(testInstance.errorInstance.appearance()).toBe('text');
        let messageEl = fixture.nativeElement.querySelector('nx-message');
        expect(messageEl).toBeFalsy();

        defaultOptions.appearance = 'message';
        defaultOptions.changes?.next();
        fixture.detectChanges();
        expect(testInstance.errorInstance.appearance()).toBe('message');
        messageEl = fixture.nativeElement.querySelector('nx-message');
        expect(messageEl).toBeTruthy();
      },
    ));

    it('creates an error with the correct appearance if appearance is explicitly set', () => {
      createTestComponent(ConfigurableError);
      testInstance.appearance = 'message';
      fixture.detectChanges();
      const messageEl = fixture.nativeElement.querySelector('nx-message');
      expect(messageEl).toBeTruthy();
    });
  });

  describe('under Allianz One', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NxErrorModule, BasicError, ConfigurableError],
        providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
      }).compileComponents();
    }));

    it('enforces "text" appearance even if "message" is explicitly set', () => {
      createTestComponent(ConfigurableError);
      testInstance.appearance = 'message';
      fixture.detectChanges();

      expect(errorInstance.appearance()).toBe('text');
      const messageEl = fixture.nativeElement.querySelector('nx-message');
      expect(messageEl).toBeFalsy();
    });

    it('enforces "text" appearance even if default options set "message"', () => {
      TestBed.overrideProvider(ERROR_DEFAULT_OPTIONS, { useValue: { appearance: 'message' } });
      createTestComponent(BasicError);

      expect(errorInstance.appearance()).toBe('text');
    });
  });

  describe('on a surface', () => {
    function statusIcon(): HTMLElement {
      return fixture.nativeElement.querySelector('nx-status-icon');
    }

    function errorEl(): HTMLElement {
      return fixture.nativeElement.querySelector('nx-error');
    }

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NxErrorModule, SurfaceError],
        providers: [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }],
      }).compileComponents();
    }));

    it('follows the attention surface while inverse is unset', () => {
      createTestComponent(SurfaceError);

      expect(errorEl()).toHaveClass('nx-error--inverse');
      expect(statusIcon()).toHaveClass('nx-status-icon--inverse');
    });

    it('does not invert on the default surface', () => {
      createTestComponent(SurfaceError);
      testInstance.surface.set('default');
      fixture.detectChanges();

      expect(errorEl()).not.toHaveClass('nx-error--inverse');
      expect(statusIcon()).not.toHaveClass('nx-status-icon--inverse');
    });

    it('inverts on the default surface when inverse is set', () => {
      createTestComponent(SurfaceError);
      testInstance.surface.set('default');
      testInstance.inverse = true;
      fixture.detectChanges();

      expect(errorEl()).toHaveClass('nx-error--inverse');
      expect(statusIcon()).toHaveClass('nx-status-icon--inverse');
    });

    it('stays non-inverse on the attention surface when inverse is explicitly false', () => {
      createTestComponent(SurfaceError);
      testInstance.inverse = false;
      fixture.detectChanges();

      expect(errorEl()).not.toHaveClass('nx-error--inverse');
      expect(statusIcon()).not.toHaveClass('nx-status-icon--inverse');
    });
  });
});

@Component({
  selector: 'test-basic-error',
  template: `<nx-error>I am an error message.</nx-error>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxErrorModule],
})
class BasicError extends ErrorTest {}

@Component({
  selector: 'test-configurable-error',
  template: `<nx-error [appearance]="appearance" [id]="id" [inverse]="inverse"
    >I am an error message with an icon.</nx-error
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxErrorModule],
})
class ConfigurableError extends ErrorTest {}

@Component({
  selector: 'test-surface-error',
  template: `<div [nxSurface]="surface()">
    <nx-error [inverse]="inverse">I am an error message with an icon.</nx-error>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxErrorModule, NxSurface],
})
class SurfaceError extends ErrorTest {}
