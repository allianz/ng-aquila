import { ManifestService } from './../service/manifest.service';
import { ExampleDescriptor } from './../core/manifest';
import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BaseLazyLoadingService } from '../service/lazy-loading.service';
import { Subscription } from 'rxjs';
import { Direction } from '@angular/cdk/bidi';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'nxv-lazy-example',
    templateUrl: 'lazy-example-outlet.component.html',
})
export class LazyExampleOutletComponent implements OnInit, OnDestroy {
    @Input()
    exampleId!: string;

    exampleComponent: any = null;
    exampleModuleFactory: any = null;
    exampleDescriptor!: ExampleDescriptor;
    _queryParamSubscription!: Subscription;
    directionQuery!: Direction;

    constructor(
        private _lazyLoadingService: BaseLazyLoadingService,
        private _cdRef: ChangeDetectorRef,
        private _manifestService: ManifestService,
        private _route: ActivatedRoute,
    ) {
        this.subscribeToDirectionQueryParams();
    }

    ngOnInit() {
        if (this._manifestService.hasExample(this.exampleId)) {
            this.exampleDescriptor = this._manifestService.getExample(this.exampleId);
        } else {
            console.error('Example does not exist: ', this.exampleDescriptor.id);
        }

        this._lazyLoadingService.getComponent(this.exampleDescriptor.id, this.exampleDescriptor.module).then(({ componentFactory, ngModuleFactory }) => {
            this.exampleComponent = componentFactory;
            this.exampleModuleFactory = ngModuleFactory;
            this._cdRef.detectChanges();
        });
    }

    subscribeToDirectionQueryParams() {
        this._queryParamSubscription = this._route.queryParams.subscribe(params => {
            const { dir } = params;
            this.directionQuery = isAllowedDir(dir) ? dir : null;
        });
    }

    ngOnDestroy() {
        this._queryParamSubscription?.unsubscribe();
    }
}

function isAllowedDir(dir: string) {
    const dirs = ['rtl', 'ltr', 'auto'];
    return dirs.indexOf(dir) > -1;
}
