import{a as q,b as G}from"./chunk-5YVPFING.js";import{a as s,b as V}from"./chunk-PYCNZMPQ.js";import{a as R,b as X,c as r,d as j}from"./chunk-6CDTKHD6.js";import"./chunk-QLBOHP4T.js";import{d as f,g as A}from"./chunk-NXSFTIR3.js";import"./chunk-FF3UHNCT.js";import{p as Q}from"./chunk-LF47FN3H.js";import"./chunk-WL5VWTEC.js";import"./chunk-R3WMHAU7.js";import"./chunk-XRY2VSZ7.js";import"./chunk-5VBHE3JW.js";import"./chunk-QT6S2IIP.js";import"./chunk-WHOJMXM2.js";import{z as H}from"./chunk-IOLPXL5O.js";import{$b as i,Ac as l,Cc as g,Hc as y,Ic as p,Rb as d,Yb as N,Zb as F,_b as w,ac as n,bc as B,ka as P,kc as b,tb as x,tc as O,ua as a,uc as I,va as _,vc as L}from"./chunk-T3XBXT64.js";var T=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-basic-example"]],standalone:!0,features:[p],decls:4,vars:0,consts:[["nxButton","secondary small","nxTooltip","This message gets displayed in a tooltip","type","button",1,"nx-margin-right-m"],["type","active","nxTooltip","This message gets displayed in a tooltip","tabindex","0"]],template:function(e,m){e&1&&(i(0,"button",0),l(1,` I have a tooltip
`),n(),i(2,"nx-badge",1),l(3,` I have a tooltip
`),n())},dependencies:[s,r]})}}return t})();var v=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-delay-example"]],standalone:!0,features:[p],decls:2,vars:2,consts:[["nxButton","","nxTooltip","This message appears after 1 second","type","button",3,"nxTooltipShowDelay","nxTooltipHideDelay"]],template:function(e,m){e&1&&(i(0,"button",0),l(1,` Delayed tooltip
`),n()),e&2&&d("nxTooltipShowDelay",1e3)("nxTooltipHideDelay",1500)},dependencies:[f,r]})}}return t})();var h=(()=>{class t{constructor(){this.disabled=!1}toggle(){this.disabled=!this.disabled}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-disabled-example"]],standalone:!0,features:[p],decls:4,vars:2,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["nxButton","","nxTooltip","This is a tooltip","type","button",3,"nxTooltipDisabled"]],template:function(e,m){e&1&&(i(0,"button",0),b("click",function(){return m.toggle()}),l(1),n(),i(2,"button",1),l(3,` I have a tooltip
`),n()),e&2&&(x(),g(" ",m.disabled?"en":"dis",`able tooltip
`),x(),d("nxTooltipDisabled",m.disabled))},dependencies:[f,r],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]})}}return t})();var C=(()=>{class t{constructor(){this.data=[{nxTooltipPosition:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxTooltipPosition:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxTooltipPosition",key:"nxTooltipPosition",type:"string"},{title:"fallback\xA01",key:"fallback1",type:"string"},{title:"fallback\xA02",key:"fallback2",type:"string"},{title:"fallback\xA03",key:"fallback3",type:"string"},{title:"fallback\xA04",key:"fallback4",type:"string"},{title:"fallback\xA05",key:"fallback5",type:"string"},{title:"fallback\xA06",key:"fallback6",type:"string"},{title:"fallback\xA07",key:"fallback7",type:"string"}]}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-fallbacks-table-example"]],standalone:!0,features:[p],decls:1,vars:2,consts:[[3,"data","displayedColumns"]],template:function(e,m){e&1&&B(0,"nx-dynamic-table",0),e&2&&d("data",m.data)("displayedColumns",m.displayedColumns)},dependencies:[q],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]})}}return t})();function Y(t,U){if(t&1&&(i(0,"nx-badge",0),l(1),n()),t&2){let o=U.$implicit;d("nxTooltipPosition",o)("nxTooltip","This tooltip is on the "+o),x(),g(" ",o,`
`)}}var k=(()=>{class t{constructor(){this.positions=["top","right","bottom","left"]}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-positions-example"]],standalone:!0,features:[p],decls:2,vars:0,consts:[["type","active","tabindex","0",3,"nxTooltipPosition","nxTooltip"]],template:function(e,m){e&1&&F(0,Y,2,3,"nx-badge",0,N),e&2&&w(m.positions)},dependencies:[s,r],styles:["[_nghost-%COMP%]{display:flex;margin:0 -16px;align-items:flex-start;flex-wrap:wrap}nx-badge[_ngcontent-%COMP%]{margin:16px;flex-shrink:0}"]})}}return t})();var D=(()=>{class t{toggle(){this.tooltip.toggle()}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-programmatic-example"]],viewQuery:function(e,m){if(e&1&&O(r,7),e&2){let u;I(u=L())&&(m.tooltip=u.first)}},standalone:!0,features:[p],decls:4,vars:0,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["type","active","nxTooltip","This tooltip is controlled by a button","tabindex","0"]],template:function(e,m){e&1&&(i(0,"button",0),b("click",function(){return m.toggle()}),l(1,` toggle tooltip
`),n(),i(2,"nx-badge",1),l(3,` I have a tooltip
`),n())},dependencies:[f,s,r],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]})}}return t})();function $(t){return()=>t.scrollStrategies.close()}var E=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-scroll-strategy-provider-example"]],standalone:!0,features:[y([{provide:R,useFactory:$,deps:[Q]}]),p],decls:2,vars:0,consts:[["type","active","nxTooltip","Tooltip","tabindex","0"]],template:function(e,m){e&1&&(i(0,"nx-badge",0),l(1,"I have a tooltip"),n())},dependencies:[s,r]})}}return t})();var z={position:"right",showDelay:500,hideDelay:0,touchendHideDelay:1500},S=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-settings-example"]],standalone:!0,features:[y([{provide:X,useValue:z}]),p],decls:2,vars:0,consts:[["type","active","nxTooltip","This is a tooltip","tabindex","0"]],template:function(e,m){e&1&&(i(0,"nx-badge",0),l(1,` I have a tooltip
`),n())},dependencies:[s,r]})}}return t})();var M=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-trim-text-example"]],standalone:!0,features:[p],decls:2,vars:0,consts:[["type","active","nxTooltip","Hover me to see full text","tabindex","0",1,"trim-text"]],template:function(e,m){e&1&&(i(0,"nx-badge",0),l(1,` Hover me to see full text
`),n())},dependencies:[s,r],styles:[".trim-text[_ngcontent-%COMP%]{text-overflow:ellipsis;max-width:11ch;white-space:nowrap;overflow:hidden}"],changeDetection:0})}}return t})();var J=[M,T,v,h,C,k,D,S,E],At=(()=>{class t{static components(){return{"tooltip-trim-text":M,"tooltip-basic":T,"tooltip-delay":v,"tooltip-disabled":h,"tooltip-fallbacks-table":C,"tooltip-positions":k,"tooltip-programmatic":D,"tooltip-settings":S,"tooltip-scroll-strategy-provider":E}}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=P({imports:[j,G,H,A,V,J]})}}return t})();export{At as TooltipExamplesModule};
