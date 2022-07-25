import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NX_DOCS_GITHUB_LINK } from '../../../core/tokens';
import { GithubLinkConfig } from '../../../core/types';
import { Category, ManifestService } from '../../../service/manifest.service';

@Component({
    selector: 'nxv-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss'],
})
export class NxvOverviewComponent implements OnDestroy {
    components!: Category[];
    issueBoardLink: string;

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly manifestService: ManifestService,
        @Inject(NX_DOCS_GITHUB_LINK) private readonly githubLinkConfig: GithubLinkConfig,
        private readonly _router: Router,
    ) {
        manifestService.manifest.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.components = this.manifestService.getGroupedComponents();
        });

        this.issueBoardLink = `${githubLinkConfig.repoLink}/issues`;
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    navigateToComponent(component: { component: { id: string | number } }) {
        this._router.navigate(['/documentation', component.component.id]);
    }
}
