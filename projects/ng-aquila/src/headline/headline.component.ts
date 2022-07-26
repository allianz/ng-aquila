import { Component, Input } from '@angular/core';

/** Types of headlines */
export type HeadlineType = 'page' | 'page-bold-caps' | 'section' | 'subsection-large' | 'subsection-medium' | 'subsection-small' | 'subsection-xsmall';

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

        '[class.nx-heading--negative]': 'negative',
    },
})
export class NxHeadlineComponent {
    /** Changes the type of the headline which affects the visual appearance.
     * You can combine a HeadlineType and 'negative'. */
    @Input('nxHeadline') set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        const typeRegex = /page-bold-caps|page|section|subsection-large|subsection-medium|subsection-small|subsection-xsmall/;
        const [type = null] = this._classNames?.match(typeRegex) || [DEFAULT_TYPE];
        this.type = type as any;

        this.negative = !!this._classNames?.match(/negative/);
    }
    get classNames(): string {
        return this._classNames;
    }
    private _classNames = '';

    /** @docs-private */
    type: HeadlineType = DEFAULT_TYPE;
    /** @docs-private */
    negative = false;
}
