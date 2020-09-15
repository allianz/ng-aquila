import { mapClassNames } from '@aposin/ng-aquila/utils';
import { Component, ElementRef, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { addStylesFromDimensions, isEmptyArray, processSplit, validateClassInElement } from './utils';

const MAPPING = {
  '': 'nx-grid__column-',
  'xs': 'nx-grid__column-',
  'sm': 'nx-grid__column-small-',
  'md': 'nx-grid__column-medium-',
  'lg': 'nx-grid__column-large-',
  'xlg': 'nx-grid__column-xlarge-',
  '2xlg': 'nx-grid__column-2xlarge-',
  '3xlg': 'nx-grid__column-3xlarge-'
};

const MAPPING_ALIGN_SELF = {
  'auto': 'nx-align-self-{tier}-auto',
  'start': 'nx-align-self-{tier}-start',
  'end': 'nx-align-self-{tier}-end',
  'center': 'nx-align-self-{tier}-center',
  'baseline': 'nx-align-self-{tier}-baseline',
  'stretch': 'nx-align-self-{tier}-stretch'
};

const MAPPING_ORDER = {
  'first': 'nx-flex-{tier}-first',
  'last': 'nx-flex-{tier}-last',
  'unordered': 'nx-flex-{tier}-unordered',
};

const OFFSET_MAPPING = {
  '': 'nx-grid--offset-',
  'xs': 'nx-grid--offset-',
  'sm': 'nx-grid--offset-small-',
  'md': 'nx-grid--offset-medium-',
  'lg': 'nx-grid--offset-large-',
  'xlg': 'nx-grid--offset-xlarge-',
  '2xlg': 'nx-grid--offset-2xlarge-',
  '3xlg': 'nx-grid--offset-3xlarge-'
};

const MIN = 0;
const MAX = 12;

/** Type for the available alignment values of a column inside the flexible container. */
export type ColSelfAlignment = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/** Type for the available values for setting the order of a column within a row. */
export type ColOrder = 'first' | 'last' | 'unordered';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nxCol]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['col.component.scss'],
  host: {
    '[class]': '_columnClasses'
  }
})
export class NxColComponent implements OnInit {
  private _classNames: string[] = [];

  /**
   * Number of columns used.
   *
   * Values: 1 - 12, default value: 12.
   */
  @Input('nxCol') col: string = '';

  /**
   * The number of columns the column should be offset.
   *
   * Values: 1 - 12, default value: 12.
   */
  @Input('nxColOffset') offset: string = '';

  /** The alignment for a column inside the flexible container. */
  @Input('nxAlignSelf') itemSelf: ColSelfAlignment | string = null;

  /** Order of the column within the row. */
  @Input('nxColOrder') order: ColOrder | string = null;

  get _columnClasses(): string {
    return this._classNames.join(' ').trim();
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (validateClassInElement(this.el.nativeElement.parentElement, 'nxRow')) {

      // create an array of all classes to not worry about the spaces between the classes
      // in all logic functions all the time :)
      // gets joined in get _columnClasses()
      this._classNames = [
        ...this._getColClasses(),
        ...this._getOffsetClasses(),
        ...this._getAlignSelfClasses(),
        ...this._getOrderClasses(),
        // add custom classes set by the user and append it to the end
        ...this.el.nativeElement.className.split(' ')
      ];
    } else {
      this.generateError('Exception: NxColDirective. nxRow don\'t exist');
    }
  }

  private _getColClasses() {
    const columnClasses = this._mapTiers(this.col, [], MAPPING, ['0']);
    if (columnClasses.length === 0) {
      this.generateError('Exception: NxColDirective. Empty nxCol attribute.');
    }
    return columnClasses;
  }

  private _getAlignSelfClasses() {
    /** if itemSelf contains values */
    if (this.itemSelf) {
      /** Values: auto, start, end, center, baseline, stretch */
      return addStylesFromDimensions(this.itemSelf, MAPPING_ALIGN_SELF).split(' ');
    }
    return [];
  }

  private _getOrderClasses() {
    /** if order-flex */
    if (this.order) {
      /** Values: first, last or unordered */
      return addStylesFromDimensions(this.order, MAPPING_ORDER).split(' ');
    }
    return [];
  }

  private _getOffsetClasses() {
    return this._mapTiers(this.offset, [], OFFSET_MAPPING);
  }

