import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export interface Theme {
    name: string;
    displayName: string;
    url: string;
}

export const NX_DOCS_SELECTABLE_THEMES = new InjectionToken<Theme[]>('DOCS_SELECTABLE_THEMES');

@Injectable({ providedIn: 'root' })
export class ThemeSwitcherService {
    readonly themeChanged = new Subject<Theme>();
    private _selectedTheme!: Theme;

    constructor(@Inject(NX_DOCS_SELECTABLE_THEMES) private readonly _themes: Theme[]) {}

    switchTheme(newTheme: Theme) {
        if (this._selectedTheme === newTheme) {
            return;
        }

        this._selectedTheme = newTheme;

        // get the theme link element
        const oldEl = document.getElementById('docs-theme');

        // because the css-vars-ponyfill watches for added and removed styles we cannot
        // just change the href of the link element
        // instead we have to create a new one, append it and remove the old one that the ponyfill
        // registers the changes and gets triggered
        // update: css-vars-ponyfill has been removed with angular 13 (ie11 no longer supported)
        const newEl = document.createElement('link');
        newEl.setAttribute('rel', 'stylesheet');
        newEl.setAttribute('href', newTheme.url);
        newEl.setAttribute('id', 'docs-theme');
        newEl.onload = () => this.themeChanged.next(this._selectedTheme);

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
        this.switchTheme(this._selectedTheme);
    }

    themes(): Theme[] {
        return this._themes;
    }

    selectedTheme(): Theme {
        return this._selectedTheme;
    }

    get(name: string) {
        return this._themes.find(el => el.name === name);
    }
}
