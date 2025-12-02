import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  input,
  OnDestroy,
} from '@angular/core';

@Component({
  templateUrl: './card.component.html',
  styleUrls: ['card.scss'],
  selector: 'nx-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-card',
    '[class.is-highlight]': 'highlight',
    '[class.is-clickable]': 'clickable()',
    '[class.is-disabled]': 'disabled()',
  },
  imports: [],
})
export class NxCardComponent implements OnDestroy, AfterViewInit {
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  private _highlight = false;

  ngAfterViewInit(): void {
    // we still listen for focus in case the user set a tabindex on the element
    // the focus monitor only adds the cdk-keyboard-focus class if the element is focusable
    // meaning it needs a tabindex in this case
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Whether the card is highlight. */
  @Input() set highlight(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._highlight) {
      this._highlight = newValue;
      this._cdr.markForCheck();
    }
  }
  get highlight(): boolean {
    return this._highlight;
  }

  readonly clickable = input(false, { transform: booleanAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });
}
