import { Highlightable } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Directive, ElementRef, inject, Input } from '@angular/core';

/** The next id to use for creating unique DOM IDs. */
let nextId = 0;

@Directive({
  selector: '[nxTimefieldOption]',
  standalone: true,
  exportAs: 'nxTimefieldOption',
  host: {
    role: 'option',
    class: 'nx-timefield-option',
    '[id]': 'id',
    '[attr.aria-selected]': 'selected',
    '[class.is-active]': '_active',
  },
})
export class NxTimefieldOption implements Highlightable {
  protected _active = false;

  @Input({ alias: 'nxTimefieldOption' }) value: string = '';
  @Input() selected = false;

  /** The id of the option's host element. */
  @Input()
  get id() {
    return this._id || this._generatedId;
  }
  set id(value) {
    this._id = value;
  }
  private _id = '';
  private readonly _generatedId = `nx-timefield-option-${nextId++}`;

  /** The option's host element */
  readonly element: HTMLElement = inject(ElementRef).nativeElement;

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  setActiveStyles(): void {
    this._active = true;
    this._cdr.markForCheck();
  }
  setInactiveStyles(): void {
    this._active = false;
    this._cdr.markForCheck();
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.element.textContent?.trim() ?? '';
  }
}
