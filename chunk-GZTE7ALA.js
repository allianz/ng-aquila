import{a as s,b as l,c as D}from"./chunk-ZAG7AW3D.js";import{a as ce}from"./chunk-65GLPSAG.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import{b as z,e as u}from"./chunk-KTZ2MV5R.js";import{A as y,B as N,d as E,g as f,h as g,j as me,l as le,m as v,p as h,s as R,w as G,y as S}from"./chunk-3CXM22DE.js";import"./chunk-DZRQJYOJ.js";import{a as de,b as se,c as ue}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import{d as T}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{e as pe}from"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{v as re}from"./chunk-CCSED5RY.js";import{Lb as m,Lc as te,Mb as Y,Mc as n,Nc as oe,Oc as M,Qc as ne,Rb as Z,Rc as ie,Sc as ae,Xc as w,Yc as k,bc as d,gc as $,ka as U,lc as t,mc as o,nc as x,wb as r,wc as F,xb as b,yc as ee}from"./chunk-LG2ZA55B.js";var V=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-example"]],decls:6,vars:0,consts:[["name","fruit",1,"nx-margin-bottom-m"],["name","fruit"]],template:function(i,p){i&1&&(t(0,"nx-radio",0),n(1,"Apples"),o(),t(2,"nx-radio",0),n(3,"Oranges"),o(),t(4,"nx-radio",1),n(5,"Bananas"),o())},dependencies:[l],encapsulation:2})}}return e})();var I=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-disabled-example"]],decls:7,vars:0,consts:[["name","disabledTest","disabled","true"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(i,p){i&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),n(2,"What do you prefer?"),o(),t(3,"nx-radio",2),n(4,"I like Apples"),o(),t(5,"nx-radio",3),n(6,"I like Oranges"),o()())},dependencies:[s,u,l],encapsulation:2})}}return e})();var L=(()=>{class e{constructor(a){this.fb=a,this.testForm=this.fb.group({radioTestReactive:[null,E.required]})}static{this.\u0275fac=function(i){return new(i||e)(b(S))}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-error-retail-example"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],[1,"nx-margin-top-s"],["value","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(i,p){i&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),n(3,"What do you prefer?"),o(),t(4,"nx-error",3),n(5," Please make a choice. "),o(),t(6,"nx-radio",4),n(7,"Coffee"),o(),t(8,"nx-radio",5),n(9,"Tea"),o(),t(10,"nx-radio",6),n(11,"Water"),o()(),x(12,"br"),t(13,"button",7),n(14,"Submit"),o()()),i&2&&(d("formGroup",p.testForm),r(),d("required",!0),r(),d("size","small"),r(4),d("labelSize","small"),r(2),d("labelSize","small"),r(2),d("labelSize","small"))},dependencies:[N,v,f,g,G,h,R,D,l,s,z,u,T],encapsulation:2,changeDetection:0})}}return e})();function xe(e,ge){if(e&1&&(t(0,"pre"),n(1),o()),e&2){let a=ee();r(),oe(a.logMessage)}}var O=(()=>{class e{constructor(){this.messages=[]}log(a){this.messages.push(a),this.logMessage=this.messages.join(`
`)}static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-event-example"]],decls:9,vars:1,consts:[["name","singleRadioOutputTest",3,"groupValueChange"],[1,"nx-margin-bottom-m"],["value","option1",1,"nx-margin-bottom-m",3,"valueChange"],["value","option2",3,"valueChange"]],template:function(i,p){i&1&&(t(0,"nx-radio-group",0),F("groupValueChange",function(C){return p.log("groupValueChange occured: "+C.value)}),t(1,"nx-label",1),n(2,"This is a nx-radio-group label"),o(),t(3,"nx-radio",2),F("valueChange",function(C){return p.log("nxValueChange occured: "+C.value)}),n(4," Option 1 "),o(),t(5,"nx-radio",3),F("valueChange",function(C){return p.log("nxValueChange occured: "+C.value)}),n(6," Option 2 "),o()(),x(7,"br"),Z(8,xe,2,1,"pre")),i&2&&(r(8),$(p.logMessage?8:-1))},dependencies:[s,u,l],encapsulation:2})}}return e})();var P=(()=>{class e{constructor(){this.templateModel="apples"}static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-form-example"]],decls:10,vars:2,consts:[["name","templateTest",3,"ngModelChange","ngModel"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(i,p){i&1&&(t(0,"form")(1,"nx-radio-group",0),ae("ngModelChange",function(C){return ie(p.templateModel,C)||(p.templateModel=C),C}),t(2,"nx-label",1),n(3,"What do you prefer?"),o(),t(4,"nx-radio",2),n(5,"I like Apples"),o(),t(6,"nx-radio",3),n(7,"I like Oranges"),o()(),t(8,"p"),n(9),o()()),i&2&&(r(),ne("ngModel",p.templateModel),r(8),M("Current Value: ",p.templateModel,""))},dependencies:[y,v,f,g,le,me,s,u,l],encapsulation:2})}}return e})();var W=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-group-example"]],decls:7,vars:0,consts:[["name","myGroup"],[1,"nx-margin-bottom-m"],["value","1",1,"nx-margin-bottom-m"],["value","2"]],template:function(i,p){i&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),n(2,"This is a nx-radio-group"),o(),t(3,"nx-radio",2),n(4,"Select 1"),o(),t(5,"nx-radio",3),n(6,"Select 2"),o()())},dependencies:[s,u,l],encapsulation:2})}}return e})();var q=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-group-horizontal-example"]],decls:26,vars:1,consts:[["group",""],["name","myGroup"],[1,"nx-margin-bottom-m"],["nxLayout","grid"],["nxRow",""],["nxCol","12,6,4,3"],["value","1",1,"nx-margin-bottom-s"],["value","2",1,"nx-margin-bottom-s"],["value","3",1,"nx-margin-bottom-s"],["value","4",1,"nx-margin-bottom-s"],["value","5",1,"nx-margin-bottom-s"],["value","6",1,"nx-margin-bottom-s"],[1,"nx-margin-top-s"]],template:function(i,p){if(i&1&&(t(0,"nx-radio-group",1,0)(2,"nx-label",2),n(3,"This is a nx-radio-group"),o(),t(4,"div",3)(5,"div",4)(6,"div",5)(7,"nx-radio",6),n(8," Radio 1 "),o()(),t(9,"div",5)(10,"nx-radio",7),n(11," Radio 2 "),o()(),t(12,"div",5)(13,"nx-radio",8),n(14," Radio 3 "),o()(),t(15,"div",5)(16,"nx-radio",9),n(17," Radio 4 "),o()(),t(18,"div",5)(19,"nx-radio",10),n(20," Radio 5 "),o()(),t(21,"div",5)(22,"nx-radio",11),n(23," Radio 6 "),o()()()()(),t(24,"pre",12),n(25),o()),i&2){let B=te(1);r(25),M("selected value: ",B.value,"")}},dependencies:[s,u,de,se,ue,l],encapsulation:2})}}return e})();var j=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-group-label-size-example"]],decls:7,vars:3,consts:[["name","labelSize"],[3,"size"],["value","choice1",1,"nx-margin-bottom-s",3,"labelSize"],["value","choice2",3,"labelSize"]],template:function(i,p){i&1&&(t(0,"nx-radio-group",0)(1,"nx-label",1),n(2,"This is an expert label for the radio button group"),o(),t(3,"nx-radio",2),n(4,"Choice 1"),o(),t(5,"nx-radio",3),n(6,"Choice 2"),o()()),i&2&&(r(),d("size","small"),r(2),d("labelSize","small"),r(2),d("labelSize","small"))},dependencies:[s,u,l],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]})}}return e})();var A=(()=>{class e{constructor(a){this.fb=a,this.testForm=this.fb.group({radioTestReactive:[null,E.required]})}static{this.\u0275fac=function(i){return new(i||e)(b(S))}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-group-validation-example"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],["appearance","text",1,"nx-margin-top-s"],["value","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["value","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(i,p){i&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),n(3,"What do you prefer?"),o(),t(4,"nx-error",3),n(5," Please make a choice. "),o(),t(6,"nx-radio",4),n(7,"Coffee"),o(),t(8,"nx-radio",5),n(9,"Tea"),o(),t(10,"nx-radio",6),n(11,"Water"),o()(),x(12,"br"),t(13,"button",7),n(14,"Submit"),o()()),i&2&&(d("formGroup",p.testForm),r(),d("required",!0),r(),d("size","small"),r(4),d("labelSize","small"),r(2),d("labelSize","small"),r(2),d("labelSize","small"))},dependencies:[y,v,f,g,G,N,h,R,s,u,z,l,T],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]})}}return e})();var H=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-negative-example"]],decls:9,vars:0,consts:[[1,"docs-inverse-container"],["name","negativeGroup","negative","true"],["value","1",1,"nx-margin-bottom-m"],["value","2"],["name","weight","negative","true"]],template:function(i,p){i&1&&(t(0,"div",0)(1,"nx-radio-group",1)(2,"nx-radio",2),n(3,"Radio 1"),o(),t(4,"nx-radio",3),n(5,"Radio 2"),o()(),x(6,"br"),t(7,"nx-radio",4),n(8,"Single negative radio"),o()())},dependencies:[s,l],encapsulation:2})}}return e})();var J=(()=>{class e{constructor(a){this.fb=a,this.testForm=this.fb.group({radioTestReactive:["oranges",E.required]})}static{this.\u0275fac=function(i){return new(i||e)(b(S))}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-reactive-example"]],decls:14,vars:7,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(i,p){i&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),n(3,"What do you prefer?"),o(),t(4,"nx-radio",3),n(5,"I like Apples"),o(),t(6,"nx-radio",4),n(7,"I like Oranges"),o()(),t(8,"p"),n(9),w(10,"json"),o(),t(11,"p"),n(12),w(13,"json"),o()()),i&2&&(d("formGroup",p.testForm),r(9),M("Form value: ",k(10,3,p.testForm.value),""),r(3),M("Form status: ",k(13,5,p.testForm.status),""))},dependencies:[y,v,f,g,N,h,R,s,u,l,re],encapsulation:2})}}return e})();var X=(()=>{class e{constructor(a){this.fb=a,this.testForm=this.fb.group({radioTestReactive:["oranges",E.required]})}static{this.\u0275fac=function(i){return new(i||e)(b(S))}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-readonly-example"]],decls:8,vars:2,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"readonly"],[1,"nx-margin-bottom-m"],["value","apples",1,"nx-margin-bottom-m"],["value","oranges"]],template:function(i,p){i&1&&(t(0,"form",0)(1,"nx-radio-group",1)(2,"nx-label",2),n(3,"What do you prefer?"),o(),t(4,"nx-radio",3),n(5,"I like Apples"),o(),t(6,"nx-radio",4),n(7,"I like Oranges"),o()()()),i&2&&(d("formGroup",p.testForm),r(),d("readonly",!0))},dependencies:[y,v,f,g,N,h,R,s,u,l],encapsulation:2,changeDetection:0})}}return e})();var K=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-sample-example"]],decls:19,vars:4,consts:[["name","group1"],["name","group1",3,"checked"],["name","group1",3,"disabled"],["name","group2",3,"checked","disabled"]],template:function(i,p){i&1&&(t(0,"h3"),n(1,"The radio button hasn't been clicked."),o(),t(2,"nx-radio",0),n(3,"Default"),o(),x(4,"br"),t(5,"h3"),n(6,"An action or item is selected."),o(),t(7,"nx-radio",1),n(8,"Checked"),o(),x(9,"br"),t(10,"h3"),n(11,"The button is inactive due to previously checked or unchecked options."),o(),t(12,"nx-radio",2),n(13,"Disabled"),o(),x(14,"br"),t(15,"h3"),n(16,` An action or item has been pre-selected due to previously checked or unchecked options.
`),o(),t(17,"nx-radio",3),n(18,"Checked & disabled"),o()),i&2&&(r(7),d("checked",!0),r(5),d("disabled",!0),r(5),d("checked",!0)("disabled",!0))},dependencies:[l],encapsulation:2})}}return e})();var Q=(()=>{class e{static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275cmp=m({type:e,selectors:[["radio-button-sizes-example"]],decls:4,vars:0,consts:[["name","size","labelSize","small",1,"nx-margin-bottom-m"],["name","size"]],template:function(i,p){i&1&&(t(0,"nx-radio",0),n(1,"Radio with a small label"),o(),t(2,"nx-radio",1),n(3,"Radio with a big label (default)"),o())},dependencies:[l],encapsulation:2})}}return e})();var fe=[X,L,V,I,O,P,W,q,j,A,H,J,K,Q],Ft=(()=>{class e{static components(){return{"radio-button-readonly":X,"radio-button-error-retail":L,"radio-button":V,"radio-button-disabled":I,"radio-button-event":O,"radio-button-form":P,"radio-button-group":W,"radio-button-group-horizontal":q,"radio-button-group-label-size":j,"radio-button-group-validation":A,"radio-button-negative":H,"radio-button-reactive":J,"radio-button-sample":K,"radio-button-sizes":Q}}static{this.\u0275fac=function(i){return new(i||e)}}static{this.\u0275mod=Y({type:e})}static{this.\u0275inj=U({imports:[D,pe,ce,fe]})}}return e})();export{Ft as RadioExamplesModule};
