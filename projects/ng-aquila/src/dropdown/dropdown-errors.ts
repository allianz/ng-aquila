
/**
 * Returns an exception to be thrown when attempting to change a select's `multiple` option
 * after initialization.
 * @docs-private
 */
export function getNxDropdownDynamicMultipleError(): Error {
  return Error('Cannot change `multiselect` mode of select after initialization.');
}

/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiselect` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
export function getNxDropdownNonArrayValueError(): Error {
  return Error('Value must be an array in multiselect mode.');
}

/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
export function getNxDropdownNonFunctionValueError(): Error {
  return Error('`compareWith` must be a function.');
}
