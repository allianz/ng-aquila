import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldStatus,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxPopoverMainContentDirective } from '@allianz/ng-aquila/popover';
import {
  NxSignalButtonComponent,
  NxSignalButtonContext,
} from '@allianz/ng-aquila/signal-button';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const SIGNAL_BUTTON_CONTEXT: Record<NxFormfieldStatus, NxSignalButtonContext> =
  {
    positive: 'success',
    warning: 'warning',
    info: 'info',
  };

const INITIAL_MILEAGE = '12500';

/**
 * @title Status example
 */
@Component({
  selector: 'formfield-status-example',
  templateUrl: './formfield-status-example.html',
  styleUrls: ['./formfield-status-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxFormfieldSuffixDirective,
    NxInputDirective,
    NxButtonComponent,
    NxSignalButtonComponent,
    NxPopoverMainContentDirective,
    NxHeadlineComponent,
    FormsModule,
  ],
})
export class FormfieldStatusExampleComponent {
  iban = 'DE02 1203 0000 0000 2020 51';
  inlineIban = 'DE02 1203 0000 0000 2020 51';

  readonly mileage = signal(INITIAL_MILEAGE);

  /** Status only holds while the value matches what was taken from the contract. */
  readonly mileageStatus = computed<NxFormfieldStatus | null>(() =>
    this.mileage() === INITIAL_MILEAGE ? 'info' : null,
  );

  /** Status of the account field, set once the account has been checked. */
  readonly ibanStatus = signal<NxFormfieldStatus | null>(null);

  /** Status of the inline account field, set once the account has been checked. */
  readonly inlineIbanStatus = signal<NxFormfieldStatus>('positive');

  readonly inlineIbanSignalContext = computed(() => {
    const status = this.inlineIbanStatus();
    return SIGNAL_BUTTON_CONTEXT[status];
  });

  checkIban() {
    this.ibanStatus.set(this.ibanStatus() ? null : 'positive');
  }
}
