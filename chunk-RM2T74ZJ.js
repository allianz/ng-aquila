import{a as u,b as p,c as U}from"./chunk-BW7CTUYJ.js";import{a as Q}from"./chunk-5VU5TOTY.js";import"./chunk-NTZM3PIK.js";import{b as K,d as c}from"./chunk-6G5NCPWS.js";import{d as M,f as S,g as E,i as H,k as J,l as y,o as T,r as F,v as X,x as D}from"./chunk-GP7FEQRA.js";import"./chunk-U7EIQOJW.js";import{a as A,b as q,c as W}from"./chunk-EGRHPY7Q.js";import"./chunk-S7LJ5NW7.js";import"./chunk-AZNKYEEF.js";import"./chunk-ATMVZSAN.js";import{g as _}from"./chunk-5RFPKINN.js";import"./chunk-PNCA27QO.js";import"./chunk-K3MRPJ7U.js";import"./chunk-5CERBW6K.js";import{e as j}from"./chunk-AGQ4ALMF.js";import"./chunk-LK5X6SR6.js";import"./chunk-7ONGEGSB.js";import"./chunk-2BGO346T.js";import{o as L,x as P}from"./chunk-UUZACKYZ.js";import{Eb as s,Kb as k,Lb as t,Mb as o,Nb as g,Yb as h,_b as I,ec as V,fc as i,gc as O,hc as b,ma as B,sc as z,tb as m,tc as G,ua as l,ub as R,va as w}from"./chunk-QYP2T7PT.js";var Y=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-example"]],decls:6,vars:0,consts:[["name","fruit",1,"nx-margin-bottom-m"],["name","fruit"]],template:function(n,d){n&1&&(t(0,"nx-radio",0),i(1,"Apples"),o(),t(2,"nx-radio",0),i(3,"Oranges"),o(),t(4,"nx-radio",1),i(5,"Bananas"),o())},dependencies:[p]});let a=e;return a})();var Z=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-disabled-example"]],decls:7,vars:0,consts:[["name","disabledTest","disabled","true"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,d){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"What do you prefer?"),o(),t(3,"nx-radio",2),i(4,"I like Apples"),o(),t(5,"nx-radio",3),i(6,"I like Oranges"),o()())},dependencies:[p,u,c]});let a=e;return a})();function ue(a,e){if(a&1&&(t(0,"pre"),i(1),o()),a&2){let de=I();m(1),O(de.logMessage)}}var $=(()=>{let e=class e{constructor(){this.messages=[]}log(r){this.messages.push(r),this.logMessage=this.messages.join(`
`)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-event-example"]],decls:9,vars:1,consts:[["name","singleRadioOutputTest",3,"groupValueChange"],[1,"nx-margin-bottom-m"],["value","option1",1,"nx-margin-bottom-m",3,"valueChange"],["value","option2",3,"valueChange"],[4,"ngIf"]],template:function(n,d){n&1&&(t(0,"nx-radio-group",0),h("groupValueChange",function(v){return d.log("groupValueChange occured: "+v.value)}),t(1,"nx-label",1),i(2,"This is a nx-radio-group label"),o(),t(3,"nx-radio",2),h("valueChange",function(v){return d.log("nxValueChange occured: "+v.value)}),i(4," Option 1 "),o(),t(5,"nx-radio",3),h("valueChange",function(v){return d.log("nxValueChange occured: "+v.value)}),i(6," Option 2 "),o()(),g(7,"br"),k(8,ue,2,1,"pre",4)),n&2&&(m(8),s("ngIf",d.logMessage))},dependencies:[p,u,c,L]});let a=e;return a})();var te=(()=>{let e=class e{constructor(){this.templateModel="apples"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-form-example"]],decls:10,vars:2,consts:[["name","templateTest",3,"ngModel","ngModelChange"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,d){n&1&&(t(0,"form")(1,"nx-radio-group",0),h("ngModelChange",function(v){return d.templateModel=v}),t(2,"nx-label",1),i(3,"What do you prefer?"),o(),t(4,"nx-radio",2),i(5,"I like Apples"),o(),t(6,"nx-radio",3),i(7,"I like Oranges"),o()(),t(8,"p"),i(9),o()()),n&2&&(m(1),s("ngModel",d.templateModel),m(8),b("Current Value: ",d.templateModel,""))},dependencies:[p,u,c,y,S,E,J,H]});let a=e;return a})();var oe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-example"]],decls:7,vars:0,consts:[["name","myGroup"],[1,"nx-margin-bottom-m"],["value","1",1,"nx-margin-bottom-m"],["value","2"]],template:function(n,d){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"This is a nx-radio-group"),o(),t(3,"nx-radio",2),i(4,"Select 1"),o(),t(5,"nx-radio",3),i(6,"Select 2"),o()())},dependencies:[p,u,c]});let a=e;return a})();var ie=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-horizontal-example"]],decls:26,vars:1,consts:[["name","myGroup"],["group",""],[1,"nx-margin-bottom-m"],["nxLayout","grid"],["nxRow",""],["nxCol","12,6,4,3"],["value","1",1,"nx-margin-bottom-s"],["value","2",1,"nx-margin-bottom-s"],["value","3",1,"nx-margin-bottom-s"],["value","4",1,"nx-margin-bottom-s"],["value","5",1,"nx-margin-bottom-s"],["value","6",1,"nx-margin-bottom-s"],[1,"nx-margin-top-s"]],template:function(n,d){if(n&1&&(t(0,"nx-radio-group",0,1)(2,"nx-label",2),i(3,"This is a nx-radio-group"),o(),t(4,"div",3)(5,"div",4)(6,"div",5)(7,"nx-radio",6),i(8," Radio 1 "),o()(),t(9,"div",5)(10,"nx-radio",7),i(11," Radio 2 "),o()(),t(12,"div",5)(13,"nx-radio",8),i(14," Radio 3 "),o()(),t(15,"div",5)(16,"nx-radio",9),i(17," Radio 4 "),o()(),t(18,"div",5)(19,"nx-radio",10),i(20," Radio 5 "),o()(),t(21,"div",5)(22,"nx-radio",11),i(23," Radio 6 "),o()()()()(),t(24,"pre",12),i(25),o()),n&2){let N=V(1);m(25),b("selected value: ",N.value,"")}},dependencies:[p,u,c,A,W,q]});let a=e;return a})();var ne=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-label-size-example"]],decls:7,vars:3,consts:[["name","labelSize"],[3,"size"],["value","choice1",1,"nx-margin-bottom-s",3,"labelSize"],["value","choice2",3,"labelSize"]],template:function(n,d){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"This is an expert label for the radio button group"),o(),t(3,"nx-radio",2),i(4,"Choice 1"),o(),t(5,"nx-radio",3),i(6,"Choice 2"),o()()),n&2&&(m(1),s("size","small"),m(2),s("labelSize","small"),m(2),s("labelSize","small"))},dependencies:[p,u,c],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let a=e;return a})();var ae=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({radioTestReactive:[null,M.required]})}};e.\u0275fac=function(n){return new(n||e)(R(D))},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-validation-example"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],["appearance","text"],["value","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(n,d){n&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),i(3,"What do you prefer?"),o(),t(4,"nx-error",3),i(5," Please make a choice. "),o(),t(6,"nx-radio",4),i(7,"Coffee"),o(),t(8,"nx-radio",5),i(9,"Tea"),o(),t(10,"nx-radio",6),i(11,"Water"),o()(),g(12,"br"),t(13,"button",7),i(14,"Submit"),o()()),n&2&&(s("formGroup",d.testForm),m(1),s("required",!0),m(1),s("size","small"),m(4),s("labelSize","small"),m(2),s("labelSize","small"),m(2),s("labelSize","small"))},dependencies:[p,u,K,c,y,S,E,X,T,F,_],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let a=e;return a})();var re=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-negative-example"]],decls:9,vars:0,consts:[[1,"docs-inverse-container"],["name","negativeGroup","negative","true"],["value","1",1,"nx-margin-bottom-m"],["value","2"],["name","weight","negative","true"]],template:function(n,d){n&1&&(t(0,"div",0)(1,"nx-radio-group",1)(2,"nx-radio",2),i(3,"Radio 1"),o(),t(4,"nx-radio",3),i(5,"Radio 2"),o()(),g(6,"br"),t(7,"nx-radio",4),i(8,"Single negative radio"),o()())},dependencies:[p,u]});let a=e;return a})();var me=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({radioTestReactive:["oranges",M.required]})}};e.\u0275fac=function(n){return new(n||e)(R(D))},e.\u0275cmp=l({type:e,selectors:[["radio-button-reactive-example"]],decls:14,vars:7,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,d){n&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),i(3,"What do you prefer?"),o(),t(4,"nx-radio",3),i(5,"I like Apples"),o(),t(6,"nx-radio",4),i(7,"I like Oranges"),o()(),t(8,"p"),i(9),z(10,"json"),o(),t(11,"p"),i(12),z(13,"json"),o()()),n&2&&(s("formGroup",d.testForm),m(9),b("Form value: ",G(10,3,d.testForm.value),""),m(3),b("Form status: ",G(13,5,d.testForm.status),""))},dependencies:[p,u,c,y,S,E,T,F,P]});let a=e;return a})();var le=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-sample-example"]],decls:19,vars:4,consts:[["name","group1"],["name","group1",3,"checked"],["name","group1",3,"disabled"],["name","group2",3,"checked","disabled"]],template:function(n,d){n&1&&(t(0,"h3"),i(1,"The radio button hasn't been clicked."),o(),t(2,"nx-radio",0),i(3,"Default"),o(),g(4,"br"),t(5,"h3"),i(6,"An action or item is selected."),o(),t(7,"nx-radio",1),i(8,"Checked"),o(),g(9,"br"),t(10,"h3"),i(11,"The button is inactive due to previously checked or unchecked options."),o(),t(12,"nx-radio",2),i(13,"Disabled"),o(),g(14,"br"),t(15,"h3"),i(16,` An action or item has been pre-selected due to previously checked or unchecked options.
`),o(),t(17,"nx-radio",3),i(18,"Checked & disabled"),o()),n&2&&(m(7),s("checked",!0),m(5),s("disabled",!0),m(5),s("checked",!0)("disabled",!0))},dependencies:[p]});let a=e;return a})();var pe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-sizes-example"]],decls:4,vars:0,consts:[["name","size","labelSize","small",1,"nx-margin-bottom-m"],["name","size"]],template:function(n,d){n&1&&(t(0,"nx-radio",0),i(1,"Radio with a small label"),o(),t(2,"nx-radio",1),i(3,"Radio with a big label (default)"),o())},dependencies:[p]});let a=e;return a})();var We=(()=>{let e=class e{static components(){return{"radio-button":Y,"radio-button-disabled":Z,"radio-button-event":$,"radio-button-form":te,"radio-button-group":oe,"radio-button-group-horizontal":ie,"radio-button-group-label-size":ne,"radio-button-group-validation":ae,"radio-button-negative":re,"radio-button-reactive":me,"radio-button-sample":le,"radio-button-sizes":pe}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=w({type:e}),e.\u0275inj=B({imports:[U,j,Q]});let a=e;return a})();export{We as RadioExamplesModule};
