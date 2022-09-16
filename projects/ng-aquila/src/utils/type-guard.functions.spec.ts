import {
    isBoolean,
    isFalse,
    isNull,
    isNullable,
    isNumber,
    isString,
    isTrue,
    isTruthy,
    isUndefined,
    notEmpty,
    notNull,
    notNullable,
    notUndefined,
} from './type-guard.functions';

const value = 'value';

describe('type-guard functions', () => {
    describe('notNull()', () => {
        it('should return false on null', () => {
            const result = notNull(null);
            expect(result).toBeFalse();
        });

        it('should return true on undefined', () => {
            const result = notNull(undefined);
            expect(result).toBeTrue();
        });

        it('should return true on non-null and non-undefined', () => {
            const result = notNull(value);
            expect(result).toBeTrue();
        });

        it('should return true on empty string', () => {
            const result = notNull('');
            expect(result).toBeTrue();
        });

        it('should return true on 0', () => {
            const result = notNull(0);
            expect(result).toBeTrue();
        });
    });

    describe('notNullable()', () => {
        it('should return false on null', () => {
            const result = notNullable(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = notNullable(undefined);
            expect(result).toBeFalse();
        });

        it('should return true on non-null and non-undefined', () => {
            const result = notNullable(value);
            expect(result).toBeTrue();
        });

        it('should return true on empty string', () => {
            const result = notNullable('');
            expect(result).toBeTrue();
        });

        it('should return true on 0', () => {
            const result = notNullable(0);
            expect(result).toBeTrue();
        });
    });

    describe('notUndefined()', () => {
        it('should return true on null', () => {
            const result = notUndefined(null);
            expect(result).toBeTrue();
        });

        it('should return false on undefined', () => {
            const result = notUndefined(undefined);
            expect(result).toBeFalse();
        });

        it('should return true on non-null and non-undefined', () => {
            const result = notUndefined(value);
            expect(result).toBeTrue();
        });

        it('should return true on empty string', () => {
            const result = notUndefined('');
            expect(result).toBeTrue();
        });

        it('should return true on 0', () => {
            const result = notUndefined(0);
            expect(result).toBeTrue();
        });
    });

    describe('isTruthy()', () => {
        it('should return false on null', () => {
            const result = isTruthy(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isTruthy(undefined);
            expect(result).toBeFalse();
        });

        it('should return true on non-null and non-undefined', () => {
            const result = isTruthy(value);
            expect(result).toBeTrue();
        });

        it('should return false on empty string', () => {
            const result = isTruthy('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isTruthy(0);
            expect(result).toBeFalse();
        });
    });

    describe('isString()', () => {
        it('should return false on null', () => {
            const result = isString(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isString(undefined);
            expect(result).toBeFalse();
        });

        it('should return true on string', () => {
            const result = isString('string');
            expect(result).toBeTrue();
        });

        it('should return false on number', () => {
            const result = isString(1);
            expect(result).toBeFalse();
        });

        it('should return false on boolean', () => {
            const result = isString(true);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isString({});
            expect(result).toBeFalse();
        });

        it('should return false on function', () => {
            const result = isString(() => null);
            expect(result).toBeFalse();
        });

        it('should return true on empty string', () => {
            const result = isString('');
            expect(result).toBeTrue();
        });

        it('should return false on 0', () => {
            const result = isString(0);
            expect(result).toBeFalse();
        });
    });

    describe('isNumber()', () => {
        it('should return false on null', () => {
            const result = isNumber(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isNumber(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on string', () => {
            const result = isNumber('string');
            expect(result).toBeFalse();
        });

        it('should return true on number', () => {
            const result = isNumber(1);
            expect(result).toBeTrue();
        });

        it('should return false on boolean', () => {
            const result = isNumber(true);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isNumber({});
            expect(result).toBeFalse();
        });

        it('should return false on function', () => {
            const result = isNumber(() => null);
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isNumber('');
            expect(result).toBeFalse();
        });

        it('should return true on 0', () => {
            const result = isNumber(0);
            expect(result).toBeTrue();
        });
    });

    describe('isBoolean()', () => {
        it('should return false on null', () => {
            const result = isBoolean(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isBoolean(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on string', () => {
            const result = isBoolean('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isBoolean(1);
            expect(result).toBeFalse();
        });

        it('should return true on boolean', () => {
            const result = isBoolean(true);
            expect(result).toBeTrue();
        });

        it('should return false on object', () => {
            const result = isBoolean({});
            expect(result).toBeFalse();
        });

        it('should return false on function', () => {
            const result = isBoolean(() => null);
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isBoolean('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isBoolean(0);
            expect(result).toBeFalse();
        });
    });

    describe('isTrue()', () => {
        it('should return false on null', () => {
            const result = isTrue(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isTrue(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on string', () => {
            const result = isTrue('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isTrue(1);
            expect(result).toBeFalse();
        });

        it('should return true on true', () => {
            const result = isTrue(true);
            expect(result).toBeTrue();
        });

        it('should return false on false', () => {
            const result = isTrue(false);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isTrue({});
            expect(result).toBeFalse();
        });

        it('should return false on function', () => {
            const result = isTrue(() => null);
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isTrue('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isTrue(0);
            expect(result).toBeFalse();
        });
    });

    describe('isFalse()', () => {
        it('should return false on null', () => {
            const result = isFalse(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = isFalse(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on string', () => {
            const result = isFalse('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isFalse(1);
            expect(result).toBeFalse();
        });

        it('should return false on true', () => {
            const result = isFalse(true);
            expect(result).toBeFalse();
        });

        it('should return true on false', () => {
            const result = isFalse(false);
            expect(result).toBeTrue();
        });

        it('should return false on object', () => {
            const result = isFalse({});
            expect(result).toBeFalse();
        });

        it('should return false on function', () => {
            const result = isFalse(() => null);
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isFalse('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isFalse(0);
            expect(result).toBeFalse();
        });
    });

    describe('isNull()', () => {
        it('should return true on null', () => {
            const result = isNull(null);
            expect(result).toBeTrue();
        });

        it('should return false on undefined', () => {
            const result = isNull(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on string', () => {
            const result = isNull('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isNull(1);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isNull({});
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isNull('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isNull(0);
            expect(result).toBeFalse();
        });
    });

    describe('isNullable()', () => {
        it('should return true on null', () => {
            const result = isNullable(null);
            expect(result).toBeTrue();
        });

        it('should return true on undefined', () => {
            const result = isNullable(undefined);
            expect(result).toBeTrue();
        });

        it('should return false on string', () => {
            const result = isNullable('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isNullable(1);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isNullable({});
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isNullable('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isNullable(0);
            expect(result).toBeFalse();
        });
    });

    describe('isUndefined()', () => {
        it('should return false on undefined', () => {
            const result = isUndefined(null);
            expect(result).toBeFalse();
        });

        it('should return true on null', () => {
            const result = isUndefined(undefined);
            expect(result).toBeTrue();
        });

        it('should return false on string', () => {
            const result = isUndefined('string');
            expect(result).toBeFalse();
        });

        it('should return false on number', () => {
            const result = isUndefined(1);
            expect(result).toBeFalse();
        });

        it('should return false on object', () => {
            const result = isUndefined({});
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = isUndefined('');
            expect(result).toBeFalse();
        });

        it('should return false on 0', () => {
            const result = isUndefined(0);
            expect(result).toBeFalse();
        });
    });

    describe('notEmpty()', () => {
        it('should return false on null', () => {
            const result = notEmpty(null);
            expect(result).toBeFalse();
        });

        it('should return false on undefined', () => {
            const result = notEmpty(undefined);
            expect(result).toBeFalse();
        });

        it('should return false on empty string', () => {
            const result = notEmpty('');
            expect(result).toBeFalse();
        });

        it('should return false on empty array', () => {
            const result = notEmpty([]);
            expect(result).toBeFalse();
        });

        it('should return true on non-empty string', () => {
            const result = notEmpty(value);
            expect(result).toBeTrue();
        });

        it('should return true on non-empty string', () => {
            const result = notEmpty([value]);
            expect(result).toBeTrue();
        });
    });
});
