import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';

/**
 * @title Register Icons Example
 */
@Component({
    selector: 'icon-registry-example',
    templateUrl: './icon-registry-example.html',
    styleUrls: ['./icon-registry-example.css'],
})
export class IconRegistryExampleComponent {
    constructor(
        private readonly nxIconRegistry: NxIconRegistry,
        domSanitizer: DomSanitizer,
    ) {
        this.nxIconRegistry.addSvgIconLiteral(
            'search',
            domSanitizer.bypassSecurityTrustHtml(
                '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="search"><rect width="24" height="24" opacity="0"/><path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"/></g></g></svg>',
            ),
        );

        this.nxIconRegistry.addSvgIcon(
            'setting',
            domSanitizer.bypassSecurityTrustResourceUrl(
                'assets/icons/settings.svg',
            ),
        );

        this.nxIconRegistry.registerFont('fa', 'fa', 'fa-');
    }
}
