import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseLazyLoadingService } from '../service/lazy-loading.service';
import { ExampleDescriptor } from './../core/manifest';
import { ManifestService } from './../service/manifest.service';

@Component({
    selector: 'nxv-lazy-example',
    templateUrl: 'lazy-example-outlet.component.html',
})
export class LazyExampleOutletComponent implements OnInit, OnDestroy {
    @Input() exampleId!: string;

    exampleComponent: any = null;
    exampleModuleFactory: any = null;
    exampleDescriptor!: ExampleDescriptor;
    directionQuery!: Direction;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private _lazyLoadingService: BaseLazyLoadingService,
        private _cdr: ChangeDetectorRef,
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
            this._cdr.detectChanges();
        });
    }

    subscribeToDirectionQueryParams() {
        this._route.queryParams.pipe(takeUntil(this._destroyed)).subscribe(params => {
            const { dir } = params;
            this.directionQuery = isAllowedDir(dir) ? dir : null;
        });
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
}

function isAllowedDir(dir: string) {
    const dirs = ['rtl', 'ltr', 'auto'];
    return dirs.includes(dir);
}
