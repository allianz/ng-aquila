import { ElementRef, Renderer2 } from '@angular/core';

// TODO comment function purpose
export function pad(str: string, length = 2, padCharacter = '0'): string {
    if (typeof str !== 'string' || str.length >= length) {
        return str;
    }
    while (str.length < length) {
        str = padCharacter + str;
    }
    return str;
}

// DATE -> YYYY-MM-DD
// TODO comment function purpose
export function formatDate(date: Date): string {
    return [String(date.getFullYear()), pad(String(date.getMonth() + 1)), pad(String(date.getDate()))].join('-');
}

// TODO comment function purpose
export function formatDateHuman(date: Date): string {
    return [pad(String(date.getDate())), pad(String(date.getMonth() + 1)), String(date.getFullYear())].join('-');
}

/**
 * The purpose of this function is to allow a list of short keywords
 * expand to longer bem class names with will then be applied to the classname value.
 *
 * This function will map a list of keys to values in a MAPPING list.
 * Whatever value is found will replace the keyword.
 * Every keyword not found will just transfered wiithmout modifying.
 */
export function mapClassNames(value: string, DEFAULTS: string[] = [], MAPPING = {}): string {
    let sanitizedList: string[] = [...DEFAULTS];

    if (typeof value === 'string') {
        const mappedClasses = getClassNameList(value, MAPPING);

        sanitizedList = [...sanitizedList, ...mappedClasses];
    }
    return sanitizedList.join(' ').trim();
}

// TODO comment function purpose
export function getClassNameList(value: string, MAPPING: { [k: string]: string } = {}): string[] {
    let mappedClasses: string[] = [];

    if (typeof value === 'string') {
        const classNames = value.split(' ');
        const keys = Object.keys(MAPPING);

        mappedClasses = classNames.map(className => {
            if (keys.includes(className)) {
                return MAPPING[className];
            }
            return className;
        });
    }
    return mappedClasses;
}

/**
 * Add classes to the native element using the provided renderer.
 */
export function appendClasses(renderer: Renderer2, element: ElementRef, classes: string): void {
    if (renderer && element && classes) {
        classes.split(' ').forEach(item => {
            renderer.addClass(element.nativeElement, item);
        });
    }
}

/**
 * Remove classes from the native element using the provided renderer.
 */
export function removeClasses(renderer: Renderer2, element: ElementRef, classes: string): void {
    if (renderer && element && classes) {
        classes.split(' ').forEach(item => {
            renderer.removeClass(element.nativeElement, item);
        });
    }
}

/**
 * Create a new `Date` instance using the provided value.
 */
export function parseDate(dateString: string | number | Date): Date {
    return new Date(dateString);
}

/**
 * Manually compose a font shorthand defintion as it's not guaranteed to be given by the computed style object.
 */
export function getFontShorthand(style: CSSStyleDeclaration): string {
    const { font, fontStyle, fontVariant, fontWeight, fontSize, lineHeight, fontFamily } = style;

    if (font.length > 0) {
        return font;
    }
    return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
}

/**
 * Return the number of decimal places of a number.
 */
export function numberOfDecimals(number: string | number): number {
    const parsed = Number(number);
    if (Number.isNaN(parsed) || Number.isInteger(parsed)) {
        return 0;
    }
    const match = parsed.toString().match(/(?:\.(\d+))?(?:E([+-]?\d+))?$/i);
    if (!match || !match[1]) {
        return 0;
    }
    return match[1].length;
}

/**
 * Return the provided value if in specified range, the lower or upper boundary otherwise.
 */
export function clamp(value: number, min = 0, max = 1): number {
    return Math.max(min, Math.min(max, value));
}

/**
 * Generate a random string.
 */
export function randomString(): string {
    return Math.random().toString(36);
}
