import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Service for measuring text width using canvas context.
 */
@Injectable({ providedIn: 'root' })
export class TextMeasurementService {
  private readonly _platformId = inject(PLATFORM_ID);
  private _textMeasureContext: CanvasRenderingContext2D | null = null;

  private _getTextMeasureContext(): CanvasRenderingContext2D | null {
    if (!isPlatformBrowser(this._platformId)) {
      return null;
    }

    if (!this._textMeasureContext) {
      const canvas = document.createElement('canvas');
      this._textMeasureContext = canvas.getContext('2d');
    }
    return this._textMeasureContext;
  }

  /**
   * Measure the pixel width of a text string using canvas.
   * Optionally uses the font from a specific HTML input element.
   * @param text The text to measure
   * @param inputElement Optional input element to get font styles from
   * @returns The pixel width of the text, or 0 if measurement is not possible
   */
  private measureTextWidth(text: string | null, inputElement?: HTMLInputElement): number {
    if (!text) {
      return 0;
    }

    const context = this._getTextMeasureContext();
    if (!context) {
      return 0;
    }

    if (inputElement) {
      const computedStyle = window.getComputedStyle(inputElement);
      context.font = computedStyle.font;
    }

    return Math.ceil(context.measureText(text).width);
  }

  /**
   * Compute the optimal width for an input field based on its value and placeholder.
   * @param value The current value of the input
   * @param placeholder The placeholder text
   * @param maxInputLength The maximum length of the input
   * @param inputElement Optional input element to get font styles from
   * @returns A CSS width string in pixels
   */
  computeInputWidth(
    value: string | null,
    placeholder: string,
    maxInputLength: number,
    inputElement?: HTMLInputElement,
  ): string {
    if (!value) {
      const placeholderWidth = this.measureTextWidth(placeholder, inputElement);
      return `${placeholderWidth}px`;
    }
    if (value.length === maxInputLength) {
      const valueWidth = this.measureTextWidth(value, inputElement);
      return `${Math.ceil(valueWidth)}px`;
    }

    const effectiveText = value && value.length > 0 ? value : placeholder;
    const textWidth = this.measureTextWidth(effectiveText, inputElement);
    const digitWidth = this.measureTextWidth('0', inputElement);
    const inputValueWidth = Math.max(textWidth, digitWidth * maxInputLength);
    return `${Math.ceil(inputValueWidth)}px`;
  }
}
