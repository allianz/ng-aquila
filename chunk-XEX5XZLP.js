import{a as ie,b as re,c as C,d as ae,e as He,f as w,g as W,h as le}from"./chunk-VBASNWS4.js";import{c as Xe,f as Ye}from"./chunk-KZQN4PNA.js";import"./chunk-TQSWTGBO.js";import{a as Je}from"./chunk-65GLPSAG.js";import{a as qe,b as Q,f as te,i as ze,j as s,k as ne}from"./chunk-5K6RWGRM.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import{b as U,c as je}from"./chunk-KTZ2MV5R.js";import{A as L,B as q,d as Z,g as S,h as K,j as Ie,k as Pe,l as I,m as j,o as Re,p as $,s as ee,w as Oe,y as oe}from"./chunk-3CXM22DE.js";import{a as Qe}from"./chunk-DZRQJYOJ.js";import{a as u,b as c,c as x,d as Ue}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import{d as z,e as ke}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import{p as Ae}from"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{a as Ze,c as $e}from"./chunk-UOB4H3QG.js";import{c as Ge,e as Ke}from"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{v as G}from"./chunk-CCSED5RY.js";import{Aa as T,Ba as B,Fc as Te,Gc as Be,Hc as We,Lb as d,Lc as V,Mb as Le,Mc as p,Nc as Y,Oc as b,Pc as Ve,Qc as _,Rb as H,Rc as N,Sc as F,Tc as k,Xc as O,Yc as A,bc as m,ic as h,jc as D,ka as Se,kc as E,lc as o,mc as t,nc as a,rc as P,wb as l,wc as R,yc as X}from"./chunk-LG2ZA55B.js";function eo(e,f){if(e&1&&(o(0,"span"),p(1),t()),e&2){let n=X();l(),Y(n.customLabelDropdownValue==null?null:n.customLabelDropdownValue.prefix)}}function oo(e,f){if(e&1&&(o(0,"nx-dropdown-item",6),p(1),t()),e&2){let n=f.$implicit;m("value",n),l(),Ve(" ",n.prefix," (",n.countryId,") ")}}var pe=(()=>{class e{constructor(){this.telPrefixDemoData=[{prefix:"+1",countryId:"United States of America"},{prefix:"+49",countryId:"Germany"},{prefix:"+41",countryId:"Switzerland"}]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-custom-label-example"]],decls:8,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Country Code"],[3,"ngModelChange","ngModel"],["nxClosedLabel",""],[3,"value"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),F("ngModelChange",function(g){return N(i.customLabelDropdownValue,g)||(i.customLabelDropdownValue=g),g}),H(5,eo,2,1,"ng-template",5),D(6,oo,2,3,"nx-dropdown-item",6,h),t()()()()()),r&2&&(l(4),_("ngModel",i.customLabelDropdownValue),l(2),E(i.telPrefixDemoData))},dependencies:[u,c,x,s,w,L,S,I,ie,C],encapsulation:2})}}return e})();var me=(()=>{class e{constructor(){this.options=[{name:"BMW",id:1},{name:"Audi",id:2},{name:"Volvo",id:3},{name:"Mini",id:4}]}isOptionDisabled(n){return n.id%2===0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-disabled-items-example"]],decls:27,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Disabled dropdown"],["disabled","true"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["label","With disabled item"],["disabled","true","value","BMW"],["label","With disabled multi item"],["selectValue","id","selectLabel","name",3,"options","selectDisabled"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4)(5,"nx-dropdown-item",5),p(6,"B"),t(),o(7,"nx-dropdown-item",6),p(8,"A"),t(),o(9,"nx-dropdown-item",7),p(10,"V"),t(),o(11,"nx-dropdown-item",8),p(12,"M"),t()()()(),o(13,"div",2)(14,"nx-formfield",9)(15,"nx-dropdown")(16,"nx-dropdown-item",10),p(17,"B"),t(),o(18,"nx-dropdown-item",6),p(19,"A"),t(),o(20,"nx-dropdown-item",7),p(21,"V"),t(),o(22,"nx-dropdown-item",8),p(23,"M"),t()()()(),o(24,"div",2)(25,"nx-formfield",11),a(26,"nx-multi-select",12),t()()()()),r&2&&(l(26),m("options",i.options)("selectDisabled",i.isOptionDisabled))},dependencies:[u,c,x,s,w,C,W],encapsulation:2})}}return e})();function to(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}var de=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-filter-example"]],decls:10,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["filterPlaceholder","Type to search car",3,"showFilter"],[3,"value"],["filter","","filterPlaceholder","Type to search car",3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),D(5,to,1,1,"nx-dropdown-item",5,h),t()()(),o(7,"div",2)(8,"nx-formfield",3),a(9,"nx-multi-select",6),t()()()()),r&2&&(l(4),m("showFilter",!0),l(),E(i.options),l(4),m("options",i.options))},dependencies:[u,c,x,s,w,C,W],encapsulation:2})}}return e})();function no(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}var se=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}myFilter(n,r){return r.match(new RegExp("^"+n,"g"))!==null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-filter-custom-example"]],decls:7,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["filterPlaceholder","Type to search car",3,"showFilter","filterFn"],[3,"value"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),D(5,no,1,1,"nx-dropdown-item",5,h),t()()()()()),r&2&&(l(4),m("showFilter",!0)("filterFn",i.myFilter),l(),E(i.demoData))},dependencies:[u,c,x,s,w,C],encapsulation:2})}}return e})();var ue=(()=>{class e{constructor(){this.form=new oe().group({dropdown:["BMW"]}),this.focusing=!1}onFocusOut(){this.focusing=!1}onFocus(){this.focusing=!0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-focus-out-example"]],decls:14,vars:2,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["formControlName","dropdown",3,"focusOut","focus"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["context","info","nxFormfieldNote",""]],template:function(r,i){r&1&&(o(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),R("focusOut",function(){return i.onFocusOut()})("focus",function(){return i.onFocus()}),o(6,"nx-dropdown-item"),p(7,"CLEAR VALUE"),t(),a(8,"nx-dropdown-item",6)(9,"nx-dropdown-item",7)(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9),t(),o(12,"nx-message",10),p(13),t()()()()()()),r&2&&(m("formGroup",i.form),l(13),b(" Focusing: ",i.focusing," "))},dependencies:[L,j,S,K,q,$,ee,u,c,x,s,w,C,te],encapsulation:2})}}return e})();var ce=(()=>{class e{constructor(){this.testBind="Catfish"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-group-example"]],decls:13,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Animals"],[3,"valueChange","value"],["label","Birds"],["disabled","true","value","Parrot"],["value","Pidgin"],["value","Swallow"],["label","Fish"],["value","Salmon"],["value","Mackerel"],["value","Catfish"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),F("valueChange",function(g){return N(i.testBind,g)||(i.testBind=g),g}),o(5,"nx-dropdown-group",5),a(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8),t(),o(9,"nx-dropdown-group",9),a(10,"nx-dropdown-item",10)(11,"nx-dropdown-item",11)(12,"nx-dropdown-item",12),t()()()()()()),r&2&&(l(4),_("value",i.testBind))},dependencies:[u,c,x,s,w,re,C],encapsulation:2})}}return e})();var xe=(()=>{class e{constructor(){this.items=[];for(let n=1;n<=500;n++)this.items.push({label:`Item ${n}`,value:n})}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-lazy-example"]],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Lazy options"],[3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),a(4,"nx-dropdown",4),t()()()()),r&2&&(l(4),m("options",i.items))},dependencies:[u,c,x,s,w],encapsulation:2})}}return e})();var fe=(()=>{class e{constructor(){this.options=["Apple","Orange","Plum","Cherry"],this.complexOptions=[{name:"Apple",id:1},{name:"Orange",id:2},{name:"Plum",id:3},{name:"Cherry",id:4}]}selectLabel(n){return n.name}selectValue(n){return n.id}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-multi-select-example"]],decls:15,vars:6,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Fruits"],[3,"options"],["selectLabel","name","selectValue","id",3,"options"],["placeholder","Choose options","selectLabel","name","selectValue","id",3,"options"],["label","Readonly"],["placeholder","Choose options","readonly","",3,"options","selectLabel","selectValue"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),a(4,"nx-multi-select",4),t()(),o(5,"div",2)(6,"nx-formfield",3),a(7,"nx-multi-select",5),t()()(),o(8,"div",1)(9,"div",2)(10,"nx-formfield",3),a(11,"nx-multi-select",6),t()(),o(12,"div",2)(13,"nx-formfield",7),a(14,"nx-multi-select",8),t()()()()),r&2&&(l(4),m("options",i.options),l(3),m("options",i.complexOptions),l(4),m("options",i.complexOptions),l(3),m("options",i.complexOptions)("selectLabel",i.selectLabel)("selectValue",i.selectValue))},dependencies:[u,c,x,s,W],encapsulation:2})}}return e})();var we=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-negative-example"]],decls:17,vars:1,consts:[[1,"docs-inverse-container"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand","negative","negative"],["variant","negative"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["variant","negative",3,"disabled"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),a(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9),t()()(),o(10,"div",3)(11,"nx-formfield",4)(12,"nx-dropdown",10),a(13,"nx-dropdown-item",6)(14,"nx-dropdown-item",7)(15,"nx-dropdown-item",8)(16,"nx-dropdown-item",9),t()()()()()()),r&2&&(l(12),m("disabled",!0))},dependencies:[u,c,x,s,w,C],encapsulation:2})}}return e})();var io=["exampleErrorNgModel"];function ro(e,f){if(e&1&&a(0,"nx-dropdown-item",7),e&2){let n=f.$implicit;m("value",n)}}function lo(e,f){if(e&1&&a(0,"nx-dropdown-item",7),e&2){let n=f.$implicit;m("value",n)}}function ao(e,f){if(e&1&&a(0,"nx-dropdown-item",7),e&2){let n=f.$implicit;m("value",n)}}function po(e,f){if(e&1&&a(0,"nx-dropdown-item",7),e&2){let n=f.$implicit;m("value",n)}}function mo(e,f){if(e&1&&a(0,"nx-dropdown-item",7),e&2){let n=f.$implicit;m("value",n)}}function so(e,f){if(e&1&&(o(0,"nx-dropdown-group",23),D(1,mo,1,1,"nx-dropdown-item",7,h),t()),e&2){let n=f.$implicit;m("label",n.label),l(),E(n.items)}}var Ce=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.groups=[{label:"Birds",items:["Parrot","Pidgin","Swallow"]},{label:"Fish",items:["Salmon","Mackerel","Catfish"]}],this.model="Catfish",this.brands=[]}ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-outline-example"]],viewQuery:function(r,i){if(r&1&&Te(io,7),r&2){let v;Be(v=We())&&(i.exampleErrorNgModel=v.first)}},features:[k([{provide:ze,useValue:{appearance:"outline",nxFloatLabel:"always"}}])],decls:54,vars:6,consts:[["exampleErrorNgModel",""],["popoverOutlineExample",""],["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall"],["label","Car brand"],[3,"value"],["label","Readonly Dropdown"],["value","BMW","readonly",""],["value","BMW"],["value","Audi"],["label","Disabled Dropdown"],["value","BMW","disabled",""],["label","Error dropdown"],["required","",3,"ngModelChange","ngModel"],["nxFormfieldError","","appearance","text"],["label","With icon dropdown"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],["filterPlaceholder","Type to search car",3,"showFilter"],["label","Animals"],[3,"valueChange","value"],[3,"label"],["filter","",3,"ngModelChange","ngModel","options"],[2,"max-width","300px"]],template:function(r,i){if(r&1){let v=P();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"h4",5),p(4,"Standard dropdown"),t(),o(5,"nx-formfield",6)(6,"nx-dropdown"),D(7,ro,1,1,"nx-dropdown-item",7,h),t()(),o(9,"nx-formfield",8)(10,"nx-dropdown",9),a(11,"nx-dropdown-item",10)(12,"nx-dropdown-item",11),t()(),o(13,"nx-formfield",12)(14,"nx-dropdown",13),a(15,"nx-dropdown-item",10)(16,"nx-dropdown-item",11),t()(),o(17,"nx-formfield",14)(18,"nx-dropdown",15,0),F("ngModelChange",function(y){return T(v),N(i.modelBlank,y)||(i.modelBlank=y),B(y)}),D(20,lo,1,1,"nx-dropdown-item",7,h),t(),o(22,"nx-error",16),p(23," Error message "),t()(),o(24,"nx-formfield",17)(25,"nx-dropdown"),D(26,ao,1,1,"nx-dropdown-item",7,h),t(),o(28,"button",18),a(29,"nx-icon",19),t()()()(),o(30,"div",3)(31,"div",4)(32,"h4",5),p(33,"Filter dropdown"),t(),o(34,"nx-formfield",6)(35,"nx-dropdown",20),D(36,po,1,1,"nx-dropdown-item",7,h),t()()(),o(38,"div",4)(39,"h4",5),p(40,"Group dropdown"),t(),o(41,"nx-formfield",21)(42,"nx-dropdown",22),F("valueChange",function(y){return T(v),N(i.model,y)||(i.model=y),B(y)}),D(43,so,3,1,"nx-dropdown-group",23,h),t()()(),o(45,"div",4)(46,"h4",5),p(47,"Multi select dropdown"),t(),o(48,"nx-formfield",6)(49,"nx-multi-select",24),F("ngModelChange",function(y){return T(v),N(i.brands,y)||(i.brands=y),B(y)}),t()()()()(),o(50,"nx-popover",null,1)(52,"div",25),p(53," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),t()()}if(r&2){let v=V(51);l(7),E(i.options),l(11),_("ngModel",i.modelBlank),l(2),E(i.options),l(6),E(i.options),l(2),m("nxPopoverTriggerFor",v),l(7),m("showFilter",!0),l(),E(i.options),l(6),_("value",i.model),l(),E(i.groups),l(6),_("ngModel",i.brands),m("options",i.options)}},dependencies:[u,c,x,Qe,s,w,C,L,S,Oe,I,U,Q,Ge,qe,re,W,ke,Xe,Ye],styles:["[_nghost-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:12px}"]})}}return e})();function uo(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}function co(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}function xo(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}var ve=(()=>{class e{constructor(){this.options=["BMW","Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-panelgrow-example"]],decls:17,vars:4,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-m"],["nxCol","12, 12, 4"],["label","Without panelGrow"],["value","BMW",3,"panelGrow"],[3,"value"],["label","With panelGrow"],["label","PanelGrow with a max-width"],["value","BMW",3,"panelGrow","panelMaxWidth"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),D(5,uo,1,1,"nx-dropdown-item",5,h),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",4),D(10,co,1,1,"nx-dropdown-item",5,h),t()()(),o(12,"div",2)(13,"nx-formfield",7)(14,"nx-dropdown",8),D(15,xo,1,1,"nx-dropdown-item",5,h),t()()()()()),r&2&&(l(4),m("panelGrow",!1),l(),E(i.options),l(4),m("panelGrow",!0),l(),E(i.options),l(4),m("panelGrow",!0)("panelMaxWidth",500),l(),E(i.options))},dependencies:[Ue,u,c,x,ne,s,le,w,C],encapsulation:2})}}return e})();function fo(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}function wo(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}var ge=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-placeholder-example"]],decls:12,vars:0,consts:[["nxLayout","grid"],["nxRow","",2,"align-items","flex-end"],["nxCol","12, 12, 6"],["label","Car brand"],["placeholder","Choose a car brand"],[3,"value"],["label","Car brand","appearance","outline"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),D(5,fo,1,1,"nx-dropdown-item",5,h),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",4),D(10,wo,1,1,"nx-dropdown-item",5,h),t()()()()()),r&2&&(l(5),E(i.demoData),l(5),E(i.demoData))},dependencies:[u,c,x,s,w,C],encapsulation:2})}}return e})();var ye=(()=>{class e{constructor(){this.form=new oe().group({dropdown:["BMW",Z.required]})}patch(n){this.form.patchValue({dropdown:n})}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-reactive-example"]],decls:31,vars:7,consts:[["reactiveInput",""],[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["formControlName","dropdown"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxFormfieldError",""],["context","info","nxFormfieldNote",""],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let v=P();o(0,"form",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"nx-formfield",5)(5,"nx-dropdown",6)(6,"nx-dropdown-item"),p(7,"CLEAR VALUE"),t(),a(8,"nx-dropdown-item",7)(9,"nx-dropdown-item",8)(10,"nx-dropdown-item",9)(11,"nx-dropdown-item",10),t(),o(12,"nx-error",11),p(13," Please select a value "),t(),o(14,"nx-message",12),p(15," This field is required "),t()()()(),o(16,"div",3)(17,"div",13)(18,"p",14),p(19),O(20,"json"),t(),o(21,"p",14),p(22),O(23,"json"),t(),o(24,"p",15),p(25," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(26,"div",16),a(27,"input",17,0),o(29,"button",18),R("click",function(){T(v);let y=V(28);return B(i.patch(y.value))}),p(30," Update "),t()()()()()()}r&2&&(m("formGroup",i.form),l(19),b("Form value: ",A(20,3,i.form.value),""),l(3),b(" Form status: ",A(23,5,i.form.status)," "))},dependencies:[L,j,S,K,q,$,ee,u,c,x,s,w,C,U,Q,te,z,G],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();var Co=(e,f)=>f.id;function vo(e,f){if(e&1&&(o(0,"span"),p(1),t()),e&2){let n=X();l(),Y(n.value==null?null:n.value.brand)}}function go(e,f){if(e&1&&(o(0,"nx-dropdown-item",6)(1,"div",11)(2,"div",12),p(3),t(),o(4,"div",13)(5,"span",14),p(6),t(),o(7,"span",15),p(8),t()()()()),e&2){let n=f.$implicit;m("value",n),l(3),b(" ",n.avatar," "),l(3),b(" ",n.brand," "),l(2),b(" ",n.year," ")}}var De=(()=>{class e{constructor(){this.demoData=[{id:"1",avatar:"B",brand:"BMW",year:"1983"},{id:"2",avatar:"A",brand:"Audi",year:"2009"},{id:"3",avatar:"V",brand:"VW",year:"2024"},{id:"4",avatar:"T",brand:"Tesla",year:"2004"},{id:"5",avatar:"L",brand:"Lada",year:"2005"},{id:"6",avatar:"O",brand:"Opel",year:"2013"},{id:"7",avatar:"F",brand:"Fiat",year:"2017"},{id:"8",avatar:"F",brand:"Ford",year:"1979"},{id:"9",avatar:"K",brand:"Kia",year:"2000"},{id:"10",avatar:"T",brand:"Toyota",year:"2021"},{id:"11",avatar:"F",brand:"Ferrari",year:"2023"}]}toText(n){return n?n.toUpperCase():null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-rendering-items-example"]],decls:26,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Car brand"],["verticalAlignCheckmark","center",3,"ngModelChange","valueFormatter","ngModel"],["nxClosedLabel",""],[3,"value"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],[2,"display","flex","align-items","center"],["nxAvatar","","size","small",1,"nx-margin-right-m"],[2,"display","flex","flex-direction","column"],[1,"nx-font-weight-semibold"],[1,"nx-font-weight-light"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),F("ngModelChange",function(g){return N(i.value,g)||(i.value=g),g}),H(5,vo,2,1,"ng-template",5),D(6,go,9,4,"nx-dropdown-item",6,Co),t()()(),o(8,"div",2)(9,"nx-formfield",3)(10,"nx-dropdown")(11,"nx-dropdown-item",7),p(12,"B"),t(),o(13,"nx-dropdown-item",8),p(14,"A"),t(),o(15,"nx-dropdown-item",9),p(16,"V"),t(),o(17,"nx-dropdown-item",10),p(18,"M"),t()()()(),o(19,"div",2)(20,"nx-formfield",3)(21,"nx-dropdown"),a(22,"nx-dropdown-item",7)(23,"nx-dropdown-item",8)(24,"nx-dropdown-item",9)(25,"nx-dropdown-item",10),t()()()()()),r&2&&(l(4),m("valueFormatter",i.toText),_("ngModel",i.value),l(2),E(i.demoData))},dependencies:[u,c,x,s,w,C,$e,Ze,L,S,I,ie],encapsulation:2})}}return e})();function yo(e){return()=>e.scrollStrategies.close()}var Ee=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-scroll-strategy-provider-example"]],features:[k([{provide:He,useFactory:yo,deps:[Ae]}])],decls:8,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Fruit"],["value","Apple"],["value","Orange"],["value","Pear"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown"),a(5,"nx-dropdown-item",4)(6,"nx-dropdown-item",5)(7,"nx-dropdown-item",6),t()()()()())},dependencies:[u,c,x,s,w,C],encapsulation:2})}}return e})();var he=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.simpleBinding="Audi"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-simple-binding-example"]],decls:21,vars:2,consts:[["simpleDropdown",""],["simpleInput",""],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],[3,"valueChange","value"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let v=P();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"nx-formfield",5)(4,"nx-dropdown",6,0),F("valueChange",function(y){return T(v),N(i.simpleBinding,y)||(i.simpleBinding=y),B(y)}),a(6,"nx-dropdown-item",7)(7,"nx-dropdown-item",8)(8,"nx-dropdown-item",9)(9,"nx-dropdown-item",10),t()()()(),o(10,"div",3)(11,"div",11)(12,"p",12),p(13),t(),o(14,"p",13),p(15," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(16,"div",14),a(17,"input",15,1),o(19,"button",16),R("click",function(){T(v);let y=V(18);return B(i.simpleBinding=y.value)}),p(20," Update "),t()()()()()}if(r&2){let v=V(5);l(4),_("value",i.simpleBinding),l(9),b(" Model value is: ",v.value," ")}},dependencies:[u,c,x,s,w,C,z],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();function Do(e,f){if(e&1&&a(0,"nx-dropdown-item",5),e&2){let n=f.$implicit;m("value",n)}}var Me=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}toText(n){return n?n.toUpperCase():null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-standard-example"]],decls:25,vars:1,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-m"],["nxCol","12, 12, 6"],["label","Car brand"],[3,"valueFormatter"],[3,"value"],["label","Preselected Dropdown"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxRow",""],["label","Readonly Dropdown"],["value","BMW","readonly",""],["label","Disabled Dropdown"],["value","BMW","disabled",""]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),D(5,Do,1,1,"nx-dropdown-item",5,h),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",7),a(10,"nx-dropdown-item",7)(11,"nx-dropdown-item",8)(12,"nx-dropdown-item",9)(13,"nx-dropdown-item",10),t()()()(),o(14,"div",11)(15,"div",2)(16,"nx-formfield",12)(17,"nx-dropdown",13),a(18,"nx-dropdown-item",7)(19,"nx-dropdown-item",8),t()()(),o(20,"div",2)(21,"nx-formfield",14)(22,"nx-dropdown",15),a(23,"nx-dropdown-item",7)(24,"nx-dropdown-item",8),t()()()()()),r&2&&(l(4),m("valueFormatter",i.toText),l(),E(i.options))},dependencies:[u,c,x,s,w,C],encapsulation:2})}}return e})();var be=(()=>{class e{constructor(){this.ngModelBinding="Mini"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["dropdown-template-driven-example"]],decls:25,vars:5,consts:[["ngModelDropdown",""],["templateInput",""],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["name","test",3,"ngModelChange","ngModel"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],[1,"nx-margin-y-0"],["nxCol","12"],[1,"nx-margin-top-0","nx-margin-bottom-xs"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let v=P();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"form")(4,"nx-formfield",5)(5,"nx-dropdown",6,0),F("ngModelChange",function(y){return T(v),N(i.ngModelBinding,y)||(i.ngModelBinding=y),B(y)}),a(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9)(10,"nx-dropdown-item",10),t()()(),o(11,"p",11),p(12),t(),o(13,"p",11),p(14),O(15,"json"),t()()(),o(16,"div",3)(17,"div",12)(18,"p",13),p(19," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(20,"div",14),a(21,"input",15,1),o(23,"button",16),R("click",function(){T(v);let y=V(22);return B(i.ngModelBinding=y.value)}),p(24," Update "),t()()()()()}if(r&2){let v=V(6);l(5),_("ngModel",i.ngModelBinding),l(7),b(" Current Value: ",v.value," "),l(2),b("Model: ",A(15,3,i.ngModelBinding),"")}},dependencies:[u,c,x,L,j,S,K,I,Ie,s,w,C,z,G],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();function Eo(){return[{label:"Apple",id:1},{label:"Banana",id:2},{label:"Strawberry",id:3},{label:"Orange",id:4},{label:"Lemon",id:5},{label:"Grapefruit",id:6},{label:"Mango",id:7},{label:"Pineapple",id:8},{label:"Kiwi",id:9},{label:"Cherry",id:10},{label:"Blueberry",id:11},{label:"Avocado",id:12},{label:"Watermelon",id:13},{label:"Raspberry",id:14},{label:"Papaya",id:15}]}function ho(){return[{label:"Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.",id:1},{label:"Sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.",id:2}]}var _e=(()=>{class e{constructor(){this.model=[3],this.modelWithFilter=[],this.options=Eo(),this.longOptions=ho(),this.control=new Pe([],{validators:Z.minLength(3)})}selectLabel(n){return n.label}selectValue(n){return n.id}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["multi-select-example"]],decls:39,vars:20,consts:[["appearance","outline","floatLabel","always","label","Multi select"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label",3,"ngModelChange","ngModel","options"],["placeholder","Choose options",3,"ngModelChange","ngModel","options","selectLabel","selectValue"],["floatLabel","always","label","Multi select with validation"],["placeholder","Choose options",3,"formControl","options","selectLabel","selectValue"],["nxFormfieldError",""],["filter","","placeholder","Choose options","selectValue","i'","selectLabel","label","readonly","",3,"options"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label","panelGrow","true",3,"options"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label","panelGrow","true",3,"options","panelMaxWidth"]],template:function(r,i){r&1&&(o(0,"h3"),p(1,"With filter"),t(),o(2,"nx-formfield",0)(3,"nx-multi-select",1),F("ngModelChange",function(g){return N(i.modelWithFilter,g)||(i.modelWithFilter=g),g}),t()(),o(4,"div"),p(5," Selected options: "),o(6,"pre"),p(7),t()(),o(8,"h3"),p(9,"Without filter"),t(),o(10,"nx-formfield",0)(11,"nx-multi-select",2),F("ngModelChange",function(g){return N(i.model,g)||(i.model=g),g}),t()(),o(12,"div"),p(13," Selected options: "),o(14,"pre"),p(15),t()(),o(16,"h3"),p(17,"Reactive forms validation"),t(),o(18,"nx-formfield",3),a(19,"nx-multi-select",4),o(20,"nx-error",5),p(21),O(22,"json"),t()(),o(23,"div"),p(24," Selected options: "),o(25,"pre"),p(26),t()(),o(27,"h3"),p(28,"Readonly"),t(),o(29,"nx-formfield",0),a(30,"nx-multi-select",6),t(),o(31,"h3"),p(32,"With panelGrow"),t(),o(33,"nx-formfield",0),a(34,"nx-multi-select",7),t(),o(35,"h3"),p(36,"With panelMaxWidth"),t(),o(37,"nx-formfield",0),a(38,"nx-multi-select",8),t()),r&2&&(l(3),_("ngModel",i.modelWithFilter),m("options",i.options),l(4),b("[",i.modelWithFilter.join(", "),"]"),l(4),_("ngModel",i.model),m("options",i.options)("selectLabel",i.selectLabel)("selectValue",i.selectValue),l(4),b("[",i.model.join(", "),"]"),l(4),m("formControl",i.control)("options",i.options)("selectLabel",i.selectLabel)("selectValue",i.selectValue),l(2),b("Error ",A(22,18,i.control.errors),""),l(5),b("[",i.control.value==null?null:i.control.value.join(", "),"]"),l(4),m("options",i.options),l(4),m("options",i.longOptions),l(4),m("options",i.longOptions)("panelMaxWidth",800))},dependencies:[s,W,L,S,I,q,Re,U,Q,G],encapsulation:2})}}return e})();var Ne=class extends ae{constructor(){super(...arguments),this.selectAll="Alle ausw\xE4hlen",this.clearAll="Alle abw\xE4hlen"}},Fe=(()=>{class e{constructor(){this.options=["Apple","Orange","Plum","Cherry"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=d({type:e,selectors:[["multi-select-intl-example"]],features:[k([{provide:ae,useClass:Ne}])],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["appearance","outline","floatLabel","always","label","Fruits"],["filter","",3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),a(4,"nx-multi-select",4),t()()()()),r&2&&(l(4),m("options",i.options))},dependencies:[u,c,x,s,W],encapsulation:2})}}return e})();var Mo=[pe,me,de,se,ce,fe,we,Ce,ge,ye,De,he,Me,be,xe,Ee,ue,_e,Fe,ve],Jn=(()=>{class e{static components(){return{"dropdown-custom-label":pe,"dropdown-disabled-items":me,"dropdown-filter":de,"dropdown-filter-custom":se,"dropdown-group":ce,"dropdown-multi-select":fe,"dropdown-negative":we,"dropdown-outline":Ce,"dropdown-placeholder":ge,"dropdown-reactive":ye,"dropdown-rendering-items":De,"dropdown-simple-binding":he,"dropdown-standard":Me,"dropdown-template-driven":be,"dropdown-lazy":xe,"dropdown-focus-out":ue,"dropdown-scroll-strategy-provider":Ee,"multi-select":_e,"multi-select-intl":Fe,"dropdown-panelgrow":ve}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275mod=Le({type:e})}static{this.\u0275inj=Se({imports:[le,ne,Je,Ke,je,Mo]})}}return e})();export{Jn as DropdownExamplesModule};