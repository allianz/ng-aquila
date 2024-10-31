import{a as ce}from"./chunk-GCLFQC76.js";import{b as oe}from"./chunk-7QWQ4QU3.js";import{a as $,c as J,d as K,e as X,i as Y,o as Z}from"./chunk-XQQV6HQT.js";import{a as re,u as se}from"./chunk-BPL6OUEL.js";import{c as ie,e as m}from"./chunk-HHZZPJBP.js";import{m as ee,n as te,y as ne}from"./chunk-HZUKJVM5.js";import{a as p}from"./chunk-3R2XMLRC.js";import{z as U}from"./chunk-YXSCZMUH.js";import{Hc as A,Ia as g,Ic as H,Ja as _,Lb as V,Oa as j,Qb as q,Rb as d,Sb as N,Ta as E,Ub as w,Xb as z,ac as a,bc as l,ca as S,cc as L,cd as W,ea as T,gc as G,id as x,la as h,lc as C,n as v,na as D,oc as Q,pc as O,sa as F,tc as R,u as f,ub as M,uc as P,vb as c,vc as b,w as y,wc as u,xa as I,ya as B}from"./chunk-OQCNQT64.js";var ae=["switcherLabelWrapper"],le=["input"],he=["*",[["nx-error"]]],ge=["*","nx-error"];function _e(r,i){r&1&&(a(0,"div",8),O(1,1),l())}var de=0,Ce=(()=>{let i=class i{set ariaDescribedBy(e){this._ariaDescribedBy=e,this._syncDescribedByIds(),this._cdr.markForCheck()}get ariaDescribedBy(){return this._ariaDescribedBy}set id(e){this._id=e,this._cdr.markForCheck()}get id(){return this._id}set labelPosition(e){this._labelPosition=e,this._cdr.markForCheck()}get labelPosition(){return this._labelPosition}set name(e){this._name=e,this._cdr.markForCheck()}get name(){return this._name}set checked(e){this._checked=e,this._cdr.markForCheck()}get checked(){return this._checked}set big(e){let n=p(e);this._big=n,this._cdr.markForCheck()}get big(){return this._big}set labelSize(e){this._labelSize=e,this._cdr.markForCheck()}get labelSize(){return this._labelSize}set negative(e){let n=p(e);this._negative=n,this._cdr.markForCheck()}get negative(){return this._negative}set disabled(e){let n=p(e);this._disabled=n,this._cdr.markForCheck()}get disabled(){return this._disabled}set required(e){this._required=e}get required(){return this._required??this.ngControl?.control?.hasValidator(K.requiredTrue)??!1}constructor(e,n,t,o,s){this._cdr=e,this._errorStateMatcher=n,this._parentForm=t,this._parentFormGroup=o,this._focusMonitor=s,this.errorState=!1,this.ariaLabel=null,this.ariaLabelledBy=null,this._ariaDescribedBy=null,this._id=`nx-switcher-${de++}-${se()}`,this._labelPosition="right",this._name=null,this._checked=!1,this._big=!1,this._labelSize="large",this._negative=!1,this._disabled=!1,this.checkedChange=new E,this.onChangeCallback=k=>{},this.onTouchedCallback=()=>{},this._destroyed=new v,this.ngControl=null,this.injector=F(j),this.readonly=!1}validate(e){return this.required&&e.value!==!0?{required:!0}:null}ngOnInit(){this.ngControl=this.injector.get(X,null)}ngAfterViewInit(){this._focusMonitor.monitor(this._nativeInput),this._errorChildren.changes.pipe(S(null),f(y),T(this._destroyed)).subscribe(()=>{this._syncDescribedByIds(),this._cdr.markForCheck()})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._nativeInput),this._destroyed.next(),this._destroyed.complete()}toggle(e){if(e.stopPropagation(),this.disabled||this.readonly){e.preventDefault();return}this.checked=!this.checked,this.onChangeCallback(this.checked),this.checkedChange.emit(this.checked),this.onTouchedCallback&&this.onTouchedCallback()}writeValue(e){e===null&&(e=!1),e!==this.checked&&(this.checked=e)}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this._cdr.markForCheck())}setDisabledState(e){this.disabled=e}touch(){this.onTouchedCallback()}updateErrorState(){let e=this.errorState,n=this._parentFormGroup||this._parentForm,t=this.ngControl?this.ngControl.control:null,o=this._errorStateMatcher.isErrorState(t,n);o!==e&&(this.errorState=o)}get labelHasContent(){return!!this._switcherLabelWrapper.nativeElement.innerHTML.trim()}labelContentChanged(){this._cdr.detectChanges()}_forwardFocusToInput(){this._nativeInput.nativeElement.focus()}_syncDescribedByIds(){let e=this._errorChildren||[];this._ariaDescribedBy=[...e.map(n=>n.id),this.ariaDescribedBy].join(" ")}setReadonly(e){this.readonly=e,this._cdr.markForCheck()}};i.\u0275fac=function(n){return new(n||i)(c(W),c(re),c(Y,8),c(Z,8),c(ne))},i.\u0275cmp=I({type:i,selectors:[["nx-switcher"]],contentQueries:function(n,t,o){if(n&1&&R(o,oe,4),n&2){let s;b(s=u())&&(t._errorChildren=s)}},viewQuery:function(n,t){if(n&1&&(P(ae,7),P(le,5)),n&2){let o;b(o=u())&&(t._switcherLabelWrapper=o.first),b(o=u())&&(t._nativeInput=o.first)}},hostVars:21,hostBindings:function(n,t){n&1&&C("focus",function(){return t._forwardFocusToInput()}),n&2&&(d("id",null),w("is-negative",t.negative)("is-checked",t.checked)("is-big",t.big)("check-icon-small",!t.big)("nx-switcher--small-label",t.labelSize==="small")("nx-switcher--large-label",t.labelSize==="large")("is-disabled",t.disabled)("is-swapped",t.labelPosition==="left")("has-error",t.errorState)("is-readonly",t.readonly))},inputs:{ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",id:"id",labelPosition:"labelPosition",name:"name",checked:"checked",big:"big",labelSize:"labelSize",negative:"negative",disabled:"disabled",required:[2,"required","required",x],readonly:[2,"readonly","readonly",x]},outputs:{checkedChange:"checkedChange"},standalone:!0,features:[A([{provide:$,useExisting:h(()=>i),multi:!0},{provide:J,useExisting:h(()=>i),multi:!0},{provide:ce,useExisting:h(()=>i)}]),V,H],ngContentSelectors:ge,decls:10,vars:16,consts:[["input",""],["switcherLabelWrapper",""],["type","checkbox","role","switch",1,"nx-switcher__input",3,"click","blur","id","disabled","checked"],[1,"nx-switcher__control"],[1,"nx-switcher__toggle"],[1,"nx-switcher__dot"],["name","check","aria-hidden","true"],[1,"nx-switcher__label-text",3,"cdkObserveContent"],[1,"nx-switcher-error"]],template:function(n,t){if(n&1){let o=G();Q(he),a(0,"input",2,0),C("click",function(k){return g(o),_(t.toggle(k))})("blur",function(){return g(o),_(t.touch())}),l(),a(2,"label",3)(3,"div",4)(4,"div",5),L(5,"nx-icon",6),l()(),a(6,"div",7,1),C("cdkObserveContent",function(){return g(o),_(t.labelContentChanged())}),O(8),l()(),q(9,_e,2,0,"div",8)}n&2&&(N("id",t.id)("disabled",t.disabled)("checked",t.checked),d("name",t.name)("aria-checked",t.checked)("aria-labelledby",t.ariaLabelledBy)("aria-describedby",t.ariaDescribedBy)("aria-label",t.ariaLabel)("aria-invalid",t.errorState)("aria-required",t.required)("aria-disabled",t.readonly||null)("required",t.required||null),M(2),w("has-label",t.labelHasContent),d("for",t.id),M(7),z(t.errorState?9:-1))},dependencies:[m,ie,ee],styles:["[_nghost-%COMP%]{position:relative}.is-swapped[_nghost-%COMP%]   .nx-switcher__label[_ngcontent-%COMP%]{flex-direction:row-reverse;justify-content:flex-end}.is-swapped[_nghost-%COMP%]   .nx-switcher__label.has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-left:12px}[dir=rtl]   .is-swapped[_nghost-%COMP%]   .nx-switcher__label.has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-right:12px;margin-left:initial}.nx-switcher__input[_ngcontent-%COMP%]{opacity:0;position:absolute}.nx-switcher__control[_ngcontent-%COMP%]{cursor:pointer;display:flex;position:relative}.is-swapped[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{flex-direction:row-reverse;justify-content:flex-end}.is-swapped[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{margin-right:12px}.nx-switcher__label-text[_ngcontent-%COMP%]{font-size:var(--switcher-large-font-size);line-height:var(--switcher-large-line-height);font-weight:var(--switcher-large-font-weight);letter-spacing:var(--switcher-large-letter-spacing)}.nx-switcher__toggle[_ngcontent-%COMP%]{position:relative;display:inline-block;width:48px;min-width:48px;height:24px;background-color:var(--switcher-unchecked-background-color);border-radius:16px;transition:background-color .2s ease}[_nghost-%COMP%]:not(.is-swapped)   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-right:12px}[dir=rtl]   [_nghost-%COMP%]:not(.is-swapped)   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-right:initial;margin-left:12px}.nx-switcher__dot[_ngcontent-%COMP%]{position:absolute;height:20px;width:20px;left:2px;bottom:2px;background-color:var(--switcher-dot-background-color);border-radius:16px;transform:translate(0);transition:transform .2s ease}[dir=rtl][_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{right:2px;left:auto}.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{transform:translate(24px)}[dir=rtl]   .is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{transform:translate(-24px)}.is-checked[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--switcher-checked-background-color)}.is-checked[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{opacity:1;transition:opacity .2s ease}.is-checked.is-negative[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--negative-dimmed)}.check-icon-small[_nghost-%COMP%]{font-size:16px}nx-icon[_ngcontent-%COMP%]{position:absolute;top:2px;left:2px;opacity:0;color:var(--switcher-checked-icon-color)}.is-big[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{width:56px;min-width:56px;height:32px;border-radius:32px}.is-big[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{height:28px;width:28px}.is-big[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{font-size:24px}[dir=rtl]   .is-big[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{right:2px;left:auto}.is-big.nx-switcher--large-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{margin-top:var(--switcher-big-large-label-text-margin-top)}.is-big.nx-switcher--large-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-top:var(--switcher-big-large-label-control-margin-top)}.is-big.nx-switcher--small-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{margin-top:var(--switcher-big-small-label-text-margin-top)}.is-big.nx-switcher--small-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-top:var(--switcher-big-small-label-control-margin-top)}.nx-switcher--large-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{margin-top:var(--switcher-large-label-text-margin-top)}.nx-switcher--large-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-top:var(--switcher-large-label-control-margin-top)}.nx-switcher--small-label[_nghost-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{font-size:var(--switcher-small-font-size);line-height:var(--switcher-small-line-height);font-weight:var(--switcher-small-font-weight);letter-spacing:var(--switcher-small-letter-spacing)}.nx-switcher--small-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__label-text[_ngcontent-%COMP%]{margin-top:var(--switcher-small-label-text-margin-top)}.nx-switcher--small-label[_nghost-%COMP%]   .has-label[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{margin-top:var(--switcher-small-label-control-margin-top)}.is-negative[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{background-color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--negative-dimmed)}.is-negative[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--negative-background)}[_nghost-%COMP%]   .nx-switcher__input.cdk-keyboard-focused[_ngcontent-%COMP%] + .nx-switcher__control[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (forced-colors: active),(forced-colors: active){[_nghost-%COMP%]   .nx-switcher__input.cdk-keyboard-focused[_ngcontent-%COMP%] + .nx-switcher__control[_ngcontent-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}.is-disabled[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--switcher-disabled-background-color)}.is-disabled[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{background-color:var(--switcher-disabled-dot-background-color)}.is-disabled[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--switcher-disabled-text-color)}.is-disabled[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--switcher-disabled-icon-color)}.is-readonly[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--switcher-readonly-background-color);border:1px solid var(--switcher-readonly-border-color)}.is-readonly[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{background-color:var(--switcher-readonly-dot-background-color);left:1px;bottom:1px}.is-readonly[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--switcher-readonly-icon-color)}.is-readonly[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--switcher-readonly-text-color)}.has-error[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:var(--danger)}.has-error[_nghost-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:var(--danger)}@media screen and (forced-colors: active){[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{color:buttonText}[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{forced-color-adjust:none;color:highlightText;background-color:highlight}[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:buttonFace;border:2px solid buttonText;color:buttonText}[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__dot[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__dot[_ngcontent-%COMP%]{left:0;bottom:0;box-shadow:0 0 0 2px buttonText;background-color:buttonText}.is-checked[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative.is-checked[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:highlight}.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%], .is-negative.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{background-color:highlightText;color:buttonText}.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%], .is-negative.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:highlight}.is-disabled[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%], .is-negative.is-disabled[_nghost-%COMP%]   .nx-switcher__control[_ngcontent-%COMP%]{color:GrayText}.is-disabled[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative.is-disabled[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{color:GrayText}.is-disabled[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%], .is-negative.is-disabled[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{opacity:1;background-color:GrayText}.is-disabled[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative.is-disabled[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__toggle[_ngcontent-%COMP%]{border:2px solid GrayText}.is-disabled[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__dot[_ngcontent-%COMP%], .is-negative.is-disabled[_nghost-%COMP%]:not(.is-checked)   .nx-switcher__dot[_ngcontent-%COMP%]{box-shadow:0 0 0 2px GrayText}.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%], .is-negative.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__toggle[_ngcontent-%COMP%]{background-color:GrayText}.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%], .is-negative.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]{background-color:Canvas}.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%], .is-negative.is-disabled.is-checked[_nghost-%COMP%]   .nx-switcher__dot[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{color:GrayText}}.nx-switcher-error[_ngcontent-%COMP%]{margin-top:var(--switcher-stack)}"],changeDetection:0});let r=i;return r})(),ze=(()=>{let i=class i{};i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=B({type:i}),i.\u0275inj=D({imports:[U,m,te,Ce]});let r=i;return r})();export{Ce as a,ze as b};
