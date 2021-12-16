import { NxImageDirective } from './image.directive';
import { NgModule } from '@angular/core';
import { NxFigureComponent } from './figure.component';

@NgModule({
    declarations: [NxFigureComponent, NxImageDirective],
    exports: [NxFigureComponent, NxImageDirective],
})
export class NxImageModule {}
