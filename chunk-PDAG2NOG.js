import{b as Fe}from"./chunk-TQSWTGBO.js";import{c as be,d as E,e as we,g as k,h as Oe,i as J,m as ke}from"./chunk-VV4CBK2G.js";import{c as Ee}from"./chunk-J2PQRSHM.js";import{g as te,i as Te,m as Ne,p as A,s as Pe}from"./chunk-LJK2GACP.js";import{a as Re}from"./chunk-T5NYCE37.js";import{c as Ae,e as ne}from"./chunk-V5XCZUGO.js";import{b as Z,h as De,q as Ie}from"./chunk-2EQ73B6L.js";import{j as Se}from"./chunk-TGA3OXY4.js";import{a as ee}from"./chunk-APNBV455.js";import{d as $,l as ye,z as ve}from"./chunk-CCSED5RY.js";import{$ as re,$b as me,Aa as y,Ab as de,Ac as O,Ba as v,Db as K,Ec as x,F as se,Fc as Ce,Ga as D,Gc as u,H as B,Hc as d,I as l,Ka as I,Lb as b,Mb as he,Nb as T,O as Q,Oa as L,Q as S,Qb as _e,Rb as U,aa as z,ac as N,ba as c,bb as le,bc as pe,dc as q,ed as G,g as H,gc as xe,j as _,jd as Me,ka as ce,lc as P,ma as ae,mc as W,nc as fe,o as X,pa as V,r as ie,rc as ge,s as Y,wb as ue,wc as m,x as oe,xb as r,yc as p,zb as R,zc as w}from"./chunk-LG2ZA55B.js";var Ke=["nxContextMenuItem",""],F=["*"];function Ue(i,Qe){i&1&&fe(0,"nx-icon",1)}function qe(i,Qe){if(i&1){let e=ge();P(0,"div",0),m("keydown",function(n){y(e);let s=p();return v(s._handleKeydown(n))})("click",function(){y(e);let n=p();return v(n.closed.emit("click"))})("@transformContextMenu.start",function(n){y(e);let s=p();return v(s._onAnimationStart(n))})("@transformContextMenu.done",function(n){y(e);let s=p();return v(s._onAnimationDone(n))}),P(1,"div",1),O(2),W()()}if(i&2){let e=p();pe("ngClass",e._classList)("@transformContextMenu",e._panelAnimationState)}}var We={transformContextMenu:be("transformContextMenu",[Oe("void",k({opacity:0,transform:"scale(0.8)"})),J("void => enter",we([ke(".nx-context-menu__content",E("100ms linear",k({opacity:1}))),E("120ms cubic-bezier(0, 0, 0.2, 1)",k({transform:"scale(1)"}))])),J("* => void",E("100ms linear",k({opacity:0})))])},Ge=(()=>{class i{constructor(e,t,n,s,o,a){this._template=e,this._componentFactoryResolver=t,this._appRef=n,this._injector=s,this._viewContainerRef=o,this._document=a,this._attached=new _}attach(e={}){this._portal||(this._portal=new te(this._template,this._viewContainerRef)),this.detach(),this._outlet||(this._outlet=new Te(this._document.createElement("div"),this._componentFactoryResolver,this._appRef,this._injector));let t=this._template.elementRef.nativeElement;t.parentNode&&t.parentNode.insertBefore(this._outlet.outletElement,t),this._portal.attach(this._outlet,e),this._attached.next()}detach(){this._portal.isAttached&&this._portal.detach()}ngOnDestroy(){this._outlet&&this._outlet.dispose()}static{this.\u0275fac=function(t){return new(t||i)(r(R),r(de),r(me),r(D),r(K),r($))}}static{this.\u0275dir=T({type:i,selectors:[["ng-template","nxContextMenuContent",""]]})}}return i})(),j=(()=>{class i{set selectable(e){this._selectable=e}get selectable(){return this._selectable}set disabled(e){this._disabled=ee(e),this._cdr.markForCheck()}get disabled(){return this._disabled}set disableCloseOnSelect(e){this._disableCloseOnSelect=ee(e),this._cdr.markForCheck()}get disableCloseOnSelect(){return this._disableCloseOnSelect}constructor(e,t,n,s){this._elementRef=e,this._document=t,this._cdr=n,this._focusMonitor=s,this._hovered=new _,this._selectable=!1,this._disabled=!1,this._disableCloseOnSelect=!1,this._highlighted=!1,this._triggersSubmenu=!1,this._elementRef.nativeElement.addEventListener("click",o=>{this._handleClick(o)},!0)}focus(e){e?this._focusMonitor.focusVia(this._getHostElement(),e):this._getHostElement().focus()}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._hovered.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}_getHostElement(){return this._elementRef.nativeElement}_handleClick(e){this.disabled&&e.stopImmediatePropagation()}_checkDisabled(e){this.disableCloseOnSelect&&e.stopPropagation(),this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.childNodes[0],t=this._document?this._document.TEXT_NODE:3,n="";if(e.childNodes){let s=e.childNodes.length;for(let o=0;o<s;o++)e.childNodes[o].nodeType===t&&(n+=e.childNodes[o].textContent)}return n.trim()}static{this.\u0275fac=function(t){return new(t||i)(r(L),r($,8),r(G),r(Ie))}}static{this.\u0275cmp=b({type:i,selectors:[["","nxContextMenuItem",""]],hostAttrs:["role","menuitem","tabindex","0",1,"nx-context-menu-item"],hostVars:8,hostBindings:function(t,n){t&1&&m("mouseenter",function(){return n._handleMouseEnter()})("click",function(o){return n._checkDisabled(o)}),t&2&&(N("disabled",null)("aria-disabled",n.disabled.toString()),q("is-highlighted",n._highlighted)("is-selectable",n._selectable)("is-disabled",n.disabled))},inputs:{selectable:[2,"selectable","selectable",Me],disabled:"disabled",disableCloseOnSelect:"disableCloseOnSelect"},exportAs:["nxContextMenuItem"],features:[_e],attrs:Ke,ngContentSelectors:F,decls:3,vars:3,consts:[[1,"nx-context-menu-item__content-wrapper"],["name","chevron-right-small",1,"nx-context-menu-item__expand"]],template:function(t,n){t&1&&(w(),P(0,"div",0),O(1),U(2,Ue,1,0,"nx-icon",1),W()),t&2&&(q("has-submenu",n._triggersSubmenu),ue(2),xe(n._triggersSubmenu?2:-1))},dependencies:[ne,Ae],styles:["[_nghost-%COMP%]{font-size:var(--context-menu-font-size);line-height:var(--context-menu-line-height);font-weight:var(--context-menu-font-weight);letter-spacing:var(--context-menu-letter-spacing);display:flex;align-items:center;cursor:pointer;text-align:left;width:100%;appearance:none;border:none;outline:none;background:transparent;position:relative;padding:8px 32px;color:var(--context-menu-item-text-color)}[dir=rtl]   [_nghost-%COMP%]{padding:8px 32px}@media screen and (forced-colors: active){[_nghost-%COMP%]{forced-color-adjust:none;background-color:buttonFace;color:buttonText}}[_nghost-%COMP%]:not(.is-disabled):hover, [_nghost-%COMP%]:not(.is-disabled):active, [_nghost-%COMP%]:not(.is-disabled).is-highlighted{color:var(--context-menu-item-active-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]:not(.is-disabled):hover, [_nghost-%COMP%]:not(.is-disabled):active, [_nghost-%COMP%]:not(.is-disabled).is-highlighted{forced-color-adjust:none;background-color:highlight;color:highlightText}}.is-disabled[_nghost-%COMP%]{cursor:not-allowed;pointer-events:none;color:var(--context-menu-item-disabled-color)}@media screen and (forced-colors: active){.is-disabled[_nghost-%COMP%]{color:GrayText}}[_nghost-%COMP%]::-moz-focus-inner{border:0}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper.has-submenu[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){margin-right:8px;font-size:var(--context-menu-item-icon-size)}[dir=rtl]   [_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){margin-right:initial;margin-left:8px}.is-selectable[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){position:absolute;left:8px}[dir=rtl]   .is-selectable[_nghost-%COMP%]   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]    >nx-icon:not(.nx-context-menu-item__expand){left:initial;right:8px}[_nghost-%COMP%]   .nx-context-menu-item__expand[_ngcontent-%COMP%]{font-size:var(--context-menu-item-expand-icon-size);padding-left:8px;margin-left:auto;margin-right:0;width:1em}[dir=rtl]   [_nghost-%COMP%]   .nx-context-menu-item__expand[_ngcontent-%COMP%]{margin-right:auto;margin-left:0;transform:rotate(180deg)}.cdk-keyboard-focused[_nghost-%COMP%]:focus   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{border-radius:4px;outline:0;box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]:focus   .nx-context-menu-item__content-wrapper[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0})}}return i})(),Et=(()=>{class i{onKeyDown(e){e.keyCode===13&&this.checkbox.toggle()}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275dir=T({type:i,selectors:[["","nxContextMenuItemCheckbox",""]],contentQueries:function(t,n,s){if(t&1&&x(s,Fe,5),t&2){let o;u(o=d())&&(n.checkbox=o.first)}},hostVars:2,hostBindings:function(t,n){t&1&&m("keydown",function(o){return n.onKeyDown(o)}),t&2&&N("role","menuitemcheckbox")("aria-checked",n.checkbox.checked)}})}}return i})(),$e=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=b({type:i,selectors:[["nx-context-menu-item-wrap"]],contentQueries:function(t,n,s){if(t&1&&x(s,j,4),t&2){let o;u(o=d())&&(n._items=o)}},ngContentSelectors:F,decls:1,vars:0,template:function(t,n){t&1&&(w(),O(0))},encapsulation:2,changeDetection:0})}}return i})(),He=(()=>{class i{_onClick(e){e.preventDefault()}constructor(){this._init=new ie(1),this._injector=V(D),this._classList={},this._panelAnimationState="void",this._animationDone=new _,this._isAnimating=!1,this.direction="ltr",this.closed=new I,this._destroyed=new _}ngAfterContentInit(){this._items=this._wrap?this._wrap?._items:this._items,this._keyManager=new De(this._items).withWrap().withTypeAhead().setFocusOrigin("keyboard").skipPredicate(()=>!1),this._keyManager.tabOut.pipe(c(this._destroyed)).subscribe(()=>this.closed.emit("tab")),this._init.next()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.closed.complete(),this._init.complete(),this._firstItemFocusRef?.destroy()}_hovered(){return this._init.pipe(z(()=>this._items.changes.pipe(re(this._items))),z(e=>B(...e.map(t=>t._hovered))))}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Z(e)||(e.preventDefault(),e.stopPropagation(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;case 36:case 35:Z(e)||(t===36?n.setFirstItemActive():n.setLastItemActive(),e.preventDefault());break;default:n.onKeydown(e)}}focusFirstItem(e){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=le({read:()=>{this._keyManager.setActiveItem(0),this._keyManager.activeItem?.focus(e)}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}_startAnimation(){this._panelAnimationState="enter"}_resetAnimation(){this._panelAnimationState="void"}_onAnimationDone(e){this._animationDone.next(e),this._isAnimating=!1}_onAnimationStart(e){this._isAnimating=!0,e.toState==="enter"&&this._keyManager.activeItemIndex===0&&(e.element.scrollTop=0)}static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=b({type:i,selectors:[["nx-context-menu"]],contentQueries:function(t,n,s){if(t&1&&(x(s,$e,5),x(s,Ge,5),x(s,j,4)),t&2){let o;u(o=d())&&(n._wrap=o.first),u(o=d())&&(n.lazyContent=o.first),u(o=d())&&(n._items=o)}},viewQuery:function(t,n){if(t&1&&Ce(R,5),t&2){let s;u(s=d())&&(n.templateRef=s.first)}},hostBindings:function(t,n){t&1&&m("click",function(){return n._onClick()})},outputs:{closed:"closed"},exportAs:["nxContextMenu"],ngContentSelectors:F,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"nx-context-menu",3,"keydown","click","ngClass"],[1,"nx-context-menu__content"]],template:function(t,n){t&1&&(w(),U(0,qe,3,2,"ng-template"))},dependencies:[ye],styles:[".nx-context-menu[_ngcontent-%COMP%]{border-radius:4px;background:var(--context-menu-background-color);min-height:56px;box-shadow:var(--shadow-small);outline:none;overflow-y:auto}@media screen and (forced-colors: active){.nx-context-menu[_ngcontent-%COMP%]{border:1px solid CanvasText}}.nx-context-menu.ng-animating[_ngcontent-%COMP%]{pointer-events:none}.nx-context-menu__content[_ngcontent-%COMP%]:not(:empty){padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column}@media screen and (forced-colors: active){.nx-context-menu__content[_ngcontent-%COMP%]:not(:empty){background-color:buttonFace}}"],data:{animation:[We.transformContextMenu]},changeDetection:0})}}return i})(),At=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275cmp=b({type:i,selectors:[["nx-context-menu-header"]],hostAttrs:[1,"nx-context-menu-header"],ngContentSelectors:F,decls:1,vars:0,template:function(t,n){t&1&&(w(),O(0))},styles:["[_nghost-%COMP%]{font-size:var(--formfield-label-font-size);line-height:var(--formfield-label-line-height);font-weight:var(--formfield-label-font-weight);letter-spacing:var(--formfield-label-letter-spacing);color:var(--dropdown-panel-header-text-color);background-color:var(--dropdown-panel-header-background-color);padding:8px 32px;border-top-left-radius:4px;border-top-right-radius:4px;z-index:1;position:relative;top:-8px;font-weight:var(--context-menu-header-font-weight);font-size:var(--context-menu-header-font-size)}"],changeDetection:0})}}return i})();function Je(){throw Error(`nxContextMenuTriggerFor: must pass in an nx-context-menu instance.
    Example:
      <nx-context-menu #contextMenu="nxContextMenu"></nx-context-menu>
      <button [nxContextMenuTriggerFor]="contextMenu"></button>`)}var Ze=8,et=8,Xe=8,tt=new ae("nx-context-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=V(A);return()=>i.scrollStrategies.reposition()}});var Ft=(()=>{class i{set contextMenu(e){e!==this._contextMenu&&(this._contextMenu=e,this._contextMenuCloseSubscription.unsubscribe(),e&&(this._contextMenuCloseSubscription=e.closed.asObservable().subscribe(t=>{this._destroyMenu(),(t==="click"||t==="tab")&&this._parentMenu&&this._parentMenu.closed.emit(t)})))}get contextMenu(){return this._contextMenu}set scrollStrategy(e){this.#e!==e&&(this.#e=e,this._scrollStrategyFactory=e?this.getScrollStrtegyFactory(e):this._defaultScrollStrategyFactory,this._cdr.markForCheck())}get scrollStrategy(){return this.#e}#e;get contextMenuOpen(){return this._contextMenuOpen}get dir(){return this._dir?.value==="rtl"?"rtl":"ltr"}constructor(e,t,n,s,o,a,f,g,C){this._overlay=e,this._element=t,this._viewContainerRef=n,this._parentMenu=s,this._contextMenuItemInstance=o,this._dir=a,this._triggerButton=f,this._defaultScrollStrategyFactory=g,this._cdr=C,this._overlayRef=null,this._contextMenuOpen=!1,this._closingActionsSubscription=H.EMPTY,this._contextMenuCloseSubscription=H.EMPTY,this._scrollStrategyFactory=this._defaultScrollStrategyFactory,this.mode="button",this.contextMenuOpened=new I,this.contextMenuClosed=new I,this._destroyed=new _,this._rightClicked=!1,o&&(o._triggersSubmenu=this.triggersSubmenu()),this._documentClickObservable=se(document,"click"),this._dir?.change.pipe(c(this._destroyed)).subscribe(()=>{this.contextMenuOpen&&this.closeContextMenu()})}ngAfterContentInit(){this._checkContextMenu(),this._handleHover()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null),this._contextMenuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe()}triggersSubmenu(){return!!(this._contextMenuItemInstance&&this._parentMenu)}toggleContextMenu(e){return this.contextMenuOpen?this.closeContextMenu():this.openContextMenu(e)}openContextMenu(e,t){if(this.contextMenuOpen)return;this._checkContextMenu();let n=this._createOverlay(),s=n.getConfig();t?this._setPositionToCursor(s.positionStrategy,t):this._setPosition(s.positionStrategy),n.attach(this._getPortal()),this.contextMenu.lazyContent&&this.contextMenu.lazyContent.attach(this.contextMenuData),this._closingActionsSubscription=this._contextMenuClosingActions().subscribe(()=>this.closeContextMenu()),this._initContextMenu(e),this.contextMenu instanceof He&&this.contextMenu._startAnimation(),this._triggerButton&&(this._triggerButton.setTriggerActive(),this.contextMenu.closed.pipe(S(1)).subscribe(()=>this._triggerButton?.setTriggerInactive())),this._waitForClose()}closeContextMenu(){this._rightClicked=!1,this.contextMenu.closed.emit()}getScrollStrtegyFactory(e){switch(e){case"close":return this._overlay.scrollStrategies.close;default:return this._overlay.scrollStrategies.reposition}}_destroyMenu(){if(!this._overlayRef||!this.contextMenuOpen)return;let e=this.contextMenu;this._closingActionsSubscription.unsubscribe(),this._overlayRef.detach(),e._resetAnimation(),e.lazyContent?e._animationDone.pipe(l(t=>t.toState==="void"),S(1),c(e.lazyContent._attached)).subscribe({next:()=>e.lazyContent?.detach(),complete:()=>this._resetContextMenu()}):this._resetContextMenu()}_initContextMenu(e){this.contextMenu.parentMenu=this.triggersSubmenu()?this._parentMenu??void 0:void 0,this.contextMenu.direction=this.dir,this._setIsContextMenuOpen(!0),setTimeout(()=>{this.contextMenu.focusFirstItem(e)})}focus(){this._element.nativeElement.focus()}_resetContextMenu(){this._setIsContextMenuOpen(!1),this.focus()}_setIsContextMenuOpen(e){this._contextMenuOpen=e,this._contextMenuOpen?this.contextMenuOpened.emit():this.contextMenuClosed.emit(),this.triggersSubmenu()&&(this._contextMenuItemInstance._highlighted=e)}_checkContextMenu(){this.contextMenu||Je()}_createOverlay(){if(!this._overlayRef){let e=this._getOverlayConfig();this._overlayRef=this._overlay.create(e),this._overlayRef.keydownEvents().pipe(c(this._destroyed)).subscribe()}return this._overlayRef}_getOverlayConfig(){return new Ne({positionStrategy:this._overlay.position().flexibleConnectedTo(this._element).withLockedPosition().withFlexibleDimensions(!1).withTransformOriginOn(".nx-context-menu"),scrollStrategy:this._scrollStrategyFactory(),direction:this._dir??void 0})}_setPositionToCursor(e,t){e.setOrigin(t),e.withPositions([{overlayX:"start",overlayY:"top",originX:"center",originY:"center"},{overlayX:"start",overlayY:"bottom",originX:"center",originY:"center"},{overlayX:"end",overlayY:"top",originX:"center",originY:"center"},{overlayX:"end",overlayY:"bottom",originX:"center",originY:"center"}])}_setPosition(e){let t="start",n="end",s="top",o="bottom",a=s,f=o,g=t,C=n,M=0,h=0;this.triggersSubmenu()?(C=t="end",n=g="start",M=this.dir==="rtl"?-Xe:Xe,h=-Ze):(h=et,a="bottom",f="top"),e.withPositions([{originX:t,originY:a,overlayX:g,overlayY:s,offsetX:M,offsetY:h},{originX:n,originY:a,overlayX:C,overlayY:s,offsetX:-M,offsetY:h},{originX:t,originY:f,overlayX:g,overlayY:o,offsetX:M,offsetY:-h},{originX:n,originY:f,overlayX:C,overlayY:o,offsetX:-M,offsetY:-h}])}_contextMenuClosingActions(){let e,t;this._overlayRef&&(e=this._overlayRef.backdropClick(),t=this._overlayRef.detachments());let n=this._parentMenu?this._parentMenu.closed:X(),s=this._parentMenu?this._parentMenu._hovered().pipe(l(o=>o!==this._contextMenuItemInstance),l(()=>this._contextMenuOpen)):X();return B(e,n,s,t)}_handleMousedown(e){this.triggersSubmenu()&&e.preventDefault()}_handleRightClick(e){if(this.mode!=="cursor")return;this._rightClicked=!0,e.preventDefault(),this._contextMenuOpen&&this.closeContextMenu();let t={x:e.clientX,y:e.clientY};this.openContextMenu("mouse",t)}_handleKeydown(e){if(this.mode!=="button")return;let t=e.keyCode;this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&this.openContextMenu("keyboard")}_handleClick(e){if(this.mode!=="button")return;e.preventDefault();let t=e.detail?"program":"keyboard";this.triggersSubmenu()?(e.stopPropagation(),this.openContextMenu(t)):this.toggleContextMenu(t)}_waitForClose(){return this._rightClicked?this._documentClickObservable.pipe(l(e=>!e.defaultPrevented),c(this.contextMenu.closed)).subscribe(()=>{this.closeContextMenu()}):this._documentClickObservable.pipe(oe(e=>Se(e)),l(e=>!this._element.nativeElement.contains(e)),c(this.contextMenu.closed)).subscribe(()=>{this.closeContextMenu()})}_handleHover(){this.triggersSubmenu()&&this._parentMenu._hovered().pipe(l(e=>e===this._contextMenuItemInstance&&!e.disabled),Q(0,Y),c(this._destroyed)).subscribe(()=>{this.contextMenu._isAnimating?this.contextMenu._animationDone.pipe(S(1),Q(0,Y),c(this._parentMenu._hovered())).subscribe(()=>this.openContextMenu("mouse")):this.openContextMenu("mouse")})}_getPortal(){return(!this._portal||this._portal.templateRef!==this.contextMenu.templateRef)&&(this._portal=new te(this.contextMenu.templateRef,this._viewContainerRef)),this._portal}static{this.\u0275fac=function(t){return new(t||i)(r(A),r(L),r(K),r(He,8),r(j,10),r(Re,8),r(Ee,10),r(tt),r(G))}}static{this.\u0275dir=T({type:i,selectors:[["","nxContextMenuTriggerFor",""]],hostAttrs:["aria-haspopup","true"],hostVars:1,hostBindings:function(t,n){t&1&&m("mousedown",function(o){return n._handleMousedown(o)})("keydown",function(o){return n._handleKeydown(o)})("click",function(o){return n._handleClick(o)})("contextmenu",function(o){return n._handleRightClick(o)}),t&2&&N("aria-expanded",n.contextMenuOpen||null)},inputs:{contextMenu:[0,"nxContextMenuTriggerFor","contextMenu"],scrollStrategy:"scrollStrategy",contextMenuData:[0,"nxContextMenuTriggerData","contextMenuData"],mode:[0,"nxContextMenuTriggerMode","mode"]},outputs:{contextMenuOpened:"contextMenuOpened",contextMenuClosed:"contextMenuClosed"},exportAs:["nxContextMenuTrigger"]})}}return i})();var jt=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=he({type:i})}static{this.\u0275inj=ce({imports:[ve,Pe,ne,j]})}}return i})();export{Ge as a,j as b,Et as c,$e as d,He as e,At as f,tt as g,Ft as h,jt as i};