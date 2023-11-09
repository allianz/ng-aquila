"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[9564],{9564:(y,c,a)=>{a.r(c),a.d(c,{TimefieldExamplesModule:()=>I});var _=a(8290),h=a(1692),e=a(2223),m=a(5168),o=a(9401),P=a(8929),d=a(4755),g=a(487);function O(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"nx-radio-group",9),e.NdJ("ngModelChange",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r._toggleAMPM=l)})("ngModelChange",function(){e.CHM(t);const l=e.oxw();return e.KtG(l._updateTime())})("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l._updateTime())}),e.TgZ(1,"nx-radio",10),e._uU(2),e.qZA(),e.TgZ(3,"nx-radio",11),e._uU(4),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("name",t.idRadioGroup)("ngModel",t._toggleAMPM)("disabled",t.disabled)("negative",t.negative),e.xp6(2),e.Oqu(t.labelAM),e.xp6(2),e.Oqu(t.labelPM)}}let p=(()=>{class n{constructor(){this.changes=new P.xQ,this.inputFieldHoursAriaLabel="hours",this.inputFieldMinutesAriaLabel="minutes"}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac}),n})(),f=0,u=(()=>{class n{get idHours(){return this._idHours}get idMinutes(){return this._idMinutes}get idRadioGroup(){return this._idRadioGroup}get maxHours(){return this._maxHours}get minHours(){return this._minHours}get maxMinutes(){return this._maxMinutes}get minMinutes(){return this._minMinutes}set time(t){this._time=t,this._onChangeCallback(t),this._cdr.markForCheck()}get time(){return this._time}set twelveHourFormat(t){this._twelveHourFormat=(0,h.Ig)(t),this._twelveHourFormat?(this._maxHours=12,this._minHours=1,this._toggleAMPM="AM"):(this._maxHours=23,this._minHours=0,this._toggleAMPM=null),this._cdr.markForCheck()}get twelveHourFormat(){return this._twelveHourFormat}set label(t){this._label!==t&&(this._label=t,this._cdr.markForCheck())}get label(){return this._label}set labelAM(t){this._labelAM!==t&&(this._labelAM=t,this._cdr.markForCheck())}get labelAM(){return this._labelAM}set labelPM(t){this._labelPM!==t&&(this._labelPM=t,this._cdr.markForCheck())}get labelPM(){return this._labelPM}set placeholderHours(t){this._placeholderHours!==t&&(this._placeholderHours=t,this._cdr.markForCheck())}get placeholderHours(){return this._placeholderHours}set placeholderMinutes(t){this._placeholderMinutes!==t&&(this._placeholderMinutes=t,this._cdr.markForCheck())}get placeholderMinutes(){return this._placeholderMinutes}set required(t){this._required=(0,h.Ig)(t)}get required(){return this._required}set negative(t){const i=(0,h.Ig)(t);this._negative!==i&&(this._negative=i,this._cdr.markForCheck())}get negative(){return this._negative}set disabled(t){const i=(0,h.Ig)(t);this._disabled!==i&&(this._disabled=i,this._cdr.markForCheck())}get disabled(){return this._disabled}set hours(t){this._hours=t,this._cdr.markForCheck()}get hours(){return this._hours}set minutes(t){this._minutes=t,this._cdr.markForCheck()}get minutes(){return this._minutes}get hasFocus(){return this._hasFocus?"has-focus":null}constructor(t,i,l,r,J,E){this._cdr=t,this.ngControl=i,this._errorStateMatcher=l,this._parentForm=r,this._parentFormGroup=J,this._intl=E,this.errorState=!1,this.valueChange=new e.vpe,this._idHours="nx-timefield__hours-"+f++,this._idMinutes="nx-timefield__minutes-"+f++,this._idRadioGroup="nx-timefield__radio-group-"+f++,this._maxHours=23,this._minHours=0,this._maxMinutes=59,this._minMinutes=0,this._twelveHourFormat=!1,this._labelAM="AM",this._labelPM="PM",this._placeholderHours="hh",this._placeholderMinutes="mm",this._negative=!1,this._disabled=!1,this._onTouchedCallback=()=>{},this._onChangeCallback=()=>{},this.ngControl&&(this.ngControl.valueAccessor=this)}ngDoCheck(){this.ngControl&&this.updateErrorState()}updateErrorState(){const t=this.errorState,r=this._errorStateMatcher.isErrorState(this.ngControl?this.ngControl.control:null,this._parentFormGroup||this._parentForm);r!==t&&(this.errorState=r)}_convertToISOFormat(t,i){return`${t}:${i}`}_updateTime(){if(this._time=null,this._isValidInput(this.hours)&&this._isValidInput(this.minutes)){const t=Number(this.hours),i=Number(this.minutes);this._isValidTime(t,"hours")&&this._isValidTime(i,"minutes")&&(this._time=this._timeInTwentyFourHourFormat(t,i))}this._onChangeCallback(this._time)}_onFocus(){this._hasFocus=!0}_getAriaLabel(t){let i;switch(t){case"hours":i=this._intl.inputFieldHoursAriaLabel;break;case"minutes":i=this._intl.inputFieldMinutesAriaLabel}return i}_onInput(t,i){this._onTouchedCallback(),"hours"===i?this.hours=t.target.value:"minutes"===i&&(this.minutes=t.target.value),this._updateTime()}_onBlur(t){this._onTouchedCallback(),this._hasFocus=!1,"hours"===t&&Number(this.hours)<10&&""!==this.hours?this.hours=(0,m.vk)(String(this.hours)):"minutes"===t&&Number(this.minutes)<10&&""!==this.minutes&&(this.minutes=(0,m.vk)(String(this.minutes)))}_timeInTwentyFourHourFormat(t,i){return this.twelveHourFormat&&("AM"===this._toggleAMPM?12===t&&(t-=12):"PM"===this._toggleAMPM&&t>=1&&t<12&&(t+=12)),this._convertToISOFormat((0,m.vk)(String(t)),(0,m.vk)(String(i)))}_isValidInput(t){return/^\d{1,2}$/.test(t)}_isValidTime(t,i){let l=!1;const r=Number(t);return"minutes"===i?l=r>=this._minMinutes&&r<=this._maxMinutes:"hours"===i&&(l=r>=this._minHours&&r<=this._maxHours),l}_parseAndSetTime(t){const i=t.split(":");if(i&&2===i.length&&this._isValidInput(i[0])&&this._isValidInput(i[1])){let l=Number(i[0]);const r=Number(i[1]);if(this.twelveHourFormat&&(0===l?(l+=12,this._toggleAMPM="AM"):l>12&&l<=23?(l-=12,this._toggleAMPM="PM"):12===l&&(this._toggleAMPM="PM")),this._isValidTime(l,"hours")&&this._isValidTime(r,"minutes"))return this.hours=(0,m.vk)(String(l)),this.minutes=(0,m.vk)(String(r)),this._timeInTwentyFourHourFormat(l,r)}return null}writeValue(t){this._hours="",this._minutes="",this._time=null,t&&(this.time=this._parseAndSetTime(t)),this.valueChange.emit(this.time)}registerOnChange(t){this._onChangeCallback=t}registerOnTouched(t){this._onTouchedCallback=t}setDisabledState(t){this.disabled=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.sBO),e.Y36(o.a5,10),e.Y36(m.rD),e.Y36(o.F,8),e.Y36(o.sg,8),e.Y36(p))},n.\u0275cmp=e.Xpm({type:n,selectors:[["nx-timefield"]],hostVars:6,hostBindings:function(t,i){2&t&&e.ekj("has-error",i.errorState)("is-negative",i.negative)("is-disabled",i.disabled)},inputs:{twelveHourFormat:"twelveHourFormat",label:"label",labelAM:"labelAM",labelPM:"labelPM",placeholderHours:"placeholderHours",placeholderMinutes:"placeholderMinutes",required:"required",negative:"negative",disabled:"disabled"},outputs:{valueChange:"valueChange"},decls:11,vars:22,consts:[[1,"nx-timefield__label",3,"ngClass"],[1,"nx-timefield__wrapper"],[1,"nx-timefield-input__fields",3,"ngClass"],["type","text","maxlength","2","autocomplete","off",1,"nx-timefield-input__field__hours",3,"id","value","required","disabled","ngClass","placeholder","focusout","input","focus"],["inputHours",""],[1,"nx-timefield-hours-separator",3,"ngClass"],["required","","type","text","maxlength","2","autocomplete","off",1,"nx-timefield-input__field__minutes",3,"id","value","required","disabled","ngClass","placeholder","input","focus","focusout"],["inputMinutes",""],[3,"name","ngModel","disabled","negative","ngModelChange","click",4,"ngIf"],[3,"name","ngModel","disabled","negative","ngModelChange","click"],["labelSize","small","value","AM"],["labelSize","small","value","PM"]],template:function(t,i){1&t&&(e.TgZ(0,"label",0),e._uU(1),e.qZA(),e.TgZ(2,"div",1)(3,"div",2)(4,"input",3,4),e.NdJ("focusout",function(){return i._onBlur("hours")})("input",function(r){return i._onInput(r,"hours")})("focus",function(){return i._onFocus()}),e.qZA(),e.TgZ(6,"span",5),e._uU(7,":"),e.qZA(),e.TgZ(8,"input",6,7),e.NdJ("input",function(r){return i._onInput(r,"minutes")})("focus",function(){return i._onFocus()})("focusout",function(){return i._onBlur("minutes")}),e.qZA()(),e.YNc(10,O,5,6,"nx-radio-group",8),e.qZA()),2&t&&(e.Q6J("ngClass",i.hasFocus||""),e.uIk("for",i.hours),e.xp6(1),e.Oqu(i.label),e.xp6(2),e.Q6J("ngClass",i.hasFocus||""),e.xp6(1),e.Q6J("id",i.idHours)("value",i.hours||null)("required",i.required)("disabled",i.disabled)("ngClass",i.hasFocus||"")("placeholder",i.placeholderHours),e.uIk("aria-required",i.required)("aria-label",i._getAriaLabel("hours")),e.xp6(2),e.Q6J("ngClass",i.hasFocus||""),e.xp6(2),e.Q6J("id",i.idMinutes)("value",i.minutes||null)("required",i.required)("disabled",i.disabled)("ngClass",i.hasFocus||"")("placeholder",i.placeholderMinutes),e.uIk("aria-required",i.required)("aria-label",i._getAriaLabel("minutes")),e.xp6(2),e.Q6J("ngIf",i.twelveHourFormat))},dependencies:[d.mk,d.O5,o.JJ,o.On,g.R9,g.tc],styles:["[_nghost-%COMP%]{display:inline-block}[_nghost-%COMP%]   .nx-timefield__wrapper[_ngcontent-%COMP%]{display:flex;align-items:center}[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 var(--timefield-color)}[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]:focus{outline:none}[_nghost-%COMP%]   .nx-timefield-input__fields.has-focus[_ngcontent-%COMP%]{box-shadow:inset 0 -2px 0 0 var(--timefield-active-color)}[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%]{font-size:var(--timefield-label-font-size);line-height:var(--timefield-label-line-height);font-weight:var(--timefield-label-font-weight);letter-spacing:var(--timefield-label-letter-spacing)}[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{font-size:var(--timefield-font-size);line-height:var(--timefield-line-height);font-weight:var(--timefield-font-weight);letter-spacing:var(--timefield-letter-spacing);color:var(--timefield-color);margin:0 4px;text-align:center;border:0;outline:0;width:32px;border-radius:0;padding:0;background:transparent;box-sizing:border-box}[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]:focus{color:var(--timefield-active-color);outline:none}[_nghost-%COMP%]   .nx-timefield-input__field__hours.has-focus[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-input__field__minutes.has-focus[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-timefield-hours-separator.has-focus[_ngcontent-%COMP%]{color:var(--timefield-active-color)}[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{margin:0}[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]{margin-left:24px}[_nghost-%COMP%]   nx-radio[_ngcontent-%COMP%]{display:inline-block;margin-right:24px;padding:0;vertical-align:middle}[_nghost-%COMP%]:focus{outline:none}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-hours-separator[_ngcontent-%COMP%]{color:var(--danger)}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 var(--danger)}.is-disabled[_nghost-%COMP%]{cursor:not-allowed}.is-disabled[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--timefield-disabled-color)}.is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(timefield-disabled-color);box-shadow:inset 0 -1px 0 0 var(--timefield-disabled-color)}.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(negative);box-shadow:inset 0 -1px 0 0 var(--negative)}.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{color:var(--negative)}.is-disabled.is-negative[_nghost-%COMP%]{cursor:not-allowed}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--timefield-disabled-color)}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 nx-theme-color(timefield-disabled-color);box-shadow:inset 0 -1px 0 0 var(--timefield-disabled-color)}@media screen and (forced-colors: active){.nx-timefield-input__fields[_ngcontent-%COMP%]{border-bottom:1px solid buttonText}.nx-timefield-input__fields.has-focus[_ngcontent-%COMP%]{border-bottom:1px solid highlight}.is-disabled[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%]{color:GrayText}.is-disabled[_nghost-%COMP%]   .nx-timefield-input__fields[_ngcontent-%COMP%]{border-bottom:1px solid GrayText}}"],changeDetection:0}),n})(),F=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[p],imports:[d.ez,o.u5,g.IV]}),n})();var A=a(9508);let M=(()=>{class n{constructor(){this.templateModel="12:54"}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["timefield-disabled-example"]],decls:3,vars:1,consts:[["disabled","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModel","ngModelChange"],["timefield",""]],template:function(t,i){1&t&&(e.TgZ(0,"form")(1,"nx-timefield",0,1),e.NdJ("ngModelChange",function(r){return i.templateModel=r}),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("ngModel",i.templateModel))},dependencies:[u,o._Y,o.JJ,o.JL,o.On,o.F]}),n})();function w(n,s){1&n&&(e.TgZ(0,"div")(1,"nx-error"),e._uU(2," Invalid time input. "),e.qZA()())}let C=(()=>{class n{constructor(){this.templateModel="12:01"}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["timefield-format-toggler-example"]],decls:6,vars:3,consts:[["required","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModel","ngModelChange"],["timefield",""],[4,"ngIf"]],template:function(t,i){if(1&t&&(e.TgZ(0,"form")(1,"nx-timefield",0,1),e.NdJ("ngModelChange",function(r){return i.templateModel=r}),e.qZA(),e.TgZ(3,"p"),e._uU(4),e.qZA(),e.YNc(5,w,3,0,"div",2),e.qZA()),2&t){const l=e.MAs(2);e.xp6(1),e.Q6J("ngModel",i.templateModel),e.xp6(3),e.hij("Model Value (24h format): ",i.templateModel,""),e.xp6(1),e.Q6J("ngIf",l.errorState)}},dependencies:[u,d.O5,o._Y,o.JJ,o.JL,o.Q7,o.On,o.F,_.vV]}),n})();function H(n,s){1&n&&(e.TgZ(0,"div")(1,"nx-error",5),e._uU(2," Invalid time input. "),e.qZA()())}let N=(()=>{class n extends p{constructor(){super(...arguments),this.inputFieldHoursAriaLabel="stunden",this.inputFieldMinutesAriaLabel="minuten"}}return n.\u0275fac=function(){let s;return function(i){return(s||(s=e.n5z(n)))(i||n)}}(),n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac}),n})(),x=(()=>{class n{ngOnInit(){this.testForm=new o.cw({today:new o.NI("",{validators:[o.kI.required]})})}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["timefield-localize-example"]],features:[e._Bn([{provide:p,useClass:N}])],decls:5,vars:2,consts:[[3,"formGroup"],["form","ngForm"],["formControlName","today"],["timefield",""],[4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(t,i){if(1&t&&(e.TgZ(0,"form",0,1),e._UZ(2,"nx-timefield",2,3),e.YNc(4,H,3,0,"div",4),e.qZA()),2&t){const l=e.MAs(3);e.Q6J("formGroup",i.testForm),e.xp6(4),e.Q6J("ngIf",l.errorState)}},dependencies:[u,d.O5,o._Y,o.JJ,o.JL,o.sg,o.u,_.vV]}),n})(),v=(()=>{class n{constructor(){this.templateModel="00:54",this.templateModel2="12:54"}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["timefield-negative-example"]],decls:5,vars:2,consts:[[1,"docs-inverse-container"],["negative","","twelveHourFormat","","name","templateTest","label","Time",3,"ngModel","ngModelChange"],["negative","","disabled","","twelveHourFormat","","name","templateTest2","label","Time",3,"ngModel","ngModelChange"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"form")(2,"nx-timefield",1),e.NdJ("ngModelChange",function(r){return i.templateModel=r}),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"nx-timefield",2),e.NdJ("ngModelChange",function(r){return i.templateModel2=r}),e.qZA()()()),2&t&&(e.xp6(2),e.Q6J("ngModel",i.templateModel),e.xp6(2),e.Q6J("ngModel",i.templateModel2))},dependencies:[u,o._Y,o.JJ,o.JL,o.On,o.F]}),n})();function Z(n,s){1&n&&(e.TgZ(0,"div")(1,"nx-error",6),e._uU(2," Invalid time input. "),e.qZA()())}let T=(()=>{class n{constructor(t){this.fb=t,this.testForm=this.fb.group({timefieldReactive:["22:54",o.kI.required]})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(o.qu))},n.\u0275cmp=e.Xpm({type:n,selectors:[["nx-timefield-reactive-example"]],decls:10,vars:8,consts:[[3,"formGroup"],["label","Time","formControlName","timefieldReactive"],["timefield",""],[4,"ngIf"],[1,"nx-margin-bottom-0"],[1,"nx-margin-y-0"],[1,"nx-margin-y-xs"]],template:function(t,i){if(1&t&&(e.TgZ(0,"form",0),e._UZ(1,"nx-timefield",1,2),e.YNc(3,Z,3,0,"div",3),e.qZA(),e.TgZ(4,"p",4),e._uU(5),e.ALo(6,"json"),e.qZA(),e.TgZ(7,"p",5),e._uU(8),e.ALo(9,"json"),e.qZA()),2&t){const l=e.MAs(2);e.Q6J("formGroup",i.testForm),e.xp6(3),e.Q6J("ngIf",l.errorState),e.xp6(2),e.hij("Form value (24h): ",e.lcZ(6,4,i.testForm.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(9,6,i.testForm.status),"")}},dependencies:[u,d.O5,o._Y,o.JJ,o.JL,o.sg,o.u,_.vV,d.Ts]}),n})();function k(n,s){1&n&&(e.TgZ(0,"div")(1,"nx-error"),e._uU(2," Invalid time input. "),e.qZA()())}let b=(()=>{class n{constructor(){this.templateModel="14:54"}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["timefield-template-driven-example"]],decls:6,vars:3,consts:[["name","templateTest","label","Time","required","",3,"ngModel","ngModelChange"],["timefield",""],[4,"ngIf"]],template:function(t,i){if(1&t&&(e.TgZ(0,"form")(1,"nx-timefield",0,1),e.NdJ("ngModelChange",function(r){return i.templateModel=r}),e.qZA(),e.TgZ(3,"p"),e._uU(4),e.qZA(),e.YNc(5,k,3,0,"div",2),e.qZA()),2&t){const l=e.MAs(2);e.xp6(1),e.Q6J("ngModel",i.templateModel),e.xp6(3),e.hij("Model Value (24h format): ",i.templateModel,""),e.xp6(1),e.Q6J("ngIf",l.errorState)}},dependencies:[u,d.O5,o._Y,o.JJ,o.JL,o.Q7,o.On,o.F,_.vV]}),n})(),I=(()=>{class n{static components(){return{"timefield-disabled":M,"timefield-format-toggler":C,"timefield-localize":x,"timefield-negative":v,"timefield-reactive":T,"timefield-template-driven":b}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[F,A.f,_.$N]}),n})()}}]);