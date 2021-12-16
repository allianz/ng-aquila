import { Directive } from '@angular/core';

/**
 * Interface for any kind of button that should be active while
 * an overlay is open.
 */
@Directive()
export abstract class NxTriggerButton {
    /** Applies active styles to the button. */
    abstract setTriggerActive(): void;
    /** Applies or unsets inactive styles to the button. */
    abstract setTriggerInactive(): void;
}
