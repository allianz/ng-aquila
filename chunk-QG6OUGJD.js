import{b as C,c as W}from"./chunk-UEARBK6O.js";import"./chunk-T63T4IVG.js";import{a as y,b as L}from"./chunk-EM5ZJKOD.js";import"./chunk-OW4W4AHM.js";import{a as f,b as V}from"./chunk-TJIIMCPA.js";import"./chunk-TJAFNFUW.js";import{K as B,N as T,b as x,c as w}from"./chunk-TWRZY3QZ.js";import"./chunk-RKEBU46N.js";import"./chunk-K5G4FJAD.js";import"./chunk-GBA2XC55.js";import"./chunk-SNZYJIUN.js";import"./chunk-CDWGG7BE.js";import{A as b,u as R}from"./chunk-4SPEH3W5.js";import{$c as M,Ac as S,Pb as s,Qb as E,Qc as m,Sc as _,Uc as d,Vc as c,Wc as u,ad as N,fc as a,ma as v,pc as n,qc as o,xb as l}from"./chunk-K4YNUXTC.js";var h=(()=>{class e{constructor(){this.sliderDemoValue=10}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275cmp=s({type:e,selectors:[["rtl-basic-example"]],decls:6,vars:4,consts:[["dir","rtl"],["nxHeadline","subsection-medium"],["nxCopytext","small"],["label","Slider Test Label",3,"valueChange","min","max","step","value"]],template:function(t,i){t&1&&(n(0,"div",0)(1,"h3",1),m(2,"RTL example content"),o(),n(3,"p",2),m(4,"Some copy text in RTL container."),o(),n(5,"nx-slider",3),u("valueChange",function(r){return c(i.sliderDemoValue,r)||(i.sliderDemoValue=r),r}),o()()),t&2&&(l(5),a("min",10)("max",110)("step",2),d("value",i.sliderDemoValue))},dependencies:[x,f,y,C],encapsulation:2})}}return e})();var D=(()=>{class e{constructor(){this.direction="ltr",this.sliderDemoValue=10}toggleDirection(){this.direction=this.direction==="ltr"?"rtl":"ltr"}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275cmp=s({type:e,selectors:[["rtl-dynamic-example"]],decls:10,vars:8,consts:[[3,"dir"],["nxHeadline","subsection-medium"],["nxCopytext","small"],[1,"nx-margin-bottom-m"],["label","Slider Test Label",3,"valueChange","min","max","step","value"],["nxButton","",3,"click"]],template:function(t,i){t&1&&(n(0,"div",0)(1,"h3",1),m(2,"Dynamic direction switching"),o(),n(3,"p",2),m(4),M(5,"uppercase"),o(),n(6,"div",3)(7,"nx-slider",4),u("valueChange",function(r){return c(i.sliderDemoValue,r)||(i.sliderDemoValue=r),r}),o()(),n(8,"button",5),S("click",function(){return i.toggleDirection()}),m(9," Switch container direction "),o()()),t&2&&(a("dir",i.direction),l(4),_(" Some copy text in ",N(5,6,i.direction)," container. "),l(3),a("min",10)("max",110)("step",2),d("value",i.sliderDemoValue))},dependencies:[x,f,y,C,B,R],encapsulation:2})}}return e})();var P=[h,D],ne=(()=>{class e{static components(){return{"rtl-basic":h,"rtl-dynamic":D}}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=E({type:e})}static{this.\u0275inj=v({imports:[w,b,V,T,L,W,P]})}}return e})();export{ne as RtlExamplesModule};
