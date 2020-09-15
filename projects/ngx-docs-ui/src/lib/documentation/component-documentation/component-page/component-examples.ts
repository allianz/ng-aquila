import { Component } from '@angular/core';
import { ComponentService } from '../../../service/component.service';

@Component({
  selector: 'nxv-component-examples',
  templateUrl: 'component-examples.html'
})

// tslint:disable-next-line:component-class-suffix
export class ComponentExamples {

  constructor(
    public componentService: ComponentService
  ) {
   }
}
