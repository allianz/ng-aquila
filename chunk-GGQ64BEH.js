import{e as at,f as pt,j as dt,k as st,l as ft}from"./chunk-MDOBDU4M.js";import{c as ie,f as ne,h as lt}from"./chunk-VBASNWS4.js";import{c as G,f as j,g as mt}from"./chunk-KZQN4PNA.js";import"./chunk-TQSWTGBO.js";import{a as rt}from"./chunk-65GLPSAG.js";import{a as k,b as _,c as $e,d as D,e as et,f as se,g as fe,h as oe,i as tt,j as s,k as ot,p as f,q as it,r as nt}from"./chunk-5K6RWGRM.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import{a as Ze,b as M}from"./chunk-KTZ2MV5R.js";import{A as g,B as U,b as c,d as N,f as je,g as x,h as Y,j as ze,k as Ye,l as S,m as Z,o as Ue,p as $,s as ee,w as V,y as te}from"./chunk-3CXM22DE.js";import"./chunk-DZRQJYOJ.js";import{a as A,b as q,c as R}from"./chunk-KSMSSQIV.js";import{a as de,c as Ke}from"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import{d as pe,e as Q}from"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import{c as H,e as Je}from"./chunk-V5XCZUGO.js";import{q as Xe}from"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import{a as xe}from"./chunk-APNBV455.js";import"./chunk-CCSED5RY.js";import{Aa as b,Ba as w,Fc as I,Gc as T,Hc as L,Lb as p,Lc as W,Mb as Oe,Mc as l,Oa as Be,Oc as J,Qc as h,Rb as K,Rc as y,Sc as F,Tc as ae,ac as Qe,ba as We,bc as E,dc as ke,gc as z,j as ce,ka as He,lc as t,mc as i,nc as a,rc as P,sc as Ge,wb as d,wc as O,xb as re,yc as me}from"./chunk-LG2ZA55B.js";var ut=["inputToCount"];function ct(o,X){o&1&&(t(0,"span"),l(1," max. 15 characters "),i())}function xt(o,X){if(o&1&&(t(0,"span"),l(1),i()),o&2){let r=me();d(),J(" ",15-r.count," characters remaining ")}}var ge=(()=>{class o{constructor(){this.currentDate=null,this.count=0}onInput(){this.count=this.input.value.length}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-appearance-example"]],viewQuery:function(e,n){if(e&1&&I(ut,7,f),e&2){let m;T(m=L())&&(n.input=m.first)}},decls:51,vars:6,consts:[["myDatepicker",""],["inputToCount",""],["popoverAppearanceExample",""],["nxLayout","grid"],["nxRow",""],["nxCol","6"],["appearance","outline","label","Prefilled field","floatLabel","always"],["nxInput","","value","prefilled"],["label","Readonly field","appearance","outline","floatLabel","always"],["nxFormfieldPrefix",""],["nxInput","","readonly","","value","500"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],["label","Dropdown Label","appearance","outline","floatLabel","always"],["value","BMW"],["value","Audi"],["value","Volvo"],["value","Mini"],["label","Label","appearance","outline","floatLabel","always"],["nxInput","","disabled","","value","Disabled input"],["label","Birthday","appearance","outline","floatLabel","always"],["nxDatefield","","nxInput","","nxAriaLabel","Enter the date of your Birthday",3,"ngModelChange","datepicker","ngModel"],["nxFormfieldSuffix","",3,"for"],["nxFormfieldHint",""],["nxFormfieldError",""],["appearance","outline","floatLabel","always","label","Textarea Label","optionalLabel","Optional"],["nxInput","","type","text"],["label","Character count","appearance","outline","floatLabel","always"],["nxInput","","maxlength","15",3,"input"],[2,"max-width","300px"]],template:function(e,n){if(e&1){let m=P();t(0,"div",3)(1,"div",4)(2,"div",5)(3,"nx-formfield",6),a(4,"input",7),i()(),t(5,"div",5)(6,"nx-formfield",8)(7,"span",9),l(8,"$"),i(),a(9,"input",10),t(10,"button",11),a(11,"nx-icon",12),i()()()(),t(12,"div",4)(13,"div",5)(14,"nx-formfield",13)(15,"nx-dropdown"),a(16,"nx-dropdown-item",14)(17,"nx-dropdown-item",15)(18,"nx-dropdown-item",16)(19,"nx-dropdown-item",17),i()()(),t(20,"div",5)(21,"nx-formfield",18),a(22,"input",19),i()()(),t(23,"div",4)(24,"div",5)(25,"nx-formfield",20)(26,"input",21),F("ngModelChange",function(u){return b(m),y(n.currentDate,u)||(n.currentDate=u),w(u)}),i(),a(27,"nx-datepicker-toggle",22)(28,"nx-datepicker",null,0),t(30,"span",23),l(31," mm/dd/yyyy "),i(),t(32,"nx-error",24)(33,"strong"),l(34,"Error: "),i(),l(35,"Please type in a valid Date in the Format mm/dd/yyyy or use the calendar to select a Date. "),i()()(),t(36,"div",5)(37,"nx-formfield",25),a(38,"textarea",26),i()()(),t(39,"div",4)(40,"div",5)(41,"nx-formfield",27)(42,"input",28,1),O("input",function(){return b(m),w(n.onInput())}),i(),t(44,"span",23),K(45,ct,2,0,"span")(46,xt,2,1,"span"),i()()()()(),t(47,"nx-popover",null,2)(49,"div",29),l(50," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),i()()}if(e&2){let m=W(29),v=W(48);d(10),E("nxPopoverTriggerFor",v),d(16),E("datepicker",m),h("ngModel",n.currentDate),d(),E("for",m),d(18),z(n.count===0?45:-1),d(),z(n.count>0?46:-1)}},dependencies:[A,q,R,s,f,fe,H,k,ne,ie,pt,g,c,x,S,st,oe,dt,D,M,Q,G,j],encapsulation:2})}}return o})();var Ce=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-basic-example"]],decls:11,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,4"],["label","Label"],["nxInput",""],["nxInput","","readonly","","value","Readonly Field"],["nxInput","","disabled","","value","Disabled Field"]],template:function(e,n){e&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),a(4,"input",4),i()(),t(5,"div",2)(6,"nx-formfield",3),a(7,"input",5),i()(),t(8,"div",2)(9,"nx-formfield",3),a(10,"input",6),i()()()())},dependencies:[A,q,R,s,f],encapsulation:2})}}return o})();var gt=["errorNgModel"],ve=(()=>{class o{ngAfterContentInit(){this.errorNgModel.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-changedetection-example"]],viewQuery:function(e,n){if(e&1&&I(gt,7),e&2){let m;T(m=L())&&(n.errorNgModel=m.first)}},decls:5,vars:1,consts:[["errorNgModel","nxInput"],["label","Formfield with error","updateOn","blur"],["nxInput","","required","",3,"ngModelChange","ngModel"],["nxFormfieldError",""]],template:function(e,n){if(e&1){let m=P();t(0,"nx-formfield",1)(1,"input",2,0),F("ngModelChange",function(u){return b(m),y(n.modelValue,u)||(n.modelValue=u),w(u)}),i(),t(3,"nx-error",3),l(4," This is a mandatory field "),i()()}e&2&&(d(),h("ngModel",n.modelValue))},dependencies:[s,f,g,c,x,V,S,M,_],encapsulation:2})}}return o})();var Ct=["inputToCount"];function vt(o,X){o&1&&(t(0,"span"),l(1," max. 15 characters "),i())}function Et(o,X){if(o&1&&(t(0,"span"),l(1),i()),o&2){let r=me();d(),J(" ",15-(r.count||0)," characters remaining ")}}var Ee=(()=>{class o{constructor(){this.count=0}onInput(){this.count=this.input.value.length}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-character-count-example"]],viewQuery:function(e,n){if(e&1&&I(Ct,7,f),e&2){let m;T(m=L())&&(n.input=m.first)}},decls:6,vars:2,consts:[["inputToCount",""],["label","Label"],["nxInput","","maxlength","15",3,"input"],["nxFormfieldHint",""]],template:function(e,n){if(e&1){let m=P();t(0,"nx-formfield",1)(1,"input",2,0),O("input",function(){return b(m),w(n.onInput())}),i(),t(3,"span",3),K(4,vt,2,0,"span")(5,Et,2,1,"span"),i()()}e&2&&(d(4),z(n.count===0?4:-1),d(),z(n.count>0?5:-1))},dependencies:[s,f,D],encapsulation:2})}}return o})();var ue=class{constructor(X,r,e){this.area=X,this.exchange=r,this.subscriber=e}},le=(()=>{class o{static{this.nextId=0}get empty(){let{value:{area:r,exchange:e,subscriber:n}}=this.parts;return!r&&!e&&!n}get shouldLabelFloat(){return this.focused||!this.empty}set placeholder(r){this._placeholder=r,this.stateChanges.next()}get placeholder(){return this._placeholder}set required(r){this._required=xe(r),this.stateChanges.next()}get required(){return this._required}set disabled(r){this._disabled=xe(r),this._disabled?this.parts.disable():this.parts.enable(),this.stateChanges.next()}get disabled(){return this._disabled}set value(r){let{area:e,exchange:n,subscriber:m}=r||new ue("","","");this.parts.setValue({area:e,exchange:n,subscriber:m}),this.stateChanges.next()}get value(){if(this.parts.valid){let{value:{area:r,exchange:e,subscriber:n}}=this.parts;return new ue(r,e,n)}return null}constructor(r,e,n,m){this.fb=r,this._focusMonitor=e,this._elementRef=n,this.ngControl=m,this.stateChanges=new ce,this.focused=!1,this.errorState=!1,this.controlType="example-tel-input",this.id=`example-tel-input-${o.nextId++}`,this.describedBy="",this._placeholder="",this._required=!1,this._disabled=!1,this._destroyed=new ce,this.onChange=v=>{},this.onTouched=()=>{},this.parts=this.fb.group({area:[null,[N.required,N.minLength(3),N.maxLength(3)]],exchange:[null,[N.required,N.minLength(3),N.maxLength(3)]],subscriber:[null,[N.required,N.minLength(4),N.maxLength(4)]]}),this.ngControl!=null&&(this.ngControl.valueAccessor=this)}setAriaLabel(r){throw new Error("Method not implemented.")}get elementRef(){return this._elementRef}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).pipe(We(this._destroyed)).subscribe(r=>{this.focused&&!r&&this.onTouched(),this.focused=!!r,this.stateChanges.next()})}ngOnDestroy(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._focusMonitor.stopMonitoring(this._elementRef)}setDescribedByIds(r){this.describedBy=r.join(" ")}onContainerClick(r){r.target.tagName.toLowerCase()!=="input"&&this._elementRef.nativeElement.querySelector("input").focus()}writeValue(r){this.value=r}registerOnChange(r){this.onChange=r}registerOnTouched(r){this.onTouched=r}setDisabledState(r){this.disabled=r}_handleInput(){this.onChange(this.value)}static{this.\u0275fac=function(e){return new(e||o)(re(te),re(Xe),re(Be),re(je,10))}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-custom-tel-input-example"]],hostVars:4,hostBindings:function(e,n){e&2&&(Ge("id",n.id),Qe("aria-describedby",n.describedBy),ke("example-floating",n.shouldLabelFloat))},inputs:{placeholder:"placeholder",required:"required",disabled:"disabled",value:"value"},features:[ae([{provide:$e,useExisting:o}])],decls:8,vars:1,consts:[[1,"example-tel-input-container",3,"formGroup"],["formControlName","area","size","3","aria-label","Area code",1,"example-tel-input-element",3,"input"],[1,"example-tel-input-spacer"],["formControlName","exchange","size","3","aria-label","Exchange code",1,"example-tel-input-element",3,"input"],["formControlName","subscriber","size","4","aria-label","Subscriber number",1,"example-tel-input-element",3,"input"]],template:function(e,n){e&1&&(t(0,"div",0)(1,"input",1),O("input",function(){return n._handleInput()}),i(),t(2,"span",2),l(3,"\u2013"),i(),t(4,"input",3),O("input",function(){return n._handleInput()}),i(),t(5,"span",2),l(6,"\u2013"),i(),t(7,"input",4),O("input",function(){return n._handleInput()}),i()()),e&2&&E("formGroup",n.parts)},dependencies:[g,c,x,Y,U,$,ee],styles:[".example-tel-input-container[_ngcontent-%COMP%]{display:flex}.example-tel-input-element[_ngcontent-%COMP%]{border:none;background:none;padding:0;outline:none;font:inherit;text-align:center;border:2px dotted #aaaaaa}.example-tel-input-spacer[_ngcontent-%COMP%]{opacity:0;transition:opacity .2s}.example-floating[_nghost-%COMP%]   .example-tel-input-spacer[_ngcontent-%COMP%]{opacity:1}"]})}}return o})();var he=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-custom-example"]],decls:2,vars:0,consts:[["role","group","label","Phone number","aria-label","Phone number","floatLabel","always"]],template:function(e,n){e&1&&(t(0,"nx-formfield",0),a(1,"formfield-custom-tel-input-example"),i())},dependencies:[s,le],encapsulation:2})}}return o})();var ye=(()=>{class o{constructor(){this.suffix="(suffix)"}addOptionalSuffix(){this.suffix=this.suffix===""?"(suffix)":""}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-custom-label-example"]],decls:17,vars:2,consts:[[1,"nx-margin-bottom-s"],["name","product-heart","aria-hidden","true"],["nxInput",""],["nxFormfieldHint",""],["appearance","outline","floatLabel","always"],[1,"nx-font-weight-regular"],["nxButton","primary small","type","button",3,"click"]],template:function(e,n){e&1&&(t(0,"nx-formfield",0)(1,"nx-formfield-label"),l(2," Favourite Animal "),a(3,"nx-icon",1),l(4),i(),a(5,"input",2),t(6,"span",3),l(7," some additional information "),i()(),t(8,"nx-formfield",4)(9,"nx-formfield-label"),l(10," Favourite Animal "),a(11,"nx-icon",1),t(12,"span",5),l(13),i()(),a(14,"input",2),i(),t(15,"button",6),O("click",function(){return n.addOptionalSuffix()}),l(16,` Toggle Suffix
`),i()),e&2&&(d(4),J(" ",n.suffix,""),d(9),J(" ",n.suffix,""))},dependencies:[s,et,H,f,D,pe],encapsulation:2})}}return o})();var ht=["exampleErrorNgModel"],yt=["exampleErrorNgModelHint"],Fe=(()=>{class o{ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched(),this.exampleErrorNgModelHint.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-error-example"]],viewQuery:function(e,n){if(e&1&&(I(ht,7),I(yt,7)),e&2){let m;T(m=L())&&(n.exampleErrorNgModel=m.first),T(m=L())&&(n.exampleErrorNgModelHint=m.first)}},decls:20,vars:2,consts:[["exampleErrorNgModel","nxInput"],["exampleErrorNgModelHint","nxInput"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6,6"],["label","Label"],["required","","nxInput","",3,"ngModelChange","ngModel"],["nxFormfieldError",""],["nxFormfieldHint",""]],template:function(e,n){if(e&1){let m=P();t(0,"div",2)(1,"div",3)(2,"div",4)(3,"nx-formfield",5)(4,"input",6,0),F("ngModelChange",function(u){return b(m),y(n.valueSupplementError,u)||(n.valueSupplementError=u),w(u)}),i(),t(6,"nx-error",7)(7,"strong"),l(8," Please note: "),i(),l(9," you have to fill out this field to continue. "),i()()(),t(10,"div",4)(11,"nx-formfield",5)(12,"input",6,1),F("ngModelChange",function(u){return b(m),y(n.valueSupplementErrorHint,u)||(n.valueSupplementErrorHint=u),w(u)}),i(),t(14,"span",8),l(15," some additional information "),i(),t(16,"nx-error",7)(17,"strong"),l(18," Please note: "),i(),l(19," you have to fill out this field to continue. "),i()()()()()}e&2&&(d(4),h("ngModel",n.valueSupplementError),d(8),h("ngModel",n.valueSupplementErrorHint))},dependencies:[A,q,R,s,f,g,c,x,V,S,M,_,D],encapsulation:2})}}return o})();var Ft=["exampleErrorNgModel"],Nt=["exampleErrorNgModelHint"],Ne=(()=>{class o{ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched(),this.exampleErrorNgModelHint.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-error-two-column-example"]],viewQuery:function(e,n){if(e&1&&(I(Ft,7),I(Nt,7)),e&2){let m;T(m=L())&&(n.exampleErrorNgModel=m.first),T(m=L())&&(n.exampleErrorNgModelHint=m.first)}},decls:29,vars:2,consts:[["exampleErrorNgModelHint","nxInput"],["exampleErrorNgModel","nxInput"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6,6"],["label","Label",1,"nx-margin-bottom-m"],["required","","nxInput",""],["required","","nxInput","",3,"ngModelChange","ngModel"],["nxFormfieldHint",""],["nxFormfieldError",""]],template:function(e,n){if(e&1){let m=P();t(0,"div",2)(1,"div",3)(2,"div",4)(3,"nx-formfield",5),a(4,"input",6),i()(),t(5,"div",4)(6,"nx-formfield",5)(7,"input",7,0),F("ngModelChange",function(u){return b(m),y(n.valueSupplementErrorHint,u)||(n.valueSupplementErrorHint=u),w(u)}),i(),t(9,"span",8),l(10," some additional information "),i(),t(11,"nx-error",9)(12,"strong"),l(13," Please note: "),i(),l(14," you have to fill out this field to continue. "),i()()()(),t(15,"div",3)(16,"div",4)(17,"nx-formfield",5)(18,"input",7,1),F("ngModelChange",function(u){return b(m),y(n.valueSupplementError,u)||(n.valueSupplementError=u),w(u)}),i(),t(20,"nx-error",9)(21,"strong"),l(22," Please note: "),i(),l(23," you have to fill out this field to continue. "),i()()(),t(24,"div",4)(25,"nx-formfield",5),a(26,"input",6),t(27,"span",8),l(28," some additional information "),i()()()()()}e&2&&(d(7),h("ngModel",n.valueSupplementErrorHint),d(11),h("ngModel",n.valueSupplementError))},dependencies:[A,q,R,s,f,g,c,x,V,S,D,M,_],encapsulation:2})}}return o})();var bt=["exampleErrorNgModel"],wt=["exampleErrorWithHintNgModel"],be=(()=>{class o{ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched(),this.exampleErrorWithHintNgModel.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-expert-error-example"]],viewQuery:function(e,n){if(e&1&&(I(bt,7),I(wt,7)),e&2){let m;T(m=L())&&(n.exampleErrorNgModel=m.first),T(m=L())&&(n.exampleErrorWithHintNgModel=m.first)}},decls:16,vars:2,consts:[["exampleErrorNgModel","nxInput"],["exampleErrorWithHintNgModel","nxInput"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6,6"],["label","Label","appearance","outline","floatLabel","always"],["required","","nxInput","",3,"ngModelChange","ngModel"],["appearance","text","nxFormfieldError",""],["nxFormfieldHint",""]],template:function(e,n){if(e&1){let m=P();t(0,"div",2)(1,"div",3)(2,"div",4)(3,"nx-formfield",5)(4,"input",6,0),F("ngModelChange",function(u){return b(m),y(n.valueError,u)||(n.valueError=u),w(u)}),i(),t(6,"nx-error",7),l(7," Please enter your name! "),i()()(),t(8,"div",4)(9,"nx-formfield",5)(10,"input",6,1),F("ngModelChange",function(u){return b(m),y(n.valueErrorWithHint,u)||(n.valueErrorWithHint=u),w(u)}),i(),t(12,"span",8),l(13," some additional information "),i(),t(14,"nx-error",7),l(15," Please enter your name! "),i()()()()()}e&2&&(d(4),h("ngModel",n.valueError),d(6),h("ngModel",n.valueErrorWithHint))},dependencies:[A,q,R,s,f,g,c,x,V,S,M,_,D],encapsulation:2})}}return o})();var we=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-floating-example"]],decls:14,vars:0,consts:[["label","Label","floatLabel","always"],["nxInput",""],["nxFormfieldHint",""],[1,"nx-margin-bottom-0"],["label","Label"],["nxInput","","disabled",""],["nxInput","","disabled","","value","Prefilled with content"]],template:function(e,n){e&1&&(t(0,"nx-formfield",0),a(1,"input",1),t(2,"span",2),l(3," some additional information "),i()(),t(4,"h3",3),l(5,"Disabled:"),i(),t(6,"nx-formfield",4),a(7,"input",5),t(8,"span",2),l(9," some additional information "),i()(),t(10,"nx-formfield",4),a(11,"input",6),t(12,"span",2),l(13," some additional information "),i()())},dependencies:[s,f,D],encapsulation:2})}}return o})();var Mt=["errorNgModel"],St={appearance:"outline",nxFloatLabel:"always",updateOn:"change"},_t={appearance:"text"},Me=(()=>{class o{ngAfterContentInit(){this.errorNgModel.ngControl?.control?.markAsTouched()}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-global-example"]],viewQuery:function(e,n){if(e&1&&I(Mt,7),e&2){let m;T(m=L())&&(n.errorNgModel=m.first)}},features:[ae([{provide:tt,useValue:St},{provide:Ze,useValue:_t}])],decls:25,vars:2,consts:[["errorNgModel","nxInput"],["popoverGlobalExample",""],["label","Label"],["nxInput","","value","prefilled"],["nxFormfieldPrefix",""],["nxInput","","nxAriaLabel","Enter dollar amount"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],["label","Formfield with error"],["nxInput","","required","",3,"ngModelChange","ngModel"],["nxFormfieldError",""],["label","Override appearance","appearance","auto"],["nxInput",""],["label","Override appearance and nxFloatLabel","appearance","auto","floatLabel","auto"],[2,"max-width","300px"]],template:function(e,n){if(e&1){let m=P();t(0,"h3"),l(1,"Use default global settings"),i(),t(2,"nx-formfield",2),a(3,"input",3),i(),t(4,"nx-formfield",2)(5,"span",4),l(6,"$"),i(),a(7,"input",5),t(8,"button",6),a(9,"nx-icon",7),i()(),t(10,"nx-formfield",8)(11,"input",9,0),F("ngModelChange",function(u){return b(m),y(n.modelValue,u)||(n.modelValue=u),w(u)}),i(),t(13,"nx-error",10),l(14," This is a mandatory field "),i()(),t(15,"h3"),l(16,"Override default global settings"),i(),t(17,"nx-formfield",11),a(18,"input",12),i(),t(19,"nx-formfield",13),a(20,"input",12),i(),t(21,"nx-popover",null,1)(23,"div",14),l(24," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),i()()}if(e&2){let m=W(22);d(8),E("nxPopoverTriggerFor",m),d(3),h("ngModel",n.modelValue)}},dependencies:[s,f,fe,H,k,g,c,x,V,S,M,_,G,j,Q],encapsulation:2})}}return o})();var Se=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-hint-example"]],decls:10,vars:1,consts:[["popoverAppendixExample",""],["label","Label"],["nxInput",""],["nxFormfieldHint",""],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],[2,"max-width","300px"]],template:function(e,n){if(e&1&&(t(0,"nx-formfield",1),a(1,"input",2),t(2,"span",3),l(3," some additional information "),i(),t(4,"button",4),a(5,"nx-icon",5),i()(),t(6,"nx-popover",null,0)(8,"div",6),l(9," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),i()()),e&2){let m=W(7);d(4),E("nxPopoverTriggerFor",m)}},dependencies:[s,f,D,k,j,H,G,Q],encapsulation:2})}}return o})();function Dt(o,X){o&1&&(t(0,"nx-error",2),l(1," This field is required. "),i())}function It(o,X){o&1&&(t(0,"nx-error",2),l(1," Please enter a valid email address. "),i())}var _e=(()=>{class o{constructor(){this.emailFormControl=new Ye("",[N.required,N.email])}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-multiple-errors-example"]],decls:5,vars:3,consts:[["label","Email"],["nxInput","",3,"formControl"],["nxFormfieldError",""]],template:function(e,n){e&1&&(t(0,"form")(1,"nx-formfield",0),a(2,"input",1),K(3,Dt,2,0,"nx-error",2)(4,It,2,0,"nx-error",2),i()()),e&2&&(d(2),E("formControl",n.emailFormControl),d(),z(n.emailFormControl.hasError("required")?3:-1),d(),z(n.emailFormControl.hasError("email")?4:-1))},dependencies:[g,Z,c,x,Y,ze,s,f,U,Ue,M,_],encapsulation:2})}}return o})();var De=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-negative-example"]],decls:13,vars:0,consts:[[1,"docs-inverse-container"],["label","Label","negative","negative"],["nxInput",""],["nxFormfieldHint",""],["nxInput","","value","Prefilled with content"],["label","Disabled","negative","negative"],["disabled","","nxInput",""]],template:function(e,n){e&1&&(t(0,"div",0)(1,"nx-formfield",1),a(2,"input",2),t(3,"span",3),l(4," some additional information "),i()(),t(5,"nx-formfield",1),a(6,"input",4),t(7,"span",3),l(8," some additional information "),i()(),t(9,"nx-formfield",5),a(10,"input",6),t(11,"span",3),l(12," some additional information "),i()()())},dependencies:[s,f,D],encapsulation:2})}}return o})();var Ie=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-note-example"]],decls:4,vars:1,consts:[["label","Label"],["nxInput","",3,"ngModelChange","ngModel"],["context","info","nxFormfieldNote",""]],template:function(e,n){e&1&&(t(0,"nx-formfield",0)(1,"input",1),F("ngModelChange",function(v){return y(n.valueSupplementNote,v)||(n.valueSupplementNote=v),v}),i(),t(2,"nx-message",2),l(3," Ensure that you enter your real name. "),i()()),e&2&&(d(),h("ngModel",n.valueSupplementNote))},dependencies:[s,f,g,c,x,S,de,se],encapsulation:2})}}return o})();var Te=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-note-and-error-example"]],decls:6,vars:1,consts:[["label","Label"],["required","","nxInput","",3,"ngModelChange","ngModel"],["context","info","nxFormfieldNote",""],["nxFormfieldError",""]],template:function(e,n){e&1&&(t(0,"nx-formfield",0)(1,"input",1),F("ngModelChange",function(v){return y(n.valueSupplementErrorAndNote,v)||(n.valueSupplementErrorAndNote=v),v}),i(),t(2,"nx-message",2),l(3," Ensure that you enter your real name. "),i(),t(4,"nx-error",3),l(5," Your real name is missing "),i()()),e&2&&(d(),h("ngModel",n.valueSupplementErrorAndNote))},dependencies:[s,f,g,c,x,V,S,de,se,M,_],encapsulation:2})}}return o})();var Le=(()=>{class o{constructor(){this.formGroup=new te().group({firstName:["",N.required],lastName:[""],items:[""],email:["",N.required]})}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-optional-label-example"]],decls:28,vars:1,consts:[[1,"form-example",3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,6"],["label","Number of items","optionalLabel","Optional"],["formControlName","items"],["value","1"],["value","2"],["label","Last Name","optionalLabel","Optional"],["nxInput","","formControlName","lastName"],[1,"nx-margin-top-xs"],["label","Number of items","appearance","outline","floatLabel","always","optionalLabel","optional"],["label","Last Name","appearance","outline","floatLabel","always","optionalLabel","optional"]],template:function(e,n){e&1&&(t(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5)(6,"nx-dropdown-item",6),l(7,"1"),i(),t(8,"nx-dropdown-item",7),l(9,"2"),i()()()(),t(10,"div",3)(11,"nx-formfield",8),a(12,"input",9),i()()()(),a(13,"hr"),t(14,"h3",10),l(15,"Expert optional label"),i(),t(16,"div",1)(17,"div",2)(18,"div",3)(19,"nx-formfield",11)(20,"nx-dropdown",5)(21,"nx-dropdown-item",6),l(22,"1"),i(),t(23,"nx-dropdown-item",7),l(24,"2"),i()()()(),t(25,"div",3)(26,"nx-formfield",12),a(27,"input",9),i()()()()()),e&2&&E("formGroup",n.formGroup)},dependencies:[g,Z,c,x,Y,U,$,ee,A,q,R,s,ne,ie,f],encapsulation:2})}}return o})();var Pe=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-password-visibility-example"]],decls:8,vars:2,consts:[["testInput",""],["label","Password"],["required","","nxInput","","type","password","nxAriaLabel","Enter password",3,"ngModelChange","ngModel"],["ariaLabel","Your custom show password label","nxFormfieldSuffix","",3,"control"],["nxFormfieldError",""]],template:function(e,n){if(e&1){let m=P();t(0,"nx-formfield",1)(1,"input",2,0),F("ngModelChange",function(u){return b(m),y(n.inputValue,u)||(n.inputValue=u),w(u)}),i(),a(3,"nx-password-toggle",3),t(4,"nx-error",4)(5,"b"),l(6,"Please note: "),i(),l(7," you have to fill in your password to continue. "),i()()}if(e&2){let m=W(2);d(),h("ngModel",n.inputValue),d(2),E("control",m)}},dependencies:[s,f,g,c,x,V,S,it,oe,M,_],encapsulation:2})}}return o})();var Ve=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-placeholder-example"]],decls:4,vars:0,consts:[["label","Label"],["nxInput","","type","text","placeholder","This is a placeholder"],["appearance","outline","label","Label","floatLabel","always"]],template:function(e,n){e&1&&(t(0,"nx-formfield",0),a(1,"input",1),i(),t(2,"nx-formfield",2),a(3,"input",1),i())},dependencies:[s,f],encapsulation:2})}}return o})();var Ae=(()=>{class o{constructor(){this.value="Max"}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-prefix-suffix-appendix-example"]],decls:12,vars:1,consts:[["popoverAppendixExample",""],["label","Your share (Suffix)"],["nxInput","","nxAriaLabel","Enter percents","min","0","max","100","type","number","value","85"],["nxFormfieldSuffix",""],["label","Your name (Appendix)"],["nxInput",""],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverDirection","top","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],[2,"max-width","300px"]],template:function(e,n){if(e&1&&(t(0,"nx-formfield",1),a(1,"input",2),t(2,"span",3),l(3,"%"),i()(),t(4,"nx-formfield",4),a(5,"input",5),t(6,"button",6),a(7,"nx-icon",7),i()(),t(8,"nx-popover",null,0)(10,"div",8),l(11," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),i()()),e&2){let m=W(9);d(6),E("nxPopoverTriggerFor",m)}},dependencies:[s,f,oe,k,j,H,G,Q],styles:["[nxFormfieldAppendix][_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}"]})}}return o})();var qe=(()=>{class o{constructor(){this.formGroup=new te().group({firstName:["",N.required],lastName:["",N.required],items:["",N.required],email:["",N.required]})}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-simple-form-example"]],decls:42,vars:2,consts:[["popoverEmail",""],[1,"form-example",3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,6"],["label","First Name"],["nxInput","","formControlName","firstName"],["nxFormfieldError",""],["label","Number of items"],["formControlName","items"],["value","1"],["value","2"],["value","3"],["label","Last Name"],["nxInput","","formControlName","lastName"],["label","E-Mail"],["nxInput","","formControlName","email"],["nxFormfieldAppendix","","nxIconButton","tertiary small","nxPopoverTrigger","click","type","button","aria-label","More information",3,"nxPopoverTriggerFor"],["name","info-circle-o","size","s","aria-hidden","true"],["nxButton","","type","submit"],[2,"max-width","200px"]],template:function(e,n){if(e&1&&(t(0,"form",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"nx-formfield",5),a(5,"input",6),t(6,"nx-error",7)(7,"strong"),l(8,"Please note:"),i(),l(9," this field is required! "),i()()(),t(10,"div",4)(11,"nx-formfield",8)(12,"nx-dropdown",9)(13,"nx-dropdown-item",10),l(14,"1"),i(),t(15,"nx-dropdown-item",11),l(16,"2"),i(),t(17,"nx-dropdown-item",12),l(18,"3"),i()(),t(19,"nx-error",7),l(20," Please select an option. "),i()()()(),t(21,"div",3)(22,"div",4)(23,"nx-formfield",13),a(24,"input",14),t(25,"nx-error",7),l(26," Your name is missing. "),i()()(),t(27,"div",4)(28,"nx-formfield",15),a(29,"input",16),t(30,"button",17),a(31,"nx-icon",18),i(),t(32,"nx-error",7),l(33," Your email is missing. "),i()()()(),t(34,"div",3)(35,"div",4)(36,"button",19),l(37,"Submit"),i()()()()(),t(38,"nx-popover",null,0)(40,"div",20),l(41," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, nostrum. Obcaecati cupiditate numquam, fugit illo incidunt molestiae ipsam perferendis officia accusamus. Enim magnam recusandae velit accusamus ipsa. Nemo, eius exercitationem? "),i()()),e&2){let m=W(39);E("formGroup",n.formGroup),d(30),E("nxPopoverTriggerFor",m)}},dependencies:[g,Z,c,x,Y,U,$,ee,A,q,R,s,f,M,_,ne,ie,H,k,j,pe,G,Q],encapsulation:2})}}return o})();var Re=(()=>{class o{static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275cmp=p({type:o,selectors:[["formfield-spacing-adjuster-example"]],decls:5,vars:0,consts:[[1,"remove-formfield-spacing"],["label","Label"],["nxInput",""]],template:function(e,n){e&1&&(t(0,"form",0)(1,"nx-formfield",1),a(2,"input",2),i(),t(3,"nx-formfield",1),a(4,"input",2),i()())},dependencies:[s,f],styles:[".remove-formfield-spacing[_ngcontent-%COMP%]{--formfield-bottom-padding: 0;--formfield-outline-bottom-padding: 0;--formfield-mobile-bottom-padding: 0}"],changeDetection:0})}}return o})();var Tt=[Re,ge,Ce,Ee,he,ye,le,Fe,Ne,be,we,Me,Se,_e,De,Ie,Te,Pe,Ve,Ae,qe,ve,Le],Dn=(()=>{class o{static components(){return{"formfield-spacing-adjuster":Re,"formfield-appearance":ge,"formfield-basic":Ce,"formfield-character-count":Ee,"formfield-custom":he,"formfield-custom-label":ye,"formfield-custom-tel-input":le,"formfield-error":Fe,"formfield-error-two-column":Ne,"formfield-expert-error":be,"formfield-floating":we,"formfield-global":Me,"formfield-hint":Se,"formfield-multiple-errors":_e,"formfield-negative":De,"formfield-note":Ie,"formfield-note-and-error":Te,"formfield-password-visibility":Pe,"formfield-placeholder":Ve,"formfield-prefix-suffix-appendix":Ae,"formfield-simple-form":qe,"formfield-changedetection":ve,"formfield-optional-label":Le}}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275mod=Oe({type:o})}static{this.\u0275inj=He({imports:[ot,mt,lt,Je,ft,nt,at,Ke,rt,Tt]})}}return o})();export{Dn as FormfieldExamplesModule};
