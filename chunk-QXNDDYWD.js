import{b as S}from"./chunk-JERSESXB.js";import{z as w}from"./chunk-E5X5IINZ.js";import{$b as g,Ec as u,Pb as M,Tb as O,Wb as P,_b as m,g as d,h as r,i as _,lc as z,mc as h,na as y,nc as p,pa as C,ub as x,vb as b,wc as v,xa as c,xc as D,ya as f}from"./chunk-H7RQIDOF.js";var T=["*"],j=["*",[["nx-data-display-label"]]],I=["*","nx-data-display-label"];function A(n,a){if(n&1&&(m(0,"nx-data-display-label"),v(1),g()),n&2){let o=z();x(),D(o.label)}}function F(n,a){n&1&&p(0,1)}var N=new C("DATA_DISPLAY_DEFAULT_OPTIONS"),E=(()=>{let a=class a{};a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=c({type:a,selectors:[["nx-data-display-label"]],hostAttrs:[1,"nx-data-display__label"],standalone:!0,features:[u],ngContentSelectors:T,decls:1,vars:0,template:function(t,L){t&1&&(h(),p(0))},styles:["[_nghost-%COMP%]{display:block;font-weight:var(--data-display-label-font-weight)}"],changeDetection:0});let n=a;return n})(),Q=(()=>{var a,o,i;let t=class t{constructor(e){r(this,a);r(this,o);r(this,i);this._defaultOptions=e}set labelColumns(e){_(this,a,S(e))}get labelColumns(){return d(this,a)??6}set size(e){_(this,o,e)}get size(){return d(this,o)||this._defaultOptions?.size||"large"}set orientation(e){_(this,i,e)}get orientation(){return d(this,i)??"vertical"}};a=new WeakMap,o=new WeakMap,i=new WeakMap,t.\u0275fac=function(s){return new(s||t)(b(N,8))},t.\u0275cmp=c({type:t,selectors:[["nx-data-display"]],hostVars:18,hostBindings:function(s,l){s&2&&O("is-horizontal",l.orientation==="horizontal")("is-horizontal-columns",l.orientation==="horizontal-columns")("is-small",l.size==="small")("is-medium",l.size==="medium")("is-large",l.size==="large")("nx-data-display__label-columns-3",l.labelColumns===3)("nx-data-display__label-columns-4",l.labelColumns===4)("nx-data-display__label-columns-8",l.labelColumns===8)("nx-data-display__label-columns-9",l.labelColumns===9)},inputs:{label:"label",labelColumns:"labelColumns",size:"size",orientation:"orientation"},standalone:!0,features:[u],ngContentSelectors:I,decls:4,vars:1,consts:[[1,"nx-data-display__value"]],template:function(s,l){s&1&&(h(j),M(0,A,2,1,"nx-data-display-label")(1,F,1,0),m(2,"div",0),p(3),g()),s&2&&P(l.label?0:1)},dependencies:[E],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column}.is-horizontal[_nghost-%COMP%]{flex-direction:row}.is-horizontal[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{flex-grow:1}.is-horizontal-columns[_nghost-%COMP%]{display:grid;grid-template-columns:repeat(12,1fr)}.is-horizontal-columns[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 6}.is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label{grid-column-end:span 6}.is-horizontal[_nghost-%COMP%]    >.nx-data-display__label, .is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label{padding-right:4px}.is-horizontal[_nghost-%COMP%]    >.nx-data-display__label:after, .is-horizontal-columns[_nghost-%COMP%]    >.nx-data-display__label:after{display:inline;content:":"}.is-horizontal.nx-data-display__label-columns-3[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-3[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 3}.is-horizontal.nx-data-display__label-columns-3[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-3[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 9}.is-horizontal.nx-data-display__label-columns-4[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-4[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 4}.is-horizontal.nx-data-display__label-columns-4[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-4[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 8}.is-horizontal.nx-data-display__label-columns-8[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-8[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 8}.is-horizontal.nx-data-display__label-columns-8[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-8[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 4}.is-horizontal.nx-data-display__label-columns-9[_nghost-%COMP%] >   .nx-data-display__label, .is-horizontal-columns.nx-data-display__label-columns-9[_nghost-%COMP%] >   .nx-data-display__label{grid-column-end:span 9}.is-horizontal.nx-data-display__label-columns-9[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%], .is-horizontal-columns.nx-data-display__label-columns-9[_nghost-%COMP%] > .nx-data-display__value[_ngcontent-%COMP%]{grid-column-end:span 3}.is-small[_nghost-%COMP%]{font-size:var(--data-display-small-font-size);line-height:var(--data-display-small-line-height);font-weight:var(--data-display-small-font-weight);letter-spacing:var(--data-display-small-letter-spacing)}.is-medium[_nghost-%COMP%]{font-size:var(--data-display-medium-font-size);line-height:var(--data-display-medium-line-height);font-weight:var(--data-display-medium-font-weight);letter-spacing:var(--data-display-medium-letter-spacing)}.is-large[_nghost-%COMP%]{font-size:var(--data-display-large-font-size);line-height:var(--data-display-large-line-height);font-weight:var(--data-display-large-font-weight);letter-spacing:var(--data-display-large-letter-spacing)}@media (max-width: 703px){.is-large[_nghost-%COMP%]{font-size:var(--data-display-large-mobile-font-size);line-height:var(--data-display-large-mobile-line-height);font-weight:var(--data-display-large-mobile-font-weight);letter-spacing:var(--data-display-large-mobile-letter-spacing)}}'],changeDetection:0});let n=t;return n})(),R=(()=>{let a=class a{};a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=f({type:a}),a.\u0275inj=y({imports:[w]});let n=a;return n})();export{N as a,E as b,Q as c,R as d};
