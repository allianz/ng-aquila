import { NgModule } from '@angular/core';
import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';
import { LABEL_DEFAULT_OPTIONS, LabelDefaultOptions, ERROR_DEFAULT_OPTIONS, ErrorDefaultOptions } from '@aposin/ng-aquila/base';
import { DatepickerDefaultOptions, DATEPICKER_DEFAULT_OPTIONS } from '@aposin/ng-aquila/datefield';
import { TabGroupDefaultOptions, TabNavBarDefaultOptions, TAB_GROUP_DEFAULT_OPTIONS, TAB_NAV_BAR_DEFAULT_OPTIONS } from '@aposin/ng-aquila/tabs';

// expert presets
const formfieldExpertOptions: FormfieldDefaultOptions = {
  appearance: 'outline',
  nxFloatLabel: 'always'
};

const errorExpertOptions: ErrorDefaultOptions = { appearance: 'text' };
const labelExpertOptions: LabelDefaultOptions = { size: 'small' };
const datepickerExpertOptions: DatepickerDefaultOptions = { toggleIconTabindex: -1 };
const tabGroupOptions: TabGroupDefaultOptions = { appearance: 'expert'};
const tabNavBarOptions: TabNavBarDefaultOptions = { appearance: 'expert' };

@NgModule({
  providers: [
    { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldExpertOptions },
    { provide: LABEL_DEFAULT_OPTIONS, useValue: labelExpertOptions },
    { provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerExpertOptions },
    { provide: ERROR_DEFAULT_OPTIONS, useValue: errorExpertOptions },
    { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: tabGroupOptions },
    { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: tabNavBarOptions }
  ]
})

// should not be a singleton since different tokens can be used in separate modules
export class NxExpertModule { }
