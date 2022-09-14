import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NxIconRegistry } from '@aposin/ng-aquila/icon';

// play-circle-fill from https://remixicon.com/
const playSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"/></svg>';

/**
 * @title Essential Icon Override Example
 */
@Component({
    selector: 'icon-essential-override-example',
    templateUrl: './icon-essential-override-example.html',
    styleUrls: ['./icon-essential-override-example.css'],
    providers: [
        // we only use the provider here to get a scoped instance of the NxIconRegistry
        // only for this example that the rest of the documentation examples are not affected
        NxIconRegistry,
    ],
})
export class IconEssentialOverrideExampleComponent {
    constructor(
        readonly iconRegistry: NxIconRegistry,
        sanitizer: DomSanitizer,
    ) {
        // override it with another SVG
        this.iconRegistry.addSvgIconLiteral(
            'play',
            sanitizer.bypassSecurityTrustHtml(playSvg),
        );

        // override an icon with a font, here we take font awesome
        // we register the font first and override the 'calendar' icon
        // of ng-aquila with the 'calendar-week' icon of font awesome
        this.iconRegistry.registerFont('fa', 'fas', 'fa-');
        this.iconRegistry.addFontIcon('calendar', 'calendar-week', 'fa');
    }
}
