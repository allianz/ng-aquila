import { CdkAccordion } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';

import { AccordionStyle } from './expansion-panel';

const DEFAULT_TYPE: AccordionStyle = 'regular';

@Directive({
    selector: 'nx-accordion',
    host: {
        '[class.nx-accordion]': 'true',
        role: 'presentation',
    },
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
        this._style = newValue as AccordionStyle;
    }
    get style(): AccordionStyle {
        return this._style;
    }
    private _style: AccordionStyle = 'regular';

    /** Whether the negative set of styles should be used. */
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
    }
    get negative(): boolean {
        return !!this._negative;
    }
    private _negative?: boolean;
}
