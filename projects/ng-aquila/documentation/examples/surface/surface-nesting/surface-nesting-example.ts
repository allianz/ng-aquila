import { NxEyebrowModule } from '@allianz/ng-aquila/eyebrow';
import { NxPriceModule } from '@allianz/ng-aquila/price';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { Component } from '@angular/core';

/**
 * @title Surface nesting example
 */
@Component({
  selector: 'surface-nesting-example',
  templateUrl: './surface-nesting-example.html',
  styleUrls: ['./surface-nesting-example.css'],
  imports: [NxSurface, NxEyebrowModule, NxPriceModule],
})
export class SurfaceNestingExampleComponent {}
