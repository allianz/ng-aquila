import{c as O,e as b}from"./chunk-M2DE53BR.js";import{q as f}from"./chunk-T6V2L5QF.js";import{a}from"./chunk-EOEWAY3L.js";import{A as y}from"./chunk-PVCVFPWW.js";import{Eb as i,Ec as h,Fc as s,Qb as c,Ra as d,Rb as C,Sb as r,Wb as u,fc as l,ic as p,jd as g,lc as x,na as M,qc as m,rc as _,sc as k,yb as v}from"./chunk-QFNFGJ3Y.js";var D=["*"];function w(e,P){e&1&&(m(0,"div",0),s(1),_())}var I=["nxMenuButton",""],B=[[["","nxMenuButtonIcon",""]],"*"],N=["[nxMenuButtonIcon]","*"];function j(e,P){e&1&&k(0,"nx-icon",1)}var V=(()=>{class e{set open(t){let n=a(t);n!==this._open&&(this._open=n,this._cdr.markForCheck())}get open(){return this._open}constructor(t){this._cdr=t,this._open=!1}toggle(){this.open=!this.open}static{this.\u0275fac=function(n){return new(n||e)(i(g))}}static{this.\u0275cmp=c({type:e,selectors:[["nx-menu"]],hostVars:1,hostBindings:function(n,o){n&2&&l("aria-expanded",o.open)},inputs:{open:"open"},ngContentSelectors:D,decls:1,vars:1,consts:[[1,"nx-menu__wrapper"]],template:function(n,o){n&1&&(h(),u(0,w,2,0,"div",0)),n&2&&x(o.open?0:-1)},styles:[".nx-menu[_nghost-%COMP%]{display:block}.nx-menu__wrapper[_ngcontent-%COMP%]{position:fixed;inset:60px 0 0;z-index:1;overflow:auto;background:var(--menu-background-color)}  .nx-menu__link{display:block;padding:12px 0;font-size:18px;line-height:24px;outline:none}  .nx-menu__link+.nx-menu__link{margin-top:8px}  .nx-menu__link.cdk-keyboard-focused{box-shadow:var(--focus-box-shadow);border-radius:4px;outline:none}@media screen and (forced-colors: active),(forced-colors: active){  .nx-menu__link.cdk-keyboard-focused{box-shadow:0 0 0 2px background,0 0 0 6px CanvasText;outline:4px solid CanvasText;outline-offset:2px}}  .nx-menu__item.nx-menu__item--small,   .nx-menu__item.nx-menu__item--large{padding:24px;border-bottom:1px solid var(--menu-item-border-color)}@media screen and (forced-colors: active){  .nx-menu__item.nx-menu__item--small,   .nx-menu__item.nx-menu__item--large{border-bottom-color:CanvasText}}  .nx-menu__item.nx-menu__item--large{padding-left:64px}[dir=rtl][_nghost-%COMP%]     .nx-menu__item.nx-menu__item--large, [dir=rtl]   [_nghost-%COMP%]     .nx-menu__item.nx-menu__item--large{padding-right:64px;padding-left:initial}@media screen and (forced-colors: active){  .nx-menu__link{text-decoration:none}}"],changeDetection:0})}}return e})(),z=(()=>{class e{set expandable(t){this._expandable=a(t),this._cdr.markForCheck()}get expandable(){return this._expandable}set expanded(t){this._expanded=a(t),this._cdr.markForCheck()}get expanded(){return this._expanded}set type(t){(t==="root"||t==="nested")&&(this._type=t,this._cdr.markForCheck())}get type(){return this._type}constructor(t,n,o){this._cdr=t,this._focusMonitor=n,this._elementRef=o,this._expandable=!1,this._expanded=!1,this._type="root"}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}static{this.\u0275fac=function(n){return new(n||e)(i(g),i(f),i(d))}}static{this.\u0275cmp=c({type:e,selectors:[["","nxMenuButton",""]],hostAttrs:[1,"nx-menu-button"],hostVars:9,hostBindings:function(n,o){n&2&&(l("aria-expanded",o.expandable?o.expanded:null),p("is-expanded",o.expandable&&o.expanded)("is-expandable",o.expandable)("nx-menu-button--nested",o.type==="nested")("nx-menu-button--root",o.type==="root"))},inputs:{expandable:"expandable",expanded:"expanded",type:[0,"menuButtonType","type"]},attrs:I,ngContentSelectors:N,decls:4,vars:1,consts:[[1,"nx-menu-button__label"],["name","chevron-down","aria-hidden","true",1,"nx-menu-button__expand-icon"]],template:function(n,o){n&1&&(h(B),s(0),m(1,"span",0),s(2,1),_(),u(3,j,1,0,"nx-icon",1)),n&2&&(v(3),x(o.expandable?3:-1))},dependencies:[b,O],styles:["[_nghost-%COMP%]{display:flex;align-items:center;background:var(--menu-button-background-color);color:var(--menu-button-text-color);appearance:none;outline:none;box-shadow:none;border:none;margin:0;cursor:pointer;line-height:24px;font-weight:400;font-size:18px;width:100%;transition:all .2s ease,padding 0 none;text-decoration:none;padding:24px}[_nghost-%COMP%]:hover{background:var(--menu-button-hover-background-color)}.is-expanded[_nghost-%COMP%]{font-weight:700;background:var(--menu-button-expanded-background-color);color:var(--menu-button-expanded-text-color);border-color:var(--menu-button-expanded-border-color)}.is-expanded[_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%]{transform:rotate(180deg)}.nx-menu-button--nested[_nghost-%COMP%]{background:var(--menu-button-nested-background-color)}.nx-menu-button--nested.is-expanded[_nghost-%COMP%]{background:var(--menu-button-nested-expanded-background-color);border-color:var(--menu-button-nested-expanded-border-color);color:var(--menu-button-nested-expanded-color)}[_nghost-%COMP%]::-moz-focus-inner{border:0}.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:var(--focus-inset-box-shadow);border-radius:8px;border:none}@media screen and (forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:inset 0 0 0 4px CanvasText,inset 0 0 0 6px background;border:4px solid CanvasText}}.nx-menu-button__expand-icon[_ngcontent-%COMP%]{display:flex;justify-content:center;transition:all .2s ease;transform:rotate(0);width:16px;height:24px;margin-right:8px;flex:0 0 auto;font-size:24px}[dir=rtl][_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-menu-button__expand-icon[_ngcontent-%COMP%]{margin-right:initial;margin-left:8px}.nx-menu-button__label[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1 1 auto;text-align:left;line-height:1;padding:4px 0}[dir=rtl][_nghost-%COMP%]   .nx-menu-button__label[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-menu-button__label[_ngcontent-%COMP%]{text-align:right}  .nx-menu-button__icon{margin-right:16px;height:24px;font-weight:400;flex:0 0 auto}[dir=rtl][_nghost-%COMP%]     .nx-menu-button__icon, [dir=rtl]   [_nghost-%COMP%]     .nx-menu-button__icon{margin-right:initial;margin-left:16px}@media screen and (forced-colors: active){[_nghost-%COMP%], .is-expanded[_nghost-%COMP%], .nx-menu-button--nested[_nghost-%COMP%], .nx-menu-button--nested.is-expanded[_nghost-%COMP%]{forced-color-adjust:none;color:buttonText;background-color:buttonFace}[_nghost-%COMP%]:hover, .nx-menu-button--nested.is-expanded[_nghost-%COMP%]:hover{background-color:highlight;color:highlightText;border-bottom-color:CanvasText}}"],changeDetection:0})}}return e})(),H=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275dir=r({type:e,selectors:[["","nxMenuButtonIcon",""]],hostAttrs:[1,"nx-menu-button__icon"]})}}return e})(),L=(()=>{class e{constructor(){this._size="s"}set size(t){this._size=t==="l"?"l":"s"}get size(){return this._size}static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275dir=r({type:e,selectors:[["","nxMenuItem",""]],hostAttrs:[1,"nx-menu__item"],hostVars:4,hostBindings:function(n,o){n&2&&p("nx-menu__item--small",o.size==="s")("nx-menu__item--large",o.size==="l")},inputs:{size:[0,"nxMenuItem","size"]}})}}return e})(),U=(()=>{class e{constructor(t,n){this._elementRef=t,this._focusMonitor=n}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}static{this.\u0275fac=function(n){return new(n||e)(i(d),i(f))}}static{this.\u0275dir=r({type:e,selectors:[["a","nxMenuLink",""]],hostAttrs:[1,"nx-menu__link"]})}}return e})();var X=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=C({type:e})}static{this.\u0275inj=M({imports:[y,b,z]})}}return e})();export{V as a,z as b,H as c,L as d,U as e,X as f};
