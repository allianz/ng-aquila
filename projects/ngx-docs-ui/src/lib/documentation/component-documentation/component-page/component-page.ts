import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Inject, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManifestService } from '../../../service/manifest.service';
import { ComponentDescriptor } from '../../../core/manifest';
import { ComponentService } from '../../../service/component.service';
import { NXV_FEEDBACK_LINKS } from '../../../core/tokens';

export interface DocItem {
    id: string;
    name: string;
    packageName?: string;
    examples?: string[];
}

@Component({
    selector: 'nxv-single-component',
    templateUrl: 'component-page.html',
    styleUrls: ['component-page.scss'],
})
export class NxvComponentPage {
    componentDescriptor!: ComponentDescriptor;

    tabs = [
        {
            label: 'overview',
            path: 'overview',
            show: true,
        },
        {
            label: 'api',
            path: 'api',
            show: true,
        },
        {
            label: 'examples',
            path: 'examples',
            show: true,
        },
    ];

    private _destroyed = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private router: Router,
        private manifestService: ManifestService,
        public componentService: ComponentService,
        @Optional() @Inject(NXV_FEEDBACK_LINKS) public feedbackLinks: any,
    ) {
        // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
        // parent route for the section (material/cdk).
        _route.params
            .pipe(
                map(param => param.id),
                takeUntil(this._destroyed),
            )
            .subscribe(id => {
                if (this.manifestService.hasComponent(id)) {
                    componentService.current.next(this.manifestService.getComponent(id));
                } else {
                    // go to overview if not found
                    this.router.navigate(['/']);
                }
            });

        componentService.current
            .pipe(
                filter(current => Boolean(current)),
                takeUntil(this._destroyed),
            )
            .subscribe(component => {
                const apiTab = this.tabs.find(tab => tab.label === 'api');
                if (apiTab) {
                    apiTab.show = component.noApi ? false : true;
                }
            });
    }

    get activeTabs() {
        return this.tabs.filter(tab => tab.show);
    }
}
