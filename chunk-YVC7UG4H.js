import{a as d,b as ne}from"./chunk-VLMUTE2Y.js";import{f as oe,h as ie}from"./chunk-WE2ZM5HF.js";import{a as Y,c as Z,e as ee,f as te}from"./chunk-DPF6AXW5.js";import{b as G,c as W,d as K,g as R,h as j}from"./chunk-YAIM67XD.js";import{a as q,b as Q,c as U}from"./chunk-HB4J5NB4.js";import{a as X}from"./chunk-JVFBSPNC.js";import{a as J}from"./chunk-5V76OGMQ.js";import"./chunk-GMJ3GKHW.js";import{f as O,k as F}from"./chunk-MNAWWTKB.js";import{a as z}from"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import"./chunk-JQRF2ONG.js";import{g as k}from"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import{c as V,e as H}from"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{n as B,o as L}from"./chunk-GHZ7IFWX.js";import{$b as f,Gc as S,Ia as C,Ja as x,Nb as A,Pb as a,Vb as r,Wb as m,Xb as p,ec as h,gc as D,na as w,qc as M,rc as s,sc as T,tb as l,tc as P,vc as N,wc as E,xc as I,ya as c,za as _}from"./chunk-O56WLCF2.js";var ae=(()=>{let e=class e{constructor(){this.data=[{code:"AAC ",company:"Honda",price:"$1.38 ",change:"-0.01 ",changePercent:"-0.36% ",sample:"$0.00 ",lorem:"ab lreom "},{code:"AAD ",company:"Abacus",price:"$1.15 ",change:"+2.01 ",changePercent:"+45.00% ",sample:"$0.00 ",lorem:"ab ipsum "},{code:"AAC ",company:"Aditya",price:"$2.22 ",change:"-1.21 ",changePercent:"+5.00% ",sample:"$0.00 ",lorem:"ab tyuy "},{code:"ABC ",company:"Acrux Limited",price:"$1.50 ",change:"-0.01 ",changePercent:"\xB10% ",sample:"$0.00 ",lorem:"mad<br>abdi "},{code:"AGK ",company:"Adamus",price:"$3.12 ",change:"-0.01 ",changePercent:"-1.00% ",sample:"$0.00 ",lorem:"ab tyuy "}],this.displayedColumns=[{title:"Code",key:"code",type:"string",headerCellClass:"text-underline",cellStyle:{"font-weight":600}},{title:"Company",key:"company",type:"string"},{title:"Price",key:"price",type:"numeric"},{title:"Change Percent",key:"changePercent",type:"numeric"},{title:"Change",key:"change",type:"numeric"},{title:"Lorem Ipsum",key:"lorem",type:"string"}]}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c({type:e,selectors:[["dynamic-table-example"]],decls:1,vars:2,consts:[[3,"data","displayedColumns"]],template:function(n,i){n&1&&p(0,"nx-dynamic-table",0),n&2&&a("data",i.data)("displayedColumns",i.displayedColumns)},dependencies:[d],styles:[".text-underline{text-decoration:underline!important}"]});let t=e;return t})();function se(t,e){if(t&1&&(r(0,"div",6),p(1,"nx-icon",7),r(2,"nx-checkbox",8),s(3),m()()),t&2){let y=e.$implicit;l(2),a("value",y.key),l(),P(" ",y.title," ")}}var re=(()=>{let e=class e{constructor(){this.data=[{code:"AAC ",company:"Honda",price:"$1.38 ",change:"-0.01 ",changePercent:"-0.36% ",sample:"$0.00 ",lorem:"ab lreom "},{code:"AAD ",company:"Abacus",price:"$1.15 ",change:"+2.01 ",changePercent:"+45.00% ",sample:"$0.00 ",lorem:"ab ipsum "},{code:"AAC ",company:"Aditya",price:"$2.22 ",change:"-1.21 ",changePercent:"+5.00% ",sample:"$0.00 ",lorem:"ab tyuy "},{code:"ABC ",company:"Acrux Limited",price:"$1.50 ",change:"-0.01 ",changePercent:"\xB10% ",sample:"$0.00 ",lorem:"mad<br>abdi "},{code:"AGK ",company:"Adamus",price:"$3.12 ",change:"-0.01 ",changePercent:"-1.00% ",sample:"$0.00 ",lorem:"ab tyuy "}],this.columns=[{title:"Code",key:"code",type:"string"},{title:"Company",key:"company",type:"string"},{title:"Price",key:"price",type:"numeric"},{title:"Change Percent",key:"changePercent",type:"numeric"},{title:"Change",key:"change",type:"numeric"},{title:"Lorem Ipsum",key:"lorem",type:"string"}],this.selected=["code","company","price","changePercent","change","lorem"]}get displayedColumns(){return this.columns.filter(o=>this.selected.some(n=>o.key===n))}drop(o){Y(this.columns,o.previousIndex,o.currentIndex)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c({type:e,selectors:[["dynamic-table-column-options-example"]],decls:9,vars:5,consts:[["menu","nxContextMenu"],[2,"text-align","end"],["nxButton","small",2,"margin-bottom","24px",3,"nxContextMenuTriggerFor"],["cdkDropList","",3,"ngModelChange","cdkDropListDropped","ngModel"],["nxContextMenuItem","","disableCloseOnSelect","","cdkDrag","",4,"ngFor","ngForOf"],[3,"data","displayedColumns"],["nxContextMenuItem","","disableCloseOnSelect","","cdkDrag",""],["aria-hidden","true","size","s","name","grip-vertical",1,"nx-margin-right-xs"],[3,"value"]],template:function(n,i){if(n&1){let g=f();r(0,"div",1)(1,"button",2),s(2," Column Settings "),m()(),r(3,"nx-context-menu",null,0)(5,"nx-checkbox-group",3),I("ngModelChange",function(u){return C(g),E(i.selected,u)||(i.selected=u),x(u)}),h("cdkDropListDropped",function(u){return C(g),x(i.drop(u))}),r(6,"nx-context-menu-item-wrap"),A(7,se,4,2,"div",4),m()()(),p(8,"nx-dynamic-table",5)}if(n&2){let g=M(4);l(),a("nxContextMenuTriggerFor",g),l(4),N("ngModel",i.selected),l(2),a("ngForOf",i.columns),l(),a("data",i.data)("displayedColumns",i.displayedColumns)}},dependencies:[d,Q,q,K,G,W,R,V,ee,Z,B,O,F,k]});let t=e;return t})();var me=(()=>{let e=class e{constructor(){this.data=[{code:"AAC ",company:"Honda",price:"$1.38 ",change:"-0.01 ",changePercent:"-0.36% ",sample:"$0.00 ",lorem:"ab lreom "},{code:"AAD ",company:"Abacus",price:"$1.15 ",change:"+2.01 ",changePercent:"+45.00% ",sample:"$0.00 ",lorem:"ab ipsum "},{code:"AAC ",company:"Aditya",price:"$2.22 ",change:"-1.21 ",changePercent:"+5.00% ",sample:"$0.00 ",lorem:"ab tyuy "},{code:"ABC ",company:"Acrux Limited",price:"$1.50 ",change:"-0.01 ",changePercent:"\xB10% ",sample:"$0.00 ",lorem:"mad<br>abdi "},{code:"AGK ",company:"Adamus",price:"$3.12 ",change:"-0.01 ",changePercent:"-1.00% ",sample:"$0.00 ",lorem:"ab tyuy "}]}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c({type:e,selectors:[["dynamic-table-data-example"]],decls:1,vars:1,consts:[[3,"data"]],template:function(n,i){n&1&&p(0,"nx-dynamic-table",0),n&2&&a("data",i.data)},dependencies:[d]});let t=e;return t})();function ye(t,e){if(t&1){let y=f();r(0,"div",4)(1,"h3",5),s(2,"Clicked row"),m(),r(3,"p",6),s(4),m(),p(5,"br"),r(6,"button",7),h("click",function(){C(y);let n=D();return x(n.toggleModal())}),s(7," Hide Modal "),m()()}if(t&2){let y=D();l(4),T(y.basicModalBody)}}function ue(t,e){if(t&1&&p(0,"nx-modal",8,1),t&2){D();let y=M(2);a("modalBody",y)("showCloseIcon",!1)}}var ce=(()=>{let e=class e{constructor(){this.data=[{code:"AAC ",company:"Honda",price:"$1.38 ",change:"-0.01 ",changePercent:"-0.36% ",sample:"$0.00 ",lorem:"ab lreom "},{code:"AAD ",company:"Abacus",price:"$1.15 ",change:"+2.01 ",changePercent:"+45.00% ",sample:"$0.00 ",lorem:"ab ipsum "},{code:"AAC ",company:"Aditya",price:"$2.22 ",change:"-1.21 ",changePercent:"+5.00% ",sample:"$0.00 ",lorem:"ab tyuy "},{code:"ABC ",company:"Acrux Limited",price:"$1.50 ",change:"-0.01 ",changePercent:"\xB10% ",sample:"$0.00 ",lorem:"mad<br>abdi "},{code:"AGK ",company:"Adamus",price:"$3.12 ",change:"-0.01 ",changePercent:"-1.00% ",sample:"$0.00 ",lorem:"ab tyuy "}],this.displayedColumns=[{title:"Code",key:"code",type:"string"},{title:"Company",key:"company",type:"string"},{title:"Price",key:"price",type:"numeric"},{title:"Change Percent",key:"changePercent",type:"numeric"},{title:"Change",key:"change",type:"numeric"},{title:"Lorem Ipsum",key:"lorem",type:"string"}],this.modalOpen=!1,this.basicModalBody=""}handleRowClick(o){this.basicModalBody=JSON.stringify(o),this.toggleModal()}toggleModal(){this.modalOpen=!this.modalOpen}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c({type:e,selectors:[["dynamic-table-event-example"]],decls:4,vars:3,consts:[["ngIfModalBody",""],["basicModal",""],[3,"rowClick","displayedColumns","data"],[3,"modalBody","showCloseIcon",4,"ngIf"],[1,"u-text-center"],["nxHeadline","subsection-medium"],["nxCopytext","small"],["nxButton","primary","type","button",3,"click"],[3,"modalBody","showCloseIcon"]],template:function(n,i){if(n&1){let g=f();r(0,"nx-dynamic-table",2),h("rowClick",function(u){return C(g),x(i.handleRowClick(u))}),m(),A(1,ye,8,1,"ng-template",null,0,S)(3,ue,2,2,"nx-modal",3)}n&2&&(a("displayedColumns",i.displayedColumns)("data",i.data),l(3),a("ngIf",i.modalOpen))},dependencies:[d,oe,L,k,z,J]});let t=e;return t})();var le=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c({type:e,selectors:[["dynamic-table-without-data-example"]],decls:3,vars:0,template:function(n,i){n&1&&(r(0,"nx-dynamic-table")(1,"b"),s(2,"Information: No data to show"),m()())},dependencies:[d]});let t=e;return t})();var Ge=(()=>{let e=class e{static components(){return{"dynamic-table":ae,"dynamic-table-data":me,"dynamic-table-event":ce,"dynamic-table-without-data":le,"dynamic-table-column-options":re}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=_({type:e}),e.\u0275inj=w({imports:[ne,ie.forRoot(),U,j,H,te,X]});let t=e;return t})();export{Ge as DynamicExamplesModule};
