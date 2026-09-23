import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

/** Type of formfield event that triggers change detection. */
export type NxFormfieldUpdateEventType = 'change' | 'blur';

/** @docs-private */
@Directive({ standalone: true })
export abstract class NxFormfieldControl<T> {
  value!: T | null;

  // Allow the control to notify the parent formfield about internal state changes
  readonly stateChanges!: Observable<void>;

  readonly empty!: boolean;

  readonly id!: string;

  readonly ngControl!: NgControl | null;

  readonly focused!: boolean;

  readonly required!: boolean;

  readonly disabled!: boolean;

  readonly readonly!: boolean;

  readonly shouldLabelFloat?: boolean;

  readonly errorState!: boolean;

  /** The placeholder for this control. */
  readonly placeholder!: string;

  /**
   * An optional name for the control type that can be used to distinguish `nx-formfield` elements
   * based on their control type. The form field will add a class,
   * `nx-formfield--type-{{controlType}}` to its root element.
   */
  readonly controlType?: string;

  /** Change detection trigger event of this control. */
  updateOn?: NxFormfieldUpdateEventType;

  /**
   * Reacts to a click on the control's own area, which includes the label and the empty
   * space next to a control that does not fill the row. Usually this moves focus into the
   * control; a control whose only mouse affordance is a panel opens that panel as well. A
   * prefix or suffix is not part of that area, so its own controls keep the focus they just
   * took. The formfield also skips the call while the control is disabled and while focus
   * already sits inside the control. A native `input`, `textarea` or `select` that fills the
   * area does not need this.
   */
  onContainerClick?(event: MouseEvent): void;

  abstract setDescribedByIds(ids: string[]): void;

  abstract setAriaLabel?(value: string): void;

  abstract get elementRef(): ElementRef;
}
