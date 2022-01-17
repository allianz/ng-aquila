import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const nxAccordionAnimations: {
    readonly bodyExpansion: AnimationTriggerMetadata;
    readonly indicatorRotate: AnimationTriggerMetadata;
} = {
    bodyExpansion: trigger('bodyExpansion', [
        state('closed', style({ height: '0px', visibility: 'hidden' })),
        state('open', style({ height: '*', visibility: 'visible' })),
        transition('open <=> closed', animate('.5s cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
    indicatorRotate: trigger('indicatorRotate', [
        state('closed', style({ transform: 'rotate(0deg)' })),
        state('open', style({ transform: 'rotate(180deg)' })),
        transition('open <=> closed', animate('.3s ease')),
    ]),
};
