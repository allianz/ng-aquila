import { ElementRef, Renderer2 } from '@angular/core';
import { appendClasses, mapClassNames, removeClasses } from '@aposin/ng-aquila/utils';

export interface MappingObject {
    [key: string]: string;
}

export class MappedStyles {
    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        removeClasses(this._renderer, this._elementRef, this._classNamesSanitized!);
        this._classNamesSanitized = mapClassNames(value, this.baseClasses, this.mapping);
        this._classNames = value;
        appendClasses(this._renderer, this._elementRef, this._classNamesSanitized);
    }
    get classNames(): string {
        return this._classNames!;
    }
    private _classNames?: string;

    private _classNamesSanitized?: string;

    constructor(
        private readonly mapping: MappingObject,
        protected readonly _elementRef: ElementRef,
        protected readonly _renderer: Renderer2,
        private readonly baseClasses: string[] = [],
    ) {
        this.classNames = ''; // invoke setter
    }
}
