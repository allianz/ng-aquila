import { ElementRef, Injectable } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
export function isString(value: any) {
  return typeof value === 'string';
}

export function pad(str: string, length: number = 2, padCharacter: string = '0'): string {
    if (!isString(str) || str.length >= length) {
      return str;
    }
    while (str.length < length) {
      str = padCharacter + str;
    }
    return str;
  }

// DATE -> YYYY-MM-DD
export function formatDate(date: Date) {
    const dateOfBirth =  [
        String (date.getFullYear()),
        pad(String(date.getMonth() + 1)),
        pad(String(date.getDate()))
      ].join('-');

    return dateOfBirth;
}
export function formatDateHuman(date: Date) {
    const dateOfBirth =  [
        pad(String(date.getDate())),
        pad(String(date.getMonth() + 1)),
        String (date.getFullYear())
      ].join('-');

    return dateOfBirth;
}
/*
  Purpose of this function is to allow a list of short keywords
  expand to longer bem class names with will then be applied to the classname value.

  This function will map a list of keys to values in a MAPPING list.
  Whatever value is found will replace the keyword.
  Every keyword not found will just transfered wiithmout modifying.
*/

export function mapClassNames(value, DEFAULTS = [], MAPPING = {}) {
  let sanitizedList = [ ...DEFAULTS ];

  if (typeof value === 'string') {
    const mappedClasses = getClassNameList(value, MAPPING);
    sanitizedList = [...sanitizedList, ...mappedClasses];
  }

  return sanitizedList.join(' ').trim();
}

export function getClassNameList(value, MAPPING = {}) {
  let mappedClasses = [];

  if (typeof value === 'string') {
    const classNames = value.split(' ');
    const keys = Object.keys(MAPPING);

    mappedClasses = classNames.map(className => {
      if (keys.indexOf(className) > -1) {
        return MAPPING[className];
      } else {
        return className;
      }
    });
  }

  return mappedClasses;
}

export function appendClasses(renderer: Renderer2, element: ElementRef, classes: string) {
  if (renderer && element && classes) {
    classes.split(' ').forEach(item => {
      renderer.addClass(element.nativeElement, item);
    });
  }
}

export function removeClasses(renderer: Renderer2, element: ElementRef, classes: string) {
  if (renderer && element && classes) {
    classes.split(' ').forEach(item => {
      renderer.removeClass(element.nativeElement, item);
    });
  }
}

// YYYY-MM-DD -> DATE
export function parseDate(dateString) {
  return new Date(dateString);
}

// Manually compose a font shorthand defintion as it's not
// guaranteed to be given by the computed style object.
export function getFontShorthand(style: CSSStyleDeclaration) {
  const {
    font, fontStyle, fontVariant, fontWeight, fontSize, lineHeight, fontFamily
  } = style;

  if (font.length > 0) {
    return font;
  }

  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`;
}

export function numberOfDecimals(number) {
  const parsed = Number(number);
  if (Number.isNaN(parsed) || Number.isInteger(parsed)) {
    return 0;
  }
  const match = (parsed.toString()).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match[1]) {
      return 0;
  }
  return match[1].length;
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

/** Provider that defines when form controls have an error. */
@Injectable({providedIn: 'root'})
export class ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}
