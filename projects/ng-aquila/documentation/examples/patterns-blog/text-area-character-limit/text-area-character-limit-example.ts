import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxExpertModule } from '@allianz/ng-aquila/config';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  AfterViewInit,
  Component,
  computed,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Text Area with soft Character Limit Example
 */
@Component({
  selector: 'text-area-character-limit-example',
  standalone: true,
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxFormfieldHintDirective,
    NxErrorComponent,
    ReactiveFormsModule,
    NxFormfieldErrorDirective,
    NxExpertModule,
  ],
  templateUrl: './text-area-character-limit-example.html',
  styleUrl: './text-area-character-limit-example.scss',
})
export class TextAreaCharacterLimitExampleComponent implements AfterViewInit {
  hintText = computed<string>(() => {
    const currentLength = this.textLength();
    if (currentLength > 10) {
      return `${currentLength - 10} characters over the limit`;
    }
    return `${10 - currentLength} characters remaining`;
  });
  textLength = signal<number>(0);

  limittingForm = new FormBuilder().group({
    overflowTextArea: ['Initial text', Validators.maxLength(10)],
  });

  textAreaLimitExceededError = viewChild('textAreaTextLimitErrorMessage');

  textAreaInputWithSoftLimit = viewChild('textAreaWithSoftLimit', {
    read: NxInputDirective,
  });

  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;

  count = 0;

  ngAfterViewInit(): void {
    this.updateTextArea();
  }

  onInput() {
    this.count = this.input.value.length;
  }

  updateTextArea() {
    this.textLength.set(this.limittingForm.value.overflowTextArea?.length || 0);
  }
}
