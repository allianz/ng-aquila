import { NxSurface } from '@allianz/ng-aquila/surface';
import { NgModule } from '@angular/core';

import { SurfaceBasicExampleComponent } from './surface-basic/surface-basic-example';
import { SurfaceCssExampleComponent } from './surface-css/surface-css-example';
import { SurfaceNestingExampleComponent } from './surface-nesting/surface-nesting-example';
import { SurfaceResetExampleComponent } from './surface-reset/surface-reset-example';

const EXAMPLES = [
  SurfaceBasicExampleComponent,
  SurfaceNestingExampleComponent,
  SurfaceResetExampleComponent,
  SurfaceCssExampleComponent,
];

@NgModule({
  imports: [NxSurface, EXAMPLES],
  exports: [EXAMPLES],
})
export class SurfaceExamplesModule {
  static components() {
    return {
      'surface-basic': SurfaceBasicExampleComponent,
      'surface-nesting': SurfaceNestingExampleComponent,
      'surface-reset': SurfaceResetExampleComponent,
      'surface-css': SurfaceCssExampleComponent,
    };
  }
}
