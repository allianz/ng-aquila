import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by the Message Toast.
 * @docs-private
 */
export const messageToastAnimations: {
    toastState: AnimationTriggerMetadata;
} = {
    toastState: trigger('state', [
        state('initial, void, hidden', style({ opacity: 0, transform: 'translateY(100%)' })),
        state('visible', style({ opacity: 1 })),
        transition('* => visible', animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))),
        transition('* => hidden', animate('300ms cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateY(200%)' }))),
    ]),
};

/** @docs-private */
export type NxMessageToastAnimationState = 'void' | 'visible' | 'hidden';
