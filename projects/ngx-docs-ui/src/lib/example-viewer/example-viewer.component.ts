import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxTabGroupComponent, NxTabsModule } from '@allianz/ng-aquila/tabs';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { CopyService } from '../core/copy.service';
import { ExampleDescriptor } from '../core/manifest';
import { ComponentExample } from '../doc-viewer/component-example';
import { DocViewerComponent } from '../doc-viewer/doc-viewer.component';
import { LazyExampleOutletComponent } from '../lazy-example-outlet/lazy-example-outlet.component';
import { StackBlitzButton } from '../stack-blitz/stack-blitz-button';
import { ManifestService } from './../service/manifest.service';

interface ExampleConfig {
  hideHeader?: boolean;
  hideStackblitzButton?: boolean;
  privateExample?: boolean;
}

@Component({
  selector: 'nxv-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxButtonModule,
    NxIconModule,
    NxLinkModule,
    NxTooltipModule,
    RouterLink,
    StackBlitzButton,
    NxTabsModule,
    DocViewerComponent,
    LazyExampleOutletComponent,
  ],
})
export class ExampleViewerComponent {
  moduleId!: string;
  showSourceCode = false;
  exampleData!: ComponentExample;
  exampleDescriptor!: ExampleDescriptor;
  examplePortal!: ComponentPortal<any>;
  exampleDescriptorTypes = [
    { type: 'html', label: 'html' },
    { type: 'ts', label: 'typescript' },
    { type: 'css', label: 'css' },
  ];
  copyButtonText = 'copy';

  @ViewChildren(DocViewerComponent) docViewers!: QueryList<DocViewerComponent>;
  @ViewChild(NxTabGroupComponent) tabGroup!: NxTabGroupComponent;

  exampleComponent = null;
  exampleModuleFactory = null;

  @Input() set example(id: string) {
    this._example = id;

    if (this.manifestService.hasExample(id)) {
      this.exampleDescriptor = this.manifestService.getExample(id);
    }
  }

  get example() {
    return this._example;
  }
  _example!: string;

  @Input() config?: ExampleConfig | null;

  constructor(
    readonly manifestService: ManifestService,
    readonly copyService: CopyService,
  ) {}

  toggleSourceView() {
    this.showSourceCode = !this.showSourceCode;
  }

  copySourceCode() {
    const currentTab = this.tabGroup.tabs.toArray()[this.tabGroup.selectedIndex].label;
    const currentContent = this.docViewers
      .toArray()
      .filter((viewer) => viewer.id === currentTab)
      .pop()?.content;
    this.copyButtonText = 'copied!';

    setTimeout(() => {
      this.copyButtonText = 'copy';
    }, 500);

    this.copyService.copyText(currentContent);
  }

  getExampleSourceUrl(type: string, url: string) {
    const file = url.split('###TYPE###').join(type);
    return file;
  }
}
