import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component } from '@angular/core';

/**
 * @title Textarea with autoresize example
 */
@Component({
  selector: 'input-autoresize-example',
  templateUrl: './input-autoresize-example.html',
  styleUrls: ['./input-autoresize-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective, CdkTextareaAutosize],
})
export class InputAutoresizeExampleComponent {}
