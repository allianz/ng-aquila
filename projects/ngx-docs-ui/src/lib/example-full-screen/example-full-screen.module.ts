import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';

import { NxvLazyExampleOutletModule } from './../lazy-example-outlet/lazy-example-outlet.module';
import { ExampleFullScreenComponent } from './example-full-screen.component';

@NgModule({
    imports: [RouterModule, NxButtonModule, NxvLazyExampleOutletModule, CommonModule],
    exports: [ExampleFullScreenComponent],
    declarations: [ExampleFullScreenComponent],
})
export class ExampleFullScreenModule {}
