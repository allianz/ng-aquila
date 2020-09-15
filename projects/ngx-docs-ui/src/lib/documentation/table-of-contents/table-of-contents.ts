import { Component, ElementRef, Inject, Input, OnInit, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

const DOCS_PRIVATE_CLASS_SELECTOR: string = '.docs-private';

export interface Link {
  /* id of the section*/
  id: string;

  /* header type h3/h4 */
  type: string;

  /* If the anchor is in view of the page */
  active: boolean;

  /* name of the anchor */
  name: string;

  /* top offset px of the anchor */
  top: number;

  /* If the anchor should be available only for private packages */
  private: boolean;
}

@Component({
  selector: 'nxv-table-of-contents',
  styleUrls: ['./table-of-contents.scss'],
  templateUrl: './table-of-contents.html'
})
export class NxvTableOfContentsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() links: Link[] = [];
  @Input() container: string;
  @Input() headerSelectors =
  '.docs-markdown--h2, .docs-api-h2, .docs-markdown--h3, .docs-markdown--h4, .docs-api-h3, .docs-api-h4';

  @Input() privateHeaderSelectors =
    `${DOCS_PRIVATE_CLASS_SELECTOR} .docs-markdown--h2,
     ${DOCS_PRIVATE_CLASS_SELECTOR} .docs-api-h2,
     ${DOCS_PRIVATE_CLASS_SELECTOR} .docs-markdown--h3,
     ${DOCS_PRIVATE_CLASS_SELECTOR} .docs-markdown--h4,
     ${DOCS_PRIVATE_CLASS_SELECTOR} .docs-api-h3,
     ${DOCS_PRIVATE_CLASS_SELECTOR} .docs-api-h4`;

  _rootUrl = this._router.url.split('#')[0];
  private _scrollContainer: any;
  private _destroyed = new Subject();
  private _urlFragment = '';
  scrollingSubscription: any;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _element: ElementRef,
    @Inject(DOCUMENT) private _document: any) {

    this._router.events.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const rootUrl = _router.url.split('#')[0];
        if (rootUrl !== this._rootUrl) {
          this.links = this.createLinks();
          this._rootUrl = rootUrl;
        }
      }
    });

    this._route.fragment.pipe(takeUntil(this._destroyed)).subscribe(fragment => {
      this._urlFragment = fragment;

      const target = this._document.getElementById(this._urlFragment);
      if (target) {
        target.scrollIntoView();
      }
    });
  }

  ngOnInit(): void {

    this._scrollContainer = this.container ? this._document.querySelectorAll(this.container)[0] : window;
    if (this._scrollContainer) {
      fromEvent(this._scrollContainer, 'scroll').pipe(
        takeUntil(this._destroyed),
        debounceTime(10))
        .subscribe(() => {
          this.onScroll();
        });
    }
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
  }

  /** Gets the scroll offset of the scroll container */
  private getScrollOffset(): number {
    const { top } = this._element.nativeElement.getBoundingClientRect();
    if (typeof this._scrollContainer.scrollTop !== 'undefined') {
      return this._scrollContainer.scrollTop + top;
    } else if (typeof this._scrollContainer.pageYOffset !== 'undefined') {
      return this._scrollContainer.pageYOffset + top;
    }
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
          active: false,
          private: header.matches(this.privateHeaderSelectors),
        });
      }
    }

    return links;
  }

  private onScroll(): void {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].active = this.isLinkActive(this.links[i], this.links[i + 1]);
    }
  }

  private isLinkActive(currentLink: any, nextLink: any): boolean {
    // A link is considered active if the page is scrolled passed the anchor without also
    // being scrolled passed the next link
    const scrollOffset = this.getScrollOffset();
    return scrollOffset >= currentLink.top && !(nextLink && nextLink.top < scrollOffset);
  }
}
