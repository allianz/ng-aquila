import { NgModule } from '@angular/core';
import { ErrorDefaultOptions, ERROR_DEFAULT_OPTIONS, LabelDefaultOptions, LABEL_DEFAULT_OPTIONS } from '@aposin/ng-aquila/base';
import { SelectableCardDefaultOptions, SELECTABLE_CARD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/card';
import { CircleToggleGroupDefaultOptions, CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS } from '@aposin/ng-aquila/circle-toggle';
import { ComparisonTableDefaultOptions, COMPARISON_TABLE_DEFAULT_OPTIONS } from '@aposin/ng-aquila/comparison-table';
import { DataDisplayDefaultOptions, DATA_DISPLAY_DEFAULT_OPTIONS } from '@aposin/ng-aquila/data-display';
import { DatepickerDefaultOptions, DATEPICKER_DEFAULT_OPTIONS } from '@aposin/ng-aquila/datefield';
import { FormfieldDefaultOptions, FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';
import { SmallStageDefaultOptions, SMALL_STAGE_DEFAULT_OPTIONS } from '@aposin/ng-aquila/small-stage';
import { TabGroupDefaultOptions, TabNavBarDefaultOptions, TAB_GROUP_DEFAULT_OPTIONS, TAB_NAV_BAR_DEFAULT_OPTIONS } from '@aposin/ng-aquila/tabs';

// expert presets
const comparisonTableExpertOptions: ComparisonTableDefaultOptions = { useFullRowForExpandableArea: true };
const formfieldExpertOptions: FormfieldDefaultOptions = {
    appearance: 'outline',
    nxFloatLabel: 'always',
};
const errorExpertOptions: ErrorDefaultOptions = { appearance: 'text' };
const labelExpertOptions: LabelDefaultOptions = { size: 'small' };
const datepickerExpertOptions: DatepickerDefaultOptions = { toggleIconTabindex: -1 };
const tabGroupOptions: TabGroupDefaultOptions = { appearance: 'expert' };
const tabNavBarOptions: TabNavBarDefaultOptions = { appearance: 'expert' };
const selectableCardOptions: SelectableCardDefaultOptions = { appearance: 'expert' };
const smallStageOptions: SmallStageDefaultOptions = { appearance: 'expert' };
const circleToggleGroupOptions: CircleToggleGroupDefaultOptions = { appearance: 'expert' };
const dataDisplayOptions: DataDisplayDefaultOptions = { size: 'medium' };

@NgModule({
    providers: [
        { provide: COMPARISON_TABLE_DEFAULT_OPTIONS, useValue: comparisonTableExpertOptions },
        { provide: FORMFIELD_DEFAULT_OPTIONS, useValue: formfieldExpertOptions },
        { provide: LABEL_DEFAULT_OPTIONS, useValue: labelExpertOptions },
        { provide: DATEPICKER_DEFAULT_OPTIONS, useValue: datepickerExpertOptions },
        { provide: ERROR_DEFAULT_OPTIONS, useValue: errorExpertOptions },
        { provide: TAB_GROUP_DEFAULT_OPTIONS, useValue: tabGroupOptions },
        { provide: TAB_NAV_BAR_DEFAULT_OPTIONS, useValue: tabNavBarOptions },
        { provide: SELECTABLE_CARD_DEFAULT_OPTIONS, useValue: selectableCardOptions },
        { provide: SMALL_STAGE_DEFAULT_OPTIONS, useValue: smallStageOptions },
        { provide: CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS, useValue: circleToggleGroupOptions },
        { provide: DATA_DISPLAY_DEFAULT_OPTIONS, useValue: dataDisplayOptions },
    ],
})

// should not be a singleton since different tokens can be used in separate modules
export class NxExpertModule {}
