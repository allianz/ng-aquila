import { Component, Input, Inject, Optional, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentExample } from '../doc-viewer/component-example';
import { NX_EXAMPLES_TOKEN } from '../core/tokens';
import { ExampleList } from '../example-collection';
import { ManifestService } from '../service/manifest.service';
import { ExampleDescriptor } from '../core/manifest';
import { DocViewerComponent } from '../doc-viewer/doc-viewer.component';
import { CopyService } from '../core/copy.service';
import { NxTabGroupComponent } from '@aposin/ng-aquila/tabs';

@Component({
  selector: 'nxv-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss']
})
export class ExampleViewerComponent {
  constructor(
    @Optional() @Inject(NX_EXAMPLES_TOKEN)
    public exampleList: ExampleList,
    public manifestService: ManifestService,
    public copyService: CopyService
  ) { }

  showSourceCode = false;
  _example: string;
  exampleData: ComponentExample;
  exampleDescriptor: ExampleDescriptor;
  examplePortal: ComponentPortal<any>;
  exampleDescriptorTypes = [
    { type: 'html', label: 'html' },
    { type: 'ts', label: 'typescript' },
    { type: 'css', label: 'css' }
  ];
  copyButtonText = 'copy';

  @ViewChildren(DocViewerComponent) docViewers: QueryList<DocViewerComponent>;
  @ViewChild(NxTabGroupComponent) tabGroup: NxTabGroupComponent;

  @Input()
  set example(id: string) {

    if (this.manifestService.hasExample(id) && this.exampleList[id]) {
      this._example = id;
      this.exampleDescriptor = this.manifestService.getExample(id);
      this.exampleData = this.exampleList[id];
      this.examplePortal = new ComponentPortal(this.exampleData.component);
    } else {
      console.error('Example does not exist: ', id);
    }
  }

  get example() {
    return this._example;
  }

  toggleSourceView() {
    this.showSourceCode = !this.showSourceCode;
  }

  copySourceCode() {
    const currentTab = this.tabGroup.tabs.toArray()[this.tabGroup.selectedIndex].label;
    const currentContent = this.docViewers.toArray().filter(viewer => viewer.id === currentTab).pop().content;
    this.copyButtonText = 'copied!';

    setTimeout(() => {
      this.copyButtonText = 'copy';
    }, 500);

    this.copyService.copyText(currentContent);
  }

  getExampleSourceUrl(type, url) {
    const file = url.split('###TYPE###').join(type);
    return file;
  }
}
