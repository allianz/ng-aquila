(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{Ahgx:function(t,l,o){"use strict";o.r(l),o.d(l,"TooltipExamplesModule",function(){return v});var e=o("gkbm"),a=o("ofXK"),i=o("iWzP"),n=o("QtNf"),s=o("X1V4"),c=o("fXoL"),p=o("LBPA"),b=o("53Q2");let r=(()=>{class t{}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-basic-example"]],decls:2,vars:0,consts:[["type","active","nxTooltip","This message gets displayed in a tooltip"]],template:function(t,l){1&t&&(c.Vb(0,"nx-badge",0),c.Jc(1," I have a tooltip\n"),c.Ub())},directives:[p.a,b.b],styles:[""]}),t})();var f=o("LTpZ");let m=(()=>{class t{}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-delay-example"]],decls:2,vars:2,consts:[["nxButton","","nxTooltip","This message appears after 1 second","type","button",3,"nxTooltipShowDelay","nxTooltipHideDelay"]],template:function(t,l){1&t&&(c.Vb(0,"button",0),c.Jc(1," Delayed tooltip\n"),c.Ub()),2&t&&c.mc("nxTooltipShowDelay",1e3)("nxTooltipHideDelay",1500)},directives:[f.a,b.b],styles:[""]}),t})(),u=(()=>{class t{constructor(){this.disabled=!1}toggle(){this.disabled=!this.disabled}}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-disabled-example"]],decls:4,vars:2,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["nxButton","","nxTooltip","This is a tooltip","type","button",3,"nxTooltipDisabled"]],template:function(t,l){1&t&&(c.Vb(0,"button",0),c.cc("click",function(){return l.toggle()}),c.Jc(1),c.Ub(),c.Vb(2,"button",1),c.Jc(3," I have a tooltip\n"),c.Ub()),2&t&&(c.Db(1),c.Lc(" ",l.disabled?"en":"dis","able tooltip\n"),c.Db(1),c.mc("nxTooltipDisabled",l.disabled))},directives:[f.a,b.b],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]}),t})();var d=o("xWuV");let g=(()=>{class t{constructor(){this.data=[{nxTooltipPosition:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxTooltipPosition:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxTooltipPosition:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxTooltipPosition",key:"nxTooltipPosition",type:"string"},{title:"fallback\xa01",key:"fallback1",type:"string"},{title:"fallback\xa02",key:"fallback2",type:"string"},{title:"fallback\xa03",key:"fallback3",type:"string"},{title:"fallback\xa04",key:"fallback4",type:"string"},{title:"fallback\xa05",key:"fallback5",type:"string"},{title:"fallback\xa06",key:"fallback6",type:"string"},{title:"fallback\xa07",key:"fallback7",type:"string"}]}}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-fallbacks-table-example"]],decls:1,vars:2,consts:[[3,"nxData","nxDisplayedColumns"]],template:function(t,l){1&t&&c.Qb(0,"nx-dynamic-table",0),2&t&&c.mc("nxData",l.data)("nxDisplayedColumns",l.displayedColumns)},directives:[d.a],styles:[".nx-table__cell,   .nx-table__header-cell{padding:12px!important}"]}),t})();function x(t,l){if(1&t&&(c.Tb(0),c.Vb(1,"nx-badge",1),c.Jc(2),c.Ub(),c.Sb()),2&t){const t=l.$implicit;c.Db(1),c.mc("nxTooltipPosition",t)("nxTooltip","This tooltip is on the "+t),c.Db(1),c.Lc(" ",t," ")}}let y=(()=>{class t{constructor(){this.positions=["top","right","bottom","left"]}}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-positions-example"]],decls:1,vars:1,consts:[[4,"ngFor","ngForOf"],["type","active",3,"nxTooltipPosition","nxTooltip"]],template:function(t,l){1&t&&c.Hc(0,x,3,3,"ng-container",0),2&t&&c.mc("ngForOf",l.positions)},directives:[a.p,p.a,b.b],styles:["[_nghost-%COMP%]{display:flex;margin:0 -16px;align-items:flex-start;flex-wrap:wrap}nx-badge[_ngcontent-%COMP%]{margin:16px;flex-shrink:0}"]}),t})(),k=(()=>{class t{toggle(){this.tooltip.toggle()}}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-programmatic-example"]],viewQuery:function(t,l){if(1&t&&c.Nc(n.b,3),2&t){let t;c.sc(t=c.dc())&&(l.tooltip=t.first)}},decls:4,vars:0,consts:[["nxButton","small secondary","type","button",1,"nx-margin-bottom-s",3,"click"],["type","active","nxTooltip","This tooltip is controlled by a button"]],template:function(t,l){1&t&&(c.Vb(0,"button",0),c.cc("click",function(){return l.toggle()}),c.Jc(1," toggle tooltip "),c.Ub(),c.Vb(2,"nx-badge",1),c.Jc(3," I have a tooltip\n"),c.Ub())},directives:[f.a,p.a,b.b],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}button[nxButton=small][_ngcontent-%COMP%]{margin-bottom:32px}"]}),t})();const h={position:"right",showDelay:500,hideDelay:0,touchendHideDelay:1500};let T=(()=>{class t{}return t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=c.Jb({type:t,selectors:[["tooltip-settings-example"]],features:[c.Cb([{provide:n.a,useValue:h}])],decls:2,vars:0,consts:[["type","active","nxTooltip","This is a tooltip"]],template:function(t,l){1&t&&(c.Vb(0,"nx-badge",0),c.Jc(1," I have a tooltip\n"),c.Ub())},directives:[p.a,b.b],styles:[""]}),t})(),v=(()=>{class t{static components(){return{"tooltip-basic":r,"tooltip-delay":m,"tooltip-disabled":u,"tooltip-fallbacks-table":g,"tooltip-positions":y,"tooltip-programmatic":k,"tooltip-settings":T}}}return t.\u0275mod=c.Nb({type:t}),t.\u0275inj=c.Mb({factory:function(l){return new(l||t)},imports:[[n.c,i.a,a.c,e.b,s.a]]}),t})()}}]);