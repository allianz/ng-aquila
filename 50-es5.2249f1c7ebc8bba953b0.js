!function(){function n(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=n&&("undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"]);if(null==e)return;var r,a,i=[],o=!0,c=!1;try{for(e=e.call(n);!(o=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);o=!0);}catch(s){c=!0,a=s}finally{try{o||null==e.return||e.return()}finally{if(c)throw a}}return i}(n,e)||function(n,e){if(!n)return;if("string"==typeof n)return t(n,e);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(n);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(n,e)}(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function e(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function r(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}function a(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"/sJ9":function(n,t,e){"use strict";e.d(t,"a",function(){return o});var r,i=e("fXoL"),o=((r=function n(){a(this,n)}).\u0275fac=function(n){return new(n||r)},r.\u0275mod=i.Ob({type:r}),r.\u0275inj=i.Nb({}),r);e("LktG")},LktG:function(t,e,i){"use strict";i.d(e,"a",function(){return l});var o=i("fXoL"),c=["nxCopytext",""],s=["*"],l=function(){var t=function(){function t(){a(this,t),this.type="normal",this.negative=!1}return r(t,[{key:"classNames",get:function(){return this._classNames},set:function(t){if(this._classNames!==t){this._classNames=t;var e=n(this._classNames.match(/small|medium|normal|large/)||["normal"],1)[0],r=void 0===e?null:e;this.type=r,this.negative=!!this._classNames.match(/negative/)}}}]),t}();return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=o.Kb({type:t,selectors:[["","nxCopytext",""]],hostVars:12,hostBindings:function(n,t){2&n&&o.Ib("nx-copy",!0)("nx-copy--small","small"===t.type)("nx-copy--medium","medium"===t.type)("nx-copy--normal","normal"===t.type)("nx-copy--large","large"===t.type)("nx-copy--negative",t.negative)},inputs:{classNames:["nxCopytext","classNames"]},attrs:c,ngContentSelectors:s,decls:1,vars:0,template:function(n,t){1&n&&(o.mc(),o.lc(0))},styles:["[_nghost-%COMP%]{margin:0;font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing)}.nx-copy.nx-copy[_nghost-%COMP%]{font-weight:400}.nx-copy--negative[_nghost-%COMP%]{color:var(--negative)}.nx-copy--small[_nghost-%COMP%]{font-size:var(--paragraph-05-font-size);line-height:var(--paragraph-05-line-height);font-weight:var(--paragraph-05-font-weight);letter-spacing:var(--paragraph-05-letter-spacing)}.nx-copy--medium[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing)}.nx-copy--large[_nghost-%COMP%]{font-size:var(--paragraph-02-font-size);line-height:var(--paragraph-02-line-height);font-weight:var(--paragraph-02-font-weight);letter-spacing:var(--paragraph-02-letter-spacing)}"],changeDetection:0}),t}()},YLcv:function(n,t,e){"use strict";e.r(t),e.d(t,"RtlExamplesModule",function(){return w});var i,o,c,s=e("eV8M"),l=e("gkbm"),u=e("/sJ9"),p=e("/BTq"),h=e("fXoL"),f=e("cH1L"),g=e("eC/v"),m=e("LktG"),x=e("fCGn"),b=((i=function n(){a(this,n),this.sliderDemoValue=10}).\u0275fac=function(n){return new(n||i)},i.\u0275cmp=h.Kb({type:i,selectors:[["rtl-basic-example"]],decls:6,vars:4,consts:[["dir","rtl"],["nxHeadline","subsection-medium"],["nxCopytext","small"],["nxLabel","Slider Test Label",3,"nxMin","nxMax","nxStep","nxValue","nxValueChange"]],template:function(n,t){1&n&&(h.Wb(0,"div",0),h.Wb(1,"h3",1),h.Jc(2,"RTL example content"),h.Vb(),h.Wb(3,"p",2),h.Jc(4,"Some copy text in RTL container."),h.Vb(),h.Wb(5,"nx-slider",3),h.dc("nxValueChange",function(n){return t.sliderDemoValue=n}),h.Vb(),h.Vb()),2&n&&(h.Eb(5),h.nc("nxMin",10)("nxMax",110)("nxStep",2)("nxValue",t.sliderDemoValue))},directives:[f.b,g.a,m.a,x.a],styles:[""]}),i),d=e("LTpZ"),y=e("ofXK"),v=((c=function(){function n(){a(this,n),this.direction="ltr",this.sliderDemoValue=10}return r(n,[{key:"toggleDirection",value:function(){this.direction="ltr"===this.direction?"rtl":"ltr"}}]),n}()).\u0275fac=function(n){return new(n||c)},c.\u0275cmp=h.Kb({type:c,selectors:[["rtl-dynamic-example"]],decls:10,vars:8,consts:[[3,"dir"],["nxHeadline","subsection-medium"],["nxCopytext","small"],[1,"nx-margin-bottom-m"],["nxLabel","Slider Test Label",3,"nxMin","nxMax","nxStep","nxValue","nxValueChange"],["nxButton","",3,"click"]],template:function(n,t){1&n&&(h.Wb(0,"div",0),h.Wb(1,"h3",1),h.Jc(2,"Dynamic direction switching"),h.Vb(),h.Wb(3,"p",2),h.Jc(4),h.ic(5,"uppercase"),h.Vb(),h.Wb(6,"div",3),h.Wb(7,"nx-slider",4),h.dc("nxValueChange",function(n){return t.sliderDemoValue=n}),h.Vb(),h.Vb(),h.Wb(8,"button",5),h.dc("click",function(){return t.toggleDirection()}),h.Jc(9,"Switch container direction"),h.Vb(),h.Vb()),2&n&&(h.nc("dir",t.direction),h.Eb(4),h.Lc("Some copy text in ",h.jc(5,6,t.direction)," container."),h.Eb(3),h.nc("nxMin",10)("nxMax",110)("nxStep",2)("nxValue",t.sliderDemoValue))},directives:[f.b,g.a,m.a,x.a,d.a],pipes:[y.x],styles:[""]}),c),w=((o=function(){function n(){a(this,n)}return r(n,null,[{key:"components",value:function(){return{"rtl-basic":b,"rtl-dynamic":v}}}]),n}()).\u0275fac=function(n){return new(n||o)},o.\u0275mod=h.Ob({type:o}),o.\u0275inj=h.Nb({imports:[[f.a,y.c,s.a,l.b,u.a,p.a]]}),o)}}])}();