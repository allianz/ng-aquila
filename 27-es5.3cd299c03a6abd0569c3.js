!function(){function e(e,n){for(var t=0;t<n.length;t++){var c=n[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function n(n,t,c){return t&&e(n.prototype,t),c&&e(n,c),n}function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{"+IXF":function(e,n,c){"use strict";c.d(n,"c",function(){return l}),c.d(n,"a",function(){return h.a}),c.d(n,"b",function(){return h.b}),c.d(n,"e",function(){return u}),c.d(n,"d",function(){return m.a});var o,r,i=c("ofXK"),s=c("mN63"),a=c("SqJ0"),b=c("fXoL"),l=((o=function e(){t(this,e)}).\u0275fac=function(e){return new(e||o)},o.\u0275mod=b.Ob({type:o}),o.\u0275inj=b.Nb({imports:[[i.c,s.c,a.a]]}),o),h=c("aXeq"),u=((r=function e(){t(this,e)}).\u0275fac=function(e){return new(e||r)},r.\u0275mod=b.Ob({type:r}),r.\u0275inj=b.Nb({imports:[[i.c]]}),r),m=c("Q3ZH")},Q3ZH:function(e,c,o){"use strict";o.d(c,"a",function(){return h});var r=o("fXoL"),i=o("8LU1"),s=o("XNiG"),a=["*"],b=0,l=new r.s("LABEL_DEFAULT_OPTIONS"),h=function(){var e=function(){function e(n){t(this,e),this._defaultOptions=n,this._stateChanges=new s.a,this._disabled=!1,this._negative=!1,this._id="nx-label-"+b++}return n(e,[{key:"disabled",get:function(){return this._disabled},set:function(e){this._disabled=Object(i.b)(e),this._stateChanges.next()}},{key:"negative",get:function(){return this._negative},set:function(e){this._negative=Object(i.b)(e),this._stateChanges.next()}},{key:"id",get:function(){return this._id},set:function(e){this._id!==e&&(this._id=e)}},{key:"size",get:function(){return this._size||this._defaultOptions&&this._defaultOptions.size||"large"},set:function(e){this._size=e,this._stateChanges.next()}}]),e}();return e.\u0275fac=function(n){return new(n||e)(r.Qb(l,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["nx-label"]],hostVars:9,hostBindings:function(e,n){2&e&&(r.Fb("disabled",n.disabled)("aria-labelledby",n.id||null)("id",n.id),r.Ib("nx-label--negative",n.negative)("nx-label--large","large"===n.size)("nx-label--small","small"===n.size))},inputs:{disabled:"disabled",negative:"negative",id:"id",size:"size"},ngContentSelectors:a,decls:2,vars:0,consts:[[1,"nx-label__content"]],template:function(e,n){1&e&&(r.mc(),r.Wb(0,"label",0),r.lc(1),r.Vb())},styles:["[_nghost-%COMP%]{display:block;color:var(--text-01)}.nx-label--small[_nghost-%COMP%]{font-size:var(--base-label-small-font-size);line-height:var(--base-label-small-line-height);font-weight:var(--base-label-small-font-weight);letter-spacing:var(--base-label-small-letter-spacing)}.nx-label--large[_nghost-%COMP%]{font-size:var(--base-label-large-font-size);line-height:var(--base-label-large-line-height);font-weight:var(--base-label-large-font-weight);letter-spacing:var(--base-label-large-letter-spacing)}[disabled=true][_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:not-allowed}.nx-label--negative[_nghost-%COMP%]{color:var(--negative)}"],changeDetection:0}),e}()},aXeq:function(e,c,o){"use strict";o.d(c,"a",function(){return f}),o.d(c,"b",function(){return k});var r=o("fXoL"),i=o("8LU1"),s=o("XNiG"),a=o("1G5W"),b=o("ofXK"),l=o("+vaC"),h=o("Xe60");function u(e,n){1&e&&r.Rb(0,"nx-icon",7),2&e&&r.nc("name","exclamation-triangle")}function m(e,n){if(1&e&&(r.Ub(0),r.Hc(1,u,1,1,"nx-icon",3),r.Wb(2,"div",4),r.Wb(3,"div",5),r.Sb(4,6),r.Vb(),r.Vb(),r.Tb()),2&e){var t=r.hc(),c=r.uc(3);r.Eb(1),r.nc("ngIf",t.showIcon),r.Eb(3),r.nc("ngTemplateOutlet",c)}}function x(e,n){if(1&e&&(r.Wb(0,"nx-message",8),r.Sb(1,6),r.Vb()),2&e){r.hc();var t=r.uc(3);r.Eb(1),r.nc("ngTemplateOutlet",t)}}function g(e,n){1&e&&r.lc(0)}var d=["*"],p=0,f=new r.s("ERROR_DEFAULT_OPTIONS"),k=function(){var e=function(){function e(n,c){var o=this;t(this,e),this._changeDetectorRef=n,this._defaultOptions=c,this._showIcon=!0,this._id="nx-error-"+p++,this._destroyed=new s.a,this._defaultOptions&&this._defaultOptions.changes&&this._defaultOptions.changes.pipe(Object(a.a)(this._destroyed)).subscribe(function(){o._changeDetectorRef.markForCheck()})}return n(e,[{key:"showIcon",get:function(){return this._showIcon},set:function(e){this._showIcon=Object(i.b)(e),this._changeDetectorRef.markForCheck()}},{key:"id",get:function(){return this._id},set:function(e){e&&e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())}},{key:"appearance",get:function(){return this._appearance||this._defaultOptions&&this._defaultOptions.appearance||"message"},set:function(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())}},{key:"ngOnDestroy",value:function(){this._destroyed.next(),this._destroyed.complete()}}]),e}();return e.\u0275fac=function(n){return new(n||e)(r.Qb(r.h),r.Qb(f,8))},e.\u0275cmp=r.Kb({type:e,selectors:[["nx-error"]],hostVars:4,hostBindings:function(e,n){2&e&&(r.Fb("role","alert")("id",n.id),r.Ib("nx-error--message","message"==n.appearance))},inputs:{showIcon:"showIcon",id:"id",appearance:"appearance"},ngContentSelectors:d,decls:4,vars:2,consts:[[4,"ngIf"],["nxContext","error",4,"ngIf"],["errorContent",""],["class","nx-error__icon",3,"name",4,"ngIf"],[1,"nx-error__content-wrapper"],[1,"nx-error__content"],[3,"ngTemplateOutlet"],[1,"nx-error__icon",3,"name"],["nxContext","error"]],template:function(e,n){1&e&&(r.mc(),r.Hc(0,m,5,2,"ng-container",0),r.Hc(1,x,2,1,"nx-message",1),r.Hc(2,g,1,0,"ng-template",null,2,r.Ic)),2&e&&(r.nc("ngIf","text"===n.appearance),r.Eb(1),r.nc("ngIf","message"===n.appearance))},directives:[b.q,b.u,l.a,h.a],styles:["[_nghost-%COMP%]{font-size:var(--base-error-simple-font-size);font-weight:var(--base-error-simple-font-weight);letter-spacing:var(--base-error-simple-letter-spacing);color:var(--base-error-color);width:100%;display:flex;text-align:left}[_nghost-%COMP%], [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{line-height:var(--base-error-simple-line-height)}[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{font-size:var(--base-error-simple-icon-size);margin-right:8px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{color:windowText}}[_nghost-%COMP%]   .nx-error__content-wrapper[_ngcontent-%COMP%]{max-width:100%}[dir=rtl]   [_nghost-%COMP%]{text-align:right}[dir=rtl]   [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}"],changeDetection:0}),e}()},hbE3:function(e,c,o){"use strict";o.r(c),o.d(c,"CheckboxExamplesModule",function(){return Q});var r,i=o("BrvL"),s=o("fXoL"),a=o("lKbI"),b=o("3Pt+"),l=o("Q3ZH"),h=o("ofXK"),u=((r=function e(){t(this,e),this.checkboxes=["checkbox 1"]}).\u0275fac=function(e){return new(e||r)},r.\u0275cmp=s.Kb({type:r,selectors:[["checkbox-group-basic-example"]],decls:12,vars:4,consts:[[3,"ngModel","ngModelChange"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(e,n){1&e&&(s.Wb(0,"nx-checkbox-group",0),s.dc("ngModelChange",function(e){return n.checkboxes=e}),s.Wb(1,"nx-label"),s.Jc(2,"This is a nx-checkbox-group"),s.Vb(),s.Wb(3,"nx-checkbox",1),s.Jc(4,"Checkbox 1"),s.Vb(),s.Wb(5,"nx-checkbox",2),s.Jc(6,"Checkbox 2"),s.Vb(),s.Wb(7,"nx-checkbox",3),s.Jc(8,"Checkbox 3"),s.Vb(),s.Vb(),s.Wb(9,"p"),s.Jc(10),s.ic(11,"json"),s.Vb()),2&e&&(s.nc("ngModel",n.checkboxes),s.Eb(10),s.Lc("Value: ",s.jc(11,2,n.checkboxes),""))},directives:[a.b,b.p,b.s,l.a,a.a],pipes:[h.h],styles:[""]}),r),m=o("LTpZ"),x=o("aXeq");function g(e,n){if(1&e&&(s.Wb(0,"nx-checkbox",8),s.Jc(1),s.Vb()),2&e){var t=n.$implicit;s.nc("value",t),s.Eb(1),s.Kc(t)}}function d(e,n){if(1&e&&(s.Wb(0,"nx-checkbox-group",4),s.Wb(1,"nx-label",5),s.Jc(2,"Select your choices"),s.Vb(),s.Wb(3,"nx-error",6),s.Jc(4," Please select at least one checkbox. "),s.Vb(),s.Hc(5,g,2,2,"nx-checkbox",7),s.Vb()),2&e){var t=s.hc();s.Eb(1),s.nc("size","small"),s.Eb(4),s.nc("ngForOf",t.data)}}var p,f,k,v,y,C,V,W,_=((f=function(){function e(n){t(this,e),this.fb=n,this.data=["one","two","three"],this.i=1,this.myFormGroup=this.fb.group({terms:[[],b.y.required]})}return n(e,[{key:"addNewCb",value:function(){this.data.push("Checkbox "+this.i),this.i++}},{key:"removeCB",value:function(){this.data.shift()}}]),e}()).\u0275fac=function(e){return new(e||f)(s.Qb(b.d))},f.\u0275cmp=s.Kb({type:f,selectors:[["checkbox-group-dynamic-example"]],decls:12,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required","",4,"ngIf"],["nxButton","primary small","type","button",1,"nx-margin-right-3xs",3,"click"],["nxButton","primary small","type","button",3,"click"],["name","terms","formControlName","terms","required",""],[3,"size"],["appearance","text"],["checked","","class","nx-margin-bottom-s",3,"value",4,"ngFor","ngForOf"],["checked","",1,"nx-margin-bottom-s",3,"value"]],template:function(e,n){1&e&&(s.Wb(0,"form",0),s.Hc(1,d,6,2,"nx-checkbox-group",1),s.Wb(2,"p"),s.Jc(3),s.ic(4,"json"),s.Vb(),s.Wb(5,"p"),s.Jc(6),s.ic(7,"json"),s.Vb(),s.Vb(),s.Wb(8,"button",2),s.dc("click",function(){return n.addNewCb()}),s.Jc(9,"Add new checkbox"),s.Vb(),s.Wb(10,"button",3),s.dc("click",function(){return n.removeCB()}),s.Jc(11,"Remove first checkbox"),s.Vb()),2&e&&(s.nc("formGroup",n.myFormGroup),s.Eb(1),s.nc("ngIf",n.data),s.Eb(2),s.Lc("Form value: ",s.jc(4,4,n.myFormGroup.value),""),s.Eb(3),s.Lc("Form status: ",s.jc(7,6,n.myFormGroup.status),""))},directives:[b.z,b.q,b.i,h.q,m.a,a.b,b.p,b.g,b.w,l.a,x.b,h.p,a.a],pipes:[h.h],styles:[""]}),f),J=((p=function e(){t(this,e),this.checkboxes=["checkbox 1"]}).\u0275fac=function(e){return new(e||p)},p.\u0275cmp=s.Kb({type:p,selectors:[["checkbox-group-horizontal-example"]],decls:13,vars:4,consts:[[3,"ngModel","ngModelChange"],[1,"horizontal-checkboxes"],["value","checkbox 1"],["value","checkbox 2",1,"nx-margin-left-s"],["value","checkbox 3",1,"nx-margin-left-s"]],template:function(e,n){1&e&&(s.Wb(0,"nx-checkbox-group",0),s.dc("ngModelChange",function(e){return n.checkboxes=e}),s.Wb(1,"nx-label"),s.Jc(2,"This is a nx-checkbox-group"),s.Vb(),s.Wb(3,"div",1),s.Wb(4,"nx-checkbox",2),s.Jc(5,"Checkbox 1"),s.Vb(),s.Wb(6,"nx-checkbox",3),s.Jc(7,"Checkbox 2"),s.Vb(),s.Wb(8,"nx-checkbox",4),s.Jc(9,"Checkbox 3"),s.Vb(),s.Vb(),s.Vb(),s.Wb(10,"p"),s.Jc(11),s.ic(12,"json"),s.Vb()),2&e&&(s.nc("ngModel",n.checkboxes),s.Eb(11),s.Lc("Value: ",s.jc(12,2,n.checkboxes),""))},directives:[a.b,b.p,b.s,l.a,a.a],pipes:[h.h],styles:[".horizontal-checkboxes[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]}),p),w=function(e){return{"docs-inverse-container":e}},F=((W=function(){function e(n){t(this,e),this.fb=n,this.createForm()}return n(e,[{key:"createForm",value:function(){this.myFormGroup=this.fb.group({terms:[[]]}),this.optionsForm=this.fb.group({isNegative:[!1,null],isRequired:[!1,null],isDisabled:[!1,null],isLarge:[!1,null],isLabelExpert:[!1,null]})}},{key:"toggleDisabled",value:function(){this.myFormGroup.get("terms").disabled?this.myFormGroup.get("terms").enable():this.myFormGroup.get("terms").disable()}},{key:"toggleRequired",value:function(){var e=this.myFormGroup.get("terms");e.validator===b.y.required?e.clearValidators():e.setValidators(b.y.required)}}]),e}()).\u0275fac=function(e){return new(e||W)(s.Qb(b.d))},W.\u0275cmp=s.Kb({type:W,selectors:[["checkbox-group-inheritance-example"]],decls:39,vars:14,consts:[[3,"formGroup"],["formControlName","isNegative",1,"nx-margin-bottom-s"],["formControlName","isRequired",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isDisabled",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isLarge",1,"nx-margin-bottom-s"],["formControlName","isLabelExpert"],[3,"ngClass"],["name","terms","formControlName","terms",3,"negative","labelSize"],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(e,n){1&e&&(s.Wb(0,"h4"),s.Jc(1,"Properties"),s.Vb(),s.Wb(2,"form",0),s.Wb(3,"nx-checkbox",1),s.Jc(4,"Toggle negative"),s.Vb(),s.Wb(5,"nx-checkbox",2),s.dc("checkedChange",function(){return n.toggleRequired()}),s.Jc(6,"Toggle required"),s.Vb(),s.Wb(7,"nx-checkbox",3),s.dc("checkedChange",function(){return n.toggleDisabled()}),s.Jc(8,"Toggle disabled"),s.Vb(),s.Wb(9,"nx-checkbox",4),s.Jc(10,"Toggle checkbox label size"),s.Vb(),s.Wb(11,"nx-checkbox",5),s.Jc(12,"Toggle checkbox group label size (Expert)"),s.Vb(),s.Vb(),s.Rb(13,"hr"),s.Wb(14,"h4"),s.Jc(15,"Result"),s.Vb(),s.Wb(16,"form",0),s.Wb(17,"div",6),s.Wb(18,"nx-checkbox-group",7),s.Wb(19,"nx-label",8),s.Jc(20,"Select your choices"),s.Vb(),s.Wb(21,"nx-error",9),s.Jc(22," Please select at least one checkbox. "),s.Vb(),s.Wb(23,"nx-checkbox",10),s.Jc(24,"Checkbox 1"),s.Vb(),s.Wb(25,"nx-checkbox",11),s.Jc(26,"Checkbox 2"),s.Vb(),s.Wb(27,"nx-checkbox",12),s.Jc(28,"Checkbox 3"),s.Vb(),s.Wb(29,"nx-checkbox",13),s.Jc(30,"Checkbox 4"),s.Vb(),s.Wb(31,"nx-checkbox",14),s.Jc(32,"Checkbox 5"),s.Vb(),s.Vb(),s.Vb(),s.Wb(33,"p"),s.Jc(34),s.ic(35,"json"),s.Vb(),s.Wb(36,"p"),s.Jc(37),s.ic(38,"json"),s.Vb(),s.Vb()),2&e&&(s.Eb(2),s.nc("formGroup",n.optionsForm),s.Eb(14),s.nc("formGroup",n.myFormGroup),s.Eb(1),s.nc("ngClass",s.rc(12,w,n.optionsForm.value.isNegative)),s.Eb(1),s.nc("negative",n.optionsForm.value.isNegative)("labelSize",n.optionsForm.value.isLarge?"large":"small"),s.Eb(1),s.nc("size",n.optionsForm.value.isLabelExpert?"small":"large"),s.Eb(15),s.Lc("Form value: ",s.jc(35,8,n.myFormGroup.value),""),s.Eb(3),s.Lc("Form status: ",s.jc(38,10,n.myFormGroup.status),""))},directives:[b.z,b.q,b.i,a.a,b.p,b.g,h.n,a.b,l.a,x.b],pipes:[h.h],styles:[".docs-inverse-container[_ngcontent-%COMP%]{padding:0}nx-checkbox-group[_ngcontent-%COMP%]{padding:8px;display:block}"]}),W),O=((V=function e(){t(this,e)}).\u0275fac=function(e){return new(e||V)},V.\u0275cmp=s.Kb({type:V,selectors:[["checkbox-group-label-size-example"]],decls:9,vars:1,consts:[[3,"size"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(e,n){1&e&&(s.Wb(0,"nx-checkbox-group"),s.Wb(1,"nx-label",0),s.Jc(2,"This is an expert label for the checkbox group"),s.Vb(),s.Wb(3,"nx-checkbox",1),s.Jc(4,"Checkbox 1"),s.Vb(),s.Wb(5,"nx-checkbox",2),s.Jc(6,"Checkbox 2"),s.Vb(),s.Wb(7,"nx-checkbox",3),s.Jc(8,"Checkbox 3"),s.Vb(),s.Vb()),2&e&&(s.Eb(1),s.nc("size","small"))},directives:[a.b,l.a,a.a],styles:[""]}),V),E=((C=function e(n){t(this,e),this.fb=n,this.myFormGroup=this.fb.group({terms:[]})}).\u0275fac=function(e){return new(e||C)(s.Qb(b.d))},C.\u0275cmp=s.Kb({type:C,selectors:[["checkbox-group-reactive-example"]],decls:16,vars:7,consts:[[3,"formGroup"],["name","terms","formControlName","terms"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3"]],template:function(e,n){1&e&&(s.Wb(0,"form",0),s.Wb(1,"nx-checkbox-group",1),s.Wb(2,"nx-label"),s.Jc(3,"Select your choices"),s.Vb(),s.Wb(4,"nx-checkbox",2),s.Jc(5,"Checkbox 1"),s.Vb(),s.Wb(6,"nx-checkbox",3),s.Jc(7,"Checkbox 2"),s.Vb(),s.Wb(8,"nx-checkbox",4),s.Jc(9,"Checkbox 3"),s.Vb(),s.Vb(),s.Wb(10,"p"),s.Jc(11),s.ic(12,"json"),s.Vb(),s.Wb(13,"p"),s.Jc(14),s.ic(15,"json"),s.Vb(),s.Vb()),2&e&&(s.nc("formGroup",n.myFormGroup),s.Eb(11),s.Lc("Form value: ",s.jc(12,3,n.myFormGroup.value),""),s.Eb(3),s.Lc("Form status: ",s.jc(15,5,n.myFormGroup.status),""))},directives:[b.z,b.q,b.i,a.b,b.p,b.g,l.a,a.a],pipes:[h.h],styles:[""]}),C),z=((y=function(){function e(n){t(this,e),this.fb=n,this.myFormGroup=this.fb.group({terms:[[],[b.y.required,this.validateCheckboxes]]})}return n(e,[{key:"validateCheckboxes",value:function(e){return e.value.length<=2?{min:!1}:null}}]),e}()).\u0275fac=function(e){return new(e||y)(s.Qb(b.d))},y.\u0275cmp=s.Kb({type:y,selectors:[["checkbox-group-validation-example"]],decls:22,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required",""],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(e,n){1&e&&(s.Wb(0,"form",0),s.Wb(1,"nx-checkbox-group",1),s.Wb(2,"nx-label",2),s.Jc(3,"Select your choices"),s.Vb(),s.Wb(4,"nx-error",3),s.Jc(5," Please select at least 3 checkboxes. "),s.Vb(),s.Wb(6,"nx-checkbox",4),s.Jc(7,"Checkbox 1"),s.Vb(),s.Wb(8,"nx-checkbox",5),s.Jc(9,"Checkbox 2"),s.Vb(),s.Wb(10,"nx-checkbox",6),s.Jc(11,"Checkbox 3"),s.Vb(),s.Wb(12,"nx-checkbox",7),s.Jc(13,"Checkbox 4"),s.Vb(),s.Wb(14,"nx-checkbox",8),s.Jc(15,"Checkbox 5"),s.Vb(),s.Vb(),s.Wb(16,"p"),s.Jc(17),s.ic(18,"json"),s.Vb(),s.Wb(19,"p"),s.Jc(20),s.ic(21,"json"),s.Vb(),s.Vb()),2&e&&(s.nc("formGroup",n.myFormGroup),s.Eb(2),s.nc("size","small"),s.Eb(15),s.Lc("Form value: ",s.jc(18,4,n.myFormGroup.value),""),s.Eb(3),s.Lc("Form status: ",s.jc(21,6,n.myFormGroup.status),""))},directives:[b.z,b.q,b.i,a.b,b.p,b.g,b.w,l.a,x.b,a.a],pipes:[h.h],styles:[""]}),y),T=((v=function e(){t(this,e)}).\u0275fac=function(e){return new(e||v)},v.\u0275cmp=s.Kb({type:v,selectors:[["checkbox-label-size-example"]],decls:5,vars:0,consts:[[1,"nx-margin-bottom-s"],["labelSize","large"]],template:function(e,n){1&e&&(s.Wb(0,"form"),s.Wb(1,"nx-checkbox",0),s.Jc(2,"Check me."),s.Vb(),s.Wb(3,"nx-checkbox",1),s.Jc(4,"Check me."),s.Vb(),s.Vb())},directives:[b.z,b.q,b.r,a.a],styles:[""]}),v),M=((k=function e(){t(this,e),this.checkboxes=["checkbox 1"]}).\u0275fac=function(e){return new(e||k)},k.\u0275cmp=s.Kb({type:k,selectors:[["checkbox-negative-example"]],decls:13,vars:1,consts:[[1,"docs-inverse-container"],["negative","true","checked","true"],["negative","true",3,"ngModel","ngModelChange"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3","disabled","true"]],template:function(e,n){1&e&&(s.Wb(0,"div",0),s.Wb(1,"nx-checkbox",1),s.Jc(2,"I'm a single checkbox"),s.Vb(),s.Rb(3,"br"),s.Wb(4,"nx-checkbox-group",2),s.dc("ngModelChange",function(e){return n.checkboxes=e}),s.Wb(5,"nx-label"),s.Jc(6,"This is a nx-checkbox-group"),s.Vb(),s.Wb(7,"nx-checkbox",3),s.Jc(8,"Checkbox 1"),s.Vb(),s.Wb(9,"nx-checkbox",4),s.Jc(10,"Checkbox 2"),s.Vb(),s.Wb(11,"nx-checkbox",5),s.Jc(12,"Checkbox 3"),s.Vb(),s.Vb(),s.Vb()),2&e&&(s.Eb(4),s.nc("ngModel",n.checkboxes))},directives:[a.a,a.b,b.p,b.s,l.a],styles:[""]}),k);function j(e,n){if(1&e&&(s.Wb(0,"pre"),s.Jc(1),s.Vb()),2&e){var t=s.hc();s.Eb(1),s.Kc(t.logMessage)}}var G,L,P,q,R,I,N=((R=function(){function e(){t(this,e),this.messages=[]}return n(e,[{key:"log",value:function(e){this.messages.push(e),this.logMessage=this.messages.join("\n")}}]),e}()).\u0275fac=function(e){return new(e||R)},R.\u0275cmp=s.Kb({type:R,selectors:[["checkbox-outputs-example"]],decls:7,vars:1,consts:[[1,"nx-margin-bottom-s",3,"checkboxChange","checkedChange","indeterminateChange"],["checkboxTest",""],["nxButton","small","type","button",3,"click"],[4,"ngIf"]],template:function(e,n){if(1&e){var t=s.Xb();s.Wb(0,"nx-checkbox",0,1),s.dc("checkboxChange",function(){return n.log("checkbox change occured")})("checkedChange",function(){return n.log("checked change occured")})("indeterminateChange",function(){return n.log("indeterminate change occured")}),s.Jc(2,"Check me."),s.Vb(),s.Wb(3,"button",2),s.dc("click",function(){s.yc(t);var e=s.uc(1);return e.indeterminate=!e.indeterminate}),s.Jc(4,"Toggle Indeterminate"),s.Vb(),s.Rb(5,"br"),s.Hc(6,j,2,1,"pre",3)}2&e&&(s.Eb(6),s.nc("ngIf",n.logMessage))},directives:[a.a,m.a,h.q],styles:[""]}),R),K=((q=function(){function e(n){t(this,e),this.fb=n,this.createForm()}return n(e,[{key:"createForm",value:function(){this.testForm=this.fb.group({checkboxTestReactive:[!1,b.y.requiredTrue]})}}]),e}()).\u0275fac=function(e){return new(e||q)(s.Qb(b.d))},q.\u0275cmp=s.Kb({type:q,selectors:[["checkbox-reactive-example"]],decls:9,vars:7,consts:[[3,"formGroup"],["formControlName","checkboxTestReactive"]],template:function(e,n){1&e&&(s.Wb(0,"form",0),s.Wb(1,"nx-checkbox",1),s.Jc(2,"Check me."),s.Vb(),s.Wb(3,"p"),s.Jc(4),s.ic(5,"json"),s.Vb(),s.Wb(6,"p"),s.Jc(7),s.ic(8,"json"),s.Vb(),s.Vb()),2&e&&(s.nc("formGroup",n.testForm),s.Eb(4),s.Lc("Form value: ",s.jc(5,3,n.testForm.value),""),s.Eb(3),s.Lc("Form status: ",s.jc(8,5,n.testForm.status),""))},directives:[b.z,b.q,b.i,a.a,b.p,b.g],pipes:[h.h],styles:[""]}),q),X=((P=function e(){t(this,e),this.checkedRaw=!1}).\u0275fac=function(e){return new(e||P)},P.\u0275cmp=s.Kb({type:P,selectors:[["checkbox-simple-binding-example"]],decls:4,vars:2,consts:[[1,"nx-margin-bottom-s",3,"checked","checkedChange"]],template:function(e,n){1&e&&(s.Wb(0,"form"),s.Wb(1,"nx-checkbox",0),s.dc("checkedChange",function(e){return n.checkedRaw=e}),s.Jc(2,"Check me."),s.Vb(),s.Jc(3),s.Vb()),2&e&&(s.Eb(1),s.nc("checked",n.checkedRaw),s.Eb(2),s.Lc(" Current Value: ",n.checkedRaw,"\n"))},directives:[b.z,b.q,b.r,a.a],styles:[""]}),P),D=((L=function e(){t(this,e)}).\u0275fac=function(e){return new(e||L)},L.\u0275cmp=s.Kb({type:L,selectors:[["checkbox-states-example"]],decls:24,vars:7,consts:[[1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-s",3,"checked"],[1,"nx-margin-bottom-s",3,"disabled"],[1,"nx-margin-bottom-s",3,"checked","disabled"],[1,"nx-margin-bottom-s",3,"indeterminate"],[3,"indeterminate","disabled"]],template:function(e,n){1&e&&(s.Wb(0,"nx-checkbox",0),s.Jc(1," Default"),s.Rb(2,"br"),s.Jc(3," The box is left unchecked.\n"),s.Vb(),s.Wb(4,"nx-checkbox",1),s.Jc(5," Checked"),s.Rb(6,"br"),s.Jc(7," An action or item is selected.\n"),s.Vb(),s.Wb(8,"nx-checkbox",2),s.Jc(9," Disabled"),s.Rb(10,"br"),s.Jc(11," The checkbox is inactive due to previously checked or unchecked boxes.\n"),s.Vb(),s.Wb(12,"nx-checkbox",3),s.Jc(13," Checked & disabled"),s.Rb(14,"br"),s.Jc(15," An action or item has been pre-selected due to previously checked or unchecked boxes.\n"),s.Vb(),s.Wb(16,"nx-checkbox",4),s.Jc(17," Indeterminate"),s.Rb(18,"br"),s.Jc(19,' If all subordinate boxes are checked, the "mother checkbox" may be as well. But if only _some_ of them are, it\'s state is indeterminate, i.e. partially checked. This may come in handy if you work with nested checkboxes.\n'),s.Vb(),s.Wb(20,"nx-checkbox",5),s.Jc(21," Indeterminate & disabled"),s.Rb(22,"br"),s.Jc(23," The box is indeterminate and can not be interacted with directly, but only via checking all of the subordinate boxes nested below.\n"),s.Vb()),2&e&&(s.Eb(4),s.nc("checked",!0),s.Eb(4),s.nc("disabled",!0),s.Eb(4),s.nc("checked",!0)("disabled",!0),s.Eb(4),s.nc("indeterminate",!0),s.Eb(4),s.nc("indeterminate",!0)("disabled",!0))},directives:[a.a],styles:[""]}),L),S=((G=function e(){t(this,e),this.checked=!1}).\u0275fac=function(e){return new(e||G)},G.\u0275cmp=s.Kb({type:G,selectors:[["checkbox-template-driven-example"]],decls:4,vars:2,consts:[["name","checkboxTestTemplate",1,"nx-margin-bottom-s",3,"ngModel","ngModelChange"]],template:function(e,n){1&e&&(s.Wb(0,"form"),s.Wb(1,"nx-checkbox",0),s.dc("ngModelChange",function(e){return n.checked=e}),s.Jc(2,"Check me."),s.Vb(),s.Jc(3),s.Vb()),2&e&&(s.Eb(1),s.nc("ngModel",n.checked),s.Eb(2),s.Lc(" Current Value: ",n.checked,"\n"))},directives:[b.z,b.q,b.r,a.a,b.p,b.s],styles:[""]}),G),B=o("ierq"),Q=((I=function(){function e(){t(this,e)}return n(e,null,[{key:"components",value:function(){return{"checkbox-group-basic":u,"checkbox-group-dynamic":_,"checkbox-group-horizontal":J,"checkbox-group-inheritance":F,"checkbox-group-label-size":O,"checkbox-group-reactive":E,"checkbox-group-validation":z,"checkbox-label-size":T,"checkbox-negative":M,"checkbox-outputs":N,"checkbox-reactive":K,"checkbox-simple-binding":X,"checkbox-states":D,"checkbox-template-driven":S}}}]),e}()).\u0275fac=function(e){return new(e||I)},I.\u0275mod=s.Ob({type:I}),I.\u0275inj=s.Nb({imports:[[i.a,B.a]]}),I)},ierq:function(e,n,c){"use strict";c.d(n,"a",function(){return h});var o=c("tgBs"),r=c("/sJ9"),i=c("eV8M"),s=c("gkbm"),a=c("ofXK"),b=c("3Pt+"),l=c("fXoL"),h=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=l.Ob({type:e}),e.\u0275inj=l.Nb({imports:[[],a.c,b.k,b.v,s.b,i.a,r.a,o.a]}),e}()}}])}();