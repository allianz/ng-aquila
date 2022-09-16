/**
 * Assert that a value is not `null` and redefine its type.
 */
export function notNull<T>(value: T | null): value is T {
    return value !== null;
}

/**
 * Assert that a value is not `undefined` or `null` and redefine its type.
 */
export function notNullable<T>(value: T | null | undefined): value is T {
    return value != null;
}

/**
 * Assert that a value is not `undefined` and redefine its type.
 */
export function notUndefined<T>(value: T | undefined): value is T {
    return value !== undefined;
}

/**
 * Assert that a value is truthy using the double negation operator `!!` and redefine its type.
 */
export function isTruthy<T>(value: T | null | undefined): value is T {
    return !!value;
}

/**
 * Assert that a value is `string` using `typeof` check and redefine its type.
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * Assert that a value is `number` using `typeof` check and redefine its type.
 */
export function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

/**
 * Assert that a value is `boolean` using `typeof` check and redefine its type.
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

/**
 * Assert that a value is `true` and redefine its type.
 */
export function isTrue(value: unknown): value is true {
    return value === true;
}

/**
 * Assert that a value is `false` and redefine its type.
 */
export function isFalse(value: unknown): value is false {
    return value === false;
}

/**
 * Assert that a value is `null` and redefine its type.
 */
export function isNull(value: unknown): value is null {
    return value === null;
}

/**
 * Assert that a value is `null` or `undefined` and redefine its type.
 */
export function isNullable(value: unknown): value is null | undefined {
    return value == null;
}

/**
 * Assert that a value is `undefined` and redefine its type.
 */
export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

/**
 * Assert that a value is not `undefined` or `null` or an empty `ArrayLike` object such as `string` and redefine its type.
 */
export function notEmpty<T extends ArrayLike<unknown>>(value: T | null | undefined): value is T {
    return value != null && !!value.length;
}
