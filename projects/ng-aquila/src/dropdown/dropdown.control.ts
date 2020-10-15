import { NxFormfieldControl } from '@aposin/ng-aquila/formfield';

export abstract class NxDropdownControl extends NxFormfieldControl<any> {
  /**
   * Whether the dropdown should allow multi selection and additional checkboxes are shown.
   *
   * Note: Please make sure the value you bind is an array. If not an error is thrown! */
  isMultiSelect: boolean = false;

  /** @docs-private */
  abstract formatValue?(value): string;

}
