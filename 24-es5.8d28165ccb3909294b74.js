!function(){function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],a=!0,r=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(a=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(c){r=!0,o=c}finally{try{a||null==s.return||s.return()}finally{if(r)throw o}}return n}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return t(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function n(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function a(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{"4TwE":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a,o=n("EM62"),i=((a=function e(){r(this,e)}).\u0275mod=o.Lb({type:a}),a.\u0275inj=o.Kb({factory:function(e){return new(e||a)}}),a);n("VqxJ")},"4Umg":function(e,t,n){"use strict";n.r(t),n.d(t,"RadioExamplesModule",(function(){return R}));var o,i,s=n("0FLW"),c=n("9j8J"),l=n("EM62"),u=n("0aWw"),b=((o=function e(){r(this,e)}).\u0275fac=function(e){return new(e||o)},o.\u0275cmp=l.Hb({type:o,selectors:[["ng-component"]],decls:6,vars:0,consts:[["name","fruit",1,"nx-margin-bottom-m"],["name","fruit"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio",0),l.Jc(1,"Apples"),l.Sb(),l.Tb(2,"nx-radio",0),l.Jc(3,"Oranges"),l.Sb(),l.Tb(4,"nx-radio",1),l.Jc(5,"Bananas"),l.Sb())},directives:[u.a],styles:[""]}),o),g=n("LoTN"),p=((i=function e(){r(this,e)}).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=l.Hb({type:i,selectors:[["nx-radio-button-disabled-example"]],decls:7,vars:0,consts:[["name","disabledTest","nxDisabled","true"],[1,"nx-margin-bottom-m"],["nxValue","apples",1,"nx-margin-bottom-m"],["nxValue","oranges"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio-group",0),l.Tb(1,"nx-label",1),l.Jc(2,"What do you prefer?"),l.Sb(),l.Tb(3,"nx-radio",2),l.Jc(4,"I like Apples"),l.Sb(),l.Tb(5,"nx-radio",3),l.Jc(6,"I like Oranges"),l.Sb(),l.Sb())},directives:[u.b,g.a,u.a],styles:[""]}),i),m=n("2kYt");function d(e,t){if(1&e&&(l.Tb(0,"pre"),l.Jc(1),l.Sb()),2&e){var n=l.ec();l.Bb(1),l.Kc(n.logMessage)}}var h,f,x,v,y,_,T,S,C,O,w,k=((h=function(){function e(){r(this,e),this.messages=[]}return a(e,[{key:"log",value:function(e){this.messages.push(e),this.logMessage=this.messages.join("\n")}}]),e}()).\u0275fac=function(e){return new(e||h)},h.\u0275cmp=l.Hb({type:h,selectors:[["nx-radio-button-event-example"]],decls:9,vars:1,consts:[["name","singleRadioOutputTest",3,"nxGroupValueChange"],[1,"nx-margin-bottom-m"],["nxValue","option1",1,"nx-margin-bottom-m",3,"nxValueChange"],["nxValue","option2",3,"nxValueChange"],[4,"ngIf"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio-group",0),l.ac("nxGroupValueChange",(function(e){return t.log("nxGroupValueChange occured: "+e.value)})),l.Tb(1,"nx-label",1),l.Jc(2,"This is a nx-radio-group label"),l.Sb(),l.Tb(3,"nx-radio",2),l.ac("nxValueChange",(function(e){return t.log("nxValueChange occured: "+e.value)})),l.Jc(4," Option 1 "),l.Sb(),l.Tb(5,"nx-radio",3),l.ac("nxValueChange",(function(e){return t.log("nxValueChange occured: "+e.value)})),l.Jc(6," Option 2 "),l.Sb(),l.Sb(),l.Ob(7,"br"),l.Hc(8,d,2,1,"pre",4)),2&e&&(l.Bb(8),l.kc("ngIf",t.logMessage))},directives:[u.b,g.a,u.a,m.t],styles:[""]}),h),M=n("nIj0"),J=((y=function e(){r(this,e),this.templateModel="apples"}).\u0275fac=function(e){return new(e||y)},y.\u0275cmp=l.Hb({type:y,selectors:[["nx-radio-button-form-example"]],decls:10,vars:2,consts:[["name","templateTest",3,"ngModel","ngModelChange"],[1,"nx-margin-bottom-m"],["nxValue","apples",1,"nx-margin-bottom-m"],["nxValue","oranges"]],template:function(e,t){1&e&&(l.Tb(0,"form"),l.Tb(1,"nx-radio-group",0),l.ac("ngModelChange",(function(e){return t.templateModel=e})),l.Tb(2,"nx-label",1),l.Jc(3,"What do you prefer?"),l.Sb(),l.Tb(4,"nx-radio",2),l.Jc(5,"I like Apples"),l.Sb(),l.Tb(6,"nx-radio",3),l.Jc(7,"I like Oranges"),l.Sb(),l.Sb(),l.Tb(8,"p"),l.Jc(9),l.Sb(),l.Sb()),2&e&&(l.Bb(1),l.kc("ngModel",t.templateModel),l.Bb(8),l.Lc("Current Value: ",t.templateModel,""))},directives:[M.A,M.q,M.r,u.b,M.p,M.s,g.a,u.a],styles:[""]}),y),z=((v=function e(){r(this,e)}).\u0275fac=function(e){return new(e||v)},v.\u0275cmp=l.Hb({type:v,selectors:[["nx-radio-button-group-example"]],decls:7,vars:0,consts:[["name","myGroup"],[1,"nx-margin-bottom-m"],["nxValue","1",1,"nx-margin-bottom-m"],["nxValue","2"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio-group",0),l.Tb(1,"nx-label",1),l.Jc(2,"This is a nx-radio-group"),l.Sb(),l.Tb(3,"nx-radio",2),l.Jc(4,"Select 1"),l.Sb(),l.Tb(5,"nx-radio",3),l.Jc(6,"Select 2"),l.Sb(),l.Sb())},directives:[u.b,g.a,u.a],styles:[""]}),v),P=((x=function e(){r(this,e)}).\u0275fac=function(e){return new(e||x)},x.\u0275cmp=l.Hb({type:x,selectors:[["ng-component"]],decls:8,vars:0,consts:[["name","myGroup"],[1,"nx-margin-bottom-m"],[1,"horizontal-buttons"],["nxValue","1",1,"nx-margin-bottom-m"],["nxValue","2",1,"nx-margin-left-s","nx-margin-bottom-m"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio-group",0),l.Tb(1,"nx-label",1),l.Jc(2,"This is a nx-radio-group"),l.Sb(),l.Tb(3,"div",2),l.Tb(4,"nx-radio",3),l.Jc(5,"Select 1"),l.Sb(),l.Tb(6,"nx-radio",4),l.Jc(7,"Select 2"),l.Sb(),l.Sb(),l.Sb())},directives:[u.b,g.a,u.a],styles:[".horizontal-buttons[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]}),x),V=((f=function e(){r(this,e)}).\u0275fac=function(e){return new(e||f)},f.\u0275cmp=l.Hb({type:f,selectors:[["ng-component"]],decls:7,vars:3,consts:[["name","labelSize"],[3,"size"],["nxValue","choice1",1,"nx-margin-bottom-s",3,"labelSize"],["nxValue","choice2",3,"labelSize"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio-group",0),l.Tb(1,"nx-label",1),l.Jc(2,"This is an expert label for the radio button group"),l.Sb(),l.Tb(3,"nx-radio",2),l.Jc(4,"Choice 1"),l.Sb(),l.Tb(5,"nx-radio",3),l.Jc(6,"Choice 2"),l.Sb(),l.Sb()),2&e&&(l.Bb(1),l.kc("size","small"),l.Bb(2),l.kc("labelSize","small"),l.Bb(2),l.kc("labelSize","small"))},directives:[u.b,g.a,u.a],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]}),f),B=n("yUsN"),I=n("tPQ2"),N=((O=function(){function e(t){r(this,e),this.formBuilder=t,this.createForm()}return a(e,[{key:"createForm",value:function(){this.testForm=this.formBuilder.group({radioTestReactive:[null,M.y.required]})}}]),e}()).\u0275fac=function(e){return new(e||O)(l.Nb(M.d))},O.\u0275cmp=l.Hb({type:O,selectors:[["ng-component"]],decls:15,vars:6,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive",3,"required"],[1,"nx-margin-bottom-s",3,"size"],["appearance","text"],["nxValue","coffee",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["nxValue","tea",1,"radio-item","nx-margin-bottom-s",3,"labelSize"],["nxValue","water",1,"radio-item",3,"labelSize"],["type","submit","nxButton","primary small"]],template:function(e,t){1&e&&(l.Tb(0,"form",0),l.Tb(1,"nx-radio-group",1),l.Tb(2,"nx-label",2),l.Jc(3,"What do you prefer?"),l.Sb(),l.Tb(4,"nx-error",3),l.Jc(5," Please make a choice. "),l.Sb(),l.Tb(6,"nx-radio",4),l.Jc(7,"Coffee"),l.Sb(),l.Tb(8,"nx-radio",5),l.Jc(9,"Tea"),l.Sb(),l.Tb(10,"nx-radio",6),l.Jc(11,"Water"),l.Sb(),l.Sb(),l.Ob(12,"br"),l.Tb(13,"button",7),l.Jc(14,"Submit"),l.Sb(),l.Sb()),2&e&&(l.kc("formGroup",t.testForm),l.Bb(1),l.kc("required",!0),l.Bb(1),l.kc("size","small"),l.Bb(4),l.kc("labelSize","small"),l.Bb(2),l.kc("labelSize","small"),l.Bb(2),l.kc("labelSize","small"))},directives:[M.A,M.q,M.i,u.b,M.p,M.g,M.w,g.a,B.b,u.a,I.a],styles:["[_nghost-%COMP%]   nx-radio-group[_ngcontent-%COMP%]   .nx-radio-button--small-label[_ngcontent-%COMP%]{margin-bottom:8px}"]}),O),F=((C=function e(){r(this,e)}).\u0275fac=function(e){return new(e||C)},C.\u0275cmp=l.Hb({type:C,selectors:[["ng-component"]],decls:9,vars:0,consts:[[1,"docs-inverse-container"],["name","negativeGroup","negative","true"],["name","size",1,"nx-margin-bottom-m"],["name","size"],["name","weight","negative","true"]],template:function(e,t){1&e&&(l.Tb(0,"div",0),l.Tb(1,"nx-radio-group",1),l.Tb(2,"nx-radio",2),l.Jc(3,"Radio 1"),l.Sb(),l.Tb(4,"nx-radio",3),l.Jc(5,"Radio 2"),l.Sb(),l.Sb(),l.Ob(6,"br"),l.Tb(7,"nx-radio",4),l.Jc(8,"Single negative radio"),l.Sb(),l.Sb())},directives:[u.b,u.a],styles:[""]}),C),j=((S=function(){function e(t){r(this,e),this.formBuilder=t,this.createForm()}return a(e,[{key:"createForm",value:function(){this.testForm=this.formBuilder.group({radioTestReactive:["oranges",M.y.required]})}}]),e}()).\u0275fac=function(e){return new(e||S)(l.Nb(M.d))},S.\u0275cmp=l.Hb({type:S,selectors:[["nx-radio-button-reactive-example"]],decls:14,vars:7,consts:[[3,"formGroup"],["name","reactiveTest","formControlName","radioTestReactive"],[1,"nx-margin-bottom-m"],["nxValue","apples",1,"nx-margin-bottom-m"],["nxValue","oranges"]],template:function(e,t){1&e&&(l.Tb(0,"form",0),l.Tb(1,"nx-radio-group",1),l.Tb(2,"nx-label",2),l.Jc(3,"What do you prefer?"),l.Sb(),l.Tb(4,"nx-radio",3),l.Jc(5,"I like Apples"),l.Sb(),l.Tb(6,"nx-radio",4),l.Jc(7,"I like Oranges"),l.Sb(),l.Sb(),l.Tb(8,"p"),l.Jc(9),l.fc(10,"json"),l.Sb(),l.Tb(11,"p"),l.Jc(12),l.fc(13,"json"),l.Sb(),l.Sb()),2&e&&(l.kc("formGroup",t.testForm),l.Bb(9),l.Lc("Form value: ",l.gc(10,3,t.testForm.value),""),l.Bb(3),l.Lc("Form status: ",l.gc(13,5,t.testForm.status),""))},directives:[M.A,M.q,M.i,u.b,M.p,M.g,g.a,u.a],pipes:[m.k],styles:[""]}),S),A=((T=function e(){r(this,e)}).\u0275fac=function(e){return new(e||T)},T.\u0275cmp=l.Hb({type:T,selectors:[["nx-radio-button-sample-example"]],decls:19,vars:4,consts:[["name","group1"],["name","group1",3,"nxChecked"],["name","group1",3,"nxDisabled"],["name","group2",3,"nxChecked","nxDisabled"]],template:function(e,t){1&e&&(l.Tb(0,"h3"),l.Jc(1,"The radio button hasn't been clicked."),l.Sb(),l.Tb(2,"nx-radio",0),l.Jc(3,"Default"),l.Sb(),l.Ob(4,"br"),l.Tb(5,"h3"),l.Jc(6,"An action or item is selected."),l.Sb(),l.Tb(7,"nx-radio",1),l.Jc(8,"Checked"),l.Sb(),l.Ob(9,"br"),l.Tb(10,"h3"),l.Jc(11,"The button is inactive due to previously checked or unchecked options."),l.Sb(),l.Tb(12,"nx-radio",2),l.Jc(13,"Disabled"),l.Sb(),l.Ob(14,"br"),l.Tb(15,"h3"),l.Jc(16,"An action or item has been pre-selected due to previously checked or unchecked options."),l.Sb(),l.Tb(17,"nx-radio",3),l.Jc(18,"Checked & disabled"),l.Sb()),2&e&&(l.Bb(7),l.kc("nxChecked",!0),l.Bb(5),l.kc("nxDisabled",!0),l.Bb(5),l.kc("nxChecked",!0)("nxDisabled",!0))},directives:[u.a],styles:[""]}),T),D=((_=function e(){r(this,e)}).\u0275fac=function(e){return new(e||_)},_.\u0275cmp=l.Hb({type:_,selectors:[["ng-component"]],decls:4,vars:0,consts:[["name","size","labelSize","small",1,"nx-margin-bottom-m"],["name","size"]],template:function(e,t){1&e&&(l.Tb(0,"nx-radio",0),l.Jc(1,"Radio with a small label"),l.Sb(),l.Tb(2,"nx-radio",1),l.Jc(3,"Radio with a big label (default)"),l.Sb())},directives:[u.a],styles:[""]}),_),H=n("t3RA"),R=((w=function(){function e(){r(this,e)}return a(e,null,[{key:"components",value:function(){return{"radio-button":b,"radio-button-disabled":p,"radio-button-event":k,"radio-button-form":J,"radio-button-group":z,"radio-button-group-horizontal":P,"radio-button-group-label-size":V,"radio-button-group-validation":N,"radio-button-negative":F,"radio-button-reactive":j,"radio-button-sample":A,"radio-button-sizes":D}}}]),e}()).\u0275mod=l.Lb({type:w}),w.\u0275inj=l.Kb({factory:function(e){return new(e||w)},imports:[[c.a,s.c,H.a]]}),w)},I5hw:function(e,t,n){"use strict";n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return b.a})),n.d(t,"b",(function(){return b.b})),n.d(t,"e",(function(){return g})),n.d(t,"d",(function(){return p.a}));var a,o,i=n("2kYt"),s=n("0FLW"),c=n("q+Ep"),l=n("EM62"),u=((a=function e(){r(this,e)}).\u0275mod=l.Lb({type:a}),a.\u0275inj=l.Kb({factory:function(e){return new(e||a)},imports:[[i.c,s.c,c.a]]}),a),b=n("yUsN"),g=((o=function e(){r(this,e)}).\u0275mod=l.Lb({type:o}),o.\u0275inj=l.Kb({factory:function(e){return new(e||o)},imports:[[i.c]]}),o),p=n("LoTN")},LoTN:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var o=n("EM62"),i=n("5XID"),s=n("ZTXN"),c=["*"],l=0,u=new o.r("LABEL_DEFAULT_OPTIONS"),b=function(){var e=function(){function e(t){r(this,e),this._defaultOptions=t,this._stateChanges=new s.a,this._disabled=!1,this._negative=!1,this._id="nx-label-"+l++}return a(e,[{key:"disabled",set:function(e){this._disabled=Object(i.b)(e),this._stateChanges.next()},get:function(){return this._disabled}},{key:"negative",set:function(e){this._negative=Object(i.b)(e),this._stateChanges.next()},get:function(){return this._negative}},{key:"id",set:function(e){this._id!==e&&(this._id=e)},get:function(){return this._id}},{key:"size",set:function(e){this._size=e,this._stateChanges.next()},get:function(){return this._size||this._defaultOptions&&this._defaultOptions.size||"large"}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Nb(u,8))},e.\u0275cmp=o.Hb({type:e,selectors:[["nx-label"]],hostVars:9,hostBindings:function(e,t){2&e&&(o.Cb("disabled",t.disabled)("aria-labelledby",t.id||null)("id",t.id),o.Fb("nx-label--negative",t.negative)("nx-label--large","large"===t.size)("nx-label--small","small"===t.size))},inputs:{disabled:"disabled",negative:"negative",id:"id",size:"size"},ngContentSelectors:c,decls:2,vars:0,consts:[[1,"nx-label__content"]],template:function(e,t){1&e&&(o.jc(),o.Tb(0,"label",0),o.ic(1),o.Sb())},styles:["[_nghost-%COMP%]{display:block;color:var(--text-01)}.nx-label--small[_nghost-%COMP%]{font-size:var(--base-label-small-font-size);line-height:var(--base-label-small-line-height);font-weight:var(--base-label-small-font-weight);letter-spacing:var(--base-label-small-letter-spacing)}.nx-label--large[_nghost-%COMP%]{font-size:var(--base-label-large-font-size);line-height:var(--base-label-large-line-height);font-weight:var(--base-label-large-font-weight);letter-spacing:var(--base-label-large-letter-spacing)}[disabled=true][_nghost-%COMP%]   label[_ngcontent-%COMP%]{cursor:not-allowed}.nx-label--negative[_nghost-%COMP%]{color:var(--negative)}"],changeDetection:0}),e}()},VqxJ:function(t,n,o){"use strict";o.d(n,"a",(function(){return l}));var i=o("EM62"),s=["nxCopytext",""],c=["*"],l=function(){var t=function(){function t(){r(this,t),this.type="normal",this.negative=!1}return a(t,[{key:"classNames",set:function(t){if(this._classNames!==t){this._classNames=t;var n=e(this._classNames.match(/small|medium|normal|large/)||["normal"],1)[0],a=void 0===n?null:n;this.type=a,this.negative=!!this._classNames.match(/negative/)}},get:function(){return this._classNames}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Hb({type:t,selectors:[["","nxCopytext",""]],hostVars:12,hostBindings:function(e,t){2&e&&i.Fb("nx-copy",!0)("nx-copy--small","small"===t.type)("nx-copy--medium","medium"===t.type)("nx-copy--normal","normal"===t.type)("nx-copy--large","large"===t.type)("nx-copy--negative",t.negative)},inputs:{classNames:["nxCopytext","classNames"]},attrs:s,ngContentSelectors:c,decls:1,vars:0,template:function(e,t){1&e&&(i.jc(),i.ic(0))},styles:["[_nghost-%COMP%]{margin:0 0 32px;font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing)}.nx-copy.nx-copy[_nghost-%COMP%]{font-weight:400}.nx-copy--negative[_nghost-%COMP%]{color:var(--negative)}.nx-copy--small[_nghost-%COMP%]{font-size:var(--paragraph-05-font-size);line-height:var(--paragraph-05-line-height);font-weight:var(--paragraph-05-font-weight);letter-spacing:var(--paragraph-05-letter-spacing)}.nx-copy--medium[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing)}.nx-copy--large[_nghost-%COMP%]{font-size:var(--paragraph-02-font-size);line-height:var(--paragraph-02-line-height);font-weight:var(--paragraph-02-font-weight);letter-spacing:var(--paragraph-02-letter-spacing)}"],changeDetection:0}),t}()},yUsN:function(e,t,n){"use strict";n.d(t,"a",(function(){return x})),n.d(t,"b",(function(){return v}));var o=n("EM62"),i=n("5XID"),s=n("ZTXN"),c=n("kuMc"),l=n("2kYt"),u=n("VKQk"),b=n("vMP+");function g(e,t){1&e&&o.Ob(0,"nx-icon",7),2&e&&o.kc("name","exclamation-triangle")}function p(e,t){if(1&e&&(o.Rb(0),o.Hc(1,g,1,1,"nx-icon",3),o.Tb(2,"div",4),o.Tb(3,"div",5),o.Pb(4,6),o.Sb(),o.Sb(),o.Qb()),2&e){var n=o.ec(),a=o.rc(3);o.Bb(1),o.kc("ngIf",n.showIcon),o.Bb(3),o.kc("ngTemplateOutlet",a)}}function m(e,t){if(1&e&&(o.Tb(0,"nx-message",8),o.Pb(1,6),o.Sb()),2&e){o.ec();var n=o.rc(3);o.Bb(1),o.kc("ngTemplateOutlet",n)}}function d(e,t){1&e&&o.ic(0)}var h=["*"],f=0,x=new o.r("ERROR_DEFAULT_OPTIONS"),v=function(){var e=function(){function e(t,n){var a=this;r(this,e),this._changeDetectorRef=t,this._defaultOptions=n,this._showIcon=!0,this._id="nx-error-"+f++,this._destroyed=new s.a,this._defaultOptions&&this._defaultOptions.changes&&this._defaultOptions.changes.pipe(Object(c.a)(this._destroyed)).subscribe((function(){a._changeDetectorRef.markForCheck()}))}return a(e,[{key:"ngOnDestroy",value:function(){this._destroyed.next(),this._destroyed.complete()}},{key:"showIcon",set:function(e){this._showIcon=Object(i.b)(e),this._changeDetectorRef.markForCheck()},get:function(){return this._showIcon}},{key:"id",set:function(e){e&&e!==this._id&&(this._id=e,this._changeDetectorRef.markForCheck())},get:function(){return this._id}},{key:"appearance",set:function(e){e!==this.appearance&&(this._appearance=e,this._changeDetectorRef.markForCheck())},get:function(){return this._appearance||this._defaultOptions&&this._defaultOptions.appearance||"message"}}]),e}();return e.\u0275fac=function(t){return new(t||e)(o.Nb(o.h),o.Nb(x,8))},e.\u0275cmp=o.Hb({type:e,selectors:[["nx-error"]],hostVars:4,hostBindings:function(e,t){2&e&&(o.Cb("role","alert")("id",t.id),o.Fb("nx-error--message","message"==t.appearance))},inputs:{showIcon:"showIcon",id:"id",appearance:"appearance"},ngContentSelectors:h,decls:4,vars:2,consts:[[4,"ngIf"],["nxContext","error",4,"ngIf"],["errorContent",""],["class","nx-error__icon",3,"name",4,"ngIf"],[1,"nx-error__content-wrapper"],[1,"nx-error__content"],[3,"ngTemplateOutlet"],[1,"nx-error__icon",3,"name"],["nxContext","error"]],template:function(e,t){1&e&&(o.jc(),o.Hc(0,p,5,2,"ng-container",0),o.Hc(1,m,2,1,"nx-message",1),o.Hc(2,d,1,0,"ng-template",null,2,o.Ic)),2&e&&(o.kc("ngIf","text"===t.appearance),o.Bb(1),o.kc("ngIf","message"===t.appearance))},directives:[l.t,l.A,u.a,b.a],styles:["[_nghost-%COMP%]{font-size:var(--base-error-simple-font-size);font-weight:var(--base-error-simple-font-weight);letter-spacing:var(--base-error-simple-letter-spacing);color:var(--base-error-color);width:100%;display:flex;text-align:left}[_nghost-%COMP%], [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{line-height:var(--base-error-simple-line-height)}[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{font-size:var(--base-error-simple-icon-size);margin-right:8px}@media screen and (-ms-high-contrast:active){[_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{color:windowText}}[_nghost-%COMP%]   .nx-error__content-wrapper[_ngcontent-%COMP%]{max-width:100%}[dir=rtl]   [_nghost-%COMP%]{text-align:right}[dir=rtl]   [_nghost-%COMP%]   .nx-error__icon[_ngcontent-%COMP%]{margin-right:0;margin-left:8px}.nx-error--message[_nghost-%COMP%]{margin:12px 0}.nx-error--message[_nghost-%COMP%]   nx-message[_ngcontent-%COMP%]{margin:0}"],changeDetection:0}),e}()}}])}();