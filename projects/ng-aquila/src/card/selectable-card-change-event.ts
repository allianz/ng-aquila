import { NxSelectableCardComponent } from './selectable-card.component';

export class NxSelectableCardChangeEvent {
  constructor(
    /** The checked value of the selectable card. */
    public checked: boolean,
    /** The value of the selectable card. */
    public value: string,
    /** The component instance of the selectable card which emitted the change event. */
    public card: NxSelectableCardComponent
  ) {}
}
