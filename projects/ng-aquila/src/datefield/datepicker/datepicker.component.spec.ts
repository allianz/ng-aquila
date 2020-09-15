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
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';

import {JAN, JUN, JUL, DEC } from '../../cdk-test-utils';
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

  afterEach(inject([OverlayContainer], (container: OverlayContainer) => {
    container.ngOnDestroy();
  }));

  describe('with NxNativeDateModule', () => {
    describe('standard datepicker', () => {
      let fixture: ComponentFixture<StandardDatepicker>;
      let testComponent: StandardDatepicker;

      beforeEach(fakeAsync(() => {
        fixture = createComponent(StandardDatepicker, [NxNativeDateModule]);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
      }));

      afterEach(fakeAsync(() => {
        testComponent.datepicker.close();
        fixture.detectChanges();
        flush();
      }));

      it('should initialize with correct value shown in input', () => {
        if (SUPPORTS_INTL) {
          expect(fixture.nativeElement.querySelector('input').value).toBe('1/1/2020');
        }
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
