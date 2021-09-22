
  import { Injectable, Compiler, Injector } from '@angular/core';
  import { BaseLazyLoadingService } from '@aposin/ngx-docs-ui';

  @Injectable({providedIn: 'root'})
  export class LazyLoadingService implements BaseLazyLoadingService {

    constructor(private compiler: Compiler, private injector: Injector) {}

    getComponent(id: string, moduleId: string) {
      return this.load(moduleId).then( (moduleClass: any) => {
        return this.compiler.compileModuleAsync(moduleClass).then(ngModuleFactory => {
          const ngModuleRef = ngModuleFactory.create(this.injector);
          const componentClass = moduleClass.components()[id];
          const componentFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(componentClass);
          
          return {componentFactory, ngModuleFactory};
        })
      })
    }

    load(moduleId: string): any {
      switch (moduleId) {
        case 'accessibility': return import('../examples/accessibility/accessibility-examples.module').then(m => m.AccessibilityExamplesModule);
  

  case 'accordion': return import('../examples/accordion/accordion-examples.module').then(m => m.AccordionExamplesModule);
  

  case 'action': return import('../examples/action/action-examples.module').then(m => m.ActionExamplesModule);
  

  case 'autocomplete': return import('../examples/autocomplete/autocomplete-examples.module').then(m => m.AutocompleteExamplesModule);
  

  case 'avatar': return import('../examples/avatar/avatar-examples.module').then(m => m.AvatarExamplesModule);
  

  case 'badge': return import('../examples/badge/badge-examples.module').then(m => m.BadgeExamplesModule);
  

  case 'breadcrumb': return import('../examples/breadcrumb/breadcrumb-examples.module').then(m => m.BreadcrumbExamplesModule);
  

  case 'button': return import('../examples/button/button-examples.module').then(m => m.ButtonExamplesModule);
  

  case 'card': return import('../examples/card/card-examples.module').then(m => m.CardExamplesModule);
  

  case 'checkbox': return import('../examples/checkbox/checkbox-examples.module').then(m => m.CheckboxExamplesModule);
  

  case 'circle-toggle': return import('../examples/circle-toggle/circle-toggle-examples.module').then(m => m.CircleExamplesModule);
  

  case 'code-input': return import('../examples/code-input/code-input-examples.module').then(m => m.CodeExamplesModule);
  

  case 'comparison-table': return import('../examples/comparison-table/comparison-table-examples.module').then(m => m.ComparisonExamplesModule);
  

  case 'context-menu': return import('../examples/context-menu/context-menu-examples.module').then(m => m.ContextExamplesModule);
  

  case 'copytext': return import('../examples/copytext/copytext-examples.module').then(m => m.CopytextExamplesModule);
  

  case 'datefield': return import('../examples/datefield/datefield-examples.module').then(m => m.DatefieldExamplesModule);
  

  case 'dropdown': return import('../examples/dropdown/dropdown-examples.module').then(m => m.DropdownExamplesModule);
  

  case 'dynamic-table': return import('../examples/dynamic-table/dynamic-table-examples.module').then(m => m.DynamicExamplesModule);
  

  case 'error': return import('../examples/error/error-examples.module').then(m => m.ErrorExamplesModule);
  

  case 'file-uploader': return import('../examples/file-uploader/file-uploader-examples.module').then(m => m.FileExamplesModule);
  

  case 'footer': return import('../examples/footer/footer-examples.module').then(m => m.FooterExamplesModule);
  

  case 'formfield': return import('../examples/formfield/formfield-examples.module').then(m => m.FormfieldExamplesModule);
  

  case 'grid': return import('../examples/grid/grid-examples.module').then(m => m.GridExamplesModule);
  

  case 'header': return import('../examples/header/header-examples.module').then(m => m.HeaderExamplesModule);
  

  case 'headline': return import('../examples/headline/headline-examples.module').then(m => m.HeadlineExamplesModule);
  

  case 'icon': return import('../examples/icon/icon-examples.module').then(m => m.IconExamplesModule);
  

  case 'image': return import('../examples/image/image-examples.module').then(m => m.ImageExamplesModule);
  

  case 'indicator': return import('../examples/indicator/indicator-examples.module').then(m => m.IndicatorExamplesModule);
  

  case 'input': return import('../examples/input/input-examples.module').then(m => m.InputExamplesModule);
  

  case 'label': return import('../examples/label/label-examples.module').then(m => m.LabelExamplesModule);
  

  case 'layout': return import('../examples/layout/layout-examples.module').then(m => m.LayoutExamplesModule);
  

  case 'licence-plate': return import('../examples/licence-plate/licence-plate-examples.module').then(m => m.LicencePlateExamplesModule);
  

  case 'link': return import('../examples/link/link-examples.module').then(m => m.LinkExamplesModule);
  

  case 'list': return import('../examples/list/list-examples.module').then(m => m.ListExamplesModule);
  

  case 'mask': return import('../examples/mask/mask-examples.module').then(m => m.MaskExamplesModule);
  

  case 'menu': return import('../examples/menu/menu-examples.module').then(m => m.MenuExamplesModule);
  

  case 'message': return import('../examples/message/message-examples.module').then(m => m.MessageExamplesModule);
  

  case 'modal': return import('../examples/modal/modal-examples.module').then(m => m.ModalExamplesModule);
  

  case 'natural-language-form': return import('../examples/natural-language-form/natural-language-form-examples.module').then(m => m.NaturalExamplesModule);
  

  case 'notification-panel': return import('../examples/notification-panel/notification-panel-examples.module').then(m => m.NotificationExamplesModule);
  

  case 'number-stepper': return import('../examples/number-stepper/number-stepper-examples.module').then(m => m.NumberExamplesModule);
  

  case 'overlay': return import('../examples/overlay/overlay-examples.module').then(m => m.OverlayExamplesModule);
  

  case 'page-search': return import('../examples/page-search/page-search-examples.module').then(m => m.PageExamplesModule);
  

  case 'pagination': return import('../examples/pagination/pagination-examples.module').then(m => m.PaginationExamplesModule);
  

  case 'phone-input': return import('../examples/phone-input/phone-input-examples.module').then(m => m.PhoneInputExamplesModule);
  

  case 'popover': return import('../examples/popover/popover-examples.module').then(m => m.PopoverExamplesModule);
  

  case 'progress-stepper': return import('../examples/progress-stepper/progress-stepper-examples.module').then(m => m.ProgressExamplesModule);
  

  case 'progressbar': return import('../examples/progressbar/progressbar-examples.module').then(m => m.ProgressbarExamplesModule);
  

  case 'radio-button': return import('../examples/radio-button/radio-button-examples.module').then(m => m.RadioExamplesModule);
  

  case 'radio-toggle': return import('../examples/radio-toggle/radio-toggle-examples.module').then(m => m.RadioToggleExamplesModule);
  

  case 'rating': return import('../examples/rating/rating-examples.module').then(m => m.RatingExamplesModule);
  

  case 'rtl': return import('../examples/rtl/rtl-examples.module').then(m => m.RtlExamplesModule);
  

  case 'sidebar': return import('../examples/sidebar/sidebar-examples.module').then(m => m.SidebarExamplesModule);
  

  case 'sidepanel': return import('../examples/sidepanel/sidepanel-examples.module').then(m => m.SidepanelExamplesModule);
  

  case 'slider': return import('../examples/slider/slider-examples.module').then(m => m.SliderExamplesModule);
  

  case 'small-stage': return import('../examples/small-stage/small-stage-examples.module').then(m => m.SmallExamplesModule);
  

  case 'spinner': return import('../examples/spinner/spinner-examples.module').then(m => m.SpinnerExamplesModule);
  

  case 'switcher': return import('../examples/switcher/switcher-examples.module').then(m => m.SwitcherExamplesModule);
  

  case 'table': return import('../examples/table/table-examples.module').then(m => m.TableExamplesModule);
  

  case 'tabs': return import('../examples/tabs/tabs-examples.module').then(m => m.TabsExamplesModule);
  

  case 'taglist': return import('../examples/taglist/taglist-examples.module').then(m => m.TaglistExamplesModule);
  

  case 'timefield': return import('../examples/timefield/timefield-examples.module').then(m => m.TimefieldExamplesModule);
  

  case 'toolbar': return import('../examples/toolbar/toolbar-examples.module').then(m => m.ToolbarExamplesModule);
  

  case 'tooltip': return import('../examples/tooltip/tooltip-examples.module').then(m => m.TooltipExamplesModule);
  

  case 'tree': return import('../examples/tree/tree-examples.module').then(m => m.TreeExamplesModule);
  

  case 'video': return import('../examples/video/video-examples.module').then(m => m.VideoExamplesModule);
  

  case 'viewport': return import('../examples/viewport/viewport-examples.module').then(m => m.ViewportExamplesModule);
    default: return Promise.resolve().then(() => null);
      }
    }
  }
  