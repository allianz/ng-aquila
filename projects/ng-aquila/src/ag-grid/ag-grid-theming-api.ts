import { iconOverrides, themeAlpine } from 'ag-grid-community';

export const allianzIcon = iconOverrides({
    type: 'font',
    family: 'Allianz-Icons',
    weight: 'normal',
    icons: {
        filter: '\u{ea41}',
        asc: '\u{e900}',
        desc: '\u{e901}',
        excel: '\u{ea11}',
        last: '\u{e952}',
        none: '\u{ea62}',
        right: '\u{e903}',
        'small-right': '\u{ea31}',
        'tree-indeterminate': '\u{e954}',
        arrows: '\u{ec11}',
        cross: '\u{e913}',
        first: '\u{e951}',
        left: '\u{e902}',
        menu: '\u{e928}',
        save: '\u{e917}',
        'eye-slash': '\u{ea52}',
        tick: '\u{e911}',
        copy: '\u{ea35}',
        eye: '\u{ea54}',
        'small-left': '\u{ea28}',
        'small-down': '\u{e90a}',
    },
});

export const themeAquila = themeAlpine.withParams({
    backgroundColor: 'var(--ui-01)',
    modalOverlayBackgroundColor: 'var(--ui-01)',
    chromeBackgroundColor: 'var(--ui-01)',
    popupShadow: 'var(--shadow-small)',
    cardShadow: 'var(--shadow-large)',
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--table-header-cell-font-size)',
    borderRadius: 4,
    borderColor: 'var(--ui-04)',
    foregroundColor: 'var(--text-01)',

    // Icons
    iconColor: 'var(--text-01)',
    iconButtonActiveColor: 'var(--text-01)',

    // Header
    headerBackgroundColor: 'var(--table-header-cell-background-color)',
    headerColumnResizeHandleColor: 'var(--table-resize-handle-color)',
    headerColumnResizeHandleHeight: '50%',
    headerColumnBorder: {
        width: 1,
        style: 'solid',
        color: 'var(--table-resize-handle-color)',
    },
    headerHeight: 44,

    // Rows
    rowHeight: 56,
    oddRowBackgroundColor: 'var(--table-row-background-color)',
    rowBorder: {
        width: 1,
        style: 'solid',
        color: 'var(--table-cell-border-top-color)',
    },
    rowHoverColor: 'var(--selectable-table-row-hover-background-color)',
    selectedRowBackgroundColor: 'var(--zebra-table-row-selected-background-color)',

    // Cell
    cellHorizontalPadding: 16,

    // Input / Checkbox
    inputBorder: {
        width: 1,
        style: 'solid',
        color: 'var(--formfield-outline-border-color)',
    },
    inputFocusBorder: {
        width: 1,
        style: 'solid',
        color: 'var(--formfield-outline-active-border-color)',
    },
    inputFocusShadow: 'var(--formfield-outline-focus-box-shadow)',
    inputDisabledBackgroundColor: 'var(--formfield-background-color)',
    inputDisabledBorder: {
        width: 1,
        style: 'solid',
        color: 'var(--formfield-disabled-border-color)',
    },

    // Checkbox
    checkboxCheckedBackgroundColor: 'var(--checkbox-selected-background-color)',
    checkboxUncheckedBorderColor: 'var(--checkbox-border-color)',
    checkboxCheckedBorderColor: 'var(--checkbox-selected-border-color)',

    // Misc
    widgetVerticalSpacing: 12,
    columnDropCellBackgroundColor: 'var(--ui-01)',
    rangeSelectionBorderColor: 'var(--selectable-table-row-selected-border-color)',
});

export const themeAllianz = themeAquila.withPart(allianzIcon);

export const themeAquilaDenseParams = {
    rowHeight: 40,
};

export const themeAquilaZebraParams = {
    oddRowBackgroundColor: 'var(--zebra-table-even-row-background-color)',
    rowBorder: 'none',
};
