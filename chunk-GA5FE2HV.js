import{a as R}from"./chunk-SCUSIL2L.js";import{a as F}from"./chunk-Q23MZHTA.js";import"./chunk-6427IMKH.js";import"./chunk-2NCMUJ6V.js";import"./chunk-SZB43S4E.js";import"./chunk-PMVSB6VH.js";import{d as w}from"./chunk-NXSFTIR3.js";import{a as E,b as T}from"./chunk-FF3UHNCT.js";import{q as k}from"./chunk-LF47FN3H.js";import"./chunk-WL5VWTEC.js";import"./chunk-R3WMHAU7.js";import"./chunk-XRY2VSZ7.js";import"./chunk-5VBHE3JW.js";import"./chunk-QT6S2IIP.js";import"./chunk-WHOJMXM2.js";import"./chunk-IOLPXL5O.js";import{$b as r,Ac as a,Fa as c,Ga as p,Ic as b,Mb as g,Pc as C,ac as l,fc as O,ka as M,kc as s,tc as x,ua as y,ub as v,uc as h,va as P,vc as _,wb as d,zc as f}from"./chunk-T3XBXT64.js";function j(e,Q){e&1&&(r(0,"div",4),a(1,"Hi there!"),l())}var S=(()=>{class e{constructor(i){this.nxOverlay=i,this.fallbacks=["top","bottom"],this.config={width:250,height:250,fallbackOrientation:"vertical",direction:"left"}}open(i){this.currentOverlay&&this.currentOverlay.close(),this.currentOverlay=this.nxOverlay.open(this.template,i,this.config)}static{this.\u0275fac=function(t){return new(t||e)(v(E))}}static{this.\u0275cmp=y({type:e,selectors:[["overlay-limiting-fallbacks-example"]],viewQuery:function(t,o){if(t&1&&x(d,5),t&2){let n;h(n=_())&&(o.template=n.first)}},standalone:!0,features:[b],decls:7,vars:0,consts:[["btn1","cdkOverlayOrigin"],["template",""],[1,"nx-margin-top-0"],["nxButton","primary","cdkOverlayOrigin","",3,"click"],[2,"width","100%","height","100%"]],template:function(t,o){if(t&1){let n=O();r(0,"p",2),a(1,` The following overlay is only allowed to fallback vertically, so only top and bottom.
`),l(),r(2,"button",3,0),s("click",function(){c(n);let m=f(3);return p(o.open(m.elementRef))}),a(4,` Open
`),l(),g(5,j,2,0,"ng-template",null,1,C)}},dependencies:[w,k]})}}return e})();function B(e,Q){e&1&&(r(0,"div",6),a(1," Hi there! "),l())}var V=(()=>{class e{constructor(i){this.nxOverlay=i}open(i,t){this.currentOverlay&&this.currentOverlay.close(),this.currentOverlay=this.nxOverlay.open(this.template,i,{width:150,height:200,direction:t})}static{this.\u0275fac=function(t){return new(t||e)(v(E))}}static{this.\u0275cmp=y({type:e,selectors:[["overlay-positioning-example"]],viewQuery:function(t,o){if(t&1&&x(d,5),t&2){let n;h(n=_())&&(o.template=n.first)}},standalone:!0,features:[b],decls:14,vars:0,consts:[["btn1","cdkOverlayOrigin"],["btn2","cdkOverlayOrigin"],["btn3","cdkOverlayOrigin"],["btn4","cdkOverlayOrigin"],["template",""],["nxButton","primary small","cdkOverlayOrigin","",3,"click"],["nxCopytext","",1,"my-overlay-content","nx-margin-bottom-0"]],template:function(t,o){if(t&1){let n=O();r(0,"button",5,0),s("click",function(){c(n);let m=f(1);return p(o.open(m.elementRef,"top"))}),a(2,` Open to top
`),l(),r(3,"button",5,1),s("click",function(){c(n);let m=f(4);return p(o.open(m.elementRef,"bottom"))}),a(5,` Open to bottom
`),l(),r(6,"button",5,2),s("click",function(){c(n);let m=f(7);return p(o.open(m.elementRef,"left"))}),a(8,` Open to the left
`),l(),r(9,"button",5,3),s("click",function(){c(n);let m=f(10);return p(o.open(m.elementRef,"right"))}),a(11,` Open to the right
`),l(),g(12,B,2,0,"ng-template",null,4,C)}},dependencies:[w,k,F],styles:["button[_ngcontent-%COMP%] + button[_ngcontent-%COMP%]{margin-left:16px}.my-overlay-content[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center}"]})}}return e})();var D=[S,V],ne=(()=>{class e{static components(){return{"overlay-limiting-fallbacks":S,"overlay-positioning":V}}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=P({type:e})}static{this.\u0275inj=M({imports:[T,R,D]})}}return e})();export{ne as OverlayExamplesModule};
