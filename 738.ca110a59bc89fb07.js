"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[738],{738:(le,R,c)=>{c.d(R,{$w:()=>se,Qv:()=>O,TV:()=>$,nU:()=>ie,tY:()=>ne,x$:()=>oe,y9:()=>ae});var u=c(8184),_=c(4080),t=c(4650),d=c(8929),A=c(8514),f=c(2198),x=c(2986),T=c(1059),g=c(7625),k=c(3353),p=c(6895),s=c(7340),m=c(2693),v=c(9195),D=c(9521),N=c(1481),L=c(7376);const P=["closeButton"];function S(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",2,3),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a._closeButtonClick())}),t._UZ(2,"nx-icon",4),t.qZA()}if(2&n){const e=t.oxw();t.uIk("aria-label",e._config.closeIconButtonLabel)}}function I(n,i){}function F(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",8,9),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.closeButtonClick())}),t._UZ(2,"nx-icon",10),t.qZA()}if(2&n){const e=t.oxw();t.uIk("aria-label",e.closeButtonLabel)}}function j(n,i){1&n&&t.GkF(0)}function H(n,i){if(1&n&&(t.ynx(0),t.YNc(1,j,1,0,"ng-container",11),t.BQk()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngTemplateOutlet",e.body)}}function Y(n,i){1&n&&t.Hsn(0)}const U=["*"];class C{constructor(){this.role="dialog",this.panelClass="",this.hasBackdrop=!0,this.backdropClass="",this.disableClose=!1,this.width="736px",this.height="",this.maxWidth="736px",this.data=null,this.ariaDescribedBy=null,this.ariaLabelledBy=null,this.ariaLabel=null,this.autoFocus=!0,this.restoreFocus=!0,this.closeOnNavigation=!0,this.showCloseIcon=!1,this.closeIconButtonLabel="Close dialog",this.direction="ltr"}}const W={modalContainer:(0,s.X$)("modalContainer",[(0,s.SB)("void, exit",(0,s.oB)({opacity:0,transform:"scale(1.3)"})),(0,s.SB)("enter",(0,s.oB)({transform:"none"})),(0,s.eR)("* => enter",(0,s.jt)("200ms cubic-bezier(0, 0, 0.2, 1)",(0,s.oB)({transform:"scale(1)",opacity:1}))),(0,s.eR)("* => void, * => exit",(0,s.jt)("200ms cubic-bezier(0.4, 0.0, 0.2, 1)",(0,s.oB)({opacity:0,transform:"scale(1.3)"})))])};function M(){throw Error("Attempting to attach modal content after content is already attached")}let w=(()=>{class n extends _.en{constructor(e,o,a,l,r,h){super(),this._elementRef=e,this._focusTrapFactory=o,this._cdr=a,this._document=l,this._config=r,this._focusMonitor=h,this._elementFocusedBeforeDialogWasOpened=null,this._state="enter",this._animationStateChanged=new t.vpe,this._closeButtonClicked=new t.vpe,this.attachDomPortal=E=>(this._portalOutlet.hasAttached()&&M(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachDomPortal(E)),this._ariaLabelledBy=r.ariaLabelledBy||null}ngAfterViewInit(){this._config.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._closeButton)}attachComponentPortal(e){return this._portalOutlet.hasAttached()&&M(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachComponentPortal(e)}attachTemplatePortal(e){return this._portalOutlet.hasAttached()&&M(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachTemplatePortal(e)}_trapFocus(){const e=this._elementRef.nativeElement;if(this._focusTrap||(this._focusTrap=this._focusTrapFactory.create(e)),this._config.autoFocus)this._focusTrap.focusInitialElementWhenReady();else{const o=this._document?.activeElement;o!==e&&!e.contains(o)&&e.focus()}}_restoreFocus(){const e=this._elementFocusedBeforeDialogWasOpened;if(this._config.restoreFocus&&e&&"function"==typeof e.focus){const o=(0,k.ht)(),a=this._elementRef.nativeElement;(!o||o===this._document?.body||o===a||a.contains(o))&&this._focusMonitor.focusVia(e,"keyboard")}this._focusTrap&&this._focusTrap.destroy()}_savePreviouslyFocusedElement(){!this._document||(this._elementFocusedBeforeDialogWasOpened=(0,k.ht)(),this._elementRef.nativeElement.focus&&Promise.resolve().then(()=>this._elementRef.nativeElement.focus()))}_onAnimationDone(e){"enter"===e.toState?this._trapFocus():"exit"===e.toState&&this._restoreFocus(),this._animationStateChanged.emit(e)}_onAnimationStart(e){this._animationStateChanged.emit(e)}_startExitAnimation(){this._state="exit",this._cdr.markForCheck()}_closeButtonClick(){this._closeButtonClicked.emit()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.SBq),t.Y36(m.qV),t.Y36(t.sBO),t.Y36(p.K0,8),t.Y36(C),t.Y36(m.tE))},n.\u0275cmp=t.Xpm({type:n,selectors:[["nx-modal-container"]],viewQuery:function(e,o){if(1&e&&(t.Gf(_.Pl,7),t.Gf(P,5)),2&e){let a;t.iGM(a=t.CRH())&&(o._portalOutlet=a.first),t.iGM(a=t.CRH())&&(o._closeButton=a.first)}},hostAttrs:["tabindex","-1","aria-modal","true",1,"nx-modal__container"],hostVars:6,hostBindings:function(e,o){1&e&&t.WFA("@modalContainer.start",function(l){return o._onAnimationStart(l)})("@modalContainer.done",function(l){return o._onAnimationDone(l)}),2&e&&(t.uIk("id",o._id)("role",o._config.role)("aria-labelledby",o._config.ariaLabel?null:o._ariaLabelledBy)("aria-label",o._config.ariaLabel)("aria-describedby",o._config.ariaDescribedBy||null),t.d8E("@modalContainer",o._state))},features:[t.qOj],decls:2,vars:1,consts:[["class","nx-modal__close","type","button",3,"click",4,"ngIf"],["cdkPortalOutlet",""],["type","button",1,"nx-modal__close",3,"click"],["closeButton",""],["name","close"]],template:function(e,o){1&e&&(t.YNc(0,S,3,1,"button",0),t.YNc(1,I,0,0,"ng-template",1)),2&e&&t.Q6J("ngIf",o._config.showCloseIcon)},dependencies:[_.Pl,p.O5,v.O8],styles:["[_nghost-%COMP%]{background:var(--modal-background-color);color:var(--modal-text-color);margin:0 32px;padding:40px;border-radius:4px;box-shadow:var(--shadow-large);display:block;position:relative;box-sizing:border-box;overflow:auto;outline:0;width:100%;height:100%;min-height:inherit;max-height:inherit}@media (max-width: 703px){[_nghost-%COMP%]{margin:0 8px;padding:32px}}@media screen and (forced-colors: active){[_nghost-%COMP%]{border:2px solid CanvasText}}  .nx-modal__content{display:block;margin:0 -40px;padding:0 40px;max-height:65vh;overflow:auto;-webkit-overflow-scrolling:touch}@media (max-width: 703px){  .nx-modal__content{margin:0 -32px;padding:0 32px}}  .nx-modal__actions{margin-bottom:-40px;margin-left:-40px;margin-right:-40px;height:64px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;border-bottom-left-radius:4px;border-bottom-right-radius:4px}@media (max-width: 703px){  .nx-modal__actions{margin-bottom:-32px;margin-left:-32px;margin-right:-32px;padding:0 32px}}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],data:{animation:[W.modalContainer]}}),n})(),z=0;class b{constructor(i,e,o="nx-modal-"+z++){this._overlayRef=i,this._containerInstance=e,this.id=o,this.disableClose=this._containerInstance._config.disableClose,this._afterOpened=new d.xQ,this._afterClosed=new d.xQ,this._beforeClosed=new d.xQ,this._state=0,e._id=o,e._animationStateChanged.pipe((0,f.h)(a=>"done"===a.phaseName&&"enter"===a.toState),(0,x.q)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),e._animationStateChanged.pipe((0,f.h)(a=>"done"===a.phaseName&&"exit"===a.toState),(0,x.q)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._overlayRef.dispose()}),e._closeButtonClicked.subscribe(()=>{this.close()}),i.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._afterClosed.next(this._result),this._afterClosed.complete(),this.componentInstance=null,this._overlayRef.dispose()}),i.keydownEvents().pipe((0,f.h)(a=>a.keyCode===D.hY&&!this.disableClose&&!(0,D.Vb)(a))).subscribe(a=>{a.preventDefault(),this.close()})}close(i){this._result=i,this._containerInstance._animationStateChanged.pipe((0,f.h)(e=>"start"===e.phaseName),(0,x.q)(1)).subscribe(e=>{this._beforeClosed.next(i),this._beforeClosed.complete(),this._state=2,this._overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>{this._overlayRef.dispose()},e.totalTime+100)}),this._containerInstance._startExitAnimation(),this._state=1}afterOpened(){return this._afterOpened.asObservable()}afterClosed(){return this._afterClosed.asObservable()}beforeClosed(){return this._beforeClosed.asObservable()}backdropClick(){return this._overlayRef.backdropClick()}keydownEvents(){return this._overlayRef.keydownEvents()}updatePosition(i){const e=this._getPositionStrategy();return i&&(i.left||i.right)?i.left?e.left(i.left):e.right(i.right):e.centerHorizontally(),i&&(i.top||i.bottom)?i.top?e.top(i.top):e.bottom(i.bottom):e.centerVertically(),this._overlayRef.updatePosition(),this}updateSize(i="",e=""){return this._getPositionStrategy().width(i).height(e),this._overlayRef.updatePosition(),this}addPanelClass(i){return this._overlayRef.addPanelClass(i),this}removePanelClass(i){return this._overlayRef.removePanelClass(i),this}getState(){return this._state}_getPositionStrategy(){return this._overlayRef.getConfig().positionStrategy}}const Q=new t.OlP("NxModalData"),G=new t.OlP("nx-modal-default-options"),B=new t.OlP("nx-modal-scroll-strategy"),K={provide:B,useFactory:function V(n){return()=>n.scrollStrategies.block()},deps:[u.aV]};let O=(()=>{class n{constructor(e,o,a,l,r,h){this._overlay=e,this._injector=o,this._defaultOptions=a,this._parentDialogService=l,this._overlayContainer=r,this._defaultScrollStrategyFactory=h,this._openModalsAtThisLevel=[],this._afterAllClosedAtThisLevel=new d.xQ,this._afterOpenedAtThisLevel=new d.xQ,this._ariaHiddenElements=new Map,this.afterAllClosed=(0,A.P)(()=>this.openModals.length?this._afterAllClosed:this._afterAllClosed.pipe((0,T.O)(void 0))),this._destroyed=new d.xQ,this._scrollStrategyFactory=this._defaultScrollStrategyFactory}get openModals(){return this._parentDialogService?this._parentDialogService.openModals:this._openModalsAtThisLevel}get afterOpened(){return this._parentDialogService?this._parentDialogService.afterOpened:this._afterOpenedAtThisLevel}get _afterAllClosed(){const e=this._parentDialogService;return e?e._afterAllClosed:this._afterAllClosedAtThisLevel}open(e,o){if(o=function X(n,i){return{...i,...n}}(o,this._defaultOptions||new C),o.id&&this.getModalById(o.id))throw Error(`Modal with id "${o.id}" exists already. The modal id must be unique.`);const a=this._createOverlay(o),l=this._attachModalContainer(a,o),r=this._attachModalContent(e,l,a,o);return this.openModals.length||this._hideNonModalContentFromAssistiveTechnology(),this.openModals.push(r),r.afterClosed().subscribe(()=>this._removeOpenModal(r)),this.afterOpened.next(r),r}closeAll(){this._closeModals(this.openModals)}getModalById(e){return this.openModals.find(o=>o.id===e)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._closeModals(this._openModalsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_createOverlay(e){const o=this._getOverlayConfig(e);return this._overlay.create(o)}_getOverlayConfig(e){const o=new u.X_({positionStrategy:this._overlay.position().global(),scrollStrategy:e.scrollStrategy||this._scrollStrategyFactory(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,disposeOnNavigation:e.closeOnNavigation,direction:e.direction});return e.backdropClass&&(o.backdropClass=e.backdropClass),o}_attachModalContainer(e,o){const a=o?.viewContainerRef?.injector,l=t.zs3.create({parent:a||this._injector,providers:[{provide:C,useValue:o}]}),r=new _.C5(w,o.viewContainerRef,l,o.componentFactoryResolver);return e.attach(r).instance}_attachModalContent(e,o,a,l){const r=new b(a,o,l.id);if(l.hasBackdrop&&a.backdropClick().pipe((0,g.R)(this._destroyed)).subscribe(()=>{r.disableClose||r.close()}),e instanceof t.Rgc)o.attachTemplatePortal(new _.UE(e,null,{$implicit:l.data,modalRef:r}));else{const h=this._createInjector(l,r,o),E=o.attachComponentPortal(new _.C5(e,l.viewContainerRef,h));r.componentInstance=E.instance}return r.updateSize(l.width,l.height).updatePosition(l.position),r}_createInjector(e,o,a){const l=e?.viewContainerRef?.injector;return t.zs3.create({parent:l||this._injector,providers:[{provide:w,useValue:a},{provide:Q,useValue:e.data},{provide:b,useValue:o}]})}_removeOpenModal(e){const o=this.openModals.indexOf(e);o>-1&&(this.openModals.splice(o,1),this.openModals.length||(this._ariaHiddenElements.forEach((a,l)=>{a?l.setAttribute("aria-hidden",a):l.removeAttribute("aria-hidden")}),this._ariaHiddenElements.clear(),this._afterAllClosed.next()))}_hideNonModalContentFromAssistiveTechnology(){const e=this._overlayContainer.getContainerElement();if(e.parentElement){const o=e.parentElement.children;for(let a=o.length-1;a>-1;a--){const l=o[a];l!==e&&"SCRIPT"!==l.nodeName&&"STYLE"!==l.nodeName&&!l.hasAttribute("aria-live")&&(this._ariaHiddenElements.set(l,l.getAttribute("aria-hidden")),l.setAttribute("aria-hidden","true"))}}}_closeModals(e){let o=e.length;for(;o--;)e[o].close()}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(u.aV),t.LFG(t.zs3),t.LFG(G,8),t.LFG(n,12),t.LFG(u.Xj),t.LFG(B))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})(),$=(()=>{class n{constructor(e,o,a){this.modalRef=e,this._elementRef=o,this._dialogService=a,this.type="button"}ngOnInit(){this.modalRef||(this.modalRef=function J(n,i){let e=n.nativeElement.parentElement;for(;e&&!e.classList.contains("nx-modal__container");)e=e.parentElement;return e?i.find(o=>o.id===e.id):null}(this._elementRef,this._dialogService.openModals))}ngOnChanges(e){const o=e.modalResult;o&&(this.modalResult=o.currentValue)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(b,8),t.Y36(t.SBq),t.Y36(O))},n.\u0275dir=t.lG2({type:n,selectors:[["","nxModalClose",""]],hostVars:2,hostBindings:function(e,o){1&e&&t.NdJ("click",function(){return o.modalRef.close(o.modalResult)}),2&e&&t.uIk("aria-label",o.ariaLabel||null)("type",o.type)},inputs:{ariaLabel:["aria-label","ariaLabel"],type:"type",modalResult:["nxModalClose","modalResult"]},features:[t.TTD]}),n})();const Z=(0,s.oQ)([(0,s.oB)({opacity:0}),(0,s.jt)("300ms",(0,s.oB)({opacity:1}))]),q=(0,s.oQ)((0,s.jt)("300ms",(0,s.oB)({opacity:0}))),ee=(0,s.oQ)([(0,s.oB)({transform:"scale(1)",opacity:1}),(0,s.jt)("250ms",(0,s.oB)({transform:"scale(1.3)",opacity:0}))]),te=(0,s.oQ)([(0,s.oB)({transform:"scale(1.3)",opacity:0}),(0,s.jt)("250ms",(0,s.oB)({transform:"scale(1)",opacity:1}))]);let y=(()=>{class n{constructor(){this.subject=new d.xQ,this.close$=this.subject.asObservable()}close(){this.subject.next()}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})(),oe=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=t.lG2({type:n,selectors:[["","nxModalActions",""]],hostVars:2,hostBindings:function(e,o){2&e&&t.ekj("nx-modal__actions",!0)}}),n})(),ne=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=t.lG2({type:n,selectors:[["","nxModalContent",""]],hostVars:2,hostBindings:function(e,o){2&e&&t.ekj("nx-modal__content",!0)}}),n})(),ie=(()=>{class n{constructor(e,o,a,l){this.modalService=e,this.eventManager=o,this._cdr=a,this._focusMonitor=l,this._closeButtonLabel="Close dialog",this.hideOnEsc=!0,this.hideOnClickOutside=!0,this.showCloseIcon=!0,this.size="auto",this.closeEvent=new t.vpe,this._destroyed=new d.xQ}set closeButtonLabel(e){e!==this._closeButtonLabel&&(this._closeButtonLabel=e,this._cdr.markForCheck())}get closeButtonLabel(){return this._closeButtonLabel}ngOnInit(){this.modalService.close$.pipe((0,g.R)(this._destroyed)).subscribe(()=>this.closeEvent.emit()),this.removeEventListener=this.eventManager.addGlobalEventListener("window","keyup.esc",()=>{this.hideOnEsc&&this.modalService.close()})}ngAfterViewInit(){this.showCloseIcon&&this._focusMonitor.monitor(this._closeButton)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.removeEventListener(),this._focusMonitor.stopMonitoring(this._closeButton)}clickOutsideModal(){this.hideOnClickOutside&&this.modalService.close()}closeButtonClick(){this.modalService.close()}cancelClick(e){e.stopPropagation()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(y),t.Y36(N.Qz),t.Y36(t.sBO),t.Y36(m.tE))},n.\u0275cmp=t.Xpm({type:n,selectors:[["nx-modal"]],viewQuery:function(e,o){if(1&e&&t.Gf(P,5),2&e){let a;t.iGM(a=t.CRH())&&(o._closeButton=a.first)}},hostVars:3,hostBindings:function(e,o){2&e&&(t.d8E("@fadeInOut",void 0),t.ekj("nx-modal--fixed-width","fixed"===o.size))},inputs:{closeButtonLabel:"closeButtonLabel",body:["nxBody","body"],hideOnEsc:["nxHideOnEsc","hideOnEsc"],hideOnClickOutside:["nxHideOnClickOutside","hideOnClickOutside"],showCloseIcon:["nxShowCloseIcon","showCloseIcon"],size:["nxSize","size"]},outputs:{closeEvent:"nxClose"},ngContentSelectors:U,decls:9,vars:4,consts:[["role","dialog","cdkTrapFocus","","cdkTrapFocusAutoCapture","","cdkFocusInitial","",1,"nx-modal"],[1,"nx-modal__backdrop",3,"click"],[1,"nx-modal__position"],[1,"nx-modal__container",3,"click"],["class","nx-modal__close","type","button",3,"click",4,"ngIf"],["cdkScrollable","",1,"nx-modal__content-wrapper"],[4,"ngIf","ngIfElse"],["projectContent",""],["type","button",1,"nx-modal__close",3,"click"],["closeButton",""],["name","close"],[4,"ngTemplateOutlet"]],template:function(e,o){if(1&e&&(t.F$t(),t.TgZ(0,"div",0)(1,"div",1),t.NdJ("click",function(){return o.clickOutsideModal()}),t.TgZ(2,"div",2)(3,"div",3),t.NdJ("click",function(l){return o.cancelClick(l)}),t.YNc(4,F,3,1,"button",4),t.TgZ(5,"div",5),t.YNc(6,H,2,1,"ng-container",6),t.YNc(7,Y,1,0,"ng-template",null,7,t.W1O),t.qZA()()()()()),2&e){const a=t.MAs(8);t.xp6(3),t.Q6J("@scaleUpDown",void 0),t.xp6(1),t.Q6J("ngIf",o.showCloseIcon),t.xp6(2),t.Q6J("ngIf",o.body)("ngIfElse",a)}},dependencies:[m.mK,L.PQ,p.O5,p.tP,v.O8],styles:["[_nghost-%COMP%]{position:relative;z-index:1000}.nx-modal[_ngcontent-%COMP%]{display:flex;position:fixed;width:100vw;height:100vh;inset:0;z-index:1000;align-items:center;justify-content:center;transition:opacity .3s ease}.nx-modal__backdrop[_ngcontent-%COMP%]{background-color:#00000059;height:100%;left:0;position:absolute;top:0;width:100%;z-index:-1}.nx-modal__position[_ngcontent-%COMP%]{position:absolute;display:inline-block;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20}.nx-modal__container[_ngcontent-%COMP%]{border-radius:4px;box-shadow:var(--shadow-large);background:var(--modal-background-color);color:var(--modal-text-color)}.nx-modal__content-wrapper[_ngcontent-%COMP%]{padding:40px 40px 48px;max-height:calc(100vh - 48px);overflow-y:auto}@media (max-width: 703px){.nx-modal__content-wrapper[_ngcontent-%COMP%]{max-height:70vh;padding:40px 32px 48px}}.nx-modal__close[_ngcontent-%COMP%]{background-color:transparent;border:none;cursor:pointer;position:absolute;top:16px;right:16px;height:24px;outline:none;padding:0;color:var(--modal-close-icon-color)}.nx-modal__close[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}.nx-modal__close[_ngcontent-%COMP%]::-moz-focus-inner{border:0}[dir=rtl][_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-modal__close[_ngcontent-%COMP%]{right:auto;left:16px}.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-modal__close.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media (max-width: 703px){.nx-modal__position[_ngcontent-%COMP%]{width:100%}.nx-modal__container[_ngcontent-%COMP%]{position:relative;max-width:calc(100vw - 16px);max-height:70vh;margin:0 auto}}.nx-modal--fixed-width[_nghost-%COMP%]   .nx-modal__container[_ngcontent-%COMP%]{width:736px;max-width:calc(100vw - 16px)}  .nx-modal__actions{height:72px;border-top:1px solid var(--modal-actions-border-color);display:flex;align-items:center;justify-content:flex-end;padding:0 40px;position:absolute;bottom:0;left:0;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px;background:var(--modal-actions-background-color)}  .nx-modal__content{overflow-y:auto;max-height:calc(100vh - 120px);padding:0 40px;margin:0 -40px}@media (max-width: 703px){  .nx-modal__content{max-height:calc(70vh - 120px);margin:0 -32px}}@media screen and (forced-colors: active){.nx-modal__content-wrapper[_ngcontent-%COMP%],   .nx-modal__actions{border:2px solid CanvasText}}"],data:{animation:[(0,s.X$)("fadeInOut",[(0,s.eR)(":enter",[(0,s._7)(Z),(0,s.IO)("@scaleUpDown",[(0,s.pV)()])]),(0,s.eR)(":leave",[(0,s.IO)("@scaleUpDown",[(0,s.pV)()]),(0,s._7)(q)])]),(0,s.X$)("scaleUpDown",[(0,s.eR)(":enter",(0,s._7)(te)),(0,s.eR)(":leave",(0,s._7)(ee))])]},changeDetection:0}),n})(),ae=(()=>{class n{constructor(e,o,a){this.templateRef=e,this.viewContainer=o,this.modalService=a,this._destroyed=new d.xQ,this.clickHandler=l=>{this.viewContainer.clear(),this.viewContainer.createEmbeddedView(this.templateRef).markForCheck(),l.preventDefault(),l.stopPropagation()}}set nxOpenModalOnClick(e){this.elements=Array.isArray(e)?e:[e],this.elements.forEach(o=>{o.addEventListener?o.addEventListener("click",this.clickHandler):o.elementRef?o.elementRef.nativeElement.addEventListener("click",this.clickHandler):console.warn("nxOpenModalOnClick: Given Element doesn't appear to be an ElementRef.",o)})}ngOnInit(){this.modalService.close$.pipe((0,g.R)(this._destroyed)).subscribe(()=>this.viewContainer.clear())}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.elements.forEach(e=>{e.removeEventListener&&e.removeEventListener("click",this.clickHandler)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.Rgc),t.Y36(t.s_b),t.Y36(y))},n.\u0275dir=t.lG2({type:n,selectors:[["","nxOpenModalOnClick",""]],inputs:{nxOpenModalOnClick:"nxOpenModalOnClick"}}),n})(),se=(()=>{class n{static forRoot(){return{ngModule:n,providers:[y]}}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[O,K],imports:[m.rt,u.U8,_.eL,p.ez,v.cf]}),n})()}}]);