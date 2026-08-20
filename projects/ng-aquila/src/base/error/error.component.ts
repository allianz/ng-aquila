import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  Inject,
  inject,
  Injectable,
  InjectionToken,
  Input,
  input,
  OnDestroy,
  Optional,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/* Types of error notification styles */
export type ErrorStyleType = 'message' | 'text';

/**
 * Represents the default options for the error notification that can be configured
 * using the `ERROR_DEFAULT_OPTIONS` injection token.
 */
@Injectable()
export class ErrorDefaultOptions {
  /**
   * Stream that emits whenever the default options are changed. Use this to notify
   * components if the default options have changed after initialization.
   */
  changes?: Subject<void>;

  /** Defines the style type of the error notification. */
  appearance?: ErrorStyleType;
}

export const ERROR_DEFAULT_OPTIONS = new InjectionToken<ErrorDefaultOptions>(
  'ERROR_DEFAULT_OPTIONS',
);

@Component({
  selector: 'nx-error',
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./error.component.scss'],
  host: {
    '[attr.role]': '"alert"',
    '[class.nx-error--message]': 'appearance() == "message"',
  },
  imports: [NxIconModule, NgTemplateOutlet, NxMessageModule],
})
export class NxErrorComponent implements OnDestroy {
  /** Whether an icon should be displayed. Only has an effect for type 'text' */
  @Input() set showIcon(value: BooleanInput) {
    this._showIcon = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get showIcon(): boolean {
    return this._showIcon;
  }
  private _showIcon = true;

  /**
   * Id of the nx-error.
   *
   * If not set, the selectable card gets an incremented value by default.
   */
  @Input() set id(value: string) {
    if (value && value !== this._id) {
      this._id = value;
      this._cdr.markForCheck();
    }
  }
  get id(): string {
    return this._id;
  }
  private _id = inject(IdGenerationService).nextId('nx-error');
  private readonly _allianzOne = inject<AllianzOneOptions | null>(ALLIANZ_ONE, { optional: true });

  protected readonly _isAllianzOne = computed(() => this._allianzOne?.enabled?.() ?? false);

  /**
   * Whether the error should have message or text styling. Can be changed for NDBX only. A1 enforces text appearance.
   *
   * Default: `'message'`.
   */
  readonly appearanceInput = input<ErrorStyleType | undefined | ''>(undefined, {
    alias: 'appearance',
  });

  readonly appearance = computed<ErrorStyleType>(() => {
    if (this._isAllianzOne()) {
      return 'text';
    }
    return this.appearanceInput() || this._defaultAppearance() || 'message';
  });
  private readonly _defaultAppearance = signal<ErrorStyleType | undefined>(undefined);

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    @Optional()
    @Inject(ERROR_DEFAULT_OPTIONS)
    private readonly _defaultOptions: ErrorDefaultOptions | null,
  ) {
    this._defaultAppearance.set(this._defaultOptions?.appearance);
    this._defaultOptions?.changes?.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._defaultAppearance.set(this._defaultOptions?.appearance);
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
