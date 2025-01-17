import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

/** @docs-private */
@Component({
    selector: 'nx-mobile-toggle-button',
    templateUrl: 'mobile-toggle-button.component.html',
    styleUrls: ['mobile-toggle-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-disabled]': 'disabled',
        '[class.is-readonly]': 'readonly',
        '[class.is-negative]': 'negative',
        '[class.is-first]': 'isFirst',
        '[class.is-last]': 'isLast',
        '[class.is-flipped]': 'checked',
    },
    imports: [NxIconModule],
})
export class NxMobileToggleButtonComponent {
    @Input() checked = false;
    @Input() negative = false;
    @Input() disabled = false;
    @Input({ transform: booleanAttribute }) readonly = false;
    @Input() hint = '';
    @Input() label = '';
    @Input() circleText = '';

    /** @docs-private */
    isFirst = false;

    /** @docs-private */
    isLast = false;

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    /** @docs-private */
    setFirstButton() {
        this.isFirst = true;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    setLastButton() {
        this.isLast = true;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    resetClasses() {
        this.isFirst = false;
        this.isLast = false;
        this._cdr.markForCheck();
    }
}
