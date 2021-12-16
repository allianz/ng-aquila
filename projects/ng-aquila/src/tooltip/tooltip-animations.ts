import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by NxTooltip.
 * @docs-private
 */
export const nxTooltipAnimations: {
    readonly tooltipState: AnimationTriggerMetadata;
} = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0 })),
        state('visible', style({ opacity: 1 })),
        transition('* => visible', animate('70ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1 }))),
        transition('* => hidden', animate('70ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0 }))),
    ]),
};
