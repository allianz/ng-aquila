import{f as U}from"./chunk-YTCTFNBM.js";import{c as G,g as J}from"./chunk-L4YGPXWT.js";import{h as $}from"./chunk-TCGB2MEV.js";import{b as q,c as X}from"./chunk-BQY6EDXJ.js";import{s as Z}from"./chunk-JQRF2ONG.js";import{g as A,m as H,o as V,p as Y}from"./chunk-MQ3MCZLV.js";import{a as L}from"./chunk-VTTX4ZNP.js";import{B as k,o as B}from"./chunk-GHZ7IFWX.js";import{Ab as D,Cb as I,Eb as W,L as y,Nb as N,Pb as j,Qb as F,Ra as E,Rb as w,S as P,Vb as p,Wb as c,Wc as x,ca as b,ea as l,ec as T,ha as O,hc as C,ic as u,mc as m,n as g,na as M,nc as Q,oc as h,pb as v,pc as d,tb as S,ub as a,xa as z,ya as _,za as R}from"./chunk-O56WLCF2.js";var ee=["popover"],te=[[["nx-dropdown"]],[["","nxError",""]],[["","nxInput",""]]],ne=["nx-dropdown","[nxError]","[nxInput]"];function oe(s,o){s&1&&(p(0,"div",2),u(1,2),c())}var re=["*"],ie=(()=>{let o=class o{constructor(t,n,e,i,r,f){this.elementRef=t,this._cdr=n,this._renderer=e,this._overlay=i,this._viewContainerRef=r,this._overlayPositionBuilder=f,this.inputChanges=new g,this._hasErrors=!1,this.currentTextWidth=0,this.size="regular",this.label="",this._destroyed=new g}ngOnInit(){this.setupErrorPopover()}ngAfterContentInit(){this._validateControlChild(),this._control.stateChanges.pipe(b(null),l(this._destroyed)).subscribe(()=>{this._hasErrors=this._control.errorState,this.updateErrorPopoverState(),this._cdr.markForCheck()}),this._control.ngControl?this._control.ngControl.valueChanges.pipe(l(this._destroyed)).subscribe(t=>{this.updateCurrentTextWidth(),this.inputChanges.next()}):this._control.stateChanges.pipe(l(this._destroyed)).subscribe(t=>{this.updateCurrentTextWidth(),this.inputChanges.next()}),this._control.setAriaLabel(this.label)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._overlayRef&&this._overlayRef.dispose()}updateCurrentTextWidth(){this.measureCanvas||(this.measureCanvas=this._renderer.createElement("canvas"));let t=this.measureCanvas.getContext("2d");if(!t)return;let n=this._control.elementRef,e=window.getComputedStyle(n.nativeElement);t.font=Z(e);let r=t.measureText(this._control.value).width+parseInt(e.paddingRight,10)+parseInt(e.paddingLeft,10)+1,K=this.elementRef.nativeElement.parentElement.getBoundingClientRect();this.currentTextWidth=Math.max(parseInt(e.minWidth,10),r),this.currentTextWidth=Math.min(this.currentTextWidth,K.width),this._overlayRef.hasAttached()&&this._overlayState.positionStrategy.apply()}repositionError(){this._overlayRef.hasAttached()&&this._overlayState.positionStrategy.apply()}_validateControlChild(){if(!this._control)throw new Error("NxWordComponent requires an NxFormfieldControl compatible input.")}getConnectedOverlayOrigin(){return this.elementRef}get isFocused(){return this._control.focused}get isFilled(){return!this._control.empty}get hasDropdown(){return!!this._dropdown}updateErrorPopoverState(){this._hasErrors&&this._errorChildren.length>0?this.showPopover():this.hidePopover()}setupErrorPopover(){let t=this._overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withLockedPosition(!0).withFlexibleDimensions(!1).withPush(!0).withPositions([{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom"},{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top"}]).withDefaultOffsetY(-8);this._overlayState=new H,this._overlayState.positionStrategy=t,this._overlayState.scrollStrategy=this._overlay.scrollStrategies.reposition(),this._overlayRef=this._overlay.create(this._overlayState),this._overlayState.positionStrategy.positionChanges.pipe(l(this._destroyed)).subscribe(n=>{let e=n.connectionPair;this.positionArrow(e),this._embeddedViewRef&&!this._embeddedViewRef.destroyed&&this._embeddedViewRef.detectChanges()})}positionArrow(t){let n=this.elementRef.nativeElement.getBoundingClientRect().left,e=this.elementRef.nativeElement.getBoundingClientRect().width/2,i=this._overlayRef.overlayElement.parentElement.offsetLeft,r=this._overlayRef.overlayElement.offsetLeft,f=n+e-(i+r);t.originY==="top"&&t.overlayY==="bottom"?this._popover.direction="top":this._popover.direction="bottom",this._popover.arrowStyle={left:f+"px"}}showPopover(){if(!this._overlayRef.hasAttached()){let t=new A(this._popover.templateRef,this._viewContainerRef);this._embeddedViewRef=this._overlayRef.attach(t)}}hidePopover(){this._overlayRef.detach()}};o.\u0275fac=function(n){return new(n||o)(a(E),a(x),a(D),a(Y),a(W),a(V))},o.\u0275cmp=_({type:o,selectors:[["nx-word"]],contentQueries:function(n,e,i){if(n&1&&(m(i,X,5),m(i,U,5),m(i,q,4)),n&2){let r;h(r=d())&&(e._control=r.first),h(r=d())&&(e._dropdown=r.first),h(r=d())&&(e._errorChildren=r)}},viewQuery:function(n,e){if(n&1&&Q(ee,7),n&2){let i;h(i=d())&&(e._popover=i.first)}},hostVars:16,hostBindings:function(n,e){n&2&&(F("width",e.currentTextWidth,"px"),w("size-short",e.size=="short")("size-regular",e.size=="regular")("size-long",e.size=="long")("has-error",e._hasErrors)("is-focused",e.isFocused)("is-filled",e.isFilled)("has-dropdown",e.hasDropdown))},inputs:{size:"size",label:"label"},ngContentSelectors:ne,decls:6,vars:1,consts:[["popover",""],["class","nx-word__inner-wrapper",4,"ngIf"],[1,"nx-word__inner-wrapper"]],template:function(n,e){n&1&&(C(te),p(0,"div"),N(1,oe,2,0,"div",1),u(2),c(),p(3,"nx-popover",null,0),u(5,1),c()),n&2&&(S(),j("ngIf",!e.hasDropdown))},dependencies:[B,G],styles:["[_nghost-%COMP%]{display:inline-block;position:relative;font-weight:400;text-align:center;-webkit-hyphens:none;hyphens:none;width:100%;margin:0 4px}[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:var(--natural-language-form-border-color)}.size-short[_nghost-%COMP%]{min-width:80px}.size-regular[_nghost-%COMP%]{min-width:152px}.size-long[_nghost-%COMP%]{min-width:360px}@media (max-width: 991px){.size-long[_nghost-%COMP%]{min-width:280px}}@media (max-width: 703px){.size-long[_nghost-%COMP%]{min-width:248px}}[_nghost-%COMP%]     .c-input{display:inline-block;text-align:inherit;font-size:inherit;line-height:inherit;background:0 0;color:inherit;border:none;outline:0;margin:0;width:100%;max-width:100%;height:auto;box-shadow:none;padding:0 8px}[_nghost-%COMP%]     .c-input.is-focused{outline:none;box-shadow:none}[_nghost-%COMP%]     .c-input.is-filled, [_nghost-%COMP%]     .c-input.is-focused{color:var(--natural-language-form-active-color);font-weight:400}[_nghost-%COMP%]     .c-input.is-disabled{cursor:not-allowed}[_nghost-%COMP%]     .c-input::-ms-clear{display:none}[_nghost-%COMP%]     nx-dropdown{position:relative;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:var(--natural-language-form-border-color)}[_nghost-%COMP%]     nx-dropdown .nx-dropdown__container{font-size:inherit;margin-bottom:-nx-spacer(4xs)}@media (max-width: 991px){[_nghost-%COMP%]     nx-dropdown .nx-dropdown__container{font-size:26px}}[_nghost-%COMP%]     nx-dropdown.is-filled, [_nghost-%COMP%]     nx-dropdown.has-focus{color:var(--natural-language-form-active-color);border-color:var(--natural-language-form-active-border-color)}[_nghost-%COMP%]     nx-dropdown.has-focus{border-bottom-width:4px}[_nghost-%COMP%]     nx-dropdown .nx-dropdown__icon{line-height:inherit}[_nghost-%COMP%]     .nx-word__input-wrapper{width:100%}.is-focused[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-filled[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--natural-language-form-active-border-color)}.is-focused[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-bottom-width:4px}.has-error[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--natural-language-form-error-border-color)}.has-error[_nghost-%COMP%]     nx-dropdown{color:var(--natural-language-form-error-color);border-color:var(--natural-language-form-error-border-color)}.has-error[_nghost-%COMP%]     .c-input.has-error{color:var(--natural-language-form-error-color)}.is-negative[_nghost-%COMP%]     .nx-dropdown, .is-negative   [_nghost-%COMP%]     .nx-dropdown, .is-negative[_nghost-%COMP%]     nx-dropdown, .is-negative   [_nghost-%COMP%]     nx-dropdown, .is-negative[_nghost-%COMP%]     nx-dropdown.is-filled, .is-negative   [_nghost-%COMP%]     nx-dropdown.is-filled{border-color:var(--negative);color:var(--negative)}.is-negative[_nghost-%COMP%]     .c-input, .is-negative   [_nghost-%COMP%]     .c-input, .is-negative[_nghost-%COMP%]     .c-input.has-error, .is-negative   [_nghost-%COMP%]     .c-input.has-error{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-negative   [_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--negative)}.nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-large-line-height)}@media (max-width: 991px){.nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-small-line-height)}}.nx-natural-language-form--small[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .nx-natural-language-form--small   [_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-small-line-height)}@media screen and (forced-colors: active){.nx-word__inner-wrapper[_ngcontent-%COMP%],   nx-dropdown{border-bottom-color:buttonText!important}.is-focused[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-focused[_nghost-%COMP%]     nx-dropdown{border-bottom-color:highlight!important}}"],changeDetection:0});let s=o;return s})(),se="large",ye=(()=>{let o=class o{set negative(t){this._negative=L(t)}get negative(){return this._negative}set size(t){this._size=t,this._cdr.markForCheck()}get size(){return this._size}constructor(t,n){this._cdr=t,this._ngZone=n,this._negative=!1,this._size=se,this.resizeEvent$=new g,this._destroyed=new g,this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.pipe(l(this._destroyed)).subscribe(()=>{this.updatePositionPopovers()})})}onResize(t){this.resizeEvent$.next()}ngAfterContentInit(){let t=this._words.map(e=>e.inputChanges);y(...t).pipe(l(this._destroyed)).subscribe(()=>{this.updatePositionPopovers()}),this.resizeObservable=this.resizeEvent$.pipe(O(500),P(100)),this.resizeObservable.pipe(l(this._destroyed)).subscribe(()=>this.resizeWords())}resizeWords(){this._words.forEach(t=>{t.updateCurrentTextWidth()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}updatePositionPopovers(){this._words&&this._words.forEach(t=>{t.repositionError()})}};o.\u0275fac=function(n){return new(n||o)(a(x),a(I))},o.\u0275cmp=_({type:o,selectors:[["nx-natural-language-form"]],contentQueries:function(n,e,i){if(n&1&&m(i,ie,4),n&2){let r;h(r=d())&&(e._words=r)}},hostVars:6,hostBindings:function(n,e){n&1&&T("orientationchange",function(r){return e.onResize(r)},!1,v)("resize",function(r){return e.onResize(r)},!1,v),n&2&&w("is-negative",e.negative)("nx-natural-language-form--small",e.size==="small")("nx-natural-language-form--large",e.size==="large")},inputs:{negative:[z.None,"negativeStyles","negative"],size:"size"},ngContentSelectors:re,decls:2,vars:0,consts:[[1,"nx-natural-language-form__wrapper"]],template:function(n,e){n&1&&(C(),p(0,"div",0),u(1),c())},styles:["[_nghost-%COMP%]{display:block;font-size:var(--natural-language-form-large-font-size);line-height:var(--natural-language-form-large-line-height);font-weight:var(--natural-language-form-large-font-weight);letter-spacing:var(--natural-language-form-large-letter-spacing);color:var(--natural-language-form-text-color);padding-top:72px;padding-bottom:80px}[_nghost-%COMP%]     .c-input{font-size:inherit;line-height:inherit}[_nghost-%COMP%]     nx-word+nx-word{margin-left:2px}[dir=rtl]   [_nghost-%COMP%]     nx-word+nx-word{margin-right:2px;margin-left:initial}.is-negative[_nghost-%COMP%]{color:var(--negative)}@media (max-width: 991px){[_nghost-%COMP%]{font-size:var(--natural-language-form-small-font-size);line-height:var(--natural-language-form-small-line-height);font-weight:var(--natural-language-form-small-font-weight);letter-spacing:var(--natural-language-form-small-letter-spacing)}}.nx-natural-language-form__wrapper[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.nx-natural-language-form__wrapper[_ngcontent-%COMP%] >   *{margin-bottom:8px}.nx-natural-language-form--small[_nghost-%COMP%]{font-size:var(--natural-language-form-small-font-size);line-height:var(--natural-language-form-small-line-height);font-weight:var(--natural-language-form-small-font-weight);letter-spacing:var(--natural-language-form-small-letter-spacing)}.nx-natural-language-form--small[_nghost-%COMP%]     .c-input{font-size:inherit;line-height:inherit}"],changeDetection:0});let s=o;return s})(),Pe=(()=>{let o=class o{};o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=R({type:o}),o.\u0275inj=M({imports:[k,$,J]});let s=o;return s})();export{ie as a,ye as b,Pe as c};
