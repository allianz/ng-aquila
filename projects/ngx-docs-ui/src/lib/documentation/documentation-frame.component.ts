import { AfterViewInit, Component, Inject, InjectionToken, OnDestroy, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NX_ANNOUNCEMENT, NX_DOCS_GITHUB_LINK, NX_DOCS_LOGO_PATH } from '../core/tokens';
import { GithubLinkConfig, LogoPath, NxAnnouncement } from '../core/types';
import { ManifestService } from '../service/manifest.service';
import { CssVarSidebarComponent } from './css-vars-sandbox/css-var-sidebar-component';
import { Egg } from './egg';
import { RabbitHole } from './rabbit-hole.service';
import { Theme, ThemeSwitcherService } from './theme-switcher/theme-switcher.service';

export class NxDocFeatures {
    themeSwitcher = false;
}

export const NX_DOCS_FEATURE_FLAGS = new InjectionToken<NxDocFeatures>('NX_DOCS_FEATURE_FLAGS');

@Component({
    selector: 'nxv-viewer',
    templateUrl: 'documentation-frame.component.html',
    styleUrls: ['./documentation-frame.scss'],
    host: {
        '[class.hide-nav]': 'hideNavigation',
        '[style.padding-top.px]': 'showAnnouncement ? 120 : null',
    },
})
export class DocumentationFrameComponent implements OnDestroy, AfterViewInit {
    manifestFile!: Blob;
    selectedTheme: Theme;
    themes: Theme[];

    mobileSidebar = false;

    showThemingSwitcher = false;
    // TODO set this according to the calling application (injection token?), always there right now
    showThemingSidebar = false;

    showMobileMenuButton = false;

    showAnnouncement = false;

    hideNavigation = false;

    @ViewChild(CssVarSidebarComponent)
    cssVarSidebar!: CssVarSidebarComponent;

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly manifestService: ManifestService,
        private readonly _rabbitHole: RabbitHole,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        private readonly _themeSwitcherService: ThemeSwitcherService,
        private readonly iconRegistry: NxIconRegistry,
        @Optional() @Inject(NX_DOCS_FEATURE_FLAGS) private readonly _featureFlags: NxDocFeatures | null,
        @Inject(NX_DOCS_LOGO_PATH) readonly logoPath: LogoPath,
        @Inject(NX_DOCS_GITHUB_LINK) readonly githubLinkConfig: GithubLinkConfig,
        @Optional() @Inject(NX_ANNOUNCEMENT) readonly announcement: NxAnnouncement,
    ) {
        this.themes = this._themeSwitcherService.themes();
        this.showThemingSwitcher = this._featureFlags ? this._featureFlags.themeSwitcher : false;
        this.showAnnouncement = this.announcement && this.announcement?.endTime >= new Date();

        const themeQuery = this._route.snapshot.queryParamMap.get('theme');
        const themeFromQuery = this._themeSwitcherService.get(themeQuery!);
        if (themeFromQuery) {
            this.selectedTheme = themeFromQuery;
            this._themeSwitcherService.switchTheme(this.selectedTheme);
        } else {
            this.selectedTheme = this.themes[0];
        }

        this._rabbitHole.showThemeEgg.pipe(takeUntil(this._destroyed)).subscribe(showTheming => {
            if (showTheming) {
                this._themeSwitcherService.switchTheme(this.selectedTheme);
            } else if (themeFromQuery) {
                this._themeSwitcherService.switchTheme(themeFromQuery);
            } else {
                this._themeSwitcherService.removeTheming();
            }
            if (!this._featureFlags?.themeSwitcher) {
                this.showThemingSwitcher = showTheming;
            }
            this.showThemingSidebar = showTheming;
        });

        this.hideNavigation = !!this._route.snapshot.queryParamMap.get('hideNav');

        this._themeSwitcherService.themeChanged.pipe(takeUntil(this._destroyed)).subscribe(theme => {
            this.selectedTheme = theme;
            if (this.cssVarSidebar) {
                this.cssVarSidebar.reset();
            }
        });

        this.iconRegistry.registerFont('fa', 'fas', 'fa-');
        this.iconRegistry.addFontIcon('bars', 'bars', 'fa');

        this._router.events.forEach(event => {
            // hide the mobile sidebar every time the route changes
            if (event instanceof NavigationStart) {
                this.mobileSidebar = false;
            }
            // show the mobile menu button only when a documenation or a guide page is shown
            if (event instanceof NavigationEnd) {
                this.showMobileMenuButton = !!this._router.url.match(/^\/documentation|guides\//);
            }
        });
    }

    selectTheme(theme: Theme) {
        this.selectedTheme = theme;
        this._themeSwitcherService.switchTheme(theme);
    }

    ngAfterViewInit(): void {
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

    onFileChange(event: any) {
        this.manifestFile = event.currentTarget.files[0];
    }

    hideEggs() {
        new Egg()
            .addCode(
                'left,t,right',
                () => {
                    this._rabbitHole.toggleTheming();
                },
                undefined,
            )
            .listen();
    }

    clearStyleTags(tags: HTMLCollection) {
        const attributes = ['data-cssvars', 'data-cssvars-job', 'data-cssvars-group'];
        for (let i = 0; i < tags.length; i++) {
            const el = tags[i];
            const dataCssVarAttr = el.getAttribute('data-cssvars');
            if (dataCssVarAttr && dataCssVarAttr === 'out') {
                el.parentNode?.removeChild(el);
            } else {
                attributes.forEach(attr => el.removeAttribute(attr));
            }
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}
