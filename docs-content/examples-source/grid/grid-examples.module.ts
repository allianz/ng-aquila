import { NgModule } from '@angular/core';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { GridAlignContentExampleComponent } from './grid-align-content/grid-align-content-example';
import { GridAlignItemsExampleComponent } from './grid-align-items/grid-align-items-example';
import { GridAlignSelfExampleComponent } from './grid-align-self/grid-align-self-example';
import { GridColOrderExampleComponent } from './grid-col-order/grid-col-order-example';
import { GridJustifyExampleComponent } from './grid-justify/grid-justify-example';
import { GridMaxwidthExampleComponent } from './grid-maxwidth/grid-maxwidth-example';
import { GridMultiInputs1ExampleComponent } from './grid-multi-inputs-1/grid-multi-inputs-1-example';
import { GridMultiInputs2ExampleComponent } from './grid-multi-inputs-2/grid-multi-inputs-2-example';
import { GridNogutterExampleComponent } from './grid-nogutter/grid-nogutter-example';
import { GridOffsetExampleComponent } from './grid-offset/grid-offset-example';
import { GridOneInputExampleComponent } from './grid-one-input/grid-one-input-example';

const EXAMPLES = [
    GridAlignContentExampleComponent,
    GridAlignItemsExampleComponent,
    GridAlignSelfExampleComponent,
    GridColOrderExampleComponent,
    GridJustifyExampleComponent,
    GridMaxwidthExampleComponent,
    GridMultiInputs1ExampleComponent,
    GridMultiInputs2ExampleComponent,
    GridNogutterExampleComponent,
    GridOffsetExampleComponent,
    GridOneInputExampleComponent,
];

@NgModule({
    imports: [NxGridModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class GridExamplesModule {
    static components() {
        return {
            'grid-align-content': GridAlignContentExampleComponent,
            'grid-align-items': GridAlignItemsExampleComponent,
            'grid-align-self': GridAlignSelfExampleComponent,
            'grid-col-order': GridColOrderExampleComponent,
            'grid-justify': GridJustifyExampleComponent,
            'grid-maxwidth': GridMaxwidthExampleComponent,
            'grid-multi-inputs-1': GridMultiInputs1ExampleComponent,
            'grid-multi-inputs-2': GridMultiInputs2ExampleComponent,
            'grid-nogutter': GridNogutterExampleComponent,
            'grid-offset': GridOffsetExampleComponent,
            'grid-one-input': GridOneInputExampleComponent,
        };
    }
}
