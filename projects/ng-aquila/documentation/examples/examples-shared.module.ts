import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NxButtonModule,
    NxHeadlineModule,
    NxCopytextModule,
    NxGridModule,
  ],
})
export class ExamplesSharedModule {}
