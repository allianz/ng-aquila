(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{I5hw:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return c.a})),n.d(t,"b",(function(){return c.b})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return h.a}));var s=n("2kYt"),r=n("0FLW"),a=n("q+Ep"),i=n("EM62");let o=(()=>{class e{}return e.\u0275mod=i.Lb({type:e}),e.\u0275inj=i.Kb({factory:function(t){return new(t||e)},imports:[[s.c,r.c,a.a]]}),e})();var c=n("yUsN");let l=(()=>{class e{}return e.\u0275mod=i.Lb({type:e}),e.\u0275inj=i.Kb({factory:function(t){return new(t||e)},imports:[[s.c]]}),e})();var h=n("LoTN")},LoTN:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var s=n("EM62"),r=n("5XID"),a=n("ZTXN");const i=["*"];let o=0;const c=new s.r("LABEL_DEFAULT_OPTIONS");let l=(()=>{class e{constructor(e){this._defaultOptions=e,this._stateChanges=new a.a,this._disabled=!1,this._negative=!1,this._id="nx-label-"+o++}set disabled(e){this._disabled=Object(r.b)(e),this._stateChanges.next()}get disabled(){return this._disabled}set negative(e){this._negative=Object(r.b)(e),this._stateChanges.next()}get negative(){return this._negative}set id(e){this._id!==e&&(this._id=e)}get id(){return this._id}set size(e){this._size=e,this._stateChanges.next()}get size(){return this._size||this._defaultOptions&&this._defaultOptions.size||"large"}}return e.\u0275fac=function(t){return new(t||e)(s.Nb(c,8))},e.\u0275cmp=s.Hb({type:e,selectors:[["nx-label"]],hostVars:9,hostBindings:function(e,t){2&e&&(s.Cb("disabled",t.disabled)("aria-labelledby",t.id||null)("id",t.id),s.Fb("nx-label--negative",t.negative)("nx-label--large","large"===t.size)("nx-label--small","small"===t.size))},inputs:{disabled:"disabled",negative:"negative",id:"id",size:"size"},ngContentSelectors:i,decls:2,vars:0,consts:[[1,"nx-label__content"]],template:function(e,t){1&e&&(s.jc(),s.Tb(0,"label",0),s.ic(1),s.Sb())},styles:["[_nghost-%COMP%]{display:block;color:var(--text-01)}.nx-label--small[_nghost-%COMP%]{font-size:var(--base-label-small-font-size);line-height:var(--base-label-small-line-height);font-weight:var(--base-label-small-font-weight);letter-spacing:var(--base-label-small-letter-spacing)}.nx-label--large[_nghost-%COMP%]{font-size:var(--base-label-large-font-size);line-height:var(--base-label-large-line-height);font-weight:var(--base-label-large-font-weight);letter-spacing:var(--base-label-large-letter-spacing)}[disabled=true][_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:not-allowed}.nx-label--negative[_nghost-%COMP%]{color:var(--negative)}"],changeDetection:0}),e})()},sp4l:function(e,t,n){"use strict";n.r(t),n.d(t,"LabelExamplesModule",(function(){return o}));var s=n("I5hw"),r=n("EM62"),a=n("LoTN");let i=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Hb({type:e,selectors:[["ng-component"]],decls:5,vars:0,consts:[["size","small"]],template:function(e,t){1&e&&(r.Tb(0,"nx-label"),r.Jc(1,"This is a label for a customer facing application (B2C). "),r.Sb(),r.Ob(2,"br"),r.Tb(3,"nx-label",0),r.Jc(4,"This is a label for an internal application (B2B/B2E)."),r.Sb())},directives:[a.a],styles:[""]}),e})(),o=(()=>{class e{static components(){return{label:i}}}return e.\u0275mod=r.Lb({type:e}),e.\u0275inj=r.Kb({factory:function(t){return new(t||e)},imports:[[s.e]]}),e})()},yUsN:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var s=n("EM62"),r=n("5XID"),a=n("ZTXN"),i=n("kuMc"),o=n("2kYt"),c=n("VKQk"),l=n("vMP+");function h(e,t){1&e&&s.Ob(0,"nx-icon",7),2&e&&s.kc("name","exclamation-triangle")}function g(e,t){if(1&e&&(s.Rb(0),s.Hc(1,h,1,1,"nx-icon",3),s.Tb(2,"div",4),s.Tb(3,"div",5),s.Pb(4,6),s.Sb(),s.Sb(),s.Qb()),2&e){const e=s.ec(),t=s.rc(3);s.Bb(1),s.kc("ngIf",e.showIcon),s.Bb(3),s.kc("ngTemplateOutlet",t)}}function b(e,t){if(1&e&&(s.Tb(0,"nx-message",8),s.Pb(1,6),s.Sb()),2&e){s.ec();const e=s.rc(3);s.Bb(1),s.kc("ngTemplateOutlet",e)}}function d(e,t){1&e&&s.ic(0)}const p=["*"];let _=0;const u=new s.r("ERROR_DEFAULT_OPTIONS");let f=(()=>{class e{constructor(e,t){this._changeDetectorRef=e,this._defaultOptions=t,this._showIcon=!0,this._id="nx-error-"+_++,this._destroyed=new a.a,this._defaultOptions&&this._defaultOptions.changes&&this._defaultOptions.changes.pipe(Object(i.a)(this._destroyed)).subscribe(()=>{this._changeDetectorRef.markForCheck()})}set showIcon(e){this._showIcon=Object(r.b)(e),this._changeDetectorRef.markForCheck()}get showIcon(){return this._showIcon}set id(e){e&&e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())}get id(){return this._id}set appearance(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())}get appearance(){return this._appearance||this._defaultOptions&&this._defaultOptions.appearance||"message"}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}}return e.\u0275fac=function(t){return new(t||e)(s.Nb(s.h),s.Nb(u,8))},e.\u0275cmp=s.Hb({type:e,selectors:[["nx-error"]],hostVars:4,hostBindings:function(e,t){2&e&&(s.Cb("role","alert")("id",t.id),s.Fb("nx-error--message","message"==t.appearance))},inputs:{showIcon:"showIcon",id:"id",appearance:"appearance"},ngContentSelectors:p,decls:4,vars:2,consts:[[4,"ngIf"],["nxContext","error",4,"ngIf"],["errorContent",""],["class","nx-error__icon",3,"name",4,"ngIf"],[1,"nx-error__content-wrapper"],[1,"nx-error__content"],[3,"ngTemplateOutlet"],[1,"nx-error__icon",3,"name"],["nxContext","error"]],template:function(e,t){1&e&&(s.jc(),s.Hc(0,g,5,2,"ng-container",0),s.Hc(1,b,2,1,"nx-message",1),s.Hc(2,d,1,0,"ng-template",null,2,s.Ic)),2&e&&(s.kc("ngIf","text"===t.appearance),s.Bb(1),s.kc("ngIf","message"===t.appearance))},directives:[o.t,o.A,c.a,l.a],styles:["[_nghost-%COMP%]{font-size:var(--base-error-simple-font-size);font-weight:var(--base-error-simple-font-weight);letter-spacing:var(--base-error-simple-letter-spacing);color:var(--base-error-color);width:100%;display:flex;text-align:left}[_nghost-%COMP%], [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{line-height:var(--base-error-simple-line-height)}[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{font-size:var(--base-error-simple-icon-size);margin-right:8px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{color:windowText}}[_nghost-%COMP%]   .nx-error__content-wrapper[_ngcontent-%COMP%]{max-width:100%}[dir=rtl]   [_nghost-%COMP%]{text-align:right}[dir=rtl]   [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}.nx-error--message[_nghost-%COMP%]{margin:12px 0}.nx-error--message[_nghost-%COMP%]   nx-message[_ngcontent-%COMP%]{margin:0}"],changeDetection:0}),e})()}}]);