import { NxEyebrowModule } from '@allianz/ng-aquila/eyebrow';
import { NxPriceModule } from '@allianz/ng-aquila/price';
import { NX_SURFACE, NxSurface } from '@allianz/ng-aquila/surface';
import { Component } from '@angular/core';

/**
 * Stands in for a component that paints its own background - a card, a modal panel. It resets the
 * surface for its content, so that content does not keep reacting to a background it no longer sits
 * on.
 */
@Component({
  selector: 'docs-panel',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 24px;
      background-color: var(--nx-surface-default-background-color);
      border-radius: 8px;
    }
  `,
  providers: [{ provide: NX_SURFACE, useValue: undefined }],
})
class DocsPanelComponent {}

/**
 * @title Surface reset example
 */
@Component({
  selector: 'surface-reset-example',
  templateUrl: './surface-reset-example.html',
  styleUrls: ['./surface-reset-example.css'],
  imports: [NxSurface, NxEyebrowModule, NxPriceModule, DocsPanelComponent],
})
export class SurfaceResetExampleComponent {}
