/** @docs-private */
export abstract class ToggleButton {
    abstract id: string;
    abstract value: string;
    abstract checked: boolean;
    abstract name: string;
    abstract negative: boolean;
    abstract disabled: boolean;
    abstract checkedChange: any;
    abstract selectionChange: any;
    abstract toggleButton: any;
    abstract toggle(event: Event): any;
    abstract setGroupSelection(): any;
}
