import { effect, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { Router } from '@angular/router';

import { NxvVersionHashService } from '../../core/version-hash';

export interface Theme {
  name: string;
  displayName: string;
  url: string;
}

export const NX_DOCS_SELECTABLE_THEMES = new InjectionToken<Theme[]>('DOCS_SELECTABLE_THEMES');

const LOCAL_STORAGE_KEY = 'nx-docs-selected-theme';

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
  private readonly _themes = inject(NX_DOCS_SELECTABLE_THEMES);
  private readonly _router = inject(Router);
  private readonly _hashService = inject(NxvVersionHashService);
  readonly selectedTheme = signal<Theme>(this._themes[0]);

  constructor() {
    // Watch for theme changes and load the CSS
    effect(() => {
      const theme = this.selectedTheme();
      this._loadThemeCSS(theme);
    });
  }

  initializeTheme(themeFromQuery: Theme | undefined): void {
    // Priority: URL > localStorage > default
    if (themeFromQuery) {
      this.selectedTheme.set(themeFromQuery);
      this._saveToStorage(themeFromQuery);
    } else {
      const storedTheme = this._loadFromStorage();
      if (storedTheme) {
        this.selectedTheme.set(storedTheme);
      }
    }

    this._updateUrlQueryParam(this.selectedTheme());
  }

  switchTheme(newTheme: Theme) {
    this.selectedTheme.set(newTheme);
    this._saveToStorage(newTheme);
    this._updateUrlQueryParam(newTheme);
  }

  private _loadThemeCSS(newTheme: Theme) {
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
    head[0].appendChild(newEl);

    if (oldEl) {
      // el.remove() doesn't work on IE
      oldEl.parentNode?.removeChild(oldEl);
    }
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

  private _updateUrlQueryParam(theme: Theme): void {
    const currentHash = window.location.hash;
    this._router.navigate([], {
      queryParams: { theme: theme.name },
      queryParamsHandling: 'merge',
      replaceUrl: true,
      fragment: currentHash ? currentHash.substring(1) : undefined,
    });
  }
}
