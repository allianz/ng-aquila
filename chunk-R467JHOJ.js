import{c as Oe}from"./chunk-3Q5C23DV.js";import{a as Nt}from"./chunk-WGBSPPZZ.js";import{a as Et,b as Pt,c as ke}from"./chunk-SPPBTW7W.js";import{g as kt}from"./chunk-YRHK7FMC.js";import{c as vt,d as Ct,h as xt,i as ce,j as fe,k as we}from"./chunk-LMYTBCUX.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import{a as Ot,b as Ft}from"./chunk-RTSM2X3X.js";import{b as x,c as $}from"./chunk-WM3ASZ64.js";import{A as b,B as C,a as st,c as mt,d as D,f as Te,g as h,h as _,i as dt,j as A,k as pt,l as R,m as v,p as F,s as H,w as pe,y as U}from"./chunk-3CXM22DE.js";import{a as Tt,b as bt,c as yt,d as wt}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import{a as Mt,o as J}from"./chunk-VPHHQYPB.js";import{g as gt}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import{q as ht,r as ue,s as be}from"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{c as _t,e as ye}from"./chunk-V5XCZUGO.js";import{g as ut,q as ct,s as ft}from"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as oe}from"./chunk-APNBV455.js";import{l as lt,v as Y,z as at}from"./chunk-CCSED5RY.js";import{Aa as c,Ac as Ze,Ba as f,Ea as qe,Eb as Ue,Ec as et,Fc as q,Ga as Ge,Gc as I,Hc as V,Ia as je,Jc as tt,Ka as We,Kc as it,Lb as p,Lc as nt,Mb as me,Mc as m,Nb as $e,Nc as de,Oa as se,Oc as w,Qb as ze,Qc as E,Ra as Qe,Rb as ie,Rc as P,Sc as S,Tc as G,Vc as Ce,Wc as ot,Xc as W,Yc as Q,ac as K,bc as u,dc as ve,ed as xe,gc as ne,ia as _e,j as ge,ja as le,jc as Ke,jd as Me,ka as ae,kc as Je,kd as rt,lc as r,ma as Le,mc as a,nc as O,pa as z,rc as X,sc as Xe,wb as s,wc as B,xb as g,yc as y,za as Be,zc as Ye}from"./chunk-LG2ZA55B.js";var Rt=["list"],Ht=["toggleButton"],Lt=["overlayOrigin"],Bt=["inputMinutes"],qt=["inputHours"],Gt=[[["nx-error"]]],jt=["nx-error"],Wt=(n,M)=>M.value,Qt=n=>({"has-outline":n}),Ut=n=>({"nx-timepicker-toggle--disabled":n}),$t=(n,M)=>({"has-outline":n,"twelve-hour-format":M});function zt(n,M){if(n&1){let e=X();r(0,"button",17,3),B("click",function(){c(e);let t=y();return f(!t.disabled&&t.toggleButtonClick())})("focus",function(){c(e);let t=y();return f(t._onFocus())})("keydown",function(t){c(e);let o=y();return f(o.handleKeyDown(t))}),O(2,"nx-icon",18),a()}if(n&2){let e=y();u("ngClass",Ce(6,Ut,e.disabled))("disabled",e.disabled),K("aria-label",e.intl.buttonOpenTimepickerAriaLabel)("aria-expanded",e.isOpen.toString())("aria-controls",e.isOpen?e.idOptionList:null)("aria-activedescendant",e._keyManager==null||e._keyManager.activeItem==null?null:e._keyManager.activeItem.id)}}function Kt(n,M){if(n&1&&(r(0,"span",13),m(1),a()),n&2){let e=y();s(),w(" ",e.hint," ")}}function Jt(n,M){if(n&1){let e=X();r(0,"nx-radio-toggle",19),S("ngModelChange",function(t){c(e);let o=y();return P(o._toggleAMPM,t)||(o._toggleAMPM=t),f(t)}),B("ngModelChange",function(){c(e);let t=y();return f(t._updateTime())})("click",function(){c(e);let t=y();return f(t._updateTime())}),r(1,"nx-radio-toggle-button",20),m(2),a(),r(3,"nx-radio-toggle-button",21),m(4),a()()}if(n&2){let e=y();u("name",e.idRadioGroup),E("ngModel",e._toggleAMPM),u("disabled",e.disabled)("variant",e.negative?"small negative":"small"),s(2),de(e.labelAM),s(2),de(e.labelPM)}}function Xt(n,M){n&1&&(r(0,"div",15),Ze(1),a())}function Yt(n,M){if(n&1){let e=X();r(0,"li",25),B("mousedown",function(t){c(e);let o=y(2);return f(o.preventFocus(t))})("click",function(){let t=c(e).$implicit,o=y(2);return f(o.selectOption(t.value))}),r(1,"div",26),m(2),a()()}if(n&2){let e=M.$implicit;u("nxTimefieldOption",e.value),s(2),de(e.label)}}function Zt(n,M){if(n&1){let e=X();r(0,"section",22)(1,"ul",23,4),B("keydown",function(t){c(e);let o=y();return f(o.handleKeyDown(t))}),Ke(3,Yt,3,2,"li",24,Wt),a()()}if(n&2){let e=y();u("ngClass",ot(3,$t,e.appearance==="outline",e.twelveHourFormat)),s(),u("id",e.idOptionList),K("aria-activedescendant",e._keyManager==null||e._keyManager.activeItem==null?null:e._keyManager.activeItem.id),s(2),Je(e.timeList)}}var re=(()=>{class n{constructor(){this.changes=new ge,this.inputFieldHoursAriaLabel="hours",this.inputFieldMinutesAriaLabel="minutes",this.buttonOpenTimepickerAriaLabel="Open time picker"}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275prov=le({token:n,factory:n.\u0275fac,providedIn:"root"})}}return n})(),ei=0,St=(()=>{class n{get id(){return this._id||this._generatedId}set id(e){this._id=e}constructor(e){this._cdr=e,this._active=!1,this.value="",this.selected=!1,this._id="",this._generatedId=`nx-timefield-option-${ei++}`,this.element=z(se).nativeElement}setActiveStyles(){this._active=!0,this._cdr.markForCheck()}setInactiveStyles(){this._active=!1,this._cdr.markForCheck()}getLabel(){return this.element.textContent?.trim()??""}static{this.\u0275fac=function(i){return new(i||n)(g(xe))}}static{this.\u0275dir=$e({type:n,selectors:[["","nxTimefieldOption",""]],hostAttrs:["role","option",1,"nx-timefield-option"],hostVars:4,hostBindings:function(i,t){i&2&&(Xe("id",t.id),K("aria-selected",t.selected),ve("is-active",t._active))},inputs:{value:[0,"nxTimefieldOption","value"],selected:"selected",id:"id"},exportAs:["nxTimefieldOption"]})}}return n})();function ti(n,M,e,i=!1){let t=/^\d{2}:\d{2}$/;if(!t.test(n)||!t.test(M))throw new Error("Invalid ISO time format. Use HH:mm format.");let o=new Date(`2000-01-01T${n}`),l=new Date(`2000-01-01T${M}`);if(o>=l)throw new Error("startTime must be less than endTime.");let T=[];for(;o<l;){let L=o.getHours(),ee=o.getMinutes().toString().padStart(2,"0"),te=`${L.toString().padStart(2,"0")}:${ee}`,He=te;if(i){let At=L>=12?"PM":"AM";L=L%12||12,He=`${L}:${ee} ${At}`}T.push({value:te,label:He}),o.setMinutes(o.getMinutes()+e)}return T}function ii(n,M){if(!n?.length)return"";let e=new Date(`2000-01-01T${M}`),t=n.map(l=>new Date(`2000-01-01T${l}`)).reduce((l,T)=>{let L=Math.abs(e.getTime()-l?.getTime());return Math.abs(e.getTime()-T?.getTime())<L?T:l});return`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}`}var he=0,ni="24:00",oi="00:00",ri=30;function li(){return{withTimepicker:!1}}var Fe=new Le("FORMFIELD_DEFAULT_OPTIONS",{providedIn:"root",factory:li});var ai=(()=>{class n{constructor(){this.timefield=z(d),this.ngControl=z(Te,{optional:!0,self:!0}),this.value=null,this.stateChanges=new ge,this.id="",this.focused=!1,this.required=!1,this.disabled=!1,this.readonly=!1,this.shouldLabelFloat=!0,this.errorState=!1,this.placeholder="",this.controlType="nx-timefield",this.updateOn="change"}get empty(){return!!this.value}setDescribedByIds(e){}setAriaLabel(e){}get elementRef(){return this.timefield.elementRef}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["nx-timefield-control"]],inputs:{value:"value",focused:"focused",required:"required",disabled:"disabled",readonly:"readonly",errorState:"errorState",placeholder:"placeholder",updateOn:"updateOn"},features:[G([{provide:vt,useExisting:n}])],decls:0,vars:0,template:function(i,t){},encapsulation:2,changeDetection:0})}}return n})(),d=(()=>{class n{set withTimepicker(e){this.focusMonitor.stopMonitoring(this.toggleButton?.nativeElement),this._withTimepicker=e,setTimeout(()=>this.toggleButton&&this.focusMonitor.monitor(this.toggleButton.nativeElement))}get withTimepicker(){return this._withTimepicker}handleKeyDown(e){if(this.withTimepicker&&!(!this.isOpen&&e.target instanceof HTMLButtonElement&&(e.key==="Enter"||e.key===" ")))if(this.isOpen)switch(e.key){case"Enter":case" ":e.preventDefault(),this.selectOption(this._keyManager?.activeItem?.value);break;default:this._keyManager?.onKeydown(e);break}else!this.isOpen&&e.key!=="Enter"&&e.key!=="Tab"&&e.key!=="Shift"&&this.toggleOverlay()}get idMinutes(){return this._idMinutes}get idHours(){return this._idHours}get idRadioGroup(){return this._idRadioGroup}get idOptionList(){return this._idOptionList}get maxHours(){return this._maxHours}get minHours(){return this._minHours}get maxMinutes(){return this._maxMinutes}get minMinutes(){return this._minMinutes}set time(e){this._time=e,this._onChangeCallback(e),this._cdr.markForCheck()}get time(){return this._time}set twelveHourFormat(e){this._twelveHourFormat=oe(e),this._twelveHourFormat?(this._maxHours=12,this._minHours=1,this._toggleAMPM="AM"):(this._maxHours=23,this._minHours=0,this._toggleAMPM=null),this._cdr.markForCheck()}get twelveHourFormat(){return this._twelveHourFormat}set label(e){this._label!==e&&(this._label=e,this._cdr.markForCheck())}get label(){return this._label}set labelAM(e){this._labelAM!==e&&(this._labelAM=e,this._cdr.markForCheck())}get labelAM(){return this._labelAM}set labelPM(e){this._labelPM!==e&&(this._labelPM=e,this._cdr.markForCheck())}get labelPM(){return this._labelPM}set placeholderHours(e){this._placeholderHours!==e&&(this._placeholderHours=e,this._cdr.markForCheck())}get placeholderHours(){return this._placeholderHours}set placeholderMinutes(e){this._placeholderMinutes!==e&&(this._placeholderMinutes=e,this._cdr.markForCheck())}get placeholderMinutes(){return this._placeholderMinutes}set required(e){this._required=oe(e)}get required(){return this._required}set negative(e){let i=oe(e);this._negative!==i&&(this._negative=i,this._cdr.markForCheck())}get negative(){return this._negative}set disabled(e){let i=oe(e);this._disabled!==i&&(this._disabled=i,this._cdr.markForCheck())}get disabled(){return this._disabled}set hours(e){this._hours=e,this._cdr.markForCheck()}get hours(){return this._hours}set minutes(e){this._minutes=e,this._cdr.markForCheck()}get minutes(){return this._minutes}get elementRef(){return this._elementRef}constructor(e,i,t,o,l,T,L,ee,te){this._cdr=e,this._errorStateMatcher=i,this._parentForm=t,this._parentFormGroup=o,this._intl=l,this._elementRef=T,this.injector=L,this._formfieldDefaultOptions=ee,this._timefieldDefaultOptions=te,this.errorState=Qe(!1),this.isOpen=!1,this.intl=z(re),this.focusMonitor=z(ct),this.ngControl=null,this.appearance=this._formfieldDefaultOptions?.appearance??"auto",this.hint="",this.optionalLabel="",this._withTimepicker=!1,this.enableTimeValidation=!1,this.valueChange=new We,this.destroyRef=z(je),this.timeList=[],this._idMinutes=`nx-timefield__minutes-${he++}`,this._idHours=`nx-timefield__hours-${he++}`,this._idRadioGroup=`nx-timefield__radio-group-${he++}`,this._idOptionList=`nx-timefield__list-${he++}`,this._maxHours=23,this._minHours=0,this._maxMinutes=59,this._minMinutes=0,this._twelveHourFormat=!1,this._labelAM="AM",this._labelPM="PM",this._placeholderHours="hh",this._placeholderMinutes="mm",this._negative=!1,this.pickerStartTime=oi,this.pickerEndTime=ni,this.pickerTimeInterval=ri,this._disabled=!1,this.hasFocus=!1,this._overlayWidth="",this._onTouchedCallback=()=>{},this._onChangeCallback=()=>{},te&&(this.withTimepicker=this._timefieldDefaultOptions?.withTimepicker??!1)}validate(e){if(!this.enableTimeValidation)return null;if(this.enableTimeValidation){let i=Number(this.hours),t=Number(this.minutes);if(!i&&!t)return null;if(!this._isValidTime(i,"hours")||!this._isValidTime(t,"minutes"))return{timefieldValueError:!0}}return e.value===null?{timefieldValueError:!0}:null}ngAfterViewInit(){this._keyManager=new ut(this.timepickerOptions).withWrap(),this._keyManager.change.pipe(Nt(this.destroyRef)).subscribe(()=>{this._keyManager?.activeItem&&this.scrollOptionIntoView(this._keyManager?.activeItem)})}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnInit(){this._createTimelist(),this.ngControl=this.injector.get(Te,null)}_createTimelist(){this.timeList=ti(this.pickerStartTime,this.pickerEndTime,this.pickerTimeInterval,this.twelveHourFormat)}ngOnChanges(e){(e.time||e.pickerStartTime||e.pickerEndTime||e.pickerTimeInterval||e.twelveHourFormat)&&(this._createTimelist(),setTimeout(()=>this.scrollSelectedItemIntoView()))}ngOnDestroy(){this.focusMonitor.stopMonitoring(this.toggleButton?.nativeElement)}updateErrorState(){let e=this.errorState(),i=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null,o=this._errorStateMatcher.isErrorState(t,i);o!==e&&this.errorState.set(o)}toggleOverlay(){this.isOpen?this.closeOverlay():this.openOverlay()}openOverlay(){this.disabled||(this._overlayWidth=this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect().width,this.isOpen=!0,setTimeout(()=>this.scrollSelectedItemIntoView()))}closeOverlay(){this.isOpen=!1,this._onTouchedCallback()}toggleButtonClick(){this.toggleOverlay()}_convertToISOFormat(e,i){return`${e}:${i}`}_updateTime(){if(this._time=null,this._isValidInput(this.hours)&&this._isValidInput(this.minutes)){let e=Number(this.hours),i=Number(this.minutes);this._isValidTime(e,"hours")&&this._isValidTime(i,"minutes")&&(this._time=this._timeInTwentyFourHourFormat(e,i))}this._onChangeCallback(this._time)}_onFocus(){this.hasFocus=!0}_getAriaLabel(e){let i;switch(e){case"hours":i=this._intl.inputFieldHoursAriaLabel;break;case"minutes":i=this._intl.inputFieldMinutesAriaLabel;break}return i}_onInput(e,i){let t=e.target;i==="hours"?(this.hours=t.value,t.value.length===2&&t.selectionStart===2&&this.inputMinutes.nativeElement.focus(),t.value.length===2&&t.selectionStart===1&&(t.selectionEnd=2)):i==="minutes"&&(this.minutes=t.value),this._updateTime();let o=this.findClosestOption(this.time);o&&this._keyManager?.setActiveItem(o)}_onBlur(e){!this.elementRef.nativeElement.contains(e.relatedTarget)&&!this.overlay?.overlayRef?.overlayElement?.contains(e.relatedTarget)&&(this._onTouchedCallback(),this.hasFocus=!1,this.closeOverlay())}_onInputBlur(e){e==="hours"&&Number(this.hours)<10&&this.hours!==""?this.hours=J(String(this.hours)):e==="minutes"&&Number(this.minutes)<10&&this.minutes!==""&&(this.minutes=J(String(this.minutes)))}_timeInTwentyFourHourFormat(e,i){return this.twelveHourFormat&&(this._toggleAMPM==="AM"?e===12&&(e-=12):this._toggleAMPM==="PM"&&e>=1&&e<12&&(e+=12)),this._convertToISOFormat(J(String(e)),J(String(i)))}_isValidInput(e){return/^\d{1,2}$/.test(e)}_isValidTime(e,i){let t=!1,o=Number(e);return i==="minutes"?t=o>=this._minMinutes&&o<=this._maxMinutes:i==="hours"&&(t=o>=this._minHours&&o<=this._maxHours),t}_parseAndSetTime(e){let i=e.split(":");if(i&&i.length===2&&this._isValidInput(i[0])&&this._isValidInput(i[1])){let t=Number(i[0]),o=Number(i[1]);if(this.twelveHourFormat&&(t===0?(t+=12,this._toggleAMPM="AM"):t>12&&t<=23?(t-=12,this._toggleAMPM="PM"):t===12&&(this._toggleAMPM="PM")),this._isValidTime(t,"hours")&&this._isValidTime(o,"minutes"))return this.hours=J(String(t)),this.minutes=J(String(o)),this._timeInTwentyFourHourFormat(t,o)}return null}selectOption(e){if(!e)return;let[i]=e.split(":");this._toggleAMPM=Number(i)>=12?"PM":"AM",this.writeValue(e),this.closeOverlay()}preventFocus(e){e.preventDefault()}scrollSelectedItemIntoView(){let e=this.findClosestOption(this.time);e&&(this._keyManager?.setActiveItem(e),this.scrollOptionIntoView(e))}findClosestOption(e){let i=ii(this.timeList.map(o=>o.value),e||"00:00");return this.timepickerOptions?.find(o=>o.value===i)}scrollOptionIntoView(e){e.element.scrollIntoView({block:"center"})}writeValue(e){this._hours="",this._minutes="",this._time=null,e&&(this.time=this._parseAndSetTime(e)),this.valueChange.emit(this.time)}registerOnChange(e){this._onChangeCallback=e}registerOnTouched(e){this._onTouchedCallback=e}setDisabledState(e){this.disabled=e}getLabelledBy(){return this.formfield?this.formfield.labelId:null}static{this.\u0275fac=function(i){return new(i||n)(g(xe),g(Mt),g(A,8),g(F,8),g(re),g(se),g(Ge),g(ce,8),g(Fe,8))}}static{this.\u0275cmp=p({type:n,selectors:[["nx-timefield"]],contentQueries:function(i,t,o){if(i&1&&et(o,x,5),i&2){let l;I(l=V())&&(t.error=l.first)}},viewQuery:function(i,t){if(i&1&&(q(fe,5),q(Rt,5),q(Ht,5),q(Lt,5),q(Bt,5),q(qt,5),q(ue,5),q(St,5)),i&2){let o;I(o=V())&&(t.formfield=o.first),I(o=V())&&(t.timePickerList=o.first),I(o=V())&&(t.toggleButton=o.first),I(o=V())&&(t.overlayOrigin=o.first),I(o=V())&&(t.inputMinutes=o.first),I(o=V())&&(t.inputHours=o.first),I(o=V())&&(t.overlay=o.first),I(o=V())&&(t.timepickerOptions=o)}},hostVars:8,hostBindings:function(i,t){i&1&&B("focusout",function(l){return t._onBlur(l)}),i&2&&ve("has-error",t.errorState())("is-negative",t.negative)("is-disabled",t.disabled)("has-timepicker",t.withTimepicker)},inputs:{appearance:"appearance",hint:"hint",optionalLabel:"optionalLabel",withTimepicker:[2,"withTimepicker","withTimepicker",Me],enableTimeValidation:[2,"enableTimeValidation","enableTimeValidation",Me],twelveHourFormat:"twelveHourFormat",label:"label",labelAM:"labelAM",labelPM:"labelPM",placeholderHours:"placeholderHours",placeholderMinutes:"placeholderMinutes",required:"required",negative:"negative",pickerStartTime:"pickerStartTime",pickerEndTime:"pickerEndTime",pickerTimeInterval:[2,"pickerTimeInterval","pickerTimeInterval",rt],disabled:"disabled"},outputs:{valueChange:"valueChange"},features:[G([{provide:st,useExisting:_e(()=>n),multi:!0},{provide:mt,useExisting:_e(()=>n),multi:!0}]),ze,Be],ngContentSelectors:jt,decls:16,vars:44,consts:[["overlayOrigin","cdkOverlayOrigin"],["inputHours",""],["inputMinutes",""],["toggleButton",""],["list",""],[1,"nx-timefield__wrapper",3,"ngClass"],["cdkOverlayOrigin","","floatLabel","always",3,"label","optionalLabel","appearance","negative"],["role","group",1,"time-group"],["type","text","maxlength","2","autocomplete","off","role","combobox","aria-autocomplete","list",1,"nx-timefield-input__field__hours",3,"input","keydown","focus","blur","id","value","required","disabled","placeholder"],["aria-hidden","true",1,"nx-timefield-hours-separator"],["type","text","maxlength","2","autocomplete","off","role","combobox","aria-autocomplete","list",1,"nx-timefield-input__field__minutes",3,"input","focus","blur","keydown","id","value","required","disabled","placeholder"],["nxFormfieldSuffix","","type","button",1,"nx-timepicker-toggle-button",3,"ngClass","disabled"],[2,"display","none",3,"errorState","disabled","required","value","focused"],["nxFormfieldHint",""],["disableMobile","",3,"name","ngModel","disabled","variant"],[1,"nx-margin-top-xs"],["cdkConnectedOverlay","",3,"backdropClick","detach","cdkConnectedOverlayOpen","cdkConnectedOverlayHasBackdrop","cdkConnectedOverlayOrigin","cdkConnectedOverlayMinWidth","cdkConnectedOverlayBackdropClass"],["nxFormfieldSuffix","","type","button",1,"nx-timepicker-toggle-button",3,"click","focus","keydown","ngClass","disabled"],["name","clock-o","aria-hidden","true","size","s"],["disableMobile","",3,"ngModelChange","click","name","ngModel","disabled","variant"],["disableMobile","","value","AM"],["disableMobile","","value","PM"],["role","dialog","aria-modal","true",3,"ngClass"],["role","listbox","tabindex","0",1,"option-list",3,"keydown","id"],[3,"nxTimefieldOption"],[3,"mousedown","click","nxTimefieldOption"],[1,"option-label"]],template:function(i,t){if(i&1){let o=X();Ye(Gt),r(0,"div",5)(1,"nx-formfield",6,0)(3,"div",7)(4,"input",8,1),B("input",function(T){return c(o),f(t._onInput(T,"hours"))})("keydown",function(T){return c(o),f(t.handleKeyDown(T))})("focus",function(){return c(o),f(t._onFocus())})("blur",function(){return c(o),f(t._onInputBlur("hours"))}),a(),r(6,"span",9),m(7,":"),a(),r(8,"input",10,2),B("input",function(T){return c(o),f(t._onInput(T,"minutes"))})("focus",function(){return c(o),f(t._onFocus())})("blur",function(){return c(o),f(t._onInputBlur("minutes"))})("keydown",function(T){return c(o),f(t.handleKeyDown(T))}),a(),ie(10,zt,3,8,"button",11),O(11,"nx-timefield-control",12),ie(12,Kt,2,1,"span",13),a()(),ie(13,Jt,5,6,"nx-radio-toggle",14),a(),ie(14,Xt,2,0,"div",15)(15,Zt,5,6,"ng-template",16),B("backdropClick",function(){return c(o),f(t.closeOverlay())})("detach",function(){return c(o),f(t.closeOverlay())})}if(i&2){let o=nt(2);u("ngClass",Ce(42,Qt,t.appearance==="outline")),s(),u("label",t.label)("optionalLabel",t.optionalLabel)("appearance",t.appearance)("negative",t.negative?"negative":""),s(2),K("aria-labelledby",t.getLabelledBy()),s(),u("id",t.idHours)("value",t.hours||null)("required",t.required)("disabled",t.disabled)("placeholder",t.placeholderHours),K("aria-required",t.required)("aria-label",t._getAriaLabel("hours"))("aria-expanded",t.isOpen.toString())("aria-controls",t.isOpen?t.idOptionList:null)("aria-activedescendant",t._keyManager==null||t._keyManager.activeItem==null?null:t._keyManager.activeItem.id)("aria-describedby",t.error==null?null:t.error.id),s(4),u("id",t.idMinutes)("value",t.minutes||null)("required",t.required)("disabled",t.disabled)("placeholder",t.placeholderMinutes),K("aria-required",t.required)("aria-label",t._getAriaLabel("minutes"))("aria-expanded",t.isOpen.toString())("aria-controls",t.isOpen?t.idOptionList:null)("aria-activedescendant",t._keyManager==null||t._keyManager.activeItem==null?null:t._keyManager.activeItem.id)("aria-describedby",t.error==null?null:t.error.id),s(2),ne(t.withTimepicker?10:-1),s(),u("errorState",t.errorState())("disabled",t.disabled)("required",t.required)("value",t.time)("focused",t.hasFocus),s(),ne(t.hint?12:-1),s(),ne(t.twelveHourFormat?13:-1),s(),ne(t.errorState()?14:-1),s(),u("cdkConnectedOverlayOpen",t.isOpen)("cdkConnectedOverlayHasBackdrop",!0)("cdkConnectedOverlayOrigin",o)("cdkConnectedOverlayMinWidth",t._overlayWidth)("cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop")}},dependencies:[lt,Oe,b,h,R,ai,St,we,fe,Ct,xt,ye,_t,ke,Et,Pt,be,ue,ht],styles:["[_nghost-%COMP%]{display:inline-block}.nx-timefield__wrapper[_ngcontent-%COMP%]{display:flex}.nx-timefield__wrapper[_ngcontent-%COMP%]:focus{outline:none}.nx-timefield-input__field__hours[_ngcontent-%COMP%], .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .nx-timefield-hours-separator[_ngcontent-%COMP%]{text-align:inherit;font-size:inherit;font-weight:inherit;color:inherit;text-align:left;border:0;outline:0;border-radius:0;padding:0;margin:0;background:transparent;box-sizing:border-box}.nx-timefield-input__field__hours[_ngcontent-%COMP%], .nx-timefield-input__field__minutes[_ngcontent-%COMP%]{width:2ch;padding:0;margin:0}.nx-timefield-input__field__minutes[_ngcontent-%COMP%]{width:32px}.has-timepicker[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .has-timepicker   [_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%]{margin-right:18px}.nx-timefield-hours-separator[_ngcontent-%COMP%]{margin:0 4px}nx-timepicker[_ngcontent-%COMP%]{display:block;height:24px;align-self:center}nx-radio-toggle[_ngcontent-%COMP%]{margin-left:24px;height:max-content;margin-top:var(--formfield-label-height)}[_nghost-%COMP%]     .nx-formfield__wrapper{padding-bottom:2px}[_nghost-%COMP%]     .nx-formfield__input-container:focus-within{border-color:var(--timefield-active-color)}.has-outline[_ngcontent-%COMP%]   nx-radio-toggle[_ngcontent-%COMP%]{padding-top:4px;margin-bottom:4px;margin-left:16px;margin-top:var(--formfield-outline-label-height)}.has-outline[_ngcontent-%COMP%]     .nx-timefield-input__field__hours, .has-outline[_ngcontent-%COMP%]     .nx-timefield-input__field__minutes{margin:0;font-weight:400;line-height:1.5rem;padding:0}.has-outline[_ngcontent-%COMP%]     .nx-timefield-input__field__hours{width:18px}.has-outline[_ngcontent-%COMP%]     .nx-timefield-input__field__minutes{max-width:58px}.has-outline[_ngcontent-%COMP%]     .nx-timefield-hours-separator{margin:0 2px;align-self:center}.has-outline[_ngcontent-%COMP%]     .nx-formfield__input{padding:2px 8px}[_nghost-%COMP%]:focus{outline:none}.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-timefield-input__container[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]     .nx-formfield__input-container:focus-within{border-color:var(--negative)!important}.is-disabled.is-negative[_nghost-%COMP%]{cursor:not-allowed}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield__label[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__hours[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__field__minutes[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-hours-separator[_ngcontent-%COMP%], .is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__container[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--timefield-disabled-color)}.is-disabled.is-negative[_nghost-%COMP%]   .nx-timefield-input__container[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 var(--timefield-disabled-color)}.is-negative[_nghost-%COMP%]   .nx-timepicker-toggle-button[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]   (.has-outline)[_ngcontent-%COMP%]   .nx-timepicker-toggle-button[_ngcontent-%COMP%]{color:inherit}.time-group[_ngcontent-%COMP%]{display:inherit}.nx-timepicker-toggle-button[_ngcontent-%COMP%]{border:none;background-color:transparent;color:inherit;outline:none;cursor:pointer;padding:0;margin:0;display:flex;align-items:center}.nx-timepicker-toggle-button[_ngcontent-%COMP%]:hover{color:var(--hover-primary)}.nx-timepicker-toggle-button.nx-timepicker-toggle--disabled[_ngcontent-%COMP%], .nx-timepicker-toggle-button.nx-timepicker-toggle--disabled[_ngcontent-%COMP%]:hover{cursor:not-allowed;color:var(--timefield-disabled-color)}.nx-timepicker-toggle-button[_ngcontent-%COMP%]::-moz-focus-inner{border:0}.nx-timepicker-toggle-button[_ngcontent-%COMP%]:active{outline:none}@media screen and (forced-colors: active){.nx-timepicker-toggle-button[_ngcontent-%COMP%]{color:ButtonText}}.nx-timepicker-toggle-button.cdk-keyboard-focused[_ngcontent-%COMP%]{border-radius:4px;box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-timepicker-toggle-button.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}section[_ngcontent-%COMP%]{width:100%}.option-list[_ngcontent-%COMP%]{outline:none;height:252px;background:var(--timepicker-layout-background-color);text-align:center;padding:8px 0;margin:6px 0;overflow-y:scroll;color:var(--timepicker-label-color);font-weight:400;box-shadow:0 2px 4px #41414180;border-radius:4px;width:100%}.option-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{list-style-type:none;width:100%;align-content:center;font-size:20px;line-height:1.75rem;outline:none;padding:8px 32px}.option-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:hover{color:var(--timepicker-label-hover-color);cursor:pointer}.option-list[_ngcontent-%COMP%] > li.is-active[_ngcontent-%COMP%]   .option-label[_ngcontent-%COMP%]{color:var(--timefield-active-color);border-radius:4px;box-shadow:var(--focus-box-shadow)}.has-outline[_ngcontent-%COMP%]   .option-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{font-size:16px;line-height:1.5rem}.twelve-hour-format[_ngcontent-%COMP%]   .option-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{text-align:end}.option-list[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:last-child{border-bottom:none}"],changeDetection:0})}}return n})(),N=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=me({type:n})}static{this.\u0275inj=ae({imports:[at,b,Oe,ye,gt,be,ke,ft,we,kt,C,d]})}}return n})();var Ne=(()=>{class n{constructor(e){this.fb=e,this.timefield=Ue.required(d),this.testForm=this.fb.group({timefieldReactive:[""]})}ngAfterViewInit(){this.timefield().hours="33",this.testForm.controls.timefieldReactive.markAsTouched(),this.testForm.controls.timefieldReactive.updateValueAndValidity()}static{this.\u0275fac=function(i){return new(i||n)(g(U))}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-custom-validation-example"]],viewQuery:function(i,t){i&1&&tt(t.timefield,d,5),i&2&&it()},decls:7,vars:4,consts:[[3,"formGroup"],["label","Time","formControlName","timefieldReactive","enableTimeValidation",""]],template:function(i,t){i&1&&(r(0,"form",0)(1,"nx-timefield",1)(2,"nx-error"),m(3," Invalid time input. "),a()()(),r(4,"p"),m(5),W(6,"json"),a()),i&2&&(u("formGroup",t.testForm),s(5),w("Errors: ",Q(6,2,t.testForm.controls.timefieldReactive.errors),""))},dependencies:[N,d,$,x,C,v,h,_,F,H,Y],encapsulation:2})}}return n})();var It=(()=>{class n{constructor(e){this.fb=e,this.testForm=this.fb.group({timefieldReactive:["22:54",D.required]})}static{this.\u0275fac=function(i){return new(i||n)(g(U))}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-default-example"]],decls:4,vars:1,consts:[[3,"formGroup"],["label","Time","formControlName","timefieldReactive"]],template:function(i,t){i&1&&(r(0,"form",0)(1,"nx-timefield",1)(2,"nx-error"),m(3," Invalid time input. "),a()()()),i&2&&u("formGroup",t.testForm)},dependencies:[N,d,$,x,C,v,h,_,F,H],encapsulation:2})}}return n})();var Ee=(()=>{class n{constructor(){this.templateModel="12:54"}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-disabled-example"]],decls:2,vars:1,consts:[["disabled","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(r(0,"form")(1,"nx-timefield",0),S("ngModelChange",function(l){return P(t.templateModel,l)||(t.templateModel=l),l}),a()()),i&2&&(s(),E("ngModel",t.templateModel))},dependencies:[b,v,h,_,R,A,d],encapsulation:2})}}return n})();var Pe=(()=>{class n{constructor(e){this.fb=e,this.testForm=this.fb.group({timefieldReactive:["22:54",D.required],timefieldPickerReactive:["20:15",D.required],timefield12Reactive:["",D.required]})}static{this.\u0275fac=function(i){return new(i||n)(g(U))}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-expert-example"]],features:[G([{provide:ce,useValue:{appearance:"outline"}}])],decls:21,vars:7,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,4"],["label","Time","formControlName","timefieldReactive","appearance","outline"],["label","Time","formControlName","timefieldPickerReactive","appearance","outline","withTimepicker",""],["label","Time","formControlName","timefield12Reactive","twelveHourFormat","","appearance","outline"],[1,"nx-margin-bottom-0"],[1,"nx-margin-y-0"]],template:function(i,t){i&1&&(r(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-timefield",4)(5,"nx-error"),m(6," Invalid time input. "),a()()(),r(7,"div",3)(8,"nx-timefield",5)(9,"nx-error"),m(10," Invalid time input. "),a()()(),r(11,"div",3)(12,"nx-timefield",6)(13,"nx-error"),m(14," Invalid time input. "),a()()()()()(),r(15,"p",7),m(16),W(17,"json"),a(),r(18,"p",8),m(19),W(20,"json"),a()),i&2&&(u("formGroup",t.testForm),s(16),w("Form value: ",Q(17,3,t.testForm.value),""),s(3),w("Form status: ",Q(20,5,t.testForm.status),""))},dependencies:[N,d,C,v,h,_,F,H,wt,Tt,bt,yt,Y,x],encapsulation:2,changeDetection:0})}}return n})();var Se=(()=>{class n{constructor(){this.templateModel="12:01"}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-format-toggler-example"]],decls:6,vars:2,consts:[["required","","name","templateTest","label","Time","twelveHourFormat","",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(r(0,"form")(1,"nx-timefield",0),S("ngModelChange",function(l){return P(t.templateModel,l)||(t.templateModel=l),l}),r(2,"nx-error"),m(3," Invalid time input. "),a()(),r(4,"p"),m(5),a()()),i&2&&(s(),E("ngModel",t.templateModel),s(4),w("Model Value (24h format): ",t.templateModel,""))},dependencies:[b,v,h,_,pe,R,A,d,x],encapsulation:2})}}return n})();var mi=(()=>{class n extends re{constructor(){super(...arguments),this.inputFieldHoursAriaLabel="stunden",this.inputFieldMinutesAriaLabel="minuten"}static{this.\u0275fac=(()=>{let e;return function(t){return(e||(e=qe(n)))(t||n)}})()}static{this.\u0275prov=le({token:n,factory:n.\u0275fac})}}return n})(),Ie=(()=>{class n{ngOnInit(){this.testForm=new dt({today:new pt("",{validators:[D.required]})})}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-localize-example"]],features:[G([{provide:re,useClass:mi}])],decls:5,vars:1,consts:[["form","ngForm"],[3,"formGroup"],["formControlName","today"],[1,"nx-margin-y-xs"]],template:function(i,t){i&1&&(r(0,"form",1,0)(2,"nx-timefield",2)(3,"nx-error",3),m(4," Invalid time input. "),a()()()),i&2&&u("formGroup",t.testForm)},dependencies:[b,v,h,_,C,F,H,d,x],encapsulation:2})}}return n})();var Ve=(()=>{class n{constructor(){this.templateModel="00:54",this.templateModel2="12:54"}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-negative-example"]],decls:5,vars:2,consts:[[1,"docs-inverse-container"],["negative","","twelveHourFormat","","name","templateTest","label","Time",3,"ngModelChange","ngModel"],["negative","","disabled","","twelveHourFormat","","name","templateTest2","label","Time",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(r(0,"div",0)(1,"form")(2,"nx-timefield",1),S("ngModelChange",function(l){return P(t.templateModel,l)||(t.templateModel=l),l}),a(),O(3,"br"),r(4,"nx-timefield",2),S("ngModelChange",function(l){return P(t.templateModel2,l)||(t.templateModel2=l),l}),a()()()),i&2&&(s(2),E("ngModel",t.templateModel),s(2),E("ngModel",t.templateModel2))},dependencies:[b,v,h,_,R,A,d],encapsulation:2})}}return n})();var De=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-options-interval-example"]],decls:6,vars:0,consts:[["nxCopytext","large",1,"nx-margin-bottom-m"],["label","Time","pickerStartTime","10:00","pickerEndTime","18:30","withTimepicker",""],["nxCopytext","large",1,"nx-margin-y-m"],["label","Time","pickerTimeInterval","60","withTimepicker",""]],template:function(i,t){i&1&&(r(0,"p",0),m(1,` Timepicker ranging from 10:00 to 18:00 with the default 30 minute interval
`),a(),O(2,"nx-timefield",1),r(3,"p",2),m(4,` Timepicker with a 60 minute interval
`),a(),O(5,"nx-timefield",3))},dependencies:[N,d,Ft,Ot],encapsulation:2})}}return n})();var Ae=(()=>{class n{constructor(e){this.fb=e,this.testForm=this.fb.group({timefieldReactive:["22:54",D.required]})}static{this.\u0275fac=function(i){return new(i||n)(g(U))}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-reactive-example"]],decls:10,vars:7,consts:[[3,"formGroup"],["label","Time","formControlName","timefieldReactive"],[1,"nx-margin-bottom-0"],[1,"nx-margin-y-0"]],template:function(i,t){i&1&&(r(0,"form",0)(1,"nx-timefield",1)(2,"nx-error"),m(3," Invalid time input. "),a()()(),r(4,"p",2),m(5),W(6,"json"),a(),r(7,"p",3),m(8),W(9,"json"),a()),i&2&&(u("formGroup",t.testForm),s(5),w("Form value (24h): ",Q(6,3,t.testForm.value),""),s(3),w("Form status: ",Q(9,5,t.testForm.status),""))},dependencies:[b,v,h,_,C,F,H,d,x,Y],encapsulation:2})}}return n})();var Re=(()=>{class n{constructor(){this.templateModel="14:54"}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-template-driven-example"]],decls:6,vars:2,consts:[["name","templateTest","label","Time","required","",3,"ngModelChange","ngModel"]],template:function(i,t){i&1&&(r(0,"form")(1,"nx-timefield",0),S("ngModelChange",function(l){return P(t.templateModel,l)||(t.templateModel=l),l}),r(2,"nx-error"),m(3," Invalid time input. "),a()(),r(4,"p"),m(5),a()()),i&2&&(s(),E("ngModel",t.templateModel),s(4),w("Model Value (24h format): ",t.templateModel,""))},dependencies:[b,v,h,_,pe,R,A,d,x],encapsulation:2})}}return n})();var Vt=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-with-timepicker-example"]],decls:1,vars:0,consts:[["label","Time","withTimepicker",""]],template:function(i,t){i&1&&O(0,"nx-timefield",0)},dependencies:[N,d,$,C],encapsulation:2})}}return n})();var Dt=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=p({type:n,selectors:[["timefield-with-timepicker-global-example"]],features:[G([{provide:Fe,useValue:{withTimepicker:!0}}])],decls:1,vars:0,consts:[["label","Time"]],template:function(i,t){i&1&&O(0,"nx-timefield",0)},dependencies:[N,d,$,C],encapsulation:2})}}return n})();var di=[Pe,Ee,Se,Ie,Ve,Ae,Re,De,Ne],no=(()=>{class n{static components(){return{"timefield-expert":Pe,"timefield-disabled":Ee,"timefield-format-toggler":Se,"timefield-localize":Ie,"timefield-negative":Ve,"timefield-reactive":Ae,"timefield-template-driven":Re,"timefield-options-interval":De,"timefield-default":It,"timefield-with-timepicker":Vt,"timefield-with-timepicker-global":Dt,"timefield-custom-validation":Ne}}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=me({type:n})}static{this.\u0275inj=ae({imports:[di]})}}return n})();export{no as TimefieldExamplesModule};
