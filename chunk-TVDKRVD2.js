import{b as we,c as A,d as ke,f as D,g as Se,h as ee,l as Te}from"./chunk-AZNKYEEF.js";import{c as Fe}from"./chunk-5RFPKINN.js";import{g as ie,i as Ee,m as Ae,p as N,s as Ne}from"./chunk-PNCA27QO.js";import{a as Ie}from"./chunk-K3MRPJ7U.js";import{c as je,e as Xe}from"./chunk-AGQ4ALMF.js";import{i as Re,k as te,p as De,w as Pe}from"./chunk-LK5X6SR6.js";import{a as ne}from"./chunk-2BGO346T.js";import{B as Oe,d as J,l as ve,o as be}from"./chunk-UUZACKYZ.js";import{$b as S,Aa as w,Ac as g,B as ae,Db as K,Eb as q,Gb as G,J as le,Jb as W,Kb as Z,L as B,Lb as I,Lc as ye,M as d,Ma as me,Mb as $,Nb as xe,Rb as Ce,S as z,U as v,Yb as k,_b as m,ac as T,ca as ue,da as L,ea as u,g as j,h as se,i as re,k as X,lb as pe,ma as de,mb as Q,n as _,qa as he,s as Y,tb as ge,ua as b,ub as c,v as ce,va as _e,w as H,wa as V,wb as U,wc as E,xc as p,yb as P,yc as Me,za as O,zb as fe,zc as R}from"./chunk-QYP2T7PT.js";var Ke=["nxContextMenuItem",""];function qe(s,i){s&1&&xe(0,"nx-icon",2)}var F=["*"];function Ge(s,i){if(s&1){let l=Ce();I(0,"div",0),k("keydown",function(e){O(l);let t=m();return w(t._handleKeydown(e))})("click",function(){O(l);let e=m();return w(e.closed.emit("click"))})("@transformContextMenu.start",function(e){O(l);let t=m();return w(t._onAnimationStart(e))})("@transformContextMenu.done",function(e){O(l);let t=m();return w(t._onAnimationDone(e))}),I(1,"div",1),T(2),$()()}if(s&2){let l=m();q("ngClass",l._classList)("@transformContextMenu",l._panelAnimationState)}}var We={transformContextMenu:we("transformContextMenu",[Se("void",D({opacity:0,transform:"scale(0.8)"})),ee("void => enter",ke([Te(".nx-context-menu__content",A("100ms linear",D({opacity:1}))),A("120ms cubic-bezier(0, 0, 0.2, 1)",D({transform:"scale(1)"}))])),ee("* => void",A("100ms linear",D({opacity:0})))])},Ze=(()=>{let i=class i{constructor(n,e,t,o,r,a){this._template=n,this._componentFactoryResolver=e,this._appRef=t,this._injector=o,this._viewContainerRef=r,this._document=a,this._attached=new _}attach(n={}){this._portal||(this._portal=new ie(this._template,this._viewContainerRef)),this.detach(),this._outlet||(this._outlet=new Ee(this._document.createElement("div"),this._componentFactoryResolver,this._appRef,this._injector));let e=this._template.elementRef.nativeElement;e.parentNode&&e.parentNode.insertBefore(this._outlet.outletElement,e),this._portal.attach(this._outlet,n),this._attached.next()}detach(){this._portal.isAttached&&this._portal.detach()}ngOnDestroy(){this._outlet&&this._outlet.dispose()}};i.\u0275fac=function(e){return new(e||i)(c(E),c(pe),c(ye),c(me),c(W),c(J))},i.\u0275dir=V({type:i,selectors:[["ng-template","nxContextMenuContent",""]]});let s=i;return s})(),oe=(()=>{let i=class i{set disabled(n){this._disabled=ne(n),this._cdr.markForCheck()}get disabled(){return this._disabled}set disableCloseOnSelect(n){this._disableCloseOnSelect=ne(n),this._cdr.markForCheck()}get disableCloseOnSelect(){return this._disableCloseOnSelect}constructor(n,e,t,o){this._elementRef=n,this._document=e,this._cdr=t,this._focusMonitor=o,this._hovered=new _,this._disabled=!1,this._disableCloseOnSelect=!1,this._highlighted=!1,this._triggersSubmenu=!1,this._focusMonitor.monitor(this._elementRef)}focus(n){n?this._focusMonitor.focusVia(this._getHostElement(),n):this._getHostElement().focus()}ngOnDestroy(){this._hovered.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(n){this.disableCloseOnSelect&&n.stopPropagation(),this.disabled&&(n.preventDefault(),n.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let n=this._elementRef.nativeElement.childNodes[0],e=this._document?this._document.TEXT_NODE:3,t="";if(n.childNodes){let o=n.childNodes.length;for(let r=0;r<o;r++)n.childNodes[r].nodeType===e&&(t+=n.childNodes[r].textContent)}return t.trim()}};i.\u0275fac=function(e){return new(e||i)(c(Q),c(J,8),c(U),c(Pe))},i.\u0275cmp=b({type:i,selectors:[["","nxContextMenuItem",""]],hostAttrs:["role","menuitem",1,"nx-context-menu-item"],hostVars:5,hostBindings:function(e,t){e&1&&k("mouseenter",function(){return t._handleMouseEnter()})("click",function(r){return t._checkDisabled(r)}),e&2&&(K("tabindex",t._getTabIndex())("aria-disabled",t.disabled.toString())("disabled",t.disabled||null),G("is-highlighted",t._highlighted))},inputs:{disabled:"disabled",disableCloseOnSelect:"disableCloseOnSelect"},exportAs:["nxContextMenuItem"],attrs:Ke,ngContentSelectors:F,decls:3,vars:3,consts:[[1,"nx-context-menu-item__content-wrapper"],["class","nx-context-menu-item__expand","name","chevron-right-small",4,"ngIf"],["name","chevron-right-small",1,"nx-context-menu-item__expand"]],template:function(e,t){e&1&&(S(),I(0,"div",0),T(1),Z(2,qe,1,0,"nx-icon",1),$()),e&2&&(G("has-submenu",t._triggersSubmenu),ge(2),q("ngIf",t._triggersSubmenu))},dependencies:[be,je],styles:["[_nghost-%COMP%]{font-size:var(--context-menu-font-size);line-height:var(--context-menu-line-height);font-weight:var(--context-menu-font-weight);letter-spacing:var(--context-menu-letter-spacing);display:flex;align-items:center;cursor:pointer;text-align:left;width:100%;appearance:none;border:none;outline:none;background:transparent;padding:8px 32px;color:var(--context-menu-item-text-color)}[dir=rtl]   [_nghost-%COMP%]{padding:8px 32px}@media screen and (forced-colors: active){[_nghost-%COMP%]{forced-color-adjust:none;background-color:buttonFace;color:button}}[_nghost-%COMP%]:not(:disabled):hover, [_nghost-%COMP%]:not(:disabled):active, [_nghost-%COMP%]:not(:disabled).is-highlighted{color:var(--context-menu-item-active-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]:not(:disabled):hover, [_nghost-%COMP%]:not(:disabled):active, [_nghost-%COMP%]:not(:disabled).is-highlighted{forced-color-adjust:none;background-color:highlight;color:highlightText}}[_nghost-%COMP%]:disabled{cursor:not-allowed;color:var(--context-menu-item-disabled-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]:disabled{color:GrayText}}[_nghost-%COMP%]::-moz-focus-inner{border:0}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper.has-submenu[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){font-size:var(--context-menu-item-icon-size);position:absolute}[dir=ltr]   [_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){margin-right:8px;left:8px}[dir=rtl]   [_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){margin-left:8px;right:8px}[_nghost-%COMP%]   .nx-context-menu-item__expand[_ngcontent-%COMP%]{font-size:var(--context-menu-item-expand-icon-size);padding-left:8px;margin-left:auto;margin-right:0;width:1em}[dir=rtl]   [_nghost-%COMP%]   .nx-context-menu-item__expand[_ngcontent-%COMP%]{margin-right:auto;margin-left:0;transform:rotate(180deg)}.cdk-keyboard-focused[_nghost-%COMP%]:focus   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{border-radius:4px;outline:0;box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]:focus   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0});let s=i;return s})(),$e=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=b({type:i,selectors:[["nx-context-menu-item-wrap"]],contentQueries:function(e,t,o){if(e&1&&R(o,oe,4),e&2){let r;p(r=g())&&(t._items=r)}},ngContentSelectors:F,decls:1,vars:0,template:function(e,t){e&1&&(S(),T(0))},encapsulation:2,changeDetection:0});let s=i;return s})(),He=(()=>{let i=class i{_onClick(n){n.preventDefault()}constructor(n){this._ngZone=n,this._init=new ce(1),this._classList={},this._panelAnimationState="void",this._animationDone=new _,this._isAnimating=!1,this.direction="ltr",this.closed=new P,this._destroyed=new _}ngAfterContentInit(){this._items=this._wrap?this._wrap?._items:this._items,this._keyManager=new De(this._items).withWrap().withTypeAhead().setFocusOrigin("keyboard"),this._keyManager.tabOut.pipe(u(this._destroyed)).subscribe(()=>this.closed.emit("tab")),this._init.next()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.closed.complete(),this._init.complete()}_hovered(){return this._init.pipe(L(()=>this._items.changes.pipe(ue(this._items))),L(n=>B(...n.map(e=>e._hovered))))}_handleKeydown(n){let e=n.keyCode,t=this._keyManager;switch(e){case 27:te(n)||(n.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;case 36:case 35:te(n)||(e===36?t.setFirstItemActive():t.setLastItemActive(),n.preventDefault());break;default:t.onKeydown(n)}}focusFirstItem(n){this._ngZone.onStable.asObservable().pipe(v(1)).subscribe(()=>{this._keyManager.setFirstItemActive(),this._keyManager.activeItem?.focus(n)})}resetActiveItem(){this._keyManager.setActiveItem(-1)}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(n){this._animationDone.next(n),this._isAnimating=!1}_onAnimationStart(n){this._isAnimating=!0,n.toState==="enter"&&this._keyManager.activeItemIndex===0&&(n.element.scrollTop=0)}};i.\u0275fac=function(e){return new(e||i)(c(fe))},i.\u0275cmp=b({type:i,selectors:[["nx-context-menu"]],contentQueries:function(e,t,o){if(e&1&&(R(o,$e,5),R(o,Ze,5),R(o,oe,4)),e&2){let r;p(r=g())&&(t._wrap=r.first),p(r=g())&&(t.lazyContent=r.first),p(r=g())&&(t._items=r)}},viewQuery:function(e,t){if(e&1&&Me(E,5),e&2){let o;p(o=g())&&(t.templateRef=o.first)}},hostBindings:function(e,t){e&1&&k("click",function(){return t._onClick()})},outputs:{closed:"closed"},exportAs:["nxContextMenu"],ngContentSelectors:F,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"nx-context-menu",3,"ngClass","keydown","click"],[1,"nx-context-menu__content"]],template:function(e,t){e&1&&(S(),Z(0,Ge,3,2,"ng-template"))},dependencies:[ve],styles:[".nx-context-menu[_ngcontent-%COMP%]{border-radius:4px;background:var(--context-menu-background-color);min-height:56px;box-shadow:var(--shadow-small);outline:none;overflow-y:auto}@media screen and (forced-colors: active){.nx-context-menu[_ngcontent-%COMP%]{border:1px solid CanvasText}}.nx-context-menu.ng-animating[_ngcontent-%COMP%]{pointer-events:none}.nx-context-menu__content[_ngcontent-%COMP%]:not(:empty){padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column}@media screen and (forced-colors: active){.nx-context-menu__content[_ngcontent-%COMP%]:not(:empty){background-color:buttonFace}}"],data:{animation:[We.transformContextMenu]},changeDetection:0});let s=i;return s})(),Ft=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=b({type:i,selectors:[["nx-context-menu-header"]],hostAttrs:[1,"nx-context-menu-header"],ngContentSelectors:F,decls:1,vars:0,template:function(e,t){e&1&&(S(),T(0))},styles:["[_nghost-%COMP%]{font-size:var(--formfield-label-font-size);line-height:var(--formfield-label-line-height);font-weight:var(--formfield-label-font-weight);letter-spacing:var(--formfield-label-letter-spacing);color:var(--dropdown-panel-header-text-color);background-color:var(--dropdown-panel-header-background-color);padding:8px 32px;border-top-left-radius:4px;border-top-right-radius:4px;z-index:1;position:relative;top:-8px;font-weight:700}"],changeDetection:0});let s=i;return s})();function Je(){throw Error(`nxContextMenuTriggerFor: must pass in an nx-context-menu instance.
    Example:
      <nx-context-menu #contextMenu="nxContextMenu"></nx-context-menu>
      <button [nxContextMenuTriggerFor]="contextMenu"></button>`)}var et=8,tt=8,Be=8,Ve=new he("nx-context-menu-scroll-strategy");function nt(s){return()=>s.scrollStrategies.reposition()}var it={provide:Ve,useFactory:nt,deps:[N]},jt=(()=>{var i;let l=class l{constructor(e,t,o,r,a,f,x,C,M){se(this,i,void 0);this._overlay=e,this._element=t,this._viewContainerRef=o,this._parentMenu=r,this._contextMenuItemInstance=a,this._dir=f,this._triggerButton=x,this._defaultScrollStrategyFactory=C,this._cdr=M,this._overlayRef=null,this._contextMenuOpen=!1,this._closingActionsSubscription=X.EMPTY,this._contextMenuCloseSubscription=X.EMPTY,this._scrollStrategyFactory=this._defaultScrollStrategyFactory,this.mode="button",this.contextMenuOpened=new P,this.contextMenuClosed=new P,this._destroyed=new _,this._rightClicked=!1,a&&(a._triggersSubmenu=this.triggersSubmenu()),this._documentClickObservable=le(document,"click"),this._dir?.change.pipe(u(this._destroyed)).subscribe(()=>{this.contextMenuOpen&&this.closeContextMenu()})}set contextMenu(e){e!==this._contextMenu&&(this._contextMenu=e,this._contextMenuCloseSubscription.unsubscribe(),e&&(this._contextMenuCloseSubscription=e.closed.asObservable().subscribe(t=>{this._destroyMenu(),(t==="click"||t==="tab")&&this._parentMenu&&this._parentMenu.closed.emit(t)})))}get contextMenu(){return this._contextMenu}set scrollStrategy(e){j(this,i)!==e&&(re(this,i,e),this._scrollStrategyFactory=e?this.getScrollStrtegyFactory(e):this._defaultScrollStrategyFactory,this._cdr.markForCheck())}get scrollStrategy(){return j(this,i)}get contextMenuOpen(){return this._contextMenuOpen}get dir(){return this._dir?.value==="rtl"?"rtl":"ltr"}ngAfterContentInit(){this._checkContextMenu(),this._handleHover()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._contextMenuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe()}triggersSubmenu(){return!!(this._contextMenuItemInstance&&this._parentMenu)}toggleContextMenu(e){return this.contextMenuOpen?this.closeContextMenu():this.openContextMenu(e)}openContextMenu(e,t){if(this.contextMenuOpen)return;this._checkContextMenu();let o=this._createOverlay(),r=o.getConfig();t?this._setPositionToCursor(r.positionStrategy,t):this._setPosition(r.positionStrategy),o.attach(this._getPortal()),this.contextMenu.lazyContent&&this.contextMenu.lazyContent.attach(this.contextMenuData),this._closingActionsSubscription=this._contextMenuClosingActions().subscribe(()=>this.closeContextMenu()),this._initContextMenu(e),this.contextMenu instanceof He&&this.contextMenu._startAnimation(),this._triggerButton&&(this._triggerButton.setTriggerActive(),this.contextMenu.closed.pipe(v(1)).subscribe(()=>this._triggerButton?.setTriggerInactive())),this._waitForClose()}closeContextMenu(){this._rightClicked=!1,this.contextMenu.closed.emit()}getScrollStrtegyFactory(e){switch(e){case"close":return this._overlay.scrollStrategies.close;default:return this._overlay.scrollStrategies.reposition}}_destroyMenu(){if(!this._overlayRef||!this.contextMenuOpen)return;let e=this.contextMenu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),e._resetAnimation(),e.lazyContent?e._animationDone.pipe(d(t=>t.toState==="void"),v(1),u(e.lazyContent._attached)).subscribe({next:()=>e.lazyContent?.detach(),complete:()=>this._resetContextMenu()}):this._resetContextMenu()}_initContextMenu(e){this.contextMenu.parentMenu=this.triggersSubmenu()?this._parentMenu??void 0:void 0,this.contextMenu.direction=this.dir,this._setIsContextMenuOpen(!0),setTimeout(()=>{this.contextMenu.focusFirstItem(e)})}focus(){this._element.nativeElement.focus()}_resetContextMenu(){this._setIsContextMenuOpen(!1),this.focus()}_setIsContextMenuOpen(e){this._contextMenuOpen=e,this._contextMenuOpen?this.contextMenuOpened.emit():this.contextMenuClosed.emit(),this.triggersSubmenu()&&(this._contextMenuItemInstance._highlighted=e)}_checkContextMenu(){this.contextMenu||Je()}_createOverlay(){if(!this._overlayRef){let e=this._getOverlayConfig();this._overlayRef=this._overlay.create(e),this._overlayRef.keydownEvents().pipe(u(this._destroyed)).subscribe()}return this._overlayRef}_getOverlayConfig(){return new Ae({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withFlexibleDimensions(!1).withTransformOriginOn(".nx-context-menu"),scrollStrategy:this._scrollStrategyFactory(),direction:this._dir??void 0})}_setPositionToCursor(e,t){e.setOrigin(t),e.withPositions([{overlayX:"start",overlayY:"top",originX:"center",originY:"center"},{overlayX:"start",overlayY:"bottom",originX:"center",originY:"center"},{overlayX:"end",overlayY:"top",originX:"center",originY:"center"},{overlayX:"end",overlayY:"bottom",originX:"center",originY:"center"}])}_setPosition(e){let t="start",o="end",r="top",a="bottom",f=r,x=a,C=t,M=o,y=0,h=0;this.triggersSubmenu()?(M=t="end",o=C="start",y=this.dir==="rtl"?-Be:Be,h=-et):(h=tt,f="bottom",x="top"),e.withPositions([{originX:t,originY:f,overlayX:C,overlayY:r,offsetX:y,offsetY:h},{originX:o,originY:f,overlayX:M,overlayY:r,offsetX:-y,offsetY:h},{originX:t,originY:x,overlayX:C,overlayY:a,offsetX:y,offsetY:-h},{originX:o,originY:x,overlayX:M,overlayY:a,offsetX:-y,offsetY:-h}])}_contextMenuClosingActions(){let e,t;this._overlayRef&&(e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments());let o=this._parentMenu?this._parentMenu.closed:Y(),r=this._parentMenu?this._parentMenu._hovered().pipe(d(a=>a!==this._contextMenuItemInstance),d(()=>this._contextMenuOpen)):Y();return B(e,o,r,t)}_handleMousedown(e){this.triggersSubmenu()&&e.preventDefault()}_handleRightClick(e){if(this.mode!=="cursor")return;this._rightClicked=!0,e.preventDefault(),this._contextMenuOpen&&this.closeContextMenu();let t={x:e.clientX,y:e.clientY};this.openContextMenu("mouse",t)}_handleKeydown(e){if(this.mode!=="button")return;let t=e.keyCode;this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&this.openContextMenu("keyboard")}_handleClick(e){if(this.mode!=="button")return;e.preventDefault();let t=e.detail?"program":"keyboard";this.triggersSubmenu()?(e.stopPropagation(),this.openContextMenu(t)):this.toggleContextMenu(t)}_waitForClose(){return this._rightClicked?this._documentClickObservable.pipe(d(e=>!e.defaultPrevented),u(this.contextMenu.closed)).subscribe(()=>{this.closeContextMenu()}):this._documentClickObservable.pipe(ae(e=>Re(e)),d(e=>!this._element.nativeElement.contains(e)),u(this.contextMenu.closed)).subscribe(()=>{this.closeContextMenu()})}_handleHover(){this.triggersSubmenu()&&this._parentMenu._hovered().pipe(d(e=>e===this._contextMenuItemInstance&&!e.disabled),z(0,H),u(this._destroyed)).subscribe(()=>{this.contextMenu._isAnimating?this.contextMenu._animationDone.pipe(v(1),z(0,H),u(this._parentMenu._hovered())).subscribe(()=>this.openContextMenu("mouse")):this.openContextMenu("mouse")})}_getPortal(){return(!this._portal||this._portal.templateRef!==this.contextMenu.templateRef)&&(this._portal=new ie(this.contextMenu.templateRef,this._viewContainerRef)),this._portal}};i=new WeakMap,l.\u0275fac=function(t){return new(t||l)(c(N),c(Q),c(W),c(He,8),c(oe,10),c(Ie,8),c(Fe,10),c(Ve),c(U))},l.\u0275dir=V({type:l,selectors:[["","nxContextMenuTriggerFor",""]],hostAttrs:["aria-haspopup","true"],hostVars:1,hostBindings:function(t,o){t&1&&k("mousedown",function(a){return o._handleMousedown(a)})("keydown",function(a){return o._handleKeydown(a)})("click",function(a){return o._handleClick(a)})("contextmenu",function(a){return o._handleRightClick(a)}),t&2&&K("aria-expanded",o.contextMenuOpen||null)},inputs:{contextMenu:["nxContextMenuTriggerFor","contextMenu"],scrollStrategy:"scrollStrategy",contextMenuData:["nxContextMenuTriggerData","contextMenuData"],mode:["nxContextMenuTriggerMode","mode"]},outputs:{contextMenuOpened:"contextMenuOpened",contextMenuClosed:"contextMenuClosed"},exportAs:["nxContextMenuTrigger"]});let s=l;return s})();var Xt=(()=>{let i=class i{};i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=_e({type:i}),i.\u0275inj=de({providers:[it],imports:[Oe,Ne,Xe]});let s=i;return s})();export{Ze as a,oe as b,$e as c,He as d,Ft as e,Ve as f,jt as g,Xt as h};