import{a as ve,b as xe,c as be}from"./chunk-SXS3JJI4.js";import{a as Ce}from"./chunk-JVFBSPNC.js";import"./chunk-5V76OGMQ.js";import{b as I,c as ge}from"./chunk-GMJ3GKHW.js";import{d as K,e as pe,f as h,g,h as fe,i as T,j as _e,k as y,l as M,o as A,r as Q,v as U,x as ce,z as he}from"./chunk-MNAWWTKB.js";import"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import{a as Me,o as E}from"./chunk-JQRF2ONG.js";import"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import{a as j}from"./chunk-VTTX4ZNP.js";import{B as ue,l as de,o as F,x as me}from"./chunk-GHZ7IFWX.js";import{$b as N,Dc as Z,Ec as $,Ia as f,Ja as _,Ma as ne,Nb as O,Ob as z,Pb as m,Ra as oe,Rb as se,Sa as re,Vb as l,Wb as s,Wc as ae,Xb as k,ec as J,gc as G,ma as W,n as ie,na as R,qc as S,rc as p,sc as X,tb as a,tc as V,ub as w,vc as v,wc as x,xc as b,ya as c,yc as le,za as B}from"./chunk-O56WLCF2.js";function Ie(o,i){if(o&1){let P=N();l(0,"nx-radio-group",9),b("ngModelChange",function(t){f(P);let n=G();return x(n._toggleAMPM,t)||(n._toggleAMPM=t),_(t)}),J("ngModelChange",function(){f(P);let t=G();return _(t._updateTime())})("click",function(){f(P);let t=G();return _(t._updateTime())}),l(1,"nx-radio",10),p(2),s(),l(3,"nx-radio",11),p(4),s()()}if(o&2){let P=G();m("name",P.idRadioGroup),v("ngModel",P._toggleAMPM),m("disabled",P.disabled)("negative",P.negative),a(2),X(P.labelAM),a(2),X(P.labelPM)}}var L=(()=>{let i=class i{constructor(){this.changes=new ie,this.inputFieldHoursAriaLabel="hours",this.inputFieldMinutesAriaLabel="minutes"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275prov=W({token:i,factory:i.\u0275fac});let o=i;return o})(),ee=0,C=(()=>{let i=class i{get idHours(){return this._idHours}get idMinutes(){return this._idMinutes}get idRadioGroup(){return this._idRadioGroup}get maxHours(){return this._maxHours}get minHours(){return this._minHours}get maxMinutes(){return this._maxMinutes}get minMinutes(){return this._minMinutes}set time(e){this._time=e,this._onChangeCallback(e),this._cdr.markForCheck()}get time(){return this._time}set twelveHourFormat(e){this._twelveHourFormat=j(e),this._twelveHourFormat?(this._maxHours=12,this._minHours=1,this._toggleAMPM="AM"):(this._maxHours=23,this._minHours=0,this._toggleAMPM=null),this._cdr.markForCheck()}get twelveHourFormat(){return this._twelveHourFormat}set label(e){this._label!==e&&(this._label=e,this._cdr.markForCheck())}get label(){return this._label}set labelAM(e){this._labelAM!==e&&(this._labelAM=e,this._cdr.markForCheck())}get labelAM(){return this._labelAM}set labelPM(e){this._labelPM!==e&&(this._labelPM=e,this._cdr.markForCheck())}get labelPM(){return this._labelPM}set placeholderHours(e){this._placeholderHours!==e&&(this._placeholderHours=e,this._cdr.markForCheck())}get placeholderHours(){return this._placeholderHours}set placeholderMinutes(e){this._placeholderMinutes!==e&&(this._placeholderMinutes=e,this._cdr.markForCheck())}get placeholderMinutes(){return this._placeholderMinutes}set required(e){this._required=j(e)}get required(){return this._required}set negative(e){let t=j(e);this._negative!==t&&(this._negative=t,this._cdr.markForCheck())}get negative(){return this._negative}set disabled(e){let t=j(e);this._disabled!==t&&(this._disabled=t,this._cdr.markForCheck())}get disabled(){return this._disabled}set hours(e){this._hours=e,this._cdr.markForCheck()}get hours(){return this._hours}set minutes(e){this._minutes=e,this._cdr.markForCheck()}get minutes(){return this._minutes}get hasFocus(){return this._hasFocus?"has-focus":null}constructor(e,t,n,r,u,d,Se){this._cdr=e,this.ngControl=t,this._errorStateMatcher=n,this._parentForm=r,this._parentFormGroup=u,this._intl=d,this.elementRef=Se,this.errorState=!1,this.valueChange=new re,this._idHours=`nx-timefield__hours-${ee++}`,this._idMinutes=`nx-timefield__minutes-${ee++}`,this._idRadioGroup=`nx-timefield__radio-group-${ee++}`,this._maxHours=23,this._minHours=0,this._maxMinutes=59,this._minMinutes=0,this._twelveHourFormat=!1,this._labelAM="AM",this._labelPM="PM",this._placeholderHours="hh",this._placeholderMinutes="mm",this._negative=!1,this._disabled=!1,this._onTouchedCallback=()=>{},this._onChangeCallback=()=>{},this.ngControl&&(this.ngControl.valueAccessor=this)}ngDoCheck(){this.ngControl&&this.updateErrorState()}updateErrorState(){let e=this.errorState,t=this._parentFormGroup||this._parentForm,n=this.ngControl?this.ngControl.control:null,r=this._errorStateMatcher.isErrorState(n,t);r!==e&&(this.errorState=r)}_convertToISOFormat(e,t){return`${e}:${t}`}_updateTime(){if(this._time=null,this._isValidInput(this.hours)&&this._isValidInput(this.minutes)){let e=Number(this.hours),t=Number(this.minutes);this._isValidTime(e,"hours")&&this._isValidTime(t,"minutes")&&(this._time=this._timeInTwentyFourHourFormat(e,t))}this._onChangeCallback(this._time)}_onFocus(){this._hasFocus=!0}_getAriaLabel(e){let t;switch(e){case"hours":t=this._intl.inputFieldHoursAriaLabel;break;case"minutes":t=this._intl.inputFieldMinutesAriaLabel;break}return t}_onInput(e,t){t==="hours"?this.hours=e.target.value:t==="minutes"&&(this.minutes=e.target.value),this._updateTime()}_onBlur(e,t){this.elementRef.nativeElement.contains(e.relatedTarget)||(this._onTouchedCallback(),this._hasFocus=!1),t==="hours"&&Number(this.hours)<10&&this.hours!==""?this.hours=E(String(this.hours)):t==="minutes"&&Number(this.minutes)<10&&this.minutes!==""&&(this.minutes=E(String(this.minutes)))}_timeInTwentyFourHourFormat(e,t){return this.twelveHourFormat&&(this._toggleAMPM==="AM"?e===12&&(e-=12):this._toggleAMPM==="PM"&&e>=1&&e<12&&(e+=12)),this._convertToISOFormat(E(String(e)),E(String(t)))}_isValidInput(e){return/^\d{1,2}$/.test(e)}_isValidTime(e,t){let n=!1,r=Number(e);return t==="minutes"?n=r>=this._minMinutes&&r<=this._maxMinutes:t==="hours"&&(n=r>=this._minHours&&r<=this._maxHours),n}_parseAndSetTime(e){let t=e.split(":");if(t&&t.length===2&&this._isValidInput(t[0])&&this._isValidInput(t[1])){let n=Number(t[0]),r=Number(t[1]);if(this.twelveHourFormat&&(n===0?(n+=12,this._toggleAMPM="AM"):n>12&&n<=23?(n-=12,this._toggleAMPM="PM"):n===12&&(this._toggleAMPM="PM")),this._isValidTime(n,"hours")&&this._isValidTime(r,"minutes"))return this.hours=E(String(n)),this.minutes=E(String(r)),this._timeInTwentyFourHourFormat(n,r)}return null}writeValue(e){this._hours="",this._minutes="",this._time=null,e&&(this.time=this._parseAndSetTime(e)),this.valueChange.emit(this.time)}registerOnChange(e){this._onChangeCallback=e}registerOnTouched(e){this._onTouchedCallback=e}setDisabledState(e){this.disabled=e}};i.\u0275fac=function(t){return new(t||i)(w(ae),w(pe,10),w(Me),w(T,8),w(A,8),w(L),w(oe))},i.\u0275cmp=c({type:i,selectors:[["nx-timefield"]],hostVars:6,hostBindings:function(t,n){t&2&&se("has-error",n.errorState)("is-negative",n.negative)("is-disabled",n.disabled)},inputs:{twelveHourFormat:"twelveHourFormat",label:"label",labelAM:"labelAM",labelPM:"labelPM",placeholderHours:"placeholderHours",placeholderMinutes:"placeholderMinutes",required:"required",negative:"negative",disabled:"disabled"},outputs:{valueChange:"valueChange"},decls:11,vars:22,consts:[["inputHours",""],["inputMinutes",""],[1,"nx-timefield__label",3,"ngClass"],[1,"nx-timefield__wrapper"],[1,"nx-timefield-input__fields",3,"ngClass"],["type","text","maxlength","2","autocomplete","off",1,"nx-timefield-input__field__hours",3,"focusout","input","focus","id","value","required","disabled","ngClass","placeholder"],[1,"nx-timefield-hours-separator",3,"ngClass"],["required","","type","text","maxlength","2","autocomplete","off",1,"nx-timefield-input__field__minutes",3,"input","focus","focusout","id","value","required","disabled","ngClass","placeholder"],[3,"name","ngModel","disabled","negative","ngModelChange","click",4,"ngIf"],[3,"ngModelChange","click","name","ngModel","disabled","negative"],["labelSize","small","value","AM"],["labelSize","small","value","PM"]],template:function(t,n){if(t&1){let r=N();l(0,"label",2),p(1),s(),l(2,"div",3)(3,"div",4)(4,"input",5,0),J("focusout",function(d){return f(r),_(n._onBlur(d,"hours"))})("input",function(d){return f(r),_(n._onInput(d,"hours"))})("focus",function(){return f(r),_(n._onFocus())}),s(),l(6,"span",6),p(7,":"),s(),l(8,"input",7,1),J("input",function(d){return f(r),_(n._onInput(d,"minutes"))})("focus",function(){return f(r),_(n._onFocus())})("focusout",function(d){return f(r),_(n._onBlur(d,"minutes"))}),s()(),O(10,Ie,5,6,"nx-radio-group",8),s()}t&2&&(m("ngClass",n.hasFocus||""),z("for",n.hours),a(),X(n.label),a(2),m("ngClass",n.hasFocus||""),a(),m("id",n.idHours)("value",n.hours||null)("required",n.required)("disabled",n.disabled)("ngClass",n.hasFocus||"")("placeholder",n.placeholderHours),z("aria-required",n.required)("aria-label",n._getAriaLabel("hours")),a(2),m("ngClass",n.hasFocus||""),a(2),m("id",n.idMinutes)("value",n.minutes||null)("required",n.required)("disabled",n.disabled)("ngClass",n.hasFocus||"")("placeholder",n.placeholderMinutes),z("aria-required",n.required)("aria-label",n._getAriaLabel("minutes")),a(2),m("ngIf",n.twelveHourFormat))},dependencies:[de,F,h,y,xe,ve],styles:["[_nghost-%COMP%]{display:inline-block}[_nghost-%COMP%]   .nx-timefield__wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 var(--timefield-color)}[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]:focus{outline:none}[_nghost-%COMP%]   .nx-timefield-input__fields.has-focus[_ngcontent-%COMP%]{box-shadow:inset 0 -2px 0 0 var(--timefield-active-color)}[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%]{font-size:var(--timefield-label-font-size);line-height:var(--timefield-label-line-height);font-weight:var(--timefield-label-font-weight);letter-spacing:var(--timefield-label-letter-spacing)}[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{font-size:var(--timefield-font-size);line-height:var(--timefield-line-height);font-weight:var(--timefield-font-weight);letter-spacing:var(--timefield-letter-spacing);color:var(--timefield-color);margin:0 4px;text-align:center;border:0;outline:0;width:32px;border-radius:0;padding:0;background:transparent;box-sizing:border-box}[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]:focus{color:var(--timefield-active-color);outline:none}[_nghost-%COMP%]   .nx-timefield-input__field__hours.has-focus[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-input__field__minutes.has-focus[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-hours-separator.has-focus[_ngcontent-%COMP%]{color:var(--timefield-active-color)}[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]{margin-left:24px}[_nghost-%COMP%]   nx-radio[_ngcontent-%COMP%]{display:inline-block;margin-right:24px;padding:0;vertical-align:middle}[_nghost-%COMP%]:focus{outline:none}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-hours-separator[_ngcontent-%COMP%]{color:var(--danger)}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 var(--danger)}.is-disabled[_nghost-%COMP%]{cursor:not-allowed}.is-disabled[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--timefield-disabled-color)}.is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(timefield-disabled-color);box-shadow:inset 0 -1px 0 0 var(--timefield-disabled-color)}.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(negative);box-shadow:inset 0 -1px 0 0 var(--negative)}.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{color:var(--negative)}.is-disabled.is-negative[_nghost-%COMP%]{cursor:not-allowed}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--timefield-disabled-color)}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(timefield-disabled-color);box-shadow:inset 0 -1px 0 0 var(--timefield-disabled-color)}@media screen and (forced-colors: active){.nx-timefield-input__fields[_ngcontent-%COMP%]{border-bottom:1px solid buttonText}.nx-timefield-input__fields.has-focus[_ngcontent-%COMP%]{border-bottom:1px solid highlight}.is-disabled[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{color:GrayText}.is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{border-bottom:1px solid GrayText}}"],changeDetection:0});let o=i;return o})(),Pe=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=B({type:i}),i.\u0275inj=R({providers:[L],imports:[ue,he,be]});let o=i;return o})();var we=(()=>{let i=class i{constructor(){this.templateModel="12:54"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=c({type:i,selectors:[["timefield-disabled-example"]],decls:3,vars:1,consts:[["timefield",""],["disabled","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModelChange","ngModel"]],template:function(t,n){if(t&1){let r=N();l(0,"form")(1,"nx-timefield",1,0),b("ngModelChange",function(d){return f(r),x(n.templateModel,d)||(n.templateModel=d),_(d)}),s()()}t&2&&(a(),v("ngModel",n.templateModel))},dependencies:[C,M,h,g,y,T]});let o=i;return o})();function Ve(o,i){o&1&&(l(0,"div")(1,"nx-error"),p(2," Invalid time input. "),s()())}var Oe=(()=>{let i=class i{constructor(){this.templateModel="12:01"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=c({type:i,selectors:[["timefield-format-toggler-example"]],decls:6,vars:3,consts:[["timefield",""],["required","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModelChange","ngModel"],[4,"ngIf"]],template:function(t,n){if(t&1){let r=N();l(0,"form")(1,"nx-timefield",1,0),b("ngModelChange",function(d){return f(r),x(n.templateModel,d)||(n.templateModel=d),_(d)}),s(),l(3,"p"),p(4),s(),O(5,Ve,3,0,"div",2),s()}if(t&2){let r=S(2);a(),v("ngModel",n.templateModel),a(3),V("Model Value (24h format): ",n.templateModel,""),a(),m("ngIf",r.errorState)}},dependencies:[C,F,M,h,g,U,y,T,I]});let o=i;return o})();function Ee(o,i){o&1&&(l(0,"div")(1,"nx-error",5),p(2," Invalid time input. "),s()())}var He=(()=>{let i=class i extends L{constructor(){super(...arguments),this.inputFieldHoursAriaLabel="stunden",this.inputFieldMinutesAriaLabel="minuten"}};i.\u0275fac=(()=>{let e;return function(n){return(e||(e=ne(i)))(n||i)}})(),i.\u0275prov=W({token:i,factory:i.\u0275fac});let o=i;return o})(),Fe=(()=>{let i=class i{ngOnInit(){this.testForm=new fe({today:new _e("",{validators:[K.required]})})}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=c({type:i,selectors:[["timefield-localize-example"]],features:[le([{provide:L,useClass:He}])],decls:5,vars:2,consts:[["form","ngForm"],["timefield",""],[3,"formGroup"],["formControlName","today"],[4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(t,n){if(t&1&&(l(0,"form",2,0),k(2,"nx-timefield",3,1),O(4,Ee,3,0,"div",4),s()),t&2){let r=S(3);m("formGroup",n.testForm),a(4),m("ngIf",r.errorState)}},dependencies:[C,F,M,h,g,A,Q,I]});let o=i;return o})();var Te=(()=>{let i=class i{constructor(){this.templateModel="00:54",this.templateModel2="12:54"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=c({type:i,selectors:[["timefield-negative-example"]],decls:5,vars:2,consts:[[1,"docs-inverse-container"],["negative","","twelveHourFormat","","name","templateTest","label","Time",3,"ngModelChange","ngModel"],["negative","","disabled","","twelveHourFormat","","name","templateTest2","label","Time",3,"ngModelChange","ngModel"]],template:function(t,n){t&1&&(l(0,"div",0)(1,"form")(2,"nx-timefield",1),b("ngModelChange",function(u){return x(n.templateModel,u)||(n.templateModel=u),u}),s(),k(3,"br"),l(4,"nx-timefield",2),b("ngModelChange",function(u){return x(n.templateModel2,u)||(n.templateModel2=u),u}),s()()()),t&2&&(a(2),v("ngModel",n.templateModel),a(2),v("ngModel",n.templateModel2))},dependencies:[C,M,h,g,y,T]});let o=i;return o})();function ke(o,i){o&1&&(l(0,"div")(1,"nx-error",6),p(2," Invalid time input. "),s()())}var ye=(()=>{let i=class i{constructor(e){this.fb=e,this.testForm=this.fb.group({timefieldReactive:["22:54",K.required]})}};i.\u0275fac=function(t){return new(t||i)(w(ce))},i.\u0275cmp=c({type:i,selectors:[["nx-timefield-reactive-example"]],decls:10,vars:8,consts:[["timefield",""],[3,"formGroup"],["label","Time","formControlName","timefieldReactive"],[4,"ngIf"],[1,"nx-margin-bottom-0"],[1,"nx-margin-y-0"],[1,"nx-margin-y-xs"]],template:function(t,n){if(t&1&&(l(0,"form",1),k(1,"nx-timefield",2,0),O(3,ke,3,0,"div",3),s(),l(4,"p",4),p(5),Z(6,"json"),s(),l(7,"p",5),p(8),Z(9,"json"),s()),t&2){let r=S(2);m("formGroup",n.testForm),a(3),m("ngIf",r.errorState),a(2),V("Form value (24h): ",$(6,4,n.testForm.value),""),a(3),V("Form status: ",$(9,6,n.testForm.status),"")}},dependencies:[C,F,M,h,g,A,Q,I,me]});let o=i;return o})();function Ae(o,i){o&1&&(l(0,"div")(1,"nx-error"),p(2," Invalid time input. "),s()())}var Ne=(()=>{let i=class i{constructor(){this.templateModel="14:54"}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=c({type:i,selectors:[["timefield-template-driven-example"]],decls:6,vars:3,consts:[["timefield",""],["name","templateTest","label","Time","required","",3,"ngModelChange","ngModel"],[4,"ngIf"]],template:function(t,n){if(t&1){let r=N();l(0,"form")(1,"nx-timefield",1,0),b("ngModelChange",function(d){return f(r),x(n.templateModel,d)||(n.templateModel=d),_(d)}),s(),l(3,"p"),p(4),s(),O(5,Ae,3,0,"div",2),s()}if(t&2){let r=S(2);a(),v("ngModel",n.templateModel),a(3),V("Model Value (24h format): ",n.templateModel,""),a(),m("ngIf",r.errorState)}},dependencies:[C,F,M,h,g,U,y,T,I]});let o=i;return o})();var Mt=(()=>{let i=class i{static components(){return{"timefield-disabled":we,"timefield-format-toggler":Oe,"timefield-localize":Fe,"timefield-negative":Te,"timefield-reactive":ye,"timefield-template-driven":Ne}}};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=B({type:i}),i.\u0275inj=R({imports:[Pe,Ce,ge]});let o=i;return o})();export{Mt as TimefieldExamplesModule};
