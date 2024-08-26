import{c as ee,f as te,h as ne}from"./chunk-WYJ5BOAH.js";import"./chunk-6GJCDHPE.js";import{a as $}from"./chunk-LWEPWJA4.js";import{b as Q,c as Y,e as s,g as Z}from"./chunk-IEUNRTGX.js";import"./chunk-GCLFQC76.js";import{j as f}from"./chunk-FVQCNU3S.js";import"./chunk-5WTM5JTT.js";import"./chunk-PY4WEUPS.js";import{b as g}from"./chunk-NZVDRKZR.js";import{A as H,b as F,d as q,f as h,g as j,h as B,j as k,k as O,l as _,o as U,r as J,v as X,z as w}from"./chunk-PXXWLB2C.js";import"./chunk-YRPHZ6Z4.js";import{d as K}from"./chunk-JFYG7OTE.js";import"./chunk-IMB3L7QH.js";import"./chunk-BUOL5UUF.js";import"./chunk-EQR5TLGX.js";import"./chunk-XYC5WHFX.js";import"./chunk-VOYYF5ZG.js";import"./chunk-W5TO766Y.js";import"./chunk-KPB4MAZI.js";import"./chunk-HTP466EP.js";import"./chunk-F6YBMDCU.js";import"./chunk-VEXGKVEH.js";import"./chunk-6R5DWTEA.js";import{v as G}from"./chunk-SCOWPO7V.js";import{$b as i,Bc as y,Cc as M,Dc as E,Fc as u,Jc as N,Kc as S,Qb as R,Rb as C,ac as o,bc as a,na as L,ub as d,wc as A,xa as l,xc as m,ya as W,zc as x}from"./chunk-7XMZBBVT.js";var D=(()=>{let e=class e{constructor(){this.urlRegex="(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-example"]],standalone:!0,features:[u],decls:25,vars:1,consts:[[1,"l-grid"],[1,"l-grid__row"],[1,"l-grid__column-6"],["label","Text"],["nxInput","","type","text"],["label","Password"],["nxInput","","type","password"],["label","E-Mail"],["nxInput","","type","email","ngModel","","email",""],["nxFormfieldError",""],["label","URL"],["nxInput","","type","url","ngModel","",3,"pattern"],[1,"l-grid__column-12"],["label","Textarea"]],template:function(t,r){t&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),a(4,"input",4),o()(),i(5,"div",2)(6,"nx-formfield",5),a(7,"input",6),o()(),i(8,"div",2)(9,"nx-formfield",7),a(10,"input",8),i(11,"nx-error",9)(12,"strong"),m(13,"Error: "),o(),m(14,"Please type in a valid email address "),o()()(),i(15,"div",2)(16,"nx-formfield",10),a(17,"input",11),i(18,"nx-error",9)(19,"strong"),m(20,"Error: "),o(),m(21,"Please type in a valid URL "),o()()(),i(22,"div",12)(23,"nx-formfield",13),a(24,"textarea",4),o()()()()),t&2&&(d(17),C("pattern",r.urlRegex))},dependencies:[f,s,g]});let n=e;return n})();var b=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-autoresize-example"]],standalone:!0,features:[u],decls:2,vars:0,consts:[["label","Textarea with autoresizing"],["nxInput","","cdkTextareaAutosize",""]],template:function(t,r){t&1&&(i(0,"nx-formfield",0),a(1,"textarea",1),o())},dependencies:[f,s,Q]});let n=e;return n})();var T=(()=>{let e=class e{constructor(){this.inputMode="text"}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-mode-example"]],standalone:!0,features:[u],decls:11,vars:3,consts:[["label","With virtual keyboard"],["placeholder","Select input mode",3,"valueChange","value"],["value","text"],["value","decimal"],["value","tel"],["value","search"],["value","email"],["value","url"],["value","none"],[3,"label"],["nxInput","","type","text"]],template:function(t,r){t&1&&(i(0,"nx-formfield",0)(1,"nx-dropdown",1),E("valueChange",function(c){return M(r.inputMode,c)||(r.inputMode=c),c}),a(2,"nx-dropdown-item",2)(3,"nx-dropdown-item",3)(4,"nx-dropdown-item",4)(5,"nx-dropdown-item",5)(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8),o()(),i(9,"nx-formfield",9),a(10,"input",10),o()),t&2&&(d(),y("value",r.inputMode),d(8),C("label",r.inputMode),d(),R("inputmode",r.inputMode))},dependencies:[f,te,ee,s]});let n=e;return n})();var P=(()=>{let e=class e{constructor(){this.testForm=new B({textfield:new k("",{validators:q.required})})}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-reactive-example"]],standalone:!0,features:[u],decls:12,vars:7,consts:[[3,"formGroup"],["label","Label"],["nxInput","","formControlName","textfield"],["nxFormfieldError",""]],template:function(t,r){t&1&&(i(0,"form",0)(1,"nx-formfield",1),a(2,"input",2),i(3,"nx-error",3)(4,"strong"),m(5,"Please note:"),o(),m(6," this field is required! "),o()()(),m(7),N(8,"json"),a(9,"br"),m(10),N(11,"json")),t&2&&(C("formGroup",r.testForm),d(7),x(" Form value: ",S(8,3,r.testForm.value),""),d(3),x(`
Form status: `,S(11,5,r.testForm.status),`
`))},dependencies:[w,_,F,h,j,H,U,J,f,s,G,g]});let n=e;return n})();var V=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-standalone-example"]],standalone:!0,features:[u],decls:4,vars:1,consts:[["standaloneInput",""],["label","Label"],["nxInput",""]],template:function(t,r){if(t&1&&(i(0,"nx-formfield",1),a(1,"input",2,0),o(),m(3)),t&2){let I=A(2);d(3),x(`
Current Value: `,I.value,`
`)}},dependencies:[f,s]});let n=e;return n})();var z=(()=>{let e=class e{constructor(){this.currentExampleValue=""}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-template-driven-example"]],standalone:!0,features:[u],decls:7,vars:2,consts:[["label","Label"],["required","","nxInput","",3,"ngModelChange","ngModel"],["nxFormfieldError",""]],template:function(t,r){t&1&&(i(0,"nx-formfield",0)(1,"input",1),E("ngModelChange",function(c){return M(r.currentExampleValue,c)||(r.currentExampleValue=c),c}),o(),i(2,"nx-error",2)(3,"strong"),m(4,"Please note:"),o(),m(5," this field is required! "),o()(),m(6)),t&2&&(d(),y("ngModel",r.currentExampleValue),d(5),x(`
Current Value: `,r.currentExampleValue,`
`))},dependencies:[f,s,w,F,h,X,O,g]});let n=e;return n})();var oe=(()=>{let e=class e{};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l({type:e,selectors:[["input-without-formfield-example"]],standalone:!0,features:[u],decls:4,vars:0,consts:[["nxInput",""]],template:function(t,r){t&1&&(m(0,`Text Input:
`),a(1,"input",0),m(2,`
Textarea:
`),a(3,"textarea",0))},dependencies:[s],styles:["input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{border:1px dotted #aaaaaa}input[_ngcontent-%COMP%]{margin-bottom:12px}"]});let n=e;return n})();var Ue=(()=>{let e=class e{static components(){return{input:D,"input-autoresize":b,"input-reactive":P,"input-standalone":V,"input-template-driven":z,"input-without-formfield":oe,"input-mode":T}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=W({type:e}),e.\u0275inj=L({imports:[Z,$,Y,ne,K,D,b,P,V,z,T]});let n=e;return n})();export{Ue as InputExamplesModule};
