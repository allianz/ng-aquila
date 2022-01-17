import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const nxSidepanelAnimations: {
    readonly sidepanelExpansion: AnimationTriggerMetadata;
} = {
    sidepanelExpansion: trigger('sidepanelExpansion', [
        state(
            'closed',
            style({
                transform: 'translateX({{ transformX }})',
                boxShadow: 'none',
                visibility: 'hidden',
            }),
            { params: { transformX: '100%' } },
        ),
        state(
            'open',
            style({
                transform: 'none',
                boxShadow: '*',
                visibility: 'visible',
            }),
        ),
        transition('closed => open', animate('.4s cubic-bezier(0, 0, 0.1, 1)')),
        transition('open-instant => closed, open => closed', animate('.2s cubic-bezier(0.8, 0, 1, 1)')),
    ]),
};
