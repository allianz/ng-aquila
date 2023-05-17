import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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
    /** Sets the text label of the button. */
    @Input() set buttonLabel(value: string) {
        if (this._buttonLabel !== value) {
            this._buttonLabel = value;
            this._cdr.markForCheck();
        }
    }
    get buttonLabel(): string {
        return this._buttonLabel!;
    }
    private _buttonLabel: string | null = null;

    /** Whether the search button should be hidden. */
    @Input() set hideSearchButton(value: BooleanInput) {
        this._hideSearchButton = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get hideSearchButton(): boolean {
        return this._hideSearchButton;
    }
    private _hideSearchButton = false;

    /** Layout of the search button inside of a NxGrid. Default: 12,12,12,2. */
    @Input() set buttonLayout(value: string) {
        if (this._buttonLayout !== value) {
            this._buttonLayout = value;
            this._cdr.markForCheck();
        }
    }
    get buttonLayout(): string {
        return this._buttonLayout;
    }
    private _buttonLayout = '12,12,12,2';

    /** Layout of the content area inside of a NxGrid. Default: 12,12,12,10 | 12 (if search button is hidden). */
    @Input() set contentLayout(value: string) {
        if (this._contentLayout !== value) {
            this._contentLayout = value;
            this._cdr.markForCheck();
        }
    }
    get contentLayout(): string {
        if (this._contentLayout) {
            return this._contentLayout;
        }
        return this.hideSearchButton ? '12' : '12,12,12,10';
    }
    private _contentLayout: string | null = null;

    /** An event emitted when the user clicks the search button. */
    @Output() readonly buttonClick = new EventEmitter();

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    /** @docs-private */
    onButtonClick() {
        this.buttonClick.emit();
    }
}
