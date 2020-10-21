
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA NPM 'build-examples-module' */
// This file should contain all required modules we are consuming in the examples

import { ExamplesSharedModule } from '../examples/examples-shared.module'

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NX_EXAMPLES_TOKEN, ExampleFullScreenComponent } from '@aposin/ngx-docs-ui';
import { RouterModule, ROUTES } from '@angular/router';

import {AccessibilityHighContrastSvgExampleComponent} from './../examples/accessibility-high-contrast-svg/accessibility-high-contrast-svg-example';
import {AccordionErrorExampleComponent} from './../examples/accordion-error/accordion-error-example';
import {AccordionExtraLightNegativeExampleComponent} from './../examples/accordion-extra-light-negative/accordion-extra-light-negative-example';
import {AccordionExtraLightExampleComponent} from './../examples/accordion-extra-light/accordion-extra-light-example';
import {AccordionLazyExampleComponent} from './../examples/accordion-lazy/accordion-lazy-example';
import {AccordionLightNegativeExampleComponent} from './../examples/accordion-light-negative/accordion-light-negative-example';
import {AccordionLightExampleComponent} from './../examples/accordion-light/accordion-light-example';
import {AccordionMultiExampleComponent} from './../examples/accordion-multi/accordion-multi-example';
import {AccordionNegativeExampleComponent} from './../examples/accordion-negative/accordion-negative-example';
import {AccordionStandaloneExampleComponent} from './../examples/accordion-standalone/accordion-standalone-example';
import {AccordionExampleComponent} from './../examples/accordion/accordion-example';
import {ActionWithRouterDemoComponent} from './../examples/action-with-router/action-with-router-example';
import {ActionDemoComponent} from './../examples/action/action-example';
import {AutocompleteBasicExampleComponent} from './../examples/autocomplete-basic/autocomplete-basic-example';
import {AutocompleteDataBindingExampleComponent} from './../examples/autocomplete-data-binding/autocomplete-data-binding-example';
import {AutocompleteDefaultRenderingExampleComponent} from './../examples/autocomplete-default-rendering/autocomplete-default-rendering-example';
import {AutocompleteFilteringExampleComponent} from './../examples/autocomplete-filtering/autocomplete-filtering-example';
import {AutocompleteOutlineExampleComponent} from './../examples/autocomplete-outline/autocomplete-outline-example';
import {BadgeVibrantExampleComponent} from './../examples/badge-vibrant/badge-vibrant-example';
import {BadgeExampleComponent} from './../examples/badge/badge-example';
import {BreadcrumbNegativeExampleComponent} from './../examples/breadcrumb-negative/breadcrumb-negative-example';
import {BreadcrumbExampleComponent} from './../examples/breadcrumb/breadcrumb-example';
import {ButtonBlockExampleComponent} from './../examples/button-block/button-block-example';
import {ButtonDangerExampleComponent} from './../examples/button-danger/button-danger-example';
import {ButtonIconExampleComponent} from './../examples/button-icon/button-icon-example';
import {ButtonLargeExampleComponent} from './../examples/button-large/button-large-example';
import {ButtonMediumExampleComponent} from './../examples/button-medium/button-medium-example';
import {ButtonNegativeExampleComponent} from './../examples/button-negative/button-negative-example';
import {ButtonPlainExampleComponent} from './../examples/button-plain/button-plain-example';
import {ButtonSmallMediumExampleComponent} from './../examples/button-small-medium/button-small-medium-example';
import {ButtonSmallExampleComponent} from './../examples/button-small/button-small-example';
import {ButtonWithIconExampleComponent} from './../examples/button-with-icon/button-with-icon-example';
import {ButtonExampleComponent} from './../examples/button/button-example';
import {CardHeaderFooterExampleComponent} from './../examples/card-header-footer/card-header-footer-example';
import {CardExampleComponent} from './../examples/card/card-example';
import {CheckboxGroupBasicExampleComponent} from './../examples/checkbox-group-basic/checkbox-group-basic-example';
import {CheckboxGroupDynamicExampleComponent} from './../examples/checkbox-group-dynamic/checkbox-group-dynamic-example';
import {CheckboxGroupHorizontalExampleComponent} from './../examples/checkbox-group-horizontal/checkbox-group-horizontal-example';
import {CheckboxGroupInheritanceExampleComponent} from './../examples/checkbox-group-inheritance/checkbox-group-inheritance-example';
import {CheckboxGroupLabelSizeExampleComponent} from './../examples/checkbox-group-label-size/checkbox-group-label-size-example';
import {CheckboxGroupReactiveExampleComponent} from './../examples/checkbox-group-reactive/checkbox-group-reactive-example';
import {CheckboxGroupValidationExampleComponent} from './../examples/checkbox-group-validation/checkbox-group-validation-example';
import {CheckboxLabelSizeExampleComponent} from './../examples/checkbox-label-size/checkbox-label-size-example';
import {CheckboxNegativeExampleComponent} from './../examples/checkbox-negative/checkbox-negative-example';
import {CheckboxOutputsExampleComponent} from './../examples/checkbox-outputs/checkbox-outputs-example';
import {CheckboxReactiveExampleComponent} from './../examples/checkbox-reactive/checkbox-reactive-example';
import {CheckboxSimpleBindingExampleComponent} from './../examples/checkbox-simple-binding/checkbox-simple-binding-example';
import {CheckboxStatesExampleComponent} from './../examples/checkbox-states/checkbox-states-example';
import {CheckboxTemplateDrivenExampleComponent} from './../examples/checkbox-template-driven/checkbox-template-driven-example';
import {CircleToggleGroupExampleComponent} from './../examples/circle-toggle-group/circle-toggle-group-example';
import {CircleToggleNegativeExampleComponent} from './../examples/circle-toggle-negative/circle-toggle-negative-example';
import {CircleToggleReactiveDisabledExampleComponent} from './../examples/circle-toggle-reactive-disabled/circle-toggle-reactive-disabled-example';
import {CircleToggleReactiveExampleComponent} from './../examples/circle-toggle-reactive/circle-toggle-reactive-example';
import {CircleToggleResponsiveExampleComponent} from './../examples/circle-toggle-responsive/circle-toggle-responsive-example';
import {CircleToggleSimpleBindingExampleComponent} from './../examples/circle-toggle-simple-binding/circle-toggle-simple-binding-example';
import {CircleToggleStandaloneExampleComponent} from './../examples/circle-toggle-standalone/circle-toggle-standalone-example';
import {CircleToggleTemplateDrivenExampleComponent} from './../examples/circle-toggle-template-driven/circle-toggle-template-driven-example';
import {CircleToggleTextExampleComponent} from './../examples/circle-toggle-text/circle-toggle-text-example';
import {CodeInputDisabledExampleComponent} from './../examples/code-input-disabled/code-input-disabled-example';
import {CodeInputFourCharExampleComponent} from './../examples/code-input-four-char/code-input-four-char-example';
import {CodeInputLocalizeExampleComponent} from './../examples/code-input-localize/code-input-localize-example';
import {CodeInputModelExampleComponent} from './../examples/code-input-model/code-input-model-example';
import {CodeInputNegativeExampleComponent} from './../examples/code-input-negative/code-input-negative-example';
import {CodeInputSevenCharExampleComponent} from './../examples/code-input-seven-char/code-input-seven-char-example';
import {CodeInputSixCharExampleComponent} from './../examples/code-input-six-char/code-input-six-char-example';
import {CodeInputTypeExampleComponent} from './../examples/code-input-type/code-input-type-example';
import {ComparisonTableDisabledColumnsExampleComponent} from './../examples/comparison-table-disabled-columns/comparison-table-disabled-columns-example';
import {ComparisonTableDynamicExampleComponent} from './../examples/comparison-table-dynamic/comparison-table-dynamic-example';
import {ComparisonTableFormElementsExampleComponent} from './../examples/comparison-table-form-elements/comparison-table-form-elements-example';
import {ComparisonTableModifyThemingExampleComponent} from './../examples/comparison-table-modify-theming/comparison-table-modify-theming-example';
import {ComparisonTableRowGroupExampleComponent} from './../examples/comparison-table-row-group/comparison-table-row-group-example';
import {ComparisonTableWithIntersectionExampleComponent} from './../examples/comparison-table-with-intersection/comparison-table-with-intersection-example';
import {ComparisonTableWithToggleSectionsExampleComponent} from './../examples/comparison-table-with-toggle-sections/comparison-table-with-toggle-sections-example';
import {ComparisonTableExampleComponent} from './../examples/comparison-table/comparison-table-example';
import {ContextMenuBasicExampleComponent} from './../examples/context-menu-basic/context-menu-basic-example';
import {ContextMenuDataExampleComponent} from './../examples/context-menu-data/context-menu-data-example';
import {ContextMenuDisabledExampleComponent} from './../examples/context-menu-disabled/context-menu-disabled-example';
import {ContextMenuIconsExampleComponent} from './../examples/context-menu-icons/context-menu-icons-example';
import {ContextMenuLazyExampleComponent} from './../examples/context-menu-lazy/context-menu-lazy-example';
import {ContextMenuNestedExampleComponent} from './../examples/context-menu-nested/context-menu-nested-example';
import {ContextMenuProgrammaticExampleComponent} from './../examples/context-menu-programmatic/context-menu-programmatic-example';
import {ContextMenuScrollStrategyExampleComponent} from './../examples/context-menu-scroll-strategy/context-menu-scroll-strategy-example';
import {CopytextNegativeExampleComponent} from './../examples/copytext-negative/copytext-negative-example';
import {CopytextSizesExampleComponent} from './../examples/copytext-sizes/copytext-sizes-example';
import {DatefieldBasicExampleComponent} from './../examples/datefield-basic/datefield-basic-example';
import {DatefieldDisabledExampleComponent} from './../examples/datefield-disabled/datefield-disabled-example';
import {DatefieldFilterExampleComponent} from './../examples/datefield-filter/datefield-filter-example';
import {DatefieldFormatInjectionExampleComponent} from './../examples/datefield-format-injection/datefield-format-injection-example';
import {DatefieldFormattingExampleComponent} from './../examples/datefield-formatting/datefield-formatting-example';
import {DatefieldInjectionTokenExampleComponent} from './../examples/datefield-injection-token/datefield-injection-token-example';
import {DatefieldIsoExampleComponent} from './../examples/datefield-iso/datefield-iso-example';
import {DatefieldLocalizeDateExampleComponent} from './../examples/datefield-localize-date/datefield-localize-date-example';
import {DatefieldLocalizeTextsExampleComponent} from './../examples/datefield-localize-texts/datefield-localize-texts-example';
import {DatefieldManualExampleComponent} from './../examples/datefield-manual/datefield-manual-example';
import {DatefieldMinMaxExampleComponent} from './../examples/datefield-min-max/datefield-min-max-example';
import {DatefieldParsingExampleComponent} from './../examples/datefield-parsing/datefield-parsing-example';
import {DatefieldRangeExampleComponent} from './../examples/datefield-range/datefield-range-example';
import {DatefieldReactiveExampleComponent} from './../examples/datefield-reactive/datefield-reactive-example';
import {DatefieldStartviewExampleComponent} from './../examples/datefield-startview/datefield-startview-example';
import {DatefieldToggleFocusExampleComponent} from './../examples/datefield-toggle-focus/datefield-toggle-focus-example';
import {DropdownCustomLabelExampleComponent} from './../examples/dropdown-custom-label/dropdown-custom-label-example';
import {DropdownDisabledItemsExampleComponent} from './../examples/dropdown-disabled-items/dropdown-disabled-items-example';
import {DropdownFilterCustomExampleComponent} from './../examples/dropdown-filter-custom/dropdown-filter-custom-example';
import {DropdownFilterExampleComponent} from './../examples/dropdown-filter/dropdown-filter-example';
import {DropdownGroupExampleComponent} from './../examples/dropdown-group/dropdown-group-example';
import {DropdownMultiSelectExampleComponent} from './../examples/dropdown-multi-select/dropdown-multi-select-example';
import {DropdownNegativeExampleComponent} from './../examples/dropdown-negative/dropdown-negative-example';
import {DropdownOutlineExampleComponent} from './../examples/dropdown-outline/dropdown-outline-example';
import {DropdownPlaceholderExampleComponent} from './../examples/dropdown-placeholder/dropdown-placeholder-example';
import {DropdownReactiveExampleComponent} from './../examples/dropdown-reactive/dropdown-reactive-example';
import {DropdownRenderingItemsExampleComponent} from './../examples/dropdown-rendering-items/dropdown-rendering-items-example';
import {DropdownSimpleBindingExampleComponent} from './../examples/dropdown-simple-binding/dropdown-simple-binding-example';
import {DropdownStandardExampleComponent} from './../examples/dropdown-standard/dropdown-standard-example';
import {DropdownTemplateDrivenComponent} from './../examples/dropdown-template-driven/dropdown-template-driven-example';
import {DynamicTableDataExampleComponent} from './../examples/dynamic-table-data/dynamic-table-data-example';
import {DynamicTableEventExampleComponent} from './../examples/dynamic-table-event/dynamic-table-event-example';
import {DynamicTableWithoutDataExampleComponent} from './../examples/dynamic-table-without-data/dynamic-table-without-data-example';
import {DynamicTableExampleComponent} from './../examples/dynamic-table/dynamic-table-example';
import {CustomErrorStateMatcher} from './../examples/error-custom-matcher-formfield/error-custom-matcher-formfield-example';
import {ErrorExampleComponent} from './../examples/error/error-example';
import {FileUploaderAutoExampleComponent} from './../examples/file-uploader-auto/file-uploader-auto-example';
import {FileUploaderBasicExampleComponent} from './../examples/file-uploader-basic/file-uploader-basic-example';
import {FileUploaderDropZoneExampleComponent} from './../examples/file-uploader-drop-zone/file-uploader-drop-zone-example';
import {FileUploaderIntlExampleComponent} from './../examples/file-uploader-intl/file-uploader-intl-example';
import {FileUploaderReactiveExampleComponent} from './../examples/file-uploader-reactive/file-uploader-reactive-example';
import {FileUploaderSeparateRequestsExampleComponent} from './../examples/file-uploader-separate-requests/file-uploader-separate-requests-example';
import {FileUploaderTemplateDrivenExampleComponent} from './../examples/file-uploader-template-driven/file-uploader-template-driven-example';
import {FileUploaderTypeValidationExampleComponent} from './../examples/file-uploader-type-validation/file-uploader-type-validation-example';
import {FileUploaderValidationExampleComponent} from './../examples/file-uploader-validation/file-uploader-validation-example';
import {FileUploaderWithRequestExampleComponent} from './../examples/file-uploader-with-request/file-uploader-with-request-example';
import {FooterExampleComponent} from './../examples/footer/footer-example';
import {FormfieldAppearanceExampleComponent} from './../examples/formfield-appearance/formfield-appearance-example';
import {FormfieldBasicExampleComponent} from './../examples/formfield-basic/formfield-basic-example';
import {FormfieldCharacterCountExampleComponent} from './../examples/formfield-character-count/formfield-character-count-example';
import {FormfieldCustomLabelExampleComponent} from './../examples/formfield-custom-label/formfield-custom-label-example';
import {MyTelInput} from './../examples/formfield-custom-tel-input/formfield-custom-tel-input-example';
import {FormfieldCustomExampleComponent} from './../examples/formfield-custom/formfield-custom-example';
import {FormfieldErrorExampleComponent} from './../examples/formfield-error/formfield-error-example';
import {FormfieldExpertErrorExampleComponent} from './../examples/formfield-expert-error/formfield-expert-error-example';
import {FormfieldFloatingExampleComponent} from './../examples/formfield-floating/formfield-floating-example';
import {FormfieldGlobalExampleComponent} from './../examples/formfield-global/formfield-global-example';
import {FormfieldHintExampleComponent} from './../examples/formfield-hint/formfield-hint-example';
import {FormfieldMultipleErrorsExampleComponent} from './../examples/formfield-multiple-errors/formfield-multiple-errors-example';
import {FormfieldNegativeExampleComponent} from './../examples/formfield-negative/formfield-negative-example';
import {FormfieldNoteAndErrorExampleComponent} from './../examples/formfield-note-and-error/formfield-note-and-error-example';
import {FormfieldNoteExampleComponent} from './../examples/formfield-note/formfield-note-example';
import {FormfieldPasswordVisibilityExampleComponent} from './../examples/formfield-password-visibility/formfield-password-visibility-example';
import {FormfieldPlaceholderExampleComponent} from './../examples/formfield-placeholder/formfield-placeholder-example';
import {FormfieldPrefixSuffixAppendixExampleComponent} from './../examples/formfield-prefix-suffix-appendix/formfield-prefix-suffix-appendix-example';
import {FormfieldSimpleFormExampleComponent} from './../examples/formfield-simple-form/formfield-simple-form-example';
import {GridAlignContentExampleComponent} from './../examples/grid-align-content/grid-align-content-example';
import {GridAlignItemsExampleComponent} from './../examples/grid-align-items/grid-align-items-example';
import {GridAlignSelfExampleComponent} from './../examples/grid-align-self/grid-align-self-example';
import {GridColOrderExampleComponent} from './../examples/grid-col-order/grid-col-order-example';
import {GridJustifyExampleComponent} from './../examples/grid-justify/grid-justify-example';
import {GridMaxwidthExampleComponent} from './../examples/grid-maxwidth/grid-maxwidth-example';
import {GridMultiInputs1ExampleComponent} from './../examples/grid-multi-inputs-1/grid-multi-inputs-1-example';
import {GridMultiInputs2ExampleComponent} from './../examples/grid-multi-inputs-2/grid-multi-inputs-2-example';
import {GridNogutterExampleComponent} from './../examples/grid-nogutter/grid-nogutter-example';
import {GridOffsetExampleComponent} from './../examples/grid-offset/grid-offset-example';
import {GridOneInputExampleComponent} from './../examples/grid-one-input/grid-one-input-example';
import {HeaderCobrandingComponent} from './../examples/header-cobranding/header-cobranding-example';
import {HeaderIconsComponent} from './../examples/header-icons/header-icons-example';
import {HeaderTwoRowsDemoComponent} from './../examples/header-two-rows/header-two-rows-example';
import {HeaderDemoComponent} from './../examples/header/header-example';
import {HeadlineFontWeightsExampleComponent} from './../examples/headline-font-weights/headline-font-weights-example';
import {HeadlineLinksExampleComponent} from './../examples/headline-links/headline-links-example';
import {HeadlineNegativeExampleComponent} from './../examples/headline-negative/headline-negative-example';
import {HeadlineSizesExampleComponent} from './../examples/headline-sizes/headline-sizes-example';
import {IbanMaskComponent} from './../examples/iban-mask/iban-mask-example';
import {IconEssentialIconsExampleComponent} from './../examples/icon-essential-icons/icon-essential-icons-example';
import {IconEssentialOverrideExampleComponent} from './../examples/icon-essential-override/icon-essential-override-example';
import {IconFilledExampleComponent} from './../examples/icon-filled/icon-filled-example';
import {IconGeneralExampleComponent} from './../examples/icon-general/icon-general-example';
import {IconListFunctionalExampleComponent} from './../examples/icon-list-functional/icon-list-functional-example';
import {IconListProductExampleComponent} from './../examples/icon-list-product/icon-list-product-example';
import {IconOutlineExampleComponent} from './../examples/icon-outline/icon-outline-example';
import {IconRegistryExampleComponent} from './../examples/icon-registry/icon-registry-example';
import {IconSizesExampleComponent} from './../examples/icon-sizes/icon-sizes-example';
import {ImageAttributeExampleComponent} from './../examples/image-attribute/image-attribute-example';
import {ImageDefaultExampleComponent} from './../examples/image-default/image-default-example';
import {ImageFixedRatiosExampleComponent} from './../examples/image-fixed-ratios/image-fixed-ratios-example';
import {ImageRoundedExampleComponent} from './../examples/image-rounded/image-rounded-example';
import {InputAutoresizeExampleComponent} from './../examples/input-autoresize/input-autoresize-example';
import {InputReactiveExampleComponent} from './../examples/input-reactive/input-reactive-example';
import {InputStandaloneExampleComponent} from './../examples/input-standalone/input-standalone-example';
import {InputTemplateDrivenExampleComponent} from './../examples/input-template-driven/input-template-driven-example';
import {InputWithoutFormfieldExampleComponent} from './../examples/input-without-formfield/input-without-formfield-example';
import {InputExampleComponent} from './../examples/input/input-example';
import {LabelExampleComponent} from './../examples/label/label-example';
import {LinkBlackExampleComponent} from './../examples/link-black/link-black-example';
import {LinkDefaultExampleComponent} from './../examples/link-default/link-default-example';
import {LinkIconsExampleComponent} from './../examples/link-icons/link-icons-example';
import {LinkMultipleExampleComponent} from './../examples/link-multiple/link-multiple-example';
import {LinkNegativeExampleComponent} from './../examples/link-negative/link-negative-example';
import {LinkSizeExampleComponent} from './../examples/link-size/link-size-example';
import {LinkWithinTextExampleComponent} from './../examples/link-within-text/link-within-text-example';
import {ListCirclesExampleComponent} from './../examples/list-circles/list-circles-example';
import {ListCopytextExampleComponent} from './../examples/list-copytext/list-copytext-example';
import {CustomColorListExampleComponent} from './../examples/list-custom-color/list-custom-color-example';
import {ListIconsExampleComponent} from './../examples/list-icons/list-icons-example';
import {ListNegativeExampleComponent} from './../examples/list-negative/list-negative-example';
import {ListNestingExampleComponent} from './../examples/list-nesting/list-nesting-example';
import {ListOrderedExampleComponent} from './../examples/list-ordered/list-ordered-example';
import {ListUnorderedExampleComponent} from './../examples/list-unordered/list-unordered-example';
import {MarginSizesExampleComponent} from './../examples/margin-sizes/margin-sizes-example';
import {MarginUsageExampleComponent} from './../examples/margin-usage/margin-usage-example';
import {MaskCaseComponent} from './../examples/mask-case/mask-case-example';
import {MaskDeactivateComponent} from './../examples/mask-deactivate/mask-deactivate-example';
import {MaskDropCharactersComponent} from './../examples/mask-drop-characters/mask-drop-characters-example';
import {MaskSeparatorsComponent} from './../examples/mask-separators/mask-separators-example';
import {MaskValidationComponent} from './../examples/mask-validation/mask-validation-example';
import {MaskComponent} from './../examples/mask/mask-example';
import {NxMenuButtonExampleComponent} from './../examples/menu-button/menu-button-example';
import {NxMenuItemWithIconsExampleComponent} from './../examples/menu-item-with-icons/menu-item-with-icons-example';
import {NxMenuItemExampleComponent} from './../examples/menu-item/menu-item-example';
import {NxMenuLinkExampleComponent} from './../examples/menu-link/menu-link-example';
import {MenuExampleComponent} from './../examples/menu/menu-example';
import {MessageBannerExampleComponent} from './../examples/message-banner/message-banner-example';
import {MessageClosableExampleComponent} from './../examples/message-closable/message-closable-example';
import {MessageErrorExampleComponent} from './../examples/message-error/message-error-example';
import {MessageInfoExampleComponent} from './../examples/message-info/message-info-example';
import {MessageSuccessExampleComponent} from './../examples/message-success/message-success-example';
import {MessageToastCustomSettingsExampleComponent} from './../examples/message-toast-custom-settings/message-toast-custom-settings-example';
import {MessageToastOpeningExampleComponent} from './../examples/message-toast-opening/message-toast-opening-example';
import {MessageWarningExampleComponent} from './../examples/message-warning/message-warning-example';
import {ModalBasicExampleComponent} from './../examples/modal-basic/modal-basic-example';
import {ModalClosingNehaviourExampleComponent} from './../examples/modal-closing-behaviour/modal-closing-behaviour-example';
import {ModalClosingExampleComponent} from './../examples/modal-closing/modal-closing-example';
import {ModalContentActionsExampleComponent} from './../examples/modal-content-actions/modal-content-actions-example';
import {ModalDataInjectionExampleComponent} from './../examples/modal-data-injection/modal-data-injection-example';
import {ModalFixedWidthExampleComponent} from './../examples/modal-fixed-width/modal-fixed-width-example';
import {ModalOpeningExampleComponent} from './../examples/modal-opening/modal-opening-example';
import {NaturalLanguageFormBasicExampleComponent} from './../examples/natural-language-form-basic/natural-language-form-basic-example';
import {NaturalLanguageFormExtendedExampleComponent} from './../examples/natural-language-form-extended/natural-language-form-extended-example';
import {NaturalLanguageFormNegativeExampleComponent} from './../examples/natural-language-form-negative/natural-language-form-negative-example';
import {NaturalLanguageFormSizesExampleComponent} from './../examples/natural-language-form-sizes/natural-language-form-sizes-example';
import {NotificationPanelActionsExampleComponent} from './../examples/notification-panel-actions/notification-panel-actions-example';
import {NotificationPanelClickableExampleComponent} from './../examples/notification-panel-clickable/notification-panel-clickable-example';
import {NotificationPanelMixedExampleComponent} from './../examples/notification-panel-mixed/notification-panel-mixed-example';
import {NumberStepperAccessibilityExampleComponent} from './../examples/number-stepper-a11y/number-stepper-a11y-example';
import {NumberStepperAdditionsExampleComponent} from './../examples/number-stepper-additions/number-stepper-additions-example';
import {NumberStepperAutoResizingExampleComponent} from './../examples/number-stepper-auto-resizing/number-stepper-auto-resizing-example';
import {NumberStepperCustomLabelExampleComponent} from './../examples/number-stepper-custom-label/number-stepper-custom-label-example';
import {NumberStepperDisabledExplicitExampleComponent} from './../examples/number-stepper-disabled-explicit/number-stepper-disabled-explicit-example';
import {NumberStepperDisabledImplicitExampleComponent} from './../examples/number-stepper-disabled-implicit/number-stepper-disabled-implicit-example';
import {NumberStepperFloatingPointExampleComponent} from './../examples/number-stepper-floating-point/number-stepper-floating-point-example';
import {NumberStepperFormattingExampleComponent} from './../examples/number-stepper-formatting/number-stepper-formatting-example';
import {NumberStepperLocalizeExampleComponent} from './../examples/number-stepper-localize/number-stepper-localize-example';
import {NumberStepperNegativeExampleComponent} from './../examples/number-stepper-negative/number-stepper-negative-example';
import {NumberStepperReactiveExampleComponent} from './../examples/number-stepper-reactive/number-stepper-reactive-example';
import {NumberStepperSimpleBindingExampleComponent} from './../examples/number-stepper-simple-binding/number-stepper-simple-binding-example';
import {NumberStepperSizesExampleComponent} from './../examples/number-stepper-sizes/number-stepper-sizes-example';
import {NumberStepperStandaloneExampleComponent} from './../examples/number-stepper-standalone/number-stepper-standalone-example';
import {NumberStepperTemplateDrivenExampleComponent} from './../examples/number-stepper-template-driven/number-stepper-template-driven-example';
import {NumberStepperValidationExampleComponent} from './../examples/number-stepper-validation/number-stepper-validation-example';
import {OverlayLimitingFallbacksExampleComponent} from './../examples/overlay-limiting-fallbacks/overlay-limiting-fallbacks-example';
import {OverlayPositioningExampleComponent} from './../examples/overlay-positioning/overlay-positioning-example';
import {PageSearchAutocompleteExampleComponent} from './../examples/page-search-autocomplete/page-search-autocomplete-example';
import {PageSearchClickExampleComponent} from './../examples/page-search-click/page-search-click-example';
import {PageSearchHiddenExampleComponent} from './../examples/page-search-hidden/page-search-hidden-example';
import {PageSearchInputExampleComponent} from './../examples/page-search-input/page-search-input-example';
import {PaginationAdvancedExampleComponent} from './../examples/pagination-advanced/pagination-advanced-example';
import {PaginationLocalizeAdvancedExampleComponent} from './../examples/pagination-localize-advanced/pagination-localize-advanced-example';
import {PaginationLocalizeExampleComponent} from './../examples/pagination-localize/pagination-localize-example';
import {PaginationSimpleExampleComponent} from './../examples/pagination-simple/pagination-simple-example';
import {PopoverClickOutsideExampleComponent} from './../examples/popover-click-outside/popover-click-outside-example';
import {PopoverCustomExampleComponent} from './../examples/popover-custom/popover-custom-example';
import {PopoverHoverExampleComponent} from './../examples/popover-hover/popover-hover-example';
import {PopoverLazyloadExampleComponent} from './../examples/popover-lazyload/popover-lazyload-example';
import {PopoverModalExampleComponent} from './../examples/popover-modal/popover-modal-example';
import {PopoverPositioningExampleComponent} from './../examples/popover-positioning/popover-positioning-example';
import {PopoverScrollExampleComponent} from './../examples/popover-scroll/popover-scroll-example';
import {PopoverScrollableExampleComponent} from './../examples/popover-scrollable/popover-scrollable-example';
import {PopoverTableExampleComponent} from './../examples/popover-table/popover-table-example';
import {PopoverTriggerExampleComponent} from './../examples/popover-trigger/popover-trigger-example';
import {ProgressStepperCustomExampleComponent} from './../examples/progress-stepper-custom/progress-stepper-custom-example';
import {ProgressStepperFormExampleComponent} from './../examples/progress-stepper-form/progress-stepper-form-example';
import {ProgressStepperMultiGroupsExampleComponent} from './../examples/progress-stepper-multi-groups/progress-stepper-multi-groups-example';
import {ProgressStepperMultiVerticalExampleComponent} from './../examples/progress-stepper-multi-vertical/progress-stepper-multi-vertical-example';
import {ProgressStepperMultiExampleComponent} from './../examples/progress-stepper-multi/progress-stepper-multi-example';
import {ProgressStepperNonlinearExampleComponent} from './../examples/progress-stepper-nonlinear/progress-stepper-nonlinear-example';
import {ProgressStepperProgressExampleComponent} from './../examples/progress-stepper-progress/progress-stepper-progress-example';
import {ProgressStepperReactivemultiExampleComponent} from './../examples/progress-stepper-reactivemulti/progress-stepper-reactivemulti-example';
import {ProgressStepperReactivesingleExampleComponent} from './../examples/progress-stepper-reactivesingle/progress-stepper-reactivesingle-example';
import {ProgressStepperStepExampleComponent} from './../examples/progress-stepper-step/progress-stepper-step-example';
import {ProgressStepperTitleExampleComponent} from './../examples/progress-stepper-title/progress-stepper-title-example';
import {ProgressStepperExampleComponent} from './../examples/progress-stepper/progress-stepper-example';
import {ProgressbarBasicExampleComponent} from './../examples/progressbar-basic/progressbar-basic-example';
import {ProgressbarExampleComponent} from './../examples/progressbar/progressbar-example';
import {RadioButtonDisabledExampleComponent} from './../examples/radio-button-disabled/radio-button-disabled-example';
import {RadioButtonEventExampleComponent} from './../examples/radio-button-event/radio-button-event-example';
import {RadioButtonFormExampleComponent} from './../examples/radio-button-form/radio-button-form-example';
import {RadioButtonGroupHorizontalExampleComponent} from './../examples/radio-button-group-horizontal/radio-button-group-horizontal-example';
import {RadioButtonGroupLabelSizeExampleComponent} from './../examples/radio-button-group-label-size/radio-button-group-label-size-example';
import {RadioButtonGroupValidationExampleComponent} from './../examples/radio-button-group-validation/radio-button-group-validation-example';
import {RadioButtonGroupExampleComponent} from './../examples/radio-button-group/radio-button-group-example';
import {RadioButtonNegativeExampleComponent} from './../examples/radio-button-negative/radio-button-negative-example';
import {RadioButtonReactiveExampleComponent} from './../examples/radio-button-reactive/radio-button-reactive-example';
import {RadioButtonSampleExampleComponent} from './../examples/radio-button-sample/radio-button-sample-example';
import {RadioButtonSizesExampleComponent} from './../examples/radio-button-sizes/radio-button-sizes-example';
import {RadioButtonExampleComponent} from './../examples/radio-button/radio-button-example';
import {RadioToggleCustomExampleComponent} from './../examples/radio-toggle-custom/radio-toggle-custom-example';
import {RadioToggleFormExampleComponent} from './../examples/radio-toggle-form/radio-toggle-form-example';
import {RadioToggleReactiveExampleComponent} from './../examples/radio-toggle-reactive/radio-toggle-reactive-example';
import {RadioToggleValidationExampleComponent} from './../examples/radio-toggle-validation/radio-toggle-validation-example';
import {RadioToggleBasicExampleComponent} from './../examples/radio-toggle/radio-toggle-example';
import {RatingAccesibilityExampleComponent} from './../examples/rating-accessibility/rating-accessibility-example';
import {RatingBasicExampleComponent} from './../examples/rating-basic/rating-basic-example';
import {RatingDisabledExampleComponent} from './../examples/rating-disabled/rating-disabled-example';
import {RatingNegativeExampleComponent} from './../examples/rating-negative/rating-negative-example';
import {RatingReactiveExampleComponent} from './../examples/rating-reactive/rating-reactive-example';
import {RatingSimpleExampleComponent} from './../examples/rating-simple/rating-simple-example';
import {RatingTemplateExampleComponent} from './../examples/rating-template/rating-template-example';
import {SelectableCardBasicExampleComponent} from './../examples/selectable-card-basic/selectable-card-basic-example';
import {SelectableCardDynamicExampleComponent} from './../examples/selectable-card-dynamic/selectable-card-dynamic-example';
import {SelectableCardReactiveExampleComponent} from './../examples/selectable-card-reactive/selectable-card-reactive-example';
import {SelectableCardStatesExampleComponent} from './../examples/selectable-card-states/selectable-card-states-example';
import {SidebarFooterExampleComponent} from './../examples/sidebar-footer/sidebar-footer-example';
import {SidebarMethodsExampleComponent} from './../examples/sidebar-methods/sidebar-methods-example';
import {SidebarOutputsExampleComponent} from './../examples/sidebar-outputs/sidebar-outputs-example';
import {SidebarResizeableExampleComponent} from './../examples/sidebar-resizeable/sidebar-resizeable-example';
import {SidebarExampleComponent} from './../examples/sidebar/sidebar-example';
import {SidepanelFloatingExampleComponent} from './../examples/sidepanel-floating/sidepanel-floating-example';
import {SidepanelStaticExampleComponent} from './../examples/sidepanel-static/sidepanel-static-example';
import {SliderBasicExampleComponent} from './../examples/slider-basic/slider-basic-example';
import {SliderDecimalExampleComponent} from './../examples/slider-decimal/slider-decimal-example';
import {SliderDefaultExampleComponent} from './../examples/slider-default/slider-default-example';
import {SliderDisabledExampleComponent} from './../examples/slider-disabled/slider-disabled-example';
import {SliderInvertedExampleComponent} from './../examples/slider-inverted/slider-inverted-example';
import {SliderLabelExampleComponent} from './../examples/slider-label/slider-label-example';
import {SliderNegativeExampleComponent} from './../examples/slider-negative/slider-negative-example';
import {SliderReactiveExampleComponent} from './../examples/slider-reactive/slider-reactive-example';
import {SliderTemplateExampleComponent} from './../examples/slider-template/slider-template-example';
import {SliderTextualExampleComponent} from './../examples/slider-textual/slider-textual-example';
import {SliderThumbExampleComponent} from './../examples/slider-thumb/slider-thumb-example';
import {SmallStageContentVariationExampleComponent} from './../examples/small-stage-content-variation/small-stage-content-variation-example';
import {SmallStageDefaultExampleComponent} from './../examples/small-stage-default/small-stage-default-example';
import {SmallStageImageOffsetExampleComponent} from './../examples/small-stage-image-offset/small-stage-image-offset-example';
import {SmallStageTextNarrowExampleComponent} from './../examples/small-stage-text-narrow/small-stage-text-narrow-example';
import {SpinnerNegativeExampleComponent} from './../examples/spinner-negative/spinner-negative-example';
import {SpinnerSizesExampleComponent} from './../examples/spinner-sizes/spinner-sizes-example';
import {SwitcherDefaultExampleComponent} from './../examples/switcher-default/switcher-default-example';
import {SwitcherDisabledComponent} from './../examples/switcher-disabled/switcher-disabled-example';
import {SwitcherLabelLeftExampleComponent} from './../examples/switcher-label-left/switcher-label-left-example';
import {SwitcherLabelSmallExampleComponent} from './../examples/switcher-label-small/switcher-label-small-example';
import {SwitcherLargeExampleComponent} from './../examples/switcher-large/switcher-large-example';
import {SwitcherNegativeExampleComponent} from './../examples/switcher-negative/switcher-negative-example';
import {SwitcherReactiveFormExampleComponent} from './../examples/switcher-reactive-form/switcher-reactive-form-example';
import {SwitcherTemplateDrivenExampleComponent} from './../examples/switcher-template-driven/switcher-template-driven-example';
import {TableCondensedExampleComponent} from './../examples/table-condensed/table-condensed-example';
import {ExpandableRowExampleComponent} from './../examples/table-expandable/table-expandable-example';
import {TableFilterSortPaginateExampleComponent} from './../examples/table-filter-sort-paginate/table-filter-sort-paginate-example';
import {TableSelectingExampleComponent} from './../examples/table-selecting/table-selecting-example';
import {TableSingleSelectExampleComponent} from './../examples/table-single-select/table-single-select-example';
import {TableSortingExampleComponent} from './../examples/table-sorting/table-sorting-example';
import {TableZebraExampleComponent} from './../examples/table-zebra/table-zebra-example';
import {TableExampleComponent} from './../examples/table/table-example';
import {TabsAppearanceExampleComponent} from './../examples/tabs-appearance/tabs-appearance-example';
import {TabsAutoManualSelectExampleComponent} from './../examples/tabs-auto-manual-select/tabs-auto-manual-select-example';
import {TabsBasicExampleComponent} from './../examples/tabs-basic/tabs-basic-example';
import {TabsDisabledExampleComponent} from './../examples/tabs-disabled/tabs-disabled-example';
import {TabsDynamicExampleComponent} from './../examples/tabs-dynamic/tabs-dynamic-example';
import {TabsInjectionTokenExampleComponent} from './../examples/tabs-injection-token/tabs-injection-token-example';
import {TabsLazyExampleComponent} from './../examples/tabs-lazy/tabs-lazy-example';
import {TabsNavBarAppearanceExampleComponent} from './../examples/tabs-nav-bar-appearance/tabs-nav-bar-appearance-example';
import {TabsNavBarInjectionTokenExampleComponent} from './../examples/tabs-nav-bar-injection-token/tabs-nav-bar-injection-token-example';
import {TabsNavBarExampleComponent} from './../examples/tabs-nav-bar/tabs-nav-bar-example';
import {TabsNegativeExampleComponent} from './../examples/tabs-negative/tabs-negative-example';
import {TabsOutputEventsExampleComponent} from './../examples/tabs-output-events/tabs-output-events-example';
import {TabsResponsiveExampleComponent} from './../examples/tabs-responsive/tabs-responsive-example';
import {TabsStylingExampleComponent} from './../examples/tabs-styling/tabs-styling-example';
import {TabsTemplateExampleComponent} from './../examples/tabs-template/tabs-template-example';
import {TagListAccessibilityExampleComponent} from './../examples/taglist-a11y/taglist-a11y-example';
import {TagListBasicExampleComponent} from './../examples/taglist-basic/taglist-basic-example';
import {TagListDeleteExampleComponent} from './../examples/taglist-delete/taglist-delete-example';
import {TagListFormatterExampleComponent} from './../examples/taglist-formatter/taglist-formatter-example';
import {TagListKeywordExampleComponent} from './../examples/taglist-keyword/taglist-keyword-example';
import {TagListObjectsExampleComponent} from './../examples/taglist-objects/taglist-objects-example';
import {TagListOutputExampleComponent} from './../examples/taglist-output/taglist-output-example';
import {TagListReactiveExampleComponent} from './../examples/taglist-reactive/taglist-reactive-example';
import {TagListTemplateDrivenExampleComponent} from './../examples/taglist-templatedriven/taglist-templatedriven-example';
import {TaglistExampleComponent} from './../examples/taglist/taglist-example';
import {TimefieldDisabledExampleComponent} from './../examples/timefield-disabled/timefield-disabled-example';
import {TimefieldFormatTogglerExampleComponent} from './../examples/timefield-format-toggler/timefield-format-toggler-example';
import {TimefieldLocalizeExampleComponent} from './../examples/timefield-localize/timefield-localize-example';
import {TimefieldNegativeExampleComponent} from './../examples/timefield-negative/timefield-negative-example';
import {TimefieldReactiveExampleComponent} from './../examples/timefield-reactive/timefield-reactive-example';
import {TimefieldTemplateDrivenExampleComponent} from './../examples/timefield-template-driven/timefield-template-driven-example';
import {ToolbarPositioningContentExampleComponent} from './../examples/toolbar-positioning-content/toolbar-positioning-content-example';
import {ToolbarExampleComponent} from './../examples/toolbar/toolbar-example';
import {TooltipBasicExampleComponent} from './../examples/tooltip-basic/tooltip-basic-example';
import {TooltipDelayExampleComponent} from './../examples/tooltip-delay/tooltip-delay-example';
import {TooltipDisabledExampleComponent} from './../examples/tooltip-disabled/tooltip-disabled-example';
import {TooltipFallbacksTableExampleComponent} from './../examples/tooltip-fallbacks-table/tooltip-fallbacks-table-example';
import {TooltipPositionsExampleComponent} from './../examples/tooltip-positions/tooltip-positions-example';
import {TooltipProgrammaticExampleComponent} from './../examples/tooltip-programmatic/tooltip-programmatic-example';
import {TooltipSettingsExampleComponent} from './../examples/tooltip-settings/tooltip-settings-example';
import {TreeDemoComponent} from './../examples/tree/tree-example';
import {VideoAdvancedExampleComponent} from './../examples/video-advanced/video-advanced-example';
import {VideoCustomExampleComponent} from './../examples/video-custom/video-custom-example';
import {VideoExampleComponent} from './../examples/video/video-example';
import {ViewportChangeExampleComponent} from './../examples/viewport-change/viewport-change-example';
import {RadioToggleNegativeExampleComponent} from './../examples/radio-toggle-negative/radio-toggle-negative-example';

