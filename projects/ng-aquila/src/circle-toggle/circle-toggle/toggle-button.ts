/** @docs-private */
export abstract class ToggleButton {
  id;
  value;
  checked;
  name;
  negative;
  disabled;
  tabIndex;
  checkedChange;
  selectionChange;
  toggleButton;
  abstract toggle(event);
  abstract setGroupSelection();

}
