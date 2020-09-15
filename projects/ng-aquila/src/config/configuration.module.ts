import { NgModule } from '@angular/core';

import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';
import { LABEL_DEFAULT_OPTIONS } from '@aposin/ng-aquila/base';
import { DATEPICKER_DEFAULT_OPTIONS } from '@aposin/ng-aquila/datefield';
import { ERROR_DEFAULT_OPTIONS } from '@aposin/ng-aquila/base';
import { TAB_GROUP_DEFAULT_OPTIONS, TAB_NAV_BAR_DEFAULT_OPTIONS } from '@aposin/ng-aquila/tabs';
import {
  formfieldOptions,
  errorOptions,
  labelOptions,
  datepickerOptions,
  tabGroupOptions,
  tabNavBarOptions
} from './configuration-service';

@NgModule({
  providers: [
    { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldOptions },
    { provide: LABEL_DEFAULT_OPTIONS, useValue: labelOptions },
    { provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerOptions },
    { provide: ERROR_DEFAULT_OPTIONS, useValue: errorOptions },
    { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: tabGroupOptions },
    { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: tabNavBarOptions }
  ]
})
export class NxConfigurationModule { }
