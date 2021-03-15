!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var i=0;i<t.length;i++){var e=t[i];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,e.key,e)}}function i(n,i,e){return i&&t(n.prototype,i),e&&t(n,e),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{DbUC:function(t,e,c){"use strict";c.r(e),c.d(e,"ActionExamplesModule",function(){return F});var o=c("ofXK"),a=c("mN63"),l=c("tyNb"),r=c("XM0H"),s=c("2H/T"),u=c("fXoL"),f=c("uRTS"),b=c("+vaC"),m=c("68Ek");function d(n,t){if(1&n){var i=u.Wb();u.Vb(0,"button",1),u.cc("click",function(){u.xc(i);var n=t.$implicit;return u.gc().onSelect(n)}),u.Qb(1,"nx-icon",2),u.Jc(2),u.Ub()}if(2&n){var e=t.$implicit,c=u.gc();u.mc("selected",e===c.selectedAction),u.Db(1),u.mc("name",e.icon),u.Db(1),u.Lc(" ",e.label,"\n")}}var p,v=((p=function(){function t(){n(this,t),this.actions=[{icon:"file-text",label:"All Files"},{icon:"calendar",label:"Calendar"},{icon:"mail-o",label:"Email"},{icon:"user-o",label:"My Profile"},{icon:"file",label:"Recent Downloads"}]}return i(t,[{key:"ngOnInit",value:function(){this.selectedAction=this.actions[1]}},{key:"onSelect",value:function(n){this.selectedAction=n}}]),t}()).\u0275fac=function(n){return new(n||p)},p.\u0275cmp=u.Jb({type:p,selectors:[["action-example"]],decls:1,vars:1,consts:[["nxAction","",3,"selected","click",4,"ngFor","ngForOf"],["nxAction","",3,"selected","click"],["nxActionIcon","",3,"name"]],template:function(n,t){1&n&&u.Hc(0,d,3,3,"button",0),2&n&&u.mc("ngForOf",t.actions)},directives:[o.p,f.a,b.a,m.a],styles:[""]}),p);function y(n,t){if(1&n&&(u.Vb(0,"button",1),u.Qb(1,"nx-icon",2),u.Jc(2),u.Ub()),2&n){var i=t.$implicit;u.mc("queryParams",i.query),u.Db(1),u.mc("name",i.icon),u.Db(1),u.Lc(" ",i.label,"\n")}}var x,A=((x=function t(){n(this,t),this.actions=[{icon:"file-text",label:"All Files",query:{a:1}},{icon:"calendar",label:"Calendar",query:{a:2}},{icon:"mail-o",label:"Email",query:{a:3}},{icon:"user-o",label:"My Profile",query:{a:4}},{icon:"file",label:"Recent Downloads",query:{a:5}}]}).\u0275fac=function(n){return new(n||x)},x.\u0275cmp=u.Jb({type:x,selectors:[["action-with-router-example"]],decls:1,vars:1,consts:[["nxAction","","routerLink","./","routerLinkActive","is-selected",3,"queryParams",4,"ngFor","ngForOf"],["nxAction","","routerLink","./","routerLinkActive","is-selected",3,"queryParams"],["nxActionIcon","",3,"name"]],template:function(n,t){1&n&&u.Hc(0,y,3,3,"button",0),2&n&&u.mc("ngForOf",t.actions)},directives:[o.p,f.a,l.f,l.g,b.a,m.a],styles:[""]}),x),g=c("2XWH");function h(n,t){if(1&n&&(u.Vb(0,"nx-indicator",5),u.Jc(1),u.Ub()),2&n){var i=u.gc().$implicit,e=u.gc();u.Eb("aria-label",e.getAriaLabel(i.notificationCount)),u.Db(1),u.Kc(e.getIndicatorText(i.notificationCount))}}function k(n,t){if(1&n){var i=u.Wb();u.Vb(0,"button",1),u.cc("click",function(){u.xc(i);var n=t.$implicit;return u.gc().onSelect(n)}),u.Qb(1,"nx-icon",2),u.Vb(2,"span",3),u.Jc(3),u.Hc(4,h,2,2,"nx-indicator",4),u.Ub(),u.Ub()}if(2&n){var e=t.$implicit,c=u.gc();u.mc("selected",e===c.selectedAction),u.Db(1),u.mc("name",e.icon),u.Db(2),u.Lc(" ",e.label," "),u.Db(1),u.mc("ngIf",e.notification)}}var w,C,D=((C=function(){function t(){n(this,t),this.actions=[{icon:"file-text",label:"All Files",notification:!1},{icon:"calendar",label:"Calendar",notification:!0},{icon:"mail-o",label:"Email",notification:!0,notificationCount:105},{icon:"user-o",label:"My Profile",notification:!0,notificationCount:4},{icon:"file",label:"Recent Downloads"}]}return i(t,[{key:"ngOnInit",value:function(){this.selectedAction=this.actions[0]}},{key:"onSelect",value:function(n){this.selectedAction=n,this.selectedAction.notification&&(this.selectedAction.notification=!1),this.selectedAction.notificationCount&&(this.selectedAction.notificationCount=0)}},{key:"getIndicatorText",value:function(n){return n?n>99?"99+":n:""}},{key:"getAriaLabel",value:function(n){return n?n+" new notifications available":"new notifications available"}}]),t}()).\u0275fac=function(n){return new(n||C)},C.\u0275cmp=u.Jb({type:C,selectors:[["action-indicator-example"]],decls:1,vars:1,consts:[["nxAction","",3,"selected","click",4,"ngFor","ngForOf"],["nxAction","",3,"selected","click"],["nxActionIcon","",3,"name"],[1,"label-content"],["position","after-text",4,"ngIf"],["position","after-text"]],template:function(n,t){1&n&&u.Hc(0,k,5,4,"button",0),2&n&&u.mc("ngForOf",t.actions)},directives:[o.p,f.a,b.a,m.a,o.q,g.a],styles:[""]}),C),F=((w=function(){function t(){n(this,t)}return i(t,null,[{key:"components",value:function(){return{action:v,"action-with-router":A,"action-indicator":D}}}]),t}()).\u0275mod=u.Nb({type:w}),w.\u0275inj=u.Mb({factory:function(n){return new(n||w)},imports:[[r.a,l.i,a.c,s.a,o.c]]}),w)}}])}();