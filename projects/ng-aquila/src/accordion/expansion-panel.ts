import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { CDK_ACCORDION, CdkAccordionItem } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  ElementRef,
  inject,
  InjectionToken,
  Input,
  input,
  OnChanges,
  OnDestroy,
  signal,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';

import { NxAccordionDirective } from './accordion';
import { NxExpansionPanelBodyDirective } from './expansion-panel-body';

/** The styling of the accordion. */
export type AccordionStyle = 'regular' | 'light' | 'extra-light';
const DEFAULT_TYPE = 'regular';

/**
 * This interface defines the default options of the expansion-panel.
 */
export interface ExpansionPanelDefaultOptions {
  scrollIntoViewActive: boolean;
  scrollIntoViewOptions?: ScrollIntoViewOptions;
}

/** Injection token that determines whether and how the body should scroll into view. */
export const EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken<ExpansionPanelDefaultOptions>(
  'EXPANSION_PANEL_DEFAULT_OPTIONS',
  {
    factory: () => ({
      scrollIntoViewActive: false,
      scrollIntoViewOptions: {
        behavior: 'smooth',
      },
    }),
  },
);

@Component({
  selector: 'nx-expansion-panel',
  exportAs: 'NxExpansionPanelComponent',
  templateUrl: 'expansion-panel.html',
  styleUrls: ['expansion-panel.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-expanded]': 'expanded',
    '[class.nx-expansion-panel--light]': '_accordionStyle === "light"',
    '[class.nx-expansion-panel--regular]': '_accordionStyle === "regular"',
    '[class.nx-expansion-panel--extra-light]': '_accordionStyle === "extra-light"',
    '[class.nx-expansion-panel--negative]': 'negative',
    '[class.is-disabled]': 'disabled',
  },
  providers: [
    // Provide CDK_ACCORDION as undefined to prevent nested expansion panels from registering
    // to the same accordion (mirrors what CdkAccordionItem does on its own decorator, which is
    // not inherited by this subclass).
    { provide: CDK_ACCORDION, useValue: undefined },
  ],
  imports: [CdkPortalOutlet, CommonModule],
})
export class NxExpansionPanelComponent
  extends CdkAccordionItem
  implements AfterContentInit, OnChanges, OnDestroy
{
  /** @docs-private */
  // not typed as nullable: the parent accordion provides CDK_ACCORDION as itself
  override readonly accordion = inject(CDK_ACCORDION, {
    optional: true,
    skipSelf: true,
  }) as NxAccordionDirective;
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _defaultOptions = inject<ExpansionPanelDefaultOptions>(
    EXPANSION_PANEL_DEFAULT_OPTIONS,
    { optional: true },
  )!;

  /** Whether the negative set of styles should be used. */
  @Input() set negative(value: BooleanInput) {
    this._negative = coerceBooleanProperty(value);
  }
  get negative(): boolean {
    return this._negative!;
  }
  private _negative: boolean | null = null;

  _accordionStyle: AccordionStyle = DEFAULT_TYPE;

  /**
   * Value for the styling that should be chosen.
   * Default: `'regular'`.
   */
  @Input('variant') set style(value: AccordionStyle) {
    value = value ? value : DEFAULT_TYPE;

    const [newValue] = value.match(/regular|light|extra-light/) || [DEFAULT_TYPE];
    this._style = newValue as AccordionStyle;
    this._accordionStyle = newValue as AccordionStyle;
  }
  get style(): AccordionStyle {
    return this._style!;
  }
  private _style: AccordionStyle | null = null;

  /**
   * Setting flush alignment style: no left/right padding in expansion panel header and body
   */
  @Input({ transform: booleanAttribute }) set flushAlignment(flushAligned: boolean) {
    this._flushAlignment.set(flushAligned);
  }
  get flushAlignment(): boolean {
    return this.isFlushAligned();
  }

  // replicating input signal behavior until they are stable
  private readonly _flushAlignment = signal(false);
  private readonly isFlushAligned = computed(
    () => this.accordion?.flushAlignmentSignal() || this._flushAlignment(),
  );

  /** Whether scrollIntoView should be enabled. */
  readonly scrollIntoViewActive = input<boolean | undefined>(
    this._defaultOptions?.scrollIntoViewActive,
  );

  /** Configuration for the scrollIntoView behaviour after the expand animation is done. */
  @Input() scrollIntoViewOptions? = this._defaultOptions?.scrollIntoViewOptions;

  /** @docs-private */
  @ContentChild(NxExpansionPanelBodyDirective) lazyContent: any;

  private _portal!: TemplatePortal;

  /** @docs-private */
  get portal() {
    return this._portal;
  }

  private readonly _idGenerationService = inject(IdGenerationService);
  _headerId = this._idGenerationService.nextId('nx-expansion-panel-header');
  private readonly _elementRef = inject(ElementRef);
  private _scrollSubscription?: Subscription;

  /** Stream that emits for changes in `@Input` properties. */
  readonly _inputChanges = new Subject<SimpleChanges>();

  ngAfterContentInit(): void {
    if (this.lazyContent) {
      // Render the content as soon as the panel becomes open.
      this.opened
        .pipe(
          startWith(null),
          filter(() => this.expanded && !this._portal),
          take(1),
        )
        .subscribe(() => {
          this._portal = new TemplatePortal(this.lazyContent._template, this._viewContainerRef);
        });
    }

    // Scroll into view when the panel opens
    if (this.scrollIntoViewActive()) {
      this._scrollSubscription = this.opened.pipe().subscribe(() => {
        if (this.expanded) {
          // Use setTimeout to ensure the animation has started
          setTimeout(() => {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
          }, 0);
        }
      });
    }

    // Inherit appearance given by the accordion (if any).
    if (this.accordion) {
      if (this.style === null && this.accordion.style !== null) {
        this.style = this.accordion.style;
      }

      if (this.negative === null && this.accordion.negative !== null) {
        this.negative = this.accordion.negative;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._inputChanges.next(changes);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this._inputChanges.complete();
    this._scrollSubscription?.unsubscribe();
  }

  /** @docs-private */
  getOpenState() {
    return this.expanded ? 'open' : 'closed';
  }

  /** @docs-private */
}
