import{c as _e}from"./chunk-J2PQRSHM.js";import{g as de,m as ve,p as O,s as fe}from"./chunk-LJK2GACP.js";import{a as he}from"./chunk-T5NYCE37.js";import{c as ge,e as j}from"./chunk-V5XCZUGO.js";import{m as ce,q as pe}from"./chunk-2EQ73B6L.js";import{i as le}from"./chunk-G3FDH6OQ.js";import{a as ae}from"./chunk-TGA3OXY4.js";import{a as f}from"./chunk-APNBV455.js";import{l as ie,p as re,q as se,z as ne}from"./chunk-CCSED5RY.js";import{Aa as g,Ac as ee,Ba as u,Db as U,Ec as te,Fc as oe,Gc as A,Hc as B,I as T,Ka as b,La as H,Lb as Z,Mb as G,Nb as I,Oa as K,Rb as D,a as n,ac as w,b as S,ba as l,bc as m,ed as L,gc as E,j as d,ja as z,ka as Q,lc as y,ma as M,mc as F,nc as V,pa as q,qc as J,rc as N,wb as v,wc as P,x as Y,xb as s,yc as p,zb as C,zc as $}from"./chunk-LG2ZA55B.js";var Pe=["*"];function Oe(o,X){if(o&1&&V(0,"div",2),o&2){let e=p(2);m("ngStyle",e.arrowStyle)}}function ke(o,X){if(o&1){let e=N();y(0,"span",6),P("click",function(){g(e);let i=p(2);return u(i.emitCloseButtonClick())})("keyup",function(i){g(e);let r=p(2);return u(r._onCloseKeyup(i))})("keydown",function(i){g(e);let r=p(2);return u(r._onCloseKeydown(i))}),V(1,"nx-icon",7),F()}if(o&2){let e=p(2);w("aria-label",e._intl.closeIconLabel)}}function Re(o,X){if(o&1){let e=N();y(0,"div",0),P("click",function(i){g(e);let r=p();return u(r._onClick(i))}),y(1,"div",1),D(2,Oe,1,1,"div",2)(3,ke,2,1,"span",3),y(4,"span",4),ee(5),J(6,5),F()()()}if(o&2){let e,t=p();m("ngClass",t.classList),v(),w("tabindex",t.tabIndex),v(),E(t.hidePopoverArrow?-1:2),v(),E(t.showCloseButton?3:-1),v(),m("id",t.id),v(2),m("ngTemplateOutlet",(e=t._lazyContent==null?null:t._lazyContent._template)!==null&&e!==void 0?e:null)}}var Se=(()=>{class o{constructor(e){this._template=e}static{this.\u0275fac=function(t){return new(t||o)(s(C))}}static{this.\u0275dir=I({type:o,selectors:[["ng-template","nxPopoverContent",""]]})}}return o})(),Te=(()=>{class o{constructor(){this.changes=new d,this.closeIconLabel="close"}static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275prov=z({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})(),Me=(()=>{class o{set tabIndex(e){this._tabIndex=e}get tabIndex(){return this.triggerType==="manual"?this._tabIndex:this.triggerType==="hover"?null:0}constructor(e,t){this._intl=e,this._cdr=t,this.closed=new b,this.closeButtonClick=new d,this.hidePopoverArrow=!1,this.showCloseButton=!1,this.triggerType="click",this._tabIndex=0,this.arrowStyle={},this._destroyed=new d}ngOnInit(){this._intl.changes.pipe(l(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.closed.complete()}emitCloseButtonClick(){this.closeButtonClick.next()}_onCloseKeyup(e){e&&(e.keyCode===13||e.keyCode===32)&&this.emitCloseButtonClick(),e.preventDefault()}_onCloseKeydown(e){e.keyCode===32&&e.preventDefault()}emitClosedEvent(){this.closed.emit()}get classList(){return this.direction?`nx-popover--${this.direction}`:""}_onClick(e){e.stopPropagation()}static{this.\u0275fac=function(t){return new(t||o)(s(Te),s(L))}}static{this.\u0275cmp=Z({type:o,selectors:[["nx-popover"]],contentQueries:function(t,i,r){if(t&1&&te(r,Se,5),t&2){let a;A(a=B())&&(i._lazyContent=a.first)}},viewQuery:function(t,i){if(t&1&&oe(C,5),t&2){let r;A(r=B())&&(i.templateRef=r.first)}},outputs:{closed:"closed"},exportAs:["nxPopover"],ngContentSelectors:Pe,decls:1,vars:0,consts:[["role","dialog","aria-hidden","false",1,"nx-popover",3,"click","ngClass"],[1,"nx-popover__content"],[1,"nx-popover__arrow",3,"ngStyle"],["tabindex","0","role","button",1,"nx-popover__close-icon"],[3,"id"],[3,"ngTemplateOutlet"],["tabindex","0","role","button",1,"nx-popover__close-icon",3,"click","keyup","keydown"],["aria-hidden","true","name","close"]],template:function(t,i){t&1&&($(),D(0,Re,7,6,"ng-template"))},dependencies:[ie,re,j,ge,se],styles:[".nx-popover[_ngcontent-%COMP%]{position:relative}.nx-popover__content[_ngcontent-%COMP%]{font-size:var(--popover-content-font-size);line-height:var(--popover-content-line-height);font-weight:var(--popover-content-font-weight);letter-spacing:var(--popover-content-letter-spacing);background-color:var(--popover-background-color);color:var(--popover-text-color);border:1px solid var(--popover-border-color);border-radius:4px;box-shadow:var(--shadow-small);padding:24px 32px;display:block}.nx-popover__content[_ngcontent-%COMP%]:has(.nx-popover__close-icon){padding:24px 48px 24px 32px}.nx-popover__content[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__content[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-popover__close-icon[_ngcontent-%COMP%]{display:flex;position:absolute;top:16px;right:16px;cursor:pointer;font-size:var(--popover-close-icon-size);color:var(--popover-close-icon-color);border-radius:2px}[dir=rtl][_ngcontent-%COMP%]   .nx-popover__close-icon[_ngcontent-%COMP%]{right:auto;left:4px}.nx-popover__close-icon[_ngcontent-%COMP%]:focus{outline:none}.nx-popover__close-icon[_ngcontent-%COMP%]::-moz-focus-inner{border:0}@media screen and (forced-colors: active){.nx-popover__close-icon[_ngcontent-%COMP%]{color:buttonText}}.nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-popover__close-icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.nx-popover__arrow[_ngcontent-%COMP%]{width:12px;height:12px;background-color:inherit;position:absolute;transform:translate(-50%);border-top:1px solid var(--popover-border-color);border-left:1px solid var(--popover-border-color)}.nx-popover--top[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(225deg);bottom:-5px;box-shadow:2px 2px 1px 1px var(--popover-background-color),-2px -2px -4px var(--shadow-small-color)}.nx-popover--right[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(-45deg);left:-5px}.nx-popover--bottom[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translate(-50%) rotate(45deg);top:-5px}.nx-popover--left[_ngcontent-%COMP%]   .nx-popover__arrow[_ngcontent-%COMP%]{transform:translateY(-50%) rotate(135deg);right:-5px}"],changeDetection:0})}}return o})(),Ie=0,k=16,De=new M("nx-popover-scroll-strategy",{providedIn:"root",factory:()=>{let o=q(O);return()=>o.scrollStrategies.close()}});var Ee=new M("popover-default-options",{providedIn:"root",factory:Fe});function Fe(){return{popoverWidth:void 0,popoverMaxWidth:void 0}}function W(o){return Error(`Popover direction "${o}" is invalid.`)}var ht=(()=>{class o{set show(e){e=f(e),this._show!==e&&(this._show=e,this._show?this.popover.templateRef?this.openPopover():setTimeout(()=>{this.openPopover()}):this.closePopover())}get show(){return this._show}set closeable(e){this._closeable=f(e),this.popover&&(this.popover.showCloseButton=this.isCloseable())}get closeable(){return this._closeable}set closeOnClickOutside(e){this._closeOnClickOutside=f(e)}get closeOnClickOutside(){return this._closeOnClickOutside}set hidePopoverArrow(e){this._hidearrow=f(e),this.popover&&(this.popover.hidePopoverArrow=this._hidearrow)}get hidePopoverArrow(){return this._hidearrow}set popoverWidth(e){this._popoverWidth=e}get popoverWidth(){return this._popoverWidth||this._defaultOptions?.popoverWidth}set popoverMaxWidthh(e){this._popoverMaxWidth=e}get popoverMaxWidth(){return this._popoverMaxWidth||this._defaultOptions?.popoverMaxWidth}set modal(e){this._modal=f(e)}get modal(){return this._modal}set scrollStrategy(e){this.#e!==e&&(this.#e=e,this._scrollStrategyFactory=e?this.getScrollStrategyFactory(e):this._defaultScrollStrategyFactory,this._cdr.markForCheck())}get scrollStrategy(){return this.#e}#e;constructor(e,t,i,r,a,h,_,x,me,ye,xe,be,Ce){this.overlay=e,this.elementRef=t,this.viewContainerRef=i,this.eventManager=r,this._focusTrapFactory=a,this._focusMonitor=h,this._ngZone=_,this._platform=x,this._dir=me,this._defaultOptions=ye,this._defaultScrollStrategyFactory=xe,this._cdr=be,this._triggerButton=Ce,this._overlayDestroyed=new d,this._elementFocusedBeforePopoverWasOpened=null,this._manualListeners=new Map,this._possiblePopoverDirections=["bottom","top","left","right"],this.closeOnLeftViewport=typeof globalThis.IntersectionObserver<"u"?new IntersectionObserver(c=>{c.forEach(R=>{R.isIntersecting||this._ngZone.run(()=>this.overlayRef?.detach()),this.closeOnLeftViewport.disconnect()})},{threshold:.2}):void 0,this.id="nx-popover-"+Ie++,this.changeShow=new b,this._show=!1,this._closeable=null,this._closeOnClickOutside=!0,this._hidearrow=null,this.direction="right",this.popoverInitialVisible=!1,this.visibleChange=new b,this._modal=!1,this.trigger="click",this._destroyed=new d,this._scrollStrategyFactory=this._defaultScrollStrategyFactory,!this._platform.IOS&&!this._platform.ANDROID?this._manualListeners.set("mouseenter",()=>{this.trigger==="hover"&&(this.show=!0)}).set("mouseleave",()=>{this.trigger==="hover"&&(this.show=!1)}).set("keydown",c=>{switch(c.keyCode){case 32:c?.target?.tagName!=="BUTTON"&&c?.preventDefault(),this.handleClick();break;case 13:c?.preventDefault(),this.handleClick();break;case 9:this.trigger==="hover"&&(this.show=!this.isOpen);break;default:}}):this._manualListeners.set("touchstart",()=>{this.trigger==="hover"&&(this.show=!0)}),this._manualListeners.forEach((c,R)=>this.elementRef.nativeElement.addEventListener(R,c)),this._dir?.change.pipe(l(this._destroyed)).subscribe(this._dirChangeHandler.bind(this))}ngAfterViewInit(){this._focusMonitor.monitor(this.elementRef.nativeElement,!0).pipe(l(this._destroyed)).subscribe(e=>{e==="keyboard"&&this.trigger==="hover"&&this._ngZone.run(()=>this.show=!0)}),this.popover.id=this.id,this.popover.closeButtonClick.pipe(l(this._destroyed)).subscribe(()=>{this.show=!1}),(this.popoverInitialVisible||this._show)&&(this.show=!0)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.show=!1,this._focusMonitor.stopMonitoring(this.elementRef.nativeElement),this._manualListeners.forEach((e,t)=>{this.elementRef.nativeElement.removeEventListener(t,e)}),this.overlayRef&&this.overlayRef.dispose(),this._manualListeners.clear(),this._overlayDestroyed.next(),this._overlayDestroyed.complete()}get isOpen(){return this.overlayRef&&this.createOverlay().hasAttached()}isCloseable(){return this.trigger==="click"&&this._closeable===null||!!this._closeable&&this.trigger!=="hover"}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}handleClick(){this.trigger==="click"?this.show=!this.isOpen:this.trigger==="hover"&&(this.show=!0)}open(){this.show=!0}close(){this.show=!1}toggle(){this.show=!this.show}openPopover(){if(!this.createOverlay().hasAttached()&&(this.setPopoverProperties(),this._embeddedViewRef=this.createOverlay().attach(this.portal),this.trigger!=="hover")){if(this._triggerButton){let i=this._triggerButton;i.setTriggerActive(),this._embeddedViewRef.onDestroy(()=>i.setTriggerInactive())}let e=this.getPopoverContainer();this._focusTrap=this._focusTrapFactory.create(e),this._elementFocusedBeforePopoverWasOpened=this.elementRef.nativeElement,this._focusMonitor.monitor(e.querySelector(".nx-popover__content"));let t=e.querySelector(".nx-popover__close-icon");t&&this._focusMonitor.monitor(t),setTimeout(()=>{this._autoFocusFirstTabbableElement(e)}),this.closeOnClickOutside&&this.waitForClose()}}setPopoverProperties(){this.popover.triggerType=this.trigger,this.popover.showCloseButton=this.isCloseable()}_autoFocusFirstTabbableElement(e){this._focusTrap.focusInitialElementWhenReady().then(t=>{t||e.focus()})}closePopover(){if(this.overlayRef.hasAttached()){if(this.trigger!=="hover"){let e=this.getPopoverContainer();this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__content")),this._focusMonitor.stopMonitoring(e.querySelector(".nx-popover__close-icon")),setTimeout(()=>{this._returnFocusAfterPopover()})}this.overlayRef.detach(),this._embeddedViewRef=null,this._focusTrap&&this._focusTrap.destroy()}}getScrollStrategyFactory(e){switch(e){case"reposition":return this.overlay.scrollStrategies.reposition;default:return this.overlay.scrollStrategies.close}}createOverlay(){if(!this.overlayRef){this.portal=new de(this.popover.templateRef,this.viewContainerRef);let e=new ve;e.width=this.popoverWidth,e.maxWidth=this.popoverMaxWidth,e.positionStrategy=this.getPosition(),this._positionStrategy=e.positionStrategy,e.scrollStrategy=this._scrollStrategyFactory(),e.scrollStrategy.enable(),e.direction=this._dir?.value||"ltr",this._modal&&(e.hasBackdrop=!0),this.overlayRef=this.overlay.create(e),this.subscribeToPositions(e.positionStrategy),this._subscribeToAttach(),this._subscribeToDetach(),this._subscribeToKeypress(),this._modal&&this._closeOnClickOutside&&this._subscribeToBackdropClick()}return this.overlayRef}subscribeToPositions(e){e.positionChanges.pipe(l(this._overlayDestroyed)).subscribe(t=>{let i=t.connectionPair;this.positionOverlay(i),this.positionArrow(i),this.closeOnLeftViewport?.observe(this.elementRef.nativeElement),this._embeddedViewRef&&!this._embeddedViewRef.destroyed&&this._embeddedViewRef.detectChanges()})}_subscribeToBackdropClick(){this.overlayRef.backdropClick().pipe(l(this._overlayDestroyed)).subscribe(e=>{this.show=!1})}_subscribeToDetach(){this.overlayRef.detachments().pipe(l(this._overlayDestroyed)).subscribe(e=>{this.show&&(this.show=!1),this.changeShow.emit(this._show),this.popover.emitClosedEvent()})}_subscribeToAttach(){this.overlayRef.attachments().pipe(l(this._overlayDestroyed)).subscribe(e=>{this.changeShow.emit(this._show)})}_subscribeToKeypress(){this.overlayRef.keydownEvents().pipe(T(e=>e.keyCode===27),l(this._overlayDestroyed)).subscribe(e=>{this.isOpen&&(this.show=!1)})}waitForClose(){return this.overlayRef.outsidePointerEvents().pipe(Y(e=>e.target),T(e=>!this.elementRef.nativeElement.contains(e)),l(this.popover.closed)).subscribe(()=>{this.show=!1})}positionOverlay(e){e.originX==="end"&&e.overlayX==="start"?this.popover.direction=this.isRtl?"left":"right":e.originY==="bottom"&&e.overlayY==="top"?this.popover.direction="bottom":e.originX==="start"&&e.overlayX==="end"?this.popover.direction=this.isRtl?"right":"left":e.originY==="top"&&e.overlayY==="bottom"&&(this.popover.direction="top")}positionArrow(e){let t=this.elementRef.nativeElement.getBoundingClientRect().left,i=this.elementRef.nativeElement.getBoundingClientRect().width/2,r=this.overlayRef.overlayElement.parentElement.offsetLeft,a=this.overlayRef.overlayElement.offsetLeft,h=t+i-(r+a);if(e.originX===e.overlayX){let _="left",x={left:"0"};x[_]=h+"px",this.popover.arrowStyle=x}(e.originY==="bottom"||e.originY==="top")&&e.overlayX==="center"&&(this.popover.arrowStyle={left:h+"px"}),(e.originX==="end"||e.originX==="start")&&e.overlayY==="center"&&(this.popover.arrowStyle={top:"50%"})}getPosition(){let e=this._getOrigin(this.direction),t=this._getOverlayPosition(this.direction),i=this._getOffset(this.direction),r=this._getFallbackPositions(this.direction);return this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([n(n(n({},e),t),i),...r]).withFlexibleDimensions(!1)}_returnFocusAfterPopover(){let e=this._elementFocusedBeforePopoverWasOpened;e&&typeof e.focus=="function"&&e.focus()}getPopoverContainer(){return this.overlayRef.overlayElement.querySelector(".nx-popover")}_getOrigin(e){switch(e){case"top":case"bottom":return{originX:"center",originY:e};case"left":return{originX:this.isRtl?"end":"start",originY:"center"};case"right":return{originX:this.isRtl?"start":"end",originY:"center"};default:throw W(e)}}_getOverlayPosition(e){switch(e){case"top":case"bottom":return{overlayX:"center",overlayY:this._getInversePosition(e)};case"left":return{overlayX:this.isRtl?"start":"end",overlayY:"center"};case"right":return{overlayX:this.isRtl?"end":"start",overlayY:"center"};default:throw W(e)}}_getOffset(e){switch(e){case"top":return{offsetY:k*-1};case"bottom":return{offsetY:k};case"left":return{offsetX:k*-1};case"right":return{offsetX:k};default:throw W(e)}}_getInversePopoverDirection(e){return{top:"bottom",right:"left",bottom:"top",left:"right"}[e]}_getInversePosition(e){return{top:"bottom",bottom:"top",start:"end",end:"start",center:"center"}[e]}_getFallbackPositions(e,t=this._possiblePopoverDirections){if(!e)return[];let i=t.filter(_=>_!==e),r=[];switch(e){case"top":case"bottom":{r=this._getVerticalFallbackPositionPairs(e);break}case"left":case"right":{r=this._getHorizontalFallbackPositionPairs(e);break}}let a=this._getInversePopoverDirection(e),h=i.includes(a)?a:t[0];return[...r,...this._getFallbackPositions(h,i)]}_getVerticalFallbackPositionPairs(e){let t=e===this.direction,i=[],r=n(n(n({},this._getOrigin(e)),this._getOverlayPosition(e)),this._getOffset(e));return t||i.push(r),i.push(S(n({},r),{originX:"start",overlayX:"start"}),S(n({},r),{originX:"end",overlayX:"end"})),i}_getHorizontalFallbackPositionPairs(e){let t=this._getOffset(e);return[n(n(n({},this._getOrigin(e)),this._getOverlayPosition(e)),t)]}_dirChangeHandler(){this.overlayRef&&(this.closePopover(),this.overlayRef.dispose(),this.overlayRef=null,this._overlayDestroyed.next())}get isRtl(){return this._dir?.value==="rtl"}static{this.\u0275fac=function(t){return new(t||o)(s(O),s(K),s(U),s(le),s(ce),s(pe),s(H),s(ae),s(he,8),s(Ee,8),s(De),s(L),s(_e,10))}}static{this.\u0275dir=I({type:o,selectors:[["","nxPopoverTriggerFor",""]],hostAttrs:["aria-haspopup","dialog"],hostVars:2,hostBindings:function(t,i){t&1&&P("click",function(){return i.handleClick()}),t&2&&w("aria-expanded",i.isOpen)("aria-describedby",i.isOpen?i.id:null)},inputs:{show:[0,"nxPopoverShow","show"],closeable:[0,"nxPopoverCloseable","closeable"],closeOnClickOutside:"closeOnClickOutside",hidePopoverArrow:"hidePopoverArrow",popoverWidth:[0,"nxPopoverWidth","popoverWidth"],popoverMaxWidthh:[0,"nxPopoverMaxWidth","popoverMaxWidthh"],popover:[0,"nxPopoverTriggerFor","popover"],direction:[0,"nxPopoverDirection","direction"],popoverInitialVisible:[0,"nxPopoverInitialVisible","popoverInitialVisible"],visibleChange:[0,"nxPopoverVisibleChange","visibleChange"],modal:[0,"nxPopoverModal","modal"],trigger:[0,"nxPopoverTrigger","trigger"],scrollStrategy:[0,"nxPopoverScrollStrategy","scrollStrategy"]},outputs:{changeShow:"nxPopoverShowChange"},exportAs:["nxPopoverTrigger"]})}}return o})(),dt=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=G({type:o})}static{this.\u0275inj=Q({imports:[ne,fe,j,Me]})}}return o})();export{Se as a,Te as b,Me as c,De as d,Ee as e,ht as f,dt as g};
