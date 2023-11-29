import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

import { DEFAULT_ICONS } from './default-icons';
import { NxFontIcon, NxSvgIcon, NxSvgIconFromUrl, NxSvgIconLiteral } from './icons';

export function throwNxIconNotFoundError(iconName: string) {
    throw Error(`Could not find icon with name ${iconName}`);
}

export class NxIconFontDefinition {
    constructor(
        readonly hostClass: string,
        readonly prefix: string = '',
    ) {}
}

@Injectable({ providedIn: 'root' })
export class NxIconRegistry implements OnDestroy {
    private readonly _icons = new Map<string, NxSvgIcon | NxFontIcon>();
    private readonly _fonts = new Map<string, NxIconFontDefinition>();

    private _defaultFont?: NxIconFontDefinition;

    constructor(
        @Optional() private readonly _httpClient: HttpClient | null,
        private readonly _sanitizer: DomSanitizer,
        @Inject(DOCUMENT) private readonly _document: Document,
    ) {
        // register default icons
        Object.entries(DEFAULT_ICONS).forEach(([icon, literal]) => {
            this.addSvgIconLiteral(icon, _sanitizer.bypassSecurityTrustHtml(literal));
        });
    }

    /**
     * Registers an icon using an HTML string.
     */
    addSvgIconLiteral(iconName: string, literal: SafeHtml) {
        this._icons.set(iconName, new NxSvgIconLiteral(literal, this._httpClient, this._sanitizer, this._document));
    }

    /**
     * Registers an icon by URL.
     */
    addSvgIcon(iconName: string, safeUrl: SafeResourceUrl) {
        if (safeUrl == null) {
            throw Error(`Cannot fetch icon from URL "${safeUrl}".`);
        }

        this._icons.set(iconName, new NxSvgIconFromUrl(safeUrl, this._httpClient, this._sanitizer, this._document));
    }

    /**
     * Only necessary to override an existing svg icon in the registry
     * with a font class. Useful to override the essential library icons.
     * To register an icon font in general use `registerFont` and
     * `setDefaultFontClass`.
     *
     * Example: you want to override the essential svg icon of the library `chevron-down`
     * with an icon from your icon font called 'arrow-down'. You would first register your
     * icon font:
     * `iconRegistry.registerFont('my-icons');`
     * `iconRegistry.setDefaultFontClass('my-icons');`
     * and then override the chevron-down icon in the registry:
     * `iconRegistry.addFontIcon('chevron-down', 'arrow-down');`
     */
    addFontIcon(iconName: string, alias?: string, fontName?: string) {
        let fontDefinition = this.getDefaultFont();
        if (fontName) {
            fontDefinition = this._fonts.get(fontName);
        }

        if (!fontDefinition) {
            throw Error(`Could not find a registered font with name ${fontName}.`);
        }

        this._icons.set(iconName, new NxFontIcon(alias!, fontDefinition));
    }

    /** Returns the icon from the registry or undefined if not found. */
    getIcon(iconName: string): NxSvgIcon | NxFontIcon | undefined {
        const icon = this._icons.get(iconName);
        return icon;
    }

    ngOnDestroy(): void {
        this._icons.clear();
    }

    /**
     * Register an icon font which can be used by the font input on the icon component.
     * @param name Custom name identifier.
     * @param hostClass The hostClass is the general class like `fa` and an optional prefix can be given.
     * @param prefix The prefix is helpful if your class name for the icon would be prefixed,
     * e.g. my-icons--heart but you still want to only use the name
     * <code>&lt;nx-icon name="heart" font="my-icons"&gt;&lt;/nx-icon&gt;</code>.
     */
    registerFont(name: string, hostClass?: string, prefix?: string) {
        // register the name in a map
        this._fonts.set(name, new NxIconFontDefinition(hostClass ? hostClass : name, prefix));
    }

    /**
     * Sets the font as the default font that is used when the font input
     * is omitted.
     */
    setDefaultFont(name: string) {
        const font = this.getFont(name);
        this._defaultFont = font;
    }

    /**
     * Returns the registered CSS class name.
     */
    getDefaultFont(): NxIconFontDefinition | undefined {
        return this._defaultFont;
    }

    /**
     * Returns the registered font by name.
     */
    getFont(fontName: string) {
        const font = this._fonts.get(fontName);
        if (!font) {
            throw Error(`Cannot find registered font with name ${fontName}`);
        }
        return font;
    }
}

/** Clones an SVGElement while preserving type information. */
export function cloneSvg(svg: SVGElement): SVGElement {
    return svg.cloneNode(true) as SVGElement;
}
