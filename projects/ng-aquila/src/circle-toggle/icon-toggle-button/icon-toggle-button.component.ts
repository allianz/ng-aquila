import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** @docs-private */
@Component({
    selector: 'nx-icon-toggle-button',
    templateUrl: 'icon-toggle-button.component.html',
    styleUrls: ['icon-toggle-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.nx-circle-button]': 'true',
        '[class.is-flipped]': 'checked',
        '[class.has-checkmark]': '!inGroup',
        '[class.is-disabled]': 'disabled',
        '[class.is-negative]': 'negative',
        '[class.is-touched]': 'touched',
    },
})
export class NxIconToggleButtonComponent {
    @Input() inGroup = true;
    @Input() hint = '';
    @Input() label = '';
    @Input() checked = false;
    @Input() icon = '';
    @Input() disabled = false;
    @Input() negative = false;
    @Input() touched = false;
    @Input() circleText = '';

    @Input('svg') svgUrl = '';
}
