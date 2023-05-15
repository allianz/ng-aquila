import { NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { Observable, Subject } from 'rxjs';

export abstract class NxDropdownControl extends NxFormfieldControl<any> {
    /**
     * Whether the dropdown should allow multi selection and additional checkboxes are shown.
     *
     * Note: Please make sure the value you bind is an array. If not an error is thrown!
     */
    isMultiSelect = false;

    ignoreItemTruncation = false;

    readonly filterChanges!: Subject<any>;

    readonly _closedStream!: Observable<void>;

    abstract filterFn(search: string, itemValue: string): boolean;

    abstract valueFormatter(value: any): string;

    /** @docs-private */
    abstract formatValue?(value: any): string;
}
