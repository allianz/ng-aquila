import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/** Size of an avatar. */
export type NxAvatarSize = 'xsmall' | 'small' | 'small-medium' | 'medium' | 'large' | 'xlarge';

@Component({
    selector: '[nxAvatar]',
    template: `<div class="nx-avatar__content-wrapper">
        <ng-content></ng-content>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./avatar.scss'],
    host: {
        '[class.nx-avatar--xsmall]': 'size === "xsmall"',
        '[class.nx-avatar--small]': 'size === "small"',
        '[class.nx-avatar--small-medium]': 'size === "small-medium"',
        '[class.nx-avatar--medium]': 'size === "medium"',
        '[class.nx-avatar--large]': 'size === "large"',
        '[class.nx-avatar--xlarge]': 'size === "xlarge"',
    },
})
export class NxAvatarComponent {
    /** Sets the size of the avatar. Default: 'medium'. */
    @Input() set size(size: NxAvatarSize) {
        if (this._size !== size) {
            this._size = size;
            this._cdr.markForCheck();
        }
    }
    get size(): NxAvatarSize {
        return this._size;
    }
    private _size: NxAvatarSize = 'medium';

    constructor(private readonly _cdr: ChangeDetectorRef) {}
}

@Directive({
    selector: 'button[nxAvatar]',
    host: {
        '[class.is-button]': 'true',
    },
})
export class NxAvatarButtonDirective implements OnDestroy {
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
}
