import { NgModule } from '@angular/core';

import { NxFigureComponent } from './figure.component';
import { NxImageDirective } from './image.directive';

@NgModule({
  imports: [NxFigureComponent, NxImageDirective],
  exports: [NxFigureComponent, NxImageDirective],
})
export class NxImageModule {}
