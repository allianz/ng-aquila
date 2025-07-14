import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Placeholder example
 */
@Component({
  selector: 'formfield-placeholder-example',
  templateUrl: './formfield-placeholder-example.html',
  styleUrls: ['./formfield-placeholder-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective],
})
export class FormfieldPlaceholderExampleComponent {}
