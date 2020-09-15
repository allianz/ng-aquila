import { NgModule } from '@angular/core';
import { NxButtonComponent } from './button.component';
import { NxIconButtonComponent } from './icon-button.component';
import { NxPlainButtonComponent } from './plain-button.component';

@NgModule({
  declarations: [ NxButtonComponent, NxIconButtonComponent, NxPlainButtonComponent ],
  exports: [ NxButtonComponent, NxIconButtonComponent, NxPlainButtonComponent ]
})
export class NxButtonModule { }
