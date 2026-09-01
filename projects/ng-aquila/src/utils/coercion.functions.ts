import { booleanAttribute } from '@angular/core';

/**
 * `booleanAttribute` that passes `undefined` through instead of coercing it to
 * `false`, so an explicit input can be told apart from an unset one and win over
 * a fallback.
 */
export function nxOptionalBooleanAttribute(value: unknown): boolean | undefined {
  return value === undefined || value === null ? undefined : booleanAttribute(value);
}
