import{a as h}from"./chunk-OU4XFSTW.js";import{a as bt}from"./chunk-B6DRX37V.js";import{c as xt,f as gt,g as _t}from"./chunk-KZQN4PNA.js";import{a as ht}from"./chunk-65GLPSAG.js";import{g as ct}from"./chunk-YRHK7FMC.js";import"./chunk-LMYTBCUX.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import{a as ft}from"./chunk-RTSM2X3X.js";import{b as B,c as at,d as mt}from"./chunk-WM3ASZ64.js";import{A as x,B as ee,a as Ye,c as $e,g as v,h as L,i as et,j as tt,k as nt,l as P,m as O,p as Y,s as $,y as it}from"./chunk-3CXM22DE.js";import"./chunk-DZRQJYOJ.js";import"./chunk-KSMSSQIV.js";import{a as pt,c as st}from"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import{o as lt,p as ut,s as dt}from"./chunk-VPHHQYPB.js";import{d as rt,e as ot,g as ge}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{c as te,e as R}from"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as w}from"./chunk-APNBV455.js";import{l as Ke,v as Xe,z as Je}from"./chunk-CCSED5RY.js";import{Aa as C,Ac as k,Ba as N,Cb as pe,Ea as Re,Eb as se,Fc as le,Gb as je,Gc as ue,Hc as de,Ic as Ze,Jc as ce,Ka as Be,Kc as be,Lb as a,Lc as K,Mb as Z,Mc as m,Na as T,Nb as Q,Oa as oe,Oc as _,Pb as We,Qc as y,Rb as z,Rc as S,Sc as M,Tc as X,Xc as fe,Yc as he,ac as V,ba as ze,bc as c,bd as Qe,cc as Ge,dc as ae,ed as xe,gc as E,ia as re,j as ie,ja as G,jd as He,ka as U,lc as r,ld as J,mc as o,nc as l,nd as qe,ra as Ve,rc as H,sa as ke,wb as u,wc as q,xb as g,yc as me,zc as Ue}from"./chunk-LG2ZA55B.js";var yt=["customLabel"],St=["nativeInput"],Mt=[[["nx-number-stepper-prefix"]],[["nx-number-stepper-suffix"]],[["nx-error"]],"*"],Et=["nx-number-stepper-prefix","nx-number-stepper-suffix","nx-error","*"];function wt(t,j){if(t&1&&(r(0,"div",2)(1,"label",12),m(2),o()()),t&2){let e=me();u(),c("for",e.inputId),u(),_(" ",e.label()," ")}}function Dt(t,j){if(t&1&&(r(0,"div",2,1),k(2,3),o()),t&2){let e=me();V("id",e.labelId)}}var vt=(()=>{class t{set resize(e){this._resize=w(e),this._resize?(this._addEventListener(),this.updateInputWidth()):this._removeEventListener()}get resize(){return this._resize}constructor(e,n,i){this._element=e,this._renderer=n,this._cdr=i,this._resize=!0,this.updateInputWidth=this.updateInputWidth.bind(this)}ngAfterViewInit(){this.resize&&this._addEventListener()}ngOnDestroy(){this._removeEventListener()}updateInputWidth(){let n=this._renderer.createElement("canvas").getContext("2d");if(!n)return;let i=window.getComputedStyle(this._element.nativeElement);n.font=dt(i);let p=n.measureText(this._element.nativeElement.value),d=this.sumStyles(i.paddingLeft,i.paddingRight),f=this.sumStyles(i.borderLeftWidth,i.borderRightWidth),W=p.width+d+f+16,F=parseFloat(i.minWidth);this.width=Math.max(Number.isNaN(F)?0:F,W),this._cdr.markForCheck()}_addEventListener(){this._element.nativeElement.addEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.addEventListener("change",this.updateInputWidth,!0)}_removeEventListener(){this._element.nativeElement.removeEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.removeEventListener("change",this.updateInputWidth,!0)}sumStyles(e,n){return(parseInt(e,10)||0)+(parseInt(n,10)||0)}static{this.\u0275fac=function(n){return new(n||t)(g(oe),g(pe),g(xe))}}static{this.\u0275dir=Q({type:t,selectors:[["input","nxAutoResize",""]],hostVars:2,hostBindings:function(n,i){n&2&&Ge("width",i.width,"px")},inputs:{resize:[0,"nxAutoResize","resize"]}})}}return t})(),D=(()=>{class t{constructor(){this.changes=new ie,this.decrementAriaLabel="Decrement",this.incrementAriaLabel="Increment"}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275prov=G({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})(),Lt={big:"nx-stepper--big",normal:""},Pt=["nx-stepper"],Ot=["nx-stepper__input"],It=new RegExp(/^-?\d+([,.]\d+)?$/g),At={provide:Ye,useExisting:re(()=>s),multi:!0},Ft={provide:$e,useExisting:re(()=>s),multi:!0},Tt=0,s=(()=>{class t extends bt{set resize(e){this._resize=w(e),this._cdr.markForCheck()}get resize(){return this._resize}set incrementAriaLabel(e){this._incrementAriaLabel=e}get incrementAriaLabel(){return this._incrementAriaLabel}set decrementAriaLabel(e){this._decrementAriaLabel=e}get decrementAriaLabel(){return this._decrementAriaLabel}set step(e){this._step=Number(e)}get step(){return this._step}set min(e){this._min=Number(e)}get min(){return this._min}set max(e){this._max=Number(e)}get max(){return this._max}set value(e){this._value=e,this._value?this.setInputValue(this._value):this.setInputValue(0),this._cdr.markForCheck()}get value(){return this._value}set negative(e){this._negative!==e&&(this._negative=w(e),this._cdr.markForCheck())}get negative(){return this._negative}set leadingZero(e){this._leadingZero!==e&&(this._leadingZero=w(e),this.setInputValue(this.value),this._cdr.markForCheck())}get leadingZero(){return this._leadingZero}set disabled(e){this._disabled=w(e)}get disabled(){return this._disabled}set readonly(e){this._readonly=w(e)}get readonly(){return this._readonly}constructor(e,n,i,p,d){super(Lt,i,n,Pt),this._cdr=e,this._intl=p,this.localeId=d,this.decimalSeperator=".",this.inputClassNames=ut("regular",Ot),this._componentId=Tt++,this.inputId=`nx-number-stepper-${this._componentId}`,this.labelId=`nx-number-stepper-label-${this._componentId}`,this.projectedLabel=se(HTMLLabelElement),this.ariaDescribedBy=T(null),this.ariaDescribedByComputed=J(()=>{let f=this.projectedLabelWrapper()&&!this.projectedLabel();if(!(!!this.ariaDescribedBy()||this.errorMessages().length>0)&&!f)return null;let F=[...this.errorMessages().map(Nt=>Nt.id),this.ariaDescribedBy()];return f&&F.push(this.labelId),F.join(" ")}),this.projectedLabelWrapper=se("customLabel"),this.projectedLabelElement=J(()=>this.projectedLabelWrapper()?.nativeElement.querySelector("label")),this.errorMessages=je(B),this.valueChange=new Be,this._resize=!1,this.label=T(null),this._incrementAriaLabel="",this._decrementAriaLabel="",this.inputAriaLabel=T(null),this.ariaLabelledByComputed=J(()=>{let f=!!this.label(),W=this.projectedLabelWrapper()?.nativeElement?.children?.length>0;return f||W?this.labelId:null}),this._step=1,this._min=0,this._max=100,this._value=0,this._negative=!1,this._leadingZero=!0,this._disabled=!1,this._readonly=!1,this.inputFieldReadonly=T(!1,{transform:He,alias:"inputFieldReadonly"}),this._destroyed=new ie,this.onChangeCallback=()=>{},this.onTouchedCallback=()=>{},this._intl.changes.pipe(ze(this._destroyed)).subscribe(()=>this._cdr.markForCheck()),this.decimalSeperator=this.getDecimalSeparator(this.localeId),qe(()=>{this.projectedLabelElement()&&this.projectedLabelElement().setAttribute("for",this.inputId)})}ngAfterViewInit(){this.setInputValue(this._value)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}setInputValue(e){let n=e||0;this.leadingZero?this.numberInputValue=lt(n.toString(),2):this.numberInputValue=n.toString(),this.nativeInput&&(this.nativeInput.nativeElement.value=this.numberInputValue),setTimeout(()=>{this.triggerResize()})}disabledButton(){return this.readonly||this.disabled?!0:null}writeValue(e){this.value=e}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this._disabled=e,this._cdr.markForCheck()}onInputChange(e){let i=e.target.value.replace(/[,.]/g,".");if(this.validateUserInput(e.target.value)?this._value=Number(i):this._value=null,this._value!==null){let p=this.getDecimalPoint(i),d=parseFloat(i).toFixed(p);d=d.replace(".",this.decimalSeperator),this.setInputValue(d)}this.valueChange.emit(this._value),this.onChangeCallback(this._value)}getDecimalSeparator(e){return Intl.NumberFormat(e).formatToParts(1.1).find(p=>p.type==="decimal")?.value||"."}validateUserInput(e){return!!e.match(It)}getDecimalPoint(e){return e.includes(".")?e.split(".")[1].length:0}incrementOnClick(){this._increment(),this.onTouchedCallback()}incrementOnKey(e){this._increment(),e.preventDefault()}_increment(){let e;this.isBetweenLimits(this._value||0)?e=this.getNextGreaterValue(this._value||0):e=this.enforceLimits(this._value||0),this.value=e,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}triggerResize(){this.resize&&(this.autoResize.updateInputWidth(),this._cdr.markForCheck())}decrementOnClick(){this._decrement(),this.onTouchedCallback()}decrementOnKey(e){this._decrement(),e.preventDefault()}_decrement(){let e;this.isBetweenLimits(this._value||0)?e=this.getNextLowerValue(this._value||0):e=this.enforceLimits(this._value||0),this.value=e,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}enforceLimits(e){return e>this._max?this._max:e<this._min?this._min:e}getNextLowerValue(e){e||(e=0);let n;return this.isValidStep(e)?n=new h(e).minus(new h(this._step)).toNumber():n=new h(e).toNearest(this._step,h.ROUND_DOWN).toNumber(),this.enforceLimits(n)}getNextGreaterValue(e){let n;return e||(e=0),this.isValidStep(e)?n=new h(e).plus(new h(this._step)).toNumber():n=new h(e).toNearest(this._step,h.ROUND_UP).toNumber(),this.enforceLimits(n)}isBetweenLimits(e){let n=new h(this._min),i=new h(this._max),p=new h(e);return p.lessThanOrEqualTo(i)&&p.greaterThanOrEqualTo(n)}isMinimum(){return this._value===this._min}isMaximum(){return this._value===this._max}isValidStep(e){e===null&&(e=new h(0));let n=new h(this._min),i=new h(e),p=n.minus(i).mod(new h(this._step)).toNumber();return!!(this.isBetweenLimits(e)&&(this.isMinimum()||this.isMaximum()||p===0))}userInputToNumber(e){return parseInt(e,10)||0}_validateFn(){if(this.isValidStep(this._value)){if(this._value===null)return{nxNumberStepperFormatError:"Not a valid number"}}else return{nxNumberStepperStepError:"Value is not a valid step"};return null}validate(e){return this._validateFn()}get _buttonType(){return"secondary"+(this.negative?" negative":"")}static{this.\u0275fac=function(n){return new(n||t)(g(xe),g(pe),g(oe),g(D),g(Qe))}}static{this.\u0275cmp=a({type:t,selectors:[["nx-number-stepper"]],contentQueries:function(n,i,p){n&1&&Ze(p,i.errorMessages,B,4),n&2&&be()},viewQuery:function(n,i){if(n&1&&(ce(i.projectedLabel,HTMLLabelElement,5),ce(i.projectedLabelWrapper,yt,5),le(vt,7),le(St,5)),n&2){be(2);let p;ue(p=de())&&(i.autoResize=p.first),ue(p=de())&&(i.nativeInput=p.first)}},hostVars:4,hostBindings:function(n,i){n&2&&ae("is-negative",i.negative)("is-disabled",i.disabled)},inputs:{classNames:[0,"size","classNames"],ariaDescribedBy:[1,"ariaDescribedBy"],resize:"resize",label:[1,"label"],incrementAriaLabel:"incrementAriaLabel",decrementAriaLabel:"decrementAriaLabel",inputAriaLabel:[1,"inputAriaLabel"],step:"step",min:"min",max:"max",value:"value",negative:"negative",leadingZero:"leadingZero",disabled:"disabled",readonly:"readonly",inputFieldReadonly:[1,"inputFieldReadonly"]},outputs:{valueChange:"valueChange"},features:[X([At,Ft]),We],ngContentSelectors:Et,decls:15,vars:21,consts:[["nativeInput",""],["customLabel",""],[1,"nx-stepper__label"],[1,"nx-stepper__input-container"],["type","button",1,"nx-stepper__down","nx-stepper__control",3,"click","nxButton","disabled"],["name","minus","size","s","aria-hidden","true"],[1,"nx-stepper__input-wrapper"],[1,"nx-stepper__inner-wrapper"],["type","text","inputmode","decimal","spellcheck","false",3,"input","blur","keydown.arrowup","keydown.arrowdown","nxAutoResize","id","ngClass","disabled","readonly"],[1,"nx-stepper__input-underline"],["type","button",1,"nx-stepper__up","nx-stepper__control",3,"click","nxButton","disabled"],["name","plus","size","s","aria-hidden","true"],[3,"for"]],template:function(n,i){if(n&1){let p=H();Ue(Mt),z(0,wt,3,2,"div",2)(1,Dt,3,1,"div",2),r(2,"div",3)(3,"button",4),q("click",function(){return C(p),N(i.decrementOnClick())}),l(4,"nx-icon",5),o(),r(5,"div",6)(6,"div",7),k(7),r(8,"input",8,0),q("input",function(f){return C(p),N(i.onInputChange(f))})("blur",function(){return C(p),N(i.onTouchedCallback())})("keydown.arrowup",function(f){return C(p),N(i.incrementOnKey(f))})("keydown.arrowdown",function(f){return C(p),N(i.decrementOnKey(f))}),o(),k(10,1),o(),l(11,"div",9),o(),r(12,"button",10),q("click",function(){return C(p),N(i.incrementOnClick())}),l(13,"nx-icon",11),o()(),k(14,2)}n&2&&(E(i.label()?0:-1),u(),E(i.label()?-1:1),u(),ae("error-spacing",i.errorMessages()),u(),c("nxButton",i._buttonType)("disabled",i.disabledButton()||(i.value||0)<=i.min),V("aria-label",i.decrementAriaLabel||i._intl.decrementAriaLabel)("aria-disabled",i.disabledButton()),u(5),c("nxAutoResize",i.resize)("id",i.inputId)("ngClass",i.inputClassNames)("disabled",i.disabled)("readonly",i.readonly||i.inputFieldReadonly()),V("aria-invalid",i.errorMessages().length>0||null)("aria-describedby",i.ariaDescribedByComputed())("aria-label",i.inputAriaLabel())("aria-labelledby",i.ariaLabelledByComputed()),u(4),c("nxButton",i._buttonType)("disabled",i.disabledButton()||(i.value||0)>=i.max),V("aria-label",i.incrementAriaLabel||i._intl.incrementAriaLabel)("aria-disabled",i.disabledButton()))},dependencies:[ge,rt,R,te,vt,Ke],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button, [_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]:invalid{box-shadow:none}[_nghost-%COMP%]   label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%]{margin-top:12px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{padding:0}.nx-stepper__input-container[_ngcontent-%COMP%]{align-items:flex-end;display:flex}.nx-stepper__label[_ngcontent-%COMP%]{display:flex;font-size:var(--number-stepper-label-font-size);line-height:var(--number-stepper-label-line-height);font-weight:var(--number-stepper-label-font-weight);letter-spacing:var(--number-stepper-label-letter-spacing)}.nx-stepper__control[_ngcontent-%COMP%]{width:32px;height:32px;min-height:32px;font-size:24px;margin:0;padding:0}.nx-stepper__input[_ngcontent-%COMP%]{width:56px;min-width:56px}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:var(--number-stepper-disabled-color);-webkit-text-fill-color:var(--number-stepper-disabled-color);cursor:not-allowed}.nx-stepper__input[_ngcontent-%COMP%]:read-only{cursor:default}.nx-stepper__input[_ngcontent-%COMP%],   .nx-stepper__prefix,   .nx-stepper__suffix{font-size:var(--number-stepper-small-font-size);line-height:var(--number-stepper-small-line-height);font-weight:var(--number-stepper-small-font-weight);letter-spacing:var(--number-stepper-small-letter-spacing);color:var(--number-stepper-color);background:0 0;outline:0;border:0;text-align:center}  .nx-stepper__suffix{margin-left:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__suffix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__suffix{margin-left:initial;margin-right:4px}  .nx-stepper__prefix{margin-right:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__prefix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__prefix{margin-right:initial;margin-left:4px}.nx-stepper__input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;margin:0 16px}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:28px;display:flex;align-items:baseline}.nx-stepper__input-underline[_ngcontent-%COMP%]{width:100%;margin-top:2px;height:2px;background:var(--number-stepper-underline-color)}.nx-stepper__input-underline--disabled[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__control[_ngcontent-%COMP%]{width:72px;min-height:48px;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{width:72px;min-width:72px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%], .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{font-size:var(--number-stepper-large-font-size);line-height:var(--number-stepper-large-line-height);font-weight:var(--number-stepper-large-font-weight);letter-spacing:var(--number-stepper-large-letter-spacing);height:48px;padding:0;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-wrapper[_ngcontent-%COMP%]{margin:0 24px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{margin-top:-nx-spacer(4xs)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:48px}.is-negative[_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]     .nx-stepper__prefix, .is-negative[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--negative)}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--number-stepper-disabled-color)}@media screen and (forced-colors: active){button.nx-stepper__control[_ngcontent-%COMP%]:disabled{border-color:GrayText;color:GrayText;opacity:1}.nx-stepper__input[_ngcontent-%COMP%]{color:buttonText}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:GrayText;-webkit-text-fill-color:GrayText}  .nx-stepper__prefix,   .nx-stepper__suffix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{forced-colors-adjust:none;color:CanvasText}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{background:buttonFace}.nx-stepper__input-underline[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:buttonText}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:GrayText}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:GrayText}}.error-spacing[_ngcontent-%COMP%]{margin-bottom:16px}"],changeDetection:0})}}return t})(),I=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275dir=Q({type:t,selectors:[["nx-number-stepper-prefix"]],hostAttrs:[1,"nx-stepper__prefix"]})}}return t})(),A=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275dir=Q({type:t,selectors:[["nx-number-stepper-suffix"]],hostAttrs:[1,"nx-stepper__suffix"]})}}return t})();function zt(t){return t||new D}var bn={provide:D,deps:[[new Ve,new ke,D]],useFactory:zt},Ct=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=Z({type:t})}static{this.\u0275inj=U({imports:[ct,x,R,ge,Je,s]})}}return t})();var _e=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-a11y-example"]],decls:3,vars:0,consts:[["inputAriaLabel","Number of travellers","incrementAriaLabel","Increase number of travellers","decrementAriaLabel","Decrease number of travellers"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0)(1,"label"),m(2,"Number of travellers"),o()())},dependencies:[s],encapsulation:2})}}return t})();var ve=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-additions-example"]],decls:7,vars:0,consts:[["resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"],["size","big","resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),m(2,"$"),o()(),l(3,"br"),r(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),m(6,"\u20AC"),o()())},dependencies:[s,A,I],encapsulation:2})}}return t})();var Ce=(()=>{class t{constructor(){this.number=1e3}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-auto-resizing-example"]],decls:3,vars:1,consts:[["resize","true","size","big","step","1000","max","10000000","inputAriaLabel","Number of Kilometers",3,"ngModelChange","ngModel"],["resize","true","size","big","step","0.03","min","0.06","inputAriaLabel","Distance in Meters"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0),M("ngModelChange",function(d){return S(i.number,d)||(i.number=d),d}),o(),l(1,"br")(2,"nx-number-stepper",1)),n&2&&y("ngModel",i.number)},dependencies:[s,x,v,P],encapsulation:2})}}return t})();var Ne=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-custom-label-example"]],decls:10,vars:1,consts:[["popover",""],["size","big","name","testStepper","inputAriaLabel","Number of travellers"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information","nx-margin-left-2xs","",1,"nx-margin-left-2xs",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"]],template:function(n,i){if(n&1&&(r(0,"nx-number-stepper",1)(1,"label"),m(2,"Number of travellers"),o(),r(3,"button",2),l(4,"nx-icon",3),o()(),r(5,"nx-popover",null,0)(7,"div")(8,"span"),m(9,"Custom help text as popover"),o()()()),n&2){let p=K(6);u(3),c("nxPopoverTriggerFor",p)}},dependencies:[s,te,gt,xt,ot],styles:[".info-icon[_ngcontent-%COMP%]{align-self:center}"]})}}return t})();var ye=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-disabled-explicit-example"]],decls:7,vars:2,consts:[["size","big","inputAriaLabel","Sum of Expenses",3,"disabled"],["size","normal","inputAriaLabel","Sum of Expenses",3,"disabled"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),m(2,"$"),o()(),l(3,"br"),r(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),m(6,"\u20AC"),o()()),n&2&&(c("disabled",!0),u(4),c("disabled",!0))},dependencies:[s,A,I],encapsulation:2})}}return t})();var Se=(()=>{class t{constructor(){this.fb=new et({amount:new nt({value:"",disabled:!0})})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-disabled-implicit-example"]],decls:8,vars:1,consts:[[3,"formGroup"],["formControlName","amount","size","big","inputAriaLabel","Sum of Expenses"],["formControlName","amount","size","normal","inputAriaLabel","Sum of Expenses"]],template:function(n,i){n&1&&(r(0,"form",0)(1,"nx-number-stepper",1)(2,"nx-number-stepper-suffix"),m(3,"$"),o()(),l(4,"br"),r(5,"nx-number-stepper",2)(6,"nx-number-stepper-prefix"),m(7,"\u20AC"),o()()()),n&2&&c("formGroup",i.fb)},dependencies:[x,O,v,L,ee,Y,$,s,A,I],encapsulation:2})}}return t})();var Me=(()=>{class t{constructor(){this.number=0}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-floating-point-example"]],decls:3,vars:0,consts:[["size","big","step","0.5","min","0.5","inputAriaLabel","Distance in meters"],["size","big","step","0.03","min","0.06","inputAriaLabel","Distance in meters"]],template:function(n,i){n&1&&l(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[s],encapsulation:2})}}return t})();var Ee=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-formatting-example"]],decls:7,vars:0,consts:[["nxCopytext","large",1,"label"],["size","normal","inputAriaLabel","Number of travellers"],["size","normal","leadingZero","false","inputAriaLabel","Number of travellers"]],template:function(n,i){n&1&&(r(0,"p",0),m(1,"With leading zero:"),o(),l(2,"nx-number-stepper",1)(3,"br"),r(4,"p",0),m(5,"Without leading zero:"),o(),l(6,"nx-number-stepper",2))},dependencies:[ft,s],styles:[".label[_ngcontent-%COMP%]{margin-bottom:8px}"]})}}return t})();var Vt=(()=>{class t extends D{constructor(){super(...arguments),this.decrementAriaLabel="verringern",this.incrementAriaLabel="erh\xF6hen"}static{this.\u0275fac=(()=>{let e;return function(i){return(e||(e=Re(t)))(i||t)}})()}static{this.\u0275prov=G({token:t,factory:t.\u0275fac})}}return t})(),we=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-localize-example"]],features:[X([{provide:D,useClass:Vt}])],decls:1,vars:0,template:function(n,i){n&1&&l(0,"nx-number-stepper")},dependencies:[s],encapsulation:2})}}return t})();var De=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-negative-example"]],decls:3,vars:0,consts:[[1,"docs-inverse-container"],["size","big","negative","true","label","Number of travellers",1,"nx-margin-bottom-s"],["size","normal","negative","true","label","Number of travellers"]],template:function(n,i){n&1&&(r(0,"div",0),l(1,"nx-number-stepper",1)(2,"nx-number-stepper",2),o())},dependencies:[s],encapsulation:2})}}return t})();var Le=(()=>{class t{constructor(e){this.fb=e,this.testForm=this.fb.group({stepperTestReactive:3})}static{this.\u0275fac=function(n){return new(n||t)(g(it))}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-reactive-example"]],decls:10,vars:11,consts:[[3,"formGroup"],["label","Number of travellers","size","big","formControlName","stepperTestReactive",3,"step","min","max"]],template:function(n,i){n&1&&(r(0,"form",0),l(1,"nx-number-stepper",1),r(2,"p"),m(3),fe(4,"json"),o(),r(5,"p"),m(6),o(),r(7,"p"),m(8),fe(9,"json"),o()()),n&2&&(c("formGroup",i.testForm),u(),c("step",1)("min",-3)("max",20),u(2),_("Form value: ",he(4,7,i.testForm.value),""),u(3),_("Form status: ",i.testForm.status,""),u(2),_(" Form errors: ",he(9,9,i.testForm.controls.stepperTestReactive.errors)," "))},dependencies:[x,O,v,L,ee,Y,$,s,Xe],encapsulation:2})}}return t})();var Pe=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-readonly-input-example"]],decls:6,vars:2,consts:[["size","big","step","20",1,"nx-margin-bottom-m",3,"readonly"],["size","big","step","20",3,"inputFieldReadonly"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0)(1,"label"),m(2,"Readonly"),o()(),r(3,"nx-number-stepper",1)(4,"label"),m(5,"Readonly input field"),o()()),n&2&&(c("readonly",!0),u(3),c("inputFieldReadonly",!0))},dependencies:[s],encapsulation:2,changeDetection:0})}}return t})();var Oe=(()=>{class t{constructor(){this.number=1}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-simple-binding-example"]],decls:3,vars:2,consts:[["size","big","step","2","inputAriaLabel","Number of travellers",3,"valueChange","value"]],template:function(n,i){n&1&&(r(0,"nx-number-stepper",0),M("valueChange",function(d){return S(i.number,d)||(i.number=d),d}),o(),r(1,"p"),m(2),o()),n&2&&(y("value",i.number),u(2),_("Value is: ",i.number,""))},dependencies:[s],encapsulation:2})}}return t})();var Ie=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-sizes-example"]],decls:3,vars:0,consts:[["size","big","inputAriaLabel","Number of travellers"],["size","normal","inputAriaLabel","Number of travellers"]],template:function(n,i){n&1&&l(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[s],encapsulation:2})}}return t})();var Ae=(()=>{class t{static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-standalone-example"]],decls:1,vars:0,consts:[["label","Number of travellers","size","big","name","testStepper"]],template:function(n,i){n&1&&l(0,"nx-number-stepper",0)},dependencies:[s],encapsulation:2})}}return t})();var Fe=(()=>{class t{constructor(){this.number=3}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-template-driven-example"]],decls:4,vars:2,consts:[["label","Number of travellers","size","big","name","testStepper",3,"ngModelChange","ngModel"]],template:function(n,i){n&1&&(r(0,"form")(1,"nx-number-stepper",0),M("ngModelChange",function(d){return S(i.number,d)||(i.number=d),d}),o(),r(2,"p"),m(3),o()()),n&2&&(u(),y("ngModel",i.number),u(2),_("Current value: ",i.number,""))},dependencies:[x,O,v,L,P,tt,s],encapsulation:2})}}return t})();function kt(t,j){t&1&&(r(0,"nx-error"),m(1," That's not a valid step "),o())}function Rt(t,j){t&1&&(r(0,"nx-error"),m(1," That's not a valid number "),o())}function Bt(t,j){t&1&&(r(0,"nx-message",2),m(1,` This is a hint. This message will disappear once you get an error from parsing or when the input is missing altogether.
`),o())}var Te=(()=>{class t{constructor(){this.number=0}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=a({type:t,selectors:[["number-stepper-validation-example"]],decls:7,vars:4,consts:[["stepperValidModel","ngModel"],["size","big","step","2","ariaDescribedBy","customHint",3,"ngModelChange","ngModel"],["context","info","id","customHint",1,"nx-margin-top-s"]],template:function(n,i){if(n&1){let p=H();r(0,"nx-number-stepper",1,0),M("ngModelChange",function(f){return C(p),S(i.number,f)||(i.number=f),N(f)}),r(2,"nx-label"),m(3,"Custom Label"),o(),z(4,kt,2,0,"nx-error")(5,Rt,2,0,"nx-error"),o(),z(6,Bt,2,0,"nx-message",2)}if(n&2){let p=K(1);y("ngModel",i.number),u(4),E(p.errors&&p.errors.nxNumberStepperStepError?4:-1),u(),E(p.errors&&p.errors.nxNumberStepperFormatError?5:-1),u(),E(p.errors?-1:6)}},dependencies:[s,x,v,P,pt,B,mt],encapsulation:2})}}return t})();var jt=[Pe,_e,ve,Ce,Ne,ye,Se,Me,Ee,we,De,Le,Oe,Ie,Ae,Fe,Te],Oi=(()=>{class t{static components(){return{"number-stepper-readonly-input":Pe,"number-stepper-a11y":_e,"number-stepper-additions":ve,"number-stepper-auto-resizing":Ce,"number-stepper-custom-label":Ne,"number-stepper-disabled-explicit":ye,"number-stepper-disabled-implicit":Se,"number-stepper-floating-point":Me,"number-stepper-formatting":Ee,"number-stepper-localize":we,"number-stepper-negative":De,"number-stepper-reactive":Le,"number-stepper-simple-binding":Oe,"number-stepper-sizes":Ie,"number-stepper-standalone":Ae,"number-stepper-template-driven":Fe,"number-stepper-validation":Te}}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275mod=Z({type:t})}static{this.\u0275inj=U({imports:[Ct,R,_t,at,st,ht,jt]})}}return t})();export{Oi as NumberExamplesModule};
