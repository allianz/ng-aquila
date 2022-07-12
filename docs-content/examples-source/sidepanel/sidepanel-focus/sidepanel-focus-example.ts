import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
    NxSidepanelCloseButtonComponent,
    NxSidepanelComponent,
} from '@aposin/ng-aquila/sidepanel';
import { Subject } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';

/**
 * @title Focus sidepanel on open
 */
@Component({
    selector: 'sidepanel-focus-example',
    templateUrl: './sidepanel-focus-example.html',
    styleUrls: ['sidepanel-focus-example.css'],
})
export class SidepanelFocuskExampleComponent implements AfterViewInit {
    opened = true;
    @ViewChild(NxSidepanelComponent) panel!: NxSidepanelComponent;
    @ViewChild('closeButton', { read: ElementRef }) closeButton!: ElementRef;

    private _destroyed = new Subject<void>();

    ngAfterViewInit(): void {
        this.panel.openedChange
            .pipe(skip(1), takeUntil(this._destroyed))
            .subscribe(
                opened => opened && this.closeButton.nativeElement.focus(),
            );
    }
}
