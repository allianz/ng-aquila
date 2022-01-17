import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GuideDescriptor, Manifest } from '../../core/manifest';
import { ManifestService } from '../../service/manifest.service';
import { DocumentationFrameComponent } from '../documentation-frame.component';

@Component({
    selector: 'nxv-guides',
    templateUrl: 'guides.component.html',
    styleUrls: ['guides.component.scss'],
})
export class NxvGuidesComponent implements OnDestroy {
    public availableGuides!: GuideDescriptor[];
    private guideSubscription: Subscription;

    constructor(
        private manifestService: ManifestService,
        private router: Router,
        private route: ActivatedRoute,
        public documentationFrame: DocumentationFrameComponent,
    ) {
        this.guideSubscription = manifestService.manifest.pipe(map((manifest: Manifest) => manifest.guides)).subscribe(guides => {
            this.availableGuides = guides;
            const hasChildRoute = this.route.snapshot.firstChild;
            if (guides.length && !hasChildRoute) {
                this.router.navigate([guides[0].id], { relativeTo: this.route });
            }
        });
    }

    ngOnDestroy() {
        if (this.guideSubscription) {
            this.guideSubscription.unsubscribe();
        }
    }

    mainContentClicked() {
        this.documentationFrame.mobileSidebar = false;
    }
}
