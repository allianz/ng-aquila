import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  Directive,
  ElementRef,
  Input,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
/** Size of an avatar. */
export type NxAvatarSize = 'xsmall' | 'small' | 'small-medium' | 'medium' | 'large' | 'xlarge';
export type NxAvatarAccentColor =
  'yellow' | 'orange' | 'red' | 'purple' | 'teal' | 'aqua' | 'blue' | 'green' | 'gray' | 'default';
/** Prominence of an avatar's accent color. */
export type NxAvatarProminence = 'subtle' | 'attention';
@Component({
  selector: '[nxAvatar]',
  template: `<div class="nx-avatar__content-wrapper">
    <ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./avatar.scss'],
  host: {
    '[class.nx-avatar--xsmall]': 'size === "xsmall"',
    '[class.nx-avatar--small]': 'size === "small"',
    '[class.nx-avatar--small-medium]': 'size === "small-medium"',
    '[class.nx-avatar--medium]': 'size === "medium"',
    '[class.nx-avatar--large]': 'size === "large"',
    '[class.nx-avatar--xlarge]': 'size === "xlarge"',
    '[class.is-button]': '_isButton()',
    '[class.nx-avatar--disabled]': 'disabled()',
    '[class.is-attention]': 'prominence() === "attention"',
    '[class]': '_avatarClass()',
  },
  standalone: true,
})
export class NxAvatarComponent implements OnDestroy, AfterViewInit {
  /** Sets the size of the avatar. Default: 'medium'. */
  @Input() set size(size: NxAvatarSize) {
    if (this._size !== size) {
      this._size = size;
      this._cdr.markForCheck();
    }
  }
  get size(): NxAvatarSize {
    return this._size;
  }

  disabled = input(false, { transform: booleanAttribute });
  protected _isButton = signal(false);
  readonly accentColor = input<NxAvatarAccentColor>('default');
  readonly prominence = input<NxAvatarProminence>('subtle');
  protected readonly _avatarClass = computed(() => {
    if (this.accentColor() === 'default') {
      return '';
    }
    return `nx-avatar--accent-${this.prominence()}-${this.accentColor()}`;
  });

  private _size: NxAvatarSize = 'medium';
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
    private readonly _cdr: ChangeDetectorRef,
  ) {}
  ngAfterViewInit(): void {
    const nativeEl = this._elementRef.nativeElement;
    this._isButton.set(nativeEl.tagName === 'BUTTON');
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}
@Directive({
  selector: 'button[nxAvatar]',
  host: {},
  standalone: true,
})
export class NxAvatarButtonDirective {
  constructor(public nxAvatar: NxAvatarComponent) {}
}
