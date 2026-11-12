import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
} from '@allianz/ng-aquila/modal';
import {
  Component,
  inject,
  InjectionToken,
  Injector,
  input,
  inputBinding,
  model,
  output,
  outputBinding,
  signal,
  TemplateRef,
  twoWayBinding,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

const COVERAGE = new InjectionToken<string>('COVERAGE');

@Component({
  selector: 'modal-component-bindings-content',
  template: `
    <h3 nxHeadline="subsection-medium" class="nx-modal-margin-bottom">
      {{ coverage }} policy {{ policyNumber() }}
    </h3>
    <div nxModalContent>
      <nx-formfield label="Policy holder">
        <input nxInput [(ngModel)]="holder" />
      </nx-formfield>
    </div>
    <div nxModalActions>
      <button
        nxButton="secondary"
        nxModalClose
        type="button"
        class="nx-margin-right-s"
      >
        Cancel
      </button>
      <button
        nxButton
        nxModalClose
        type="button"
        [disabled]="!holder()"
        (click)="confirmed.emit(policyNumber())"
      >
        Confirm
      </button>
    </div>
  `,
  imports: [
    NxButtonComponent,
    FormsModule,
    NxFormfieldComponent,
    NxInputDirective,
    NxHeadlineComponent,
    NxModalContentDirective,
    NxModalActionsDirective,
    NxModalCloseDirective,
  ],
})
export class ModalComponentBindingsContentComponent {
  readonly policyNumber = input.required<string>();
  readonly holder = model('');
  readonly confirmed = output<string>();

  protected readonly coverage = inject(COVERAGE);
}

/**
 * @title Injector, providers and component bindings example
 */
@Component({
  selector: 'modal-component-bindings-example',
  templateUrl: './modal-component-bindings-example.html',
  imports: [
    NxButtonComponent,
    NxCopytextComponent,
    ModalComponentBindingsContentComponent,
  ],
  providers: [{ provide: COVERAGE, useValue: 'Basic' }],
})
export class ModalComponentBindingsExampleComponent {
  private readonly dialogService = inject(NxDialogService);
  private readonly injector = inject(Injector);

  readonly policyNumber = signal('AZ-12345');
  readonly holder = signal('');
  readonly confirmedPolicy = signal<string | null>(null);

  open(): void {
    this.dialogService.open(ModalComponentBindingsContentComponent, {
      injector: this.injector,
      // Takes precedence over the COVERAGE from `injector`.
      providers: [{ provide: COVERAGE, useValue: 'Premium' }],
      bindings: [
        inputBinding('policyNumber', this.policyNumber),
        twoWayBinding('holder', this.holder),
        outputBinding<string>('confirmed', (policy) =>
          this.confirmedPolicy.set(policy),
        ),
      ],
    });
  }

  openWithComponentRef(): void {
    const modalRef = this.dialogService.open(
      ModalComponentBindingsContentComponent,
      {
        injector: this.injector,
      },
    );
    // Not combinable with inputBinding / twoWayBinding on the same modal.
    modalRef.componentRef!.setInput('policyNumber', this.policyNumber());
    modalRef.componentRef!.setInput('holder', this.holder());
    modalRef.componentInstance.confirmed.subscribe((policy) =>
      this.confirmedPolicy.set(policy),
    );
  }

  openTemplate(template: TemplateRef<unknown>): void {
    this.dialogService.open(template, {
      providers: [{ provide: COVERAGE, useValue: 'Premium' }],
      // injector: undefined
    });
  }
}
