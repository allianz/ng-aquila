import { Component, HostListener, Input, NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';

import { ExampleDescriptor } from './../core/manifest';
import { ManifestService } from './../service/manifest.service';
import { ExampleData } from './example-data';
import { StackBlitzWriter } from './stack-blitz-writer';

@Component({
    selector: 'nxv-stack-blitz-button',
    templateUrl: './stack-blitz-button.html',
    providers: [StackBlitzWriter],
})
export class StackBlitzButton {
    /**
     * The button becomes disabled if the user hovers over the button before the StackBlitz form
     * is created. After the form is created, the button becomes enabled again.
     * The form creation usually happens extremely quickly, but we handle the case of the
     * StackBlitz not yet being ready for people with poor network connections or slow devices.
     */
    isDisabled = false;
    stackBlitzForm!: HTMLFormElement;
    exampleData!: ExampleData;
    exampleDescriptor!: ExampleDescriptor;

    @HostListener('mouseover') onMouseOver() {
        this.isDisabled = !this.exampleDescriptor;
    }

    @Input() set example(example: string) {
        if (this.manifestService.hasExample(example)) {
            this.exampleDescriptor = this.manifestService.getExample(example);
            this.exampleData = new ExampleData(example, this.exampleDescriptor.title);
        }

        if (!example) {
            this.isDisabled = true;
        }
    }

    constructor(
        readonly manifestService: ManifestService,
        private readonly stackBlitzWriter: StackBlitzWriter,
    ) {}

    openStackBlitz(): void {
        if (this.stackBlitzForm) {
            // Second click
            this.submitStackBlitzForm();
        } else {
            // First click
            this.stackBlitzWriter
                .constructStackBlitzForm(
                    this.exampleDescriptor.id,
                    this.exampleDescriptor.module,
                    this.exampleData,
                    this.exampleDescriptor.id.includes('harness'),
                )
                .then((stackBlitzForm: HTMLFormElement) => {
                    // This delay could trigger the browser's popup blocker if it takes too long
                    // The user can either allow the popup or do a second click, when the form is
                    // already constructed and set below
                    this.stackBlitzForm = stackBlitzForm;

                    this.submitStackBlitzForm();
                });
        }
    }

    submitStackBlitzForm(): void {
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
    imports: [NxButtonModule, NxIconModule, NxTooltipModule],
    exports: [StackBlitzButton],
    declarations: [StackBlitzButton],
    providers: [StackBlitzWriter],
})
export class StackBlitzButtonModule {}
