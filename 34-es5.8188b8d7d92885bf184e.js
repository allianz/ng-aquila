!function(){function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,i=!1,s=void 0;try{for(var a,o=e[Symbol.iterator]();!(r=(a=o.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){i=!0,s=u}finally{try{r||null==o.return||o.return()}finally{if(i)throw s}}return n}(e,n)||function(e,n){if(!e)return;if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return t(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=a(e);if(t){var i=a(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return s(this,n)}}function s(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"4TwE":function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r,i=n("EM62"),s=((r=function e(){p(this,e)}).\u0275mod=i.Lb({type:r}),r.\u0275inj=i.Kb({factory:function(e){return new(e||r)}}),r);n("VqxJ")},"4y46":function(e,t,r){"use strict";r.r(t),r.d(t,"NumberExamplesModule",(function(){return Be}));var s,a,o,c=r("q+Ep"),l=r("I5hw"),b=r("pT7h"),m=r("0FLW"),f=r("ZTXN"),h=r("EM62"),g=((s=function e(){p(this,e),this.changes=new f.a,this.decrementAriaLabel="Decrement",this.incrementAriaLabel="Increment"}).\u0275fac=function(e){return new(e||s)},s.\u0275prov=h.Jb({token:s,factory:s.\u0275fac}),s),d=r("2kYt"),x=r("kPBv"),v=r("6c6m"),_=r("nIj0"),y=((a=function e(){p(this,e)}).\u0275mod=h.Lb({type:a}),a.\u0275inj=h.Kb({factory:function(e){return new(e||a)},providers:[g],imports:[[v.b,_.k,m.c,x.b,d.c]]}),a),C=r("5XID"),k=r("JNA7"),w=r("N1r4"),O=((o=function(){function e(t,n,r){p(this,e),this._element=t,this._renderer=n,this._cdr=r,this._resize=!0,this.updateInputWidth=this.updateInputWidth.bind(this)}return u(e,[{key:"ngAfterViewInit",value:function(){this.resize&&this._addEventListener()}},{key:"ngOnDestroy",value:function(){this._removeEventListener()}},{key:"updateInputWidth",value:function(){var e=this._renderer.createElement("canvas").getContext("2d"),t=window.getComputedStyle(this._element.nativeElement);e.font=Object(k.g)(t);var n=e.measureText(this._element.nativeElement.value),r=this.sumStyles(t.paddingLeft,t.paddingRight),i=this.sumStyles(t.borderLeftWidth,t.borderRightWidth),s=n.width+r+i+16,a=parseFloat(t.minWidth);this.width=Math.max(Number.isNaN(a)?0:a,s),this._cdr.markForCheck()}},{key:"_addEventListener",value:function(){this._element.nativeElement.addEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.addEventListener("change",this.updateInputWidth,!0)}},{key:"_removeEventListener",value:function(){this._element.nativeElement.removeEventListener("input",this.updateInputWidth,!0),this._element.nativeElement.removeEventListener("change",this.updateInputWidth,!0)}},{key:"sumStyles",value:function(e,t){return e=parseInt(e,10),t=parseInt(t,10),(e=Number.isNaN(e)?0:e)+(Number.isNaN(t)?0:t)}},{key:"resize",set:function(e){this._resize=Object(C.b)(e),this._resize?(this._addEventListener(),this.updateInputWidth()):this._removeEventListener()},get:function(){return this._resize}}]),e}()).\u0275fac=function(e){return new(e||o)(h.Nb(h.l),h.Nb(h.G),h.Nb(h.h))},o.\u0275dir=h.Ib({type:o,selectors:[["input","nxAutoResize",""]],hostVars:2,hostBindings:function(e,t){2&e&&h.Ec("width",t.width,"px")},inputs:{resize:["nxAutoResize","resize"]}}),o),S=r("oeuD"),M=r("tPQ2"),L=r("VKQk"),T=["customLabel"],N=["nativeInput"];function P(e,t){if(1&e&&(h.Tb(0,"div",12),h.Tb(1,"label",13),h.Jc(2),h.Sb(),h.Sb()),2&e){var n=h.ec();h.Bb(1),h.kc("for",n.inputId),h.Bb(1),h.Lc(" ",n.label," ")}}function z(e,t){if(1&e&&(h.Tb(0,"div",14,15),h.ic(2,2),h.Sb()),2&e){var n=h.ec();h.kc("id",n.ariaDescribedBy)}}var A,I,D,E,V,R,B,j,F,J,H,W,q,Z,G,K,U,$,Q,X=[[["nx-number-stepper-prefix"]],[["nx-number-stepper-suffix"]],"*"],Y=["nx-number-stepper-prefix","nx-number-stepper-suffix","*"],ee={big:"nx-stepper--big",normal:""},te=["nx-stepper"],ne=["nx-stepper__input"],re=new RegExp(/^-?[0-9]\d*(\.\d+)?$/g),ie={provide:_.n,useExisting:Object(h.V)((function(){return oe})),multi:!0},se={provide:_.m,useExisting:Object(h.V)((function(){return oe})),multi:!0},ae=0,oe=((R=function(e){n(r,e);var t=i(r);function r(e,n,i,s){var a;return p(this,r),(a=t.call(this,ee,te,i,n))._changeDetectorRef=e,a._intl=s,a._step=1,a._min=0,a._max=100,a._value=0,a._label=null,a._incrementAriaLabel="",a._decrementAriaLabel="",a._inputAriaLabel="",a._resize=!1,a._negative=!1,a._leadingZero=!0,a._disabled=!1,a.inputClassNames=Object(k.h)("regular",ne),a.inputId="nx-number-stepper-"+ae++,a.ariaDescribedBy=null,a.valueChange=new h.o,a.onChangeCallback=function(e){},a.onTouchedCallback=function(){},a._intlSubscription=a._intl.changes.subscribe((function(){return a._changeDetectorRef.markForCheck()})),a}return u(r,[{key:"ngAfterViewInit",value:function(){this.ngContentWrapper&&(this.ariaDescribedBy=this.ngContentWrapper.nativeElement.children.length>0?"label-for-"+this.inputId:null),this.setInputValue(this._value)}},{key:"ngOnDestroy",value:function(){this._intlSubscription.unsubscribe()}},{key:"setInputValue",value:function(e){var t=this,n=null!==e?e:0;this.numberInputValue=this.leadingZero?Object(k.i)(n.toString(),2):n.toString(),this.nativeInput&&(this.nativeInput.nativeElement.value=this.numberInputValue),setTimeout((function(){t.triggerResize()}))}},{key:"writeValue",value:function(e){this.value=e}},{key:"registerOnChange",value:function(e){this.onChangeCallback=e}},{key:"registerOnTouched",value:function(e){this.onTouchedCallback=e}},{key:"setDisabledState",value:function(e){this._disabled=e,this._changeDetectorRef.markForCheck()}},{key:"onInputChange",value:function(e){this._value=this.validateUserInput(e.target.value)?Number(e.target.value):null,null!==this._value&&this.setInputValue(this._value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}},{key:"validateUserInput",value:function(e){return!!e.match(re)}},{key:"incrementOnClick",value:function(){this._increment(),this.onTouchedCallback()}},{key:"incrementOnKey",value:function(e){this._increment(),e.preventDefault()}},{key:"_increment",value:function(){var e;e=this.isBetweenLimits(this._value)?this.getNextGreaterValue(this._value):this.enforceLimits(this._value),this.value=e,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}},{key:"triggerResize",value:function(){this.resize&&(this.autoResize.updateInputWidth(),this._changeDetectorRef.markForCheck())}},{key:"decrementOnClick",value:function(){this._decrement(),this.onTouchedCallback()}},{key:"decrementOnKey",value:function(e){this._decrement(),e.preventDefault()}},{key:"_decrement",value:function(){var e;e=this.isBetweenLimits(this._value)?this.getNextLowerValue(this._value):this.enforceLimits(this._value),this.value=e,this.setInputValue(this.value),this.valueChange.emit(this._value),this.onChangeCallback(this._value)}},{key:"enforceLimits",value:function(e){return e>this._max?this._max:e<this._min?this._min:e}},{key:"getNextLowerValue",value:function(e){var t;return e||(e=0),t=this.isValidStep(e)?new S.Decimal(e).minus(new S.Decimal(this._step)).toNumber():new S.Decimal(e).toNearest(this._step,S.Decimal.ROUND_DOWN).toNumber(),this.enforceLimits(t)}},{key:"getNextGreaterValue",value:function(e){var t;return e||(e=0),t=this.isValidStep(e)?new S.Decimal(e).plus(new S.Decimal(this._step)).toNumber():new S.Decimal(e).toNearest(this._step,S.Decimal.ROUND_UP).toNumber(),this.enforceLimits(t)}},{key:"isBetweenLimits",value:function(e){return e<=this._max&&e>=this._min}},{key:"isMinimum",value:function(){return this._value===this._min}},{key:"isMaximum",value:function(){return this._value===this._max}},{key:"isValidStep",value:function(e){null===e&&(e=new S.Decimal(0));var t=new S.Decimal(this._min),n=new S.Decimal(e),r=t.minus(n).mod(new S.Decimal(this._step)).toNumber();return!(!this.isBetweenLimits(e)||!this.isMinimum()&&!this.isMaximum()&&0!==r)}},{key:"userInputToNumber",value:function(e){return parseInt(""===e?0:e,10)}},{key:"_validateFn",value:function(){return this.isValidStep(this._value)?null===this._value?{nxNumberStepperFormatError:"Not a valid number"}:null:{nxNumberStepperStepError:"Value is not a valid step"}}},{key:"validate",value:function(e){return this._validateFn()}},{key:"resize",set:function(e){this._resize=Object(C.b)(e),this._changeDetectorRef.markForCheck()},get:function(){return this._resize}},{key:"label",get:function(){return this._label},set:function(e){this._label!==e&&(this._label=e,this._changeDetectorRef.markForCheck())}},{key:"incrementAriaLabel",set:function(e){this._incrementAriaLabel=e},get:function(){return this._incrementAriaLabel}},{key:"decrementAriaLabel",set:function(e){this._decrementAriaLabel=e},get:function(){return this._decrementAriaLabel}},{key:"inputAriaLabel",set:function(e){this._inputAriaLabel=e},get:function(){return this._inputAriaLabel}},{key:"step",set:function(e){this._step=Number(e)},get:function(){return this._step}},{key:"min",set:function(e){this._min=Number(e)},get:function(){return this._min}},{key:"max",set:function(e){this._max=Number(e)},get:function(){return this._max}},{key:"value",get:function(){return this._value},set:function(e){this._value=e,this.setInputValue(null!==this._value?this._value:0),this._changeDetectorRef.markForCheck()}},{key:"negative",set:function(e){this._negative!==e&&(this._negative=Object(C.b)(e),this._changeDetectorRef.markForCheck())},get:function(){return this._negative}},{key:"leadingZero",set:function(e){this._leadingZero!==e&&(this._leadingZero=Object(C.b)(e),this.setInputValue(this.value),this._changeDetectorRef.markForCheck())},get:function(){return this._leadingZero}},{key:"disabled",set:function(e){this._disabled=Object(C.b)(e)},get:function(){return this._disabled}},{key:"_buttonType",get:function(){return"secondary"+(this.negative?" negative":"")}}]),r}(w.a)).\u0275fac=function(e){return new(e||R)(h.Nb(h.h),h.Nb(h.G),h.Nb(h.l),h.Nb(g))},R.\u0275cmp=h.Hb({type:R,selectors:[["nx-number-stepper"]],viewQuery:function(e,t){var n;1&e&&(h.Nc(T,!0),h.Cc(O,!0),h.Nc(N,!0)),2&e&&(h.qc(n=h.bc())&&(t.ngContentWrapper=n.first),h.qc(n=h.bc())&&(t.autoResize=n.first),h.qc(n=h.bc())&&(t.nativeInput=n.first))},hostVars:4,hostBindings:function(e,t){2&e&&h.Fb("is-negative",t.negative)("is-disabled",t.disabled)},inputs:{classNames:["nxSize","classNames"],resize:["nxResize","resize"],label:["nxLabel","label"],incrementAriaLabel:"incrementAriaLabel",decrementAriaLabel:"decrementAriaLabel",inputAriaLabel:"inputAriaLabel",step:["nxStep","step"],min:["nxMin","min"],max:["nxMax","max"],value:["nxValue","value"],negative:"negative",leadingZero:"leadingZero",disabled:["nxDisabled","disabled"]},outputs:{valueChange:"nxValueChange"},features:[h.Ab([ie,se]),h.yb],ngContentSelectors:Y,decls:14,vars:14,consts:[["class","nx-stepper__label",4,"ngIf"],["class","nx-stepper__label",3,"id",4,"ngIf"],[1,"nx-stepper__input-container"],["type","button",1,"nx-stepper__down","nx-stepper__control",3,"nxButton","disabled","click"],["name","minus","size","s"],[1,"nx-stepper__input-wrapper"],[1,"nx-stepper__inner-wrapper"],["type","number","spellcheck","false",3,"nxAutoResize","id","ngClass","disabled","input","blur","keydown.arrowup","keydown.arrowdown"],["nativeInput",""],[1,"nx-stepper__input-underline"],["type","button",1,"nx-stepper__up","nx-stepper__control",3,"nxButton","disabled","click"],["name","plus","size","s"],[1,"nx-stepper__label"],[3,"for"],[1,"nx-stepper__label",3,"id"],["customLabel",""]],template:function(e,t){1&e&&(h.jc(X),h.Hc(0,P,3,2,"div",0),h.Hc(1,z,3,1,"div",1),h.Tb(2,"div",2),h.Tb(3,"button",3),h.ac("click",(function(){return t.decrementOnClick()})),h.Ob(4,"nx-icon",4),h.Sb(),h.Tb(5,"div",5),h.Tb(6,"div",6),h.ic(7),h.Tb(8,"input",7,8),h.ac("input",(function(e){return t.onInputChange(e)}))("blur",(function(){return t.onTouchedCallback()}))("keydown.arrowup",(function(e){return t.incrementOnKey(e)}))("keydown.arrowdown",(function(e){return t.decrementOnKey(e)})),h.Sb(),h.ic(10,1),h.Sb(),h.Ob(11,"div",9),h.Sb(),h.Tb(12,"button",10),h.ac("click",(function(){return t.incrementOnClick()})),h.Ob(13,"nx-icon",11),h.Sb(),h.Sb()),2&e&&(h.kc("ngIf",t.label),h.Bb(1),h.kc("ngIf",!t.label),h.Bb(2),h.kc("nxButton",t._buttonType)("disabled",t.disabled||t.value<=t.min),h.Cb("aria-label",t.decrementAriaLabel||t._intl.decrementAriaLabel),h.Bb(5),h.kc("nxAutoResize",t.resize)("id",t.inputId)("ngClass",t.inputClassNames)("disabled",t.disabled),h.Cb("aria-describedby",t.ariaDescribedBy)("aria-label",t.inputAriaLabel),h.Bb(4),h.kc("nxButton",t._buttonType)("disabled",t.disabled||t.value>=t.max),h.Cb("aria-label",t.incrementAriaLabel||t._intl.incrementAriaLabel))},directives:[d.t,M.a,L.a,O,d.q],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-inner-spin-button, [_nghost-%COMP%]   input[_ngcontent-%COMP%]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}[_nghost-%COMP%]   input[type=number][_ngcontent-%COMP%]:invalid{box-shadow:none}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{padding:0}.nx-stepper__input-container[_ngcontent-%COMP%]{align-items:flex-end;display:flex;margin-top:12px}.nx-stepper__label[_ngcontent-%COMP%]{display:flex;font-size:var(--number-stepper-label-font-size);line-height:var(--number-stepper-label-line-height);font-weight:var(--number-stepper-label-font-weight);letter-spacing:var(--number-stepper-label-letter-spacing)}.nx-stepper__control[_ngcontent-%COMP%]{width:32px;height:32px;min-height:32px;font-size:24px;margin:0;padding:0}.nx-stepper__input[_ngcontent-%COMP%]{width:56px;min-width:56px}.nx-stepper__input[_ngcontent-%COMP%]:disabled{color:var(--number-stepper-disabled-color);-webkit-text-fill-color:var(--number-stepper-disabled-color);cursor:not-allowed}.nx-stepper__input[_ngcontent-%COMP%],   .nx-stepper__prefix,   .nx-stepper__suffix{font-size:var(--number-stepper-small-font-size);line-height:var(--number-stepper-small-line-height);font-weight:var(--number-stepper-small-font-weight);letter-spacing:var(--number-stepper-small-letter-spacing);color:var(--number-stepper-color);background:0 0;outline:0;border:0;text-align:center}  .nx-stepper__suffix{margin-left:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__suffix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__suffix{margin-left:0;margin-right:4px}  .nx-stepper__prefix{margin-right:4px}[dir=rtl][_nghost-%COMP%]     .nx-stepper__prefix, [dir=rtl]   [_nghost-%COMP%]     .nx-stepper__prefix{margin-right:0;margin-left:4px}.nx-stepper__input-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;flex-direction:column;margin:0 16px}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:28px;display:flex;align-items:baseline}.nx-stepper__input-underline[_ngcontent-%COMP%]{width:100%;margin-top:2px;height:2px;background:var(--number-stepper-underline-color)}.nx-stepper__input-underline--disabled[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__control[_ngcontent-%COMP%]{width:72px;min-height:48px;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%]{width:72px;min-width:72px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%], .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{font-size:var(--number-stepper-large-font-size);line-height:var(--number-stepper-large-line-height);font-weight:var(--number-stepper-large-font-weight);letter-spacing:var(--number-stepper-large-letter-spacing);height:48px;padding:0;margin-bottom:0}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-wrapper[_ngcontent-%COMP%]{margin:0 24px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{margin-top:-2px}.nx-stepper--big[_nghost-%COMP%]   .nx-stepper__inner-wrapper[_ngcontent-%COMP%]{height:48px}.is-negative[_nghost-%COMP%]   .nx-stepper__input[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]   .nx-stepper__label[_ngcontent-%COMP%], .is-negative[_nghost-%COMP%]     .nx-stepper__prefix, .is-negative[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--negative)}.is-disabled[_nghost-%COMP%]   .nx-stepper__input-underline[_ngcontent-%COMP%]{background:var(--number-stepper-disabled-underline-color)}.is-disabled[_nghost-%COMP%]     .nx-stepper__prefix, .is-disabled[_nghost-%COMP%]     .nx-stepper__suffix{color:var(--number-stepper-disabled-color)}@media screen and (-ms-high-contrast:active){button.nx-stepper__control[_ngcontent-%COMP%]:disabled{border-color:GrayText;color:GrayText;opacity:1}.nx-stepper__input[_ngcontent-%COMP%]{color:buttonText}  .nx-stepper__prefix,   .nx-stepper__suffix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__prefix, .nx-stepper--big[_nghost-%COMP%]     .nx-stepper__suffix{-ms-high-contrast-adjust:none;color:windowText}.nx-stepper__inner-wrapper[_ngcontent-%COMP%]{background:buttonFace}.nx-stepper__input-underline[_ngcontent-%COMP%]{background:buttonText}}"],changeDetection:0}),R),ue=((V=function e(){p(this,e)}).\u0275fac=function(e){return new(e||V)},V.\u0275dir=h.Ib({type:V,selectors:[["nx-number-stepper-prefix"]],hostAttrs:[1,"nx-stepper__prefix"]}),V),pe=((E=function e(){p(this,e)}).\u0275fac=function(e){return new(e||E)},E.\u0275dir=h.Ib({type:E,selectors:[["nx-number-stepper-suffix"]],hostAttrs:[1,"nx-stepper__suffix"]}),E),ce=((D=function e(){p(this,e)}).\u0275fac=function(e){return new(e||D)},D.\u0275cmp=h.Hb({type:D,selectors:[["ng-component"]],decls:3,vars:0,consts:[["inputAriaLabel","Number of travellers","incrementAriaLabel","Increase number of travellers","decrementAriaLabel","Decrease number of travellers"]],template:function(e,t){1&e&&(h.Tb(0,"nx-number-stepper",0),h.Tb(1,"label"),h.Jc(2,"Number of travellers"),h.Sb(),h.Sb())},directives:[oe],encapsulation:2}),D),le=((I=function e(){p(this,e)}).\u0275fac=function(e){return new(e||I)},I.\u0275cmp=h.Hb({type:I,selectors:[["ng-component"]],decls:6,vars:0,consts:[["nxResize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"],["nxSize","big","nxResize","true","leadingZero","false","inputAriaLabel","Sum of Expenses"]],template:function(e,t){1&e&&(h.Tb(0,"nx-number-stepper",0),h.Tb(1,"nx-number-stepper-suffix"),h.Jc(2,"$"),h.Sb(),h.Sb(),h.Tb(3,"nx-number-stepper",1),h.Tb(4,"nx-number-stepper-prefix"),h.Jc(5,"\u20ac"),h.Sb(),h.Sb())},directives:[oe,pe,ue],styles:[""]}),I),be=((A=function e(){p(this,e),this.number=1e3}).\u0275fac=function(e){return new(e||A)},A.\u0275cmp=h.Hb({type:A,selectors:[["ng-component"]],decls:2,vars:1,consts:[["nxResize","true","nxSize","big","nxStep","1000","nxMax","10000000","inputAriaLabel","Number of Kilometers",3,"ngModel","ngModelChange"],["nxResize","true","nxSize","big","nxStep","0.03","nxMin","0.06","inputAriaLabel","Distance in Meters"]],template:function(e,t){1&e&&(h.Tb(0,"nx-number-stepper",0),h.ac("ngModelChange",(function(e){return t.number=e})),h.Sb(),h.Ob(1,"nx-number-stepper",1)),2&e&&h.kc("ngModel",t.number)},directives:[oe,_.p,_.s],encapsulation:2}),A),me=r("kMq3"),fe=r("dWOj"),he=((J=function e(){p(this,e)}).\u0275fac=function(e){return new(e||J)},J.\u0275cmp=h.Hb({type:J,selectors:[["ng-component"]],decls:9,vars:1,consts:[["nxSize","big","name","testStepper","inputAriaLabel","Number of travellers"],["nxPopoverTrigger","hover","name","info-circle-o","size","s",1,"info-icon","nx-margin-left-2xs",3,"nxPopoverTriggerFor"],["popoverHover",""]],template:function(e,t){if(1&e&&(h.Tb(0,"nx-number-stepper",0),h.Tb(1,"label"),h.Jc(2,"Number of travellers"),h.Sb(),h.Ob(3,"nx-icon",1),h.Sb(),h.Tb(4,"nx-popover",null,2),h.Tb(6,"div"),h.Tb(7,"span"),h.Jc(8,"Custom help text as popover"),h.Sb(),h.Sb(),h.Sb()),2&e){var n=h.rc(5);h.Bb(3),h.kc("nxPopoverTriggerFor",n)}},directives:[oe,L.a,me.a,fe.a],styles:[".info-icon[_ngcontent-%COMP%]{align-self:center}"]}),J),ge=((F=function e(){p(this,e)}).\u0275fac=function(e){return new(e||F)},F.\u0275cmp=h.Hb({type:F,selectors:[["ng-component"]],decls:6,vars:2,consts:[["nxSize","big","inputAriaLabel","Sum of Expenses",3,"nxDisabled"],["nxSize","normal","inputAriaLabel","Sum of Expenses",3,"nxDisabled"]],template:function(e,t){1&e&&(h.Tb(0,"nx-number-stepper",0),h.Tb(1,"nx-number-stepper-suffix"),h.Jc(2,"$"),h.Sb(),h.Sb(),h.Tb(3,"nx-number-stepper",1),h.Tb(4,"nx-number-stepper-prefix"),h.Jc(5,"\u20ac"),h.Sb(),h.Sb()),2&e&&(h.kc("nxDisabled",!0),h.Bb(3),h.kc("nxDisabled",!0))},directives:[oe,pe,ue],encapsulation:2}),F),de=((j=function e(){p(this,e),this.fb=new _.h({amount:new _.e({value:"",disabled:!0})})}).\u0275fac=function(e){return new(e||j)},j.\u0275cmp=h.Hb({type:j,selectors:[["ng-component"]],decls:7,vars:1,consts:[[3,"formGroup"],["formControlName","amount","nxSize","big","inputAriaLabel","Sum of Expenses"],["formControlName","amount","nxSize","normal","inputAriaLabel","Sum of Expenses"]],template:function(e,t){1&e&&(h.Tb(0,"form",0),h.Tb(1,"nx-number-stepper",1),h.Tb(2,"nx-number-stepper-suffix"),h.Jc(3,"$"),h.Sb(),h.Sb(),h.Tb(4,"nx-number-stepper",2),h.Tb(5,"nx-number-stepper-prefix"),h.Jc(6,"\u20ac"),h.Sb(),h.Sb(),h.Sb()),2&e&&h.kc("formGroup",t.fb)},directives:[_.A,_.q,_.i,oe,_.p,_.g,pe,ue],encapsulation:2}),j),xe=((B=function e(){p(this,e),this.number=0}).\u0275fac=function(e){return new(e||B)},B.\u0275cmp=h.Hb({type:B,selectors:[["ng-component"]],decls:2,vars:0,consts:[["nxSize","big","nxStep","0.5","nxMin","0.5","inputAriaLabel","Distance in meters"],["nxSize","big","nxStep","0.03","nxMin","0.06","inputAriaLabel","Distance in meters"]],template:function(e,t){1&e&&(h.Ob(0,"nx-number-stepper",0),h.Ob(1,"nx-number-stepper",1))},directives:[oe],encapsulation:2}),B),ve=r("VqxJ"),_e=((W=function e(){p(this,e)}).\u0275fac=function(e){return new(e||W)},W.\u0275cmp=h.Hb({type:W,selectors:[["ng-component"]],decls:7,vars:0,consts:[["nxCopytext","large",1,"label"],["nxSize","normal","inputAriaLabel","Number of travellers"],["nxSize","normal","leadingZero","false","inputAriaLabel","Number of travellers"]],template:function(e,t){1&e&&(h.Tb(0,"p",0),h.Jc(1," With leading zero:"),h.Sb(),h.Ob(2,"nx-number-stepper",1),h.Ob(3,"br"),h.Tb(4,"p",0),h.Jc(5," Without leading zero:"),h.Sb(),h.Ob(6,"nx-number-stepper",2))},directives:[ve.a,oe],styles:[".label[_ngcontent-%COMP%]{margin-bottom:8px}"]}),W),ye=((H=function(e){n(r,e);var t=i(r);function r(){var e;return p(this,r),(e=t.apply(this,arguments)).decrementAriaLabel="verringern",e.incrementAriaLabel="erh\xf6hen",e}return r}(g)).\u0275fac=function(e){return Ce(e||H)},H.\u0275prov=h.Jb({token:H,factory:H.\u0275fac}),H),Ce=h.Vb(ye),ke=((Q=function e(){p(this,e)}).\u0275fac=function(e){return new(e||Q)},Q.\u0275cmp=h.Hb({type:Q,selectors:[["ng-component"]],features:[h.Ab([{provide:g,useClass:ye}])],decls:1,vars:0,template:function(e,t){1&e&&h.Ob(0,"nx-number-stepper")},directives:[oe],encapsulation:2}),Q),we=(($=function e(){p(this,e)}).\u0275fac=function(e){return new(e||$)},$.\u0275cmp=h.Hb({type:$,selectors:[["ng-component"]],decls:3,vars:0,consts:[[1,"docs-inverse-container"],["nxSize","big","negative","true","nxLabel","Number of travellers",1,"nx-margin-bottom-s"],["nxSize","normal","negative","true","nxLabel","Number of travellers"]],template:function(e,t){1&e&&(h.Tb(0,"div",0),h.Ob(1,"nx-number-stepper",1),h.Ob(2,"nx-number-stepper",2),h.Sb())},directives:[oe],encapsulation:2}),$),Oe=((U=function e(t){p(this,e),this.fb=t,this.testForm=this.fb.group({stepperTestReactive:3})}).\u0275fac=function(e){return new(e||U)(h.Nb(_.d))},U.\u0275cmp=h.Hb({type:U,selectors:[["ng-component"]],decls:10,vars:11,consts:[[3,"formGroup"],["nxLabel","Number of travellers","nxSize","big","formControlName","stepperTestReactive",3,"nxStep","nxMin","nxMax"]],template:function(e,t){1&e&&(h.Tb(0,"form",0),h.Ob(1,"nx-number-stepper",1),h.Tb(2,"p"),h.Jc(3),h.fc(4,"json"),h.Sb(),h.Tb(5,"p"),h.Jc(6),h.Sb(),h.Tb(7,"p"),h.Jc(8),h.fc(9,"json"),h.Sb(),h.Sb()),2&e&&(h.kc("formGroup",t.testForm),h.Bb(1),h.kc("nxStep",1)("nxMin",-3)("nxMax",20),h.Bb(2),h.Lc("Form value: ",h.gc(4,7,t.testForm.value)," "),h.Bb(3),h.Lc("Form status: ",t.testForm.status," "),h.Bb(2),h.Lc("Form errors: ",h.gc(9,9,t.testForm.controls.stepperTestReactive.errors),""))},directives:[_.A,_.q,_.i,oe,_.p,_.g],pipes:[d.k],encapsulation:2}),U),Se=((K=function e(){p(this,e),this.number=1}).\u0275fac=function(e){return new(e||K)},K.\u0275cmp=h.Hb({type:K,selectors:[["ng-component"]],decls:3,vars:2,consts:[["nxSize","big","nxStep","2","inputAriaLabel","Number of travellers",3,"nxValue","nxValueChange"]],template:function(e,t){1&e&&(h.Tb(0,"nx-number-stepper",0),h.ac("nxValueChange",(function(e){return t.number=e})),h.Sb(),h.Tb(1,"p"),h.Jc(2),h.Sb()),2&e&&(h.kc("nxValue",t.number),h.Bb(2),h.Lc("Value is: ",t.number,""))},directives:[oe],encapsulation:2}),K),Me=((G=function e(){p(this,e)}).\u0275fac=function(e){return new(e||G)},G.\u0275cmp=h.Hb({type:G,selectors:[["ng-component"]],decls:2,vars:0,consts:[["nxSize","big","inputAriaLabel","Number of travellers"],["nxSize","normal","inputAriaLabel","Number of travellers"]],template:function(e,t){1&e&&(h.Ob(0,"nx-number-stepper",0),h.Ob(1,"nx-number-stepper",1))},directives:[oe],encapsulation:2}),G),Le=((Z=function e(){p(this,e)}).\u0275fac=function(e){return new(e||Z)},Z.\u0275cmp=h.Hb({type:Z,selectors:[["ng-component"]],decls:1,vars:0,consts:[["nxLabel","Number of travellers","nxSize","big","name","testStepper"]],template:function(e,t){1&e&&h.Ob(0,"nx-number-stepper",0)},directives:[oe],encapsulation:2}),Z),Te=((q=function e(){p(this,e),this.number=3}).\u0275fac=function(e){return new(e||q)},q.\u0275cmp=h.Hb({type:q,selectors:[["ng-component"]],decls:4,vars:2,consts:[["nxLabel","Number of travellers","nxSize","big","name","testStepper",3,"ngModel","ngModelChange"]],template:function(e,t){1&e&&(h.Tb(0,"form"),h.Tb(1,"nx-number-stepper",0),h.ac("ngModelChange",(function(e){return t.number=e})),h.Sb(),h.Tb(2,"p"),h.Jc(3),h.Sb(),h.Sb()),2&e&&(h.Bb(1),h.kc("ngModel",t.number),h.Bb(2),h.Lc("Current value: ",t.number,""))},directives:[_.A,_.q,_.r,oe,_.p,_.s],encapsulation:2}),q),Ne=r("vMP+"),Pe=r("yUsN");function ze(e,t){1&e&&(h.Tb(0,"nx-message",4),h.Jc(1," This is a hint. This message will disappear once you get an error from parsing or when the input is missing altogether.\n"),h.Sb())}function Ae(e,t){1&e&&(h.Tb(0,"nx-error"),h.Jc(1," That's not a valid step\n"),h.Sb())}function Ie(e,t){1&e&&(h.Tb(0,"nx-error"),h.Jc(1," That's not a valid number\n"),h.Sb())}var De,Ee,Ve=((De=function e(){p(this,e),this.number=0}).\u0275fac=function(e){return new(e||De)},De.\u0275cmp=h.Hb({type:De,selectors:[["ng-component"]],decls:5,vars:4,consts:[["nxSize","big","nxStep","2","inputAriaLabel","Number of travellers",3,"ngModel","ngModelChange"],["stepperValidModel","ngModel"],["nxContext","info",4,"ngIf"],[4,"ngIf"],["nxContext","info"]],template:function(e,t){if(1&e&&(h.Tb(0,"nx-number-stepper",0,1),h.ac("ngModelChange",(function(e){return t.number=e})),h.Sb(),h.Hc(2,ze,2,0,"nx-message",2),h.Hc(3,Ae,2,0,"nx-error",3),h.Hc(4,Ie,2,0,"nx-error",3)),2&e){var n=h.rc(1);h.kc("ngModel",t.number),h.Bb(2),h.kc("ngIf",!n.errors),h.Bb(1),h.kc("ngIf",n.errors&&n.errors.nxNumberStepperStepError),h.Bb(1),h.kc("ngIf",n.errors&&n.errors.nxNumberStepperFormatError)}},directives:[oe,_.p,_.s,d.t,Ne.a,Pe.b],encapsulation:2}),De),Re=r("t3RA"),Be=((Ee=function(){function e(){p(this,e)}return u(e,null,[{key:"components",value:function(){return{"number-stepper-a11y":ce,"number-stepper-additions":le,"number-stepper-auto-resizing":be,"number-stepper-custom-label":he,"number-stepper-disabled-explicit":ge,"number-stepper-disabled-implicit":de,"number-stepper-floating-point":xe,"number-stepper-formatting":_e,"number-stepper-localize":ke,"number-stepper-negative":we,"number-stepper-reactive":Oe,"number-stepper-simple-binding":Se,"number-stepper-sizes":Me,"number-stepper-standalone":Le,"number-stepper-template-driven":Te,"number-stepper-validation":Ve}}}]),e}()).\u0275mod=h.Lb({type:Ee}),Ee.\u0275inj=h.Kb({factory:function(e){return new(e||Ee)},imports:[[y,m.c,b.a,l.c,c.a,Re.a]]}),Ee)},VqxJ:function(t,n,r){"use strict";r.d(n,"a",(function(){return o}));var i=r("EM62"),s=["nxCopytext",""],a=["*"],o=function(){var t=function(){function t(){p(this,t),this.type="normal",this.negative=!1}return u(t,[{key:"classNames",set:function(t){if(this._classNames!==t){this._classNames=t;var n=e(this._classNames.match(/small|medium|normal|large/)||["normal"],1)[0],r=void 0===n?null:n;this.type=r,this.negative=!!this._classNames.match(/negative/)}},get:function(){return this._classNames}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Hb({type:t,selectors:[["","nxCopytext",""]],hostVars:12,hostBindings:function(e,t){2&e&&i.Fb("nx-copy",!0)("nx-copy--small","small"===t.type)("nx-copy--medium","medium"===t.type)("nx-copy--normal","normal"===t.type)("nx-copy--large","large"===t.type)("nx-copy--negative",t.negative)},inputs:{classNames:["nxCopytext","classNames"]},attrs:s,ngContentSelectors:a,decls:1,vars:0,template:function(e,t){1&e&&(i.jc(),i.ic(0))},styles:["[_nghost-%COMP%]{margin:0 0 32px;font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing)}.nx-copy.nx-copy[_nghost-%COMP%]{font-weight:400}.nx-copy--negative[_nghost-%COMP%]{color:var(--negative)}.nx-copy--small[_nghost-%COMP%]{font-size:var(--paragraph-05-font-size);line-height:var(--paragraph-05-line-height);font-weight:var(--paragraph-05-font-weight);letter-spacing:var(--paragraph-05-letter-spacing)}.nx-copy--medium[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing)}.nx-copy--large[_nghost-%COMP%]{font-size:var(--paragraph-02-font-size);line-height:var(--paragraph-02-line-height);font-weight:var(--paragraph-02-font-weight);letter-spacing:var(--paragraph-02-letter-spacing)}"],changeDetection:0}),t}()},t3RA:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("ohqM"),i=n("4TwE"),s=n("aln5"),a=n("kPBv"),o=n("2kYt"),u=n("nIj0"),c=n("EM62"),l=function(){var e=function e(){p(this,e)};return e.\u0275mod=c.Lb({type:e}),e.\u0275inj=c.Kb({factory:function(t){return new(t||e)},imports:[[],o.c,u.k,u.v,a.b,s.a,i.a,r.a]}),e}()}}])}();