import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';

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
