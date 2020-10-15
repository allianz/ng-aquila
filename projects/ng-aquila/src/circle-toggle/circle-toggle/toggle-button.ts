/** @docs-private */
export abstract class ToggleButton {
  abstract id;
  abstract value;
  abstract checked;
  abstract name;
  abstract negative;
  abstract disabled;
  abstract checkedChange;
  abstract selectionChange;
  abstract toggleButton;
  abstract toggle(event);
  abstract setGroupSelection();
}
