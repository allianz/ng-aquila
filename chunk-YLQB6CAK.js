import{A as b,B as N,a as le,g as E,h as ce,l as ge,m as pe,p as me,s as de,y as ue}from"./chunk-3CXM22DE.js";import{c as he,e as z}from"./chunk-V5XCZUGO.js";import{q as fe}from"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as T,b as _e}from"./chunk-APNBV455.js";import{v as se,z as w}from"./chunk-CCSED5RY.js";import{Aa as h,Ba as x,Fc as ee,Gc as te,Hc as ne,Ka as $,Lb as r,Mb as y,Mc as u,Nc as S,Oc as C,Qc as L,Rb as K,Rc as O,Sc as k,Tc as ie,Uc as m,Xc as oe,Yc as ae,ac as R,bc as c,cc as U,dc as P,ed as re,gc as J,ia as Q,ic as q,jc as X,ka as M,kc as Y,lc as o,mc as a,nc as g,rc as Z,wb as l,wc as F,xb as v,yc as f}from"./chunk-LG2ZA55B.js";var Ce=["input"],be=()=>[1,2,3,4,5];function ve(n,W){if(n&1){let e=Z();o(0,"input",3,0),F("click",function(){let i=h(e).$implicit,p=f();return x(p.setSelection(i))})("keyup",function(i){let p=h(e).$implicit,d=f();return x(d.handleKeyUp(i,p))})("change",function(){let i=h(e).$implicit,p=f();return x(p.handleChange(i))}),a(),o(2,"label",4)(3,"nx-icon",5),F("mouseenter",function(){let i=h(e).$implicit,p=f();return x(p.setHover(i))})("mouseleave",function(){h(e);let i=f();return x(i.setHover(0))}),a()()}if(n&2){let e=W.$implicit,t=f();c("id",t.getRadioInputId(e))("name",t.radioGroupName)("disabled",t.disabled)("checked",t.isSelected(e)),R("aria-label",t.getAriaLabel(e))("aria-disabled",t.disabled||null),l(2),P("margin-s",t.size==="s")("margin-m",t.size==="m")("margin-l",t.size==="l"),R("for",t.getRadioInputId(e)),l(),P("nx-rating__icon--selected",t.isVisuallyChecked(e)),c("size",t.size)("name",t.getIconName(e))}}function Me(n,W){if(n&1&&(o(0,"div",2)(1,"span",6),u(2),a(),o(3,"span",7),u(4),a()()),n&2){let e=f();l(2),S(e.startLabel),l(2),S(e.endLabel)}}var ye=0,s=(()=>{class n{getRadioInputId(e){return this.radioInputIds[e-1]}set size(e){this._size=e,this._cdr.markForCheck()}get size(){return this._size}set value(e){this._value=_e(e),this._cdr.markForCheck()}get value(){return this._value}set disabled(e){this._disabled!==e&&(this._disabled=T(e),this._cdr.markForCheck())}get disabled(){return this._disabled}set negative(e){this._negative!==e&&(this._negative=T(e),this._cdr.markForCheck())}get negative(){return this._negative}set startLabel(e){this._startLabel=e,this._cdr.markForCheck()}get startLabel(){return this._startLabel}set endLabel(e){this._endLabel=e,this._cdr.markForCheck()}get endLabel(){return this._endLabel}set ariaLabel(e){this.ariaRatingLabels=e}get ariaLabel(){return this.ariaRatingLabels}set ariaRatingLabels(e){this._ariaRatingLabels=e}get ariaRatingLabels(){return this._ariaRatingLabels}set ariaRatingGroupLabel(e){this._ariaRatingGroupLabel=e}get ariaRatingGroupLabel(){return this._ariaRatingGroupLabel}set iconColor(e){this._iconColor=e,this._cdr.markForCheck()}get iconColor(){return this._iconColor}constructor(e,t){this._cdr=e,this._focusMonitor=t,this.radioGroupName=`nx-rating-${ye++}`,this.radioInputIds=Array.from([1,2,3,4,5],i=>`${this.radioGroupName}-${i}`),this._size="l",this._value=0,this._hover=0,this._disabled=!1,this._negative=!1,this._startLabel="",this._endLabel=null,this._ariaRatingLabels=["1/5","2/5","3/5","4/5","5/5"],this._ariaRatingGroupLabel=null,this._iconColor="",this.valueChange=new $,this.onTouchedCallback=()=>{},this.onChangeCallback=i=>{}}ngAfterViewInit(){this.radioInputs.forEach(e=>this._focusMonitor.monitor(e))}ngOnDestroy(){this.radioInputs.forEach(e=>this._focusMonitor.stopMonitoring(e))}isSelected(e){return e===this.value}isVisuallyChecked(e){return e<=this.value||e<=this._hover}setSelection(e){this.disabled||(this.value=e,this.valueChange.emit(e),this.onTouchedCallback(),this.onChangeCallback(this.value))}handleKeyUp(e,t){e.keyCode===13&&(e.preventDefault(),e.stopPropagation(),this.setSelection(t))}writeValue(e){this.value=e}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}getAriaLabel(e){return this.ariaLabel[e-1]}getIconName(e){return"star"+(this.isVisuallyChecked(e)?"":"-o")}setHover(e){this.disabled||(this._hover=e)}handleChange(e){this.valueChange.emit(e)}static{this.\u0275fac=function(t){return new(t||n)(v(re),v(fe))}}static{this.\u0275cmp=r({type:n,selectors:[["nx-rating"]],viewQuery:function(t,i){if(t&1&&ee(Ce,5),t&2){let p;te(p=ne())&&(i.radioInputs=p)}},hostVars:6,hostBindings:function(t,i){t&2&&(U("--iconColor",i.iconColor),P("nx-rating--negative",i.negative)("nx-rating--disabled",i.disabled))},inputs:{size:"size",value:"value",disabled:"disabled",negative:"negative",startLabel:"startLabel",endLabel:"endLabel",ariaLabel:"ariaLabel",ariaRatingLabels:"ariaRatingLabels",ariaRatingGroupLabel:"ariaRatingGroupLabel",iconColor:"iconColor"},outputs:{valueChange:"valueChange"},features:[ie([{provide:le,useExisting:Q(()=>n),multi:!0}])],decls:4,vars:3,consts:[["input",""],["role","radiogroup",1,"nx-rating__container"],["aria-hidden","true",1,"nx-rating__label"],["type","radio",1,"nx-rating__input",3,"click","keyup","change","id","name","disabled","checked"],["tabindex","-1",1,"rating-label"],[1,"nx-rating__icon",3,"mouseenter","mouseleave","size","name"],[1,"nx-rating__label--start"],[1,"nx-rating__label--end"]],template:function(t,i){t&1&&(o(0,"div",1),X(1,ve,4,17,null,null,q),a(),K(3,Me,5,2,"div",2)),t&2&&(R("aria-label",i.ariaRatingGroupLabel),l(),Y(m(2,be)),l(2),J(i.startLabel||i.endLabel?3:-1))},dependencies:[z,he],styles:["[_nghost-%COMP%]{display:inline-block}.nx-rating--negative[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:var(--negative)}.nx-rating--disabled[_nghost-%COMP%]{cursor:not-allowed;outline:none}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{color:var(--rating-disabled-label-color)}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:var(--rating-disabled-icon-color);cursor:not-allowed}.nx-rating__container[_ngcontent-%COMP%]{display:flex}.nx-rating__label[_ngcontent-%COMP%]{display:flex;font-size:var(--rating-label-font-size);line-height:var(--rating-label-line-height);font-weight:var(--rating-label-font-weight);letter-spacing:var(--rating-label-letter-spacing);color:var(--rating-label-color)}.nx-rating__label--end[_ngcontent-%COMP%]{margin-left:auto}[dir=rtl][_nghost-%COMP%]   .nx-rating__label--end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-rating__label--end[_ngcontent-%COMP%]{margin-right:auto;margin-left:initial}.rating-label[_ngcontent-%COMP%]{line-height:0}.rating-label.margin-s[_ngcontent-%COMP%]{margin-right:8px}.rating-label.margin-m[_ngcontent-%COMP%]{margin-right:12px}.rating-label.margin-l[_ngcontent-%COMP%]{margin-right:16px}[dir=rtl][_nghost-%COMP%]   .rating-label[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .rating-label[_ngcontent-%COMP%]{margin-right:initial;margin-left:16px}.nx-rating__icon[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-l);color:var(--iconColor, var(--rating-icon-color));width:auto;background:none;border:none;cursor:pointer;outline:none}.nx-rating__icon.nx-icon--s[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-s)}.nx-rating__icon.nx-icon--m[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-m)}.nx-rating__icon.nx-icon--l[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-l)}[_nghost-%COMP%]:not(.nx-rating--negative)   .nx-rating__icon.nx-rating__icon--selected[_ngcontent-%COMP%]:hover{color:var(--hover-primary)}[_nghost-%COMP%]:not(.nx-rating--negative)   .nx-rating__icon.nx-rating__icon--selected[_ngcontent-%COMP%]:active{color:var(--active-primary)}.rating-label[_ngcontent-%COMP%]:last-child{margin-right:0}[dir=rtl][_nghost-%COMP%]   .rating-label[_ngcontent-%COMP%]:last-child, [dir=rtl]   [_nghost-%COMP%]   .rating-label[_ngcontent-%COMP%]:last-child{margin-right:initial;margin-left:0}.nx-rating__icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-rating__icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media screen and (forced-colors: active){[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:buttonText}[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{forced-colors-adjust:none;color:CanvasText}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:GrayText}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{color:CanvasText}}.nx-rating__input[_ngcontent-%COMP%]{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.nx-rating__input.cdk-keyboard-focused[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-rating__input.cdk-keyboard-focused[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]   nx-icon[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0})}}return n})(),xe=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=M({imports:[w,z,s]})}}return n})();var Re=()=>["Hated","Didn't like it","Just OK","Liked it","Loved it"],D=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-accessibility-example"]],decls:1,vars:2,consts:[[3,"ariaLabel"]],template:function(t,i){t&1&&g(0,"nx-rating",0),t&2&&c("ariaLabel",m(1,Re))},dependencies:[s],encapsulation:2})}}return n})();var Pe=()=>["1 of 5 Poor","2 of 5","3 of 5","4 of 5","5 of 5 Great"],I=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-basic-example"]],decls:1,vars:2,consts:[["startLabel","poor","endLabel","great","ariaRatingGroupLabel","How do you like our service?",3,"ariaRatingLabels"]],template:function(t,i){t&1&&g(0,"nx-rating",0),t&2&&c("ariaRatingLabels",m(1,Pe))},dependencies:[s],encapsulation:2})}}return n})();var G=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-disabled-example"]],decls:1,vars:1,consts:[["startLabel","poor","endLabel","great",3,"disabled"]],template:function(t,i){t&1&&g(0,"nx-rating",0),t&2&&c("disabled",!0)},dependencies:[s],encapsulation:2})}}return n})();var Le=()=>["1 of 5 Poor","2 of 5","3 of 5","4 of 5","5 of 5 Great"],B=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-negative-example"]],decls:2,vars:3,consts:[[1,"docs-inverse-container"],["startLabel","poor","endLabel","great","ariaRatingGroupLabel","How do you like our service?",3,"negative","ariaRatingLabels"]],template:function(t,i){t&1&&(o(0,"div",0),g(1,"nx-rating",1),a()),t&2&&(l(),c("negative",!0)("ariaRatingLabels",m(2,Le)))},dependencies:[s],encapsulation:2})}}return n})();var ke=()=>["1 of 5 Poor","2 of 5","3 of 5","4 of 5","5 of 5 Great"],V=(()=>{class n{constructor(e){this.fb=e,this.testForm=this.fb.group({rating:[1]})}static{this.\u0275fac=function(t){return new(t||n)(v(ue))}}static{this.\u0275cmp=r({type:n,selectors:[["rating-reactive-example"]],decls:5,vars:6,consts:[[3,"formGroup"],["formControlName","rating","ariaRatingGroupLabel","How do you like our service?",3,"ariaRatingLabels"]],template:function(t,i){t&1&&(o(0,"form",0),g(1,"nx-rating",1),a(),o(2,"p"),u(3),oe(4,"json"),a()),t&2&&(c("formGroup",i.testForm),l(),c("ariaRatingLabels",m(5,ke)),l(2),C("Form value: ",ae(4,3,i.testForm.value),""))},dependencies:[b,pe,E,ce,N,me,de,s,se],encapsulation:2})}}return n})();var we=()=>["1 of 5 Poor","2 of 5","3 of 5","4 of 5","5 of 5 Great"],A=(()=>{class n{constructor(){this.simpleBinding=1}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-simple-example"]],decls:3,vars:4,consts:[["ariaRatingGroupLabel","How do you like our service?",3,"valueChange","value","ariaRatingLabels"]],template:function(t,i){t&1&&(o(0,"nx-rating",0),k("valueChange",function(d){return O(i.simpleBinding,d)||(i.simpleBinding=d),d}),a(),o(1,"p"),u(2),a()),t&2&&(L("value",i.simpleBinding),c("ariaRatingLabels",m(3,we)),l(2),C("Value: ",i.simpleBinding,""))},dependencies:[s],encapsulation:2})}}return n})();var j=(()=>{class n{static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-sizes-example"]],decls:8,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,4",1,"nx-margin-bottom-s"],["size","s"],["size","m"],["size","l"]],template:function(t,i){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2),g(3,"nx-rating",3),a(),o(4,"div",2),g(5,"nx-rating",4),a(),o(6,"div",2),g(7,"nx-rating",5),a()()())},dependencies:[s],encapsulation:2})}}return n})();var H=(()=>{class n{constructor(){this.ngModelBinding=1}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275cmp=r({type:n,selectors:[["rating-template-example"]],decls:3,vars:2,consts:[[3,"ngModelChange","ngModel"]],template:function(t,i){t&1&&(o(0,"nx-rating",0),k("ngModelChange",function(d){return O(i.ngModelBinding,d)||(i.ngModelBinding=d),d}),a(),o(1,"p"),u(2),a()),t&2&&(L("ngModel",i.ngModelBinding),l(2),C("Value: ",i.ngModelBinding,""))},dependencies:[s,b,E,ge],encapsulation:2})}}return n})();var Ee=[D,I,G,B,V,A,H,j],Mt=(()=>{class n{static components(){return{"rating-accessibility":D,"rating-basic":I,"rating-disabled":G,"rating-negative":B,"rating-reactive":V,"rating-simple":A,"rating-template":H,"rating-sizes":j}}static{this.\u0275fac=function(t){return new(t||n)}}static{this.\u0275mod=y({type:n})}static{this.\u0275inj=M({imports:[xe,N,b,w,Ee]})}}return n})();export{Mt as RatingExamplesModule};