import{a as g}from"./chunk-TGA3OXY4.js";import{$ as s,F as m,ea as l,ja as c,n as u,pa as d,t as a,x as f}from"./chunk-LG2ZA55B.js";var L=(()=>{class t{isErrorState(n,e){return!!(n?.invalid&&(n.touched||e?.submitted))}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();function S(t){return t!==null}function M(t){return t!=null}function O(t){return t!==void 0}function _(t){return!!t}function D(t){return typeof t=="string"}function K(t){return typeof t=="number"}function P(t){return typeof t=="boolean"}function C(t){return t===!0}function N(t){return t===!1}function $(t){return t===null}function j(t){return t==null}function F(t){return t===void 0}function X(t){return t!=null&&!!t.length}function G(t,i=2,n="0"){if(typeof t!="string"||t.length>=i)return t;for(;t.length<i;)t=n+t;return t}function B(t,i=[],n={}){let e=[...i];if(typeof t=="string"){let r=A(t,n);e=[...e,...r]}return e.join(" ").trim()}function A(t,i={}){let n=[];if(typeof t=="string"){let e=t.split(" "),r=Object.keys(i);n=e.map(o=>r.includes(o)?i[o]:o)}return n}function U(t,i,n){t&&i&&n&&n.split(" ").forEach(e=>{t.addClass(i.nativeElement,e)})}function W(t,i,n){t&&i&&n&&n.split(" ").forEach(e=>{t.removeClass(i.nativeElement,e)})}function z(t){let{font:i,fontStyle:n,fontVariant:e,fontWeight:r,fontSize:o,lineHeight:p,fontFamily:E}=t;return i.length>0?i:`${n} ${e} ${r} ${o}/${p} ${E}`}function H(t,i=0,n=1){return Math.max(i,Math.min(n,t))}function Y(){return Math.random().toString(36)}var R=function(t){return t[t.BREAKPOINT_XSMALL=0]="BREAKPOINT_XSMALL",t[t.BREAKPOINT_SMALL=320]="BREAKPOINT_SMALL",t[t.BREAKPOINT_MEDIUM=704]="BREAKPOINT_MEDIUM",t[t.BREAKPOINT_LARGE=992]="BREAKPOINT_LARGE",t[t.BREAKPOINT_XLARGE=1280]="BREAKPOINT_XLARGE",t[t.BREAKPOINT_2XLARGE=1472]="BREAKPOINT_2XLARGE",t[t.BREAKPOINT_3XLARGE=1760]="BREAKPOINT_3XLARGE",t}(R||{}),h=200,V=(()=>{class t{constructor(){this._platform=d(g),this.viewportChange$=this._platform.isBrowser?m(window,"resize").pipe(f(()=>window.innerWidth)):u}min(n,e=h){return this._platform.isBrowser?this.viewportChange$.pipe(s(window.innerWidth),l(e,a,{trailing:!0}),f(r=>r>=n)):u}max(n,e=h){return this._platform.isBrowser?this.viewportChange$.pipe(s(window.innerWidth),l(e,a,{trailing:!0}),f(r=>r<n)):u}between(n,e,r=h){return this._platform.isBrowser?this.viewportChange$.pipe(s(window.innerWidth),l(r,a,{trailing:!0}),f(o=>o>=n&&o<e)):u}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275prov=c({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{L as a,S as b,M as c,O as d,_ as e,D as f,K as g,P as h,C as i,N as j,$ as k,j as l,F as m,X as n,G as o,B as p,U as q,W as r,z as s,H as t,Y as u,R as v,V as w};