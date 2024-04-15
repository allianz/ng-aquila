import{a as xe}from"./chunk-JVFBSPNC.js";import"./chunk-5V76OGMQ.js";import{b as V,c as fe}from"./chunk-GMJ3GKHW.js";import{A as ue,b as le,d as c,e as pe,f as I,g as F,h as w,i as me,j as N,k as de,l as M,o as E,r as T,z as ce}from"./chunk-MNAWWTKB.js";import"./chunk-M5KLUQHQ.js";import"./chunk-GWBFL4JU.js";import"./chunk-4FA6CNRT.js";import"./chunk-BUOL5UUF.js";import{a as _e}from"./chunk-JQRF2ONG.js";import{g as O}from"./chunk-AD2FNL5U.js";import"./chunk-MQ3MCZLV.js";import"./chunk-77EAOUPF.js";import"./chunk-LVQ7DULK.js";import"./chunk-WBPLCJVU.js";import"./chunk-KTTWGBFS.js";import"./chunk-I2GY6XMW.js";import{a as Z}from"./chunk-VTTX4ZNP.js";import{B as se,l as ie,n as ae,o as S}from"./chunk-GHZ7IFWX.js";import{$b as b,Ia as _,Ja as x,Ma as ee,Nb as u,Ob as H,Pb as l,Ra as te,Rb as ne,Vb as i,Wb as a,Wc as re,Xb as f,ea as Q,ec as v,gc as C,ma as R,n as U,na as K,qc as g,rc as m,tb as d,tc as $,ub as L,xa as Y,ya as h,yc as oe,za as W}from"./chunk-O56WLCF2.js";function we(t,e){if(t&1){let s=b();i(0,"input",1),v("input",function(n){_(s);let r=C();return x(r._handleInput(n))})("blur",function(){_(s);let n=C();return x(n._onBlur())})("focus",function(){_(s);let n=C();return x(n._setFocusState())})("mousedown",function(n){_(s);let r=C();return x(r._selectText(n))})("keydown",function(n){_(s);let r=C();return x(r._keydownAction(n))}),a()}if(t&2){let s=e.index,o=C();l("ngModel",o._keyCode[s])("ngClass",o._inputGap(s))("disabled",!!o.disabled),H("aria-label",o.getAriaLabel(s))("type",o.type)("tabindex",o.tabindex)}}var z=(()=>{let e=class e{constructor(){this.changes=new U,this.inputFieldAriaLabel="Enter Key",this.ofLabel="of"}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=R({token:e,factory:e.\u0275fac});let t=e;return t})(),X=6,J="INPUT",Ne="upper",Me="lower",Te="nx-code-input--field-with-gap",k=(()=>{let e=class e{set codeLength(o){this._codeLength=o,this.setInputLength()}get codeLength(){return this._codeLength}set type(o){this._type=o}get type(){return this._type}set tabindex(o){this._tabindex=o}get tabindex(){return this._tabindex}set convertTo(o){this._convertTo=o}get convertTo(){return this._convertTo}set negative(o){let n=Z(o);this._negative!==n&&(this._negative=n)}get negative(){return this._negative}set disabled(o){let n=Z(o);this._disabled!==n&&(this._disabled=n)}get disabled(){return this._disabled}constructor(o,n,r,p,P,y,Se){this._cdr=o,this._el=n,this._control=r,this._intl=p,this._errorStateMatcher=P,this._parentForm=y,this._parentFormGroup=Se,this.errorState=!1,this._codeLength=X,this._type="text",this._tabindex=0,this._keyCode=new Array(X).fill(""),this._focused=!1,this._negative=!1,this._disabled=!1,this._isUpDown=!1,this.propagateChange=Fe=>{},this.propagateTouch=Fe=>{},this._control&&(this._control.valueAccessor=this)}ngDoCheck(){this._control&&this.updateErrorState()}setInputLength(){this.codeLength?this._keyCode=new Array(this.codeLength):this._keyCode=new Array(X),this._keyCode.fill("")}_convertLetterSize(o){return o==="\xDF"?o:typeof o=="string"?this.convertTo===Ne?o.toUpperCase():this.convertTo===Me?o.toLowerCase():o:""}_keydownAction(o){let n=o.target,r=n.previousElementSibling,p=n.nextElementSibling;switch(o.keyCode){case 32:return!1;case 8:n.value===""&&r&&r.tagName===J&&this.selectInput(r);break;case 37:r&&r.tagName===J&&(o.preventDefault(),this.selectInput(r));break;case 39:p&&p.tagName===J&&this.selectInput(p),o.preventDefault();break;case 40:this._isUpDown=!0,this._type==="number"&&(n.value===""||n.value==="0")&&o.preventDefault();break;case 38:this._isUpDown=!0,this._type==="number"&&n.value==="9"&&o.preventDefault();break;default:this.selectInput(n);break}return!0}_selectText(o){this.selectInput(o.target),o.preventDefault()}_handleInput(o){let n=o.target,r=o.data?.trim()||n.value.trim(),p=this.type==="number"?this._filterNumbers(r):r,P=Number(this._getFocusedInputIndex(o));this._setKeyCodes(P,p),n.value=this._keyCode[P]??"",this.propagateChange(this._keyCode.join(""));let y=!(this._isUpDown&&this.type==="number");p&&y&&this.moveFocus(P,p.length),this._isUpDown=!1}_setKeyCodes(o,n){if(n.length<=1)this._keyCode[o]=this._convertLetterSize(n);else for(let r=o,p=0;r<this.codeLength;r++,p++)this._keyCode[r]=this._convertLetterSize(n[p]?.[0]??""),this._el.nativeElement.children[r].value=this._keyCode[r]}moveFocus(o,n){o+n<this.codeLength?this.selectInput(this._el.nativeElement.children.item(o+n)):this._el.nativeElement.children.item(this.codeLength-1).focus()}_getFocusedInputIndex(o){let n;for(let r=0;r<this._el.nativeElement.children.length;r++)o.target===this._el.nativeElement.children.item(r)&&(n=r);return n}_filterNumbers(o){let n="";for(let r of o)r.match(/\d$/)&&(n+=r);return n}_onBlur(){this._focused=!1,setTimeout(()=>{this._focused||this.propagateTouch(this._keyCode.join("")),this._cdr.markForCheck()})}_setFocusState(){this._focused=!0}setDisabledState(o){this.disabled=o,this._cdr.markForCheck()}writeValue(o){if(o){let n=o.split("").slice(0,this.codeLength);for(let r=0;r<this.codeLength;r++)this._keyCode[r]=n[r]}else this.setInputLength();this._cdr.markForCheck()}_trackByKeyCode(o,n){return o}_inputGap(o){switch(this.codeLength){case 4:case 6:case 8:return o===this.codeLength/2?Te:"";default:return""}}registerOnChange(o){this.propagateChange=o}registerOnTouched(o){this.propagateTouch=o}updateErrorState(){let o=this.errorState,n=this._parentFormGroup||this._parentForm,r=this._control?this._control.control:null,p=this._errorStateMatcher.isErrorState(r,n);p!==o&&(this.errorState=p)}getAriaLabel(o){return`${this._intl.inputFieldAriaLabel} ${o+1} ${this._intl.ofLabel} ${this._keyCode.length}`}selectInput(o){o.focus();try{o.setSelectionRange(0,o.value.length)}catch(n){if(!(n instanceof DOMException&&n.name==="InvalidStateError"))throw n}}};e.\u0275fac=function(n){return new(n||e)(L(re),L(te),L(pe,10),L(z),L(_e),L(me,8),L(E,8))},e.\u0275cmp=h({type:e,selectors:[["nx-code-input"]],hostVars:9,hostBindings:function(n,r){n&2&&(H("tabindex",-1),ne("nx-code-input",!0)("has-error",r.errorState)("is-negative",r.negative)("is-disabled",r.disabled))},inputs:{codeLength:[Y.None,"length","codeLength"],type:"type",tabindex:"tabindex",convertTo:"convertTo",negative:"negative",disabled:"disabled"},decls:1,vars:2,consts:[["class","nx-code-input__field","autocomplete","one-time-code",3,"ngModel","ngClass","disabled","input","blur","focus","mousedown","keydown",4,"ngFor","ngForOf","ngForTrackBy"],["autocomplete","one-time-code",1,"nx-code-input__field",3,"input","blur","focus","mousedown","keydown","ngModel","ngClass","disabled"]],template:function(n,r){n&1&&u(0,we,1,6,"input",0),n&2&&l("ngForOf",r._keyCode)("ngForTrackBy",r._trackByKeyCode)},dependencies:[ie,ae,le,I,de],styles:["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{font-size:var(--code-input-font-size);line-height:var(--code-input-line-height);font-weight:var(--code-input-font-weight);letter-spacing:var(--code-input-letter-spacing);color:var(--code-input-color);margin:0 4px;text-align:center;border:0;outline:0;caret-color:var(--code-input-active-color);box-shadow:inset 0 -1px 0 0 var(--code-input-color);-webkit-appearance:none;width:32px;border-radius:0;padding:0;background:transparent;box-sizing:border-box}[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:focus{margin-bottom:-nx-border-size(xs);color:var(--code-input-active-color);box-shadow:inset 0 -2px 0 0 var(--code-input-active-color)}[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:first-child{margin-left:0}[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:last-child{margin-right:0}[_nghost-%COMP%]   .nx-code-input--field-with-gap[_ngcontent-%COMP%]{margin-left:20px}[_nghost-%COMP%]:focus{outline:none}[dir=rtl]   [_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:first-child{margin-right:0;margin-left:4px}[dir=rtl]   [_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:last-child{margin-left:0;margin-right:4px}[dir=rtl]   [_nghost-%COMP%]   .nx-code-input--field-with-gap[_ngcontent-%COMP%]{margin-left:4px;margin-right:20px}.is-negative[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{caret-color:var(--negative);box-shadow:inset 0 -1px 0 0 var(--negative);color:var(--negative)}.is-negative[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]:focus{box-shadow:inset 0 -2px 0 0 var(--negative)}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-code-input__field[_ngcontent-%COMP%]{margin-bottom:-nx-border-size(xs);font-weight:700;color:var(--code-input-error-color);box-shadow:inset 0 -1px 0 0 var(--code-input-error-color)}.has-error[_nghost-%COMP%]:not(.is-negative)   .nx-code-input__field[_ngcontent-%COMP%]:focus{box-shadow:inset 0 -2px 0 0 var(--code-input-error-color)}.has-error.is-negative[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{font-weight:700}.is-disabled[_nghost-%COMP%]{cursor:not-allowed}.is-disabled[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{cursor:not-allowed;color:var(--code-input-disabled-color);box-shadow:inset 0 -1px 0 0 nx-theme-color(code-input-disabled-color);box-shadow:inset 0 -1px 0 0 var(--code-input-disabled-color)}.is-disabled.is-negative[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{color:var(--negative-02-dimmed);box-shadow:inset 0 -1px 0 0 var(--negative-02-dimmed)}input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button, input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number][_ngcontent-%COMP%], .nx-code-input__field[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}@media screen and (forced-colors: active){.nx-code-input__field[_ngcontent-%COMP%]{border-bottom:1px solid buttonText!important}.nx-code-input__field[_ngcontent-%COMP%]:focus{border-bottom:2px solid highlight!important}.is-disabled[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{border-bottom:1px solid GrayText!important}}@media screen and (forced-colors: active){.nx-code-input__field[_ngcontent-%COMP%]{box-shadow:inset 0 -1px 0 0 buttonText}.nx-code-input__field[_ngcontent-%COMP%]:focus{box-shadow:inset 0 -2px 0 0 buttonText}.is-disabled[_nghost-%COMP%]   .nx-code-input__field[_ngcontent-%COMP%]{color:GrayText;box-shadow:inset 0 -1px 0 0 GrayText;opacity:1}}"],changeDetection:0});let t=e;return t})(),Ce=(()=>{let e=class e{};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=W({type:e}),e.\u0275inj=K({providers:[z],imports:[se,ce,ue]});let t=e;return t})();function Oe(t,e){t&1&&(i(0,"nx-error",9),m(1," Entry is required. "),a())}function Ve(t,e){t&1&&(i(0,"nx-error",9),m(1," Entry must match pattern. "),a())}function Pe(t,e){t&1&&(i(0,"nx-error",9),m(1," Entry is too short. "),a())}function De(t,e){if(t&1&&(i(0,"div"),u(1,Oe,2,0,"nx-error",8)(2,Ve,2,0,"nx-error",8)(3,Pe,2,0,"nx-error",8),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("pattern")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var ge=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N({value:this.inputValue,disabled:!0},{validators:[c.required,c.pattern("[A-Z]+"),c.minLength(4)],updateOn:"submit"})})}get keyCode(){return this.codeForm.get("keyCode")}toggleDisabled(){this.keyCode?.disabled?this.keyCode.enable():this.keyCode?.disable()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-disabled-example"]],decls:13,vars:4,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["convertTo","upper","formControlName","keyCode",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["nxButton","primary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,De,4,3,"div",4),i(5,"p"),m(6),a(),i(7,"button",5),m(8,"Submit"),a(),i(9,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(10," Clear "),a(),i(11,"button",7),v("click",function(){return _(p),x(r.toggleDisabled())}),m(12," Toggle disabled "),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(2),l("length",4),d(2),l("ngIf",p.errorState),d(2),$("Disabled: ",r.keyCode==null?null:r.keyCode.disabled,"")}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();function Le(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function Ge(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry must match pattern. "),a())}function Ae(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function Be(t,e){if(t&1&&(i(0,"div"),u(1,Le,2,0,"nx-error",7)(2,Ge,2,0,"nx-error",7)(3,Ae,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("pattern")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var he=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.pattern("[A-Z]+"),c.minLength(4)],updateOn:"submit"})})}get keyCode(){return this.codeForm.get("keyCode")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-four-char-example"]],decls:10,vars:3,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["convertTo","upper","formControlName","keyCode",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,Be,4,3,"div",4),f(5,"br"),i(6,"button",5),m(7,"Submit"),a(),i(8,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(9," Clear "),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(2),l("length",4),d(2),l("ngIf",p.errorState)}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();function qe(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function je(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry must match pattern. "),a())}function ze(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function Ue(t,e){if(t&1&&(i(0,"div"),u(1,qe,2,0,"nx-error",7)(2,je,2,0,"nx-error",7)(3,ze,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("pattern")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var Re=(()=>{let e=class e extends z{constructor(){super(...arguments),this.inputFieldAriaLabel="Key eingeben",this.ofLabel="von"}};e.\u0275fac=(()=>{let o;return function(r){return(o||(o=ee(e)))(r||e)}})(),e.\u0275prov=R({token:e,factory:e.\u0275fac});let t=e;return t})(),ye=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.pattern("[A-Z]+"),c.minLength(5)],updateOn:"submit"})})}get keyCode(){return this.codeForm.get("keyCode")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-localize-example"]],features:[oe([{provide:z,useClass:Re}])],decls:10,vars:3,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["convertTo","upper","formControlName","keyCode",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,Ue,4,3,"div",4),f(5,"br"),i(6,"button",5),m(7,"Submit"),a(),i(8,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(9," Clear "),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(2),l("length",5),d(2),l("ngIf",p.errorState)}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();function Ke(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function We(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function $e(t,e){if(t&1&&(i(0,"div"),u(1,Ke,2,0,"nx-error",7)(2,We,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var ve=(()=>{let e=class e{constructor(){this.inputValue="",this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.minLength(4)],updateOn:"change"})}),this._destroyed=new U}get keyCode(){return this.codeForm.get("keyCode")}ngOnInit(){this.keyCode?.valueChanges.pipe(Q(this._destroyed)).subscribe(()=>{this.keyCode?.valid&&this.keyCode.value!=="1234"&&this.codeForm.setValue({keyCode:"1234"})})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-model-example"]],decls:12,vars:4,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["convertTo","upper","formControlName","keyCode",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,$e,3,2,"div",4),f(5,"br"),i(6,"button",5),m(7,"Submit"),a(),i(8,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(9," Clear "),a(),i(10,"p"),m(11),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(2),l("length",4),d(2),l("ngIf",p.errorState),d(7),$("Code input value: '",r.keyCode==null?null:r.keyCode.value,"'")}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();var be=(()=>{let e=class e{constructor(){this.inputValue=""}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-negative-example"]],decls:2,vars:1,consts:[[1,"docs-inverse-container"],["negative","true",3,"length"]],template:function(n,r){n&1&&(i(0,"div",0),f(1,"nx-code-input",1),a()),n&2&&(d(),l("length",4))},dependencies:[k]});let t=e;return t})();function He(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function Ze(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry must match pattern. "),a())}function Xe(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function Je(t,e){if(t&1&&(i(0,"div"),u(1,He,2,0,"nx-error",7)(2,Ze,2,0,"nx-error",7)(3,Xe,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("pattern")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var Ie=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.minLength(7)],updateOn:"submit"})})}get keyCode(){return this.codeForm.get("keyCode")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-seven-char-example"]],decls:10,vars:3,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["convertTo","lower","formControlName","keyCode",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,Je,4,3,"div",4),f(5,"br"),i(6,"button",5),m(7,"Submit"),a(),i(8,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(9," Clear "),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(2),l("length",7),d(2),l("ngIf",p.errorState)}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();function Qe(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function Ye(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function et(t,e){if(t&1&&(i(0,"div"),u(1,Qe,2,0,"nx-error",7)(2,Ye,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var Ee=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.minLength(6)],updateOn:"blur"})})}get keyCode(){return this.codeForm.get("keyCode")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-six-char-example"]],decls:10,vars:2,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["formControlName","keyCode"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0),f(2,"nx-code-input",3,1),u(4,et,3,2,"div",4),f(5,"br"),i(6,"button",5),m(7,"Submit"),a(),i(8,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(9," Clear "),a()()}if(n&2){let p=g(3);l("formGroup",r.codeForm),d(4),l("ngIf",p.errorState)}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"],changeDetection:0});let t=e;return t})();function tt(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is required. "),a())}function nt(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry must match pattern. "),a())}function ot(t,e){t&1&&(i(0,"nx-error",8),m(1," Entry is too short. "),a())}function rt(t,e){if(t&1&&(i(0,"div"),u(1,tt,2,0,"nx-error",7)(2,nt,2,0,"nx-error",7)(3,ot,2,0,"nx-error",7),a()),t&2){let s=C();d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("required")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("pattern")),d(),l("ngIf",s.keyCode==null?null:s.keyCode.hasError("minlength"))}}var ke=(()=>{let e=class e{constructor(){this.inputValue=""}ngOnInit(){this.codeForm=new w({keyCode:new N(this.inputValue,{validators:[c.required,c.pattern(/^\d*$/),c.minLength(4)],updateOn:"submit"})})}get keyCode(){return this.codeForm.get("keyCode")}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=h({type:e,selectors:[["code-input-type-example"]],decls:12,vars:3,consts:[["form","ngForm"],["codeInput",""],[3,"formGroup"],["formControlName","keyCode","type","number",3,"length"],[4,"ngIf"],["nxButton","primary small","type","submit"],["nxButton","secondary small","type","button",3,"click"],["class","nx-margin-y-xs",4,"ngIf"],[1,"nx-margin-y-xs"]],template:function(n,r){if(n&1){let p=b();i(0,"form",2,0)(2,"label"),m(3,"Enter PIN code"),a(),f(4,"nx-code-input",3,1),u(6,rt,4,3,"div",4),f(7,"br"),i(8,"button",5),m(9,"Submit"),a(),i(10,"button",6),v("click",function(){_(p);let y=g(1);return x(y.resetForm())}),m(11," Clear "),a()()}if(n&2){let p=g(5);l("formGroup",r.codeForm),d(4),l("length",4),d(2),l("ngIf",p.errorState)}},dependencies:[k,V,S,M,I,F,E,T,O],styles:["button[_ngcontent-%COMP%]{margin-right:4px}"]});let t=e;return t})();var Kt=(()=>{let e=class e{static components(){return{"code-input-disabled":ge,"code-input-four-char":he,"code-input-localize":ye,"code-input-model":ve,"code-input-negative":be,"code-input-seven-char":Ie,"code-input-six-char":Ee,"code-input-type":ke}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=W({type:e}),e.\u0275inj=K({imports:[Ce,fe,xe]});let t=e;return t})();export{Kt as CodeExamplesModule};