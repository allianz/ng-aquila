import { NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { clamp } from '@aposin/ng-aquila/utils';

let progressbarId = 0;

@Component({
    selector: 'nx-progressbar',
    templateUrl: './progressbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./progressbar.component.scss'],
    host: {
        '[attr.aria-valuenow]': 'value',
    },
})
export class NxProgressbarComponent {
    /** @docs-private */
    progressbarId = `nx-progress-bar-${progressbarId++}`;

    /** Sets the value of the progress bar. Defaults to zero. Mirrored to aria-value now. */
    @Input() set value(value: NumberInput) {
        this._value = clamp((value as any) || 0); // TODO properly coerce input value
    }
    get value(): number {
        return this._value;
    }
    private _value = 0;

    _primaryTransform() {
        const scale = this.value;
        return { transform: `scaleX(${scale})` };
    }
}
