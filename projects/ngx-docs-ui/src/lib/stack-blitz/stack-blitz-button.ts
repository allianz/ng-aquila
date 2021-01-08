import { Component, HostListener, Input, NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';

import { ExampleData } from './example-data';
import { ExampleDescriptor } from './../core/manifest';
import { StackBlitzWriter } from './stack-blitz-writer';
import { ManifestService } from './../service/manifest.service';

@Component({
  selector: 'nxv-stack-blitz-button',
  templateUrl: './stack-blitz-button.html',
  providers: [StackBlitzWriter]
})
export class StackBlitzButton {
  /**
   * The button becomes disabled if the user hovers over the button before the StackBlitz form
   * is created. After the form is created, the button becomes enabled again.
   * The form creation usually happens extremely quickly, but we handle the case of the
   * StackBlitz not yet being ready for people with poor network connections or slow devices.
   */
  isDisabled = false;
  stackBlitzForm: HTMLFormElement;
  exampleData: ExampleData;
  exampleDescriptor: ExampleDescriptor;

  @HostListener('mouseover') onMouseOver() {
    this.isDisabled = !this.stackBlitzForm;
  }

  @Input()
  set example(example: string) {
    if (this.manifestService.hasExample(example)) {
      this.exampleDescriptor = this.manifestService.getExample(example);
      this.exampleData = new ExampleData(example, this.exampleDescriptor.title);
    }

    if (example) {
      this.stackBlitzWriter.constructStackBlitzForm(example,
        this.exampleDescriptor.module,
        this.exampleData,
        example.includes('harness'))
        .then((stackBlitzForm: HTMLFormElement) => {
          this.stackBlitzForm = stackBlitzForm;
          this.isDisabled = false;
        });
    } else {
      this.isDisabled = true;
    }
  }

  constructor(
    public manifestService: ManifestService,
    private stackBlitzWriter: StackBlitzWriter,
  ) {}

  openStackBlitz(): void {
    // When the form is submitted, it must be in the document body. The standard of forms is not
    // to submit if it is detached from the document. See the following chromium commit for
    // more details:
    // https://chromium.googlesource.com/chromium/src/+/962c2a22ddc474255c776aefc7abeba00edc7470%5E!
    document.body.appendChild(this.stackBlitzForm);
    this.stackBlitzForm.submit();
    document.body.removeChild(this.stackBlitzForm);
  }
}

@NgModule({
  imports: [
      NxButtonModule,
      NxIconModule,
      NxTooltipModule
    ],
  exports: [StackBlitzButton],
  declarations: [StackBlitzButton],
  providers: [StackBlitzWriter],
})
export class StackBlitzButtonModule {}
