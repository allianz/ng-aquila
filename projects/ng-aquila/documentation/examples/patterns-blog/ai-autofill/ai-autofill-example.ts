import {
  NxButtonComponent,
  NxIconButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxFormfieldComponent,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxPopoverActionsDirective,
  NxPopoverComponent,
  NxPopoverMainContentDirective,
  NxPopoverTitleDirective,
  NxPopoverTriggerDirective,
  POPOVER_DEFAULT_OPTIONS,
  PopoverDefaultOptions,
} from '@allianz/ng-aquila/popover';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const myDefaultOptions: PopoverDefaultOptions = {
  popoverWidth: '360px',
  popoverMaxWidth: '100%',
};

/**
 * @title AI Autofill for Inputs Example
 */
@Component({
  selector: 'ai-autofill-example',
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    NxGridModule,

    NxFormfieldSuffixDirective,
    FormsModule,
    NxIconComponent,
    NxIconButtonComponent,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    NxHeadlineComponent,
    NxPopoverActionsDirective,
    NxPopoverMainContentDirective,
    NxPopoverTitleDirective,
    NxCopytextComponent,
    NxButtonComponent,
  ],
  templateUrl: './ai-autofill-example.html',
  styleUrl: './ai-autofill-example.css',
  providers: [{ provide: POPOVER_DEFAULT_OPTIONS, useValue: myDefaultOptions }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAutofillExampleComponent {
  inputValue = '';
  popoverManualOpenFlag = false;
  aiFilled = false;

  readonlyValue = '1.386.945 CHF';

  fillWithAi() {
    console.log('Some AI Magic');
    this.aiFilled = true;
    this.inputValue = '1.386.945 CHF';
    this.popoverManualOpenFlag = false;
  }

  fieldChangedManually() {
    this.aiFilled = false;
  }
}
