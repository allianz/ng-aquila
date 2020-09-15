import { Component, OnInit, Inject } from '@angular/core';
import { ManifestService, Category } from '../../../service/manifest.service';
import { NX_DOCS_GITHUB_LINK } from '../../../core/tokens';
import { GithubLinkConfig } from '../../../core/types';

@Component({
  selector: 'nxv-overview',
  templateUrl: 'overview.component.html',
  styleUrls: ['overview.component.scss']
})

export class NxvOverviewComponent implements OnInit {
  components: Category[];
  issueBoardLink: string;

  constructor(
    public manifestService: ManifestService,
    @Inject(NX_DOCS_GITHUB_LINK) private githubLinkConfig: GithubLinkConfig
  ) {
    manifestService.manifest
    .subscribe(() => {
      this.components = this.manifestService.getGroupedComponents();
    });

    this.issueBoardLink = `${githubLinkConfig.repoLink}/issues`;
  }

  ngOnInit() { }
}
