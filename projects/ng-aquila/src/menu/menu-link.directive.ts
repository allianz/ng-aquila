import { Directive } from '@angular/core';

/**
  This is a menu link.
  It adds styling to a link and is usually used within a [nxMenuItem].
 */
@Directive({
  selector: 'a[nxMenuLink]',
  host: {
    class: 'nx-menu__link'
  }
})
export class NxMenuLinkDirective {}
