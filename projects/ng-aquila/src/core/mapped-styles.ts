import { ElementRef, Renderer2 } from '@angular/core';
import { appendClasses, mapClassNames, removeClasses } from '@aposin/ng-aquila/utils';

export interface MappingObject {
    [key: string]: string;
}

export class MappedStyles {
    private _classNames: string | undefined;
    private _classNamesSanitized: string | undefined;

    constructor(private mapping: MappingObject, protected _elementRef: ElementRef, protected _renderer: Renderer2, private baseClasses: string[] = []) {
        this.classNames = '';
    }

    get classNames(): string {
        return this._classNames as string;
    }

    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        removeClasses(this._renderer, this._elementRef, this._classNamesSanitized as string);
        this._classNamesSanitized = mapClassNames(value, this.baseClasses, this.mapping);
        this._classNames = value;
        appendClasses(this._renderer, this._elementRef, this._classNamesSanitized);
    }
}
