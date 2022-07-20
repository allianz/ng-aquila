import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { NxSidepanelComponent } from '@aposin/ng-aquila/sidepanel';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

/**
 * @title Focus sidepanel on open
 */
@Component({
    selector: 'sidepanel-focus-example',
    templateUrl: './sidepanel-focus-example.html',
    styleUrls: ['sidepanel-focus-example.css'],
})
export class SidepanelFocuskExampleComponent
    implements OnDestroy, AfterViewInit
{
    opened = true;
    @ViewChild(NxSidepanelComponent) panel!: NxSidepanelComponent;
    @ViewChild('closeButton', { read: ElementRef }) closeButton!: ElementRef;

    private readonly _destroyed = new Subject<void>();

    ngAfterViewInit(): void {
        this.panel.openedChange
            .pipe(skip(1), takeUntil(this._destroyed))
            .subscribe(
                opened => opened && this.closeButton.nativeElement.focus(),
            );
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
