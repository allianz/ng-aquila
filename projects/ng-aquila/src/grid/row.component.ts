import { mapClassNames } from '@aposin/ng-aquila/utils';
import { Component, ElementRef, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { addStylesFromDimensions, isEmpty } from './utils';

const MAPPING_JUSTIFY = {
    'start': 'nx-justify-content-{tier}-start',
    'end': 'nx-justify-content-{tier}-end',
    'center': 'nx-justify-content-{tier}-center',
    'between': 'nx-justify-content-{tier}-between',
    'around': 'nx-justify-content-{tier}-around'
  };

const MAPPING_ALIGN_ITEMS = {
    'start': 'nx-align-items-{tier}-start',
    'end': 'nx-align-items-{tier}-end',
    'center': 'nx-align-items-{tier}-center',
    'baseline': 'nx-align-items-{tier}-baseline',
    'stretch': 'nx-align-items-{tier}-stretch'
  };

const MAPPING_ALIGN_CONTENT = {
    'start': 'nx-align-content-{tier}-start',
    'end': 'nx-align-content-{tier}-end',
    'center': 'nx-align-content-{tier}-center',
    'between': 'nx-align-content-{tier}-between',
    'around': 'nx-align-content-{tier}-around',
    'stretch': 'nx-align-content-{tier}-stretch'
  };

const MAPPING_WRAP = {
    'wrap': 'nx-flex-{tier}-wrap',
    'nowrap': 'nx-flex-{tier}-nowrap',
    'reverse': 'nx-flex-{tier}-wrap-reverse'
};

const MAPPING_LAYOUT = {
    'row': 'nx-grid__row',
    'row-reverse': 'nx-grid__row-reverse'
};

export type RowJustification = 'start' | 'end' | 'center' | 'between' | 'around';
export type RowContentAlignment = 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';
export type RowItemsAlignment = 'start' | 'end' | 'center' | 'between' | 'stretch';
export type RowWrapping = 'wrap' | 'nowrap' | 'reverse';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nxRow]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['row.component.scss'],
  host: {
    '[class]': '_classNames'
  }
})
export class NxRowComponent implements OnInit {
  private ROW  = 'row';
  private ROW_RESERVE  = 'row-reverse';

  _classNames: string = '';

  /** General */
  private _nxRow: string = this.ROW;

  /**
   * Values: row | row-reverse
   *
   * Default value: row
   */
  @Input()
  set nxRow(value: string) {
    if (value !== '') {
      this._nxRow = value;
    }
  }

  /* Input row variables */

  /** Align items on the main axis (horizontally). */
  @Input('nxRowJustify') nxRowJustify: RowJustification | string = null;

  /** Similar to nxRowAlignItems, but instead of aligning flex items, it aligns flex lines. */
  @Input('nxRowAlignContent') nxRowAlignContent: RowContentAlignment | string = null;

  /** The default alignment for items inside the flexible container. */
  @Input('nxRowAlignItems') nxRowAlignItems: RowItemsAlignment | string = null;

  /** How the flexible items should be wrapped. */
  @Input('nxRowWrap') nxRowWrap: RowWrapping = null;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this._nxRow === this.ROW ||
      this._nxRow === this.ROW_RESERVE) {
      /** add row style */
      this._classNames = mapClassNames(this._nxRow, [], MAPPING_LAYOUT);
      /** if not empty nxRowWrap, split input and add style */
      if (this.nxRowWrap) {
        /** possibles atributes: wrap,reverse,no-wrap */
        this._classNames += addStylesFromDimensions(this.nxRowWrap, MAPPING_WRAP);
      }
      /** if not empty nxRowJustify, add style */
      if (this.nxRowJustify) {
        /** possibles atributes: start,end,center,between,around */
        this._classNames += addStylesFromDimensions(this.nxRowJustify, MAPPING_JUSTIFY);
      }
      /** if not empty nxRowAlignContent, add style */
      if (this.nxRowAlignContent) {
        /** possibles atributes: start,end,center,between,stetch */
        this._classNames += addStylesFromDimensions(this.nxRowAlignContent, MAPPING_ALIGN_CONTENT);
      }
      /** if not empty nxRowAlignItems, add style */
      if (this.nxRowAlignItems) {
        /** possibles atributes: start,end,center,around,stetch */
        this._classNames += addStylesFromDimensions(this.nxRowAlignItems, MAPPING_ALIGN_ITEMS);
      }
      this._classNames += ' ' + this.el.nativeElement.className;
      this._classNames = this._classNames.trim();
    } else {
      throw new Error('nxRow is incorrect');
    }
  }
}
