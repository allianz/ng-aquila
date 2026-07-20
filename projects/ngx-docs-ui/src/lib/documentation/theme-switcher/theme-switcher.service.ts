import { LAYOUT_DEFAULT_OPTIONS, LayoutDefaultOptions } from '@allianz/ng-aquila/grid';
import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NxvVersionHashService } from '../../core/version-hash';

export interface Theme {
  name: string;
  displayName: string;
  url: string;
}

export type GridType = 'default' | 'functional';

export const NX_DOCS_SELECTABLE_THEMES = new InjectionToken<Theme[]>('DOCS_SELECTABLE_THEMES');

const LOCAL_STORAGE_KEY = 'nx-docs-selected-theme';
const LOCAL_STORAGE_GRID_TYPE_KEY = 'nx-docs-selected-grid-type';
const DEFAULT_THEME_NAME = 'allianz-one-compact';

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
  private readonly _themes = inject(NX_DOCS_SELECTABLE_THEMES);
  private readonly _router = inject(Router);
  private readonly _hashService = inject(NxvVersionHashService);
  readonly selectedTheme = signal<Theme>(
    this._themes.find((t) => t.name === DEFAULT_THEME_NAME) ?? this._themes[0],
  );
  readonly selectedGridType = signal<GridType>('default');
  readonly isThemeLoading = signal<boolean>(false);

  private readonly layoutOptions = inject<LayoutDefaultOptions>(LAYOUT_DEFAULT_OPTIONS, {
    optional: true,
  });

  initializeTheme(
    themeFromQuery: Theme | undefined,
    gridTypeFromQuery: GridType | undefined,
  ): void {
    // Priority: URL > localStorage > default
    if (themeFromQuery) {
      this.selectedTheme.set(themeFromQuery);
      this._saveToStorage(themeFromQuery);
      this._loadThemeCSS(themeFromQuery);
    } else {
      const storedTheme = this._loadFromStorage();
      if (storedTheme) {
        this.selectedTheme.set(storedTheme);
        this._loadThemeCSS(storedTheme);
      } else {
        this._loadThemeCSS(this.selectedTheme());
      }
    }

    if (gridTypeFromQuery) {
      this.selectedGridType.set(gridTypeFromQuery);
      this._saveGridTypeToStorage(gridTypeFromQuery);
      this._setGridAppearance(gridTypeFromQuery);
    } else {
      const storedGridType = this._loadGridTypeFromStorage();
      if (storedGridType) {
        this.selectedGridType.set(storedGridType);
        this._setGridAppearance(storedGridType);
      }
    }

    this._updateUrlQueryParams(this.selectedTheme(), this.selectedGridType());
  }

  switchTheme(newTheme: Theme) {
    const previousTheme = this.selectedTheme();
    this.selectedTheme.set(newTheme);
    this._saveToStorage(newTheme);
    this._updateUrlQueryParams(newTheme, this.selectedGridType());
    this._loadThemeCSS(newTheme, previousTheme);
  }

  switchGridType(newGridType: GridType) {
    this.selectedGridType.set(newGridType);
    this._saveGridTypeToStorage(newGridType);
    this._updateUrlQueryParams(this.selectedTheme(), newGridType);
    this._setGridAppearance(newGridType);
  }

  private _setGridAppearance(gridType: GridType) {
    if (this.layoutOptions) {
      this.layoutOptions.appearance.set(gridType === 'functional' ? 'functional' : 'default');
    }
  }

  private _loadThemeCSS(newTheme: Theme, previousTheme?: Theme) {
    // get the theme link element
    const oldEl = document.getElementById('docs-theme');

    // because the css-vars-ponyfill watches for added and removed styles we cannot
    // just change the href of the link element
    // instead we have to create a new one, append it and remove the old one that the ponyfill
    // registers the changes and gets triggered
    // update: css-vars-ponyfill has been removed with angular 13 (ie11 no longer supported)
    const newEl = document.createElement('link');
    newEl.setAttribute('rel', 'stylesheet');
    newEl.setAttribute('href', this._hashService.appendVersion(newTheme.url));
    newEl.setAttribute('id', 'docs-theme');

    const head = document.getElementsByTagName('head');

    this.isThemeLoading.set(true);
    newEl.addEventListener(
      'load',
      () => {
        // Remove the old theme only after the new CSS has loaded to avoid a flash
        // of unstyled content caused by the gap between removal and new CSS paint.
        oldEl?.parentNode?.removeChild(oldEl);
        this.isThemeLoading.set(false);
      },
      { once: true },
    );
    newEl.addEventListener(
      'error',
      () => {
        // The new stylesheet never loaded, so the old theme's CSS is still what's
        // rendered on screen. Roll back the selected theme (and its persisted state)
        // to match what's actually visible, instead of claiming the new theme applied.
        newEl.parentNode?.removeChild(newEl);
        if (previousTheme) {
          this.selectedTheme.set(previousTheme);
          this._saveToStorage(previousTheme);
          this._updateUrlQueryParams(previousTheme, this.selectedGridType());
        }
        this.isThemeLoading.set(false);
      },
      { once: true },
    );

    head[0].appendChild(newEl);
  }

  removeTheming() {
    const oldEl = document.getElementById('docs-theme');
    oldEl?.parentNode?.removeChild(oldEl as Node);
  }

  reset() {
    this.switchTheme(this.selectedTheme());
  }

  themes(): Theme[] {
    return this._themes;
  }

  get(name: string) {
    return this._themes.find((el) => el.name === name);
  }

  private _saveToStorage(theme: Theme): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme.name);
    } catch {
      // graceful if localStorage unavailable (private browsing, etc.)
    }
  }

  private _loadFromStorage(): Theme | undefined {
    try {
      const storedName = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedName ? this.get(storedName) : undefined;
    } catch {
      return undefined;
    }
  }

  private _saveGridTypeToStorage(gridType: GridType): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_GRID_TYPE_KEY, gridType);
    } catch {
      // graceful if localStorage unavailable (private browsing, etc.)
    }
  }

  private _loadGridTypeFromStorage(): GridType | undefined {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_GRID_TYPE_KEY);
      return stored === 'default' || stored === 'functional' ? stored : undefined;
    } catch {
      return undefined;
    }
  }

  private _updateUrlQueryParams(theme: Theme, gridType: GridType): void {
    const currentHash = window.location.hash;
    this._router.navigate([], {
      queryParams: { theme: theme.name, gridType },
      queryParamsHandling: 'merge',
      replaceUrl: true,
      fragment: currentHash ? currentHash.substring(1) : undefined,
    });
  }
}
