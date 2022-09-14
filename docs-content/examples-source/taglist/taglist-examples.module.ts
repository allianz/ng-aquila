import { NgModule } from '@angular/core';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxTaglistModule } from '@aposin/ng-aquila/taglist';

import { ExamplesSharedModule } from '../examples-shared.module';
import { TaglistExampleComponent } from './taglist/taglist-example';
import { TaglistA11yExampleComponent } from './taglist-a11y/taglist-a11y-example';
import { TaglistBasicExampleComponent } from './taglist-basic/taglist-basic-example';
import { TaglistDeleteExampleComponent } from './taglist-delete/taglist-delete-example';
import { TaglistFormatterExampleComponent } from './taglist-formatter/taglist-formatter-example';
import { TaglistKeywordExampleComponent } from './taglist-keyword/taglist-keyword-example';
import { TaglistObjectsExampleComponent } from './taglist-objects/taglist-objects-example';
import { TaglistOutputExampleComponent } from './taglist-output/taglist-output-example';
import { TaglistReactiveExampleComponent } from './taglist-reactive/taglist-reactive-example';
import { TaglistTemplatedrivenExampleComponent } from './taglist-templatedriven/taglist-templatedriven-example';

const EXAMPLES = [
    TaglistExampleComponent,
    TaglistA11yExampleComponent,
    TaglistBasicExampleComponent,
    TaglistDeleteExampleComponent,
    TaglistFormatterExampleComponent,
    TaglistKeywordExampleComponent,
    TaglistObjectsExampleComponent,
    TaglistOutputExampleComponent,
    TaglistReactiveExampleComponent,
    TaglistTemplatedrivenExampleComponent,
];

@NgModule({
    imports: [NxTaglistModule, NxInputModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class TaglistExamplesModule {
    static components() {
        return {
            taglist: TaglistExampleComponent,
            'taglist-a11y': TaglistA11yExampleComponent,
            'taglist-basic': TaglistBasicExampleComponent,
            'taglist-delete': TaglistDeleteExampleComponent,
            'taglist-formatter': TaglistFormatterExampleComponent,
            'taglist-keyword': TaglistKeywordExampleComponent,
            'taglist-objects': TaglistObjectsExampleComponent,
            'taglist-output': TaglistOutputExampleComponent,
            'taglist-reactive': TaglistReactiveExampleComponent,
            'taglist-templatedriven': TaglistTemplatedrivenExampleComponent,
        };
    }
}
