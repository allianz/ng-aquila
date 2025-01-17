import{b as f}from"./chunk-APNBV455.js";import{z as b}from"./chunk-CCSED5RY.js";import{Ac as i,Lb as e,Mb as m,Mc as x,Nc as C,Rb as g,dc as h,gc as u,ka as r,lc as o,ma as _,mc as s,wb as p,xb as c,yc as y,zc as d}from"./chunk-LG2ZA55B.js";var O=["*"],P=["*",[["nx-data-display-label"]]],z=["*","nx-data-display-label"];function v(a,M){if(a&1&&(o(0,"nx-data-display-label"),x(1),s()),a&2){let n=y();p(),C(n.label)}}function D(a,M){a&1&&i(0,1)}var w=new _("DATA_DISPLAY_DEFAULT_OPTIONS"),N=(()=>{class a{static{this.\u0275fac=function(t){return new(t||a)}}static{this.\u0275cmp=e({type:a,selectors:[["nx-data-display-label"]],hostAttrs:[1,"nx-data-display__label"],ngContentSelectors:O,decls:1,vars:0,template:function(t,l){t&1&&(d(),i(0))},styles:["[_nghost-%COMP%]{display:block;font-weight:var(--data-display-label-font-weight)}"],changeDetection:0})}}return a})(),U=(()=>{class a{set labelColumns(n){this.#a=f(n)}get labelColumns(){return this.#a??6}#a;set size(n){this.#n=n}get size(){return this.#n||this._defaultOptions?.size||"large"}#n;set orientation(n){this.#t=n}get orientation(){return this.#t??"vertical"}#t;constructor(n){this._defaultOptions=n}static{this.\u0275fac=function(t){return new(t||a)(c(w,8))}}static{this.\u0275cmp=e({type:a,selectors:[["nx-data-display"]],hostVars:18,hostBindings:function(t,l){t&2&&h("is-horizontal",l.orientation==="horizontal")("is-horizontal-columns",l.orientation==="horizontal-columns")("is-small",l.size==="small")("is-medium",l.size==="medium")("is-large",l.size==="large")("nx-data-display__label-columns-3",l.labelColumns===3)("nx-data-display__label-columns-4",l.labelColumns===4)("nx-data-display__label-columns-8",l.labelColumns===8)("nx-data-display__label-columns-9",l.labelColumns===9)},inputs:{label:"label",labelColumns:"labelColumns",size:"size",orientation:"orientation"},ngContentSelectors:z,decls:4,vars:1,consts:[[1,"nx-data-display__value"]],template:function(t,l){t&1&&(d(P),g(0,v,2,1,"nx-data-display-label")(1,D,1,0),o(2,"div",0),i(3),s()),t&2&&u(l.label?0:1)},dependencies:[N],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column}.is-horizontal[_nghost-%COMP%]{flex-direction:row}.is-horizontal[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{flex-grow:1}.is-horizontal-columns[_nghost-%COMP%]{display:grid;grid-template-columns:repeat(12,1fr)}.is-horizontal-columns[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 6}.is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label{grid-column-end:span 6}.is-horizontal[_nghost-%COMP%]    >.nx-data-display__label, .is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label{padding-right:4px}.is-horizontal[_nghost-%COMP%]    >.nx-data-display__label:after, .is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label:after{display:inline;content:":"}.is-horizontal.nx-data-display__label-columns-3[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-3[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 3}.is-horizontal.nx-data-display__label-columns-3[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-3[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 9}.is-horizontal.nx-data-display__label-columns-4[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-4[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 4}.is-horizontal.nx-data-display__label-columns-4[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-4[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 8}.is-horizontal.nx-data-display__label-columns-8[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-8[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 8}.is-horizontal.nx-data-display__label-columns-8[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-8[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 4}.is-horizontal.nx-data-display__label-columns-9[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-9[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 9}.is-horizontal.nx-data-display__label-columns-9[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-9[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 3}.is-small[_nghost-%COMP%]{font-size:var(--data-display-small-font-size);line-height:var(--data-display-small-line-height);font-weight:var(--data-display-small-font-weight);letter-spacing:var(--data-display-small-letter-spacing)}.is-medium[_nghost-%COMP%]{font-size:var(--data-display-medium-font-size);line-height:var(--data-display-medium-line-height);font-weight:var(--data-display-medium-font-weight);letter-spacing:var(--data-display-medium-letter-spacing)}.is-large[_nghost-%COMP%]{font-size:var(--data-display-large-font-size);line-height:var(--data-display-large-line-height);font-weight:var(--data-display-large-font-weight);letter-spacing:var(--data-display-large-letter-spacing)}@media (max-width: 703px){.is-large[_nghost-%COMP%]{font-size:var(--data-display-large-mobile-font-size);line-height:var(--data-display-large-mobile-line-height);font-weight:var(--data-display-large-mobile-font-weight);letter-spacing:var(--data-display-large-mobile-letter-spacing)}}'],changeDetection:0})}}return a})(),Y=(()=>{class a{static{this.\u0275fac=function(t){return new(t||a)}}static{this.\u0275mod=m({type:a})}static{this.\u0275inj=r({imports:[b]})}}return a})();export{w as a,N as b,U as c,Y as d};
