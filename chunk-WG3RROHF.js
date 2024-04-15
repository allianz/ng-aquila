import{a as h}from"./chunk-OU4XFSTW.js";import{a as Ve}from"./chunk-AWLKXIKV.js";import{c as Be,f as je,g as Ge}from"./chunk-L4YGPXWT.js";import{a as We}from"./chunk-JVFBSPNC.js";import{h as ke}from"./chunk-TCGB2MEV.js";import"./chunk-BQY6EDXJ.js";import"./chunk-FYGJWQIJ.js";import{a as Re}from"./chunk-5V76OGMQ.js";import{b as Le,c as Ae}from"./chunk-GMJ3GKHW.js";import{a as Ce,c as ye,f as C,g as I,h as Ne,i as Me,j as Se,k as O,l as P,o as X,r as Y,x as we,z as Ee}from"./chunk-MNAWWTKB.js";import"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import{a as Pe,c as De}from"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import{o as Te,p as ze,s as Fe}from"./chunk-JQRF2ONG.js";import{g as Ie,j as Oe}from"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import{c as $,e as ee}from"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import{a as E}from"./chunk-VTTX4ZNP.js";import{B as ve,l as xe,o as J,x as _e}from"./chunk-GHZ7IFWX.js";import{$b as j,Aa as W,Ab as oe,Dc as pe,Ec as ae,Gb as fe,Ia as y,Ja as N,Ma as de,Nb as B,Ob as A,Pb as c,Qb as be,Ra as re,Rb as ge,Sa as ce,Vb as s,Wb as o,Wc as me,Xb as l,ea as ue,ec as G,gc as se,hc as he,ic as U,la as ie,ma as F,n as ne,na as k,nc as Z,oc as Q,pc as q,qc as H,rc as u,tb as d,tc as v,ub as _,vc as M,wc as S,xa as V,xc as w,ya as p,yc as K,za as R}from"./chunk-O56WLCF2.js";var dt=["customLabel"],ct=["nativeInput"],ft=[[["nx-number-stepper-prefix"]],[["nx-number-stepper-suffix"]],"*"],bt=["nx-number-stepper-prefix","nx-number-stepper-suffix","*"];function gt(i,e){if(i&1&&(s(0,"div",12)(1,"label",13),u(2),o()()),i&2){let z=se();d(),c("for",z.inputId),d(),v(" ",z.label," ")}}function ht(i,e){if(i&1&&(s(0,"div",12,1),U(2,2),o()),i&2){let z=se();A("id",z.ariaDescribedBy)}}var Ue=(()=>{let e=class e{set resize(t){this._resize=E(t),this._resize?(this._addEventListener(),this.updateInputWidth()):this._removeEventListener()}get resize(){return this._resize}constructor(t,n,r){this._element=t,this._renderer=n,this._cdr=r,this._resize=!0,this.updateInputWidth=this.updateInputWidth.bind(this)}ngAfterViewInit(){this.resize&&this._addEventListener()}ngOnDestroy(){this._removeEventListener()}updateInputWidth(){let n=this._renderer.createElement("canvas").getContext("2d");if(!n)return;let r=window.getComputedStyle(this._element.nativeElement);n.font=Fe(r);let m=n.measureText(this._element.nativeElement.value),f=this.sumStyles(r.paddingLeft,r.paddingRight),x=this.sumStyles(r.borderLeftWidth,r.borderRightWidth),lt=m.width+f+x+16,le=parseFloat(r.minWidth);this.width=Math.max(Number.isNaN(le)?0:le,lt),this._cdr.markForCheck()}_addEventListener(){this._element.nativeElement.addEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.addEventListener("change",this.updateInputWidth,!0)}_removeEventListener(){this._element.nativeElement.removeEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.removeEventListener("change",this.updateInputWidth,!0)}sumStyles(t,n){return(parseInt(t,10)||0)+(parseInt(n,10)||0)}};e.\u0275fac=function(n){return new(n||e)(_(re),_(oe),_(me))},e.\u0275dir=W({type:e,selectors:[["input","nxAutoResize",""]],hostVars:2,hostBindings:function(n,r){n&2&&be("width",r.width,"px")},inputs:{resize:[V.None,"nxAutoResize","resize"]}});let i=e;return i})(),T=(()=>{let e=class e{constructor(){this.changes=new ne,this.decrementAriaLabel="Decrement",this.incrementAriaLabel="Increment"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=F({token:e,factory:e.\u0275fac});let i=e;return i})(),xt={big:"nx-stepper--big",normal:""},_t=["nx-stepper"],vt=["nx-stepper__input"],Ct=new RegExp(/^-?\d+(\.\d+)?$/g),yt={provide:Ce,useExisting:ie(()=>a),multi:!0},Nt={provide:ye,useExisting:ie(()=>a),multi:!0},Mt=0,a=(()=>{let e=class e extends Ve{set resize(t){this._resize=E(t),this._cdr.markForCheck()}get resize(){return this._resize}set label(t){this._label!==t&&(this._label=t,this._cdr.markForCheck())}get label(){return this._label}set incrementAriaLabel(t){this._incrementAriaLabel=t}get incrementAriaLabel(){return this._incrementAriaLabel}set decrementAriaLabel(t){this._decrementAriaLabel=t}get decrementAriaLabel(){return this._decrementAriaLabel}set inputAriaLabel(t){this._inputAriaLabel=t}get inputAriaLabel(){return this._inputAriaLabel}set step(t){this._step=Number(t)}get step(){return this._step}set min(t){this._min=Number(t)}get min(){return this._min}set max(t){this._max=Number(t)}get max(){return this._max}set value(t){this._value=t,this._value?this.setInputValue(this._value):this.setInputValue(0),this._cdr.markForCheck()}get value(){return this._value}set negative(t){this._negative!==t&&(this._negative=E(t),this._cdr.markForCheck())}get negative(){return this._negative}set leadingZero(t){this._leadingZero!==t&&(this._leadingZero=E(t),this.setInputValue(this.value),this._cdr.markForCheck())}get leadingZero(){return this._leadingZero}set disabled(t){this._disabled=E(t)}get disabled(){return this._disabled}set readonlyInput(t){this._readonlyInput=E(t)}get readonlyInput(){return this._readonlyInput}constructor(t,n,r,m){super(xt,r,n,_t),this._cdr=t,this._intl=m,this.inputClassNames=ze("regular",vt),this.inputId=`nx-number-stepper-${Mt++}`,this.ariaDescribedBy=null,this.valueChange=new ce,this._resize=!1,this._incrementAriaLabel="",this._decrementAriaLabel="",this._inputAriaLabel="",this._step=1,this._min=0,this._max=100,this._value=0,this._negative=!1,this._leadingZero=!0,this._disabled=!1,this._readonlyInput=!1,this._destroyed=new ne,this.onChangeCallback=()=>{},this.onTouchedCallback=()=>{},this._intl.changes.pipe(ue(this._destroyed)).subscribe(()=>this._cdr.markForCheck())}ngAfterViewInit(){this.ngContentWrapper&&(this.ariaDescribedBy=this.ngContentWrapper.nativeElement.children.length>0?`label-for-${this.inputId}`:""),this.setInputValue(this._value)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}setInputValue(t){let n=t||0;this.leadingZero?this.numberInputValue=Te(n.toString(),2):this.numberInputValue=n.toString(),this.nativeInput&&(this.nativeInput.nativeElement.value=this.numberInputValue),setTimeout(()=>{this.triggerResize()})}writeValue(t){this.value=t}registerOnChange(t){this.onChangeCallback=t}registerOnTouched(t){this.onTouchedCallback=t}setDisabledState(t){this._disabled=t,this._cdr.markForCheck()}onInputChange(t){this.validateUserInput(t.target.value)?this._value=Number(t.target.value):this._value=null,this._value!==null&&this.setInputValue(this._value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}validateUserInput(t){return!!t.match(Ct)}incrementOnClick(){this._increment(),this.onTouchedCallback()}incrementOnKey(t){this._increment(),t.preventDefault()}_increment(){let t;this.isBetweenLimits(this._value||0)?t=this.getNextGreaterValue(this._value||0):t=this.enforceLimits(this._value||0),this.value=t,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}triggerResize(){this.resize&&(this.autoResize.updateInputWidth(),this._cdr.markForCheck())}decrementOnClick(){this._decrement(),this.onTouchedCallback()}decrementOnKey(t){this._decrement(),t.preventDefault()}_decrement(){let t;this.isBetweenLimits(this._value||0)?t=this.getNextLowerValue(this._value||0):t=this.enforceLimits(this._value||0),this.value=t,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}enforceLimits(t){return t>this._max?this._max:t<this._min?this._min:t}getNextLowerValue(t){t||(t=0);let n;return this.isValidStep(t)?n=new h(t).minus(new h(this._step)).toNumber():n=new h(t).toNearest(this._step,h.ROUND_DOWN).toNumber(),this.enforceLimits(n)}getNextGreaterValue(t){let n;return t||(t=0),this.isValidStep(t)?n=new h(t).plus(new h(this._step)).toNumber():n=new h(t).toNearest(this._step,h.ROUND_UP).toNumber(),this.enforceLimits(n)}isBetweenLimits(t){let n=new h(this._min),r=new h(this._max),m=new h(t);return m.lessThanOrEqualTo(r)&&m.greaterThanOrEqualTo(n)}isMinimum(){return this._value===this._min}isMaximum(){return this._value===this._max}isValidStep(t){t===null&&(t=new h(0));let n=new h(this._min),r=new h(t),m=n.minus(r).mod(new h(this._step)).toNumber();return!!(this.isBetweenLimits(t)&&(this.isMinimum()||this.isMaximum()||m===0))}userInputToNumber(t){return parseInt(t,10)||0}_validateFn(){if(this.isValidStep(this._value)){if(this._value===null)return{nxNumberStepperFormatError:"Not a valid number"}}else return{nxNumberStepperStepError:"Value is not a valid step"};return null}validate(t){return this._validateFn()}get _buttonType(){return"secondary"+(this.negative?" negative":"")}};e.\u0275fac=function(n){return new(n||e)(_(me),_(oe),_(re),_(T))},e.\u0275cmp=p({type:e,selectors:[["nx-number-stepper"]],viewQuery:function(n,r){if(n&1&&(Z(dt,5),Z(Ue,7),Z(ct,5)),n&2){let m;Q(m=q())&&(r.ngContentWrapper=m.first),Q(m=q())&&(r.autoResize=m.first),Q(m=q())&&(r.nativeInput=m.first)}},hostVars:4,hostBindings:function(n,r){n&2&&ge("is-negative",r.negative)("is-disabled",r.disabled)},inputs:{classNames:[V.None,"size","classNames"],resize:"resize",label:"label",incrementAriaLabel:"incrementAriaLabel",decrementAriaLabel:"decrementAriaLabel",inputAriaLabel:"inputAriaLabel",step:"step",min:"min",max:"max",value:"value",negative:"negative",leadingZero:"leadingZero",disabled:"disabled",readonlyInput:[V.None,"readonly","readonlyInput"]},outputs:{valueChange:"valueChange"},features:[K([yt,Nt]),fe],ngContentSelectors:bt,decls:14,vars:15,consts:[["nativeInput",""],["customLabel",""],["class","nx-stepper__label",4,"ngIf"],[1,"nx-stepper__input-container"],["type","button",1,"nx-stepper__down","nx-stepper__control",3,"click","nxButton","disabled"],["name","minus","size","s","aria-hidden","true"],[1,"nx-stepper__input-wrapper"],[1,"nx-stepper__inner-wrapper"],["type","number","spellcheck","false",3,"input","blur","keydown.arrowup","keydown.arrowdown","nxAutoResize","id","ngClass","disabled","readonly"],[1,"nx-stepper__input-underline"],["type","button",1,"nx-stepper__up","nx-stepper__control",3,"click","nxButton","disabled"],["name","plus","size","s","aria-hidden","true"],[1,"nx-stepper__label"],[3,"for"]],template:function(n,r){if(n&1){let m=j();he(ft),B(0,gt,3,2,"div",2)(1,ht,3,1,"div",2),s(2,"div",3)(3,"button",4),G("click",function(){return y(m),N(r.decrementOnClick())}),l(4,"nx-icon",5),o(),s(5,"div",6)(6,"div",7),U(7),s(8,"input",8,0),G("input",function(x){return y(m),N(r.onInputChange(x))})("blur",function(){return y(m),N(r.onTouchedCallback())})("keydown.arrowup",function(x){return y(m),N(r.incrementOnKey(x))})("keydown.arrowdown",function(x){return y(m),N(r.decrementOnKey(x))}),o(),U(10,1),o(),l(11,"div",9),o(),s(12,"button",10),G("click",function(){return y(m),N(r.incrementOnClick())}),l(13,"nx-icon",11),o()()}n&2&&(c("ngIf",r.label),d(),c("ngIf",!r.label),d(2),c("nxButton",r._buttonType)("disabled",r.disabled||(r.value||0)<=r.min),A("aria-label",r.decrementAriaLabel||r._intl.decrementAriaLabel),d(5),c("nxAutoResize",r.resize)("id",r.inputId)("ngClass",r.inputClassNames)("disabled",r.disabled)("readonly",r.readonlyInput),A("aria-describedby",r.ariaDescribedBy)("aria-label",r.inputAriaLabel),d(4),c("nxButton",r._buttonType)("disabled",r.disabled||(r.value||0)>=r.max),A("aria-label",r.incrementAriaLabel||r._intl.incrementAriaLabel))},dependencies:[$,Ie,xe,J,Ue],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button, [_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]:invalid{box-shadow:none}[_nghost-%COMP%]   label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%]:not(:empty) + .nx-stepper__input-container[_ngcontent-%COMP%]{margin-top:12px}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{padding:0}.nx-stepper__input-container[_ngcontent-%COMP%]{align-items:flex-end;display:flex}.nx-stepper__label[_ngcontent-%COMP%]{display:flex;font-size:var(--number-stepper-label-font-size);line-height:var(--number-stepper-label-line-height);font-weight:var(--number-stepper-label-font-weight);letter-spacing:var(--number-stepper-label-letter-spacing)}.nx-stepper__control[_ngcontent-%COMP%]{width:32px;height:32px;min-height:32px;font-size:24px;margin:0;padding:0}.nx-stepper__input[_ngcontent-%COMP%]{width:56px;min-width:56px}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:var(--number-stepper-disabled-color);-webkit-text-fill-color:var(--number-stepper-disabled-color);cursor:not-allowed}.nx-stepper__input[_ngcontent-%COMP%]:read-only{cursor:default}.nx-stepper__input[_ngcontent-%COMP%],   .nx-stepper__prefix,   .nx-stepper__suffix{font-size:var(--number-stepper-small-font-size);line-height:var(--number-stepper-small-line-height);font-weight:var(--number-stepper-small-font-weight);letter-spacing:var(--number-stepper-small-letter-spacing);color:var(--number-stepper-color);background:0 0;outline:0;border:0;text-align:center}  .nx-stepper__suffix{margin-left:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__suffix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__suffix{margin-left:initial;margin-right:4px}  .nx-stepper__prefix{margin-right:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__prefix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__prefix{margin-right:initial;margin-left:4px}.nx-stepper__input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;margin:0 16px}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:28px;display:flex;align-items:baseline}.nx-stepper__input-underline[_ngcontent-%COMP%]{width:100%;margin-top:2px;height:2px;background:var(--number-stepper-underline-color)}.nx-stepper__input-underline--disabled[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__control[_ngcontent-%COMP%]{width:72px;min-height:48px;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{width:72px;min-width:72px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%], .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{font-size:var(--number-stepper-large-font-size);line-height:var(--number-stepper-large-line-height);font-weight:var(--number-stepper-large-font-weight);letter-spacing:var(--number-stepper-large-letter-spacing);height:48px;padding:0;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-wrapper[_ngcontent-%COMP%]{margin:0 24px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{margin-top:-nx-spacer(4xs)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:48px}.is-negative[_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]     .nx-stepper__prefix, .is-negative[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--negative)}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--number-stepper-disabled-color)}@media screen and (forced-colors: active){button.nx-stepper__control[_ngcontent-%COMP%]:disabled{border-color:GrayText;color:GrayText;opacity:1}.nx-stepper__input[_ngcontent-%COMP%]{color:buttonText}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:GrayText;-webkit-text-fill-color:GrayText}  .nx-stepper__prefix,   .nx-stepper__suffix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{forced-colors-adjust:none;color:CanvasText}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{background:buttonFace}.nx-stepper__input-underline[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:buttonText}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:GrayText}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:GrayText}}"],changeDetection:0});let i=e;return i})(),D=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=W({type:e,selectors:[["nx-number-stepper-prefix"]],hostAttrs:[1,"nx-stepper__prefix"]});let i=e;return i})(),L=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275dir=W({type:e,selectors:[["nx-number-stepper-suffix"]],hostAttrs:[1,"nx-stepper__suffix"]});let i=e;return i})(),Qe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=R({type:e}),e.\u0275inj=k({providers:[T],imports:[ke,Ee,ee,Oe,ve]});let i=e;return i})();var qe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-a11y-example"]],decls:3,vars:0,consts:[["inputAriaLabel","Number of travellers","incrementAriaLabel","Increase number of travellers","decrementAriaLabel","Decrease number of travellers"]],template:function(n,r){n&1&&(s(0,"nx-number-stepper",0)(1,"label"),u(2,"Number of travellers"),o()())},dependencies:[a]});let i=e;return i})();var He=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-additions-example"]],decls:7,vars:0,consts:[["resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"],["size","big","resize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"]],template:function(n,r){n&1&&(s(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),u(2,"$"),o()(),l(3,"br"),s(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),u(6,"\u20AC"),o()())},dependencies:[a,D,L]});let i=e;return i})();var Ke=(()=>{let e=class e{constructor(){this.number=1e3}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-auto-resizing-example"]],decls:3,vars:1,consts:[["resize","true","size","big","step","1000","max","10000000","inputAriaLabel","Number of Kilometers",3,"ngModelChange","ngModel"],["resize","true","size","big","step","0.03","min","0.06","inputAriaLabel","Distance in Meters"]],template:function(n,r){n&1&&(s(0,"nx-number-stepper",0),w("ngModelChange",function(f){return S(r.number,f)||(r.number=f),f}),o(),l(1,"br")(2,"nx-number-stepper",1)),n&2&&M("ngModel",r.number)},dependencies:[a,C,O]});let i=e;return i})();var Je=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-custom-label-example"]],decls:9,vars:1,consts:[["popoverHover",""],["size","big","name","testStepper","inputAriaLabel","Number of travellers"],["nxPopoverTrigger","hover","name","info-circle-o","size","s",1,"info-icon","nx-margin-left-2xs",3,"nxPopoverTriggerFor"]],template:function(n,r){if(n&1&&(s(0,"nx-number-stepper",1)(1,"label"),u(2,"Number of travellers"),o(),l(3,"nx-icon",2),o(),s(4,"nx-popover",null,0)(6,"div")(7,"span"),u(8,"Custom help text as popover"),o()()()),n&2){let m=H(5);d(3),c("nxPopoverTriggerFor",m)}},dependencies:[a,$,je,Be],styles:[".info-icon[_ngcontent-%COMP%]{align-self:center}"]});let i=e;return i})();var Xe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-disabled-explicit-example"]],decls:7,vars:2,consts:[["size","big","inputAriaLabel","Sum of Expenses",3,"disabled"],["size","normal","inputAriaLabel","Sum of Expenses",3,"disabled"]],template:function(n,r){n&1&&(s(0,"nx-number-stepper",0)(1,"nx-number-stepper-suffix"),u(2,"$"),o()(),l(3,"br"),s(4,"nx-number-stepper",1)(5,"nx-number-stepper-prefix"),u(6,"\u20AC"),o()()),n&2&&(c("disabled",!0),d(4),c("disabled",!0))},dependencies:[a,D,L]});let i=e;return i})();var Ye=(()=>{let e=class e{constructor(){this.fb=new Ne({amount:new Se({value:"",disabled:!0})})}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-disabled-implicit-example"]],decls:8,vars:1,consts:[[3,"formGroup"],["formControlName","amount","size","big","inputAriaLabel","Sum of Expenses"],["formControlName","amount","size","normal","inputAriaLabel","Sum of Expenses"]],template:function(n,r){n&1&&(s(0,"form",0)(1,"nx-number-stepper",1)(2,"nx-number-stepper-suffix"),u(3,"$"),o()(),l(4,"br"),s(5,"nx-number-stepper",2)(6,"nx-number-stepper-prefix"),u(7,"\u20AC"),o()()()),n&2&&c("formGroup",r.fb)},dependencies:[a,D,L,P,C,I,X,Y]});let i=e;return i})();var $e=(()=>{let e=class e{constructor(){this.number=0}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-floating-point-example"]],decls:3,vars:0,consts:[["size","big","step","0.5","min","0.5","inputAriaLabel","Distance in meters"],["size","big","step","0.03","min","0.06","inputAriaLabel","Distance in meters"]],template:function(n,r){n&1&&l(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[a]});let i=e;return i})();var et=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-formatting-example"]],decls:7,vars:0,consts:[["nxCopytext","large",1,"label"],["size","normal","inputAriaLabel","Number of travellers"],["size","normal","leadingZero","false","inputAriaLabel","Number of travellers"]],template:function(n,r){n&1&&(s(0,"p",0),u(1,"With leading zero:"),o(),l(2,"nx-number-stepper",1)(3,"br"),s(4,"p",0),u(5,"Without leading zero:"),o(),l(6,"nx-number-stepper",2))},dependencies:[a,Re],styles:[".label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let i=e;return i})();var St=(()=>{let e=class e extends T{constructor(){super(...arguments),this.decrementAriaLabel="verringern",this.incrementAriaLabel="erh\xF6hen"}};e.\u0275fac=(()=>{let t;return function(r){return(t||(t=de(e)))(r||e)}})(),e.\u0275prov=F({token:e,factory:e.\u0275fac});let i=e;return i})(),tt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-localize-example"]],features:[K([{provide:T,useClass:St}])],decls:1,vars:0,template:function(n,r){n&1&&l(0,"nx-number-stepper")},dependencies:[a]});let i=e;return i})();var nt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-negative-example"]],decls:3,vars:0,consts:[[1,"docs-inverse-container"],["size","big","negative","true","label","Number of travellers",1,"nx-margin-bottom-s"],["size","normal","negative","true","label","Number of travellers"]],template:function(n,r){n&1&&(s(0,"div",0),l(1,"nx-number-stepper",1)(2,"nx-number-stepper",2),o())},dependencies:[a]});let i=e;return i})();var it=(()=>{let e=class e{constructor(t){this.fb=t,this.testForm=this.fb.group({stepperTestReactive:3})}};e.\u0275fac=function(n){return new(n||e)(_(we))},e.\u0275cmp=p({type:e,selectors:[["number-stepper-reactive-example"]],decls:10,vars:11,consts:[[3,"formGroup"],["label","Number of travellers","size","big","formControlName","stepperTestReactive",3,"step","min","max"]],template:function(n,r){n&1&&(s(0,"form",0),l(1,"nx-number-stepper",1),s(2,"p"),u(3),pe(4,"json"),o(),s(5,"p"),u(6),o(),s(7,"p"),u(8),pe(9,"json"),o()()),n&2&&(c("formGroup",r.testForm),d(),c("step",1)("min",-3)("max",20),d(2),v("Form value: ",ae(4,7,r.testForm.value),""),d(3),v("Form status: ",r.testForm.status,""),d(2),v(" Form errors: ",ae(9,9,r.testForm.controls.stepperTestReactive.errors)," "))},dependencies:[a,P,C,I,X,Y,_e]});let i=e;return i})();var rt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-readonly-input-example"]],decls:1,vars:1,consts:[["size","big","inputAriaLabel","Number of travellers","step","20",3,"readonly"]],template:function(n,r){n&1&&l(0,"nx-number-stepper",0),n&2&&c("readonly",!0)},dependencies:[a],encapsulation:2,changeDetection:0});let i=e;return i})();var ot=(()=>{let e=class e{constructor(){this.number=1}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-simple-binding-example"]],decls:3,vars:2,consts:[["size","big","step","2","inputAriaLabel","Number of travellers",3,"valueChange","value"]],template:function(n,r){n&1&&(s(0,"nx-number-stepper",0),w("valueChange",function(f){return S(r.number,f)||(r.number=f),f}),o(),s(1,"p"),u(2),o()),n&2&&(M("value",r.number),d(2),v("Value is: ",r.number,""))},dependencies:[a]});let i=e;return i})();var st=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-sizes-example"]],decls:3,vars:0,consts:[["size","big","inputAriaLabel","Number of travellers"],["size","normal","inputAriaLabel","Number of travellers"]],template:function(n,r){n&1&&l(0,"nx-number-stepper",0)(1,"br")(2,"nx-number-stepper",1)},dependencies:[a]});let i=e;return i})();var pt=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-standalone-example"]],decls:1,vars:0,consts:[["label","Number of travellers","size","big","name","testStepper"]],template:function(n,r){n&1&&l(0,"nx-number-stepper",0)},dependencies:[a]});let i=e;return i})();var at=(()=>{let e=class e{constructor(){this.number=3}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-template-driven-example"]],decls:4,vars:2,consts:[["label","Number of travellers","size","big","name","testStepper",3,"ngModelChange","ngModel"]],template:function(n,r){n&1&&(s(0,"form")(1,"nx-number-stepper",0),w("ngModelChange",function(f){return S(r.number,f)||(r.number=f),f}),o(),s(2,"p"),u(3),o()()),n&2&&(d(),M("ngModel",r.number),d(2),v("Current value: ",r.number,""))},dependencies:[a,P,C,I,O,Me]});let i=e;return i})();function wt(i,e){i&1&&(s(0,"nx-message",4),u(1,` This is a hint. This message will disappear once you get an error from parsing or when the input is missing altogether.
`),o())}function Et(i,e){i&1&&(s(0,"nx-error",5),u(1,` That's not a valid step
`),o())}function It(i,e){i&1&&(s(0,"nx-error",5),u(1,` That's not a valid number
`),o())}var mt=(()=>{let e=class e{constructor(){this.number=0}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=p({type:e,selectors:[["number-stepper-validation-example"]],decls:5,vars:4,consts:[["stepperValidModel","ngModel"],["size","big","step","2","inputAriaLabel","Number of travellers",3,"ngModelChange","ngModel"],["context","info","class","nx-margin-top-xs",4,"ngIf"],["class","nx-margin-top-xs",4,"ngIf"],["context","info",1,"nx-margin-top-xs"],[1,"nx-margin-top-xs"]],template:function(n,r){if(n&1){let m=j();s(0,"nx-number-stepper",1,0),w("ngModelChange",function(x){return y(m),S(r.number,x)||(r.number=x),N(x)}),o(),B(2,wt,2,0,"nx-message",2)(3,Et,2,0,"nx-error",3)(4,It,2,0,"nx-error",3)}if(n&2){let m=H(1);M("ngModel",r.number),d(2),c("ngIf",!m.errors),d(),c("ngIf",m.errors&&m.errors.nxNumberStepperStepError),d(),c("ngIf",m.errors&&m.errors.nxNumberStepperFormatError)}},dependencies:[a,Le,Pe,J,C,O]});let i=e;return i})();var Un=(()=>{let e=class e{static components(){return{"number-stepper-readonly-input":rt,"number-stepper-a11y":qe,"number-stepper-additions":He,"number-stepper-auto-resizing":Ke,"number-stepper-custom-label":Je,"number-stepper-disabled-explicit":Xe,"number-stepper-disabled-implicit":Ye,"number-stepper-floating-point":$e,"number-stepper-formatting":et,"number-stepper-localize":tt,"number-stepper-negative":nt,"number-stepper-reactive":it,"number-stepper-simple-binding":ot,"number-stepper-sizes":st,"number-stepper-standalone":pt,"number-stepper-template-driven":at,"number-stepper-validation":mt}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=R({type:e}),e.\u0275inj=k({imports:[Qe,ee,Ge,Ae,De,We]});let i=e;return i})();export{Un as NumberExamplesModule};
