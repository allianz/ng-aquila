import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';

/** Types of headlines */
export type HeadlineType = 'page' | 'page-bold-caps' | 'section' | 'subsection-large' | 'subsection-medium' | 'subsection-small' | 'subsection-xsmall';
/** The headline sizes */
export type NxHeadlineSize = 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | undefined;

const DEFAULT_TYPE = 'section';

@Component({
    selector: '[nxHeadline]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['headline.component.scss'],
    host: {
        '[class.nx-heading--page]': 'type === "page"',
        '[class.nx-heading--page-bold-caps]': 'type === "page-bold-caps"',
        '[class.nx-heading--section]': 'type === "section"',
        '[class.nx-heading--subsection-large]': 'type === "subsection-large"',
        '[class.nx-heading--subsection-medium]': 'type === "subsection-medium"',
        '[class.nx-heading--subsection-small]': 'type === "subsection-small"',
        '[class.nx-heading--subsection-xsmall]': 'type === "subsection-xsmall"',
        '[class.nx-heading--new-api]': 'size !== undefined',
        '[class.nx-heading--s]': 'size === "s"',
        '[class.nx-heading--m]': 'size === "m"',
        '[class.nx-heading--l]': 'size === "l"',
        '[class.nx-heading--xl]': 'size === "xl"',
        '[class.nx-heading--2xl]': 'size === "2xl"',
        '[class.nx-heading--3xl]': 'size === "3xl"',
        '[class.nx-heading--4xl]': 'size === "4xl"',

        '[class.nx-heading--negative]': 'negative',
    },
})
export class NxHeadlineComponent {
    /**
     * Changes the type of the headline which affects the visual appearance.
     *
     * You can combine a HeadlineType and 'negative'.
     */
    @Input('nxHeadline') set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        const typeRegex = /page-bold-caps|page|section|subsection-large|subsection-medium|subsection-small|subsection-xsmall/;
        const [type = null] = this._classNames?.match(typeRegex) || [DEFAULT_TYPE];
        this.type = type as any;

        this._negative = !!this._classNames?.match(/negative/);
    }
    get classNames(): string {
        return this._classNames;
    }
    private _classNames = '';

    @Input() size: NxHeadlineSize;
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
    }
    get negative() {
        return this._negative;
    }
    private _negative = false;

    /** @docs-private */
    type: HeadlineType = DEFAULT_TYPE;
}
