import{a as l,b as P}from"./chunk-ZL23XLWQ.js";import{a as V}from"./chunk-JVFBSPNC.js";import"./chunk-5V76OGMQ.js";import{d as S,f as h,g as w,i as L,k as R,l as x,o as C,r as b,x as y}from"./chunk-MNAWWTKB.js";import"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import"./chunk-JQRF2ONG.js";import{g as M}from"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{x as j}from"./chunk-GHZ7IFWX.js";import{Dc as F,Ec as E,Pb as c,Vb as o,Wb as r,ec as v,na as T,rc as n,tb as p,tc as u,ub as g,vc as B,wc as G,xc as I,ya as s,za as k}from"./chunk-O56WLCF2.js";var W=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-default-example"]],decls:2,vars:1,consts:[[3,"checked"]],template:function(t,a){t&1&&(o(0,"nx-switcher",0),n(1,"Switcher default"),r()),t&2&&c("checked",!0)},dependencies:[l]});let i=e;return i})();var z=(()=>{let e=class e{constructor(m){this.fb=m,this.checked=!0,this.templateModel=!1,this.testForm=this.fb.group({switcherDisabledReactive:[!1,S.requiredTrue]}),this.testForm.disable()}switchStatusClick(){this.testForm.disabled?this.testForm.enable():this.testForm.disable()}};e.\u0275fac=function(t){return new(t||e)(g(y))},e.\u0275cmp=s({type:e,selectors:[["switcher-disabled-example"]],decls:5,vars:1,consts:[["novalidate","",3,"formGroup"],["big","true","formControlName","switcherDisabledReactive"],["nxButton","primary small","type","button",1,"nx-margin-top-m",3,"click"]],template:function(t,a){t&1&&(o(0,"form",0)(1,"nx-switcher",1),n(2," big disabled switcher "),r()(),o(3,"button",2),v("click",function(){return a.switchStatusClick()}),n(4,` Toggle disabled
`),r()),t&2&&c("formGroup",a.testForm)},dependencies:[l,x,h,w,C,b,M]});let i=e;return i})();var A=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-label-left-example"]],decls:2,vars:1,consts:[["labelPosition","left",3,"checked"]],template:function(t,a){t&1&&(o(0,"nx-switcher",0),n(1,"Switcher label left"),r()),t&2&&c("checked",!0)},dependencies:[l]});let i=e;return i})();var J=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-label-small-example"]],decls:2,vars:1,consts:[["labelSize","small",3,"checked"]],template:function(t,a){t&1&&(o(0,"nx-switcher",0),n(1,"Switcher label small"),r()),t&2&&c("checked",!0)},dependencies:[l]});let i=e;return i})();var X=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-large-example"]],decls:2,vars:2,consts:[[3,"big","checked"]],template:function(t,a){t&1&&(o(0,"nx-switcher",0),n(1,"Switcher large"),r()),t&2&&c("big",!0)("checked",!0)},dependencies:[l]});let i=e;return i})();var H=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-negative-example"]],decls:3,vars:2,consts:[[1,"docs-inverse-container"],[3,"checked","negative"]],template:function(t,a){t&1&&(o(0,"div",0)(1,"nx-switcher",1),n(2,"Switcher negative"),r()()),t&2&&(p(),c("checked",!0)("negative",!0))},dependencies:[l]});let i=e;return i})();var K=(()=>{let e=class e{constructor(m){this.fb=m,this.testForm=this.fb.group({switcherTestReactive:[!1,S.requiredTrue]}),this.isSubmitted=!1}onSubmit(){this.isSubmitted=!0}};e.\u0275fac=function(t){return new(t||e)(g(y))},e.\u0275cmp=s({type:e,selectors:[["switcher-reactive-form-example"]],decls:13,vars:8,consts:[[3,"ngSubmit","formGroup"],["name","reactiveTest","formControlName","switcherTestReactive"],["nxButton","primary small","type","submit",1,"nx-margin-top-m"],[1,"nx-margin-bottom-0"],[1,"nx-margin-y-0"]],template:function(t,a){t&1&&(o(0,"form",0),v("ngSubmit",function(){return a.onSubmit()}),o(1,"nx-switcher",1),n(2," switcher label "),r(),o(3,"button",2),n(4," submit "),r(),o(5,"p",3),n(6),F(7,"json"),r(),o(8,"p",4),n(9),F(10,"json"),r(),o(11,"p",4),n(12),r()()),t&2&&(c("formGroup",a.testForm),p(6),u("Form value: ",E(7,4,a.testForm.value),""),p(3),u("Form status: ",E(10,6,a.testForm.status),""),p(3),u(" Form is ",a.isSubmitted?"":" not "," submitted "))},dependencies:[l,x,h,w,C,b,M,j]});let i=e;return i})();var O=(()=>{let e=class e{constructor(){this.templateModel=!0}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=s({type:e,selectors:[["switcher-template-driven-example"]],decls:5,vars:2,consts:[["name","templateTest",3,"ngModelChange","ngModel"],[1,"nx-margin-bottom-0"]],template:function(t,a){t&1&&(o(0,"form")(1,"nx-switcher",0),I("ngModelChange",function(N){return G(a.templateModel,N)||(a.templateModel=N),N}),n(2," switcher label "),r(),o(3,"p",1),n(4),r()()),t&2&&(p(),B("ngModel",a.templateModel),p(3),u("Model Value: ",a.templateModel,""))},dependencies:[l,x,h,w,R,L]});let i=e;return i})();var we=(()=>{let e=class e{static components(){return{"switcher-default":W,"switcher-disabled":z,"switcher-label-left":A,"switcher-label-small":J,"switcher-large":X,"switcher-negative":H,"switcher-reactive-form":K,"switcher-template-driven":O}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=k({type:e}),e.\u0275inj=T({imports:[P,V]});let i=e;return i})();export{we as SwitcherExamplesModule};
