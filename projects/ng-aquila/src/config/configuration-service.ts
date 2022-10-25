import { Injectable } from '@angular/core';
import { ErrorDefaultOptions, LabelDefaultOptions } from '@aposin/ng-aquila/base';
import { SelectableCardDefaultOptions } from '@aposin/ng-aquila/card';
import { CircleToggleGroupDefaultOptions } from '@aposin/ng-aquila/circle-toggle';
import { DataDisplayDefaultOptions } from '@aposin/ng-aquila/data-display';
import { DatepickerDefaultOptions } from '@aposin/ng-aquila/datefield';
import { FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';
import { SmallStageDefaultOptions } from '@aposin/ng-aquila/small-stage';
import { TabGroupDefaultOptions, TabNavBarDefaultOptions } from '@aposin/ng-aquila/tabs';
import { Subject } from 'rxjs';

export const datepickerOptions: DatepickerDefaultOptions = { changes: new Subject<void>() };
export const errorOptions: ErrorDefaultOptions = { changes: new Subject<void>() };
export const formfieldOptions: FormfieldDefaultOptions = {};
export const labelOptions: LabelDefaultOptions = {};
export const tabGroupOptions: TabGroupDefaultOptions = {};
export const tabNavBarOptions: TabNavBarDefaultOptions = {};
export const selectableCardOptions: SelectableCardDefaultOptions = {};
export const smallStageOptions: SmallStageDefaultOptions = {};
export const circleToggleGroupOptions: CircleToggleGroupDefaultOptions = {};
export const dataDisplayOptions: DataDisplayDefaultOptions = {};

/**
 * Service for switching values of the defaultOptions injection tokens at runtime.
 * WARNING: This service should not be used in actual applications!
 * It is only meant to showcase different options for documentation purposes.
 */
@Injectable({ providedIn: 'root' })
export class NxConfigurationService {
    clearOptions() {
        delete datepickerOptions.toggleIconTabindex;
        datepickerOptions.changes!.next();
        delete errorOptions.appearance;
        errorOptions.changes!.next();
        delete formfieldOptions.appearance;
        delete formfieldOptions.nxFloatLabel;
        delete labelOptions.size;
        delete tabGroupOptions.appearance;
        delete tabNavBarOptions.appearance;
        delete selectableCardOptions.appearance;
        delete smallStageOptions.appearance;
        delete circleToggleGroupOptions.appearance;
        delete dataDisplayOptions.size;
    }

    switchToExpert() {
        datepickerOptions.toggleIconTabindex = -1;
        datepickerOptions.changes!.next();
        errorOptions.appearance = 'text';
        errorOptions.changes!.next();
        formfieldOptions.appearance = 'outline';
        formfieldOptions.nxFloatLabel = 'always';
        labelOptions.size = 'small';
        tabGroupOptions.appearance = 'expert';
        tabNavBarOptions.appearance = 'expert';
        selectableCardOptions.appearance = 'expert';
        smallStageOptions.appearance = 'expert';
        circleToggleGroupOptions.appearance = 'expert';
        dataDisplayOptions.size = 'medium';
    }

    switchToRetail() {
        datepickerOptions.toggleIconTabindex = 0;
        datepickerOptions.changes!.next();
        errorOptions.appearance = 'message';
        errorOptions.changes!.next();
        formfieldOptions.appearance = 'auto';
        formfieldOptions.nxFloatLabel = 'auto';
        labelOptions.size = 'large';
        tabGroupOptions.appearance = 'default';
        tabNavBarOptions.appearance = 'default';
        selectableCardOptions.appearance = 'default';
        smallStageOptions.appearance = 'default';
        circleToggleGroupOptions.appearance = 'default';
        dataDisplayOptions.size = 'large';
    }
}
