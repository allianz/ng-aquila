import{a as R}from"./chunk-WJPAIXGU.js";import{a as P}from"./chunk-5V76OGMQ.js";import"./chunk-42AMANVX.js";import"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import"./chunk-JQRF2ONG.js";import{a as w,b as T,g as E}from"./chunk-D6XGM6VK.js";import{q as C}from"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import"./chunk-VTTX4ZNP.js";import"./chunk-GHZ7IFWX.js";import{$b as h,Gc as k,Ia as s,Ja as p,Nb as O,Vb as l,Wb as a,ec as f,na as V,nc as x,oc as _,pc as b,qc as u,rc as m,ub as d,wb as g,ya as v,za as S}from"./chunk-O56WLCF2.js";function B(i,e){i&1&&(l(0,"div",4),m(1,"Hi there!"),a())}var N=(()=>{let e=class e{constructor(n){this.nxOverlay=n,this.fallbacks=["top","bottom"],this.config={width:250,height:250,fallbackOrientation:"vertical",direction:"left"}}open(n){this.currentOverlay&&this.currentOverlay.close(),this.currentOverlay=this.nxOverlay.open(this.template,n,this.config)}};e.\u0275fac=function(t){return new(t||e)(d(w))},e.\u0275cmp=v({type:e,selectors:[["overlay-limiting-fallbacks-example"]],viewQuery:function(t,o){if(t&1&&x(g,5),t&2){let r;_(r=b())&&(o.template=r.first)}},decls:7,vars:0,consts:[["btn1","cdkOverlayOrigin"],["template",""],[1,"nx-margin-top-0"],["nxButton","primary","cdkOverlayOrigin","",3,"click"],[2,"width","100%","height","100%"]],template:function(t,o){if(t&1){let r=h();l(0,"p",2),m(1,` The following overlay is only allowed to fallback vertically, so only top and bottom.
`),a(),l(2,"button",3,0),f("click",function(){s(r);let c=u(3);return p(o.open(c.elementRef))}),m(4,` Open
`),a(),O(5,B,2,0,"ng-template",null,1,k)}},dependencies:[C,E]});let i=e;return i})();function D(i,e){i&1&&(l(0,"div",6),m(1," Hi there! "),a())}var Q=(()=>{let e=class e{constructor(n){this.nxOverlay=n}open(n,t){this.currentOverlay&&this.currentOverlay.close(),this.currentOverlay=this.nxOverlay.open(this.template,n,{width:150,height:200,direction:t})}};e.\u0275fac=function(t){return new(t||e)(d(w))},e.\u0275cmp=v({type:e,selectors:[["overlay-positioning-example"]],viewQuery:function(t,o){if(t&1&&x(g,5),t&2){let r;_(r=b())&&(o.template=r.first)}},decls:14,vars:0,consts:[["btn1","cdkOverlayOrigin"],["btn2","cdkOverlayOrigin"],["btn3","cdkOverlayOrigin"],["btn4","cdkOverlayOrigin"],["template",""],["nxButton","primary small","cdkOverlayOrigin","",3,"click"],["nxCopytext","",1,"my-overlay-content","nx-margin-bottom-0"]],template:function(t,o){if(t&1){let r=h();l(0,"button",5,0),f("click",function(){s(r);let c=u(1);return p(o.open(c.elementRef,"top"))}),m(2,` Open to top
`),a(),l(3,"button",5,1),f("click",function(){s(r);let c=u(4);return p(o.open(c.elementRef,"bottom"))}),m(5,` Open to bottom
`),a(),l(6,"button",5,2),f("click",function(){s(r);let c=u(7);return p(o.open(c.elementRef,"left"))}),m(8,` Open to the left
`),a(),l(9,"button",5,3),f("click",function(){s(r);let c=u(10);return p(o.open(c.elementRef,"right"))}),m(11,` Open to the right
`),a(),O(12,D,2,0,"ng-template",null,4,k)}},dependencies:[C,E,P],styles:["button[_ngcontent-%COMP%] + button[_ngcontent-%COMP%]{margin-left:16px}.my-overlay-content[_ngcontent-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center}"]});let i=e;return i})();var $=(()=>{let e=class e{static components(){return{"overlay-limiting-fallbacks":N,"overlay-positioning":Q}}};e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=S({type:e}),e.\u0275inj=V({imports:[T,R]});let i=e;return i})();export{$ as OverlayExamplesModule};