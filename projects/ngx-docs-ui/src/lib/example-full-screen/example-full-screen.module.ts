import { NxButtonModule } from '@allianz/ng-aquila/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxvLazyExampleOutletModule } from './../lazy-example-outlet/lazy-example-outlet.module';
import { ExampleFullScreenComponent } from './example-full-screen.component';

@NgModule({
    imports: [RouterModule, NxButtonModule, NxvLazyExampleOutletModule, CommonModule],
    exports: [ExampleFullScreenComponent],
    declarations: [ExampleFullScreenComponent],
})
export class ExampleFullScreenModule {}
