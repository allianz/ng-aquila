import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxNaturalLanguageFormComponent,
  NxWordComponent,
} from '@allianz/ng-aquila/natural-language-form';
import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'natural-language-form-negative-example',
  templateUrl: './natural-language-form-negative-example.html',
  styleUrls: ['./natural-language-form-negative-example.css'],
  imports: [NxNaturalLanguageFormComponent, NxWordComponent, NxInputDirective],
})
export class NaturalLanguageFormNegativeExampleComponent {}
