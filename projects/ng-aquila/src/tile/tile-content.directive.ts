import { Directive } from '@angular/core';

/**
 * Directive to mark content for projection into the tile label slot.
 */
@Directive({
  selector: 'nxTileLabel',
  standalone: true,
})
export class NxTileLabelDirective {}

/**
 * Directive to mark content for projection into the tile hint slot.
 */
@Directive({
  selector: 'nxTileHint',
  standalone: true,
})
export class NxTileHintDirective {}
