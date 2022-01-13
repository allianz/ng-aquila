import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'nx-page-search',
    templateUrl: 'page-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['page-search.component.scss'],
    host: {
        '[attr.role]': '"search"',
    },
})
export class NxPageSearchComponent {
    /** An event emitted when the user clicks the search button. */
    @Output('nxButtonClick') buttonClick = new EventEmitter();

    private _buttonLabel: string | null = null;

    /** Sets the text label of the button. */
    @Input('nxButtonLabel')
    set buttonLabel(value: string) {
        if (this._buttonLabel !== value) {
            this._buttonLabel = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get buttonLabel(): string {
        return this._buttonLabel as string;
    }

    private _hideSearchButton = false;

    /** Whether the search button should be hidden. */
    @Input('nxHideSearchButton')
    set hideSearchButton(value: BooleanInput) {
        this._hideSearchButton = coerceBooleanProperty(value);
        this._changeDetectorRef.markForCheck();
    }
    get hideSearchButton(): boolean {
        return this._hideSearchButton;
    }

    private _buttonLayout = '12,12,12,2';

    /** Layout of the search button inside of a NxGrid. Default: 12,12,12,2. */
    @Input('nxButtonLayout')
    set buttonLayout(value: string) {
        if (this._buttonLayout !== value) {
            this._buttonLayout = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get buttonLayout(): string {
        return this._buttonLayout;
    }

    private _contentLayout: string | null = null;

    /** Layout of the content area inside of a NxGrid. Default: 12,12,12,10 | 12 (if search button is hidden). */
    @Input('nxContentLayout')
    set contentLayout(value: string) {
        if (this._contentLayout !== value) {
            this._contentLayout = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get contentLayout(): string {
        if (this._contentLayout) {
            return this._contentLayout;
        }
        return !this.hideSearchButton ? '12,12,12,10' : '12';
    }

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    /** @docs-private */
    onButtonClick() {
        this.buttonClick.emit();
    }
}
