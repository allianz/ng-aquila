export interface NxMaskConfig {
    mask: string;
    convertTo?: MaskConversionTypes;
    separators?: string[];
    dropSpecialCharacters?: boolean;
    deactivateMask?: boolean;
    hooks?: {
        beforeInput?: [(event: Event) => void];
        afterInput?: [(event: Event) => void];
        beforePaste?: [(event: ClipboardEvent) => void];
        /* Whenever the mask changes the value of the input */
        onChange?: [(value: string) => void];
    };
}

export type MASK_TYPE = '0' | 'A' | 'S';

/** Options for input case sensitivity. */
export type MaskConversionTypes = 'lower' | 'upper';

/** Interface for saving the cursor information. */
export interface CursorInfo {
    selectionStart?: number;
    selectionEnd?: number;
    position?: number;
}
