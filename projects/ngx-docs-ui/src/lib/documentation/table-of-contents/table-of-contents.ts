import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DOCS_PRIVATE_CLASS_SELECTOR = '.docs-private';
const DOCS_PUBLIC_CLASS_SELECTOR = '.docs-public';

export interface Link {
    /* id of the section*/
    id: string;

    /* header type h3/h4 */
    type: string;

    /* name of the anchor */
    name: string;

    /* If the anchor should be available only for private packages */
    private: boolean;

    /* If the anchor should only be shown in the public documentation. */
    public: boolean;
}

@Component({
    selector: 'nxv-table-of-contents',
    styleUrls: ['./table-of-contents.scss'],
    templateUrl: './table-of-contents.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxvTableOfContentsComponent implements OnDestroy, AfterViewInit {
    @Input() container!: string;

    links: Link[] = [];

    _rootUrl = this._router.url.split('#')[0];

    headerSelectors = '.docs-markdown--h2, .docs-api-h2, .docs-markdown--h3, .docs-markdown--h4, .docs-api-h3, .docs-api-h4';

    private readonly _urlFragment = '';
    scrollingSubscription: any;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        @Inject(DOCUMENT) private readonly _document: Document,
        private readonly _cdr: ChangeDetectorRef,
    ) {
        this._router.events.pipe(takeUntil(this._destroyed)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                const rootUrl = _router.url.split('#')[0];
                if (rootUrl !== this._rootUrl) {
                    this.refresh();
                    this._rootUrl = rootUrl;
                }
            }
        });
    }

    scrollIntoview(id: string | null) {
        if (!id) {
            return;
        }
        this._document.getElementById(id)?.scrollIntoView();
    }

    ngAfterViewInit(): void {
        Promise.resolve().then(() => this.refresh());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    refresh(): void {
        this.links = this.createLinks();

        this.scrollIntoview(this._route.snapshot.fragment);
        this._cdr.detectChanges();
    }

    private createLinks(): Link[] {
        if (this._rootUrl === '/guides/CHANGELOG') {
            return [];
        }

        const links = [];
        const headers = Array.from(this._document.querySelectorAll(this.headerSelectors)) as HTMLElement[];

        if (headers.length) {
            for (const header of headers) {
                // remove the 'link' icon name from the inner text
                const name = header.innerText.trim().replace(/^link/, '');
                links.push({
                    name,
                    type: header.tagName.toLowerCase(),
                    id: header.id,
                    private: header.matches(`${DOCS_PRIVATE_CLASS_SELECTOR} .${header.classList[0]}`),
                    public: header.matches(`${DOCS_PUBLIC_CLASS_SELECTOR} .${header.classList[0]}`),
                });
            }
        }
        return links;
    }
}