export interface ComponentExample {
  id: string;
  title: string;
  component: any;
}

export const EXAMPLES: {[key: string]: ComponentExample} = {
  'accessibility-high-contrast-svg': {
    id: 'accessibility-high-contrast-svg',
    title: 'High contrast svg example',
    component: AccessibilityHighContrastSvgExampleComponent
  },
  'accordion-error': {
    id: 'accordion-error',
    title: 'Accordion Error Example',
    component: AccordionErrorExampleComponent
  },
  'accordion-extra-light-negative': {
    id: 'accordion-extra-light-negative',
    title: 'Extra Light Negative Styling Example',
    component: AccordionExtraLightNegativeExampleComponent
  },
  'accordion-extra-light': {
    id: 'accordion-extra-light',
    title: 'Extra Light Example',
    component: AccordionExtraLightExampleComponent
  },
  'accordion-lazy': {
    id: 'accordion-lazy',
    title: 'Lazy Loading Example',
    component: AccordionLazyExampleComponent
  },
  'accordion-light-negative': {
    id: 'accordion-light-negative',
    title: 'Light Negative Styling Example',
    component: AccordionLightNegativeExampleComponent
  },
  'accordion-light': {
    id: 'accordion-light',
    title: 'Light Styling Example',
    component: AccordionLightExampleComponent
  },
  'accordion-multi': {
    id: 'accordion-multi',
    title: 'Multi Accordion Example',
    component: AccordionMultiExampleComponent
  },
  'accordion-negative': {
    id: 'accordion-negative',
    title: 'Negative Styling Example',
    component: AccordionNegativeExampleComponent
  },
  'accordion-standalone': {
    id: 'accordion-standalone',
    title: 'Standalone Expansion Panel Example',
    component: AccordionStandaloneExampleComponent
  },
  'accordion': {
    id: 'accordion',
    title: 'Basic Accordion Example',
    component: AccordionExampleComponent
  },
  'action-with-router': {
    id: 'action-with-router',
    title: 'Action with Router Example',
    component: ActionWithRouterDemoComponent
  },
  'action': {
    id: 'action',
    title: 'Action Example',
    component: ActionDemoComponent
  },
  'autocomplete-basic': {
    id: 'autocomplete-basic',
    title: 'Autocomplete example',
    component: AutocompleteBasicExampleComponent
  },
  'autocomplete-data-binding': {
    id: 'autocomplete-data-binding',
    title: 'Data binding examples',
    component: AutocompleteDataBindingExampleComponent
  },
  'autocomplete-default-rendering': {
    id: 'autocomplete-default-rendering',
    title: 'Default item rendering example',
    component: AutocompleteDefaultRenderingExampleComponent
  },
  'autocomplete-filtering': {
    id: 'autocomplete-filtering',
    title: 'Autocomplete filtering example',
    component: AutocompleteFilteringExampleComponent
  },
  'autocomplete-outline': {
    id: 'autocomplete-outline',
    title: 'Autocomplete with formfield example',
    component: AutocompleteOutlineExampleComponent
  },
  'badge-vibrant': {
    id: 'badge-vibrant',
    title: 'Vibrant badge example',
    component: BadgeVibrantExampleComponent
  },
  'badge': {
    id: 'badge',
    title: 'Basic badge example',
    component: BadgeExampleComponent
  },
  'breadcrumb-negative': {
    id: 'breadcrumb-negative',
    title: 'Negative styling example',
    component: BreadcrumbNegativeExampleComponent
  },
  'breadcrumb': {
    id: 'breadcrumb',
    title: 'Basic usage',
    component: BreadcrumbExampleComponent
  },
  'button-block': {
    id: 'button-block',
    title: 'Block Example',
    component: ButtonBlockExampleComponent
  },
  'button-danger': {
    id: 'button-danger',
    title: 'Danger Buttons Example',
    component: ButtonDangerExampleComponent
  },
  'button-icon': {
    id: 'button-icon',
    title: 'Icon Button Example',
    component: ButtonIconExampleComponent
  },
  'button-large': {
    id: 'button-large',
    title: 'Large Size Example',
    component: ButtonLargeExampleComponent
  },
  'button-medium': {
    id: 'button-medium',
    title: 'Medium Size Example',
    component: ButtonMediumExampleComponent
  },
  'button-negative': {
    id: 'button-negative',
    title: 'Negative Example',
    component: ButtonNegativeExampleComponent
  },
  'button-plain': {
    id: 'button-plain',
    title: 'Plain Buttons Example',
    component: ButtonPlainExampleComponent
  },
  'button-small-medium': {
    id: 'button-small-medium',
    title: 'Small Medium Size Example',
    component: ButtonSmallMediumExampleComponent
  },
  'button-small': {
    id: 'button-small',
    title: 'Small Size Example',
    component: ButtonSmallExampleComponent
  },
  'button-with-icon': {
    id: 'button-with-icon',
    title: 'Icon Example',
    component: ButtonWithIconExampleComponent
  },
  'button': {
    id: 'button',
    title: 'Basic Buttons Example',
    component: ButtonExampleComponent
  },
  'card-header-footer': {
    id: 'card-header-footer',
    title: 'Cards with header and footer example',
    component: CardHeaderFooterExampleComponent
  },
  'card': {
    id: 'card',
    title: 'Default Card Example',
    component: CardExampleComponent
  },
  'checkbox-group-basic': {
    id: 'checkbox-group-basic',
    title: 'Checkbox group basic example',
    component: CheckboxGroupBasicExampleComponent
  },
  'checkbox-group-dynamic': {
    id: 'checkbox-group-dynamic',
    title: 'Checkbox group dynamic checkboxes example',
    component: CheckboxGroupDynamicExampleComponent
  },
  'checkbox-group-horizontal': {
    id: 'checkbox-group-horizontal',
    title: 'Checkbox Group Horizontal Example',
    component: CheckboxGroupHorizontalExampleComponent
  },
  'checkbox-group-inheritance': {
    id: 'checkbox-group-inheritance',
    title: 'Checkbox group inheritance example',
    component: CheckboxGroupInheritanceExampleComponent
  },
  'checkbox-group-label-size': {
    id: 'checkbox-group-label-size',
    title: 'Checkbox group label size example',
    component: CheckboxGroupLabelSizeExampleComponent
  },
  'checkbox-group-reactive': {
    id: 'checkbox-group-reactive',
    title: 'Checkbox group reactive example',
    component: CheckboxGroupReactiveExampleComponent
  },
  'checkbox-group-validation': {
    id: 'checkbox-group-validation',
    title: 'Checkbox group validation example',
    component: CheckboxGroupValidationExampleComponent
  },
  'checkbox-label-size': {
    id: 'checkbox-label-size',
    title: 'Label size example',
    component: CheckboxLabelSizeExampleComponent
  },
  'checkbox-negative': {
    id: 'checkbox-negative',
    title: 'Negative styling example',
    component: CheckboxNegativeExampleComponent
  },
  'checkbox-outputs': {
    id: 'checkbox-outputs',
    title: 'Outputs example',
    component: CheckboxOutputsExampleComponent
  },
  'checkbox-reactive': {
    id: 'checkbox-reactive',
    title: 'Reactive example',
    component: CheckboxReactiveExampleComponent
  },
  'checkbox-simple-binding': {
    id: 'checkbox-simple-binding',
    title: 'Simple binding example',
    component: CheckboxSimpleBindingExampleComponent
  },
  'checkbox-states': {
    id: 'checkbox-states',
    title: 'Checkbox States',
    component: CheckboxStatesExampleComponent
  },
  'checkbox-template-driven': {
    id: 'checkbox-template-driven',
    title: 'Template-driven example with ngModel',
    component: CheckboxTemplateDrivenExampleComponent
  },
  'circle-toggle-group': {
    id: 'circle-toggle-group',
    title: 'Circle Toggle group example',
    component: CircleToggleGroupExampleComponent
  },
  'circle-toggle-negative': {
    id: 'circle-toggle-negative',
    title: 'Negative styling example',
    component: CircleToggleNegativeExampleComponent
  },
  'circle-toggle-reactive-disabled': {
    id: 'circle-toggle-reactive-disabled',
    title: 'Reactive disabled example',
    component: CircleToggleReactiveDisabledExampleComponent
  },
  'circle-toggle-reactive': {
    id: 'circle-toggle-reactive',
    title: 'Reactive example',
    component: CircleToggleReactiveExampleComponent
  },
  'circle-toggle-responsive': {
    id: 'circle-toggle-responsive',
    title: 'Disable responsive example',
    component: CircleToggleResponsiveExampleComponent
  },
  'circle-toggle-simple-binding': {
    id: 'circle-toggle-simple-binding',
    title: 'Simple binding example',
    component: CircleToggleSimpleBindingExampleComponent
  },
  'circle-toggle-standalone': {
    id: 'circle-toggle-standalone',
    title: 'Standalone example',
    component: CircleToggleStandaloneExampleComponent
  },
  'circle-toggle-template-driven': {
    id: 'circle-toggle-template-driven',
    title: 'Template driven example with ngModel',
    component: CircleToggleTemplateDrivenExampleComponent
  },
  'circle-toggle-text': {
    id: 'circle-toggle-text',
    title: 'Circle text example',
    component: CircleToggleTextExampleComponent
  },
  'code-input-disabled': {
    id: 'code-input-disabled',
    title: 'Disabled example',
    component: CodeInputDisabledExampleComponent
  },
  'code-input-four-char': {
    id: 'code-input-four-char',
    title: 'Four character code input example',
    component: CodeInputFourCharExampleComponent
  },
  'code-input-localize': {
    id: 'code-input-localize',
    title: 'Localization example',
    component: CodeInputLocalizeExampleComponent
  },
  'code-input-model': {
    id: 'code-input-model',
    title: 'Manipulating model example',
    component: CodeInputModelExampleComponent
  },
  'code-input-negative': {
    id: 'code-input-negative',
    title: 'Negative styling example',
    component: CodeInputNegativeExampleComponent
  },
  'code-input-seven-char': {
    id: 'code-input-seven-char',
    title: 'Seven character code input example',
    component: CodeInputSevenCharExampleComponent
  },
  'code-input-six-char': {
    id: 'code-input-six-char',
    title: 'Six character code input example',
    component: CodeInputSixCharExampleComponent
  },
  'code-input-type': {
    id: 'code-input-type',
    title: 'Code input type example',
    component: CodeInputTypeExampleComponent
  },
  'comparison-table-disabled-columns': {
    id: 'comparison-table-disabled-columns',
    title: 'Disabled Columns example',
    component: ComparisonTableDisabledColumnsExampleComponent
  },
  'comparison-table-dynamic': {
    id: 'comparison-table-dynamic',
    title: 'Dynamically filled table',
    component: ComparisonTableDynamicExampleComponent
  },
  'comparison-table-form-elements': {
    id: 'comparison-table-form-elements',
    title: 'Add custom form elements to the table',
    component: ComparisonTableFormElementsExampleComponent
  },
  'comparison-table-modify-theming': {
    id: 'comparison-table-modify-theming',
    title: 'Modify theming of examples',
    component: ComparisonTableModifyThemingExampleComponent
  },
  'comparison-table-row-group': {
    id: 'comparison-table-row-group',
    title: 'Row group example',
    component: ComparisonTableRowGroupExampleComponent
  },
  'comparison-table-with-intersection': {
    id: 'comparison-table-with-intersection',
    title: 'Intersection example',
    component: ComparisonTableWithIntersectionExampleComponent
  },
  'comparison-table-with-toggle-sections': {
    id: 'comparison-table-with-toggle-sections',
    title: 'Toggle section example',
    component: ComparisonTableWithToggleSectionsExampleComponent
  },
  'comparison-table': {
    id: 'comparison-table',
    title: 'Basic example',
    component: ComparisonTableExampleComponent
  },
  'context-menu-basic': {
    id: 'context-menu-basic',
    title: 'Basic Context Menu Example',
    component: ContextMenuBasicExampleComponent
  },
  'context-menu-data': {
    id: 'context-menu-data',
    title: 'Data Context Menu Example',
    component: ContextMenuDataExampleComponent
  },
  'context-menu-disabled': {
    id: 'context-menu-disabled',
    title: 'Disabled Context Menu Example',
    component: ContextMenuDisabledExampleComponent
  },
  'context-menu-icons': {
    id: 'context-menu-icons',
    title: 'Icons Context Menu Example',
    component: ContextMenuIconsExampleComponent
  },
  'context-menu-lazy': {
    id: 'context-menu-lazy',
    title: 'Lazy Context Menu Example',
    component: ContextMenuLazyExampleComponent
  },
  'context-menu-nested': {
    id: 'context-menu-nested',
    title: 'Nested Context Menu Example',
    component: ContextMenuNestedExampleComponent
  },
  'context-menu-programmatic': {
    id: 'context-menu-programmatic',
    title: 'Programmatic Context Menu Example',
    component: ContextMenuProgrammaticExampleComponent
  },
  'context-menu-scroll-strategy': {
    id: 'context-menu-scroll-strategy',
    title: 'Scroll Strategy Context Menu Example',
    component: ContextMenuScrollStrategyExampleComponent
  },
  'copytext-negative': {
    id: 'copytext-negative',
    title: 'Negative styling example',
    component: CopytextNegativeExampleComponent
  },
  'copytext-sizes': {
    id: 'copytext-sizes',
    title: 'Size examples',
    component: CopytextSizesExampleComponent
  },
  'datefield-basic': {
    id: 'datefield-basic',
    title: 'Basic date field example',
    component: DatefieldBasicExampleComponent
  },
  'datefield-disabled': {
    id: 'datefield-disabled',
    title: 'Disabled example',
    component: DatefieldDisabledExampleComponent
  },
  'datefield-filter': {
    id: 'datefield-filter',
    title: 'Date filter example',
    component: DatefieldFilterExampleComponent
  },
  'datefield-format-injection': {
    id: 'datefield-format-injection',
    title: 'Custom date formats injection token',
    component: DatefieldFormatInjectionExampleComponent
  },
  'datefield-formatting': {
    id: 'datefield-formatting',
    title: 'Formatting example',
    component: DatefieldFormattingExampleComponent
  },
  'datefield-injection-token': {
    id: 'datefield-injection-token',
    title: 'Datepicker injection token',
    component: DatefieldInjectionTokenExampleComponent
  },
  'datefield-iso': {
    id: 'datefield-iso',
    title: 'Use strings as inputs',
    component: DatefieldIsoExampleComponent
  },
  'datefield-localize-date': {
    id: 'datefield-localize-date',
    title: 'Localizing date example',
    component: DatefieldLocalizeDateExampleComponent
  },
  'datefield-localize-texts': {
    id: 'datefield-localize-texts',
    title: 'Localizing labels and messages example',
    component: DatefieldLocalizeTextsExampleComponent
  },
  'datefield-manual': {
    id: 'datefield-manual',
    title: 'Manual control example',
    component: DatefieldManualExampleComponent
  },
  'datefield-min-max': {
    id: 'datefield-min-max',
    title: 'Example of setting min and max values',
    component: DatefieldMinMaxExampleComponent
  },
  'datefield-parsing': {
    id: 'datefield-parsing',
    title: 'Parsing example',
    component: DatefieldParsingExampleComponent
  },
  'datefield-range': {
    id: 'datefield-range',
    title: 'Date range example',
    component: DatefieldRangeExampleComponent
  },
  'datefield-reactive': {
    id: 'datefield-reactive',
    title: 'Reactive example',
    component: DatefieldReactiveExampleComponent
  },
  'datefield-startview': {
    id: 'datefield-startview',
    title: 'Start view example',
    component: DatefieldStartviewExampleComponent
  },
  'datefield-toggle-focus': {
    id: 'datefield-toggle-focus',
    title: 'Datepicker toggle focus example',
    component: DatefieldToggleFocusExampleComponent
  },
  'dropdown-custom-label': {
    id: 'dropdown-custom-label',
    title: 'Custom label example',
    component: DropdownCustomLabelExampleComponent
  },
  'dropdown-disabled-items': {
    id: 'dropdown-disabled-items',
    title: 'Disabled items example',
    component: DropdownDisabledItemsExampleComponent
  },
  'dropdown-filter-custom': {
    id: 'dropdown-filter-custom',
    title: 'Custom Filter Example',
    component: DropdownFilterCustomExampleComponent
  },
  'dropdown-filter': {
    id: 'dropdown-filter',
    title: 'Filter example',
    component: DropdownFilterExampleComponent
  },
  'dropdown-group': {
    id: 'dropdown-group',
    title: 'Dropdown group example',
    component: DropdownGroupExampleComponent
  },
  'dropdown-multi-select': {
    id: 'dropdown-multi-select',
    title: 'Multi select example',
    component: DropdownMultiSelectExampleComponent
  },
  'dropdown-negative': {
    id: 'dropdown-negative',
    title: 'Negative styling example',
    component: DropdownNegativeExampleComponent
  },
  'dropdown-outline': {
    id: 'dropdown-outline',
    title: 'Outline formfield example',
    component: DropdownOutlineExampleComponent
  },
  'dropdown-placeholder': {
    id: 'dropdown-placeholder',
    title: 'Dropdown with placeholder example',
    component: DropdownPlaceholderExampleComponent
  },
  'dropdown-reactive': {
    id: 'dropdown-reactive',
    title: 'Reactive example',
    component: DropdownReactiveExampleComponent
  },
  'dropdown-rendering-items': {
    id: 'dropdown-rendering-items',
    title: 'Examples for rendering items',
    component: DropdownRenderingItemsExampleComponent
  },
  'dropdown-simple-binding': {
    id: 'dropdown-simple-binding',
    title: 'Simple binding example',
    component: DropdownSimpleBindingExampleComponent
  },
  'dropdown-standard': {
    id: 'dropdown-standard',
    title: 'Standard dropdown example',
    component: DropdownStandardExampleComponent
  },
  'dropdown-template-driven': {
    id: 'dropdown-template-driven',
    title: 'Template driven example',
    component: DropdownTemplateDrivenComponent
  },
  'dynamic-table-data': {
    id: 'dynamic-table-data',
    title: 'Table Data Example',
    component: DynamicTableDataExampleComponent
  },
  'dynamic-table-event': {
    id: 'dynamic-table-event',
    title: 'Table Event Example',
    component: DynamicTableEventExampleComponent
  },
  'dynamic-table-without-data': {
    id: 'dynamic-table-without-data',
    title: 'Table Without Data Example',
    component: DynamicTableWithoutDataExampleComponent
  },
  'dynamic-table': {
    id: 'dynamic-table',
    title: 'Table Example',
    component: DynamicTableExampleComponent
  },
  'error-custom-matcher-formfield': {
    id: 'error-custom-matcher-formfield',
    title: 'Custom error state matching Formfield Example',
    component: CustomErrorStateMatcher
  },
  'error': {
    id: 'error',
    title: 'Error example',
    component: ErrorExampleComponent
  },
  'file-uploader-auto': {
    id: 'file-uploader-auto',
    title: 'File uploader auto uploading example',
    component: FileUploaderAutoExampleComponent
  },
  'file-uploader-basic': {
    id: 'file-uploader-basic',
    title: 'File uploader example',
    component: FileUploaderBasicExampleComponent
  },
  'file-uploader-drop-zone': {
    id: 'file-uploader-drop-zone',
    title: 'File uploader drop zone example',
    component: FileUploaderDropZoneExampleComponent
  },
  'file-uploader-intl': {
    id: 'file-uploader-intl',
    title: 'File uploader internationalization example',
    component: FileUploaderIntlExampleComponent
  },
  'file-uploader-reactive': {
    id: 'file-uploader-reactive',
    title: 'File uploader reactive form example',
    component: FileUploaderReactiveExampleComponent
  },
  'file-uploader-separate-requests': {
    id: 'file-uploader-separate-requests',
    title: 'Example with separate uploading requests',
    component: FileUploaderSeparateRequestsExampleComponent
  },
  'file-uploader-template-driven': {
    id: 'file-uploader-template-driven',
    title: 'File uploader template-driven example',
    component: FileUploaderTemplateDrivenExampleComponent
  },
  'file-uploader-type-validation': {
    id: 'file-uploader-type-validation',
    title: 'File uploader type validation example',
    component: FileUploaderTypeValidationExampleComponent
  },
  'file-uploader-validation': {
    id: 'file-uploader-validation',
    title: 'File uploader validation example',
    component: FileUploaderValidationExampleComponent
  },
  'file-uploader-with-request': {
    id: 'file-uploader-with-request',
    title: 'Custom uploading implementation',
    component: FileUploaderWithRequestExampleComponent
  },
  'footer': {
    id: 'footer',
    title: 'Footer',
    component: FooterExampleComponent
  },
  'formfield-appearance': {
    id: 'formfield-appearance',
    title: 'Appearance example',
    component: FormfieldAppearanceExampleComponent
  },
  'formfield-basic': {
    id: 'formfield-basic',
    title: 'Basic formfield example',
    component: FormfieldBasicExampleComponent
  },
  'formfield-character-count': {
    id: 'formfield-character-count',
    title: 'Character count example',
    component: FormfieldCharacterCountExampleComponent
  },
  'formfield-custom-label': {
    id: 'formfield-custom-label',
    title: 'Custom formfield label example',
    component: FormfieldCustomLabelExampleComponent
  },
  'formfield-custom-tel-input': {
    id: 'formfield-custom-tel-input',
    title: 'Implementing Custom Formfield Control example',
    component: MyTelInput
  },
  'formfield-custom': {
    id: 'formfield-custom',
    title: 'Usage Custom Formfield Control example',
    component: FormfieldCustomExampleComponent
  },
  'formfield-error': {
    id: 'formfield-error',
    title: 'Error example',
    component: FormfieldErrorExampleComponent
  },
  'formfield-expert-error': {
    id: 'formfield-expert-error',
    title: 'Expert error message example',
    component: FormfieldExpertErrorExampleComponent
  },
  'formfield-floating': {
    id: 'formfield-floating',
    title: 'Floating examples',
    component: FormfieldFloatingExampleComponent
  },
  'formfield-global': {
    id: 'formfield-global',
    title: 'Global default settings example',
    component: FormfieldGlobalExampleComponent
  },
  'formfield-hint': {
    id: 'formfield-hint',
    title: 'Hint example',
    component: FormfieldHintExampleComponent
  },
  'formfield-multiple-errors': {
    id: 'formfield-multiple-errors',
    title: 'Multiple errors example',
    component: FormfieldMultipleErrorsExampleComponent
  },
  'formfield-negative': {
    id: 'formfield-negative',
    title: 'Negative styling example',
    component: FormfieldNegativeExampleComponent
  },
  'formfield-note-and-error': {
    id: 'formfield-note-and-error',
    title: 'Combining notes and errors example',
    component: FormfieldNoteAndErrorExampleComponent
  },
  'formfield-note': {
    id: 'formfield-note',
    title: 'Note example',
    component: FormfieldNoteExampleComponent
  },
  'formfield-password-visibility': {
    id: 'formfield-password-visibility',
    title: 'Password visibility toggle example',
    component: FormfieldPasswordVisibilityExampleComponent
  },
  'formfield-placeholder': {
    id: 'formfield-placeholder',
    title: 'Placeholder example',
    component: FormfieldPlaceholderExampleComponent
  },
  'formfield-prefix-suffix-appendix': {
    id: 'formfield-prefix-suffix-appendix',
    title: 'Prefix, suffix and appendix examples',
    component: FormfieldPrefixSuffixAppendixExampleComponent
  },
  'formfield-simple-form': {
    id: 'formfield-simple-form',
    title: 'Simple form example',
    component: FormfieldSimpleFormExampleComponent
  },
  'grid-align-content': {
    id: 'grid-align-content',
    title: 'Align content example',
    component: GridAlignContentExampleComponent
  },
  'grid-align-items': {
    id: 'grid-align-items',
    title: 'Align items example',
    component: GridAlignItemsExampleComponent
  },
  'grid-align-self': {
    id: 'grid-align-self',
    title: 'Align self example',
    component: GridAlignSelfExampleComponent
  },
  'grid-col-order': {
    id: 'grid-col-order',
    title: 'Column order example',
    component: GridColOrderExampleComponent
  },
  'grid-justify': {
    id: 'grid-justify',
    title: 'Justify row example',
    component: GridJustifyExampleComponent
  },
  'grid-maxwidth': {
    id: 'grid-maxwidth',
    title: 'Max width example',
    component: GridMaxwidthExampleComponent
  },
  'grid-multi-inputs-1': {
    id: 'grid-multi-inputs-1',
    title: 'Multiple inputs example 1',
    component: GridMultiInputs1ExampleComponent
  },
  'grid-multi-inputs-2': {
    id: 'grid-multi-inputs-2',
    title: 'Multiple inputs example 2',
    component: GridMultiInputs2ExampleComponent
  },
  'grid-nogutter': {
    id: 'grid-nogutter',
    title: 'Current tier of the grid',
    component: GridNogutterExampleComponent
  },
  'grid-offset': {
    id: 'grid-offset',
    title: 'Offset example',
    component: GridOffsetExampleComponent
  },
  'grid-one-input': {
    id: 'grid-one-input',
    title: 'One input example',
    component: GridOneInputExampleComponent
  },
  'header-cobranding': {
    id: 'header-cobranding',
    title: 'Header with co-branding example',
    component: HeaderCobrandingComponent
  },
  'header-icons': {
    id: 'header-icons',
    title: 'Header with functional icons example',
    component: HeaderIconsComponent
  },
  'header-two-rows': {
    id: 'header-two-rows',
    title: 'Header Two Rows Example',
    component: HeaderTwoRowsDemoComponent
  },
  'header': {
    id: 'header',
    title: 'Single Row Header Example',
    component: HeaderDemoComponent
  },
  'headline-font-weights': {
    id: 'headline-font-weights',
    title: 'Headline Font Sizes Example',
    component: HeadlineFontWeightsExampleComponent
  },
  'headline-links': {
    id: 'headline-links',
    title: 'Headline Links Example',
    component: HeadlineLinksExampleComponent
  },
  'headline-negative': {
    id: 'headline-negative',
    title: 'Headline Negative Example',
    component: HeadlineNegativeExampleComponent
  },
  'headline-sizes': {
    id: 'headline-sizes',
    title: 'Headline Sizes Example',
    component: HeadlineSizesExampleComponent
  },
  'iban-mask': {
    id: 'iban-mask',
    title: 'IBAN mask example',
    component: IbanMaskComponent
  },
  'icon-essential-icons': {
    id: 'icon-essential-icons',
    title: 'Essential Icons Example',
    component: IconEssentialIconsExampleComponent
  },
  'icon-essential-override': {
    id: 'icon-essential-override',
    title: 'Essential Icon Override Example',
    component: IconEssentialOverrideExampleComponent
  },
  'icon-filled': {
    id: 'icon-filled',
    title: 'Icons Filled Example',
    component: IconFilledExampleComponent
  },
  'icon-general': {
    id: 'icon-general',
    title: 'General Icons Example',
    component: IconGeneralExampleComponent
  },
  'icon-list-functional': {
    id: 'icon-list-functional',
    title: 'Functional Icons List Example',
    component: IconListFunctionalExampleComponent
  },
  'icon-list-product': {
    id: 'icon-list-product',
    title: 'Product Icons List Example',
    component: IconListProductExampleComponent
  },
  'icon-outline': {
    id: 'icon-outline',
    title: 'Icons Outline Example',
    component: IconOutlineExampleComponent
  },
  'icon-registry': {
    id: 'icon-registry',
    title: 'Register Icons Example',
    component: IconRegistryExampleComponent
  },
  'icon-sizes': {
    id: 'icon-sizes',
    title: 'Icons Sizes Example',
    component: IconSizesExampleComponent
  },
  'image-attribute': {
    id: 'image-attribute',
    title: 'Images Attribute styling example',
    component: ImageAttributeExampleComponent
  },
  'image-default': {
    id: 'image-default',
    title: 'Default styling example',
    component: ImageDefaultExampleComponent
  },
  'image-fixed-ratios': {
    id: 'image-fixed-ratios',
    title: 'Fixed ratio styling example',
    component: ImageFixedRatiosExampleComponent
  },
  'image-rounded': {
    id: 'image-rounded',
    title: 'Rounded styling example',
    component: ImageRoundedExampleComponent
  },
  'input-autoresize': {
    id: 'input-autoresize',
    title: 'Textarea with autoresize example',
    component: InputAutoresizeExampleComponent
  },
  'input-reactive': {
    id: 'input-reactive',
    title: 'Reactive example',
    component: InputReactiveExampleComponent
  },
  'input-standalone': {
    id: 'input-standalone',
    title: 'Standalone example',
    component: InputStandaloneExampleComponent
  },
  'input-template-driven': {
    id: 'input-template-driven',
    title: 'Template-driven example with ngModel',
    component: InputTemplateDrivenExampleComponent
  },
  'input-without-formfield': {
    id: 'input-without-formfield',
    title: 'Input field without formfield example',
    component: InputWithoutFormfieldExampleComponent
  },
  'input': {
    id: 'input',
    title: 'Basic input field example',
    component: InputExampleComponent
  },
  'label': {
    id: 'label',
    title: 'Label example',
    component: LabelExampleComponent
  },
  'link-black': {
    id: 'link-black',
    title: 'Black link example',
    component: LinkBlackExampleComponent
  },
  'link-default': {
    id: 'link-default',
    title: 'Default link example',
    component: LinkDefaultExampleComponent
  },
  'link-icons': {
    id: 'link-icons',
    title: 'Link with icon example',
    component: LinkIconsExampleComponent
  },
  'link-multiple': {
    id: 'link-multiple',
    title: 'Multiple modifiers example',
    component: LinkMultipleExampleComponent
  },
  'link-negative': {
    id: 'link-negative',
    title: 'Negative styling example',
    component: LinkNegativeExampleComponent
  },
  'link-size': {
    id: 'link-size',
    title: 'Sizes example',
    component: LinkSizeExampleComponent
  },
  'link-within-text': {
    id: 'link-within-text',
    title: 'Link within text example',
    component: LinkWithinTextExampleComponent
  },
  'list-circles': {
    id: 'list-circles',
    title: 'Ordered list with circles example',
    component: ListCirclesExampleComponent
  },
  'list-copytext': {
    id: 'list-copytext',
    title: 'List sizes copytext example',
    component: ListCopytextExampleComponent
  },
  'list-custom-color': {
    id: 'list-custom-color',
    title: 'Custom list item color example',
    component: CustomColorListExampleComponent
  },
  'list-icons': {
    id: 'list-icons',
    title: 'Lists with icons examples',
    component: ListIconsExampleComponent
  },
  'list-negative': {
    id: 'list-negative',
    title: 'Negative styling example',
    component: ListNegativeExampleComponent
  },
  'list-nesting': {
    id: 'list-nesting',
    title: 'Nested lists',
    component: ListNestingExampleComponent
  },
  'list-ordered': {
    id: 'list-ordered',
    title: 'Ordered list example',
    component: ListOrderedExampleComponent
  },
  'list-unordered': {
    id: 'list-unordered',
    title: 'Unordered list example',
    component: ListUnorderedExampleComponent
  },
  'margin-sizes': {
    id: 'margin-sizes',
    title: 'Margin sizes',
    component: MarginSizesExampleComponent
  },
  'margin-usage': {
    id: 'margin-usage',
    title: 'Margin sizes example',
    component: MarginUsageExampleComponent
  },
  'mask-case': {
    id: 'mask-case',
    title: 'Set case example',
    component: MaskCaseComponent
  },
  'mask-deactivate': {
    id: 'mask-deactivate',
    title: 'Mask Deactivate example',
    component: MaskDeactivateComponent
  },
  'mask-drop-characters': {
    id: 'mask-drop-characters',
    title: 'Drop special characters example',
    component: MaskDropCharactersComponent
  },
  'mask-separators': {
    id: 'mask-separators',
    title: 'Custom separators example',
    component: MaskSeparatorsComponent
  },
  'mask-validation': {
    id: 'mask-validation',
    title: 'Validation example',
    component: MaskValidationComponent
  },
  'mask': {
    id: 'mask',
    title: 'Mask example',
    component: MaskComponent
  },
  'menu-button': {
    id: 'menu-button',
    title: 'Menu button variations',
    component: NxMenuButtonExampleComponent
  },
  'menu-item-with-icons': {
    id: 'menu-item-with-icons',
    title: 'Menu item with large indentation and button icons',
    component: NxMenuItemWithIconsExampleComponent
  },
  'menu-item': {
    id: 'menu-item',
    title: 'Menu item',
    component: NxMenuItemExampleComponent
  },
  'menu-link': {
    id: 'menu-link',
    title: 'Menu links',
    component: NxMenuLinkExampleComponent
  },
  'menu': {
    id: 'menu',
    title: 'Complete menu example',
    component: MenuExampleComponent
  },
  'message-banner': {
    id: 'message-banner',
    title: 'Notification banner example',
    component: MessageBannerExampleComponent
  },
  'message-closable': {
    id: 'message-closable',
    title: 'Closable example',
    component: MessageClosableExampleComponent
  },
  'message-error': {
    id: 'message-error',
    title: 'Error context example',
    component: MessageErrorExampleComponent
  },
  'message-info': {
    id: 'message-info',
    title: 'Info context example',
    component: MessageInfoExampleComponent
  },
  'message-success': {
    id: 'message-success',
    title: 'Success context example',
    component: MessageSuccessExampleComponent
  },
  'message-toast-custom-settings': {
    id: 'message-toast-custom-settings',
    title: 'Custom Settings example',
    component: MessageToastCustomSettingsExampleComponent
  },
  'message-toast-opening': {
    id: 'message-toast-opening',
    title: 'Opening example',
    component: MessageToastOpeningExampleComponent
  },
  'message-warning': {
    id: 'message-warning',
    title: 'Warning context example',
    component: MessageWarningExampleComponent
  },
  'modal-basic': {
    id: 'modal-basic',
    title: 'Basic use case example',
    component: ModalBasicExampleComponent
  },
  'modal-closing-behaviour': {
    id: 'modal-closing-behaviour',
    title: 'Closing behaviour example',
    component: ModalClosingNehaviourExampleComponent
  },
  'modal-closing': {
    id: 'modal-closing',
    title: 'Modal closing example',
    component: ModalClosingExampleComponent
  },
  'modal-content-actions': {
    id: 'modal-content-actions',
    title: 'Modal with content and actions example',
    component: ModalContentActionsExampleComponent
  },
  'modal-data-injection': {
    id: 'modal-data-injection',
    title: 'Data injection example',
    component: ModalDataInjectionExampleComponent
  },
  'modal-fixed-width': {
    id: 'modal-fixed-width',
    title: 'Fixed width example',
    component: ModalFixedWidthExampleComponent
  },
  'modal-opening': {
    id: 'modal-opening',
    title: 'Modal opening example',
    component: ModalOpeningExampleComponent
  },
  'natural-language-form-basic': {
    id: 'natural-language-form-basic',
    title: 'Basic example',
    component: NaturalLanguageFormBasicExampleComponent
  },
  'natural-language-form-extended': {
    id: 'natural-language-form-extended',
    title: 'Extended example',
    component: NaturalLanguageFormExtendedExampleComponent
  },
  'natural-language-form-negative': {
    id: 'natural-language-form-negative',
    title: 'Negative styling example',
    component: NaturalLanguageFormNegativeExampleComponent
  },
  'natural-language-form-sizes': {
    id: 'natural-language-form-sizes',
    title: 'Size example',
    component: NaturalLanguageFormSizesExampleComponent
  },
  'notification-panel-actions': {
    id: 'notification-panel-actions',
    title: 'Notification Panel',
    component: NotificationPanelActionsExampleComponent
  },
  'notification-panel-clickable': {
    id: 'notification-panel-clickable',
    title: 'Notification Panel',
    component: NotificationPanelClickableExampleComponent
  },
  'notification-panel-mixed': {
    id: 'notification-panel-mixed',
    title: 'Notification Panel',
    component: NotificationPanelMixedExampleComponent
  },
  'number-stepper-a11y': {
    id: 'number-stepper-a11y',
    title: 'Number Stepper Accessiblity Example',
    component: NumberStepperAccessibilityExampleComponent
  },
  'number-stepper-additions': {
    id: 'number-stepper-additions',
    title: 'Prefix and Suffix',
    component: NumberStepperAdditionsExampleComponent
  },
  'number-stepper-auto-resizing': {
    id: 'number-stepper-auto-resizing',
    title: 'Auto resizing example',
    component: NumberStepperAutoResizingExampleComponent
  },
  'number-stepper-custom-label': {
    id: 'number-stepper-custom-label',
    title: 'Custom label example',
    component: NumberStepperCustomLabelExampleComponent
  },
  'number-stepper-disabled-explicit': {
    id: 'number-stepper-disabled-explicit',
    title: 'Disabling through nxDisabled property example',
    component: NumberStepperDisabledExplicitExampleComponent
  },
  'number-stepper-disabled-implicit': {
    id: 'number-stepper-disabled-implicit',
    title: 'Disabled as part of disabled form example',
    component: NumberStepperDisabledImplicitExampleComponent
  },
  'number-stepper-floating-point': {
    id: 'number-stepper-floating-point',
    title: 'Floating point example',
    component: NumberStepperFloatingPointExampleComponent
  },
  'number-stepper-formatting': {
    id: 'number-stepper-formatting',
    title: 'Number Formatting example',
    component: NumberStepperFormattingExampleComponent
  },
  'number-stepper-localize': {
    id: 'number-stepper-localize',
    title: 'Localization Example',
    component: NumberStepperLocalizeExampleComponent
  },
  'number-stepper-negative': {
    id: 'number-stepper-negative',
    title: 'Negative styling example',
    component: NumberStepperNegativeExampleComponent
  },
  'number-stepper-reactive': {
    id: 'number-stepper-reactive',
    title: 'Reactive example',
    component: NumberStepperReactiveExampleComponent
  },
  'number-stepper-simple-binding': {
    id: 'number-stepper-simple-binding',
    title: 'Simple binding example',
    component: NumberStepperSimpleBindingExampleComponent
  },
  'number-stepper-sizes': {
    id: 'number-stepper-sizes',
    title: 'Number Stepper Sizes',
    component: NumberStepperSizesExampleComponent
  },
  'number-stepper-standalone': {
    id: 'number-stepper-standalone',
    title: 'Standalone example',
    component: NumberStepperStandaloneExampleComponent
  },
  'number-stepper-template-driven': {
    id: 'number-stepper-template-driven',
    title: 'Template-driven example with ngModel',
    component: NumberStepperTemplateDrivenExampleComponent
  },
  'number-stepper-validation': {
    id: 'number-stepper-validation',
    title: 'Validation example',
    component: NumberStepperValidationExampleComponent
  },
  'overlay-limiting-fallbacks': {
    id: 'overlay-limiting-fallbacks',
    title: 'Notification Panel',
    component: OverlayLimitingFallbacksExampleComponent
  },
  'overlay-positioning': {
    id: 'overlay-positioning',
    title: 'Notification Panel',
    component: OverlayPositioningExampleComponent
  },
  'page-search-autocomplete': {
    id: 'page-search-autocomplete',
    title: 'Autocomplete Example',
    component: PageSearchAutocompleteExampleComponent
  },
  'page-search-click': {
    id: 'page-search-click',
    title: 'Button click example',
    component: PageSearchClickExampleComponent
  },
  'page-search-hidden': {
    id: 'page-search-hidden',
    title: 'Hidden search button example',
    component: PageSearchHiddenExampleComponent
  },
  'page-search-input': {
    id: 'page-search-input',
    title: 'Simple input example',
    component: PageSearchInputExampleComponent
  },
  'pagination-advanced': {
    id: 'pagination-advanced',
    title: 'Advanced Pagination Example',
    component: PaginationAdvancedExampleComponent
  },
  'pagination-localize-advanced': {
    id: 'pagination-localize-advanced',
    title: 'Localization - Advanced Pagination',
    component: PaginationLocalizeAdvancedExampleComponent
  },
  'pagination-localize': {
    id: 'pagination-localize',
    title: 'Localization Example',
    component: PaginationLocalizeExampleComponent
  },
  'pagination-simple': {
    id: 'pagination-simple',
    title: 'Simple Pagination Example',
    component: PaginationSimpleExampleComponent
  },
  'popover-click-outside': {
    id: 'popover-click-outside',
    title: 'Closing on document click',
    component: PopoverClickOutsideExampleComponent
  },
  'popover-custom': {
    id: 'popover-custom',
    title: 'Popover Custom Example',
    component: PopoverCustomExampleComponent
  },
  'popover-hover': {
    id: 'popover-hover',
    title: 'Popover Hover Example',
    component: PopoverHoverExampleComponent
  },
  'popover-lazyload': {
    id: 'popover-lazyload',
    title: 'Popover lazyload Example',
    component: PopoverLazyloadExampleComponent
  },
  'popover-modal': {
    id: 'popover-modal',
    title: 'Modal Popover Example',
    component: PopoverModalExampleComponent
  },
  'popover-positioning': {
    id: 'popover-positioning',
    title: 'Popover positioning Example',
    component: PopoverPositioningExampleComponent
  },
  'popover-scroll': {
    id: 'popover-scroll',
    title: 'Popover Scroll Example',
    component: PopoverScrollExampleComponent
  },
  'popover-scrollable': {
    id: 'popover-scrollable',
    title: 'Popover Scrollable Example',
    component: PopoverScrollableExampleComponent
  },
  'popover-table': {
    id: 'popover-table',
    title: 'Popover Table Example',
    component: PopoverTableExampleComponent
  },
  'popover-trigger': {
    id: 'popover-trigger',
    title: 'Popover Trigger Example',
    component: PopoverTriggerExampleComponent
  },
  'progress-stepper-custom': {
    id: 'progress-stepper-custom',
    title: 'Progress Indicator custom label example',
    component: ProgressStepperCustomExampleComponent
  },
  'progress-stepper-form': {
    id: 'progress-stepper-form',
    title: 'Progress Indicator multi manual step completion example',
    component: ProgressStepperFormExampleComponent
  },
  'progress-stepper-multi-groups': {
    id: 'progress-stepper-multi-groups',
    title: 'Progress Indicator Multi Groups Example',
    component: ProgressStepperMultiGroupsExampleComponent
  },
  'progress-stepper-multi-vertical': {
    id: 'progress-stepper-multi-vertical',
    title: 'Progress Indicator Multi Vertical Example',
    component: ProgressStepperMultiVerticalExampleComponent
  },
  'progress-stepper-multi': {
    id: 'progress-stepper-multi',
    title: 'Progress Indicator multi example',
    component: ProgressStepperMultiExampleComponent
  },
  'progress-stepper-nonlinear': {
    id: 'progress-stepper-nonlinear',
    title: 'Progress Indicator non linear step completion example',
    component: ProgressStepperNonlinearExampleComponent
  },
  'progress-stepper-progress': {
    id: 'progress-stepper-progress',
    title: 'Progress Indicator linear progress example',
    component: ProgressStepperProgressExampleComponent
  },
  'progress-stepper-reactivemulti': {
    id: 'progress-stepper-reactivemulti',
    title: 'Progress Indicator reactive form with separate form per step',
    component: ProgressStepperReactivemultiExampleComponent
  },
  'progress-stepper-reactivesingle': {
    id: 'progress-stepper-reactivesingle',
    title: 'Progress Indicator reactive form with single form example',
    component: ProgressStepperReactivesingleExampleComponent
  },
  'progress-stepper-step': {
    id: 'progress-stepper-step',
    title: 'Progress Indicator step completion example',
    component: ProgressStepperStepExampleComponent
  },
  'progress-stepper-title': {
    id: 'progress-stepper-title',
    title: 'Progress Indicator title example',
    component: ProgressStepperTitleExampleComponent
  },
  'progress-stepper': {
    id: 'progress-stepper',
    title: 'Progress Indicator example',
    component: ProgressStepperExampleComponent
  },
  'progressbar-basic': {
    id: 'progressbar-basic',
    title: 'Progress Bar Basic Example',
    component: ProgressbarBasicExampleComponent
  },
  'progressbar': {
    id: 'progressbar',
    title: 'Progress Bar Example',
    component: ProgressbarExampleComponent
  },
  'radio-button-disabled': {
    id: 'radio-button-disabled',
    title: 'Disabled Example',
    component: RadioButtonDisabledExampleComponent
  },
  'radio-button-event': {
    id: 'radio-button-event',
    title: 'Event Example',
    component: RadioButtonEventExampleComponent
  },
  'radio-button-form': {
    id: 'radio-button-form',
    title: 'Template Driven Examples',
    component: RadioButtonFormExampleComponent
  },
  'radio-button-group-horizontal': {
    id: 'radio-button-group-horizontal',
    title: 'Radio Button Group Horizontal Example',
    component: RadioButtonGroupHorizontalExampleComponent
  },
  'radio-button-group-label-size': {
    id: 'radio-button-group-label-size',
    title: 'Radio button group label size Example',
    component: RadioButtonGroupLabelSizeExampleComponent
  },
  'radio-button-group-validation': {
    id: 'radio-button-group-validation',
    title: 'Radio button group validation Example',
    component: RadioButtonGroupValidationExampleComponent
  },
  'radio-button-group': {
    id: 'radio-button-group',
    title: 'Group Examples',
    component: RadioButtonGroupExampleComponent
  },
  'radio-button-negative': {
    id: 'radio-button-negative',
    title: 'Negative Styling Example',
    component: RadioButtonNegativeExampleComponent
  },
  'radio-button-reactive': {
    id: 'radio-button-reactive',
    title: 'Reactive Example',
    component: RadioButtonReactiveExampleComponent
  },
  'radio-button-sample': {
    id: 'radio-button-sample',
    title: 'Radio Button Examples',
    component: RadioButtonSampleExampleComponent
  },
  'radio-button-sizes': {
    id: 'radio-button-sizes',
    title: 'Label Sizes Example',
    component: RadioButtonSizesExampleComponent
  },
  'radio-button': {
    id: 'radio-button',
    title: 'Radio Button Example',
    component: RadioButtonExampleComponent
  },
  'radio-toggle-custom': {
    id: 'radio-toggle-custom',
    title: 'Custom Example',
    component: RadioToggleCustomExampleComponent
  },
  'radio-toggle-form': {
    id: 'radio-toggle-form',
    title: 'Template Driven Form Example',
    component: RadioToggleFormExampleComponent
  },
  'radio-toggle-reactive': {
    id: 'radio-toggle-reactive',
    title: 'Reactive Form Example',
    component: RadioToggleReactiveExampleComponent
  },
  'radio-toggle-validation': {
    id: 'radio-toggle-validation',
    title: 'Validation Example',
    component: RadioToggleValidationExampleComponent
  },
  'radio-toggle': {
    id: 'radio-toggle',
    title: 'Toggle Button Example',
    component: RadioToggleBasicExampleComponent
  },
  'rating-accessibility': {
    id: 'rating-accessibility',
    title: 'Rating Accessibility Example',
    component: RatingAccesibilityExampleComponent
  },
  'rating-basic': {
    id: 'rating-basic',
    title: 'Rating Basic Example',
    component: RatingBasicExampleComponent
  },
  'rating-disabled': {
    id: 'rating-disabled',
    title: 'Rating Disabled Example',
    component: RatingDisabledExampleComponent
  },
  'rating-negative': {
    id: 'rating-negative',
    title: 'Rating Negative Example',
    component: RatingNegativeExampleComponent
  },
  'rating-reactive': {
    id: 'rating-reactive',
    title: 'Rating Reactive Example',
    component: RatingReactiveExampleComponent
  },
  'rating-simple': {
    id: 'rating-simple',
    title: 'Rating Simple Bindig Example',
    component: RatingSimpleExampleComponent
  },
  'rating-template': {
    id: 'rating-template',
    title: 'Rating Template Driven Example',
    component: RatingTemplateExampleComponent
  },
  'selectable-card-basic': {
    id: 'selectable-card-basic',
    title: 'Selectable cards basic example',
    component: SelectableCardBasicExampleComponent
  },
  'selectable-card-dynamic': {
    id: 'selectable-card-dynamic',
    title: 'Selectable cards dynamic example',
    component: SelectableCardDynamicExampleComponent
  },
  'selectable-card-reactive': {
    id: 'selectable-card-reactive',
    title: 'Selectable cards reactive example',
    component: SelectableCardReactiveExampleComponent
  },
  'selectable-card-states': {
    id: 'selectable-card-states',
    title: 'Selectable cards states example',
    component: SelectableCardStatesExampleComponent
  },
  'sidebar-footer': {
    id: 'sidebar-footer',
    title: 'Side navigation with footer area',
    component: SidebarFooterExampleComponent
  },
  'sidebar-methods': {
    id: 'sidebar-methods',
    title: 'Side navigation Methods',
    component: SidebarMethodsExampleComponent
  },
  'sidebar-outputs': {
    id: 'sidebar-outputs',
    title: 'Outputs example',
    component: SidebarOutputsExampleComponent
  },
  'sidebar-resizeable': {
    id: 'sidebar-resizeable',
    title: 'Side navigation resizeable Example',
    component: SidebarResizeableExampleComponent
  },
  'sidebar': {
    id: 'sidebar',
    title: 'Side navigation with Actions',
    component: SidebarExampleComponent
  },
  'sidepanel-floating': {
    id: 'sidepanel-floating',
    title: 'Floating sidepanel example',
    component: SidepanelFloatingExampleComponent
  },
  'sidepanel-static': {
    id: 'sidepanel-static',
    title: 'Static sidepanel example',
    component: SidepanelStaticExampleComponent
  },
  'slider-basic': {
    id: 'slider-basic',
    title: 'Slider Example',
    component: SliderBasicExampleComponent
  },
  'slider-decimal': {
    id: 'slider-decimal',
    title: 'Slider Decimal Example',
    component: SliderDecimalExampleComponent
  },
  'slider-default': {
    id: 'slider-default',
    title: 'Slider Default Example',
    component: SliderDefaultExampleComponent
  },
  'slider-disabled': {
    id: 'slider-disabled',
    title: 'Slider Disabled Example',
    component: SliderDisabledExampleComponent
  },
  'slider-inverted': {
    id: 'slider-inverted',
    title: 'Slider Inverted Example',
    component: SliderInvertedExampleComponent
  },
  'slider-label': {
    id: 'slider-label',
    title: 'Slider Label Example',
    component: SliderLabelExampleComponent
  },
  'slider-negative': {
    id: 'slider-negative',
    title: 'Negative Example',
    component: SliderNegativeExampleComponent
  },
  'slider-reactive': {
    id: 'slider-reactive',
    title: 'Slider Reactive Form Example',
    component: SliderReactiveExampleComponent
  },
  'slider-template': {
    id: 'slider-template',
    title: 'Slider Template Driven Form Example',
    component: SliderTemplateExampleComponent
  },
  'slider-textual': {
    id: 'slider-textual',
    title: 'Slider Textual Example',
    component: SliderTextualExampleComponent
  },
  'slider-thumb': {
    id: 'slider-thumb',
    title: 'Slider Thumb Example',
    component: SliderThumbExampleComponent
  },
  'small-stage-content-variation': {
    id: 'small-stage-content-variation',
    title: 'Small stage content variation example',
    component: SmallStageContentVariationExampleComponent
  },
  'small-stage-default': {
    id: 'small-stage-default',
    title: 'Small stage default example',
    component: SmallStageDefaultExampleComponent
  },
  'small-stage-image-offset': {
    id: 'small-stage-image-offset',
    title: 'Small stage image offset example',
    component: SmallStageImageOffsetExampleComponent
  },
  'small-stage-text-narrow': {
    id: 'small-stage-text-narrow',
    title: 'Small stage narrow content example',
    component: SmallStageTextNarrowExampleComponent
  },
  'spinner-negative': {
    id: 'spinner-negative',
    title: 'Negative styling example',
    component: SpinnerNegativeExampleComponent
  },
  'spinner-sizes': {
    id: 'spinner-sizes',
    title: 'Spinner sizes',
    component: SpinnerSizesExampleComponent
  },
  'switcher-default': {
    id: 'switcher-default',
    title: 'Switcher Default',
    component: SwitcherDefaultExampleComponent
  },
  'switcher-disabled': {
    id: 'switcher-disabled',
    title: 'Switcher Disabled Reactive Form',
    component: SwitcherDisabledComponent
  },
  'switcher-label-left': {
    id: 'switcher-label-left',
    title: 'Switcher Label Left',
    component: SwitcherLabelLeftExampleComponent
  },
  'switcher-label-small': {
    id: 'switcher-label-small',
    title: 'Switcher Label Small',
    component: SwitcherLabelSmallExampleComponent
  },
  'switcher-large': {
    id: 'switcher-large',
    title: 'Swicher Large',
    component: SwitcherLargeExampleComponent
  },
  'switcher-negative': {
    id: 'switcher-negative',
    title: 'Switcher Negative',
    component: SwitcherNegativeExampleComponent
  },
  'switcher-reactive-form': {
    id: 'switcher-reactive-form',
    title: 'Switcher Reactive Form',
    component: SwitcherReactiveFormExampleComponent
  },
  'switcher-template-driven': {
    id: 'switcher-template-driven',
    title: 'Switcher Template Driven Form',
    component: SwitcherTemplateDrivenExampleComponent
  },
  'table-condensed': {
    id: 'table-condensed',
    title: 'Condensed Example',
    component: TableCondensedExampleComponent
  },
  'table-expandable': {
    id: 'table-expandable',
    title: 'Expandable Rows',
    component: ExpandableRowExampleComponent
  },
  'table-filter-sort-paginate': {
    id: 'table-filter-sort-paginate',
    title: 'Advanced example for sorting, filtering and pagination',
    component: TableFilterSortPaginateExampleComponent
  },
  'table-selecting': {
    id: 'table-selecting',
    title: 'Selecting Example',
    component: TableSelectingExampleComponent
  },
  'table-single-select': {
    id: 'table-single-select',
    title: 'Single Row Selection',
    component: TableSingleSelectExampleComponent
  },
  'table-sorting': {
    id: 'table-sorting',
    title: 'Sorting example',
    component: TableSortingExampleComponent
  },
  'table-zebra': {
    id: 'table-zebra',
    title: 'Zebra mode example',
    component: TableZebraExampleComponent
  },
  'table': {
    id: 'table',
    title: 'Simple Table',
    component: TableExampleComponent
  },
  'tabs-appearance': {
    id: 'tabs-appearance',
    title: 'Tab group appearance',
    component: TabsAppearanceExampleComponent
  },
  'tabs-auto-manual-select': {
    id: 'tabs-auto-manual-select',
    title: 'Auto and manual select',
    component: TabsAutoManualSelectExampleComponent
  },
  'tabs-basic': {
    id: 'tabs-basic',
    title: 'Basic tab group',
    component: TabsBasicExampleComponent
  },
  'tabs-disabled': {
    id: 'tabs-disabled',
    title: 'Disabled tabs and tab groups',
    component: TabsDisabledExampleComponent
  },
  'tabs-dynamic': {
    id: 'tabs-dynamic',
    title: 'Dynamically adding and removing tabs',
    component: TabsDynamicExampleComponent
  },
  'tabs-injection-token': {
    id: 'tabs-injection-token',
    title: 'Injection token for tab group',
    component: TabsInjectionTokenExampleComponent
  },
  'tabs-lazy': {
    id: 'tabs-lazy',
    title: 'Lazy loading content',
    component: TabsLazyExampleComponent
  },
  'tabs-nav-bar-appearance': {
    id: 'tabs-nav-bar-appearance',
    title: 'Appearance for Tabs Navbar',
    component: TabsNavBarAppearanceExampleComponent
  },
  'tabs-nav-bar-injection-token': {
    id: 'tabs-nav-bar-injection-token',
    title: 'Injection Token in Tabs Navbar',
    component: TabsNavBarInjectionTokenExampleComponent
  },
  'tabs-nav-bar': {
    id: 'tabs-nav-bar',
    title: 'Tabs Navbar',
    component: TabsNavBarExampleComponent
  },
  'tabs-negative': {
    id: 'tabs-negative',
    title: 'Negative styling',
    component: TabsNegativeExampleComponent
  },
  'tabs-output-events': {
    id: 'tabs-output-events',
    title: 'Output events',
    component: TabsOutputEventsExampleComponent
  },
  'tabs-responsive': {
    id: 'tabs-responsive',
    title: 'Responsive behavior',
    component: TabsResponsiveExampleComponent
  },
  'tabs-styling': {
    id: 'tabs-styling',
    title: 'Changing the styles',
    component: TabsStylingExampleComponent
  },
  'tabs-template': {
    id: 'tabs-template',
    title: 'Using templates for labels',
    component: TabsTemplateExampleComponent
  },
  'taglist-a11y': {
    id: 'taglist-a11y',
    title: 'Tag Accessibility Example',
    component: TagListAccessibilityExampleComponent
  },
  'taglist-basic': {
    id: 'taglist-basic',
    title: 'Tag Basic Example',
    component: TagListBasicExampleComponent
  },
  'taglist-delete': {
    id: 'taglist-delete',
    title: 'Tag Delete Tag Example',
    component: TagListDeleteExampleComponent
  },
  'taglist-formatter': {
    id: 'taglist-formatter',
    title: 'Tag Formatter Example',
    component: TagListFormatterExampleComponent
  },
  'taglist-keyword': {
    id: 'taglist-keyword',
    title: 'Tag Keyword Example',
    component: TagListKeywordExampleComponent
  },
  'taglist-objects': {
    id: 'taglist-objects',
    title: 'Tag Objects Example',
    component: TagListObjectsExampleComponent
  },
  'taglist-output': {
    id: 'taglist-output',
    title: 'Tag Output Example',
    component: TagListOutputExampleComponent
  },
  'taglist-reactive': {
    id: 'taglist-reactive',
    title: 'Tag Reactive Example',
    component: TagListReactiveExampleComponent
  },
  'taglist-templatedriven': {
    id: 'taglist-templatedriven',
    title: 'Tag Template Driven Example',
    component: TagListTemplateDrivenExampleComponent
  },
  'taglist': {
    id: 'taglist',
    title: 'Tag Example',
    component: TaglistExampleComponent
  },
  'timefield-disabled': {
    id: 'timefield-disabled',
    title: 'Timefield disabled example',
    component: TimefieldDisabledExampleComponent
  },
  'timefield-format-toggler': {
    id: 'timefield-format-toggler',
    title: 'Timefield format toggler example',
    component: TimefieldFormatTogglerExampleComponent
  },
  'timefield-localize': {
    id: 'timefield-localize',
    title: 'Localization example',
    component: TimefieldLocalizeExampleComponent
  },
  'timefield-negative': {
    id: 'timefield-negative',
    title: 'Timefield negative example',
    component: TimefieldNegativeExampleComponent
  },
  'timefield-reactive': {
    id: 'timefield-reactive',
    title: 'Timefield reactive forms example',
    component: TimefieldReactiveExampleComponent
  },
  'timefield-template-driven': {
    id: 'timefield-template-driven',
    title: 'Timefield Template Driven Form',
    component: TimefieldTemplateDrivenExampleComponent
  },
  'toolbar-positioning-content': {
    id: 'toolbar-positioning-content',
    title: 'Toolbar positioning content Example',
    component: ToolbarPositioningContentExampleComponent
  },
  'toolbar': {
    id: 'toolbar',
    title: 'Toolbar basic example',
    component: ToolbarExampleComponent
  },
  'tooltip-basic': {
    id: 'tooltip-basic',
    title: 'Tooltip',
    component: TooltipBasicExampleComponent
  },
  'tooltip-delay': {
    id: 'tooltip-delay',
    title: 'Tooltip with delay',
    component: TooltipDelayExampleComponent
  },
  'tooltip-disabled': {
    id: 'tooltip-disabled',
    title: 'Disabled tooltip',
    component: TooltipDisabledExampleComponent
  },
  'tooltip-fallbacks-table': {
    id: 'tooltip-fallbacks-table',
    title: 'Tooltip Fallbacks Table Example',
    component: TooltipFallbacksTableExampleComponent
  },
  'tooltip-positions': {
    id: 'tooltip-positions',
    title: 'Tooltip positions',
    component: TooltipPositionsExampleComponent
  },
  'tooltip-programmatic': {
    id: 'tooltip-programmatic',
    title: 'Tooltip programmatic toggling',
    component: TooltipProgrammaticExampleComponent
  },
  'tooltip-settings': {
    id: 'tooltip-settings',
    title: 'Tooltip global settings',
    component: TooltipSettingsExampleComponent
  },
  'tree': {
    id: 'tree',
    title: 'Tree Example',
    component: TreeDemoComponent
  },
  'video-advanced': {
    id: 'video-advanced',
    title: 'Video Advanced Example',
    component: VideoAdvancedExampleComponent
  },
  'video-custom': {
    id: 'video-custom',
    title: 'Video Custom Example',
    component: VideoCustomExampleComponent
  },
  'video': {
    id: 'video',
    title: 'Video Example',
    component: VideoExampleComponent
  },
  'viewport-change': {
    id: 'viewport-change',
    title: 'Viewport Subscription example',
    component: ViewportChangeExampleComponent
  },
  'radio-toggle-negative': {
    id: 'radio-toggle-negative',
    title: 'Negative Styling Example',
    component: RadioToggleNegativeExampleComponent
  },
};

