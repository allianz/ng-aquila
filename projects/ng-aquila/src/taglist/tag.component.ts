import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  input,
  model,
  ModelSignal,
  numberAttribute,
  OnDestroy,
  Output,
  Signal,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NxTagIntl } from './tag-intl';
import { TAGLIST } from './taglist-interface';

export type NxTagType = 'tag' | 'keyword';

@Component({
  selector: 'nx-tag-group',
  template: '<ng-content></ng-content>',
  styleUrl: 'tag-group.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: NxTagGroupComponent, multi: true },
    { provide: NxAbstractControl, useExisting: forwardRef(() => NxTagGroupComponent) },
  ],
  host: { role: 'group', '(focusout)': 'onBlur($event)' },
})
export class NxTagGroupComponent implements ControlValueAccessor, NxAbstractControl {
  readonly name = inject(IdGenerationService).nextId('nx-tag-group');

  private readonly _elementRef = inject(ElementRef);

  /** The value of the tag group, can be used as alternative to ngModel or reactive forms. */
  readonly value: ModelSignal<any[]> = model<any[]>([]);
  /** Whether the tags should be disabled. */
  readonly disabledInput = input(false, { transform: booleanAttribute, alias: 'disabled' });
  private readonly _accessorDisabled = signal(false);
  readonly disabled: Signal<boolean> = computed(
    () => this.disabledInput() || this._accessorDisabled(),
  );
  /** Whether the tags should be readonly. */
  readonly readonly = model(false);
  /** Whether the tags should be removable. */
  readonly removable = input(false, { transform: booleanAttribute });
  /** Switches the appearance of the tags. */
  readonly type = input<NxTagType>('tag');

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(value: any): void {
    // angular forms always pass null first, so we have to set this as an empty array
    // or the computed signals in the tags will fail.
    this.value.set(value === null ? [] : value);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this._accessorDisabled.set(isDisabled);
  }
  setReadonly(value: boolean): void {
    this.readonly.set(value);
  }

  addValue(value: any) {
    this.value.update((currentValue) => {
      if (!currentValue.includes(value)) {
        return [...currentValue, value];
      }
      return currentValue;
    });
    this._onChange(this.value());
  }

  removeValue(value: any) {
    this.value.update((currentValue) => currentValue.filter((v) => v !== value));
    this._onChange(this.value());
  }

  protected onBlur(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Node)) {
      this._onTouched();
    }
  }
}

@Component({
  selector: 'nx-tag',
  templateUrl: 'tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tag.component.scss'],
  host: {
    '(click)': 'emitLegacyClicked($event)',
    '(keydown.enter)': 'emitLegacyClicked($event)',
    '(keydown.space)': 'emitLegacyClicked($event)',
    '[attr.tabindex]': 'tabindex()',
    '[class.nx-tag-keyword]': 'type() === "keyword"',
    '[class.nx-tag-content]': '!tagGroup || removable()',
    '[class.nx-tag--removable]': 'removable()',
    '[class.nx-tag--disabled]': 'disabled()',
    '[class.nx-tag--readonly]': 'readonly()',
    '[class.can-hover]': 'canHover()',
    '[attr.role]': 'role()',
    '[attr.aria-labelledby]': 'role() === "group" ? id : null',
  },
  providers: [{ provide: NxAbstractControl, useExisting: forwardRef(() => NxTagComponent) }],
  imports: [NxIconModule, NxButtonModule, NgTemplateOutlet],
})
export class NxTagComponent implements OnDestroy, NxAbstractControl {
  intl = inject(NxTagIntl);
  readonly tagGroup = inject(NxTagGroupComponent, { optional: true });
  readonly tagList = inject(TAGLIST, { optional: true });
  readonly id = inject(IdGenerationService).nextId('nx-tag');
  private readonly _input = viewChild<ElementRef>('input');
  private _lastInputNativeElement: HTMLElement | undefined = undefined;

  /** Whether the tag should be readonly. */
  readonly removableInput = input(false, { alias: 'removable', transform: booleanAttribute });
  readonly removable = computed(() => this.tagGroup?.removable() || this.removableInput());

