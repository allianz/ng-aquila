(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"+IXF":function(e,t,n){"use strict";n.d(t,"c",function(){return s}),n.d(t,"a",function(){return i.a}),n.d(t,"b",function(){return i.b}),n.d(t,"e",function(){return l}),n.d(t,"d",function(){return d.a});var r=n("ofXK"),c=n("mN63"),o=n("SqJ0"),a=n("fXoL");let s=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.Ob({type:e}),e.\u0275inj=a.Nb({imports:[[r.c,c.c,o.a]]}),e})();var i=n("aXeq");let l=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.Ob({type:e}),e.\u0275inj=a.Nb({imports:[[r.c]]}),e})();var d=n("Q3ZH")},Q3ZH:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("fXoL"),c=n("8LU1"),o=n("XNiG");const a=["*"];let s=0;const i=new r.s("LABEL_DEFAULT_OPTIONS");let l=(()=>{class e{constructor(e){this._defaultOptions=e,this._stateChanges=new o.a,this._disabled=!1,this._negative=!1,this._id="nx-label-"+s++}set disabled(e){this._disabled=Object(c.b)(e),this._stateChanges.next()}get disabled(){return this._disabled}set negative(e){this._negative=Object(c.b)(e),this._stateChanges.next()}get negative(){return this._negative}set id(e){this._id!==e&&(this._id=e)}get id(){return this._id}set size(e){this._size=e,this._stateChanges.next()}get size(){return this._size||this._defaultOptions&&this._defaultOptions.size||"large"}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(i,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["nx-label"]],hostVars:9,hostBindings:function(e,t){2&e&&(r.Fb("disabled",t.disabled)("aria-labelledby",t.id||null)("id",t.id),r.Ib("nx-label--negative",t.negative)("nx-label--large","large"===t.size)("nx-label--small","small"===t.size))},inputs:{disabled:"disabled",negative:"negative",id:"id",size:"size"},ngContentSelectors:a,decls:2,vars:0,consts:[[1,"nx-label__content"]],template:function(e,t){1&e&&(r.mc(),r.Wb(0,"label",0),r.lc(1),r.Vb())},styles:["[_nghost-%COMP%]{display:block;color:var(--text-01)}.nx-label--small[_nghost-%COMP%]{font-size:var(--base-label-small-font-size);line-height:var(--base-label-small-line-height);font-weight:var(--base-label-small-font-weight);letter-spacing:var(--base-label-small-letter-spacing)}.nx-label--large[_nghost-%COMP%]{font-size:var(--base-label-large-font-size);line-height:var(--base-label-large-line-height);font-weight:var(--base-label-large-font-weight);letter-spacing:var(--base-label-large-letter-spacing)}[disabled=true][_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:not-allowed}.nx-label--negative[_nghost-%COMP%]{color:var(--negative)}"],changeDetection:0}),e})()},aXeq:function(e,t,n){"use strict";n.d(t,"a",function(){return _}),n.d(t,"b",function(){return m});var r=n("fXoL"),c=n("8LU1"),o=n("XNiG"),a=n("1G5W"),s=n("ofXK"),i=n("+vaC"),l=n("Xe60");function d(e,t){1&e&&r.Rb(0,"nx-icon",7),2&e&&r.nc("name","exclamation-triangle")}function b(e,t){if(1&e&&(r.Ub(0),r.Hc(1,d,1,1,"nx-icon",3),r.Wb(2,"div",4),r.Wb(3,"div",5),r.Sb(4,6),r.Vb(),r.Vb(),r.Tb()),2&e){const e=r.hc(),t=r.uc(3);r.Eb(1),r.nc("ngIf",e.showIcon),r.Eb(3),r.nc("ngTemplateOutlet",t)}}function h(e,t){if(1&e&&(r.Wb(0,"nx-message",8),r.Sb(1,6),r.Vb()),2&e){r.hc();const e=r.uc(3);r.Eb(1),r.nc("ngTemplateOutlet",e)}}function g(e,t){1&e&&r.lc(0)}const u=["*"];let p=0;const _=new r.s("ERROR_DEFAULT_OPTIONS");let m=(()=>{class e{constructor(e,t){this._changeDetectorRef=e,this._defaultOptions=t,this._showIcon=!0,this._id="nx-error-"+p++,this._destroyed=new o.a,this._defaultOptions&&this._defaultOptions.changes&&this._defaultOptions.changes.pipe(Object(a.a)(this._destroyed)).subscribe(()=>{this._changeDetectorRef.markForCheck()})}set showIcon(e){this._showIcon=Object(c.b)(e),this._changeDetectorRef.markForCheck()}get showIcon(){return this._showIcon}set id(e){e&&e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())}get id(){return this._id}set appearance(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())}get appearance(){return this._appearance||this._defaultOptions&&this._defaultOptions.appearance||"message"}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}}return e.\u0275fac=function(t){return new(t||e)(r.Qb(r.h),r.Qb(_,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["nx-error"]],hostVars:4,hostBindings:function(e,t){2&e&&(r.Fb("role","alert")("id",t.id),r.Ib("nx-error--message","message"==t.appearance))},inputs:{showIcon:"showIcon",id:"id",appearance:"appearance"},ngContentSelectors:u,decls:4,vars:2,consts:[[4,"ngIf"],["nxContext","error",4,"ngIf"],["errorContent",""],["class","nx-error__icon",3,"name",4,"ngIf"],[1,"nx-error__content-wrapper"],[1,"nx-error__content"],[3,"ngTemplateOutlet"],[1,"nx-error__icon",3,"name"],["nxContext","error"]],template:function(e,t){1&e&&(r.mc(),r.Hc(0,b,5,2,"ng-container",0),r.Hc(1,h,2,1,"nx-message",1),r.Hc(2,g,1,0,"ng-template",null,2,r.Ic)),2&e&&(r.nc("ngIf","text"===t.appearance),r.Eb(1),r.nc("ngIf","message"===t.appearance))},directives:[s.q,s.u,i.a,l.a],styles:["[_nghost-%COMP%]{font-size:var(--base-error-simple-font-size);font-weight:var(--base-error-simple-font-weight);letter-spacing:var(--base-error-simple-letter-spacing);color:var(--base-error-color);width:100%;display:flex;text-align:left}[_nghost-%COMP%], [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{line-height:var(--base-error-simple-line-height)}[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{font-size:var(--base-error-simple-icon-size);margin-right:8px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{color:windowText}}[_nghost-%COMP%]   .nx-error__content-wrapper[_ngcontent-%COMP%]{max-width:100%}[dir=rtl]   [_nghost-%COMP%]{text-align:right}[dir=rtl]   [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}"],changeDetection:0}),e})()},ierq:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var r=n("tgBs"),c=n("/sJ9"),o=n("eV8M"),a=n("gkbm"),s=n("ofXK"),i=n("3Pt+"),l=n("fXoL");let d=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Ob({type:e}),e.\u0275inj=l.Nb({imports:[[],s.c,i.k,i.v,a.b,o.a,c.a,r.a]}),e})()},xkF3:function(e,t,n){"use strict";n.r(t),n.d(t,"CardExamplesModule",function(){return Y});var r=n("tyNb"),c=n("yjM7"),o=n("mN63"),a=n("fXoL"),s=n("u47x");const i=["*"];let l=(()=>{class e{constructor(e,t){this._elementRef=e,this._focusMonitor=t,this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(a.l),a.Qb(s.g))},e.\u0275cmp=a.Kb({type:e,selectors:[["nx-card"]],hostAttrs:[1,"nx-card"],ngContentSelectors:i,decls:1,vars:0,template:function(e,t){1&e&&(a.mc(),a.lc(0))},styles:["[_nghost-%COMP%]{background:var(--card-background-color);border:var(--card-border-width) solid var(--card-border-color);border-radius:var(--card-border-radius);box-shadow:none;display:inline-block;padding:23px;transition:background-color .2s ease,box-shadow .2s ease}[_nghost-%COMP%]:focus, [_nghost-%COMP%]:hover{outline:none}.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (-ms-high-contrast:active){.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText;outline:4px solid CanvasText;outline-offset:2px}}"],changeDetection:0}),e})();var d=n("ofXK"),b=n("+IXF"),h=n("BrvL");let g=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.Ob({type:e}),e.\u0275inj=a.Nb({imports:[[d.c,o.c,b.c,h.a],b.c]}),e})();var u=n("8LU1");class p{constructor(e,t,n){this.checked=e,this.value=t,this.card=n}}var _=n("zB3U"),m=n("3Pt+"),C=n("+vaC");const x=["input"];function k(e,t){1&e&&a.Rb(0,"nx-icon",8)}function f(e,t){if(1&e&&(a.Wb(0,"span",6),a.Hc(1,k,1,0,"nx-icon",7),a.Vb()),2&e){const e=a.hc();a.Eb(1),a.nc("ngIf",e.checked)}}function v(e,t){1&e&&a.lc(0,3,["*ngIf","_errorState"])}function O(e,t){1&e&&a.Rb(0,"nx-icon",9)}const M=[[["nx-card-header"]],"*",[["nx-card-footer"]],[["nx-error"]]],P=["nx-card-header","*","nx-card-footer","nx-error"];let y=0;const w=new a.s("SELECTABLE_CARD_DEFAULT_OPTIONS");let V=(()=>{class e{constructor(e,t,n,r,c,o,s){this._changeDetectorRef=e,this._errorStateMatcher=t,this.ngControl=n,this._parentForm=r,this._parentFormGroup=c,this._focusMonitor=o,this._id="nx-selectable-card-"+y++,this._checked=!1,this._disabled=!1,this._negative=!1,this._tabindex="0",this._appearance="default",this._errorListIds="",this._errorState=!1,this.selectionChange=new a.o,this.checkedChange=new a.o,this.onChangeCallback=e=>{},this.onTouchedCallback=e=>{},s&&s.appearance&&(this.appearance=s.appearance),this.ngControl&&(this.ngControl.valueAccessor=this)}set appearance(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())}get appearance(){return this._appearance}set id(e){e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())}get id(){return this._id}set checked(e){const t=Object(u.b)(e);t!==this._checked&&(this._checked=t,this._changeDetectorRef.markForCheck())}get checked(){return this._checked}get value(){return this._value}set value(e){e&&(this._value=e),this._changeDetectorRef.markForCheck()}set disabled(e){const t=Object(u.b)(e);t!==this._disabled&&(this._disabled=t,this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set negative(e){const t=Object(u.b)(e);t!==this._negative&&(this._negative=t,this._changeDetectorRef.markForCheck())}get negative(){return this._negative}get required(){return this._required}set required(e){this._required=Object(u.b)(e)}get name(){return this._name}set name(e){this._name=e}get tabindex(){return this.disabled?"-1":this._tabindex}set tabindex(e){this._tabindex=e}get _isExpert(){return"expert"===this.appearance}ngAfterViewInit(){this._focusMonitor.monitor(this._nativeInput)}ngAfterContentInit(){this._errorList.changes.subscribe(()=>{this._errorListIds=this._getErrorListIds(),this._changeDetectorRef.markForCheck()}),this._errorListIds=this._getErrorListIds()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._nativeInput)}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}setDisabledState(e){this.disabled=e}writeValue(e){this.checked=!!e}ngDoCheck(){this.ngControl&&this._updateErrorState()}_updateErrorState(){const e=this._errorState,t=this._errorStateMatcher.isErrorState(this.ngControl?this.ngControl.control:null,this._parentFormGroup||this._parentForm);t!==e&&(this._errorState=t)}toggle(){this.disabled||(this.checked=!this.checked)}_onInputClick(e){e.stopPropagation(),this.disabled||(this.toggle(),this._emitChangeEvent())}_onInteractionEvent(e){e.stopPropagation()}_emitChangeEvent(){const e=new p(this.checked,this.value,this);this.onChangeCallback(this.checked),this.selectionChange.emit(e),this.checkedChange.emit(this.checked)}_getErrorListIds(){return this._errorList.map(e=>e.id).join(" ")}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(a.h),a.Qb(_.a),a.Qb(m.o,10),a.Qb(m.r,8),a.Qb(m.i,8),a.Qb(s.g),a.Qb(w,8))},e.\u0275cmp=a.Kb({type:e,selectors:[["nx-selectable-card"]],contentQueries:function(e,t,n){if(1&e&&a.Jb(n,b.b,0),2&e){let e;a.tc(e=a.ec())&&(t._errorList=e)}},viewQuery:function(e,t){if(1&e&&a.Nc(x,1),2&e){let e;a.tc(e=a.ec())&&(t._nativeInput=e.first)}},hostAttrs:["attr.role","checkbox"],hostVars:8,hostBindings:function(e,t){2&e&&(a.Fb("aria-invalid",t._errorState)("aria-checked",t.checked),a.Ib("is-disabled",t.disabled)("has-error",t._errorState)("is-expert",t._isExpert))},inputs:{appearance:"appearance",id:"id",checked:"checked",value:"value",disabled:"disabled",negative:"negative",required:"required",name:"name",tabindex:"tabindex"},outputs:{selectionChange:"selectionChange",checkedChange:"checkedChange"},ngContentSelectors:P,decls:11,vars:14,consts:[["type","checkbox",3,"checked","value","required","change","blur","click"],["input",""],["class","checkbox",4,"ngIf","ngIfElse"],[1,"content"],[4,"ngIf"],["expert",""],[1,"checkbox"],["name","check","aria-hidden","true",4,"ngIf"],["name","check","aria-hidden","true"],["name","check-circle","size","s","aria-hidden","true",1,"checkmark"]],template:function(e,t){if(1&e&&(a.mc(M),a.Wb(0,"input",0,1),a.dc("change",function(e){return t._onInteractionEvent(e)})("blur",function(e){return t.onTouchedCallback(e)})("click",function(e){return t._onInputClick(e)}),a.Vb(),a.Wb(2,"label"),a.Hc(3,f,2,1,"span",2),a.Wb(4,"div",3),a.lc(5),a.lc(6,1),a.lc(7,2),a.Vb(),a.Vb(),a.Hc(8,v,1,0,"ng-content",4),a.Hc(9,O,1,0,"ng-template",null,5,a.Ic)),2&e){const e=a.uc(10);a.nc("checked",t.checked)("value",t.value||null)("required",t.required),a.Fb("disabled",t.disabled||null)("id",t.id)("name",t.name)("aria-required",t.required)("tabindex",t.tabindex)("aria-invalid",t._errorState)("aria-describedby",t._errorListIds||null),a.Eb(2),a.Fb("for",t.id),a.Eb(1),a.nc("ngIf","default"===t.appearance)("ngIfElse",e),a.Eb(5),a.nc("ngIf",t._errorState)}},directives:[d.q,C.a],styles:['[_nghost-%COMP%]{display:block}[_nghost-%COMP%]     nx-error{margin-top:8px}[_nghost-%COMP%]     nx-error.nx-error--message{margin-top:12px}  nx-card-content,   nx-card-footer,   nx-card-header{display:block}.checkmark[_ngcontent-%COMP%]{float:right;position:relative;color:var(--selectable-card-icon-color)}[dir=rtl][_nghost-%COMP%]   .checkmark[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .checkmark[_ngcontent-%COMP%]{float:left}.checkmark[_ngcontent-%COMP%]     svg, .checkmark[_ngcontent-%COMP%]:before{display:none;z-index:1}.checkmark[_ngcontent-%COMP%]:after{content:"";display:block;position:absolute;width:22px;height:22px;border:1px solid var(--selectable-card-icon-placeholder-border-color);border-radius:50%}.checkbox[_ngcontent-%COMP%]{float:left;background-color:var(--checkbox-background-color);border:var(--checkbox-border-width) solid var(--checkbox-border-color);border-radius:var(--checkbox-border-radius);color:var(--checkbox-icon-color);font-size:var(--checkbox-icon-size);height:var(--checkbox-control-size);width:var(--checkbox-control-size);min-width:var(--checkbox-control-size);display:flex;justify-content:center;align-items:center;z-index:0}[dir=rtl][_nghost-%COMP%]   .checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .checkbox[_ngcontent-%COMP%]{float:right}[_nghost-%COMP%]:not(.is-expert)   .content[_ngcontent-%COMP%]{overflow:hidden;padding-left:16px}[dir=rtl]   [_nghost-%COMP%]:not(.is-expert)   .content[_ngcontent-%COMP%]{padding-left:0;padding-right:16px}@media (max-width:703px){[_nghost-%COMP%]:not(.is-expert)   .content[_ngcontent-%COMP%]{padding-left:8px}[dir=rtl]   [_nghost-%COMP%]:not(.is-expert)   .content[_ngcontent-%COMP%]{padding-right:8px}}.is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-expert-background-hover-color)}.is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]{color:var(--selectable-card-unchecked-icon-hover-color)}.is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]     svg, .is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]:before{display:block}.is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:active{background:var(--selectable-card-expert-background-active-color)}.is-expert[_nghost-%COMP%]   label[_ngcontent-%COMP%]:active   .checkmark[_ngcontent-%COMP%]{color:var(--selectable-card-icon-color)}.is-expert[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{background:var(--selectable-card-expert-background-selected-color)}.is-expert[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-expert-background-selected-hover-color)}.is-expert[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:active{background:var(--selectable-card-expert-background-selected-active-color)}input[_ngcontent-%COMP%]{position:absolute;height:0;width:0;overflow:hidden;opacity:0}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{background:var(--selectable-card-background-selected-color);border-color:var(--selectable-card-border-selected-color)}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]     svg, input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:before{display:block}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-background-selected-hover-color)}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]{color:var(--selectable-card-icon-color)}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]{background-color:var(--checkbox-selected-background-color);border-color:var(--checkbox-selected-border-color)}label[_ngcontent-%COMP%]{border:var(--selectable-card-border-width) solid var(--selectable-card-border-color);display:block;position:relative;padding:16px;cursor:pointer;width:100%;min-height:56px;border-radius:var(--selectable-card-border-radius);background:var(--selectable-card-background-color)}label[_ngcontent-%COMP%]:active, label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-background-hover-color);border-color:var(--selectable-card-border-hover-color)}@media (hover:none){label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-background-color);border-color:var(--selectable-card-border-color)}input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-background-selected-color)}}.is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]{border-color:var(--selectable-card-border-disabled-color);cursor:not-allowed}.is-disabled[_nghost-%COMP%]   .checkmark[_ngcontent-%COMP%]{opacity:40%}.is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:active, .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover{background:var(--selectable-card-background-disabled-color)}.is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:active   .checkmark[_ngcontent-%COMP%]     svg, .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:active   .checkmark[_ngcontent-%COMP%]:before, .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]     svg, .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]:before{display:none}.is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{background:var(--selectable-card-background-disabled-selected-color);border-color:var(--selectable-card-border-disabled-selected-color)}.is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%]{background-color:var(--checkbox-disabled-selected-background-color);border-color:var(--checkbox-disabled-border-color);color:var(--checkbox-disabled-icon-color)}.is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]     svg, .is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]:before{display:block}.is-disabled.is-expert[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]{background:var(--selectable-card-expert-background-disabled-selected-color)}.is-disabled[_nghost-%COMP%]   .checkbox[_ngcontent-%COMP%]{background-color:var(--checkbox-disabled-background-color);border-color:var(--checkbox-disabled-border-color);color:var(--checkbox-disabled-icon-color)}.has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover, .has-error[_nghost-%COMP%]   label[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover{border-color:var(--selectable-card-border-error-color)}input.cdk-keyboard-focused[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]{box-shadow:var(--focus-box-shadow)}@media screen and (-ms-high-contrast:active){input.cdk-keyboard-focused[_ngcontent-%COMP%] + label[_ngcontent-%COMP%]{box-shadow:0 0 0 2px background,0 0 0 6px windowText;outline:4px solid CanvasText;outline-offset:2px}.has-error[_nghost-%COMP%]   label[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]   label[_ngcontent-%COMP%], [_nghost-%COMP%]   label[_ngcontent-%COMP%]:hover{border-color:buttonText}.has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%], [_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover{border-width:3px;padding:14px;border-color:highlight}.has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%], .has-error[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%], [_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%], [_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:hover   .checkmark[_ngcontent-%COMP%]{color:CanvasText}.is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]{border-color:GrayText;color:GrayText}.is-disabled[_nghost-%COMP%]   input[_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%], .is-disabled[_nghost-%COMP%]   label[_ngcontent-%COMP%]   .checkmark[_ngcontent-%COMP%]{color:GrayText}}'],changeDetection:0}),e})();const W=["*"];let F=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Kb({type:e,selectors:[["nx-card-header"]],ngContentSelectors:W,decls:1,vars:0,template:function(e,t){1&e&&(a.mc(),a.lc(0))},encapsulation:2,changeDetection:0}),e})();var I=n("eC/v"),R=n("LktG");let T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Kb({type:e,selectors:[["card-example"]],decls:8,vars:0,consts:[["nxHeadline","subsection-small",1,"nx-margin-bottom-2m"],["nxHeadline","subsection-xsmall",1,"nx-margin-bottom-m"],["nxCopytext","normal"]],template:function(e,t){1&e&&(a.Wb(0,"nx-card"),a.Wb(1,"nx-card-header"),a.Wb(2,"h3",0),a.Jc(3,"Card headline"),a.Vb(),a.Vb(),a.Wb(4,"p",1),a.Jc(5,"2,99\u20ac"),a.Vb(),a.Wb(6,"p",2),a.Jc(7," Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus? "),a.Vb(),a.Vb())},directives:[l,F,I.a,R.a],styles:[""]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-basic-example"]],decls:4,vars:0,consts:[[1,"nx-margin-bottom-2m"],[1,"content"],["checked",""]],template:function(e,t){1&e&&(a.Wb(0,"nx-selectable-card",0),a.Rb(1,"div",1),a.Vb(),a.Wb(2,"nx-selectable-card",2),a.Rb(3,"div",1),a.Vb())},directives:[V],styles:[".content[_ngcontent-%COMP%]{height:100px}"]}),e})();var J=n("aQnR"),L=n("BQ2b"),q=n("5/jY"),D=n("LTpZ");function z(e,t){if(1&e&&(a.Wb(0,"div",8),a.Wb(1,"nx-selectable-card",9),a.Wb(2,"h3",10),a.Jc(3,"Card headline"),a.Vb(),a.Vb(),a.Vb()),2&e){const e=t.index;a.Eb(1),a.nc("formControlName",e)}}let G=(()=>{class e{constructor(e){this.fb=e,this.cardArray=new m.b([new m.e(!1),new m.e(!1),new m.e(!1)]),this.myFormGroup=this.fb.group({cards:this.cardArray})}addNewCard(){this.cardArray.push(new m.e(!1))}removeFirstCard(){this.cardArray.removeAt(0)}get cards(){return this.myFormGroup.get("cards")}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(m.d))},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-dynamic-example"]],decls:14,vars:5,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-s"],["nxCol","12,12,3"],["nxButton","primary small","type","button",3,"click"],["nxButton","secondary small","type","button",3,"click"],[3,"formGroup"],["nxRow","","formArrayName","cards"],["nxCol","12,12,12,4",4,"ngFor","ngForOf"],["nxCol","12,12,12,4"],[1,"nx-margin-bottom-xs",3,"formControlName"],["nxCopytext","",1,"nx-margin-bottom-2m"]],template:function(e,t){1&e&&(a.Wb(0,"div",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"button",3),a.dc("click",function(){return t.addNewCard()}),a.Jc(4," Add new card "),a.Vb(),a.Vb(),a.Wb(5,"div",2),a.Wb(6,"button",4),a.dc("click",function(){return t.removeFirstCard()}),a.Jc(7," Remove first card "),a.Vb(),a.Vb(),a.Vb(),a.Wb(8,"form",5),a.Wb(9,"div",6),a.Hc(10,z,4,1,"div",7),a.Vb(),a.Wb(11,"p"),a.Jc(12),a.ic(13,"json"),a.Vb(),a.Vb(),a.Vb()),2&e&&(a.Eb(8),a.nc("formGroup",t.myFormGroup),a.Eb(2),a.nc("ngForOf",t.cards.controls),a.Eb(2),a.Lc("Form value: ",a.jc(13,3,t.myFormGroup.value),""))},directives:[J.a,L.a,q.a,D.a,m.z,m.q,m.i,m.c,d.p,V,m.p,m.g,R.a],pipes:[d.h],styles:[""]}),e})();var S=n("aXeq");let j=(()=>{class e{constructor(e){this.fb=e,this.createForm()}createForm(){this.testForm=this.fb.group({selectableCardTestReactive:[!1,m.y.requiredTrue]})}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(m.d))},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-reactive-example"]],decls:11,vars:7,consts:[[3,"formGroup"],["formControlName","selectableCardTestReactive"],[1,"content"]],template:function(e,t){1&e&&(a.Wb(0,"form",0),a.Wb(1,"nx-selectable-card",1),a.Rb(2,"div",2),a.Wb(3,"nx-error"),a.Jc(4," This card must be selected. "),a.Vb(),a.Vb(),a.Wb(5,"p"),a.Jc(6),a.ic(7,"json"),a.Vb(),a.Wb(8,"p"),a.Jc(9),a.ic(10,"json"),a.Vb(),a.Vb()),2&e&&(a.nc("formGroup",t.testForm),a.Eb(6),a.Lc("Form value: ",a.jc(7,3,t.testForm.value),""),a.Eb(3),a.Lc("Form status: ",a.jc(10,5,t.testForm.status),""))},directives:[m.z,m.q,m.i,V,m.p,m.g,S.b],pipes:[d.h],styles:[".content[_ngcontent-%COMP%]{height:100px}"]}),e})(),N=(()=>{class e{constructor(e){this.fb=e,this.createForm()}createForm(){this.formGroup=this.fb.group({errorCard:[!1,m.y.requiredTrue],errorCard2:[!0,A]}),this.formGroup.markAllAsTouched()}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(m.d))},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-states-example"]],decls:30,vars:1,consts:[["nxLayout","grid",3,"formGroup"],["nxRow",""],["nxCol","12,12,6,6"],[1,"nx-margin-bottom-2m"],["nxCopytext","",1,"content"],["checked","",1,"nx-margin-bottom-2m"],["disabled","",1,"nx-margin-bottom-2m"],["disabled","","checked","",1,"nx-margin-bottom-2m"],["formControlName","errorCard",1,"nx-margin-bottom-2m"],["formControlName","errorCard2"]],template:function(e,t){1&e&&(a.Wb(0,"form",0),a.Wb(1,"div",1),a.Wb(2,"div",2),a.Wb(3,"nx-selectable-card",3),a.Wb(4,"h3",4),a.Jc(5,"Default selectable card"),a.Vb(),a.Vb(),a.Vb(),a.Wb(6,"div",2),a.Wb(7,"nx-selectable-card",5),a.Wb(8,"h3",4),a.Jc(9,"Checked selectable card"),a.Vb(),a.Vb(),a.Vb(),a.Wb(10,"div",2),a.Wb(11,"nx-selectable-card",6),a.Wb(12,"h3",4),a.Jc(13,"Disabled selectable card"),a.Vb(),a.Vb(),a.Vb(),a.Wb(14,"div",2),a.Wb(15,"nx-selectable-card",7),a.Wb(16,"h3",4),a.Jc(17,"Disabled and checked selectable card"),a.Vb(),a.Vb(),a.Vb(),a.Wb(18,"div",2),a.Wb(19,"nx-selectable-card",8),a.Wb(20,"h3",4),a.Jc(21,"Selectable card with error"),a.Vb(),a.Wb(22,"nx-error"),a.Jc(23," This card must be selected. "),a.Vb(),a.Vb(),a.Vb(),a.Wb(24,"div",2),a.Wb(25,"nx-selectable-card",9),a.Wb(26,"h3",4),a.Jc(27,"This card must not be selected."),a.Vb(),a.Wb(28,"nx-error"),a.Jc(29," This card must not be selected. "),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&e&&a.nc("formGroup",t.formGroup)},directives:[m.z,m.q,J.a,m.i,L.a,q.a,V,R.a,m.p,m.g,S.b],styles:[".content[_ngcontent-%COMP%]{height:124px}"]}),e})();function A(e){return e.value?{invalid:!0}:null}var Q=n("ierq"),X=n("+Gny"),K=n("bah2"),H=n("eSmh"),B=n("gt5x");let U=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-product-example"]],decls:19,vars:1,consts:[[1,"card"],["height","56","src","/assets/images/selectable-card.svg","alt","product image"],[1,"content"],["nxCopytext","",1,"nx-font-weight-semibold","nx-margin-bottom-2xs"],["nxCopytext","medium",1,"nx-margin-bottom-2xs"],["nxCopytext",""],["nxPlainButton","","nxPopoverTrigger","click",1,"nx-margin-left-xs",3,"nxPopoverTriggerFor"],["size","s","name","info-circle-o"],["popover",""]],template:function(e,t){if(1&e&&(a.Wb(0,"nx-selectable-card"),a.Wb(1,"div",0),a.Rb(2,"img",1),a.Wb(3,"div",2),a.Wb(4,"div"),a.Wb(5,"h3",3),a.Jc(6," Card headline "),a.Vb(),a.Wb(7,"p",4),a.Jc(8," Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"),a.Rb(9,"br"),a.Jc(10," consectetur, adipisci velit "),a.Vb(),a.Wb(11,"span",5),a.Jc(12,"$ 10 /monthly"),a.Vb(),a.Vb(),a.Wb(13,"button",6),a.Rb(14,"nx-icon",7),a.Wb(15,"nx-popover",null,8),a.Wb(17,"span",5),a.Jc(18,"Trigger by click"),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb(),a.Vb()),2&e){const e=a.uc(16);a.Eb(13),a.nc("nxPopoverTriggerFor",e)}},directives:[V,R.a,K.a,H.a,C.a,B.a],styles:[".card[_ngcontent-%COMP%]{display:flex}img[_ngcontent-%COMP%]{flex:0 0 auto;margin-right:16px}.content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;flex-basis:100%}@media (max-width:703px){.card[_ngcontent-%COMP%]{display:block}img[_ngcontent-%COMP%]{margin-right:0;margin-bottom:8px}}"]}),e})(),Z=(()=>{class e{constructor(e){this.fb=e,this.createForm()}createForm(){this.formGroup=this.fb.group({card:[!1,m.y.requiredTrue]}),this.formGroup.markAllAsTouched()}}return e.\u0275fac=function(t){return new(t||e)(a.Qb(m.d))},e.\u0275cmp=a.Kb({type:e,selectors:[["selectable-card-expert-example"]],decls:33,vars:1,consts:[["appearance","expert",1,"nx-margin-bottom-2m"],["nxHeadline","subsection-small"],["nxCopytext",""],["checked","","appearance","expert",1,"nx-margin-bottom-2m"],["appearance","expert","disabled","",1,"nx-margin-bottom-2m"],["checked","","appearance","expert","disabled","",1,"nx-margin-bottom-2m"],[3,"formGroup"],["formControlName","card","appearance","expert"],["appearance","text"]],template:function(e,t){1&e&&(a.Wb(0,"nx-selectable-card",0),a.Wb(1,"h3",1),a.Jc(2,"Card headline"),a.Vb(),a.Rb(3,"hr"),a.Wb(4,"p",2),a.Jc(5,"Default selectable card"),a.Vb(),a.Vb(),a.Wb(6,"nx-selectable-card",3),a.Wb(7,"h3",1),a.Jc(8,"Card headline"),a.Vb(),a.Rb(9,"hr"),a.Wb(10,"p",2),a.Jc(11,"Checked selectable card"),a.Vb(),a.Vb(),a.Wb(12,"nx-selectable-card",4),a.Wb(13,"h3",1),a.Jc(14,"Card headline"),a.Vb(),a.Rb(15,"hr"),a.Wb(16,"p",2),a.Jc(17,"Disabled selectable card"),a.Vb(),a.Vb(),a.Wb(18,"nx-selectable-card",5),a.Wb(19,"h3",1),a.Jc(20,"Card headline"),a.Vb(),a.Rb(21,"hr"),a.Wb(22,"p",2),a.Jc(23,"Disabled checked selectable card"),a.Vb(),a.Vb(),a.Wb(24,"form",6),a.Wb(25,"nx-selectable-card",7),a.Wb(26,"h3",1),a.Jc(27,"Card headline"),a.Vb(),a.Rb(28,"hr"),a.Wb(29,"p",2),a.Jc(30,"Required selectable card"),a.Vb(),a.Wb(31,"nx-error",8),a.Jc(32," This card must be selected. "),a.Vb(),a.Vb(),a.Vb()),2&e&&(a.Eb(24),a.nc("formGroup",t.formGroup))},directives:[V,I.a,R.a,m.z,m.q,m.i,m.p,m.g,S.b],styles:[""]}),e})(),Y=(()=>{class e{static components(){return{card:T,"selectable-card-basic":E,"selectable-card-dynamic":G,"selectable-card-reactive":j,"selectable-card-states":N,"selectable-card-product":U,"selectable-card-expert":Z}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.Ob({type:e}),e.\u0275inj=a.Nb({imports:[[g,o.c,c.a,X.a,Q.a,r.i]]}),e})()}}]);