export const EXAMPLE_LIST = [
  AccessibilityHighContrastSvgExampleComponent,
  AccordionErrorExampleComponent,
  AccordionExtraLightNegativeExampleComponent,
  AccordionExtraLightExampleComponent,
  AccordionLazyExampleComponent,
  AccordionLightNegativeExampleComponent,
  AccordionLightExampleComponent,
  AccordionMultiExampleComponent,
  AccordionNegativeExampleComponent,
  AccordionStandaloneExampleComponent,
  AccordionExampleComponent,
  ActionWithRouterDemoComponent,
  ActionDemoComponent,
  AutocompleteBasicExampleComponent,
  AutocompleteDataBindingExampleComponent,
  AutocompleteDefaultRenderingExampleComponent,
  AutocompleteFilteringExampleComponent,
  AutocompleteOutlineExampleComponent,
  BadgeVibrantExampleComponent,
  BadgeExampleComponent,
  BreadcrumbNegativeExampleComponent,
  BreadcrumbExampleComponent,
  ButtonBlockExampleComponent,
  ButtonDangerExampleComponent,
  ButtonIconExampleComponent,
  ButtonLargeExampleComponent,
  ButtonMediumExampleComponent,
  ButtonNegativeExampleComponent,
  ButtonPlainExampleComponent,
  ButtonSmallMediumExampleComponent,
  ButtonSmallExampleComponent,
  ButtonWithIconExampleComponent,
  ButtonExampleComponent,
  CardHeaderFooterExampleComponent,
  CardExampleComponent,
  CheckboxGroupBasicExampleComponent,
  CheckboxGroupDynamicExampleComponent,
  CheckboxGroupHorizontalExampleComponent,
  CheckboxGroupInheritanceExampleComponent,
  CheckboxGroupLabelSizeExampleComponent,
  CheckboxGroupReactiveExampleComponent,
  CheckboxGroupValidationExampleComponent,
  CheckboxLabelSizeExampleComponent,
  CheckboxNegativeExampleComponent,
  CheckboxOutputsExampleComponent,
  CheckboxReactiveExampleComponent,
  CheckboxSimpleBindingExampleComponent,
  CheckboxStatesExampleComponent,
  CheckboxTemplateDrivenExampleComponent,
  CircleToggleGroupExampleComponent,
  CircleToggleNegativeExampleComponent,
  CircleToggleReactiveDisabledExampleComponent,
  CircleToggleReactiveExampleComponent,
  CircleToggleResponsiveExampleComponent,
  CircleToggleSimpleBindingExampleComponent,
  CircleToggleStandaloneExampleComponent,
  CircleToggleTemplateDrivenExampleComponent,
  CircleToggleTextExampleComponent,
  CodeInputDisabledExampleComponent,
  CodeInputFourCharExampleComponent,
  CodeInputLocalizeExampleComponent,
  CodeInputModelExampleComponent,
  CodeInputNegativeExampleComponent,
  CodeInputSevenCharExampleComponent,
  CodeInputSixCharExampleComponent,
  CodeInputTypeExampleComponent,
  ComparisonTableDisabledColumnsExampleComponent,
  ComparisonTableDynamicExampleComponent,
  ComparisonTableFormElementsExampleComponent,
  ComparisonTableModifyThemingExampleComponent,
  ComparisonTableRowGroupExampleComponent,
  ComparisonTableWithIntersectionExampleComponent,
  ComparisonTableWithToggleSectionsExampleComponent,
  ComparisonTableExampleComponent,
  ContextMenuBasicExampleComponent,
  ContextMenuDataExampleComponent,
  ContextMenuDisabledExampleComponent,
  ContextMenuIconsExampleComponent,
  ContextMenuLazyExampleComponent,
  ContextMenuNestedExampleComponent,
  ContextMenuProgrammaticExampleComponent,
  ContextMenuScrollStrategyExampleComponent,
  CopytextNegativeExampleComponent,
  CopytextSizesExampleComponent,
  DatefieldBasicExampleComponent,
  DatefieldDisabledExampleComponent,
  DatefieldFilterExampleComponent,
  DatefieldFormatInjectionExampleComponent,
  DatefieldFormattingExampleComponent,
  DatefieldInjectionTokenExampleComponent,
  DatefieldIsoExampleComponent,
  DatefieldLocalizeDateExampleComponent,
  DatefieldLocalizeTextsExampleComponent,
  DatefieldManualExampleComponent,
  DatefieldMinMaxExampleComponent,
  DatefieldParsingExampleComponent,
  DatefieldRangeExampleComponent,
  DatefieldReactiveExampleComponent,
  DatefieldStartviewExampleComponent,
  DatefieldToggleFocusExampleComponent,
  DropdownCustomLabelExampleComponent,
  DropdownDisabledItemsExampleComponent,
  DropdownFilterCustomExampleComponent,
  DropdownFilterExampleComponent,
  DropdownGroupExampleComponent,
  DropdownMultiSelectExampleComponent,
  DropdownNegativeExampleComponent,
  DropdownOutlineExampleComponent,
  DropdownPlaceholderExampleComponent,
  DropdownReactiveExampleComponent,
  DropdownRenderingItemsExampleComponent,
  DropdownSimpleBindingExampleComponent,
  DropdownStandardExampleComponent,
  DropdownTemplateDrivenComponent,
  DynamicTableDataExampleComponent,
  DynamicTableEventExampleComponent,
  DynamicTableWithoutDataExampleComponent,
  DynamicTableExampleComponent,
  CustomErrorStateMatcher,
  ErrorExampleComponent,
  FileUploaderAutoExampleComponent,
  FileUploaderBasicExampleComponent,
  FileUploaderDropZoneExampleComponent,
  FileUploaderIntlExampleComponent,
  FileUploaderReactiveExampleComponent,
  FileUploaderSeparateRequestsExampleComponent,
  FileUploaderTemplateDrivenExampleComponent,
  FileUploaderTypeValidationExampleComponent,
  FileUploaderValidationExampleComponent,
  FileUploaderWithRequestExampleComponent,
  FooterExampleComponent,
  FormfieldAppearanceExampleComponent,
  FormfieldBasicExampleComponent,
  FormfieldCharacterCountExampleComponent,
  FormfieldCustomLabelExampleComponent,
  MyTelInput,
  FormfieldCustomExampleComponent,
  FormfieldErrorExampleComponent,
  FormfieldExpertErrorExampleComponent,
  FormfieldFloatingExampleComponent,
  FormfieldGlobalExampleComponent,
  FormfieldHintExampleComponent,
  FormfieldMultipleErrorsExampleComponent,
  FormfieldNegativeExampleComponent,
  FormfieldNoteAndErrorExampleComponent,
  FormfieldNoteExampleComponent,
  FormfieldPasswordVisibilityExampleComponent,
  FormfieldPlaceholderExampleComponent,
  FormfieldPrefixSuffixAppendixExampleComponent,
  FormfieldSimpleFormExampleComponent,
  GridAlignContentExampleComponent,
  GridAlignItemsExampleComponent,
  GridAlignSelfExampleComponent,
  GridColOrderExampleComponent,
  GridJustifyExampleComponent,
  GridMaxwidthExampleComponent,
  GridMultiInputs1ExampleComponent,
  GridMultiInputs2ExampleComponent,
  GridNogutterExampleComponent,
  GridOffsetExampleComponent,
  GridOneInputExampleComponent,
  HeaderCobrandingComponent,
  HeaderIconsComponent,
  HeaderTwoRowsDemoComponent,
  HeaderDemoComponent,
  HeadlineFontWeightsExampleComponent,
  HeadlineLinksExampleComponent,
  HeadlineNegativeExampleComponent,
  HeadlineSizesExampleComponent,
  IbanMaskComponent,
  IconEssentialIconsExampleComponent,
  IconEssentialOverrideExampleComponent,
  IconFilledExampleComponent,
  IconGeneralExampleComponent,
  IconListFunctionalExampleComponent,
  IconListProductExampleComponent,
  IconOutlineExampleComponent,
  IconRegistryExampleComponent,
  IconSizesExampleComponent,
  ImageAttributeExampleComponent,
  ImageDefaultExampleComponent,
  ImageFixedRatiosExampleComponent,
  ImageRoundedExampleComponent,
  InputAutoresizeExampleComponent,
  InputReactiveExampleComponent,
  InputStandaloneExampleComponent,
  InputTemplateDrivenExampleComponent,
  InputWithoutFormfieldExampleComponent,
  InputExampleComponent,
  LabelExampleComponent,
  LinkBlackExampleComponent,
  LinkDefaultExampleComponent,
  LinkIconsExampleComponent,
  LinkMultipleExampleComponent,
  LinkNegativeExampleComponent,
  LinkSizeExampleComponent,
  LinkWithinTextExampleComponent,
  ListCirclesExampleComponent,
  ListCopytextExampleComponent,
  CustomColorListExampleComponent,
  ListIconsExampleComponent,
  ListNegativeExampleComponent,
  ListNestingExampleComponent,
  ListOrderedExampleComponent,
  ListUnorderedExampleComponent,
  MarginSizesExampleComponent,
  MarginUsageExampleComponent,
  MaskCaseComponent,
  MaskDeactivateComponent,
  MaskDropCharactersComponent,
  MaskSeparatorsComponent,
  MaskValidationComponent,
  MaskComponent,
  NxMenuButtonExampleComponent,
  NxMenuItemWithIconsExampleComponent,
  NxMenuItemExampleComponent,
  NxMenuLinkExampleComponent,
  MenuExampleComponent,
  MessageBannerExampleComponent,
  MessageClosableExampleComponent,
  MessageErrorExampleComponent,
  MessageInfoExampleComponent,
  MessageSuccessExampleComponent,
  MessageToastCustomSettingsExampleComponent,
  MessageToastOpeningExampleComponent,
  MessageWarningExampleComponent,
  ModalBasicExampleComponent,
  ModalClosingNehaviourExampleComponent,
  ModalClosingExampleComponent,
  ModalContentActionsExampleComponent,
  ModalDataInjectionExampleComponent,
  ModalFixedWidthExampleComponent,
  ModalOpeningExampleComponent,
  NaturalLanguageFormBasicExampleComponent,
  NaturalLanguageFormExtendedExampleComponent,
  NaturalLanguageFormNegativeExampleComponent,
  NaturalLanguageFormSizesExampleComponent,
  NotificationPanelActionsExampleComponent,
  NotificationPanelClickableExampleComponent,
  NotificationPanelMixedExampleComponent,
  NumberStepperAccessibilityExampleComponent,
  NumberStepperAdditionsExampleComponent,
  NumberStepperAutoResizingExampleComponent,
  NumberStepperCustomLabelExampleComponent,
  NumberStepperDisabledExplicitExampleComponent,
  NumberStepperDisabledImplicitExampleComponent,
  NumberStepperFloatingPointExampleComponent,
  NumberStepperFormattingExampleComponent,
  NumberStepperLocalizeExampleComponent,
  NumberStepperNegativeExampleComponent,
  NumberStepperReactiveExampleComponent,
  NumberStepperSimpleBindingExampleComponent,
  NumberStepperSizesExampleComponent,
  NumberStepperStandaloneExampleComponent,
  NumberStepperTemplateDrivenExampleComponent,
  NumberStepperValidationExampleComponent,
  OverlayLimitingFallbacksExampleComponent,
  OverlayPositioningExampleComponent,
  PageSearchAutocompleteExampleComponent,
  PageSearchClickExampleComponent,
  PageSearchHiddenExampleComponent,
  PageSearchInputExampleComponent,
  PaginationAdvancedExampleComponent,
  PaginationLocalizeAdvancedExampleComponent,
  PaginationLocalizeExampleComponent,
  PaginationSimpleExampleComponent,
  PopoverClickOutsideExampleComponent,
  PopoverCustomExampleComponent,
  PopoverHoverExampleComponent,
  PopoverLazyloadExampleComponent,
  PopoverModalExampleComponent,
  PopoverPositioningExampleComponent,
  PopoverScrollExampleComponent,
  PopoverScrollableExampleComponent,
  PopoverTableExampleComponent,
  PopoverTriggerExampleComponent,
  ProgressStepperCustomExampleComponent,
  ProgressStepperFormExampleComponent,
  ProgressStepperMultiGroupsExampleComponent,
  ProgressStepperMultiVerticalExampleComponent,
  ProgressStepperMultiExampleComponent,
  ProgressStepperNonlinearExampleComponent,
  ProgressStepperProgressExampleComponent,
  ProgressStepperReactivemultiExampleComponent,
  ProgressStepperReactivesingleExampleComponent,
  ProgressStepperStepExampleComponent,
  ProgressStepperTitleExampleComponent,
  ProgressStepperExampleComponent,
  ProgressbarBasicExampleComponent,
  ProgressbarExampleComponent,
  RadioButtonDisabledExampleComponent,
  RadioButtonEventExampleComponent,
  RadioButtonFormExampleComponent,
  RadioButtonGroupHorizontalExampleComponent,
  RadioButtonGroupLabelSizeExampleComponent,
  RadioButtonGroupValidationExampleComponent,
  RadioButtonGroupExampleComponent,
  RadioButtonNegativeExampleComponent,
  RadioButtonReactiveExampleComponent,
  RadioButtonSampleExampleComponent,
  RadioButtonSizesExampleComponent,
  RadioButtonExampleComponent,
  RadioToggleCustomExampleComponent,
  RadioToggleFormExampleComponent,
  RadioToggleReactiveExampleComponent,
  RadioToggleValidationExampleComponent,
  RadioToggleBasicExampleComponent,
  RatingAccesibilityExampleComponent,
  RatingBasicExampleComponent,
  RatingDisabledExampleComponent,
  RatingNegativeExampleComponent,
  RatingReactiveExampleComponent,
  RatingSimpleExampleComponent,
  RatingTemplateExampleComponent,
  SelectableCardBasicExampleComponent,
  SelectableCardDynamicExampleComponent,
  SelectableCardReactiveExampleComponent,
  SelectableCardStatesExampleComponent,
  SidebarFooterExampleComponent,
  SidebarMethodsExampleComponent,
  SidebarOutputsExampleComponent,
  SidebarResizeableExampleComponent,
  SidebarExampleComponent,
  SidepanelFloatingExampleComponent,
  SidepanelStaticExampleComponent,
  SliderBasicExampleComponent,
  SliderDecimalExampleComponent,
  SliderDefaultExampleComponent,
  SliderDisabledExampleComponent,
  SliderInvertedExampleComponent,
  SliderLabelExampleComponent,
  SliderNegativeExampleComponent,
  SliderReactiveExampleComponent,
  SliderTemplateExampleComponent,
  SliderTextualExampleComponent,
  SliderThumbExampleComponent,
  SmallStageContentVariationExampleComponent,
  SmallStageDefaultExampleComponent,
  SmallStageImageOffsetExampleComponent,
  SmallStageTextNarrowExampleComponent,
  SpinnerNegativeExampleComponent,
  SpinnerSizesExampleComponent,
  SwitcherDefaultExampleComponent,
  SwitcherDisabledComponent,
  SwitcherLabelLeftExampleComponent,
  SwitcherLabelSmallExampleComponent,
  SwitcherLargeExampleComponent,
  SwitcherNegativeExampleComponent,
  SwitcherReactiveFormExampleComponent,
  SwitcherTemplateDrivenExampleComponent,
  TableCondensedExampleComponent,
  ExpandableRowExampleComponent,
  TableFilterSortPaginateExampleComponent,
  TableSelectingExampleComponent,
  TableSingleSelectExampleComponent,
  TableSortingExampleComponent,
  TableZebraExampleComponent,
  TableExampleComponent,
  TabsAppearanceExampleComponent,
  TabsAutoManualSelectExampleComponent,
  TabsBasicExampleComponent,
  TabsDisabledExampleComponent,
  TabsDynamicExampleComponent,
  TabsInjectionTokenExampleComponent,
  TabsLazyExampleComponent,
  TabsNavBarAppearanceExampleComponent,
  TabsNavBarInjectionTokenExampleComponent,
  TabsNavBarExampleComponent,
  TabsNegativeExampleComponent,
  TabsOutputEventsExampleComponent,
  TabsResponsiveExampleComponent,
  TabsStylingExampleComponent,
  TabsTemplateExampleComponent,
  TagListAccessibilityExampleComponent,
  TagListBasicExampleComponent,
  TagListDeleteExampleComponent,
  TagListFormatterExampleComponent,
  TagListKeywordExampleComponent,
  TagListObjectsExampleComponent,
  TagListOutputExampleComponent,
  TagListReactiveExampleComponent,
  TagListTemplateDrivenExampleComponent,
  TaglistExampleComponent,
  TimefieldDisabledExampleComponent,
  TimefieldFormatTogglerExampleComponent,
  TimefieldLocalizeExampleComponent,
  TimefieldNegativeExampleComponent,
  TimefieldReactiveExampleComponent,
  TimefieldTemplateDrivenExampleComponent,
  ToolbarPositioningContentExampleComponent,
  ToolbarExampleComponent,
  TooltipBasicExampleComponent,
  TooltipDelayExampleComponent,
  TooltipDisabledExampleComponent,
  TooltipFallbacksTableExampleComponent,
  TooltipPositionsExampleComponent,
  TooltipProgrammaticExampleComponent,
  TooltipSettingsExampleComponent,
  TreeDemoComponent,
  VideoAdvancedExampleComponent,
  VideoCustomExampleComponent,
  VideoExampleComponent,
  ViewportChangeExampleComponent,
  RadioToggleNegativeExampleComponent,
];

