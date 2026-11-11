/**
 * Returns an exception to be thrown when `nxVirtualGroupOutlet` is used outside of the
 * group template of `nxVirtualFor`.
 * @docs-private
 */
export function getNxVirtualGroupOutletMisplacedError(): Error {
  return Error('nxVirtualGroupOutlet can only be used in the groupTemplate of nxVirtualFor.');
}

/**
 * Returns an exception to be thrown when the group template of `nxVirtualFor` has no
 * `nxVirtualGroupOutlet`.
 * @docs-private
 */
export function getNxVirtualGroupOutletMissingError(): Error {
  return Error('The groupTemplate of nxVirtualFor needs an element with nxVirtualGroupOutlet.');
}
