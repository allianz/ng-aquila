"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[1619],{1619:(K,M,a)=>{a.d(M,{t:()=>A,z:()=>R});var _=a(1281),u=a(9521),t=a(4650),P=a(4006),p=a(5260),g=a(7258),b=a(3753),O=a(445),T=a(2693),x=a(6895);const w=["handle"];function L(s,d){if(1&s&&(t.ynx(0),t.TgZ(1,"span",9),t._uU(2),t.qZA(),t._UZ(3,"div",10),t.BQk()),2&s){const e=t.oxw();t.xp6(1),t.Udp("transform",e._labelPosition),t.xp6(1),t.hij("",e._formatValue(e.value)," ")}}const E=function(s){return{width:s}};function S(s,d){if(1&s&&t._UZ(0,"div",13),2&s){const e=d.$implicit;t.ekj("nx-slider__tick-primary",e.isLongTick)("nx-slider__tick-hidden",e.hideTick),t.Q6J("ngStyle",t.VKq(5,E,e.gapSize+"%"))}}function F(s,d){if(1&s&&(t.TgZ(0,"div",11),t.YNc(1,S,1,7,"div",12),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.ticks)}}function I(s,d){if(1&s&&(t.TgZ(0,"div",14)(1,"span",15),t._uU(2),t.qZA(),t.TgZ(3,"span",15),t._uU(4),t.qZA()()),2&s){const e=t.oxw();t.xp6(2),t.Oqu(e._formatLabelLeft()),t.xp6(2),t.Oqu(e._formatLabelRight())}}let y=0;const v="-50%";let R=(()=>{class s{constructor(e,i,n,r,o){this.elementRef=e,this._cdr=i,this._ngZone=n,this._dir=r,this._focusMonitor=o,this._dragSubscriptions=[],this._decimalPlaces=0,this._thumbLabel=!0,this._tickInterval=0,this.ticks=[],this._labelPosition=v,this._id="nx-slider-"+y++,this._tabIndex=0,this._min=0,this._max=100,this._step=1,this._label="",this._disabled=!1,this._inverted=!1,this._value=0,this._negative=!1,this._hideLabels=!1,this._longTicks=[0],this.valueChange=new t.vpe,this.valueFormatter=l=>l,this.labelMinFormatter=l=>l,this.labelMaxFormatter=l=>l,this._onChange=()=>{},this._onTouched=()=>{}}set tickInterval(e){this._tickInterval=(0,_.su)(e),this.ticks=this.getTicks(this.min,this.max,this.step,this._tickInterval,this.longTicks),this._cdr.markForCheck()}get tickInterval(){return this._tickInterval}set id(e){this._id!==e&&(this._id=e,this._cdr.markForCheck())}get id(){return this._id}set tabindex(e){this._tabIndex=(0,_.su)(e),this._cdr.markForCheck()}get tabindex(){return this._disabled?-1:this._tabIndex}set min(e){this._min=(0,_.su)(e),this.ticks=this.getTicks(this._min,this.max,this.step,this.tickInterval,this.longTicks),this._cdr.markForCheck()}get min(){return this._min}set max(e){this._max=(0,_.su)(e),this.ticks=this.getTicks(this.min,this._max,this.step,this.tickInterval,this.longTicks),this._cdr.markForCheck()}get max(){return this._max}set step(e){this._step=(0,_.su)(e,this._step),this.ticks=this.getTicks(this.min,this.max,this._step,this._tickInterval,this.longTicks),this._step%1!=0&&(this._decimalPlaces=this._step.toString().split(".").pop().length),this._cdr.markForCheck()}get step(){return this._step}set label(e){this._label!==e&&(this._label=e,this._cdr.markForCheck())}get label(){return this._label}set disabled(e){this._disabled=(0,_.Ig)(e),this._cdr.markForCheck()}get disabled(){return this._disabled}set inverted(e){this._inverted=(0,_.Ig)(e),this._cdr.markForCheck()}get inverted(){return this._inverted}set thumbLabel(e){this._thumbLabel=(0,_.Ig)(e),this._cdr.markForCheck()}get thumbLabel(){return this._thumbLabel}set value(e){this.writeValue(Number(e)),setTimeout(()=>{this._updateLabelPosition()})}get value(){return this._value}set negative(e){this._negative=(0,_.Ig)(e),this._cdr.markForCheck()}get negative(){return this._negative}set hideLabels(e){this._hideLabels=(0,_.Ig)(e),this._cdr.markForCheck()}get hideLabels(){return this._hideLabels}set longTicks(e){this._longTicks!==e&&(this._longTicks=e,this.ticks=this.getTicks(this.min,this.max,this.step,this.tickInterval,this._longTicks),this._cdr.markForCheck())}get longTicks(){return this._longTicks}ngAfterViewInit(){this._focusMonitor.monitor(this._handleElement),setTimeout(()=>{this._updateLabelPosition()})}ngOnDestroy(){this._reset(),this._focusMonitor.stopMonitoring(this._handleElement)}writeValue(e){e!==this._value&&(this._value=e,this.valueChange.emit(e),this._cdr.markForCheck())}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_isMinimum(){return this._value===this.min}_isValidStep(){const i=new g.t(this._value).minus(this.min).mod(this.step);return this._isMinimum()||0===i.cmp(0)}_changeValue(e){let i=new g.t(this._value);if(this._isValidStep())i=i.plus(e);else{i=new g.t(this._value).minus(this.min).toNearest(this.step,e<0?g.t.ROUND_DOWN:g.t.ROUND_UP),i=i.plus(this.min)}let n=i.toNumber();n=(0,p.uZ)(n,this.min,this.max),this.value!==n&&(this._onChange(n),this.valueChange.emit(n),this.value=n)}get _percentageValue(){let e=((this.value||0)-this.min)/(this.max-this.min)*100;return this.inverted&&(e=100-e),(0,p.uZ)(e,0,100)}_sliderClick(e){if(this.disabled)return;this._focusHandleElement(),e.stopPropagation();const i=this._getPositionFromEvent(e),n=this._getValueFromPosition(i);this.value!==n&&(this.value=n,this._onChange(this.value))}_focus(){this._focusHandleElement()}_selectStart(){return!1}_handleKeypress(e){if(!this.disabled)switch(e.keyCode){case u.JH:case this.inverted?u.SV:u.oh:return this._changeValue(-this.step);case u.LH:case this.inverted?u.oh:u.SV:return this._changeValue(this.step)}}_dragStart(){this.disabled||(this._ngZone.runOutsideAngular(()=>{this._dragSubscriptions.push((0,b.R)(document,"touchmove").subscribe(this._handleDragMove.bind(this))),this._dragSubscriptions.push((0,b.R)(document,"mousemove").subscribe(this._handleDragMove.bind(this)))}),this._dragSubscriptions.push((0,b.R)(document,"touchcancel").subscribe(this._handleDragStop.bind(this))),this._dragSubscriptions.push((0,b.R)(document,"mouseup").subscribe(this._handleDragStop.bind(this))),this._dragSubscriptions.push((0,b.R)(document,"touchend").subscribe(this._handleDragStop.bind(this))))}_formatValue(e){return this.valueFormatter(e)}_formatLabelLeft(){return this.inverted?this._formatLabelMax():this._formatLabelMin()}_formatLabelRight(){return this.inverted?this._formatLabelMin():this._formatLabelMax()}_formatLabelMin(){return this.labelMinFormatter(this.min)}_formatLabelMax(){return this.labelMaxFormatter(this.max)}_focusHandleElement(){this._handleElement.nativeElement.focus()}_updateLabelPosition(){const e=this._handleElement.nativeElement.querySelector(".nx-slider__value");if(!e)return;const i=this._handleElement.nativeElement.getBoundingClientRect(),n=e.getBoundingClientRect(e),r=i.left+i.width/2,c=document.body.offsetWidth;let h=v;r-n.width/2<0?h=4-r+"px":r+n.width/2>c&&(h=-n.width+c-r-4+"px"),this._labelPosition=`translateX(${h})`,this._cdr.markForCheck()}_getValueFromPosition(e){const i="rtl"===this._dir?.value,n=this.elementRef.nativeElement.getBoundingClientRect();let l,o=(Math.max(n.left,Math.min(n.right,e))-n.left)/n.width;return this.inverted&&(o=1-o),i&&(o=1-o),l=1===o?this.max:0===o?this.min:Math.round((this.min+o*(this.max-this.min)-this.min)/this.step)*this.step+this.min,this._decimalPlaces&&(l=this._roundToDecimal(l)),(0,p.uZ)(l,this.min,this.max)}_roundToDecimal(e){return parseFloat(e.toFixed(this._decimalPlaces))}_handleDragMove(e){e.preventDefault();const i=this._getPositionFromEvent(e),n=this._getValueFromPosition(i);this.value!==n&&this._ngZone.run(()=>{this.value=n,this._onChange(this.value),this._cdr.markForCheck()})}_handleDragStop(e){this._reset();const i=this._getPositionFromEvent(e),n=this._getValueFromPosition(i);this.value!==n&&(this.value=n,this._onChange(this.value))}_reset(){for(const e of this._dragSubscriptions)e.unsubscribe();this._dragSubscriptions=[]}_getPositionFromEvent(e){return(e.type.includes("touch")?e.touches.item(0):e).clientX}getTicks(e,i,n,r,o=[]){if(!r)return[];const l=i-e,c=n*r,h=c/l*100,m=Math.floor(100/h),U=100-h*m;return o.length||o.push(l/2),Array.from({length:m},(k,Z)=>{const C=Z+1;return{gapSize:h,hideTick:C===m&&U<=3,isLongTick:o.includes(C*c)}})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(t.R0b),t.Y36(O.Is,8),t.Y36(T.tE))},s.\u0275cmp=t.Xpm({type:s,selectors:[["nx-slider"]],viewQuery:function(e,i){if(1&e&&t.Gf(w,7),2&e){let n;t.iGM(n=t.CRH())&&(i._handleElement=n.first)}},hostVars:5,hostBindings:function(e,i){1&e&&t.NdJ("keydown",function(r){return i._handleKeypress(r)}),2&e&&(t.uIk("aria-disabled",!!i.disabled||null),t.ekj("nx-slider--disabled",i.disabled)("nx-slider--negative",i.negative))},inputs:{tickInterval:"tickInterval",id:"id",tabindex:"tabindex",min:["nxMin","min"],max:["nxMax","max"],step:["nxStep","step"],label:["nxLabel","label"],disabled:"disabled",inverted:["nxInverted","inverted"],thumbLabel:"thumbLabel",value:["nxValue","value"],negative:"negative",hideLabels:"hideLabels",longTicks:"longTicks",valueFormatter:["nxValueFormatter","valueFormatter"],labelMinFormatter:["nxLabelMinFormatter","labelMinFormatter"],labelMaxFormatter:["nxLabelMaxFormatter","labelMaxFormatter"]},outputs:{valueChange:"nxValueChange"},features:[t._Bn([{provide:P.JU,useExisting:(0,t.Gpc)(()=>s),multi:!0}])],decls:10,vars:17,consts:[[1,"nx-slider__label",3,"id","click"],[1,"nx-slider__wrapper",3,"click"],[1,"nx-slider__background"],[1,"nx-slider__filler"],["role","slider",1,"nx-slider__handle",3,"id","mousedown","touchstart","selectstart"],["handle",""],[4,"ngIf"],["class","nx-slider__tick-container",4,"ngIf"],["class","nx-slider__label-container",4,"ngIf"],[1,"nx-slider__value"],[1,"nx-slider__arrow"],[1,"nx-slider__tick-container"],["class","nx-slider__tick",3,"nx-slider__tick-primary","nx-slider__tick-hidden","ngStyle",4,"ngFor","ngForOf"],[1,"nx-slider__tick",3,"ngStyle"],[1,"nx-slider__label-container"],[1,"nx-slider__value-label"]],template:function(e,i){1&e&&(t.TgZ(0,"label",0),t.NdJ("click",function(){return i._focusHandleElement()}),t._uU(1),t.qZA(),t.TgZ(2,"div",1),t.NdJ("click",function(r){return i._sliderClick(r)}),t.TgZ(3,"span",2)(4,"span",3)(5,"div",4,5),t.NdJ("mousedown",function(){return i._dragStart()})("touchstart",function(){return i._dragStart()})("selectstart",function(){return i._selectStart()}),t.YNc(7,L,4,3,"ng-container",6),t.qZA()()(),t.YNc(8,F,2,1,"div",7),t.qZA(),t.YNc(9,I,5,2,"div",8)),2&e&&(t.Q6J("id",i.id+"-label"),t.uIk("for",i.id+"-handle"),t.xp6(1),t.Oqu(i.label),t.xp6(1),t.ekj("nx-slider__has-ticks",!i.tickInterval),t.xp6(2),t.Udp("width",i._percentageValue,"%"),t.xp6(1),t.Q6J("id",i.id+"-handle"),t.uIk("tabindex",i.tabindex)("aria-labelledby",i.id+"-label")("aria-valuemin",i._formatLabelMin())("aria-valuemax",i._formatLabelMax())("aria-valuetext",i._formatValue(i.value))("aria-valuenow",i._formatValue(i.value)),t.xp6(2),t.Q6J("ngIf",i.thumbLabel),t.xp6(1),t.Q6J("ngIf",i.tickInterval),t.xp6(1),t.Q6J("ngIf",!i.hideLabels))},dependencies:[x.sg,x.O5,x.PC],styles:["[_nghost-%COMP%]{display:block}.nx-slider__label[_ngcontent-%COMP%]{font-size:var(--slider-label-font-size);line-height:var(--slider-label-line-height);font-weight:var(--slider-label-font-weight);letter-spacing:var(--slider-label-letter-spacing);color:var(--slider-label-color)}.nx-slider__wrapper[_ngcontent-%COMP%]{width:100%;padding-top:66px;padding-left:0;padding-right:0}.nx-slider__wrapper.nx-slider__has-ticks[_ngcontent-%COMP%]{padding-bottom:18px}.nx-slider__background[_ngcontent-%COMP%]{position:relative;background-color:var(--slider-background-color);display:block;height:4px;border-radius:2px;white-space:nowrap;cursor:pointer}.nx-slider__tick-container[_ngcontent-%COMP%]{margin-top:9px;display:flex;border-left:1px solid var(--slider-tick-color);border-right:1px solid var(--slider-tick-color);height:9px;align-items:center;overflow:hidden}.nx-slider__tick[_ngcontent-%COMP%]{height:5px;display:flex;border-right:1px solid var(--slider-tick-color)}.nx-slider__tick.nx-slider__tick-primary[_ngcontent-%COMP%]{height:9px}.nx-slider__tick.nx-slider__tick-hidden[_ngcontent-%COMP%]{border:none}.nx-slider__filler[_ngcontent-%COMP%]{display:inline-block;height:4px;border-radius:2px;background-color:var(--slider-indicator-color);float:left;position:relative}[dir=rtl][_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{float:right}.nx-slider__handle[_ngcontent-%COMP%]{position:absolute;width:24px;height:24px;right:0;transform:translate(50%);border-radius:50%;box-shadow:var(--shadow-small);border-style:solid;border-width:1px;border-color:var(--slider-handle-border-color);background:var(--slider-handle-background-color);box-sizing:border-box;top:-10px;z-index:2;cursor:grab}[dir=rtl][_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{left:0;right:auto;transform:translate(-50%)}.nx-slider__handle[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--slider-handle-focus-border-color)}.nx-slider__handle[_ngcontent-%COMP%]:active{box-shadow:var(--shadow-small),inset 0 0 0 4px var(--slider-handle-background-color),inset 0 0 0 24px var(--slider-handle-active-inset-color);cursor:grabbing}.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{border-color:var(--slider-handle-focus-border-color);box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.nx-slider__value[_ngcontent-%COMP%]{display:block;position:absolute;font-size:var(--slider-handle-value-font-size);line-height:var(--slider-handle-value-line-height);font-weight:var(--slider-handle-value-font-weight);letter-spacing:var(--slider-handle-value-letter-spacing);color:var(--slider-handle-value-color);border:1px solid;border-color:var(--slider-handle-border-color);border-radius:4px;box-shadow:var(--shadow-small);cursor:grab;height:24px;min-width:48px;text-align:center;padding:3px 8px;top:-40px;background:var(--slider-value-background-color);left:12px;transform:translate(-50%)}.nx-slider__value[_ngcontent-%COMP%]:active{cursor:grabbing}.nx-slider__arrow[_ngcontent-%COMP%]{width:6px;height:6px;border-right:1px solid;border-bottom:1px solid;left:50%;top:-22px;transform:translate(-50%,3px) rotate(45deg);position:absolute;box-shadow:-2px -2px 1px 1px var(--slider-value-background-color),2px 2px 4px var(--shadow-small-color);background:var(--slider-value-background-color);border-color:var(--slider-handle-border-color)}.nx-slider__label-container[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;font-size:var(--slider-value-label-font-size);line-height:var(--slider-value-label-line-height);font-weight:var(--slider-value-label-font-weight);letter-spacing:var(--slider-value-label-letter-spacing);color:var(--slider-value-label-color)}.nx-slider__max-value-label[_ngcontent-%COMP%]{text-align:right}.nx-slider--disabled[_nghost-%COMP%]{cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:var(--slider-value-disabled-background-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--slider-indicator-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{color:var(--slider-handle-value-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label-container[_ngcontent-%COMP%]{color:var(--slider-value-label-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{background:var(--slider-value-disabled-background-color);box-shadow:-2px -2px 1px 1px var(--slider-value-disabled-background-color),2px 2px 4px #41414180}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background:var(--slider-disabled-background-color)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:var(--slider-negative-background-color)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative-01)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative-01)}@media screen and (forced-colors: active){.nx-slider__background[_ngcontent-%COMP%]{background-color:buttonFace;border:1px solid buttonText}.nx-slider__filler[_ngcontent-%COMP%]{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]{background-color:buttonFace;border-color:buttonText}.nx-slider__handle[_ngcontent-%COMP%]:hover, .nx-slider__handle[_ngcontent-%COMP%]:focus{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]:active{background-color:buttonText}.nx-slider__value[_ngcontent-%COMP%]{border-color:buttonText;color:buttonText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:Canvas;border:1px solid GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{border-color:GrayText;color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{border-color:GrayText}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}}"],changeDetection:0}),s})(),A=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[x.ez]}),s})()}}]);