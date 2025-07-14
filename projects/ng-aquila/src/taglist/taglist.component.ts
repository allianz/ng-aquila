import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NxTagComponent } from './tag.component';
import { NxTaglist, TAGLIST } from './taglist-interface';

/**
 * @deprecated Use `nx-tag` components standalone or `nx-tag-group` instead.
 */
@Component({
  selector: 'nx-taglist',
  templateUrl: 'taglist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./taglist.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NxTaglistComponent),
      multi: true,
    },
    {
      provide: TAGLIST,
      useExisting: forwardRef(() => NxTaglistComponent),
    },
  ],
  host: {
    '[class.nx-taglist--keyword]': 'isKeywordList',
    '[attr.aria-labelledby]': 'labelledby || null',
    '[attr.tabindex]': '-1',
  },
  imports: [NxTagComponent],
})
export class NxTaglistComponent implements NxTaglist, ControlValueAccessor {
  /** An event is dispatched each time when the list of tags changed. */
  @Output('tagsChange') readonly tagsChange = new EventEmitter<any[]>();

  /** An event is dispatched each time when a tag is clicked. */
  @Output('onTagClick') readonly tagClickEvent = new EventEmitter<any>();

  /** @docs-private */
  @ViewChildren(NxTagComponent, { read: ElementRef }) tagChildren!: QueryList<ElementRef>;

  /** Sets the list of tags. */
  @Input('tags') set tags(value: any[]) {
    this._tags = value;
  }
  get tags(): any[] {
    return this._tags;
  }
  private _tags: any[] = [];

  /** Sets the tabindex of the contained tags. Default value: -1. */
  @Input() set tabindex(value: NumberInput) {
    this._tabindex = coerceNumberProperty(value);
  }
  get tabindex(): number {
    return this._tabindex;
  }
  private _tabindex = -1;

  /** Whether the tags can be removed from the list. Default: true. */
  @Input() set allowTagDeletion(value: BooleanInput) {
    this._allowTagDeletion = coerceBooleanProperty(value);
  }
  get allowTagDeletion(): boolean {
    return this._allowTagDeletion;
  }
  private _allowTagDeletion = true;

  /** Whether the tags can be styled as keywords. */
  @Input() set isKeywordList(value: BooleanInput) {
    this._isKeywordList = coerceBooleanProperty(value);
  }
  get isKeywordList(): boolean {
    return this._isKeywordList;
  }
  private _isKeywordList = false;

  /** Sets the label property, in case tags represent objects. */
  @Input() set labelProperty(value: string) {
    if (this._labelProperty !== value) {
      this._labelProperty = value;
    }
  }
  get labelProperty(): string {
    return this._labelProperty;
  }
  private _labelProperty = 'nxTaglistLabel';

  /** Sets the label property to improve accessibility. */
  @Input('aria-labelledby') set labelledby(value: string) {
    if (this._ariaLabelledBy !== value) {
      this._ariaLabelledBy = value;
    }
  }
  get labelledby(): string {
    return this._ariaLabelledBy;
  }
  private _ariaLabelledBy!: string;

  /** Sets the customization function for tag value.  */
  @Input() set valueFormatter(fn: (value: any) => string) {
    this._valueFormatterFn = fn;
  }
  get valueFormatter(): (value: any) => string {
    return this._valueFormatterFn;
  }
  private _valueFormatterFn: (value: any) => string = (value) => value;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => any = () => {};

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  /** Allows to delete a tag given index. Takes index of the tag to be deleted as a parameter */
  delete(index: number, value: any) {
    if (this.allowTagDeletion) {
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

      // focus next/previous element after deletion
      const list = this.tagChildren.toArray();
      if (list[index + 1]) {
        list[index + 1].nativeElement.focus();
      } else if (list[index - 1]) {
        list[index - 1].nativeElement.focus();
      }

      this._onChange(this.tags);

      this.tagsChange.emit(this.tags);
    }
  }

  /** Allows to add a tag. Takes tag object as an input */
  addTag(tag: any) {
    if (!tag) {
      return;
    }

    // make sure tag is either string or has the configured label prop and is not yet in the list
    if (
      (typeof tag === 'string' && !this.tags.includes(tag)) ||
      (tag[this.labelProperty] &&
        this.tags.filter((t) => t[this.labelProperty] === tag[this.labelProperty]).length < 1)
    ) {
      this.tags = [...this.tags, tag];
      this._onChange(this.tags);
      this.tagsChange.emit(this.tags);
    }
  }

  /** Allows to clear the tag list. */
  clearTags() {
    this.tags = [];
    this._onChange(this.tags);
    this.tagsChange.emit(this.tags);
    this._cdr.markForCheck();
  }

  /** @docs-private */
  writeValue(tags: any): void {
    this.tags = tags;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  /** @docs-private */
  renderTag(tag: any) {
    const tagStr: string = typeof tag === 'string' ? tag : tag[this.labelProperty];
    return this.valueFormatter(tagStr);
  }

  /** @docs-private */
  tagClick(index: number, value: any) {
    this.tagClickEvent.emit(this.tags[index]);
  }
}
