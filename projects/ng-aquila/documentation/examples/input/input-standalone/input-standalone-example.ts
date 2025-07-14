import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Standalone example
 */
@Component({
  selector: 'input-standalone-example',
  templateUrl: './input-standalone-example.html',
  styleUrls: ['./input-standalone-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective],
})
export class InputStandaloneExampleComponent {}
