import { Directive } from '@angular/core';

/**
 * @deprecated due to not fulfilling the WCAG accessibility requirements.
 */
@Directive({
    selector: 'table[nxTableCellClip]',
    host: {
        '[style.table-layout]': '"fixed"',
    },
    standalone: true,
})
export class NxTableCellClipDirective {}
