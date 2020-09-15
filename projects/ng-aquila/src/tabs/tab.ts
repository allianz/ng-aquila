import { NxTabGroupBase } from './tab-group-base';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  Optional,
  Inject,
  Host,
  ContentChild,
  EmbeddedViewRef,
  AfterContentInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { NxTabLabelDirective } from './tab-label';
import { NxTabContentDirective } from './tab-content';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'nx-tab',
  exportAs: 'nxTab',
  templateUrl: 'tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxTabComponent implements OnChanges, OnDestroy, AfterContentInit {
  private _label: string;
  private _disabled: boolean = false;

  /** Emits whenever the internal state of the tab changes. */
  readonly _stateChanges = new Subject<void>();

  /**
   * Content for the tab label given by `<ng-template nxTabLabel>`.
   * @docs-private
   * */
  @ContentChild(NxTabLabelDirective, { read: TemplateRef, static: true })
  get templateLabel(): TemplateRef<any> {return this._templateLabel; }
  set templateLabel(value: TemplateRef<any>) {
    // Only update the templateLabel via query if there is actually
    // a nxTabLabel found. This works around an issue where a user may have
    // manually set `templateLabel` during creation mode, which would then get clobbered
    // by `undefined` when this query resolves.
    if (value) {
      this._templateLabel = value;
    }
  }

  private _templateLabel: TemplateRef<any>;

  /** Template inside the NxTab view that contains an `<ng-content>`. */
  @ViewChild(TemplateRef, { static: true }) _implicitContent: TemplateRef<any>;
  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  @ContentChild(NxTabContentDirective, { read: TemplateRef, static: true })
  _explicitContent: TemplateRef<any>;

  /** Sets the label of the tab shown in the tablist. */
  @Input()
  get label(): string {
    return this._label;
  }
  set label(value: string) {
    if (this._label !== value) {
      this._label = value;
    }
  }

  /** Sets the tab to disabled. */
  @Input()
  get disabled(): boolean {
    return (this._tabGroup && this._tabGroup.disabled) ?
    this._tabGroup.disabled : this._disabled;
  }
  set disabled(value: boolean) {
    const coercedValue = coerceBooleanProperty(value);

    if (this._disabled !== coercedValue) {
      this._disabled = coercedValue;
    }
  }

  private _headerViewRef: EmbeddedViewRef<any>;
  private _contentViewRef: EmbeddedViewRef<any>;

  /** @docs-private */
  get headerViewRef() {
    return this._headerViewRef;
  }

  /** @docs-private */
  get contentViewRef() {
    // for lazy loading we only create the viewref when it is asked for
    if (!this._contentViewRef) {
      const contentTemplate = this._explicitContent || this._implicitContent;
      this._contentViewRef = contentTemplate.createEmbeddedView({});
    }
    return this._contentViewRef;
  }

  /**
   * Whether the tab is currently active.
   */
  isActive = false;

  constructor(
    @Inject(NxTabGroupBase) @Optional() @Host() private _tabGroup: NxTabGroupBase) {
    if (!this._tabGroup) {
      throw Error(`The nx-tab element has to be wrapped in a nx-tab-group to work.
      Please provide a nx-tab-group element and place your tabs inside it.`);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('label') || changes.hasOwnProperty('disabled')) {
      this._stateChanges.next();
    }
  }

  ngAfterContentInit() {
    if (this.templateLabel) {
      this._headerViewRef = this.templateLabel.createEmbeddedView({});
    }
  }

  ngOnDestroy(): void {
    this._stateChanges.complete();
    this._contentViewRef.destroy();
    if (this._headerViewRef) { this._headerViewRef.destroy(); }
  }

  static ngAcceptInputType_disabled: BooleanInput;
}
