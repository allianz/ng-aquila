import{a as m}from"./chunk-OU4XFSTW.js";import{a as se}from"./chunk-3CXM22DE.js";import{t as S}from"./chunk-VPHHQYPB.js";import{a as oe}from"./chunk-T5NYCE37.js";import{q as le}from"./chunk-2EQ73B6L.js";import{a as p,b as x}from"./chunk-APNBV455.js";import{p as ne,z as re}from"./chunk-CCSED5RY.js";import{Aa as u,Ac as $,Ba as g,Ec as K,F as h,Fc as J,Gc as E,Hc as I,Ka as z,La as j,Lb as U,Mb as B,Mc as k,Nb as H,Nc as T,Oa as G,Oc as Y,Rb as M,Tc as ee,Vc as te,ac as P,bc as O,cc as L,dc as w,ed as ie,gc as f,ia as R,ic as Q,jc as W,ka as A,kc as Z,lc as d,mc as a,nc as V,rc as q,wb as o,wc as C,xb as b,yc as y,zc as X}from"./chunk-LG2ZA55B.js";var pe=["handle"],xe=[[["","nxSliderAppendix",""]]],me=["[nxSliderAppendix]"],ve=n=>({width:n});function fe(n,v){if(n&1&&(d(0,"span",10),k(1),a(),V(2,"div",11)),n&2){let e=y();L("transform",e._labelPosition),o(),Y("",e._formatValue(e.value)," ")}}function Ce(n,v){if(n&1&&V(0,"div",13),n&2){let e=v.$implicit;w("nx-slider__tick-primary",e.isLongTick)("nx-slider__tick-hidden",e.hideTick),O("ngStyle",te(5,ve,e.gapSize+"%"))}}function ke(n,v){if(n&1&&(d(0,"div",7),W(1,Ce,1,7,"div",12,Q),a()),n&2){let e=y();o(),Z(e.ticks)}}function Me(n,v){if(n&1&&(d(0,"div",8)(1,"span",14),k(2),a(),d(3,"span",14),k(4),a()()),n&2){let e=y();o(2),T(e._formatLabelLeft()),o(2),T(e._formatLabelRight())}}function Pe(n,v){n&1&&(d(0,"div",9),$(1),a())}var Oe=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275dir=H({type:n,selectors:[["","nxSliderAppendix",""]]})}}return n})(),we=0,ye=0,Te=100,Se=1,ae="-50%",de=4,Ke=(()=>{class n{set tickInterval(e){this._tickInterval=x(e),this.ticks=this.getTicks(this.min,this.max,this.step,this._tickInterval,this.longTicks),this._cdr.markForCheck()}get tickInterval(){return this._tickInterval}set id(e){this._id!==e&&(this._id=e,this._cdr.markForCheck())}get id(){return this._id}set tabindex(e){this._tabIndex=x(e),this._cdr.markForCheck()}get tabindex(){return this._disabled?-1:this._tabIndex}set min(e){this._min=x(e),this.ticks=this.getTicks(this._min,this.max,this.step,this.tickInterval,this.longTicks),this._cdr.markForCheck()}get min(){return this._min}set max(e){this._max=x(e),this.ticks=this.getTicks(this.min,this._max,this.step,this.tickInterval,this.longTicks),this._cdr.markForCheck()}get max(){return this._max}set step(e){this._step=x(e,this._step),this.ticks=this.getTicks(this.min,this.max,this._step,this._tickInterval,this.longTicks),this._step%1!==0&&(this._decimalPlaces=this._step.toString().split(".").pop().length),this._cdr.markForCheck()}get step(){return this._step}set label(e){this._label!==e&&(this._label=e,this._cdr.markForCheck())}get label(){return this._label}set disabled(e){this._disabled=p(e),this._cdr.markForCheck()}get disabled(){return this._disabled}set inverted(e){this._inverted=p(e),this._cdr.markForCheck()}get inverted(){return this._inverted}set thumbLabel(e){this._thumbLabel=p(e),this._cdr.markForCheck()}get thumbLabel(){return this._thumbLabel}set value(e){this.writeValue(Number(e)),setTimeout(()=>{this._updateLabelPosition()})}get value(){return this._value}set negative(e){this._negative=p(e),this._cdr.markForCheck()}get negative(){return this._negative}set hideLabels(e){this._hideLabels=p(e),this._cdr.markForCheck()}get hideLabels(){return this._hideLabels}set longTicks(e){this._longTicks!==e&&(this._longTicks=e,this.ticks=this.getTicks(this.min,this.max,this.step,this.tickInterval,this._longTicks),this._cdr.markForCheck())}get longTicks(){return this._longTicks}constructor(e,i,t,r,s){this.elementRef=e,this._cdr=i,this._ngZone=t,this._dir=r,this._focusMonitor=s,this._dragSubscriptions=[],this._decimalPlaces=0,this._thumbLabel=!0,this._tickInterval=0,this.ticks=[],this._labelPosition=ae,this._id=`nx-slider-${we++}`,this._tabIndex=0,this._min=ye,this._max=Te,this._step=Se,this._label="",this._disabled=!1,this._inverted=!1,this._value=0,this._negative=!1,this._hideLabels=!1,this._longTicks=[0],this.valueChange=new z,this.valueFormatter=l=>l,this.labelMinFormatter=l=>l,this.labelMaxFormatter=l=>l,this._onChange=()=>{},this._onTouched=()=>{}}ngAfterViewInit(){this._focusMonitor.monitor(this._handleElement),setTimeout(()=>{this._updateLabelPosition()})}ngOnDestroy(){this._reset(),this._focusMonitor.stopMonitoring(this._handleElement)}writeValue(e){e!==this._value&&(this._value=e,this.valueChange.emit(e),this._cdr.markForCheck())}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_isMinimum(){return this._value===this.min}_isValidStep(){let i=new m(this._value).minus(this.min).mod(this.step);return this._isMinimum()||i.cmp(0)===0}_changeValue(e){let i=new m(this._value);if(this._isValidStep())i=i.plus(e);else{let r=new m(this._value).minus(this.min);i=e<0?r.toNearest(this.step,m.ROUND_DOWN):r.toNearest(this.step,m.ROUND_UP),i=i.plus(this.min)}let t=i.toNumber();t=S(t,this.min,this.max),this.value!==t&&(this._onChange(t),this.valueChange.emit(t),this.value=t)}get _percentageValue(){let e=((this.value||0)-this.min)/(this.max-this.min)*100;return this.inverted&&(e=100-e),S(e,0,100)}_sliderClick(e){if(this.disabled)return;this._focusHandleElement(),e.stopPropagation();let i=this._getPositionFromEvent(e),t=this._getValueFromPosition(i);this.value!==t&&(this.value=t,this._onChange(this.value))}_focus(){this._focusHandleElement()}_selectStart(){return!1}_handleKeypress(e){if(!this.disabled)switch(e.keyCode){case 40:case(this.inverted?39:37):return this._changeValue(-this.step);case 38:case(this.inverted?37:39):return this._changeValue(this.step)}}_dragStart(){this.disabled||(this._ngZone.runOutsideAngular(()=>{this._dragSubscriptions.push(h(document,"touchmove").subscribe(this._handleDragMove.bind(this))),this._dragSubscriptions.push(h(document,"mousemove").subscribe(this._handleDragMove.bind(this)))}),this._dragSubscriptions.push(h(document,"touchcancel").subscribe(this._handleDragStop.bind(this))),this._dragSubscriptions.push(h(document,"mouseup").subscribe(this._handleDragStop.bind(this))),this._dragSubscriptions.push(h(document,"touchend").subscribe(this._handleDragStop.bind(this))))}_formatValue(e){return this.valueFormatter(e)}_formatLabelLeft(){return this.inverted?this._formatLabelMax():this._formatLabelMin()}_formatLabelRight(){return this.inverted?this._formatLabelMin():this._formatLabelMax()}_formatLabelMin(){return this.labelMinFormatter(this.min)}_formatLabelMax(){return this.labelMaxFormatter(this.max)}_focusHandleElement(){this._handleElement.nativeElement.focus()}_updateLabelPosition(){let e=this._handleElement.nativeElement.querySelector(".nx-slider__value");if(!e)return;let i=this._handleElement.nativeElement.getBoundingClientRect(),t=e.getBoundingClientRect(e),r=i.left+i.width/2,s=r-t.width/2,l=r+t.width/2,c=document.body.offsetWidth,_=ae;s<0?_=-r+de+"px":l>c&&(_=-t.width+c-r-de+"px"),this._labelPosition=`translateX(${_})`,this._cdr.markForCheck()}_getValueFromPosition(e){let i=this._dir?.value==="rtl",t=this.elementRef.nativeElement.getBoundingClientRect(),s=(Math.max(t.left,Math.min(t.right,e))-t.left)/t.width;this.inverted&&(s=1-s),i&&(s=1-s);let l;if(s===1)l=this.max;else if(s===0)l=this.min;else{let c=this.min+s*(this.max-this.min);l=Math.round((c-this.min)/this.step)*this.step+this.min}return this._decimalPlaces&&(l=this._roundToDecimal(l)),S(l,this.min,this.max)}_roundToDecimal(e){return parseFloat(e.toFixed(this._decimalPlaces))}_handleDragMove(e){e.preventDefault();let i=this._getPositionFromEvent(e),t=this._getValueFromPosition(i);this.value!==t&&this._ngZone.run(()=>{this.value=t,this._onChange(this.value),this._cdr.markForCheck()})}_handleDragStop(e){this._reset();let i=this._getPositionFromEvent(e),t=this._getValueFromPosition(i);this.value!==t&&(this.value=t,this._onChange(this.value))}_reset(){for(let e of this._dragSubscriptions)e.unsubscribe();this._dragSubscriptions=[]}_getPositionFromEvent(e){return(e.type.includes("touch")?e.touches.item(0):e).clientX}getTicks(e,i,t,r,s=[]){if(!r)return[];let l=i-e,c=t*r,_=c/l*100,F=Math.floor(100/_),ce=100-_*F,_e=3;if(!s.length){let N=l/2;s.push(N)}return Array.from({length:F},(N,he)=>{let D=he+1,ue=D*c;return{gapSize:_,hideTick:D===F&&ce<=_e,isLongTick:s.includes(ue)}})}static{this.\u0275fac=function(i){return new(i||n)(b(G),b(ie),b(j),b(oe,8),b(le))}}static{this.\u0275cmp=U({type:n,selectors:[["nx-slider"]],contentQueries:function(i,t,r){if(i&1&&K(r,Oe,4),i&2){let s;E(s=I())&&(t._appendixChildren=s)}},viewQuery:function(i,t){if(i&1&&J(pe,7),i&2){let r;E(r=I())&&(t._handleElement=r.first)}},hostVars:5,hostBindings:function(i,t){i&1&&C("keydown",function(s){return t._handleKeypress(s)}),i&2&&(P("aria-disabled",t.disabled?!0:null),w("nx-slider--disabled",t.disabled)("nx-slider--negative",t.negative))},inputs:{tickInterval:"tickInterval",id:"id",tabindex:"tabindex",min:"min",max:"max",step:"step",label:"label",disabled:"disabled",inverted:"inverted",thumbLabel:"thumbLabel",value:"value",negative:"negative",hideLabels:"hideLabels",longTicks:"longTicks",valueFormatter:"valueFormatter",labelMinFormatter:"labelMinFormatter",labelMaxFormatter:"labelMaxFormatter"},outputs:{valueChange:"valueChange"},features:[ee([{provide:se,useExisting:R(()=>n),multi:!0}])],ngContentSelectors:me,decls:12,vars:18,consts:[["handle",""],[1,"nx-slider__label",3,"click","id"],[1,"nx-slider__wrapper"],[1,"nx-slider__slide",3,"click"],[1,"nx-slider__background"],[1,"nx-slider__filler"],["role","slider",1,"nx-slider__handle",3,"mousedown","touchstart","selectstart","id"],[1,"nx-slider__tick-container"],[1,"nx-slider__label-container"],[1,"nx-slider__appendix"],[1,"nx-slider__value"],[1,"nx-slider__arrow"],[1,"nx-slider__tick",3,"nx-slider__tick-primary","nx-slider__tick-hidden","ngStyle"],[1,"nx-slider__tick",3,"ngStyle"],[1,"nx-slider__value-label"]],template:function(i,t){if(i&1){let r=q();X(xe),d(0,"label",1),C("click",function(){return u(r),g(t._focusHandleElement())}),k(1),a(),d(2,"div",2)(3,"div",3),C("click",function(l){return u(r),g(t._sliderClick(l))}),d(4,"div",4)(5,"div",5)(6,"div",6,0),C("mousedown",function(){return u(r),g(t._dragStart())})("touchstart",function(){return u(r),g(t._dragStart())})("selectstart",function(){return u(r),g(t._selectStart())}),M(8,fe,3,3),a()(),M(9,ke,3,0,"div",7)(10,Me,5,2,"div",8),a()(),M(11,Pe,2,0,"div",9),a()}i&2&&(O("id",t.id+"-label"),P("for",t.id+"-handle"),o(),T(t.label),o(),w("nx-slider__has-ticks",!t.tickInterval),o(3),L("width",t._percentageValue,"%"),o(),O("id",t.id+"-handle"),P("tabindex",t.tabindex)("aria-labelledby",t.id+"-label")("aria-valuemin",t._formatLabelMin())("aria-valuemax",t._formatLabelMax())("aria-valuetext",t._formatValue(t.value))("aria-valuenow",t._formatValue(t.value)),o(2),f(t.thumbLabel?8:-1),o(),f(t.tickInterval?9:-1),o(),f(t.hideLabels?-1:10),o(),f(t._appendixChildren.length?11:-1))},dependencies:[ne],styles:["[_nghost-%COMP%]{display:block}.nx-slider__label[_ngcontent-%COMP%]{font-size:var(--slider-label-font-size);line-height:var(--slider-label-line-height);font-weight:var(--slider-label-font-weight);letter-spacing:var(--slider-label-letter-spacing);color:var(--slider-label-color)}.nx-slider__wrapper[_ngcontent-%COMP%]{display:flex;padding-top:66px;padding-bottom:36px}.nx-slider__slide[_ngcontent-%COMP%]{position:relative;flex:auto;min-width:0;display:flex;align-items:center}.nx-slider__background[_ngcontent-%COMP%]{position:relative;background-color:var(--slider-background-color);display:block;height:4px;border-radius:2px;white-space:nowrap;cursor:pointer;width:100%}.nx-slider__tick-container[_ngcontent-%COMP%]{margin-top:13px;display:flex;border-left:1px solid var(--slider-tick-color);border-right:1px solid var(--slider-tick-color);height:9px;align-items:center;overflow:hidden}.nx-slider__tick[_ngcontent-%COMP%]{height:5px;display:flex;border-right:1px solid var(--slider-tick-color)}.nx-slider__tick.nx-slider__tick-primary[_ngcontent-%COMP%]{height:9px}.nx-slider__tick.nx-slider__tick-hidden[_ngcontent-%COMP%]{border:none}.nx-slider__filler[_ngcontent-%COMP%]{display:inline-block;height:4px;border-radius:2px;background-color:var(--slider-indicator-color);float:left;position:relative}[dir=rtl][_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{float:right}.nx-slider__handle[_ngcontent-%COMP%]{position:absolute;width:24px;height:24px;right:0;transform:translate(50%);border-radius:50%;box-shadow:var(--shadow-small);border-style:solid;border-width:1px;border-color:var(--slider-handle-border-color);background:var(--slider-handle-background-color);box-sizing:border-box;top:-10px;z-index:2;cursor:grab}[dir=rtl][_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{left:0;right:auto;transform:translate(-50%)}.nx-slider__handle[_ngcontent-%COMP%]:focus{outline:none;border-color:var(--slider-handle-focus-border-color)}.nx-slider__handle[_ngcontent-%COMP%]:active{box-shadow:var(--shadow-small),inset 0 0 0 4px var(--slider-handle-background-color),inset 0 0 0 24px var(--slider-handle-active-inset-color);cursor:grabbing}.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{border-color:var(--slider-handle-focus-border-color);box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-slider__handle.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.nx-slider__value[_ngcontent-%COMP%]{display:block;position:absolute;font-size:var(--slider-handle-value-font-size);line-height:var(--slider-handle-value-line-height);font-weight:var(--slider-handle-value-font-weight);letter-spacing:var(--slider-handle-value-letter-spacing);color:var(--slider-handle-value-color);border:1px solid;border-color:var(--slider-handle-border-color);border-radius:4px;box-shadow:var(--shadow-small);cursor:grab;height:24px;min-width:48px;text-align:center;padding:3px 8px;top:-40px;background:var(--slider-value-background-color);left:12px;transform:translate(-50%)}.nx-slider__value[_ngcontent-%COMP%]:active{cursor:grabbing}.nx-slider__arrow[_ngcontent-%COMP%]{width:6px;height:6px;border-right:1px solid;border-bottom:1px solid;left:50%;top:-22px;transform:translate(-50%,3px) rotate(45deg);position:absolute;box-shadow:-2px -2px 1px 1px var(--slider-value-background-color),2px 2px 4px var(--shadow-small-color);background:var(--slider-value-background-color);border-color:var(--slider-handle-border-color)}.nx-slider__label-container[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;font-size:var(--slider-value-label-font-size);line-height:var(--slider-value-label-line-height);font-weight:var(--slider-value-label-font-weight);letter-spacing:var(--slider-value-label-letter-spacing);color:var(--slider-value-label-color)}.nx-slider__has-ticks[_ngcontent-%COMP%]   .nx-slider__label-container[_ngcontent-%COMP%]{margin-top:16px}.nx-slider__max-value-label[_ngcontent-%COMP%]{text-align:right}.nx-slider--disabled[_nghost-%COMP%]{cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{pointer-events:none;cursor:not-allowed}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%], .nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:var(--slider-value-disabled-background-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--slider-indicator-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{color:var(--slider-handle-value-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label-container[_ngcontent-%COMP%]{color:var(--slider-value-label-disabled-color)}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{background:var(--slider-value-disabled-background-color);box-shadow:-2px -2px 1px 1px var(--slider-value-disabled-background-color),2px 2px 4px #41414180}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background:var(--slider-disabled-background-color)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative)}.nx-slider--negative[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:var(--slider-negative-background-color)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__label[_ngcontent-%COMP%], .nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value-label[_ngcontent-%COMP%]{color:var(--negative-01)}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:var(--negative-01)}@media screen and (forced-colors: active){.nx-slider__background[_ngcontent-%COMP%]{background-color:buttonFace;border:1px solid buttonText}.nx-slider__filler[_ngcontent-%COMP%]{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]{background-color:buttonFace;border-color:buttonText}.nx-slider__handle[_ngcontent-%COMP%]:hover, .nx-slider__handle[_ngcontent-%COMP%]:focus{background-color:highlight}.nx-slider__handle[_ngcontent-%COMP%]:active{background-color:buttonText}.nx-slider__value[_ngcontent-%COMP%]{border-color:buttonText;color:buttonText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__background[_ngcontent-%COMP%]{background-color:Canvas;border:1px solid GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__handle[_ngcontent-%COMP%]{background-color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__value[_ngcontent-%COMP%]{border-color:GrayText;color:GrayText}.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__arrow[_ngcontent-%COMP%]{border-color:GrayText}.nx-slider--negative.nx-slider--disabled[_nghost-%COMP%]   .nx-slider__filler[_ngcontent-%COMP%]{background-color:GrayText}}.nx-slider__appendix[_ngcontent-%COMP%]{align-items:center;white-space:nowrap;margin-left:16px;display:flex;height:0}.nx-slider__appendix[_ngcontent-%COMP%]     nx-icon.nx-icon--auto{font-size:var(--slider-icon-size)}.nx-slider__appendix[_ngcontent-%COMP%]     nx-icon{display:block}"],changeDetection:0})}}return n})(),Je=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=B({type:n})}static{this.\u0275inj=A({imports:[re]})}}return n})();export{Oe as a,Ke as b,Je as c};