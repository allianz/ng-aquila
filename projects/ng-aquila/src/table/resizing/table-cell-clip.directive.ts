import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'table[nxTableCellClip]',
    host: {
        '[style.table-layout]': '"fixed"',
    },
})
export class NxTableCellClipDirective implements AfterViewInit {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    clipCell(cell: any) {
        this.renderer.setStyle(cell, 'white-space', 'nowrap');
        this.renderer.setStyle(cell, 'overflow', 'hidden');
        this.renderer.setStyle(cell, 'text-overflow', 'ellipsis');
    }

    ngAfterViewInit() {
        const tds = this.elementRef.nativeElement.querySelectorAll('td');
        tds.forEach((cell: any) => {
            this.clipCell(cell);
        });
        const ths = this.elementRef.nativeElement.querySelectorAll('th');
        ths.forEach((cell: any) => {
            this.clipCell(cell);
            const width = cell?.getBoundingClientRect().width;
            this.renderer.setStyle(cell, 'width', `${width}px`);
        });
    }
}
