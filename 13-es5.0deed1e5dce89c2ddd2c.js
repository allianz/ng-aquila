!function(){function e(t,n){return(e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(t,n)}function t(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var i,a=o(e);if(t){var r=o(this).constructor;i=Reflect.construct(a,arguments,r)}else i=a.apply(this,arguments);return n(this,i)}}function n(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"1lbd":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n("f7+R"),i={modalContainer:Object(o.n)("modalContainer",[Object(o.k)("void, exit",Object(o.l)({opacity:0,transform:"scale(1.3)"})),Object(o.k)("enter",Object(o.l)({transform:"none"})),Object(o.m)("* => enter",Object(o.e)("200ms cubic-bezier(0, 0, 0.2, 1)",Object(o.l)({transform:"scale(1)",opacity:1}))),Object(o.m)("* => void, * => exit",Object(o.e)("200ms cubic-bezier(0.4, 0.0, 0.2, 1)",Object(o.l)({opacity:0,transform:"scale(1.3)"})))])}},"306D":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var o=function e(){r(this,e),this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="736px",this.height="",this.maxWidth="736px",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.autoFocus=!0,this.restoreFocus=!0,this.closeOnNavigation=!0,this.showCloseIcon=!1,this.closeIconButtonLabel="Close dialog",this.direction="ltr"}},"4xR7":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("ZTXN"),i=n("EM62"),c=function(){var e=function(){function e(){r(this,e),this.subject=new o.a,this.close$=this.subject.asObservable()}return a(e,[{key:"close",value:function(){this.subject.next()}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=i.Jb({token:e,factory:e.\u0275fac}),e}()},"6+d8":function(e,t,n){"use strict";var o=n("gO+g");n.d(t,"b",(function(){return o.a})),n("CSE7"),n("XMW0"),n("4xR7"),n("hyrs"),n("6F4J");var i=n("IySq");n.d(t,"a",(function(){return i.b})),n("1lbd"),n("mLex"),n("306D")},"6F4J":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var o=n("EM62"),i=n("mLex"),c=n("IySq"),s=function(){var e=function(){function e(t,n,o){r(this,e),this.modalRef=t,this._elementRef=n,this._dialogService=o,this.type="button"}return a(e,[{key:"ngOnInit",value:function(){this.modalRef||(this.modalRef=function(e,t){for(var n=e.nativeElement.parentElement;n&&!n.classList.contains("nx-modal__container");)n=n.parentElement;return n?t.find((function(e){return e.id===n.id})):null}(this._elementRef,this._dialogService.openModals))}},{key:"ngOnChanges",value:function(e){var t=e.modalResult;t&&(this.modalResult=t.currentValue)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Nb(i.a,8),o.Nb(o.l),o.Nb(c.b))},e.\u0275dir=o.Ib({type:e,selectors:[["","nxModalClose",""]],hostVars:2,hostBindings:function(e,t){1&e&&o.ac("click",(function(){return t.modalRef.close(t.modalResult)})),2&e&&o.Cb("aria-label",t.ariaLabel||null)("type",t.type)},inputs:{ariaLabel:["aria-label","ariaLabel"],type:"type",modalResult:["nxModalClose","modalResult"]},features:[o.zb]}),e}()},CSE7:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"c",(function(){return P})),n.d(t,"b",(function(){return E}));var o=n("EM62"),i=n("f7+R"),c=Object(i.g)([Object(i.l)({opacity:0}),Object(i.e)("300ms",Object(i.l)({opacity:1}))]),s=Object(i.g)(Object(i.e)("300ms",Object(i.l)({opacity:0}))),l=Object(i.g)([Object(i.l)({transform:"scale(1)",opacity:1}),Object(i.e)("250ms",Object(i.l)({transform:"scale(1.3)",opacity:0}))]),u=Object(i.g)([Object(i.l)({transform:"scale(1.3)",opacity:0}),Object(i.e)("250ms",Object(i.l)({transform:"scale(1)",opacity:1}))]),d=n("bwdy"),h=n("4xR7"),f=n("e4iD"),p=n("sg/T"),b=n("2kYt"),_=n("qvOF"),v=n("VKQk"),m=["closeButton"];function g(e,t){if(1&e){var n=o.Ub();o.Tb(0,"button",8,9),o.ac("click",(function(){return o.vc(n),o.ec().closeButtonClick()})),o.Ob(2,"nx-icon",10),o.Sb()}if(2&e){var i=o.ec();o.Cb("aria-label",i.closeButtonLabel)}}function x(e,t){1&e&&o.Pb(0)}function y(e,t){if(1&e&&(o.Rb(0),o.Hc(1,x,1,0,"ng-container",11),o.Qb()),2&e){var n=o.ec();o.Bb(1),o.kc("ngTemplateOutlet",n.body)}}function O(e,t){1&e&&o.ic(0)}var k,C,w,M=["*"],j=((w=function e(){r(this,e)}).\u0275fac=function(e){return new(e||w)},w.\u0275dir=o.Ib({type:w,selectors:[["","nxModalActions",""]],hostVars:2,hostBindings:function(e,t){2&e&&o.Fb("nx-modal__actions",!0)}}),w),P=((C=function e(){r(this,e)}).\u0275fac=function(e){return new(e||C)},C.\u0275dir=o.Ib({type:C,selectors:[["","nxModalContent",""]],hostVars:2,hostBindings:function(e,t){2&e&&o.Fb("nx-modal__content",!0)}}),C),E=((k=function(){function e(t,n,i,a){r(this,e),this.modalService=t,this.eventManager=n,this._changeDetectorRef=i,this._focusMonitor=a,this._closeButtonLabel="Close dialog",this.hideOnEsc=!0,this.hideOnClickOutside=!0,this.showCloseIcon=!0,this.closeEvent=new o.o,this.closeSubscription=d.a.EMPTY,this.removeEventListener=void 0}return a(e,[{key:"ngOnInit",value:function(){var e=this;this.closeSubscription=this.modalService.close$.subscribe((function(){return e.closeEvent.emit()})),this.removeEventListener=this.eventManager.addGlobalEventListener("window","keyup.esc",(function(){e.hideOnEsc&&e.modalService.close()}))}},{key:"ngAfterViewInit",value:function(){this.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}},{key:"ngOnDestroy",value:function(){this.removeEventListener(),this.closeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._closeButton)}},{key:"clickOutsideModal",value:function(){this.hideOnClickOutside&&this.modalService.close()}},{key:"closeButtonClick",value:function(){this.modalService.close()}},{key:"cancelClick",value:function(e){e.stopPropagation()}},{key:"closeButtonLabel",set:function(e){e!==this._closeButtonLabel&&(this._closeButtonLabel=e,this._changeDetectorRef.markForCheck())},get:function(){return this._closeButtonLabel}}]),e}()).\u0275fac=function(e){return new(e||k)(o.Nb(h.a),o.Nb(f.c),o.Nb(o.h),o.Nb(p.g))},k.\u0275cmp=o.Hb({type:k,selectors:[["nx-modal"]],viewQuery:function(e,t){var n;1&e&&o.Nc(m,!0),2&e&&o.qc(n=o.bc())&&(t._closeButton=n.first)},hostVars:3,hostBindings:function(e,t){2&e&&(o.Gc("@fadeInOut",void 0),o.Fb("nx-modal--fixed-width","fixed"===t.size))},inputs:{closeButtonLabel:"closeButtonLabel",body:["nxBody","body"],hideOnEsc:["nxHideOnEsc","hideOnEsc"],hideOnClickOutside:["nxHideOnClickOutside","hideOnClickOutside"],showCloseIcon:["nxShowCloseIcon","showCloseIcon"],size:["nxSize","size"]},outputs:{closeEvent:"nxClose"},ngContentSelectors:M,decls:9,vars:4,consts:[["role","dialog","cdkTrapFocus","","cdkTrapFocusAutoCapture","","cdkFocusInitial","",1,"nx-modal"],[1,"nx-modal__backdrop",3,"click"],[1,"nx-modal__position"],[1,"nx-modal__container",3,"click"],["class","nx-modal__close","type","button",3,"click",4,"ngIf"],["cdkScrollable","",1,"nx-modal__content-wrapper"],[4,"ngIf","ngIfElse"],["projectContent",""],["type","button",1,"nx-modal__close",3,"click"],["closeButton",""],["name","close"],[4,"ngTemplateOutlet"]],template:function(e,t){if(1&e&&(o.jc(),o.Tb(0,"div",0),o.Tb(1,"div",1),o.ac("click",(function(){return t.clickOutsideModal()})),o.Tb(2,"div",2),o.Tb(3,"div",3),o.ac("click",(function(e){return t.cancelClick(e)})),o.Hc(4,g,3,1,"button",4),o.Tb(5,"div",5),o.Hc(6,y,2,1,"ng-container",6),o.Hc(7,O,1,0,"ng-template",null,7,o.Ic),o.Sb(),o.Sb(),o.Sb(),o.Sb(),o.Sb()),2&e){var n=o.rc(8);o.Bb(3),o.kc("@scaleUpDown",void 0),o.Bb(1),o.kc("ngIf",t.showCloseIcon),o.Bb(2),o.kc("ngIf",t.body)("ngIfElse",n)}},directives:[p.e,b.t,_.a,v.a,b.A],styles:["[_nghost-%COMP%]{position:relative;z-index:1000}.nx-modal[_ngcontent-%COMP%]{display:flex;position:fixed;width:100vw;height:100vh;top:0;bottom:0;left:0;right:0;z-index:1000;align-items:center;justify-content:center;transition:opacity .3s ease}.nx-modal__backdrop[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.35);height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.nx-modal__position[_ngcontent-%COMP%]{position:absolute;display:inline-block;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20}.nx-modal__container[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 8px 24px rgba(65,65,65,.35);background:var(--modal-background-color);color:var(--modal-text-color)}.nx-modal__content-wrapper[_ngcontent-%COMP%]{padding:40px 40px 48px;max-height:calc(100vh - 48px);overflow-y:auto}@media (max-width:703px){.nx-modal__content-wrapper[_ngcontent-%COMP%]{max-height:70vh;padding:40px 32px 48px}}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (-ms-high-contrast:active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText}}@media (max-width:703px){.nx-modal__position[_ngcontent-%COMP%]{width:100%}.nx-modal__container[_ngcontent-%COMP%]{position:relative;max-width:calc(100vw - 16px);max-height:70vh;margin:0 auto}}.nx-modal--fixed-width[_nghost-%COMP%]   .nx-modal__container[_ngcontent-%COMP%]{width:736px;max-width:calc(100vw - 16px)}  .nx-modal__actions{height:72px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;position:absolute;bottom:0;left:0;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px;background:var(--modal-actions-background-color)}  .nx-modal__content{overflow-y:auto;max-height:calc(100vh - 72px - 48px);padding:0 40px;margin:0 -40px}@media (max-width:703px){  .nx-modal__content{max-height:calc(70vh - 72px - 48px)}}@media screen and (-ms-high-contrast:active){.nx-modal__content-wrapper[_ngcontent-%COMP%],   .nx-modal__actions{border:2px solid windowText}}"],data:{animation:[Object(i.n)("fadeInOut",[Object(i.m)(":enter",[Object(i.o)(c),Object(i.i)("@scaleUpDown",[Object(i.f)()])]),Object(i.m)(":leave",[Object(i.i)("@scaleUpDown",[Object(i.f)()]),Object(i.o)(s)])]),Object(i.n)("scaleUpDown",[Object(i.m)(":enter",Object(i.o)(u)),Object(i.m)(":leave",Object(i.o)(l))])]},changeDetection:0}),k)},IySq:function(e,t,n){"use strict";n.d(t,"a",(function(){return v})),n.d(t,"b",(function(){return m}));var o=n("HYj3"),i=n("Sv/w"),c=n("EM62"),s=n("ZTXN"),l=n("i9xl"),u=n("jIqt"),d=n("306D"),h=n("hyrs"),f=n("mLex"),p=new c.r("NxModalData"),b=new c.r("nx-modal-default-options"),_=new c.r("nx-modal-scroll-strategy"),v={provide:_,deps:[o.c],useFactory:function(e){return function(){return e.scrollStrategies.block()}}},m=function(){var e=function(){function e(t,n,o,i,a,c){var d=this;r(this,e),this._overlay=t,this._injector=n,this._defaultOptions=o,this._parentDialogService=a,this._overlayContainer=c,this._openModalsAtThisLevel=[],this._afterAllClosedAtThisLevel=new s.a,this._afterOpenedAtThisLevel=new s.a,this._ariaHiddenElements=new Map,this.afterAllClosed=Object(l.a)((function(){return d.openModals.length?d._afterAllClosed:d._afterAllClosed.pipe(Object(u.a)(void 0))})),this._scrollStrategy=i}return a(e,[{key:"open",value:function(e,t){var n=this;if((t=function(e,t){return Object.assign(Object.assign({},t),e)}(t,this._defaultOptions||new d.a)).id&&this.getModalById(t.id))throw Error('Modal with id "'.concat(t.id,'" exists already. The modal id must be unique.'));var o=this._createOverlay(t),i=this._attachModalContainer(o,t),a=this._attachModalContent(e,i,o,t);return this.openModals.length||this._hideNonModalContentFromAssistiveTechnology(),this.openModals.push(a),a.afterClosed().subscribe((function(){return n._removeOpenModal(a)})),this.afterOpened.next(a),a}},{key:"closeAll",value:function(){this._closeModals(this.openModals)}},{key:"getModalById",value:function(e){return this.openModals.find((function(t){return t.id===e}))}},{key:"ngOnDestroy",value:function(){this._closeModals(this._openModalsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}},{key:"_createOverlay",value:function(e){var t=this._getOverlayConfig(e);return this._overlay.create(t)}},{key:"_getOverlayConfig",value:function(e){var t=new o.d({positionStrategy:this._overlay.position().global(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,disposeOnNavigation:e.closeOnNavigation,direction:e.direction});return e.backdropClass&&(t.backdropClass=e.backdropClass),t}},{key:"_attachModalContainer",value:function(e,t){var n=c.s.create({parent:t&&t.viewContainerRef&&t.viewContainerRef.injector||this._injector,providers:[{provide:d.a,useValue:t}]}),o=new i.d(h.a,t.viewContainerRef,n,t.componentFactoryResolver);return e.attach(o).instance}},{key:"_attachModalContent",value:function(e,t,n,o){var a=new f.a(n,t,o.id);if(o.hasBackdrop&&n.backdropClick().subscribe((function(){a.disableClose||a.close()})),e instanceof c.N)t.attachTemplatePortal(new i.i(e,null,{$implicit:o.data,modalRef:a}));else{var r=this._createInjector(o,a,t),s=t.attachComponentPortal(new i.d(e,o.viewContainerRef,r));a.componentInstance=s.instance}return a.updateSize(o.width,o.height).updatePosition(o.position),a}},{key:"_createInjector",value:function(e,t,n){return c.s.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:h.a,useValue:n},{provide:p,useValue:e.data},{provide:f.a,useValue:t}]})}},{key:"_removeOpenModal",value:function(e){var t=this.openModals.indexOf(e);t>-1&&(this.openModals.splice(t,1),this.openModals.length||(this._ariaHiddenElements.forEach((function(e,t){e?t.setAttribute("aria-hidden",e):t.removeAttribute("aria-hidden")})),this._ariaHiddenElements.clear(),this._afterAllClosed.next()))}},{key:"_hideNonModalContentFromAssistiveTechnology",value:function(){var e=this._overlayContainer.getContainerElement();if(e.parentElement)for(var t=e.parentElement.children,n=t.length-1;n>-1;n--){var o=t[n];o===e||"SCRIPT"===o.nodeName||"STYLE"===o.nodeName||o.hasAttribute("aria-live")||(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"))}}},{key:"_closeModals",value:function(e){for(var t=e.length;t--;)e[t].close()}},{key:"openModals",get:function(){return this._parentDialogService?this._parentDialogService.openModals:this._openModalsAtThisLevel}},{key:"afterOpened",get:function(){return this._parentDialogService?this._parentDialogService.afterOpened:this._afterOpenedAtThisLevel}},{key:"_afterAllClosed",get:function(){var e=this._parentDialogService;return e?e._afterAllClosed:this._afterAllClosedAtThisLevel}}]),e}();return e.\u0275fac=function(t){return new(t||e)(c.Xb(o.c),c.Xb(c.s),c.Xb(b,8),c.Xb(_),c.Xb(e,12),c.Xb(o.e))},e.\u0275prov=c.Jb({token:e,factory:e.\u0275fac}),e}()},XMW0:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n("EM62"),i=n("4xR7"),c=function(){var e=function(){function e(t,n,o){var i=this;r(this,e),this.templateRef=t,this.viewContainer=n,this.modalService=o,this.clickHandler=function(e){i.viewContainer.clear(),i.viewContainer.createEmbeddedView(i.templateRef).markForCheck(),e.preventDefault(),e.stopPropagation()}}return a(e,[{key:"ngOnInit",value:function(){var e=this;this.subscription=this.modalService.close$.subscribe((function(){return e.viewContainer.clear()}))}},{key:"ngOnDestroy",value:function(){var e=this;this.elements.forEach((function(t){t.removeEventListener&&t.removeEventListener("click",e.clickHandler)})),this.subscription.unsubscribe()}},{key:"nxOpenModalOnClick",set:function(e){var t=this;this.elements=e.length?e:[e],this.elements.forEach((function(e){e.addEventListener?e.addEventListener("click",t.clickHandler):e.elementRef?e.elementRef.nativeElement.addEventListener("click",t.clickHandler):console.warn("nxOpenModalOnClick: Given Element doesn't appear to be an ElementRef.",e)}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Nb(o.N),o.Nb(o.R),o.Nb(i.a))},e.\u0275dir=o.Ib({type:e,selectors:[["","nxOpenModalOnClick",""]],inputs:{nxOpenModalOnClick:"nxOpenModalOnClick"}}),e}()},"gO+g":function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var o=n("0FLW"),i=n("2kYt"),c=n("4xR7"),s=n("sg/T"),l=n("HYj3"),u=n("Sv/w"),d=n("IySq"),h=n("EM62"),f=function(){var e=function(){function e(){r(this,e)}return a(e,null,[{key:"forRoot",value:function(){return{ngModule:e,providers:[c.a]}}}]),e}();return e.\u0275mod=h.Lb({type:e}),e.\u0275inj=h.Kb({factory:function(t){return new(t||e)},providers:[d.b,d.a],imports:[[s.a,l.f,u.h,i.c,o.c]]}),e}()},hyrs:function(n,o,i){"use strict";i.d(o,"a",(function(){return m}));var c=i("EM62"),s=i("2kYt"),l=i("1lbd"),u=i("Sv/w"),d=i("sg/T"),h=i("306D"),f=i("VKQk"),p=["closeButton"];function b(e,t){if(1&e){var n=c.Ub();c.Tb(0,"button",2,3),c.ac("click",(function(){return c.vc(n),c.ec()._closeButtonClick()})),c.Ob(2,"nx-icon",4),c.Sb()}if(2&e){var o=c.ec();c.Cb("aria-label",o._config.closeIconButtonLabel)}}function _(e,t){}function v(){throw Error("Attempting to attach modal content after content is already attached")}var m=function(){var n=function(n){!function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&e(t,n)}(i,n);var o=t(i);function i(e,t,n,a,s,l){var u;return r(this,i),(u=o.call(this))._elementRef=e,u._focusTrapFactory=t,u._changeDetectorRef=n,u._config=s,u._focusMonitor=l,u._elementFocusedBeforeDialogWasOpened=null,u._state="enter",u._animationStateChanged=new c.o,u._closeButtonClicked=new c.o,u.attachDomPortal=function(e){return u._portalOutlet.hasAttached()&&v(),u._savePreviouslyFocusedElement(),u._portalOutlet.attachDomPortal(e)},u._ariaLabelledBy=s.ariaLabelledBy||null,u._document=a,u}return a(i,[{key:"ngAfterViewInit",value:function(){this._config.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}},{key:"ngOnDestroy",value:function(){this._focusMonitor.stopMonitoring(this._closeButton)}},{key:"attachComponentPortal",value:function(e){return this._portalOutlet.hasAttached()&&v(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachComponentPortal(e)}},{key:"attachTemplatePortal",value:function(e){return this._portalOutlet.hasAttached()&&v(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachTemplatePortal(e)}},{key:"_trapFocus",value:function(){var e=this._elementRef.nativeElement;if(this._focusTrap||(this._focusTrap=this._focusTrapFactory.create(e)),this._config.autoFocus)this._focusTrap.focusInitialElementWhenReady();else{var t=this._document.activeElement;t===e||e.contains(t)||e.focus()}}},{key:"_restoreFocus",value:function(){var e=this._elementFocusedBeforeDialogWasOpened;if(this._config.restoreFocus&&e&&"function"==typeof e.focus){var t=this._document.activeElement,n=this._elementRef.nativeElement;t&&t!==this._document.body&&t!==n&&!n.contains(t)||e.focus()}this._focusTrap&&this._focusTrap.destroy()}},{key:"_savePreviouslyFocusedElement",value:function(){var e=this;this._document&&(this._elementFocusedBeforeDialogWasOpened=this._document.activeElement,this._elementRef.nativeElement.focus&&Promise.resolve().then((function(){return e._elementRef.nativeElement.focus()})))}},{key:"_onAnimationDone",value:function(e){"enter"===e.toState?this._trapFocus():"exit"===e.toState&&this._restoreFocus(),this._animationStateChanged.emit(e)}},{key:"_onAnimationStart",value:function(e){this._animationStateChanged.emit(e)}},{key:"_startExitAnimation",value:function(){this._state="exit",this._changeDetectorRef.markForCheck()}},{key:"_closeButtonClick",value:function(){this._closeButtonClicked.emit()}}]),i}(u.a);return n.\u0275fac=function(e){return new(e||n)(c.Nb(c.l),c.Nb(d.h),c.Nb(c.h),c.Nb(s.e,8),c.Nb(h.a),c.Nb(d.g))},n.\u0275cmp=c.Hb({type:n,selectors:[["nx-modal-container"]],viewQuery:function(e,t){var n;1&e&&(c.Cc(u.c,!0),c.Nc(p,!0)),2&e&&(c.qc(n=c.bc())&&(t._portalOutlet=n.first),c.qc(n=c.bc())&&(t._closeButton=n.first))},hostAttrs:["tabindex","-1","aria-modal","true",1,"nx-modal__container"],hostVars:6,hostBindings:function(e,t){1&e&&c.Fc("@modalContainer.start",(function(e){return t._onAnimationStart(e)}))("@modalContainer.done",(function(e){return t._onAnimationDone(e)})),2&e&&(c.Cb("id",t._id)("role",t._config.role)("aria-labelledby",t._config.ariaLabel?null:t._ariaLabelledBy)("aria-label",t._config.ariaLabel)("aria-describedby",t._config.ariaDescribedBy||null),c.Gc("@modalContainer",t._state))},features:[c.yb],decls:2,vars:1,consts:[["class","nx-modal__close","type","button",3,"click",4,"ngIf"],["cdkPortalOutlet",""],["type","button",1,"nx-modal__close",3,"click"],["closeButton",""],["name","close"]],template:function(e,t){1&e&&(c.Hc(0,b,3,1,"button",0),c.Hc(1,_,0,0,"ng-template",1)),2&e&&c.kc("ngIf",t._config.showCloseIcon)},directives:[s.t,u.c,f.a],styles:["[_nghost-%COMP%]{background:var(--modal-background-color);color:var(--modal-text-color);padding:40px 40px 48px;border-radius:4px;box-shadow:0 8px 24px rgba(65,65,65,.35);display:block;position:relative;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}@media (max-width:703px){[_nghost-%COMP%]{margin:0 8px;padding:40px 32px 48px}}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]{border:2px solid windowText}}  .nx-modal__content{display:block;margin:0 -40px;padding:0 40px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}  .nx-modal__actions{margin-bottom:-48px;margin-left:-40px;margin-right:-40px;height:72px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (-ms-high-contrast:active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText}}"],data:{animation:[l.a.modalContainer]}}),n}()},mLex:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var o=n("fAiE"),i=n("ZTXN"),c=n("xVbo"),s=n("J+dc"),l=0,u=function(){function e(t,n){var a=this,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"nx-modal-"+l++;r(this,e),this._overlayRef=t,this._containerInstance=n,this.id=u,this.disableClose=this._containerInstance._config.disableClose,this._afterOpened=new i.a,this._afterClosed=new i.a,this._beforeClosed=new i.a,this._state=0,n._id=u,n._animationStateChanged.pipe(Object(c.a)((function(e){return"done"===e.phaseName&&"enter"===e.toState})),Object(s.a)(1)).subscribe((function(){a._afterOpened.next(),a._afterOpened.complete()})),n._animationStateChanged.pipe(Object(c.a)((function(e){return"done"===e.phaseName&&"exit"===e.toState})),Object(s.a)(1)).subscribe((function(){clearTimeout(a._closeFallbackTimeout),a._overlayRef.dispose()})),n._closeButtonClicked.subscribe((function(){a.close()})),t.detachments().subscribe((function(){a._beforeClosed.next(a._result),a._beforeClosed.complete(),a._afterClosed.next(a._result),a._afterClosed.complete(),a.componentInstance=null,a._overlayRef.dispose()})),t.keydownEvents().pipe(Object(c.a)((function(e){return e.keyCode===o.g&&!a.disableClose&&!Object(o.t)(e)}))).subscribe((function(e){e.preventDefault(),a.close()}))}return a(e,[{key:"close",value:function(e){var t=this;this._result=e,this._containerInstance._animationStateChanged.pipe(Object(c.a)((function(e){return"start"===e.phaseName})),Object(s.a)(1)).subscribe((function(n){t._beforeClosed.next(e),t._beforeClosed.complete(),t._state=2,t._overlayRef.detachBackdrop(),t._closeFallbackTimeout=setTimeout((function(){t._overlayRef.dispose()}),n.totalTime+100)})),this._containerInstance._startExitAnimation(),this._state=1}},{key:"afterOpened",value:function(){return this._afterOpened.asObservable()}},{key:"afterClosed",value:function(){return this._afterClosed.asObservable()}},{key:"beforeClosed",value:function(){return this._beforeClosed.asObservable()}},{key:"backdropClick",value:function(){return this._overlayRef.backdropClick()}},{key:"keydownEvents",value:function(){return this._overlayRef.keydownEvents()}},{key:"updatePosition",value:function(e){var t=this._getPositionStrategy();return e&&(e.left||e.right)?e.left?t.left(e.left):t.right(e.right):t.centerHorizontally(),e&&(e.top||e.bottom)?e.top?t.top(e.top):t.bottom(e.bottom):t.centerVertically(),this._overlayRef.updatePosition(),this}},{key:"updateSize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this._getPositionStrategy().width(e).height(t),this._overlayRef.updatePosition(),this}},{key:"addPanelClass",value:function(e){return this._overlayRef.addPanelClass(e),this}},{key:"removePanelClass",value:function(e){return this._overlayRef.removePanelClass(e),this}},{key:"getState",value:function(){return this._state}},{key:"_getPositionStrategy",value:function(){return this._overlayRef.getConfig().positionStrategy}}]),e}()}}])}();