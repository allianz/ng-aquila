import { Theme } from './theme-switcher/theme-switcher.service';
import { Component, ViewChild, OnDestroy, AfterViewInit, InjectionToken, Inject, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ManifestService } from '../service/manifest.service';
import { RabbitHole } from './rabbit-hole.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeSwitcherService } from './theme-switcher/theme-switcher.service';
import { CssVarSidebarComponent } from './css-vars-sandbox/css-var-sidebar-component';
import cssVars from 'css-vars-ponyfill';
import { Egg } from './egg';
import { NX_DOCS_LOGO_PATH, NX_DOCS_GITHUB_LINK } from '../core/tokens';
import { LogoPath, GithubLinkConfig } from '../core/types';

export class NxDocFeatures {
  themeSwitcher = false;
}

export const NX_DOCS_FEATURE_FLAGS = new InjectionToken<NxDocFeatures>('NX_DOCS_FEATURE_FLAGS');

@Component({
  selector: 'nxv-viewer',
  templateUrl: 'documentation-frame.component.html',
  styleUrls: ['./documentation-frame.scss']
})

export class DocumentationFrameComponent implements OnDestroy, AfterViewInit {
  public manifestFile;
  private _destroyed: Subject<void> = new Subject();
  selectedTheme: Theme;
  themes: Theme[];
  private _ponyFillIsRunning = false;

  showThemingSwitcher = false;
  // TODO: set this according to the calling application (injection token?), always there right now
  showThemingSidebar = false;

   @ViewChild(CssVarSidebarComponent) cssVarSidebar: CssVarSidebarComponent;

  constructor(
    public manifestService: ManifestService,
    private _rabbitHole: RabbitHole,
    private _route: ActivatedRoute,
    private _themeSwitcherService: ThemeSwitcherService,
    @Optional() @Inject(NX_DOCS_FEATURE_FLAGS) private _featureFlags: NxDocFeatures,
    @Inject(NX_DOCS_LOGO_PATH) public logoPath: LogoPath,
    @Inject(NX_DOCS_GITHUB_LINK) public githubLinkConfig: GithubLinkConfig) {
    this.themes = this._themeSwitcherService.themes();
    this.showThemingSwitcher = this._featureFlags ? this._featureFlags.themeSwitcher : false;

    const themeQuery = this._route.snapshot.queryParamMap.get('theme');
    const themeFromQuery = this._themeSwitcherService.get(themeQuery);
    if (themeFromQuery) {
      this.selectedTheme = themeFromQuery;
      this._themeSwitcherService.switchTheme(this.selectedTheme);
    } else {
      this.selectedTheme = this.themes[0];
    }

    this._rabbitHole.showThemeEgg.pipe(
      takeUntil(this._destroyed)
    ).subscribe((showTheming) => {
      if (!showTheming) {
        if (themeFromQuery) {
          this._themeSwitcherService.switchTheme(themeFromQuery);
        } else {
          this._themeSwitcherService.removeTheming();
        }
      } else {
        this._themeSwitcherService.switchTheme(this.selectedTheme);
      }
      if (!this._featureFlags?.themeSwitcher) {
        this.showThemingSwitcher = showTheming;
      }
      this.showThemingSidebar = showTheming;

    });

    this._themeSwitcherService.themeChanged.pipe(
      takeUntil(this._destroyed)
    ).subscribe(theme => {
      this.selectedTheme = theme;
      if (this.cssVarSidebar) {
        this.cssVarSidebar.reset();
      }
    });
  }

  selectTheme(theme: Theme) {
    this.selectedTheme = theme;
    this._themeSwitcherService.switchTheme(theme);
  }

  ngAfterViewInit() {
    this.hideEggs();
  }

  onSubmit() {
    const reader = new FileReader();

    reader.onload = result => {
      const manifestData = JSON.parse(reader.result as string);
      this.manifestService.update(manifestData);
    };

    reader.readAsText(this.manifestFile);
  }

  onFileChange(event) {
    this.manifestFile = event.currentTarget.files[0];
  }

  hideEggs() {
    new Egg('left,t,right', () => {
      this._rabbitHole.toggleTheming();
    }).listen();
  }

  clearStyleTags(tags: HTMLCollection) {
    const attributes = ['data-cssvars', 'data-cssvars-job', 'data-cssvars-group'];
    for (let i = 0; i < tags.length; i++) {
      const el = tags[i];
      const dataCssVarAttr = el.getAttribute('data-cssvars');
      if (dataCssVarAttr && dataCssVarAttr === 'out') {
        el.parentNode.removeChild(el);
      } else {
        attributes.forEach(attr => el.removeAttribute(attr));
      }
    }
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
