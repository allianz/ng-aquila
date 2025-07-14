import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

/** Options for sizing of the spinner. */
export type SpinnerSize = 'small' | 'medium' | 'large';

/** Options for aria live regions of the spinner. */
export type AriaPolite = 'polite' | 'assertive' | 'off';

const DEFAULT_SIZE = 'small';

const ARIA_POLITENESS_ASSERTIVE = 'assertive';

/** required to be able to read same message multiple times https://github.com/angular/components/blob/7beb95219ddc9a16cd28ee2524bf1594e04c1c58/src/cdk/a11y/live-announcer/live-announcer.ts#L112-L127 */
const ANNOUNCER_DURATION = 1000;

@Component({
  selector: 'nx-spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./spinner.component.scss'],
  host: {
    '[class.nx-spinner--small]': 'size === "small"',
    '[class.nx-spinner--medium]': 'size === "medium"',
    '[class.nx-spinner--large]': 'size === "large"',
    '[class.nx-spinner--negative]': 'negative',
    '[attr.role]': '"status"',
    '[attr.aria-live]': 'ariaPoliteness',
    '[attr.aria-hidden]': '"true"',
  },
  standalone: true,
})
export class NxSpinnerComponent implements OnInit, OnDestroy {
  /** Sets the size of the spinner. Default is 'small'. */
  @Input() set size(value: SpinnerSize) {
    if (value !== this._size) {
      this._size = value;
      this._cdr.markForCheck();
    }
  }

  get size(): SpinnerSize {
    return this._size;
  }

  private _size: SpinnerSize = DEFAULT_SIZE;

  /** Whether the spinner should use a negative styling. */
  @Input() set negative(value: BooleanInput) {
    if (value !== this._negative) {
      this._negative = coerceBooleanProperty(value);
      this._cdr.markForCheck();
    }
  }

  get negative(): boolean {
    return this._negative;
  }

  private _negative = false;

  /**
   * Message that will be announced by screen readers at instantiation.
   * Do __not__ combine with an `aria-live` area.
   * Empty messages will be ignored. Defaults to empty/no message
   */
  @Input() set activationAnnouncement(value: string) {
    this._activationAnnouncement = value;
  }

  get activationAnnouncement(): string {
    return this._activationAnnouncement;
  }

  private _activationAnnouncement: string = '';

  /**
   * Message that will be announced by screen readers at destroy.
   * Do __not__ combine with an `aria-live` area.
   * Empty messages will be ignored. Defaults to empty/no message
   */
  @Input() set completionAnnouncement(value: string) {
    this._completionAnnouncement = value;
  }

  get completionAnnouncement(): string {
    return this._completionAnnouncement;
  }

  private _completionAnnouncement: string = '';

  /** Sets the aria live regions of the spinner. Default is 'assertive'. */
  @Input() ariaPoliteness: AriaPolite = ARIA_POLITENESS_ASSERTIVE;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {
    this.announce(this.activationAnnouncement);
  }

  ngOnDestroy() {
    this.announce(this.completionAnnouncement);
  }

  private async announce(message: string) {
    if (message.length > 0) {
      await this.liveAnnouncer.announce(message, this.ariaPoliteness, ANNOUNCER_DURATION);
    }
  }
}
