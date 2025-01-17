import{c as A,e as p}from"./chunk-V5XCZUGO.js";import{q as k}from"./chunk-2EQ73B6L.js";import{a as c}from"./chunk-APNBV455.js";import{z as y}from"./chunk-CCSED5RY.js";import{Ac as l,Ec as b,Gc as P,Hc as O,Lb as h,Mb as f,Nb as m,Oa as g,Rb as u,dc as C,ed as w,gc as s,ka as _,lc as a,mc as d,nc as M,wb as r,xb as i,zc as v}from"./chunk-LG2ZA55B.js";var I=["nxAction",""],N=["*",[["","nxActionIcon",""]]],z=["*","[nxActionIcon]"];function F(n,D){n&1&&M(0,"nx-icon",1)}function R(n,D){n&1&&(a(0,"span",2),l(1,1),d())}var T=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275dir=m({type:n,selectors:[["","nxActionIcon",""]],hostAttrs:[1,"nx-action__icon"]})}}return n})(),S=(()=>{class n{set selected(t){this._selected=c(t),this._cdr.markForCheck()}get selected(){return this._selected}set expandable(t){this._expandable=c(t),this._cdr.markForCheck()}get expandable(){return this._expandable}set expanded(t){this._expanded=c(t),this._cdr.markForCheck()}get expanded(){return this._expanded}constructor(t,e,o){this._cdr=t,this._elementRef=e,this._focusMonitor=o,this._selected=!1,this._expandable=!1,this._expanded=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}static{this.\u0275fac=function(e){return new(e||n)(i(w),i(g),i(k))}}static{this.\u0275cmp=h({type:n,selectors:[["","nxAction",""]],contentQueries:function(e,o,j){if(e&1&&b(j,T,5),e&2){let x;P(x=O())&&(o._iconChild=x.first)}},hostAttrs:[1,"nx-action"],hostVars:6,hostBindings:function(e,o){e&2&&C("is-expanded",o.expanded)("is-selected",o.selected)("is-expandable",o.expandable)},inputs:{selected:"selected",expandable:"expandable",expanded:"expanded"},attrs:I,ngContentSelectors:z,decls:5,vars:2,consts:[[1,"nx-action__wrapper"],["name","chevron-right","aria-hidden","true",1,"nx-action__expand-icon"],[1,"nx-action-icon__container"],[1,"nx-action__label"]],template:function(e,o){e&1&&(v(N),a(0,"div",0),u(1,F,1,0,"nx-icon",1)(2,R,2,0,"span",2),a(3,"span",3),l(4),d()()),e&2&&(r(),s(o.expandable?1:-1),r(),s(o._iconChild?2:-1))},dependencies:[p,A],styles:['.nx-action[_nghost-%COMP%]{display:block;font-size:var(--action-font-size);line-height:var(--action-line-height);font-weight:var(--action-font-weight);letter-spacing:var(--action-letter-spacing);appearance:none;outline:none;box-shadow:none;border:none;margin:0;cursor:pointer;padding:8px 16px 8px 0;width:100%;transition:all .2s ease,padding 0 none;text-decoration:none;color:var(--action-color);background-color:var(--action-background-color)}.nx-action[_nghost-%COMP%]:hover{color:var(--action-hover-color);background-color:var(--action-hover-background-color)}.nx-action.is-expanded[_nghost-%COMP%]{font-weight:700}.nx-action.is-expanded[_nghost-%COMP%]   .nx-action__expand-icon[_ngcontent-%COMP%]{transform:rotate(90deg)}.nx-action.is-expandable[_nghost-%COMP%]   .nx-action__wrapper[_ngcontent-%COMP%]:before{flex:0 1 32px;max-width:8px;min-width:4px}.nx-action.is-selected[_nghost-%COMP%]{color:var(--action-selected-color);background-color:var(--action-selected-background-color);font-weight:700}.nx-action.nx-tree-node--with-padding[_nghost-%COMP%]   .nx-action__wrapper[_ngcontent-%COMP%]:before{flex-shrink:0}.nx-action[_nghost-%COMP%]::-moz-focus-inner{border:0}[dir=rtl]   .nx-action[_nghost-%COMP%]{padding:8px 0 8px 16px}.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:var(--focus-inset-box-shadow);border-radius:8px}@media screen and (forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:inset 0 0 0 4px CanvasText,inset 0 0 0 6px background;border:4px solid CanvasText}}.nx-action__expand-icon[_ngcontent-%COMP%]{display:flex;justify-content:center;transition:all .2s ease;transform:rotate(0);margin-right:8px;margin-top:3px;flex:0 0 auto;font-size:var(--action-expand-icon-size)}[dir=rtl][_nghost-%COMP%]   .nx-action__expand-icon[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-action__expand-icon[_ngcontent-%COMP%]{margin-right:initial;margin-left:8px;transform:rotate(180deg)}.nx-action__wrapper[_ngcontent-%COMP%]{display:flex;align-items:flex-start;position:relative;overflow:hidden}.nx-action__wrapper[_ngcontent-%COMP%]:before{content:"";display:block;flex:0 1 32px;min-width:16px;height:1em}.nx-action-icon__container[_ngcontent-%COMP%]{font-size:var(--action-icon-size);padding-right:16px;flex:0 0 auto;position:relative;justify-content:center;display:flex;margin-top:2px}[dir=rtl][_nghost-%COMP%]   .nx-action-icon__container[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-action-icon__container[_ngcontent-%COMP%]{padding-right:initial;padding-left:16px}  .nx-action__icon{font-weight:400}  .nx-action__icon.nx-icon--s{font-size:inherit}.nx-action__label[_ngcontent-%COMP%]{flex:1 1 50%;text-align:left;word-break:break-word}[dir=rtl][_nghost-%COMP%]   .nx-action__label[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .nx-action__label[_ngcontent-%COMP%]{text-align:right}@media screen and (forced-colors: active){.nx-action.is-selected[_nghost-%COMP%], .nx-action[_nghost-%COMP%]:hover{forced-colors-adjust:none;background-color:highlight;color:highlightText;forced-color-adjust:preserve-parent-color;font-weight:400}}'],changeDetection:0})}}return n})(),G=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=f({type:n})}static{this.\u0275inj=_({imports:[p,y,S]})}}return n})();export{T as a,S as b,G as c};
