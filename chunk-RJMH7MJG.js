import{a as re,b as ae,c as v,d as de,e as Xe,f as C,g as V,h as le}from"./chunk-3P56W6W4.js";import{c as Ye,f as Ze}from"./chunk-RFTVIQSQ.js";import"./chunk-36TXPBFC.js";import{a as He}from"./chunk-SCUSIL2L.js";import{a as ze,b as J,f as ne,i as Ue,j as u,k as ie}from"./chunk-RZBODQVT.js";import"./chunk-6CDTKHD6.js";import"./chunk-GCLFQC76.js";import"./chunk-Q23MZHTA.js";import{b as Q,c as qe}from"./chunk-JLMMQAEF.js";import{A as T,B as z,d as $,g as L,h as j,j as Pe,k as Re,l as P,m as q,o as Oe,p as ee,s as oe,w as Ae,y as te}from"./chunk-6427IMKH.js";import{a as Je}from"./chunk-2NCMUJ6V.js";import{a as c,b as x,c as f,d as Qe}from"./chunk-SZB43S4E.js";import"./chunk-4YLJH6R6.js";import"./chunk-QLBOHP4T.js";import"./chunk-PMVSB6VH.js";import{d as U,e as Ge}from"./chunk-NXSFTIR3.js";import"./chunk-FF3UHNCT.js";import{p as ke}from"./chunk-LF47FN3H.js";import"./chunk-WL5VWTEC.js";import"./chunk-R3WMHAU7.js";import{a as $e,c as eo}from"./chunk-ZVTOTS2H.js";import{c as Ke,e as je}from"./chunk-66GEEJPR.js";import"./chunk-XRY2VSZ7.js";import"./chunk-5VBHE3JW.js";import"./chunk-QT6S2IIP.js";import"./chunk-WHOJMXM2.js";import{v as K}from"./chunk-IOLPXL5O.js";import{$b as o,Ac as d,Bc as Z,Cc as F,Dc as Ie,Ec as S,Fa as B,Fc as _,Ga as W,Gc as N,Hc as G,Ic as s,Mb as X,Mc as A,Nc as k,Rb as p,Yb as M,Zb as E,_b as h,ac as t,bc as l,fc as R,ka as Le,kc as O,mc as Y,tb as a,tc as Be,ua as m,uc as We,va as Te,vc as Ve,zc as I}from"./chunk-T3XBXT64.js";function oo(e,w){if(e&1&&(o(0,"span"),d(1),t()),e&2){let n=Y();a(),Z(n.customLabelDropdownValue==null?null:n.customLabelDropdownValue.prefix)}}function to(e,w){if(e&1&&(o(0,"nx-dropdown-item",6),d(1),t()),e&2){let n=w.$implicit;p("value",n),a(),Ie(" ",n.prefix," (",n.countryId,") ")}}var pe=(()=>{class e{constructor(){this.telPrefixDemoData=[{prefix:"+1",countryId:"United States of America"},{prefix:"+49",countryId:"Germany"},{prefix:"+41",countryId:"Switzerland"}]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-custom-label-example"]],standalone:!0,features:[s],decls:8,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Country Code"],[3,"ngModelChange","ngModel"],["nxClosedLabel",""],[3,"value"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),N("ngModelChange",function(y){return _(i.customLabelDropdownValue,y)||(i.customLabelDropdownValue=y),y}),X(5,oo,2,1,"ng-template",5),E(6,to,2,3,"nx-dropdown-item",6,M),t()()()()()),r&2&&(a(4),S("ngModel",i.customLabelDropdownValue),a(2),h(i.telPrefixDemoData))},dependencies:[c,x,f,u,C,T,L,P,re,v]})}}return e})();var me=(()=>{class e{constructor(){this.options=[{name:"BMW",id:1},{name:"Audi",id:2},{name:"Volvo",id:3},{name:"Mini",id:4}]}isOptionDisabled(n){return n.id%2===0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-disabled-items-example"]],standalone:!0,features:[s],decls:27,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Disabled dropdown"],["disabled","true"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["label","With disabled item"],["disabled","true","value","BMW"],["label","With disabled multi item"],["selectValue","id","selectLabel","name",3,"options","selectDisabled"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4)(5,"nx-dropdown-item",5),d(6,"B"),t(),o(7,"nx-dropdown-item",6),d(8,"A"),t(),o(9,"nx-dropdown-item",7),d(10,"V"),t(),o(11,"nx-dropdown-item",8),d(12,"M"),t()()()(),o(13,"div",2)(14,"nx-formfield",9)(15,"nx-dropdown")(16,"nx-dropdown-item",10),d(17,"B"),t(),o(18,"nx-dropdown-item",6),d(19,"A"),t(),o(20,"nx-dropdown-item",7),d(21,"V"),t(),o(22,"nx-dropdown-item",8),d(23,"M"),t()()()(),o(24,"div",2)(25,"nx-formfield",11),l(26,"nx-multi-select",12),t()()()()),r&2&&(a(26),p("options",i.options)("selectDisabled",i.isOptionDisabled))},dependencies:[c,x,f,u,C,v,V]})}}return e})();function no(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}var se=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-filter-example"]],standalone:!0,features:[s],decls:10,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["filterPlaceholder","Type to search car",3,"showFilter"],[3,"value"],["filter","","filterPlaceholder","Type to search car",3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),E(5,no,1,1,"nx-dropdown-item",5,M),t()()(),o(7,"div",2)(8,"nx-formfield",3),l(9,"nx-multi-select",6),t()()()()),r&2&&(a(4),p("showFilter",!0),a(),h(i.options),a(4),p("options",i.options))},dependencies:[c,x,f,u,C,v,V]})}}return e})();function io(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}var ue=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}myFilter(n,r){return r.match(new RegExp("^"+n,"g"))!==null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-filter-custom-example"]],standalone:!0,features:[s],decls:7,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["filterPlaceholder","Type to search car",3,"showFilter","filterFn"],[3,"value"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),E(5,io,1,1,"nx-dropdown-item",5,M),t()()()()()),r&2&&(a(4),p("showFilter",!0)("filterFn",i.myFilter),a(),h(i.demoData))},dependencies:[c,x,f,u,C,v]})}}return e})();var ce=(()=>{class e{constructor(){this.form=new te().group({dropdown:["BMW"]}),this.focusing=!1}onFocusOut(){this.focusing=!1}onFocus(){this.focusing=!0}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-focus-out-example"]],standalone:!0,features:[s],decls:14,vars:2,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["formControlName","dropdown",3,"focusOut","focus"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["context","info","nxFormfieldNote",""]],template:function(r,i){r&1&&(o(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),O("focusOut",function(){return i.onFocusOut()})("focus",function(){return i.onFocus()}),o(6,"nx-dropdown-item"),d(7,"CLEAR VALUE"),t(),l(8,"nx-dropdown-item",6)(9,"nx-dropdown-item",7)(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9),t(),o(12,"nx-message",10),d(13),t()()()()()()),r&2&&(p("formGroup",i.form),a(13),F(" Focusing: ",i.focusing," "))},dependencies:[T,q,L,j,z,ee,oe,c,x,f,u,C,v,ne]})}}return e})();var xe=(()=>{class e{constructor(){this.testBind="Catfish"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-group-example"]],standalone:!0,features:[s],decls:13,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Animals"],[3,"valueChange","value"],["label","Birds"],["disabled","true","value","Parrot"],["value","Pidgin"],["value","Swallow"],["label","Fish"],["value","Salmon"],["value","Mackerel"],["value","Catfish"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),N("valueChange",function(y){return _(i.testBind,y)||(i.testBind=y),y}),o(5,"nx-dropdown-group",5),l(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8),t(),o(9,"nx-dropdown-group",9),l(10,"nx-dropdown-item",10)(11,"nx-dropdown-item",11)(12,"nx-dropdown-item",12),t()()()()()()),r&2&&(a(4),S("value",i.testBind))},dependencies:[c,x,f,u,C,ae,v]})}}return e})();var fe=(()=>{class e{constructor(){this.items=[];for(let n=1;n<=500;n++)this.items.push({label:`Item ${n}`,value:n})}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-lazy-example"]],standalone:!0,features:[s],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Lazy options"],[3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),l(4,"nx-dropdown",4),t()()()()),r&2&&(a(4),p("options",i.items))},dependencies:[c,x,f,u,C]})}}return e})();var we=(()=>{class e{constructor(){this.options=["Apple","Orange","Plum","Cherry"],this.complexOptions=[{name:"Apple",id:1},{name:"Orange",id:2},{name:"Plum",id:3},{name:"Cherry",id:4}]}selectLabel(n){return n.name}selectValue(n){return n.id}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-multi-select-example"]],standalone:!0,features:[s],decls:15,vars:6,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Fruits"],[3,"options"],["selectLabel","name","selectValue","id",3,"options"],["placeholder","Choose options","selectLabel","name","selectValue","id",3,"options"],["label","Readonly"],["placeholder","Choose options","readonly","",3,"options","selectLabel","selectValue"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),l(4,"nx-multi-select",4),t()(),o(5,"div",2)(6,"nx-formfield",3),l(7,"nx-multi-select",5),t()()(),o(8,"div",1)(9,"div",2)(10,"nx-formfield",3),l(11,"nx-multi-select",6),t()(),o(12,"div",2)(13,"nx-formfield",7),l(14,"nx-multi-select",8),t()()()()),r&2&&(a(4),p("options",i.options),a(3),p("options",i.complexOptions),a(4),p("options",i.complexOptions),a(3),p("options",i.complexOptions)("selectLabel",i.selectLabel)("selectValue",i.selectValue))},dependencies:[c,x,f,u,V]})}}return e})();var Ce=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-negative-example"]],standalone:!0,features:[s],decls:17,vars:1,consts:[[1,"docs-inverse-container"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand","negative","negative"],["variant","negative"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["variant","negative",3,"disabled"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),l(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9),t()()(),o(10,"div",3)(11,"nx-formfield",4)(12,"nx-dropdown",10),l(13,"nx-dropdown-item",6)(14,"nx-dropdown-item",7)(15,"nx-dropdown-item",8)(16,"nx-dropdown-item",9),t()()()()()()),r&2&&(a(12),p("disabled",!0))},dependencies:[c,x,f,u,C,v]})}}return e})();var ro=["exampleErrorNgModel"];function ao(e,w){if(e&1&&l(0,"nx-dropdown-item",7),e&2){let n=w.$implicit;p("value",n)}}function lo(e,w){if(e&1&&l(0,"nx-dropdown-item",7),e&2){let n=w.$implicit;p("value",n)}}function po(e,w){if(e&1&&l(0,"nx-dropdown-item",7),e&2){let n=w.$implicit;p("value",n)}}function mo(e,w){if(e&1&&l(0,"nx-dropdown-item",7),e&2){let n=w.$implicit;p("value",n)}}function so(e,w){if(e&1&&l(0,"nx-dropdown-item",7),e&2){let n=w.$implicit;p("value",n)}}function uo(e,w){if(e&1&&(o(0,"nx-dropdown-group",23),E(1,so,1,1,"nx-dropdown-item",7,M),t()),e&2){let n=w.$implicit;p("label",n.label),a(),h(n.items)}}var ve=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.groups=[{label:"Birds",items:["Parrot","Pidgin","Swallow"]},{label:"Fish",items:["Salmon","Mackerel","Catfish"]}],this.model="Catfish",this.brands=[]}ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-outline-example"]],viewQuery:function(r,i){if(r&1&&Be(ro,7),r&2){let g;We(g=Ve())&&(i.exampleErrorNgModel=g.first)}},standalone:!0,features:[G([{provide:Ue,useValue:{appearance:"outline",nxFloatLabel:"always"}}]),s],decls:54,vars:6,consts:[["exampleErrorNgModel",""],["popoverOutlineExample",""],["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall"],["label","Car brand"],[3,"value"],["label","Readonly Dropdown"],["value","BMW","readonly",""],["value","BMW"],["value","Audi"],["label","Disabled Dropdown"],["value","BMW","disabled",""],["label","Error dropdown"],["required","",3,"ngModelChange","ngModel"],["nxFormfieldError","","appearance","text"],["label","With icon dropdown"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],["filterPlaceholder","Type to search car",3,"showFilter"],["label","Animals"],[3,"valueChange","value"],[3,"label"],["filter","",3,"ngModelChange","ngModel","options"],[2,"max-width","300px"]],template:function(r,i){if(r&1){let g=R();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"h4",5),d(4,"Standard dropdown"),t(),o(5,"nx-formfield",6)(6,"nx-dropdown"),E(7,ao,1,1,"nx-dropdown-item",7,M),t()(),o(9,"nx-formfield",8)(10,"nx-dropdown",9),l(11,"nx-dropdown-item",10)(12,"nx-dropdown-item",11),t()(),o(13,"nx-formfield",12)(14,"nx-dropdown",13),l(15,"nx-dropdown-item",10)(16,"nx-dropdown-item",11),t()(),o(17,"nx-formfield",14)(18,"nx-dropdown",15,0),N("ngModelChange",function(D){return B(g),_(i.modelBlank,D)||(i.modelBlank=D),W(D)}),E(20,lo,1,1,"nx-dropdown-item",7,M),t(),o(22,"nx-error",16),d(23," Error message "),t()(),o(24,"nx-formfield",17)(25,"nx-dropdown"),E(26,po,1,1,"nx-dropdown-item",7,M),t(),o(28,"button",18),l(29,"nx-icon",19),t()()()(),o(30,"div",3)(31,"div",4)(32,"h4",5),d(33,"Filter dropdown"),t(),o(34,"nx-formfield",6)(35,"nx-dropdown",20),E(36,mo,1,1,"nx-dropdown-item",7,M),t()()(),o(38,"div",4)(39,"h4",5),d(40,"Group dropdown"),t(),o(41,"nx-formfield",21)(42,"nx-dropdown",22),N("valueChange",function(D){return B(g),_(i.model,D)||(i.model=D),W(D)}),E(43,uo,3,1,"nx-dropdown-group",23,M),t()()(),o(45,"div",4)(46,"h4",5),d(47,"Multi select dropdown"),t(),o(48,"nx-formfield",6)(49,"nx-multi-select",24),N("ngModelChange",function(D){return B(g),_(i.brands,D)||(i.brands=D),W(D)}),t()()()()(),o(50,"nx-popover",null,1)(52,"div",25),d(53," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),t()()}if(r&2){let g=I(51);a(7),h(i.options),a(11),S("ngModel",i.modelBlank),a(2),h(i.options),a(6),h(i.options),a(2),p("nxPopoverTriggerFor",g),a(7),p("showFilter",!0),a(),h(i.options),a(6),S("value",i.model),a(),h(i.groups),a(6),S("ngModel",i.brands),p("options",i.options)}},dependencies:[c,x,f,Je,u,C,v,T,L,Ae,P,Q,J,Ke,ze,ae,V,Ge,Ye,Ze],styles:["[_nghost-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:12px}"]})}}return e})();function co(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}function xo(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}function fo(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}var ge=(()=>{class e{constructor(){this.options=["BMW","Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-panelgrow-example"]],standalone:!0,features:[s],decls:17,vars:4,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-m"],["nxCol","12, 12, 4"],["label","Without panelGrow"],["value","BMW",3,"panelGrow"],[3,"value"],["label","With panelGrow"],["label","PanelGrow with a max-width"],["value","BMW",3,"panelGrow","panelMaxWidth"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),E(5,co,1,1,"nx-dropdown-item",5,M),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",4),E(10,xo,1,1,"nx-dropdown-item",5,M),t()()(),o(12,"div",2)(13,"nx-formfield",7)(14,"nx-dropdown",8),E(15,fo,1,1,"nx-dropdown-item",5,M),t()()()()()),r&2&&(a(4),p("panelGrow",!1),a(),h(i.options),a(4),p("panelGrow",!0),a(),h(i.options),a(4),p("panelGrow",!0)("panelMaxWidth",500),a(),h(i.options))},dependencies:[Qe,c,x,f,ie,u,le,C,v]})}}return e})();function wo(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}function Co(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}var ye=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-placeholder-example"]],standalone:!0,features:[s],decls:12,vars:0,consts:[["nxLayout","grid"],["nxRow","",2,"align-items","flex-end"],["nxCol","12, 12, 6"],["label","Car brand"],["placeholder","Choose a car brand"],[3,"value"],["label","Car brand","appearance","outline"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),E(5,wo,1,1,"nx-dropdown-item",5,M),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",4),E(10,Co,1,1,"nx-dropdown-item",5,M),t()()()()()),r&2&&(a(5),h(i.demoData),a(5),h(i.demoData))},dependencies:[c,x,f,u,C,v]})}}return e})();var De=(()=>{class e{constructor(){this.form=new te().group({dropdown:["BMW",$.required]})}patch(n){this.form.patchValue({dropdown:n})}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-reactive-example"]],standalone:!0,features:[s],decls:31,vars:7,consts:[["reactiveInput",""],[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["formControlName","dropdown"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxFormfieldError",""],["context","info","nxFormfieldNote",""],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let g=R();o(0,"form",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"nx-formfield",5)(5,"nx-dropdown",6)(6,"nx-dropdown-item"),d(7,"CLEAR VALUE"),t(),l(8,"nx-dropdown-item",7)(9,"nx-dropdown-item",8)(10,"nx-dropdown-item",9)(11,"nx-dropdown-item",10),t(),o(12,"nx-error",11),d(13," Please select a value "),t(),o(14,"nx-message",12),d(15," This field is required "),t()()()(),o(16,"div",3)(17,"div",13)(18,"p",14),d(19),A(20,"json"),t(),o(21,"p",14),d(22),A(23,"json"),t(),o(24,"p",15),d(25," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(26,"div",16),l(27,"input",17,0),o(29,"button",18),O("click",function(){B(g);let D=I(28);return W(i.patch(D.value))}),d(30," Update "),t()()()()()()}r&2&&(p("formGroup",i.form),a(19),F("Form value: ",k(20,3,i.form.value),""),a(3),F(" Form status: ",k(23,5,i.form.status)," "))},dependencies:[T,q,L,j,z,ee,oe,c,x,f,u,C,v,Q,J,ne,U,K],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();var vo=(e,w)=>w.id;function go(e,w){if(e&1&&(o(0,"span"),d(1),t()),e&2){let n=Y();a(),Z(n.value==null?null:n.value.brand)}}function yo(e,w){if(e&1&&(o(0,"nx-dropdown-item",6)(1,"div",11)(2,"div",12),d(3),t(),o(4,"div",13)(5,"span",14),d(6),t(),o(7,"span",15),d(8),t()()()()),e&2){let n=w.$implicit;p("value",n),a(3),F(" ",n.avatar," "),a(3),F(" ",n.brand," "),a(2),F(" ",n.year," ")}}var Ee=(()=>{class e{constructor(){this.demoData=[{id:"1",avatar:"B",brand:"BMW",year:"1983"},{id:"2",avatar:"A",brand:"Audi",year:"2009"},{id:"3",avatar:"V",brand:"VW",year:"2024"},{id:"4",avatar:"T",brand:"Tesla",year:"2004"},{id:"5",avatar:"L",brand:"Lada",year:"2005"},{id:"6",avatar:"O",brand:"Opel",year:"2013"},{id:"7",avatar:"F",brand:"Fiat",year:"2017"},{id:"8",avatar:"F",brand:"Ford",year:"1979"},{id:"9",avatar:"K",brand:"Kia",year:"2000"},{id:"10",avatar:"T",brand:"Toyota",year:"2021"},{id:"11",avatar:"F",brand:"Ferrari",year:"2023"}]}toText(n){return n?n.toUpperCase():null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-rendering-items-example"]],standalone:!0,features:[s],decls:26,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["label","Car brand"],["verticalAlignCheckmark","center",3,"ngModelChange","valueFormatter","ngModel"],["nxClosedLabel",""],[3,"value"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],[2,"display","flex","align-items","center"],["nxAvatar","","size","small",1,"nx-margin-right-m"],[2,"display","flex","flex-direction","column"],[1,"nx-font-weight-semibold"],[1,"nx-font-weight-light"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),N("ngModelChange",function(y){return _(i.value,y)||(i.value=y),y}),X(5,go,2,1,"ng-template",5),E(6,yo,9,4,"nx-dropdown-item",6,vo),t()()(),o(8,"div",2)(9,"nx-formfield",3)(10,"nx-dropdown")(11,"nx-dropdown-item",7),d(12,"B"),t(),o(13,"nx-dropdown-item",8),d(14,"A"),t(),o(15,"nx-dropdown-item",9),d(16,"V"),t(),o(17,"nx-dropdown-item",10),d(18,"M"),t()()()(),o(19,"div",2)(20,"nx-formfield",3)(21,"nx-dropdown"),l(22,"nx-dropdown-item",7)(23,"nx-dropdown-item",8)(24,"nx-dropdown-item",9)(25,"nx-dropdown-item",10),t()()()()()),r&2&&(a(4),p("valueFormatter",i.toText),S("ngModel",i.value),a(2),h(i.demoData))},dependencies:[c,x,f,u,C,v,eo,$e,T,L,P,re]})}}return e})();function Do(e){return()=>e.scrollStrategies.close()}var he=(()=>{class e{static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-scroll-strategy-provider-example"]],standalone:!0,features:[G([{provide:Xe,useFactory:Do,deps:[ke]}]),s],decls:8,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["label","Fruit"],["value","Apple"],["value","Orange"],["value","Pear"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown"),l(5,"nx-dropdown-item",4)(6,"nx-dropdown-item",5)(7,"nx-dropdown-item",6),t()()()()())},dependencies:[c,x,f,u,C,v]})}}return e})();var Me=(()=>{class e{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.simpleBinding="Audi"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-simple-binding-example"]],standalone:!0,features:[s],decls:21,vars:2,consts:[["simpleDropdown",""],["simpleInput",""],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],[3,"valueChange","value"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let g=R();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"nx-formfield",5)(4,"nx-dropdown",6,0),N("valueChange",function(D){return B(g),_(i.simpleBinding,D)||(i.simpleBinding=D),W(D)}),l(6,"nx-dropdown-item",7)(7,"nx-dropdown-item",8)(8,"nx-dropdown-item",9)(9,"nx-dropdown-item",10),t()()()(),o(10,"div",3)(11,"div",11)(12,"p",12),d(13),t(),o(14,"p",13),d(15," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(16,"div",14),l(17,"input",15,1),o(19,"button",16),O("click",function(){B(g);let D=I(18);return W(i.simpleBinding=D.value)}),d(20," Update "),t()()()()()}if(r&2){let g=I(5);a(4),S("value",i.simpleBinding),a(9),F(" Model value is: ",g.value," ")}},dependencies:[c,x,f,u,C,v,U],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();function Eo(e,w){if(e&1&&l(0,"nx-dropdown-item",5),e&2){let n=w.$implicit;p("value",n)}}var be=(()=>{class e{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}toText(n){return n?n.toUpperCase():null}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-standard-example"]],standalone:!0,features:[s],decls:25,vars:1,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-m"],["nxCol","12, 12, 6"],["label","Car brand"],[3,"valueFormatter"],[3,"value"],["label","Preselected Dropdown"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["nxRow",""],["label","Readonly Dropdown"],["value","BMW","readonly",""],["label","Disabled Dropdown"],["value","BMW","disabled",""]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),E(5,Eo,1,1,"nx-dropdown-item",5,M),t()()(),o(7,"div",2)(8,"nx-formfield",6)(9,"nx-dropdown",7),l(10,"nx-dropdown-item",7)(11,"nx-dropdown-item",8)(12,"nx-dropdown-item",9)(13,"nx-dropdown-item",10),t()()()(),o(14,"div",11)(15,"div",2)(16,"nx-formfield",12)(17,"nx-dropdown",13),l(18,"nx-dropdown-item",7)(19,"nx-dropdown-item",8),t()()(),o(20,"div",2)(21,"nx-formfield",14)(22,"nx-dropdown",15),l(23,"nx-dropdown-item",7)(24,"nx-dropdown-item",8),t()()()()()),r&2&&(a(4),p("valueFormatter",i.toText),a(),h(i.options))},dependencies:[c,x,f,u,C,v]})}}return e})();var Fe=(()=>{class e{constructor(){this.ngModelBinding="Mini"}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["dropdown-template-driven-example"]],standalone:!0,features:[s],decls:25,vars:5,consts:[["ngModelDropdown",""],["templateInput",""],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["label","Car brand"],["name","test",3,"ngModelChange","ngModel"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],[1,"nx-margin-y-0"],["nxCol","12"],[1,"nx-margin-top-0","nx-margin-bottom-xs"],[1,"update-container"],["type","text"],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(r,i){if(r&1){let g=R();o(0,"div",2)(1,"div",3)(2,"div",4)(3,"form")(4,"nx-formfield",5)(5,"nx-dropdown",6,0),N("ngModelChange",function(D){return B(g),_(i.ngModelBinding,D)||(i.ngModelBinding=D),W(D)}),l(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9)(10,"nx-dropdown-item",10),t()()(),o(11,"p",11),d(12),t(),o(13,"p",11),d(14),A(15,"json"),t()()(),o(16,"div",3)(17,"div",12)(18,"p",13),d(19," Try to set the value to BMW, Audi, Volvo or Mini. "),t(),o(20,"div",14),l(21,"input",15,1),o(23,"button",16),O("click",function(){B(g);let D=I(22);return W(i.ngModelBinding=D.value)}),d(24," Update "),t()()()()()}if(r&2){let g=I(6);a(5),S("ngModel",i.ngModelBinding),a(7),F(" Current Value: ",g.value," "),a(2),F("Model: ",k(15,3,i.ngModelBinding),"")}},dependencies:[c,x,f,T,q,L,j,P,Pe,u,C,v,U,K],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]})}}return e})();function ho(){return[{label:"Apple",id:1},{label:"Banana",id:2},{label:"Strawberry",id:3},{label:"Orange",id:4},{label:"Lemon",id:5},{label:"Grapefruit",id:6},{label:"Mango",id:7},{label:"Pineapple",id:8},{label:"Kiwi",id:9},{label:"Cherry",id:10},{label:"Blueberry",id:11},{label:"Avocado",id:12},{label:"Watermelon",id:13},{label:"Raspberry",id:14},{label:"Papaya",id:15}]}function Mo(){return[{label:"Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.",id:1},{label:"Sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.",id:2}]}var Se=(()=>{class e{constructor(){this.model=[3],this.modelWithFilter=[],this.options=ho(),this.longOptions=Mo(),this.control=new Re([],{validators:$.minLength(3)})}selectLabel(n){return n.label}selectValue(n){return n.id}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["multi-select-example"]],standalone:!0,features:[s],decls:39,vars:20,consts:[["appearance","outline","floatLabel","always","label","Multi select"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label",3,"ngModelChange","ngModel","options"],["placeholder","Choose options",3,"ngModelChange","ngModel","options","selectLabel","selectValue"],["floatLabel","always","label","Multi select with validation"],["placeholder","Choose options",3,"formControl","options","selectLabel","selectValue"],["nxFormfieldError",""],["filter","","placeholder","Choose options","selectValue","i'","selectLabel","label","readonly","",3,"options"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label","panelGrow","true",3,"options"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label","panelGrow","true",3,"options","panelMaxWidth"]],template:function(r,i){r&1&&(o(0,"h3"),d(1,"With filter"),t(),o(2,"nx-formfield",0)(3,"nx-multi-select",1),N("ngModelChange",function(y){return _(i.modelWithFilter,y)||(i.modelWithFilter=y),y}),t()(),o(4,"div"),d(5," Selected options: "),o(6,"pre"),d(7),t()(),o(8,"h3"),d(9,"Without filter"),t(),o(10,"nx-formfield",0)(11,"nx-multi-select",2),N("ngModelChange",function(y){return _(i.model,y)||(i.model=y),y}),t()(),o(12,"div"),d(13," Selected options: "),o(14,"pre"),d(15),t()(),o(16,"h3"),d(17,"Reactive forms validation"),t(),o(18,"nx-formfield",3),l(19,"nx-multi-select",4),o(20,"nx-error",5),d(21),A(22,"json"),t()(),o(23,"div"),d(24," Selected options: "),o(25,"pre"),d(26),t()(),o(27,"h3"),d(28,"Readonly"),t(),o(29,"nx-formfield",0),l(30,"nx-multi-select",6),t(),o(31,"h3"),d(32,"With panelGrow"),t(),o(33,"nx-formfield",0),l(34,"nx-multi-select",7),t(),o(35,"h3"),d(36,"With panelMaxWidth"),t(),o(37,"nx-formfield",0),l(38,"nx-multi-select",8),t()),r&2&&(a(3),S("ngModel",i.modelWithFilter),p("options",i.options),a(4),F("[",i.modelWithFilter.join(", "),"]"),a(4),S("ngModel",i.model),p("options",i.options)("selectLabel",i.selectLabel)("selectValue",i.selectValue),a(4),F("[",i.model.join(", "),"]"),a(4),p("formControl",i.control)("options",i.options)("selectLabel",i.selectLabel)("selectValue",i.selectValue),a(2),F("Error ",k(22,18,i.control.errors),""),a(5),F("[",i.control.value==null?null:i.control.value.join(", "),"]"),a(4),p("options",i.options),a(4),p("options",i.longOptions),a(4),p("options",i.longOptions)("panelMaxWidth",800))},dependencies:[u,V,T,L,P,z,Oe,Q,J,K]})}}return e})();var _e=class extends de{constructor(){super(...arguments),this.selectAll="Alle ausw\xE4hlen",this.clearAll="Alle abw\xE4hlen"}},Ne=(()=>{class e{constructor(){this.options=["Apple","Orange","Plum","Cherry"]}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275cmp=m({type:e,selectors:[["multi-select-intl-example"]],standalone:!0,features:[G([{provide:de,useClass:_e}]),s],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["appearance","outline","floatLabel","always","label","Fruits"],["filter","",3,"options"]],template:function(r,i){r&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),l(4,"nx-multi-select",4),t()()()()),r&2&&(a(4),p("options",i.options))},dependencies:[c,x,f,u,V]})}}return e})();var bo=[pe,me,se,ue,xe,we,Ce,ve,ye,De,Ee,Me,be,Fe,fe,he,ce,Se,Ne,ge],Hn=(()=>{class e{static components(){return{"dropdown-custom-label":pe,"dropdown-disabled-items":me,"dropdown-filter":se,"dropdown-filter-custom":ue,"dropdown-group":xe,"dropdown-multi-select":we,"dropdown-negative":Ce,"dropdown-outline":ve,"dropdown-placeholder":ye,"dropdown-reactive":De,"dropdown-rendering-items":Ee,"dropdown-simple-binding":Me,"dropdown-standard":be,"dropdown-template-driven":Fe,"dropdown-lazy":fe,"dropdown-focus-out":ce,"dropdown-scroll-strategy-provider":he,"multi-select":Se,"multi-select-intl":Ne,"dropdown-panelgrow":ge}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275mod=Te({type:e})}static{this.\u0275inj=Le({imports:[le,ie,He,je,qe,bo]})}}return e})();export{Hn as DropdownExamplesModule};
