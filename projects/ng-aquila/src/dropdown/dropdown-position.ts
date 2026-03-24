import { AppearanceType } from '@allianz/ng-aquila/formfield';
import { CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ElementRef } from '@angular/core';

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

function outlinePositions(offsetY = 0): ConnectionPositionPair[] {
  return [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -offsetY,
    },
  ];
}

export function getPositions(
  appearance: AppearanceType,
  offsetY: number,
): ConnectionPositionPair[] {
  if (appearance === 'outline') {
    return outlinePositions(offsetY);
  }
  return defaultPositions(offsetY);
}

export function getOverlayOffsetYForOutlineAppearance(
  origin: CdkOverlayOrigin | ElementRef,
): number {
  const originElement =
    origin instanceof CdkOverlayOrigin ? origin.elementRef.nativeElement : origin.nativeElement;
  const measure = document.createElement('div');
  measure.style.height = 'var(--dropdown-panel-offset-y, 0px)';
  measure.style.position = 'absolute';
  measure.style.visibility = 'hidden';
  originElement.appendChild(measure);
  const offset = measure.offsetHeight;
  measure.remove();
  return offset;
}

export function getOverlayOffsetYForNonOutlineAppearance(
  dropdownElement: Element,
  formFieldElement: Element,
  panelHeaderElement: Element | null,
): number {
  const formFieldRect = formFieldElement.getBoundingClientRect();
  const dropdownRect = dropdownElement.getBoundingClientRect();
  const panelHeaderPaddingTop = panelHeaderElement
    ? parseInt(getComputedStyle(panelHeaderElement).paddingTop, 10)
    : 0;
  return (
    Math.round(formFieldRect.top) - Math.round(dropdownRect.top) - Math.round(panelHeaderPaddingTop)
  );
}
