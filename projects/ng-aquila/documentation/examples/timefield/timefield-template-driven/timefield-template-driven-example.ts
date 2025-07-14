import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Timefield Template Driven Form */
@Component({
  selector: 'timefield-template-driven-example',
  templateUrl: './timefield-template-driven-example.html',
  styleUrls: ['./timefield-template-driven-example.css'],
  imports: [FormsModule, NxTimefieldComponent, NxErrorComponent],
})
export class TimefieldTemplateDrivenExampleComponent {
  templateModel = '14:54';
}
