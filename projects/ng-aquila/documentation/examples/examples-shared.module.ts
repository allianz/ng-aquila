// This file is curated. Add all required dependencies.
// This will be consumed inside the generated examples module.
import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxAutocompleteModule } from '@aposin/ng-aquila/autocomplete';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxCircleToggleModule } from '@aposin/ng-aquila/circle-toggle';
import { NxCodeInputModule } from '@aposin/ng-aquila/code-input';
import { NxComparisonTableModule } from '@aposin/ng-aquila/comparison-table';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxDynamicTableModule } from '@aposin/ng-aquila/dynamic-table';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeaderModule } from '@aposin/ng-aquila/header';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxImageModule } from '@aposin/ng-aquila/image';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxListModule } from '@aposin/ng-aquila/list';
import { NxMaskModule } from '@aposin/ng-aquila/mask';
import { NxMenuModule } from '@aposin/ng-aquila/menu';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import { NxNaturalLanguageFormModule } from '@aposin/ng-aquila/natural-language-form';
import { NxNumberStepperModule } from '@aposin/ng-aquila/number-stepper';
import { NxPageSearchModule } from '@aposin/ng-aquila/page-search';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxProgressStepperModule } from '@aposin/ng-aquila/progress-stepper';
import { NxProgressbarModule } from '@aposin/ng-aquila/progressbar';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxRatingModule } from '@aposin/ng-aquila/rating';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxSliderModule } from '@aposin/ng-aquila/slider';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { NxSwitcherModule } from '@aposin/ng-aquila/switcher';
import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';
import { NxTaglistModule } from '@aposin/ng-aquila/taglist';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { NxTreeModule } from '@aposin/ng-aquila/tree';
import { NxVideoModule } from '@aposin/ng-aquila/video';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NxFileUploaderModule } from '@aposin/ng-aquila/file-uploader';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NxToolbarModule } from '@aposin/ng-aquila/toolbar';
import { NxTimefieldModule } from '@aposin/ng-aquila/timefield';
import { NxSidepanelModule } from '@aposin/ng-aquila/sidepanel';

// Collect all imports and exports here
// Note: when you have to call .forRoot() or .forChild() in imports you have to add it separately from
// EXPORTED_MODULES in the ExamplesSharedModule below. For an example see NxModalModule
const EXPORTED_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  HttpClientJsonpModule,
  ReactiveFormsModule,
  NxAccordionModule,
  NxAutocompleteModule,
  NxButtonModule,
  NxBreadcrumbModule,
  NxCardModule,
  NxCheckboxModule,
  NxCircleToggleModule,
  NxCodeInputModule,
  NxContextMenuModule,
  NxComparisonTableModule,
  NxCopytextModule,
  NxDatefieldModule,
  NxDropdownModule,
  NxFormfieldModule,
  NxGridModule,
  NxHeadlineModule,
  NxIconModule,
  NxImageModule,
  NxInputModule,
  NxLinkModule,
  NxListModule,
  NxMaskModule,
  NxMessageModule,
  NxModalModule,
  NxMomentDateModule,
  NxNaturalLanguageFormModule,
  NxNumberStepperModule,
  NxPaginationModule,
  NxPageSearchModule,
  NxPopoverModule,
  NxProgressbarModule,
  NxProgressStepperModule,
  NxRadioModule,
  NxRadioToggleModule,
  NxRatingModule,
  NxSliderModule,
  NxSpinnerModule,
  NxSwitcherModule,
  NxDynamicTableModule,
  NxTabsModule,
  NxTaglistModule,
  NxTooltipModule,
  NxVideoModule,
  NxTableModule,
  NxFormfieldModule,
  NxHeaderModule,
  NxInputModule,
  NxSidebarModule,
  NxSidepanelModule,
  NxBadgeModule,
  NxTreeModule,
  NxActionModule,
  NxFooterModule,
  NxMenuModule,
  RouterModule,
  ScrollingModule,
  TextFieldModule,
  NxErrorModule,
  NxLabelModule,
  NxFileUploaderModule,
  NxToolbarModule,
  NxTimefieldModule
];

@NgModule({
  imports: [
    NxModalModule.forRoot(),
    ...EXPORTED_MODULES
  ],
  exports: [
    NxModalModule,
    ...EXPORTED_MODULES
  ]
})
export class ExamplesSharedModule { }
