import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NX_DOCS_GITHUB_LINK } from '../../../core/tokens';
import { GithubLinkConfig } from '../../../core/types';
import { Category, ManifestService } from '../../../service/manifest.service';

@Component({
    selector: 'nxv-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss'],
})
export class NxvOverviewComponent implements OnInit {
    components!: Category[];
    issueBoardLink: string;

    constructor(public manifestService: ManifestService, @Inject(NX_DOCS_GITHUB_LINK) private githubLinkConfig: GithubLinkConfig, private _router: Router) {
        manifestService.manifest.subscribe(() => {
            this.components = this.manifestService.getGroupedComponents();
        });

        this.issueBoardLink = `${githubLinkConfig.repoLink}/issues`;
    }

    ngOnInit() {}

    navigateToComponent(component: { component: { id: string | number } }) {
        this._router.navigate(['/documentation', component.component.id]);
    }
}
