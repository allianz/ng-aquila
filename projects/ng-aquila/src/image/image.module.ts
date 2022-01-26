import { NgModule } from '@angular/core';

import { NxFigureComponent } from './figure.component';
import { NxImageDirective } from './image.directive';

@NgModule({
    declarations: [NxFigureComponent, NxImageDirective],
    exports: [NxFigureComponent, NxImageDirective],
})
export class NxImageModule {}
