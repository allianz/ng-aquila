import { NxActionModule } from '@allianz/ng-aquila/action';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { NxTreeModule } from '@allianz/ng-aquila/tree';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SidebarColorSchemeExampleComponent } from './sidebar-color-scheme/sidebar-color-scheme-example';
import { SidebarExampleComponent } from './sidebar/sidebar-example';
import { SidebarFooterExampleComponent } from './sidebar-footer/sidebar-footer-example';
import { SidebarMethodsExampleComponent } from './sidebar-methods/sidebar-methods-example';
import { SidebarOutputsExampleComponent } from './sidebar-outputs/sidebar-outputs-example';
import { SidebarA1OutputsExampleComponent } from './sidebar-a1-outputs/sidebar-a1-outputs-example';
import { SidebarResizeableExampleComponent } from './sidebar-resizeable/sidebar-resizeable-example';
import { SidebarA1ResizeableExampleComponent } from './sidebar-a1-resizeable/sidebar-a1-resizeable-example';

const EXAMPLES = [
  SidebarColorSchemeExampleComponent,
  SidebarExampleComponent,
  SidebarFooterExampleComponent,
  SidebarMethodsExampleComponent,
  SidebarOutputsExampleComponent,
  SidebarResizeableExampleComponent,
  SidebarA1ResizeableExampleComponent,
  SidebarA1OutputsExampleComponent,
];

@NgModule({
  imports: [
    NxSidebarModule,
    NxTreeModule,
    NxInputModule,
    NxIconModule,
    RouterModule,
    NxActionModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class SidebarExamplesModule {
  static components() {
    return {
      'sidebar-color-scheme': SidebarColorSchemeExampleComponent,
      sidebar: SidebarExampleComponent,
      'sidebar-footer': SidebarFooterExampleComponent,
      'sidebar-methods': SidebarMethodsExampleComponent,
      'sidebar-outputs': SidebarOutputsExampleComponent,
      'sidebar-resizeable': SidebarResizeableExampleComponent,
      'sidebar-a1-resizeable': SidebarA1ResizeableExampleComponent,
      'sidebar-a1-outputs': SidebarA1OutputsExampleComponent,
    };
  }
}
