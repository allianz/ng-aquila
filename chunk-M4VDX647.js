import{a as g,b as l,c as Se}from"./chunk-TQSWTGBO.js";import{a as Ne}from"./chunk-65GLPSAG.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import{b as V,e as f}from"./chunk-KTZ2MV5R.js";import{A as x,B as D,d as I,g as h,h as C,j as z,l as L,m as k,p as M,s as T,w as A,y as w}from"./chunk-3CXM22DE.js";import"./chunk-DZRQJYOJ.js";import{a as ge,b as ve,c as ye,d as Ee}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import{d as X}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{l as ke,v as S,z as fe}from"./chunk-CCSED5RY.js";import{Aa as j,Ba as P,Lb as c,Lc as be,Mb as se,Mc as e,Nc as J,Oc as d,Qc as _,Rb as q,Rc as F,Sc as G,Vc as Ce,Xc as u,Yc as b,bc as p,gc as W,ic as xe,jc as de,ka as pe,kc as he,lc as t,mc as o,nc as E,rc as ue,wb as a,wc as R,xb as N,yc as O}from"./chunk-LG2ZA55B.js";var K=(()=>{class n{constructor(){this.checkboxes=["checkbox 1"]}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-basic-example"]],decls:12,vars:4,consts:[[3,"ngModelChange","ngModel"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(i,r){i&1&&(t(0,"nx-checkbox-group",0),G("ngModelChange",function(s){return F(r.checkboxes,s)||(r.checkboxes=s),s}),t(1,"nx-label"),e(2,"This is a nx-checkbox-group"),o(),t(3,"nx-checkbox",1),e(4,"Checkbox 1"),o(),t(5,"nx-checkbox",2),e(6,"Checkbox 2"),o(),t(7,"nx-checkbox",3),e(8,"Checkbox 3"),o()(),t(9,"p"),e(10),u(11,"json"),o()),i&2&&(_("ngModel",r.checkboxes),a(10),d("Value: ",b(11,2,r.checkboxes),""))},dependencies:[g,x,h,L,f,l,S],encapsulation:2})}}return n})();function _e(n,H){if(n&1&&(t(0,"nx-checkbox",6),e(1),o()),n&2){let m=H.$implicit;p("value",m),a(),J(m)}}function Fe(n,H){if(n&1&&(t(0,"nx-checkbox-group",1)(1,"nx-label",4),e(2,"Select your choices"),o(),t(3,"nx-error",5),e(4," Please select at least one checkbox. "),o(),de(5,_e,2,2,"nx-checkbox",6,xe),o()),n&2){let m=O();a(),p("size","small"),a(4),he(m.data)}}var Q=(()=>{class n{constructor(m){this.fb=m,this.myFormGroup=this.fb.group({terms:[[],I.required]}),this.data=["one","two","three"],this.i=1}addNewCb(){this.data.push("Checkbox "+this.i),this.i++}removeCB(){this.data.shift()}static{this.\u0275fac=function(i){return new(i||n)(N(w))}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-dynamic-example"]],decls:12,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required",""],["nxButton","primary small","type","button",1,"nx-margin-right-3xs",3,"click"],["nxButton","primary small","type","button",3,"click"],[3,"size"],["appearance","text"],["checked","",1,"nx-margin-bottom-s",3,"value"]],template:function(i,r){i&1&&(t(0,"form",0),q(1,Fe,7,1,"nx-checkbox-group",1),t(2,"p"),e(3),u(4,"json"),o(),t(5,"p"),e(6),u(7,"json"),o()(),t(8,"button",2),R("click",function(){return r.addNewCb()}),e(9,` Add new checkbox
`),o(),t(10,"button",3),R("click",function(){return r.removeCB()}),e(11,` Remove first checkbox
`),o()),i&2&&(p("formGroup",r.myFormGroup),a(),W(r.data?1:-1),a(2),d("Form value: ",b(4,4,r.myFormGroup.value),""),a(3),d("Form status: ",b(7,6,r.myFormGroup.status),""))},dependencies:[x,k,h,C,A,D,M,T,g,f,V,l,X,S],encapsulation:2})}}return n})();var Ge=n=>({"docs-inverse-container":n}),U=(()=>{class n{constructor(m){this.fb=m,this.optionsForm=this.fb.group({isNegative:[!1,null],isRequired:[!1,null],isDisabled:[!1,null],isLarge:[!1,null],isLabelExpert:[!1,null]}),this.myFormGroup=this.fb.group({terms:[[]]})}toggleDisabled(){this.myFormGroup.get("terms")?.disabled?this.myFormGroup.get("terms")?.enable():this.myFormGroup.get("terms")?.disable()}toggleRequired(){let m=this.myFormGroup.get("terms");m?.validator===I.required?m.clearValidators():m?.setValidators(I.required)}static{this.\u0275fac=function(i){return new(i||n)(N(w))}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-inheritance-example"]],decls:39,vars:14,consts:[[3,"formGroup"],["formControlName","isNegative",1,"nx-margin-bottom-s"],["formControlName","isRequired",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isDisabled",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isLarge",1,"nx-margin-bottom-s"],["formControlName","isLabelExpert"],[3,"ngClass"],["name","terms","formControlName","terms",3,"negative","labelSize"],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(i,r){i&1&&(t(0,"h4"),e(1,"Properties"),o(),t(2,"form",0)(3,"nx-checkbox",1),e(4,"Toggle negative"),o(),t(5,"nx-checkbox",2),R("checkedChange",function(){return r.toggleRequired()}),e(6,"Toggle required"),o(),t(7,"nx-checkbox",3),R("checkedChange",function(){return r.toggleDisabled()}),e(8,"Toggle disabled"),o(),t(9,"nx-checkbox",4),e(10,"Toggle checkbox label size"),o(),t(11,"nx-checkbox",5),e(12,"Toggle checkbox group label size (Expert)"),o()(),E(13,"hr"),t(14,"h4"),e(15,"Result"),o(),t(16,"form",0)(17,"div",6)(18,"nx-checkbox-group",7)(19,"nx-label",8),e(20,"Select your choices"),o(),t(21,"nx-error",9),e(22," Please select at least one checkbox. "),o(),t(23,"nx-checkbox",10),e(24,"Checkbox 1"),o(),t(25,"nx-checkbox",11),e(26,"Checkbox 2"),o(),t(27,"nx-checkbox",12),e(28,"Checkbox 3"),o(),t(29,"nx-checkbox",13),e(30,"Checkbox 4"),o(),t(31,"nx-checkbox",14),e(32,"Checkbox 5"),o()()(),t(33,"p"),e(34),u(35,"json"),o(),t(36,"p"),e(37),u(38,"json"),o()()),i&2&&(a(2),p("formGroup",r.optionsForm),a(14),p("formGroup",r.myFormGroup),a(),p("ngClass",Ce(12,Ge,r.optionsForm.value.isNegative)),a(),p("negative",r.optionsForm.value.isNegative)("labelSize",r.optionsForm.value.isLarge?"large":"small"),a(),p("size",r.optionsForm.value.isLabelExpert?"small":"large"),a(15),d("Form value: ",b(35,8,r.optionsForm.value),""),a(3),d("Form status: ",b(38,10,r.myFormGroup.status),""))},dependencies:[x,k,h,C,D,M,T,l,ke,g,f,V,S],styles:[".docs-inverse-container[_ngcontent-%COMP%]{padding:0}nx-checkbox-group[_ngcontent-%COMP%]{padding:8px;display:block}"]})}}return n})();var Y=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-label-size-example"]],decls:9,vars:1,consts:[[3,"size"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(i,r){i&1&&(t(0,"nx-checkbox-group")(1,"nx-label",0),e(2,"This is an expert label for the checkbox group"),o(),t(3,"nx-checkbox",1),e(4,"Checkbox 1"),o(),t(5,"nx-checkbox",2),e(6,"Checkbox 2"),o(),t(7,"nx-checkbox",3),e(8,"Checkbox 3"),o()()),i&2&&(a(),p("size","small"))},dependencies:[g,f,l],encapsulation:2})}}return n})();var Z=(()=>{class n{constructor(){this.checkboxes=["checkbox 1"]}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-layout-example"]],decls:14,vars:1,consts:[[3,"ngModelChange","ngModel"],["nxLayout","nopadding"],["nxRow","",2,"row-gap","16px"],["nxCol","12,8,6,4"],["value","checkbox 1"],["value","checkbox 2"],["value","checkbox 3"]],template:function(i,r){i&1&&(t(0,"nx-checkbox-group",0),G("ngModelChange",function(s){return F(r.checkboxes,s)||(r.checkboxes=s),s}),t(1,"nx-label"),e(2,"Responsive horizontal layout with nx grid component"),o(),t(3,"div",1)(4,"div",2)(5,"div",3)(6,"nx-checkbox",4),e(7,"Checkbox 1"),o()(),t(8,"div",3)(9,"nx-checkbox",5),e(10,"Checkbox 2"),o()(),t(11,"div",3)(12,"nx-checkbox",6),e(13,"Checkbox 3"),o()()()()()),i&2&&_("ngModel",r.checkboxes)},dependencies:[g,x,h,L,f,l,Ee,ge,ve,ye],encapsulation:2})}}return n})();var $=(()=>{class n{constructor(m){this.fb=m,this.myFormGroup=this.fb.group({terms:[]})}static{this.\u0275fac=function(i){return new(i||n)(N(w))}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-reactive-example"]],decls:16,vars:7,consts:[[3,"formGroup"],["name","terms","formControlName","terms"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3"]],template:function(i,r){i&1&&(t(0,"form",0)(1,"nx-checkbox-group",1)(2,"nx-label"),e(3,"Select your choices"),o(),t(4,"nx-checkbox",2),e(5,"Checkbox 1"),o(),t(6,"nx-checkbox",3),e(7,"Checkbox 2"),o(),t(8,"nx-checkbox",4),e(9,"Checkbox 3"),o()(),t(10,"p"),e(11),u(12,"json"),o(),t(13,"p"),e(14),u(15,"json"),o()()),i&2&&(p("formGroup",r.myFormGroup),a(11),d("Form value: ",b(12,3,r.myFormGroup.value),""),a(3),d("Form status: ",b(15,5,r.myFormGroup.status),""))},dependencies:[x,k,h,C,D,M,T,g,f,l,S],encapsulation:2})}}return n})();var ee=(()=>{class n{constructor(m){this.fb=m,this.myFormGroup=this.fb.group({terms:[[],[I.required,this.validateCheckboxes]]})}validateCheckboxes(m){return m.value.length<=2?{min:!1}:null}static{this.\u0275fac=function(i){return new(i||n)(N(w))}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-group-validation-example"]],decls:22,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required",""],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(i,r){i&1&&(t(0,"form",0)(1,"nx-checkbox-group",1)(2,"nx-label",2),e(3,"Select your choices"),o(),t(4,"nx-error",3),e(5," Please select at least 3 checkboxes. "),o(),t(6,"nx-checkbox",4),e(7,"Checkbox 1"),o(),t(8,"nx-checkbox",5),e(9,"Checkbox 2"),o(),t(10,"nx-checkbox",6),e(11,"Checkbox 3"),o(),t(12,"nx-checkbox",7),e(13,"Checkbox 4"),o(),t(14,"nx-checkbox",8),e(15,"Checkbox 5"),o()(),t(16,"p"),e(17),u(18,"json"),o(),t(19,"p"),e(20),u(21,"json"),o()()),i&2&&(p("formGroup",r.myFormGroup),a(2),p("size","small"),a(15),d("Form value: ",b(18,4,r.myFormGroup.value),""),a(3),d("Form status: ",b(21,6,r.myFormGroup.status),""))},dependencies:[x,k,h,C,A,D,M,T,g,f,V,l,S],encapsulation:2})}}return n})();var te=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-label-size-example"]],decls:5,vars:0,consts:[[1,"nx-margin-bottom-s"],["labelSize","large"]],template:function(i,r){i&1&&(t(0,"form")(1,"nx-checkbox",0),e(2,"Check me."),o(),t(3,"nx-checkbox",1),e(4,"Check me."),o()())},dependencies:[x,k,C,z,l],encapsulation:2})}}return n})();var oe=(()=>{class n{constructor(){this.checkboxes=["checkbox 1"]}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-negative-example"]],decls:13,vars:1,consts:[[1,"docs-inverse-container"],["negative","true","checked","true"],["negative","true",3,"ngModelChange","ngModel"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3","disabled","true"]],template:function(i,r){i&1&&(t(0,"div",0)(1,"nx-checkbox",1),e(2,"I'm a single checkbox"),o(),E(3,"br"),t(4,"nx-checkbox-group",2),G("ngModelChange",function(s){return F(r.checkboxes,s)||(r.checkboxes=s),s}),t(5,"nx-label"),e(6,"This is a nx-checkbox-group"),o(),t(7,"nx-checkbox",3),e(8,"Checkbox 1"),o(),t(9,"nx-checkbox",4),e(10,"Checkbox 2"),o(),t(11,"nx-checkbox",5),e(12,"Checkbox 3"),o()()()),i&2&&(a(4),_("ngModel",r.checkboxes))},dependencies:[l,g,x,h,L,f],encapsulation:2})}}return n})();function Me(n,H){if(n&1&&(t(0,"pre"),e(1),o()),n&2){let m=O();a(),J(m.logMessage)}}var ne=(()=>{class n{constructor(){this.logMessage="",this.messages=[]}log(m){this.messages.push(m),this.logMessage=this.messages.join(`
`)}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-outputs-example"]],decls:7,vars:1,consts:[["checkboxTest",""],[1,"nx-margin-bottom-s",3,"checkboxChange","checkedChange","indeterminateChange"],["nxButton","small","type","button",3,"click"]],template:function(i,r){if(i&1){let y=ue();t(0,"nx-checkbox",1,0),R("checkboxChange",function(){return j(y),P(r.log("checkbox change occured"))})("checkedChange",function(){return j(y),P(r.log("checked change occured"))})("indeterminateChange",function(){return j(y),P(r.log("indeterminate change occured"))}),e(2,"Check me."),o(),t(3,"button",2),R("click",function(){j(y);let le=be(1);return P(le.indeterminate=!le.indeterminate)}),e(4,` Toggle Indeterminate
`),o(),E(5,"br"),q(6,Me,2,1,"pre")}i&2&&(a(6),W(r.logMessage?6:-1))},dependencies:[l,X],encapsulation:2})}}return n})();var ie=(()=>{class n{constructor(m){this.fb=m,this.testForm=this.fb.group({checkboxTestReactive:[!1,I.requiredTrue]})}static{this.\u0275fac=function(i){return new(i||n)(N(w))}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-reactive-example"]],decls:11,vars:7,consts:[[3,"formGroup"],["formControlName","checkboxTestReactive"]],template:function(i,r){i&1&&(t(0,"form",0)(1,"nx-checkbox",1),e(2," Check me. "),t(3,"nx-error"),e(4,"This field is required."),o()(),t(5,"p"),e(6),u(7,"json"),o(),t(8,"p"),e(9),u(10,"json"),o()()),i&2&&(p("formGroup",r.testForm),a(6),d("Form value: ",b(7,3,r.testForm.value),""),a(3),d("Form status: ",b(10,5,r.testForm.status),""))},dependencies:[x,k,h,C,D,M,T,l,S,V,fe],encapsulation:2})}}return n})();var re=(()=>{class n{constructor(){this.readonly=!0}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-readonly-example"]],decls:6,vars:3,consts:[[1,"nx-margin-bottom-s",3,"readonly"],["checked","",1,"nx-margin-bottom-s",3,"readonly"],["indeterminate","",3,"readonly"]],template:function(i,r){i&1&&(t(0,"nx-checkbox",0),e(1,` Readonly
`),o(),t(2,"nx-checkbox",1),e(3,` Readonly & checked
`),o(),t(4,"nx-checkbox",2),e(5,` Readonly & indeterminate
`),o()),i&2&&(p("readonly",r.readonly),a(2),p("readonly",r.readonly),a(2),p("readonly",r.readonly))},dependencies:[l],encapsulation:2,changeDetection:0})}}return n})();var me=(()=>{class n{constructor(){this.checkedRaw=!1}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-simple-binding-example"]],decls:4,vars:2,consts:[[1,"nx-margin-bottom-s",3,"checkedChange","checked"]],template:function(i,r){i&1&&(t(0,"form")(1,"nx-checkbox",0),G("checkedChange",function(s){return F(r.checkedRaw,s)||(r.checkedRaw=s),s}),e(2,"Check me."),o(),e(3),o()),i&2&&(a(),_("checked",r.checkedRaw),a(2),d(" Current Value: ",r.checkedRaw,`
`))},dependencies:[x,k,C,z,l],encapsulation:2})}}return n})();var ae=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-states-example"]],decls:24,vars:7,consts:[[1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-s",3,"checked"],[1,"nx-margin-bottom-s",3,"disabled"],[1,"nx-margin-bottom-s",3,"checked","disabled"],[1,"nx-margin-bottom-s",3,"indeterminate"],[1,"nx-margin-bottom-s",3,"indeterminate","disabled"]],template:function(i,r){i&1&&(t(0,"nx-checkbox",0),e(1," Default"),E(2,"br"),e(3,` The box is left unchecked.
`),o(),t(4,"nx-checkbox",1),e(5," Checked"),E(6,"br"),e(7,` An action or item is selected.
`),o(),t(8,"nx-checkbox",2),e(9," Disabled"),E(10,"br"),e(11,` The checkbox is inactive due to previously checked or unchecked boxes.
`),o(),t(12,"nx-checkbox",3),e(13," Checked & disabled"),E(14,"br"),e(15,` An action or item has been pre-selected due to previously checked or unchecked boxes.
`),o(),t(16,"nx-checkbox",4),e(17," Indeterminate"),E(18,"br"),e(19,` If all subordinate boxes are checked, the "mother checkbox" may be as well. But if only _some_ of them are, it's state is indeterminate, i.e. partially checked. This may come in handy if you work with nested checkboxes.
`),o(),t(20,"nx-checkbox",5),e(21," Indeterminate & disabled"),E(22,"br"),e(23,` The box is indeterminate and can not be interacted with directly, but only via checking all of the subordinate boxes nested below.
`),o()),i&2&&(a(4),p("checked",!0),a(4),p("disabled",!0),a(4),p("checked",!0)("disabled",!0),a(4),p("indeterminate",!0),a(4),p("indeterminate",!0)("disabled",!0))},dependencies:[l],encapsulation:2,changeDetection:0})}}return n})();var ce=(()=>{class n{constructor(){this.checked=!1}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=c({type:n,selectors:[["checkbox-template-driven-example"]],decls:4,vars:2,consts:[["name","checkboxTestTemplate",1,"nx-margin-bottom-s",3,"ngModelChange","ngModel"]],template:function(i,r){i&1&&(t(0,"form")(1,"nx-checkbox",0),G("ngModelChange",function(s){return F(r.checked,s)||(r.checked=s),s}),e(2,"Check me."),o(),e(3),o()),i&2&&(a(),_("ngModel",r.checked),a(2),d(" Current Value: ",r.checked,`
`))},dependencies:[x,k,h,C,L,z,l],encapsulation:2})}}return n})();var Te=[K,Q,Z,U,Y,$,ee,te,oe,ne,ie,me,ae,ce,re],eo=(()=>{class n{static components(){return{"checkbox-group-basic":K,"checkbox-group-dynamic":Q,"checkbox-group-layout":Z,"checkbox-group-inheritance":U,"checkbox-group-label-size":Y,"checkbox-group-reactive":$,"checkbox-group-validation":ee,"checkbox-label-size":te,"checkbox-negative":oe,"checkbox-outputs":ne,"checkbox-reactive":ie,"checkbox-simple-binding":me,"checkbox-states":ae,"checkbox-template-driven":ce,"checkbox-readonly":re}}static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275mod=se({type:n})}static{this.\u0275inj=pe({imports:[Se,Ne,Te]})}}return n})();export{eo as CheckboxExamplesModule};
