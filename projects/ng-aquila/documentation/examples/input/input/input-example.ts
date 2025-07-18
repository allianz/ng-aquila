import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Basic input field example
 */
@Component({
  selector: 'input-example',
  templateUrl: './input-example.html',
  styleUrls: ['./input-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective, NxErrorComponent],
})
export class InputExampleComponent {
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
}
