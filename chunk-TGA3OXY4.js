import{B as E}from"./chunk-CCSED5RY.js";import{Mb as h,Wa as m,ja as f,ka as l,pa as p}from"./chunk-LG2ZA55B.js";var c;try{c=typeof Intl<"u"&&Intl.v8BreakIterator}catch{c=!1}var S=(()=>{class e{_platformId=p(m);isBrowser=this._platformId?E(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||c)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(o){return new(o||e)};static \u0275prov=f({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),B=(()=>{class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=h({type:e});static \u0275inj=l({})}return e})(),r,w=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function A(){if(r)return r;if(typeof document!="object"||!document)return r=new Set(w),r;let e=document.createElement("input");return r=new Set(w.filter(t=>(e.setAttribute("type",t),e.type===t))),r}var i;function v(){if(i==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>i=!0}))}finally{i=i||!1}return i}function b(e){return v()?e:!!e.capture}var s=function(e){return e[e.NORMAL=0]="NORMAL",e[e.NEGATED=1]="NEGATED",e[e.INVERTED=2]="INVERTED",e}(s||{}),u,n;function j(){if(n==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return n=!1,n;if("scrollBehavior"in document.documentElement.style)n=!0;else{let e=Element.prototype.scrollTo;e?n=!/\{\s*\[native code\]\s*\}/.test(e.toString()):n=!1}}return n}function L(){if(typeof document!="object"||!document)return s.NORMAL;if(u==null){let e=document.createElement("div"),t=e.style;e.dir="rtl",t.width="1px",t.overflow="auto",t.visibility="hidden",t.pointerEvents="none",t.position="absolute";let d=document.createElement("div"),o=d.style;o.width="2px",o.height="1px",e.appendChild(d),document.body.appendChild(e),u=s.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,u=e.scrollLeft===0?s.NEGATED:s.INVERTED),e.remove()}return u}var a;function y(){if(a==null){let e=typeof document<"u"?document.head:null;a=!!(e&&(e.createShadowRoot||e.attachShadow))}return a}function M(e){if(y()){let t=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&t instanceof ShadowRoot)return t}return null}function _(){let e=typeof document<"u"&&document?document.activeElement:null;for(;e&&e.shadowRoot;){let t=e.shadowRoot.activeElement;if(t===e)break;e=t}return e}function P(e){return e.composedPath?e.composedPath()[0]:e.target}function O(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}export{S as a,B as b,A as c,b as d,s as e,j as f,L as g,M as h,_ as i,P as j,O as k};
