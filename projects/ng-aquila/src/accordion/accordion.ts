import { CDK_ACCORDION, CdkAccordion } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { booleanAttribute, computed, Directive, Input, input, signal } from '@angular/core';

import { AccordionStyle } from './expansion-panel';

const DEFAULT_TYPE: AccordionStyle = 'regular';

export type NxAccordionSize = 'l' | 'm';

/** @docs-private */
export const NX_ACCORDION_SIZE_STYLES: Readonly<Record<NxAccordionSize, AccordionStyle>> = {
  l: 'regular',
  m: 'light',
} as const;

@Directive({
  selector: 'nx-accordion',
  host: {
    '[class.nx-accordion]': 'true',
    role: 'presentation',
  },
  standalone: true,
  providers: [{ provide: CDK_ACCORDION, useExisting: NxAccordionDirective }],
})
export class NxAccordionDirective extends CdkAccordion {
  /**
   * Value for the styling that should be chosen.
   *
   * Default: `'regular'`.
   */
  @Input('variant') set style(value: AccordionStyle) {
    value = value ? value : DEFAULT_TYPE;

    const [newValue] = value.match(/regular|light|extra-light/) || [DEFAULT_TYPE];
    this._style.set(newValue as AccordionStyle);
  }

  /** Sets the size of all panels of the accordion. Takes precedence over `variant`. */
  readonly size = input<NxAccordionSize | undefined>(undefined);

  get style(): AccordionStyle {
    return this._resolvedStyle();
  }
  private readonly _style = signal<AccordionStyle>(DEFAULT_TYPE);

  /** The style the accordion resolves to, with `size` taking precedence over `variant`. */
  readonly _resolvedStyle = computed<AccordionStyle>(() => {
    const size = this.size();
    return size ? (NX_ACCORDION_SIZE_STYLES[size] ?? DEFAULT_TYPE) : this._style();
  });

  /**
   * Whether the negative set of styles should be used.
   * @deprecated Use `inverse` instead.
   */
  @Input() set negative(value: BooleanInput) {
    this._negative.set(coerceBooleanProperty(value));
  }
  get negative(): boolean {
    return this.inverse();
  }
  private readonly _negative = signal(false);

  /** Whether the inverse set of styles, for use on a dark background, is applied. */
  readonly inverseInput = input(undefined, { transform: booleanAttribute, alias: 'inverse' });

  readonly inverse = computed(() => this.inverseInput() || this._negative());

  @Input({ transform: booleanAttribute }) set flushAlignment(flushAligned: boolean) {
    this.flushAlignmentSignal.set(flushAligned);
  }
  get flushAlignment(): boolean {
    return this.flushAlignmentSignal();
  }
  readonly flushAlignmentSignal = signal(false);
}
