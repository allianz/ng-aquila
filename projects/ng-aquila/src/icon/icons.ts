import { HttpClient } from '@angular/common/http';
import { SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { finalize, map, share } from 'rxjs/operators';

import { NxIconFontDefinition } from './icon-registry';

export class NxSvgIcon {
    svgElement: SVGElement | undefined;

    constructor(
        protected readonly _httpClient: HttpClient | null,
        protected readonly _sanitizer: DomSanitizer,
        protected readonly _document: Document,
    ) {}

    /** Returns the content. */
    getContent(): Observable<SVGElement | undefined> {
        return of(this.svgElement);
    }

    protected _svgElementFromString(str: string): SVGElement {
        const div = this._document.createElement('DIV');
        div.innerHTML = str;
        const svg = div.querySelector('svg') as SVGElement;

        if (!svg) {
            throw Error('<svg> tag not found');
        }

        return svg;
    }
}

export class NxSvgIconLiteral extends NxSvgIcon {
    constructor(data: SafeHtml, _httpClient: HttpClient | null, _sanitizer: DomSanitizer, _document: Document) {
        super(_httpClient, _sanitizer, _document);
        const sanitizedLiteral = this._sanitizer.sanitize(SecurityContext.HTML, data);

        if (!sanitizedLiteral) {
            throw Error(`The literal provided to NxIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${data}".`);
        }

        this.svgElement = this._svgElementFromString(sanitizedLiteral);
    }
}

export class NxSvgIconFromUrl extends NxSvgIcon {
    url: string;

    protected _httpClient: HttpClient;

    // used to not send multiple requests for the same url
    private _pendingRequest?: Observable<any>;

    constructor(safeUrl: SafeResourceUrl, _httpClient: HttpClient | null, _sanitizer: DomSanitizer, _document: Document) {
        super(_httpClient, _sanitizer, _document);

        this.url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl)!;

        if (!this.url) {
            throw Error(`The URL provided to NxIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${safeUrl}".`);
        }
        if (!_httpClient) {
            throw Error(
                'Could not find HttpClient provider for using a SVG url in the nx-icon registry. ' +
                    'Please include the HttpClientModule from @angular/common/http in your app imports.',
            );
        }
        this._httpClient = _httpClient;
    }

    /** Returns the content. If the SVG is not already loaded it fetches the SVG from icons' URL */
    getContent(): Observable<SVGElement> {
        return this._loadSvgIcon();
    }

    private _loadSvgIcon() {
        // If the SVG for this icon has already been parsed, do nothing.
        if (this.svgElement) {
            return of(this.svgElement);
        }

        return this._fetchUrl(this.url).pipe(
            map(svgText => {
                // It is possible that the icon was parsed and cached by an earlier request, so parsing
                // only needs to occur if the cache is yet unset.
                if (!this.svgElement) {
                    this.svgElement = this._svgElementFromString(svgText);
                }

                return this.svgElement;
            }),
        );
    }

    /**
     * Returns an Observable which produces the string contents of the given URL. Results may be
     * cached, so future calls with the same URL may not cause another HTTP request.
     */
    private _fetchUrl(url: string): Observable<string> {
        // Store in-progress fetches to avoid sending a duplicate request for a URL when there is
        // already a request in progress for that URL. It's necessary to call share() on the
        // Observable returned by http.get() so that multiple subscribers don't cause multiple XHRs.
        if (this._pendingRequest) {
            return this._pendingRequest;
        }

        const req = this._httpClient.get(url, { responseType: 'text' }).pipe(
            finalize(() => {
                this._pendingRequest = undefined;
            }),
            share(),
        );

        this._pendingRequest = req;
        return req;
    }
}

export class NxFontIcon {
    constructor(
        readonly alias: string,
        readonly font: NxIconFontDefinition,
    ) {}

    getClasses() {
        return { alias: this.alias, font: this.font };
    }
}
