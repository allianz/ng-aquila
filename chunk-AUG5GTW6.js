import{A as se,a as $,f as N,g as ee,k as te,l as ne,o as ie,r as oe,x as re,z as ae}from"./chunk-MNAWWTKB.js";import{c as F,e as me}from"./chunk-WBPLCJVU.js";import{x as ce}from"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import{a as D,b as le}from"./chunk-VTTX4ZNP.js";import{B as R,n as X,o as Y,x as Z}from"./chunk-GHZ7IFWX.js";import{$b as j,Ac as w,Dc as U,Ec as J,Ia as v,Ja as b,Nb as E,Ob as V,Pb as d,Qb as A,Ra as I,Rb as S,Sa as B,Vb as r,Wb as a,Wc as q,Xb as c,ec as W,gc as x,la as z,na as y,nc as G,oc as H,pc as Q,rc as _,sc as T,tb as m,tc as C,ub as M,vc as P,wc as k,xc as L,ya as s,yc as K,za as O}from"./chunk-O56WLCF2.js";var be=()=>[1,2,3,4,5];function Me(i,t){if(i&1){let g=j();r(0,"nx-icon",3),W("click",function(){let n=v(g).$implicit,o=x();return b(o.setSelection(n))})("keyup",function(n){let o=v(g).$implicit,p=x();return b(p.handleKeyUp(n,o))})("mouseenter",function(){let n=v(g).$implicit,o=x();return b(o.setHover(n))})("mouseleave",function(){v(g);let n=x();return b(n.setHover(0))}),a()}if(i&2){let g=t.$implicit,e=x();S("nx-rating__icon--selected",e.isChecked(g)),d("tabindex",e.disabled?-1:0)("name",e.getIconName(g))("size",e.size),V("aria-label",e.getAriaLabel(g))("aria-checked",e.isSelected(g))}}function ye(i,t){if(i&1&&(r(0,"div",4)(1,"span",5),_(2),a(),r(3,"span",6),_(4),a()()),i&2){let g=x();m(2),T(g.startLabel),m(2),T(g.endLabel)}}var l=(()=>{let t=class t{set size(e){this._size=e,this._cdr.markForCheck()}get size(){return this._size}set value(e){this._value=le(e),this._cdr.markForCheck()}get value(){return this._value}set disabled(e){this._disabled!==e&&(this._disabled=D(e),this._cdr.markForCheck())}get disabled(){return this._disabled}set negative(e){this._negative!==e&&(this._negative=D(e),this._cdr.markForCheck())}get negative(){return this._negative}set startLabel(e){this._startLabel=e,this._cdr.markForCheck()}get startLabel(){return this._startLabel}set endLabel(e){this._endLabel=e,this._cdr.markForCheck()}get endLabel(){return this._endLabel}set ariaLabel(e){this._ariaLabel=e,this._cdr.markForCheck()}get ariaLabel(){return this._ariaLabel}set iconColor(e){this._iconColor=e,this._cdr.markForCheck()}get iconColor(){return this._iconColor}constructor(e,n){this._cdr=e,this._focusMonitor=n,this._size="l",this._value=0,this._hover=0,this._disabled=!1,this._negative=!1,this._startLabel="",this._endLabel=null,this._ariaLabel=["1/5","2/5","3/5","4/5","5/5"],this._iconColor="",this.valueChange=new B,this.onTouchedCallback=()=>{},this.onChangeCallback=o=>{}}ngAfterViewInit(){this.icons.forEach(e=>this._focusMonitor.monitor(e))}ngOnDestroy(){this.icons.forEach(e=>this._focusMonitor.stopMonitoring(e))}isSelected(e){return e<=this.value||e<=this._hover}isChecked(e){return e<=this.value}setSelection(e){this.disabled||(this.value=e,this.valueChange.emit(e),this.onTouchedCallback(),this.onChangeCallback(this.value))}handleKeyUp(e,n){let o=e.keyCode;if(e.preventDefault(),e.stopPropagation(),o===13&&this.setSelection(n),o===39){this.value=Math.min(this.value+1,5);let p=this.icons.toArray()[this.value-1];this._focusMonitor.focusVia(p,"keyboard")}if(o===37){this.value=Math.max(this.value-1,1);let p=this.icons.toArray()[this.value-1];this._focusMonitor.focusVia(p,"keyboard")}}writeValue(e){this.value=e}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}getAriaLabel(e){return this.ariaLabel[e-1]}getIconName(e){return"star"+(this.isSelected(e)?"":"-o")}setHover(e){this.disabled||(this._hover=e)}};t.\u0275fac=function(n){return new(n||t)(M(q),M(ce))},t.\u0275cmp=s({type:t,selectors:[["nx-rating"]],viewQuery:function(n,o){if(n&1&&G(F,5,I),n&2){let p;H(p=Q())&&(o.icons=p)}},hostVars:6,hostBindings:function(n,o){n&2&&(A("--iconColor",o.iconColor),S("nx-rating--negative",o.negative)("nx-rating--disabled",o.disabled))},inputs:{size:"size",value:"value",disabled:"disabled",negative:"negative",startLabel:"startLabel",endLabel:"endLabel",ariaLabel:"ariaLabel",iconColor:"iconColor"},outputs:{valueChange:"valueChange"},features:[K([{provide:$,useExisting:z(()=>t),multi:!0}])],decls:3,vars:3,consts:[["role","radiogroup",1,"nx-rating__container"],["role","radio","class","nx-rating__icon",3,"tabindex","nx-rating__icon--selected","name","size","click","keyup","mouseenter","mouseleave",4,"ngFor","ngForOf"],["class","nx-rating__label",4,"ngIf"],["role","radio",1,"nx-rating__icon",3,"click","keyup","mouseenter","mouseleave","tabindex","name","size"],[1,"nx-rating__label"],[1,"nx-rating__label--start"],[1,"nx-rating__label--end"]],template:function(n,o){n&1&&(r(0,"div",0),E(1,Me,1,7,"nx-icon",1),a(),E(2,ye,5,2,"div",2)),n&2&&(m(),d("ngForOf",w(2,be)),m(),d("ngIf",o.startLabel||o.endLabel))},dependencies:[X,Y,F],styles:["[_nghost-%COMP%]{display:inline-block}.nx-rating--negative[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:var(--negative)}.nx-rating--disabled[_nghost-%COMP%]{cursor:not-allowed;outline:none}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{color:var(--rating-disabled-label-color)}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:var(--rating-disabled-icon-color);cursor:not-allowed}.nx-rating__container[_ngcontent-%COMP%]{display:flex}.nx-rating__label[_ngcontent-%COMP%]{display:flex;font-size:var(--rating-label-font-size);line-height:var(--rating-label-line-height);font-weight:var(--rating-label-font-weight);letter-spacing:var(--rating-label-letter-spacing);color:var(--rating-label-color)}.nx-rating__label--end[_ngcontent-%COMP%]{margin-left:auto}[dir=rtl][_nghost-%COMP%]   .nx-rating__label--end[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-rating__label--end[_ngcontent-%COMP%]{margin-right:auto;margin-left:initial}.nx-rating__icon[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-l);color:var(--iconColor, var(--rating-icon-color));width:auto;background:none;border:none;margin-right:16px;cursor:pointer;outline:none}.nx-rating__icon.nx-icon--s[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-s);margin-right:8px}.nx-rating__icon.nx-icon--m[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-m);margin-right:12px}.nx-rating__icon.nx-icon--l[_ngcontent-%COMP%]{font-size:var(--rating-icon-size-l);margin-right:16px}[dir=rtl][_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{margin-right:initial;margin-left:16px}[_nghost-%COMP%]:not(.nx-rating--negative)   .nx-rating__icon.nx-rating__icon--selected[_ngcontent-%COMP%]:hover{color:var(--hover-primary)}[_nghost-%COMP%]:not(.nx-rating--negative)   .nx-rating__icon.nx-rating__icon--selected[_ngcontent-%COMP%]:active{color:var(--active-primary)}.nx-rating__icon[_ngcontent-%COMP%]:last-child{margin-right:0}[dir=rtl][_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]:last-child, [dir=rtl]   [_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]:last-child{margin-right:initial;margin-left:0}.nx-rating__icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow);border-radius:4px}@media screen and (forced-colors: active),(forced-colors: active){.nx-rating__icon.cdk-keyboard-focused[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}@media screen and (forced-colors: active){[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:buttonText}[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%], .nx-rating--negative[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{forced-colors-adjust:none;color:CanvasText}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__icon[_ngcontent-%COMP%]{color:GrayText}.nx-rating--disabled[_nghost-%COMP%]   .nx-rating__label[_ngcontent-%COMP%]{color:CanvasText}}"],changeDetection:0});let i=t;return i})(),ge=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=O({type:t}),t.\u0275inj=y({imports:[R,me]});let i=t;return i})();var Oe=()=>["Hated","Didn't like it","Just OK","Liked it","Loved it"],de=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-accessibility-example"]],decls:1,vars:2,consts:[[3,"ariaLabel"]],template:function(n,o){n&1&&c(0,"nx-rating",0),n&2&&d("ariaLabel",w(1,Oe))},dependencies:[l]});let i=t;return i})();var pe=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-basic-example"]],decls:1,vars:0,consts:[["startLabel","poor","endLabel","great"]],template:function(n,o){n&1&&c(0,"nx-rating",0)},dependencies:[l]});let i=t;return i})();var _e=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-disabled-example"]],decls:1,vars:1,consts:[["startLabel","poor","endLabel","great",3,"disabled"]],template:function(n,o){n&1&&c(0,"nx-rating",0),n&2&&d("disabled",!0)},dependencies:[l]});let i=t;return i})();var ue=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-negative-example"]],decls:2,vars:1,consts:[[1,"docs-inverse-container"],["startLabel","poor","endLabel","great",3,"negative"]],template:function(n,o){n&1&&(r(0,"div",0),c(1,"nx-rating",1),a()),n&2&&(m(),d("negative",!0))},dependencies:[l]});let i=t;return i})();var fe=(()=>{let t=class t{constructor(e){this.fb=e,this.testForm=this.fb.group({rating:[1]})}};t.\u0275fac=function(n){return new(n||t)(M(re))},t.\u0275cmp=s({type:t,selectors:[["rating-reactive-example"]],decls:5,vars:4,consts:[[3,"formGroup"],["formControlName","rating"]],template:function(n,o){n&1&&(r(0,"form",0),c(1,"nx-rating",1),a(),r(2,"p"),_(3),U(4,"json"),a()),n&2&&(d("formGroup",o.testForm),m(3),C("Form value: ",J(4,2,o.testForm.value),""))},dependencies:[l,ne,N,ee,ie,oe,Z]});let i=t;return i})();var he=(()=>{let t=class t{constructor(){this.simpleBinding=1}};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-simple-example"]],decls:3,vars:2,consts:[[3,"valueChange","value"]],template:function(n,o){n&1&&(r(0,"nx-rating",0),L("valueChange",function(h){return k(o.simpleBinding,h)||(o.simpleBinding=h),h}),a(),r(1,"p"),_(2),a()),n&2&&(P("value",o.simpleBinding),m(2),C("Value: ",o.simpleBinding,""))},dependencies:[l]});let i=t;return i})();var xe=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-sizes-example"]],decls:8,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,4",1,"nx-margin-bottom-s"],["size","s"],["size","m"],["size","l"]],template:function(n,o){n&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),c(3,"nx-rating",3),a(),r(4,"div",2),c(5,"nx-rating",4),a(),r(6,"div",2),c(7,"nx-rating",5),a()()())},dependencies:[l]});let i=t;return i})();var Ce=(()=>{let t=class t{constructor(){this.ngModelBinding=1}};t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=s({type:t,selectors:[["rating-template-example"]],decls:3,vars:2,consts:[[3,"ngModelChange","ngModel"]],template:function(n,o){n&1&&(r(0,"nx-rating",0),L("ngModelChange",function(h){return k(o.ngModelBinding,h)||(o.ngModelBinding=h),h}),a(),r(1,"p"),_(2),a()),n&2&&(P("ngModel",o.ngModelBinding),m(2),C("Value: ",o.ngModelBinding,""))},dependencies:[l,N,te]});let i=t;return i})();var st=(()=>{let t=class t{static components(){return{"rating-accessibility":de,"rating-basic":pe,"rating-disabled":_e,"rating-negative":ue,"rating-reactive":fe,"rating-simple":he,"rating-template":Ce,"rating-sizes":xe}}};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=O({type:t}),t.\u0275inj=y({imports:[ge,se,ae,R]});let i=t;return i})();export{st as RatingExamplesModule};