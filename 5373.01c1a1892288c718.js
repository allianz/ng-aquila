"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[5373],{5373:(Z,D,n)=>{n.d(D,{Fc:()=>Q,NE:()=>V,XO:()=>f,_r:()=>C,iP:()=>b,xY:()=>M});var p=n(9521),t=n(4650),_=n(8929),a=n(7625),S=n(4850),T=n(2198),v=n(6895),E=n(9195),y=n(8184),m=n(655),d=n(1281),I=n(4080),F=n(1481),R=n(2693),L=n(3353),A=n(445);function B(s,e){if(1&s&&t._UZ(0,"div",6),2&s){const o=t.oxw(2);t.Q6J("ngStyle",o.arrowStyle)}}function Y(s,e){if(1&s){const o=t.EpF();t.TgZ(0,"span",7),t.NdJ("click",function(){t.CHM(o);const r=t.oxw(2);return t.KtG(r.emitCloseButtonClick())})("keyup",function(r){t.CHM(o);const l=t.oxw(2);return t.KtG(l._onCloseKeyup(r))}),t._UZ(1,"nx-icon",8),t.qZA()}if(2&s){const o=t.oxw(2);t.uIk("aria-label",o._intl.closeIconLabel)}}function N(s,e){if(1&s){const o=t.EpF();t.TgZ(0,"div",0),t.NdJ("click",function(r){t.CHM(o);const l=t.oxw();return t.KtG(l._onClick(r))}),t.TgZ(1,"div",1),t.YNc(2,B,1,1,"div",2),t.YNc(3,Y,2,1,"span",3),t.TgZ(4,"span",4),t.Hsn(5),t.GkF(6,5),t.qZA()()()}if(2&s){const o=t.oxw();let i;t.Q6J("ngClass",o.classList),t.xp6(2),t.Q6J("ngIf",!o.hidePopoverArrow),t.xp6(1),t.Q6J("ngIf",o.showCloseButton),t.xp6(1),t.Q6J("id",o.id),t.xp6(2),t.Q6J("ngTemplateOutlet",null!==(i=null==o._lazyContent?null:o._lazyContent._template)&&void 0!==i?i:null)}}const X=["*"];let M=(()=>{class s{constructor(o){this._template=o}}return s.\u0275fac=function(o){return new(o||s)(t.Y36(t.Rgc))},s.\u0275dir=t.lG2({type:s,selectors:[["ng-template","nxPopoverContent",""]]}),s})(),b=(()=>{class s{constructor(){this.changes=new _.xQ,this.closeIconLabel="close"}}return s.\u0275fac=function(o){return new(o||s)},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})(),V=(()=>{class s{constructor(o,i){this._intl=o,this._cdr=i,this.closed=new t.vpe,this.closeButtonClick=new _.xQ,this.hidePopoverArrow=!1,this.showCloseButton=!1,this.arrowStyle={},this._destroyed=new _.xQ}ngOnInit(){this._intl.changes.pipe((0,a.R)(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.closed.complete()}emitCloseButtonClick(){this.closeButtonClick.next()}_onCloseKeyup(o){o&&(o.keyCode===p.K5||o.keyCode===p.L_)&&this.emitCloseButtonClick(),o.preventDefault()}emitClosedEvent(){this.closed.emit()}get classList(){return this.direction?`nx-popover--${this.direction}`:""}_onClick(o){o.stopPropagation()}}return s.\u0275fac=function(o){return new(o||s)(t.Y36(b),t.Y36(t.sBO))},s.\u0275cmp=t.Xpm({type:s,selectors:[["nx-popover"]],contentQueries:function(o,i,r){if(1&o&&t.Suo(r,M,5),2&o){let l;t.iGM(l=t.CRH())&&(i._lazyContent=l.first)}},viewQuery:function(o,i){if(1&o&&t.Gf(t.Rgc,5),2&o){let r;t.iGM(r=t.CRH())&&(i.templateRef=r.first)}},outputs:{closed:"nxClosed"},exportAs:["nxPopover"],ngContentSelectors:X,decls:1,vars:0,consts:[["role","tooltip","aria-hidden","false",1,"nx-popover",3,"ngClass","click"],[1,"nx-popover__content"],["class","nx-popover__arrow",3,"ngStyle",4,"ngIf"],["tabindex","0","role","button","class","nx-popover__close-icon",3,"click","keyup",4,"ngIf"],[3,"id"],[3,"ngTemplateOutlet"],[1,"nx-popover__arrow",3,"ngStyle"],["tabindex","0","role","button",1,"nx-popover__close-icon",3,"click","keyup"],["aria-hidden","true","name","close"]],template:function(o,i){1&o&&(t.F$t(),t.YNc(0,N,7,5,"ng-template"))},dependencies:[v.mk,v.O5,v.tP,v.PC,E.O8],styles:[".nx-popover__content[_ngcontent-%COMP%]{font-size:var(--popover-content-font-size);line-height:var(--popover-content-line-height);font-weight:var(--popover-content-font-weight);letter-spacing:var(--popover-content-letter-spacing);background-color:var(--popover-background-color);color:var(--popover-text-color);border:1px solid var(--popover-border-color);border-radius:4px;box-shadow:var(--shadow-small);padding:23px;display:block}.nx-popover__content[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__content[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-popover__close-icon[_ngcontent-%COMP%]{display:flex;position:absolute;top:16px;right:16px;cursor:pointer;font-size:var(--popover-close-icon-size);color:var(--popover-close-icon-color);border-radius:2px}[dir=rtl][_ngcontent-%COMP%]   .nx-popover__close-icon[_ngcontent-%COMP%]{right:auto;left:4px}.nx-popover__close-icon[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__close-icon[_ngcontent-%COMP%]::-moz-focus-inner{border:0}@media screen and (forced-colors: active){.nx-popover__close-icon[_ngcontent-%COMP%]{color:buttonText}}.nx-popover__content.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-popover__content.cdk-keyboard-focused[_ngcontent-%COMP%], .nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.nx-popover__arrow[_ngcontent-%COMP%]{width:12px;height:12px;background-color:inherit;position:absolute;transform:translate(-50%);border-top:1px solid var(--popover-border-color);border-left:1px solid var(--popover-border-color)}.nx-popover--top[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(225deg);bottom:-5px;box-shadow:2px 2px 1px 1px var(--popover-background-color),-2px -2px -4px var(--shadow-small-color)}.nx-popover--right[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(-45deg);left:-5px}.nx-popover--bottom[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(45deg);top:-5px}.nx-popover--left[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(135deg);right:-5px}"],changeDetection:0}),s})();var g;let K=0;const C=new t.OlP("nx-popover-scroll-strategy"),U={provide:C,useFactory:function W(s){return()=>s.scrollStrategies.close()},deps:[y.aV]};function O(s){return Error(`Popover direction "${s}" is invalid.`)}class f{constructor(e,o,i,r,l,h,u,x,z,H,G){this.overlay=e,this.elementRef=o,this.viewContainerRef=i,this.eventManager=r,this._focusTrapFactory=l,this._focusMonitor=h,this._ngZone=u,this._platform=x,this._dir=z,this._defaultScrollStrategyFactory=H,this._cdr=G,this._overlayDestroyed=new _.xQ,this._elementFocusedBeforePopoverWasOpened=null,this._manualListeners=new Map,this._possiblePopoverDirections=["bottom","top","left","right"],this.closeOnLeftViewport=new IntersectionObserver(c=>{c.forEach(w=>{w.isIntersecting||this._ngZone.run(()=>this.overlayRef?.detach()),this.closeOnLeftViewport.disconnect()})},{threshold:.2}),this.id="nx-popover-"+K++,this.changeShow=new t.vpe,this._show=!1,this._closeable=null,this._closeOnClickOutside=!0,this._hidearrow=null,this.direction="right",this.popoverInitialVisible=!1,this.visibleChange=new t.vpe,this._modal=!1,this.trigger="click",g.set(this,void 0),this._destroyed=new _.xQ,this._scrollStrategyFactory=this._defaultScrollStrategyFactory;const k=o.nativeElement;this._platform.IOS||this._platform.ANDROID?this._manualListeners.set("touchstart",()=>{"hover"===this.trigger&&(this.show=!0)}):this._manualListeners.set("mouseenter",()=>{"hover"===this.trigger&&(this.show=!0)}).set("mouseleave",()=>{"hover"===this.trigger&&(this.show=!1)}).set("keydown",c=>{switch(c.keyCode){case p.L_:case p.K5:this.handleClick();break;case p.Mf:"hover"===this.trigger&&(this.show=!this.isOpen)}}),this._manualListeners.forEach((c,w)=>k.addEventListener(w,c)),this._focusMonitor.monitor(k).pipe((0,a.R)(this._destroyed)).subscribe(c=>{"keyboard"===c&&"hover"===this.trigger&&this._ngZone.run(()=>this.show=!0)}),this._dir?.change.pipe((0,a.R)(this._destroyed)).subscribe(this._dirChangeHandler.bind(this))}set show(e){e=(0,d.Ig)(e),this._show!==e&&(this._show=e,this._show?this.openPopover():this.closePopover())}get show(){return this._show}set closeable(e){this._closeable=(0,d.Ig)(e),this.popover&&(this.popover.showCloseButton=this.isCloseable())}get closeable(){return this._closeable}set closeOnClickOutside(e){this._closeOnClickOutside=(0,d.Ig)(e)}get closeOnClickOutside(){return this._closeOnClickOutside}set hidePopoverArrow(e){this._hidearrow=(0,d.Ig)(e),this.popover&&(this.popover.hidePopoverArrow=this._hidearrow)}get hidePopoverArrow(){return this._hidearrow}set modal(e){this._modal=(0,d.Ig)(e)}get modal(){return this._modal}set scrollStrategy(e){(0,m.Q_)(this,g,"f")!==e&&((0,m.YH)(this,g,e,"f"),this._scrollStrategyFactory=e?this.getScrollStrategyFactory(e):this._defaultScrollStrategyFactory,this._cdr.markForCheck())}get scrollStrategy(){return(0,m.Q_)(this,g,"f")}ngOnInit(){this.popover.showCloseButton=this.isCloseable()}ngAfterViewInit(){this.popover.id=this.id,this._removeEventListener=this.eventManager.addGlobalEventListener("window","keyup.esc",()=>{this.isOpen&&(this.show=!1)}),this.popover.closeButtonClick.pipe((0,a.R)(this._destroyed)).subscribe(()=>{this.show=!1}),(this.popoverInitialVisible||this._show)&&(this.show=!0)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.show=!1,this._removeEventListener(),this._focusMonitor.stopMonitoring(this.elementRef.nativeElement),this._manualListeners.forEach((e,o)=>{this.elementRef.nativeElement.removeEventListener(o,e)}),this.overlayRef&&this.overlayRef.dispose(),this._manualListeners.clear(),this._overlayDestroyed.next(),this._overlayDestroyed.complete()}get isOpen(){return this.overlayRef&&this.createOverlay().hasAttached()}isCloseable(){return"click"===this.trigger&&null===this._closeable||!!this._closeable}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}handleClick(){"click"===this.trigger?this.show=!this.isOpen:"hover"===this.trigger&&(this.show=!0)}open(){this.show=!0}close(){this.show=!1}toggle(){this.show=!this.show}openPopover(){if(!this.createOverlay().hasAttached()){this._embeddedViewRef=this.createOverlay().attach(this.portal);const e=this.getPopoverContainer();this._focusTrap=this._focusTrapFactory.create(e),this._elementFocusedBeforePopoverWasOpened=this.elementRef.nativeElement,this._focusMonitor.monitor(e.querySelector(".nx-popover__content"));const o=e.querySelector(".nx-popover__close-icon");o&&this._focusMonitor.monitor(o),this._autoFocusFirstTabbableElement(e),this.closeOnClickOutside&&this.waitForClose()}}_autoFocusFirstTabbableElement(e){this._focusTrap.focusInitialElementWhenReady().then(o=>{o||e.focus()})}closePopover(){if(this.overlayRef.hasAttached()){const e=this.getPopoverContainer();this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__content")),this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__close-icon")),this._returnFocusAfterPopover(),this.overlayRef.detach(),this._embeddedViewRef=null,this._focusTrap.destroy()}}getScrollStrategyFactory(e){return"reposition"===e?this.overlay.scrollStrategies.reposition:this.overlay.scrollStrategies.close}createOverlay(){if(!this.overlayRef){this.portal=new I.UE(this.popover.templateRef,this.viewContainerRef);const e=new y.X_;e.positionStrategy=this.getPosition(),this._positionStrategy=e.positionStrategy,e.scrollStrategy=this._scrollStrategyFactory(),e.scrollStrategy.enable(),e.direction=this._dir?.value||"ltr",this._modal&&(e.hasBackdrop=!0),this.overlayRef=this.overlay.create(e),this.subscribeToPositions(e.positionStrategy),this._subscribeToAttach(),this._subscribeToDetach(),this._modal&&this._closeOnClickOutside&&this._subscribeToBackdropClick()}return this.overlayRef}subscribeToPositions(e){e.positionChanges.pipe((0,a.R)(this._overlayDestroyed)).subscribe(o=>{const i=o.connectionPair;this.positionOverlay(i),this.positionArrow(i),this.closeOnLeftViewport.observe(this.elementRef.nativeElement),this._embeddedViewRef&&!this._embeddedViewRef.destroyed&&this._embeddedViewRef.detectChanges()})}_subscribeToBackdropClick(){this.overlayRef.backdropClick().pipe((0,a.R)(this._overlayDestroyed)).subscribe(e=>{this.show=!1})}_subscribeToDetach(){this.overlayRef.detachments().pipe((0,a.R)(this._overlayDestroyed)).subscribe(e=>{this.show&&(this.show=!1),this.changeShow.emit(this._show),this.popover.emitClosedEvent()})}_subscribeToAttach(){this.overlayRef.attachments().pipe((0,a.R)(this._overlayDestroyed)).subscribe(e=>{this.changeShow.emit(this._show)})}waitForClose(){return this.overlayRef.outsidePointerEvents().pipe((0,S.U)(e=>e.target),(0,T.h)(e=>!this.elementRef.nativeElement.contains(e)),(0,a.R)(this.popover.closed)).subscribe(()=>{this.show=!1})}positionOverlay(e){"end"===e.originX&&"start"===e.overlayX?this.popover.direction=this.isRtl?"left":"right":"bottom"===e.originY&&"top"===e.overlayY?this.popover.direction="bottom":"start"===e.originX&&"end"===e.overlayX?this.popover.direction=this.isRtl?"right":"left":"top"===e.originY&&"bottom"===e.overlayY&&(this.popover.direction="top")}positionArrow(e){const h=this.elementRef.nativeElement.getBoundingClientRect().left+this.elementRef.nativeElement.getBoundingClientRect().width/2-(this.overlayRef.overlayElement.parentElement.offsetLeft+this.overlayRef.overlayElement.offsetLeft);if(e.originX===e.overlayX){const x={left:"0"};x.left=h+"px",this.popover.arrowStyle=x}("bottom"===e.originY||"top"===e.originY)&&"center"===e.overlayX&&(this.popover.arrowStyle={left:h+"px"}),("end"===e.originX||"start"===e.originX)&&"center"===e.overlayY&&(this.popover.arrowStyle={top:"50%"})}getPosition(){const e=this._getOrigin(this.direction),o=this._getOverlayPosition(this.direction),i=this._getOffset(this.direction),r=this._getFallbackPositions(this.direction);return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([{...e,...o,...i},...r]).withFlexibleDimensions(!1)}_returnFocusAfterPopover(){const e=this._elementFocusedBeforePopoverWasOpened;e&&"function"==typeof e.focus&&e.focus()}getPopoverContainer(){return this.overlayRef.overlayElement.querySelector(".nx-popover")}_getOrigin(e){switch(e){case"top":case"bottom":return{originX:"center",originY:e};case"left":return{originX:this.isRtl?"end":"start",originY:"center"};case"right":return{originX:this.isRtl?"start":"end",originY:"center"};default:throw O(e)}}_getOverlayPosition(e){switch(e){case"top":case"bottom":return{overlayX:"center",overlayY:this._getInversePosition(e)};case"left":return{overlayX:this.isRtl?"start":"end",overlayY:"center"};case"right":return{overlayX:this.isRtl?"end":"start",overlayY:"center"};default:throw O(e)}}_getOffset(e){switch(e){case"top":return{offsetY:-16};case"bottom":return{offsetY:16};case"left":return{offsetX:-16};case"right":return{offsetX:16};default:throw O(e)}}_getInversePopoverDirection(e){return{top:"bottom",right:"left",bottom:"top",left:"right"}[e]}_getInversePosition(e){return{top:"bottom",bottom:"top",start:"end",end:"start",center:"center"}[e]}_getFallbackPositions(e,o=this._possiblePopoverDirections){if(!e)return[];const i=o.filter(u=>u!==e);let r=[];switch(e){case"top":case"bottom":r=this._getVerticalFallbackPositionPairs(e);break;case"left":case"right":r=this._getHorizontalFallbackPositionPairs(e)}const l=this._getInversePopoverDirection(e),h=i.includes(l)?l:o[0];return[...r,...this._getFallbackPositions(h,i)]}_getVerticalFallbackPositionPairs(e){const o=e===this.direction,i=[],r={...this._getOrigin(e),...this._getOverlayPosition(e),...this._getOffset(e)};return o||i.push(r),i.push({...r,originX:"start",overlayX:"start"},{...r,originX:"end",overlayX:"end"}),i}_getHorizontalFallbackPositionPairs(e){const o=this._getOffset(e);return[{...this._getOrigin(e),...this._getOverlayPosition(e),...o}]}_dirChangeHandler(){this.overlayRef&&(this.closePopover(),this.overlayRef.dispose(),this.overlayRef=null,this._overlayDestroyed.next())}get isRtl(){return"rtl"===this._dir?.value}}g=new WeakMap,f.\u0275fac=function(e){return new(e||f)(t.Y36(y.aV),t.Y36(t.SBq),t.Y36(t.s_b),t.Y36(F.Qz),t.Y36(R.vO),t.Y36(R.tE),t.Y36(t.R0b),t.Y36(L.t4),t.Y36(A.Is,8),t.Y36(C),t.Y36(t.sBO))},f.\u0275dir=t.lG2({type:f,selectors:[["","nxPopoverTriggerFor",""]],hostAttrs:["aria-haspopup","true"],hostVars:2,hostBindings:function(e,o){1&e&&t.NdJ("click",function(){return o.handleClick()}),2&e&&t.uIk("aria-expanded",o.isOpen)("aria-describedby",o.isOpen?o.id:null)},inputs:{show:["nxPopoverShow","show"],closeable:["nxPopoverCloseable","closeable"],closeOnClickOutside:"closeOnClickOutside",hidePopoverArrow:"hidePopoverArrow",popover:["nxPopoverTriggerFor","popover"],direction:["nxPopoverDirection","direction"],popoverInitialVisible:["nxPopoverInitialVisible","popoverInitialVisible"],visibleChange:["nxPopoverVisibleChange","visibleChange"],modal:["nxPopoverModal","modal"],trigger:["nxPopoverTrigger","trigger"],scrollStrategy:["nxPopoverScrollStrategy","scrollStrategy"]},outputs:{changeShow:"nxPopoverShowChange"},exportAs:["nxPopoverTrigger"]});let Q=(()=>{class s{}return s.\u0275fac=function(o){return new(o||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[b,U],imports:[v.ez,y.U8,E.cf]}),s})()}}]);