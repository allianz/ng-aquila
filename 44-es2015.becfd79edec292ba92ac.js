(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{"+IXF":function(e,t,n){"use strict";n.d(t,"c",function(){return i}),n.d(t,"a",function(){return c.a}),n.d(t,"b",function(){return c.b}),n.d(t,"e",function(){return l}),n.d(t,"d",function(){return u.a});var s=n("ofXK"),a=n("mN63"),o=n("SqJ0"),r=n("fXoL");let i=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(t){return new(t||e)},imports:[[s.c,a.c,o.a]]}),e})();var c=n("aXeq");let l=(()=>{class e{}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(t){return new(t||e)},imports:[[s.c]]}),e})();var u=n("Q3ZH")},Q3ZH:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var s=n("fXoL"),a=n("8LU1"),o=n("XNiG");const r=["*"];let i=0;const c=new s.r("LABEL_DEFAULT_OPTIONS");let l=(()=>{class e{constructor(e){this._defaultOptions=e,this._stateChanges=new o.a,this._disabled=!1,this._negative=!1,this._id="nx-label-"+i++}set disabled(e){this._disabled=Object(a.b)(e),this._stateChanges.next()}get disabled(){return this._disabled}set negative(e){this._negative=Object(a.b)(e),this._stateChanges.next()}get negative(){return this._negative}set id(e){this._id!==e&&(this._id=e)}get id(){return this._id}set size(e){this._size=e,this._stateChanges.next()}get size(){return this._size||this._defaultOptions&&this._defaultOptions.size||"large"}}return e.\u0275fac=function(t){return new(t||e)(s.Nb(c,8))},e.\u0275cmp=s.Hb({type:e,selectors:[["nx-label"]],hostVars:9,hostBindings:function(e,t){2&e&&(s.Cb("disabled",t.disabled)("aria-labelledby",t.id||null)("id",t.id),s.Fb("nx-label--negative",t.negative)("nx-label--large","large"===t.size)("nx-label--small","small"===t.size))},inputs:{disabled:"disabled",negative:"negative",id:"id",size:"size"},ngContentSelectors:r,decls:2,vars:0,consts:[[1,"nx-label__content"]],template:function(e,t){1&e&&(s.jc(),s.Tb(0,"label",0),s.ic(1),s.Sb())},styles:["[_nghost-%COMP%]{display:block;color:var(--text-01)}.nx-label--small[_nghost-%COMP%]{font-size:var(--base-label-small-font-size);line-height:var(--base-label-small-line-height);font-weight:var(--base-label-small-font-weight);letter-spacing:var(--base-label-small-letter-spacing)}.nx-label--large[_nghost-%COMP%]{font-size:var(--base-label-large-font-size);line-height:var(--base-label-large-line-height);font-weight:var(--base-label-large-font-weight);letter-spacing:var(--base-label-large-letter-spacing)}[disabled=true][_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:not-allowed}.nx-label--negative[_nghost-%COMP%]{color:var(--negative)}"],changeDetection:0}),e})()},aXeq:function(e,t,n){"use strict";n.d(t,"a",function(){return f}),n.d(t,"b",function(){return h});var s=n("fXoL"),a=n("8LU1"),o=n("XNiG"),r=n("1G5W"),i=n("ofXK"),c=n("+vaC"),l=n("Xe60");function u(e,t){1&e&&s.Ob(0,"nx-icon",7),2&e&&s.kc("name","exclamation-triangle")}function m(e,t){if(1&e&&(s.Rb(0),s.Hc(1,u,1,1,"nx-icon",3),s.Tb(2,"div",4),s.Tb(3,"div",5),s.Pb(4,6),s.Sb(),s.Sb(),s.Qb()),2&e){const e=s.ec(),t=s.rc(3);s.Bb(1),s.kc("ngIf",e.showIcon),s.Bb(3),s.kc("ngTemplateOutlet",t)}}function b(e,t){if(1&e&&(s.Tb(0,"nx-message",8),s.Pb(1,6),s.Sb()),2&e){s.ec();const e=s.rc(3);s.Bb(1),s.kc("ngTemplateOutlet",e)}}function g(e,t){1&e&&s.ic(0)}const d=["*"];let p=0;const f=new s.r("ERROR_DEFAULT_OPTIONS");let h=(()=>{class e{constructor(e,t){this._changeDetectorRef=e,this._defaultOptions=t,this._showIcon=!0,this._id="nx-error-"+p++,this._destroyed=new o.a,this._defaultOptions&&this._defaultOptions.changes&&this._defaultOptions.changes.pipe(Object(r.a)(this._destroyed)).subscribe(()=>{this._changeDetectorRef.markForCheck()})}set showIcon(e){this._showIcon=Object(a.b)(e),this._changeDetectorRef.markForCheck()}get showIcon(){return this._showIcon}set id(e){e&&e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())}get id(){return this._id}set appearance(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())}get appearance(){return this._appearance||this._defaultOptions&&this._defaultOptions.appearance||"message"}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}}return e.\u0275fac=function(t){return new(t||e)(s.Nb(s.h),s.Nb(f,8))},e.\u0275cmp=s.Hb({type:e,selectors:[["nx-error"]],hostVars:4,hostBindings:function(e,t){2&e&&(s.Cb("role","alert")("id",t.id),s.Fb("nx-error--message","message"==t.appearance))},inputs:{showIcon:"showIcon",id:"id",appearance:"appearance"},ngContentSelectors:d,decls:4,vars:2,consts:[[4,"ngIf"],["nxContext","error",4,"ngIf"],["errorContent",""],["class","nx-error__icon",3,"name",4,"ngIf"],[1,"nx-error__content-wrapper"],[1,"nx-error__content"],[3,"ngTemplateOutlet"],[1,"nx-error__icon",3,"name"],["nxContext","error"]],template:function(e,t){1&e&&(s.jc(),s.Hc(0,m,5,2,"ng-container",0),s.Hc(1,b,2,1,"nx-message",1),s.Hc(2,g,1,0,"ng-template",null,2,s.Ic)),2&e&&(s.kc("ngIf","text"===t.appearance),s.Bb(1),s.kc("ngIf","message"===t.appearance))},directives:[i.q,i.u,c.a,l.a],styles:["[_nghost-%COMP%]{font-size:var(--base-error-simple-font-size);font-weight:var(--base-error-simple-font-weight);letter-spacing:var(--base-error-simple-letter-spacing);color:var(--base-error-color);width:100%;display:flex;text-align:left}[_nghost-%COMP%], [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{line-height:var(--base-error-simple-line-height)}[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{font-size:var(--base-error-simple-icon-size);margin-right:8px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{color:windowText}}[_nghost-%COMP%]   .nx-error__content-wrapper[_ngcontent-%COMP%]{max-width:100%}[dir=rtl]   [_nghost-%COMP%]{text-align:right}[dir=rtl]   [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}"],changeDetection:0}),e})()},"kz+u":function(e,t,n){"use strict";n.r(t),n.d(t,"MessageExamplesModule",function(){return J});var s=n("ofXK"),a=n("+IXF"),o=n("SqJ0"),r=n("gkbm"),i=n("eV8M"),c=n("fXoL"),l=n("LTpZ"),u=n("IqoM");function m(e,t){if(1&e){const e=c.Ub();c.Tb(0,"nx-message-banner",4),c.ac("close",function(){return c.vc(e),c.ec().infoBannerClosed=!0}),c.Jc(1," You are logged in as Max Mustermann.\n"),c.Sb()}}function b(e,t){if(1&e){const e=c.Ub();c.Tb(0,"nx-message-banner",5),c.ac("close",function(){return c.vc(e),c.ec().warningBannerClosed=!0}),c.Jc(1," Your password expires in three days!\n"),c.Sb()}}function g(e,t){if(1&e){const e=c.Ub();c.Tb(0,"nx-message-banner",6),c.ac("close",function(){return c.vc(e),c.ec().errorBannerClosed=!0}),c.Jc(1," The object could not be found.\n"),c.Sb()}}let d=(()=>{class e{constructor(){this.infoBannerClosed=!1,this.warningBannerClosed=!1,this.errorBannerClosed=!1}showAllBanners(){this.infoBannerClosed=!1,this.warningBannerClosed=!1,this.errorBannerClosed=!1}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-banner-example"]],decls:5,vars:4,consts:[["closeButtonLabel","Close info message banner","class","nx-margin-bottom-xs",3,"close",4,"ngIf"],["context","warning","closeButtonLabel","Close warning message banner","class","nx-margin-bottom-xs",3,"close",4,"ngIf"],["context","error","closeButtonLabel","Close error message banner","class","nx-margin-bottom-xs",3,"close",4,"ngIf"],["nxButton","","type","button",3,"disabled","click"],["closeButtonLabel","Close info message banner",1,"nx-margin-bottom-xs",3,"close"],["context","warning","closeButtonLabel","Close warning message banner",1,"nx-margin-bottom-xs",3,"close"],["context","error","closeButtonLabel","Close error message banner",1,"nx-margin-bottom-xs",3,"close"]],template:function(e,t){1&e&&(c.Hc(0,m,2,0,"nx-message-banner",0),c.Hc(1,b,2,0,"nx-message-banner",1),c.Hc(2,g,2,0,"nx-message-banner",2),c.Tb(3,"button",3),c.ac("click",function(){return t.showAllBanners()}),c.Jc(4," Show all message banners "),c.Sb()),2&e&&(c.kc("ngIf",!t.infoBannerClosed),c.Bb(1),c.kc("ngIf",!t.warningBannerClosed),c.Bb(1),c.kc("ngIf",!t.errorBannerClosed),c.Bb(1),c.kc("disabled",!t.infoBannerClosed&&!t.warningBannerClosed&&!t.errorBannerClosed))},directives:[s.q,l.a,u.a],styles:[""]}),e})();var p=n("Xe60");function f(e,t){if(1&e){const e=c.Ub();c.Tb(0,"nx-message",3),c.ac("close",function(){return c.vc(e),c.ec().closed=!0}),c.Jc(1," Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio odit voluptas assumenda iure ab quaerat aliquid harum facere rerum excepturi accusantium commodi vel libero, nesciunt maxime minus exercitationem iste quod.\n"),c.Sb()}}function h(e,t){1&e&&(c.Tb(0,"p"),c.Jc(1," A close event was emitted!"),c.Sb())}let x=(()=>{class e{constructor(){this.closed=!1}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-closable-example"]],decls:4,vars:2,consts:[["nxContext","info","closable","true","class","nx-margin-bottom-xs",3,"close",4,"ngIf"],[4,"ngIf"],["nxButton","","type","button",3,"click"],["nxContext","info","closable","true",1,"nx-margin-bottom-xs",3,"close"]],template:function(e,t){1&e&&(c.Hc(0,f,2,0,"nx-message",0),c.Hc(1,h,2,0,"p",1),c.Tb(2,"button",2),c.ac("click",function(){return t.closed=!t.closed}),c.Jc(3," Toggle closed"),c.Sb()),2&e&&(c.kc("ngIf",!t.closed),c.Bb(1),c.kc("ngIf",t.closed))},directives:[s.q,l.a,p.a],styles:[""]}),e})();var _=n("eC/v"),v=n("aXeq");let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-error-example"]],decls:11,vars:0,consts:[["nxHeadline","subsection-xsmall",1,"nx-margin-bottom-s"],["nxContext","error"],[1,"nx-margin-bottom-xs"],["appearance","text"]],template:function(e,t){1&e&&(c.Tb(0,"h5",0),c.Jc(1,"Using nx-message:"),c.Sb(),c.Tb(2,"nx-message",1),c.Jc(3," Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio odit voluptas assumenda iure ab quaerat aliquid harum facere rerum excepturi accusantium commodi vel libero, nesciunt maxime minus exercitationem iste quod.\n"),c.Sb(),c.Ob(4,"br"),c.Tb(5,"h5",0),c.Jc(6,"Using nx-error:"),c.Sb(),c.Tb(7,"nx-error",2),c.Jc(8," This is an error message for a customer facing application (B2C).\n"),c.Sb(),c.Tb(9,"nx-error",3),c.Jc(10," This is an error message for an internal application (B2B/B2E).\n"),c.Sb())},directives:[_.a,p.a,v.b],styles:[""]}),e})(),C=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-info-example"]],decls:2,vars:0,consts:[["nxContext","info"]],template:function(e,t){1&e&&(c.Tb(0,"nx-message",0),c.Jc(1," Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio odit voluptas assumenda iure ab quaerat aliquid harum facere rerum excepturi accusantium commodi vel libero, nesciunt maxime minus exercitationem iste quod.\n"),c.Sb())},directives:[p.a],styles:[""]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-success-example"]],decls:2,vars:0,consts:[["nxContext","success"]],template:function(e,t){1&e&&(c.Tb(0,"nx-message",0),c.Jc(1," Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio odit voluptas assumenda iure ab quaerat aliquid harum facere rerum excepturi accusantium commodi vel libero, nesciunt maxime minus exercitationem iste quod.\n"),c.Sb())},directives:[p.a],styles:[""]}),e})();const B=["template"];function O(e,t){1&e&&c.Jc(0," Yay, you see a success message toast. Great job!\n")}const y={duration:0,context:"success",announcementMessage:"Yay, you see a success message toast"};let k=(()=>{class e{constructor(e){this.messageToastService=e}open(){this.toastRef=this.messageToastService.openFromTemplate(this.templateRef,y)}close(){this.toastRef&&this.toastRef.dismiss()}}return e.\u0275fac=function(t){return new(t||e)(c.Nb(o.b))},e.\u0275cmp=c.Hb({type:e,selectors:[["message-toast-custom-settings-example"]],viewQuery:function(e,t){if(1&e&&c.Nc(B,!0),2&e){let e;c.qc(e=c.bc())&&(t.templateRef=e.first)}},decls:6,vars:0,consts:[["nxButton","",1,"nx-margin-right-xs",3,"click"],["nxButton","",3,"click"],["template",""]],template:function(e,t){1&e&&(c.Tb(0,"button",0),c.ac("click",function(){return t.open()}),c.Jc(1,"open message toast"),c.Sb(),c.Tb(2,"button",1),c.ac("click",function(){return t.close()}),c.Jc(3,"close message toast"),c.Sb(),c.Hc(4,O,1,0,"ng-template",null,2,c.Ic))},directives:[l.a],styles:[""]}),e})();const S=["template"];function I(e,t){1&e&&(c.Tb(0,"strong"),c.Jc(1,"Information"),c.Sb(),c.Ob(2,"br"),c.Jc(3," You see an info message toast (from a template). It will disappear in 3000 ms.\n"))}let M=(()=>{class e{constructor(e){this.messageToastService=e,this.toastText="A success message toast with a custom text."}openFromText(){this.messageToastService.open(this.toastText,{context:"success",duration:5e3})}openFromTemplate(){this.messageToastService.openFromTemplate(this.templateRef,{announcementMessage:"You see an info message. It will disappear in 3000 ms."})}}return e.\u0275fac=function(t){return new(t||e)(c.Nb(o.b))},e.\u0275cmp=c.Hb({type:e,selectors:[["message-toast-opening-example"]],viewQuery:function(e,t){if(1&e&&c.Nc(S,!0),2&e){let e;c.qc(e=c.bc())&&(t.templateRef=e.first)}},decls:6,vars:0,consts:[["nxButton","",1,"nx-margin-right-s",3,"click"],["nxButton","",3,"click"],["template",""]],template:function(e,t){1&e&&(c.Tb(0,"button",0),c.ac("click",function(){return t.openFromText()}),c.Jc(1,"open from text"),c.Sb(),c.Tb(2,"button",1),c.ac("click",function(){return t.openFromTemplate()}),c.Jc(3,"open from template"),c.Sb(),c.Hc(4,I,4,0,"ng-template",null,2,c.Ic))},directives:[l.a],styles:[""]}),e})(),q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Hb({type:e,selectors:[["message-warning-example"]],decls:2,vars:0,consts:[["nxContext","warning"]],template:function(e,t){1&e&&(c.Tb(0,"nx-message",0),c.Jc(1," Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio odit voluptas assumenda iure ab quaerat aliquid harum facere rerum excepturi accusantium commodi vel libero, nesciunt maxime minus exercitationem iste quod.\n"),c.Sb())},directives:[p.a],styles:[""]}),e})(),J=(()=>{class e{static components(){return{"message-banner":d,"message-closable":x,"message-error":w,"message-info":C,"message-success":T,"message-toast-custom-settings":k,"message-toast-opening":M,"message-warning":q}}}return e.\u0275mod=c.Lb({type:e}),e.\u0275inj=c.Kb({factory:function(t){return new(t||e)},imports:[[o.a,a.c,r.b,s.c,i.a]]}),e})()}}]);