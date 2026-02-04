import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { Component, HostListener, Input, NgModule } from '@angular/core';

import { ExampleDescriptor } from './../core/manifest';
import { ManifestService } from './../service/manifest.service';
import { ExampleData } from './example-data';
import { StackBlitzWriter } from './stack-blitz-writer';

@Component({
  selector: 'nxv-stack-blitz-button',
  templateUrl: './stack-blitz-button.html',
  providers: [StackBlitzWriter],
  imports: [NxButtonModule, NxTooltipModule, NxIconModule],
})
export class StackBlitzButton {
  /**
   * The button becomes disabled if the user hovers over the button before the example data
   * is loaded.
   */
  isDisabled = false;
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
    this.stackBlitzWriter
      .openStackBlitzProject(
        this.exampleDescriptor.id,
        this.exampleDescriptor.module,
        this.exampleData,
        this.exampleDescriptor.id.includes('harness'),
      )
      .catch((error) => {
        console.error('Failed to open StackBlitz:', error);
      });
  }
}

@NgModule({
  imports: [NxButtonModule, NxIconModule, NxTooltipModule, StackBlitzButton],
  exports: [StackBlitzButton],
  providers: [StackBlitzWriter],
})
export class StackBlitzButtonModule {}
