import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Label within a `<nx-data-display>`.
 */
@Component({
    selector: 'nx-data-display-label',
    template: '<ng-content></ng-content>',
    styleUrls: ['./data-display-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxDataDisplayLabelComponent {}
