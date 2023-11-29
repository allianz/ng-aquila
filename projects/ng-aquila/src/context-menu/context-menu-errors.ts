/**
 * Throws an exception for the case when menu trigger doesn't have a valid nx-context-menu instance
 * @docs-private
 */
export function throwNxContextMenuMissingError() {
    throw Error(`nxContextMenuTriggerFor: must pass in an nx-context-menu instance.
    Example:
      <nx-context-menu #contextMenu="nxContextMenu"></nx-context-menu>
      <button [nxContextMenuTriggerFor]="contextMenu"></button>`);
}
