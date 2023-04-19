"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[4723],{4723:(P,O,a)=>{a.r(O),a.d(O,{DropdownExamplesModule:()=>U});var x=a(7823),d=a(4619),r=a(6566),J=a(9195),q=a(9508),n=a(4650),s=a(6895),i=a(4006),l=a(9561);function B(t,e){if(1&t&&(n.TgZ(0,"span"),n._uU(1),n.qZA()),2&t){const o=n.oxw();n.xp6(1),n.Oqu(null==o.customLabelDropdownValue?null:o.customLabelDropdownValue.prefix)}}function Q(t,e){if(1&t&&(n.TgZ(0,"nx-dropdown-item",7),n._uU(1),n.qZA()),2&t){const o=e.$implicit;n.Q6J("nxValue",o),n.xp6(1),n.AsE(" ",o.prefix," (",o.countryId,") ")}}class c{constructor(){this.telPrefixDemoData=[{prefix:"+1",countryId:"United States of America"},{prefix:"+49",countryId:"Germany"},{prefix:"+41",countryId:"Switzerland"}]}}c.\u0275fac=function(e){return new(e||c)},c.\u0275cmp=n.Xpm({type:c,selectors:[["dropdown-custom-label-example"]],decls:7,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Country Code"],[3,"ngModel","ngModelChange"],["nxClosedLabel",""],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.NdJ("ngModelChange",function(m){return o.customLabelDropdownValue=m}),n.YNc(5,B,2,1,"ng-template",5),n.YNc(6,Q,2,3,"nx-dropdown-item",6),n.qZA()()()()()),2&e&&(n.xp6(4),n.Q6J("ngModel",o.customLabelDropdownValue),n.xp6(2),n.Q6J("ngForOf",o.telPrefixDemoData))},dependencies:[d.Uu,d.cp,d.Zu,r.VM,s.sg,i.JJ,i.On,l.RH,l.yI,l.s7]});class w{constructor(){this.options=[{name:"BMW",id:1},{name:"Audi",id:2},{name:"Volvo",id:3},{name:"Mini",id:4}]}isOptionDisabled(e){return e.id%2==0}}function S(t,e){1&t&&n._UZ(0,"nx-dropdown-item",7),2&t&&n.Q6J("nxValue",e.$implicit)}w.\u0275fac=function(e){return new(e||w)},w.\u0275cmp=n.Xpm({type:w,selectors:[["dropdown-disabled-items-example"]],decls:27,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Disabled dropdown"],["nxDisabled","true"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxLabel","With disabled item"],["disabled","true","nxValue","BMW"],["nxLabel","With disabled multi item"],["selectValue","id","selectLabel","name",3,"options","selectDisabled"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4)(5,"nx-dropdown-item",5),n._uU(6,"B"),n.qZA(),n.TgZ(7,"nx-dropdown-item",6),n._uU(8,"A"),n.qZA(),n.TgZ(9,"nx-dropdown-item",7),n._uU(10,"V"),n.qZA(),n.TgZ(11,"nx-dropdown-item",8),n._uU(12,"M"),n.qZA()()()(),n.TgZ(13,"div",2)(14,"nx-formfield",9)(15,"nx-dropdown")(16,"nx-dropdown-item",10),n._uU(17,"B"),n.qZA(),n.TgZ(18,"nx-dropdown-item",6),n._uU(19,"A"),n.qZA(),n.TgZ(20,"nx-dropdown-item",7),n._uU(21,"V"),n.qZA(),n.TgZ(22,"nx-dropdown-item",8),n._uU(23,"M"),n.qZA()()()(),n.TgZ(24,"div",2)(25,"nx-formfield",11),n._UZ(26,"nx-multi-select",12),n.qZA()()()()),2&e&&(n.xp6(26),n.Q6J("options",o.options)("selectDisabled",o.isOptionDisabled))},dependencies:[d.Uu,d.cp,d.lh,r.VM,l.RH,l.yI,l.s7]});class g{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}}function W(t,e){1&t&&n._UZ(0,"nx-dropdown-item",6),2&t&&n.Q6J("nxValue",e.$implicit)}g.\u0275fac=function(e){return new(e||g)},g.\u0275cmp=n.Xpm({type:g,selectors:[["dropdown-filter-example"]],decls:9,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter"],[3,"nxValue",4,"ngFor","ngForOf"],["filter","","filterPlaceholder","Type to search car",3,"options"],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.YNc(5,S,1,1,"nx-dropdown-item",5),n.qZA()()(),n.TgZ(6,"div",2)(7,"nx-formfield",3),n._UZ(8,"nx-multi-select",6),n.qZA()()()()),2&e&&(n.xp6(4),n.Q6J("nxShowFilter",!0),n.xp6(1),n.Q6J("ngForOf",o.options),n.xp6(3),n.Q6J("options",o.options))},dependencies:[d.Uu,d.cp,d.lh,r.VM,s.sg,l.RH,l.yI,l.s7]});class _{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}myFilter(e,o){return null!==o.match(new RegExp("^"+e,"g"))}}_.\u0275fac=function(e){return new(e||_)},_.\u0275cmp=n.Xpm({type:_,selectors:[["dropdown-filter-custom-example"]],decls:6,vars:3,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter","filterFn"],[3,"nxValue",4,"ngFor","ngForOf"],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.YNc(5,W,1,1,"nx-dropdown-item",5),n.qZA()()()()()),2&e&&(n.xp6(4),n.Q6J("nxShowFilter",!0)("filterFn",o.myFilter),n.xp6(1),n.Q6J("ngForOf",o.demoData))},dependencies:[d.Uu,d.cp,r.VM,s.sg,l.RH,l.yI,l.s7]});class f{constructor(){this.form=(new i.qu).group({dropdown:["BMW"]}),this.focusing=!1}onFocusOut(){this.focusing=!1}onFocus(){this.focusing=!0}}f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=n.Xpm({type:f,selectors:[["dropdown-focus-out-example"]],decls:14,vars:2,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["formControlName","dropdown",3,"focusOut","focus"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxContext","info","nxFormfieldNote",""]],template:function(e,o){1&e&&(n.TgZ(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),n.NdJ("focusOut",function(){return o.onFocusOut()})("focus",function(){return o.onFocus()}),n.TgZ(6,"nx-dropdown-item"),n._uU(7,"CLEAR VALUE"),n.qZA(),n._UZ(8,"nx-dropdown-item",6)(9,"nx-dropdown-item",7)(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9),n.qZA(),n.TgZ(12,"nx-message",10),n._uU(13),n.qZA()()()()()()),2&e&&(n.Q6J("formGroup",o.form),n.xp6(13),n.hij(" Focusing: ",o.focusing," "))},dependencies:[d.Uu,d.cp,r.VM,r.XO,i._Y,i.JJ,i.JL,i.sg,i.u,l.RH,l.yI,l.s7]});class Z{constructor(){this.testBind="Catfish"}}Z.\u0275fac=function(e){return new(e||Z)},Z.\u0275cmp=n.Xpm({type:Z,selectors:[["dropdown-group-example"]],decls:13,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Animals"],[3,"nxValue","nxValueChange"],["nxLabel","Birds"],["disabled","true","nxValue","Parrot"],["nxValue","Pidgin"],["nxValue","Swallow"],["nxLabel","Fish"],["nxValue","Salmon"],["nxValue","Mackerel"],["nxValue","Catfish"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.NdJ("nxValueChange",function(m){return o.testBind=m}),n.TgZ(5,"nx-dropdown-group",5),n._UZ(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8),n.qZA(),n.TgZ(9,"nx-dropdown-group",9),n._UZ(10,"nx-dropdown-item",10)(11,"nx-dropdown-item",11)(12,"nx-dropdown-item",12),n.qZA()()()()()()),2&e&&(n.xp6(4),n.Q6J("nxValue",o.testBind))},dependencies:[d.Uu,d.cp,d.gg,r.VM,l.RH,l.yI,l.s7]});class C{constructor(){this.items=[];for(let e=1;e<=500;e++)this.items.push({label:`Item ${e}`,value:e})}}C.\u0275fac=function(e){return new(e||C)},C.\u0275cmp=n.Xpm({type:C,selectors:[["dropdown-lazy-example"]],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["nxLabel","Lazy options"],[3,"options"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),n._UZ(4,"nx-dropdown",4),n.qZA()()()()),2&e&&(n.xp6(4),n.Q6J("options",o.items))},dependencies:[d.Uu,r.VM,l.RH,l.yI,l.s7]});class v{constructor(){this.options=["Apple","Orange","Plum","Cherry"],this.complexOptions=[{name:"Apple",id:1},{name:"Orange",id:2},{name:"Plum",id:3},{name:"Cherry",id:4}]}selectLabel(e){return e.name}selectValue(e){return e.id}}v.\u0275fac=function(e){return new(e||v)},v.\u0275cmp=n.Xpm({type:v,selectors:[["dropdown-multi-select-example"]],decls:12,vars:5,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["nxLabel","Fruits"],[3,"options"],["selectLabel","name","selectValue","id",3,"options"],["placeholder","Choose options",3,"options","selectLabel","selectValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),n._UZ(4,"nx-multi-select",4),n.qZA()()(),n.TgZ(5,"div",1)(6,"div",2)(7,"nx-formfield",3),n._UZ(8,"nx-multi-select",5),n.qZA()(),n.TgZ(9,"div",2)(10,"nx-formfield",3),n._UZ(11,"nx-multi-select",6),n.qZA()()()()),2&e&&(n.xp6(4),n.Q6J("options",o.options),n.xp6(4),n.Q6J("options",o.complexOptions),n.xp6(3),n.Q6J("options",o.complexOptions)("selectLabel",o.selectLabel)("selectValue",o.selectValue))},dependencies:[d.lh,r.VM,l.RH,l.yI,l.s7]});class T{}T.\u0275fac=function(e){return new(e||T)},T.\u0275cmp=n.Xpm({type:T,selectors:[["dropdown-negative-example"]],decls:17,vars:1,consts:[[1,"docs-inverse-container"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand","nxStyle","negative"],["nxStyle","negative"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxStyle","negative",3,"nxDisabled"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5),n._UZ(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9),n.qZA()()(),n.TgZ(10,"div",3)(11,"nx-formfield",4)(12,"nx-dropdown",10),n._UZ(13,"nx-dropdown-item",6)(14,"nx-dropdown-item",7)(15,"nx-dropdown-item",8)(16,"nx-dropdown-item",9),n.qZA()()()()()()),2&e&&(n.xp6(12),n.Q6J("nxDisabled",!0))},dependencies:[d.Uu,d.cp,r.VM,l.RH,l.yI,l.s7]});var I=a(4188);const N=["exampleErrorNgModel"];function X(t,e){1&t&&n._UZ(0,"nx-dropdown-item",23),2&t&&n.Q6J("nxValue",e.$implicit)}function H(t,e){1&t&&n._UZ(0,"nx-dropdown-item",23),2&t&&n.Q6J("nxValue",e.$implicit)}function j(t,e){1&t&&n._UZ(0,"nx-dropdown-item",23),2&t&&n.Q6J("nxValue",e.$implicit)}function K(t,e){1&t&&n._UZ(0,"nx-dropdown-item",23),2&t&&n.Q6J("nxValue",e.$implicit)}function Y(t,e){1&t&&n._UZ(0,"nx-dropdown-item",23),2&t&&n.Q6J("nxValue",e.$implicit)}function G(t,e){if(1&t&&(n.TgZ(0,"nx-dropdown-group",24),n.YNc(1,Y,1,1,"nx-dropdown-item",5),n.qZA()),2&t){const o=e.$implicit;n.Q6J("nxLabel",o.label),n.xp6(1),n.Q6J("ngForOf",o.items)}}class h{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.groups=[{label:"Birds",items:["Parrot","Pidgin","Swallow"]},{label:"Fish",items:["Salmon","Mackerel","Catfish"]}],this.model="Catfish",this.brands=[]}ngAfterContentInit(){this.exampleErrorNgModel.ngControl?.control?.markAsTouched()}}function $(t,e){1&t&&n._UZ(0,"nx-dropdown-item",7),2&t&&n.Q6J("nxValue",e.$implicit)}function z(t,e){1&t&&n._UZ(0,"nx-dropdown-item",7),2&t&&n.Q6J("nxValue",e.$implicit)}h.\u0275fac=function(e){return new(e||h)},h.\u0275cmp=n.Xpm({type:h,selectors:[["dropdown-outline-example"]],viewQuery:function(e,o){if(1&e&&n.Gf(N,7),2&e){let p;n.iGM(p=n.CRH())&&(o.exampleErrorNgModel=p.first)}},features:[n._Bn([{provide:r.i7,useValue:{appearance:"outline",nxFloatLabel:"always"}}])],decls:44,vars:10,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12"],["nxHeadline","subsection-xsmall"],["nxLabel","Car brand"],[3,"nxValue",4,"ngFor","ngForOf"],["nxLabel","Readonly Dropdown"],["nxValue","BMW","nxReadonly",""],["nxValue","BMW"],["nxValue","Audi"],["nxLabel","Disabled Dropdown"],["nxValue","BMW","nxDisabled",""],["nxLabel","Error dropdown"],["required","",3,"ngModel","ngModelChange"],["exampleErrorNgModel",""],["nxFormfieldError","","appearance","text"],["nxLabel","With icon dropdown"],["nxFormfieldAppendix","","name","info-circle-o"],["nxFilterPlaceholder","Type to search car",3,"nxShowFilter"],["nxLabel","Animals"],[3,"nxValue","nxValueChange"],[3,"nxLabel",4,"ngFor","ngForOf"],["filter","",3,"ngModel","options","ngModelChange"],[3,"nxValue"],[3,"nxLabel"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4",3),n._uU(4,"Standard dropdown"),n.qZA(),n.TgZ(5,"nx-formfield",4)(6,"nx-dropdown"),n.YNc(7,X,1,1,"nx-dropdown-item",5),n.qZA()(),n.TgZ(8,"nx-formfield",6)(9,"nx-dropdown",7),n._UZ(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9),n.qZA()(),n.TgZ(12,"nx-formfield",10)(13,"nx-dropdown",11),n._UZ(14,"nx-dropdown-item",8)(15,"nx-dropdown-item",9),n.qZA()(),n.TgZ(16,"nx-formfield",12)(17,"nx-dropdown",13,14),n.NdJ("ngModelChange",function(m){return o.modelBlank=m}),n.YNc(19,H,1,1,"nx-dropdown-item",5),n.qZA(),n.TgZ(20,"nx-error",15),n._uU(21," Error message "),n.qZA()(),n.TgZ(22,"nx-formfield",16)(23,"nx-dropdown"),n.YNc(24,j,1,1,"nx-dropdown-item",5),n.qZA(),n._UZ(25,"nx-icon",17),n.qZA()()(),n.TgZ(26,"div",1)(27,"div",2)(28,"h4",3),n._uU(29,"Filter dropdown"),n.qZA(),n.TgZ(30,"nx-formfield",4)(31,"nx-dropdown",18),n.YNc(32,K,1,1,"nx-dropdown-item",5),n.qZA()()(),n.TgZ(33,"div",2)(34,"h4",3),n._uU(35,"Group dropdown"),n.qZA(),n.TgZ(36,"nx-formfield",19)(37,"nx-dropdown",20),n.NdJ("nxValueChange",function(m){return o.model=m}),n.YNc(38,G,2,2,"nx-dropdown-group",21),n.qZA()()(),n.TgZ(39,"div",2)(40,"h4",3),n._uU(41,"Multi select dropdown"),n.qZA(),n.TgZ(42,"nx-formfield",4)(43,"nx-multi-select",22),n.NdJ("ngModelChange",function(m){return o.brands=m}),n.qZA()()()()()),2&e&&(n.xp6(7),n.Q6J("ngForOf",o.options),n.xp6(10),n.Q6J("ngModel",o.modelBlank),n.xp6(2),n.Q6J("ngForOf",o.options),n.xp6(5),n.Q6J("ngForOf",o.options),n.xp6(7),n.Q6J("nxShowFilter",!0),n.xp6(1),n.Q6J("ngForOf",o.options),n.xp6(5),n.Q6J("nxValue",o.model),n.xp6(1),n.Q6J("ngForOf",o.groups),n.xp6(5),n.Q6J("ngModel",o.brands)("options",o.options))},dependencies:[d.Uu,d.cp,d.gg,d.lh,r.VM,r.Sr,r.nZ,x.vV,s.sg,i.JJ,i.Q7,i.On,I.s,l.RH,l.yI,l.s7,J.O8],styles:["[_nghost-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:12px}"]});class M{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}}M.\u0275fac=function(e){return new(e||M)},M.\u0275cmp=n.Xpm({type:M,selectors:[["dropdown-placeholder-example"]],decls:10,vars:2,consts:[["nxLayout","grid"],["nxRow","",2,"align-items","flex-end"],["nxCol","12, 12, 6"],["nxLabel","Car brand"],["placeholder","Choose a car brand"],[3,"nxValue",4,"ngFor","ngForOf"],["nxLabel","Car brand","appearance","outline"],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.YNc(5,$,1,1,"nx-dropdown-item",5),n.qZA()()(),n.TgZ(6,"div",2)(7,"nx-formfield",6)(8,"nx-dropdown",4),n.YNc(9,z,1,1,"nx-dropdown-item",5),n.qZA()()()()()),2&e&&(n.xp6(5),n.Q6J("ngForOf",o.demoData),n.xp6(4),n.Q6J("ngForOf",o.demoData))},dependencies:[d.Uu,d.cp,r.VM,s.sg,l.RH,l.yI,l.s7]});var R=a(690);class V{constructor(){this.form=(new i.qu).group({dropdown:["BMW",i.kI.required]})}patch(e){this.form.patchValue({dropdown:e})}}function k(t,e){1&t&&n._UZ(0,"nx-dropdown-item",10),2&t&&n.Q6J("nxValue",e.$implicit)}V.\u0275fac=function(e){return new(e||V)},V.\u0275cmp=n.Xpm({type:V,selectors:[["dropdown-reactive-example"]],decls:31,vars:7,consts:[[3,"formGroup"],["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["formControlName","dropdown"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxFormfieldError",""],["nxContext","info","nxFormfieldNote",""],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["reactiveInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(e,o){if(1&e){const p=n.EpF();n.TgZ(0,"form",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"nx-formfield",4)(5,"nx-dropdown",5)(6,"nx-dropdown-item"),n._uU(7,"CLEAR VALUE"),n.qZA(),n._UZ(8,"nx-dropdown-item",6)(9,"nx-dropdown-item",7)(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9),n.qZA(),n.TgZ(12,"nx-error",10),n._uU(13," Please select a value "),n.qZA(),n.TgZ(14,"nx-message",11),n._uU(15," This field is required "),n.qZA()()()(),n.TgZ(16,"div",2)(17,"div",12)(18,"p",13),n._uU(19),n.ALo(20,"json"),n.qZA(),n.TgZ(21,"p",13),n._uU(22),n.ALo(23,"json"),n.qZA(),n.TgZ(24,"p",14),n._uU(25," Try to set the value to BMW, Audi, Volvo or Mini. "),n.qZA(),n.TgZ(26,"div",15),n._UZ(27,"input",16,17),n.TgZ(29,"button",18),n.NdJ("click",function(){n.CHM(p);const u=n.MAs(28);return n.KtG(o.patch(u.value))}),n._uU(30," Update "),n.qZA()()()()()()}2&e&&(n.Q6J("formGroup",o.form),n.xp6(19),n.hij("Form value: ",n.lcZ(20,3,o.form.value),""),n.xp6(3),n.hij(" Form status: ",n.lcZ(23,5,o.form.status)," "))},dependencies:[d.Uu,d.cp,r.VM,r.Sr,r.XO,x.vV,i._Y,i.JJ,i.JL,i.sg,i.u,R.XV,l.RH,l.yI,l.s7,s.Ts],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]});class y{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}toText(e){return e?e.toUpperCase():null}}y.\u0275fac=function(e){return new(e||y)},y.\u0275cmp=n.Xpm({type:y,selectors:[["dropdown-rendering-items-example"]],decls:24,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 4"],["nxLabel","Car brand"],[3,"nxValueFormatter"],[3,"nxValue",4,"ngFor","ngForOf"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.YNc(5,k,1,1,"nx-dropdown-item",5),n.qZA()()(),n.TgZ(6,"div",2)(7,"nx-formfield",3)(8,"nx-dropdown")(9,"nx-dropdown-item",6),n._uU(10,"B"),n.qZA(),n.TgZ(11,"nx-dropdown-item",7),n._uU(12,"A"),n.qZA(),n.TgZ(13,"nx-dropdown-item",8),n._uU(14,"V"),n.qZA(),n.TgZ(15,"nx-dropdown-item",9),n._uU(16,"M"),n.qZA()()()(),n.TgZ(17,"div",2)(18,"nx-formfield",3)(19,"nx-dropdown"),n._UZ(20,"nx-dropdown-item",6)(21,"nx-dropdown-item",7)(22,"nx-dropdown-item",8)(23,"nx-dropdown-item",9),n.qZA()()()()()),2&e&&(n.xp6(4),n.Q6J("nxValueFormatter",o.toText),n.xp6(1),n.Q6J("ngForOf",o.demoData))},dependencies:[d.Uu,d.cp,r.VM,s.sg,l.RH,l.yI,l.s7]});var nn=a(8184);class A{}A.\u0275fac=function(e){return new(e||A)},A.\u0275cmp=n.Xpm({type:A,selectors:[["dropdown-scroll-strategy-provider-example"]],features:[n._Bn([{provide:d.$L,useFactory:function en(t){return()=>t.scrollStrategies.close({threshold:100})},deps:[nn.aV]}])],decls:8,vars:0,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["nxLabel","Fruit"],["nxValue","Apple"],["nxValue","Orange"],["nxValue","Pear"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown"),n._UZ(5,"nx-dropdown-item",4)(6,"nx-dropdown-item",5)(7,"nx-dropdown-item",6),n.qZA()()()()())},dependencies:[d.Uu,d.cp,r.VM,l.RH,l.yI,l.s7]});class b{constructor(){this.demoData=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"],this.simpleBinding="Audi"}}function on(t,e){1&t&&n._UZ(0,"nx-dropdown-item",16),2&t&&n.Q6J("nxValue",e.$implicit)}b.\u0275fac=function(e){return new(e||b)},b.\u0275cmp=n.Xpm({type:b,selectors:[["dropdown-simple-binding-example"]],decls:21,vars:2,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],[3,"nxValue","nxValueChange"],["simpleDropdown",""],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxCol","12"],[1,"nx-margin-y-0"],[1,"nx-margin-top-0"],[1,"update-container"],["type","text"],["simpleInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(e,o){if(1&e){const p=n.EpF();n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4,5),n.NdJ("nxValueChange",function(u){return o.simpleBinding=u}),n._UZ(6,"nx-dropdown-item",6)(7,"nx-dropdown-item",7)(8,"nx-dropdown-item",8)(9,"nx-dropdown-item",9),n.qZA()()()(),n.TgZ(10,"div",1)(11,"div",10)(12,"p",11),n._uU(13),n.qZA(),n.TgZ(14,"p",12),n._uU(15," Try to set the value to BMW, Audi, Volvo or Mini. "),n.qZA(),n.TgZ(16,"div",13),n._UZ(17,"input",14,15),n.TgZ(19,"button",16),n.NdJ("click",function(){n.CHM(p);const u=n.MAs(18);return n.KtG(o.simpleBinding=u.value)}),n._uU(20," Update "),n.qZA()()()()()}if(2&e){const p=n.MAs(5);n.xp6(4),n.Q6J("nxValue",o.simpleBinding),n.xp6(9),n.hij(" Model value is: ",p.value," ")}},dependencies:[d.Uu,d.cp,r.VM,R.XV,l.RH,l.yI,l.s7],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]});class D{constructor(){this.options=["BMW","Audi","VW","Mercedes","Porsche","Tesla","Lada","Opel","Fiat","Ford","Kia","Toyota","Ferrari"]}toText(e){return e?e.toUpperCase():null}}D.\u0275fac=function(e){return new(e||D)},D.\u0275cmp=n.Xpm({type:D,selectors:[["dropdown-standard-example"]],decls:24,vars:2,consts:[["nxLayout","grid"],["nxRow","",1,"nx-margin-bottom-m"],["nxCol","12, 12, 6"],["nxLabel","Car brand"],[3,"nxValueFormatter"],[3,"nxValue",4,"ngFor","ngForOf"],["nxLabel","Preselected Dropdown"],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],["nxRow",""],["nxLabel","Readonly Dropdown"],["nxValue","BMW","nxReadonly",""],["nxLabel","Disabled Dropdown"],["nxValue","BMW","nxDisabled",""],[3,"nxValue"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3)(4,"nx-dropdown",4),n.YNc(5,on,1,1,"nx-dropdown-item",5),n.qZA()()(),n.TgZ(6,"div",2)(7,"nx-formfield",6)(8,"nx-dropdown",7),n._UZ(9,"nx-dropdown-item",7)(10,"nx-dropdown-item",8)(11,"nx-dropdown-item",9)(12,"nx-dropdown-item",10),n.qZA()()()(),n.TgZ(13,"div",11)(14,"div",2)(15,"nx-formfield",12)(16,"nx-dropdown",13),n._UZ(17,"nx-dropdown-item",7)(18,"nx-dropdown-item",8),n.qZA()()(),n.TgZ(19,"div",2)(20,"nx-formfield",14)(21,"nx-dropdown",15),n._UZ(22,"nx-dropdown-item",7)(23,"nx-dropdown-item",8),n.qZA()()()()()),2&e&&(n.xp6(4),n.Q6J("nxValueFormatter",o.toText),n.xp6(1),n.Q6J("ngForOf",o.options))},dependencies:[d.Uu,d.cp,r.VM,s.sg,l.RH,l.yI,l.s7]});class F{constructor(){this.ngModelBinding="Mini"}}F.\u0275fac=function(e){return new(e||F)},F.\u0275cmp=n.Xpm({type:F,selectors:[["dropdown-template-driven-example"]],decls:25,vars:5,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12,12,6"],["nxLabel","Car brand"],["name","test",3,"ngModel","ngModelChange"],["ngModelDropdown",""],["nxValue","BMW"],["nxValue","Audi"],["nxValue","Volvo"],["nxValue","Mini"],[1,"nx-margin-y-0"],["nxCol","12"],[1,"nx-margin-top-0","nx-margin-bottom-xs"],[1,"update-container"],["type","text"],["templateInput",""],["nxButton","primary small","type","button",1,"nx-margin-bottom-0",3,"click"]],template:function(e,o){if(1&e){const p=n.EpF();n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"form")(4,"nx-formfield",3)(5,"nx-dropdown",4,5),n.NdJ("ngModelChange",function(u){return o.ngModelBinding=u}),n._UZ(7,"nx-dropdown-item",6)(8,"nx-dropdown-item",7)(9,"nx-dropdown-item",8)(10,"nx-dropdown-item",9),n.qZA()()(),n.TgZ(11,"p",10),n._uU(12),n.qZA(),n.TgZ(13,"p",10),n._uU(14),n.ALo(15,"json"),n.qZA()()(),n.TgZ(16,"div",1)(17,"div",11)(18,"p",12),n._uU(19," Try to set the value to BMW, Audi, Volvo or Mini. "),n.qZA(),n.TgZ(20,"div",13),n._UZ(21,"input",14,15),n.TgZ(23,"button",16),n.NdJ("click",function(){n.CHM(p);const u=n.MAs(22);return n.KtG(o.ngModelBinding=u.value)}),n._uU(24," Update "),n.qZA()()()()()}if(2&e){const p=n.MAs(6);n.xp6(5),n.Q6J("ngModel",o.ngModelBinding),n.xp6(7),n.hij(" Current Value: ",p.value," "),n.xp6(2),n.hij("Model: ",n.lcZ(15,3,o.ngModelBinding),"")}},dependencies:[d.Uu,d.cp,r.VM,i._Y,i.JJ,i.JL,i.On,i.F,R.XV,l.RH,l.yI,l.s7,s.Ts],styles:["button[_ngcontent-%COMP%]{margin-left:4px}.update-container[_ngcontent-%COMP%]{display:flex}"]});class E{constructor(){this.model=[3],this.modelWithFilter=[],this.options=[{label:"Apple",id:1},{label:"Banana",id:2},{label:"Strawberry",id:3},{label:"Orange",id:4},{label:"Lemon",id:5},{label:"Grapefruit",id:6},{label:"Mango",id:7},{label:"Pineapple",id:8},{label:"Kiwi",id:9},{label:"Cherry",id:10},{label:"Blueberry",id:11},{label:"Avocado",id:12},{label:"Watermelon",id:13},{label:"Raspberry",id:14},{label:"Papaya",id:15}],this.control=new i.NI([],{validators:i.kI.minLength(3)})}selectLabel(e){return e.label}selectValue(e){return e.id}}E.\u0275fac=function(e){return new(e||E)},E.\u0275cmp=n.Xpm({type:E,selectors:[["multi-select-example"]],decls:27,vars:16,consts:[["appearance","outline","nxFloatLabel","always","nxLabel","Multi select"],["filter","","placeholder","Choose options","selectValue","id","selectLabel","label",3,"ngModel","options","ngModelChange"],["placeholder","Choose options",3,"ngModel","options","selectLabel","selectValue","ngModelChange"],["nxFloatLabel","always","nxLabel","Multi select with validation"],["placeholder","Choose options",3,"formControl","options","selectLabel","selectValue"],["nxFormfieldError",""]],template:function(e,o){1&e&&(n.TgZ(0,"h3"),n._uU(1,"With filter"),n.qZA(),n.TgZ(2,"nx-formfield",0)(3,"nx-multi-select",1),n.NdJ("ngModelChange",function(m){return o.modelWithFilter=m}),n.qZA()(),n.TgZ(4,"div"),n._uU(5," Selected options: "),n.TgZ(6,"pre"),n._uU(7),n.qZA()(),n.TgZ(8,"h3"),n._uU(9,"Without filter"),n.qZA(),n.TgZ(10,"nx-formfield",0)(11,"nx-multi-select",2),n.NdJ("ngModelChange",function(m){return o.model=m}),n.qZA()(),n.TgZ(12,"div"),n._uU(13," Selected options: "),n.TgZ(14,"pre"),n._uU(15),n.qZA()(),n.TgZ(16,"h3"),n._uU(17,"Reactive forms validation"),n.qZA(),n.TgZ(18,"nx-formfield",3),n._UZ(19,"nx-multi-select",4),n.TgZ(20,"nx-error",5),n._uU(21),n.ALo(22,"json"),n.qZA()(),n.TgZ(23,"div"),n._uU(24," Selected options: "),n.TgZ(25,"pre"),n._uU(26),n.qZA()()),2&e&&(n.xp6(3),n.Q6J("ngModel",o.modelWithFilter)("options",o.options),n.xp6(4),n.hij("[",o.modelWithFilter.join(", "),"]"),n.xp6(4),n.Q6J("ngModel",o.model)("options",o.options)("selectLabel",o.selectLabel)("selectValue",o.selectValue),n.xp6(4),n.hij("[",o.model.join(", "),"]"),n.xp6(4),n.Q6J("formControl",o.control)("options",o.options)("selectLabel",o.selectLabel)("selectValue",o.selectValue),n.xp6(2),n.hij("Error ",n.lcZ(22,14,o.control.errors),""),n.xp6(5),n.hij("[",null==o.control.value?null:o.control.value.join(", "),"]"))},dependencies:[d.lh,r.VM,r.Sr,x.vV,i.JJ,i.On,i.oH,s.Ts]});class L{constructor(){this.options=["Apple","Orange","Plum","Cherry"]}}L.\u0275fac=function(e){return new(e||L)},L.\u0275cmp=n.Xpm({type:L,selectors:[["multi-select-intl-example"]],features:[n._Bn([{provide:d.tQ,useClass:class ln extends d.tQ{constructor(){super(...arguments),this.selectAll="Alle ausw\xe4hlen",this.clearAll="Alle abw\xe4hlen"}}}])],decls:5,vars:1,consts:[["nxLayout","grid"],["nxRow",""],["nxCol","12, 12, 6"],["appearance","outline","nxFloatLabel","always","nxLabel","Fruits"],["filter","",3,"options"]],template:function(e,o){1&e&&(n.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"nx-formfield",3),n._UZ(4,"nx-multi-select",4),n.qZA()()()()),2&e&&(n.xp6(4),n.Q6J("options",o.options))},dependencies:[d.lh,r.VM,l.RH,l.yI,l.s7]});class U{static components(){return{"dropdown-custom-label":c,"dropdown-disabled-items":w,"dropdown-filter":g,"dropdown-filter-custom":_,"dropdown-group":Z,"dropdown-multi-select":v,"dropdown-negative":T,"dropdown-outline":h,"dropdown-placeholder":M,"dropdown-reactive":V,"dropdown-rendering-items":y,"dropdown-simple-binding":b,"dropdown-standard":D,"dropdown-template-driven":F,"dropdown-lazy":C,"dropdown-focus-out":f,"dropdown-scroll-strategy-provider":A,"multi-select":E,"multi-select-intl":L}}}U.\u0275fac=function(e){return new(e||U)},U.\u0275mod=n.oAB({type:U}),U.\u0275inj=n.cJS({imports:[d._A,r._0,q.f,J.cf,x.$N]})},9508:(P,O,a)=>{a.d(O,{f:()=>i});var x=a(6895),d=a(4006),r=a(690),J=a(1486),q=a(9561),n=a(4188),s=a(4650);class i{}i.\u0275fac=function(B){return new(B||i)},i.\u0275mod=s.oAB({type:i}),i.\u0275inj=s.cJS({imports:[x.ez,d.u5,d.UX,r.ru,n.X,J.K,q.TW]})}}]);