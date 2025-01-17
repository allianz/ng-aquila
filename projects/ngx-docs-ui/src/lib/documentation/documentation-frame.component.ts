import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, effect, Inject, InjectionToken, OnDestroy, Optional, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxIconModule, NxIconRegistry } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NX_ANNOUNCEMENT, NX_DOCS_GITHUB_LINK, NX_DOCS_HEADER_SLOT, NX_DOCS_LOGO_PATH } from '../core/tokens';
import { GithubLinkConfig, LogoPath, NxAnnouncement } from '../core/types';
import { ManifestService } from '../service/manifest.service';
import { NxVersionSelectComponent } from './component-documentation/version-select/version-select.component';
import { CssVarSidebarComponent } from './css-vars-sandbox/css-var-sidebar-component';
import { Egg } from './egg';
import { RabbitHole } from './rabbit-hole.service';
import { NxvSearchInputComponent } from './search-input/search-input.component';
import { NxvThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
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
    imports: [
        NxHeaderModule,
        NxErrorModule,
        NxLinkModule,
        RouterLink,
        RouterLinkActive,
        NxvSearchInputComponent,
        NxvThemeSwitcherComponent,
        NxVersionSelectComponent,
        NgComponentOutlet,
        NxButtonModule,
        NxIconModule,
        RouterOutlet,
        FormsModule,
        CssVarSidebarComponent,
        AsyncPipe,
    ],
})
export class DocumentationFrameComponent implements OnDestroy, AfterViewInit {
    manifestFile!: Blob;
    mobileSidebar = false;

    showThemingSwitcher = false;
    // TODO set this according to the calling application (injection token?), always there right now
    showThemingSidebar = false;

    showMobileMenuButton = false;

    showAnnouncement = false;

    hideNavigation = false;

    cssVarSidebar = viewChild(CssVarSidebarComponent);

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly manifestService: ManifestService,
        private readonly _rabbitHole: RabbitHole,
        private readonly _route: ActivatedRoute,
        private readonly _router: Router,
        protected readonly _themeSwitcherService: ThemeSwitcherService,
        private readonly iconRegistry: NxIconRegistry,
        @Optional() @Inject(NX_DOCS_FEATURE_FLAGS) private readonly _featureFlags: NxDocFeatures | null,
        @Inject(NX_DOCS_LOGO_PATH) readonly logoPath: LogoPath,
        @Inject(NX_DOCS_GITHUB_LINK) readonly githubLinkConfig: GithubLinkConfig,
        @Optional() @Inject(NX_DOCS_HEADER_SLOT) readonly headerSlot: { new (): Component },
        @Optional() @Inject(NX_ANNOUNCEMENT) readonly announcement: NxAnnouncement,
    ) {
        this.showThemingSwitcher = this._featureFlags ? this._featureFlags.themeSwitcher : false;
        this.showAnnouncement = this.announcement && this.announcement?.endTime >= new Date();

        const themeQuery = this._route.snapshot.queryParamMap.get('theme');
        const themeFromQuery = this._themeSwitcherService.get(themeQuery!);
        if (themeFromQuery) {
            this._themeSwitcherService.switchTheme(themeFromQuery);
        }

        this._rabbitHole.showThemeEgg.pipe(takeUntil(this._destroyed)).subscribe(showTheming => {
            console.log('rabbit hole', showTheming);
            if (showTheming) {
                this._themeSwitcherService.switchTheme(this._themeSwitcherService.selectedTheme());
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

        effect(() => {
            if (this.cssVarSidebar()) {
                this.cssVarSidebar()?.reset();
            }
        });

        effect(() => {
            // we need this that the effect fires
            const theme = this._themeSwitcherService.selectedTheme();
            if (this.cssVarSidebar()) {
                this.cssVarSidebar()?.reset();
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
