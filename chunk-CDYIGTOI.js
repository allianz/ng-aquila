import{a as A,b as gt}from"./chunk-CRCM24JA.js";import"./chunk-B6DRX37V.js";import{a as Nt}from"./chunk-65GLPSAG.js";import{a as N}from"./chunk-RTSM2X3X.js";import"./chunk-3CXM22DE.js";import"./chunk-DZRQJYOJ.js";import"./chunk-KSMSSQIV.js";import{c as ht}from"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import{e as u,f as h}from"./chunk-63LXIO5M.js";import{a as dt,b as pt,c as xt}from"./chunk-J2PQRSHM.js";import{p as L}from"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import{i as B,l as R}from"./chunk-YHRSJ234.js";import{c as g,e as ut}from"./chunk-V5XCZUGO.js";import{h as st,q as ft}from"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as K}from"./chunk-APNBV455.js";import"./chunk-CCSED5RY.js";import{Ac as M,Ec as lt,Fc as ct,Gc as V,H as et,Hc as X,Lb as m,Lc as p,Mb as w,Mc as a,Nb as E,Oa as Y,Q as it,Rb as d,Tc as mt,_c as x,a as Z,ac as F,b as tt,ba as nt,bc as s,dc as Q,j as z,ka as D,lc as n,ma as ot,mc as i,nc as l,ob as T,pa as at,wb as k,wc as O,xb as P,zb as rt,zc as U}from"./chunk-LG2ZA55B.js";var vt=[[["nx-notification-item-metadata"]],[["nx-notification-item-content"]],"*",[["nx-notification-item-actions"]]],Ct=["nx-notification-item-metadata","nx-notification-item-content","*","nx-notification-item-actions"],_t=["*"],f=(()=>{class t{set read(o){this._read=K(o)}get read(){return this._read}set clickable(o){this._clickable=K(o)}get clickable(){return this._clickable}constructor(o,e){this._elementRef=o,this._focusMonitor=e,this._read=!1,this._clickable=!0,this.focused=new z,this._hasFocus=!1}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef)}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}focus(o){typeof o>"u"&&!this._hasFocus&&(this.focused.next(this),this._hasFocus=!0,this._focusMonitor.focusVia(this._elementRef,"keyboard")),this._hasFocus||(this._elementRef.nativeElement.focus(),this._hasFocus=!0)}_blur(){this._hasFocus=!1}static{this.\u0275fac=function(e){return new(e||t)(P(Y),P(ft))}}static{this.\u0275cmp=m({type:t,selectors:[["nx-notification-panel-item"],["","nxNotificationPanelItem",""]],hostAttrs:["tabindex","0"],hostVars:4,hostBindings:function(e,r){e&1&&O("focus",function(){return r.focus()})("blur",function(){return r._blur()}),e&2&&Q("nx-notification-item--read",r.read)("nx-notification-item--clickable",r.clickable)},inputs:{read:"read",clickable:"clickable"},ngContentSelectors:Ct,decls:4,vars:0,template:function(e,r){e&1&&(U(vt),M(0),M(1,1),M(2,2),M(3,3))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;background-color:var(--notification-panel-item-unread-background-color);padding:16px 24px;margin:0 -24px}.nx-notification-item--read[_nghost-%COMP%]{background-color:var(--notification-panel-item-read-background-color)}[_nghost-%COMP%]:focus{outline:none}.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:var(--focus-inset-box-shadow)}@media screen and (forced-colors: active){.cdk-keyboard-focused[_nghost-%COMP%]{box-shadow:inset 0 0 0 4px CanvasText,inset 0 0 0 6px background;border:4px solid CanvasText}}  nx-notification-item-metadata{font-size:.875rem;font-weight:400;line-height:1.25rem;letter-spacing:.0125rem;margin-bottom:4px;display:flex;align-items:center}  nx-notification-item-content{font-size:1rem;font-weight:400;line-height:1.5rem}  nx-notification-item-actions{font-size:1rem;font-weight:400;line-height:1.5rem;display:flex;justify-content:space-between;padding-top:8px}.nx-notification-item--clickable[_nghost-%COMP%]{cursor:pointer}.nx-notification-item--clickable[_nghost-%COMP%]:hover{background-color:var(--notification-panel-item-unread-hover-background-color)}.nx-notification-item--clickable[_nghost-%COMP%]:active{background-color:var(--notification-panel-item-unread-active-background-color)}.nx-notification-item--clickable.nx-notification-item--read[_nghost-%COMP%]:hover{background-color:var(--notification-panel-item-read-hover-background-color)}.nx-notification-item--clickable.nx-notification-item--read[_nghost-%COMP%]:active{background-color:var(-notification-panel-item-read-active-background-color)}"]})}}return t})(),y=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275dir=E({type:t,selectors:[["nx-notification-item-metadata"]]})}}return t})(),v=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275dir=E({type:t,selectors:[["nx-notification-item-content"]]})}}return t})(),j=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275dir=E({type:t,selectors:[["nx-notification-item-actions"]]})}}return t})(),C=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275dir=E({type:t,selectors:[["nx-notification-header"]]})}}return t})(),G=new ot("nx-notification-panel-scroll-strategy",{providedIn:"root",factory:()=>{let t=at(L);return()=>t.scrollStrategies.reposition()}});var bt={direction:"bottom-start",fallbackOrientation:"vertical",autoFocus:!0,offset:8},_=(()=>{class t{set notificationPanel(o){this._panelTemplate=o}get notificationPanel(){return this._panelTemplate}constructor(o,e,r,c){this._nxOverlay=o,this._element=e,this._triggerButton=r,this._defaultScrollStrategyFactory=c,this._scrollStrategyFactory=this._defaultScrollStrategyFactory}open(){if(this._overlayRef)return;let o=tt(Z({},bt),{scrollStrategy:this._scrollStrategyFactory(),triggerButton:this._triggerButton??void 0});this._overlayRef=this._nxOverlay.open(this._panelTemplate,this._element,o),this._overlayRef.afterClosed().pipe(it(1)).subscribe(()=>this.close())}close(){this._overlayRef&&(this._overlayRef.close(),this._overlayRef=null)}static{this.\u0275fac=function(e){return new(e||t)(P(dt),P(Y),P(xt,10),P(G))}}static{this.\u0275dir=E({type:t,selectors:[["","nxNotificationPanelTriggerFor",""]],hostBindings:function(e,r){e&1&&O("click",function(){return r.open()})},inputs:{notificationPanel:[0,"nxNotificationPanelTriggerFor","notificationPanel"]}})}}return t})(),b=(()=>{class t{constructor(){this._destroyed=new z}ngAfterContentInit(){this._initKeyManager()}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}_initKeyManager(){this._keyManager=new st(this.items).withVerticalOrientation().withHorizontalOrientation("ltr"),this.items.length>0&&et(...this.items.map(o=>o.focused)).pipe(nt(this._destroyed)).subscribe(o=>{this._keyManager.updateActiveItem(o)})}_handleKeydown(o){this._keyManager.onKeydown(o)}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=m({type:t,selectors:[["nx-notification-panel"]],contentQueries:function(e,r,c){if(e&1&&lt(c,f,5),e&2){let S;V(S=X())&&(r.items=S)}},viewQuery:function(e,r){if(e&1&&ct(rt,5),e&2){let c;V(c=X())&&(r.templateRef=c.first)}},hostVars:2,hostBindings:function(e,r){e&1&&O("keydown",function(S){return r._handleKeydown(S)}),e&2&&Q("nx-notification-panel",!0)},exportAs:["nxNotificationPanel"],ngContentSelectors:_t,decls:1,vars:0,template:function(e,r){e&1&&(U(),M(0))},styles:["[_nghost-%COMP%]{padding:16px 24px;display:flex;flex-direction:column;background-color:var(--notification-panel-background-color);max-height:740px;height:100%;width:400px;overflow-y:auto;box-shadow:var(--shadow-large);border-radius:8px}[_nghost-%COMP%]:focus{outline:none}  nx-notification-header{display:flex;justify-content:space-between;padding:16px 0 8px}  nx-notification-header:first-child{padding-top:0}"]})}}return t})(),yt=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=D({imports:[pt,R]})}}return t})();function Pt(t,H){t&1&&(n(0,"nx-notification-panel")(1,"nx-notification-header")(2,"h3",3),a(3,"Unread"),i(),n(4,"button",4),a(5," Mark all as read "),l(6,"nx-icon",5),i()(),n(7,"a",6)(8,"nx-notification-item-metadata"),l(9,"nx-icon",7),a(10,"File lock release \xB7 16:53 "),i(),n(11,"nx-notification-item-content")(12,"span",8),a(13,"The file you tried to edit (XY12345) is now available."),i()(),n(14,"nx-notification-item-actions")(15,"nx-link")(16,"a",9),a(17,"Edit file"),i()(),n(18,"button",10),l(19,"nx-icon",11),i()()(),n(20,"div",6)(21,"nx-notification-item-metadata"),l(22,"nx-icon",12),a(23,"Callback \xB7 11:35 "),i(),n(24,"nx-notification-item-content",13)(25,"span",8),a(26,"Please call back James Erwin at 15:00"),i(),n(27,"button",14),l(28,"nx-icon",11),i()()(),n(29,"nx-notification-header")(30,"h3",3),a(31,"Read"),i()(),n(32,"div",15)(33,"nx-notification-item-metadata"),a(34,"Offers \xB7 Yesterday "),i(),n(35,"nx-notification-item-content")(36,"span",8),a(37,"Mary London"),i(),a(38," - Note created "),i()()()),t&2&&(k(7),F("href",null,T))}var $=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=m({type:t,selectors:[["notification-panel-actions-example"]],decls:4,vars:1,consts:[["panel1",""],["nxIconButton","small tertiary","title","Notifications","aria-label","Notifications",1,"nx-margin-0",3,"nxNotificationPanelTriggerFor"],["name","bell-o","aria-hidden","true"],["nxCopytext","large",1,"nx-font-weight-semibold"],["nxPlainButton","small","type","button"],["name","check","aria-hidden","true",1,"nx-margin-left-2xs"],["nxNotificationPanelItem","","clickable","false"],["size","s","name","lock-o","aria-hidden","true",1,"nx-margin-right-2xs"],[1,"nx-font-weight-semibold"],["href","#file-link"],["nxPlainButton","small","type","button","title","Delete","aria-label","Delete"],["name","trash-o","aria-hidden","true"],["size","s","name","phone-o","aria-hidden","true",1,"nx-margin-right-2xs"],[1,"inline-delete"],["nxPlainButton","small","type","button","title","Delete","aria-label","Delete",1,""],["nxNotificationPanelItem","","read","","clickable","false"]],template:function(e,r){if(e&1&&(n(0,"button",1),l(1,"nx-icon",2),i(),d(2,Pt,39,1,"ng-template",null,0,x)),e&2){let c=p(3);s("nxNotificationPanelTriggerFor",c)}},dependencies:[u,_,g,b,C,N,h,f,y,v,j,A],styles:[".inline-delete[_ngcontent-%COMP%]{display:flex;justify-content:space-between}"]})}}return t})();function kt(t,H){t&1&&(n(0,"nx-notification-panel")(1,"nx-notification-header")(2,"h3",3),a(3,"Unread"),i(),n(4,"button",4),a(5," Mark all as read "),l(6,"nx-icon",5),i()(),n(7,"a",6)(8,"nx-notification-item-metadata"),a(9,"Tasks \xB7 5 minutes ago "),i(),n(10,"nx-notification-item-content")(11,"span",7),a(12,"Frank Loyd"),i(),a(13," - created new offer "),i()(),n(14,"a",8)(15,"nx-notification-item-metadata"),a(16,"Offers \xB7 11:45 "),i(),n(17,"nx-notification-item-content")(18,"span",7),a(19,"Susi M\xFCller"),i(),a(20," - Offer status has changed "),i()(),n(21,"nx-notification-header")(22,"h3",3),a(23,"Read"),i()(),n(24,"a",9)(25,"nx-notification-item-metadata"),a(26,"Offers \xB7 Yesterday "),i(),n(27,"nx-notification-item-content")(28,"span",7),a(29,"Mary London"),i(),a(30," - Note created "),i()()())}var q=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=m({type:t,selectors:[["notification-panel-clickable-example"]],decls:4,vars:1,consts:[["panel1",""],["nxIconButton","small tertiary","title","Notifications","aria-label","Notifications",3,"nxNotificationPanelTriggerFor"],["name","bell-o","aria-hidden","true"],["nxCopytext","large",1,"nx-font-weight-semibold"],["nxPlainButton","small","type","button"],["name","check","aria-hidden","true",1,"nx-margin-left-2xs"],["nxNotificationPanelItem","","routerLink","#clickable-notification1"],[1,"nx-font-weight-semibold"],["nxNotificationPanelItem","","routerLink","#clickable-notification2"],["nxNotificationPanelItem","","read","","routerLink","#clickable-notification3"]],template:function(e,r){if(e&1&&(n(0,"button",1),l(1,"nx-icon",2),i(),d(2,kt,31,0,"ng-template",null,0,x)),e&2){let c=p(3);s("nxNotificationPanelTriggerFor",c)}},dependencies:[u,_,g,b,C,N,h,f,B,y,v],encapsulation:2})}}return t})();function Et(t,H){t&1&&(n(0,"nx-notification-panel")(1,"nx-notification-header")(2,"h3",3),a(3,"Unread"),i(),n(4,"button",4),a(5," Mark all as read "),l(6,"nx-icon",5),i()(),n(7,"a",6)(8,"nx-notification-item-metadata"),l(9,"nx-icon",7),a(10,"File lock release \xB7 16:53 "),i(),n(11,"nx-notification-item-content")(12,"span",8),a(13,"The file you tried to edit (XY12345) is now available."),i()()(),n(14,"a",9)(15,"nx-notification-item-metadata"),l(16,"nx-icon",10),a(17,"Callback \xB7 11:35 "),i(),n(18,"nx-notification-item-content")(19,"span",8),a(20,"Please call back James Erwin at 15:00"),i()()(),n(21,"nx-notification-header")(22,"h3",3),a(23,"Read"),i()(),n(24,"div",11)(25,"nx-notification-item-metadata"),a(26,"Offers \xB7 Yesterday "),i(),n(27,"nx-notification-item-content")(28,"span",8),a(29,"Mary London"),i(),a(30," - Note created "),i()()()),t&2&&(k(14),s("routerLink",null))}var J=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=m({type:t,selectors:[["notification-panel-mixed-example"]],decls:4,vars:1,consts:[["panel1",""],["nxIconButton","small tertiary","title","Notifications",3,"nxNotificationPanelTriggerFor"],["name","bell-o","aria-hidden","true"],["nxCopytext","large",1,"nx-font-weight-semibold"],["nxPlainButton","small","type","button"],["name","check","aria-hidden","true",1,"nx-margin-left-2xs"],["nxNotificationPanelItem","","routerLink","#clickable-notification1"],["size","s","name","lock-o","aria-hidden","true",1,"nx-margin-right-2xs"],[1,"nx-font-weight-semibold"],["nxNotificationPanelItem","","clickable","false",3,"routerLink"],["size","s","name","phone-o","aria-hidden","true",1,"nx-margin-right-2xs"],["nxNotificationPanelItem","","read","","routerLink","#clickable-notification3"]],template:function(e,r){if(e&1&&(n(0,"button",1),l(1,"nx-icon",2),i(),d(2,Et,31,1,"ng-template",null,0,x)),e&2){let c=p(3);s("nxNotificationPanelTriggerFor",c)}},dependencies:[u,_,g,b,C,N,h,f,B,y,v],encapsulation:2})}}return t})();function Mt(t,H){t&1&&(n(0,"nx-notification-panel")(1,"nx-notification-header")(2,"h3",3),a(3,"Unread"),i(),n(4,"button",4),a(5," Mark all as read "),l(6,"nx-icon",5),i()(),n(7,"a",6)(8,"nx-notification-item-metadata"),l(9,"nx-icon",7),a(10,"File lock release \xB7 16:53 "),i(),n(11,"nx-notification-item-content")(12,"span",8),a(13,"The file you tried to edit (XY12345) is now available."),i()(),n(14,"nx-notification-item-actions")(15,"nx-link")(16,"a",9),a(17,"Edit file"),i()(),n(18,"button",10),l(19,"nx-icon",11),i()()()()),t&2&&(k(7),F("href",null,T))}function It(t){return()=>t.scrollStrategies.close()}var W=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=m({type:t,selectors:[["notification-panel-scroll-strategy-provider-example"]],features:[mt([{provide:G,useFactory:It,deps:[L]}])],decls:4,vars:1,consts:[["panel1",""],["nxIconButton","small tertiary","title","Notifications","aria-label","Notifications",1,"nx-margin-0",3,"nxNotificationPanelTriggerFor"],["name","bell-o","aria-hidden","true"],["nxCopytext","large",1,"nx-font-weight-semibold"],["nxPlainButton","small","type","button"],["name","check","nxIconPositionEnd","","aria-hidden","true"],["nxNotificationPanelItem","","clickable","false"],["size","s","name","lock-o","aria-hidden","true",1,"nx-margin-right-2xs"],[1,"nx-font-weight-semibold"],["href","#file-link"],["nxPlainButton","small","type","button","title","Delete","aria-label","Delete"],["name","trash-o","aria-hidden","true"]],template:function(e,r){if(e&1&&(n(0,"button",1),l(1,"nx-icon",2),i(),d(2,Mt,20,1,"ng-template",null,0,x)),e&2){let c=p(3);s("nxNotificationPanelTriggerFor",c)}},dependencies:[u,_,g,b,C,N,h,f,y,v,j,A],encapsulation:2})}}return t})();var St=[$,q,J,W],we=(()=>{class t{static components(){return{"notification-panel-actions":$,"notification-panel-clickable":q,"notification-panel-mixed":J,"notification-panel-scroll-strategy-provider":W}}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=w({type:t})}static{this.\u0275inj=D({imports:[ht,yt,ut,R,gt,Nt,St]})}}return t})();export{we as NotificationExamplesModule};
