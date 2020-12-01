import { NxDatefieldModule } from '../datefield.module';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NxNativeDateModule } from '../adapter/index';
import { flush, fakeAsync, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NxDatepickerComponent } from './datepicker.component';
import { NxDatefieldDirective } from '@aposin/ng-aquila/datefield';
import { EventEmitter, ViewChild } from '@angular/core';
import { Component } from '@angular/core';

import {JAN, JUN, JUL, DEC } from '../../cdk-test-utils';
import { Direction, Directionality } from '@angular/cdk/bidi';
// tslint:disable component-class-suffix

describe('NxDatepicker', () => {
  const SUPPORTS_INTL = typeof Intl !== 'undefined';

  // Creates a test component fixture.
  function createComponent(component: any, imports: any[] = [], providers: any[] = []):
    ComponentFixture<any> {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NxDatefieldModule,
        NxFormfieldModule,
        NxInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        ...imports
      ],
      providers,
      declarations: [component],
    }).compileComponents();

    return TestBed.createComponent(component);
  }

  function fakeDirectionalityFactory(dir: Direction, activeEmitter = false): [Partial<Directionality>, EventEmitter<Direction>] {
    const changeEmitter = new EventEmitter<Direction>();
    const fakeDirectionality = {
      value: dir,
      change: changeEmitter,
    };
    if (!activeEmitter) {
      changeEmitter.complete();
    }
    return [fakeDirectionality, changeEmitter];
  }

  afterEach(inject([OverlayContainer], (container: OverlayContainer) => {
    container.ngOnDestroy();
  }));

  describe('with NxNativeDateModule', () => {
    describe('standard datepicker', () => {
      let fixture: ComponentFixture<StandardDatepicker>;
      let testComponent: StandardDatepicker;

      function compileTestComponent(providers = []) {
        fixture = createComponent(StandardDatepicker, [NxNativeDateModule], providers);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }

      afterEach(fakeAsync(() => {
        testComponent?.datepicker.close();
        fixture?.detectChanges();
        flush();
      }));

      it('should initialize with correct value shown in input', () => {
        compileTestComponent();
        if (SUPPORTS_INTL) {
          expect(fixture.nativeElement.querySelector('input').value).toBe('1/1/2020');
        }
      });

      describe('popup direction', () => {
        it('is initialized with ltr by default', fakeAsync(() => {
          compileTestComponent();
          testComponent.datepicker.open();
          fixture.detectChanges();
          flush();

          const direction = (testComponent.datepicker as any)._popupRef.getDirection();
          expect(direction).toBe('ltr');
        }));

        it('is initialized with rtl if provided', fakeAsync(() => {
          const [fakeDirectionality] = fakeDirectionalityFactory('rtl');
          compileTestComponent([
            { provide: Directionality, useValue: fakeDirectionality}
          ]);
          testComponent.datepicker.open();
          fixture.detectChanges();
          flush();

          const direction = (testComponent.datepicker as any)._popupRef.getDirection();
          expect(direction).toBe('rtl');
        }));
      });
      describe('when ancestor directionality changes', () => {
        it('closes datepicker popup and removes ref', fakeAsync(() => {
          const [fakeDirectionality, changeEmitter] = fakeDirectionalityFactory('ltr', true);
          compileTestComponent([
            { provide: Directionality, useValue: fakeDirectionality}
          ]);
          testComponent.datepicker.open();
          spyOn(testComponent.datepicker, 'close');
          fixture.detectChanges();
          flush();
          changeEmitter.emit('rtl');

          expect(testComponent.datepicker.close).toHaveBeenCalledTimes(1);
          expect((testComponent.datepicker as any)._popupRef).toBe(null);
          changeEmitter.complete();
        }));
      });
    });
  });
});

@Component({
  template: `
    <input nxDatefield [nxDatepicker]="d" [value]="date">
    <nx-datepicker #d [disabled]="disabled" [opened]="opened"></nx-datepicker>
  `,
})
class StandardDatepicker {
  opened = false;
  touch = false;
  disabled = false;
  date: Date | null = new Date(2020, JAN, 1);
  @ViewChild('d') datepicker: NxDatepickerComponent<Date>;
  @ViewChild(NxDatefieldDirective) datepickerInput: NxDatefieldDirective<Date>;
}
