import{a as V,b as q}from"./chunk-E23YOCSH.js";import{a as m,b as j}from"./chunk-LTPHYGOI.js";import{a as A,b as R,c as p,d as X}from"./chunk-SP5DAN74.js";import"./chunk-VV4CBK2G.js";import{d as f,g as Q}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import{p as H}from"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{z as L}from"./chunk-CCSED5RY.js";import{Fc as F,Gc as O,Hc as I,Lb as a,Mb as _,Mc as l,Oc as u,Tc as g,bc as c,ic as N,jc as S,ka as P,kc as w,lc as i,mc as n,nc as B,wb as d,wc as b}from"./chunk-LG2ZA55B.js";var y=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-basic-example"]],decls:4,vars:0,consts:[["nxButton","secondary small","nxTooltip","This message gets displayed in a tooltip","type","button",1,"nx-margin-right-m"],["type","active","nxTooltip","This message gets displayed in a tooltip","tabindex","0"]],template:function(e,r){e&1&&(i(0,"button",0),l(1,` I have a tooltip
`),n(),i(2,"nx-badge",1),l(3,` I have a tooltip
`),n())},dependencies:[m,p],encapsulation:2})}}return t})();var T=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-delay-example"]],decls:2,vars:2,consts:[["nxButton","","nxTooltip","This message appears after 1 second","type","button",3,"nxTooltipShowDelay","nxTooltipHideDelay"]],template:function(e,r){e&1&&(i(0,"button",0),l(1,` Delayed tooltip
`),n()),e&2&&c("nxTooltipShowDelay",1e3)("nxTooltipHideDelay",1500)},dependencies:[f,p],encapsulation:2})}}return t})();var v=(()=>{class t{constructor(){this.disabled=!1}toggle(){this.disabled=!this.disabled}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-disabled-example"]],decls:4,vars:2,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["nxButton","","nxTooltip","This is a tooltip","type","button",3,"nxTooltipDisabled"]],template:function(e,r){e&1&&(i(0,"button",0),b("click",function(){return r.toggle()}),l(1),n(),i(2,"button",1),l(3,` I have a tooltip
`),n()),e&2&&(d(),u(" ",r.disabled?"en":"dis",`able tooltip
`),d(),c("nxTooltipDisabled",r.disabled))},dependencies:[f,p],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]})}}return t})();var h=(()=>{class t{constructor(){this.data=[{nxTooltipPosition:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxTooltipPosition:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxTooltipPosition",key:"nxTooltipPosition",type:"string"},{title:"fallback\xA01",key:"fallback1",type:"string"},{title:"fallback\xA02",key:"fallback2",type:"string"},{title:"fallback\xA03",key:"fallback3",type:"string"},{title:"fallback\xA04",key:"fallback4",type:"string"},{title:"fallback\xA05",key:"fallback5",type:"string"},{title:"fallback\xA06",key:"fallback6",type:"string"},{title:"fallback\xA07",key:"fallback7",type:"string"}]}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-fallbacks-table-example"]],decls:1,vars:2,consts:[[3,"data","displayedColumns"]],template:function(e,r){e&1&&B(0,"nx-dynamic-table",0),e&2&&c("data",r.data)("displayedColumns",r.displayedColumns)},dependencies:[V],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]})}}return t})();function U(t,G){if(t&1&&(i(0,"nx-badge",0),l(1),n()),t&2){let o=G.$implicit;c("nxTooltipPosition",o)("nxTooltip","This tooltip is on the "+o),d(),u(" ",o,`
`)}}var C=(()=>{class t{constructor(){this.positions=["top","right","bottom","left"]}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-positions-example"]],decls:2,vars:0,consts:[["type","active","tabindex","0",3,"nxTooltipPosition","nxTooltip"]],template:function(e,r){e&1&&S(0,U,2,3,"nx-badge",0,N),e&2&&w(r.positions)},dependencies:[m,p],styles:["[_nghost-%COMP%]{display:flex;margin:0 -16px;align-items:flex-start;flex-wrap:wrap}nx-badge[_ngcontent-%COMP%]{margin:16px;flex-shrink:0}"]})}}return t})();var k=(()=>{class t{toggle(){this.tooltip.toggle()}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-programmatic-example"]],viewQuery:function(e,r){if(e&1&&F(p,7),e&2){let x;O(x=I())&&(r.tooltip=x.first)}},decls:4,vars:0,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["type","active","nxTooltip","This tooltip is controlled by a button","tabindex","0"]],template:function(e,r){e&1&&(i(0,"button",0),b("click",function(){return r.toggle()}),l(1,` toggle tooltip
`),n(),i(2,"nx-badge",1),l(3,` I have a tooltip
`),n())},dependencies:[f,m,p],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]})}}return t})();function Y(t){return()=>t.scrollStrategies.close()}var D=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-scroll-strategy-provider-example"]],features:[g([{provide:A,useFactory:Y,deps:[H]}])],decls:2,vars:0,consts:[["type","active","nxTooltip","Tooltip","tabindex","0"]],template:function(e,r){e&1&&(i(0,"nx-badge",0),l(1,"I have a tooltip"),n())},dependencies:[m,p],encapsulation:2})}}return t})();var $={position:"right",showDelay:500,hideDelay:0,touchendHideDelay:1500},E=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-settings-example"]],features:[g([{provide:R,useValue:$}])],decls:2,vars:0,consts:[["type","active","nxTooltip","This is a tooltip","tabindex","0"]],template:function(e,r){e&1&&(i(0,"nx-badge",0),l(1,` I have a tooltip
`),n())},dependencies:[m,p],encapsulation:2})}}return t})();var M=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=a({type:t,selectors:[["tooltip-trim-text-example"]],decls:2,vars:0,consts:[["type","active","nxTooltip","Hover me to see full text","tabindex","0",1,"trim-text"]],template:function(e,r){e&1&&(i(0,"nx-badge",0),l(1,` Hover me to see full text
`),n())},dependencies:[m,p],styles:[".trim-text[_ngcontent-%COMP%]{text-overflow:ellipsis;max-width:11ch;white-space:nowrap;overflow:hidden}"],changeDetection:0})}}return t})();var z=[M,y,T,v,h,C,k,E,D],Qt=(()=>{class t{static components(){return{"tooltip-trim-text":M,"tooltip-basic":y,"tooltip-delay":T,"tooltip-disabled":v,"tooltip-fallbacks-table":h,"tooltip-positions":C,"tooltip-programmatic":k,"tooltip-settings":E,"tooltip-scroll-strategy-provider":D}}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=_({type:t})}static{this.\u0275inj=P({imports:[X,q,L,Q,j,z]})}}return t})();export{Qt as TooltipExamplesModule};