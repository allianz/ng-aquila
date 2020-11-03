import { NgModule } from '@angular/core';
import { ExampleFullScreenComponent } from './example-full-screen.component';
import { RouterModule } from '@angular/router';
import { NxButtonModule } from '@aposin/ng-aquila/button';

@NgModule({
  imports: [
    RouterModule,
    NxButtonModule
  ],
  exports: [ExampleFullScreenComponent],
  declarations: [ExampleFullScreenComponent],
  entryComponents: [ExampleFullScreenComponent]
})
export class ExampleFullScreenModule { }
