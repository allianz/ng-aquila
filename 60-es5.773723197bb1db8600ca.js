!function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}function n(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{YyaO:function(e,t,o){"use strict";o.r(t),o.d(t,"ErrorExamplesModule",function(){return J});var i,a,c,s,l=o("AqTC"),u=o("3Pt+"),f=o("+IXF"),m=o("fXoL"),b=o("aXeq"),p=((i=function e(){n(this,e)}).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=m.Jb({type:i,selectors:[["error-example"]],decls:4,vars:0,consts:[[1,"nx-margin-bottom-m"],["appearance","text"]],template:function(e,r){1&e&&(m.Vb(0,"nx-error",0),m.Jc(1," This is an error message for a customer facing application (B2C).\n"),m.Ub(),m.Vb(2,"nx-error",1),m.Jc(3," This is an error message for an internal application (B2B/B2E).\n"),m.Ub())},directives:[b.b],styles:[""]}),i),d=o("zB3U"),y=o("HXSb"),w=o("nK+a"),v=o("VamS"),h=o("v44Z"),x=((s=function(){function e(){n(this,e)}return r(e,[{key:"isErrorState",value:function(e,r){return!!(e&&e.invalid&&(e.dirty||r&&r.submitted))}}]),e}()).\u0275fac=function(e){return new(e||s)},s.\u0275prov=m.Lb({token:s,factory:s.\u0275fac}),s),C=((c=function e(){n(this,e),this.emailFormControl=new u.e("",[u.y.required,u.y.email])}).\u0275fac=function(e){return new(e||c)},c.\u0275cmp=m.Jb({type:c,selectors:[["error-custom-matcher-formfield-example"]],features:[m.Cb([{provide:d.a,useClass:x}])],decls:6,vars:1,consts:[["nxLabel","Label"],["nxInput","",3,"formControl"],["nxFormfieldHint",""],["nxFormfieldError",""]],template:function(e,r){1&e&&(m.Vb(0,"nx-formfield",0),m.Qb(1,"input",1),m.Vb(2,"span",2),m.Jc(3," This field will show an error while typing. "),m.Ub(),m.Vb(4,"nx-error",3),m.Jc(5," Please enter a valid email address. "),m.Ub(),m.Ub()),2&e&&(m.Db(1),m.mc("formControl",r.emailFormControl))},directives:[y.b,w.b,u.a,u.p,u.f,v.a,b.b,h.a],styles:[""]}),c),J=((a=function(){function e(){n(this,e)}return r(e,null,[{key:"components",value:function(){return{error:p,"error-custom-matcher-formfield":C}}}]),e}()).\u0275mod=m.Nb({type:a}),a.\u0275inj=m.Mb({factory:function(e){return new(e||a)},imports:[[f.c,l.b,u.v]]}),a)}}])}();