  /**
   * @deprecated Keyboard accessibility support will come from different solutions.
   *
   * Sets the tab-index of a tag. Default value: -1.
   */
  readonly tabindex = input(-1, { transform: numberAttribute });
  /**
   * Sets the value of the tag. This value will be used in the tag group model.
   * If no content projection is used this will be used as the visual label.
   */
  readonly value = input<any>('');

  /** Sets the appearance of the tag. */
  readonly typeInput = input<NxTagType>('tag', { alias: 'type' });
  readonly type = computed(() => this.tagGroup?.type() || this.typeInput());

  /** Set an aria-label on the remove button explicitly and not from the NxTagIntl class. */
  readonly deleteAriaLabel = input('');

  /** Whether the tag should be disabled. */
  readonly disabledInput = input(false, { transform: booleanAttribute, alias: 'disabled' });
  readonly disabled = computed(() => this.tagGroup?.disabled() || this.disabledInput());

  /** Whether the tag should be readonly. */
  readonly readonlyInput = model(false, { alias: 'readonly' });
  readonly readonly = computed(() => this.tagGroup?.readonly() || this.readonlyInput());

  readonly canHover = computed(() => !this.disabled() && !this.readonly() && !this.removable());

  selected = computed(() => {
    if (this.tagGroup) {
      return this.tagGroup.value().includes(this.value());
    }
    return false;
  });

  protected role = computed(() => {
    if (this.removable()) {
      return 'group';
    }
    if (this.tagList) {
      return 'button';
    }
    return null;
  });

  /**
   * An event is dispatched each time when the tag is clicked.
   * @deprecated Tags should not be clickable with the supported patterns. Needs to be kept for now for backwards compatibility with the deprecated taglist.
   */
  @Output() readonly clicked = new EventEmitter<any>();

  /** An event dispatched when the tag should be deleted. */
  @Output() readonly removed = new EventEmitter<any>();

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {
    this.intl.changes.pipe(takeUntilDestroyed()).subscribe(() => this._cdr.markForCheck());

    /**
     * From the ngIf and because removable is an option that can change
     * we need to react to these changes before using the focusMonitor.
     * Otherwise I ran into weird timing issues where the element was not there yet and then
     * the FocusMonitor throws an error on .`monitor`.
     *
     * For backwards compatibility if the tag is in a taglist we monitor the taglist element.
     */
    effect(() => {
      if (this._lastInputNativeElement) {
        this._focusMonitor.stopMonitoring(this._lastInputNativeElement);
      }
      if (this._input()) {
        this._focusMonitor.monitor(this._input()?.nativeElement);
        this._lastInputNativeElement = this._input()?.nativeElement;
        // backwards compatibility for taglist
      } else if (this.tagList) {
        this._focusMonitor.monitor(this._elementRef);
      }
    });
  }

  setReadonly(value: boolean): void {
    this.readonlyInput.set(value);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
    if (this._input()) {
      this._focusMonitor.stopMonitoring(this._input()?.nativeElement);
    }
  }

  /** @docs-private */
  // Emit the removed event that the parent can remove the value
  removeHandler(event: MouseEvent) {
    event.stopPropagation();
    this.removed.emit(this.value());
  }

  /**
   * @deprecated
   */
  protected emitLegacyClicked(event: Event) {
    if (this.tagGroup) {
      return;
    }
    event.preventDefault();
    this.clicked.emit(this.value());
  }

  protected handleInputClick(event: Event) {
    if (this.disabled() || this.readonly()) {
      // we need to preventDefault that the checked property
      // from the input is not toggled
      event.preventDefault();
      return;
    }
    this.toggleSelected();
  }

  protected toggleSelected() {
    if (this.disabled() || this.readonly() || !this.tagGroup) {
      return;
    }
    if (this.selected()) {
      this.tagGroup.removeValue(this.value());
    } else {
      this.tagGroup.addValue(this.value());
    }
  }
}
