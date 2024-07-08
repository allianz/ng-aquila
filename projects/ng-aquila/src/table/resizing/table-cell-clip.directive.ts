import { Directive } from '@angular/core';

@Directive({
    selector: 'table[nxTableCellClip]',
    host: {
        '[style.table-layout]': '"fixed"',
    },
    standalone: true,
})
export class NxTableCellClipDirective {}
