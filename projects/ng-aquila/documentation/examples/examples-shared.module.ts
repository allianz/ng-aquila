import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxButtonModule } from '@aposin/ng-aquila/button';
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
