import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by the `NxModalContainer`.
 * @docs-private
 */
export const NxModalAnimations: {
    readonly modalContainer: AnimationTriggerMetadata;
    readonly modalContainerFullscreen: AnimationTriggerMetadata;
} = {
    /** Animation that is applied on the modal container by defalt. */
    modalContainer: trigger('modalContainer', [
        // Note: The `enter` animation transitions to `transform: none`, because for some reason
        // specifying the transform explicitly, causes IE both to blur the modal content and
        // decimate the animation performance. Leaving it as `none` solves both issues.
        state('void, exit', style({ opacity: 0, transform: 'scale(1.3)' })),
        state('enter', style({ transform: 'none' })),
        transition('* => enter', animate('200ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))),
        transition('* => void, * => exit', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'scale(1.3)' }))),
    ]),
    modalContainerFullscreen: trigger('slideInOut', [
        state('void, exit', style({ opacity: 0, transform: 'translateY(100%)' })),
        state('enter', style({ transform: 'none' })),
        transition('* => enter', animate('300ms ease-out', style({ transform: 'translateY(0%)', opacity: 1 }))),
        transition('* => void, * => exit', animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(100%)' }))),
    ]),
};
