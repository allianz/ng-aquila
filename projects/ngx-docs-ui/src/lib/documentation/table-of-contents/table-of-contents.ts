import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DOCS_PRIVATE_CLASS_SELECTOR: string = '.docs-private';
const DOCS_PUBLIC_CLASS_SELECTOR: string = '.docs-public';

export interface Link {
    /* id of the section*/
    id: string;

    /* header type h3/h4 */
    type: string;

    /* name of the anchor */
    name: string;

    /* top offset px of the anchor */
    top: number;

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
    headerSelectors = '.docs-markdown--h2, .docs-api-h2, .docs-markdown--h3, .docs-markdown--h4, .docs-api-h3, .docs-api-h4';

    _rootUrl = this._router.url.split('#')[0];
    private _destroyed = new Subject();
    private _urlFragment = '';
    scrollingSubscription: any;

    constructor(private _router: Router, private _route: ActivatedRoute, private _element: ElementRef, @Inject(DOCUMENT) private _document: any, private _cdRef: ChangeDetectorRef) {
        this._router.events.pipe(takeUntil(this._destroyed)).subscribe(event => {
            if (event instanceof NavigationEnd) {
                const rootUrl = _router.url.split('#')[0];
                if (rootUrl !== this._rootUrl) {
                    this.links = this.createLinks();
                    this._rootUrl = rootUrl;
                }
            }
        });

        this._route.fragment.pipe(takeUntil(this._destroyed)).subscribe(fragment => {
            this._urlFragment = fragment as string;

            const target = this._document.getElementById(this._urlFragment);
            if (target) {
                target.scrollIntoView();
            }
        });
    }

    ngAfterViewInit() {
        Promise.resolve().then(() => this.refresh());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
    }

    refresh(): void {
        this.links = this.createLinks();

        const target = this._document.getElementById(this._urlFragment);
        if (target) {
            target.scrollIntoView();
        }
        this._cdRef.detectChanges();
    }

    private createLinks(): Link[] {
        const links = [];
        const headers = Array.from(this._document.querySelectorAll(this.headerSelectors)) as HTMLElement[];

        if (headers.length) {
            for (const header of headers) {
                // remove the 'link' icon name from the inner text
                const name = header.innerText.trim().replace(/^link/, '');
                const { top } = header.getBoundingClientRect();
                links.push({
                    name,
                    type: header.tagName.toLowerCase(),
                    top,
                    id: header.id,
                    private: header.matches(`${DOCS_PRIVATE_CLASS_SELECTOR} .${header.classList[0]}`),
                    public: header.matches(`${DOCS_PUBLIC_CLASS_SELECTOR} .${header.classList[0]}`),
                });
            }
        }
        return links;
    }
}
