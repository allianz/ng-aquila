import{a as V}from"./chunk-GCLFQC76.js";import{b as Y,c as Z,e as ee,f as te}from"./chunk-KTZ2MV5R.js";import{a as A,f as H,j as $,p as W}from"./chunk-3CXM22DE.js";import{a as ne,u as oe}from"./chunk-VPHHQYPB.js";import{e as X}from"./chunk-V5XCZUGO.js";import{d as U,e as J,q as K}from"./chunk-2EQ73B6L.js";import{a as s}from"./chunk-APNBV455.js";import{z as Q}from"./chunk-CCSED5RY.js";import{Aa as _,Ac as g,Ba as u,Ec as f,Fc as R,Gc as l,Hc as d,Ka as k,Lb as y,Mb as B,Qb as S,Rb as w,Tc as T,ac as h,ba as N,bc as G,dc as C,ed as D,gc as I,ia as b,j as P,jd as q,ka as j,lc as m,mc as v,nc as z,rc as L,wb as p,wc as x,xb as a,zc as F}from"./chunk-LG2ZA55B.js";var ie=[[["nx-label"]],"*",[["nx-error"]]],re=["nx-label","*","nx-error"];function ae(o,O){o&1&&g(0,2)}var le=["radioLabelWrapper"],de=["input"],se=["*"];function ce(o,O){o&1&&z(0,"div",5)}var M=class{constructor(O,e){this.source=O,this.value=e}},E=0,_e=(()=>{class o{set readonly(e){this._readonly=e,this._stateChanges.next()}get readonly(){return this._readonly}set id(e){this._id!==e&&(this._id=e,this._cdr.markForCheck())}get id(){return this._id}set disabled(e){this._disabled=s(e),this._stateChanges.next()}get disabled(){return this._disabled}set negative(e){this._negative=s(e),this._cdr.markForCheck()}get negative(){return this._negative}set required(e){this._required=s(e),this._stateChanges.next()}get required(){return this._required}set name(e){this._name=e,this._stateChanges.next()}get name(){return this._name}set value(e){this._value!==e&&(this._value=e,this._updateSelectedRadioFromValue(),this._checkSelectedRadioButton())}get value(){return this._value}constructor(e,n,t,i,r){this._cdr=e,this.ngControl=n,this._parentForm=t,this._parentFormGroup=i,this._errorStateMatcher=r,this.errorState=!1,this._readonly=!1,this._stateChanges=new P,this._id=`nx-radio-group-${E++}`,this._disabled=!1,this._negative=!1,this._required=!1,this.groupValueChange=new k,this._selected=null,this._name=`nx-radio-group-${E++}`,this._value=null,this._onChange=()=>{},this._onTouched=()=>{},this.ngControl&&(this.ngControl.valueAccessor=this)}ngAfterContentInit(){this.ngControl&&this._updateSelectedRadioFromValue(),this._checkSelectedRadioButton();let e=this.errorChildren.map(n=>n.id).join(" ");this._radios.forEach(n=>n.ariaDescribedBy=e)}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){this._stateChanges.complete()}writeValue(e){this.value=e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}change(e){this.value=e,this._onChange(e),this.groupValueChange.emit(new M(this._selected,this._value))}touch(){this._onTouched&&this._onTouched()}setDisabledState(e){this.disabled=e}setReadonly(e){this.readonly=e,this._cdr.markForCheck()}_updateSelectedRadioFromValue(){let e=this._selected!=null&&this._selected.value===this._value;this._radios!=null&&!e&&(this._selected=null,this._radios.forEach(n=>{n.checked=this.value===n.value,n.checked&&(this._selected=n)}))}_checkSelectedRadioButton(){this._selected&&!this._selected.checked&&(this._selected.checked=!0)}updateErrorState(){let e=this.errorState,n=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null,i=this._errorStateMatcher.isErrorState(t,n);i!==e&&(this.errorState=i,this._cdr.markForCheck())}static{this.\u0275fac=function(n){return new(n||o)(a(D),a(H,10),a($,8),a(W,8),a(ne))}}static{this.\u0275cmp=y({type:o,selectors:[["nx-radio-group"]],contentQueries:function(n,t,i){if(n&1&&(f(i,ee,5),f(i,Y,4),f(i,ue,5)),n&2){let r;l(r=d())&&(t._label=r.first),l(r=d())&&(t.errorChildren=r),l(r=d())&&(t._radios=r)}},hostAttrs:["role","radiogroup"],hostVars:6,hostBindings:function(n,t){n&2&&(h("id",t.id)("required",t.required)("aria-labelledby",(t._label==null?null:t._label.id)||null)("aria-nx-radio-group",t.ariaDescribedBy),C("nx-radio-group--negative",t.negative))},inputs:{readonly:[2,"readonly","readonly",q],id:"id",disabled:"disabled",negative:"negative",required:"required",name:"name",value:"value"},outputs:{groupValueChange:"groupValueChange"},features:[T([{provide:V,useExisting:b(()=>o)}]),S],ngContentSelectors:re,decls:3,vars:1,template:function(n,t){n&1&&(F(ie),g(0),g(1,1),w(2,ae,1,0)),n&2&&(p(2),I(t.errorState?2:-1))},styles:["[_nghost-%COMP%]     nx-error{margin-bottom:8px}[_nghost-%COMP%]     nx-label{margin-bottom:16px;display:block}"],changeDetection:0})}}return o})(),ue=(()=>{class o{set readonly(e){this._readonly=e}get readonly(){return this.radioGroup?.readonly||this._readonly}setReadonly(e){this.readonly=e,this._cdr.markForCheck()}set id(e){this._id!==e&&(this._id=e,this._cdr.markForCheck())}get id(){return this._id}get inputId(){return`${this.id}-input`}get labelId(){return`${this.id}-label`}set name(e){this._name!==e&&(this._name=e,this._cdr.markForCheck())}get name(){return this.radioGroup?.name||this._name}set labelSize(e){this._labelSize!==e&&(this._labelSize=e,this._cdr.markForCheck())}get labelSize(){return this._labelSize}set negative(e){let n=s(e);this._negative!==n&&(this._negative=n,this._cdr.markForCheck())}get negative(){return this.radioGroup?this.radioGroup.negative:this._negative}get labelHasContent(){return!!this._radioLabelWrapper.nativeElement.innerHTML.trim()}set value(e){e!==this._value&&(this._value=e,this.onChangeCallback(e))}get value(){return this._value}set checked(e){this._checked!==e&&(this._checked=e,this._cdr.markForCheck())}get checked(){return this._checked}set disabled(e){this._disabled=s(e),this._cdr.markForCheck()}get disabled(){return this._disabled||!!this.radioGroup?.disabled}set required(e){this._required=e,this._cdr.markForCheck()}get required(){return this._required||!!this.radioGroup?.required}constructor(e,n,t){this.radioGroup=e,this._cdr=n,this._focusMonitor=t,this.ariaLabel=null,this.ariaLabelledBy=null,this.ariaDescribedBy=null,this._readonly=!1,this._id=`nx-radio-${E++}-${oe()}`,this._name=null,this._labelSize="big",this._negative=!1,this.valueChange=new k,this._value=null,this._checked=!1,this._disabled=!1,this._required=!1,this._destroyed=new P,this.onChangeCallback=()=>{},this.onTouchedCallback=()=>{}}ngOnInit(){this.radioGroup&&(this.name=this.radioGroup.name,this.radioGroup._stateChanges.pipe(N(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()}),this.radioGroup.value===this._value&&(this._checked=!0))}ngAfterViewInit(){this._focusMonitor.monitor(this._nativeInput)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._focusMonitor.stopMonitoring(this._nativeInput)}labelContentChanged(){this._cdr.detectChanges()}writeValue(e){e===this._value&&(this._checked=!0,this._cdr.markForCheck())}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}focus(e){this._focusMonitor.focusVia(this._nativeInput,e)}_forwardFocusToInput(){this._nativeInput.nativeElement.focus()}touch(e){e.relatedTarget?.parentElement?.parentElement?.id!==this.radioGroup?.id&&this.radioGroup&&this.radioGroup.touch()}_onInputChange(e){e.stopPropagation(),this._checked=!0,this.valueChange.emit(new M(this,this._value)),this.onChangeCallback(this.value),this.radioGroup&&this.value!==this.radioGroup.value&&this.radioGroup.change(this.value)}_onInputClick(e){this.readonly&&e.preventDefault(),e.stopPropagation()}_controlInvalid(){let e=this.radioGroup&&(this.radioGroup._parentFormGroup||this.radioGroup._parentForm),n=this.radioGroup?.ngControl?this.radioGroup.ngControl.control:null;return this.radioGroup?._errorStateMatcher?this.radioGroup._errorStateMatcher.isErrorState(n,e):!!(n?.invalid&&(n.touched||e?.submitted))}static{this.\u0275fac=function(n){return new(n||o)(a(_e,8),a(D),a(K))}}static{this.\u0275cmp=y({type:o,selectors:[["nx-radio"]],viewQuery:function(n,t){if(n&1&&(R(le,7),R(de,5)),n&2){let i;l(i=d())&&(t._radioLabelWrapper=i.first),l(i=d())&&(t._nativeInput=i.first)}},hostVars:12,hostBindings:function(n,t){n&1&&x("focus",function(){return t._forwardFocusToInput()}),n&2&&(h("required",t.required)("aria-invalid",t._controlInvalid()||null),C("nx-radio-button--small-label",t.labelSize==="small")("nx-radio-button--big-label",t.labelSize==="big")("nx-radio--negative",t.negative)("has-error",t._controlInvalid()||null)("is-readonly",t.readonly||null))},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",readonly:[2,"readonly","readonly",q],id:"id",name:"name",labelSize:"labelSize",negative:"negative",value:"value",checked:"checked",disabled:"disabled",required:"required"},outputs:{valueChange:"valueChange"},features:[T([{provide:A,useExisting:b(()=>o),multi:!0},{provide:V,useExisting:b(()=>o)}]),S],ngContentSelectors:se,decls:8,vars:14,consts:[["input",""],["radioLabelWrapper",""],["type","radio",1,"nx-radio__input",3,"blur","change","click","id","disabled","checked"],["tabindex","-1",1,"nx-radio__label",3,"id"],[1,"nx-radio__circle"],[1,"nx-radio__dot"],[1,"nx-radio__label--text",3,"cdkObserveContent"]],template:function(n,t){if(n&1){let i=L();F(),m(0,"input",2,0),x("blur",function(c){return _(i),u(t.touch(c))})("change",function(c){return _(i),u(t._onInputChange(c))})("click",function(c){return _(i),u(t._onInputClick(c))}),v(),m(2,"label",3)(3,"div",4),w(4,ce,1,0,"div",5),v(),m(5,"span",6,1),x("cdkObserveContent",function(){return _(i),u(t.labelContentChanged())}),g(7),v()()}n&2&&(G("id",t.inputId)("disabled",t.disabled)("checked",t.checked),h("name",t.name)("aria-describedby",t.ariaDescribedBy)("aria-labelledby",t.ariaLabelledBy)("aria-label",t.ariaLabel)("aria-invalid",t._controlInvalid()||null)("aria-disabled",t.disabled||t.readonly||null),p(2),C("has-label",t.labelHasContent),G("id",t.labelId),h("for",t.inputId),p(2),I(t.checked?4:-1))},dependencies:[U],styles:["[_nghost-%COMP%]{display:block;position:relative}.nx-radio__input[_ngcontent-%COMP%]{opacity:0;position:absolute}.nx-radio-button--small-label[_nghost-%COMP%]   .nx-radio__label[_ngcontent-%COMP%]{font-size:var(--radio-button-small-label-font-size);line-height:var(--radio-button-small-label-line-height);font-weight:var(--radio-button-small-label-font-weight);letter-spacing:var(--radio-button-small-label-letter-spacing)}.nx-radio-button--small-label[_nghost-%COMP%]   .nx-radio__label.has-label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{margin-top:var(--radio-button-small-circle-margin-top)}.nx-radio-button--small-label[_nghost-%COMP%]   .nx-radio__label--text[_ngcontent-%COMP%]:not(:empty){margin-left:var(--radio-button-small-label-margin-left);margin-top:var(--radio-button-small-label-margin-top)}[dir=rtl]   .nx-radio-button--small-label[_nghost-%COMP%]   .nx-radio__label--text[_ngcontent-%COMP%]:not(:empty){margin-right:var(--radio-button-small-label-margin-left);margin-left:initial}.nx-radio-button--big-label[_nghost-%COMP%]   .nx-radio__label[_ngcontent-%COMP%]{font-size:var(--radio-button-large-label-font-size);line-height:var(--radio-button-large-label-line-height);font-weight:var(--radio-button-large-label-font-weight);letter-spacing:var(--radio-button-large-label-letter-spacing)}.nx-radio-button--big-label[_nghost-%COMP%]   .nx-radio__label.has-label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{margin-top:var(--radio-button-large-circle-margin-top)}.nx-radio-button--big-label[_nghost-%COMP%]   .nx-radio__label--text[_ngcontent-%COMP%]:not(:empty){margin-left:var(--radio-button-large-label-margin-left);margin-top:var(--radio-button-large-label-margin-top)}[dir=rtl]   .nx-radio-button--big-label[_nghost-%COMP%]   .nx-radio__label--text[_ngcontent-%COMP%]:not(:empty){margin-right:var(--radio-button-large-label-margin-left);margin-left:initial}.nx-radio--negative[_nghost-%COMP%]   .nx-radio__label--text[_ngcontent-%COMP%]{color:var(--negative)}.nx-radio--negative[_nghost-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--negative)}.nx-radio--negative[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--negative);background-color:transparent}.nx-radio--negative[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background:var(--negative)}.nx-radio--negative[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:disabled + .nx-radio__label[_ngcontent-%COMP%]{opacity:.4}.nx-radio__label[_ngcontent-%COMP%]{color:var(--radio-button-label-color);cursor:pointer;display:flex;position:relative}.nx-radio__circle[_ngcontent-%COMP%]{border-width:2px;border-style:solid;border-color:var(--radio-button-circle-color);border-radius:50%;width:24px;min-width:24px;height:24px;position:relative;display:flex;justify-content:center;align-items:center}.nx-radio__dot[_ngcontent-%COMP%]{width:var(--radio-button-dot-size);height:var(--radio-button-dot-size);background-color:var(--radio-button-dot-background-color);border-radius:50%;transition:background-color .2s ease}.nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--radio-button-selected-circle-color);background-color:var(--radio-button-selected-background-color)}.nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--radio-button-selected-dot-color)}.nx-radio__input[_ngcontent-%COMP%]:disabled + .nx-radio__label[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--radio-button-disabled-text-color)}.nx-radio__input[_ngcontent-%COMP%]:disabled + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--radio-button-disabled-border-color)}.nx-radio__input[_ngcontent-%COMP%]:checked:disabled + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{background-color:var(--radio-button-disabled-selected-background-color)}.nx-radio__input[_ngcontent-%COMP%]:checked:disabled + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--radio-button-disabled-selected-dot-color)}.is-readonly[_nghost-%COMP%]   .nx-radio__label[_ngcontent-%COMP%]:hover{cursor:not-allowed}.is-readonly[_nghost-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{background-color:var(--radio-button-readonly-background-color);border-color:var(--radio-button-readonly-border-color)}.is-readonly[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{background-color:var(--radio-button-readonly-background-color);border-color:var(--radio-button-readonly-border-color)}.is-readonly[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--radio-button-readonly-selected-dot-color)}.has-error[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%] + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--danger)}.has-error[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%] + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--danger)}.nx-radio__input.cdk-keyboard-focused[_ngcontent-%COMP%] + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){.nx-radio__input.cdk-keyboard-focused[_ngcontent-%COMP%] + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}[_nghost-%COMP%]:not(.nx-radio--negative):not(.has-error):not(.is-readonly)   .nx-radio__input[_ngcontent-%COMP%]:not(:disabled) + .nx-radio__label[_ngcontent-%COMP%]:hover   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--radio-button-hover-circle-color)}[_nghost-%COMP%]:not(.nx-radio--negative):not(.has-error):not(.is-readonly)   .nx-radio__input[_ngcontent-%COMP%]:not(:disabled):checked + .nx-radio__label[_ngcontent-%COMP%]:hover   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--radio-button-hover-dot-color)}[_nghost-%COMP%]:not(.nx-radio--negative):not(.has-error):not(.is-readonly)   .nx-radio__input[_ngcontent-%COMP%]:not(:disabled) + .nx-radio__label[_ngcontent-%COMP%]:active   .nx-radio__circle[_ngcontent-%COMP%]{border-color:var(--radio-button-hover-circle-color)}[_nghost-%COMP%]:not(.nx-radio--negative):not(.has-error):not(.is-readonly)   .nx-radio__input[_ngcontent-%COMP%]:not(:disabled):checked + .nx-radio__label[_ngcontent-%COMP%]:active   .nx-radio__dot[_ngcontent-%COMP%]{background-color:var(--radio-button-hover-dot-color)}@media screen and (forced-colors: active){[_nghost-%COMP%]   .nx-radio__label[_ngcontent-%COMP%]{color:buttonText!important}[_nghost-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{forced-color-adjust:none;border-color:buttonText!important;background-color:buttonFace!important}[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:highlight!important}[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:highlight!important}[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:disabled + .nx-radio__label[_ngcontent-%COMP%]{color:GrayText!important;opacity:1}[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:disabled + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__circle[_ngcontent-%COMP%]{border-color:GrayText!important}[_nghost-%COMP%]   .nx-radio__input[_ngcontent-%COMP%]:checked:disabled + .nx-radio__label[_ngcontent-%COMP%]   .nx-radio__dot[_ngcontent-%COMP%]{background-color:GrayText!important}}"],changeDetection:0})}}return o})(),Ne=(()=>{class o{static{this.\u0275fac=function(n){return new(n||o)}}static{this.\u0275mod=B({type:o})}static{this.\u0275inj=j({imports:[Q,X,J,Z,te]})}}return o})();export{_e as a,ue as b,Ne as c};
