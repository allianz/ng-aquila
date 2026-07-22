import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Formfield with info icon */
@Component({
  selector: 'formfield-info-icon-example',
  templateUrl: './formfield-info-icon-example.html',
  styleUrls: ['./formfield-info-icon-example.css'],
  imports: [
    NxFormfieldModule,
    NxInputModule,
    FormsModule,
    NxInfoIconComponent,
    NxListComponent,
  ],
})
export class FormfieldInfoIconExampleComponent {}
