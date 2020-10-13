import { Theme } from './theme-switcher/theme-switcher.service';
import { Component, ViewChild, OnDestroy, AfterViewInit, InjectionToken, Inject, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ManifestService } from '../service/manifest.service';
import { RabbitHole } from './rabbit-hole.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ThemeSwitcherService } from './theme-switcher/theme-switcher.service';
import { CssVarSidebarComponent } from './css-vars-sandbox/css-var-sidebar-component';
import { Egg } from './egg';
import { NX_DOCS_LOGO_PATH, NX_DOCS_GITHUB_LINK } from '../core/tokens';
import { LogoPath, GithubLinkConfig } from '../core/types';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';

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

  mobileSidebar: boolean = false;

  showThemingSwitcher = false;
  // TODO: set this according to the calling application (injection token?), always there right now
  showThemingSidebar = false;

  showMobileMenuButton: boolean = false;

   @ViewChild(CssVarSidebarComponent) cssVarSidebar: CssVarSidebarComponent;

  constructor(
    public manifestService: ManifestService,
    private _rabbitHole: RabbitHole,
    private _route: ActivatedRoute,
    private _router: Router,
    private _themeSwitcherService: ThemeSwitcherService,
    private iconRegistry: NxIconRegistry,
    @Optional() @Inject(NX_DOCS_FEATURE_FLAGS) private _featureFlags: NxDocFeatures,
    @Inject(NX_DOCS_LOGO_PATH) public logoPath: LogoPath,
    @Inject(NX_DOCS_GITHUB_LINK) public githubLinkConfig: GithubLinkConfig
  ) {

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

    this.iconRegistry.registerFont('fa', 'fas', 'fa-');
    this.iconRegistry.addFontIcon('bars', 'bars', 'fa');

    this._router.events.forEach((event) => {
      // hide the mobile sidebar every time the route changes
      if (event instanceof NavigationStart) {
        this.mobileSidebar = false;
      }
      // show the mobile menu button only when a documenation or a guide page is shown
      if (event instanceof NavigationEnd) {
        this.showMobileMenuButton = (this._router.url.match(/^\/documentation|guides\//)) ? true : false;
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
