import{a as I,b as M,c as S,d as P,e as F,f as L,g as k,h as w,i as $}from"./chunk-VQ7EPE2T.js";import{a as E,b as q,c as A}from"./chunk-EDZISUZU.js";import"./chunk-WL5VWTEC.js";import{i as h,j as v,l as O}from"./chunk-R3WMHAU7.js";import{c as g,e as D}from"./chunk-66GEEJPR.js";import"./chunk-XRY2VSZ7.js";import"./chunk-5VBHE3JW.js";import"./chunk-QT6S2IIP.js";import"./chunk-WHOJMXM2.js";import{z as b}from"./chunk-IOLPXL5O.js";import{$b as l,Ac as u,Cc as f,Ic as y,Mb as a,Rb as i,Wb as m,ac as p,bc as x,ka as T,mc as d,pc as s,tb as o,ua as N,va as C}from"./chunk-T3XBXT64.js";function j(e,r){if(e&1&&x(0,"nx-icon",5),e&2){let t=d().$implicit;i("name",t.icon)}}function W(e,r){if(e&1&&(l(0,"nx-tree-node")(1,"button",4),a(2,j,1,1,"nx-icon",5),u(3),p()()),e&2){let t=r.$implicit;o(),s("title",t.label),i("queryParams",t.query),o(),m(t.icon?2:-1),o(),f(" ",t.label," ")}}function X(e,r){if(e&1&&x(0,"nx-icon",5),e&2){let t=d().$implicit;i("name",t.icon)}}function z(e,r){if(e&1&&(l(0,"nx-tree-node")(1,"button",6),a(2,X,1,1,"nx-icon",5),u(3),p()()),e&2){let t=r.$implicit,n=d();o(),s("title",t.label),i("expanded",n._treeControl.isExpanded(t)),o(),m(t.icon?2:-1),o(),f(" ",t.label," ")}}var _=(()=>{class e{constructor(){this.navigationData=[{label:"Option 1",icon:"user-o",children:[{label:"Option 1.1",query:{a:"1.1"}},{label:"Option 1.2",children:[{label:"Option 1.2.1",query:{a:"1.2.1"}},{label:"Option 1.2.2",query:{a:"1.2.2"}},{label:"Option 1.2.3",children:[{label:"Option 1.2.3.1",children:[{label:"Option 1.2.3.1.1",query:{a:"1.2.3.1.1"}}]}]}]},{label:"Option 1.3",query:{a:"1.3"}}]},{label:"Option 2",icon:"file",children:[{label:"Option 2.1",query:{a:"2.1"}},{label:"Option 2.2",query:{a:"2.2"}},{label:"Option 2.3",query:{a:"2.3"}}]},{label:"Option 3",icon:"file",query:{a:"3"}}],this._hasChild=(t,n)=>n.expandable,this._treeControl=new S,this._dataSource=new M(this._treeControl,this.navigationData)}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275cmp=N({type:e,selectors:[["tree-example"]],standalone:!0,features:[y],decls:4,vars:3,consts:[[1,"container"],[3,"dataSource","treeControl"],[4,"nxTreeNodeDef"],[4,"nxTreeNodeDef","nxTreeNodeDefWhen"],["nxAction","","nxTreeNodeActionItem","","nxTreeNodePadding","","nxTreeNodePaddingOffset","40","routerLinkActive","is-selected","routerLink","./","type","button",3,"queryParams","title"],["nxActionIcon","",3,"name"],["nxAction","","nxTreeNodeActionItem","","nxTreeNodeToggle","","nxTreeNodePadding","","nxTreeNodePaddingOffset","40","expandable","","type","button",3,"expanded","title"]],template:function(n,c){n&1&&(l(0,"div",0)(1,"nx-tree",1),a(2,W,4,4,"nx-tree-node",2)(3,z,4,4,"nx-tree-node",3),p()()),n&2&&(o(),i("dataSource",c._dataSource)("treeControl",c._treeControl),o(2),i("nxTreeNodeDefWhen",c._hasChild))},dependencies:[w,F,P,q,I,L,v,h,g,E,k]})}}return e})();var B=[_],ne=(()=>{class e{static components(){return{tree:_}}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=C({type:e})}static{this.\u0275inj=T({imports:[$,D,A,O,b,B]})}}return e})();export{ne as TreeExamplesModule};
