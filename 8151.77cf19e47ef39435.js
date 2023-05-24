"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[8151],{9508:(E,u,o)=>{o.d(u,{f:()=>v});var c=o(4755),e=o(9401),_=o(4400),m=o(2812),f=o(2658),g=o(1322),d=o(2223);let v=(()=>{class l{}return l.\u0275fac=function(x){return new(x||l)},l.\u0275mod=d.oAB({type:l}),l.\u0275inj=d.cJS({imports:[c.ez,e.u5,e.UX,_.ru,g.X,m.K,f.TW]}),l})()},2321:(E,u,o)=>{o.d(u,{iQ:()=>A,mr:()=>B,u7:()=>w});var c=o(1692),e=o(2223),_=o(8929),m=o(6787),f=o(1059),g=o(7625),d=o(3164),v=o(8583),l=o(9002),C=o(8023),x=o(1828),P=o(6078),y=o(5168),M=o(4755),O=o(8192),R=o(3454);const b=["popover"];function D(i,s){1&i&&(e.TgZ(0,"div",2),e.Hsn(1,2),e.qZA())}const z=[[["nx-dropdown"]],[["","nxError",""]],[["","nxInput",""]]],W=["nx-dropdown","[nxError]","[nxInput]"],T=["*"];let w=(()=>{class i{constructor(t,n,r,a,h,p){this.elementRef=t,this._cdr=n,this._renderer=r,this._overlay=a,this._viewContainerRef=h,this._overlayPositionBuilder=p,this.inputChanges=new _.xQ,this._hasErrors=!1,this.currentTextWidth=0,this.size="regular",this.label="",this._destroyed=new _.xQ}ngOnInit(){this.setupErrorPopover()}ngAfterContentInit(){this._validateControlChild(),this._control.stateChanges.pipe((0,f.O)(null),(0,g.R)(this._destroyed)).subscribe(()=>{this._hasErrors=this._control.errorState,this.updateErrorPopoverState(),this._cdr.markForCheck()}),this._control.ngControl?this._control.ngControl.valueChanges.pipe((0,g.R)(this._destroyed)).subscribe(t=>{this.updateCurrentTextWidth(),this.inputChanges.next()}):this._control.stateChanges.pipe((0,g.R)(this._destroyed)).subscribe(t=>{this.updateCurrentTextWidth(),this.inputChanges.next()}),this._control.setAriaLabel(this.label)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._overlayRef&&this._overlayRef.dispose()}updateCurrentTextWidth(){this.measureCanvas||(this.measureCanvas=this._renderer.createElement("canvas"));const t=this.measureCanvas.getContext("2d"),r=window.getComputedStyle(this._control.elementRef.nativeElement);t.font=(0,y.N1)(r);const h=t.measureText(this._control.value).width+parseInt(r.paddingRight,10)+parseInt(r.paddingLeft,10)+1,N=this.elementRef.nativeElement.parentElement.getBoundingClientRect();this.currentTextWidth=Math.max(parseInt(r.minWidth,10),h),this.currentTextWidth=Math.min(this.currentTextWidth,N.width),this._overlayRef.hasAttached()&&this._overlayState.positionStrategy.apply()}repositionError(){this._overlayRef.hasAttached()&&this._overlayState.positionStrategy.apply()}_validateControlChild(){if(!this._control)throw new Error("NxWordComponent requires an NxFormfieldControl compatible input.")}getConnectedOverlayOrigin(){return this.elementRef}get isFocused(){return this._control.focused}get isFilled(){return!this._control.empty}get hasDropdown(){return!!this._dropdown}updateErrorPopoverState(){this._hasErrors&&this._errorChildren.length>0?this.showPopover():this.hidePopover()}setupErrorPopover(){const t=this._overlayPositionBuilder.flexibleConnectedTo(this.elementRef).withLockedPosition(!0).withFlexibleDimensions(!1).withPush(!0).withPositions([{originX:"center",originY:"top",overlayX:"center",overlayY:"bottom"},{originX:"center",originY:"bottom",overlayX:"center",overlayY:"top"}]).withDefaultOffsetY(-8);this._overlayState=new l.X_,this._overlayState.positionStrategy=t,this._overlayState.scrollStrategy=this._overlay.scrollStrategies.reposition(),this._overlayRef=this._overlay.create(this._overlayState),this._overlayState.positionStrategy.positionChanges.pipe((0,g.R)(this._destroyed)).subscribe(n=>{this.positionArrow(n.connectionPair),this._embeddedViewRef&&!this._embeddedViewRef.destroyed&&this._embeddedViewRef.detectChanges()})}positionArrow(t){const p=this.elementRef.nativeElement.getBoundingClientRect().left+this.elementRef.nativeElement.getBoundingClientRect().width/2-(this._overlayRef.overlayElement.parentElement.offsetLeft+this._overlayRef.overlayElement.offsetLeft);this._popover.direction="top"===t.originY&&"bottom"===t.overlayY?"top":"bottom",this._popover.arrowStyle={left:p+"px"}}showPopover(){if(!this._overlayRef.hasAttached()){const t=new C.UE(this._popover.templateRef,this._viewContainerRef);this._embeddedViewRef=this._overlayRef.attach(t)}}hidePopover(){this._overlayRef.detach()}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.SBq),e.Y36(e.sBO),e.Y36(e.Qsj),e.Y36(l.aV),e.Y36(e.s_b),e.Y36(l.wJ))},i.\u0275cmp=e.Xpm({type:i,selectors:[["nx-word"]],contentQueries:function(t,n,r){if(1&t&&(e.Suo(r,P.iC,5),e.Suo(r,x.Uu,5),e.Suo(r,P.Sr,4)),2&t){let a;e.iGM(a=e.CRH())&&(n._control=a.first),e.iGM(a=e.CRH())&&(n._dropdown=a.first),e.iGM(a=e.CRH())&&(n._errorChildren=a)}},viewQuery:function(t,n){if(1&t&&e.Gf(b,7),2&t){let r;e.iGM(r=e.CRH())&&(n._popover=r.first)}},hostVars:16,hostBindings:function(t,n){2&t&&(e.Udp("width",n.currentTextWidth,"px"),e.ekj("size-short","short"==n.size)("size-regular","regular"==n.size)("size-long","long"==n.size)("has-error",n._hasErrors)("is-focused",n.isFocused)("is-filled",n.isFilled)("has-dropdown",n.hasDropdown))},inputs:{size:"size",label:"label"},ngContentSelectors:W,decls:6,vars:1,consts:[["class","nx-word__inner-wrapper",4,"ngIf"],["popover",""],[1,"nx-word__inner-wrapper"]],template:function(t,n){1&t&&(e.F$t(z),e.TgZ(0,"div"),e.YNc(1,D,2,0,"div",0),e.Hsn(2),e.qZA(),e.TgZ(3,"nx-popover",null,1),e.Hsn(5,1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngIf",!n.hasDropdown))},dependencies:[M.O5,O.NE],styles:["[_nghost-%COMP%]{display:inline-block;position:relative;font-weight:400;text-align:center;-webkit-hyphens:none;hyphens:none;width:100%;margin:0 4px}[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:var(--natural-language-form-border-color)}.size-short[_nghost-%COMP%]{min-width:80px}.size-regular[_nghost-%COMP%]{min-width:152px}.size-long[_nghost-%COMP%]{min-width:360px}@media (max-width: 991px){.size-long[_nghost-%COMP%]{min-width:280px}}@media (max-width: 703px){.size-long[_nghost-%COMP%]{min-width:248px}}[_nghost-%COMP%]     .c-input{display:inline-block;text-align:inherit;font-size:inherit;line-height:inherit;background:0 0;color:inherit;border:none;outline:0;margin:0;width:100%;max-width:100%;height:auto;box-shadow:none;padding:0 8px}[_nghost-%COMP%]     .c-input.is-focused{outline:none;box-shadow:none}[_nghost-%COMP%]     .c-input.is-filled, [_nghost-%COMP%]     .c-input.is-focused{color:var(--natural-language-form-active-color);font-weight:400}[_nghost-%COMP%]     .c-input.is-disabled{cursor:not-allowed}[_nghost-%COMP%]     .c-input::-ms-clear{display:none}[_nghost-%COMP%]     nx-dropdown{position:relative;border-bottom-width:2px;border-bottom-style:solid;border-bottom-color:var(--natural-language-form-border-color)}[_nghost-%COMP%]     nx-dropdown .nx-dropdown__container{font-size:inherit;margin-bottom:-nx-spacer(4xs)}@media (max-width: 991px){[_nghost-%COMP%]     nx-dropdown .nx-dropdown__container{font-size:26px}}[_nghost-%COMP%]     nx-dropdown.is-filled, [_nghost-%COMP%]     nx-dropdown.has-focus{color:var(--natural-language-form-active-color);border-color:var(--natural-language-form-active-border-color)}[_nghost-%COMP%]     nx-dropdown .nx-dropdown__icon{line-height:inherit}[_nghost-%COMP%]     .nx-word__input-wrapper{width:100%}.is-focused[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-filled[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--natural-language-form-active-border-color)}.has-error[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--natural-language-form-error-border-color)}.has-error[_nghost-%COMP%]     nx-dropdown{color:var(--natural-language-form-error-color);border-color:var(--natural-language-form-error-border-color)}.has-error[_nghost-%COMP%]     .c-input.has-error{color:var(--natural-language-form-error-color)}.is-negative[_nghost-%COMP%]     .nx-dropdown, .is-negative   [_nghost-%COMP%]     .nx-dropdown, .is-negative[_nghost-%COMP%]     nx-dropdown, .is-negative   [_nghost-%COMP%]     nx-dropdown, .is-negative[_nghost-%COMP%]     nx-dropdown.is-filled, .is-negative   [_nghost-%COMP%]     nx-dropdown.is-filled{border-color:var(--negative);color:var(--negative)}.is-negative[_nghost-%COMP%]     .c-input, .is-negative   [_nghost-%COMP%]     .c-input, .is-negative[_nghost-%COMP%]     .c-input.has-error, .is-negative   [_nghost-%COMP%]     .c-input.has-error{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-negative   [_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{border-color:var(--negative)}.nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-large-line-height)}@media (max-width: 991px){.nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-small-line-height)}}.nx-natural-language-form--small[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .nx-natural-language-form--small   [_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%]{height:var(--natural-language-form-small-line-height)}@media screen and (forced-colors: active){.nx-word__inner-wrapper[_ngcontent-%COMP%],   nx-dropdown{border-bottom-color:buttonText!important}.is-focused[_nghost-%COMP%]   .nx-word__inner-wrapper[_ngcontent-%COMP%], .is-focused[_nghost-%COMP%]     nx-dropdown{border-bottom-color:highlight!important}}"],changeDetection:0}),i})(),B=(()=>{class i{set negative(t){this._negative=(0,c.Ig)(t)}get negative(){return this._negative}set size(t){this._size=t,this._cdr.markForCheck()}get size(){return this._size}constructor(t,n){this._cdr=t,this._ngZone=n,this._negative=!1,this._size="large",this.resizeEvent$=new _.xQ,this._destroyed=new _.xQ,this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.pipe((0,g.R)(this._destroyed)).subscribe(()=>{this.updatePositionPopovers()})})}onResize(t){this.resizeEvent$.next()}ngAfterContentInit(){const t=this._words.map(r=>r.inputChanges);(0,m.T)(...t).pipe((0,g.R)(this._destroyed)).subscribe(()=>{this.updatePositionPopovers()}),this.resizeObservable=this.resizeEvent$.pipe((0,d.p)(500),(0,v.g)(100)),this.resizeObservable.pipe((0,g.R)(this._destroyed)).subscribe(()=>this.resizeWords())}resizeWords(){this._words.forEach(t=>{t.updateCurrentTextWidth()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}updatePositionPopovers(){this._words&&this._words.forEach(t=>{t.repositionError()})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(e.sBO),e.Y36(e.R0b))},i.\u0275cmp=e.Xpm({type:i,selectors:[["nx-natural-language-form"]],contentQueries:function(t,n,r){if(1&t&&e.Suo(r,w,4),2&t){let a;e.iGM(a=e.CRH())&&(n._words=a)}},hostVars:6,hostBindings:function(t,n){1&t&&e.NdJ("orientationchange",function(a){return n.onResize(a)},!1,e.Jf7)("resize",function(a){return n.onResize(a)},!1,e.Jf7),2&t&&e.ekj("is-negative",n.negative)("nx-natural-language-form--small","small"===n.size)("nx-natural-language-form--large","large"===n.size)},inputs:{negative:["negativeStyles","negative"],size:"size"},ngContentSelectors:T,decls:2,vars:0,consts:[[1,"nx-natural-language-form__wrapper"]],template:function(t,n){1&t&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.qZA())},styles:["[_nghost-%COMP%]{display:block;font-size:var(--natural-language-form-large-font-size);line-height:var(--natural-language-form-large-line-height);font-weight:var(--natural-language-form-large-font-weight);letter-spacing:var(--natural-language-form-large-letter-spacing);color:var(--natural-language-form-text-color);padding-top:72px;padding-bottom:80px}[_nghost-%COMP%]     .c-input{font-size:inherit;line-height:inherit}[_nghost-%COMP%]     nx-word+nx-word{margin-left:2px}[dir=rtl]   [_nghost-%COMP%]     nx-word+nx-word{margin-right:2px;margin-left:initial}.is-negative[_nghost-%COMP%]{color:var(--negative)}@media (max-width: 991px){[_nghost-%COMP%]{font-size:var(--natural-language-form-small-font-size);line-height:var(--natural-language-form-small-line-height);font-weight:var(--natural-language-form-small-font-weight);letter-spacing:var(--natural-language-form-small-letter-spacing)}}.nx-natural-language-form__wrapper[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.nx-natural-language-form__wrapper[_ngcontent-%COMP%] >   *{margin-bottom:8px}.nx-natural-language-form--small[_nghost-%COMP%]{font-size:var(--natural-language-form-small-font-size);line-height:var(--natural-language-form-small-line-height);font-weight:var(--natural-language-form-small-font-weight);letter-spacing:var(--natural-language-form-small-letter-spacing)}.nx-natural-language-form--small[_nghost-%COMP%]     .c-input{font-size:inherit;line-height:inherit}"],changeDetection:0}),i})(),A=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[M.ez,R.ZI,O.Fc]}),i})()}}]);