"use strict";(self.webpackChunkopensource_documentation=self.webpackChunkopensource_documentation||[]).push([[9517],{9517:(F,h,s)=>{s.r(h),s.d(h,{CheckboxExamplesModule:()=>D});var r=s(5404),b=s(9508),e=s(2223),l=s(8290),c=s(9401),m=s(4755);let u=(()=>{class o{constructor(){this.checkboxes=["checkbox 1"]}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-basic-example"]],decls:12,vars:4,consts:[[3,"ngModel","ngModelChange"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(n,t){1&n&&(e.TgZ(0,"nx-checkbox-group",0),e.NdJ("ngModelChange",function(i){return t.checkboxes=i}),e.TgZ(1,"nx-label"),e._uU(2,"This is a nx-checkbox-group"),e.qZA(),e.TgZ(3,"nx-checkbox",1),e._uU(4,"Checkbox 1"),e.qZA(),e.TgZ(5,"nx-checkbox",2),e._uU(6,"Checkbox 2"),e.qZA(),e.TgZ(7,"nx-checkbox",3),e._uU(8,"Checkbox 3"),e.qZA()(),e.TgZ(9,"p"),e._uU(10),e.ALo(11,"json"),e.qZA()),2&n&&(e.Q6J("ngModel",t.checkboxes),e.xp6(10),e.hij("Value: ",e.lcZ(11,2,t.checkboxes),""))},dependencies:[r.Wi,r.n9,l.UD,c.JJ,c.On,m.Ts]}),o})();var k=s(4400);function p(o,a){if(1&o&&(e.TgZ(0,"nx-checkbox",8),e._uU(1),e.qZA()),2&o){const n=a.$implicit;e.Q6J("value",n),e.xp6(1),e.Oqu(n)}}function d(o,a){if(1&o&&(e.TgZ(0,"nx-checkbox-group",4)(1,"nx-label",5),e._uU(2,"Select your choices"),e.qZA(),e.TgZ(3,"nx-error",6),e._uU(4," Please select at least one checkbox. "),e.qZA(),e.YNc(5,p,2,2,"nx-checkbox",7),e.qZA()),2&o){const n=e.oxw();e.xp6(1),e.Q6J("size","small"),e.xp6(4),e.Q6J("ngForOf",n.data)}}let g=(()=>{class o{constructor(n){this.fb=n,this.myFormGroup=this.fb.group({terms:[[],c.kI.required]}),this.data=["one","two","three"],this.i=1}addNewCb(){this.data.push("Checkbox "+this.i),this.i++}removeCB(){this.data.shift()}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(c.qu))},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-dynamic-example"]],decls:12,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required","",4,"ngIf"],["nxButton","primary small","type","button",1,"nx-margin-right-3xs",3,"click"],["nxButton","primary small","type","button",3,"click"],["name","terms","formControlName","terms","required",""],[3,"size"],["appearance","text"],["checked","","class","nx-margin-bottom-s",3,"value",4,"ngFor","ngForOf"],["checked","",1,"nx-margin-bottom-s",3,"value"]],template:function(n,t){1&n&&(e.TgZ(0,"form",0),e.YNc(1,d,6,2,"nx-checkbox-group",1),e.TgZ(2,"p"),e._uU(3),e.ALo(4,"json"),e.qZA(),e.TgZ(5,"p"),e._uU(6),e.ALo(7,"json"),e.qZA()(),e.TgZ(8,"button",2),e.NdJ("click",function(){return t.addNewCb()}),e._uU(9," Add new checkbox\n"),e.qZA(),e.TgZ(10,"button",3),e.NdJ("click",function(){return t.removeCB()}),e._uU(11," Remove first checkbox\n"),e.qZA()),2&n&&(e.Q6J("formGroup",t.myFormGroup),e.xp6(1),e.Q6J("ngIf",t.data),e.xp6(2),e.hij("Form value: ",e.lcZ(4,4,t.myFormGroup.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(7,6,t.myFormGroup.status),""))},dependencies:[r.Wi,r.n9,l.UD,l.vV,m.sg,m.O5,c._Y,c.JJ,c.JL,c.Q7,c.sg,c.u,k.XV,m.Ts]}),o})(),C=(()=>{class o{constructor(){this.checkboxes=["checkbox 1"]}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-horizontal-example"]],decls:13,vars:4,consts:[[3,"ngModel","ngModelChange"],[1,"horizontal-checkboxes"],["value","checkbox 1"],["value","checkbox 2",1,"nx-margin-left-s"],["value","checkbox 3",1,"nx-margin-left-s"]],template:function(n,t){1&n&&(e.TgZ(0,"nx-checkbox-group",0),e.NdJ("ngModelChange",function(i){return t.checkboxes=i}),e.TgZ(1,"nx-label"),e._uU(2,"This is a nx-checkbox-group"),e.qZA(),e.TgZ(3,"div",1)(4,"nx-checkbox",2),e._uU(5,"Checkbox 1"),e.qZA(),e.TgZ(6,"nx-checkbox",3),e._uU(7,"Checkbox 2"),e.qZA(),e.TgZ(8,"nx-checkbox",4),e._uU(9,"Checkbox 3"),e.qZA()()(),e.TgZ(10,"p"),e._uU(11),e.ALo(12,"json"),e.qZA()),2&n&&(e.Q6J("ngModel",t.checkboxes),e.xp6(11),e.hij("Value: ",e.lcZ(12,2,t.checkboxes),""))},dependencies:[r.Wi,r.n9,l.UD,c.JJ,c.On,m.Ts],styles:[".horizontal-checkboxes[_ngcontent-%COMP%]{display:flex;flex-direction:row}"]}),o})();const M=function(o){return{"docs-inverse-container":o}};let _=(()=>{class o{constructor(n){this.fb=n,this.optionsForm=this.fb.group({isNegative:[!1,null],isRequired:[!1,null],isDisabled:[!1,null],isLarge:[!1,null],isLabelExpert:[!1,null]}),this.myFormGroup=this.fb.group({terms:[[]]})}toggleDisabled(){this.myFormGroup.get("terms")?.disabled?this.myFormGroup.get("terms")?.enable():this.myFormGroup.get("terms")?.disable()}toggleRequired(){const n=this.myFormGroup.get("terms");n?.validator===c.kI.required?n.clearValidators():n?.setValidators(c.kI.required)}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(c.qu))},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-inheritance-example"]],decls:39,vars:14,consts:[[3,"formGroup"],["formControlName","isNegative",1,"nx-margin-bottom-s"],["formControlName","isRequired",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isDisabled",1,"nx-margin-bottom-s",3,"checkedChange"],["formControlName","isLarge",1,"nx-margin-bottom-s"],["formControlName","isLabelExpert"],[3,"ngClass"],["name","terms","formControlName","terms",3,"negative","labelSize"],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(n,t){1&n&&(e.TgZ(0,"h4"),e._uU(1,"Properties"),e.qZA(),e.TgZ(2,"form",0)(3,"nx-checkbox",1),e._uU(4,"Toggle negative"),e.qZA(),e.TgZ(5,"nx-checkbox",2),e.NdJ("checkedChange",function(){return t.toggleRequired()}),e._uU(6,"Toggle required"),e.qZA(),e.TgZ(7,"nx-checkbox",3),e.NdJ("checkedChange",function(){return t.toggleDisabled()}),e._uU(8,"Toggle disabled"),e.qZA(),e.TgZ(9,"nx-checkbox",4),e._uU(10,"Toggle checkbox label size"),e.qZA(),e.TgZ(11,"nx-checkbox",5),e._uU(12,"Toggle checkbox group label size (Expert)"),e.qZA()(),e._UZ(13,"hr"),e.TgZ(14,"h4"),e._uU(15,"Result"),e.qZA(),e.TgZ(16,"form",0)(17,"div",6)(18,"nx-checkbox-group",7)(19,"nx-label",8),e._uU(20,"Select your choices"),e.qZA(),e.TgZ(21,"nx-error",9),e._uU(22," Please select at least one checkbox. "),e.qZA(),e.TgZ(23,"nx-checkbox",10),e._uU(24,"Checkbox 1"),e.qZA(),e.TgZ(25,"nx-checkbox",11),e._uU(26,"Checkbox 2"),e.qZA(),e.TgZ(27,"nx-checkbox",12),e._uU(28,"Checkbox 3"),e.qZA(),e.TgZ(29,"nx-checkbox",13),e._uU(30,"Checkbox 4"),e.qZA(),e.TgZ(31,"nx-checkbox",14),e._uU(32,"Checkbox 5"),e.qZA()()(),e.TgZ(33,"p"),e._uU(34),e.ALo(35,"json"),e.qZA(),e.TgZ(36,"p"),e._uU(37),e.ALo(38,"json"),e.qZA()()),2&n&&(e.xp6(2),e.Q6J("formGroup",t.optionsForm),e.xp6(14),e.Q6J("formGroup",t.myFormGroup),e.xp6(1),e.Q6J("ngClass",e.VKq(12,M,t.optionsForm.value.isNegative)),e.xp6(1),e.Q6J("negative",t.optionsForm.value.isNegative)("labelSize",t.optionsForm.value.isLarge?"large":"small"),e.xp6(1),e.Q6J("size",t.optionsForm.value.isLabelExpert?"small":"large"),e.xp6(15),e.hij("Form value: ",e.lcZ(35,8,t.optionsForm.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(38,10,t.myFormGroup.status),""))},dependencies:[r.Wi,r.n9,l.UD,l.vV,m.mk,c._Y,c.JJ,c.JL,c.sg,c.u,m.Ts],styles:[".docs-inverse-container[_ngcontent-%COMP%]{padding:0}nx-checkbox-group[_ngcontent-%COMP%]{padding:8px;display:block}"]}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-label-size-example"]],decls:9,vars:1,consts:[[3,"size"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3"]],template:function(n,t){1&n&&(e.TgZ(0,"nx-checkbox-group")(1,"nx-label",0),e._uU(2,"This is an expert label for the checkbox group"),e.qZA(),e.TgZ(3,"nx-checkbox",1),e._uU(4,"Checkbox 1"),e.qZA(),e.TgZ(5,"nx-checkbox",2),e._uU(6,"Checkbox 2"),e.qZA(),e.TgZ(7,"nx-checkbox",3),e._uU(8,"Checkbox 3"),e.qZA()()),2&n&&(e.xp6(1),e.Q6J("size","small"))},dependencies:[r.Wi,r.n9,l.UD]}),o})(),f=(()=>{class o{constructor(n){this.fb=n,this.myFormGroup=this.fb.group({terms:[]})}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(c.qu))},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-reactive-example"]],decls:16,vars:7,consts:[[3,"formGroup"],["name","terms","formControlName","terms"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3"]],template:function(n,t){1&n&&(e.TgZ(0,"form",0)(1,"nx-checkbox-group",1)(2,"nx-label"),e._uU(3,"Select your choices"),e.qZA(),e.TgZ(4,"nx-checkbox",2),e._uU(5,"Checkbox 1"),e.qZA(),e.TgZ(6,"nx-checkbox",3),e._uU(7,"Checkbox 2"),e.qZA(),e.TgZ(8,"nx-checkbox",4),e._uU(9,"Checkbox 3"),e.qZA()(),e.TgZ(10,"p"),e._uU(11),e.ALo(12,"json"),e.qZA(),e.TgZ(13,"p"),e._uU(14),e.ALo(15,"json"),e.qZA()()),2&n&&(e.Q6J("formGroup",t.myFormGroup),e.xp6(11),e.hij("Form value: ",e.lcZ(12,3,t.myFormGroup.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(15,5,t.myFormGroup.status),""))},dependencies:[r.Wi,r.n9,l.UD,c._Y,c.JJ,c.JL,c.sg,c.u,m.Ts]}),o})(),T=(()=>{class o{constructor(n){this.fb=n,this.myFormGroup=this.fb.group({terms:[[],[c.kI.required,this.validateCheckboxes]]})}validateCheckboxes(n){return n.value.length<=2?{min:!1}:null}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(c.qu))},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-group-validation-example"]],decls:22,vars:8,consts:[[3,"formGroup"],["name","terms","formControlName","terms","required",""],[3,"size"],["appearance","text"],["value","Term 1",1,"nx-margin-bottom-s"],["value","Term 2",1,"nx-margin-bottom-s"],["value","Term 3",1,"nx-margin-bottom-s"],["value","Term 4",1,"nx-margin-bottom-s"],["value","Term 5"]],template:function(n,t){1&n&&(e.TgZ(0,"form",0)(1,"nx-checkbox-group",1)(2,"nx-label",2),e._uU(3,"Select your choices"),e.qZA(),e.TgZ(4,"nx-error",3),e._uU(5," Please select at least 3 checkboxes. "),e.qZA(),e.TgZ(6,"nx-checkbox",4),e._uU(7,"Checkbox 1"),e.qZA(),e.TgZ(8,"nx-checkbox",5),e._uU(9,"Checkbox 2"),e.qZA(),e.TgZ(10,"nx-checkbox",6),e._uU(11,"Checkbox 3"),e.qZA(),e.TgZ(12,"nx-checkbox",7),e._uU(13,"Checkbox 4"),e.qZA(),e.TgZ(14,"nx-checkbox",8),e._uU(15,"Checkbox 5"),e.qZA()(),e.TgZ(16,"p"),e._uU(17),e.ALo(18,"json"),e.qZA(),e.TgZ(19,"p"),e._uU(20),e.ALo(21,"json"),e.qZA()()),2&n&&(e.Q6J("formGroup",t.myFormGroup),e.xp6(2),e.Q6J("size","small"),e.xp6(15),e.hij("Form value: ",e.lcZ(18,4,t.myFormGroup.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(21,6,t.myFormGroup.status),""))},dependencies:[r.Wi,r.n9,l.UD,l.vV,c._Y,c.JJ,c.JL,c.Q7,c.sg,c.u,m.Ts]}),o})(),v=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-label-size-example"]],decls:5,vars:0,consts:[[1,"nx-margin-bottom-s"],["labelSize","large"]],template:function(n,t){1&n&&(e.TgZ(0,"form")(1,"nx-checkbox",0),e._uU(2,"Check me."),e.qZA(),e.TgZ(3,"nx-checkbox",1),e._uU(4,"Check me."),e.qZA()())},dependencies:[r.Wi,c._Y,c.JL,c.F]}),o})(),E=(()=>{class o{constructor(){this.checkboxes=["checkbox 1"]}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-negative-example"]],decls:13,vars:1,consts:[[1,"docs-inverse-container"],["negative","true","checked","true"],["negative","true",3,"ngModel","ngModelChange"],["value","checkbox 1",1,"nx-margin-bottom-s"],["value","checkbox 2",1,"nx-margin-bottom-s"],["value","checkbox 3","disabled","true"]],template:function(n,t){1&n&&(e.TgZ(0,"div",0)(1,"nx-checkbox",1),e._uU(2,"I'm a single checkbox"),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"nx-checkbox-group",2),e.NdJ("ngModelChange",function(i){return t.checkboxes=i}),e.TgZ(5,"nx-label"),e._uU(6,"This is a nx-checkbox-group"),e.qZA(),e.TgZ(7,"nx-checkbox",3),e._uU(8,"Checkbox 1"),e.qZA(),e.TgZ(9,"nx-checkbox",4),e._uU(10,"Checkbox 2"),e.qZA(),e.TgZ(11,"nx-checkbox",5),e._uU(12,"Checkbox 3"),e.qZA()()()),2&n&&(e.xp6(4),e.Q6J("ngModel",t.checkboxes))},dependencies:[r.Wi,r.n9,l.UD,c.JJ,c.On]}),o})();function L(o,a){if(1&o&&(e.TgZ(0,"pre"),e._uU(1),e.qZA()),2&o){const n=e.oxw();e.xp6(1),e.Oqu(n.logMessage)}}let U=(()=>{class o{constructor(){this.logMessage="",this.messages=[]}log(n){this.messages.push(n),this.logMessage=this.messages.join("\n")}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-outputs-example"]],decls:7,vars:1,consts:[[1,"nx-margin-bottom-s",3,"checkboxChange","checkedChange","indeterminateChange"],["checkboxTest",""],["nxButton","small","type","button",3,"click"],[4,"ngIf"]],template:function(n,t){if(1&n){const x=e.EpF();e.TgZ(0,"nx-checkbox",0,1),e.NdJ("checkboxChange",function(){return t.log("checkbox change occured")})("checkedChange",function(){return t.log("checked change occured")})("indeterminateChange",function(){return t.log("indeterminate change occured")}),e._uU(2,"Check me."),e.qZA(),e.TgZ(3,"button",2),e.NdJ("click",function(){e.CHM(x);const J=e.MAs(1);return e.KtG(J.indeterminate=!J.indeterminate)}),e._uU(4," Toggle Indeterminate\n"),e.qZA(),e._UZ(5,"br"),e.YNc(6,L,2,1,"pre",3)}2&n&&(e.xp6(6),e.Q6J("ngIf",t.logMessage))},dependencies:[r.Wi,m.O5,k.XV]}),o})(),A=(()=>{class o{constructor(n){this.fb=n,this.testForm=this.fb.group({checkboxTestReactive:[!1,c.kI.requiredTrue]})}}return o.\u0275fac=function(n){return new(n||o)(e.Y36(c.qu))},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-reactive-example"]],decls:9,vars:7,consts:[[3,"formGroup"],["formControlName","checkboxTestReactive"]],template:function(n,t){1&n&&(e.TgZ(0,"form",0)(1,"nx-checkbox",1),e._uU(2,"Check me."),e.qZA(),e.TgZ(3,"p"),e._uU(4),e.ALo(5,"json"),e.qZA(),e.TgZ(6,"p"),e._uU(7),e.ALo(8,"json"),e.qZA()()),2&n&&(e.Q6J("formGroup",t.testForm),e.xp6(4),e.hij("Form value: ",e.lcZ(5,3,t.testForm.value),""),e.xp6(3),e.hij("Form status: ",e.lcZ(8,5,t.testForm.status),""))},dependencies:[r.Wi,c._Y,c.JJ,c.JL,c.sg,c.u,m.Ts]}),o})(),q=(()=>{class o{constructor(){this.checkedRaw=!1}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-simple-binding-example"]],decls:4,vars:2,consts:[[1,"nx-margin-bottom-s",3,"checked","checkedChange"]],template:function(n,t){1&n&&(e.TgZ(0,"form")(1,"nx-checkbox",0),e.NdJ("checkedChange",function(i){return t.checkedRaw=i}),e._uU(2,"Check me."),e.qZA(),e._uU(3),e.qZA()),2&n&&(e.xp6(1),e.Q6J("checked",t.checkedRaw),e.xp6(2),e.hij(" Current Value: ",t.checkedRaw,"\n"))},dependencies:[r.Wi,c._Y,c.JL,c.F]}),o})(),y=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-states-example"]],decls:24,vars:7,consts:[[1,"nx-margin-bottom-s"],[1,"nx-margin-bottom-s",3,"checked"],[1,"nx-margin-bottom-s",3,"disabled"],[1,"nx-margin-bottom-s",3,"checked","disabled"],[1,"nx-margin-bottom-s",3,"indeterminate"],[3,"indeterminate","disabled"]],template:function(n,t){1&n&&(e.TgZ(0,"nx-checkbox",0),e._uU(1," Default"),e._UZ(2,"br"),e._uU(3," The box is left unchecked.\n"),e.qZA(),e.TgZ(4,"nx-checkbox",1),e._uU(5," Checked"),e._UZ(6,"br"),e._uU(7," An action or item is selected.\n"),e.qZA(),e.TgZ(8,"nx-checkbox",2),e._uU(9," Disabled"),e._UZ(10,"br"),e._uU(11," The checkbox is inactive due to previously checked or unchecked boxes.\n"),e.qZA(),e.TgZ(12,"nx-checkbox",3),e._uU(13," Checked & disabled"),e._UZ(14,"br"),e._uU(15," An action or item has been pre-selected due to previously checked or unchecked boxes.\n"),e.qZA(),e.TgZ(16,"nx-checkbox",4),e._uU(17," Indeterminate"),e._UZ(18,"br"),e._uU(19,' If all subordinate boxes are checked, the "mother checkbox" may be as well. But if only _some_ of them are, it\'s state is indeterminate, i.e. partially checked. This may come in handy if you work with nested checkboxes.\n'),e.qZA(),e.TgZ(20,"nx-checkbox",5),e._uU(21," Indeterminate & disabled"),e._UZ(22,"br"),e._uU(23," The box is indeterminate and can not be interacted with directly, but only via checking all of the subordinate boxes nested below.\n"),e.qZA()),2&n&&(e.xp6(4),e.Q6J("checked",!0),e.xp6(4),e.Q6J("disabled",!0),e.xp6(4),e.Q6J("checked",!0)("disabled",!0),e.xp6(4),e.Q6J("indeterminate",!0),e.xp6(4),e.Q6J("indeterminate",!0)("disabled",!0))},dependencies:[r.Wi]}),o})(),G=(()=>{class o{constructor(){this.checked=!1}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["checkbox-template-driven-example"]],decls:4,vars:2,consts:[["name","checkboxTestTemplate",1,"nx-margin-bottom-s",3,"ngModel","ngModelChange"]],template:function(n,t){1&n&&(e.TgZ(0,"form")(1,"nx-checkbox",0),e.NdJ("ngModelChange",function(i){return t.checked=i}),e._uU(2,"Check me."),e.qZA(),e._uU(3),e.qZA()),2&n&&(e.xp6(1),e.Q6J("ngModel",t.checked),e.xp6(2),e.hij(" Current Value: ",t.checked,"\n"))},dependencies:[r.Wi,c._Y,c.JJ,c.JL,c.On,c.F]}),o})(),D=(()=>{class o{static components(){return{"checkbox-group-basic":u,"checkbox-group-dynamic":g,"checkbox-group-horizontal":C,"checkbox-group-inheritance":_,"checkbox-group-label-size":Z,"checkbox-group-reactive":f,"checkbox-group-validation":T,"checkbox-label-size":v,"checkbox-negative":E,"checkbox-outputs":U,"checkbox-reactive":A,"checkbox-simple-binding":q,"checkbox-states":y,"checkbox-template-driven":G}}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[r.R0,b.f]}),o})()},9508:(F,h,s)=>{s.d(h,{f:()=>k});var r=s(4755),b=s(9401),e=s(4400),l=s(2812),c=s(2658),m=s(1322),u=s(2223);let k=(()=>{class p{}return p.\u0275fac=function(g){return new(g||p)},p.\u0275mod=u.oAB({type:p}),p.\u0275inj=u.cJS({imports:[r.ez,b.u5,b.UX,e.ru,m.X,l.K,c.TW]}),p})()}}]);