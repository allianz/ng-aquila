import{a as A,b as R}from"./chunk-6IMJ3OVX.js";import{a as m,b as Q}from"./chunk-BP2HZ73T.js";import{a as I,b as L,c as p,d as H}from"./chunk-4TTPH4Z5.js";import"./chunk-AZNKYEEF.js";import{g,j as _}from"./chunk-5RFPKINN.js";import{p as B}from"./chunk-PNCA27QO.js";import"./chunk-K3MRPJ7U.js";import"./chunk-5CERBW6K.js";import"./chunk-LK5X6SR6.js";import"./chunk-7ONGEGSB.js";import"./chunk-2BGO346T.js";import{B as O,n as F}from"./chunk-UUZACKYZ.js";import{Ac as S,Eb as c,Kb as D,Lb as l,Mb as a,Nb as M,Ob as N,Pb as P,Yb as y,fc as r,hc as T,jc as h,ma as k,tb as x,ua as n,va as C,xc as E,yc as w}from"./chunk-QYP2T7PT.js";var X=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-basic-example"]],decls:2,vars:0,consts:[["type","active","nxTooltip","This message gets displayed in a tooltip"]],template:function(o,s){o&1&&(l(0,"nx-badge",0),r(1,` I have a tooltip
`),a())},dependencies:[p,m]});let e=t;return e})();var V=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-delay-example"]],decls:2,vars:2,consts:[["nxButton","","nxTooltip","This message appears after 1 second","type","button",3,"nxTooltipShowDelay","nxTooltipHideDelay"]],template:function(o,s){o&1&&(l(0,"button",0),r(1,` Delayed tooltip
`),a()),o&2&&c("nxTooltipShowDelay",1e3)("nxTooltipHideDelay",1500)},dependencies:[p,g]});let e=t;return e})();var q=(()=>{let t=class t{constructor(){this.disabled=!1}toggle(){this.disabled=!this.disabled}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-disabled-example"]],decls:4,vars:2,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["nxButton","","nxTooltip","This is a tooltip","type","button",3,"nxTooltipDisabled"]],template:function(o,s){o&1&&(l(0,"button",0),y("click",function(){return s.toggle()}),r(1),a(),l(2,"button",1),r(3,` I have a tooltip
`),a()),o&2&&(x(1),T(" ",s.disabled?"en":"dis",`able tooltip
`),x(1),c("nxTooltipDisabled",s.disabled))},dependencies:[p,g],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]});let e=t;return e})();var G=(()=>{let t=class t{constructor(){this.data=[{nxTooltipPosition:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxTooltipPosition:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxTooltipPosition",key:"nxTooltipPosition",type:"string"},{title:"fallback\xA01",key:"fallback1",type:"string"},{title:"fallback\xA02",key:"fallback2",type:"string"},{title:"fallback\xA03",key:"fallback3",type:"string"},{title:"fallback\xA04",key:"fallback4",type:"string"},{title:"fallback\xA05",key:"fallback5",type:"string"},{title:"fallback\xA06",key:"fallback6",type:"string"},{title:"fallback\xA07",key:"fallback7",type:"string"}]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-fallbacks-table-example"]],decls:1,vars:2,consts:[[3,"data","displayedColumns"]],template:function(o,s){o&1&&M(0,"nx-dynamic-table",0),o&2&&c("data",s.data)("displayedColumns",s.displayedColumns)},dependencies:[A],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]});let e=t;return e})();function K(e,t){if(e&1&&(N(0),l(1,"nx-badge",1),r(2),a(),P()),e&2){let v=t.$implicit;x(1),c("nxTooltipPosition",v)("nxTooltip","This tooltip is on the "+v),x(1),T(" ",v," ")}}var U=(()=>{let t=class t{constructor(){this.positions=["top","right","bottom","left"]}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-positions-example"]],decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["type","active",3,"nxTooltipPosition","nxTooltip"]],template:function(o,s){o&1&&D(0,K,3,3,"ng-container",0),o&2&&c("ngForOf",s.positions)},dependencies:[p,F,m],styles:["[_nghost-%COMP%]{display:flex;margin:0 -16px;align-items:flex-start;flex-wrap:wrap}nx-badge[_ngcontent-%COMP%]{margin:16px;flex-shrink:0}"]});let e=t;return e})();var Y=(()=>{let t=class t{toggle(){this.tooltip.toggle()}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-programmatic-example"]],viewQuery:function(o,s){if(o&1&&w(p,7),o&2){let b;E(b=S())&&(s.tooltip=b.first)}},decls:4,vars:0,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["type","active","nxTooltip","This tooltip is controlled by a button"]],template:function(o,s){o&1&&(l(0,"button",0),y("click",function(){return s.toggle()}),r(1,` toggle tooltip
`),a(),l(2,"nx-badge",1),r(3,` I have a tooltip
`),a())},dependencies:[p,g,m],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]});let e=t;return e})();function W(e){return()=>e.scrollStrategies.close({threshold:100})}var $=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-scroll-strategy-provider-example"]],features:[h([{provide:I,useFactory:W,deps:[B]}])],decls:2,vars:0,consts:[["type","active","nxTooltip","Tooltip"]],template:function(o,s){o&1&&(l(0,"nx-badge",0),r(1,"I have a tooltip"),a())},dependencies:[p,m]});let e=t;return e})();var Z={position:"right",showDelay:500,hideDelay:0,touchendHideDelay:1500},z=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-settings-example"]],features:[h([{provide:L,useValue:Z}])],decls:2,vars:0,consts:[["type","active","nxTooltip","This is a tooltip"]],template:function(o,s){o&1&&(l(0,"nx-badge",0),r(1,` I have a tooltip
`),a())},dependencies:[p,m]});let e=t;return e})();var J=(()=>{let t=class t{};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=n({type:t,selectors:[["tooltip-trim-text-example"]],decls:2,vars:0,consts:[["type","active","nxTooltip","Hover me to see full text",1,"trim-text"]],template:function(o,s){o&1&&(l(0,"nx-badge",0),r(1,` Hover me to see full text
`),a())},dependencies:[p,m],styles:[".trim-text[_ngcontent-%COMP%]{text-overflow:ellipsis;max-width:11ch;white-space:nowrap;overflow:hidden}"],changeDetection:0});let e=t;return e})();var wt=(()=>{let t=class t{static components(){return{"tooltip-trim-text":J,"tooltip-basic":X,"tooltip-delay":V,"tooltip-disabled":q,"tooltip-fallbacks-table":G,"tooltip-positions":U,"tooltip-programmatic":Y,"tooltip-settings":z,"tooltip-scroll-strategy-provider":$}}};t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=C({type:t}),t.\u0275inj=k({imports:[H,R,O,_,Q]});let e=t;return e})();export{wt as TooltipExamplesModule};