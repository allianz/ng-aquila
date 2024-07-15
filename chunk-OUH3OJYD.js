import{a as he,b as ye}from"./chunk-4XHY3OOR.js";import{a as ce,b as de}from"./chunk-Y3SPN2W6.js";import"./chunk-K4BAHOCN.js";import{a as ue,b as V,c as v,d as ge,e as xe,f as u,g as fe}from"./chunk-EHHNKQDU.js";import{a as E,b as ve}from"./chunk-DWXDMCPO.js";import"./chunk-H3RSTBPT.js";import{g,h as le,j as me}from"./chunk-MCUP5FMI.js";import{b as I,d as pe,p as ae}from"./chunk-Q7SXIBJ4.js";import"./chunk-MP7FC3T5.js";import"./chunk-KRPUUH7F.js";import{c as M,e as se}from"./chunk-P42NCS2O.js";import{x as B}from"./chunk-5NV6AF64.js";import"./chunk-Q3HBUJ2T.js";import"./chunk-JERSESXB.js";import"./chunk-E5X5IINZ.js";import{$b as t,Ac as k,Bc as S,Cc as w,Dc as F,Ec as d,Ia as y,Ja as P,Ma as ne,Pb as re,Rb as l,_b as r,ac as C,ec as T,jc as _,ma as ee,na as oe,sc as O,tc as D,ub as h,uc as N,vb as W,vc as s,wc as i,xa as c,ya as te,yc as ie}from"./chunk-H7RQIDOF.js";var A=(()=>{let e=class e{constructor(){this.closeOnDocClick=!0,this.popoverManualOpenFlag=!1}closeOnClickOutside(){this.closeOnDocClick=!this.closeOnDocClick}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-click-outside-example"]],standalone:!0,features:[d],decls:18,vars:6,consts:[["popoverClick",""],["popoverTrigger","nxPopoverTrigger"],["popoverManual",""],[1,"nx-margin-top-0"],["nxButton","primary small","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs","nx-margin-bottom-s",3,"nxPopoverTriggerFor","closeOnClickOutside"],[1,"nx-popover__text"],["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","manual","type","button",1,"nx-margin-bottom-s",3,"nxPopoverShowChange","click","nxPopoverTriggerFor","nxPopoverShow","closeOnClickOutside"],["nxButton","secondary small","type","button",3,"click"]],template:function(o,p){if(o&1){let a=T();r(0,"p",3),i(1),t(),r(2,"button",4),i(3,` Click
`),t(),r(4,"nx-popover",null,0)(6,"span",5),i(7,"Trigger by click"),t()(),r(8,"button",6,1),w("nxPopoverShowChange",function(f){return y(a),S(p.popoverManualOpenFlag,f)||(p.popoverManualOpenFlag=f),P(f)}),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)}),i(10,` Manual
`),t(),r(11,"nx-popover",null,2)(13,"span"),i(14,"Trigger manually"),t()(),C(15,"br"),r(16,"button",7),_("click",function(){return y(a),P(p.closeOnClickOutside())}),i(17,` Toggle closing on click outside
`),t()}if(o&2){let a=s(5),x=s(12);h(),ie("Close on document click: ",p.closeOnDocClick,""),h(),l("nxPopoverTriggerFor",a)("closeOnClickOutside",p.closeOnDocClick),h(6),l("nxPopoverTriggerFor",x),k("nxPopoverShow",p.popoverManualOpenFlag),l("closeOnClickOutside",p.closeOnDocClick)}},dependencies:[g,u,v]});let n=e;return n})();var L=(()=>{let e=class e{constructor(){this.popoverWidth="400px"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-custom-example"]],standalone:!0,features:[d],decls:5,vars:2,consts:[["popoverCustomContent",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor","nxPopoverWidth"],["src","docs-assets/images/adli-wahid-eagle-unsplash.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(o,p){if(o&1&&(r(0,"button",1),i(1,` Click
`),t(),r(2,"nx-popover",null,0),C(4,"img",2),t()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)("nxPopoverWidth",p.popoverWidth)}},dependencies:[g,u,v],styles:[".popover-demo__img[_ngcontent-%COMP%]{max-width:100%;display:block;padding:24px 0 24px 16px}"]});let n=e;return n})();var R=(()=>{let e=class e{constructor(){this.popoverWidth="500px",this.popoverManualOpenFlag=!1}cancelPopover(){this.popoverManualOpenFlag=!this.popoverManualOpenFlag}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-extended-example"]],standalone:!0,features:[d],decls:14,vars:3,consts:[["popoverExtendedContent",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverShowChange","nxPopoverTriggerFor","nxPopoverShow","nxPopoverWidth"],[1,"nx-popover__content-wrapper"],["nxHeadline","subsection-small",1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-m"],[1,"nx-popover__footer"],["nxButton","small secondary","type","button",1,"nx-margin-bottom-0","nx-margin-right-xs",3,"click"],["nxButton","small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(o,p){if(o&1){let a=T();r(0,"button",1),w("nxPopoverShowChange",function(f){return y(a),S(p.popoverManualOpenFlag,f)||(p.popoverManualOpenFlag=f),P(f)}),i(1,` Click
`),t(),r(2,"nx-popover",null,0)(4,"div",2)(5,"h3",3),i(6," Extended popover "),t(),r(7,"p",4),i(8," I am an extended popover with a headline and buttons. "),t(),r(9,"div",5)(10,"button",6),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)}),i(11," Cancel "),t(),r(12,"button",7),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)}),i(13," Proceed "),t()()()()}if(o&2){let a=s(3);l("nxPopoverTriggerFor",a),k("nxPopoverShow",p.popoverManualOpenFlag),l("nxPopoverWidth",p.popoverWidth)}},dependencies:[g,u,v,E],styles:[".nx-popover__footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end}"]});let n=e;return n})();var j=(()=>{let e=class e{constructor(){this.popoverWidth="500px",this.popoverManualOpenFlag=!1}cancelPopover(){this.popoverManualOpenFlag=!this.popoverManualOpenFlag}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-guided-tour-example"]],standalone:!0,features:[d],decls:17,vars:3,consts:[["popoverExtendedContent",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverShowChange","nxPopoverTriggerFor","nxPopoverShow","nxPopoverWidth"],[1,"nx-popover__content-wrapper"],["nxHeadline","subsection-small",1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-m"],[1,"nx-popover__footer"],[1,"nx-popover__steps"],[1,"nx-popover__buttons"],["nxButton","small secondary","type","button",1,"nx-margin-bottom-0","nx-margin-right-xs",3,"click"],["nxButton","small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(o,p){if(o&1){let a=T();r(0,"button",1),w("nxPopoverShowChange",function(f){return y(a),S(p.popoverManualOpenFlag,f)||(p.popoverManualOpenFlag=f),P(f)}),i(1,` Click
`),t(),r(2,"nx-popover",null,0)(4,"div",2)(5,"h3",3),i(6," Extended popover "),t(),r(7,"p",4),i(8," I am an extended popover with a headline and buttons. "),t(),r(9,"div",5)(10,"div",6),i(11,"Step 1/3"),t(),r(12,"div",7)(13,"button",8),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)}),i(14," Skip tour "),t(),r(15,"button",9),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)}),i(16," Next "),t()()()()()}if(o&2){let a=s(3);l("nxPopoverTriggerFor",a),k("nxPopoverShow",p.popoverManualOpenFlag),l("nxPopoverWidth",p.popoverWidth)}},dependencies:[g,u,v,E],styles:[".nx-popover__footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.nx-popover__steps[_ngcontent-%COMP%]{color:#767676}"]});let n=e;return n})();var be=["hoverTriggerIcon"],q=(()=>{let e=class e{constructor(m){this._focusMonitor=m,this.popoverManualOpenFlag=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._hoverTriggerIcon)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._hoverTriggerIcon)}};e.\u0275fac=function(o){return new(o||e)(W(B))},e.\u0275cmp=c({type:e,selectors:[["popover-hover-example"]],viewQuery:function(o,p){if(o&1&&O(be,5),o&2){let a;D(a=N())&&(p._hoverTriggerIcon=a.first)}},standalone:!0,features:[d],decls:5,vars:1,consts:[["hoverTriggerIcon",""],["progress",""],["name","refresh","size","s","nxPopoverDirection","top","nxPopoverTrigger","hover","tabindex","0","role","button","aria-label","progress",3,"nxPopoverTriggerFor"]],template:function(o,p){if(o&1&&(C(0,"nx-icon",2,0),r(2,"nx-popover",null,1),i(4," Your application status is in progress. "),t()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)}},dependencies:[M,u,v],styles:["nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]});let n=e;return n})();var _e=(()=>{let e=class e extends V{constructor(){super(...arguments),this.closeIconLabel="Schlie\xDFen"}};e.\u0275fac=(()=>{let m;return function(p){return(m||(m=ne(e)))(p||e)}})(),e.\u0275prov=ee({token:e,factory:e.\u0275fac});let n=e;return n})(),Q=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-i18n-example"]],standalone:!0,features:[F([{provide:V,useClass:_e}]),d],decls:6,vars:1,consts:[["popover",""],["nxButton","primary small","type","button",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"]],template:function(o,p){if(o&1&&(r(0,"button",1),i(1,` Open popover
`),t(),r(2,"nx-popover",null,0)(4,"span",2),i(5,"A popover"),t()()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)}},dependencies:[g,u,v]});let n=e;return n})();function Te(n,e){n&1&&C(0,"img",3)}var H=(()=>{let e=class e{constructor(){this.popoverWidth="400px"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-lazyload-example"]],standalone:!0,features:[d],decls:5,vars:2,consts:[["popoverCustomLazyloadedContent",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor","nxPopoverWidth"],["nxPopoverContent",""],["src","docs-assets/images/adli-wahid-eagle-unsplash-large.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(o,p){if(o&1&&(r(0,"button",1),i(1,` click
`),t(),r(2,"nx-popover",null,0),re(4,Te,1,0,"ng-template",2),t()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)("nxPopoverWidth",p.popoverWidth)}},dependencies:[g,u,v,ue],styles:[".popover-demo__img[_ngcontent-%COMP%]{max-width:100%;display:block;padding:24px 0 24px 16px}"]});let n=e;return n})();var z=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-modal-example"]],standalone:!0,features:[d],decls:6,vars:1,consts:[["modalPopover",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","nxPopoverModal","true",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"]],template:function(o,p){if(o&1&&(r(0,"button",1),i(1,` Modal popover
`),t(),r(2,"nx-popover",null,0)(4,"span",2),i(5,"Modal popover"),t()()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)}},dependencies:[g,u,v]});let n=e;return n})();var G=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-positioning-example"]],standalone:!0,features:[d],decls:24,vars:4,consts:[["popoverTopAnchor",""],["popoverRightAnchor",""],["popoverBottomAnchor",""],["popoverLeftAnchor",""],["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["nxButton","primary small","nxPopoverDirection","bottom","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["nxButton","primary small","nxPopoverDirection","left","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"]],template:function(o,p){if(o&1&&(r(0,"button",4),i(1,` Top
`),t(),r(2,"nx-popover",null,0)(4,"span",5),i(5,"A popover pointing to the top side of the target"),t()(),r(6,"button",6),i(7,` Right
`),t(),r(8,"nx-popover",null,1)(10,"span",5),i(11,"A popover pointing right side of the target"),t()(),r(12,"button",7),i(13,` Bottom
`),t(),r(14,"nx-popover",null,2)(16,"span",5),i(17,"A popover pointing bottom side of the target"),t()(),r(18,"button",8),i(19,` Left
`),t(),r(20,"nx-popover",null,3)(22,"span",5),i(23,"A popover pointing bottom side of the target"),t()()),o&2){let a=s(3),x=s(9),f=s(15),Pe=s(21);l("nxPopoverTriggerFor",a),h(6),l("nxPopoverTriggerFor",x),h(6),l("nxPopoverTriggerFor",f),h(6),l("nxPopoverTriggerFor",Pe)}},dependencies:[g,u,v]});let n=e;return n})();var K=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-scroll-example"]],standalone:!0,features:[d],decls:17,vars:2,consts:[["popoverStrategyClose",""],["popoverStrategyReposition",""],["cdkScrollable","",1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverScrollStrategy","close","nxPopoverTrigger","click","type","button",1,"nx-margin-bottom-s",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"],["nxButton","primary small","nxPopoverScrollStrategy","reposition","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"]],template:function(o,p){if(o&1&&(r(0,"span",2)(1,"p"),i(2," sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "),t(),r(3,"div")(4,"button",3),i(5," Click "),t(),r(6,"nx-popover",null,0)(8,"span",4),i(9,"Close"),t()(),C(10,"br"),r(11,"button",5),i(12," Click "),t(),r(13,"nx-popover",null,1)(15,"span",4),i(16,"Reposition"),t()()()()),o&2){let a=s(7),x=s(14);h(4),l("nxPopoverTriggerFor",a),h(7),l("nxPopoverTriggerFor",x)}},dependencies:[I,g,u,v],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]});let n=e;return n})();function ke(n){return()=>n.scrollStrategies.close()}var X=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-scroll-strategy-provider-example"]],standalone:!0,features:[F([{provide:ge,useFactory:ke,deps:[ae]}]),d],decls:6,vars:1,consts:[["popover",""],["nxButton","primary small","type","button",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"]],template:function(o,p){if(o&1&&(r(0,"button",1),i(1,` Open popover
`),t(),r(2,"nx-popover",null,0)(4,"span",2),i(5,"A popover"),t()()),o&2){let a=s(3);l("nxPopoverTriggerFor",a)}},dependencies:[g,u,v]});let n=e;return n})();var Y=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-scrollable-example"]],standalone:!0,features:[d],decls:19,vars:2,consts:[["popoverScroll",""],["popoverScroll2",""],[2,"display","flex"],[1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],[1,"nx-popover__text"],["cdkScrollable","",1,"popover-demo__scroll-panel"]],template:function(o,p){if(o&1&&(r(0,"div",2)(1,"span",3)(2,"p"),i(3," sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "),t(),r(4,"button",4),i(5," Click "),t(),r(6,"nx-popover",null,0)(8,"span",5),i(9,"Scroll"),t()()(),r(10,"span",6)(11,"p"),i(12," sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "),t(),r(13,"button",4),i(14," Click "),t(),r(15,"nx-popover",null,1)(17,"span",5),i(18,"Scroll"),t()()()()),o&2){let a=s(7),x=s(16);h(4),l("nxPopoverTriggerFor",a),h(9),l("nxPopoverTriggerFor",x)}},dependencies:[g,u,v,I],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]});let n=e;return n})();var U=(()=>{let e=class e{constructor(){this.data=[{nxDirection:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxDirection:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxDirection:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxDirection:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxDirection",key:"nxDirection",type:"string"},{title:"fallback\xA01",key:"fallback1",type:"string"},{title:"fallback\xA02",key:"fallback2",type:"string"},{title:"fallback\xA03",key:"fallback3",type:"string"},{title:"fallback\xA04",key:"fallback4",type:"string"},{title:"fallback\xA05",key:"fallback5",type:"string"},{title:"fallback\xA06",key:"fallback6",type:"string"},{title:"fallback\xA07",key:"fallback7",type:"string"}]}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-table-example"]],standalone:!0,features:[d],decls:1,vars:2,consts:[[3,"data","displayedColumns"]],template:function(o,p){o&1&&C(0,"nx-dynamic-table",0),o&2&&l("data",p.data)("displayedColumns",p.displayedColumns)},dependencies:[he],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]});let n=e;return n})();var Se=["clickTriggerIcon"],we=["manualTriggerIcon"],J=(()=>{let e=class e{constructor(m){this._focusMonitor=m,this.popoverManualOpenFlag=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._clickTriggerIcon),this._focusMonitor.monitor(this._manualTriggerIcon)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._clickTriggerIcon),this._focusMonitor.stopMonitoring(this._manualTriggerIcon)}handleKeydown(m){switch(m.keyCode){case 32:case 13:this.popoverManualOpenFlag=!this.popoverManualOpenFlag;break;default:}}};e.\u0275fac=function(o){return new(o||e)(W(B))},e.\u0275cmp=c({type:e,selectors:[["popover-trigger-example"]],viewQuery:function(o,p){if(o&1&&(O(Se,5),O(we,5)),o&2){let a;D(a=N())&&(p._clickTriggerIcon=a.first),D(a=N())&&(p._manualTriggerIcon=a.first)}},standalone:!0,features:[d],decls:19,vars:3,consts:[["clickTriggerIcon",""],["popoverClick",""],["manualTriggerIcon","","popoverTrigger","nxPopoverTrigger"],["popoverManual",""],["nxIconButton","tertiary small","nxPopoverTrigger","click","type","button","aria-label","trigger by click",1,"nx-popover__button","nx-margin-right-3xs",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],[1,"nx-popover__text"],["nxIconButton","tertiary small","type","button","nxPopoverDirection","top","nxPopoverTrigger","manual","aria-label","trigger manually",1,"nx-popover__button","nx-margin-right-3xs",3,"nxPopoverShowChange","click","keydown","nxPopoverTriggerFor","nxPopoverShow"]],template:function(o,p){if(o&1){let a=T();r(0,"p")(1,"button",4,0),C(3,"nx-icon",5),t(),i(4,` Triggered by click
`),t(),r(5,"nx-popover",null,1)(7,"span",6),i(8,"Trigger by click"),t()(),r(9,"p")(10,"button",7,2),w("nxPopoverShowChange",function(f){return y(a),S(p.popoverManualOpenFlag,f)||(p.popoverManualOpenFlag=f),P(f)}),_("click",function(){return y(a),P(p.popoverManualOpenFlag=!p.popoverManualOpenFlag)})("keydown",function(f){return y(a),P(p.handleKeydown(f))}),C(13,"nx-icon",5),t(),i(14,` Triggered manually
`),t(),r(15,"nx-popover",null,3)(17,"span"),i(18,"Trigger manually"),t()()}if(o&2){let a=s(6),x=s(16);h(),l("nxPopoverTriggerFor",a),h(9),l("nxPopoverTriggerFor",x),k("nxPopoverShow",p.popoverManualOpenFlag)}},dependencies:[le,u,M,v],styles:["nx-icon[_ngcontent-%COMP%]{color:var(--interactive-primary, #27abd6);vertical-align:middle;cursor:pointer}nx-icon[_ngcontent-%COMP%]:hover{color:var(--hover-primary, #3bb4db)}nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]});let n=e;return n})();var Fe={popoverWidth:"800px",popoverMaxWidth:"700px"},Z=(()=>{let e=class e{constructor(){this.popoverWidth="100%",this.popoverMaxWidth="100%"}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-width-example"]],standalone:!0,features:[F([{provide:xe,useValue:Fe}]),d],decls:12,vars:4,consts:[["popoverProperty",""],["popoverDefault",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor","nxPopoverWidth","nxPopoverMaxWidth"],[1,"nx-popover__text"],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"]],template:function(o,p){if(o&1&&(r(0,"button",2),i(1,` Property values
`),t(),r(2,"nx-popover",null,0)(4,"span",3),i(5,"This popover has a width of `100%` and a max-width of `100%`. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. "),t()(),r(6,"button",4),i(7,` Default values
`),t(),r(8,"nx-popover",null,1)(10,"span",3),i(11,"This popover has a width of `800px` and a max-width of `700px`. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),t()()),o&2){let a=s(3),x=s(9);l("nxPopoverTriggerFor",a)("nxPopoverWidth",p.popoverWidth)("nxPopoverMaxWidth",p.popoverMaxWidth),h(6),l("nxPopoverTriggerFor",x)}},dependencies:[g,u,v]});let n=e;return n})();var $=(()=>{let e=class e{constructor(){this.popoverWidth="500px",this.popoverManualOpenFlag=!1,this.hideArrow=!0}cancelPopover(){this.popoverManualOpenFlag=!this.popoverManualOpenFlag}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c({type:e,selectors:[["popover-without-arrow-example"]],standalone:!0,features:[d],decls:15,vars:4,consts:[["popoverWithoutArrow",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverShowChange","nxPopoverTriggerFor","hidePopoverArrow","nxPopoverShow","nxPopoverWidth"],[1,"nx-popover__content-wrapper"],[1,"centered-content"],["nxHeadline","subsection-small",1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-m","nx-margin-top-0"],[1,"nx-popover__footer"],["nxStyle","block"],["routerLink","/documentation"],["name","arrow-right","aria-hidden","true"]],template:function(o,p){if(o&1){let a=T();r(0,"button",1),w("nxPopoverShowChange",function(f){return y(a),S(p.popoverManualOpenFlag,f)||(p.popoverManualOpenFlag=f),P(f)}),i(1,` Click
`),t(),r(2,"nx-popover",null,0)(4,"div",2)(5,"div",3)(6,"h3",4),i(7," Popover without arrow "),t(),r(8,"p",5),i(9," I am a popover without an arrow, showing centered content, a headline and a link. "),t(),r(10,"div",6)(11,"nx-link",7)(12,"a",8),C(13,"nx-icon",9),i(14," More recommendations "),t()()()()()()}if(o&2){let a=s(3);l("nxPopoverTriggerFor",a)("hidePopoverArrow",p.hideArrow),k("nxPopoverShow",p.popoverManualOpenFlag),l("nxPopoverWidth",p.popoverWidth)}},dependencies:[g,u,v,E,ce,M],styles:[".centered-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;text-align:center}.nx-popover__content-wrapper[_ngcontent-%COMP%]{margin:0 8px}"]});let n=e;return n})();var Me=[A,L,q,H,z,G,K,Y,U,J,Q,X,R,$,j,Z],rt=(()=>{let e=class e{static components(){return{"popover-click-outside":A,"popover-custom":L,"popover-hover":q,"popover-lazyload":H,"popover-modal":z,"popover-positioning":G,"popover-scroll":K,"popover-scrollable":Y,"popover-table":U,"popover-trigger":J,"popover-i18n":Q,"popover-scroll-strategy-provider":X,"popover-extended":R,"popover-without-arrow":$,"popover-guided-tour":j,"popover-width":Z}}};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=te({type:e}),e.\u0275inj=oe({imports:[fe,me,se,ye,pe,ve,de,Me]});let n=e;return n})();export{rt as PopoverExamplesModule};
