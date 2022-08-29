import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GuideDescriptor } from '../../../core/manifest';
import { NXV_FEEDBACK_LINKS } from '../../../core/tokens';
import { ManifestService } from '../../../service/manifest.service';

@Component({
    selector: 'nxv-guide-view',
    templateUrl: 'guide-view.component.html',
    styleUrls: ['guide-view.component.scss'],
})
export class NxvGuideViewComponent implements OnDestroy {
    guide!: GuideDescriptor;
    guides: string[] = [];

    private readonly _destroyed = new Subject<void>();

    constructor(
        _route: ActivatedRoute,
        private readonly manifestService: ManifestService,
        private readonly router: Router,
        @Optional() @Inject(NXV_FEEDBACK_LINKS) readonly feedbackLinks: any | null,
    ) {
        // Listen for changes in the route or our manifest
        combineLatest([manifestService.manifest, _route.params.pipe(map(params => params.id))])
            .pipe(
                map(([manifest, id]: any) => ({ manifest, id })),
                takeUntil(this._destroyed),
            )
            .subscribe(result => {
                // check if there is a guide with the specified id
                if (this.manifestService.hasGuide(result.id)) {
                    this.guide = this.manifestService.getGuide(result.id);
                } else {
                    // not found back to overview
                    this.router.navigate(['/']);
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
