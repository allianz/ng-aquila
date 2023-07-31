import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type NxStatusIconType = 'success' | 'info' | 'error' | 'warning';

export type NxStatusIconSize = 'auto' | 's' | 'm' | 'l' | 'xl';

@Component({
    selector: 'nx-status-icon',
    templateUrl: './status-icon.component.html',
    styleUrls: ['./status-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxStatusIconComponent {
    /** Sets status type */
    @Input() type!: NxStatusIconType;

    /** Specifies the size of the icon. */
    @Input() set size(value: NxStatusIconSize) {
        if (this._size === value) {
            return;
        }
        this._size = value;
    }
    get size(): NxStatusIconSize {
        return this._size;
    }
    private _size: NxStatusIconSize = 'auto';

    private statusList: { [key in NxStatusIconType]: any } = {
        error: { icon: 'exclamation-triangle' },
        warning: { icon: 'exclamation-circle-warning' },
        success: { icon: 'check-circle' },
        info: { icon: 'info-circle' },
    };

    /** @docs-private */
    get icon() {
        return this.statusList[this.type]?.icon;
    }

    /** @docs-private */
    get typeClass(): string {
        return `nx-status-icon--${this.type}`;
    }
}
