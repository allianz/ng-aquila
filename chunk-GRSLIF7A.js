import{c as P,d as h,g as c,h as E,i as u,j as S,k as se,l as I,m as ae}from"./chunk-BUOL5UUF.js";import{b as Be,f as ce,g as Re,h as je,k as de,l as Le,m as Ne,n as He,p as D,s as Ve}from"./chunk-K5HKQF4M.js";import{c as he,d as ze,e as T}from"./chunk-EC57AA32.js";import{A as Fe,i as re,l as Ie,r as De,s as Te,t as Ae,y as le}from"./chunk-SRJVIWAL.js";import{i as Se}from"./chunk-EFRXZHEN.js";import{d as ke,q as Pe,z as Ee}from"./chunk-MOKCFCZL.js";import{Cb as be,G as me,Ga as Ce,Gb as ye,Ha as G,Ia as Z,Kc as U,L as C,Lb as Me,Mc as ne,Na as y,Ra as K,Rb as f,Sb as O,T as B,Ta as N,Tb as V,Vb as g,Yb as w,a as q,ba as fe,bc as x,cc as k,da as R,dc as z,fd as ie,gc as Oe,hc as J,jc as ee,la as X,m as d,ma as ge,mc as v,nc as we,oa as j,oc as _,pc as te,qa as p,qc as oe,ra as xe,ub as M,vb as l,vc as $,wa as L,wc as W,xa as ve,xb as H,xc as Q,ya as b}from"./chunk-BR37RZFV.js";var Qe=["closeButton"],$e=i=>({value:i});function Ke(i,o){}function Je(i,o){if(i&1){let a=J();x(0,"button",3,0),v("click",function(){G(a);let e=_();return Z(e._closeButtonClick())}),z(2,"nx-icon",4),k()}if(i&2){let a=_();O("aria-label",a._config.closeIconButtonLabel)}}var et=["nxModalTitle",""],Ue=["*"];function tt(i,o){if(i&1&&z(0,"nx-status-icon",0),i&2){let a=_();V("type",a.status)}}function ot(i,o){i&1&&Oe(0)}function nt(i,o){if(i&1&&f(0,ot,1,0,"ng-container",7),i&2){let a=_();V("ngTemplateOutlet",a.body)}}function it(i,o){i&1&&oe(0)}function st(i,o){if(i&1){let a=J();x(0,"button",8,0),v("click",function(){G(a);let e=_();return Z(e.closeButtonClick())}),z(2,"nx-icon",9),k()}if(i&2){let a=_();O("aria-label",a.closeButtonLabel)}}var A=class{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.fullscreen=!1,this.width="736px",this.height="",this.maxWidth="736px",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.autoFocus=!0,this.restoreFocus=!0,this.closeOnNavigation=!0,this.showCloseIcon=!1,this.closeIconButtonLabel="Close dialog",this.direction="ltr",this.shouldClose=()=>!0}},We={modalContainer:P("modalContainer",[E("void, exit",c({opacity:0,transform:"scale(1.3)"})),E("enter",c({transform:"none"})),u("* => enter",h("200ms cubic-bezier(0, 0, 0.2, 1)",c({transform:"scale(1)",opacity:1}))),u("* => void, * => exit",h("200ms cubic-bezier(0.4, 0.0, 0.2, 1)",c({opacity:0,transform:"scale(1.3)"})))]),modalContainerFullscreen:P("slideInOut",[E("void, exit",c({opacity:0,transform:"translateY(100%)"})),E("enter",c({transform:"none"})),u("* => enter",h("300ms ease-out",c({transform:"translateY(0%)",opacity:1}))),u("* => void, * => exit",h("300ms ease-out",c({opacity:0,transform:"translateY(100%)"})))])};function ue(){throw Error("Attempting to attach modal content after content is already attached")}var pe=(()=>{let o=class o extends je{constructor(t,e,n,s,r,m,Y,Xe){super(),this._elementRef=t,this._focusTrapFactory=e,this._cdr=n,this._document=s,this._config=r,this._focusMonitor=m,this._interactivityChecker=Y,this._ngZone=Xe,this._elementFocusedBeforeDialogWasOpened=null,this._state="enter",this._animationStateChanged=new N,this._closeButtonClicked=new N,this._isExpert=!1,this.attachDomPortal=Ge=>(this._portalOutlet.hasAttached()&&ue(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachDomPortal(Ge)),this._ariaLabelledBy=r.ariaLabelledBy||null}ngAfterViewInit(){this._config.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}ngOnInit(){let t=this._config.appearance;this._isExpert=t==="expert"}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._closeButton)}attachComponentPortal(t){return this._portalOutlet.hasAttached()&&ue(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachComponentPortal(t)}attachTemplatePortal(t){return this._portalOutlet.hasAttached()&&ue(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachTemplatePortal(t)}_trapFocus(){let t=this._elementRef.nativeElement;this._focusTrap||(this._focusTrap=this._focusTrapFactory.create(t));let e=this._document?.activeElement;switch(this._config.autoFocus){case!1:case"dialog":e!==t&&!t.contains(e)&&t.focus();return;case!0:case"first-tabbable":this._focusTrap.focusInitialElementWhenReady().then(()=>{let s=t?.querySelector(".cdk-focused");s&&this._focusMonitor.focusVia(s,"keyboard")});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this._config.autoFocus);break}t.contains(document.activeElement)||t.focus()}_focusByCssSelector(t,e){let n=this._elementRef.nativeElement.querySelector(t);n&&this._forceFocus(n,e)}_forceFocus(t,e){this._interactivityChecker.isFocusable(t)||(t.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let n=()=>{t.removeEventListener("blur",n),t.removeEventListener("mousedown",n),t.removeAttribute("tabindex")};t.addEventListener("blur",n),t.addEventListener("mousedown",n)})),t.focus(e)}_restoreFocus(){let t=this._elementFocusedBeforeDialogWasOpened;if(this._config.restoreFocus&&t&&typeof t.focus=="function"){let e=re(),n=this._elementRef.nativeElement;(!e||e===this._document?.body||e===n||n.contains(e))&&this._focusMonitor.focusVia(t,"keyboard")}this._focusTrap&&this._focusTrap.destroy()}_savePreviouslyFocusedElement(){this._document&&(this._elementFocusedBeforeDialogWasOpened=re(),this._elementRef.nativeElement.focus&&this._elementFocusedBeforeDialogWasOpened?.blur())}_onAnimationDone(t){t.toState==="enter"?this._trapFocus():t.toState==="exit"&&this._restoreFocus(),this._animationStateChanged.emit(t)}_onAnimationStart(t){this._animationStateChanged.emit(t)}_startExitAnimation(){this._state="exit",this._cdr.markForCheck()}_closeButtonClick(){this._closeButtonClicked.emit()}};o.\u0275fac=function(e){return new(e||o)(l(K),l(Te),l(ie),l(ke,8),l(A),l(le),l(De),l(be))},o.\u0275cmp=L({type:o,selectors:[["nx-modal-container"]],viewQuery:function(e,n){if(e&1&&($(de,7),$(Qe,5)),e&2){let s;W(s=Q())&&(n._portalOutlet=s.first),W(s=Q())&&(n._closeButton=s.first)}},hostAttrs:["tabindex","-1","aria-modal","true",1,"nx-modal__container"],hostVars:13,hostBindings:function(e,n){e&1&&we("@modalContainer.start",function(r){return n._onAnimationStart(r)})("@modalContainer.done",function(r){return n._onAnimationDone(r)})("@slideInOut.start",function(r){return n._onAnimationStart(r)})("@slideInOut.done",function(r){return n._onAnimationDone(r)}),e&2&&(ee("@modalContainer",ne(9,$e,n._config.fullscreen?"":n._state))("@slideInOut",ne(11,$e,n._config.fullscreen?n._state:"")),O("id",n._id)("role",n._config.role)("aria-labelledby",n._config.ariaLabel?null:n._ariaLabelledBy)("aria-label",n._config.ariaLabel)("aria-describedby",n._config.ariaDescribedBy||null),g("is-expert",n._isExpert))},standalone:!0,features:[Me,U],decls:2,vars:1,consts:[["closeButton",""],["cdkPortalOutlet",""],["type","button",1,"nx-modal__close"],["type","button",1,"nx-modal__close",3,"click"],["name","close","aria-hidden","true"]],template:function(e,n){e&1&&f(0,Ke,0,0,"ng-template",1)(1,Je,3,1,"button",2),e&2&&(M(),w(n._config.showCloseIcon?1:-1))},dependencies:[T,he,de],styles:[".cdk-overlay-pane.is-fullscreen{padding-top:32px}@media (max-width: 703px){  .cdk-overlay-pane.is-fullscreen{padding-top:8px}}[_nghost-%COMP%]{background:var(--modal-background-color);color:var(--modal-text-color);margin:0 32px;padding:40px;border-radius:4px;box-shadow:var(--shadow-large);display:block;position:relative;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}.is-fullscreen   [_nghost-%COMP%]{border-radius:8px 8px 0 0}@media (max-width: 703px){[_nghost-%COMP%]{margin:0 8px;padding:32px}}@media screen and (forced-colors: active){[_nghost-%COMP%]{border:2px solid CanvasText}}[_nghost-%COMP%]     .nx-modal__title{text-align:center;font-size:1.875rem;font-weight:300;line-height:2.25rem;display:flex;align-items:center;flex-direction:column;margin:0 0 24px}@media (max-width: 703px){[_nghost-%COMP%]     .nx-modal__title{font-size:1.625rem}}[_nghost-%COMP%]     .nx-modal__status{margin-bottom:16px;font-size:4rem}.is-expert[_nghost-%COMP%]     .nx-modal__status{display:flex;margin-bottom:0;margin-right:16px;font-size:2.25rem!important}.is-expert[_nghost-%COMP%]     .nx-modal__title{font-weight:400;text-align:left;flex-direction:row;margin-bottom:16px}.is-expert[_nghost-%COMP%]     .nx-modal__actions{justify-content:flex-end}[_nghost-%COMP%]     .nx-modal__content{display:block;margin:0 -40px;padding:0 40px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}.is-fullscreen   [_nghost-%COMP%]     .nx-modal__content{max-height:calc(100% - 32px)}@media (max-width: 703px){[_nghost-%COMP%]     .nx-modal__content{margin:0 -32px;padding:0 32px}.is-fullscreen   [_nghost-%COMP%]     .nx-modal__content{max-height:calc(100% - 40px)}}[_nghost-%COMP%]     .nx-modal__actions{margin-bottom:-40px;margin-left:-40px;margin-right:-40px;height:72px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;border-bottom-left-radius:4px;border-bottom-right-radius:4px}.is-fullscreen   [_nghost-%COMP%]     .nx-modal__actions{background:var(--modal-background-color);position:absolute;bottom:40px;width:100%}@media (max-width: 703px){[_nghost-%COMP%]     .nx-modal__actions{margin-bottom:-32px;margin-left:-32px;margin-right:-32px;padding:0 32px}.is-fullscreen   [_nghost-%COMP%]     .nx-modal__actions{bottom:32px}}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],data:{animation:[We.modalContainer,We.modalContainerFullscreen]}});let i=o;return i})(),at=0,F=class{constructor(o,a,t=`nx-modal-${at++}`){this._overlayRef=o,this._containerInstance=a,this.id=t,this.disableClose=this._containerInstance._config.disableClose,this.shouldClose=this._containerInstance._config.shouldClose,this.closeDenied=new d,this._afterOpened=new d,this._afterClosed=new d,this._beforeClosed=new d,this._state=0,a._id=t,a._animationStateChanged.pipe(C(e=>e.phaseName==="done"&&e.toState==="enter"),B(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),a._animationStateChanged.pipe(C(e=>e.phaseName==="done"&&e.toState==="exit"),B(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._overlayRef.dispose()}),a._closeButtonClicked.subscribe(()=>{this.close()}),o.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._afterClosed.next(this._result),this._afterClosed.complete(),this.componentInstance=null,this._overlayRef.dispose()}),o.keydownEvents().pipe(C(e=>e.keyCode===27&&!this.disableClose&&!Ie(e))).subscribe(e=>{e.preventDefault(),this.close()})}close(o){if(this._result=o,!(this.shouldClose?.(o)??!0)){this.closeDenied.next();return}this._containerInstance._animationStateChanged.pipe(C(t=>t.phaseName==="start"),B(1)).subscribe(t=>{this._beforeClosed.next(o),this._beforeClosed.complete(),this._state=2,this._overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>{this._overlayRef.dispose()},t.totalTime+100)}),this._containerInstance._startExitAnimation(),this._state=1}afterOpened(){return this._afterOpened.asObservable()}afterClosed(){return this._afterClosed.asObservable()}beforeClosed(){return this._beforeClosed.asObservable()}backdropClick(){return this._overlayRef.backdropClick()}keydownEvents(){return this._overlayRef.keydownEvents()}updatePosition(o){let a=this._getPositionStrategy();return o&&(o.left||o.right)?o.left?a.left(o.left):a.right(o.right):a.centerHorizontally(),o&&(o.top||o.bottom)?o.top?a.top(o.top):a.bottom(o.bottom):a.centerVertically(),this._overlayRef.updatePosition(),this}updateSize(o="",a=""){return this._getPositionStrategy().width(o).height(a),this._overlayRef.updatePosition(),this}addPanelClass(o){return this._overlayRef.addPanelClass(o),this}removePanelClass(o){return this._overlayRef.removePanelClass(o),this}getState(){return this._state}_getPositionStrategy(){return this._overlayRef.getConfig().positionStrategy}},rt=new j("NxModalData"),lt=new j("nx-modal-default-options"),Ye=new j("nx-modal-scroll-strategy",{providedIn:"root",factory:()=>{let i=xe(D);return()=>i.scrollStrategies.block()}});function ct(i){return()=>i.scrollStrategies.block()}var dt={provide:Ye,useFactory:ct,deps:[D]},qe=(()=>{let o=class o{get openModals(){return this._parentDialogService?this._parentDialogService.openModals:this._openModalsAtThisLevel}get afterOpened(){return this._parentDialogService?this._parentDialogService.afterOpened:this._afterOpenedAtThisLevel}get _afterAllClosed(){let t=this._parentDialogService;return t?t._afterAllClosed:this._afterAllClosedAtThisLevel}constructor(t,e,n,s,r,m){this._overlay=t,this._injector=e,this._defaultOptions=n,this._parentDialogService=s,this._overlayContainer=r,this._defaultScrollStrategyFactory=m,this._openModalsAtThisLevel=[],this._afterAllClosedAtThisLevel=new d,this._afterOpenedAtThisLevel=new d,this._ariaHiddenElements=new Map,this.afterAllClosed=me(()=>this.openModals.length?this._afterAllClosed:this._afterAllClosed.pipe(fe(void 0))),this._destroyed=new d,this._scrollStrategyFactory=this._defaultScrollStrategyFactory}open(t,e){if(e=ht(e,this._defaultOptions||new A),e.id&&this.getModalById(e.id))throw Error(`Modal with id "${e.id}" exists already. The modal id must be unique.`);let n=this._createOverlay(e),s=this._attachModalContainer(n,e),r=this._attachModalContent(t,s,n,e);return this.openModals.length||this._hideNonModalContentFromAssistiveTechnology(),this.openModals.push(r),r.beforeClosed().subscribe(()=>this._removeOpenModal(r)),this.afterOpened.next(r),r}closeAll(){this._closeModals(this.openModals)}getModalById(t){return this.openModals.find(e=>e.id===t)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._closeModals(this._openModalsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_createOverlay(t){let e=this._getOverlayConfig(t);return this._overlay.create(e)}_getOverlayConfig(t){let e=new Ne({positionStrategy:this._overlay.position().global(),scrollStrategy:t.scrollStrategy||this._scrollStrategyFactory(),panelClass:t.panelClass,hasBackdrop:t.hasBackdrop,minWidth:t.minWidth,minHeight:t.minHeight,maxWidth:t.maxWidth,maxHeight:t.maxHeight,disposeOnNavigation:t.closeOnNavigation,direction:t.direction});return t.backdropClass&&(e.backdropClass=t.backdropClass),t.fullscreen&&(e.maxWidth="",e.maxHeight=""),e}_attachModalContainer(t,e){let n=e?.viewContainerRef?.injector,s=y.create({parent:n||this._injector,providers:[{provide:A,useValue:e}]}),r=new ce(pe,e.viewContainerRef,s,e.componentFactoryResolver);return t.attach(r).instance}_attachModalContent(t,e,n,s){let r=new F(n,e,s.id);if(s.fullscreen&&(s.width="100%",s.height="100%",n.addPanelClass("is-fullscreen")),s.hasBackdrop&&n.backdropClick().pipe(R(this._destroyed)).subscribe(()=>{r.disableClose||r.close()}),t instanceof H)e.attachTemplatePortal(new Re(t,null,{$implicit:s.data,modalRef:r}));else{let m=this._createInjector(s,r,e),Y=e.attachComponentPortal(new ce(t,s.viewContainerRef,m));r.componentInstance=Y.instance}return r.updateSize(s.width,s.height).updatePosition(s.position),r}_createInjector(t,e,n){let s=t?.viewContainerRef?.injector,r=[{provide:pe,useValue:n},{provide:rt,useValue:t.data},{provide:F,useValue:e}];return y.create({parent:s||this._injector,providers:r})}_removeOpenModal(t){let e=this.openModals.indexOf(t);e>-1&&(this.openModals.splice(e,1),this.openModals.length||(this._ariaHiddenElements.forEach((n,s)=>{n?(s.setAttribute("aria-hidden",n),s.setAttribute("inert",n)):(s.removeAttribute("aria-hidden"),s.removeAttribute("inert"))}),this._ariaHiddenElements.clear(),this._afterAllClosed.next()))}_hideNonModalContentFromAssistiveTechnology(){let t=this._overlayContainer.getContainerElement();if(t.parentElement){let e=t.parentElement.children;for(let n=e.length-1;n>-1;n--){let s=e[n];s!==t&&s.nodeName!=="SCRIPT"&&s.nodeName!=="STYLE"&&!s.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(s,s.getAttribute("aria-hidden")),this._ariaHiddenElements.set(s,s.getAttribute("inert")),s.setAttribute("aria-hidden","true"),s.setAttribute("inert","true"))}}}_closeModals(t){let e=t.length;for(;e--;)t[e].close()}};o.\u0275fac=function(e){return new(e||o)(p(D),p(y),p(lt,8),p(o,12),p(He),p(Ye))},o.\u0275prov=X({token:o,factory:o.\u0275fac,providedIn:"root"});let i=o;return i})();function ht(i,o){return q(q({},o),i)}var Yt=(()=>{let o=class o{constructor(t,e,n){this.modalRef=t,this._elementRef=e,this._dialogService=n,this.type="button"}ngOnInit(){this.modalRef||(this.modalRef=ut(this._elementRef,this._dialogService.openModals))}ngOnChanges(t){let e=t.modalResult;e&&(this.modalResult=e.currentValue)}};o.\u0275fac=function(e){return new(e||o)(l(F,8),l(K),l(qe))},o.\u0275dir=b({type:o,selectors:[["","nxModalClose",""]],hostVars:2,hostBindings:function(e,n){e&1&&v("click",function(){return n.modalRef.close(n.modalResult)}),e&2&&O("aria-label",n.ariaLabel||null)("type",n.type)},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",modalResult:[0,"nxModalClose","modalResult"]},standalone:!0,features:[Ce]});let i=o;return i})();function ut(i,o){let a=i.nativeElement.parentElement;for(;a&&!a.classList.contains("nx-modal__container");)a=a.parentElement;return a?o.find(t=>t.id===a.id):null}var pt=S([c({opacity:0}),h("300ms",c({opacity:1}))]),_t=S(h("300ms",c({opacity:0}))),mt=S([c({transform:"scale(1)",opacity:1}),h("250ms",c({transform:"scale(1.3)",opacity:0}))]),ft=S([c({transform:"scale(1.3)",opacity:0}),h("250ms",c({transform:"scale(1)",opacity:1}))]),_e=(()=>{let o=class o{constructor(){this.subject=new d,this.close$=this.subject.asObservable()}close(){this.subject.next()}};o.\u0275fac=function(e){return new(e||o)},o.\u0275prov=X({token:o,factory:o.\u0275fac});let i=o;return i})(),qt=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275dir=b({type:o,selectors:[["","nxModalActions",""]],hostVars:2,hostBindings:function(e,n){e&2&&g("nx-modal__actions",!0)},standalone:!0});let i=o;return i})(),Xt=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275dir=b({type:o,selectors:[["","nxModalContent",""]],hostVars:2,hostBindings:function(e,n){e&2&&g("nx-modal__content",!0)},standalone:!0});let i=o;return i})(),gt=(()=>{let o=class o{};o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=L({type:o,selectors:[["","nxModalTitle",""]],hostVars:2,hostBindings:function(e,n){e&2&&g("nx-modal__title",!0)},inputs:{status:"status"},standalone:!0,features:[U],attrs:et,ngContentSelectors:Ue,decls:2,vars:1,consts:[[1,"nx-modal__status",3,"type"]],template:function(e,n){e&1&&(te(),f(0,tt,1,1,"nx-status-icon",0),oe(1)),e&2&&w(n.status?0:-1)},dependencies:[T,ze],encapsulation:2});let i=o;return i})(),xt=(()=>{let o=class o{set closeButtonLabel(t){t!==this._closeButtonLabel&&(this._closeButtonLabel=t,this._cdr.markForCheck())}get closeButtonLabel(){return this._closeButtonLabel}constructor(t,e,n,s){this.modalService=t,this.eventManager=e,this._cdr=n,this._focusMonitor=s,this._closeButtonLabel="Close dialog",this.hideOnEsc=!0,this.hideOnClickOutside=!0,this.showCloseIcon=!0,this.size="auto",this.closeEvent=new N,this._destroyed=new d}ngOnInit(){this.modalService.close$.pipe(R(this._destroyed)).subscribe(()=>this.closeEvent.emit()),this.removeEventListener=this.eventManager.addEventListener(document.body,"keyup.esc",()=>{this.hideOnEsc&&this.modalService.close()})}ngAfterViewInit(){this.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.removeEventListener(),this._focusMonitor.stopMonitoring(this._closeButton)}clickOutsideModal(){this.hideOnClickOutside&&this.modalService.close()}closeButtonClick(){this.modalService.close()}cancelClick(t){t.stopPropagation()}};o.\u0275fac=function(e){return new(e||o)(l(_e),l(Se),l(ie),l(le))},o.\u0275cmp=L({type:o,selectors:[["nx-modal"]],viewQuery:function(e,n){if(e&1&&$(Qe,5),e&2){let s;W(s=Q())&&(n._closeButton=s.first)}},hostVars:3,hostBindings:function(e,n){e&2&&(ee("@fadeInOut",void 0),g("nx-modal--fixed-width",n.size==="fixed"))},inputs:{closeButtonLabel:"closeButtonLabel",body:[0,"modalBody","body"],hideOnEsc:"hideOnEsc",hideOnClickOutside:"hideOnClickOutside",showCloseIcon:"showCloseIcon",size:[0,"windowSize","size"]},outputs:{closeEvent:"onModalClose"},standalone:!0,features:[U],ngContentSelectors:Ue,decls:8,vars:3,consts:[["closeButton",""],["role","dialog","cdkTrapFocus","","cdkTrapFocusAutoCapture","","cdkFocusInitial","",1,"nx-modal"],[1,"nx-modal__backdrop",3,"click"],[1,"nx-modal__position"],[1,"nx-modal__container",3,"click"],["cdkScrollable","",1,"nx-modal__content-wrapper"],["type","button",1,"nx-modal__close"],[4,"ngTemplateOutlet"],["type","button",1,"nx-modal__close",3,"click"],["name","close","aria-hidden","true"]],template:function(e,n){e&1&&(te(),x(0,"div",1)(1,"div",2),v("click",function(){return n.clickOutsideModal()}),x(2,"div",3)(3,"div",4),v("click",function(r){return n.cancelClick(r)}),x(4,"div",5),f(5,nt,1,1,"ng-container")(6,it,1,0),k(),f(7,st,3,1,"button",6),k()()()()),e&2&&(M(3),V("@scaleUpDown",void 0),M(2),w(n.body?5:6),M(2),w(n.showCloseIcon?7:-1))},dependencies:[Ae,T,he,Be,Pe],styles:["[_nghost-%COMP%]{position:relative;z-index:1000}.nx-modal[_ngcontent-%COMP%]{display:flex;position:fixed;width:100vw;height:100vh;inset:0;z-index:1000;align-items:center;justify-content:center;transition:opacity .3s ease}.nx-modal__backdrop[_ngcontent-%COMP%]{background-color:#00000059;height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.nx-modal__position[_ngcontent-%COMP%]{position:absolute;display:inline-block;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20}.nx-modal__container[_ngcontent-%COMP%]{border-radius:4px;box-shadow:var(--shadow-large);background:var(--modal-background-color);color:var(--modal-text-color)}.nx-modal__content-wrapper[_ngcontent-%COMP%]{padding:40px 40px 48px;max-height:calc(100vh - 48px);overflow-y:auto}@media (max-width: 703px){.nx-modal__content-wrapper[_ngcontent-%COMP%]{max-height:70vh;padding:40px 32px 48px}}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media (max-width: 703px){.nx-modal__position[_ngcontent-%COMP%]{width:100%}.nx-modal__container[_ngcontent-%COMP%]{position:relative;max-width:calc(100vw - 16px);max-height:70vh;margin:0 auto}}.nx-modal--fixed-width[_nghost-%COMP%]   .nx-modal__container[_ngcontent-%COMP%]{width:736px;max-width:calc(100vw - 16px)}[_nghost-%COMP%]     .nx-modal__actions{height:72px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;position:absolute;bottom:0;left:0;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px;background:var(--modal-actions-background-color)}[_nghost-%COMP%]     .nx-modal__content{overflow-y:auto;max-height:calc(100vh - 120px);padding:0 40px;margin:0 -40px}@media (max-width: 703px){[_nghost-%COMP%]     .nx-modal__content{max-height:calc(70vh - 120px);margin:0 -32px}}@media screen and (forced-colors: active){.nx-modal__content-wrapper[_ngcontent-%COMP%], [_nghost-%COMP%]     .nx-modal__actions{border:2px solid CanvasText}}"],data:{animation:[P("fadeInOut",[u(":enter",[I(pt),ae("@scaleUpDown",[se()])]),u(":leave",[ae("@scaleUpDown",[se()]),I(_t)])]),P("scaleUpDown",[u(":enter",I(ft)),u(":leave",I(mt))])]},changeDetection:0});let i=o;return i})(),Gt=(()=>{let o=class o{set nxOpenModalOnClick(t){Array.isArray(t)?this.elements=t:this.elements=[t],this.elements.forEach(e=>{e.addEventListener?e.addEventListener("click",this.clickHandler):e.elementRef?e.elementRef.nativeElement.addEventListener("click",this.clickHandler):console.warn("nxOpenModalOnClick: Given Element doesn't appear to be an ElementRef.",e)})}constructor(t,e,n){this.templateRef=t,this.viewContainer=e,this.modalService=n,this._destroyed=new d,this.clickHandler=s=>{this.viewContainer.clear(),this.viewContainer.createEmbeddedView(this.templateRef).markForCheck(),s.preventDefault(),s.stopPropagation()}}ngOnInit(){this.modalService.close$.pipe(R(this._destroyed)).subscribe(()=>this.viewContainer.clear())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.elements.forEach(t=>{t.removeEventListener&&t.removeEventListener("click",this.clickHandler)})}};o.\u0275fac=function(e){return new(e||o)(l(H),l(ye),l(_e))},o.\u0275dir=b({type:o,selectors:[["","nxOpenModalOnClick",""]],inputs:{nxOpenModalOnClick:"nxOpenModalOnClick"},standalone:!0});let i=o;return i})(),Zt=(()=>{let o=class o{static forRoot(){return{ngModule:o,providers:[_e]}}};o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=ve({type:o}),o.\u0275inj=ge({providers:[qe,dt],imports:[Fe,Ve,Le,Ee,T,xt,pe,gt]});let i=o;return i})();export{qe as a,Yt as b,qt as c,Xt as d,gt as e,xt as f,Gt as g,Zt as h};
