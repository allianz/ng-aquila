import { ManifestService } from './../service/manifest.service';
import { ExampleDescriptor } from './../core/manifest';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseLazyLoadingService } from '../service/lazy-loading.service';

@Component({
  selector: 'nxv-lazy-example',
  templateUrl: 'lazy-example-outlet.component.html'
})

export class LazyExampleOutletComponent implements OnInit {

  @Input() exampleId: string;

  exampleComponent = null;
  exampleModuleFactory = null;
  exampleDescriptor: ExampleDescriptor;

  constructor(
    private _lazyLoadingService: BaseLazyLoadingService,
    private _cdRef: ChangeDetectorRef,
    private _manifestService: ManifestService,
  ) { }

  ngOnInit() {
    if (this._manifestService.hasExample(this.exampleId)) {
      this.exampleDescriptor = this._manifestService.getExample(this.exampleId);
    } else {
      console.error('Example does not exist: ', this.exampleDescriptor.id);
    }

    this._lazyLoadingService.getComponent(this.exampleDescriptor.id, this.exampleDescriptor.module)
      .then(({ componentFactory, ngModuleFactory }) => {
        this.exampleComponent = componentFactory;
        this.exampleModuleFactory = ngModuleFactory;
        this._cdRef.detectChanges();
      });
  }
}
