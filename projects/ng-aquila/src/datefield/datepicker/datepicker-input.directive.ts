import { ElementRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export interface NxDatepickerInputInterface<D> {
  _disabledChange: Subject<boolean>;
  readonlyState(): boolean;

  value: D | null;
  /** Emits when the value changes (either due to user input or programmatic change). */
  readonly _valueChange: EventEmitter<D | null>;

  /** Returns an element that overlays can attach to. */
  getConnectedOverlayOrigin(): ElementRef;

  min: D | null;
  max: D | null;
  dateFilter: ((date: D | null) => boolean) | undefined;

  _focus(): void;
}
