import { NxSelectableCardComponent } from './selectable-card.component';

export class NxSelectableCardChangeEvent {
    constructor(
        /** The checked value of the selectable card. */
        readonly checked: boolean,
        /** The value of the selectable card. */
        readonly value: string,
        /** The component instance of the selectable card which emitted the change event. */
        readonly card: NxSelectableCardComponent,
    ) {}
}
