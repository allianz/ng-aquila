!function(){function t(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null==n)return;var a,i,r=[],o=!0,s=!1;try{for(n=n.call(t);!(o=(a=n.next()).done)&&(r.push(a.value),!e||r.length!==e);o=!0);}catch(c){s=!0,i=c}finally{try{o||null==n.return||n.return()}finally{if(s)throw i}}return r}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return e(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function n(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function a(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{"/sJ9":function(t,e,n){"use strict";n.d(e,"a",function(){return o});var a,r=n("fXoL"),o=((a=function t(){i(this,t)}).\u0275fac=function(t){return new(t||a)},a.\u0275mod=r.Ob({type:a}),a.\u0275inj=r.Nb({}),a);n("LktG")},LktG:function(e,n,r){"use strict";r.d(n,"a",function(){return p});var o=r("fXoL"),s=["nxCopytext",""],c=["*"],p=function(){var e=function(){function e(){i(this,e),this.type="normal",this.negative=!1}return a(e,[{key:"classNames",get:function(){return this._classNames},set:function(e){if(this._classNames!==e){this._classNames=e;var n=t(this._classNames.match(/small|medium|normal|large/)||["normal"],1)[0],a=void 0===n?null:n;this.type=a,this.negative=!!this._classNames.match(/negative/)}}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=o.Kb({type:e,selectors:[["","nxCopytext",""]],hostVars:12,hostBindings:function(t,e){2&t&&o.Ib("nx-copy",!0)("nx-copy--small","small"===e.type)("nx-copy--medium","medium"===e.type)("nx-copy--normal","normal"===e.type)("nx-copy--large","large"===e.type)("nx-copy--negative",e.negative)},inputs:{classNames:["nxCopytext","classNames"]},attrs:s,ngContentSelectors:c,decls:1,vars:0,template:function(t,e){1&t&&(o.mc(),o.lc(0))},styles:["[_nghost-%COMP%]{margin:0;font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing)}.nx-copy.nx-copy[_nghost-%COMP%]{font-weight:400}.nx-copy--negative[_nghost-%COMP%]{color:var(--negative)}.nx-copy--small[_nghost-%COMP%]{font-size:var(--paragraph-05-font-size);line-height:var(--paragraph-05-line-height);font-weight:var(--paragraph-05-font-weight);letter-spacing:var(--paragraph-05-letter-spacing)}.nx-copy--medium[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing)}.nx-copy--large[_nghost-%COMP%]{font-size:var(--paragraph-02-font-size);line-height:var(--paragraph-02-line-height);font-weight:var(--paragraph-02-font-weight);letter-spacing:var(--paragraph-02-letter-spacing)}"],changeDetection:0}),e}()},uuXD:function(t,e,n){"use strict";n.r(e),n.d(e,"CopytextExamplesModule",function(){return m});var r,o,s,c=n("/sJ9"),p=n("fXoL"),u=n("LktG"),l=((s=function t(){i(this,t)}).\u0275fac=function(t){return new(t||s)},s.\u0275cmp=p.Kb({type:s,selectors:[["copytext-negative-example"]],decls:3,vars:0,consts:[[1,"docs-inverse-container"],["nxCopytext","medium negative"]],template:function(t,e){1&t&&(p.Wb(0,"div",0),p.Wb(1,"p",1),p.Jc(2,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus?"),p.Vb(),p.Vb())},directives:[u.a],styles:["p[_ngcontent-%COMP%]{text-align:center}"]}),s),b=((o=function t(){i(this,t)}).\u0275fac=function(t){return new(t||o)},o.\u0275cmp=p.Kb({type:o,selectors:[["copytext-sizes-example"]],decls:53,vars:0,consts:[[1,"table","typography-demo-table"],[1,"left"],["nxCopytext","small",1,"nx-margin-bottom-2m"],[1,"clr-code"],["nxCopytext","medium",1,"nx-margin-bottom-2m"],["nxCopytext","normal",1,"nx-margin-bottom-2m"],["nxCopytext","large"]],template:function(t,e){1&t&&(p.Wb(0,"table",0),p.Wb(1,"thead"),p.Wb(2,"tr"),p.Wb(3,"th",1),p.Jc(4,"Variant"),p.Vb(),p.Wb(5,"th",1),p.Jc(6,"Size"),p.Vb(),p.Wb(7,"th",1),p.Jc(8,"Used for"),p.Vb(),p.Vb(),p.Vb(),p.Wb(9,"tbody"),p.Wb(10,"tr"),p.Wb(11,"td",1),p.Wb(12,"p",2),p.Jc(13," Font size 12 px, line height 16px"),p.Rb(14,"br"),p.Jc(15," Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus? "),p.Vb(),p.Vb(),p.Wb(16,"td",1),p.Wb(17,"code",3),p.Jc(18,"small"),p.Vb(),p.Vb(),p.Wb(19,"td",1),p.Jc(20," legal texts "),p.Vb(),p.Vb(),p.Wb(21,"tr"),p.Wb(22,"td",1),p.Wb(23,"p",4),p.Jc(24," Font size 14 px, line height 20px"),p.Rb(25,"br"),p.Jc(26," Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus? "),p.Vb(),p.Vb(),p.Wb(27,"td",1),p.Wb(28,"code",3),p.Jc(29,"medium"),p.Vb(),p.Vb(),p.Wb(30,"td",1),p.Jc(31," footnotes "),p.Vb(),p.Vb(),p.Wb(32,"tr"),p.Wb(33,"td",1),p.Wb(34,"p",5),p.Jc(35," Font size 16 px, line height 24 px"),p.Rb(36,"br"),p.Jc(37," Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus? "),p.Vb(),p.Vb(),p.Wb(38,"td",1),p.Wb(39,"code",3),p.Jc(40,"normal (default)"),p.Vb(),p.Vb(),p.Wb(41,"td",1),p.Jc(42," normal content (default size) "),p.Vb(),p.Vb(),p.Wb(43,"tr"),p.Wb(44,"td",1),p.Wb(45,"p",6),p.Jc(46," Font size 18 px, line height 24 px"),p.Rb(47,"br"),p.Jc(48," Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptate explicabo ad iste, ratione cupiditate eaque sapiente odit, accusamus placeat ipsam dolor sint voluptatibus nam? Recusandae accusamus iste sapiente necessitatibus? "),p.Vb(),p.Vb(),p.Wb(49,"td",1),p.Wb(50,"code",3),p.Jc(51,"large"),p.Vb(),p.Vb(),p.Rb(52,"td",1),p.Vb(),p.Vb(),p.Vb())},directives:[u.a],styles:["table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{text-align:center}"]}),o),m=((r=function(){function t(){i(this,t)}return a(t,null,[{key:"components",value:function(){return{"copytext-negative":l,"copytext-sizes":b}}}]),t}()).\u0275fac=function(t){return new(t||r)},r.\u0275mod=p.Ob({type:r}),r.\u0275inj=p.Nb({imports:[[c.a]]}),r)}}])}();