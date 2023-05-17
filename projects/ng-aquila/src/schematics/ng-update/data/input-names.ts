import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export const inputNames: VersionChanges<InputNameUpgradeData> = {
    [TargetVersion.V16]: [
        {
            pr: '',
            changes: [
                { replace: 'nxResize', replaceWith: 'resize', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxLabel', replaceWith: 'label', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxStep', replaceWith: 'step', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxMin', replaceWith: 'min', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxMax', replaceWith: 'max', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxReadonlyInput', replaceWith: 'readonly', limitedTo: { elements: ['nx-number-stepper'] } },
                { replace: 'nxSize', replaceWith: 'size', limitedTo: { elements: ['nx-number-stepper'] } },

                { replace: 'nxButtonLabel', replaceWith: 'buttonLabel', limitedTo: { elements: ['nx-page-search'] } },
                { replace: 'nxHideSearchButton', replaceWith: 'hideSearchButton', limitedTo: { elements: ['nx-page-search'] } },
                { replace: 'nxButtonLayout', replaceWith: 'buttonLayout', limitedTo: { elements: ['nx-page-search'] } },
                { replace: 'nxContentLayout', replaceWith: 'contentLayout', limitedTo: { elements: ['nx-page-search'] } },

                { replace: 'nxPage', replaceWith: 'page', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxCount', replaceWith: 'count', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxPerPage', replaceWith: 'perPage', limitedTo: { elements: ['nx-pagination'] } },
                { replace: 'nxType', replaceWith: 'type', limitedTo: { elements: ['nx-pagination'] } },

                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-radio-toggle'] } },
                { replace: 'nxName', replaceWith: 'name', limitedTo: { elements: ['nx-radio-toggle'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-radio-toggle'] } },
                { replace: 'nxSelection', replaceWith: 'selection', limitedTo: { elements: ['nx-radio-toggle'] } },

                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-radio-group'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-radio-group'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-radio-group'] } },

                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-radio'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-radio'] } },
                { replace: 'nxChecked', replaceWith: 'checked', limitedTo: { elements: ['nx-radio'] } },
                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-radio'] } },

                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-radio-toggle-button'] } },
                { replace: 'nxSelected', replaceWith: 'selected', limitedTo: { elements: ['nx-radio-toggle-button'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-radio-toggle-button'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-radio-toggle-button'] } },
                { replace: 'nxType', replaceWith: 'menuButtonType', limitedTo: { elements: ['button'], attributes: ['nxMenuButton'] } },
                { replace: 'nxContext', replaceWith: 'context', limitedTo: { elements: ['nx-message'] } },
                { replace: 'nxBody', replaceWith: 'modalBody', limitedTo: { elements: ['nx-modal'] } },
                { replace: 'nxHideOnEsc', replaceWith: 'hideOnEsc', limitedTo: { elements: ['nx-modal'] } },
                { replace: 'nxHideOnClickOutside', replaceWith: 'hideOnClickOutside', limitedTo: { elements: ['nx-modal'] } },
                { replace: 'nxShowCloseIcon', replaceWith: 'showCloseIcon', limitedTo: { elements: ['nx-modal'] } },
                { replace: 'nxSize', replaceWith: 'windowSize', limitedTo: { elements: ['nx-modal'] } },
                { replace: 'nxNegative', replaceWith: 'negativeStyles', limitedTo: { elements: ['nx-natural-language-form'] } },
                { replace: 'nxSize', replaceWith: 'size', limitedTo: { elements: ['nx-word'] } },
                { replace: 'nxLabel', replaceWith: 'label', limitedTo: { elements: ['nx-word'] } },
                {
                    replace: 'nxSize',
                    replaceWith: 'size',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: '(nxValue)',
                    replaceWith: '(value)',
                    limitedTo: {
                        elements: ['nx-rating', 'nx-slider'],
                    },
                },
                {
                    replace: 'nxValue',
                    replaceWith: 'value',
                    limitedTo: {
                        elements: ['nx-rating', 'nx-slider'],
                    },
                },
                {
                    replace: 'nxDisabled',
                    replaceWith: 'disabled',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxNegative',
                    replaceWith: 'negative',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxStartLabel',
                    replaceWith: 'startLabel',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxEndLabel',
                    replaceWith: 'endLabel',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxAriaLabel',
                    replaceWith: 'ariaLabel',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxIconColor',
                    replaceWith: 'iconColor',
                    limitedTo: {
                        elements: ['nx-rating'],
                    },
                },
                {
                    replace: 'nxMin',
                    replaceWith: 'min',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxMax',
                    replaceWith: 'max',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxStep',
                    replaceWith: 'step',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxLabel',
                    replaceWith: 'label',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxInverted',
                    replaceWith: 'inverted',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },

                {
                    replace: 'nxValueFormatter',
                    replaceWith: 'valueFormatter',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxLabelMinFormatter',
                    replaceWith: 'labelMinFormatter',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                {
                    replace: 'nxLabelMaxFormatter',
                    replaceWith: 'labelMaxFormatter',
                    limitedTo: {
                        elements: ['nx-slider'],
                    },
                },
                { replace: 'nxDisabled', replaceWith: 'disabled', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxReadonly', replaceWith: 'readonly', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: '(nxValue)', replaceWith: '(value)', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxIsMultiselect', replaceWith: 'isMultiSelect', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxRequired', replaceWith: 'required', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxIgnoreItemTrunctation', replaceWith: 'ignoreItemTruncation', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxShowFilter', replaceWith: 'showFilter', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxFilterPlaceholder', replaceWith: 'filterPlaceholder', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxOverlayLabel', replaceWith: 'overlayLabel', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxValueFormatter', replaceWith: 'valueFormatter', limitedTo: { elements: ['nx-dropdown'] } },
                { replace: 'nxLabel', replaceWith: 'label', limitedTo: { elements: ['nx-dropdown-group'] } },
                { replace: 'nxValue', replaceWith: 'value', limitedTo: { elements: ['nx-dropdown-item'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-expansion-panel'] } },
                { replace: 'nxStyle', replaceWith: 'variant', limitedTo: { elements: ['nx-accordion'] } },
                { replace: 'nxValueFormatter', replaceWith: 'valueFormatter', limitedTo: { elements: ['nx-autocomplete'] } },
                { replace: 'nxConvertTo', replaceWith: 'convertTo', limitedTo: { elements: ['nx-code-input'] } },
                { replace: 'nxData', replaceWith: 'data', limitedTo: { elements: ['nx-dynamic-table'] } },
                { replace: 'nxDisplayedColumns', replaceWith: 'displayedColumns', limitedTo: { elements: ['nx-dynamic-table'] } },
                { replace: 'nxColOffset', replaceWith: 'colOffset', limitedTo: { attributes: ['nxCol'] } },
                { replace: 'nxAlignSelf', replaceWith: 'alignSelf', limitedTo: { attributes: ['nxCol'] } },
                { replace: 'nxColOrder', replaceWith: 'colOrder', limitedTo: { attributes: ['nxCol'] } },
                { replace: 'nxRowJustify', replaceWith: 'rowJustify', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowAlignContent', replaceWith: 'rowAlignContent', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowAlignItems', replaceWith: 'rowAlignItems', limitedTo: { attributes: ['nxRow'] } },
                { replace: 'nxRowWrap', replaceWith: 'rowWrap', limitedTo: { attributes: ['nxRow'] } },
            ],
        },
        {
            pr: '',
            changes: [
                { replace: 'nxVideoId', replaceWith: 'videoId', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxAltText', replaceWith: 'altText', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxPlayButtonAriaLabel', replaceWith: 'playButtonAriaLabel', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxPreviewImageSrc', replaceWith: 'previewImageSrc', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxShowPlayerControls', replaceWith: 'showPlayerControls', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxAllowFullScreen', replaceWith: 'allowFullScreen', limitedTo: { elements: ['nx-video'] } },
                { replace: 'nxInterfaceLanguage', replaceWith: 'interfaceLanguage', limitedTo: { elements: ['nx-video'] } },
            ],
        },
        {
            pr: '',
            changes: [
                {
                    replace: 'nxTags',
                    replaceWith: 'tags',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: '(nxTags)',
                    replaceWith: '(tags)',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: 'nxAllowTagDeletion',
                    replaceWith: 'allowTagDeletion',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: 'nxIsKeywordList',
                    replaceWith: 'isKeywordList',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: 'nxLabelProperty',
                    replaceWith: 'labelProperty',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },
                {
                    replace: 'nxValueFormatter',
                    replaceWith: 'valueFormatter',
                    limitedTo: {
                        elements: ['nx-taglist'],
                    },
                },

                {
                    replace: 'nxSize',
                    replaceWith: 'size',
                    limitedTo: {
                        elements: ['nx-spinner'],
                    },
                },
                {
                    replace: 'nxBig',
                    replaceWith: 'big',
                    limitedTo: {
                        elements: ['nx-switcher'],
                    },
                },
                {
                    replace: 'nxNegative',
                    replaceWith: 'negative',
                    limitedTo: {
                        elements: ['nx-switcher'],
                    },
                },
                { replace: 'nxLabel', replaceWith: 'label', limitedTo: { elements: ['nx-formfield'] } },
                { replace: 'nxOptionalLabel', replaceWith: 'optionalLabel', limitedTo: { elements: ['nx-formfield'] } },
                { replace: 'nxFloatLabel', replaceWith: 'floatLabel', limitedTo: { elements: ['nx-formfield'] } },
                { replace: 'nxStyle', replaceWith: 'negative', limitedTo: { elements: ['nx-formfield'] } },
            ],
        },
        {
            pr: '',
            changes: [
                { replace: 'nxDatepicker', replaceWith: 'datepicker', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxDatefieldFilter', replaceWith: 'datefieldFilter', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxMin', replaceWith: 'min', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxMax', replaceWith: 'max', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxStrict', replaceWith: 'strict', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxParseFormat', replaceWith: 'parseFormat', limitedTo: { attributes: ['nxDatefield'] } },
                { replace: 'nxDisplayFormat', replaceWith: 'displayFormat', limitedTo: { attributes: ['nxDatefield'] } },
            ],
        },
    ],
};
