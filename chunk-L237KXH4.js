import{a as O,b as D,c as A,d as q,e as E,f as S,g as M,h as P,i as L}from"./chunk-2CJK3F5S.js";import{a as k,b as w,c as F}from"./chunk-NCPMSMIG.js";import"./chunk-77EAOUPF.js";import{i as C,j as h,k as v}from"./chunk-LVQ7DULK.js";import{c as g,e as I}from"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import{B as b,o as y}from"./chunk-GHZ7IFWX.js";import{Nb as l,Pb as i,Vb as p,Wb as c,Xb as x,gc as d,jc as s,na as _,rc as f,tb as o,tc as u,ya as N,za as T}from"./chunk-O56WLCF2.js";function j(t,e){if(t&1&&x(0,"nx-icon",6),t&2){let n=d().$implicit;i("name",n.icon)}}function W(t,e){if(t&1&&(p(0,"nx-tree-node")(1,"button",4),l(2,j,1,1,"nx-icon",5),f(3),c()()),t&2){let n=e.$implicit;o(),s("title",n.label),i("queryParams",n.query),o(),i("ngIf",n.icon),o(),u(" ",n.label," ")}}function X(t,e){if(t&1&&x(0,"nx-icon",6),t&2){let n=d().$implicit;i("name",n.icon)}}function z(t,e){if(t&1&&(p(0,"nx-tree-node")(1,"button",7),l(2,X,1,1,"nx-icon",5),f(3),c()()),t&2){let n=e.$implicit,a=d();o(),s("title",n.label),i("expanded",a._treeControl.isExpanded(n)),o(),i("ngIf",n.icon),o(),u(" ",n.label," ")}}var $=(()=>{let e=class e{constructor(){this.navigationData=[{label:"Option 1",icon:"user-o",children:[{label:"Option 1.1",query:{a:"1.1"}},{label:"Option 1.2",children:[{label:"Option 1.2.1",query:{a:"1.2.1"}},{label:"Option 1.2.2",query:{a:"1.2.2"}},{label:"Option 1.2.3",children:[{label:"Option 1.2.3.1",children:[{label:"Option 1.2.3.1.1",query:{a:"1.2.3.1.1"}}]}]}]},{label:"Option 1.3",query:{a:"1.3"}}]},{label:"Option 2",icon:"file",children:[{label:"Option 2.1",query:{a:"2.1"}},{label:"Option 2.2",query:{a:"2.2"}},{label:"Option 2.3",query:{a:"2.3"}}]},{label:"Option 3",icon:"file",query:{a:"3"}}],this._hasChild=(a,r)=>r.expandable,this._treeControl=new A,this._dataSource=new D(this._treeControl,this.navigationData)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=N({type:e,selectors:[["tree-example"]],decls:4,vars:3,consts:[[1,"container"],[3,"dataSource","treeControl"],[4,"nxTreeNodeDef"],[4,"nxTreeNodeDef","nxTreeNodeDefWhen"],["nxAction","","nxTreeNodeActionItem","","nxTreeNodePadding","","nxTreeNodePaddingOffset","40","routerLinkActive","is-selected","routerLink","./","type","button",3,"queryParams","title"],["nxActionIcon","",3,"name",4,"ngIf"],["nxActionIcon","",3,"name"],["nxAction","","nxTreeNodeActionItem","","nxTreeNodeToggle","","nxTreeNodePadding","","nxTreeNodePaddingOffset","40","expandable","","type","button",3,"expanded","title"]],template:function(r,m){r&1&&(p(0,"div",0)(1,"nx-tree",1),l(2,W,4,4,"nx-tree-node",2)(3,z,4,4,"nx-tree-node",3),c()()),r&2&&(o(),i("dataSource",m._dataSource)("treeControl",m._treeControl),o(2),i("nxTreeNodeDefWhen",m._hasChild))},dependencies:[P,q,E,S,M,O,g,w,k,C,h,y]});let t=e;return t})();var oe=(()=>{let e=class e{static components(){return{tree:$}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=T({type:e}),e.\u0275inj=_({imports:[L,I,F,v,b]});let t=e;return t})();export{oe as TreeExamplesModule};
