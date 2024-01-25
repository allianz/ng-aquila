import{a as s,b as u,c as K}from"./chunk-GMHQFI24.js";import{c as h,f as C,h as X}from"./chunk-XCOU6OFN.js";import"./chunk-FVU6LJ4B.js";import"./chunk-BV3YPCCO.js";import{a as J}from"./chunk-MAKL5ZTG.js";import{b as p,d as R}from"./chunk-BNG6CEQN.js";import"./chunk-FFH2IEYO.js";import{b as g}from"./chunk-C24BGEL7.js";import"./chunk-4TTPH4Z5.js";import"./chunk-NTZM3PIK.js";import"./chunk-6G5NCPWS.js";import{b as f,d as v,f as c,g as V,i as j,j as E,k as N,l as B,o as k,r as W,v as S,x as G}from"./chunk-GP7FEQRA.js";import"./chunk-U7EIQOJW.js";import"./chunk-EGRHPY7Q.js";import"./chunk-S7LJ5NW7.js";import"./chunk-AZNKYEEF.js";import"./chunk-ATMVZSAN.js";import{g as H}from"./chunk-5RFPKINN.js";import"./chunk-PNCA27QO.js";import"./chunk-K3MRPJ7U.js";import"./chunk-5CERBW6K.js";import"./chunk-AGQ4ALMF.js";import"./chunk-LK5X6SR6.js";import"./chunk-7ONGEGSB.js";import"./chunk-2BGO346T.js";import{o as z,x as P}from"./chunk-UUZACKYZ.js";import{Eb as w,Kb as O,Lb as t,Mb as n,Nb as m,Yb as A,fc as e,hc as y,ma as q,sc as b,tb as x,tc as D,ua as d,ub as T,va as L}from"./chunk-QYP2T7PT.js";var Y=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=d({type:i,selectors:[["natural-language-form-basic-example"]],decls:7,vars:0,consts:[["label","Provide this required field"],["nxInput","","ngModel","","required",""],["nxError",""]],template:function(r,l){r&1&&(t(0,"nx-natural-language-form"),e(1," Here is a word "),t(2,"nx-word",0),m(3,"input",1),t(4,"div",2),e(5,"This field is required."),n()(),e(6,` with some following copy.
`),n())},dependencies:[u,s,g,p,f,c,S,N]});let o=i;return o})();function te(o,i){o&1&&(t(0,"div",6),e(1," This field is required. "),n())}function ie(o,i){o&1&&(t(0,"div",6),e(1," Only numbers are allowed. "),n())}var Z=(()=>{let i=class i{constructor(a){this.fb=a,this.naturalForm=this.fb.group({who:new E("",[v.required]),city:new E("",[v.required]),spots:new E("",[v.pattern("[0-9]*"),v.required])})}validate(){Object.values(this.naturalForm.controls).forEach(a=>{a?.markAsTouched({onlySelf:!0})})}};i.\u0275fac=function(r){return new(r||i)(T(G))},i.\u0275cmp=d({type:i,selectors:[["natural-language-form-extended-example"]],decls:36,vars:9,consts:[[3,"formGroup"],["size","long","label","Always a label"],["formControlName","who"],["value","student"],["value","philosopher"],["value","sailor"],["nxError",""],["size","short","label","Always a label"],["nxInput","","formControlName","city"],["size","regular","label","Always a label"],["nxInput","","formControlName","spots"],["nxError","",4,"ngIf"],["nxButton","","type","submit",3,"click"]],template:function(r,l){r&1&&(t(0,"form")(1,"nx-natural-language-form",0)(2,"span"),e(3,"I want to be"),n(),t(4,"nx-word",1)(5,"nx-dropdown",2)(6,"nx-dropdown-item",3),e(7,"a Student"),n(),t(8,"nx-dropdown-item",4),e(9,"a Philosopher"),n(),t(10,"nx-dropdown-item",5),e(11,"a Sailor"),n()(),t(12,"div",6),e(13,"We need to know about the type of role you want."),n()(),t(14,"span"),e(15,"and visit the city of"),n(),t(16,"nx-word",7),m(17,"input",8),t(18,"div",6),e(19,"This field is required."),n()(),t(20,"span"),e(21,"and see"),n(),t(22,"nx-word",9),m(23,"input",10),O(24,te,2,0,"div",11)(25,ie,2,0,"div",11),n(),t(26,"span"),e(27," nice spots."),n()(),t(28,"button",12),A("click",function(){return l.validate()}),e(29,"submit"),n()(),t(30,"p"),e(31),b(32,"json"),m(33,"br"),e(34),b(35,"json"),n()),r&2&&(x(1),w("formGroup",l.naturalForm),x(23),w("ngIf",l.naturalForm.controls.spots.hasError("required")),x(1),w("ngIf",l.naturalForm.controls.spots.hasError("pattern")),x(6),y(" Form value: ",D(32,5,l.naturalForm.value),""),x(3),y(" Form status: ",D(35,7,l.naturalForm.status),`
`))},dependencies:[u,s,C,h,g,p,z,B,f,c,V,j,k,W,H,P]});let o=i;return o})();var $=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=d({type:i,selectors:[["natural-language-form-negative-example"]],decls:6,vars:0,consts:[[1,"docs-inverse-container"],["negativeStyles","true"],["label","Always a label"],["nxInput",""]],template:function(r,l){r&1&&(t(0,"div",0)(1,"nx-natural-language-form",1),e(2," Here is a word "),t(3,"nx-word",2),m(4,"input",3),e(5,". "),n()()())},dependencies:[u,s,p]});let o=i;return o})();var _=(()=>{let i=class i{};i.\u0275fac=function(r){return new(r||i)},i.\u0275cmp=d({type:i,selectors:[["natural-language-form-sizes-example"]],decls:44,vars:0,consts:[["label","Provide this required field"],["nxInput","","ngModel","","required",""],["nxError",""],["size","long","label","Always a label"],["required","","ngModel",""],["value","option1"],["value","option2"],["value","option3"],["value","option4"],["value","option5"],["size","small"]],template:function(r,l){r&1&&(t(0,"nx-natural-language-form"),e(1," This is a large NLF "),t(2,"nx-word",0),m(3,"input",1),t(4,"div",2),e(5,"This field is required."),n()(),e(6," with "),t(7,"nx-word",3)(8,"nx-dropdown",4)(9,"nx-dropdown-item",5),e(10,"Option 1"),n(),t(11,"nx-dropdown-item",6),e(12,"Option 2"),n(),t(13,"nx-dropdown-item",7),e(14,"Option 3"),n(),t(15,"nx-dropdown-item",8),e(16,"Option 4"),n(),t(17,"nx-dropdown-item",9),e(18,"Option 5"),n()(),t(19,"div",2),e(20,"Please select an option"),n()(),e(21,` .
`),n(),t(22,"nx-natural-language-form",10),e(23," This is a small NLF "),t(24,"nx-word",0),m(25,"input",1),t(26,"div",2),e(27,"This field is required."),n()(),e(28," with "),t(29,"nx-word",3)(30,"nx-dropdown",4)(31,"nx-dropdown-item",5),e(32,"Option 1"),n(),t(33,"nx-dropdown-item",6),e(34,"Option 2"),n(),t(35,"nx-dropdown-item",7),e(36,"Option 3"),n(),t(37,"nx-dropdown-item",8),e(38,"Option 4"),n(),t(39,"nx-dropdown-item",9),e(40,"Option 5"),n()(),t(41,"div",2),e(42,"Please select an option"),n()(),e(43,` .
`),n())},dependencies:[u,s,C,h,g,p,f,c,S,N]});let o=i;return o})();var Ee=(()=>{let i=class i{static components(){return{"natural-language-form-basic":Y,"natural-language-form-extended":Z,"natural-language-form-negative":$,"natural-language-form-sizes":_}}};i.\u0275fac=function(r){return new(r||i)},i.\u0275mod=L({type:i}),i.\u0275inj=q({imports:[K,X,R,J]});let o=i;return o})();export{Ee as NaturalExamplesModule};