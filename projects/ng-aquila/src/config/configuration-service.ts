import { Injectable } from '@angular/core';
import { FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';
import { ErrorDefaultOptions, LabelDefaultOptions } from '@aposin/ng-aquila/base';
import { DatepickerDefaultOptions } from '@aposin/ng-aquila/datefield';
import { TabGroupDefaultOptions, TabNavBarDefaultOptions } from '@aposin/ng-aquila/tabs';
import { Subject } from 'rxjs';

export const datepickerOptions: DatepickerDefaultOptions = { changes: new Subject<void>() };
export const errorOptions: ErrorDefaultOptions = { changes: new Subject<void>() };
export const formfieldOptions: FormfieldDefaultOptions = { };
export const labelOptions: LabelDefaultOptions = { };
export const tabGroupOptions: TabGroupDefaultOptions = { };
export const tabNavBarOptions: TabNavBarDefaultOptions = { };

/**
 * Service for switching values of the defaultOptions injection tokens at runtime.
 * WARNING: This service should not be used in actual applications!
 * It is only meant to showcase different options for documentation purposes.
 */
@Injectable({ providedIn: 'root' })
export class NxConfigurationService {

  clearOptions() {
    delete datepickerOptions.toggleIconTabindex;
    datepickerOptions.changes.next();
    delete errorOptions.appearance;
    errorOptions.changes.next();
    delete formfieldOptions.appearance;
    delete formfieldOptions.nxFloatLabel;
    delete labelOptions.size;
    delete tabGroupOptions.appearance;
    delete tabNavBarOptions.appearance;
  }

  switchToExpert() {
    datepickerOptions.toggleIconTabindex = -1;
    datepickerOptions.changes.next();
    errorOptions.appearance = 'text';
    errorOptions.changes.next();
    formfieldOptions.appearance = 'outline';
    formfieldOptions.nxFloatLabel = 'always';
    labelOptions.size = 'small';
    tabGroupOptions.appearance = 'expert';
    tabNavBarOptions.appearance = 'expert';
  }

  switchToRetail() {
    datepickerOptions.toggleIconTabindex = 0;
    datepickerOptions.changes.next();
    errorOptions.appearance = 'message';
    errorOptions.changes.next();
    formfieldOptions.appearance = 'auto';
    formfieldOptions.nxFloatLabel = 'auto';
    labelOptions.size = 'large';
    tabGroupOptions.appearance = 'default';
    tabNavBarOptions.appearance = 'default';
  }
}
