import{a as R}from"./chunk-GCLFQC76.js";import{b as L,c as ne,e as re,f as ie}from"./chunk-KTZ2MV5R.js";import{a as X,c as Y,f as y,j as S,p as w}from"./chunk-3CXM22DE.js";import{a as Q}from"./chunk-VPHHQYPB.js";import{c as oe,e as D}from"./chunk-V5XCZUGO.js";import{d as Z,e as ee,q as te}from"./chunk-2EQ73B6L.js";import{a}from"./chunk-APNBV455.js";import{z as K}from"./chunk-CCSED5RY.js";import{Aa as f,Ac as g,Ba as M,Ec as m,Fc as N,Ga as U,Gc as d,Hc as b,Ka as x,Lb as I,Mb as $,Qb as T,Rb as O,Tc as V,ac as k,ba as F,bc as G,dc as p,ed as E,gc as C,ia as u,j as v,jd as q,ka as W,lc as l,mc as h,nc as j,rc as J,wb as _,wc as P,xb as c,zc as z}from"./chunk-LG2ZA55B.js";var le=[[["nx-label"]],"*",[["nx-error"]]],he=["nx-label","*","nx-error"];function se(n,s){n&1&&(l(0,"div",1),g(1,2),h())}var de=["checkboxLabelWrapper"],be=["input"],_e=["*",[["nx-error"]]],ge=["*","nx-error"];function ue(n,s){n&1&&j(0,"nx-icon",5)}function xe(n,s){n&1&&j(0,"div",6)}function ke(n,s){n&1&&(l(0,"div",8),g(1,1),h())}var ce=0,A=class{constructor(s,e,o){this.checked=s,this.value=e,this.checkbox=o}},B=class{constructor(s,e){this.value=s,this.checkboxGroup=e}},pe=(()=>{class n{set id(e){this._id!==e&&(this._id=e,this._cdr.markForCheck())}get id(){return this._id}set name(e){this._name=e,this._cdr.markForCheck()}get name(){return this._name}set disabled(e){this._disabled=a(e),this._label&&(this._label.disabled=this._disabled),this._stateChanges.next()}get disabled(){return this._disabled}set readonly(e){this._readonly=e,this._stateChanges.next()}get readonly(){return this._readonly}set negative(e){this._negative=a(e),this._cdr.markForCheck(),this._stateChanges.next()}get negative(){return this._negative}set labelSize(e){this._labelSize=e,this._stateChanges.next()}get labelSize(){return this._labelSize}set required(e){this._required=a(e)}get required(){return!!this._required}constructor(e,o,t,r,i){this._cdr=e,this._errorStateMatcher=o,this._parentForm=t,this._parentFormGroup=r,this.ngControl=i,this.errorState=!1,this._stateChanges=new v,this.selectionChange=new x,this._id=`nx-checkbox-group-${ce++}`,this._name="",this._disabled=!1,this._readonly=!1,this._negative=!1,this._destroyed=new v,this._onChange=()=>{},this._onTouched=()=>{},this.ngControl&&(this.ngControl.valueAccessor=this)}setReadonly(e){this.readonly=e,this._cdr.markForCheck()}ngAfterContentInit(){setTimeout(()=>{this._updateSelectedCheckboxFromValue(!0)}),this._checkboxes.changes.pipe(F(this._destroyed)).subscribe(()=>{this._value=this._checkboxes.filter(e=>e.checked).map(e=>e.value),this.ngControl&&this.ngControl.control.setValue(this._value),this._updateSelectedCheckboxFromValue()})}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._stateChanges.complete()}writeValue(e){this._value!==e&&(this._value=e,this._updateSelectedCheckboxFromValue())}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_updateSelectedCheckboxFromValue(e=!1){let o=e?!!this._value&&this._value.length:!!this._value;this._checkboxes?.length&&o&&this._checkboxes.map(t=>{t.checked=this._value.includes(t.value)})}change(e){let o=this._checkboxes.filter(t=>t.checked).map(t=>t.value);this._onChange(o),this._onTouched&&this._onTouched(),this.selectionChange.emit(new B(o,this))}get checkboxes(){return this._checkboxes.toArray()}updateErrorState(){let e=this.errorState,o=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null,r=this._errorStateMatcher.isErrorState(t,o);r!==e&&(this.errorState=r,this._cdr.markForCheck())}getLabelledby(){return!this._label?.id&&!this.error?.id?null:[this._label?.id,this.error?.id].join(" ")}static{this.\u0275fac=function(o){return new(o||n)(c(E),c(Q),c(S,8),c(w,8),c(y,10))}}static{this.\u0275cmp=I({type:n,selectors:[["nx-checkbox-group"]],contentQueries:function(o,t,r){if(o&1&&(m(r,re,5),m(r,L,5),m(r,ae,5)),o&2){let i;d(i=b())&&(t._label=i.first),d(i=b())&&(t.error=i.first),d(i=b())&&(t._checkboxes=i)}},hostVars:9,hostBindings:function(o,t){o&1&&P("focus",function(){return t._forwardFocusToInput()}),o&2&&(k("id",t.id)("required",t.required)("disabled",t.disabled||null)("role","group")("aria-labelledby",t.getLabelledby()),p("nx-checkbox-group",!0)("nx-checkbox-group--negative",t.negative))},inputs:{id:"id",name:"name",disabled:"disabled",readonly:[2,"readonly","readonly",q],negative:"negative",labelSize:"labelSize",required:"required"},outputs:{selectionChange:"selectionChange"},features:[V([{provide:R,useExisting:u(()=>n)}]),T],ngContentSelectors:he,decls:6,vars:1,consts:[[1,"nx-checkbox-group__label"],[1,"nx-checkbox-group__errors"],[1,"nx-checkbox-group__controls"]],template:function(o,t){o&1&&(z(le),l(0,"div")(1,"div",0),g(2),h(),O(3,se,2,0,"div",1),l(4,"div",2),g(5,1),h()()),o&2&&(_(3),C(t.errorState?3:-1))},styles:["[_nghost-%COMP%]     nx-error{margin-bottom:8px}[_nghost-%COMP%]     nx-label{margin-bottom:16px;display:block}.nx-checkbox-group--negative[_nghost-%COMP%]     nx-error, .nx-checkbox-group--negative[_nghost-%COMP%]     nx-label, .nx-checkbox-group--negative[_nghost-%COMP%]     nx-icon.nx-error__icon{color:var(--negative)}"],changeDetection:0})}}return n})(),ae=(()=>{class n{set id(e){e!==this._id&&(this._id=e,this._cdr.markForCheck())}get id(){return`nx-checkbox-${this._id}`}set name(e){this._name=e}get name(){return this.checkboxGroup?.name||this._name}set disabled(e){let o=a(e);o!==this._disabled&&(this._disabled=o,this._cdr.markForCheck())}get disabled(){return this.checkboxGroup?.disabled||this._disabled}set readonly(e){this._readonly=e}get readonly(){return this.checkboxGroup?.readonly||this._readonly}set labelSize(e){this._labelSize=e,this._cdr.markForCheck()}get labelSize(){return this.checkboxGroup?.labelSize||this._labelSize}set negative(e){let o=a(e);o!==this._negative&&(this._negative=o,this._cdr.markForCheck())}get negative(){return this.checkboxGroup?.negative||this._negative}set checked(e){let o=a(e);o!==this._checked&&(this._indeterminate&&this._setIndeterminate(!1),this._setChecked(o))}get checked(){return this._checked}set indeterminate(e){let o=a(e);this._indeterminate!==o&&(this._checked&&this._setChecked(!1),this._setIndeterminate(o)),this._cdr.markForCheck()}get indeterminate(){return this._indeterminate}set required(e){this._required=a(e)}get required(){return!!this._required}set value(e){this._value=e,this._cdr.markForCheck()}get value(){return this._value?this._value:this.checked.toString()}get labelHasContent(){return!!this._checkboxLabelWrapper.nativeElement.innerHTML.trim()}labelContentChanged(){this._cdr.detectChanges()}constructor(e,o,t,r,i){this._cdr=e,this._errorStateMatcher=o,this.checkboxGroup=t,this._focusMonitor=r,this.injector=i,this.ariaLabel=null,this.ariaLabelledBy=null,this._id=(ce++).toString(),this._name=null,this._disabled=!1,this._readonly=!1,this._labelSize="small",this._negative=!1,this._checked=!1,this._indeterminate=!1,this._value="",this.indeterminateChange=new x(!1),this.checkedChange=new x(!1),this.checkboxChange=new x,this._destroyed=new v,this.ngControl=null,this._parentForm=null,this._parentFormGroup=null,this.onChangeCallback=H=>{},this.onTouchedCallback=()=>{}}setReadonly(e){this.readonly=e,this._cdr.markForCheck()}validate(e){return this.required&&e.value!==!0?{required:!0}:null}_controlInvalid(){let e=this._parentFormGroup||this._parentForm,o=null;return this.checkboxGroup?.ngControl?o=this.checkboxGroup.ngControl:o=this.ngControl?this.ngControl.control:null,this._errorStateMatcher.isErrorState(o,e)}ngOnInit(){this.ngControl=this.injector.get(y,null),this._parentForm=this.injector.get(S,null),this._parentFormGroup=this.injector.get(w,null),this.checkboxGroup&&(this.name=this.checkboxGroup.name,this.checkboxGroup._stateChanges.pipe(F(this._destroyed)).subscribe(()=>{this._cdr.markForCheck()}))}ngAfterViewInit(){this._focusMonitor.monitor(this._nativeInput)}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this._focusMonitor.stopMonitoring(this._nativeInput)}_setIndeterminate(e){this._indeterminate=e,this.indeterminateChange.emit(this._indeterminate),this._cdr.markForCheck()}_setChecked(e){this._checked=e,this._cdr.markForCheck()}toggle(){this.checked=!this.checked,this.onChangeCallback(this.checked),this.checkboxGroup!==null&&this.checkboxGroup.change(this)}writeValue(e){e===null&&(e=!1),e!==this.checked&&(this.checked=e)}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}focus(e){this._focusMonitor.focusVia(this._nativeInput,e)}_forwardFocusToInput(){this._nativeInput.nativeElement.focus()}touch(){this.onTouchedCallback()}_onInputClick(e){if(e.stopPropagation(),this.disabled||this.readonly){e.preventDefault();return}this.toggle(),this.checkedChange.emit(this._checked),this.checkboxChange.emit(this._createChangeEvent(this._checked))}_createChangeEvent(e){return new A(e,this.value,this)}static{this.\u0275fac=function(o){return new(o||n)(c(E),c(Q),c(pe,8),c(te),c(U))}}static{this.\u0275cmp=I({type:n,selectors:[["nx-checkbox"]],contentQueries:function(o,t,r){if(o&1&&m(r,L,5),o&2){let i;d(i=b())&&(t.error=i.first)}},viewQuery:function(o,t){if(o&1&&(N(de,7),N(be,5)),o&2){let r;d(r=b())&&(t._checkboxLabelWrapper=r.first),d(r=b())&&(t._nativeInput=r.first)}},hostVars:18,hostBindings:function(o,t){o&2&&(k("required",t.required)("aria-invalid",t._controlInvalid()||null),p("nx-checkbox",!0)("disabled",t.disabled)("nx-checkbox--label-large",t.labelSize==="large")("nx-checkbox--label-small",t.labelSize==="small")("nx-checkbox--negative",t.negative)("has-error",t._controlInvalid()||null)("is-readonly",(t.checkboxGroup==null?null:t.checkboxGroup.readonly)||t.readonly)("can-hover",!t.readonly&&!t.disabled&&!t.negative))},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",id:"id",name:"name",disabled:"disabled",readonly:[2,"readonly","readonly",q],labelSize:"labelSize",negative:"negative",checked:"checked",indeterminate:"indeterminate",required:"required",value:"value"},outputs:{indeterminateChange:"indeterminateChange",checkedChange:"checkedChange",checkboxChange:"checkboxChange"},features:[V([{provide:X,useExisting:u(()=>n),multi:!0},{provide:Y,useExisting:u(()=>n),multi:!0},{provide:R,useExisting:u(()=>n)}]),T],ngContentSelectors:ge,decls:10,vars:19,consts:[["input",""],["checkboxLabelWrapper",""],["type","checkbox",1,"nx-checkbox__input",3,"blur","click","id","name","checked","indeterminate","disabled","value"],[1,"nx-checkbox__label",3,"id"],[1,"nx-checkbox__control"],["name","check","aria-hidden","true"],[1,"nx-checkbox__indeterminate-indicator"],[1,"nx-checkbox__label-text",3,"cdkObserveContent"],[1,"nx-margin-top-xs"]],template:function(o,t){if(o&1){let r=J();z(_e),l(0,"input",2,0),P("blur",function(){return f(r),M(t.touch())})("click",function(H){return f(r),M(t._onInputClick(H))}),h(),l(2,"label",3)(3,"span",4),O(4,ue,1,0,"nx-icon",5)(5,xe,1,0,"div",6),h(),l(6,"div",7,1),P("cdkObserveContent",function(){return f(r),M(t.labelContentChanged())}),g(8),h()(),O(9,ke,2,0,"div",8)}o&2&&(p("is-readonly",t.readonly),G("id",t.id)("name",t.name)("checked",t.checked)("indeterminate",t.indeterminate)("disabled",t.disabled)("value",t.value),k("aria-labelledby",t.ariaLabelledBy)("aria-label",t.ariaLabel)("aria-describedby",(t.error==null?null:t.error.id)||null)("aria-disabled",t.readonly||null),_(2),p("has-label",t.labelHasContent),G("id",t.id+"-label"),k("for",t.id),_(2),C(t.checked?4:-1),_(),C(t.indeterminate?5:-1),_(4),C(t._controlInvalid()?9:-1))},dependencies:[D,oe,Z],styles:["[_nghost-%COMP%]{display:block;position:relative}.nx-checkbox__input[_ngcontent-%COMP%]{opacity:0;position:absolute}.nx-checkbox__label[_ngcontent-%COMP%]{font-size:var(--checkbox-small-label-font-size);line-height:var(--checkbox-small-label-line-height);font-weight:var(--checkbox-small-label-font-weight);letter-spacing:var(--checkbox-small-label-letter-spacing);color:var(--checkbox-label-color);cursor:pointer;display:flex}.has-error[_nghost-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--danger)}.has-error[_nghost-%COMP%]   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--danger)}.has-error[_nghost-%COMP%]:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--danger);border-color:var(--danger)}.has-error.can-hover[_nghost-%COMP%]:hover   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--danger-hover)}.has-error.can-hover[_nghost-%COMP%]:hover   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--danger-hover)}.has-error.can-hover[_nghost-%COMP%]:hover:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--danger-hover);border-color:var(--danger-hover)}.has-error.can-hover[_nghost-%COMP%]:has(input:active)   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--danger-active)}.has-error.can-hover[_nghost-%COMP%]:has(input:active)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--danger-active)}.has-error.can-hover[_nghost-%COMP%]:has(input:active):has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--danger-active);border-color:var(--danger-active)}.nx-checkbox--label-large[_nghost-%COMP%]   .nx-checkbox__label[_ngcontent-%COMP%]{font-size:var(--checkbox-large-label-font-size);line-height:var(--checkbox-large-label-line-height);font-weight:var(--checkbox-large-label-font-weight);letter-spacing:var(--checkbox-large-label-letter-spacing)}.nx-checkbox--label-large[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{margin-top:var(--checkbox-large-label-text-margin-top)}.nx-checkbox--label-large[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{margin-top:var(--checkbox-large-label-control-margin-top)}.nx-checkbox--label-large[_nghost-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{margin-left:var(--checkbox-large-label-text-margin-left)}[dir=rtl]   .nx-checkbox--label-large[_nghost-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{margin-left:initial;margin-right:var(--checkbox-large-label-text-margin-left)}.nx-checkbox--label-small[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{margin-top:var(--checkbox-small-label-text-margin-top)}.nx-checkbox--label-small[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{margin-top:var(--checkbox-small-label-control-margin-top)}.nx-checkbox__label-text[_ngcontent-%COMP%]{padding:0;margin-left:var(--checkbox-small-label-text-margin-left)}.nx-checkbox__label-text[_ngcontent-%COMP%]:empty{display:none}[dir=rtl][_nghost-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{margin-left:initial;margin-right:var(--checkbox-small-label-text-margin-left)}.nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-background-color);border-style:solid;border-width:var(--checkbox-border-width);border-color:var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);color:var(--checkbox-icon-color);font-size:var(--checkbox-icon-size);height:var(--checkbox-control-size);width:var(--checkbox-control-size);min-width:var(--checkbox-control-size);display:flex;justify-content:center;align-items:center;z-index:0;cursor:pointer}.nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--checkbox-indeterminate-color);background-color:var(--checkbox-indeterminate-color);box-sizing:content-box;height:0;width:8px;border:1px solid;border-radius:2px}[_nghost-%COMP%]:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-selected-background-color);border-color:var(--checkbox-selected-border-color)}[_nghost-%COMP%]:has(input:checked):has(input:disabled)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-disabled-selected-background-color)}[_nghost-%COMP%]:has(input:disabled){cursor:not-allowed}[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-disabled-background-color);border-color:var(--checkbox-disabled-border-color);color:var(--checkbox-disabled-icon-color)}[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__label[_ngcontent-%COMP%]{color:var(--checkbox-label-disabled-color)}[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--checkbox-disabled-border-color);background-color:var(--checkbox-disabled-border-color)}.is-readonly[_nghost-%COMP%]{cursor:not-allowed}.is-readonly[_nghost-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-readonly-background-color);border-color:var(--checkbox-readonly-border-color);color:var(--checkbox-readonly-icon-color)}.is-readonly[_nghost-%COMP%]   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--checkbox-readonly-indeterminate-color);background-color:var(--checkbox-readonly-indeterminate-color)}.is-readonly[_nghost-%COMP%]:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-readonly-selected-background-color);border-color:var(--checkbox-readonly-selected-border-color)}.can-hover[_nghost-%COMP%]:hover:not(.has-error)   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--checkbox-hover-border-color)}.can-hover[_nghost-%COMP%]:hover:not(.has-error)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--checkbox-hover-background-color)}.can-hover[_nghost-%COMP%]:hover:not(.has-error):has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-hover-background-color)}.can-hover[_nghost-%COMP%]:has(input:active):not(.has-error)   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--checkbox-active-border-color)}.can-hover[_nghost-%COMP%]:has(input:active):not(.has-error)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--checkbox-active-background-color)}.can-hover[_nghost-%COMP%]:has(input:active):not(.has-error):has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-active-background-color)}.nx-checkbox--negative[_nghost-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:var(--negative);background-color:transparent}.nx-checkbox--negative[_nghost-%COMP%]   .nx-checkbox__label[_ngcontent-%COMP%]{color:var(--negative)}.nx-checkbox--negative[_nghost-%COMP%]:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{color:var(--negative-accent);background-color:var(--negative);border-color:var(--negative)}.nx-checkbox--negative[_nghost-%COMP%]:has(input:checked):has(input:disabled)   .nx-checkbox__control[_ngcontent-%COMP%]{color:var(--negative-dimmed);border-color:transparent;background-color:var(--negative-02-dimmed)}.nx-checkbox--negative[_nghost-%COMP%]   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--negative);background-color:var(--negative)}.nx-checkbox--negative[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__label[_ngcontent-%COMP%]{color:var(--negative-dimmed)}.nx-checkbox--negative[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:var(--checkbox-disabled-negative-background-color);border-color:var(--negative-01-dimmed)}.nx-checkbox--negative[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:var(--negative-01-dimmed);background-color:var(--negative-01-dimmed)}[_nghost-%COMP%]:has(.cdk-keyboard-focused)   .nx-checkbox__control[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){[_nghost-%COMP%]:has(.cdk-keyboard-focused)   .nx-checkbox__control[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media screen and (forced-colors: active){[_nghost-%COMP%]   .nx-checkbox__control[_ngcontent-%COMP%]{forced-color-adjust:none;border-color:buttonText!important;background-color:buttonFace!important}[_nghost-%COMP%]   .nx-checkbox__label-text[_ngcontent-%COMP%]{color:buttonText!important}[_nghost-%COMP%]:has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:highlight!important;border-color:highlight!important;color:highlightText!important;forced-color-adjust:none}[_nghost-%COMP%]   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:buttonText!important}[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__control[_ngcontent-%COMP%]{border-color:GrayText!important;color:GrayText!important}[_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__label-text[_ngcontent-%COMP%], [_nghost-%COMP%]:has(input:disabled)   .nx-checkbox__indeterminate-indicator[_ngcontent-%COMP%]{color:GrayText!important}[_nghost-%COMP%]:has(input:disabled):has(input:checked)   .nx-checkbox__control[_ngcontent-%COMP%]{background-color:buttonFace!important;border-color:GrayText!important;color:GrayText!important}}"],changeDetection:0})}}return n})(),Be=(()=>{class n{static{this.\u0275fac=function(o){return new(o||n)}}static{this.\u0275mod=$({type:n})}static{this.\u0275inj=W({imports:[K,D,ee,ae,ie,ne]})}}return n})();export{pe as a,ae as b,Be as c};
