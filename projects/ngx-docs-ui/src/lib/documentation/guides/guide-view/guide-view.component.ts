import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuideDescriptor } from '../../../core/manifest';
import { NXV_FEEDBACK_LINKS } from '../../../core/tokens';
import { ManifestService } from '../../../service/manifest.service';

@Component({
    selector: 'nxv-guide-view',
    templateUrl: 'guide-view.component.html',
    styleUrls: ['guide-view.component.scss'],
})
export class NxvGuideViewComponent {
    guide!: GuideDescriptor;
    guides: string[] = [];

    constructor(
        _route: ActivatedRoute,
        private manifestService: ManifestService,
        private router: Router,
        @Optional() @Inject(NXV_FEEDBACK_LINKS) public feedbackLinks: any,
    ) {
        // Listen for changes in the route or our manifest
        combineLatest(manifestService.manifest, _route.params.pipe(map(params => params['id'])))
            .pipe(
                map(([manifest, id]: any) => {
                    return { manifest, id };
                }),
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
}
