import { Directive } from '@angular/core';

/**
 * Marks projected content as the info icon of a label.
 *
 * Place any info-icon implementation (the standard `nx-info-icon` or an
 * entity-specific component) inside an `nx-label` or `nx-formfield` and mark it
 * with this directive to have it rendered next to the label text. The projected
 * component keeps full control over its own API (popover direction, width,
 * modal behaviour, etc.).
 *
 * ```html
 * <nx-label>
 *   First name
 *   <nx-info-icon nxLabelInfo>Help text</nx-info-icon>
 * </nx-label>
 * ```
 */
@Directive({
  selector: '[nxLabelInfo]',
  standalone: true,
  host: {
    class: 'nx-label-info',
  },
})
export class NxLabelInfoDirective {}
