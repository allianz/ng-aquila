import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NxvNavigationService {
    constructor(private readonly _router: Router) {}

    isNavigationWithinComponent(previousUrl: string, newUrl: string) {
        const componentViewExpression = /((guides|documentation))\/([^#/]+)/;

        const previousUrlMatch = previousUrl.match(componentViewExpression);
        const newUrlMatch = newUrl.match(componentViewExpression);
        return previousUrl && newUrl && previousUrlMatch && newUrlMatch && previousUrlMatch[0] === newUrlMatch[0];
    }

    /**
     * Listens to routing events and resets the scroll position
     * of the main container if necessary.
     */
    resetScrollPositionWatcher() {
        this._router.events
            .pipe(
                filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
                map(event => event.urlAfterRedirects),
                startWith(''),
                pairwise(),
            )
            .subscribe(([fromUrl, toUrl]) => {
                if (!this.isNavigationWithinComponent(fromUrl, toUrl)) {
                    const main = document.querySelector('main');
                    if (main) {
                        main.scrollTop = 0;
                    }
                }
            });
    }
}
