/** Skips the write (and the style invalidation it triggers) when the value is unchanged. */
export function setStyleVarIfChanged(
  el: HTMLElement | null | undefined,
  name: string,
  value: string,
): void {
  if (el && el.style.getPropertyValue(name) !== value) {
    el.style.setProperty(name, value);
  }
}
