import { animate, animation, AnimationReferenceMetadata, style } from '@angular/animations';

export const fadeIn: AnimationReferenceMetadata = animation([style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]);

export const fadeOut: AnimationReferenceMetadata = animation(animate('300ms', style({ opacity: 0 })));

export const scaleUp: AnimationReferenceMetadata = animation([
    style({ transform: 'scale(1)', opacity: 1 }),
    animate('250ms', style({ transform: 'scale(1.3)', opacity: 0 })),
]);

export const scaleDown: AnimationReferenceMetadata = animation([
    style({ transform: 'scale(1.3)', opacity: 0 }),
    animate('250ms', style({ transform: 'scale(1)', opacity: 1 })),
]);
