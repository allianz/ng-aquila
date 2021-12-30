"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[7124],{7124:(p,b,s)=>{s.d(b,{t:()=>t});var g=s(5529),d=s(9808),h=s(5e3);let t=(()=>{class o{}return o.\u0275fac=function(c){return new(c||o)},o.\u0275mod=h.oAB({type:o}),o.\u0275inj=h.cJS({imports:[[d.ez,g.TW]]}),o})();s(3810)},3810:(p,b,s)=>{s.d(b,{z:()=>L});var g=s(3674),d=s(3191),h=s(1159),t=s(5e3),v=s(3075),o=s(2691),c=s(3753),f=s(226),C=s(5583),M=s(9808);const O=["handle"];function P(l,u){if(1&l&&(t.TgZ(0,"span",8),t._uU(1),t._UZ(2,"div",9),t.qZA()),2&l){const e=t.oxw();t.xp6(1),t.hij("",e.formatValue(e.value)," ")}}function k(l,u){if(1&l&&(t.TgZ(0,"div",10),t.TgZ(1,"span",11),t._uU(2),t.qZA(),t.TgZ(3,"span",11),t._uU(4),t.qZA(),t.qZA()),2&l){const e=t.oxw();t.xp6(2),t.Oqu(e.formatLabelLeft()),t.xp6(2),t.Oqu(e.formatLabelRight())}}var _=(()=>{return(l=_||(_={}))[l.TOUCH=0]="TOUCH",l[l.MOUSE=1]="MOUSE",_;var l})();let T=0,L=(()=>{class l{constructor(e,n,i,r,x){this.elementRef=e,this._changeDetectorRef=n,this._ngZone=i,this._dir=r,this._focusMonitor=x,this._id="nx-slider-"+T++,this._tabIndex=0,this._min=0,this._max=100,this._disabled=!1,this._inverted=!1,this._thumbLabel=!0,this._negative=!1,this._hideLabels=!1,this.valueChange=new t.vpe,this.isActive=!1,this.dragSubscriptions=[],this.position=null,this._value=0,this._step=1,this._currentValue=0,this._onChange=()=>{},this._onTouched=()=>{},this.valueFormatter=a=>a,this.labelMinFormatter=a=>a,this.labelMaxFormatter=a=>a}set id(e){this._id!==e&&(this._id=e,this._changeDetectorRef.markForCheck())}get id(){return this._id}set tabindex(e){this._tabIndex=(0,d.su)(e),this._changeDetectorRef.markForCheck()}get tabindex(){return this._disabled?-1:this._tabIndex}set min(e){this._min=(0,d.su)(e),this._changeDetectorRef.markForCheck()}get min(){return this._min}set max(e){this._max=(0,d.su)(e),this._changeDetectorRef.markForCheck()}get max(){return this._max}get step(){return this._step}set step(e){this._step=(0,d.su)(e,this._step),this._step%1!=0&&(this._roundToDecimal=this._step.toString().split(".").pop().length)}set label(e){this._label!==e&&(this._label=e,this._changeDetectorRef.markForCheck())}get label(){return this._label}set disabled(e){this._disabled=(0,d.Ig)(e),this._changeDetectorRef.markForCheck()}get disabled(){return this._disabled}set inverted(e){this._inverted=(0,d.Ig)(e),this._changeDetectorRef.markForCheck()}get inverted(){return this._inverted}set thumbLabel(e){this._thumbLabel=(0,d.Ig)(e),this._changeDetectorRef.markForCheck()}get thumbLabel(){return this._thumbLabel}set negative(e){this._negative=(0,d.Ig)(e),this._changeDetectorRef.markForCheck()}get negative(){return this._negative}set hideLabels(e){this._hideLabels=(0,d.Ig)(e),this._changeDetectorRef.markForCheck()}get hideLabels(){return this._hideLabels}ngAfterViewInit(){this._focusMonitor.monitor(this.handleElement)}set value(e){this.writeValue(Number(e))}get value(){return this._value}ngOnDestroy(){this.reset(),this._focusMonitor.stopMonitoring(this.handleElement)}writeValue(e){e!==this._value&&(this._value=e,this.valueChange.emit(e),this._changeDetectorRef.markForCheck())}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}isMinimum(){return this._value===this.min}isValidStep(){const n=new o.Decimal(this._value).minus(this.min).mod(this.step);return this.isMinimum()||0===n.cmp(0)}changeValue(e){let n=new o.Decimal(this._value);if(this.isValidStep())n=n.plus(e);else{n=new o.Decimal(this._value).minus(this.min).toNearest(this.step,e<0?o.Decimal.ROUND_DOWN:o.Decimal.ROUND_UP),n=n.plus(this.min)}let i=n.toNumber();i=(0,g.uZ)(i,this.min,this.max),this.value!==i&&(this._onChange(i),this.valueChange.emit(i),this.value=i)}get percentageValue(){let e=((this.value||0)-this.min)/(this.max-this.min)*100;return this.inverted&&(e=100-e),(0,g.uZ)(e,0,100)}sliderClick(e){this.disabled||(this._focusHandleElement(),e.stopPropagation(),this.position=this.getPositionFromEvent(e),this.frameId=requestAnimationFrame(()=>{this.valueByPosition(),this.value!==this._currentValue&&(this._currentValue=this.value,this._onChange(this.value))}))}focus(){this.disabled||this._focusHandleElement()}blur(){}selectStart(){return!1}handleKeypress(e){if(!this.disabled&&!(e.which<h.oh||e.which>h.JH))switch(e.which){case this.inverted?h.SV:h.oh:case h.JH:return this.changeValue(-this.step);case h.LH:case this.inverted?h.oh:h.SV:return this.changeValue(this.step)}}dragStart(e){if(this.disabled)return;this.isActive=!0;const n=this.detectEventType(e)===_.TOUCH;this._currentValue=this.value,n?(this._ngZone.runOutsideAngular(()=>{this.dragSubscriptions.push((0,c.R)(document,"touchmove").subscribe(this.handleDragMove.bind(this))),this.dragSubscriptions.push((0,c.R)(document,"touchend").subscribe(this.handleDragStop.bind(this)))}),this._ngZone.run(()=>{this.dragSubscriptions.push((0,c.R)(document,"touchcancel").subscribe(this.handleDragStop.bind(this)))})):(this._ngZone.runOutsideAngular(()=>{this.dragSubscriptions.push((0,c.R)(document,"mousemove").subscribe(this.handleDragMove.bind(this)))}),this._ngZone.run(()=>{this.dragSubscriptions.push((0,c.R)(document,"mouseup").subscribe(this.handleDragStop.bind(this)))})),this.position=this.getPositionFromEvent(e),this.runChangeObserver()}formatValue(e){return this.valueFormatter(e)}formatLabelLeft(){return this.inverted?this.formatLabelMax():this.formatLabelMin()}formatLabelRight(){return this.inverted?this.formatLabelMin():this.formatLabelMax()}valueByPosition(){const e=this._dir&&"rtl"===this._dir.value,n=this.elementRef.nativeElement.getBoundingClientRect();let a,r=(Math.max(n.left,Math.min(n.right,this.position.x))-n.left)/n.width;this.inverted&&(r=1-r),e&&(r=1-r),a=1===r?this.max:0===r?this.min:Math.round((this.min+r*(this.max-this.min)-this.min)/this.step)*this.step+this.min,this._roundToDecimal&&(a=this.roundToDecimal(a)),a=(0,g.uZ)(a,this.min,this.max),this.value=a}roundToDecimal(e){return parseFloat(e.toFixed(this._roundToDecimal))}formatLabelMin(){return this.labelMinFormatter(this.min)}formatLabelMax(){return this.labelMaxFormatter(this.max)}handleDragMove(e){this.position=this.getPositionFromEvent(e)}handleDragStop(e){this.reset(),this.valueByPosition(),this.value!==this._currentValue&&(this._currentValue=this.value,this._onChange(this.value))}runChangeObserver(){this.frameId=requestAnimationFrame(()=>{this.valueByPosition(),this.isActive&&this.runChangeObserver()})}reset(){this.isActive=!1;for(const e of this.dragSubscriptions)e.unsubscribe();this.dragSubscriptions=[],cancelAnimationFrame(this.frameId)}detectEventType(e){return e.type.includes("touch")?_.TOUCH:_.MOUSE}getPositionFromEvent(e){const i=this.detectEventType(e)===_.TOUCH?e.touches.item(0):e;return{x:i.clientX,y:i.clientY}}_focusHandleElement(){this.handleElement.nativeElement.focus()}}return l.\u0275fac=function(e){return new(e||l)(t.Y36(t.SBq),t.Y36(t.sBO),t.Y36(t.R0b),t.Y36(f.Is,8),t.Y36(C.tE))},l.\u0275cmp=t.Xpm({type:l,selectors:[["nx-slider"]],viewQuery:function(e,n){if(1&e&&t.Gf(O,7),2&e){let i;t.iGM(i=t.CRH())&&(n.handleElement=i.first)}},hostVars:5,hostBindings:function(e,n){1&e&&t.NdJ("keydown",function(r){return n.handleKeypress(r)}),2&e&&(t.uIk("aria-disabled",!!n.disabled||null),t.ekj("nx-slider--disabled",n.disabled)("nx-slider--negative",n.negative))},inputs:{id:"id",tabindex:"tabindex",min:["nxMin","min"],max:["nxMax","max"],step:["nxStep","step"],label:["nxLabel","label"],disabled:"disabled",inverted:["nxInverted","inverted"],thumbLabel:"thumbLabel",negative:"negative",hideLabels:"hideLabels",valueFormatter:["nxValueFormatter","valueFormatter"],labelMinFormatter:["nxLabelMinFormatter","labelMinFormatter"],labelMaxFormatter:["nxLabelMaxFormatter","labelMaxFormatter"],value:["nxValue","value"]},outputs:{valueChange:"nxValueChange"},features:[t._Bn([{provide:v.JU,useExisting:(0,t.Gpc)(()=>l),multi:!0}])],decls:9,vars:14,consts:[[1,"nx-slider__label",3,"id","click"],[1,"nx-slider__wrapper",3,"click"],[1,"nx-slider__background"],[1,"nx-slider__filler"],["role","slider",1,"nx-slider__handle",3,"id","mousedown","touchstart","selectstart"],["handle",""],["class","nx-slider__value",4,"ngIf"],["class","nx-slider__label-container",4,"ngIf"],[1,"nx-slider__value"],[1,"nx-slider__arrow"],[1,"nx-slider__label-container"],[1,"nx-slider__value-label"]],template:function(e,n){1&e&&(t.TgZ(0,"label",0),t.NdJ("click",function(){return n._focusHandleElement()}),t._uU(1),t.qZA(),t.TgZ(2,"div",1),t.NdJ("click",function(r){return n.sliderClick(r)}),t.TgZ(3,"span",2),t._UZ(4,"span",3),t.TgZ(5,"div",4,5),t.NdJ("mousedown",function(r){return n.dragStart(r)})("touchstart",function(r){return n.dragStart(r)})("selectstart",function(){return n.selectStart()}),t.YNc(7,P,3,1,"span",6),t.qZA(),t.qZA(),t.qZA(),t.YNc(8,k,5,2,"div",7)),2&e&&(t.Q6J("id",n.id+"-label"),t.uIk("for",n.id+"-handle"),t.xp6(1),t.Oqu(n.label),t.xp6(3),t.Udp("width",n.percentageValue,"%"),t.xp6(1),t.Q6J("id",n.id+"-handle"),t.uIk("tabindex",n.tabindex)("aria-labelledby",n.id+"-label")("aria-valuemin",n.formatLabelMin())("aria-valuemax",n.formatLabelMax())("aria-valuetext",n.formatValue(n.value))("aria-valuenow",n.formatValue(n.value)),t.xp6(2),t.Q6J("ngIf",n.thumbLabel),t.xp6(1),t.Q6J("ngIf",!n.hideLabels))},directives:[M.O5],styles:["[_nghost-%COMP%]{display:block}.nx-slider__label[_ngcontent-%COMP%]{font-size:var(--slider-label-font-size);line-height:var(--slider-label-line-height);font-weight:var(--slider-label-font-weight);letter-spacing:var(--slider-label-letter-spacing);color:var(--slider-label-color)}.nx-slider__wrapper[_ngcontent-%COMP%]{width:100%;padding:66px 0 18px}.nx-slider__background[_ngcontent-%COMP%]{position:relative;background-color:var(--slider-background-color);display:block;height:4px;border-radius:2px;white-space:nowrap;cursor:pointer}.nx-slider__filler[_ngcontent-%COMP%]{display:inline-block;height:4px;border-radius:2px;background-color:var(--slider-indicator-color);float:left}[dir=rtl][_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{float:right}.nx-slider__handle[_ngcontent-%COMP%]{display:inline-block;position:relative;width:24px;height:24px;border-radius:50%;box-shadow:var(--shadow-small);border-style:solid;border-width:1px;border-color:var(--slider-handle-border-color);background:var(--slider-handle-background-color);box-sizing:border-box;margin-left:-12px;top:-10px;z-index:2;cursor:-webkit-grab;cursor:grab}[dir=rtl][_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{margin-right:-12px;margin-left:0;margin-left:initial}.nx-slider__handle[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--slider-handle-focus-border-color)}.nx-slider__handle[_ngcontent-%COMP%]:active{box-shadow:var(--shadow-small),inset 0 0 0 4px var(--slider-handle-background-color),inset 0 0 0 24px var(--slider-handle-active-inset-color);cursor:-webkit-grabbing;cursor:grabbing}.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{border-color:var(--slider-handle-focus-border-color);box-shadow:var(--focus-box-shadow)}@media screen and (-ms-high-contrast: active){.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText;outline:4px solid CanvasText;outline-offset:2px}}.nx-slider__value[_ngcontent-%COMP%]{font-size:var(--slider-handle-value-font-size);line-height:var(--slider-handle-value-line-height);font-weight:var(--slider-handle-value-font-weight);letter-spacing:var(--slider-handle-value-letter-spacing);color:var(--slider-handle-value-color);border:1px solid;border-color:var(--slider-handle-border-color);border-radius:4px;box-shadow:var(--shadow-small);cursor:-webkit-grab;cursor:grab;height:24px;width:48px;text-align:center;right:8px;padding:3px 8px;position:relative;top:-40px;display:table;left:50%;transform:translate(-50%);background:var(--slider-value-background-color)}[dir=rtl][_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{right:50%;left:8px;transform:translate(50%)}.nx-slider__value[_ngcontent-%COMP%]:active{cursor:-webkit-grabbing;cursor:grabbing}.nx-slider__arrow[_ngcontent-%COMP%]{width:6px;height:6px;border-right:1px solid;border-bottom:1px solid;left:50%;transform:translate(-50%,1px) rotate(45deg);position:absolute;box-shadow:-2px -2px 1px 1px var(--slider-value-background-color),2px 2px 4px var(--shadow-grey-color);background:var(--slider-value-background-color);border-color:var(--slider-handle-border-color)}.nx-slider__label-container[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;font-size:var(--slider-value-label-font-size);line-height:var(--slider-value-label-line-height);font-weight:var(--slider-value-label-font-weight);letter-spacing:var(--slider-value-label-letter-spacing);color:var(--slider-value-label-color)}.nx-slider__max-value-label[_ngcontent-%COMP%]{text-align:right}.nx-slider--disabled[_nghost-%COMP%]{cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:var(--slider-value-disabled-background-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--slider-indicator-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{color:var(--slider-handle-value-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label-container[_ngcontent-%COMP%]{color:var(--slider-value-label-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{background:var(--slider-value-disabled-background-color);box-shadow:-2px -2px 1px 1px var(--slider-value-disabled-background-color),2px 2px 4px #41414180}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background:var(--slider-disabled-background-color)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:var(--slider-negative-background-color)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative-01)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative-01)}@media screen and (-ms-high-contrast: active){.nx-slider__background[_ngcontent-%COMP%]{background-color:buttonFace;border:1px solid buttonText}.nx-slider__filler[_ngcontent-%COMP%]{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]{background-color:buttonFace;border-color:buttonText}.nx-slider__handle[_ngcontent-%COMP%]:hover, .nx-slider__handle[_ngcontent-%COMP%]:focus{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]:active{background-color:buttonText}.nx-slider__value[_ngcontent-%COMP%]{border-color:buttonText;color:buttonText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:Canvas;border:1px solid GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{border-color:GrayText;color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{border-color:GrayText}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}}"],changeDetection:0}),l})()}}]);