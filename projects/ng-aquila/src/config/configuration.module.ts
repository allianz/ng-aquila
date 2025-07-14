import { ERROR_DEFAULT_OPTIONS, LABEL_DEFAULT_OPTIONS } from '@allianz/ng-aquila/base';
import { SELECTABLE_CARD_DEFAULT_OPTIONS } from '@allianz/ng-aquila/card';
import {
  CIRCLE_TOGGLE_DEFAULT_OPTIONS,
  CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS,
} from '@allianz/ng-aquila/circle-toggle';
import { DATEPICKER_DEFAULT_OPTIONS } from '@allianz/ng-aquila/datefield';
import { FORMFIELD_DEFAULT_OPTIONS } from '@allianz/ng-aquila/formfield';
import { SMALL_STAGE_DEFAULT_OPTIONS } from '@allianz/ng-aquila/small-stage';
import { TAB_GROUP_DEFAULT_OPTIONS, TAB_NAV_BAR_DEFAULT_OPTIONS } from '@allianz/ng-aquila/tabs';
import { NgModule } from '@angular/core';

import {
  circleToggleGroupOptions,
  circleToggleOptions,
  datepickerOptions,
  errorOptions,
  formfieldOptions,
  labelOptions,
  selectableCardOptions,
  smallStageOptions,
  tabGroupOptions,
  tabNavBarOptions,
} from './configuration-service';

@NgModule({
  providers: [
    { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldOptions },
    { provide: LABEL_DEFAULT_OPTIONS, useValue: labelOptions },
    { provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerOptions },
    { provide: ERROR_DEFAULT_OPTIONS, useValue: errorOptions },
    { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: tabGroupOptions },
    { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: tabNavBarOptions },
    { provide: SELECTABLE_CARD_DEFAULT_OPTIONS, useValue: selectableCardOptions },
    { provide: SMALL_STAGE_DEFAULT_OPTIONS, useValue: smallStageOptions },
    { provide: CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS, useValue: circleToggleGroupOptions },
    { provide: CIRCLE_TOGGLE_DEFAULT_OPTIONS, useValue: circleToggleOptions },
  ],
})
export class NxConfigurationModule {}