export const EXAMPLE_ROUTES = [
  {
    path: 'examples',
    component: ExampleFullScreenComponent,
    children: [{
    path: 'accessibility-high-contrast-svg',
    component: AccessibilityHighContrastSvgExampleComponent
  },
{
    path: 'accordion-error',
    component: AccordionErrorExampleComponent
  },
{
    path: 'accordion-extra-light-negative',
    component: AccordionExtraLightNegativeExampleComponent
  },
{
    path: 'accordion-extra-light',
    component: AccordionExtraLightExampleComponent
  },
{
    path: 'accordion-lazy',
    component: AccordionLazyExampleComponent
  },
{
    path: 'accordion-light-negative',
    component: AccordionLightNegativeExampleComponent
  },
{
    path: 'accordion-light',
    component: AccordionLightExampleComponent
  },
{
    path: 'accordion-multi',
    component: AccordionMultiExampleComponent
  },
{
    path: 'accordion-negative',
    component: AccordionNegativeExampleComponent
  },
{
    path: 'accordion-standalone',
    component: AccordionStandaloneExampleComponent
  },
{
    path: 'accordion',
    component: AccordionExampleComponent
  },
{
    path: 'action-with-router',
    component: ActionWithRouterDemoComponent
  },
{
    path: 'action',
    component: ActionDemoComponent
  },
{
    path: 'autocomplete-basic',
    component: AutocompleteBasicExampleComponent
  },
{
    path: 'autocomplete-data-binding',
    component: AutocompleteDataBindingExampleComponent
  },
{
    path: 'autocomplete-default-rendering',
    component: AutocompleteDefaultRenderingExampleComponent
  },
{
    path: 'autocomplete-filtering',
    component: AutocompleteFilteringExampleComponent
  },
{
    path: 'autocomplete-outline',
    component: AutocompleteOutlineExampleComponent
  },
{
    path: 'badge-vibrant',
    component: BadgeVibrantExampleComponent
  },
{
    path: 'badge',
    component: BadgeExampleComponent
  },
{
    path: 'breadcrumb-negative',
    component: BreadcrumbNegativeExampleComponent
  },
{
    path: 'breadcrumb',
    component: BreadcrumbExampleComponent
  },
{
    path: 'button-block',
    component: ButtonBlockExampleComponent
  },
{
    path: 'button-danger',
    component: ButtonDangerExampleComponent
  },
{
    path: 'button-icon',
    component: ButtonIconExampleComponent
  },
{
    path: 'button-large',
    component: ButtonLargeExampleComponent
  },
{
    path: 'button-medium',
    component: ButtonMediumExampleComponent
  },
{
    path: 'button-negative',
    component: ButtonNegativeExampleComponent
  },
{
    path: 'button-plain',
    component: ButtonPlainExampleComponent
  },
{
    path: 'button-small-medium',
    component: ButtonSmallMediumExampleComponent
  },
{
    path: 'button-small',
    component: ButtonSmallExampleComponent
  },
{
    path: 'button-with-icon',
    component: ButtonWithIconExampleComponent
  },
{
    path: 'button',
    component: ButtonExampleComponent
  },
{
    path: 'card-header-footer',
    component: CardHeaderFooterExampleComponent
  },
{
    path: 'card',
    component: CardExampleComponent
  },
{
    path: 'checkbox-group-basic',
    component: CheckboxGroupBasicExampleComponent
  },
{
    path: 'checkbox-group-dynamic',
    component: CheckboxGroupDynamicExampleComponent
  },
{
    path: 'checkbox-group-horizontal',
    component: CheckboxGroupHorizontalExampleComponent
  },
{
    path: 'checkbox-group-inheritance',
    component: CheckboxGroupInheritanceExampleComponent
  },
{
    path: 'checkbox-group-label-size',
    component: CheckboxGroupLabelSizeExampleComponent
  },
{
    path: 'checkbox-group-reactive',
    component: CheckboxGroupReactiveExampleComponent
  },
{
    path: 'checkbox-group-validation',
    component: CheckboxGroupValidationExampleComponent
  },
{
    path: 'checkbox-label-size',
    component: CheckboxLabelSizeExampleComponent
  },
{
    path: 'checkbox-negative',
    component: CheckboxNegativeExampleComponent
  },
{
    path: 'checkbox-outputs',
    component: CheckboxOutputsExampleComponent
  },
{
    path: 'checkbox-reactive',
    component: CheckboxReactiveExampleComponent
  },
{
    path: 'checkbox-simple-binding',
    component: CheckboxSimpleBindingExampleComponent
  },
{
    path: 'checkbox-states',
    component: CheckboxStatesExampleComponent
  },
{
    path: 'checkbox-template-driven',
    component: CheckboxTemplateDrivenExampleComponent
  },
{
    path: 'circle-toggle-group',
    component: CircleToggleGroupExampleComponent
  },
{
    path: 'circle-toggle-negative',
    component: CircleToggleNegativeExampleComponent
  },
{
    path: 'circle-toggle-reactive-disabled',
    component: CircleToggleReactiveDisabledExampleComponent
  },
{
    path: 'circle-toggle-reactive',
    component: CircleToggleReactiveExampleComponent
  },
{
    path: 'circle-toggle-responsive',
    component: CircleToggleResponsiveExampleComponent
  },
{
    path: 'circle-toggle-simple-binding',
    component: CircleToggleSimpleBindingExampleComponent
  },
{
    path: 'circle-toggle-standalone',
    component: CircleToggleStandaloneExampleComponent
  },
{
    path: 'circle-toggle-template-driven',
    component: CircleToggleTemplateDrivenExampleComponent
  },
{
    path: 'circle-toggle-text',
    component: CircleToggleTextExampleComponent
  },
{
    path: 'code-input-disabled',
    component: CodeInputDisabledExampleComponent
  },
{
    path: 'code-input-four-char',
    component: CodeInputFourCharExampleComponent
  },
{
    path: 'code-input-localize',
    component: CodeInputLocalizeExampleComponent
  },
{
    path: 'code-input-model',
    component: CodeInputModelExampleComponent
  },
{
    path: 'code-input-negative',
    component: CodeInputNegativeExampleComponent
  },
{
    path: 'code-input-seven-char',
    component: CodeInputSevenCharExampleComponent
  },
{
    path: 'code-input-six-char',
    component: CodeInputSixCharExampleComponent
  },
{
    path: 'code-input-type',
    component: CodeInputTypeExampleComponent
  },
{
    path: 'comparison-table-disabled-columns',
    component: ComparisonTableDisabledColumnsExampleComponent
  },
{
    path: 'comparison-table-dynamic',
    component: ComparisonTableDynamicExampleComponent
  },
{
    path: 'comparison-table-form-elements',
    component: ComparisonTableFormElementsExampleComponent
  },
{
    path: 'comparison-table-modify-theming',
    component: ComparisonTableModifyThemingExampleComponent
  },
{
    path: 'comparison-table-row-group',
    component: ComparisonTableRowGroupExampleComponent
  },
{
    path: 'comparison-table-with-intersection',
    component: ComparisonTableWithIntersectionExampleComponent
  },
{
    path: 'comparison-table-with-toggle-sections',
    component: ComparisonTableWithToggleSectionsExampleComponent
  },
{
    path: 'comparison-table',
    component: ComparisonTableExampleComponent
  },
{
    path: 'context-menu-basic',
    component: ContextMenuBasicExampleComponent
  },
{
    path: 'context-menu-data',
    component: ContextMenuDataExampleComponent
  },
{
    path: 'context-menu-disabled',
    component: ContextMenuDisabledExampleComponent
  },
{
    path: 'context-menu-icons',
    component: ContextMenuIconsExampleComponent
  },
{
    path: 'context-menu-lazy',
    component: ContextMenuLazyExampleComponent
  },
{
    path: 'context-menu-nested',
    component: ContextMenuNestedExampleComponent
  },
{
    path: 'context-menu-programmatic',
    component: ContextMenuProgrammaticExampleComponent
  },
{
    path: 'context-menu-scroll-strategy',
    component: ContextMenuScrollStrategyExampleComponent
  },
{
    path: 'copytext-negative',
    component: CopytextNegativeExampleComponent
  },
{
    path: 'copytext-sizes',
    component: CopytextSizesExampleComponent
  },
{
    path: 'datefield-basic',
    component: DatefieldBasicExampleComponent
  },
{
    path: 'datefield-disabled',
    component: DatefieldDisabledExampleComponent
  },
{
    path: 'datefield-filter',
    component: DatefieldFilterExampleComponent
  },
{
    path: 'datefield-format-injection',
    component: DatefieldFormatInjectionExampleComponent
  },
{
    path: 'datefield-formatting',
    component: DatefieldFormattingExampleComponent
  },
{
    path: 'datefield-injection-token',
    component: DatefieldInjectionTokenExampleComponent
  },
{
    path: 'datefield-iso',
    component: DatefieldIsoExampleComponent
  },
{
    path: 'datefield-localize-date',
    component: DatefieldLocalizeDateExampleComponent
  },
{
    path: 'datefield-localize-texts',
    component: DatefieldLocalizeTextsExampleComponent
  },
{
    path: 'datefield-manual',
    component: DatefieldManualExampleComponent
  },
{
    path: 'datefield-min-max',
    component: DatefieldMinMaxExampleComponent
  },
{
    path: 'datefield-parsing',
    component: DatefieldParsingExampleComponent
  },
{
    path: 'datefield-range',
    component: DatefieldRangeExampleComponent
  },
{
    path: 'datefield-reactive',
    component: DatefieldReactiveExampleComponent
  },
{
    path: 'datefield-startview',
    component: DatefieldStartviewExampleComponent
  },
{
    path: 'datefield-toggle-focus',
    component: DatefieldToggleFocusExampleComponent
  },
{
    path: 'dropdown-custom-label',
    component: DropdownCustomLabelExampleComponent
  },
{
    path: 'dropdown-disabled-items',
    component: DropdownDisabledItemsExampleComponent
  },
{
    path: 'dropdown-filter-custom',
    component: DropdownFilterCustomExampleComponent
  },
{
    path: 'dropdown-filter',
    component: DropdownFilterExampleComponent
  },
{
    path: 'dropdown-group',
    component: DropdownGroupExampleComponent
  },
{
    path: 'dropdown-multi-select',
    component: DropdownMultiSelectExampleComponent
  },
{
    path: 'dropdown-negative',
    component: DropdownNegativeExampleComponent
  },
{
    path: 'dropdown-outline',
    component: DropdownOutlineExampleComponent
  },
{
    path: 'dropdown-placeholder',
    component: DropdownPlaceholderExampleComponent
  },
{
    path: 'dropdown-reactive',
    component: DropdownReactiveExampleComponent
  },
{
    path: 'dropdown-rendering-items',
    component: DropdownRenderingItemsExampleComponent
  },
{
    path: 'dropdown-simple-binding',
    component: DropdownSimpleBindingExampleComponent
  },
{
    path: 'dropdown-standard',
    component: DropdownStandardExampleComponent
  },
{
    path: 'dropdown-template-driven',
    component: DropdownTemplateDrivenComponent
  },
{
    path: 'dynamic-table-data',
    component: DynamicTableDataExampleComponent
  },
{
    path: 'dynamic-table-event',
    component: DynamicTableEventExampleComponent
  },
{
    path: 'dynamic-table-without-data',
    component: DynamicTableWithoutDataExampleComponent
  },
{
    path: 'dynamic-table',
    component: DynamicTableExampleComponent
  },
{
    path: 'error-custom-matcher-formfield',
    component: CustomErrorStateMatcher
  },
{
    path: 'error',
    component: ErrorExampleComponent
  },
{
    path: 'file-uploader-auto',
    component: FileUploaderAutoExampleComponent
  },
{
    path: 'file-uploader-basic',
    component: FileUploaderBasicExampleComponent
  },
{
    path: 'file-uploader-drop-zone',
    component: FileUploaderDropZoneExampleComponent
  },
{
    path: 'file-uploader-intl',
    component: FileUploaderIntlExampleComponent
  },
{
    path: 'file-uploader-reactive',
    component: FileUploaderReactiveExampleComponent
  },
{
    path: 'file-uploader-separate-requests',
    component: FileUploaderSeparateRequestsExampleComponent
  },
{
    path: 'file-uploader-template-driven',
    component: FileUploaderTemplateDrivenExampleComponent
  },
{
    path: 'file-uploader-type-validation',
    component: FileUploaderTypeValidationExampleComponent
  },
{
    path: 'file-uploader-validation',
    component: FileUploaderValidationExampleComponent
  },
{
    path: 'file-uploader-with-request',
    component: FileUploaderWithRequestExampleComponent
  },
{
    path: 'footer',
    component: FooterExampleComponent
  },
{
    path: 'formfield-appearance',
    component: FormfieldAppearanceExampleComponent
  },
{
    path: 'formfield-basic',
    component: FormfieldBasicExampleComponent
  },
{
    path: 'formfield-character-count',
    component: FormfieldCharacterCountExampleComponent
  },
{
    path: 'formfield-custom-label',
    component: FormfieldCustomLabelExampleComponent
  },
{
    path: 'formfield-custom-tel-input',
    component: MyTelInput
  },
{
    path: 'formfield-custom',
    component: FormfieldCustomExampleComponent
  },
{
    path: 'formfield-error',
    component: FormfieldErrorExampleComponent
  },
{
    path: 'formfield-expert-error',
    component: FormfieldExpertErrorExampleComponent
  },
{
    path: 'formfield-floating',
    component: FormfieldFloatingExampleComponent
  },
{
    path: 'formfield-global',
    component: FormfieldGlobalExampleComponent
  },
{
    path: 'formfield-hint',
    component: FormfieldHintExampleComponent
  },
{
    path: 'formfield-multiple-errors',
    component: FormfieldMultipleErrorsExampleComponent
  },
{
    path: 'formfield-negative',
    component: FormfieldNegativeExampleComponent
  },
{
    path: 'formfield-note-and-error',
    component: FormfieldNoteAndErrorExampleComponent
  },
{
    path: 'formfield-note',
    component: FormfieldNoteExampleComponent
  },
{
    path: 'formfield-password-visibility',
    component: FormfieldPasswordVisibilityExampleComponent
  },
{
    path: 'formfield-placeholder',
    component: FormfieldPlaceholderExampleComponent
  },
{
    path: 'formfield-prefix-suffix-appendix',
    component: FormfieldPrefixSuffixAppendixExampleComponent
  },
{
    path: 'formfield-simple-form',
    component: FormfieldSimpleFormExampleComponent
  },
{
    path: 'grid-align-content',
    component: GridAlignContentExampleComponent
  },
{
    path: 'grid-align-items',
    component: GridAlignItemsExampleComponent
  },
{
    path: 'grid-align-self',
    component: GridAlignSelfExampleComponent
  },
{
    path: 'grid-col-order',
    component: GridColOrderExampleComponent
  },
{
    path: 'grid-justify',
    component: GridJustifyExampleComponent
  },
{
    path: 'grid-maxwidth',
    component: GridMaxwidthExampleComponent
  },
{
    path: 'grid-multi-inputs-1',
    component: GridMultiInputs1ExampleComponent
  },
{
    path: 'grid-multi-inputs-2',
    component: GridMultiInputs2ExampleComponent
  },
{
    path: 'grid-nogutter',
    component: GridNogutterExampleComponent
  },
{
    path: 'grid-offset',
    component: GridOffsetExampleComponent
  },
{
    path: 'grid-one-input',
    component: GridOneInputExampleComponent
  },
{
    path: 'header-cobranding',
    component: HeaderCobrandingComponent
  },
{
    path: 'header-icons',
    component: HeaderIconsComponent
  },
{
    path: 'header-two-rows',
    component: HeaderTwoRowsDemoComponent
  },
{
    path: 'header',
    component: HeaderDemoComponent
  },
{
    path: 'headline-font-weights',
    component: HeadlineFontWeightsExampleComponent
  },
{
    path: 'headline-links',
    component: HeadlineLinksExampleComponent
  },
{
    path: 'headline-negative',
    component: HeadlineNegativeExampleComponent
  },
{
    path: 'headline-sizes',
    component: HeadlineSizesExampleComponent
  },
{
    path: 'iban-mask',
    component: IbanMaskComponent
  },
{
    path: 'icon-essential-icons',
    component: IconEssentialIconsExampleComponent
  },
{
    path: 'icon-essential-override',
    component: IconEssentialOverrideExampleComponent
  },
{
    path: 'icon-filled',
    component: IconFilledExampleComponent
  },
{
    path: 'icon-general',
    component: IconGeneralExampleComponent
  },
{
    path: 'icon-list-functional',
    component: IconListFunctionalExampleComponent
  },
{
    path: 'icon-list-product',
    component: IconListProductExampleComponent
  },
{
    path: 'icon-outline',
    component: IconOutlineExampleComponent
  },
{
    path: 'icon-registry',
    component: IconRegistryExampleComponent
  },
{
    path: 'icon-sizes',
    component: IconSizesExampleComponent
  },
{
    path: 'image-attribute',
    component: ImageAttributeExampleComponent
  },
{
    path: 'image-default',
    component: ImageDefaultExampleComponent
  },
{
    path: 'image-fixed-ratios',
    component: ImageFixedRatiosExampleComponent
  },
{
    path: 'image-rounded',
    component: ImageRoundedExampleComponent
  },
{
    path: 'input-autoresize',
    component: InputAutoresizeExampleComponent
  },
{
    path: 'input-reactive',
    component: InputReactiveExampleComponent
  },
{
    path: 'input-standalone',
    component: InputStandaloneExampleComponent
  },
{
    path: 'input-template-driven',
    component: InputTemplateDrivenExampleComponent
  },
{
    path: 'input-without-formfield',
    component: InputWithoutFormfieldExampleComponent
  },
{
    path: 'input',
    component: InputExampleComponent
  },
{
    path: 'label',
    component: LabelExampleComponent
  },
{
    path: 'link-black',
    component: LinkBlackExampleComponent
  },
{
    path: 'link-default',
    component: LinkDefaultExampleComponent
  },
{
    path: 'link-icons',
    component: LinkIconsExampleComponent
  },
{
    path: 'link-multiple',
    component: LinkMultipleExampleComponent
  },
{
    path: 'link-negative',
    component: LinkNegativeExampleComponent
  },
{
    path: 'link-size',
    component: LinkSizeExampleComponent
  },
{
    path: 'link-within-text',
    component: LinkWithinTextExampleComponent
  },
{
    path: 'list-circles',
    component: ListCirclesExampleComponent
  },
{
    path: 'list-copytext',
    component: ListCopytextExampleComponent
  },
{
    path: 'list-custom-color',
    component: CustomColorListExampleComponent
  },
{
    path: 'list-icons',
    component: ListIconsExampleComponent
  },
{
    path: 'list-negative',
    component: ListNegativeExampleComponent
  },
{
    path: 'list-nesting',
    component: ListNestingExampleComponent
  },
{
    path: 'list-ordered',
    component: ListOrderedExampleComponent
  },
{
    path: 'list-unordered',
    component: ListUnorderedExampleComponent
  },
{
    path: 'margin-sizes',
    component: MarginSizesExampleComponent
  },
{
    path: 'margin-usage',
    component: MarginUsageExampleComponent
  },
{
    path: 'mask-case',
    component: MaskCaseComponent
  },
{
    path: 'mask-deactivate',
    component: MaskDeactivateComponent
  },
{
    path: 'mask-drop-characters',
    component: MaskDropCharactersComponent
  },
{
    path: 'mask-separators',
    component: MaskSeparatorsComponent
  },
{
    path: 'mask-validation',
    component: MaskValidationComponent
  },
{
    path: 'mask',
    component: MaskComponent
  },
{
    path: 'menu-button',
    component: NxMenuButtonExampleComponent
  },
{
    path: 'menu-item-with-icons',
    component: NxMenuItemWithIconsExampleComponent
  },
{
    path: 'menu-item',
    component: NxMenuItemExampleComponent
  },
{
    path: 'menu-link',
    component: NxMenuLinkExampleComponent
  },
{
    path: 'menu',
    component: MenuExampleComponent
  },
{
    path: 'message-banner',
    component: MessageBannerExampleComponent
  },
{
    path: 'message-closable',
    component: MessageClosableExampleComponent
  },
{
    path: 'message-error',
    component: MessageErrorExampleComponent
  },
{
    path: 'message-info',
    component: MessageInfoExampleComponent
  },
{
    path: 'message-success',
    component: MessageSuccessExampleComponent
  },
{
    path: 'message-toast-custom-settings',
    component: MessageToastCustomSettingsExampleComponent
  },
{
    path: 'message-toast-opening',
    component: MessageToastOpeningExampleComponent
  },
{
    path: 'message-warning',
    component: MessageWarningExampleComponent
  },
{
    path: 'modal-basic',
    component: ModalBasicExampleComponent
  },
{
    path: 'modal-closing-behaviour',
    component: ModalClosingNehaviourExampleComponent
  },
{
    path: 'modal-closing',
    component: ModalClosingExampleComponent
  },
{
    path: 'modal-content-actions',
    component: ModalContentActionsExampleComponent
  },
{
    path: 'modal-data-injection',
    component: ModalDataInjectionExampleComponent
  },
{
    path: 'modal-fixed-width',
    component: ModalFixedWidthExampleComponent
  },
{
    path: 'modal-opening',
    component: ModalOpeningExampleComponent
  },
{
    path: 'natural-language-form-basic',
    component: NaturalLanguageFormBasicExampleComponent
  },
{
    path: 'natural-language-form-extended',
    component: NaturalLanguageFormExtendedExampleComponent
  },
{
    path: 'natural-language-form-negative',
    component: NaturalLanguageFormNegativeExampleComponent
  },
{
    path: 'natural-language-form-sizes',
    component: NaturalLanguageFormSizesExampleComponent
  },
{
    path: 'notification-panel-actions',
    component: NotificationPanelActionsExampleComponent
  },
{
    path: 'notification-panel-clickable',
    component: NotificationPanelClickableExampleComponent
  },
{
    path: 'notification-panel-mixed',
    component: NotificationPanelMixedExampleComponent
  },
{
    path: 'number-stepper-a11y',
    component: NumberStepperAccessibilityExampleComponent
  },
{
    path: 'number-stepper-additions',
    component: NumberStepperAdditionsExampleComponent
  },
{
    path: 'number-stepper-auto-resizing',
    component: NumberStepperAutoResizingExampleComponent
  },
{
    path: 'number-stepper-custom-label',
    component: NumberStepperCustomLabelExampleComponent
  },
{
    path: 'number-stepper-disabled-explicit',
    component: NumberStepperDisabledExplicitExampleComponent
  },
{
    path: 'number-stepper-disabled-implicit',
    component: NumberStepperDisabledImplicitExampleComponent
  },
{
    path: 'number-stepper-floating-point',
    component: NumberStepperFloatingPointExampleComponent
  },
{
    path: 'number-stepper-formatting',
    component: NumberStepperFormattingExampleComponent
  },
{
    path: 'number-stepper-localize',
    component: NumberStepperLocalizeExampleComponent
  },
{
    path: 'number-stepper-negative',
    component: NumberStepperNegativeExampleComponent
  },
{
    path: 'number-stepper-reactive',
    component: NumberStepperReactiveExampleComponent
  },
{
    path: 'number-stepper-simple-binding',
    component: NumberStepperSimpleBindingExampleComponent
  },
{
    path: 'number-stepper-sizes',
    component: NumberStepperSizesExampleComponent
  },
{
    path: 'number-stepper-standalone',
    component: NumberStepperStandaloneExampleComponent
  },
{
    path: 'number-stepper-template-driven',
    component: NumberStepperTemplateDrivenExampleComponent
  },
{
    path: 'number-stepper-validation',
    component: NumberStepperValidationExampleComponent
  },
{
    path: 'overlay-limiting-fallbacks',
    component: OverlayLimitingFallbacksExampleComponent
  },
{
    path: 'overlay-positioning',
    component: OverlayPositioningExampleComponent
  },
{
    path: 'page-search-autocomplete',
    component: PageSearchAutocompleteExampleComponent
  },
{
    path: 'page-search-click',
    component: PageSearchClickExampleComponent
  },
{
    path: 'page-search-hidden',
    component: PageSearchHiddenExampleComponent
  },
{
    path: 'page-search-input',
    component: PageSearchInputExampleComponent
  },
{
    path: 'pagination-advanced',
    component: PaginationAdvancedExampleComponent
  },
{
    path: 'pagination-localize-advanced',
    component: PaginationLocalizeAdvancedExampleComponent
  },
{
    path: 'pagination-localize',
    component: PaginationLocalizeExampleComponent
  },
{
    path: 'pagination-simple',
    component: PaginationSimpleExampleComponent
  },
{
    path: 'popover-click-outside',
    component: PopoverClickOutsideExampleComponent
  },
{
    path: 'popover-custom',
    component: PopoverCustomExampleComponent
  },
{
    path: 'popover-hover',
    component: PopoverHoverExampleComponent
  },
{
    path: 'popover-lazyload',
    component: PopoverLazyloadExampleComponent
  },
{
    path: 'popover-modal',
    component: PopoverModalExampleComponent
  },
{
    path: 'popover-positioning',
    component: PopoverPositioningExampleComponent
  },
{
    path: 'popover-scroll',
    component: PopoverScrollExampleComponent
  },
{
    path: 'popover-scrollable',
    component: PopoverScrollableExampleComponent
  },
{
    path: 'popover-table',
    component: PopoverTableExampleComponent
  },
{
    path: 'popover-trigger',
    component: PopoverTriggerExampleComponent
  },
{
    path: 'progress-stepper-custom',
    component: ProgressStepperCustomExampleComponent
  },
{
    path: 'progress-stepper-form',
    component: ProgressStepperFormExampleComponent
  },
{
    path: 'progress-stepper-multi-groups',
    component: ProgressStepperMultiGroupsExampleComponent
  },
{
    path: 'progress-stepper-multi-vertical',
    component: ProgressStepperMultiVerticalExampleComponent
  },
{
    path: 'progress-stepper-multi',
    component: ProgressStepperMultiExampleComponent
  },
{
    path: 'progress-stepper-nonlinear',
    component: ProgressStepperNonlinearExampleComponent
  },
{
    path: 'progress-stepper-progress',
    component: ProgressStepperProgressExampleComponent
  },
{
    path: 'progress-stepper-reactivemulti',
    component: ProgressStepperReactivemultiExampleComponent
  },
{
    path: 'progress-stepper-reactivesingle',
    component: ProgressStepperReactivesingleExampleComponent
  },
{
    path: 'progress-stepper-step',
    component: ProgressStepperStepExampleComponent
  },
{
    path: 'progress-stepper-title',
    component: ProgressStepperTitleExampleComponent
  },
{
    path: 'progress-stepper',
    component: ProgressStepperExampleComponent
  },
{
    path: 'progressbar-basic',
    component: ProgressbarBasicExampleComponent
  },
{
    path: 'progressbar',
    component: ProgressbarExampleComponent
  },
{
    path: 'radio-button-disabled',
    component: RadioButtonDisabledExampleComponent
  },
{
    path: 'radio-button-event',
    component: RadioButtonEventExampleComponent
  },
{
    path: 'radio-button-form',
    component: RadioButtonFormExampleComponent
  },
{
    path: 'radio-button-group-horizontal',
    component: RadioButtonGroupHorizontalExampleComponent
  },
{
    path: 'radio-button-group-label-size',
    component: RadioButtonGroupLabelSizeExampleComponent
  },
{
    path: 'radio-button-group-validation',
    component: RadioButtonGroupValidationExampleComponent
  },
{
    path: 'radio-button-group',
    component: RadioButtonGroupExampleComponent
  },
{
    path: 'radio-button-negative',
    component: RadioButtonNegativeExampleComponent
  },
{
    path: 'radio-button-reactive',
    component: RadioButtonReactiveExampleComponent
  },
{
    path: 'radio-button-sample',
    component: RadioButtonSampleExampleComponent
  },
{
    path: 'radio-button-sizes',
    component: RadioButtonSizesExampleComponent
  },
{
    path: 'radio-button',
    component: RadioButtonExampleComponent
  },
{
    path: 'radio-toggle-custom',
    component: RadioToggleCustomExampleComponent
  },
{
    path: 'radio-toggle-form',
    component: RadioToggleFormExampleComponent
  },
{
    path: 'radio-toggle-reactive',
    component: RadioToggleReactiveExampleComponent
  },
{
    path: 'radio-toggle-validation',
    component: RadioToggleValidationExampleComponent
  },
{
    path: 'radio-toggle',
    component: RadioToggleBasicExampleComponent
  },
{
    path: 'rating-accessibility',
    component: RatingAccesibilityExampleComponent
  },
{
    path: 'rating-basic',
    component: RatingBasicExampleComponent
  },
{
    path: 'rating-disabled',
    component: RatingDisabledExampleComponent
  },
{
    path: 'rating-negative',
    component: RatingNegativeExampleComponent
  },
{
    path: 'rating-reactive',
    component: RatingReactiveExampleComponent
  },
{
    path: 'rating-simple',
    component: RatingSimpleExampleComponent
  },
{
    path: 'rating-template',
    component: RatingTemplateExampleComponent
  },
{
    path: 'selectable-card-basic',
    component: SelectableCardBasicExampleComponent
  },
{
    path: 'selectable-card-dynamic',
    component: SelectableCardDynamicExampleComponent
  },
{
    path: 'selectable-card-reactive',
    component: SelectableCardReactiveExampleComponent
  },
{
    path: 'selectable-card-states',
    component: SelectableCardStatesExampleComponent
  },
{
    path: 'sidebar-footer',
    component: SidebarFooterExampleComponent
  },
{
    path: 'sidebar-methods',
    component: SidebarMethodsExampleComponent
  },
{
    path: 'sidebar-outputs',
    component: SidebarOutputsExampleComponent
  },
{
    path: 'sidebar-resizeable',
    component: SidebarResizeableExampleComponent
  },
{
    path: 'sidebar',
    component: SidebarExampleComponent
  },
{
    path: 'sidepanel-floating',
    component: SidepanelFloatingExampleComponent
  },
{
    path: 'sidepanel-static',
    component: SidepanelStaticExampleComponent
  },
{
    path: 'slider-basic',
    component: SliderBasicExampleComponent
  },
{
    path: 'slider-decimal',
    component: SliderDecimalExampleComponent
  },
{
    path: 'slider-default',
    component: SliderDefaultExampleComponent
  },
{
    path: 'slider-disabled',
    component: SliderDisabledExampleComponent
  },
{
    path: 'slider-inverted',
    component: SliderInvertedExampleComponent
  },
{
    path: 'slider-label',
    component: SliderLabelExampleComponent
  },
{
    path: 'slider-negative',
    component: SliderNegativeExampleComponent
  },
{
    path: 'slider-reactive',
    component: SliderReactiveExampleComponent
  },
{
    path: 'slider-template',
    component: SliderTemplateExampleComponent
  },
{
    path: 'slider-textual',
    component: SliderTextualExampleComponent
  },
{
    path: 'slider-thumb',
    component: SliderThumbExampleComponent
  },
{
    path: 'small-stage-content-variation',
    component: SmallStageContentVariationExampleComponent
  },
{
    path: 'small-stage-default',
    component: SmallStageDefaultExampleComponent
  },
{
    path: 'small-stage-image-offset',
    component: SmallStageImageOffsetExampleComponent
  },
{
    path: 'small-stage-text-narrow',
    component: SmallStageTextNarrowExampleComponent
  },
{
    path: 'spinner-negative',
    component: SpinnerNegativeExampleComponent
  },
{
    path: 'spinner-sizes',
    component: SpinnerSizesExampleComponent
  },
{
    path: 'switcher-default',
    component: SwitcherDefaultExampleComponent
  },
{
    path: 'switcher-disabled',
    component: SwitcherDisabledComponent
  },
{
    path: 'switcher-label-left',
    component: SwitcherLabelLeftExampleComponent
  },
{
    path: 'switcher-label-small',
    component: SwitcherLabelSmallExampleComponent
  },
{
    path: 'switcher-large',
    component: SwitcherLargeExampleComponent
  },
{
    path: 'switcher-negative',
    component: SwitcherNegativeExampleComponent
  },
{
    path: 'switcher-reactive-form',
    component: SwitcherReactiveFormExampleComponent
  },
{
    path: 'switcher-template-driven',
    component: SwitcherTemplateDrivenExampleComponent
  },
{
    path: 'table-condensed',
    component: TableCondensedExampleComponent
  },
{
    path: 'table-expandable',
    component: ExpandableRowExampleComponent
  },
{
    path: 'table-filter-sort-paginate',
    component: TableFilterSortPaginateExampleComponent
  },
{
    path: 'table-selecting',
    component: TableSelectingExampleComponent
  },
{
    path: 'table-single-select',
    component: TableSingleSelectExampleComponent
  },
{
    path: 'table-sorting',
    component: TableSortingExampleComponent
  },
{
    path: 'table-zebra',
    component: TableZebraExampleComponent
  },
{
    path: 'table',
    component: TableExampleComponent
  },
{
    path: 'tabs-appearance',
    component: TabsAppearanceExampleComponent
  },
{
    path: 'tabs-auto-manual-select',
    component: TabsAutoManualSelectExampleComponent
  },
{
    path: 'tabs-basic',
    component: TabsBasicExampleComponent
  },
{
    path: 'tabs-disabled',
    component: TabsDisabledExampleComponent
  },
{
    path: 'tabs-dynamic',
    component: TabsDynamicExampleComponent
  },
{
    path: 'tabs-injection-token',
    component: TabsInjectionTokenExampleComponent
  },
{
    path: 'tabs-lazy',
    component: TabsLazyExampleComponent
  },
{
    path: 'tabs-nav-bar-appearance',
    component: TabsNavBarAppearanceExampleComponent
  },
{
    path: 'tabs-nav-bar-injection-token',
    component: TabsNavBarInjectionTokenExampleComponent
  },
{
    path: 'tabs-nav-bar',
    component: TabsNavBarExampleComponent
  },
{
    path: 'tabs-negative',
    component: TabsNegativeExampleComponent
  },
{
    path: 'tabs-output-events',
    component: TabsOutputEventsExampleComponent
  },
{
    path: 'tabs-responsive',
    component: TabsResponsiveExampleComponent
  },
{
    path: 'tabs-styling',
    component: TabsStylingExampleComponent
  },
{
    path: 'tabs-template',
    component: TabsTemplateExampleComponent
  },
{
    path: 'taglist-a11y',
    component: TagListAccessibilityExampleComponent
  },
{
    path: 'taglist-basic',
    component: TagListBasicExampleComponent
  },
{
    path: 'taglist-delete',
    component: TagListDeleteExampleComponent
  },
{
    path: 'taglist-formatter',
    component: TagListFormatterExampleComponent
  },
{
    path: 'taglist-keyword',
    component: TagListKeywordExampleComponent
  },
{
    path: 'taglist-objects',
    component: TagListObjectsExampleComponent
  },
{
    path: 'taglist-output',
    component: TagListOutputExampleComponent
  },
{
    path: 'taglist-reactive',
    component: TagListReactiveExampleComponent
  },
{
    path: 'taglist-templatedriven',
    component: TagListTemplateDrivenExampleComponent
  },
{
    path: 'taglist',
    component: TaglistExampleComponent
  },
{
    path: 'timefield-disabled',
    component: TimefieldDisabledExampleComponent
  },
{
    path: 'timefield-format-toggler',
    component: TimefieldFormatTogglerExampleComponent
  },
{
    path: 'timefield-localize',
    component: TimefieldLocalizeExampleComponent
  },
{
    path: 'timefield-negative',
    component: TimefieldNegativeExampleComponent
  },
{
    path: 'timefield-reactive',
    component: TimefieldReactiveExampleComponent
  },
{
    path: 'timefield-template-driven',
    component: TimefieldTemplateDrivenExampleComponent
  },
{
    path: 'toolbar-positioning-content',
    component: ToolbarPositioningContentExampleComponent
  },
{
    path: 'toolbar',
    component: ToolbarExampleComponent
  },
{
    path: 'tooltip-basic',
    component: TooltipBasicExampleComponent
  },
{
    path: 'tooltip-delay',
    component: TooltipDelayExampleComponent
  },
{
    path: 'tooltip-disabled',
    component: TooltipDisabledExampleComponent
  },
{
    path: 'tooltip-fallbacks-table',
    component: TooltipFallbacksTableExampleComponent
  },
{
    path: 'tooltip-positions',
    component: TooltipPositionsExampleComponent
  },
{
    path: 'tooltip-programmatic',
    component: TooltipProgrammaticExampleComponent
  },
{
    path: 'tooltip-settings',
    component: TooltipSettingsExampleComponent
  },
{
    path: 'tree',
    component: TreeDemoComponent
  },
{
    path: 'video-advanced',
    component: VideoAdvancedExampleComponent
  },
{
    path: 'video-custom',
    component: VideoCustomExampleComponent
  },
{
    path: 'video',
    component: VideoExampleComponent
  },
{
    path: 'viewport-change',
    component: ViewportChangeExampleComponent
  },
{
    path: 'radio-toggle-negative',
    component: RadioToggleNegativeExampleComponent
  }]
  }
];

@NgModule({
    declarations: EXAMPLE_LIST,
    entryComponents: EXAMPLE_LIST,
    imports: [
      ExamplesSharedModule,
      CommonModule,
      RouterModule
    ],
    exports: [
      RouterModule,
      ExamplesSharedModule
    ]
})
export class ExampleModule {
  static forRoot(): ModuleWithProviders<ExampleModule> {
    return {
      ngModule: ExampleModule,
      providers: [
        { provide: NX_EXAMPLES_TOKEN, useValue: EXAMPLES },
        { provide: ROUTES, useValue: EXAMPLE_ROUTES, multi: true }
      ]
    };
  }
}
