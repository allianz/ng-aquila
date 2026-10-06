import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldPrefixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Search Field with Input Example
 */
@Component({
  selector: 'search-field-input-example',
  templateUrl: './search-field-input-example.html',
  imports: [
    FormsModule,
    NxFormfieldComponent,
    NxFormfieldPrefixDirective,
    NxFormfieldAppendixDirective,
    NxInputDirective,
    NxButtonComponent,
    NxIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldInputExampleComponent {
  searchTerm = '';
  readonly submittedTerm = signal('');

  search() {
    this.submittedTerm.set(this.searchTerm);
  }
}
