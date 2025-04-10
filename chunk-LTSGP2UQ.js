import{f as I,i as V,j as m}from"./chunk-IBXNPVLQ.js";import{N as k}from"./chunk-MIQDUXHK.js";import"./chunk-HX3VF2ON.js";import{c as F,e as x}from"./chunk-M2DE53BR.js";import"./chunk-T6V2L5QF.js";import"./chunk-3CPUPH7K.js";import"./chunk-OPZB6HC2.js";import{a as j}from"./chunk-EOEWAY3L.js";import{A as T}from"./chunk-PVCVFPWW.js";import{Bc as D,Da as f,Dc as N,Ea as C,Ec as B,Fc as E,Na as p,Qb as s,Qc as L,Rb as g,Rc as a,Wb as P,fc as y,gc as u,ic as b,lc as S,na as l,qc as i,rc as r,sc as O,wc as w,yb as M}from"./chunk-QFNFGJ3Y.js";var H=["*"];function W(n,G){if(n&1&&O(0,"nx-icon",2),n&2){let t=N();u("name",t._iconName)}}var X={error:"exclamation-triangle",success:"check-circle",warning:"exclamation-circle"},c=(()=>{class n{constructor(){this._popoverDirection="bottom",this._scrollStrategy="close",this._ariaLabel="signal button",this._ariaLabelledby="",this._allowedContexts=["success","warning","error"],this.opened=new p,this.closed=new p,this._disabled=!1,this._active=!1,this._context="success"}set disabled(t){this._disabled=j(t)}get disabled(){return this._disabled}get active(){return this._active}set context(t){this._updateContext(t)}get context(){return this._context}set ariaLabel(t){this._ariaLabel=t}get ariaLabel(){return this._ariaLabel}set ariaLabelledby(t){this._ariaLabelledby=t}get ariaLabelledby(){return this._ariaLabelledby}set popoverDirection(t){this._popoverDirection=t}get popoverDirection(){return this._popoverDirection}set scrollStrategy(t){this._scrollStrategy=t}get scrollStrategy(){return this._scrollStrategy}_onActiveChange(t){this._active=t,this._active?this.opened.emit():this.closed.emit()}_updateContext(t){t!==this._context&&(this._context=t)}get _iconName(){let t=this._allowedContexts.includes(this._context)?this._context:this._allowedContexts[0];return X[t]}static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275cmp=s({type:n,selectors:[["nx-signal-button"]],hostVars:6,hostBindings:function(e,o){e&2&&b("context-success",o._context==="success")("context-warning",o._context==="warning")("context-error",o._context==="error")},inputs:{disabled:"disabled",context:"context",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],popoverDirection:"popoverDirection",scrollStrategy:"scrollStrategy"},outputs:{opened:"opened",closed:"closed"},ngContentSelectors:H,decls:5,vars:9,consts:[["signalButtonPopover",""],["type","button","nxPopoverTrigger","click",1,"nx-signal-button__button",3,"nxPopoverShowChange","nxPopoverTriggerFor","nxPopoverDirection","nxPopoverScrollStrategy","disabled"],["size","s","aria-hidden","true",1,"nx-signal-button__icon",3,"name"]],template:function(e,o){if(e&1){let d=w();B(),i(0,"button",1),D("nxPopoverShowChange",function(A){return f(d),C(o._onActiveChange(A))}),P(1,W,1,1,"nx-icon",2),r(),i(2,"nx-popover",null,0),E(4),r()}if(e&2){let d=L(3);b("is-active",o.active),u("nxPopoverTriggerFor",d)("nxPopoverDirection",o.popoverDirection)("nxPopoverScrollStrategy",o.scrollStrategy)("disabled",o.disabled),y("aria-label",o.ariaLabel)("aria-labelledby",o.ariaLabelledby),M(),S(o._iconName?1:-1)}},dependencies:[m,V,I,x,F],styles:["[_nghost-%COMP%]{display:inline-flex;vertical-align:middle}[_nghost-%COMP%]   .nx-signal-button__button[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;width:var(--signal-button-width);height:var(--signal-button-height);font-size:var(--signal-button-font-size);border-radius:var(--signal-button-border-radius);padding:0;outline:0;border:none;background:none}[_nghost-%COMP%]   .nx-signal-button__button.cdk-keyboard-focused[_ngcontent-%COMP%], [_nghost-%COMP%]   .nx-signal-button__button[_ngcontent-%COMP%]:focus-visible{box-shadow:var(--signal-button-focus-box-shadow)}[_nghost-%COMP%]   .nx-signal-button__button[disabled][_ngcontent-%COMP%]{opacity:var(--signal-button-disabled-opacity)}.context-error[_nghost-%COMP%]   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-error-icon-color)}.context-error[_nghost-%COMP%]:hover:not(:active):not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-error-hover-icon-color)}.context-error[_nghost-%COMP%]:active:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%], .context-error[_nghost-%COMP%]   .is-active[_ngcontent-%COMP%]:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-error-active-icon-color)}.context-success[_nghost-%COMP%]   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-success-icon-color)}.context-success[_nghost-%COMP%]:hover:not(:active):not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-success-hover-icon-color)}.context-success[_nghost-%COMP%]:active:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%], .context-success[_nghost-%COMP%]   .is-active[_ngcontent-%COMP%]:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-success-active-icon-color)}.context-warning[_nghost-%COMP%]   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-warning-icon-color);background:var(--signal-button-warning-icon-background-color);border-radius:50%;width:80%;height:80%}.context-warning[_nghost-%COMP%]:hover:not(:active):not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-warning-hover-icon-color)}.context-warning[_nghost-%COMP%]:active:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%], .context-warning[_nghost-%COMP%]   .is-active[_ngcontent-%COMP%]:not([disabled])   .nx-signal-button__icon[_ngcontent-%COMP%]{color:var(--signal-button-warning-active-icon-color)}"]})}}return n})(),z=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=g({type:n})}static{this.\u0275inj=l({imports:[T,m,x,k,c]})}}return n})();var h=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275cmp=s({type:n,selectors:[["signal-button-context-example"]],decls:6,vars:0,consts:[["context","success","popoverDirection","left","aria-label","Success button",1,"nx-margin-right-2xs"],["context","warning","popoverDirection","top","scrollStrategy","reposition","aria-label","Warning button",1,"nx-margin-right-2xs"],["context","error","popoverDirection","bottom","aria-label","Error button"]],template:function(e,o){e&1&&(i(0,"nx-signal-button",0),a(1,"This is the content of the success popover"),r(),i(2,"nx-signal-button",1),a(3,"This is the content of the warning popover"),r(),i(4,"nx-signal-button",2),a(5,"This is the content of the error popover"),r())},dependencies:[c],encapsulation:2})}}return n})();var v=(()=>{class n{static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275cmp=s({type:n,selectors:[["signal-button-disabled"]],decls:6,vars:0,consts:[["context","success","popoverDirection","left","disabled","",1,"nx-margin-right-2xs"],["context","warning","popoverDirection","top","disabled","",1,"nx-margin-right-2xs"],["context","error","popoverDirection","bottom","disabled",""]],template:function(e,o){e&1&&(i(0,"nx-signal-button",0),a(1,"This is the content of the success popover"),r(),i(2,"nx-signal-button",1),a(3,"This is the content of the warning popover"),r(),i(4,"nx-signal-button",2),a(5,"This is the content of the error popover"),r())},dependencies:[c],encapsulation:2})}}return n})();var q=[h,v],ut=(()=>{class n{static components(){return{"signal-button-context":h,"signal-button-disabled":v}}static{this.\u0275fac=function(e){return new(e||n)}}static{this.\u0275mod=g({type:n})}static{this.\u0275inj=l({imports:[z,q]})}}return n})();export{ut as SignalButtonExamplesModule};
