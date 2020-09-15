import { ElementRef, Renderer2, Input } from '@angular/core';

import { appendClasses, mapClassNames, removeClasses } from '@aposin/ng-aquila/utils';

export type MappingObject = {
  [key: string]: string;
};

export class MappedStyles {
  private _classNames: string;
  private _classNamesSanitized: string;

  constructor(
    private mapping: MappingObject,
    private baseClasses = [],
    protected _elementRef: ElementRef,
    protected _renderer: Renderer2) {
      this.classNames = '';
  }

  get classNames(): string {
    return this._classNames;
  }

  set classNames(value: string) {
    if (this._classNames === value) {
      return;
    }
    removeClasses(this._renderer, this._elementRef, this._classNamesSanitized);
    this._classNamesSanitized = mapClassNames(value, this.baseClasses, this.mapping);
    this._classNames = value;
    appendClasses(this._renderer, this._elementRef, this._classNamesSanitized);
  }
}
