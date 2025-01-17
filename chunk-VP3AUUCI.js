import{c as G,f as j,h as Ae}from"./chunk-VBASNWS4.js";import{b as ee,c as Fe}from"./chunk-TQSWTGBO.js";import{a as be}from"./chunk-65GLPSAG.js";import{b as g,d as D,g as S,h as O,j as x,k as we,p as E,r as Se}from"./chunk-5K6RWGRM.js";import"./chunk-SP5DAN74.js";import"./chunk-GCLFQC76.js";import"./chunk-RTSM2X3X.js";import{b as N}from"./chunk-KTZ2MV5R.js";import{A as y,B as $,b as C,c as Ne,g as v,h as ge,i as Pe,k as _e,l as w,m as Me,p as Ee,s as Le}from"./chunk-3CXM22DE.js";import{b as De}from"./chunk-DZRQJYOJ.js";import{a as P,b as _,c as M}from"./chunk-KSMSSQIV.js";import"./chunk-INHV2N6H.js";import"./chunk-VV4CBK2G.js";import"./chunk-VPHHQYPB.js";import"./chunk-63LXIO5M.js";import"./chunk-J2PQRSHM.js";import"./chunk-LJK2GACP.js";import"./chunk-T5NYCE37.js";import"./chunk-YHRSJ234.js";import"./chunk-V5XCZUGO.js";import"./chunk-2EQ73B6L.js";import"./chunk-G3FDH6OQ.js";import"./chunk-TGA3OXY4.js";import"./chunk-APNBV455.js";import{v as Q,z as ve}from"./chunk-CCSED5RY.js";import{Aa as Y,Ac as he,Ba as Z,Lb as u,Mb as K,Mc as m,Nb as xe,Nc as k,Oc as b,Qc as c,Rb as U,Rc as p,Sc as d,Tc as Ce,Xc as X,Yc as q,bc as f,dc as ne,gc as z,ic as T,jc as W,ka as J,kc as R,lc as i,mc as r,nc as A,rc as oe,wb as a,xb as te,yc as H,zc as ye}from"./chunk-LG2ZA55B.js";var Re=["*"],Oe=/^[\dA-ZÄÖÜ]{1,3}[ -]?[\dA-Z]{1,5}[ -]?[\dA-Z]{1,5}$/i,Ie=/^[A-ZÄÖÜ]{1,3}-[A-Z]{1,2} \d{1,4}[EH]?$/i,Te=/^.+$/,Be={de_standard:Ie,de_special:Oe,de_season:Ie,other:Te,euro:Te};function ie(e){return h=>!h.value||Be[e].test(h.value)?null:{nxLicensePlateError:!0}}var L=(()=>{class e{constructor(){this.type="other"}validate(n){return ie(this.type)(n)}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275dir=xe({type:e,selectors:[["","nxLicensePlate",""]],inputs:{type:[0,"nxLicensePlate","type"]},features:[Ce([{provide:Ne,useExisting:e,multi:!0}])]})}}return e})(),F=(()=>{class e{constructor(n){this._formField=n}get _disabled(){return this._formField._control?.disabled}get _hasOutline(){return this._formField.appearance==="outline"}static{this.\u0275fac=function(o){return new(o||e)(te(x))}}static{this.\u0275cmp=u({type:e,selectors:[["nx-licence-plate-euro-prefix"]],hostVars:4,hostBindings:function(o,t){o&2&&ne("is-disabled",t._disabled)("has-outline",t._hasOutline)},ngContentSelectors:Re,decls:1,vars:0,template:function(o,t){o&1&&(ye(),he(0))},styles:["[_nghost-%COMP%]{display:flex;align-items:center;justify-content:center;text-transform:uppercase;overflow:hidden;background-color:var(--licence-plate-prefix-background);height:100%;min-width:24px;max-width:40px;border-radius:4px;padding:0 4px;font-size:var(--paragraph-03-font-size);line-height:var(--paragraph-03-line-height);font-weight:var(--paragraph-03-font-weight);letter-spacing:var(--paragraph-03-letter-spacing);color:var(--licence-plate-prefix-color)}.has-outline[_nghost-%COMP%]{margin-left:-7px;border-radius:3px 0 0 3px}.is-disabled[_nghost-%COMP%]{-webkit-text-fill-color:var(--licence-plate-prefix-color);color:var(--licence-plate-prefix-color);background-color:var(--licence-plate-prefix-background);opacity:.4}"],changeDetection:0})}}return e})(),B=(()=>{class e{get _disabled(){return this._formField._control?.disabled}get _hasOutline(){return this._formField.appearance==="outline"}constructor(n){this._formField=n,this.startMonth=1,this.endMonth=1}_format(n){return typeof n!="number"?"":n>=10?n.toString():"0"+n}static{this.\u0275fac=function(o){return new(o||e)(te(x))}}static{this.\u0275cmp=u({type:e,selectors:[["nx-licence-plate-season-suffix"]],hostVars:4,hostBindings:function(o,t){o&2&&ne("is-disabled",t._disabled)("has-outline",t._hasOutline)},inputs:{startMonth:"startMonth",endMonth:"endMonth"},decls:4,vars:2,template:function(o,t){o&1&&(i(0,"span"),m(1),r(),i(2,"span"),m(3),r()),o&2&&(a(),k(t._format(t.startMonth)),a(2),k(t._format(t.endMonth)))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;justify-content:center;font-size:var(--paragraph-05-font-size);line-height:var(--paragraph-05-line-height);font-weight:var(--paragraph-05-font-weight);letter-spacing:var(--paragraph-05-letter-spacing);line-height:.875rem;color:var(--text-01)}span[_ngcontent-%COMP%]{width:14px}span[_ngcontent-%COMP%]:first-child{border-bottom:1px solid}.has-outline[_nghost-%COMP%]{font-size:var(--paragraph-04-font-size);line-height:var(--paragraph-04-line-height);font-weight:var(--paragraph-04-font-weight);letter-spacing:var(--paragraph-04-letter-spacing);line-height:1rem}.is-disabled[_nghost-%COMP%]   span[_ngcontent-%COMP%]{border-color:var(--formfield-disabled-border-color)}"],changeDetection:0})}}return e})(),We=(()=>{class e{static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275mod=K({type:e})}static{this.\u0275inj=J({imports:[ve]})}}return e})();var re=(()=>{class e{constructor(){this.disabled=!0,this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-disabled-example"]],decls:14,vars:5,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_standard",3,"ngModelChange","disabled","ngModel"],["nxFormfieldSuffix","",3,"startMonth","endMonth"],["nxFormfieldHint",""],["nxFormfieldError",""],["name","disabled",1,"nx-margin-top-s",3,"ngModelChange","ngModel"]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-licence-plate-euro-prefix",4),m(5,"D"),r(),i(6,"input",5),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),A(7,"nx-licence-plate-season-suffix",6),i(8,"span",7),m(9,"Format: M-AA 1234"),r(),i(10,"nx-error",8),m(11,'Please enter a license plate number in the format "M-AA 1234".'),r()(),i(12,"nx-checkbox",9),d("ngModelChange",function(l){return p(t.disabled,l)||(t.disabled=l),l}),m(13," Disabled "),r()()()()),o&2&&(a(6),f("disabled",t.disabled),c("ngModel",t.value),a(),f("startMonth",1)("endMonth",10),a(5),c("ngModel",t.disabled))},dependencies:[P,_,M,x,F,S,E,y,C,v,w,L,B,O,D,N,g,ee],encapsulation:2})}}return e})();function Ve(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.country),a(),b(" ",n.countryName," ")}}var ae=(()=>{class e{constructor(){this.country="A",this.countriesList=[{country:"A",countryName:"Austria"},{country:"B",countryName:"Belgium"},{country:"BG",countryName:"Bulgaria"},{country:"HR",countryName:"Croatia"},{country:"CY",countryName:"Cyprus"},{country:"CZ",countryName:"Czech Republic"},{country:"DK",countryName:"Denmark"},{country:"EST",countryName:"Estonia"},{country:"FIN",countryName:"Finland"},{country:"F",countryName:"France"},{country:"GR",countryName:"Greece"},{country:"H",countryName:"Hungary"},{country:"IRL",countryName:"Ireland"},{country:"I",countryName:"Italy"},{country:"LV",countryName:"Latvia"},{country:"LT",countryName:"Lithuania"},{country:"L",countryName:"Luxembourg"},{country:"M",countryName:"Malta"},{country:"NL",countryName:"Netherlands"},{country:"N",countryName:"Norway"},{country:"PL",countryName:"Poland"},{country:"P",countryName:"Portugal"},{country:"RO",countryName:"Romania"},{country:"SK",countryName:"Slovakia"},{country:"SLO",countryName:"Slovenia"},{country:"E",countryName:"Spain"},{country:"S",countryName:"Sweden"},{country:"UA",countryName:"Ukraine"}],this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-euro-example"]],decls:15,vars:3,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","Country"],[3,"valueChange","value"],[3,"value"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","euro",3,"ngModelChange","ngModel"],["nxFormfieldError",""]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),d("valueChange",function(l){return p(t.country,l)||(t.country=l),l}),W(5,Ve,2,2,"nx-dropdown-item",5,T),r()()()(),i(7,"div",1)(8,"div",2)(9,"nx-formfield",6)(10,"nx-licence-plate-euro-prefix",7),m(11),r(),i(12,"input",8),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),i(13,"nx-error",9),m(14,"Please enter a valid license plate number."),r()()()()()),o&2&&(a(4),c("value",t.country),a(),R(t.countriesList),a(6),k(t.country),a(),c("ngModel",t.value))},dependencies:[P,_,M,x,j,G,F,S,E,y,C,v,w,L,N,g],encapsulation:2})}}return e})();function He(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.type),a(),k(n.typeName)}}function ke(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.month),a(),b(" ",n.monthName," ")}}function Ge(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.month),a(),b(" ",n.monthName," ")}}function je(e,h){if(e&1){let n=oe();i(0,"div")(1,"nx-formfield",14)(2,"nx-dropdown",15),d("valueChange",function(t){Y(n);let s=H();return p(s.licencePlateModel.startDate,t)||(s.licencePlateModel.startDate=t),Z(t)}),W(3,ke,2,2,"nx-dropdown-item",5,T),r()(),i(5,"nx-formfield",16)(6,"nx-dropdown",15),d("valueChange",function(t){Y(n);let s=H();return p(s.licencePlateModel.endDate,t)||(s.licencePlateModel.endDate=t),Z(t)}),W(7,Ge,2,2,"nx-dropdown-item",5,T),r()()()}if(e&2){let n=H();a(2),c("value",n.licencePlateModel.startDate),a(),R(n.monthsOfYearList),a(3),c("value",n.licencePlateModel.endDate),a(),R(n.monthsOfYearList)}}function ze(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.country),a(),b(" ",n.countryName," ")}}function Je(e,h){if(e&1){let n=oe();i(0,"div")(1,"nx-formfield",17)(2,"nx-dropdown",15),d("valueChange",function(t){Y(n);let s=H();return p(s.licencePlateModel.country,t)||(s.licencePlateModel.country=t),Z(t)}),W(3,ze,2,2,"nx-dropdown-item",5,T),r()()()}if(e&2){let n=H();a(2),c("value",n.licencePlateModel.country),a(),R(n.countriesList)}}function Ye(e,h){if(e&1&&(i(0,"nx-licence-plate-euro-prefix",7),m(1),r()),e&2){let n=H();a(),b(" ",n.licencePlateModel.country," ")}}function Ze(e,h){if(e&1&&A(0,"nx-licence-plate-season-suffix",9),e&2){let n=H();f("startMonth",n.licencePlateModel.startDate)("endMonth",n.licencePlateModel.endDate)}}var le=(()=>{class e{constructor(){this.licencePlateModel={type:"de_standard",country:"D",value:"",startDate:1,endDate:2},this.licencePlateTypes=[{type:"de_standard",typeName:"Standard (Germany)"},{type:"de_season",typeName:"Seasonal (Germany)"},{type:"de_special",typeName:"Special (Germany)"},{type:"euro",typeName:"Euro"},{type:"other",typeName:"Other"}],this.monthsOfYearList=[{month:1,monthName:"January "},{month:2,monthName:"February"},{month:3,monthName:"March"},{month:4,monthName:"April"},{month:5,monthName:"May"},{month:6,monthName:"June"},{month:7,monthName:"July"},{month:8,monthName:"August"},{month:9,monthName:"September "},{month:10,monthName:"October"},{month:11,monthName:"November"},{month:12,monthName:"December"}],this.countriesList=[{country:"A",countryName:"Austria"},{country:"B",countryName:"Belgium"},{country:"BG",countryName:"Bulgaria"},{country:"HR",countryName:"Croatia"},{country:"CY",countryName:"Cyprus"},{country:"CZ",countryName:"Czech Republic"},{country:"DK",countryName:"Denmark"},{country:"EST",countryName:"Estonia"},{country:"FIN",countryName:"Finland"},{country:"F",countryName:"France"},{country:"GR",countryName:"Greece"},{country:"H",countryName:"Hungary"},{country:"IRL",countryName:"Ireland"},{country:"I",countryName:"Italy"},{country:"LV",countryName:"Latvia"},{country:"LT",countryName:"Lithuania"},{country:"L",countryName:"Luxembourg"},{country:"M",countryName:"Malta"},{country:"NL",countryName:"Netherlands"},{country:"N",countryName:"Norway"},{country:"PL",countryName:"Poland"},{country:"P",countryName:"Portugal"},{country:"RO",countryName:"Romania"},{country:"SK",countryName:"Slovakia"},{country:"SLO",countryName:"Slovenia"},{country:"E",countryName:"Spain"},{country:"S",countryName:"Sweden"},{country:"UA",countryName:"Ukraine"}]}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-expert-example"]],decls:23,vars:10,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,4","colOffset","0,0,1,4"],["label","Licence plate types","appearance","outline","floatLabel","always"],["placeholder","Choose a type",3,"valueChange","value"],[3,"value"],["label","License Plate","appearance","outline","floatLabel","always"],["nxFormfieldPrefix",""],["nxInput","",3,"nxLicensePlate","ngModel"],["nxFormfieldSuffix","",3,"startMonth","endMonth"],["nxFormfieldHint",""],["nxFormfieldError",""],["nxLayout","grid maxwidth",1,"nx-margin-top-s"],["nxRow","",1,"example-controls"],["label","Start date","appearance","outline","floatLabel","always"],[3,"valueChange","value"],["label","End date","appearance","outline","floatLabel","always"],["label","Country","appearance","outline","floatLabel","always"]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),d("valueChange",function(l){return p(t.licencePlateModel.type,l)||(t.licencePlateModel.type=l),l}),W(5,He,2,2,"nx-dropdown-item",5,T),r()(),U(7,je,9,2,"div")(8,Je,5,1,"div"),i(9,"nx-formfield",6),U(10,Ye,2,1,"nx-licence-plate-euro-prefix",7),A(11,"input",8),U(12,Ze,1,2,"nx-licence-plate-season-suffix",9),i(13,"span",10),m(14,"Format: M-AA 1234"),r(),i(15,"nx-error",11),m(16,'Please enter a license plate number in the format "M-AA 1234".'),r()()()()(),i(17,"div",12)(18,"div",13)(19,"div",2)(20,"pre"),m(21),X(22,"json"),r()()()()),o&2&&(a(4),c("value",t.licencePlateModel.type),a(),R(t.licencePlateTypes),a(2),z(t.licencePlateModel.type==="de_season"?7:-1),a(),z(t.licencePlateModel.type==="euro"?8:-1),a(2),z(t.licencePlateModel.type!=="other"?10:-1),a(),f("nxLicensePlate",t.licencePlateModel.type)("ngModel",t.licencePlateModel.value),a(),z(t.licencePlateModel.type==="de_season"?12:-1),a(9),b("Licence plate model value: ",q(22,8,t.licencePlateModel),""))},dependencies:[P,_,M,x,j,G,F,S,E,y,C,v,w,L,B,O,D,N,g,Q],encapsulation:2})}}return e})();var me=(()=>{class e{constructor(){this.disabled=!1,this.readonly=!1,this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-expert-states-example"]],decls:16,vars:7,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,4","colOffset","0,0,1,4"],["label","License Plate","appearance","outline","floatLabel","always"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_standard",3,"ngModelChange","disabled","readonly","ngModel"],["nxFormfieldSuffix","",3,"startMonth","endMonth"],["nxFormfieldHint",""],["nxFormfieldError",""],["name","disabled",1,"nx-margin-top-s",3,"ngModelChange","ngModel"],["name","readonly",1,"nx-margin-top-s",3,"ngModelChange","ngModel"]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-licence-plate-euro-prefix",4),m(5,"D"),r(),i(6,"input",5),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),A(7,"nx-licence-plate-season-suffix",6),i(8,"span",7),m(9,"Format: M-AA 1234"),r(),i(10,"nx-error",8),m(11,'Please enter a license plate number in the format "M-AA 1234".'),r()(),i(12,"nx-checkbox",9),d("ngModelChange",function(l){return p(t.disabled,l)||(t.disabled=l),l}),m(13," Disabled "),r(),i(14,"nx-checkbox",10),d("ngModelChange",function(l){return p(t.readonly,l)||(t.readonly=l),l}),m(15," Readonly "),r()()()()),o&2&&(a(6),f("disabled",t.disabled)("readonly",t.readonly),c("ngModel",t.value),a(),f("startMonth",1)("endMonth",10),a(5),c("ngModel",t.disabled),a(2),c("ngModel",t.readonly))},dependencies:[P,_,M,x,F,S,E,y,C,v,w,L,B,O,D,N,g,ee],encapsulation:2})}}return e})();var ce=(()=>{class e{constructor(){this.model=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-ngmodel-example"]],decls:16,vars:4,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_standard",3,"ngModelChange","ngModel"],["nxFormfieldSuffix","",3,"startMonth","endMonth"],["nxFormfieldHint",""],["nxFormfieldError",""],["nxRow","",1,"example-controls"]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-licence-plate-euro-prefix",4),m(5,"D"),r(),i(6,"input",5),d("ngModelChange",function(l){return p(t.model,l)||(t.model=l),l}),r(),A(7,"nx-licence-plate-season-suffix",6),i(8,"span",7),m(9,"Format: M-AA 1234"),r(),i(10,"nx-error",8),m(11,'Please enter a license plate number in the format "M-AA 1234".'),r()()()(),i(12,"div",9)(13,"div",2)(14,"pre"),m(15),r()()()()),o&2&&(a(6),c("ngModel",t.model),a(),f("startMonth",1)("endMonth",10),a(8),b("Licence plate value: ",t.model,""))},dependencies:[P,_,M,x,F,S,E,y,C,v,w,L,B,O,D,N,g],encapsulation:2})}}return e})();var pe=(()=>{class e{constructor(){this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-other-example"]],decls:7,vars:1,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","License Plate"],["nxInput","","nxLicensePlate","other",3,"ngModelChange","ngModel"],["nxFormfieldError",""]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"input",4),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),i(5,"nx-error",5),m(6,"Please enter a license plate number."),r()()()()()),o&2&&(a(4),c("ngModel",t.value))},dependencies:[P,_,M,x,E,y,C,v,w,L,N,g],encapsulation:2})}}return e})();var de=(()=>{class e{constructor(){this.licencePlateForm=new Pe({licencePlateInput:new _e("",ie("de_standard"))})}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-reactive-example"]],decls:17,vars:4,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],[3,"formGroup"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_standard","formControlName","licencePlateInput"],["nxFormfieldHint",""],["nxFormfieldError",""],["nxRow","",1,"example-controls","nx-margin-top-s"]],template:function(o,t){if(o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"form",3)(4,"nx-formfield",4)(5,"nx-licence-plate-euro-prefix",5),m(6,"D"),r(),A(7,"input",6),i(8,"span",7),m(9,"Format: M-AA 1234"),r(),i(10,"nx-error",8),m(11,'Please enter a license plate number in the format "M-AA 1234".'),r()()()()(),i(12,"div",9)(13,"div",2)(14,"pre"),m(15),X(16,"json"),r()()()()),o&2){let s;a(3),f("formGroup",t.licencePlateForm),a(12),b("Licence plate value: ",q(16,2,(s=t.licencePlateForm.get("licencePlateInput"))==null?null:s.value),"")}},dependencies:[P,_,M,y,Me,C,v,ge,$,Ee,Le,x,F,S,E,L,D,N,g,Q],encapsulation:2})}}return e})();function Ke(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.month),a(),b(" ",n.monthName," ")}}function Ue(e,h){if(e&1&&(i(0,"nx-dropdown-item",5),m(1),r()),e&2){let n=h.$implicit;f("value",n.month),a(),b(" ",n.monthName," ")}}var se=(()=>{class e{constructor(){this.monthsOfYearList=[{month:1,monthName:"January"},{month:2,monthName:"February"},{month:3,monthName:"March"},{month:4,monthName:"April"},{month:5,monthName:"May"},{month:6,monthName:"June"},{month:7,monthName:"July"},{month:8,monthName:"August"},{month:9,monthName:"September"},{month:10,monthName:"October"},{month:11,monthName:"November"},{month:12,monthName:"December"}],this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-seasonal-example"]],decls:22,vars:5,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","Start date"],[3,"valueChange","value"],[3,"value"],["label","End date"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_season",3,"ngModelChange","ngModel"],["nxFormfieldSuffix","",3,"startMonth","endMonth"],["nxFormfieldHint",""],["nxFormfieldError",""]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),d("valueChange",function(l){return p(t.startMonth,l)||(t.startMonth=l),l}),W(5,Ke,2,2,"nx-dropdown-item",5,T),r()(),i(7,"nx-formfield",6)(8,"nx-dropdown",4),d("valueChange",function(l){return p(t.endMonth,l)||(t.endMonth=l),l}),W(9,Ue,2,2,"nx-dropdown-item",5,T),r()()()(),i(11,"div",1)(12,"div",2)(13,"nx-formfield",7)(14,"nx-licence-plate-euro-prefix",8),m(15,"D"),r(),i(16,"input",9),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),A(17,"nx-licence-plate-season-suffix",10),i(18,"span",11),m(19,"Format: M-AA 1234"),r(),i(20,"nx-error",12),m(21,'Please enter a license plate number in the format "M-AA 1234".'),r()()()()()),o&2&&(a(4),c("value",t.startMonth),a(),R(t.monthsOfYearList),a(3),c("value",t.endMonth),a(),R(t.monthsOfYearList),a(7),c("ngModel",t.value),a(),f("startMonth",t.startMonth)("endMonth",t.endMonth))},dependencies:[P,_,M,x,j,G,F,S,E,y,C,v,w,L,B,O,D,N,g],encapsulation:2})}}return e})();var ue=(()=>{class e{constructor(){this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-special-example"]],decls:11,vars:1,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_special",3,"ngModelChange","ngModel"],["nxFormfieldHint",""],["nxFormfieldError",""]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-licence-plate-euro-prefix",4),m(5,"D"),r(),i(6,"input",5),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),i(7,"span",6),m(8,"Format: M-AA 1234"),r(),i(9,"nx-error",7),m(10,'Please enter a license plate number in the format "M-AA 1234".'),r()()()()()),o&2&&(a(6),c("ngModel",t.value))},dependencies:[P,_,M,x,F,S,E,y,C,v,w,L,D,N,g],encapsulation:2})}}return e})();var fe=(()=>{class e{constructor(){this.value=""}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275cmp=u({type:e,selectors:[["licence-plate-standard-example"]],decls:11,vars:1,consts:[["nxLayout","grid maxwidth"],["nxRow",""],["nxCol","12,12,10,6","colOffset","0,0,1,3"],["label","License Plate"],["nxFormfieldPrefix",""],["nxInput","","nxLicensePlate","de_standard",3,"ngModelChange","ngModel"],["nxFormfieldHint",""],["nxFormfieldError",""]],template:function(o,t){o&1&&(i(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-licence-plate-euro-prefix",4),m(5,"D"),r(),i(6,"input",5),d("ngModelChange",function(l){return p(t.value,l)||(t.value=l),l}),r(),i(7,"span",6),m(8,"Format: M-AA 1234"),r(),i(9,"nx-error",7),m(10,'Please enter a license plate number in the format "M-AA 1234".'),r()()()()()),o&2&&(a(6),c("ngModel",t.value))},dependencies:[P,_,M,x,F,S,E,y,C,v,w,L,D,N,g],encapsulation:2})}}return e})();var Xe=[fe,se,ue,pe,ae,ce,de,me,re,le],jn=(()=>{class e{static components(){return{"licence-plate-standard":fe,"licence-plate-seasonal":se,"licence-plate-special":ue,"licence-plate-other":pe,"licence-plate-euro":ae,"licence-plate-ngmodel":ce,"licence-plate-reactive":de,"licence-plate-expert":le,"licence-plate-expert-states":me,"licence-plate-disabled":re}}static{this.\u0275fac=function(o){return new(o||e)}}static{this.\u0275mod=K({type:e})}static{this.\u0275inj=J({imports:[We,be,y,$,De,Fe,Ae,we,Se,Xe]})}}return e})();export{jn as LicencePlateExamplesModule};