import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { AppearanceType } from '@aposin/ng-aquila/formfield';

function defaultPositions(offsetY = 0): ConnectionPositionPair[] {
    return [
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetY,
        },
        {
            originX: 'start',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
        },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
        },
    ];
}

function outlinePositions(): ConnectionPositionPair[] {
    return [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8,
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -8,
        },
    ];
}

export function getPositions(appearance: AppearanceType, offsetY: number): ConnectionPositionPair[] {
    if (appearance === 'outline') {
        return outlinePositions();
    }
    return defaultPositions(offsetY);
}

export function getPositionOffset(dropdownElement: Element, formFieldElement: Element, panelHeaderElement: Element | null): number {
    const formFieldRect = formFieldElement.getBoundingClientRect();
    const dropdownRect = dropdownElement.getBoundingClientRect();
    const panelHeaderPaddingTop = panelHeaderElement ? parseInt(getComputedStyle(panelHeaderElement).paddingTop, 10) : 0;
    return formFieldRect.top - dropdownRect.top - panelHeaderPaddingTop;
}
