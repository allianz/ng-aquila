import{a as g}from"./chunk-OU4XFSTW.js";import{a as rt}from"./chunk-HJHGMUWY.js";import{c as at,f as pt,g as lt}from"./chunk-FUVVNV3S.js";import{a as st}from"./chunk-LWEPWJA4.js";import{g as it}from"./chunk-IEUNRTGX.js";import"./chunk-GCLFQC76.js";import"./chunk-FVQCNU3S.js";import"./chunk-5WTM5JTT.js";import{a as ot}from"./chunk-PY4WEUPS.js";import{b as Ye,c as $e}from"./chunk-NZVDRKZR.js";import{A as ee,a as je,c as Ge,f as y,g as F,h as Ue,i as Ze,j as Qe,k as L,l as I,o as Y,r as $,x as qe,z as x}from"./chunk-PXXWLB2C.js";import"./chunk-YRPHZ6Z4.js";import"./chunk-JFYG7OTE.js";import{a as Xe,c as Je}from"./chunk-IMB3L7QH.js";import"./chunk-BUOL5UUF.js";import{o as et,p as tt,s as nt}from"./chunk-EQR5TLGX.js";import{g as Ke,h as He,j as ue}from"./chunk-XYC5WHFX.js";import"./chunk-VOYYF5ZG.js";import"./chunk-W5TO766Y.js";import"./chunk-KPB4MAZI.js";import{c as te,e as k}from"./chunk-HTP466EP.js";import"./chunk-F6YBMDCU.js";import"./chunk-VEXGKVEH.js";import{a as O}from"./chunk-6R5DWTEA.js";import{l as Re,v as Be,z as We}from"./chunk-SCOWPO7V.js";import{$b as o,$c as me,Ab as se,Bc as S,Cc as w,Dc as E,Ec as J,Fc as l,Ia as N,Ja as M,Jb as Te,Jc as pe,Kc as le,Ma as Ie,Pb as G,Qb as z,Ra as oe,Rb as h,Sb as ze,Ta as Ae,Tb as ke,Wb as P,ac as s,bc as u,ea as De,fc as U,kc as Z,la as re,ma as R,mc as ae,n as ie,na as B,nc as Ve,oc as Q,tc as q,ua as Fe,ub as c,uc as K,va as Le,vb as v,vc as H,wc as X,xa as p,xc as d,ya as W,za as j,zc as C}from"./chunk-7XMZBBVT.js";var ct=["customLabel"],ft=["nativeInput"],bt=[[["nx-number-stepper-prefix"]],[["nx-number-stepper-suffix"]],"*"],ht=["nx-number-stepper-prefix","nx-number-stepper-suffix","*"];function gt(i,e){if(i&1&&(o(0,"div",2)(1,"label",12),d(2),s()()),i&2){let V=ae();c(),h("for",V.inputId),c(),C(" ",V.label," ")}}function xt(i,e){if(i&1&&(o(0,"div",2,1),Q(2,2),s()),i&2){let V=ae();z("id",V.ariaDescribedBy)}}var mt=(()=>{let e=class e{set resize(t){this._resize=O(t),this._resize?(this._addEventListener(),this.updateInputWidth()):this._removeEventListener()}get resize(){return this._resize}constructor(t,n,r){this._element=t,this._renderer=n,this._cdr=r,this._resize=!0,this.updateInputWidth=this.updateInputWidth.bind(this)}ngAfterViewInit(){this.resize&&this._addEventListener()}ngOnDestroy(){this._removeEventListener()}updateInputWidth(){let n=this._renderer.createElement("canvas").getContext("2d");if(!n)return;let r=window.getComputedStyle(this._element.nativeElement);n.font=nt(r);let m=n.measureText(this._element.nativeElement.value),f=this.sumStyles(r.paddingLeft,r.paddingRight),_=this.sumStyles(r.borderLeftWidth,r.borderRightWidth),dt=m.width+f+_+16,Oe=parseFloat(r.minWidth);this.width=Math.max(Number.isNaN(Oe)?0:Oe,dt),this._cdr.markForCheck()}_addEventListener(){this._element.nativeElement.addEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.addEventListener("change",this.updateInputWidth,!0)}_removeEventListener(){this._element.nativeElement.removeEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.removeEventListener("change",this.updateInputWidth,!0)}sumStyles(t,n){return(parseInt(t,10)||0)+(parseInt(n,10)||0)}};e.\u0275fac=function(n){return new(n||e)(v(oe),v(se),v(me))},e.\u0275dir=j({type:e,selectors:[["input","nxAutoResize",""]],hostVars:2,hostBindings:function(n,r){n&2&&ze("width",r.width,"px")},inputs:{resize:[0,"nxAutoResize","resize"]},standalone:!0});let i=e;return i})(),D=(()=>{let e=class e{constructor(){this.changes=new ie,this.decrementAriaLabel="Decrement",this.incrementAriaLabel="Increment"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=R({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})(),_t={big:"nx-stepper--big",normal:""},vt=["nx-stepper"],Ct=["nx-stepper__input"],yt=new RegExp(/^-?\d+(\.\d+)?$/g),Nt={provide:je,useExisting:re(()=>a),multi:!0},Mt={provide:Ge,useExisting:re(()=>a),multi:!0},St=0,a=(()=>{let e=class e extends rt{set resize(t){this._resize=O(t),this._cdr.markForCheck()}get resize(){return this._resize}set label(t){this._label!==t&&(this._label=t,this._cdr.markForCheck())}get label(){return this._label}set incrementAriaLabel(t){this._incrementAriaLabel=t}get incrementAriaLabel(){return this._incrementAriaLabel}set decrementAriaLabel(t){this._decrementAriaLabel=t}get decrementAriaLabel(){return this._decrementAriaLabel}set inputAriaLabel(t){this._inputAriaLabel=t}get inputAriaLabel(){return this._inputAriaLabel}set step(t){this._step=Number(t)}get step(){return this._step}set min(t){this._min=Number(t)}get min(){return this._min}set max(t){this._max=Number(t)}get max(){return this._max}set value(t){this._value=t,this._value?this.setInputValue(this._value):this.setInputValue(0),this._cdr.markForCheck()}get value(){return this._value}set negative(t){this._negative!==t&&(this._negative=O(t),this._cdr.markForCheck())}get negative(){return this._negative}set leadingZero(t){this._leadingZero!==t&&(this._leadingZero=O(t),this.setInputValue(this.value),this._cdr.markForCheck())}get leadingZero(){return this._leadingZero}set disabled(t){this._disabled=O(t)}get disabled(){return this._disabled}set readonlyInput(t){this._readonlyInput=O(t)}get readonlyInput(){return this._readonlyInput}constructor(t,n,r,m){super(_t,r,n,vt),this._cdr=t,this._intl=m,this.inputClassNames=tt("regular",Ct),this.inputId=`nx-number-stepper-${St++}`,this.ariaDescribedBy=null,this.valueChange=new Ae,this._resize=!1,this._incrementAriaLabel="",this._decrementAriaLabel="",this._inputAriaLabel="",this._step=1,this._min=0,this._max=100,this._value=0,this._negative=!1,this._leadingZero=!0,this._disabled=!1,this._readonlyInput=!1,this._destroyed=new ie,this.onChangeCallback=()=>{},this.onTouchedCallback=()=>{},this._intl.changes.pipe(De(this._destroyed)).subscribe(()=>this._cdr.markForCheck())}ngAfterViewInit(){this.ngContentWrapper&&(this.ariaDescribedBy=this.ngContentWrapper.nativeElement.children.length>0?`label-for-${this.inputId}`:""),this.setInputValue(this._value)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}setInputValue(t){let n=t||0;this.leadingZero?this.numberInputValue=et(n.toString(),2):this.numberInputValue=n.toString(),this.nativeInput&&(this.nativeInput.nativeElement.value=this.numberInputValue),setTimeout(()=>{this.triggerResize()})}writeValue(t){this.value=t}registerOnChange(t){this.onChangeCallback=t}registerOnTouched(t){this.onTouchedCallback=t}setDisabledState(t){this._disabled=t,this._cdr.markForCheck()}onInputChange(t){this.validateUserInput(t.target.value)?this._value=Number(t.target.value):this._value=null,this._value!==null&&this.setInputValue(this._value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}validateUserInput(t){return!!t.match(yt)}incrementOnClick(){this._increment(),this.onTouchedCallback()}incrementOnKey(t){this._increment(),t.preventDefault()}_increment(){let t;this.isBetweenLimits(this._value||0)?t=this.getNextGreaterValue(this._value||0):t=this.enforceLimits(this._value||0),this.value=t,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}triggerResize(){this.resize&&(this.autoResize.updateInputWidth(),this._cdr.markForCheck())}decrementOnClick(){this._decrement(),this.onTouchedCallback()}decrementOnKey(t){this._decrement(),t.preventDefault()}_decrement(){let t;this.isBetweenLimits(this._value||0)?t=this.getNextLowerValue(this._value||0):t=this.enforceLimits(this._value||0),this.value=t,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}enforceLimits(t){return t>this._max?this._max:t<this._min?this._min:t}getNextLowerValue(t){t||(t=0);let n;return this.isValidStep(t)?n=new g(t).minus(new g(this._step)).toNumber():n=new g(t).toNearest(this._step,g.ROUND_DOWN).toNumber(),this.enforceLimits(n)}getNextGreaterValue(t){let n;return t||(t=0),this.isValidStep(t)?n=new g(t).plus(new g(this._step)).toNumber():n=new g(t).toNearest(this._step,g.ROUND_UP).toNumber(),this.enforceLimits(n)}isBetweenLimits(t){let n=new g(this._min),r=new g(this._max),m=new g(t);return m.lessThanOrEqualTo(r)&&m.greaterThanOrEqualTo(n)}isMinimum(){return this._value===this._min}isMaximum(){return this._value===this._max}isValidStep(t){t===null&&(t=new g(0));let n=new g(this._min),r=new g(t),m=n.minus(r).mod(new g(this._step)).toNumber();return!!(this.isBetweenLimits(t)&&(this.isMinimum()||this.isMaximum()||m===0))}userInputToNumber(t){return parseInt(t,10)||0}_validateFn(){if(this.isValidStep(this._value)){if(this._value===null)return{nxNumberStepperFormatError:"Not a valid number"}}else return{nxNumberStepperStepError:"Value is not a valid step"};return null}validate(t){return this._validateFn()}get _buttonType(){return"secondary"+(this.negative?" negative":"")}};e.\u0275fac=function(n){return new(n||e)(v(me),v(se),v(oe),v(D))},e.\u0275cmp=p({type:e,selectors:[["nx-number-stepper"]],viewQuery:function(n,r){if(n&1&&(q(ct,5),q(mt,7),q(ft,5)),n&2){let m;K(m=H())&&(r.ngContentWrapper=m.first),K(m=H())&&(r.autoResize=m.first),K(m=H())&&(r.nativeInput=m.first)}},hostVars:4,hostBindings:function(n,r){n&2&&ke("is-negative",r.negative)("is-disabled",r.disabled)},inputs:{classNames:[0,"size","classNames"],resize:"resize",label:"label",incrementAriaLabel:"incrementAriaLabel",decrementAriaLabel:"decrementAriaLabel",inputAriaLabel:"inputAriaLabel",step:"step",min:"min",max:"max",value:"value",negative:"negative",leadingZero:"leadingZero",disabled:"disabled",readonlyInput:[0,"readonly","readonlyInput"]},outputs:{valueChange:"valueChange"},standalone:!0,features:[J([Nt,Mt]),Te,l],ngContentSelectors:ht,decls:14,vars:15,consts:[["nativeInput",""],["customLabel",""],[1,"nx-stepper__label"],[1,"nx-stepper__input-container"],["type","button",1,"nx-stepper__down","nx-stepper__control",3,"click","nxButton","disabled"],["name","minus","size","s","aria-hidden","true"],[1,"nx-stepper__input-wrapper"],[1,"nx-stepper__inner-wrapper"],["type","number","spellcheck","false",3,"input","blur","keydown.arrowup","keydown.arrowdown","nxAutoResize","id","ngClass","disabled","readonly"],[1,"nx-stepper__input-underline"],["type","button",1,"nx-stepper__up","nx-stepper__control",3,"click","nxButton","disabled"],["name","plus","size","s","aria-hidden","true"],[3,"for"]],template:function(n,r){if(n&1){let m=U();Ve(bt),G(0,gt,3,2,"div",2)(1,xt,3,1,"div",2),o(2,"div",3)(3,"button",4),Z("click",function(){return N(m),M(r.decrementOnClick())}),u(4,"nx-icon",5),s(),o(5,"div",6)(6,"div",7),Q(7),o(8,"input",8,0),Z("input",function(_){return N(m),M(r.onInputChange(_))})("blur",function(){return N(m),M(r.onTouchedCallback())})("keydown.arrowup",function(_){return N(m),M(r.incrementOnKey(_))})("keydown.arrowdown",function(_){return N(m),M(r.decrementOnKey(_))}),s(),Q(10,1),s(),u(11,"div",9),s(),o(12,"button",10),Z("click",function(){return N(m),M(r.incrementOnClick())}),u(13,"nx-icon",11),s()()}n&2&&(P(r.label?0:-1),c(),P(r.label?-1:1),c(2),h("nxButton",r._buttonType)("disabled",r.disabled||(r.value||0)<=r.min),z("aria-label",r.decrementAriaLabel||r._intl.decrementAriaLabel),c(5),h("nxAutoResize",r.resize)("id",r.inputId)("ngClass",r.inputClassNames)("disabled",r.disabled)("readonly",r.readonlyInput),z("aria-describedby",r.ariaDescribedBy)("aria-label",r.inputAriaLabel),c(4),h("nxButton",r._buttonType)("disabled",r.disabled||(r.value||0)>=r.max),z("aria-label",r.incrementAriaLabel||r._intl.incrementAriaLabel))},dependencies:[ue,Ke,k,te,mt,Re],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button, [_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]:invalid{box-shadow:none}[_nghost-%COMP%]   label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%]{margin-top:12px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{padding:0}.nx-stepper__input-container[_ngcontent-%COMP%]{align-items:flex-end;display:flex}.nx-stepper__label[_ngcontent-%COMP%]{display:flex;font-size:var(--number-stepper-label-font-size);line-height:var(--number-stepper-label-line-height);font-weight:var(--number-stepper-label-font-weight);letter-spacing:var(--number-stepper-label-letter-spacing)}.nx-stepper__control[_ngcontent-%COMP%]{width:32px;height:32px;min-height:32px;font-size:24px;margin:0;padding:0}.nx-stepper__input[_ngcontent-%COMP%]{width:56px;min-width:56px}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:var(--number-stepper-disabled-color);-webkit-text-fill-color:var(--number-stepper-disabled-color);cursor:not-allowed}.nx-stepper__input[_ngcontent-%COMP%]:read-only{cursor:default}.nx-stepper__input[_ngcontent-%COMP%],   .nx-stepper__prefix,   .nx-stepper__suffix{font-size:var(--number-stepper-small-font-size);line-height:var(--number-stepper-small-line-height);font-weight:var(--number-stepper-small-font-weight);letter-spacing:var(--number-stepper-small-letter-spacing);color:var(--number-stepper-color);background:0 0;outline:0;border:0;text-align:center}  .nx-stepper__suffix{margin-left:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__suffix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__suffix{margin-left:initial;margin-right:4px}  .nx-stepper__prefix{margin-right:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__prefix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__prefix{margin-right:initial;margin-left:4px}.nx-stepper__input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;margin:0 16px}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:28px;display:flex;align-items:baseline}.nx-stepper__input-underline[_ngcontent-%COMP%]{width:100%;margin-top:2px;height:2px;background:var(--number-stepper-underline-color)}.nx-stepper__input-underline--disabled[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__control[_ngcontent-%COMP%]{width:72px;min-height:48px;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{width:72px;min-width:72px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%], .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{font-size:var(--number-stepper-large-font-size);line-height:var(--number-stepper-large-line-height);font-weight:var(--number-stepper-large-font-weight);letter-spacing:var(--number-stepper-large-letter-spacing);height:48px;padding:0;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-wrapper[_ngcontent-%COMP%]{margin:0 24px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{margin-top:-nx-spacer(4xs)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:48px}.is-negative[_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]     .nx-stepper__prefix, .is-negative[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--negative)}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--number-stepper-disabled-color)}@media screen and (forced-colors: active){button.nx-stepper__control[_ngcontent-%COMP%]:disabled{border-color:GrayText;color:GrayText;opacity:1}.nx-stepper__input[_ngcontent-%COMP%]{color:buttonText}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:GrayText;-webkit-text-fill-color:GrayText}  .nx-stepper__prefix,   .nx-stepper__suffix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{forced-colors-adjust:none;color:CanvasText}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{background:buttonFace}.nx-stepper__input-underline[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:buttonText}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:GrayText}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:GrayText}}"],changeDetection:0});let i=e;return i})(),A=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=j({type:e,selectors:[["nx-number-stepper-prefix"]],hostAttrs:[1,"nx-stepper__prefix"],standalone:!0});let i=e;return i})(),T=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=j({type:e,selectors:[["nx-number-stepper-suffix"]],hostAttrs:[1,"nx-stepper__suffix"],standalone:!0});let i=e;return i})();function wt(i){return i||new D}var tn={provide:D,deps:[[new Fe,new Le,D]],useFactory:wt},ut=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=W({type:e}),e.\u0275inj=B({imports:[it,x,k,ue,We,a]});let i=e;return i})();var de=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-a11y-example"]],standalone:!0,features:[l],decls:3,vars:0,consts:[["inputAriaLabel","Number of travellers","incrementAriaLabel","Increase number of travellers","decrementAriaLabel","Decrease number of travellers"]],template:function(n,r){n&1&&(o(0,"nx-number-stepper",0)(1,"label"),d(2,"Number of travellers"),s()())},dependencies:[a]});let i=e;return i})();var ce=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-additions-example"]],standalone:!0,features:[l],decls:7,vars:0,consts:[["resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"],["size","big","resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"]],template:function(n,r){n&1&&(o(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),d(2,"$"),s()(),u(3,"br"),o(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),d(6,"\u20AC"),s()())},dependencies:[a,T,A]});let i=e;return i})();var fe=(()=>{let e=class e{constructor(){this.number=1e3}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-auto-resizing-example"]],standalone:!0,features:[l],decls:3,vars:1,consts:[["resize","true","size","big","step","1000","max","10000000","inputAriaLabel","Number of Kilometers",3,"ngModelChange","ngModel"],["resize","true","size","big","step","0.03","min","0.06","inputAriaLabel","Distance in Meters"]],template:function(n,r){n&1&&(o(0,"nx-number-stepper",0),E("ngModelChange",function(f){return w(r.number,f)||(r.number=f),f}),s(),u(1,"br")(2,"nx-number-stepper",1)),n&2&&S("ngModel",r.number)},dependencies:[a,x,y,L]});let i=e;return i})();var be=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-custom-label-example"]],standalone:!0,features:[l],decls:10,vars:1,consts:[["popover",""],["size","big","name","testStepper","inputAriaLabel","Number of travellers"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information","nx-margin-left-2xs","",1,"nx-margin-left-2xs",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"]],template:function(n,r){if(n&1&&(o(0,"nx-number-stepper",1)(1,"label"),d(2,"Number of travellers"),s(),o(3,"button",2),u(4,"nx-icon",3),s()(),o(5,"nx-popover",null,0)(7,"div")(8,"span"),d(9,"Custom help text as popover"),s()()()),n&2){let m=X(6);c(3),h("nxPopoverTriggerFor",m)}},dependencies:[a,te,pt,at,He],styles:[".info-icon[_ngcontent-%COMP%]{align-self:center}"]});let i=e;return i})();var he=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-disabled-explicit-example"]],standalone:!0,features:[l],decls:7,vars:2,consts:[["size","big","inputAriaLabel","Sum of Expenses",3,"disabled"],["size","normal","inputAriaLabel","Sum of Expenses",3,"disabled"]],template:function(n,r){n&1&&(o(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),d(2,"$"),s()(),u(3,"br"),o(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),d(6,"\u20AC"),s()()),n&2&&(h("disabled",!0),c(4),h("disabled",!0))},dependencies:[a,T,A]});let i=e;return i})();var ge=(()=>{let e=class e{constructor(){this.fb=new Ue({amount:new Qe({value:"",disabled:!0})})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-disabled-implicit-example"]],standalone:!0,features:[l],decls:8,vars:1,consts:[[3,"formGroup"],["formControlName","amount","size","big","inputAriaLabel","Sum of Expenses"],["formControlName","amount","size","normal","inputAriaLabel","Sum of Expenses"]],template:function(n,r){n&1&&(o(0,"form",0)(1,"nx-number-stepper",1)(2,"nx-number-stepper-suffix"),d(3,"$"),s()(),u(4,"br"),o(5,"nx-number-stepper",2)(6,"nx-number-stepper-prefix"),d(7,"\u20AC"),s()()()),n&2&&h("formGroup",r.fb)},dependencies:[x,I,y,F,ee,Y,$,a,T,A]});let i=e;return i})();var xe=(()=>{let e=class e{constructor(){this.number=0}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-floating-point-example"]],standalone:!0,features:[l],decls:3,vars:0,consts:[["size","big","step","0.5","min","0.5","inputAriaLabel","Distance in meters"],["size","big","step","0.03","min","0.06","inputAriaLabel","Distance in meters"]],template:function(n,r){n&1&&u(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[a]});let i=e;return i})();var _e=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-formatting-example"]],standalone:!0,features:[l],decls:7,vars:0,consts:[["nxCopytext","large",1,"label"],["size","normal","inputAriaLabel","Number of travellers"],["size","normal","leadingZero","false","inputAriaLabel","Number of travellers"]],template:function(n,r){n&1&&(o(0,"p",0),d(1,"With leading zero:"),s(),u(2,"nx-number-stepper",1)(3,"br"),o(4,"p",0),d(5,"Without leading zero:"),s(),u(6,"nx-number-stepper",2))},dependencies:[ot,a],styles:[".label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let i=e;return i})();var Et=(()=>{let e=class e extends D{constructor(){super(...arguments),this.decrementAriaLabel="verringern",this.incrementAriaLabel="erh\xF6hen"}};e.\u0275fac=(()=>{let t;return function(r){return(t||(t=Ie(e)))(r||e)}})(),e.\u0275prov=R({token:e,factory:e.\u0275fac});let i=e;return i})(),ve=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-localize-example"]],standalone:!0,features:[J([{provide:D,useClass:Et}]),l],decls:1,vars:0,template:function(n,r){n&1&&u(0,"nx-number-stepper")},dependencies:[a]});let i=e;return i})();var Ce=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-negative-example"]],standalone:!0,features:[l],decls:3,vars:0,consts:[[1,"docs-inverse-container"],["size","big","negative","true","label","Number of travellers",1,"nx-margin-bottom-s"],["size","normal","negative","true","label","Number of travellers"]],template:function(n,r){n&1&&(o(0,"div",0),u(1,"nx-number-stepper",1)(2,"nx-number-stepper",2),s())},dependencies:[a]});let i=e;return i})();var ye=(()=>{let e=class e{constructor(t){this.fb=t,this.testForm=this.fb.group({stepperTestReactive:3})}};e.\u0275fac=function(n){return new(n||e)(v(qe))},e.\u0275cmp=p({type:e,selectors:[["number-stepper-reactive-example"]],standalone:!0,features:[l],decls:10,vars:11,consts:[[3,"formGroup"],["label","Number of travellers","size","big","formControlName","stepperTestReactive",3,"step","min","max"]],template:function(n,r){n&1&&(o(0,"form",0),u(1,"nx-number-stepper",1),o(2,"p"),d(3),pe(4,"json"),s(),o(5,"p"),d(6),s(),o(7,"p"),d(8),pe(9,"json"),s()()),n&2&&(h("formGroup",r.testForm),c(),h("step",1)("min",-3)("max",20),c(2),C("Form value: ",le(4,7,r.testForm.value),""),c(3),C("Form status: ",r.testForm.status,""),c(2),C(" Form errors: ",le(9,9,r.testForm.controls.stepperTestReactive.errors)," "))},dependencies:[x,I,y,F,ee,Y,$,a,Be]});let i=e;return i})();var Ne=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-readonly-input-example"]],standalone:!0,features:[l],decls:1,vars:1,consts:[["size","big","inputAriaLabel","Number of travellers","step","20",3,"readonly"]],template:function(n,r){n&1&&u(0,"nx-number-stepper",0),n&2&&h("readonly",!0)},dependencies:[a],encapsulation:2,changeDetection:0});let i=e;return i})();var Me=(()=>{let e=class e{constructor(){this.number=1}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-simple-binding-example"]],standalone:!0,features:[l],decls:3,vars:2,consts:[["size","big","step","2","inputAriaLabel","Number of travellers",3,"valueChange","value"]],template:function(n,r){n&1&&(o(0,"nx-number-stepper",0),E("valueChange",function(f){return w(r.number,f)||(r.number=f),f}),s(),o(1,"p"),d(2),s()),n&2&&(S("value",r.number),c(2),C("Value is: ",r.number,""))},dependencies:[a]});let i=e;return i})();var Se=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-sizes-example"]],standalone:!0,features:[l],decls:3,vars:0,consts:[["size","big","inputAriaLabel","Number of travellers"],["size","normal","inputAriaLabel","Number of travellers"]],template:function(n,r){n&1&&u(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[a]});let i=e;return i})();var we=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-standalone-example"]],standalone:!0,features:[l],decls:1,vars:0,consts:[["label","Number of travellers","size","big","name","testStepper"]],template:function(n,r){n&1&&u(0,"nx-number-stepper",0)},dependencies:[a]});let i=e;return i})();var Ee=(()=>{let e=class e{constructor(){this.number=3}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-template-driven-example"]],standalone:!0,features:[l],decls:4,vars:2,consts:[["label","Number of travellers","size","big","name","testStepper",3,"ngModelChange","ngModel"]],template:function(n,r){n&1&&(o(0,"form")(1,"nx-number-stepper",0),E("ngModelChange",function(f){return w(r.number,f)||(r.number=f),f}),s(),o(2,"p"),d(3),s()()),n&2&&(c(),S("ngModel",r.number),c(2),C("Current value: ",r.number,""))},dependencies:[x,I,y,F,L,Ze,a]});let i=e;return i})();function Pt(i,e){i&1&&(o(0,"nx-message",2),d(1,` This is a hint. This message will disappear once you get an error from parsing or when the input is missing altogether.
`),s())}function Ot(i,e){i&1&&(o(0,"nx-error",3),d(1," That's not a valid step "),s())}function Dt(i,e){i&1&&(o(0,"nx-error",3),d(1," That's not a valid number "),s())}var Pe=(()=>{let e=class e{constructor(){this.number=0}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-validation-example"]],standalone:!0,features:[l],decls:5,vars:4,consts:[["stepperValidModel","ngModel"],["size","big","step","2","inputAriaLabel","Number of travellers",3,"ngModelChange","ngModel"],["context","info",1,"nx-margin-top-xs"],[1,"nx-margin-top-xs"]],template:function(n,r){if(n&1){let m=U();o(0,"nx-number-stepper",1,0),E("ngModelChange",function(_){return N(m),w(r.number,_)||(r.number=_),M(_)}),s(),G(2,Pt,2,0,"nx-message",2)(3,Ot,2,0,"nx-error",3)(4,Dt,2,0,"nx-error",3)}if(n&2){let m=X(1);S("ngModel",r.number),c(2),P(m.errors?-1:2),c(),P(m.errors&&m.errors.nxNumberStepperStepError?3:-1),c(),P(m.errors&&m.errors.nxNumberStepperFormatError?4:-1)}},dependencies:[a,x,y,L,Xe,Ye]});let i=e;return i})();var Ft=[Ne,de,ce,fe,be,he,ge,xe,_e,ve,Ce,ye,Me,Se,we,Ee,Pe],_i=(()=>{let e=class e{static components(){return{"number-stepper-readonly-input":Ne,"number-stepper-a11y":de,"number-stepper-additions":ce,"number-stepper-auto-resizing":fe,"number-stepper-custom-label":be,"number-stepper-disabled-explicit":he,"number-stepper-disabled-implicit":ge,"number-stepper-floating-point":xe,"number-stepper-formatting":_e,"number-stepper-localize":ve,"number-stepper-negative":Ce,"number-stepper-reactive":ye,"number-stepper-simple-binding":Me,"number-stepper-sizes":Se,"number-stepper-standalone":we,"number-stepper-template-driven":Ee,"number-stepper-validation":Pe}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=W({type:e}),e.\u0275inj=B({imports:[ut,k,lt,$e,Je,st,Ft]});let i=e;return i})();export{_i as NumberExamplesModule};
