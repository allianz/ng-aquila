(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{OfMa:function(n,e,t){"use strict";t.r(e),t.d(e,"MenuExamplesModule",(function(){return U}));var o=t("2kYt"),i=t("sEIs"),a=t("U5gO"),c=t("0FLW"),r=t("5XID"),s=t("EM62");function l(n,e){1&n&&(s.Tb(0,"div",1),s.ic(1),s.Sb())}const u=["*"];let d=(()=>{class n{constructor(n){this._changeDetectorRef=n,this._open=!1}set open(n){const e=Object(r.b)(n);e!==this._open&&(this._open=e,this._changeDetectorRef.markForCheck())}get open(){return this._open}toggle(){this.open=!this.open}}return n.\u0275fac=function(e){return new(e||n)(s.Nb(s.h))},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu"]],hostVars:1,hostBindings:function(n,e){2&n&&s.Cb("aria-expanded",e.open)},inputs:{open:"open"},ngContentSelectors:u,decls:1,vars:1,consts:[["class","nx-menu__wrapper",4,"ngIf"],[1,"nx-menu__wrapper"]],template:function(n,e){1&n&&(s.jc(),s.Hc(0,l,2,0,"div",0)),2&n&&s.kc("ngIf",e.open)},directives:[o.t],styles:[".nx-menu[_nghost-%COMP%]{display:block}.nx-menu__wrapper[_ngcontent-%COMP%]{position:fixed;top:60px;left:0;right:0;bottom:0;z-index:1;overflow:auto;background:var(--menu-background-color)}  .nx-menu__link{display:block;padding:12px 0;font-size:18px;line-height:24px;outline:none}  .nx-menu__link+.nx-menu__link{margin-top:8px}  .nx-menu__link.cdk-keyboard-focused{box-shadow:var(--focus-box-shadow);border-radius:4px;outline:none}@media screen and (-ms-high-contrast:active){  .nx-menu__link.cdk-keyboard-focused{box-shadow:0 0 0 2px background,0 0 0 6px windowText}}  .nx-menu__item.nx-menu__item--large,   .nx-menu__item.nx-menu__item--small{padding:24px;border-bottom:1px solid var(--menu-item-border-color)}@media screen and (-ms-high-contrast:active){  .nx-menu__item.nx-menu__item--large,   .nx-menu__item.nx-menu__item--small{border-bottom-color:windowText}}  .nx-menu__item.nx-menu__item--large{padding-left:64px}[dir=rtl][_nghost-%COMP%]     .nx-menu__item.nx-menu__item--large, [dir=rtl]   [_nghost-%COMP%]     .nx-menu__item.nx-menu__item--large{padding-right:64px;padding-left:0}@media screen and (-ms-high-contrast:active){  .nx-menu__link{text-decoration:none}}"],changeDetection:0}),n})();var p=t("sg/T");let b=(()=>{class n{constructor(n,e){this._elementRef=n,this._focusMonitor=e,this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}}return n.\u0275fac=function(e){return new(e||n)(s.Nb(s.l),s.Nb(p.g))},n.\u0275dir=s.Ib({type:n,selectors:[["a","nxMenuLink",""]],hostAttrs:[1,"nx-menu__link"]}),n})(),x=(()=>{class n{constructor(){this._size="s"}set size(n){this._size="l"===n?"l":"s"}get size(){return this._size}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=s.Ib({type:n,selectors:[["","nxMenuItem",""]],hostAttrs:[1,"nx-menu__item"],hostVars:4,hostBindings:function(n,e){2&n&&s.Fb("nx-menu__item--small","s"===e.size)("nx-menu__item--large","l"===e.size)},inputs:{size:["nxMenuItem","size"]}}),n})();var m=t("VKQk");const h=["nxMenuButton",""];function g(n,e){1&n&&s.Ob(0,"nx-icon",2)}const _=[[["","nxMenuButtonIcon",""]],"*"],f=["[nxMenuButtonIcon]","*"];let O=(()=>{class n{constructor(n,e,t){this._changeDetectorRef=n,this._focusMonitor=e,this._elementRef=t,this._expandable=!1,this._expanded=!1,this._type="root",this._focusMonitor.monitor(this._elementRef)}set expandable(n){this._expandable=Object(r.b)(n),this._changeDetectorRef.markForCheck()}get expandable(){return this._expandable}set expanded(n){this._expanded=Object(r.b)(n),this._changeDetectorRef.markForCheck()}get expanded(){return this._expanded}set type(n){"root"!==n&&"nested"!==n||(this._type=n,this._changeDetectorRef.markForCheck())}get type(){return this._type}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}}return n.\u0275fac=function(e){return new(e||n)(s.Nb(s.h),s.Nb(p.g),s.Nb(s.l))},n.\u0275cmp=s.Hb({type:n,selectors:[["","nxMenuButton",""]],hostAttrs:[1,"nx-menu-button"],hostVars:8,hostBindings:function(n,e){2&n&&s.Fb("is-expanded",e.expandable&&e.expanded)("is-expandable",e.expandable)("nx-menu-button--nested","nested"===e.type)("nx-menu-button--root","root"===e.type)},inputs:{expandable:"expandable",expanded:"expanded",type:["nxType","type"]},attrs:h,ngContentSelectors:f,decls:4,vars:1,consts:[[1,"nx-menu-button__label"],["class","nx-menu-button__expand-icon","name","chevron-down",4,"ngIf"],["name","chevron-down",1,"nx-menu-button__expand-icon"]],template:function(n,e){1&n&&(s.jc(_),s.ic(0),s.Tb(1,"span",0),s.ic(2,1),s.Sb(),s.Hc(3,g,1,0,"nx-icon",1)),2&n&&(s.Bb(3),s.kc("ngIf",e.expandable))},directives:[o.t,m.a],styles:["[_nghost-%COMP%]{display:flex;align-items:center;background:var(--menu-button-background-color);color:var(--menu-button-text-color);-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none;box-shadow:none;border:none;margin:0;cursor:pointer;line-height:24px;font-weight:400;font-size:18px;width:100%;transition:all .2s ease,padding none 0;text-decoration:none;padding:24px}[_nghost-%COMP%]:hover{background:var(--menu-button-hover-background-color)}.is-expanded[_nghost-%COMP%]{font-weight:700;background:var(--menu-button-expanded-background-color);color:var(--menu-button-expanded-text-color);border-color:var(--menu-button-expanded-border-color)}.is-expanded[_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%]{transform:rotate(180deg)}.nx-menu-button--nested[_nghost-%COMP%]{background:var(--menu-button-nested-background-color)}.nx-menu-button--nested.is-expanded[_nghost-%COMP%]{background:var(--menu-button-nested-expanded-background-color);border-color:var(--menu-button-nested-expanded-border-color);color:var(--menu-button-nested-expanded-color)}[_nghost-%COMP%]::-moz-focus-inner{border:0}.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:var(--focus-inset-box-shadow);border-radius:8px;border:none}@media screen and (-ms-high-contrast:active){.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:inset 0 0 0 4px windowText,inset 0 0 0 6px background}}.nx-menu-button__expand-icon[_ngcontent-%COMP%]{display:flex;justify-content:center;transition:all .2s ease;transform:rotate(0);width:16px;height:24px;margin-right:8px;flex:0 0 auto;font-size:24px}[dir=rtl][_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}.nx-menu-button__label[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 1 auto;text-align:left;line-height:1;padding:4px 0}[dir=rtl][_nghost-%COMP%]   .nx-menu-button__label[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-menu-button__label[_ngcontent-%COMP%]{text-align:right}  .nx-menu-button__icon{margin-right:16px;height:24px;font-weight:400;flex:0 0 auto}[dir=rtl][_nghost-%COMP%]     .nx-menu-button__icon, [dir=rtl]   [_nghost-%COMP%]     .nx-menu-button__icon{margin-right:0;margin-left:16px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%], .is-expanded[_nghost-%COMP%], .nx-menu-button--nested[_nghost-%COMP%], .nx-menu-button--nested.is-expanded[_nghost-%COMP%]{-ms-high-contrast-adjust:none;color:buttonText;background-color:buttonFace}.nx-menu-button--nested.is-expanded[_nghost-%COMP%]:hover, [_nghost-%COMP%]:hover{background-color:highlight;color:highlightText;border-bottom-color:windowText}}"],changeDetection:0}),n})(),k=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275dir=s.Ib({type:n,selectors:[["","nxMenuButtonIcon",""]],hostAttrs:[1,"nx-menu-button__icon"]}),n})(),y=(()=>{class n{}return n.\u0275mod=s.Lb({type:n}),n.\u0275inj=s.Kb({factory:function(e){return new(e||n)},imports:[[o.c,c.c]]}),n})();var M=t("kPBv"),v=t("Bxd4"),C=t("vxPo"),w=t("tPQ2"),P=t("fk+C");function T(n,e){if(1&n&&(s.Tb(0,"a",8),s.Jc(1),s.Sb()),2&n){const n=e.$implicit;s.kc("queryParams",n.query),s.Bb(1),s.Lc(" ",n.label," ")}}function B(n,e){if(1&n&&(s.Tb(0,"nx-tree-node",6),s.Hc(1,T,2,2,"a",7),s.Sb()),2&n){const n=e.$implicit;s.Bb(1),s.kc("ngForOf",n.links)}}function I(n,e){if(1&n&&s.Ob(0,"nx-icon",11),2&n){const n=s.ec().$implicit;s.kc("name",n.icon)}}function S(n,e){if(1&n&&(s.Tb(0,"nx-tree-node"),s.Tb(1,"button",9),s.Hc(2,I,1,1,"nx-icon",10),s.Jc(3),s.Sb(),s.Sb()),2&n){const n=e.$implicit,t=s.ec();s.Bb(1),s.kc("nxMenuItem",n.icon?"s":"l")("expanded",t._treeControl.isExpanded(n))("nxType",0===n.level?"root":"nested"),s.Bb(1),s.kc("ngIf",n.icon),s.Bb(1),s.Lc(" ",n.label," ")}}let q=(()=>{class n{constructor(){this.navigationData=[{label:"Option 1",icon:"file",children:[{label:"Option 1.1",children:[{links:[{label:"Option 1.2.1",query:{a:"1.1.1"}},{label:"Option 1.1.2",query:{a:"1.1.2"}},{label:"Option 1.1.3",query:{a:"1.1.3"}}]}]},{label:"Option 1.2",children:[{links:[{label:"Option 1.2.1",query:{a:"1.2.1"}},{label:"Option 1.2.2",query:{a:"1.2.2"}},{label:"Option 1.2.3",query:{a:"1.2.3"}}]}]},{label:"Option 1.3",children:[{links:[{label:"Option 1.3.1",query:{a:"1.3.1"}},{label:"Option 1.3.2",query:{a:"1.3.2"}},{label:"Option 1.3.3",query:{a:"1.3.3"}}]}]}]},{label:"Option 2",icon:"user-o",children:[{label:"Option 2.1",children:[{links:[{label:"Option 2.2.1",query:{a:"2.1.1"}},{label:"Option 2.1.2",query:{a:"2.1.2"}},{label:"Option 2.1.3",query:{a:"2.1.3"}}]}]},{label:"Option 2.2",children:[{links:[{label:"Option 2.2.1",query:{a:"2.2.1"}},{label:"Option 2.2.2",query:{a:"2.2.2"}},{label:"Option 2.2.3",query:{a:"2.2.3"}}]}]},{label:"Option 2.3",children:[{links:[{label:"Option 2.3.1",query:{a:"2.3.1"}},{label:"Option 2.3.2",query:{a:"2.3.2"}},{label:"Option 2.3.3",query:{a:"2.3.3"}}]}]}]},{label:"Option 3",icon:"setting",children:[{links:[{label:"Option 3.1",query:{a:"3.1"}},{label:"Option 3.2",query:{a:"3.2"}},{label:"Option 3.3",query:{a:"3.3"}}]}]}],this._hasChild=(n,e)=>e.expandable,this._treeControl=new a.a,this._dataSource=new a.b(this._treeControl,this.navigationData)}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu-example"]],decls:8,vars:3,consts:[["name","bars","role","button","size","s",3,"click"],["menu",""],[3,"dataSource","treeControl"],["nxMenuItem","l",4,"nxTreeNodeDef"],[4,"nxTreeNodeDef","nxTreeNodeDefWhen"],["nxButton","","type","button",1,"close-menu",3,"click"],["nxMenuItem","l"],["nxMenuLink","","routerLink","./",3,"queryParams",4,"ngFor","ngForOf"],["nxMenuLink","","routerLink","./",3,"queryParams"],["nxMenuButton","","nxTreeNodeToggle","","expandable","","type","button",3,"nxMenuItem","expanded","nxType"],["nxMenuButtonIcon","","size","s",3,"name",4,"ngIf"],["nxMenuButtonIcon","","size","s",3,"name"]],template:function(n,e){if(1&n){const n=s.Ub();s.Tb(0,"nx-icon",0),s.ac("click",(function(){return s.vc(n),s.rc(2).toggle()})),s.Sb(),s.Tb(1,"nx-menu",null,1),s.Tb(3,"nx-tree",2),s.Hc(4,B,2,1,"nx-tree-node",3),s.Hc(5,S,4,5,"nx-tree-node",4),s.Sb(),s.Tb(6,"button",5),s.ac("click",(function(){return s.vc(n),s.rc(2).toggle()})),s.Jc(7,"close menu"),s.Sb(),s.Sb()}2&n&&(s.Bb(3),s.kc("dataSource",e._dataSource)("treeControl",e._treeControl),s.Bb(2),s.kc("nxTreeNodeDefWhen",e._hasChild))},directives:[m.a,d,v.a,C.b,w.a,C.a,x,o.s,b,i.h,O,P.a,o.t,k],styles:[".close-menu[_ngcontent-%COMP%]{margin:64px 24px}"]}),n})();const F=["class","example"];let D=(()=>{class n{constructor(){this.primaryExpanded=!1,this.secondaryExpanded=!1}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu-button",8,"example"]],attrs:F,decls:10,vars:2,consts:[["nxMenuButton","","nxType","root","type","button"],["name","file","size","s","nxMenuButtonIcon",""],["nxMenuButton","","nxType","root","expandable","","type","button",3,"expanded","click"],["nxMenuButton","","nxType","nested","type","button"],["nxMenuButton","","nxType","nested","expandable","","type","button",3,"expanded","click"]],template:function(n,e){1&n&&(s.Tb(0,"button",0),s.Ob(1,"nx-icon",1),s.Jc(2," Option 1 (root level)\n"),s.Sb(),s.Tb(3,"button",2),s.ac("click",(function(){return e.primaryExpanded=!e.primaryExpanded})),s.Ob(4,"nx-icon",1),s.Jc(5," Option 2 (root level, expandable)\n"),s.Sb(),s.Tb(6,"button",3),s.Jc(7," Option 2.1 (nested level)\n"),s.Sb(),s.Tb(8,"button",4),s.ac("click",(function(){return e.secondaryExpanded=!e.secondaryExpanded})),s.Jc(9," Option 2.2 (nested level, expandable)\n"),s.Sb()),2&n&&(s.Bb(3),s.kc("expanded",e.primaryExpanded),s.Bb(5),s.kc("expanded",e.secondaryExpanded))},directives:[O,m.a,k],styles:["[_nghost-%COMP%]{display:block}"]}),n})();const z=["class","example"];function H(n,e){if(1&n&&(s.Tb(0,"a",5),s.Jc(1),s.Sb()),2&n){const n=e.$implicit;s.Bb(1),s.Kc(n.label)}}function L(n,e){if(1&n&&(s.Tb(0,"div",3),s.Hc(1,H,2,1,"a",4),s.Sb()),2&n){const n=s.ec().$implicit;s.Bb(1),s.kc("ngForOf",n.children)}}function J(n,e){if(1&n){const n=s.Ub();s.Rb(0),s.Tb(1,"button",1),s.ac("click",(function(){s.vc(n);const t=e.$implicit;return s.ec().onClick(t)})),s.Jc(2),s.Sb(),s.Hc(3,L,2,1,"div",2),s.Qb()}if(2&n){const n=e.$implicit;s.Bb(1),s.kc("expandable",!!n.children)("expanded",n.expanded),s.Bb(1),s.Lc(" ",n.label," "),s.Bb(1),s.kc("ngIf",n.children&&n.expanded)}}let j=(()=>{class n{constructor(){this.menuData=[{label:"Option 1",expanded:!1,children:[{label:"Option 1.1"},{label:"Option 1.2"},{label:"Option 1.3"}]},{label:"Option 2",expanded:!1,children:[{label:"Option 2.1"},{label:"Option 2.2"},{label:"Option 2.3"}]},{label:"Option 3"}]}onClick(n){n.expanded=!n.expanded}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu-item",8,"example"]],attrs:z,decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["nxMenuButton","","nxType","root","nxMenuItem","","type","button",3,"expandable","expanded","click"],["nxMenuItem","",4,"ngIf"],["nxMenuItem",""],["nxMenuLink","","href","javascript:void(0)",4,"ngFor","ngForOf"],["nxMenuLink","","href","javascript:void(0)"]],template:function(n,e){1&n&&s.Hc(0,J,4,4,"ng-container",0),2&n&&s.kc("ngForOf",e.menuData)},directives:[o.s,O,x,o.t,b],styles:["[_nghost-%COMP%]{display:block}"]}),n})();const R=["class","example"];function E(n,e){if(1&n&&(s.Tb(0,"a",6),s.Jc(1),s.Sb()),2&n){const n=e.$implicit;s.Bb(1),s.Kc(n.label)}}function $(n,e){if(1&n&&(s.Tb(0,"div",4),s.Hc(1,E,2,1,"a",5),s.Sb()),2&n){const n=s.ec().$implicit;s.Bb(1),s.kc("ngForOf",n.children)}}function N(n,e){if(1&n){const n=s.Ub();s.Rb(0),s.Tb(1,"button",1),s.ac("click",(function(){s.vc(n);const t=e.$implicit;return s.ec().onClick(t)})),s.Ob(2,"nx-icon",2),s.Jc(3),s.Sb(),s.Hc(4,$,2,1,"div",3),s.Qb()}if(2&n){const n=e.$implicit;s.Bb(1),s.kc("expandable",!!n.children)("expanded",n.expanded),s.Bb(1),s.kc("name",n.icon),s.Bb(1),s.Lc(" ",n.label," "),s.Bb(1),s.kc("ngIf",n.children&&n.expanded)}}let A=(()=>{class n{constructor(){this.menuData=[{label:"Option 1",expanded:!1,icon:"file",children:[{label:"Option 1.1"},{label:"Option 1.2"},{label:"Option 1.3"}]},{label:"Option 2",icon:"file",children:[{label:"Option 2.1"},{label:"Option 2.2"},{label:"Option 2.3"}]},{label:"Option 3",icon:"user-o"}]}onClick(n){n.expanded=!n.expanded}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu-item-with-icons",8,"example"]],attrs:R,decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["nxMenuButton","","nxType","root","nxMenuItem","","type","button",3,"expandable","expanded","click"],["nxMenuButtonIcon","","size","s",3,"name"],["nxMenuItem","l",4,"ngIf"],["nxMenuItem","l"],["nxMenuLink","","href","javascript:void(0)",4,"ngFor","ngForOf"],["nxMenuLink","","href","javascript:void(0)"]],template:function(n,e){1&n&&s.Hc(0,N,5,5,"ng-container",0),2&n&&s.kc("ngForOf",e.menuData)},directives:[o.s,O,x,m.a,k,o.t,b],styles:["[_nghost-%COMP%]{display:block}"]}),n})();const K=["class","example"];let Q=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=s.Hb({type:n,selectors:[["nx-menu-link",8,"example"]],attrs:K,decls:6,vars:0,consts:[["nxMenuLink","","href","javascript:void(0)"]],template:function(n,e){1&n&&(s.Tb(0,"a",0),s.Jc(1,"Menu link A"),s.Sb(),s.Tb(2,"a",0),s.Jc(3,"Menu link B"),s.Sb(),s.Tb(4,"a",0),s.Jc(5,"Menu link C"),s.Sb())},directives:[b],styles:["[_nghost-%COMP%]{display:block}button[_ngcontent-%COMP%] + button[_ngcontent-%COMP%]{margin-top:32px}"]}),n})(),U=(()=>{class n{static components(){return{menu:q,"menu-button":D,"menu-item":j,"menu-item-with-icons":A,"menu-link":Q}}}return n.\u0275mod=s.Lb({type:n}),n.\u0275inj=s.Kb({factory:function(e){return new(e||n)},imports:[[M.b,y,c.c,a.c,i.i,o.c]]}),n})()}}]);