  private _mapTiers(input: string, defaults?: any[], mapping?: {}, exclude?: string[]): string[] {
    const givenTiers = processSplit(input);
    let mappedClasses: string[] = [];
    if (input && !isEmptyArray(givenTiers) && this.checkNotAllowedValues(givenTiers, exclude)) {
      switch (givenTiers.length) {
        case 1:
          this.validateInput(givenTiers[0]);
          mappedClasses = [mapClassNames('', defaults, mapping) + givenTiers[0]];
          break;
        case 2:
          this.validateInput(givenTiers[0], givenTiers[1]);
          mappedClasses = [
            mapClassNames('xs', defaults, mapping) + givenTiers[0],
            mapClassNames('sm', defaults, mapping) + givenTiers[1],
            mapClassNames('md', defaults, mapping) + givenTiers[1],
            mapClassNames('lg', defaults, mapping) + givenTiers[1],
            mapClassNames('xlg', defaults, mapping) + givenTiers[1],
            mapClassNames('2xlg', defaults, mapping) + givenTiers[1],
            mapClassNames('3xlg', defaults, mapping) + givenTiers[1]
          ];
          break;
        case 3:
          this.validateInput(givenTiers[0], givenTiers[1], givenTiers[2]);
          mappedClasses = [
            mapClassNames('xs', defaults, mapping) + givenTiers[0],
            mapClassNames('sm', defaults, mapping) + givenTiers[1],
            mapClassNames('md', defaults, mapping) + givenTiers[2],
            mapClassNames('lg', defaults, mapping) + givenTiers[2],
            mapClassNames('xlg', defaults, mapping) + givenTiers[2],
            mapClassNames('2xlg', defaults, mapping) + givenTiers[2],
            mapClassNames('3xlg', defaults, mapping) + givenTiers[2]
          ];
          break;
        case 4:
          this.validateInput(givenTiers[0], givenTiers[1], givenTiers[2], givenTiers[3]);
          mappedClasses = [
            mapClassNames('xs', defaults, mapping) + givenTiers[0],
            mapClassNames('sm', defaults, mapping) + givenTiers[1],
            mapClassNames('md', defaults, mapping) + givenTiers[2],
            mapClassNames('lg', defaults, mapping) + givenTiers[3],
            mapClassNames('xlg', defaults, mapping) + givenTiers[3],
            mapClassNames('2xlg', defaults, mapping) + givenTiers[3],
            mapClassNames('3xlg', defaults, mapping) + givenTiers[3]
          ];
          break;
        case 5:
            this.validateInput(givenTiers[0], givenTiers[1], givenTiers[2], givenTiers[3], givenTiers[4]);
            mappedClasses = [
              mapClassNames('xs', defaults, mapping) + givenTiers[0],
              mapClassNames('sm', defaults, mapping) + givenTiers[1],
              mapClassNames('md', defaults, mapping) + givenTiers[2],
              mapClassNames('lg', defaults, mapping) + givenTiers[3],
              mapClassNames('xlg', defaults, mapping) + givenTiers[4],
              mapClassNames('2xlg', defaults, mapping) + givenTiers[4],
              mapClassNames('3xlg', defaults, mapping) + givenTiers[4]
            ];
            break;
        case 6:
              this.validateInput(givenTiers[0], givenTiers[1], givenTiers[2], givenTiers[3], givenTiers[4],  givenTiers[5]);
              mappedClasses = [
                mapClassNames('xs', defaults, mapping) + givenTiers[0],
                mapClassNames('sm', defaults, mapping) + givenTiers[1],
                mapClassNames('md', defaults, mapping) + givenTiers[2],
                mapClassNames('lg', defaults, mapping) + givenTiers[3],
                mapClassNames('xlg', defaults, mapping) + givenTiers[4],
                mapClassNames('2xlg', defaults, mapping) + givenTiers[5],
                mapClassNames('3xlg', defaults, mapping) + givenTiers[5]
              ];
              break;
        case 7:
                this.validateInput(givenTiers[0], givenTiers[1], givenTiers[2], givenTiers[3], givenTiers[4], givenTiers[5], givenTiers[6]);
                mappedClasses = [
                  mapClassNames('xs', defaults, mapping) + givenTiers[0],
                  mapClassNames('sm', defaults, mapping) + givenTiers[1],
                  mapClassNames('md', defaults, mapping) + givenTiers[2],
                  mapClassNames('lg', defaults, mapping) + givenTiers[3],
                  mapClassNames('xlg', defaults, mapping) + givenTiers[4],
                  mapClassNames('2xlg', defaults, mapping) + givenTiers[5],
                  mapClassNames('3xlg', defaults, mapping) + givenTiers[6]
                ];
                break;
        default:
          mappedClasses = [mapClassNames('', defaults, mapping) + '12'];
          break;
      }
    }

    return mappedClasses;
  }

  /** @docs-private */
  isValueBetween(min: number, max: number, value: string): boolean {
    try {
      const parsed = parseInt(value, 10);
      return (max >= parsed && min <= parsed);
    } catch (error) {
      this.generateError('Exception: NxColDirective. One argument is not number');
    }
  }

  /** @docs-private */
  checkNotAllowedValues(values: string[], excludes: string[]): boolean {
    if (!excludes) {
      return true;
    }
    const found = values.find(val => excludes.indexOf(val) > -1);
    if (found) {
      this.generateError(`Exception: NxColDirective. Incorrect parameter. ${found} is not allowed here`);
    }
    return !found;
  }

  /** @docs-private */
  generateError(err: string) {
    throw new Error(err);
  }

  /** @docs-private */
  validateInput(...value: string[]) {
    value.forEach(element => {
      if (!this.isValueBetween(MIN, MAX, element)) {
        this.generateError(`Exception: NxColDirective. Incorrect parameters, values must be between ${MIN} and ${MAX}`);
      }
    });
  }
}
