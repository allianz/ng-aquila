import{c as a,e as O}from"./chunk-WBPLCJVU.js";import{$c as b,Eb as x,Hb as f,Pb as _,Rb as s,Vb as v,Wb as u,Xb as C,hc as c,ic as p,na as h,nc as M,oc as P,pc as w,tb as m,xa as o,ya as l,za as d}from"./chunk-O56WLCF2.js";var N=["nxList",""],z=["*"],I=["viewRefPrefix"],D=["nxListIcon",""],y="normal",V=(()=>{let t=class t{constructor(){this._classNames="",this._condensed=!1,this.type=y,this.negative=!1,this.orderedCircle=!1}set classNames(n){if(this._classNames===n)return;this._classNames=n;let[i=null]=this._classNames?.match(/xsmall|small|normal/)||[y];this.type=i,this.negative=!!this._classNames?.match(/negative/),this.orderedCircle=!!this._classNames?.match(/ordered-circle/)}get classNames(){return this._classNames}set condensed(n){this._condensed=n}get condensed(){return this._condensed}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=l({type:t,selectors:[["ul","nxList",""],["ol","nxList",""]],hostVars:18,hostBindings:function(i,e){i&2&&s("nx-list",!0)("nx-list--xsmall",e.type==="xsmall")("nx-list--xsmall-condensed",e.type==="xsmall"&&e.condensed)("nx-list--small",e.type==="small")("nx-list--small-condensed",e.type==="small"&&e.condensed)("nx-list--normal",e.type==="normal")("nx-list--normal-condensed",e.type==="normal"&&e.condensed)("nx-list--negative",e.negative)("nx-list--ordered-circle",e.orderedCircle)},inputs:{classNames:[o.None,"nxList","classNames"],condensed:[o.HasDecoratorInputTransform,"condensed","condensed",b]},features:[f],attrs:N,ngContentSelectors:z,decls:1,vars:0,template:function(i,e){i&1&&(c(),p(0))},styles:['[_nghost-%COMP%]{color:var(--list-text-color);list-style:none;padding:0;counter-reset:list}.nx-list--normal[_nghost-%COMP%]{font-size:var(--paragraph-02-font-size);line-height:var(--paragraph-02-line-height);font-weight:var(--paragraph-02-font-weight);letter-spacing:var(--paragraph-02-letter-spacing)}.nx-list--small[_nghost-%COMP%]{font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing)}.nx-list--xsmall[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing);font-weight:400}.nx-list--negative[_nghost-%COMP%]{color:var(--negative)}.nx-list--negative[_nghost-%COMP%]     .nx-list__icon{color:var(--negative)}[_nghost-%COMP%]     .nx-list__icon{position:absolute;left:0;font-size:var(--list-icon-size);color:var(--list-icon-color);top:calc((var(--paragraph-02-line-height) - var(--list-icon-size)) / 2);line-height:var(--list-icon-size);height:var(--list-icon-size)}[dir=rtl]   [_nghost-%COMP%]     .nx-list__icon{right:0;left:auto}ul.nx-list--small[_nghost-%COMP%]     li .nx-list__icon{top:calc((var(--paragraph-03-line-height) - var(--list-icon-size)) / 2)}ul.nx-list--xsmall[_nghost-%COMP%]     li .nx-list__icon{top:calc((var(--paragraph-04-line-height) - var(--list-icon-size)) / 2)}[_nghost-%COMP%]     li{padding-left:calc(var(--list-icon-size) + 12px);position:relative}[dir=rtl]   [_nghost-%COMP%]     li{padding-right:calc(var(--list-icon-size) + 12px);padding-left:initial}.nx-list--xsmall[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-xsmall-item-spacing)}.nx-list--small[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-small-item-spacing)}.nx-list--normal[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-normal-item-spacing)}.nx-list--xsmall-condensed[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-xsmall-condensed-item-spacing)}.nx-list--small-condensed[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-small-condensed-item-spacing)}.nx-list--normal-condensed[_nghost-%COMP%]     li:not(:last-child){margin-bottom:var(--list-normal-condensed-item-spacing)}ul[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{background-color:var(--list-icon-color);border-radius:50%;content:"";display:inline-block;height:8px;width:8px;margin-right:16px;position:absolute;margin-left:calc(-1 * var(--list-icon-size));margin-top:calc((var(--paragraph-02-line-height) - 8px) / 2);transform:translate(-50%)}[dir=rtl]   ul[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{margin-right:calc(-1 * var(--list-icon-size));margin-left:16px;transform:translate(50%)}@media screen and (forced-colors: active){ul[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{background-color:CanvasText!important}}ul.nx-list--small[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{margin-top:calc((var(--paragraph-03-line-height) - 8px) / 2)}ul.nx-list--xsmall[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{margin-top:calc((var(--paragraph-04-line-height) - 8px) / 2)}ol[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{counter-increment:list;content:counter(list);position:absolute;font-size:inherit;font-weight:700;display:inline-block;width:var(--list-icon-size);text-align:center;left:0}[dir=rtl]   ol[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{right:0;left:auto}[_nghost-%COMP%]     li>  ol, [_nghost-%COMP%]     li>  ul{margin-bottom:16px;margin-top:16px}ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{width:var(--list-circle-size);font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing);color:#adff2f;color:var(--list-circle-text-color);left:0;top:calc((var(--paragraph-02-line-height) - var(--paragraph-03-line-height)) / 2);z-index:2}[dir=rtl]   ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{right:0;left:auto}@media screen and (forced-colors: active){ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{border:1px solid CanvasText;border-radius:50%}}ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):after{border-radius:50%;width:var(--list-circle-size);height:var(--list-circle-size);background-color:var(--list-icon-color);left:0;top:calc((var(--paragraph-02-line-height) - var(--list-circle-size)) / 2);content:"";position:absolute}[dir=rtl]   ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):after{right:0;left:auto}@media screen and (forced-colors: active){ol.nx-list--ordered-circle[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):after{color:CanvasText}}ol.nx-list--ordered-circle.nx-list--small[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{top:calc((var(--paragraph-03-line-height) - var(--paragraph-03-line-height)) / 2)}ol.nx-list--ordered-circle.nx-list--small[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):after{top:calc((var(--paragraph-03-line-height) - var(--list-circle-size)) / 2)}ol.nx-list--ordered-circle.nx-list--xsmall[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{top:calc((var(--paragraph-04-line-height) - var(--paragraph-03-line-height)) / 2)}ol.nx-list--ordered-circle.nx-list--xsmall[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):after{top:calc((var(--paragraph-04-line-height) - var(--list-circle-size)) / 2)}ol.nx-list--ordered-circle.nx-list--negative[_nghost-%COMP%] >li:not(.nx-list__icon-wrapper):after{background-color:var(--negative)}ol.nx-list--ordered-circle.nx-list--negative[_nghost-%COMP%] >li:not(.nx-list__icon-wrapper):before{color:var(--negative-background)}ul.nx-list--negative[_nghost-%COMP%]    >li:not(.nx-list__icon-wrapper):before{background-color:var(--negative)}'],changeDetection:0});let r=t;return r})(),E=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=l({type:t,selectors:[["li","nxListIcon",""]],viewQuery:function(i,e){if(i&1&&M(I,5,x),i&2){let g;P(g=w())&&(e.viewRefPrefix=g.first)}},hostVars:2,hostBindings:function(i,e){i&2&&s("nx-list__icon-wrapper",!0)},inputs:{name:[o.None,"nxListIcon","name"]},attrs:D,ngContentSelectors:z,decls:3,vars:1,consts:[[1,"nx-list__icon"],[3,"name"]],template:function(i,e){i&1&&(c(),v(0,"span",0),C(1,"nx-icon",1),u(),p(2)),i&2&&(m(),_("name",e.name))},dependencies:[a],encapsulation:2});let r=t;return r})(),H=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=d({type:t,bootstrap:[a]}),t.\u0275inj=h({imports:[O]});let r=t;return r})();export{V as a,E as b,H as c};
