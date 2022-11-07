import { Component } from '@angular/core';
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
} from '@aposin/ng-aquila/utils';

const mixedArray = ['str', '', 24, 0, true, false, null, undefined];

function asText(value: unknown): string {
    if (value == null) {
        return value + '';
    }
    switch (typeof value) {
        case 'string':
            return `'${value}'`;
        case 'object':
            return '<object>';
        case 'function':
            return '<function>';
        default:
            return value + '';
    }
}

type primitive = string | number | boolean;

/**
 * @title Type guard utilities
 */
@Component({
    selector: 'utils-type-guards-example',
    templateUrl: './utils-type-guards-example.html',
    styleUrls: ['./utils-type-guards-example.css'],
})
export class UtilsTypeGuardsExampleComponent {
    mixedArray = mixedArray;

    notNull: (primitive | undefined)[] = mixedArray.filter(notNull);
    notNullable: primitive[] = mixedArray.filter(notNullable);
    notUndefined: (primitive | null)[] = mixedArray.filter(notUndefined);

    isTruthy: primitive[] = mixedArray.filter(isTruthy);

    isString: string[] = mixedArray.filter(isString);
    isNumber: number[] = mixedArray.filter(isNumber);
    isBoolean: boolean[] = mixedArray.filter(isBoolean);

    isTrue: true[] = mixedArray.filter(isTrue);
    isFalse: false[] = mixedArray.filter(isFalse);

    isNull: null[] = mixedArray.filter(isNull);
    isNullable: (null | undefined)[] = mixedArray.filter(isNullable);
    isUndefined: undefined[] = mixedArray.filter(isUndefined);

    // workaround: notEmpty() is typed to require `ArrayLike` as param
    notEmpty = (mixedArray as any[]).filter(notEmpty);

    toText(value: unknown[]): string {
        return value.map(asText).join(', ');
    }
}
