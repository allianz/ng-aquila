import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @deprecated Place all your content directly into the <nx-card> or <nx-selectable-card> instead.
 * @deletion-target 13.0.0
 */
@Component({
    selector: 'nx-card-header',
    templateUrl: './card-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxCardHeaderComponent {}
