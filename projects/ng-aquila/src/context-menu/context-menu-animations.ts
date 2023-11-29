import { animate, AnimationTriggerMetadata, group, query, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by the NxContextMenuComponent.
 * @docs-private
 */
export const nxContextMenuAnimations: {
    readonly transformContextMenu: AnimationTriggerMetadata;
} = {
    /**
     * This animation controls the context menu panel's entry and exit from the page.
     * When the context menu panel is added to the DOM, it scales in and fades in its border.
     * When the context menu panel is removed from the DOM, it simply fades out.
     */
    transformContextMenu: trigger('transformContextMenu', [
        state(
            'void',
            style({
                opacity: 0,
                transform: 'scale(0.8)',
            }),
        ),
        transition(
            'void => enter',
            group([
                query(
                    '.nx-context-menu__content',
                    animate(
                        '100ms linear',
                        style({
                            opacity: 1,
                        }),
                    ),
                ),
                animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)' })),
            ]),
        ),
        transition('* => void', animate('100ms linear', style({ opacity: 0 }))),
    ]),
};
