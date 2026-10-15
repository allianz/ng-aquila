import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxHeaderModule } from '@allianz/ng-aquila/header';
import { NxIconModule, NxIconRegistry } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule, NxMessageToastService } from '@allianz/ng-aquila/message';
import { AsyncPipe, DOCUMENT, NgComponentOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Inject,
  inject,
  InjectionToken,
  OnDestroy,
  Optional,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  NX_ANNOUNCEMENT,
  NX_DOCS_GITHUB_LINK,
  NX_DOCS_HEADER_SLOT,
  NX_DOCS_LOGO_PATH,
} from '../core/tokens';
import { GithubLinkConfig, LogoPath, NxAnnouncement } from '../core/types';
import { ManifestService } from '../service/manifest.service';
import { NxVersionSelectComponent } from './component-documentation/version-select/version-select.component';
import { CssVarSidebarComponent } from './css-vars-sandbox/css-var-sidebar-component';
import { Egg } from './egg';
import { RabbitHole } from './rabbit-hole.service';
import { NxvSearchInputComponent } from './search-input/search-input.component';
import { NxvThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { GridType, ThemeSwitcherService } from './theme-switcher/theme-switcher.service';

export class NxDocFeatures {
  themeSwitcher = false;
}

export const NX_DOCS_FEATURE_FLAGS = new InjectionToken<NxDocFeatures>('NX_DOCS_FEATURE_FLAGS');

const HIDDEN_THEMES_PHRASES = ['scary', 'halloween'];
const MAX_PHRASE_LENGTH = Math.max(...HIDDEN_THEMES_PHRASES.map((p) => p.length));
const HALLOWEEN_FLYBY_DURATION = 20000;

@Component({
  selector: 'nxv-viewer',
  templateUrl: 'documentation-frame.component.html',
  styleUrls: ['./documentation-frame.scss'],
  host: {
    '[class.hide-nav]': 'hideNavigation',
    '[style.padding-top.px]': 'showAnnouncement ? 120 : null',
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxHeaderModule,
    NxErrorModule,
    NxLinkModule,
    NxMessageModule,
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
  mobileSearch = viewChild<NxvSearchInputComponent>('mobileSearch');
  private readonly _hiddenThemeToast = viewChild.required<TemplateRef<unknown>>('hiddenThemeToast');

  readonly mobileSearchOpen = signal(false);

  protected readonly _showHalloweenFlyby = signal(false);

  openMobileSearch() {
    this.mobileSearchOpen.set(true);
    // Focus after the overlay is rendered so the keyboard opens on touch devices.
    queueMicrotask(() => this.mobileSearch()?.focusInput());
  }

  closeMobileSearch() {
    this.mobileSearchOpen.set(false);
  }

  readonly isA1DarkTheme = computed(() => {
    const name = this._themeSwitcherService.selectedTheme().name;
    return name.includes('allianz-one') && name.includes('dark');
  });

  protected readonly _isHalloweenTheme = computed(() =>
    this._themeSwitcherService.selectedTheme().name.includes('halloween'),
  );

  private readonly _document = inject(DOCUMENT);

  private readonly _messageToast = inject(NxMessageToastService);

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
    const gridTypeQuery = this._route.snapshot.queryParamMap.get('gridType') as GridType | null;

    const themeFromQuery = themeQuery ? this._themeSwitcherService.get(themeQuery) : undefined;
    const gridTypeFromQuery =
      gridTypeQuery === 'default' || gridTypeQuery === 'functional' ? gridTypeQuery : undefined;
    this._themeSwitcherService.initializeTheme(themeFromQuery, gridTypeFromQuery);

    this._rabbitHole.showThemeEgg.pipe(takeUntil(this._destroyed)).subscribe((showTheming) => {
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

    let typed = '';
    fromEvent<KeyboardEvent>(this._document, 'keydown')
      .pipe(takeUntil(this._destroyed))
      .subscribe((event) => {
        if (event.key.length !== 1) {
          return;
        }
        typed = (typed + event.key.toLowerCase()).slice(-MAX_PHRASE_LENGTH);
        if (HIDDEN_THEMES_PHRASES.some((phrase) => typed.endsWith(phrase))) {
          if (this._themeSwitcherService.unlockHiddenThemes()) {
            this._messageToast.openFromTemplate(this._hiddenThemeToast(), { duration: 8000 });
          }
        }
      });

    effect(() => {
      this._document.body.classList.toggle('nxv-halloween', this._isHalloweenTheme());
    });

    effect((onCleanup) => {
      if (!this._isHalloweenTheme()) {
        return;
      }
      this._showHalloweenFlyby.set(true);
      const timeout = setTimeout(
        () => this._showHalloweenFlyby.set(false),
        HALLOWEEN_FLYBY_DURATION,
      );
      onCleanup(() => {
        clearTimeout(timeout);
        this._showHalloweenFlyby.set(false);
      });
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

    this._router.events.forEach((event) => {
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

  ngAfterViewInit(): void {
    this.hideEggs();
  }

  onSubmit() {
    const reader = new FileReader();

    reader.onload = (result) => {
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
        attributes.forEach((attr) => el.removeAttribute(attr));
      }
    }
  }

  ngOnDestroy(): void {
    this._document.body.classList.remove('nxv-halloween');
    this._destroyed.next();
    this._destroyed.complete();
  }
}
