"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[9594],{9594:(B,v,l)=>{l.r(v),l.d(v,{PopoverExamplesModule:()=>I});var M=l(5066),E=l(6894),F=l(5957),g=l(1645),o=l(5e3),s=l(722),a=l(1482),c=l(3066);let u=(()=>{class e{constructor(){this.closeOnDocClick=!0,this.popoverManualOpenFlag=!1}closeOnClickOutside(){this.closeOnDocClick=!this.closeOnDocClick}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-click-outside-example"]],decls:18,vars:6,consts:[[1,"nx-margin-top-0"],["nxButton","primary small","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs","nx-margin-bottom-s",3,"nxPopoverTriggerFor","closeOnClickOutside"],["popoverClick",""],["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","manual","type","button",1,"nx-margin-bottom-s",3,"nxPopoverTriggerFor","nxPopoverShow","closeOnClickOutside","nxPopoverShowChange","click"],["popoverTrigger","nxPopoverTrigger"],["popoverManual",""],["nxButton","secondary small","type","button",3,"click"]],template:function(n,p){if(1&n&&(o.TgZ(0,"p",0),o._uU(1),o.qZA(),o.TgZ(2,"button",1),o._uU(3," Click\n"),o.qZA(),o.TgZ(4,"nx-popover",null,2),o.TgZ(6,"span"),o._uU(7,"Trigger by click"),o.qZA(),o.qZA(),o.TgZ(8,"button",3,4),o.NdJ("nxPopoverShowChange",function(i){return p.popoverManualOpenFlag=i})("click",function(){return p.popoverManualOpenFlag=!p.popoverManualOpenFlag}),o._uU(10," Manual\n"),o.qZA(),o.TgZ(11,"nx-popover",null,5),o.TgZ(13,"span"),o._uU(14,"Trigger manually"),o.qZA(),o.qZA(),o._UZ(15,"br"),o.TgZ(16,"button",6),o.NdJ("click",function(){return p.closeOnClickOutside()}),o._uU(17,"Toggle closing on click outside"),o.qZA()),2&n){const t=o.MAs(5),i=o.MAs(12);o.xp6(1),o.hij("Close on document click: ",p.closeOnDocClick,""),o.xp6(1),o.Q6J("nxPopoverTriggerFor",t)("closeOnClickOutside",p.closeOnDocClick),o.xp6(6),o.Q6J("nxPopoverTriggerFor",i)("nxPopoverShow",p.popoverManualOpenFlag)("closeOnClickOutside",p.closeOnDocClick)}},directives:[s.X,a.X,c.N],styles:[""]}),e})(),x=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-custom-example"]],decls:5,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverCustomContent",""],["src","docs-assets/images/adli-wahid-eagle-unsplash.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(n,p){if(1&n&&(o.TgZ(0,"button",0),o._uU(1," Click\n"),o.qZA(),o.TgZ(2,"nx-popover",null,1),o._UZ(4,"img",2),o.qZA()),2&n){const t=o.MAs(3);o.Q6J("nxPopoverTriggerFor",t)}},directives:[s.X,a.X,c.N],styles:[".popover-demo__img[_ngcontent-%COMP%]{width:200px;height:160px}"]}),e})();var d=l(5583),T=l(805);const O=["hoverTriggerIcon"];let f=(()=>{class e{constructor(n){this._focusMonitor=n,this.popoverManualOpenFlag=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._hoverTriggerIcon)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._hoverTriggerIcon)}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(d.tE))},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-hover-example"]],viewQuery:function(n,p){if(1&n&&o.Gf(O,5),2&n){let t;o.iGM(t=o.CRH())&&(p._hoverTriggerIcon=t.first)}},decls:5,vars:1,consts:[["name","refresh","size","s","nxPopoverDirection","top","nxPopoverTrigger","hover","tabindex","0","role","button","aria-label","progress",3,"nxPopoverTriggerFor"],["hoverTriggerIcon",""],["progress",""]],template:function(n,p){if(1&n&&(o._UZ(0,"nx-icon",0,1),o.TgZ(2,"nx-popover",null,2),o._uU(4," Your application status is in progress. "),o.qZA()),2&n){const t=o.MAs(3);o.Q6J("nxPopoverTriggerFor",t)}},directives:[T.O,a.X,c.N],styles:["nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]}),e})();var q=l(207);function U(e,r){1&e&&o._UZ(0,"img",3)}let P=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-lazyload-example"]],decls:5,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverCustomLazyloadedContent",""],["nxPopoverContent",""],["src","docs-assets/images/adli-wahid-eagle-unsplash-large.jpg","alt","An eagle sitting on a branch and thinking. Photo made by Adli Wahid",1,"popover-demo__img"]],template:function(n,p){if(1&n&&(o.TgZ(0,"button",0),o._uU(1,"click\n"),o.qZA(),o.TgZ(2,"nx-popover",null,1),o.YNc(4,U,1,0,"ng-template",2),o.qZA()),2&n){const t=o.MAs(3);o.Q6J("nxPopoverTriggerFor",t)}},directives:[s.X,a.X,c.N,q.x],styles:[".popover-demo__img[_ngcontent-%COMP%]{width:200px;height:160px}"]}),e})(),y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-modal-example"]],decls:6,vars:1,consts:[["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","nxPopoverModal","true",3,"nxPopoverTriggerFor"],["modalPopover",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"button",0),o._uU(1," Modal popover\n"),o.qZA(),o.TgZ(2,"nx-popover",null,1),o.TgZ(4,"span"),o._uU(5,"Modal popover"),o.qZA(),o.qZA()),2&n){const t=o.MAs(3);o.Q6J("nxPopoverTriggerFor",t)}},directives:[s.X,a.X,c.N],styles:[""]}),e})(),b=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-positioning-example"]],decls:24,vars:4,consts:[["nxButton","primary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverTopAnchor",""],["nxButton","primary small","nxPopoverDirection","right","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverRightAnchor",""],["nxButton","primary small","nxPopoverDirection","bottom","nxPopoverTrigger","click","type","button",1,"nx-margin-right-2xs",3,"nxPopoverTriggerFor"],["popoverBottomAnchor",""],["nxButton","primary small","nxPopoverDirection","left","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverLeftAnchor",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"button",0),o._uU(1," Top\n"),o.qZA(),o.TgZ(2,"nx-popover",null,1),o.TgZ(4,"span"),o._uU(5,"A popover pointing to the top side of the target"),o.qZA(),o.qZA(),o.TgZ(6,"button",2),o._uU(7," Right\n"),o.qZA(),o.TgZ(8,"nx-popover",null,3),o.TgZ(10,"span"),o._uU(11,"A popover pointing right side of the target"),o.qZA(),o.qZA(),o.TgZ(12,"button",4),o._uU(13," Bottom\n"),o.qZA(),o.TgZ(14,"nx-popover",null,5),o.TgZ(16,"span"),o._uU(17,"A popover pointing bottom side of the target"),o.qZA(),o.qZA(),o.TgZ(18,"button",6),o._uU(19," Left\n"),o.qZA(),o.TgZ(20,"nx-popover",null,7),o.TgZ(22,"span"),o._uU(23,"A popover pointing bottom side of the target"),o.qZA(),o.qZA()),2&n){const t=o.MAs(3),i=o.MAs(9),Q=o.MAs(15),J=o.MAs(21);o.Q6J("nxPopoverTriggerFor",t),o.xp6(6),o.Q6J("nxPopoverTriggerFor",i),o.xp6(6),o.Q6J("nxPopoverTriggerFor",Q),o.xp6(6),o.Q6J("nxPopoverTriggerFor",J)}},directives:[s.X,a.X,c.N],styles:[""]}),e})();var m=l(1713);let Z=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-scroll-example"]],decls:17,vars:2,consts:[["cdkScrollable","",1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverScrollStrategy","close","nxPopoverTrigger","click","type","button",1,"nx-margin-bottom-s",3,"nxPopoverTriggerFor"],["popoverStrategyClose",""],["nxButton","primary small","nxPopoverScrollStrategy","reposition","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverStrategyReposition",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"span",0),o.TgZ(1,"p"),o._uU(2,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),o.qZA(),o.TgZ(3,"div"),o.TgZ(4,"button",1),o._uU(5," Click "),o.qZA(),o.TgZ(6,"nx-popover",null,2),o.TgZ(8,"span"),o._uU(9,"Close"),o.qZA(),o.qZA(),o._UZ(10,"br"),o.TgZ(11,"button",3),o._uU(12," Click "),o.qZA(),o.TgZ(13,"nx-popover",null,4),o.TgZ(15,"span"),o._uU(16,"Reposition"),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&n){const t=o.MAs(7),i=o.MAs(14);o.xp6(4),o.Q6J("nxPopoverTriggerFor",t),o.xp6(7),o.Q6J("nxPopoverTriggerFor",i)}},directives:[m.PQ,s.X,a.X,c.N],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]}),e})(),_=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-scrollable-example"]],decls:19,vars:2,consts:[[2,"display","flex"],[1,"popover-demo__scroll-panel"],["nxButton","primary small","nxPopoverTrigger","click","type","button",3,"nxPopoverTriggerFor"],["popoverScroll",""],["cdkScrollable","",1,"popover-demo__scroll-panel"],["popoverScroll2",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"div",0),o.TgZ(1,"span",1),o.TgZ(2,"p"),o._uU(3,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),o.qZA(),o.TgZ(4,"button",2),o._uU(5," Click "),o.qZA(),o.TgZ(6,"nx-popover",null,3),o.TgZ(8,"span"),o._uU(9,"Scroll"),o.qZA(),o.qZA(),o.qZA(),o.TgZ(10,"span",4),o.TgZ(11,"p"),o._uU(12,"sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."),o.qZA(),o.TgZ(13,"button",2),o._uU(14," Click "),o.qZA(),o.TgZ(15,"nx-popover",null,5),o.TgZ(17,"span"),o._uU(18,"Scroll"),o.qZA(),o.qZA(),o.qZA(),o.qZA()),2&n){const t=o.MAs(7),i=o.MAs(16);o.xp6(4),o.Q6J("nxPopoverTriggerFor",t),o.xp6(9),o.Q6J("nxPopoverTriggerFor",i)}},directives:[s.X,a.X,c.N,m.PQ],styles:[".popover-demo__scroll-panel[_ngcontent-%COMP%]{border:1px solid;overflow:scroll;width:200px;height:150px;display:flex;justify-content:center;align-items:center;padding:10px;margin-right:20px}"]}),e})();var S=l(6671);let h=(()=>{class e{constructor(){this.data=[{nxDirection:"top",fallback1:"top-left",fallback2:"top-right",fallback3:"bottom",fallback4:"bottom-left",fallback5:"bottom-right",fallback6:"left",fallback7:"right"},{nxDirection:"bottom",fallback1:"bottom-left",fallback2:"bottom-right",fallback3:"top",fallback4:"top-left",fallback5:"top-right",fallback6:"left",fallback7:"right"},{nxDirection:"left",fallback1:"right",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"},{nxDirection:"right",fallback1:"left",fallback2:"bottom",fallback3:"bottom-left",fallback4:"bottom-right",fallback5:"top",fallback6:"top-left",fallback7:"top-right"}],this.displayedColumns=[{title:"nxDirection",key:"nxDirection",type:"string"},{title:"fallback\xa01",key:"fallback1",type:"string"},{title:"fallback\xa02",key:"fallback2",type:"string"},{title:"fallback\xa03",key:"fallback3",type:"string"},{title:"fallback\xa04",key:"fallback4",type:"string"},{title:"fallback\xa05",key:"fallback5",type:"string"},{title:"fallback\xa06",key:"fallback6",type:"string"},{title:"fallback\xa07",key:"fallback7",type:"string"}]}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-table-example"]],decls:1,vars:2,consts:[[3,"nxData","nxDisplayedColumns"]],template:function(n,p){1&n&&o._UZ(0,"nx-dynamic-table",0),2&n&&o.Q6J("nxData",p.data)("nxDisplayedColumns",p.displayedColumns)},directives:[S.g],styles:[".nx-table__header-cell,   .nx-table__cell{padding:12px!important}"]}),e})();var C=l(1159);const X=["clickTriggerIcon"],D=["manualTriggerIcon"];let k=(()=>{class e{constructor(n){this._focusMonitor=n,this.popoverManualOpenFlag=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._clickTriggerIcon),this._focusMonitor.monitor(this._manualTriggerIcon)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._clickTriggerIcon),this._focusMonitor.stopMonitoring(this._manualTriggerIcon)}handleKeydown(n){switch(n.keyCode){case C.L_:case C.K5:this.popoverManualOpenFlag=!this.popoverManualOpenFlag;break;default:return}}}return e.\u0275fac=function(n){return new(n||e)(o.Y36(d.tE))},e.\u0275cmp=o.Xpm({type:e,selectors:[["popover-trigger-example"]],viewQuery:function(n,p){if(1&n&&(o.Gf(X,5),o.Gf(D,5)),2&n){let t;o.iGM(t=o.CRH())&&(p._clickTriggerIcon=t.first),o.iGM(t=o.CRH())&&(p._manualTriggerIcon=t.first)}},decls:17,vars:3,consts:[["aria-label","trigger by click","name","info-circle-o","size","s","nxPopoverTrigger","click","tabindex","0","role","button",3,"nxPopoverTriggerFor"],["clickTriggerIcon",""],["popoverClick",""],["name","info-circle-o","size","s","nxPopoverDirection","top","nxPopoverTrigger","manual","tabindex","0","aria-label","trigger manually","role","button",3,"nxPopoverTriggerFor","nxPopoverShow","nxPopoverShowChange","click","keydown"],["manualTriggerIcon","","popoverTrigger","nxPopoverTrigger"],["popoverManual",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"p"),o._UZ(1,"nx-icon",0,1),o._uU(3," Triggered by click\n"),o.qZA(),o.TgZ(4,"nx-popover",null,2),o.TgZ(6,"span"),o._uU(7,"Trigger by click"),o.qZA(),o.qZA(),o.TgZ(8,"p"),o.TgZ(9,"nx-icon",3,4),o.NdJ("nxPopoverShowChange",function(i){return p.popoverManualOpenFlag=i})("click",function(){return p.popoverManualOpenFlag=!p.popoverManualOpenFlag})("keydown",function(i){return p.handleKeydown(i)}),o.qZA(),o._uU(12," Triggered manually\n"),o.qZA(),o.TgZ(13,"nx-popover",null,5),o.TgZ(15,"span"),o._uU(16,"Trigger manually"),o.qZA(),o.qZA()),2&n){const t=o.MAs(5),i=o.MAs(14);o.xp6(1),o.Q6J("nxPopoverTriggerFor",t),o.xp6(8),o.Q6J("nxPopoverTriggerFor",i)("nxPopoverShow",p.popoverManualOpenFlag)}},directives:[T.O,a.X,c.N],styles:["nx-icon[_ngcontent-%COMP%]{color:#27abd6;color:var(--interactive-primary, #27abd6);vertical-align:middle;cursor:pointer}nx-icon[_ngcontent-%COMP%]:hover{color:#3bb4db;color:var(--hover-primary, #3bb4db)}nx-icon.cdk-mouse-focused[_ngcontent-%COMP%]{outline:none}"]}),e})(),w=(()=>{class e extends g.iP{constructor(){super(...arguments),this.closeIconLabel="Schlie\xdfen"}}return e.\u0275fac=function(){let r;return function(p){return(r||(r=o.n5z(e)))(p||e)}}(),e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac}),e})(),A=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=o.Xpm({type:e,selectors:[["phone-input-i18n-example"]],features:[o._Bn([{provide:g.iP,useClass:w}])],decls:6,vars:1,consts:[["nxButton","primary small","type","button",3,"nxPopoverTriggerFor"],["popover",""]],template:function(n,p){if(1&n&&(o.TgZ(0,"button",0),o._uU(1," Open popover\n"),o.qZA(),o.TgZ(2,"nx-popover",null,1),o.TgZ(4,"span"),o._uU(5,"A popover"),o.qZA(),o.qZA()),2&n){const t=o.MAs(3);o.Q6J("nxPopoverTriggerFor",t)}},directives:[s.X,a.X,c.N],encapsulation:2}),e})(),I=(()=>{class e{static components(){return{"popover-click-outside":u,"popover-custom":x,"popover-hover":f,"popover-lazyload":P,"popover-modal":y,"popover-positioning":b,"popover-scroll":Z,"popover-scrollable":_,"popover-table":h,"popover-trigger":k,"popover-i18n":A}}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[[g.Fc,F.ru,E.cf,M.f,m.ZD]]}),e})()}}]);