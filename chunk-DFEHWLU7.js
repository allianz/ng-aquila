import{b as d,c as Y,d as l,e as s,f as x,g as Z}from"./chunk-XG3CSY72.js";import{a as $}from"./chunk-WJPAIXGU.js";import{f as Q,h as U}from"./chunk-AD5EGBTD.js";import{b as B,j}from"./chunk-MDP6L36Q.js";import"./chunk-UHUQ4GC7.js";import{a as c}from"./chunk-5V76OGMQ.js";import{b as z}from"./chunk-GMJ3GKHW.js";import{b as q,d as S,f as L,g as w,l as T,o as H,r as F,v as G,z as V}from"./chunk-42AMANVX.js";import{a as C}from"./chunk-M5KLUQHQ.js";import{a as X,b as J,c as K}from"./chunk-GWBFL4JU.js";import{a as k,c as W}from"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import"./chunk-JQRF2ONG.js";import{g as _}from"./chunk-D6XGM6VK.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import{c as R,e as O}from"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{o as I}from"./chunk-GHZ7IFWX.js";import{Nb as h,Ob as N,Pb as f,Vb as t,Wb as n,Xb as y,ec as M,na as b,rc as i,tb as u,tc as A,ub as D,ya as p,za as P}from"./chunk-O56WLCF2.js";var ne=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-example"]],decls:17,vars:0,consts:[["nxHeadline","subsection-medium",1,"nx-margin-bottom-2m"],["nxCopytext","normal"],["nxHeadline","subsection-small",1,"nx-margin-bottom-2m"]],template:function(a,r){a&1&&(t(0,"nx-accordion")(1,"nx-expansion-panel")(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"General information"),n()(),t(5,"h2",0),i(6," What's important "),n(),t(7,"p",1),i(8,"Lorem ipsum"),n()(),t(9,"nx-expansion-panel")(10,"nx-expansion-panel-header")(11,"nx-expansion-panel-title"),i(12,"Payment details"),n()(),t(13,"h2",2),i(14," What's included "),n(),t(15,"p",1),i(16,"Lorem ipsum"),n()()())},dependencies:[d,l,s,x,C,c]});let o=e;return o})();function de(o,e){o&1&&y(0,"nx-icon",12),o&2&&f("name","exclamation-triangle")}function ce(o,e){o&1&&y(0,"nx-icon",12),o&2&&f("name","exclamation-triangle")}function ue(o,e){o&1&&(t(0,"nx-message",13)(1,"strong"),i(2," Error: "),n(),i(3,` Please check the red marked areas.
`),n())}var te=(()=>{let e=class e{constructor(m){this.fb=m,this.formGroupInfo=this.fb.group({surname:["Mustermann",S.required]}),this.formGroupPayment=this.fb.group({input:["",S.required]}),this.showErrorPayment=!0,this.showErrorInfo=!1,this.formGroupPayment.markAllAsTouched()}get infoHasError(){return this.formGroupInfo.get("surname")?.hasError("required")}get paymentHasError(){return this.formGroupPayment.get("input")?.hasError("required")}};e.\u0275fac=function(a){return new(a||e)(D(V))},e.\u0275cmp=p({type:e,selectors:[["accordion-error-example"]],decls:36,vars:9,consts:[[1,"expansion-title-with-icon"],["class","nx-error__icon",3,"name",4,"ngIf"],[3,"formGroup"],["nxLayout","grid nogutters"],["nxRow",""],["nxCol","12,12,12,6,6"],["label","Surname"],["required","","nxInput","","formControlName","surname"],["nxFormfieldError",""],["label","Label"],["required","","nxInput","","formControlName","input"],["id","error_example","context","error","class","nx-margin-top-xs",4,"ngIf"],[1,"nx-error__icon",3,"name"],["id","error_example","context","error",1,"nx-margin-top-xs"]],template:function(a,r){a&1&&(t(0,"nx-accordion")(1,"nx-expansion-panel")(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title")(4,"div",0),h(5,de,1,1,"nx-icon",1),t(6,"span"),i(7,"General Information"),n()()()(),t(8,"form",2)(9,"div",3)(10,"div",4)(11,"div",5)(12,"nx-formfield",6),y(13,"input",7),t(14,"nx-error",8)(15,"strong"),i(16," Please note: "),n(),i(17," you have to fill out this field to continue. "),n()()()()()()(),t(18,"nx-expansion-panel")(19,"nx-expansion-panel-header")(20,"nx-expansion-panel-title")(21,"div",0),h(22,ce,1,1,"nx-icon",1),t(23,"span"),i(24,"Payment details"),n()()()(),t(25,"form",2)(26,"div",3)(27,"div",4)(28,"div",5)(29,"nx-formfield",9),y(30,"input",10),t(31,"nx-error",8)(32,"strong"),i(33," Please note: "),n(),i(34," you have to fill out this field to continue. "),n()()()()()()()(),h(35,ue,4,0,"nx-message",11)),a&2&&(u(2),N("aria-invalid",r.infoHasError)("aria-describedby",r.infoHasError?"error_example":""),u(3),f("ngIf",r.infoHasError),u(3),f("formGroup",r.formGroupInfo),u(11),N("aria-invalid",r.paymentHasError)("aria-describedby",r.paymentHasError?"error_example":""),u(3),f("ngIf",r.paymentHasError),u(3),f("formGroup",r.formGroupPayment),u(10),f("ngIf",r.infoHasError||r.paymentHasError))},dependencies:[d,l,s,x,j,B,z,Q,R,k,I,T,q,L,w,G,H,F,X,K,J],styles:[".expansion-title-with-icon[_ngcontent-%COMP%]{display:flex;align-items:center}nx-accordion[_ngcontent-%COMP%]     .nx-error__icon{color:var(--danger, #ed6f7c);margin-right:16px}"]});let o=e;return o})();var ie=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-extra-light-example"]],decls:25,vars:1,consts:[["variant","extra-light"],["nxCopytext","normal",1,"nx-margin-0"],[3,"disabled"]],template:function(a,r){a&1&&(t(0,"nx-accordion",0)(1,"nx-expansion-panel")(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"Insurance details"),n()(),t(5,"p",1),i(6," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()(),t(7,"nx-expansion-panel",2)(8,"nx-expansion-panel-header")(9,"nx-expansion-panel-title"),i(10,"Insurance details (disabled)"),n()(),t(11,"p",1),i(12," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()(),t(13,"nx-expansion-panel")(14,"nx-expansion-panel-header")(15,"nx-expansion-panel-title"),i(16,"Insurance details"),n()(),t(17,"p",1),i(18," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()(),t(19,"nx-expansion-panel")(20,"nx-expansion-panel-header")(21,"nx-expansion-panel-title"),i(22,"Insurance details"),n()(),t(23,"p",1),i(24," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()()()),a&2&&(u(7),f("disabled",!0))},dependencies:[d,l,s,x,c]});let o=e;return o})();var oe=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-extra-light-negative-example"]],decls:26,vars:0,consts:[[1,"docs-inverse-container"],["variant","extra-light","negative","true"],["nxCopytext","normal",1,"nx-margin-0"],["disabled","true"]],template:function(a,r){a&1&&(t(0,"div",0)(1,"nx-accordion",1)(2,"nx-expansion-panel")(3,"nx-expansion-panel-header")(4,"nx-expansion-panel-title"),i(5,"About us"),n()(),t(6,"p",2),i(7,"Lorem ipsum"),n()(),t(8,"nx-expansion-panel")(9,"nx-expansion-panel-header")(10,"nx-expansion-panel-title"),i(11,"Contact us"),n()(),t(12,"p",2),i(13,"Lorem ipsum"),n()(),t(14,"nx-expansion-panel")(15,"nx-expansion-panel-header")(16,"nx-expansion-panel-title"),i(17,"More information"),n()(),t(18,"p",2),i(19,"Lorem ipsum"),n()(),t(20,"nx-expansion-panel",3)(21,"nx-expansion-panel-header")(22,"nx-expansion-panel-title"),i(23,"Insurance details (disabled)"),n()(),t(24,"p",2),i(25," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()()()())},dependencies:[d,l,s,x,c]});let o=e;return o})();function fe(o,e){o&1&&(t(0,"p",1),i(1,"Lorem ipsum"),n())}function Ee(o,e){o&1&&(t(0,"p",1),i(1,"Lorem ipsum"),n())}var ae=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-lazy-example"]],decls:11,vars:0,consts:[["nxExpansionPanelBody",""],["nxCopytext","normal"]],template:function(a,r){a&1&&(t(0,"nx-accordion")(1,"nx-expansion-panel")(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"General information"),n()(),h(5,fe,2,0,"ng-template",0),n(),t(6,"nx-expansion-panel")(7,"nx-expansion-panel-header")(8,"nx-expansion-panel-title"),i(9,"Payment Details"),n()(),h(10,Ee,2,0,"ng-template",0),n()())},dependencies:[d,l,s,x,Y,c]});let o=e;return o})();var re=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-light-example"]],decls:19,vars:0,consts:[["variant","light"],["disabled",""],["nxCopytext","normal"]],template:function(a,r){a&1&&(t(0,"nx-accordion",0)(1,"nx-expansion-panel",1)(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"About us (disabled)"),n()(),t(5,"p",2),i(6," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()(),t(7,"nx-expansion-panel")(8,"nx-expansion-panel-header")(9,"nx-expansion-panel-title"),i(10,"Contact us"),n()(),t(11,"p",2),i(12," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()(),t(13,"nx-expansion-panel")(14,"nx-expansion-panel-header")(15,"nx-expansion-panel-title"),i(16,"More information"),n()(),t(17,"p",2),i(18," Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, fugit. Rem tempora corporis illum aut fugit quidem dicta! Excepturi consequuntur mollitia quibusdam sequi deserunt beatae labore expedita dolorum omnis incidunt! "),n()()())},dependencies:[d,l,s,x,c],styles:["p[_ngcontent-%COMP%]{margin:0}"]});let o=e;return o})();var me=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-light-negative-example"]],decls:20,vars:0,consts:[[1,"docs-inverse-container"],["variant","light","negative","true"],["nxCopytext","normal"],["disabled","true"]],template:function(a,r){a&1&&(t(0,"div",0)(1,"nx-accordion",1)(2,"nx-expansion-panel")(3,"nx-expansion-panel-header")(4,"nx-expansion-panel-title"),i(5,"About us"),n()(),t(6,"p",2),i(7,"Lorem ipsum"),n()(),t(8,"nx-expansion-panel")(9,"nx-expansion-panel-header")(10,"nx-expansion-panel-title"),i(11,"Contact us"),n()(),t(12,"p",2),i(13,"Lorem ipsum"),n()(),t(14,"nx-expansion-panel",3)(15,"nx-expansion-panel-header")(16,"nx-expansion-panel-title"),i(17,"More information (disabled)"),n()(),t(18,"p",2),i(19,"Lorem ipsum"),n()()()())},dependencies:[d,l,s,x,c]});let o=e;return o})();var pe=(()=>{let e=class e{constructor(){this.multi=!0}toggleMulti(){this.multi=!this.multi}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-multi-example"]],decls:17,vars:2,consts:[[3,"multi"],["nxCopytext","normal"],["nxButton","","type","button",3,"click"]],template:function(a,r){a&1&&(t(0,"nx-accordion",0)(1,"nx-expansion-panel")(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"About us"),n()(),t(5,"p",1),i(6,"Lorem ipsum"),n()(),t(7,"nx-expansion-panel")(8,"nx-expansion-panel-header")(9,"nx-expansion-panel-title"),i(10,"Contact us"),n()(),t(11,"p",1),i(12,"Lorem ipsum"),n()()(),t(13,"p"),i(14),n(),t(15,"button",2),M("click",function(){return r.toggleMulti()}),i(16,"Toggle Multi"),n()),a&2&&(f("multi",r.multi),u(14),A("Is [multi] active? ",r.multi,""))},dependencies:[d,l,s,x,_,c]});let o=e;return o})();var le=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-negative-example"]],decls:14,vars:0,consts:[[1,"docs-inverse-container"],["negative","true"],["nxCopytext","normal"]],template:function(a,r){a&1&&(t(0,"div",0)(1,"nx-accordion",1)(2,"nx-expansion-panel")(3,"nx-expansion-panel-header")(4,"nx-expansion-panel-title"),i(5,"About us"),n()(),t(6,"p",2),i(7,"Lorem ipsum"),n()(),t(8,"nx-expansion-panel")(9,"nx-expansion-panel-header")(10,"nx-expansion-panel-title"),i(11,"Contact us"),n()(),t(12,"p",2),i(13,"Lorem ipsum"),n()()()())},dependencies:[d,l,s,x,c]});let o=e;return o})();var se=(()=>{let e=class e{constructor(){this.scrollIntoViewActive=!0,this.scrollIntoViewOptions={behavior:"smooth"}}};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-scroll-smooth-example"]],decls:17,vars:4,consts:[[3,"scrollIntoViewActive","scrollIntoViewOptions"],["nxHeadline","subsection-medium",1,"nx-margin-bottom-2m"],["nxCopytext","normal"],["nxHeadline","subsection-small",1,"nx-margin-bottom-2m"]],template:function(a,r){a&1&&(t(0,"nx-accordion")(1,"nx-expansion-panel",0)(2,"nx-expansion-panel-header")(3,"nx-expansion-panel-title"),i(4,"General information"),n()(),t(5,"h2",1),i(6," What's important "),n(),t(7,"p",2),i(8,"Lorem ipsum"),n()(),t(9,"nx-expansion-panel",0)(10,"nx-expansion-panel-header")(11,"nx-expansion-panel-title"),i(12,"Payment details"),n()(),t(13,"h2",3),i(14," What's included "),n(),t(15,"p",2),i(16,"Lorem ipsum"),n()()()),a&2&&(u(),f("scrollIntoViewActive",r.scrollIntoViewActive)("scrollIntoViewOptions",r.scrollIntoViewOptions),u(8),f("scrollIntoViewActive",r.scrollIntoViewActive)("scrollIntoViewOptions",r.scrollIntoViewOptions))},dependencies:[d,l,s,x,C,c]});let o=e;return o})();var xe=(()=>{let e=class e{};e.\u0275fac=function(a){return new(a||e)},e.\u0275cmp=p({type:e,selectors:[["accordion-standalone-example"]],decls:24,vars:1,consts:[["nxHeadline","subsection-small",1,"nx-margin-bottom-2m"],["nxCopytext","normal",1,"nx-margin-bottom-2m"],["nxCopytext","normal"],[3,"disabled"]],template:function(a,r){a&1&&(t(0,"nx-expansion-panel")(1,"nx-expansion-panel-header")(2,"nx-expansion-panel-title"),i(3,"Insurance details"),n()(),t(4,"h2",0),i(5,"General"),n(),t(6,"p",1),i(7,"Lorem ipsum"),n(),t(8,"h2",0),i(9," What's included "),n(),t(10,"p",2),i(11,"Lorem ipsum"),n()(),t(12,"nx-expansion-panel",3)(13,"nx-expansion-panel-header")(14,"nx-expansion-panel-title"),i(15,"Insurance details (disabled)"),n()(),t(16,"h2",0),i(17,"General"),n(),t(18,"p",1),i(19,"Lorem ipsum"),n(),t(20,"h2",0),i(21," What's included "),n(),t(22,"p",2),i(23,"Lorem ipsum"),n()()),a&2&&(u(12),f("disabled",!0))},dependencies:[l,s,x,C,c]});let o=e;return o})();var nn=(()=>{let e=class e{static components(){return{accordion:ne,"accordion-error":te,"accordion-extra-light":ie,"accordion-extra-light-negative":oe,"accordion-lazy":ae,"accordion-light":re,"accordion-light-negative":me,"accordion-multi":pe,"accordion-negative":le,"accordion-standalone":xe,"accordion-scroll-smooth":se}}};e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=P({type:e}),e.\u0275inj=b({imports:[Z,U,O,W,$]});let o=e;return o})();export{nn as AccordionExamplesModule};