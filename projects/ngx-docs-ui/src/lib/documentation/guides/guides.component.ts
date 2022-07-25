import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GuideDescriptor, Manifest } from '../../core/manifest';
import { ManifestService } from '../../service/manifest.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';

@Component({
    selector: 'nxv-guides',
    templateUrl: 'guides.component.html',
    styleUrls: ['guides.component.scss'],
})
export class NxvGuidesComponent implements OnDestroy {
    availableGuides!: GuideDescriptor[];

    private readonly _destroyed = new Subject<void>();

    constructor(
        manifestService: ManifestService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        readonly documentationFrame: DocumentationFrameComponent,
    ) {
        manifestService.manifest
            .pipe(
                map((manifest: Manifest) => manifest.guides),
                takeUntil(this._destroyed),
            )
            .subscribe(guides => {
                this.availableGuides = guides;
                const hasChildRoute = this.route.snapshot.firstChild;

                if (guides.length && !hasChildRoute) {
                    this.router.navigate([guides[0].id], { relativeTo: this.route });
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    mainContentClicked() {
        this.documentationFrame.mobileSidebar = false;
    }
}
