import{a as d,b as u,c as ee}from"./chunk-K2RDHYIY.js";import{a as $}from"./chunk-T4VR7U4O.js";import"./chunk-V2GIQTDI.js";import{b as B,d as c}from"./chunk-VNH2LNNI.js";import{d as N,f as b,g as C,i as X,k as K,l as h,o as R,r as M,v as D,z as T}from"./chunk-GMW4EXOW.js";import"./chunk-CVRHSVEA.js";import{a as U,b as Y,c as Z}from"./chunk-BTCMFK7Z.js";import"./chunk-GKO2YIZC.js";import"./chunk-BUOL5UUF.js";import"./chunk-4GZV3IXR.js";import{g as G}from"./chunk-6JU2CQFM.js";import"./chunk-SRJCRH4Z.js";import"./chunk-PCAWR2BZ.js";import"./chunk-BMNDC7WX.js";import{e as Q}from"./chunk-42NZUWZL.js";import"./chunk-6R5LQ6DD.js";import"./chunk-KMGCLTNG.js";import"./chunk-5JMKC4IX.js";import{o as H,x as J}from"./chunk-ZFTI3MAP.js";import{Fc as w,Gc as k,Nb as O,Pb as p,Xb as t,Yb as o,Zb as f,gc as z,ic as P,na as V,sc as W,tb as m,tc as i,ub as y,uc as q,vc as E,xc as j,ya as l,yc as A,za as L,zc as _}from"./chunk-3XU4BHLV.js";var te=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-example"]],decls:6,vars:0,consts:[["name","fruit",1,"nx-margin-bottom-m"],["name","fruit"]],template:function(n,s){n&1&&(t(0,"nx-radio",0),i(1,"Apples"),o(),t(2,"nx-radio",0),i(3,"Oranges"),o(),t(4,"nx-radio",1),i(5,"Bananas"),o())},dependencies:[d]});let a=e;return a})();var oe=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-disabled-example"]],decls:7,vars:0,consts:[["name","disabledTest","disabled","true"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,s){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"What do you prefer?"),o(),t(3,"nx-radio",2),i(4,"I like Apples"),o(),t(5,"nx-radio",3),i(6,"I like Oranges"),o()())},dependencies:[d,u,c]});let a=e;return a})();var ie=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({radioTestReactive:[null,N.required]})}};e.\u0275fac=function(n){return new(n||e)(y(T))},e.\u0275cmp=l({type:e,selectors:[["radio-button-error-retail-example"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],[1,"nx-margin-top-s"],["value","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(n,s){n&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),i(3,"What do you prefer?"),o(),t(4,"nx-error",3),i(5," Please make a choice. "),o(),t(6,"nx-radio",4),i(7,"Coffee"),o(),t(8,"nx-radio",5),i(9,"Tea"),o(),t(10,"nx-radio",6),i(11,"Water"),o()(),f(12,"br"),t(13,"button",7),i(14,"Submit"),o()()),n&2&&(p("formGroup",s.testForm),m(),p("required",!0),m(),p("size","small"),m(4),p("labelSize","small"),m(2),p("labelSize","small"),m(2),p("labelSize","small"))},dependencies:[d,u,B,c,h,b,C,D,R,M,G],changeDetection:0});let a=e;return a})();function ve(a,e){if(a&1&&(t(0,"pre"),i(1),o()),a&2){let xe=P();m(),q(xe.logMessage)}}var ne=(()=>{let e=class e{constructor(){this.messages=[]}log(r){this.messages.push(r),this.logMessage=this.messages.join(`
`)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-event-example"]],decls:9,vars:1,consts:[["name","singleRadioOutputTest",3,"groupValueChange"],[1,"nx-margin-bottom-m"],["value","option1",1,"nx-margin-bottom-m",3,"valueChange"],["value","option2",3,"valueChange"],[4,"ngIf"]],template:function(n,s){n&1&&(t(0,"nx-radio-group",0),z("groupValueChange",function(v){return s.log("groupValueChange occured: "+v.value)}),t(1,"nx-label",1),i(2,"This is a nx-radio-group label"),o(),t(3,"nx-radio",2),z("valueChange",function(v){return s.log("nxValueChange occured: "+v.value)}),i(4," Option 1 "),o(),t(5,"nx-radio",3),z("valueChange",function(v){return s.log("nxValueChange occured: "+v.value)}),i(6," Option 2 "),o()(),f(7,"br"),O(8,ve,2,1,"pre",4)),n&2&&(m(8),p("ngIf",s.logMessage))},dependencies:[d,u,c,H]});let a=e;return a})();var ae=(()=>{let e=class e{constructor(){this.templateModel="apples"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-form-example"]],decls:10,vars:2,consts:[["name","templateTest",3,"ngModelChange","ngModel"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,s){n&1&&(t(0,"form")(1,"nx-radio-group",0),_("ngModelChange",function(v){return A(s.templateModel,v)||(s.templateModel=v),v}),t(2,"nx-label",1),i(3,"What do you prefer?"),o(),t(4,"nx-radio",2),i(5,"I like Apples"),o(),t(6,"nx-radio",3),i(7,"I like Oranges"),o()(),t(8,"p"),i(9),o()()),n&2&&(m(),j("ngModel",s.templateModel),m(8),E("Current Value: ",s.templateModel,""))},dependencies:[d,u,c,h,b,C,K,X]});let a=e;return a})();var re=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-example"]],decls:7,vars:0,consts:[["name","myGroup"],[1,"nx-margin-bottom-m"],["value","1",1,"nx-margin-bottom-m"],["value","2"]],template:function(n,s){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"This is a nx-radio-group"),o(),t(3,"nx-radio",2),i(4,"Select 1"),o(),t(5,"nx-radio",3),i(6,"Select 2"),o()())},dependencies:[d,u,c]});let a=e;return a})();var me=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-horizontal-example"]],decls:26,vars:1,consts:[["group",""],["name","myGroup"],[1,"nx-margin-bottom-m"],["nxLayout","grid"],["nxRow",""],["nxCol","12,6,4,3"],["value","1",1,"nx-margin-bottom-s"],["value","2",1,"nx-margin-bottom-s"],["value","3",1,"nx-margin-bottom-s"],["value","4",1,"nx-margin-bottom-s"],["value","5",1,"nx-margin-bottom-s"],["value","6",1,"nx-margin-bottom-s"],[1,"nx-margin-top-s"]],template:function(n,s){if(n&1&&(t(0,"nx-radio-group",1,0)(2,"nx-label",2),i(3,"This is a nx-radio-group"),o(),t(4,"div",3)(5,"div",4)(6,"div",5)(7,"nx-radio",6),i(8," Radio 1 "),o()(),t(9,"div",5)(10,"nx-radio",7),i(11," Radio 2 "),o()(),t(12,"div",5)(13,"nx-radio",8),i(14," Radio 3 "),o()(),t(15,"div",5)(16,"nx-radio",9),i(17," Radio 4 "),o()(),t(18,"div",5)(19,"nx-radio",10),i(20," Radio 5 "),o()(),t(21,"div",5)(22,"nx-radio",11),i(23," Radio 6 "),o()()()()(),t(24,"pre",12),i(25),o()),n&2){let F=W(1);m(25),E("selected value: ",F.value,"")}},dependencies:[d,u,c,U,Z,Y]});let a=e;return a})();var le=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-label-size-example"]],decls:7,vars:3,consts:[["name","labelSize"],[3,"size"],["value","choice1",1,"nx-margin-bottom-s",3,"labelSize"],["value","choice2",3,"labelSize"]],template:function(n,s){n&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),i(2,"This is an expert label for the radio button group"),o(),t(3,"nx-radio",2),i(4,"Choice 1"),o(),t(5,"nx-radio",3),i(6,"Choice 2"),o()()),n&2&&(m(),p("size","small"),m(2),p("labelSize","small"),m(2),p("labelSize","small"))},dependencies:[d,u,c],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let a=e;return a})();var pe=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({radioTestReactive:[null,N.required]})}};e.\u0275fac=function(n){return new(n||e)(y(T))},e.\u0275cmp=l({type:e,selectors:[["radio-button-group-validation-example"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],["appearance","text",1,"nx-margin-top-s"],["value","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(n,s){n&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),i(3,"What do you prefer?"),o(),t(4,"nx-error",3),i(5," Please make a choice. "),o(),t(6,"nx-radio",4),i(7,"Coffee"),o(),t(8,"nx-radio",5),i(9,"Tea"),o(),t(10,"nx-radio",6),i(11,"Water"),o()(),f(12,"br"),t(13,"button",7),i(14,"Submit"),o()()),n&2&&(p("formGroup",s.testForm),m(),p("required",!0),m(),p("size","small"),m(4),p("labelSize","small"),m(2),p("labelSize","small"),m(2),p("labelSize","small"))},dependencies:[d,u,B,c,h,b,C,D,R,M,G],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]});let a=e;return a})();var de=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-negative-example"]],decls:9,vars:0,consts:[[1,"docs-inverse-container"],["name","negativeGroup","negative","true"],["value","1",1,"nx-margin-bottom-m"],["value","2"],["name","weight","negative","true"]],template:function(n,s){n&1&&(t(0,"div",0)(1,"nx-radio-group",1)(2,"nx-radio",2),i(3,"Radio 1"),o(),t(4,"nx-radio",3),i(5,"Radio 2"),o()(),f(6,"br"),t(7,"nx-radio",4),i(8,"Single negative radio"),o()())},dependencies:[d,u]});let a=e;return a})();var se=(()=>{let e=class e{constructor(r){this.fb=r,this.testForm=this.fb.group({radioTestReactive:["oranges",N.required]})}};e.\u0275fac=function(n){return new(n||e)(y(T))},e.\u0275cmp=l({type:e,selectors:[["radio-button-reactive-example"]],decls:14,vars:7,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(n,s){n&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),i(3,"What do you prefer?"),o(),t(4,"nx-radio",3),i(5,"I like Apples"),o(),t(6,"nx-radio",4),i(7,"I like Oranges"),o()(),t(8,"p"),i(9),w(10,"json"),o(),t(11,"p"),i(12),w(13,"json"),o()()),n&2&&(p("formGroup",s.testForm),m(9),E("Form value: ",k(10,3,s.testForm.value),""),m(3),E("Form status: ",k(13,5,s.testForm.status),""))},dependencies:[d,u,c,h,b,C,R,M,J]});let a=e;return a})();var ue=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-sample-example"]],decls:19,vars:4,consts:[["name","group1"],["name","group1",3,"checked"],["name","group1",3,"disabled"],["name","group2",3,"checked","disabled"]],template:function(n,s){n&1&&(t(0,"h3"),i(1,"The radio button hasn't been clicked."),o(),t(2,"nx-radio",0),i(3,"Default"),o(),f(4,"br"),t(5,"h3"),i(6,"An action or item is selected."),o(),t(7,"nx-radio",1),i(8,"Checked"),o(),f(9,"br"),t(10,"h3"),i(11,"The button is inactive due to previously checked or unchecked options."),o(),t(12,"nx-radio",2),i(13,"Disabled"),o(),f(14,"br"),t(15,"h3"),i(16,` An action or item has been pre-selected due to previously checked or unchecked options.
`),o(),t(17,"nx-radio",3),i(18,"Checked & disabled"),o()),n&2&&(m(7),p("checked",!0),m(5),p("disabled",!0),m(5),p("checked",!0)("disabled",!0))},dependencies:[d]});let a=e;return a})();var ce=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=l({type:e,selectors:[["radio-button-sizes-example"]],decls:4,vars:0,consts:[["name","size","labelSize","small",1,"nx-margin-bottom-m"],["name","size"]],template:function(n,s){n&1&&(t(0,"nx-radio",0),i(1,"Radio with a small label"),o(),t(2,"nx-radio",1),i(3,"Radio with a big label (default)"),o())},dependencies:[d]});let a=e;return a})();var Ye=(()=>{let e=class e{static components(){return{"radio-button-error-retail":ie,"radio-button":te,"radio-button-disabled":oe,"radio-button-event":ne,"radio-button-form":ae,"radio-button-group":re,"radio-button-group-horizontal":me,"radio-button-group-label-size":le,"radio-button-group-validation":pe,"radio-button-negative":de,"radio-button-reactive":se,"radio-button-sample":ue,"radio-button-sizes":ce}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=L({type:e}),e.\u0275inj=V({imports:[ee,Q,$]});let a=e;return a})();export{Ye as RadioExamplesModule};
