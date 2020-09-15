import { ChangeDetectorRef, Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFileUploadButton]',
  host: {
    '[attr.aria-describedby]': '_ariaDescribedby || null',
    '[attr.disabled]': 'disabled || null',
  }
})
export class NxFileUploaderButtonDirective implements OnDestroy {
  _clicked = new Subject();
  _ariaDescribedby: string;
  private _disabled: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  /** Whether the file uploader is disabled */
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    this._changeDetectorRef.markForCheck();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /** @docs-private */
  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }

  /** @docs-private */
  @HostListener('click') onClick() {
    this._clicked.next();
  }

  ngOnDestroy(): void {
    this._clicked.complete();
  }
}
