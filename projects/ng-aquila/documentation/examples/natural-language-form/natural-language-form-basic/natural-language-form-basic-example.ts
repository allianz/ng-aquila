import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxNaturalLanguageFormComponent,
  NxWordComponent,
} from '@allianz/ng-aquila/natural-language-form';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Basic example
 */
@Component({
  selector: 'natural-language-form-basic-example',
  templateUrl: './natural-language-form-basic-example.html',
  styleUrls: ['./natural-language-form-basic-example.css'],
  imports: [
    NxNaturalLanguageFormComponent,
    NxWordComponent,
    NxInputDirective,
    FormsModule,
    NxErrorComponent,
  ],
})
export class NaturalLanguageFormBasicExampleComponent {}
