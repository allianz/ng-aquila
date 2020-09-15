import { NgModule } from '@angular/core';
import { ExampleFullScreenComponent } from './example-full-screen.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
  ],
  exports: [ExampleFullScreenComponent],
  declarations: [ExampleFullScreenComponent],
  entryComponents: [ExampleFullScreenComponent]
})
export class ExampleFullScreenModule { }
